#!/usr/bin/env python3
"""Validate complete Broodfall human-soldier sprite families.

The checks are intentionally animation-aware: all production files must be
present, padded RGBA images; teal/red counterparts must retain nearly the same
raw alpha footprint and exterior silhouette; and the standing/walk sequence
must keep a stable center and occupied area so it cannot visibly drift or pulse
when played in the game.
Death poses are checked for file hygiene and faction geometry, but excluded
from gait-stability statistics because their footprint is meant to change.
"""

from __future__ import annotations

import argparse
from collections import deque
import json
import math
from pathlib import Path
from statistics import mean, pstdev

from PIL import Image


FAMILIES = {
    "marine": {"colors": ("teal", "red"), "hunker": True},
    "engineer": {"colors": ("teal", "red"), "hunker": False},
    "sniper": {"colors": ("teal", "red"), "hunker": True},
    "medic": {"colors": ("teal", "red"), "hunker": False},
    "rocket": {"colors": ("teal", "red"), "hunker": False},
    "commando": {"colors": ("teal",), "hunker": False},
}


def frames(family: str, hunker: bool) -> list[tuple[str, str]]:
    result = [("static", f"unit_{family}_{{color}}.png")]
    result.extend((f"walk{number}", f"unit_{family}_walk{number}_{{color}}.png") for number in range(1, 9))
    result.extend((f"death{number}", f"unit_{family}_death{number}_{{color}}.png") for number in range(1, 5))
    if hunker:
        result.append(("hunker", f"unit_{family}_hunker_{{color}}.png"))
    return result


def fill_enclosed_mask_holes(mask: bytes, width: int, height: int) -> bytes:
    """Return the outer silhouette while preserving edge-connected cutouts.

    Image-to-image recolors can vary tiny transparent pinholes in dark internal
    linework even when the actual outline, pose, and equipment are locked.  A
    flood fill from the canvas edge distinguishes those enclosed holes from the
    exterior/background and from any negative space that opens to the exterior.
    """

    exterior = bytearray(width * height)
    queue: deque[int] = deque()

    def seed(index: int) -> None:
        if not mask[index] and not exterior[index]:
            exterior[index] = 1
            queue.append(index)

    for x in range(width):
        seed(x)
        seed((height - 1) * width + x)
    for y in range(height):
        seed(y * width)
        seed(y * width + width - 1)

    while queue:
        index = queue.popleft()
        x = index % width
        y = index // width
        if x:
            seed(index - 1)
        if x + 1 < width:
            seed(index + 1)
        if y:
            seed(index - width)
        if y + 1 < height:
            seed(index + width)

    return bytes(0 if exterior[index] else 1 for index in range(width * height))


def component_stats(mask: bytes, width: int, height: int) -> tuple[int, float]:
    """Count 8-connected subject components and return largest-area share."""

    seen = bytearray(width * height)
    sizes: list[int] = []
    for start, occupied in enumerate(mask):
        if not occupied or seen[start]:
            continue
        seen[start] = 1
        stack = [start]
        size = 0
        while stack:
            index = stack.pop()
            size += 1
            x = index % width
            y = index // width
            for dy in (-1, 0, 1):
                ny = y + dy
                if ny < 0 or ny >= height:
                    continue
                for dx in (-1, 0, 1):
                    nx = x + dx
                    if (dx == 0 and dy == 0) or nx < 0 or nx >= width:
                        continue
                    neighbor = ny * width + nx
                    if mask[neighbor] and not seen[neighbor]:
                        seen[neighbor] = 1
                        stack.append(neighbor)
        sizes.append(size)
    total = sum(sizes)
    return len(sizes), (max(sizes) / total if total else 0.0)


