# Ridge and lookout art — Trade Road, 2026-10-14

## Installed: the long bedrock ridge

Bronson approved the third, low-profile overhead candidate after the first bright layered ridge and its rotated variants read as side-on objects. The approved source is `assets/sprites/source/ridge_bedrock_source.png`; the normalized 1024×214 transparent production sprite is `assets/sprites/ridge_bedrock.png`. It is authored into `groundCv` at the existing Trade Road ridge segment and visual envelope (about 442×92 world pixels). No colliders, elevation tiles, pathing, ramps, missions, or per-frame drawing changed. If the optional sprite fails to load, the previous procedural ridge painter remains the fallback. `assets/thumbs/trade.jpg` now shows the installed treatment.

- [Before, gameplay zoom](long-before.jpg)
- [After, same camera and zoom](long-after.jpg)
- [Full map with installed ridge](trade-full-installed.jpg)

The source and normalized production files are separate so future visual revisions do not destroy the approved source. The built-in ImageGen prompt is in [prompts.md](prompts.md). Preview captures used a local Chrome page at 1280×800 with camera `(1300,470)`; full map output is 2048×1536. Terrain/prop placement outside the authored ridge differs slightly between cold setups because the older flora painter uses `Math.random`.

## Installed: paired raised lookouts

Bronson approved the smaller, visibly elevated lookout hills with widened approaches. The north/east-ramp and south/upper-left-ramp transparent sources are `assets/sprites/source/lookout_trade_east_source.png` and `assets/sprites/source/lookout_trade_northwest_source.png`. Their 570×460 production versions are `assets/sprites/lookout_trade_east.png` and `assets/sprites/lookout_trade_northwest.png`. Both were softly edge-masked, scaled, and color-matched to the approved gameplay preview before installation. They replace only Trade Road's procedural plateau gradients and visible cliff stones, and are baked into `groundCv` after other ground props. If either optional image fails to load, both hills fall back to the prior painter. The underlying plateau circles, cliff colliders, elevation, ramp geometry, and pathfinding were not changed. Other maps retain their previous plateau art.

- [Previous cliff rims, both plateaus](circular-before.jpg)
- [Installed pair, 1:1 ground pixels](lookout-installed-pair.jpg)
- [Installed north lookout, gameplay zoom](lookout-installed-gameplay.jpg)
- [Full Trade Road map with both lookouts](trade-full-lookouts-installed.jpg)
- [Previous map thumbnail](trade-thumb-before-lookout.jpg)

The refreshed `assets/thumbs/trade.jpg` shows the installed pair. Source and processed files are separate for future art revisions. The source files were generated with built-in ImageGen for overhead, grounded stone lookouts with an open vehicle-width ramp and soft weathered-earth slopes; [generation provenance](prompts.md) records the direction. The local Chrome preview confirmed both production images loaded and the authored ramp mouths remained visibly open. No new per-frame drawing was added.

## Superseded study: circular cliff rims

Trade Road has two paired plateau outlines. An earlier narrow rock-rim candidate was previewed on **both** plateaus at 1:1 ground pixels, with the artwork constrained to the existing ±17px cliff-collider band and erased at authored ramp mouths and interior overlaps. It read too flat for a lookout hill and was not installed. The raised-lookout treatment above supersedes it.

- [Current cliff rims, both plateaus](circular-before.jpg)
- [Circular-rim prototype, both plateaus](circular-prototype.jpg)
- [Full map with prototype rims](trade-full-circular-prototype.jpg)

Other maps' long ridges and circular cliff rims remain on their old painter. Any requested 50% reduction of similar formations outside Trade Road still needs a separate decision about whether it is visual-only or also changes playable geometry.
