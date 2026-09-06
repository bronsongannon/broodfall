#!/usr/bin/env python3
"""Rebuild Broodfall image inventories and labeled contact sheets.

Examples (run from any directory):

    python3 image-audit/generate.py full --output image-audit
    python3 image-audit/generate.py phase 1 before
    python3 image-audit/generate.py phase 1 after
    python3 image-audit/generate.py verify-bundle /path/to/Broodfall.app --phase 1

The full command scans only canonical art roots. Generated audit images and
mac/build copies can therefore never enter the inventory. A phase command
writes a frozen, scoped inventory plus source-scale and actual-game-scale
boards under image-audit/phases/phase-N/<state>/ by default. Missing required
slots are rendered as labeled placeholders instead of silently disappearing.
The bundle verifier mirrors the Xcode copy phase's exclusions and compares
workspace files with the exact bytes embedded in a built app.
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import math
import re
import subprocess
import sys
from dataclasses import dataclass, replace
from pathlib import Path
from typing import Iterable, Sequence

from PIL import Image, ImageDraw, ImageFont, ImageOps


SCRIPT = Path(__file__).resolve()
DEFAULT_REPO = SCRIPT.parent.parent
IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg"}
INVENTORY_FIELDS = [
    "path",
    "category",
    "format",
    "width",
    "height",
    "mode",
    "has_alpha",
    "alpha_min",
    "alpha_max",
    "transparent_pct",
    "opaque_pct",
    "bbox",
    "touches",
    "bbox_coverage_pct",
    "bytes",
    "file_sha256",
    "pixel_sha256",
]

HUMAN_TYPES = ("marine", "engineer", "sniper", "medic", "rocket", "commando")
DINO_TYPES = ("spitter", "raptor", "critter", "screecher", "ironback", "broodmother")
ANIM_RE = re.compile(r"^unit_([a-z0-9]+)_(walk|death)(\d+)_(teal|red|wild)\.png$")

PAGE_W = 1600
PAGE_H = 900
PAGE_MARGIN = 24
HEADER_H = 58
SOURCE_COLS = 8
SOURCE_ROWS = 4
GAME_COLS = 6
GAME_ROWS = 4
CELL_GAP = 10

PAGE_BG = (8, 20, 20, 255)
CELL_BG = (17, 33, 32, 255)
CELL_BORDER = (37, 62, 59, 255)
GROUND_A = (48, 62, 51, 255)
GROUND_B = (53, 68, 56, 255)
TEXT = (220, 232, 226, 255)
MUTED = (145, 164, 157, 255)
ACCENT = (72, 211, 201, 255)
WARNING = (241, 176, 70, 255)
MISSING = (137, 54, 49, 255)


def _font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        Path("/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf"),
        Path("/System/Library/Fonts/SFNS.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(str(candidate), size=size)
        except OSError:
            pass
    return ImageFont.load_default()


FONT_TITLE = _font(24, bold=True)
FONT_LABEL = _font(13, bold=True)
FONT_SMALL = _font(11)
FONT_TINY = _font(10)


@dataclass(frozen=True)
class SheetItem:
    relative_path: str
    path: Path
    draw_size: tuple[int, int] | None = None
    role: str = "target"
    blob: bytes | None = None
    force_missing: bool = False

    @property
    def exists(self) -> bool:
        return not self.force_missing and (self.blob is not None or self.path.is_file())

    @property
    def filename(self) -> str:
        return Path(self.relative_path).name


def _sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _item_bytes(item: SheetItem) -> bytes:
    if item.blob is not None:
        return item.blob
    return item.path.read_bytes()


def _item_sha256(item: SheetItem) -> str:
    return hashlib.sha256(_item_bytes(item)).hexdigest()


def _open_item_rgba(item: SheetItem) -> tuple[Image.Image, str, str, bool]:
    source = io.BytesIO(item.blob) if item.blob is not None else item.path
    with Image.open(source) as opened:
        image_format = opened.format or item.path.suffix.lstrip(".").upper()
        mode = opened.mode
        has_alpha = "A" in opened.getbands() or "transparency" in opened.info
        rgba = ImageOps.exif_transpose(opened).convert("RGBA")
    return rgba, image_format, mode, has_alpha


def canonical_images(repo: Path) -> list[tuple[Path, str]]:
    """Return the deliberate art roots used by the game and Mac wrapper."""
    roots = [
        (repo / "assets/fx", "fx"),
        (repo / "assets/portraits/source", "portrait-source"),
        (repo / "assets/portraits", "portraits-live"),
        (repo / "assets/sprites/Source 2", "sprite-source-2"),
        (repo / "assets/sprites/source", "sprite-source"),
        (repo / "assets/sprites", "sprites-live"),
        (repo / "assets/store/screenshots", "store-screenshots"),
        (repo / "assets/store", "store-keyart"),
        (repo / "assets/thumbs", "map-thumbnails"),
        (repo / "mac/Broodfall/Assets.xcassets/AppIcon.appiconset", "app-icons"),
        (repo / "mac/icon", "app-icon-source"),
    ]
    # More-specific roots win when one is nested under another.
    claimed: set[Path] = set()
    found: list[tuple[Path, str]] = []
    for root, category in roots:
        if not root.is_dir():
            continue
        for path in sorted(root.rglob("*")):
            resolved = path.resolve()
            if not path.is_file() or path.suffix.lower() not in IMAGE_SUFFIXES or resolved in claimed:
                continue
            claimed.add(resolved)
            found.append((path, category))
    # Preserve the repository's bytewise path order (uppercase source folders
    # precede lowercase production files), matching the original audit.
    return sorted(found, key=lambda entry: entry[0].relative_to(repo).as_posix())


def inspect_image(repo: Path, path: Path, category: str) -> dict[str, object]:
    return inspect_sheet_item(repo, SheetItem(path.relative_to(repo).as_posix(), path), category)


def inspect_sheet_item(repo: Path, item: SheetItem, category: str) -> dict[str, object]:
    rgba, image_format, mode, has_alpha = _open_item_rgba(item)
    width, height = rgba.size
    alpha = rgba.getchannel("A")
    alpha_min, alpha_max = alpha.getextrema()
    histogram = alpha.histogram()
    pixels = max(1, width * height)
    bbox_tuple = alpha.getbbox()
    if bbox_tuple:
        left, top, right, bottom = bbox_tuple
        bbox = f"{left},{top},{right},{bottom}"
        touches = "".join(
            marker
            for marker, yes in (
                ("L", left == 0),
                ("T", top == 0),
                ("R", right == width),
                ("B", bottom == height),
            )
            if yes
        )
        coverage = round((right - left) * (bottom - top) * 100.0 / pixels, 3)
    else:
        bbox = ""
        touches = ""
        coverage = 0.0
    return {
        "path": item.relative_path,
        "category": category,
        "format": image_format,
        "width": width,
        "height": height,
        "mode": mode,
        "has_alpha": has_alpha,
        "alpha_min": alpha_min,
        "alpha_max": alpha_max,
        "transparent_pct": round(histogram[0] * 100.0 / pixels, 3),
        "opaque_pct": round(histogram[255] * 100.0 / pixels, 3),
        "bbox": bbox,
        "touches": touches,
        "bbox_coverage_pct": coverage,
        "bytes": len(item.blob) if item.blob is not None else item.path.stat().st_size,
        "file_sha256": _item_sha256(item),
        "pixel_sha256": hashlib.sha256(rgba.tobytes()).hexdigest(),
    }


def build_inventory(repo: Path) -> list[dict[str, object]]:
    return [inspect_image(repo, path, category) for path, category in canonical_images(repo)]


def write_inventory(output: Path, inventory: Sequence[dict[str, object]]) -> None:
    output.mkdir(parents=True, exist_ok=True)
    with (output / "inventory.json").open("w", encoding="utf-8") as handle:
        json.dump(list(inventory), handle, indent=2, ensure_ascii=False)
        handle.write("\n")
    with (output / "inventory.tsv").open("w", encoding="utf-8", newline="") as handle:
        # Keep the dialect used by the original inventory so a rerun changes
        # only records whose pixels or metadata actually changed.
        writer = csv.DictWriter(handle, fieldnames=INVENTORY_FIELDS, delimiter="\t", lineterminator="\n")
        writer.writeheader()
        writer.writerows(inventory)


def _checker(size: tuple[int, int], tile: int = 10) -> Image.Image:
    result = Image.new("RGBA", size, (188, 198, 195, 255))
    draw = ImageDraw.Draw(result)
    dark = (157, 169, 165, 255)
    for y in range(0, size[1], tile):
        for x in range(0, size[0], tile):
            if (x // tile + y // tile) % 2:
                draw.rectangle((x, y, min(size[0] - 1, x + tile - 1), min(size[1] - 1, y + tile - 1)), fill=dark)
    return result


def _ground(size: tuple[int, int], tile: int = 16) -> Image.Image:
    result = Image.new("RGBA", size, GROUND_A)
    draw = ImageDraw.Draw(result)
    for y in range(0, size[1], tile):
        for x in range(0, size[0], tile):
            if (x // tile + y // tile) % 2:
                draw.rectangle((x, y, min(size[0] - 1, x + tile - 1), min(size[1] - 1, y + tile - 1)), fill=GROUND_B)
    return result


def _contain(image: Image.Image, bounds: tuple[int, int]) -> Image.Image:
    width, height = image.size
    scale = min(bounds[0] / max(1, width), bounds[1] / max(1, height), 1.0)
    size = (max(1, round(width * scale)), max(1, round(height * scale)))
    if size != image.size:
        image = image.resize(size, Image.Resampling.LANCZOS)
    return image


def _fit_text(draw: ImageDraw.ImageDraw, text: str, max_width: int, font: ImageFont.ImageFont) -> str:
    if draw.textbbox((0, 0), text, font=font)[2] <= max_width:
        return text
    ellipsis = "…"
    candidate = text
    while candidate and draw.textbbox((0, 0), candidate + ellipsis, font=font)[2] > max_width:
        candidate = candidate[:-1]
    return candidate + ellipsis


def _filename_lines(
    draw: ImageDraw.ImageDraw, text: str, max_width: int
) -> tuple[list[str], ImageFont.ImageFont]:
    """Keep exact filenames visible; prefer a balanced underscore break."""
    for font in (FONT_LABEL, FONT_SMALL, FONT_TINY):
        if draw.textbbox((0, 0), text, font=font)[2] <= max_width:
            return [text], font
        breaks = [index + 1 for index, char in enumerate(text) if char == "_"]
        candidates = []
        for index in breaks:
            first, second = text[:index], text[index:]
            first_w = draw.textbbox((0, 0), first, font=font)[2]
            second_w = draw.textbbox((0, 0), second, font=font)[2]
            if first_w <= max_width and second_w <= max_width:
                candidates.append((abs(first_w - second_w), first, second))
        if candidates:
            _, first, second = min(candidates)
            return [first, second], font
    # This should be unreachable for Broodfall's slot names. Preserve the full
    # value anyway so an unexpectedly long future name is obvious in review.
    return [text], FONT_TINY


def _draw_item(
    page: Image.Image,
    item: SheetItem,
    box: tuple[int, int, int, int],
    gameplay: bool,
) -> None:
    draw = ImageDraw.Draw(page)
    left, top, right, bottom = box
    draw.rounded_rectangle(box, radius=7, fill=CELL_BG, outline=CELL_BORDER, width=1)
    image_left, image_top = left + 8, top + 8
    image_right, image_bottom = right - 8, bottom - 62
    image_w, image_h = image_right - image_left + 1, image_bottom - image_top + 1
    backdrop = _ground((image_w, image_h)) if gameplay else _checker((image_w, image_h))
    page.alpha_composite(backdrop, (image_left, image_top))

    native_size: tuple[int, int] | None = None
    if item.exists:
        sprite, _, _, _ = _open_item_rgba(item)
        native_size = sprite.size
        if gameplay and item.draw_size:
            target = (max(1, round(item.draw_size[0])), max(1, round(item.draw_size[1])))
            sprite = sprite.resize(target, Image.Resampling.LANCZOS)
        else:
            sprite = _contain(sprite, (image_w - 12, image_h - 12))
        px = image_left + (image_w - sprite.width) // 2
        py = image_top + (image_h - sprite.height) // 2
        page.alpha_composite(sprite, (px, py))
    else:
        draw.rectangle((image_left + 4, image_top + 4, image_right - 4, image_bottom - 4), outline=MISSING, width=3)
        missing_text = _fit_text(draw, "MISSING REQUIRED SLOT", image_w - 20, FONT_SMALL)
        bbox_text = draw.textbbox((0, 0), missing_text, font=FONT_SMALL)
        draw.text(
            (image_left + (image_w - (bbox_text[2] - bbox_text[0])) // 2, image_top + image_h // 2 - 8),
            missing_text,
            font=FONT_SMALL,
            fill=WARNING,
        )

    name_lines, name_font = _filename_lines(draw, item.filename, right - left - 16)
    name_y = bottom - (52 if len(name_lines) == 2 else 43)
    for line in name_lines:
        draw.text((left + 8, name_y), line, font=name_font, fill=TEXT)
        name_y += 13
    if native_size:
        detail = f"{native_size[0]}×{native_size[1]}"
        if gameplay and item.draw_size:
            detail += f" → {item.draw_size[0]}×{item.draw_size[1]} draw"
    else:
        detail = "not present"
    if item.role != "target":
        detail += f" · {item.role}"
    detail = _fit_text(draw, detail, right - left - 16, FONT_SMALL)
    draw.text((left + 8, bottom - 20), detail, font=FONT_SMALL, fill=MUTED)


def render_paged_sheets(
    items: Sequence[SheetItem],
    output: Path,
    prefix: str,
    title: str,
    gameplay: bool = False,
) -> list[str]:
    cols, rows = (GAME_COLS, GAME_ROWS) if gameplay else (SOURCE_COLS, SOURCE_ROWS)
    per_page = cols * rows
    pages = max(1, math.ceil(len(items) / per_page))
    usable_w = PAGE_W - PAGE_MARGIN * 2 - CELL_GAP * (cols - 1)
    usable_h = PAGE_H - HEADER_H - PAGE_MARGIN - CELL_GAP * (rows - 1)
    cell_w = usable_w // cols
    cell_h = usable_h // rows
    files: list[str] = []
    output.mkdir(parents=True, exist_ok=True)
    for page_index in range(pages):
        page = Image.new("RGBA", (PAGE_W, PAGE_H), PAGE_BG)
        draw = ImageDraw.Draw(page)
        scale_label = "ACTUAL GAME SCALE" if gameplay else "SOURCE SCALE"
        heading = f"{title} · {scale_label} · {len(items)} slots · {page_index + 1}/{pages}"
        draw.text((PAGE_MARGIN, 17), heading, font=FONT_TITLE, fill=ACCENT)
        page_items = items[page_index * per_page : (page_index + 1) * per_page]
        for local_index, item in enumerate(page_items):
            # Page-local indices are essential: using the global index here was
            # what pushed page-two's first cell off the left edge in the legacy boards.
            column = local_index % cols
            row = local_index // cols
            left = PAGE_MARGIN + column * (cell_w + CELL_GAP)
            top = HEADER_H + row * (cell_h + CELL_GAP)
            right = left + cell_w - 1
            bottom = top + cell_h - 1
            if left < PAGE_MARGIN or right >= PAGE_W - PAGE_MARGIN + 1:
                raise AssertionError(f"contact-sheet cell escaped page: {left=}, {right=}")
            _draw_item(page, item, (left, top, right, bottom), gameplay)
        name = f"{prefix}-{page_index + 1}.png"
        page.convert("RGB").save(output / name, quality=95)
        files.append(name)
    return files


def render_border_risk(items: Sequence[SheetItem], output: Path, name: str = "12-border-risk.png") -> str:
    cols = 5
    cell_w, cell_h = 290, 270
    margin, gap, header = 20, 10, 56
    rows = max(1, math.ceil(len(items) / cols))
    width = margin * 2 + cols * cell_w + (cols - 1) * gap
    height = header + margin + rows * cell_h + (rows - 1) * gap
    page = Image.new("RGBA", (width, height), (28, 29, 29, 255))
    draw = ImageDraw.Draw(page)
    draw.text((margin, 15), f"BORDER RISK · {len(items)} sprites with visible alpha touching a canvas edge", font=FONT_TITLE, fill=WARNING)
    for index, item in enumerate(items):
        column = index % cols
        row = index // cols
        left = margin + column * (cell_w + gap)
        top = header + row * (cell_h + gap)
        preview_box = (left, top, left + cell_w - 1, top + cell_h - 42)
        backdrop = _checker((cell_w, cell_h - 42), tile=12)
        page.alpha_composite(backdrop, (left, top))
        sprite, _, _, _ = _open_item_rgba(item)
        sprite = _contain(sprite, (cell_w, cell_h - 42))
        page.alpha_composite(sprite, (left + (cell_w - sprite.width) // 2, top + (cell_h - 42 - sprite.height) // 2))
        draw.rectangle(preview_box, outline=CELL_BORDER, width=1)
        draw.text((left + 2, top + cell_h - 38), _fit_text(draw, item.filename, cell_w - 4, FONT_TINY), font=FONT_TINY, fill=TEXT)
        alpha = _open_item_rgba(item)[0].getchannel("A")
        bbox = alpha.getbbox()
        touches = ""
        if bbox:
            touches = "".join(m for m, yes in (("L", bbox[0] == 0), ("T", bbox[1] == 0), ("R", bbox[2] == alpha.width), ("B", bbox[3] == alpha.height)) if yes)
        draw.text((left + 2, top + cell_h - 22), f"solid border: {touches or 'none'}", font=FONT_TINY, fill=WARNING)
    output.mkdir(parents=True, exist_ok=True)
    page.convert("RGB").save(output / name, quality=95)
    return name


def _live_sprite_items(repo: Path, inventory: Sequence[dict[str, object]]) -> tuple[list[SheetItem], ...]:
    records = [entry for entry in inventory if entry["category"] == "sprites-live"]
    items = [SheetItem(str(entry["path"]), repo / str(entry["path"])) for entry in records]
    buildings: list[SheetItem] = []
    statics: list[SheetItem] = []
    human_animation: list[SheetItem] = []
    dino_animation: list[SheetItem] = []
    terrain: list[SheetItem] = []
    for item in items:
        filename = item.filename
        match = ANIM_RE.match(filename)
        if filename.startswith("bld_") or filename in {"dino_nest.png", "dino_den.png", "dino_roost.png"}:
            buildings.append(item)
        elif match and match.group(1) in HUMAN_TYPES:
            human_animation.append(item)
        elif match and match.group(1) in DINO_TYPES:
            dino_animation.append(item)
        elif filename.startswith("unit_"):
            statics.append(item)
        else:
            terrain.append(item)
    return buildings, statics, human_animation, dino_animation, terrain


def _items_for_records(repo: Path, records: Iterable[dict[str, object]]) -> list[SheetItem]:
    return [SheetItem(str(entry["path"]), repo / str(entry["path"])) for entry in records]


def render_full(repo: Path, output: Path, inventory: Sequence[dict[str, object]]) -> list[str]:
    buildings, statics, human_animation, dino_animation, terrain = _live_sprite_items(repo, inventory)
    groups: list[tuple[str, str, list[SheetItem]]] = [
        ("01-buildings", "01 BUILDINGS", buildings),
        ("02-units-static", "02 UNITS STATIC", statics),
        ("03-human-animation", "03 HUMAN ANIMATION", human_animation),
        ("04-dino-animation", "04 DINO ANIMATION", dino_animation),
        ("05-terrain-components", "05 TERRAIN + FALLBACK COMPONENTS", terrain),
        ("06-effects", "06 EFFECTS", _items_for_records(repo, (x for x in inventory if x["category"] == "fx"))),
        ("07-map-thumbnails", "07 MAP THUMBNAILS", _items_for_records(repo, (x for x in inventory if x["category"] == "map-thumbnails"))),
        ("08-portraits-store", "08 PORTRAITS + STORE", _items_for_records(repo, (x for x in inventory if x["category"] in {"portraits-live", "store-keyart", "store-screenshots"}))),
        ("09-source-archive", "09 SPRITE SOURCE ARCHIVE", _items_for_records(repo, (x for x in inventory if x["category"] in {"sprite-source", "sprite-source-2"}))),
        ("10-portrait-sources", "10 PORTRAIT SOURCES", _items_for_records(repo, (x for x in inventory if x["category"] == "portrait-source"))),
        ("11-app-icons", "11 APP ICONS + MASTERS", _items_for_records(repo, (x for x in inventory if x["category"] in {"app-icons", "app-icon-source"}))),
    ]
    written: list[str] = []
    for prefix, title, items in groups:
        written.extend(render_paged_sheets(items, output, prefix, title))
    risks = [
        SheetItem(str(entry["path"]), repo / str(entry["path"]))
        for entry in inventory
        if entry["category"] == "sprites-live"
        and bool(entry["has_alpha"])
        and bool(entry["touches"])
        and float(entry["transparent_pct"]) > 0
    ]
    written.append(render_border_risk(risks, output))
    manifest = {
        "schema_version": 1,
        "scope": "full",
        "canonical_images": len(inventory),
        "contact_sheets": written,
    }
    with (output / "manifest.json").open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2)
        handle.write("\n")
    return written


BUILDING_DRAW = {
    "hq": (96, 96),
    "barracks": (78, 78),
    "factory": (88, 72),
    "supply": (56, 56),
    "power": (60, 60),
    "refinery": (70, 70),
    "airpad": (62, 62),
    "silo": (70, 70),
    "turret": (40, 40),
    "flak": (40, 40),
    # The collision footprint is 84x64, but drawHydroDam renders its long
    # authored bridge span independently so it reaches both river banks.
    "hydro": (192, 30),
    "sensor": (60, 60),
    "shipyard": (128, 90),
    "skiff": (170, 92),
}
UNIT_DRAW = {
    "apc": (35, 35),
    "artillery": (35, 35),
    "gunship": (34, 34),
    "harrier": (32, 32),
    "harvester": (30, 30),
    "raider": (30, 30),
    "rig": (30, 30),
    "tank": (38, 38),
    "carrier": (200, 200),
    "marine": (30, 30),
    "engineer": (29, 29),
    "sniper": (32, 32),
    "medic": (30, 30),
    "rocket": (32, 32),
    "commando": (32, 32),
}


def _sprite(repo: Path, filename: str, draw_size: tuple[int, int] | None, role: str = "target") -> SheetItem:
    relative = f"assets/sprites/{filename}"
    return SheetItem(relative, repo / relative, draw_size, role)


def phase_items(repo: Path, phase: int) -> list[SheetItem]:
    if phase == 1:
        items: list[SheetItem] = []
        for building in ("hq", "barracks", "factory", "supply", "power", "refinery", "airpad", "silo", "turret", "flak", "hydro", "sensor"):
            for colorway in ("teal", "red"):
                items.append(_sprite(repo, f"bld_{building}_{colorway}.png", BUILDING_DRAW[building]))
        for gun in ("turret_gun", "flak_gun"):
            for colorway in ("teal", "red"):
                items.append(_sprite(repo, f"{gun}_{colorway}.png", (28, 28)))
        items.extend(
            [
                _sprite(repo, "bld_shipyard_teal.png", BUILDING_DRAW["shipyard"], "approved benchmark"),
                _sprite(repo, "bld_skiff.png", BUILDING_DRAW["skiff"], "approved benchmark"),
                _sprite(repo, "unit_carrier_teal.png", UNIT_DRAW["carrier"], "approved benchmark"),
            ]
        )
        return items
    if phase == 2:
        items = []
        for unit in ("apc", "artillery", "gunship", "harrier", "harvester", "raider", "rig", "tank"):
            for colorway in ("teal", "red"):
                items.append(_sprite(repo, f"unit_{unit}_{colorway}.png", UNIT_DRAW[unit]))
        for colorway in ("teal", "red"):
            items.append(_sprite(repo, f"unit_artillery_hunker_{colorway}.png", UNIT_DRAW["artillery"]))
        items.append(_sprite(repo, "unit_carrier_teal.png", UNIT_DRAW["carrier"], "approved benchmark"))
        return items
    if phase == 3:
        items = []
        for unit in ("marine", "engineer", "sniper", "medic", "rocket"):
            for colorway in ("teal", "red"):
                items.append(_sprite(repo, f"unit_{unit}_{colorway}.png", UNIT_DRAW[unit]))
                for frame in range(1, 9):
                    items.append(_sprite(repo, f"unit_{unit}_walk{frame}_{colorway}.png", UNIT_DRAW[unit]))
                for frame in range(1, 5):
                    items.append(_sprite(repo, f"unit_{unit}_death{frame}_{colorway}.png", UNIT_DRAW[unit]))
                if unit in {"marine", "sniper"}:
                    items.append(_sprite(repo, f"unit_{unit}_hunker_{colorway}.png", UNIT_DRAW[unit]))
        unit = "commando"
        colorway = "teal"
        items.append(_sprite(repo, f"unit_{unit}_{colorway}.png", UNIT_DRAW[unit]))
        for frame in range(1, 9):
            items.append(_sprite(repo, f"unit_{unit}_walk{frame}_{colorway}.png", UNIT_DRAW[unit]))
        for frame in range(1, 5):
            items.append(_sprite(repo, f"unit_{unit}_death{frame}_{colorway}.png", UNIT_DRAW[unit]))
        return items
    raise ValueError(f"unsupported phase: {phase}")


def items_at_git_ref(repo: Path, items: Sequence[SheetItem], git_ref: str) -> list[SheetItem]:
    """Read tracked target art from a commit without touching the worktree.

    Approved benchmarks may be intentionally untracked, so those fall back to
    their workspace files. A target absent at the requested ref remains a
    missing slot even if another agent has since created it in the worktree.
    """
    resolved: list[SheetItem] = []
    for item in items:
        process = subprocess.run(
            ["git", "-C", str(repo), "show", f"{git_ref}:{item.relative_path}"],
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        if process.returncode == 0:
            resolved.append(replace(item, blob=process.stdout, force_missing=False))
        elif item.role != "target" and item.path.is_file():
            resolved.append(item)
        else:
            resolved.append(replace(item, blob=None, force_missing=True))
    return resolved


def render_phase(repo: Path, output: Path, phase: int, state: str, git_ref: str | None = None) -> list[str]:
    items = phase_items(repo, phase)
    if git_ref:
        items = items_at_git_ref(repo, items, git_ref)
    present_records: list[dict[str, object]] = []
    for item in items:
        if item.exists:
            present_records.append(inspect_sheet_item(repo, item, "phase-target" if item.role == "target" else "phase-benchmark"))
    write_inventory(output, present_records)
    title = f"PHASE {phase} · {state.upper()}"
    written = []
    written.extend(render_paged_sheets(items, output, "source", title, gameplay=False))
    written.extend(render_paged_sheets(items, output, "gameplay", title, gameplay=True))
    missing = [item.relative_path for item in items if not item.exists]
    manifest = {
        "schema_version": 1,
        "scope": "phase",
        "phase": phase,
        "state": state,
        "git_ref": git_ref,
        "slots": len(items),
        "present": len(items) - len(missing),
        "missing": missing,
        "contact_sheets": written,
        "assets": [
            {
                "path": item.relative_path,
                "role": item.role,
                "present": item.exists,
                "draw_size": list(item.draw_size) if item.draw_size else None,
                "file_sha256": _item_sha256(item) if item.exists else None,
            }
            for item in items
        ],
    }
    with (output / "manifest.json").open("w", encoding="utf-8") as handle:
        json.dump(manifest, handle, indent=2, ensure_ascii=False)
        handle.write("\n")
    return written


def _included_bundle_asset(path: Path, assets_root: Path) -> bool:
    """Mirror the exclusions in Xcode's ``Bundle Game Files`` rsync phase."""
    relative = path.relative_to(assets_root)
    if any(part in {"Source 2", "source"} for part in relative.parts):
        return False
    if path.name in {".DS_Store", "voice-script.tsv"}:
        return False
    return path.suffix.lower() not in {".md", ".py", ".pdf"}


