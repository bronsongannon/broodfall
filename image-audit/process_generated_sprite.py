#!/usr/bin/env python3
"""Normalize a generated sprite while preserving its proportions and alpha edges.

Built-in image generation occasionally returns an opaque, baked checkerboard even
when transparency was requested.  This script flood-clears only the border-connected
background, then proportionally fits the surviving artwork inside a padded RGBA
canvas.  It never stretches the subject.

Usage:
    python3 image-audit/process_generated_sprite.py INPUT OUTPUT
    python3 image-audit/process_generated_sprite.py INPUT OUTPUT --canvas 256x209
"""

from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path

from PIL import Image


def parse_canvas(value: str) -> tuple[int, int]:
    try:
        width, height = (int(part) for part in value.lower().split("x", 1))
    except (TypeError, ValueError) as exc:
        raise argparse.ArgumentTypeError("canvas must look like WIDTHxHEIGHT") from exc
    if width <= 0 or height <= 0:
        raise argparse.ArgumentTypeError("canvas dimensions must be positive")
    return width, height


def close_to_background(pixel: tuple[int, int, int, int], bg: tuple[int, int, int], tolerance: int) -> bool:
    return max(abs(pixel[channel] - bg[channel]) for channel in range(3)) <= tolerance


def clear_opaque_background(image: Image.Image, tolerance: int) -> Image.Image:
    """Clear only background-colored pixels connected to the canvas border."""
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    if alpha.getextrema()[0] < 255:
        return rgba

    width, height = rgba.size
    px = rgba.load()
    corners = [px[0, 0], px[width - 1, 0], px[0, height - 1], px[width - 1, height - 1]]
    bg = tuple(sorted(c[channel] for c in corners)[len(corners) // 2] for channel in range(3))

    seen = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        idx = y * width + x
        if not seen[idx] and close_to_background(px[x, y], bg, tolerance):
            seen[idx] = 1
            queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        px[x, y] = (0, 0, 0, 0)
        if x > 0:
            enqueue(x - 1, y)
        if x + 1 < width:
            enqueue(x + 1, y)
        if y > 0:
            enqueue(x, y - 1)
        if y + 1 < height:
            enqueue(x, y + 1)

    return rgba


def normalize(image: Image.Image, canvas: tuple[int, int], padding: int, tolerance: int) -> Image.Image:
    rgba = clear_opaque_background(image, tolerance)
    alpha = rgba.getchannel("A")
    bbox = alpha.point(lambda value: 255 if value > 2 else 0).getbbox()
    if not bbox:
        raise ValueError("no visible artwork remained after background clearing")

    artwork = rgba.crop(bbox)
    target_width, target_height = canvas
    usable_width = target_width - padding * 2
    usable_height = target_height - padding * 2
    if usable_width <= 0 or usable_height <= 0:
        raise ValueError("padding leaves no usable canvas area")

    scale = min(usable_width / artwork.width, usable_height / artwork.height)
    size = (max(1, round(artwork.width * scale)), max(1, round(artwork.height * scale)))
    artwork = artwork.resize(size, Image.Resampling.LANCZOS)

    result = Image.new("RGBA", canvas, (0, 0, 0, 0))
    offset = ((target_width - size[0]) // 2, (target_height - size[1]) // 2)
    result.alpha_composite(artwork, offset)

    # Remove resampling dust while retaining the antialiased edge ramp.
    out_alpha = result.getchannel("A").point(lambda value: 0 if value <= 1 else value)
    result.putalpha(out_alpha)
    return result


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--canvas", type=parse_canvas, default=(256, 256))
    parser.add_argument("--padding", type=int, default=14)
    parser.add_argument("--background-tolerance", type=int, default=38)
    args = parser.parse_args()

    with Image.open(args.input) as source:
        result = normalize(source, args.canvas, args.padding, args.background_tolerance)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.save(args.output)

    alpha = result.getchannel("A")
    print(
        f"{args.input.name} -> {args.output} "
        f"canvas={result.width}x{result.height} alpha={alpha.getextrema()} bbox={alpha.getbbox()}"
    )


if __name__ == "__main__":
    main()
