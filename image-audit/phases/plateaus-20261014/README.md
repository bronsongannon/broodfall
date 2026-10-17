# Plateau roster — full installation, 2026-10-17

Bronson approved the compact, weathered plateau direction across the full roster. All 12 maps with authored plateaus now use installed production art; Evac Coast's disconnected ramp was repaired before its coastal bluff was installed. Eight transparent ImageGen families are saved under [`candidates/`](candidates/); their art direction and prompt set are in [prompts.md](prompts.md). These are neutral terrain assets, so faction aqua/red counterparts do not apply.

## Fitted first pair — installed 2026-10-17

Crystal Basin and The Gauntlet use Bronson-approved sprites shaped against their actual three-circle cliff footprints, with compact raised centers and vehicle-width ramp mouths. A subtle 18px cached edge extension closes small alpha notches without enlarging the raised center. Sampling the real cliff-chain centers finds visible art at 69/69 points on Crystal Basin and 62/62 on The Gauntlet. Gauntlet's west/east center approaches and north/south traversals remain reachable. The art is baked into `groundCv`; the procedural plateau painter remains the load-failure fallback. Collision, elevation, ramp clearance, and pathfinding geometry are unchanged.

| Map | Gameplay size | Collision/ramp overlay | Full map |
| --- | --- | --- | --- |
| Crystal Basin | [View](previews/basin-fitted-v2-gameplay.jpg) | [View](previews/basin-fitted-v2-geometry.jpg) | [View](previews/basin-fitted-v2-full.jpg) |
| The Gauntlet | [View](previews/gauntlet-fitted-v2-gameplay.jpg) | [View](previews/gauntlet-fitted-v2-geometry.jpg) | [View](previews/gauntlet-fitted-v2-full.jpg) |

Production evidence: [Crystal Basin gameplay size](previews/basin-installed-gameplay.jpg), [Crystal Basin full map](previews/basin-installed-full.jpg), [The Gauntlet gameplay size](previews/gauntlet-installed-gameplay.jpg), and [The Gauntlet full map](previews/gauntlet-installed-full.jpg).

## Remaining safe-map roster — installed 2026-10-17

The other ten maps were refitted against their real cliff chains. Nine maps / 16 formations cover every tested boundary point without changing gameplay geometry. Strip Mine and High Water Mark use a 32px low cached edge closure because their source silhouettes have deeper notches; the other maps use the same restrained 18px closure as the first pair. Base-to-base vehicle and infantry paths pass on all nine maps, as do all 20 authored ramp checks. A 120-frame pacing sample measured 16.7ms median, 16.7ms p95, and 16.8ms max.

Evac Coast's ramp center was 233.6 world pixels beyond the nearest plateau edge. It moved about 230px west, from 65% to 60% map width, placing the existing 88px opening directly on the eastern rim. The plateau circles, coastline, and road are unchanged. The corrected geometry leaves 33 cliff centers, all covered by the installed coastal bluff. Vehicle and infantry summit access, both skirmish base routes, and six M13 attack approaches pass. Its 120-frame pacing sample measured 16.7ms median / 16.7ms p95.

- [Installed full-map contact sheet](previews/remaining-installed-contact.jpg)

| Map | Coverage | Gameplay-size preview | Boundary/ramp check | Full map |
| --- | ---: | --- | --- | --- |
| The Boneyard | 60/60 | [View](previews/boneyard-installed-gameplay.jpg) | [Geometry](previews/boneyard-fitted-geometry.jpg) | [View](previews/boneyard-installed-full.jpg) |
| Fossil Valley | 61/61 | [View](previews/valley-installed-gameplay.jpg) | [Geometry](previews/valley-fitted-geometry.jpg) | [View](previews/valley-installed-full.jpg) |
| Blackwater Fen | 26/26 | [View](previews/fen-installed-gameplay.jpg) | [Geometry](previews/fen-fitted-geometry.jpg) | [View](previews/fen-installed-full.jpg) |
| The Silo Fields | 51/51 | [View](previews/silo-installed-gameplay.jpg) | [Geometry](previews/silo-fitted-geometry.jpg) | [View](previews/silo-installed-full.jpg) |
| Strip Mine | 81/81 | [View](previews/mine-installed-gameplay.jpg) | [Geometry](previews/mine-fitted-geometry.jpg) | [View](previews/mine-installed-full.jpg) |
| High Water Mark | 49/49 | [View](previews/hwm-installed-gameplay.jpg) | [Geometry](previews/hwm-fitted-geometry.jpg) | [View](previews/hwm-installed-full.jpg) |
| Twin Forks | 26/26 | [View](previews/forks-installed-gameplay.jpg) | [Geometry](previews/forks-fitted-geometry.jpg) | [View](previews/forks-installed-full.jpg) |
| Overgrown Basin | 69/69 | [View](previews/overgrown-installed-gameplay.jpg) | [Geometry](previews/overgrown-fitted-geometry.jpg) | [View](previews/overgrown-installed-full.jpg) |
| Evac Coast | 33/33; ramp repaired | [View](previews/coast-installed-gameplay.jpg) | [Geometry](previews/coast-refit-geometry.jpg) | [View](previews/coast-installed-full.jpg) |
| Krauss's Bastion | 64/64 | [View](previews/bastion-installed-gameplay.jpg) | [Geometry](previews/bastion-fitted-geometry.jpg) | [View](previews/bastion-installed-full.jpg) |

