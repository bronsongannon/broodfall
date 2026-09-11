#!/usr/bin/env python3
"""Build preview-only Engineer red-family review artifacts and QA metrics.

This script never modifies source sprites or repository files. It reads the
approved teal frames and their red counterparts, performs deterministic QA,
and writes only composited previews plus a JSON report under /private/tmp.
"""

from __future__ import annotations

import json
import math
import random
from datetime import datetime, timezone
from pathlib import Path
from statistics import fmean, pstdev
from typing import Optional, Union

from PIL import Image, ImageDraw, ImageFont


TMP = Path("/private/tmp")

RED_STATIC = TMP / "broodfall-engineer-red-preview-v1.png"
TEAL_STATIC = TMP / "broodfall-engineer-teal-preview-v2.png"

RED_WALK = [TMP / f"broodfall-engineer-walk{i}-red-preview-v1.png" for i in range(1, 9)]
TEAL_WALK = [
    TMP / "broodfall-engineer-walk1-teal-preview-v1.png",
    TMP / "broodfall-engineer-walk2-teal-preview-v3.png",
    *[TMP / f"broodfall-engineer-walk{i}-teal-preview-v1.png" for i in range(3, 9)],
]

RED_DEATH = [
    TMP / "broodfall-engineer-death1-red-preview-v2.png",
    *[TMP / f"broodfall-engineer-death{i}-red-preview-v1.png" for i in range(2, 5)],
]
TEAL_DEATH = [
    TMP / "broodfall-engineer-death1-teal-preview-v1.png",
    TMP / "broodfall-engineer-death2-teal-preview-v1.png",
    TMP / "broodfall-engineer-death3-teal-preview-v2.png",
    TMP / "broodfall-engineer-death4-teal-preview-v2.png",
]

BOARD = TMP / "broodfall-engineer-red-family-contact-v1.png"
WALK_SYNC_GIF = TMP / "broodfall-engineer-teal-red-walk-sync-v1.gif"
DEATH_SYNC_GIF = TMP / "broodfall-engineer-teal-red-death-sync-v1.gif"
METRICS_JSON = TMP / "broodfall-engineer-red-family-metrics-v1.json"

PHASES = [
    "LEFT CONTACT",
    "LEFT COMPRESS",
    "RIGHT PASSING",
    "RIGHT ADVANCE",
    "RIGHT CONTACT",
    "RIGHT COMPRESS",
    "LEFT PASSING",
    "LEFT ADVANCE",
]
DEATH_LABELS = ["HIT / STAGGER", "KNEES BUCKLE", "ACTIVE FALL", "PRONE / STILL"]

BG = (12, 18, 22, 255)
PANEL = (23, 33, 39, 255)
CARD = (31, 44, 50, 255)
INK = (235, 242, 241, 255)
MUTED = (148, 169, 171, 255)
RED = (245, 82, 72, 255)
AQUA = (83, 226, 219, 255)
PASS = (91, 210, 151, 255)
FAIL = (255, 170, 74, 255)

THRESHOLDS = {
    "alpha_mask_threshold": 16,
    "minimum_red_pixels_at_32": 12,
    "maximum_walk_area_cv": 0.12,
    "maximum_walk_placement_center_span_x": 2.0,
    "maximum_walk_placement_center_span_y": 2.0,
    "minimum_walk_pair_iou": 0.68,
    "minimum_death_pair_iou": 0.55,
    "maximum_pair_centroid_distance": 9.0,
    "minimum_pair_area_ratio": 0.68,
    "maximum_pair_area_ratio": 1.47,
}


