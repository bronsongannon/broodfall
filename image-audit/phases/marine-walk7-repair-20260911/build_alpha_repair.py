#!/usr/bin/env python3
"""Repair internal alpha erosion without changing Marine walk-7 RGB or silhouette."""
from collections import deque
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[3]
SOURCE = Path(__file__).resolve().parent / "before/unit_marine_walk7_red.png"
OUTPUT = Path(__file__).resolve().parent / "preview/unit_marine_walk7_red-alpha-repair.png"

image = Image.open(SOURCE).convert("RGBA")
width, height = image.size
pixels = list(image.getdata())
alpha = [p[3] for p in pixels]

# Treat alpha > 16 as visible subject, then flood the outside from the canvas
# border. Everything not reached is inside the approved outer silhouette.
subject = bytearray(1 if value > 16 else 0 for value in alpha)
outside = bytearray(width * height)
queue = deque()

def seed(index):
    if not subject[index] and not outside[index]:
        outside[index] = 1
        queue.append(index)

for x in range(width):
    seed(x)
    seed((height - 1) * width + x)
for y in range(height):
    seed(y * width)
    seed(y * width + width - 1)
while queue:
    index = queue.popleft()
    x, y = index % width, index // width
    if x: seed(index - 1)
    if x + 1 < width: seed(index + 1)
    if y: seed(index - width)
    if y + 1 < height: seed(index + width)

# Preserve the antialiased outside edge. Promote all interior visible pixels and
# enclosed pinholes to opaque, using their original RGB values unchanged.
edge = bytearray(outside)
for _ in range(2):
    grown = bytearray(edge)
    for index, value in enumerate(edge):
        if not value:
            continue
        x, y = index % width, index // width
        if x: grown[index - 1] = 1
        if x + 1 < width: grown[index + 1] = 1
        if y: grown[index - width] = 1
        if y + 1 < height: grown[index + width] = 1
    edge = grown

result = []
for index, (r, g, b, a) in enumerate(pixels):
    if not outside[index] and not edge[index]:
        a = 255
    result.append((r, g, b, a))
image.putdata(result)
image.save(OUTPUT)

# Approval sheet: current, alpha-only candidate, unchanged aqua, and game size.
font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
sheet = Image.new("RGB", (900, 278), "#18201e")
draw = ImageDraw.Draw(sheet)
draw.text((20, 16), "MARINE WALK 7 — ALPHA-ONLY REPAIR", font=font, fill="#edf4ef")
items = [
    ("Current red", Image.open(SOURCE).convert("RGBA")),
    ("Repair candidate", Image.open(OUTPUT).convert("RGBA")),
    ("Aqua unchanged", Image.open(ROOT / "assets/sprites/unit_marine_walk7_teal.png").convert("RGBA")),
]
for column, (label, sprite) in enumerate(items):
    x = 20 + column * 285
    draw.text((x, 50), label, font=font, fill="#ced9d2")
    tile = Image.new("RGBA", (260, 190), (0, 0, 0, 0))
    tiledraw = ImageDraw.Draw(tile)
    for y in range(0, 190, 10):
        for xx in range(0, 170, 10):
            color = "#cbd0cc" if (xx // 10 + y // 10) % 2 else "#959c97"
            tiledraw.rectangle((xx, y, min(xx + 9, 169), min(y + 9, 189)), fill=color)
    tiledraw.rectangle((170, 0, 259, 189), fill="#394939")
    tile.alpha_composite(sprite.resize((166, 166), Image.Resampling.LANCZOS), (2, 8))
    tile.alpha_composite(sprite.resize((30, 30), Image.Resampling.LANCZOS), (200, 68))
    tiledraw.text((193, 110), "30 px", font=small, fill="#e7efe7")
    sheet.paste(tile.convert("RGB"), (x, 78))
sheet.save(Path(__file__).resolve().parent / "marine-walk7-repair-comparison.png", optimize=True)
print(OUTPUT)
