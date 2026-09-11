#!/usr/bin/env python3
"""Prepare imagegen candidates and a read-only approval sheet. Never installs sprites."""
import hashlib
import json
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
sys.path.insert(0, str(ROOT / "image-audit"))
from process_generated_sprite import clear_opaque_background, normalize
from validate_human_families import mask_stats, alpha_iou

JOBS = json.loads((HERE / "prompts.json").read_text())["jobs"]
# Seeds are visibly empty, enclosed gaps in the generated cutouts, not body parts.
# Clear only neutral checkerboard connected to each seed; dark outlines stop the flood.
GAPS = {
    "unit_marine_hunker_teal": [(455, 603), (392, 891), (855, 909), (700, 491)],
    "unit_marine_death3_red": [],
    "unit_marine_death4_red": [(844, 777)],
}


def clear_gap(image, seed):
    pixels = image.load()
    queue = deque([seed])
    seen = set()
    removed = 0
    while queue:
        x, y = queue.popleft()
        if (x, y) in seen or not (0 <= x < image.width and 0 <= y < image.height):
            continue
        seen.add((x, y))
        r, g, b, a = pixels[x, y]
        if not a or min(r, g, b) < 150 or max(r, g, b) - min(r, g, b) > 15:
            continue
        pixels[x, y] = (0, 0, 0, 0)
        removed += 1
        queue.extend([(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)])
    if removed > 10000:
        raise ValueError(f"Gap flood too large: {seed}: {removed}")
    return removed


def clean_stats(path):
    return {k: v for k, v in mask_stats(path).items() if k not in ("mask", "exterior_mask")}


rows = []
report = {"status": "unapproved-preview-not-installed", "candidates": []}
for job in JOBS:
    key = job["key"]
    old = HERE / "before" / (key + ".png")
    tolerance = 105 if "hunker" in key else 85
    raw = Image.open(HERE / "raw" / (key + ".png"))
    cleaned = clear_opaque_background(raw, tolerance)
    gap_counts = [clear_gap(cleaned, seed) for seed in GAPS[key]]
    candidate = HERE / "preview" / (key + "-candidate.png")
    normalize(cleaned, (256, 256), 14, tolerance).save(candidate)
    opposite = ROOT / "assets/sprites" / (key.replace("teal", "red") + ".png" if "teal" in key else key.replace("red", "teal") + ".png")
    before, after = mask_stats(old), mask_stats(candidate)
    info = {"key": key, "before": clean_stats(old), "after": clean_stats(candidate),
            "background_tolerance": tolerance, "gap_seeds": GAPS[key], "gap_pixels_cleared": gap_counts,
            "before_after_exterior_iou": round(alpha_iou(before, after, "exterior_mask"), 5),
            "source_sha256": hashlib.sha256(old.read_bytes()).hexdigest(),
            "candidate_sha256": hashlib.sha256(candidate.read_bytes()).hexdigest()}
    report["candidates"].append(info)
    rows.append((key, old, candidate, opposite))

# Contact sheet only: PNGs are composited on contrast/terrain backgrounds, not edited.
sheet = Image.new("RGB", (900, 840), "#18201e")
draw = ImageDraw.Draw(sheet)
font_path = "/System/Library/Fonts/Helvetica.ttc"
font = ImageFont.truetype(font_path, 18)
small = ImageFont.truetype(font_path, 14)
draw.text((24, 18), "MARINE TRANSPARENCY REPAIR — PREVIEW ONLY", font=font, fill="#edf4ef")
for x, label in [(24, "Current"), (318, "Repair candidate"), (612, "Other team · unchanged")]:
    draw.text((x, 52), label, font=font, fill="#ced9d2")
for i, (key, old, candidate, opposite) in enumerate(rows):
    top = 89 + i * 238
    label = "Aqua hunker" if "hunker" in key else "Red death · frame " + ("3" if "death3" in key else "4")
    draw.text((24, top), label, font=font, fill="#edf4ef")
    for j, path in enumerate([old, candidate, opposite]):
        x, y = 24 + j * 294, top + 30
        tile = Image.new("RGBA", (270, 184), "#858a87")
        td = ImageDraw.Draw(tile)
        for yy in range(0, 184, 10):
            for xx in range(0, 178, 10):
                td.rectangle((xx, yy, min(xx + 9, 177), yy + 9), fill="#c7ccc8" if (xx // 10 + yy // 10) % 2 else "#a2a9a3")
        td.rectangle((178, 0, 269, 183), fill="#394939")
        sprite = Image.open(path).convert("RGBA")
        tile.alpha_composite(sprite.resize((176, 176), Image.Resampling.LANCZOS), (0, 4))
        tile.alpha_composite(sprite.resize((30, 30), Image.Resampling.LANCZOS), (209, 71))
        td.text((200, 122), "30 px", font=small, fill="#e7efe7")
        sheet.paste(tile.convert("RGB"), (x, y))
draw.text((24, 812), "Enlarged on checkerboard + 30 px on moss · no production files changed", font=small, fill="#ced9d2")
sheet.save(HERE / "marine-repair-comparison.png")
(HERE / "qa.json").write_text(json.dumps(report, indent=2) + "\n")
for item in report["candidates"]:
    print(item["key"], "opacity", item["before"]["opaque_fraction_of_nonzero"], "->", item["after"]["opaque_fraction_of_nonzero"], "exterior IoU", item["before_after_exterior_iou"], "gap pixels", item["gap_pixels_cleared"])
