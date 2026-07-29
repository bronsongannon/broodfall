#!/usr/bin/env python3
"""Cut a hand-laid-out death sheet into game frames, de-rotating as it goes.

Usage:
  python3 slice_sheet.py <sheet.png> <unit_type> <colorway> <layout> [rot1,rot2,...]
  python3 slice_sheet.py "screecher death.png" screecher wild 2x2 0,-72,-115,-90
  python3 slice_sheet.py "Ironback death.png" ironback wild 4x1 0,0,0,-32

Why this exists alongside slice_death.py: that one segments a tight horizontal
band by x-projection. Generators keep returning 2x2 grids and, worse, frames
drawn at DIFFERENT ROTATIONS — which is fatal here, because the engine rotates
a corpse to the unit's facing angle, so a pre-rotated frame makes the body spin
as it dies. Every frame must end up head-up like the static sprite.

`layout` is CxR (2x2, 4x1). `rot` is per-frame degrees, counter-clockwise
positive, applied before cropping. Output frames are area-normalized to the
unit's static colorway sprite, exactly like the other slicers, so the corpse
doesn't change size mid-animation.
"""
import sys, os
import numpy as np
from PIL import Image

OUT_SIZE = 256
BG_TOL = 38

def alpha_from_bg(im):
    """Background -> transparent by border flood, same idea as process_sprite."""
    from collections import deque
    rgb = np.array(im.convert('RGB')).astype(np.int16)
    h, w, _ = rgb.shape
    corners = np.concatenate([rgb[:6, :6].reshape(-1, 3), rgb[:6, -6:].reshape(-1, 3),
                              rgb[-6:, :6].reshape(-1, 3), rgb[-6:, -6:].reshape(-1, 3)])
    bg = corners.mean(0)
    floodable = np.abs(rgb - bg).sum(2) < BG_TOL
    seen = np.zeros((h, w), bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if floodable[y, x] and not seen[y, x]:
                seen[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if floodable[y, x] and not seen[y, x]:
                seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and floodable[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx))
    out = im.convert('RGBA')
    a = np.array(out)
    a[..., 3] = np.where(seen, 0, 255)
    return Image.fromarray(a)

def biggest_blob(im, min_frac=0.02):
    """Keep the largest opaque component — kills watermarks and stray specks."""
    from collections import deque
    a = np.array(im)
    keep = a[..., 3] > 8
    h, w = keep.shape
    lbl = np.zeros((h, w), np.int32); sizes = [0]; cur = 0
    for y0 in range(h):
        for x0 in range(w):
            if keep[y0, x0] and not lbl[y0, x0]:
                cur += 1; n = 0
                q = deque([(y0, x0)]); lbl[y0, x0] = cur
                while q:
                    y, x = q.popleft(); n += 1
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < h and 0 <= nx < w and keep[ny, nx] and not lbl[ny, nx]:
                            lbl[ny, nx] = cur; q.append((ny, nx))
                sizes.append(n)
    if cur == 0: return im
    main = int(np.argmax(sizes))
    a[..., 3] = np.where(lbl == main, a[..., 3], 0)
    return Image.fromarray(a)

def crop_to_content(im, pad=8):
    a = np.array(im)[..., 3]
    ys, xs = np.where(a > 8)
    if not len(ys): return im
    y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
    return im.crop((max(0, x0 - pad), max(0, y0 - pad),
                    min(im.width, x1 + pad), min(im.height, y1 + pad)))

def main():
    sheet, utype, cw, layout = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
    cols, rows = (int(v) for v in layout.lower().split('x'))
    n = cols * rows
    rots = [float(v) for v in sys.argv[5].split(',')] if len(sys.argv) > 5 else [0.0] * n
    here = os.path.dirname(os.path.abspath(__file__))

    im = Image.open(sheet).convert('RGB')
    W, H = im.size
    cw_, ch_ = W // cols, H // rows

    cells = []
    for r in range(rows):
        for c in range(cols):
            cell = im.crop((c * cw_, r * ch_, (c + 1) * cw_, (r + 1) * ch_))
            cell = biggest_blob(alpha_from_bg(cell))
            if np.array(cell)[..., 3].max() == 0:
                print(f"  frame {len(cells)+1}: EMPTY cell, skipped"); continue
            cells.append(cell)

    # de-rotate, then normalize every frame to the static sprite's opaque area
    static = os.path.join(here, f'unit_{utype}_{cw}.png')
    target = None
    if os.path.exists(static):
        target = (np.array(Image.open(static).convert('RGBA'))[..., 3] > 8).sum()
    masses = []
    prepped = []
    for i, cell in enumerate(cells):
        rot = rots[i] if i < len(rots) else 0.0
        if rot:
            cell = cell.rotate(rot, resample=Image.BICUBIC, expand=True)
        cell = crop_to_content(cell)
        prepped.append(cell)
        masses.append((np.array(cell)[..., 3] > 8).sum())

    for i, cell in enumerate(prepped):
        side = max(cell.size)
        sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
        sq.paste(cell, ((side - cell.width) // 2, (side - cell.height) // 2))
        out = sq.resize((OUT_SIZE, OUT_SIZE), Image.LANCZOS)
        if target:
            # scale so this frame carries the same pixel mass as the static
            cur = (np.array(out)[..., 3] > 8).sum()
            if cur > 0:
                k = (target / cur) ** 0.5
                nw = max(8, int(OUT_SIZE * k))
                sc = out.resize((nw, nw), Image.LANCZOS)
                canvas = Image.new('RGBA', (OUT_SIZE, OUT_SIZE), (0, 0, 0, 0))
                off = (OUT_SIZE - nw) // 2
                if nw <= OUT_SIZE:
                    canvas.paste(sc, (off, off))
                else:
                    canvas.paste(sc, (off, off))
                out = canvas
        path = os.path.join(here, f'unit_{utype}_death{i+1}_{cw}.png')
        out.save(path)
        print(f"wrote {os.path.basename(path)}  rot {rots[i] if i < len(rots) else 0}  "
              f"mass {(np.array(out)[...,3] > 8).sum()}")

if __name__ == '__main__':
    main()