def expected_bundle_files(repo: Path, phase: int | None) -> list[Path]:
    if phase is not None:
        # A phase verification still checks the two executable web payloads so
        # a sprite-correct but code-stale app cannot pass.
        scoped = [repo / "index.html", repo / "game.js"]
        scoped.extend(item.path for item in phase_items(repo, phase))
        return sorted(set(scoped), key=lambda path: path.relative_to(repo).as_posix())

    expected = [repo / "index.html", repo / "game.js"]
    assets_root = repo / "assets"
    expected.extend(
        path
        for path in assets_root.rglob("*")
        if path.is_file() and _included_bundle_asset(path, assets_root)
    )
    return sorted(expected, key=lambda path: path.relative_to(repo).as_posix())


def resolve_bundle_game_root(value: str) -> Path:
    supplied = Path(value).expanduser().resolve()
    if supplied.suffix == ".app":
        return supplied / "Contents/Resources/game"
    if supplied.name == "game":
        return supplied
    candidate = supplied / "Contents/Resources/game"
    return candidate if candidate.is_dir() else supplied


def verify_bundle(repo: Path, app_or_game: str, phase: int | None) -> bool:
    game_root = resolve_bundle_game_root(app_or_game)
    if not game_root.is_dir():
        print(f"error: bundle game directory does not exist: {game_root}", file=sys.stderr)
        return False

    workspace_missing: list[str] = []
    bundle_missing: list[str] = []
    mismatches: list[str] = []
    expected_relatives: set[str] = set()
    for workspace_path in expected_bundle_files(repo, phase):
        relative = workspace_path.relative_to(repo).as_posix()
        expected_relatives.add(relative)
        bundled_path = game_root / relative
        if not workspace_path.is_file():
            workspace_missing.append(relative)
        elif not bundled_path.is_file():
            bundle_missing.append(relative)
        elif _sha256_file(workspace_path) != _sha256_file(bundled_path):
            mismatches.append(relative)

    unexpected: list[str] = []
    if phase is None:
        actual_relatives = {
            path.relative_to(game_root).as_posix()
            for path in game_root.rglob("*")
            if path.is_file()
        }
        unexpected = sorted(actual_relatives - expected_relatives)

    failures = (
        ("workspace missing", workspace_missing),
        ("bundle missing", bundle_missing),
        ("hash mismatch", mismatches),
        ("unexpected bundle file", unexpected),
    )
    for label, paths in failures:
        for path in paths:
            print(f"{label}: {path}")
    checked = len(expected_relatives)
    if any(paths for _, paths in failures):
        print(f"bundle verification FAILED: {checked} expected files checked at {game_root}")
        return False
    scope = f"phase {phase}" if phase is not None else "full payload"
    print(f"bundle verification passed: {checked} {scope} files match at {game_root}")
    return True