The preview painter temporarily hides the procedural plateau and cliff *paint*, leaves the existing `rocks` and elevation untouched, and overlays a candidate on `groundCv` in local Chrome. Each map was captured at its authored geometry. The 1:1 gameplay crops show both plateaus where the map has two; red rings in the geometry checks show the real plateau circles, and cyan rings show ramp zones. Full-map contact views are downscaled and should not be used to judge rock detail.

- [All 12 maps, full-map contact sheet](previews/full-roster-contact.jpg)

| Map | Candidate | Gameplay-size preview | Boundary/ramp check |
| --- | --- | --- | --- |
| Crystal Basin | Green three-lobed earth | [View](previews/basin-gameplay.jpg) | [Geometry](previews/basin-geometry.jpg) |
| The Gauntlet | Rust mesa | [View](previews/gauntlet-gameplay.jpg) | [Geometry](previews/gauntlet-geometry.jpg) |
| The Boneyard | Cold ash mound | [View](previews/boneyard-gameplay.jpg) | [Geometry](previews/boneyard-geometry.jpg) |
| Fossil Valley | Green two-lobed bluff | [View](previews/valley-gameplay.jpg) | [Geometry](previews/valley-geometry.jpg) |
| Blackwater Fen | Wet-earth mound | [View](previews/fen-gameplay.jpg) | [Geometry](previews/fen-geometry.jpg) |
| The Silo Fields | Refined snow-slate bluff | [View](previews/silo-gameplay.jpg) | [Geometry](previews/silo-geometry.jpg) |
| Strip Mine | Narrow two-ramp spoil bench | [View](previews/mine-gameplay.jpg) | [Geometry](previews/mine-geometry.jpg) |
| High Water Mark | Wet-earth mound | [View](previews/hwm-gameplay.jpg) | [Geometry](previews/hwm-geometry.jpg) |
| Twin Forks | Green two-lobed bluff | [View](previews/forks-gameplay.jpg) | [Geometry](previews/forks-geometry.jpg) |
| Overgrown Basin | Green three-lobed earth | [View](previews/overgrown-gameplay.jpg) | [Geometry](previews/overgrown-geometry.jpg) |
| Evac Coast | Coastal bluff, centered visual study only | [View](previews/coast-gameplay.jpg) | [Geometry](previews/coast-geometry.jpg) |
| Krauss's Bastion | Rust mesa | [View](previews/bastion-gameplay.jpg) | [Geometry](previews/bastion-geometry.jpg) |

## Fit findings for the remaining maps

- The smaller *raised centers* read well at gameplay scale, but the full outer edge must stay readable wherever the existing cliff colliders remain. This is not a literal 50% footprint reduction; doing that visually while retaining collision would create invisible walls. Strip Mine's two ramps are roughly 510 world pixels apart, so its low bench is necessarily longer than the one-ramp lookouts.
- The installed roster follows each map's authored collision circles. High Water Mark and Krauss's Bastion use their own fitted placements rather than a repeated rectangular treatment. The red/cyan geometry overlays are deliberate QA evidence, not game visuals.
- **Evac Coast's authored ramp mismatch is repaired.** Its ramp center was 233.6 world pixels beyond the nearest plateau-circle edge, so the 88px zone could not cut a gap in the cliff chain. Moving it about 230px west onto the eastern rim matches the working plateau pattern and produces direct vehicle/infantry access. The approved coastal art is refitted to that entrance; M13 and skirmish pathing checks pass.
- Trade Road is omitted because its two approved lookout sprites are already installed. Exodus Road has no plateaus. The full roster here is 12 maps / 21 plateau formations.

Approved production copies live under `assets/sprites/`; unused candidates and historical previews remain separate. Preview placement diagnostics are saved in [`placements.json`](previews/placements.json), and the installed-roster results are in [`production-roster-check.json`](previews/production-roster-check.json). No commit or push was requested.
