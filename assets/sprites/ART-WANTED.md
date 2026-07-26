# Art drop-in guide

Every sprite in this folder is **hot-swappable**: replace a PNG (same filename)
and the game uses it on next reload. No code changes, ever. If a file is
missing or fails to load, the game falls back to its built-in drawing.

## Global rules (apply to every image)

- **Top-down orthographic** view (straight down, like the existing Kenney art)
- **PNG with transparent background**, subject centered, filling ~85–90% of the canvas
- **256×256 px** is plenty (in-game sizes are 20–100 px)
- **Facing UP** (nose/gun/head toward the top of the image) unless noted
- Cartoonish/clean, chunky silhouettes — think Kenney.nl style, readable at 30 px.
  Keep violence-free: no gore, kid-friendly

### Team tinting — IMPORTANT
Units and buildings are recolored in-game by multiplying the image with the
team color (teal / red / dino-green). So paint them in **neutral desaturated
sand/khaki/light-gray**. Anything painted dark stays dark; anything colorful
will tint weirdly. (Exceptions below say "natural colors".)

## New art wanted (currently procedurally drawn — biggest wins)

| filename | what | notes |
|---|---|---|
| `dino_spitter.png` | small raptor-like dino, venom spitter | neutral sand tones (gets team-tinted: wild=green, tamed=teal). Distinct throat sac |
| `dino_nest.png` | dirt/bone nest mound with 3 speckled eggs | **natural colors**, not tinted. Read as organic vs the tech buildings |
| `gunship.png` | attack helicopter / VTOL gunship | neutral tones, tinted. Rotor is drawn by the game — leave the top center clear-ish |
| `artillery.png` | long-barreled siege gun on tracks, barrel up | neutral tones, tinted. Should look longer/thinner than the tank |
| `egg.png` | single dino egg, speckled | **natural colors** (off-white + green speckles) |
| `medic.png` | field medic with backpack + red-cross armband | neutral tones, tinted. Faces **RIGHT** like the other infantry |
| `rocket_trooper.png` | infantryman with shoulder rocket launcher | neutral tones, tinted. Faces **RIGHT** |
| `apc.png` | 8-wheeled armored personnel carrier, roof hatch | neutral tones, tinted. Faces up |
| `harrier.png` | delta-wing VTOL strike jet | neutral tones, tinted. Faces up |
| `bld_power.png` | compact power plant — reactor dome / cooling stacks | neutral tones, tinted. Game draws a glowing bolt emblem on top |
| `unit_rig.png` | harvester truck with a containment cage on the bed | neutral tones, tinted. Faces up. Game glows the cage green when loaded |

## Existing art you can replace anytime (same filenames)

Units: `inf_marine.png`, `inf_sniper.png`, `inf_engineer.png` (these three face
**RIGHT**, not up — legacy), `tank_body.png`, `tank_barrel.png`,
`raider_barrel.png`
Buildings: `bld_plate.png` (square base), `bld_plate_oct.png` (octagon base —
HQ & refinery), `bld_vent_a.png`, `bld_vent_b.png`, `crate.png`,
`turret_gun.png`
Effects (in `../fx/`): explosion0-8, smoke0-7, puff0-5, shot_large, shot_thin

All neutral-toned for tinting except the fx, which are natural.

## How to generate with AI

Prompt skeleton that works well:

> top-down orthographic 2D game sprite of a [SUBJECT], facing up, centered,
> cartoonish chunky style like Kenney game assets, flat shading, desaturated
> sand and khaki colors, plain solid background, no text, no shadows

Then remove the background (any background-remover tool) and save as
transparent PNG with the filename above. Generate 3–4 candidates per subject
and drop them in one at a time — reload the game to compare.

## Terrain objects (added 2026-07-24, map upgrade pass)

All OPT slots like `rock.png`: drop the file in and every instance uses it,
missing = procedural fallback. Process raws with
`python3 assets/sprites/process_sprite.py "raw.png" <slot>.png`.
NO drop shadows in the art — the game draws them. Generate `tree.png` first,
approve it, then style-anchor the rest so the set matches.

SHARED STYLE BLOCK (start every prompt with this, attach an approved sprite
as style anchor):

> Top-down orthographic view, seen directly from overhead at 90 degrees.
> Clean stylized video-game terrain sprite, flat-shaded with soft highlights,
> crisp readable silhouette. Single object, centered, filling most of the
> frame. Plain solid white background, no drop shadow, no ground, no text,
> no watermark.

- `tree.png` — "A single living tree seen directly from above: a dense rounded
  leafy canopy made of clustered lobes, deep forest green with lighter sunlit
  highlights on the upper-left lobes, one or two small dark gaps hinting at
  branches underneath. Chunky and readable — renders at ~50px in-game."
- `tree_dead.png` — "A single dead tree seen directly from above: bleached
  gray-white bare branches forking outward from a central snapped trunk stub,
  no leaves at all, skeletal and weathered." (Boneyard's `flora.dead` maps.)
- `spire.png` — "A jagged cluster of crystalline rock spires seen directly
  from above: five or six sharp angular shards leaning outward from a dark
  stone base, dull deep teal-green crystal, matte and weathered like old
  mineral rock — NOT bright glowing gems." (Must NOT read as the mineable
  resource — those are bright teal.)
- `bones.png` — "The enormous half-buried ribcage of a colossal animal seen
  directly from above: a curved spine running horizontally left to right,
  pairs of bleached white ribs arcing outward from it on both sides, a
  weathered skull at the RIGHT end of the spine, bone-white with sand-toned
  shading in the crevices, partly sunken into view." (Spine along +x, skull
  right — the game rotates by the authored angle.)

Shrubs/grass tufts stay procedural (painted by the hundreds at 5-15px — not
sprite material).
- `pit.png` — "A collapsed sinkhole seen directly from above: a deep dark hole
  with an irregular crumbling rim of cracked dry earth and small stone chunks,
  a few stress cracks radiating outward from the edge, the hole darkest at its
  center, dusty earth tones." (Radial — the game rotates each pit randomly, so
  no directional lighting. IMPORTANT: the rim must END in a defined cracked
  edge, not fade softly outward — a soft fade to the white background gets
  clipped by background removal and leaves a hard halo.)
