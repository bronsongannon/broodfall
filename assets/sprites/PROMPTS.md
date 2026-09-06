# Broodfall sprite prompt records

## Human technology Phase 1 — authoritative prompt set

The 2026-09-05 building replacement established complete slot coverage. Each Expedition/teal asset was generated as one distinct production sprite using `bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png` as camera/material/style references. On 2026-09-06, all 14 Expedition/teal Phase 1 families received user-approved lighter, aqua-dominant, weathered refinements based on the approved Barracks reference. All 14 installed Rubicon/red counterparts still trace to superseded teal files and must be regenerated from their current approved teal counterparts, one at a time with separate preview approval. Generated pixels are proportionally fit onto the documented RGBA canvas without stretching; no prompt output supplies ground, shadow, scenery, text, people, or perspective.

The exact prompts and edit instructions are preserved verbatim in these records together with generation mode, generated-original paths, and final production paths. Records whose output required the shared sprite processor also include the exact normalization command:

| Family | Prompt record | Production pair |
|---|---|---|
| Headquarters | [`bld_hq.md`](../../image-audit/prompts/bld_hq.md) | `bld_hq_{teal,red}.png` |
| Barracks | [`bld_barracks.md`](../../image-audit/prompts/bld_barracks.md) | `bld_barracks_{teal,red}.png` |
| Factory | [`bld_factory.md`](../../image-audit/prompts/bld_factory.md) | `bld_factory_{teal,red}.png` |
| Supply Depot | [`bld_supply.md`](../../image-audit/prompts/bld_supply.md) | `bld_supply_{teal,red}.png` |
| Power Plant | [`bld_power.md`](../../image-audit/prompts/bld_power.md) | `bld_power_{teal,red}.png` |
| Refinery | [`bld_refinery.md`](../../image-audit/prompts/bld_refinery.md) | `bld_refinery_{teal,red}.png` |
| Airpad | [`bld_airpad.md`](../../image-audit/prompts/bld_airpad.md) | `bld_airpad_{teal,red}.png` |
| Missile Silo | [`bld_silo.md`](../../image-audit/prompts/bld_silo.md) | `bld_silo_{teal,red}.png` |
| Turret base | [`bld_turret.md`](../../image-audit/prompts/bld_turret.md) | `bld_turret_{teal,red}.png` |
| Flak base | [`bld_flak.md`](../../image-audit/prompts/bld_flak.md) | `bld_flak_{teal,red}.png` |
| Hydro Dam | [`bld_hydro.md`](../../image-audit/prompts/bld_hydro.md) | `bld_hydro_{teal,red}.png` |
| Overwatch Array base | [`bld_sensor.md`](../../image-audit/prompts/bld_sensor.md) | `bld_sensor_{teal,red}.png` |
| Anti-ground mount | [`turret_gun.md`](../../image-audit/prompts/turret_gun.md) | `turret_gun_{teal,red}.png` |
| Twin-barrel AA mount | [`flak_gun.md`](../../image-audit/prompts/flak_gun.md) | `flak_gun_{teal,red}.png` |

The shared production constraints are strict 90-degree overhead camera, grounded semi-realistic weathered hard-surface finish, clearly visible but muted aqua/red identification, dirty warm taupe/off-white secondary metal, crisp charcoal seams and machinery, warm amber lights, genuine alpha, complete silhouette, safe padding, and readability at the recorded runtime box. The approved Barracks governs land-building color/value; the family-specific records remain the source of truth whenever a detail differs, especially the 256×40 hydro canvas, static-only sensor base, weapon-free turret/flak bases, and separate one-barrel versus twin-barrel mounts.

