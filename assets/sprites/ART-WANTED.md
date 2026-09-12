# Art drop-in guide

Every registered production slot in this folder is **hot-swappable**: replace a PNG with the same filename and the game uses it on next reload. If a file is missing or fails to load, the game falls back to neutral component art or its built-in drawing. A genuinely new filename still requires loader registration.

## Human technology overhaul status

### Current soldier update — 2026-09-12

Four Marine transparency repairs are installed: aqua hunker and red death frames 3/4 were approved on 2026-09-11; red walk frame 7 was approved on 2026-09-12. Current cache revision: `human-soldiers-20260911b`. All 160 production sprites match the approved selections: the original 160-file mapping plus four repair overrides. The repaired files pass opacity and transparent-border checks; walk 7 retains its exact RGB artwork, bounding box, and pose. Full-family validation remains open at **32 errors and 21 warnings** (previously 36/22); no thresholds were changed. Marine death 3/4 and walk 7 faction-outline differences and the other previously documented findings remain open. macOS Debug build, 162-file bundle verification, JavaScript syntax, and diff checks pass.

Current [repair selection](../../image-audit/phases/marine-walk7-repair-20260911/selection.json), [validation](../../image-audit/phases/marine-walk7-repair-20260911/validation.json), and [walk-7 approval/provenance record](../../image-audit/phases/marine-walk7-repair-20260911/README.md). The preceding three-repair evidence remains under [marine-transparency-20260911](../../image-audit/phases/marine-transparency-20260911/). Do not regenerate approved repairs without a new request. Preview both colors and obtain approval for future artwork. The following record is historical.

### Brighter soldier installation — historical 2026-09-08 snapshot

All brighter soldier previews are user-approved. The current revision covers **160 files in six complete aqua/teal and red families**: Marine 28, Engineer 26, Sniper 28, Medic 26, Rocket Trooper 26, and Boone/Commando 26. Both colors are required for future soldier preview batches. The 13 added red Commando files complete his art counterpart without changing campaign team assignments.

Preserve the approved dominant faction color, brighter weathered materials, narrower Engineer silhouette, larger Medic backpack and white uniform accents, and Boone's gold markings. Standing/walking characters face north with the whole body and weapon, not merely the head; Rocket launcher direction follows the character through each pose. Approve previews before installing or committing new artwork, and install completed families atomically. Gameplay size and mechanics are unchanged; the art-cache revision is `human-soldiers-20260908a`.

Current evidence: [before](../../image-audit/phases/soldiers-brighter-20260908/before/), [after](../../image-audit/phases/soldiers-brighter-20260908/after/), [selection mapping](../../image-audit/phases/soldiers-brighter-20260908/selection.json), and [surviving provenance](../../image-audit/phases/soldiers-brighter-20260908/provenance/). The [revision provenance guide](../../image-audit/prompts/soldiers-brighter-20260908.md) documents gaps in early exact-prompt records rather than inventing replacements.

**Installed; validation remains open.** All 160 files byte-match the approved selection and have no canvas-edge contact, but the [validator report](../../image-audit/phases/soldiers-brighter-20260908/validation.json) contains 36 errors and 22 warnings. The [open triage](../../image-audit/phases/soldiers-brighter-20260908/triage.md) prioritizes Marine teal-hunker and red-death-3/4 alpha defects, with lesser red-walk-7 erosion and unresolved Engineer/Sniper source-pose drift. Medic/Rocket pivot findings reflect deliberate 7/8-pixel top-anchored passing-frame normalizations; they are not waived. Do not mark this revision complete. The 147-file Phase 3 history below remains frozen and does not certify the revised set.

[Integration checks](../../image-audit/phases/soldiers-brighter-20260908/verification.json) passed: macOS Debug build, byte verification of all 162 Phase 3 payload files (160 sprites plus `game.js` and `index.html`), JavaScript syntax, and diff checks. Browser QA loaded all 160 sprites with zero missing assets and empty warning/error logs; recorded views cover moss/ash walks, snow deaths, and steppe static/hunker poses. A Crystal Basin live-match smoke check started successfully and displayed the revised Marine, but did not comprehensively test gameplay overlays. Open visual findings remain despite successful integration.

### Earlier phase records