def font(size: int, bold: bool = False) -> Union[ImageFont.FreeTypeFont, ImageFont.ImageFont]:
    candidates = [
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
        if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def checker(size: tuple[int, int], tile: int = 10) -> Image.Image:
    image = Image.new("RGBA", size, (39, 51, 57, 255))
    draw = ImageDraw.Draw(image)
    colors = ((39, 51, 57, 255), (51, 65, 71, 255))
    for y in range(0, size[1], tile):
        for x in range(0, size[0], tile):
            draw.rectangle(
                (x, y, min(x + tile - 1, size[0] - 1), min(y + tile - 1, size[1] - 1)),
                fill=colors[(x // tile + y // tile) % 2],
            )
    return image


def terrain(size: tuple[int, int], seed: int = 3097) -> Image.Image:
    """Deterministic dark-green battlefield backdrop for scale/readability checks."""
    rng = random.Random(seed)
    image = Image.new("RGBA", size, (34, 45, 38, 255))
    draw = ImageDraw.Draw(image, "RGBA")
    for _ in range(max(1, size[0] * size[1] // 18)):
        x, y = rng.randrange(size[0]), rng.randrange(size[1])
        radius = rng.choice((1, 1, 2, 3))
        offset = rng.randrange(-12, 15)
        draw.ellipse(
            (x - radius, y - radius, x + radius, y + radius),
            fill=(
                max(12, 37 + offset),
                max(20, 49 + offset),
                max(16, 40 + offset // 2),
                rng.randrange(28, 88),
            ),
        )
    for x in range(0, size[0], 32):
        draw.line((x, 0, x, size[1]), fill=(91, 116, 99, 30))
    for y in range(0, size[1], 32):
        draw.line((0, y, size[0], y), fill=(91, 116, 99, 30))
    return image


def load_strict(path: Path) -> Image.Image:
    with Image.open(path) as source:
        if source.size != (256, 256):
            raise ValueError(f"{path.name}: expected 256x256, found {source.size}")
        if source.mode != "RGBA":
            raise ValueError(f"{path.name}: expected RGBA, found {source.mode}")
        return source.copy()


def mask_points(image: Image.Image, threshold: int = 16) -> list[tuple[int, int]]:
    alpha = image.getchannel("A")
    return [
        (index % image.width, index // image.width)
        for index, value in enumerate(alpha.getdata())
        if value > threshold
    ]


def bbox_list(image: Image.Image) -> Optional[list[int]]:
    bbox = image.getchannel("A").getbbox()
    return list(bbox) if bbox else None


def edge_alpha(image: Image.Image) -> dict[str, int]:
    alpha = image.getchannel("A")
    pixels = alpha.load()
    values = []
    for x in range(image.width):
        values.extend((pixels[x, 0], pixels[x, image.height - 1]))
    for y in range(1, image.height - 1):
        values.extend((pixels[0, y], pixels[image.width - 1, y]))
    return {"nonzero_pixels": sum(value > 0 for value in values), "maximum_alpha": max(values)}


def color_counts_at_32(image: Image.Image) -> dict[str, int]:
    small = image.resize((32, 32), Image.Resampling.LANCZOS)
    red_count = 0
    teal_count = 0
    visible_count = 0
    for r, g, b, a in small.getdata():
        if a <= 16:
            continue
        visible_count += 1
        if r >= 72 and r >= g * 1.25 and r >= b * 1.15 and r - g >= 14:
            red_count += 1
        if g >= 72 and g >= r * 1.12 and b >= r * 1.08 and g - r >= 8:
            teal_count += 1
    return {"visible": visible_count, "red": red_count, "teal": teal_count}


def asset_metric(path: Path) -> dict[str, object]:
    image = load_strict(path)
    points = mask_points(image)
    if not points:
        raise ValueError(f"{path.name}: sprite has no visible alpha")
    xs = [point[0] for point in points]
    ys = [point[1] for point in points]
    rgb = image.convert("RGB")
    alpha = image.getchannel("A")
    lumas = [
        0.2126 * r + 0.7152 * g + 0.0722 * b
        for (r, g, b), a in zip(rgb.getdata(), alpha.getdata())
        if a > 16
    ]
    return {
        "path": str(path),
        "mode": image.mode,
        "size": list(image.size),
        "bbox": bbox_list(image),
        "area": len(points),
        "centroid": [round(fmean(xs), 3), round(fmean(ys), 3)],
        "luma": round(fmean(lumas), 3),
        "edge_alpha": edge_alpha(image),
        "at_32px": color_counts_at_32(image),
    }


def pair_metric(red_path: Path, teal_path: Path) -> dict[str, object]:
    red = load_strict(red_path)
    teal = load_strict(teal_path)
    red_mask = [value > 16 for value in red.getchannel("A").getdata()]
    teal_mask = [value > 16 for value in teal.getchannel("A").getdata()]
    intersection = sum(a and b for a, b in zip(red_mask, teal_mask))
    union = sum(a or b for a, b in zip(red_mask, teal_mask))
    red_metric = asset_metric(red_path)
    teal_metric = asset_metric(teal_path)
    red_centroid = red_metric["centroid"]
    teal_centroid = teal_metric["centroid"]
    centroid_distance = math.dist(red_centroid, teal_centroid)
    area_ratio = red_metric["area"] / teal_metric["area"]
    return {
        "red": red_path.name,
        "teal": teal_path.name,
        "silhouette_iou": round(intersection / union, 5),
        "centroid_distance": round(centroid_distance, 3),
        "area_ratio_red_to_teal": round(area_ratio, 5),
    }


def sequence_metric(metrics: list[dict[str, object]]) -> dict[str, object]:
    areas = [entry["area"] for entry in metrics]
    centroids = [entry["centroid"] for entry in metrics]
    mean_area = fmean(areas)
    area_cv = pstdev(areas) / mean_area
    widths = [entry["bbox"][2] - entry["bbox"][0] for entry in metrics]
    heights = [entry["bbox"][3] - entry["bbox"][1] for entry in metrics]
    placement_centers = [
        [
            (entry["bbox"][0] + entry["bbox"][2]) / 2,
            (entry["bbox"][1] + entry["bbox"][3]) / 2,
        ]
        for entry in metrics
    ]
    return {
        "area_cv": round(area_cv, 5),
        "bbox_width_cv": round(pstdev(widths) / fmean(widths), 5),
        "bbox_height_cv": round(pstdev(heights) / fmean(heights), 5),
        # Alpha centroids legitimately move as limbs exchange sides. Preserve
        # that diagnostic, but use bbox centers to validate canvas placement.
        "silhouette_centroid_span": [
            round(max(point[0] for point in centroids) - min(point[0] for point in centroids), 3),
            round(max(point[1] for point in centroids) - min(point[1] for point in centroids), 3),
        ],
        "maximum_consecutive_silhouette_centroid_step": round(
            max(math.dist(centroids[index], centroids[(index + 1) % len(centroids)]) for index in range(len(centroids))),
            3,
        ),
        "placement_center_span": [
            round(max(point[0] for point in placement_centers) - min(point[0] for point in placement_centers), 3),
            round(max(point[1] for point in placement_centers) - min(point[1] for point in placement_centers), 3),
        ],
        "maximum_consecutive_placement_center_step": round(
            max(
                math.dist(placement_centers[index], placement_centers[(index + 1) % len(placement_centers)])
                for index in range(len(placement_centers))
            ),
            3,
        ),
    }


def fit_source(path: Path, size: tuple[int, int], padding: int = 10) -> Image.Image:
    source = load_strict(path)
    bbox = source.getchannel("A").getbbox()
    if bbox is None:
        raise ValueError(f"{path.name}: empty source")
    crop = source.crop(bbox)
    scale = min((size[0] - 2 * padding) / crop.width, (size[1] - 2 * padding) / crop.height)
    sprite = crop.resize((round(crop.width * scale), round(crop.height * scale)), Image.Resampling.LANCZOS)
    stage = checker(size)
    stage.alpha_composite(sprite, ((size[0] - sprite.width) // 2, (size[1] - sprite.height) // 2))
    return stage


def exact_read(path: Path, size: tuple[int, int], seed: int) -> Image.Image:
    stage = terrain(size, seed)
    sprite = load_strict(path).resize((32, 32), Image.Resampling.LANCZOS)
    stage.alpha_composite(sprite, ((size[0] - 32) // 2, (size[1] - 32) // 2))
    return stage


def pixel_read(path: Path, size: int = 96, seed: int = 3097) -> Image.Image:
    small = load_strict(path).resize((32, 32), Image.Resampling.LANCZOS)
    enlarged = small.resize((size, size), Image.Resampling.NEAREST)
    stage = terrain((size, size), seed)
    stage.alpha_composite(enlarged)
    return stage


def centered_text(draw: ImageDraw.ImageDraw, xy: tuple[float, float], text: str, text_font, fill) -> None:
    bbox = draw.textbbox((0, 0), text, font=text_font)
    draw.text((xy[0] - (bbox[2] - bbox[0]) / 2, xy[1]), text, font=text_font, fill=fill)


def draw_card(
    canvas: Image.Image,
    box: tuple[int, int, int, int],
    path: Path,
    title: str,
    subtitle: str,
    metric: dict[str, object],
    seed: int,
) -> None:
    draw = ImageDraw.Draw(canvas)
    x0, y0, x1, y1 = box
    draw.rounded_rectangle(box, radius=14, fill=CARD)
    centered_text(draw, ((x0 + x1) / 2, y0 + 12), title, font(16, True), RED)
    centered_text(draw, ((x0 + x1) / 2, y0 + 36), subtitle, font(11), MUTED)
    source_w = x1 - x0 - 24
    canvas.alpha_composite(fit_source(path, (source_w, 218), padding=9), (x0 + 12, y0 + 62))
    draw.text((x0 + 13, y0 + 289), "EXACT 32×32", font=font(10, True), fill=MUTED)
    terrain_w = source_w - 104
    canvas.alpha_composite(exact_read(path, (terrain_w, 100), seed), (x0 + 12, y0 + 310))
    canvas.alpha_composite(pixel_read(path, 96, seed), (x1 - 108, y0 + 312))
    at_32 = metric["at_32px"]
    centered_text(
        draw,
        ((x0 + x1) / 2, y0 + 417),
        f"{at_32['red']} red px  •  luma {metric['luma']:.1f}",
        font(11),
        RED,
    )


def build_contact_sheet(red_metrics: dict[str, dict[str, object]], report_ok: bool) -> None:
    canvas = Image.new("RGBA", (2200, 1300), BG)
    draw = ImageDraw.Draw(canvas)
    draw.text((52, 28), "ENGINEER RED FAMILY — MOTION APPROVAL", font=font(38, True), fill=INK)
    draw.text(
        (52, 76),
        "North-facing body + upright wrench • source silhouettes + exact 32×32 terrain read • preview only",
        font=font(17),
        fill=MUTED,
    )
    status_text = "AUTOMATED QA PASS" if report_ok else "AUTOMATED QA NEEDS REVIEW"
    status_color = PASS if report_ok else FAIL
    status_box = draw.textbbox((0, 0), status_text, font=font(16, True))
    draw.rounded_rectangle((1920 - (status_box[2] - status_box[0]), 38, 2148, 78), radius=18, fill=(35, 52, 51, 255))
    draw.text((1940 - (status_box[2] - status_box[0]), 48), status_text, font=font(16, True), fill=status_color)

    draw.rounded_rectangle((38, 112, 2162, 610), radius=20, fill=PANEL)
    draw.text((62, 130), "STATIC + EIGHT-FRAME WALK CYCLE", font=font(21, True), fill=INK)
    walk_entries = [("STATIC", "IDENTITY", RED_STATIC)] + [
        (f"FRAME {index}", PHASES[index - 1], path) for index, path in enumerate(RED_WALK, 1)
    ]
    card_w = 222
    gap = 10
    start_x = 62
    for index, (title, subtitle, path) in enumerate(walk_entries):
        x = start_x + index * (card_w + gap)
        draw_card(canvas, (x, 163, x + card_w, 590), path, title, subtitle, red_metrics[path.name], 3100 + index)

    draw.rounded_rectangle((38, 635, 2162, 1260), radius=20, fill=PANEL)
    draw.text((62, 654), "FOUR-FRAME DEATH SEQUENCE", font=font(21, True), fill=INK)
    death_w = 495
    death_gap = 25
    for index, (label, path) in enumerate(zip(DEATH_LABELS, RED_DEATH), 1):
        x = 62 + (index - 1) * (death_w + death_gap)
        box = (x, 691, x + death_w, 1238)
        draw.rounded_rectangle(box, radius=14, fill=CARD)
        centered_text(draw, (x + death_w / 2, 705), f"FRAME {index}  •  {label}", font(17, True), RED)
        canvas.alpha_composite(fit_source(path, (290, 385), padding=10), (x + 15, 745))
        draw.text((x + 323, 760), "EXACT 32×32", font=font(11, True), fill=MUTED)
        canvas.alpha_composite(exact_read(path, (155, 148), 3200 + index), (x + 323, 785))
        canvas.alpha_composite(pixel_read(path, 144, 3200 + index), (x + 328, 951))
        frame_metric = red_metrics[path.name]
        at_32 = frame_metric["at_32px"]
        centered_text(
            draw,
            (x + death_w / 2, 1150),
            f"{at_32['red']} red px  •  bbox {frame_metric['bbox']}  •  luma {frame_metric['luma']:.1f}",
            font(12),
            RED,
        )

    canvas.convert("RGB").save(BOARD, quality=95)


def make_sync_gif(
    teal_paths: list[Path],
    red_paths: list[Path],
    labels: list[str],
    durations: list[int],
    output: Path,
    title: str,
) -> None:
    frames = []
    for frame_index, (teal_path, red_path, label) in enumerate(zip(teal_paths, red_paths, labels)):
        sheet = Image.new("RGBA", (980, 430), BG)
        draw = ImageDraw.Draw(sheet)
        draw.text((28, 20), f"ENGINEER TEAL ↔ RED  •  {title}  •  {label}", font=font(23, True), fill=INK)
        for index, (name, path, accent) in enumerate((("TEAL", teal_path, AQUA), ("RED", red_path, RED))):
            x = 25 + index * 475
            draw.rounded_rectangle((x, 68, x + 455, 402), radius=18, fill=PANEL)
            draw.text((x + 22, 87), f"{name}  •  ACTUAL 32×32 + 8× PIXEL VIEW", font=font(16, True), fill=accent)
            field = exact_read(path, (120, 250), 4100 + frame_index)
            sheet.alpha_composite(field, (x + 20, 130))
            small = load_strict(path).resize((32, 32), Image.Resampling.LANCZOS)
            big = small.resize((256, 256), Image.Resampling.NEAREST)
            inspect = terrain((270, 250), 4100 + frame_index)
            inspect.alpha_composite(big, ((270 - 256) // 2, (250 - 256) // 2))
            sheet.alpha_composite(inspect, (x + 160, 130))
        frames.append(sheet.convert("P", palette=Image.Palette.ADAPTIVE, colors=255))
    frames[0].save(output, save_all=True, append_images=frames[1:], duration=durations, loop=0, disposal=2)


def main() -> None:
    required = [RED_STATIC, TEAL_STATIC, *RED_WALK, *TEAL_WALK, *RED_DEATH, *TEAL_DEATH]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise SystemExit("Missing required input(s):\n" + "\n".join(missing))

    red_paths = [RED_STATIC, *RED_WALK, *RED_DEATH]
    teal_paths = [TEAL_STATIC, *TEAL_WALK, *TEAL_DEATH]
    red_metrics = {path.name: asset_metric(path) for path in red_paths}
    teal_metrics = {path.name: asset_metric(path) for path in teal_paths}
    static_pair = pair_metric(RED_STATIC, TEAL_STATIC)
    walk_pairs = [pair_metric(red, teal) for red, teal in zip(RED_WALK, TEAL_WALK)]
    death_pairs = [pair_metric(red, teal) for red, teal in zip(RED_DEATH, TEAL_DEATH)]
    walk_sequence = sequence_metric([red_metrics[path.name] for path in RED_WALK])

    errors: list[str] = []
    for metric in red_metrics.values():
        if metric["mode"] != "RGBA" or metric["size"] != [256, 256]:
            errors.append(f"{Path(metric['path']).name}: not 256x256 RGBA")
        if metric["edge_alpha"]["nonzero_pixels"] != 0:
            errors.append(f"{Path(metric['path']).name}: nonzero edge alpha")
        if metric["at_32px"]["red"] < THRESHOLDS["minimum_red_pixels_at_32"]:
            errors.append(f"{Path(metric['path']).name}: insufficient red at 32px")

    if walk_sequence["area_cv"] > THRESHOLDS["maximum_walk_area_cv"]:
        errors.append(f"walk area CV {walk_sequence['area_cv']:.4f} exceeds threshold")
    if walk_sequence["placement_center_span"][0] > THRESHOLDS["maximum_walk_placement_center_span_x"]:
        errors.append(f"walk placement-center x-span {walk_sequence['placement_center_span'][0]:.3f} exceeds threshold")
    if walk_sequence["placement_center_span"][1] > THRESHOLDS["maximum_walk_placement_center_span_y"]:
        errors.append(f"walk placement-center y-span {walk_sequence['placement_center_span'][1]:.3f} exceeds threshold")

    for kind, pairs, minimum_iou in (
        ("walk", walk_pairs, THRESHOLDS["minimum_walk_pair_iou"]),
        ("death", death_pairs, THRESHOLDS["minimum_death_pair_iou"]),
    ):
        for index, pair in enumerate(pairs, 1):
            if pair["silhouette_iou"] < minimum_iou:
                errors.append(f"{kind} {index}: pose IoU {pair['silhouette_iou']:.4f} below threshold")
            if pair["centroid_distance"] > THRESHOLDS["maximum_pair_centroid_distance"]:
                errors.append(f"{kind} {index}: paired centroid distance {pair['centroid_distance']:.3f} exceeds threshold")
            ratio = pair["area_ratio_red_to_teal"]
            if not THRESHOLDS["minimum_pair_area_ratio"] <= ratio <= THRESHOLDS["maximum_pair_area_ratio"]:
                errors.append(f"{kind} {index}: paired silhouette area ratio {ratio:.4f} outside threshold")

    report = {
        "schema": "broodfall.sprite-family-qa.v1",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "preview_only": True,
        "family": "engineer-red",
        "thresholds": THRESHOLDS,
        "validation": {"passed": not errors, "errors": errors},
        "red_assets": red_metrics,
        "teal_reference_assets": teal_metrics,
        "static_pose_pair": static_pair,
        "walk_sequence": walk_sequence,
        "walk_pose_pairs": walk_pairs,
        "death_pose_pairs": death_pairs,
        "outputs": {
            "contact_sheet": str(BOARD),
            "walk_sync_gif": str(WALK_SYNC_GIF),
            "death_sync_gif": str(DEATH_SYNC_GIF),
            "metrics": str(METRICS_JSON),
        },
    }

    build_contact_sheet(red_metrics, not errors)
    make_sync_gif(
        TEAL_WALK,
        RED_WALK,
        [f"{index}/8  {PHASES[index - 1]}" for index in range(1, 9)],
        [115] * 8,
        WALK_SYNC_GIF,
        "WALK",
    )
    make_sync_gif(
        [TEAL_STATIC, *TEAL_DEATH],
        [RED_STATIC, *RED_DEATH],
        ["STATIC", *DEATH_LABELS],
        [420, 135, 145, 175, 800],
        DEATH_SYNC_GIF,
        "DEATH",
    )
    METRICS_JSON.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")

    print(f"PASS={str(not errors).lower()}")
    print(f"BOARD={BOARD}")
    print(f"WALK_SYNC_GIF={WALK_SYNC_GIF}")
    print(f"DEATH_SYNC_GIF={DEATH_SYNC_GIF}")
    print(f"METRICS_JSON={METRICS_JSON}")
    print(f"RED_WALK_AREA_CV={walk_sequence['area_cv']:.5f}")
    print(f"RED_WALK_PLACEMENT_CENTER_SPAN={walk_sequence['placement_center_span']}")
    print(f"RED_WALK_SILHOUETTE_CENTROID_SPAN={walk_sequence['silhouette_centroid_span']}")
    print("WALK_PAIR_IOU=" + ",".join(f"{pair['silhouette_iou']:.4f}" for pair in walk_pairs))
    print("DEATH_PAIR_IOU=" + ",".join(f"{pair['silhouette_iou']:.4f}" for pair in death_pairs))
    if errors:
        print("VALIDATION_ERRORS:")
        for error in errors:
            print(f"- {error}")


if __name__ == "__main__":
    main()