def resolve_path(repo: Path, value: str | None, default: Path) -> Path:
    if value is None:
        return default
    path = Path(value).expanduser()
    return path if path.is_absolute() else repo / path


def parser() -> argparse.ArgumentParser:
    result = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    result.add_argument("--repo", help="repository root (default: inferred from this script)")
    commands = result.add_subparsers(dest="command", required=True)
    full = commands.add_parser("full", help="rebuild the canonical inventory and complete contact-sheet set")
    full.add_argument("--output", help="output directory (default: <repo>/image-audit)")
    phase = commands.add_parser("phase", help="freeze a phase before/after inventory and contact-sheet set")
    phase.add_argument("phase", type=int, choices=(1, 2, 3))
    phase.add_argument("state", choices=("before", "after"))
    phase.add_argument("--output", help="output directory (default: <repo>/image-audit/phases/phase-N/state)")
    phase.add_argument(
        "--git-ref",
        help="read tracked target art from this git ref (use HEAD to freeze a pre-worktree baseline)",
    )
    bundle = commands.add_parser("verify-bundle", help="compare workspace files with a built Broodfall.app payload")
    bundle.add_argument("app", help="path to Broodfall.app or its Contents/Resources/game directory")
    bundle.add_argument("--phase", type=int, choices=(1, 2, 3), help="check only one phase plus index.html/game.js")
    return result