def mask_stats(path: Path) -> dict[str, object]:
    with Image.open(path) as opened:
        original_mode = opened.mode
        image = opened.convert("RGBA")
    alpha = image.getchannel("A")
    extrema = alpha.getextrema()
    bbox = alpha.getbbox()
    width, height = image.size
    border = max(
        max(alpha.crop((0, 0, width, 1)).getdata()),
        max(alpha.crop((0, height - 1, width, height)).getdata()),
        max(alpha.crop((0, 0, 1, height)).getdata()),
        max(alpha.crop((width - 1, 0, width, height)).getdata()),
    )
    values = list(alpha.getdata())
    weight = sum(values)
    nonzero_pixels = sum(value > 0 for value in values)
    opaque_pixels = sum(value >= 250 for value in values)
    if weight:
        centroid_x = sum((index % width) * value for index, value in enumerate(values)) / weight
        centroid_y = sum((index // width) * value for index, value in enumerate(values)) / weight
    else:
        centroid_x = centroid_y = math.nan
    mask = bytes(1 if value > 16 else 0 for value in values)
    mask_image = Image.frombytes("L", (width, height), bytes(255 if value else 0 for value in mask))
    mask_bbox = mask_image.getbbox()
    exterior_mask = fill_enclosed_mask_holes(mask, width, height)
    component_count, largest_component_share = component_stats(mask, width, height)
    occupied = sum(mask)
    bbox_center = [
        round((bbox[0] + bbox[2] - 1) / 2, 3),
        round((bbox[1] + bbox[3] - 1) / 2, 3),
    ] if bbox else [math.nan, math.nan]
    mask_bbox_center = [
        round((mask_bbox[0] + mask_bbox[2] - 1) / 2, 3),
        round((mask_bbox[1] + mask_bbox[3] - 1) / 2, 3),
    ] if mask_bbox else [math.nan, math.nan]
    safe_padding = min(
        mask_bbox[0], mask_bbox[1], width - mask_bbox[2], height - mask_bbox[3]
    ) if mask_bbox else -1
    return {
        "path": str(path),
        "size": [width, height],
        "mode": original_mode,
        "alpha_extrema": list(extrema),
        "bbox": list(bbox) if bbox else None,
        "bbox_center": bbox_center,
        "threshold_16_bbox": list(mask_bbox) if mask_bbox else None,
        "threshold_16_bbox_center": mask_bbox_center,
        "safe_padding_px": safe_padding,
        "border_alpha_max": border,
        "centroid": [round(centroid_x, 3), round(centroid_y, 3)],
        "occupied_pixels": occupied,
        "nonzero_pixels": nonzero_pixels,
        "opaque_pixels": opaque_pixels,
        "opaque_fraction_of_nonzero": round(opaque_pixels / nonzero_pixels, 5) if nonzero_pixels else 0.0,
        "threshold_16_component_count": component_count,
        "largest_component_share": round(largest_component_share, 6),
        "mask": mask,
        "exterior_mask": exterior_mask,
    }


def alpha_iou(left: dict[str, object], right: dict[str, object], key: str = "mask") -> float:
    pairs = zip(left[key], right[key])
    intersection = union = 0
    for a, b in pairs:
        intersection += bool(a and b)
        union += bool(a or b)
    return intersection / union if union else 1.0


def validate_family(sprite_dir: Path, family: str) -> dict[str, object]:
    spec = FAMILIES[family]
    poses = frames(family, bool(spec["hunker"]))
    files: dict[str, dict[str, object]] = {}
    errors: list[str] = []
    warnings: list[str] = []

    for color in spec["colors"]:
        for pose, template in poses:
            path = sprite_dir / template.format(color=color)
            key = f"{pose}_{color}"
            if not path.is_file():
                errors.append(f"missing {path.name}")
                continue
            stats = mask_stats(path)
            files[key] = stats
            if stats["size"] != [256, 256]:
                errors.append(f"{path.name}: expected 256x256, got {stats['size']}")
            if stats["mode"] != "RGBA":
                errors.append(f"{path.name}: expected RGBA, got {stats['mode']}")
            if stats["alpha_extrema"] != [0, 255]:
                errors.append(f"{path.name}: alpha extrema are {stats['alpha_extrema']}, expected [0, 255]")
            if stats["border_alpha_max"] != 0:
                errors.append(f"{path.name}: alpha touches canvas edge ({stats['border_alpha_max']})")
            if not stats["bbox"]:
                errors.append(f"{path.name}: empty alpha mask")
            padding = stats["safe_padding_px"]
            if padding < 10:
                errors.append(f"{path.name}: safe alpha padding is only {padding}px")
            elif padding < 14:
                warnings.append(f"{path.name}: safe alpha padding {padding}px is below the 14px target")
            component_share = stats["largest_component_share"]
            if component_share < 0.98:
                errors.append(
                    f"{path.name}: largest alpha component is only {component_share:.4f} of the subject"
                )
            elif component_share < 0.995:
                warnings.append(
                    f"{path.name}: largest alpha component share {component_share:.4f} requires detached-island review"
                )
            opacity = stats["opaque_fraction_of_nonzero"]
            if opacity < 0.80:
                errors.append(
                    f"{path.name}: only {opacity:.3f} of visible pixels are opaque; "
                    "possible translucent ghost or baked shadow"
                )
            elif opacity < 0.85:
                warnings.append(
                    f"{path.name}: opaque-pixel fraction {opacity:.3f} is below the 0.85 review target"
                )
            if pose == "static" or pose.startswith("walk") or pose == "hunker":
                center = stats["threshold_16_bbox_center"]
                center_error = max(abs(center[0] - 127.5), abs(center[1] - 127.5))
                if center_error > 2:
                    errors.append(
                        f"{path.name}: standing/gait pivot is {center_error:.2f}px off canvas center"
                    )

    pair_ious: dict[str, float] = {}
    exterior_pair_ious: dict[str, float] = {}
    if tuple(spec["colors"]) == ("teal", "red"):
        for pose, _ in poses:
            teal = files.get(f"{pose}_teal")
            red = files.get(f"{pose}_red")
            if not teal or not red:
                continue
            raw_iou = alpha_iou(teal, red)
            exterior_iou = alpha_iou(teal, red, "exterior_mask")
            pair_ious[pose] = round(raw_iou, 5)
            exterior_pair_ious[pose] = round(exterior_iou, 5)
            pair_iou = min(raw_iou, exterior_iou)
            if pair_iou < 0.95:
                errors.append(
                    f"{pose}: teal/red pair IoU is below 0.95 "
                    f"(raw {raw_iou:.5f}, exterior {exterior_iou:.5f})"
                )
            elif pair_iou < 0.96:
                warnings.append(
                    f"{pose}: teal/red pair IoU is below the 0.96 review target "
                    f"(raw {raw_iou:.5f}, exterior {exterior_iou:.5f})"
                )

    gait: dict[str, object] = {}
    for color in spec["colors"]:
        keys = [f"static_{color}"] + [f"walk{number}_{color}" for number in range(1, 9)]
        sequence = [files[key] for key in keys if key in files]
        if len(sequence) != 9:
            continue
        xs = [entry["centroid"][0] for entry in sequence]
        ys = [entry["centroid"][1] for entry in sequence]
        bbox_xs = [entry["threshold_16_bbox_center"][0] for entry in sequence]
        bbox_ys = [entry["threshold_16_bbox_center"][1] for entry in sequence]
        areas = [entry["occupied_pixels"] for entry in sequence]
        center_span = max(max(xs) - min(xs), max(ys) - min(ys))
        bbox_center_span = max(max(bbox_xs) - min(bbox_xs), max(bbox_ys) - min(bbox_ys))
        area_cv = pstdev(areas) / mean(areas)
        gait[color] = {
            "centroid_x_range": [min(xs), max(xs)],
            "centroid_y_range": [min(ys), max(ys)],
            "max_alpha_centroid_span_px": round(center_span, 3),
            "bbox_center_x_range": [min(bbox_xs), max(bbox_xs)],
            "bbox_center_y_range": [min(bbox_ys), max(bbox_ys)],
            "max_bbox_center_span_px": round(bbox_center_span, 3),
            "occupied_area_cv": round(area_cv, 5),
        }
        if bbox_center_span > 2:
            warnings.append(f"{color} gait bounding-box center spans {bbox_center_span:.2f}px on source canvas")
        if area_cv > 0.12:
            warnings.append(f"{color} gait occupied-area CV is {area_cv:.3f}")

    for stats in files.values():
        stats.pop("mask", None)
        stats.pop("exterior_mask", None)
    return {
        "family": family,
        "expected_files": len(poses) * len(spec["colors"]),
        "present_files": len(files),
        "teal_red_alpha_iou": pair_ious,
        "teal_red_exterior_silhouette_iou": exterior_pair_ious,
        "gait_stability": gait,
        "errors": errors,
        "warnings": warnings,
        "files": files,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("families", nargs="*", metavar="FAMILY")
    parser.add_argument("--sprites", type=Path, default=Path("assets/sprites"))
    parser.add_argument("--json", type=Path)
    args = parser.parse_args()

    selected = args.families or list(FAMILIES)
    unknown = [family for family in selected if family not in FAMILIES]
    if unknown:
        parser.error(f"unknown family: {', '.join(unknown)}")
    report = {family: validate_family(args.sprites, family) for family in selected}
    if args.json:
        args.json.parent.mkdir(parents=True, exist_ok=True)
        args.json.write_text(json.dumps(report, indent=2) + "\n")

    failed = False
    for family, result in report.items():
        raw_ious = list(result["teal_red_alpha_iou"].values())
        exterior_ious = list(result["teal_red_exterior_silhouette_iou"].values())
        iou_text = (
            f" exterior_iou={min(exterior_ious):.5f}..{max(exterior_ious):.5f}"
            f" raw_iou={min(raw_ious):.5f}..{max(raw_ious):.5f}"
            if exterior_ious else ""
        )
        print(
            f"{family}: {result['present_files']}/{result['expected_files']} files"
            f"{iou_text} errors={len(result['errors'])} warnings={len(result['warnings'])}"
        )
        for message in result["errors"]:
            print(f"  ERROR: {message}")
        for message in result["warnings"]:
            print(f"  WARN: {message}")
        failed = failed or bool(result["errors"])
    raise SystemExit(1 if failed else 0)


if __name__ == "__main__":
    main()
