# Production sprites

From [Kenney](https://kenney.nl) asset packs (CC0 / public domain):

- `tank_body.png`, `tank_barrel.png`, `raider_barrel.png`, `crate.png` — Top-Down Tanks Redux
- `inf_marine.png` (survivor), `inf_sniper.png` (hitman), `inf_engineer.png` (robot) — Top-Down Shooter
- `bld_plate.png`, `bld_plate_oct.png`, `turret_gun.png`, `bld_vent_a.png`, `bld_vent_b.png` — Tower Defense (top-down)

The Kenney art is neutral-colored legacy fallback material; the game tints it per team at load (`teamSprite()` in `game.js`). Current human-technology production art uses final-color teal/red slots and bypasses multiply tinting. Legacy infantry faces right; vehicles and separate weapon mounts point up.

Custom painted production sprites:

- `bld_skiff.png` — neutral evacuation craft, bow right
- `bld_shipyard_teal.png` — expedition coastal dry dock, launch piers right
- `unit_carrier_teal.png` — expedition colorway, accurate carrier layout, bow up

## Human technology Phase 1 — buildings

Phase 1 is complete: all 28 building and mounted-weapon targets are installed. All 14 Expedition/teal families now use the user-approved aqua-dominant, lighter, weathered Barracks reference. All 14 installed Rubicon/red counterparts still derive from superseded teal finals; each must be regenerated as a precise image-to-image colorway edit of its current approved teal counterpart, previewed separately, and explicitly approved before installation. The approved skiff, carrier, and naval shipyard above are style benchmarks and are not counted among the 28 replacements.

| Family | Exact production slots | Native canvas | Runtime draw box |
|---|---|---:|---:|
| Headquarters | `bld_hq_teal.png`, `bld_hq_red.png` | 256×256 | 96×96 |
| Barracks | `bld_barracks_teal.png`, `bld_barracks_red.png` | 256×256 | 78×78 |
| Factory | `bld_factory_teal.png`, `bld_factory_red.png` | 256×209 | 88×72 |
| Supply Depot | `bld_supply_teal.png`, `bld_supply_red.png` | 256×256 | 56×56 |
| Power Plant | `bld_power_teal.png`, `bld_power_red.png` | 256×256 | 60×60 |
| Refinery | `bld_refinery_teal.png`, `bld_refinery_red.png` | 256×256 | 70×70 |
| Airpad | `bld_airpad_teal.png`, `bld_airpad_red.png` | 256×256 | 62×62 |
| Missile Silo | `bld_silo_teal.png`, `bld_silo_red.png` | 256×256 | 70×70 |
| Turret base | `bld_turret_teal.png`, `bld_turret_red.png` | 256×256 | 40×40 |
| Flak base | `bld_flak_teal.png`, `bld_flak_red.png` | 256×256 | 40×40 |
| Hydro Dam | `bld_hydro_teal.png`, `bld_hydro_red.png` | 256×40 | 192×30 visual; 84×64 collision |
| Overwatch Array base | `bld_sensor_teal.png`, `bld_sensor_red.png` | 256×256 | 60×60 |
| Anti-ground mount | `turret_gun_teal.png`, `turret_gun_red.png` | 256×256 | 28×28 |
| Twin-barrel AA mount | `flak_gun_teal.png`, `flak_gun_red.png` | 256×256 | 28×28 |

All Phase 1 files are strict 90-degree overhead RGBA sprites with transparent padding and no baked ground or shadow. The hydro source is deliberately ultra-wide. Sensor motion and the turret/flak aiming and recoil remain runtime overlays, so their production sprites contain only the static sensor base or isolated rotating mount required by the renderer.

Verbatim generation and recolor prompts live in [`../../image-audit/prompts/`](../../image-audit/prompts/). Frozen before/after manifests, hash inventories, and source/gameplay-size contact sheets live in [`../../image-audit/phases/phase-1/`](../../image-audit/phases/phase-1/); the after manifest records all 31 audited slots present (28 targets plus three approved benchmarks).

## Human technology Phase 2 — vehicles and aircraft

Phase 2 is complete: 18 replacement targets form nine matched Expedition/Rubicon pairs or poses. Each selected teal master and its precise red colorway edit is a 256×256 RGBA sprite with clean transparent padding and no canvas contact. The existing Expedition carrier remains the nineteenth audited slot and approved benchmark; its source pixels were not regenerated.

| Family or pose | Exact production slots | Native canvas | Runtime draw box | Prompt record |
|---|---|---:|---:|---|
| APC | `unit_apc_teal.png`, `unit_apc_red.png` | 256×256 | 35×35 | [`unit_apc.md`](../../image-audit/prompts/unit_apc.md) |
| Artillery — mobile | `unit_artillery_teal.png`, `unit_artillery_red.png` | 256×256 | 35×35 | [`unit_artillery.md`](../../image-audit/prompts/unit_artillery.md) |
| Artillery — deployed hunker | `unit_artillery_hunker_teal.png`, `unit_artillery_hunker_red.png` | 256×256 | 35×35 | [`unit_artillery.md`](../../image-audit/prompts/unit_artillery.md) |
| Gunship | `unit_gunship_teal.png`, `unit_gunship_red.png` | 256×256 | 34×34 | [`unit_gunship.md`](../../image-audit/prompts/unit_gunship.md) |
| Harrier | `unit_harrier_teal.png`, `unit_harrier_red.png` | 256×256 | 32×32 | [`unit_harrier.md`](../../image-audit/prompts/unit_harrier.md) |
| Harvester | `unit_harvester_teal.png`, `unit_harvester_red.png` | 256×256 | 30×30 | [`unit_harvester.md`](../../image-audit/prompts/unit_harvester.md) |
| Raider | `unit_raider_teal.png`, `unit_raider_red.png` | 256×256 | 30×30 | [`unit_raider.md`](../../image-audit/prompts/unit_raider.md) |
| Capture Rig | `unit_rig_teal.png`, `unit_rig_red.png` | 256×256 | 30×30 | [`unit_rig.md`](../../image-audit/prompts/unit_rig.md) |
| Tank | `unit_tank_teal.png`, `unit_tank_red.png` | 256×256 | 38×38 | [`unit_tank.md`](../../image-audit/prompts/unit_tank.md) |
| Expedition carrier — benchmark | `unit_carrier_teal.png` | 256×256 | 200×200, formerly 136×136 | Existing approved reference; not regenerated |

The gunship and Harrier renderers now select these authored colorways while retaining the game-driven gunship rotor and Harrier payload. Artillery hunker art takes priority over standing art and authored artillery suppresses the duplicate procedural barrel decoration. Authored Harvester and Rig art suppresses only duplicate hazard ticks; Harvester egg/crystal cargo state, Rig captive glow, and the capture ring remain dynamic. Raider, tank, and artillery muzzle-flash/smoke anchors were aligned to their authored barrels (17→14 px, 22→17 px, and 28→16 px); APC/default and gunship were already aligned.

The carrier's enlarged 200×200 visual footprint has matching oriented selection and pointer-hit geometry. Its navigation radius, shoreline-fit behavior, and wake origin are unchanged.

Frozen Phase 2 evidence lives in [`../../image-audit/phases/phase-2/`](../../image-audit/phases/phase-2/): coverage moves from 17/19 before to 19/19 after, with source and actual-size gameplay contact sheets plus per-file hashes. Browser inspection and `node --check game.js` / `git diff --check` passed. The native Debug build succeeded, and all 21 scoped Phase 2 files in the rebuilt app byte-match the workspace.

## Current human soldiers — Marine repairs, 2026-09-12

Four Marine transparency repairs are installed: aqua hunker and red death frames 3/4 were approved on 2026-09-11; red walk frame 7 was approved on 2026-09-12. Current cache revision: `human-soldiers-20260911b`. All 160 production sprites match the approved selections: the original 160-file mapping plus four repair overrides. The repaired files pass opacity and transparent-border checks; walk 7 retains its exact RGB artwork, bounding box, and pose. Full-family validation remains open at **32 errors and 21 warnings** (previously 36/22); no thresholds were changed. Marine death 3/4 and walk 7 faction-outline differences and the other previously documented findings remain open. macOS Debug build, 162-file bundle verification, JavaScript syntax, and diff checks pass.

Current [repair selection](../../image-audit/phases/marine-walk7-repair-20260911/selection.json), [validation](../../image-audit/phases/marine-walk7-repair-20260911/validation.json), and [walk-7 approval/provenance record](../../image-audit/phases/marine-walk7-repair-20260911/README.md). The preceding three-repair evidence remains under [marine-transparency-20260911](../../image-audit/phases/marine-transparency-20260911/). The installation record below is a historical snapshot, superseded only for these four files.

## Brighter faction installation — historical 2026-09-08 snapshot

The user-approved current revision covers **160 production sprites**, installed as six complete aqua/teal and red families. It uses brighter dominant faction armor and weathering, a narrower Engineer, a larger Medic backpack with white uniform accents, and retained gold markings on Boone. The additional 13 red Commando files complete his paired art family without changing campaign team assignments. Standing/walking bodies and weapons face north together; falling poses retain the approved body/weapon alignment. Runtime draw boxes and gameplay mechanics are unchanged.

| Family | Current production coverage | Files | Runtime draw box |
|---|---|---:|---:|
| Marine | Teal/red static + walk 1–8 + death 1–4 + hunker | 28 | 30×30 |
| Engineer | Teal/red static + walk 1–8 + death 1–4 | 26 | 29×29 |
| Sniper | Teal/red static + walk 1–8 + death 1–4 + hunker | 28 | 32×32 |
| Medic | Teal/red static + walk 1–8 + death 1–4 | 26 | 30×30 |
| Rocket Trooper | Teal/red static + walk 1–8 + death 1–4 | 26 | 32×32 |
| Boone / Commando | `unit_commando_{teal,red}.png`; `unit_commando_walk{1..8}_{teal,red}.png`; `unit_commando_death{1..4}_{teal,red}.png` | 26 | 32×32 |
| **Total** | **Six complete paired families** | **160** | |

The current art-cache revision is `human-soldiers-20260908a`. Evidence is preserved under [before](../../image-audit/phases/soldiers-brighter-20260908/before/) and [after](../../image-audit/phases/soldiers-brighter-20260908/after/), with the [selected production mapping](../../image-audit/phases/soldiers-brighter-20260908/selection.json) and [surviving provenance](../../image-audit/phases/soldiers-brighter-20260908/provenance/). See the [revision provenance guide](../../image-audit/prompts/soldiers-brighter-20260908.md) for known prompt-record gaps.

**Installed; validation remains open.** All 160 files byte-match the selected approved outputs and have no canvas-edge contact. The [current validator](../../image-audit/phases/soldiers-brighter-20260908/validation.json) reports 36 errors and 22 warnings. [Triage](../../image-audit/phases/soldiers-brighter-20260908/triage.md) identifies priority alpha defects in Marine teal hunker and red deaths 3/4, lesser Marine red walk 7 erosion, and Engineer/Sniper source-pose drift. Medic/Rocket passing-frame pivot flags reflect deliberate 7/8-pixel top-anchored normalizations but are not waived. Do not describe the revision as complete or the validator as clean.

[Integration verification](../../image-audit/phases/soldiers-brighter-20260908/verification.json): macOS Debug build succeeded; `verify-bundle --phase 3` byte-matched all 162 payload files (160 sprites plus `game.js` and `index.html`); JavaScript syntax and diff checks passed. The browser QA harness loaded 160 sprites with zero missing assets and empty warning/error logs, with recorded walk views on moss/ash, deaths on snow, and static/hunker views on steppe. A live Crystal Basin match started and showed the new Marine. This limited smoke check is not comprehensive overlay regression coverage and does not close the art findings.

## Human technology Phase 3 — soldiers (frozen 2026-09-05 record)

The following 147-file coverage table, prompts, cache revision, and validation describe the original Phase 3 installation only. The 160-file revision above supersedes its soldier pixels and current status; its frozen audit evidence remains unchanged.

Phase 3 is complete: 147 north-facing, 256×256 RGBA production sprites replace every scoped human static, walk, death, and hunker slot as six atomic families. Marine and Sniper include teal/red hunker art; Engineer, Medic, and Rocket have complete paired static/walk/death sets; Boone/Commando remains player-only and therefore has a teal family only.

| Family | Production coverage | Files | Runtime draw box | Prompt record |
|---|---|---:|---:|---|
| Marine | `unit_marine_{teal,red}.png`; `unit_marine_walk{1..8}_{teal,red}.png`; `unit_marine_death{1..4}_{teal,red}.png`; `unit_marine_hunker_{teal,red}.png` | 28 | 30×30 | [`unit_marine_family.md`](../../image-audit/prompts/unit_marine_family.md) |
| Engineer | `unit_engineer_{teal,red}.png`; `unit_engineer_walk{1..8}_{teal,red}.png`; `unit_engineer_death{1..4}_{teal,red}.png` | 26 | 29×29 | [`unit_engineer_family.md`](../../image-audit/prompts/unit_engineer_family.md) |
| Sniper | `unit_sniper_{teal,red}.png`; `unit_sniper_walk{1..8}_{teal,red}.png`; `unit_sniper_death{1..4}_{teal,red}.png`; `unit_sniper_hunker_{teal,red}.png` | 28 | 32×32 | [`unit_sniper_family.md`](../../image-audit/prompts/unit_sniper_family.md) |
| Medic | `unit_medic_{teal,red}.png`; `unit_medic_walk{1..8}_{teal,red}.png`; `unit_medic_death{1..4}_{teal,red}.png` | 26 | 30×30 | [`unit_medic_family.md`](../../image-audit/prompts/unit_medic_family.md) |
| Rocket Trooper | `unit_rocket_{teal,red}.png`; `unit_rocket_walk{1..8}_{teal,red}.png`; `unit_rocket_death{1..4}_{teal,red}.png` | 26 | 32×32 | [`unit_rocket_family.md`](../../image-audit/prompts/unit_rocket_family.md) |
| Boone / Commando | `unit_commando_teal.png`; `unit_commando_walk{1..8}_teal.png`; `unit_commando_death{1..4}_teal.png` | 13 | 32×32 | [`unit_commando_family.md`](../../image-audit/prompts/unit_commando_family.md) |

Each production file came from a distinct built-in ImageGen call. The teal family was authored first, and every red frame is an image-to-image colorway edit of its corresponding normalized teal final. Every selected call includes the approved `bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png` benchmark references; derived poses additionally include the relevant normalized soldier master. Complete families were installed together; do not patch one animation frame or faction counterpart independently.

Runtime draw boxes are independent of collision and pathfinding. Human walk playback now uses distance traveled to drive all eight frames; hunker art takes priority where registered; corpse scale, selection rings, and hunker rings follow the authored visual footprint. Authored Marine, Sniper, Rocket, and Commando art suppresses the matching legacy procedural decorations, and those four armed families use 14 px muzzle anchors. The production cache revision is `human-tech-20260906c5`.

Frozen Phase 3 evidence lives in [`../../image-audit/phases/phase-3/`](../../image-audit/phases/phase-3/): the before state records 145/147 slots, the missing Marine hunker pair, and 73 legacy alpha masks contacting a canvas edge, including 38 frames manually identified as visibly clipped. The after state records 147/147 with zero canvas-edge contact, so those defects are historical rather than an active repair backlog.

Final verification: the hardened family validator reports 147/147 with zero errors and 14 visually cleared review advisories. All source/gameplay sheets and the motion harness passed on four map palettes with an empty browser console; JavaScript/Python/diff checks and the macOS Debug build passed; the built app byte-matches all 149 Phase 3 payload files.