def main(argv: Sequence[str] | None = None) -> int:
    args = parser().parse_args(argv)
    repo = Path(args.repo).expanduser().resolve() if args.repo else DEFAULT_REPO
    if not (repo / "game.js").is_file() or not (repo / "assets/sprites").is_dir():
        print(f"error: not a Broodfall repository: {repo}", file=sys.stderr)
        return 2
    if args.command == "full":
        output = resolve_path(repo, args.output, repo / "image-audit")
        inventory = build_inventory(repo)
        write_inventory(output, inventory)
        sheets = render_full(repo, output, inventory)
        print(f"wrote {len(inventory)} inventory rows and {len(sheets)} contact sheets to {output}")
        return 0
    if args.command == "verify-bundle":
        return 0 if verify_bundle(repo, args.app, args.phase) else 1
    output = resolve_path(repo, args.output, repo / f"image-audit/phases/phase-{args.phase}/{args.state}")
    sheets = render_phase(repo, output, args.phase, args.state, args.git_ref)
    manifest = json.loads((output / "manifest.json").read_text(encoding="utf-8"))
    print(
        f"wrote phase {args.phase} {args.state}: {manifest['present']}/{manifest['slots']} slots present, "
        f"{len(manifest['missing'])} missing, {len(sheets)} sheets -> {output}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
