# Crystal Basin and The Gauntlet ridge refresh

Two mossy and two rust-badlands overhead bedrock ridge variants were generated as transparent neutral terrain art. The approved Trade Road bedrock sprite was a style reference. These four variants are installed under `assets/sprites/` and alternate along Crystal Basin's and The Gauntlet's ridges. They paint only into the cached `groundCv`, with a procedural fallback if a pair is unavailable.

Crystal Basin's two ridge endpoints have small, non-identical offsets (about 30 world pixels). At Bronson's request, The Gauntlet's four parallel walls become sixteen nonparallel ridges of varied length and angle, plus ten scattered layered boulder clusters tinted to the rust palette. Matching collision chains and boulder blockers are built from the new map definitions in `setup()`. The terrain layout is a gameplay change, so M4 still needs a full balance playtest. On 2026-10-17, revised plateau sprites fitted to every tested cliff-chain center were also installed on both maps; their geometry and provenance are recorded in the [plateau phase](../plateaus-20261014/README.md).

| Map | Full map | Plateau at gameplay size | Ridgelines at gameplay size | Broken terrain at gameplay size |
| --- | --- | --- | --- | --- |
| Crystal Basin | [View](previews/basin-full.jpg) | [View](previews/basin-close.jpg) | [View](previews/basin-ridge.jpg) | — |
| The Gauntlet | [View](previews/gauntlet-full.jpg) | [View](previews/gauntlet-close.jpg) | [View](previews/gauntlet-ridge.jpg) | [View](previews/gauntlet-midfield.jpg) |

Actual production captures: [Crystal Basin full map](previews/basin-production-full.jpg), [Crystal Basin plateaus at gameplay size](previews/basin-production-plateaus.jpg), [The Gauntlet full map](previews/gauntlet-production-full.jpg), and [The Gauntlet plateaus at gameplay size](previews/gauntlet-production-plateaus.jpg). The full-map captures are 1280×960, scaled from the 4608×3456 cached ground; gameplay crops retain 1:1 world pixels. Alpha coverage sampling found visible ridge art over every tested ridge-collider center (34/34 Basin, 203/203 Gauntlet), including the capsule ends. In the production browser check, paths remain available west-to-center, east-to-center, across the northern flank, and across the southern flank. Browser frame intervals had a 16.7 ms median and 16.8 ms p95 on each map; long cold-load spikes were observed, so this is not a full performance certification. The cached-ground art adds no per-frame drawing. Terrain has no aqua/red faction counterparts.

## Generation prompt summary

Built-in ImageGen, transparent output, four individual prompts: two mossy soil/bedrock and two rust-badlands soil/bedrock top-down RTS ridge sprites. Every prompt asked for a long low horizontal formation with irregular interlocking stone, weathered erosion, shallow northwest lighting, a genuinely transparent background, and no perspective side wall, structures, characters, text, or watermark. The second variant of each biome explicitly requested a different slab arrangement to avoid repeated stamped forms. `assets/sprites/ridge_bedrock.png` was the overhead material/style reference, not an edit target.

No commit or push was requested.