**Phase 1 — human buildings is complete (2026-09-05; teal reference refinement 2026-09-06):** 28 production assets cover the complete teal/red HQ, barracks, factory, supply, power, refinery, airpad, silo, turret base, flak base, hydro dam, Overwatch Array base, anti-ground mount, and twin-barrel flak mount families. All 14 Expedition/teal families now use the user-approved aqua-dominant, lighter, weathered Barracks reference. All 14 installed Rubicon/red counterparts remain based on superseded teal and require regeneration from their current teal counterparts plus separate preview approval. The three approved naval references are `bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png`.

This overhaul uses a strict 90-degree overhead camera; grounded semi-realistic weathered metal; visible aqua/red faction identity; dirty warm taupe/off-white technical accents; crisp dark seams; warm amber lights; true alpha and safe padding; and no baked ground, shadows, scenery, people, text, logos, or perspective. Rubicon assets must be precise image-to-image colorway edits of the applicable current approved Expedition source, never independent redraws. All 14 installed Phase 1 red files predate their current teal counterparts and therefore remain pending separate preview and approval. Building geometry, pivots, runtime size, and game-driven overlays stay fixed.

Source dimensions and runtime draw boxes are recorded in [`README.md`](README.md#human-technology-phase-1--buildings). Exact, verbatim teal-generation and red-edit prompts are recorded per family:

- [`bld_hq`](../../image-audit/prompts/bld_hq.md), [`bld_barracks`](../../image-audit/prompts/bld_barracks.md), [`bld_factory`](../../image-audit/prompts/bld_factory.md), [`bld_supply`](../../image-audit/prompts/bld_supply.md), [`bld_power`](../../image-audit/prompts/bld_power.md), [`bld_refinery`](../../image-audit/prompts/bld_refinery.md), and [`bld_airpad`](../../image-audit/prompts/bld_airpad.md)
- [`bld_silo`](../../image-audit/prompts/bld_silo.md), [`bld_turret`](../../image-audit/prompts/bld_turret.md), [`bld_flak`](../../image-audit/prompts/bld_flak.md), [`bld_hydro`](../../image-audit/prompts/bld_hydro.md), and [`bld_sensor`](../../image-audit/prompts/bld_sensor.md)
- [`turret_gun`](../../image-audit/prompts/turret_gun.md) and the new distinct [`flak_gun`](../../image-audit/prompts/flak_gun.md)

Frozen coverage evidence is in [`../../image-audit/phases/phase-1/`](../../image-audit/phases/phase-1/): the before manifest records 25/31 present and the hydro/sensor/flak-gun pairs missing; the after manifest records 31/31 present with no missing slot. The built Debug app passed byte-for-byte verification for all 33 scoped Phase 1 files.

**Phase 2 — human vehicles and aircraft is complete (2026-09-05):** 18 matched target assets cover nine teal/red pairs or poses: APC, mobile artillery, deployed artillery hunker, gunship, Harrier, harvester, raider, capture rig, and tank. The existing Expedition carrier is the nineteenth audited slot and remains an approved benchmark rather than a replacement target. Every target is a north-facing 256×256 RGBA sprite with alpha 0–255, safe padding, and no canvas contact.

Exact generation, refinement, recolor, and QA records are:

- [`unit_apc`](../../image-audit/prompts/unit_apc.md), [`unit_artillery`](../../image-audit/prompts/unit_artillery.md) for both mobile and hunker poses, [`unit_gunship`](../../image-audit/prompts/unit_gunship.md), and [`unit_harrier`](../../image-audit/prompts/unit_harrier.md)
- [`unit_harvester`](../../image-audit/prompts/unit_harvester.md), [`unit_raider`](../../image-audit/prompts/unit_raider.md), [`unit_rig`](../../image-audit/prompts/unit_rig.md), and [`unit_tank`](../../image-audit/prompts/unit_tank.md)

Frozen Phase 2 evidence is in [`../../image-audit/phases/phase-2/`](../../image-audit/phases/phase-2/): the before manifest records 17/19 slots present and the artillery hunker pair absent; the after manifest records 19/19 present. The gunship and Harrier now use authored colorways; artillery hunker takes priority over standing art; authored artillery, Harvester, and Rig avoid only their duplicate legacy decoration while retaining dynamic rotor, payload, cargo/load, captive-glow, and capture-ring state. Raider, tank, and artillery muzzle-FX anchors were aligned to the authored silhouettes. The carrier draws at 200×200 instead of 136×136 with matching oriented selection/hit geometry, while its navigation radius, shoreline fit, and wake origin are unchanged.

Source/gameplay contact sheets and live side-by-side Expedition/Rubicon vehicle rendering plus selection/health behavior passed browser inspection with an empty warning/error console. `node --check game.js` and `git diff --check` passed. The native Debug build succeeded, and all 21 scoped Phase 2 files in the rebuilt app byte-match the workspace.

**Phase 3 — human soldiers is complete (frozen 2026-09-05 history):** all 147 scoped production files were replaced and installed as complete families: Marine 28 (paired static, walk 1–8, death 1–4, and hunker), Engineer 26, Sniper 28 (including paired hunker), Medic 26, Rocket 26, and player-only Boone/Commando 13 in teal. Every selected result is a north-facing 256×256 RGBA sprite with transparent padding and no canvas-edge contact. This original record is superseded for current soldier pixels and coverage by the 160-file revision above.

Built-in ImageGen produced one distinct asset per call. Every selected generation or edit includes all three approved human-technology references—`bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png`; derived poses additionally include the normalized family master used to lock identity. Teal families were authored first, and red frames were image-to-image colorway edits of their corresponding normalized teal frames. Installations were atomic at family scope; isolated animation or faction-frame replacement remains prohibited.

Exact Phase 3 prompt and provenance ledgers are:

- [`unit_marine_family`](../../image-audit/prompts/unit_marine_family.md), [`unit_engineer_family`](../../image-audit/prompts/unit_engineer_family.md), and [`unit_sniper_family`](../../image-audit/prompts/unit_sniper_family.md)
- [`unit_medic_family`](../../image-audit/prompts/unit_medic_family.md), [`unit_rocket_family`](../../image-audit/prompts/unit_rocket_family.md), and [`unit_commando_family`](../../image-audit/prompts/unit_commando_family.md)

The soldier draw boxes are Marine 30×30, Engineer 29×29, Sniper 32×32, Medic 30×30, Rocket 32×32, and Commando 32×32, independent of collision geometry. Runtime playback uses an eight-frame distance-driven walk cadence, gives authored Marine/Sniper hunker poses priority, sizes corpses and human selection/hunker rings from the authored footprint, and suppresses duplicate Marine/Sniper/Rocket/Commando decoration. Marine, Sniper, Rocket, and Commando muzzle anchors are 14 px. The production cache revision is `human-tech-20260906c5`.

Frozen Phase 3 evidence is in [`../../image-audit/phases/phase-3/`](../../image-audit/phases/phase-3/): coverage moves from 145/147 before, with the Marine hunker pair absent and 73 legacy alpha masks contacting a canvas edge (including 38 manually identified as visibly clipped), to 147/147 after with zero edge contact. Both older issues are resolved, not outstanding art requests.

Final verification is complete: 147/147 sprites pass the hardened validator with zero errors; 14 review-only overlap advisories were visually cleared. Source/gameplay sheets, four-palette motion QA, browser console, code/diff checks, macOS Debug build, and all 149 bundled Phase 3 payload byte comparisons pass.

## Legacy asset routing notes (superseded for human technology)

This table preserves the pre-overhaul 2026-08-13 workflow for historical and
non-human fallback work only. It is not production direction for Phase 3 and
must not override the built-in ImageGen, three-benchmark, one-call-per-asset,
teal-first workflow or the exact family ledgers above.

| Historical asset need | Former tool | Historical notes |
|---|---|---|
| New character portrait | **ChatGPT** | PORTRAITS.md style block; generate once, approve, then anchor |
| More shots of an existing generated character | **ChatGPT** | attach the approved frame: "same person, …" — lock wardrobe/patch positions in the prompt |
| New STATIC sprite (unit / building / dino) | **ChatGPT** | PROMPTS.md style block + neutral palette; attach a neighboring existing sprite as style anchor; then process_sprite.py |
| Walk cycles | **DaVinci video** | the only video tool in the stack — locked top-down camera, walking in place facing up, plain bg, 2–4s, no shadow → slice_walk.py |
| Death / idle SHEETS | **ChatGPT first** (untested for sheets — fall back to Gemini if frames don't slice clean) | anchor on the static; existing slicers apply |
| Recolor of EXISTING Gemini art | **Gemini image-to-image** | recolor, never regenerate (standing rule — keeps sprites identical) |
| Marketing / store key art | **DaVinci** (documentary register) or **ChatGPT** (cinematic film-still register) | big canvases are where quality differences actually show |

Do not replace one member of an animation or faction pair in isolation. Statics are load-bearing for their walk/death frames (mass-normalized against them), and teal/red geometry must match. Replace and validate a complete family together; approved completed families are then locked unless that entire family is deliberately reopened.

## Legacy neutral/tinted sprite rules

These rules remain for the older neutral fallback and non-overhaul workflow. They do **not** override the human-technology production lock above or its exact prompt records.

- **Top-down orthographic** view (straight down, like the existing Kenney art)
- **PNG with transparent background**, subject centered, filling ~85–90% of the canvas
- **256×256 px** is plenty (in-game sizes are 20–100 px)
- **Facing UP** (nose/gun/head toward the top of the image) unless noted
- Cartoonish/clean, chunky silhouettes — think Kenney.nl style, readable at 30 px.
  Keep violence-free: no gore, kid-friendly

### Legacy team tinting
Units and buildings are recolored in-game by multiplying the image with the
team color (teal / red / dino-green). So paint them in **neutral desaturated
sand/khaki/light-gray**. Anything painted dark stays dark; anything colorful
will tint weirdly. (Exceptions below say "natural colors".)

## Legacy backlog and completion log

Historical notes below predate the human-technology replacement. The Phase 1 and Phase 2 statuses and current soldier revision above are authoritative; the original Phase 3 record is frozen history.

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
| ~~`bld_power.png`~~ | DONE — lives as the `bld_power_teal/_red` colorway pair | |
| ~~`dino_roost.png`~~ | DONE 2026-08-24 (ChatGPT) — installed + verified on M9's mounds | **the wanted list is now EMPTY**: every registered sprite slot in the game has art. New rows appear here only when design creates new things |
| ~~`unit_rig.png`~~ | **DONE 2026-08-24 — the first ChatGPT sprite** (true top-down on the first try) | installed + verified in-game; the loaded-cage glow now draws OVER real art (drawRigGlow) |
| ~~`unit_carrier_teal.png`~~ | **DONE 2026-09-05 — ChatGPT, skiff-anchored** | accurate bow-up carrier: angled deck, starboard island, elevators, catapults, arresting wires, parked air wing; installed + verified underway on Evac Coast |
| ~~`bld_shipyard_teal.png`~~ | **DONE 2026-09-05 — ChatGPT, skiff/carrier-anchored** | shoreline dry dock: land-side workshop, gantry crane, open launch slip and twin ocean piers; expedition colorway |

## Existing art you can replace anytime (same filenames)

Units: `inf_marine.png`, `inf_sniper.png`, `inf_engineer.png` (these three face
**RIGHT**, not up — legacy), `tank_body.png`, `tank_barrel.png`,
`raider_barrel.png`
Buildings: `bld_plate.png` (square base), `bld_plate_oct.png` (octagon base —
HQ & refinery), `bld_vent_a.png`, `bld_vent_b.png`, `crate.png`,
`turret_gun.png`
Effects (in `../fx/`): explosion0-8, smoke0-7, puff0-5, shot_large, shot_thin

All neutral-toned for tinting except the fx, which are natural.

## Legacy fallback generation prompt

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
- `water.png` — SEAMLESS TILE (must tile in both directions), 512×512: dark
  swampy water surface seen from above, deep teal-black with subtle ripple
  shading, no shore/edges/objects, no strong highlights (the game animates
  sheen on top). Pattern-fills every river channel when present.

## Legacy unit_commando (Boone) brief — superseded by Phase 3

This 2026-08-04 teal-static brief is retained as design history only. Boone's
campaign assignment is unchanged, but his current art now has both teal and red
static/walk/death families. The current selected files and surviving generation
records are linked in the [revision guide](../../image-audit/prompts/soldiers-brighter-20260908.md);
[`unit_commando_family.md`](../../image-audit/prompts/unit_commando_family.md)
records the older Phase 3 generation. Do not use the older cartoon-style prompt
below to revise current soldier assets.

> top-down orthographic 2D video game sprite, viewed directly from above,
> single character centered on a plain solid light-gray background, cartoonish
> chunky proportions with flat cel shading and clean dark outlines, crisp
> silhouette readable at small size, no text, no watermark, no ground shadow —
> veteran special-forces commando soldier in teal-and-sand combat armor,
> noticeably heavier chest plate than a standard marine, compact suppressed
> rifle held pointed up, slung field pack, three bold gold sergeant chevrons
> across the back of the armor readable from above, darker gray-green helmet,
> facing up