Coverage, source dimensions, runtime sizes, contact sheets, and bundle validation are indexed in [`../../IMAGE-AUDIT.md`](../../IMAGE-AUDIT.md#human-technology-replacement--phase-1-complete).

## Human technology Phase 2 — authoritative prompt set

The 2026-09-05 vehicle and aircraft replacement is complete. Its 18 target files form nine matched Expedition/Rubicon pairs or poses. Every selected teal master was generated as its own strict-overhead production sprite using the approved skiff, carrier, and naval shipyard references; every selected red final traces to a separate image-to-image colorway edit of the corresponding normalized teal master. Refinement and silhouette-lock retry prompts are retained wherever they were needed, so the linked records—not the legacy prompt pack below—are the exact source of truth.

| Family or pose | Exact prompt record | Production pair |
|---|---|---|
| APC | [`unit_apc.md`](../../image-audit/prompts/unit_apc.md) | `unit_apc_{teal,red}.png` |
| Artillery — mobile | [`unit_artillery.md`](../../image-audit/prompts/unit_artillery.md) | `unit_artillery_{teal,red}.png` |
| Artillery — deployed hunker | [`unit_artillery.md`](../../image-audit/prompts/unit_artillery.md) | `unit_artillery_hunker_{teal,red}.png` |
| Gunship | [`unit_gunship.md`](../../image-audit/prompts/unit_gunship.md) | `unit_gunship_{teal,red}.png` |
| Harrier | [`unit_harrier.md`](../../image-audit/prompts/unit_harrier.md) | `unit_harrier_{teal,red}.png` |
| Harvester | [`unit_harvester.md`](../../image-audit/prompts/unit_harvester.md) | `unit_harvester_{teal,red}.png` |
| Raider | [`unit_raider.md`](../../image-audit/prompts/unit_raider.md) | `unit_raider_{teal,red}.png` |
| Capture Rig | [`unit_rig.md`](../../image-audit/prompts/unit_rig.md) | `unit_rig_{teal,red}.png` |
| Tank | [`unit_tank.md`](../../image-audit/prompts/unit_tank.md) | `unit_tank_{teal,red}.png` |

All selected targets are north-facing 256×256 RGBA sprites with alpha spanning 0–255, safe transparent padding, and no content touching the canvas. Their exact generated-original paths, normalization commands, retry disposition, alpha masks, pair-alignment measurements, and gameplay-size QA are recorded in the linked files. The unchanged `unit_carrier_teal.png` is the nineteenth Phase 2 audit slot and approved style benchmark, not an ImageGen target; only its runtime draw and interaction footprint changed from 136×136 to 200×200.

Frozen 17/19-before and 19/19-after manifests, inventories, and source/gameplay contact sheets are under [`../../image-audit/phases/phase-2/`](../../image-audit/phases/phase-2/). Browser inspection and static code checks passed; the native Debug build succeeded, and all 21 scoped Phase 2 files in the rebuilt app byte-match the workspace. Full runtime-overlay and carrier-geometry notes are in [`../../IMAGE-AUDIT.md`](../../IMAGE-AUDIT.md#human-technology-replacement--phase-2-complete).

## Human technology Phase 3 — authoritative prompt set

The 2026-09-05 soldier replacement is complete as 147 production assets across six atomic families. Built-in ImageGen produced one distinct output per selected static, walk, death, or hunker asset. Every selected call includes `bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png` as approved camera/material/style benchmarks; derived pose calls additionally include the normalized family master used to lock identity. Teal was authored first; every Rubicon/red frame is a precise image-to-image colorway edit of its corresponding normalized Expedition/teal final, not an independently redrawn pose.

| Family | Exact prompt and provenance ledger | Production coverage | Files |
|---|---|---|---:|
| Marine | [`unit_marine_family.md`](../../image-audit/prompts/unit_marine_family.md) | Paired static, walk 1–8, death 1–4, hunker | 28 |
| Engineer | [`unit_engineer_family.md`](../../image-audit/prompts/unit_engineer_family.md) | Paired static, walk 1–8, death 1–4 | 26 |
| Sniper | [`unit_sniper_family.md`](../../image-audit/prompts/unit_sniper_family.md) | Paired static, walk 1–8, death 1–4, hunker | 28 |
| Medic | [`unit_medic_family.md`](../../image-audit/prompts/unit_medic_family.md) | Paired static, walk 1–8, death 1–4 | 26 |
| Rocket Trooper | [`unit_rocket_family.md`](../../image-audit/prompts/unit_rocket_family.md) | Paired static, walk 1–8, death 1–4 | 26 |
| Boone / Commando | [`unit_commando_family.md`](../../image-audit/prompts/unit_commando_family.md) | Player-only teal static, walk 1–8, death 1–4 | 13 |

The ledgers preserve exact prompts, all attached reference paths, selected raw outputs, retry disposition, normalization commands, and final production destinations. All final files are north-facing 256×256 RGBA sprites with safe transparent padding and zero canvas-edge contact. No family was installed piecemeal. Runtime draw boxes and full before/after evidence are indexed in [`README.md`](README.md#human-technology-phase-3--soldiers) and [`../../IMAGE-AUDIT.md`](../../IMAGE-AUDIT.md#human-technology-replacement--phase-3-complete).

The Phase 3 before audit records 145/147 slots, the absent Marine hunker pair, and 73 legacy alpha masks contacting an edge, including 38 manually identified as visibly clipped. The after audit records 147/147 slots with zero edge contact. Those legacy defects are resolved.

Final verification confirms 147/147 selected outputs, zero hardened-validator errors, all 14 review-only overlap advisories visually cleared, and complete three-benchmark provenance in the six exact family ledgers. Source/gameplay and four-palette motion QA, browser console, code/diff checks, the macOS Debug build, and byte verification of all 149 bundled Phase 3 payload files pass.

## Legacy neutral/tinted prompt pack

The material below predates the Phase 1, Phase 2, and Phase 3 production locks and is retained for historical fallback-slot work. It must not override the exact human-technology records above, and its cartoon-style prompts, optional-file ordering, background-removal advice, and Nano Banana session guidance are not valid instructions for revising Phase 3 soldier art.

Generate one image per row, save as **256×256 transparent PNG** with the exact
filename, drop it into `assets/sprites/`, reload the game. Every file is
optional and independent — the game falls back to its current look for any
file that's missing. You can do these in any order; **`unit_marine`,
`unit_tank`, `unit_spitter`, and `bld_hq` change the look of the game the most.**

## The style block (paste at the START of every prompt)

> top-down orthographic 2D video game sprite, viewed directly from above,
> single object centered on a plain solid light-gray background, cartoonish
> chunky proportions with flat cel shading and clean dark outlines, like
> Kenney game assets, crisp silhouette readable at small size, no text, no
> watermark, no shadow on the ground

## The color rule (append to every TINTED prompt)

> desaturated sand, khaki and warm gray color scheme only, no bright colors

The game multiplies team color (teal/red/green) onto these sprites — colorful
art tints muddy. Rows marked **NATURAL** skip this line and use real colors.

## Orientation

Everything faces **UP** (nose/gun/head toward the top of the image).

## After generating

1. Remove the background (any online background remover, or Preview → Instant Alpha)
2. Crop to a square with the subject filling ~85%
3. Export PNG-with-transparency at 256×256, name it exactly, drop in this folder

Consistency tip: do them all in ONE Nano Banana session and say "same art
style as the previous image" after the first one you like.

---

## Infantry (tinted)

| file | prompt (after the style block) |
|---|---|
| `unit_marine.png` | futuristic space marine infantry soldier in light combat armor holding a compact rifle pointed up, small backpack, seen from directly above, facing up |
| `unit_sniper.png` | prone sniper soldier in a hooded ghillie cloak aiming a very long anti-materiel rifle pointed up, bipod deployed, seen from directly above, facing up |
| `unit_medic.png` | combat field medic with a bulky medical backpack marked with a cross symbol, no weapon, one hand carrying a medkit case, seen from directly above, facing up |
| `unit_rocket.png` | heavy weapons soldier carrying a large rocket launcher tube over the shoulder pointed up, missile tip visible, wide stance, seen from directly above, facing up |
| `unit_engineer.png` | engineer worker in a hard hat and tool vest carrying a large wrench, tool belt with pouches, seen from directly above, facing up |

## Vehicles (tinted)

| file | prompt |
|---|---|
| `unit_harvester.png` | boxy industrial mining truck with a wide front scoop and an open cargo bed of glowing crystals, heavy tires, seen from directly above, facing up |
| `unit_raider.png` | fast wedge-shaped attack buggy with oversized off-road wheels, small roof-mounted machine gun pointing up, seen from directly above, facing up |
| `unit_tank.png` | heavy main battle tank with wide treads and a rotating turret, long cannon pointing up, armor plating details, seen from directly above, facing up |
| `unit_artillery.png` | self-propelled artillery vehicle on tracks with an extremely long siege cannon pointing up, narrow hull, recoil struts, seen from directly above, facing up |
| `unit_apc.png` | eight-wheeled armored personnel carrier with a flat roof, top hatch, small machine gun stub pointing up, seen from directly above, facing up |

## Aircraft (tinted)

| file | prompt |
|---|---|
| `unit_gunship.png` | military attack helicopter gunship with stub wings carrying rocket pods, twin cockpit, tail rotor, main rotor blades faint and blurred, seen from directly above, nose pointing up |
| `unit_harrier.png` | delta-wing VTOL strike jet fighter with twin tail fins and a single bomb mounted under the fuselage centerline, seen from directly above, nose pointing up |

## Dinosaurs (tinted — wild ones render green, tamed ones teal)

| file | prompt |
|---|---|
| `unit_spitter.png` | small feisty raptor-like dinosaur with an inflated venom throat sac, long counterbalancing tail, clawed feet mid-stride, seen from directly above, head pointing up |

## Buildings (tinted)

| file | prompt |
|---|---|
| `bld_hq.png` | large octagonal sci-fi command headquarters building with a glowing central core, antenna arrays, landing beacon lights at the corners, seen from directly above |
| `bld_barracks.png` | rectangular military barracks building with a reinforced entry door at the bottom edge, roof vents and a small flag, seen from directly above |
| `bld_factory.png` | wide industrial vehicle factory with a large roll-up bay door at the bottom edge, twin smokestacks, roof crane rail, seen from directly above |
| `bld_supply.png` | small square supply depot stacked with cargo crates and fuel barrels under a partial canopy roof, seen from directly above |
| `bld_refinery.png` | octagonal ore refinery building with a central glowing crystal intake port, pipes and holding tanks around the rim, seen from directly above |
| `bld_airpad.png` | square helicopter landing pad building with a painted H in a circle, edge lights, small control kiosk in one corner, seen from directly above |
| `bld_turret.png` | round armored gun turret BASE PLATFORM only with no gun barrel, bolted deck plates and a central mounting ring, seen from directly above |
| `bld_flak.png` | round anti-aircraft battery BASE PLATFORM only with no gun barrels, radar dish on the rim and a central mounting ring, seen from directly above |
| `bld_silo.png` | underground nuclear missile silo building seen from directly above, massive circular blast doors split down the middle, hazard chevron markings around the rim, warning lights |

The game draws the rotating gun on turret/flak itself — that's why those two
are bases only. To upgrade the gun too, replace `turret_gun.png` (existing
file): *"twin-barreled turret gun assembly pointing up, seen from above"*.

## Act 2–3 dinos (Screecher, Ironback, Broodmother)

Their prompts live in **`DINOS-ACT23.md`** — they need per-character briefs
(static + death sheet + walk video each), and two of the rules on this page are
inverted for them: dinos are generated in FINAL colors (colorway art bypasses
tinting) and every sheet ships with IDLE + DEATH from day one.

## NATURAL COLOR (skip the color rule — these are never tinted)

| file | prompt |
|---|---|
| `dino_nest.png` | dinosaur nest built of packed earth, bones and branches, containing three large speckled cream-colored eggs, ring of rib bones around the rim, seen from directly above — natural earthy browns and bone white |
| `egg.png` | single large dinosaur egg, cream colored with olive-green speckles, slightly glossy, seen from directly above at a slight angle |

## Optional flavor (existing filenames, replace anytime)

`crate.png` (supply crate), `bld_vent_a.png` / `bld_vent_b.png` (roof vent
units), effects in `../fx/` (explosion0-8, smoke0-7, puff0-5) — natural colors.
