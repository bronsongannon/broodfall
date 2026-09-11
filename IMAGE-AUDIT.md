# Broodfall image audit

Baseline audited 2026-09-05. The complete-repository findings below describe the pre-overhaul baseline and exclude generated copies under `mac/build`. Phase-specific records are frozen separately so later art work does not rewrite the evidence for an earlier phase.

## Current soldier revision — brighter faction color, 2026-09-08

The user-approved soldier revision supersedes the Phase 3 soldier pixels below. Its production scope is **160 files across six complete aqua/teal and red families**: Marine 28, Engineer 26, Sniper 28, Medic 26, Rocket Trooper 26, and Boone/Commando 26. The additional 13 red Commando slots provide the newly approved matching colorway; they do not change campaign team assignments. Static poses, eight-frame walks, four-frame deaths, and Marine/Sniper hunker poses move together as complete families.

This revision favors brighter, dominant aqua/red weathered armor for small-screen readability, a narrower Engineer, a larger Medic backpack with white uniform accents, and Boone's retained gold markings. Standing and walking bodies face north as a whole, including feet, torso, arms, head, and carried weapons. Rocket launcher direction follows the soldier throughout each pose, including the approved falling poses. Gameplay draw boxes and mechanics remain unchanged. The art-cache revision is `human-soldiers-20260908a`.

Current evidence lives separately from frozen Phase 3: [before](image-audit/phases/soldiers-brighter-20260908/before/), [after](image-audit/phases/soldiers-brighter-20260908/after/), [selected production mapping](image-audit/phases/soldiers-brighter-20260908/selection.json), and [surviving provenance artifacts](image-audit/phases/soldiers-brighter-20260908/provenance/). The [revision provenance guide](image-audit/prompts/soldiers-brighter-20260908.md) distinguishes recovered exact prompts from missing early records; older Phase 3 prompts are not substitutes for missing revision prompts.

**Installed; validation remains open.** All 160 production files byte-match their approved selected outputs and have no canvas-edge contact. The current [validator report](image-audit/phases/soldiers-brighter-20260908/validation.json) contains **36 errors and 22 warnings** across the six families. The [triage record](image-audit/phases/soldiers-brighter-20260908/triage.md) identifies priority Marine alpha defects in teal hunker and red deaths 3/4, plus lesser red walk 7 erosion. Engineer and Sniper source-pose drift remains open. Medic/Rocket pivot flags correspond to deliberate top-anchored passing-frame normalizations of 7/8 source pixels, respectively; this explanation does not waive the findings. This is not a clean validator pass or a completed revision.

The [verification record](image-audit/phases/soldiers-brighter-20260908/verification.json) records a successful macOS Debug `xcodebuild`, a `verify-bundle --phase 3` byte match for all **162 files** (160 sprites, `game.js`, and `index.html`), and passing JavaScript syntax/diff checks. Browser QA loaded all 160 sprites with zero missing assets and no warning/error logs. Recorded views cover walking on moss/ash, deaths on snow, and static/hunker poses on steppe. A live Crystal Basin match started and displayed the new Marine; this was a smoke check, not a comprehensive gameplay-overlay regression test. These integration checks do not resolve the open art findings above.

## Status key

- **KEEP** — already fits its job and visual tier.
- **POLISH** — preserve the concept or animation; improve material, padding, scale, or runtime use.
- **REPLACE** — redraw as a coherent family if the new naval art becomes the global visual target.
- **REFERENCE** — source/master material; do not ship or judge as runtime-ready art.

## Art-direction benchmark

The naval trio remains the camera, silhouette, and hard-surface benchmark: true overhead presentation, worn metal, warm work lights, and clean transparency. For land-building color and value, the user-approved 2026-09-06 Barracks is now authoritative: aqua-dominant weathered armor, dirty warm taupe/off-white accents, crisp dark seams, and no cream or pastel finish. All 14 installed Expedition/teal Phase 1 families now apply that approved Barracks reference.

| Skiff | Carrier | Naval Shipyard |
|---|---|---|
| <img src="assets/sprites/bld_skiff.png" width="220" alt="Evacuation skiff"> | <img src="assets/sprites/unit_carrier_teal.png" width="220" alt="Expedition carrier"> | <img src="assets/sprites/bld_shipyard_teal.png" width="220" alt="Naval shipyard"> |
| **KEEP** | **KEEP — runtime scale polished in Phase 2** | **KEEP** |

The outgoing cleaner, chunkier human land roster is preserved in the frozen before evidence. Phases 1–3 migrated active human technology as complete families; future revisions must retain that atomic-family rule. Dinosaur and natural families remain deliberately untouched.

## Human technology replacement — Phase 1 complete

Phase 1 replaces the complete teal/red human building family and its separate rotating weapon mounts. The approved skiff, carrier, and naval shipyard remain the visual benchmark rather than replacement targets. Coverage moved from **25/31 present** at `HEAD` to **31/31 present** after the pass: 28 production targets and three benchmarks. The six genuinely new slots are the teal/red hydro dam, Overwatch Array, and flak-gun pairs.

All 28 replacement targets use strict 90-degree overhead presentation, weathered gunmetal/charcoal and muted taupe mass, restrained faction color, warm amber utility lights, and real alpha without baked ground, shadows, scenery, people, text, logos, or perspective. On 2026-09-06 all 14 Expedition/teal Phase 1 families received user-approved aqua-dominant, lighter, weathered revisions based on the approved Barracks reference. All 14 installed Rubicon/red counterparts still derive from superseded teal finals; each must be regenerated as a precise image-to-image colorway edit of its current approved teal counterpart, previewed separately, and explicitly approved before installation.

| Production family | Files | Source canvas | Runtime draw box | Exact prompt record |
|---|---|---:|---:|---|
| Headquarters | `bld_hq_{teal,red}.png` | 256×256 | 96×96 | [`bld_hq.md`](image-audit/prompts/bld_hq.md) |
| Barracks | `bld_barracks_{teal,red}.png` | 256×256 | 78×78 | [`bld_barracks.md`](image-audit/prompts/bld_barracks.md) |
| Factory | `bld_factory_{teal,red}.png` | 256×209 | 88×72 | [`bld_factory.md`](image-audit/prompts/bld_factory.md) |
| Supply Depot | `bld_supply_{teal,red}.png` | 256×256 | 56×56 | [`bld_supply.md`](image-audit/prompts/bld_supply.md) |
| Power Plant | `bld_power_{teal,red}.png` | 256×256 | 60×60 | [`bld_power.md`](image-audit/prompts/bld_power.md) |
| Refinery | `bld_refinery_{teal,red}.png` | 256×256 | 70×70 | [`bld_refinery.md`](image-audit/prompts/bld_refinery.md) |
| Airpad | `bld_airpad_{teal,red}.png` | 256×256 | 62×62 | [`bld_airpad.md`](image-audit/prompts/bld_airpad.md) |
| Missile Silo | `bld_silo_{teal,red}.png` | 256×256 | 70×70 | [`bld_silo.md`](image-audit/prompts/bld_silo.md) |
| Turret base | `bld_turret_{teal,red}.png` | 256×256 | 40×40 | [`bld_turret.md`](image-audit/prompts/bld_turret.md) |
| Flak base | `bld_flak_{teal,red}.png` | 256×256 | 40×40 | [`bld_flak.md`](image-audit/prompts/bld_flak.md) |
| Hydro Dam | `bld_hydro_{teal,red}.png` | 256×40 | 192×30 visual span; 84×64 collision | [`bld_hydro.md`](image-audit/prompts/bld_hydro.md) |
| Overwatch Array base | `bld_sensor_{teal,red}.png` | 256×256 | 60×60 | [`bld_sensor.md`](image-audit/prompts/bld_sensor.md) |
| Anti-ground mount | `turret_gun_{teal,red}.png` | 256×256 | 28×28 | [`turret_gun.md`](image-audit/prompts/turret_gun.md) |
| Twin-barrel AA mount | `flak_gun_{teal,red}.png` | 256×256 | 28×28 | [`flak_gun.md`](image-audit/prompts/flak_gun.md) |

The hydro source is intentionally ultra-wide and is drawn independently of its 84×64 collision footprint so it reaches both river banks without changing placement or navigation. The sensor sprite is the static base only; the rotating dish, feed horn, and sweep remain game-driven. Turret and flak bases contain no baked weapon. Their separate mounts retain live aiming and recoil, with a distinct twin-barrel asset for flak.

### Phase 1 evidence and validation

- Frozen before state: [`manifest.json`](image-audit/phases/phase-1/before/manifest.json), [`inventory.tsv`](image-audit/phases/phase-1/before/inventory.tsv), [`source-1.png`](image-audit/phases/phase-1/before/source-1.png), and actual-size [`gameplay-1.png`](image-audit/phases/phase-1/before/gameplay-1.png) / [`gameplay-2.png`](image-audit/phases/phase-1/before/gameplay-2.png). It records 25 present and the six hydro/sensor/flak-gun slots missing.
- Frozen after state: [`manifest.json`](image-audit/phases/phase-1/after/manifest.json), [`inventory.tsv`](image-audit/phases/phase-1/after/inventory.tsv), [`source-1.png`](image-audit/phases/phase-1/after/source-1.png), and actual-size [`gameplay-1.png`](image-audit/phases/phase-1/after/gameplay-1.png) / [`gameplay-2.png`](image-audit/phases/phase-1/after/gameplay-2.png). It records 31/31 present and no missing slot.
- All 28 target files decode as RGBA, span alpha 0–255, retain transparent padding, and have no content touching a canvas edge. Exact file and pixel SHA-256 values are in the after inventory.
- Source-scale and gameplay-scale contact sheets were inspected for silhouette, team recognition, padding, and readability. A live browser run confirmed that the authored building colorways render. Renderer review confirmed that construction, selection/health, queues/rally, power, sunk-building treatment, hydro water effects, sensor motion, and mounted-weapon motion remain separate runtime layers.
- Native validation passed with `xcodebuild -project mac/Broodfall.xcodeproj -scheme Broodfall -configuration Debug build` (`BUILD SUCCEEDED`). `python3 image-audit/generate.py verify-bundle /Users/bronsongannon/Library/Developer/Xcode/DerivedData/Broodfall-gzzfwjtnumwqfjfxepubshvogyuj/Build/Products/Debug/Broodfall.app --phase 1` then confirmed all 33 scoped files in the built app byte-match the workspace.

## Human technology replacement — Phase 2 complete

Phase 2 replaces the complete human ground-vehicle and aircraft colorway set as **nine matched Expedition/Rubicon pairs or poses (18 target files)**: APC, mobile artillery, deployed artillery hunker, gunship, Harrier, harvester, raider, capture rig, and tank. The approved Expedition carrier remains the nineteenth audited slot and a benchmark rather than a regenerated target. Coverage moved from **17/19 present** before the pass—the artillery hunker pair was absent—to **19/19 present** after it.

Every target is a strict 90-degree overhead, north-facing, 256×256 RGBA sprite with alpha spanning 0–255, safe transparent padding, and no content touching a canvas edge. The grounded weathered gunmetal/charcoal and muted taupe mass, restrained faction paint, off-white technical trim, and warm amber lights follow the Phase 1 production lock. Each Rubicon asset is an image-to-image colorway edit of its approved normalized Expedition counterpart rather than an independent redraw.

| Production family or pose | Files | Source canvas | Runtime draw box | Exact prompt record |
|---|---|---:|---:|---|
| APC | `unit_apc_{teal,red}.png` | 256×256 | 35×35 | [`unit_apc.md`](image-audit/prompts/unit_apc.md) |
| Artillery — mobile | `unit_artillery_{teal,red}.png` | 256×256 | 35×35 | [`unit_artillery.md`](image-audit/prompts/unit_artillery.md) |
| Artillery — deployed hunker | `unit_artillery_hunker_{teal,red}.png` | 256×256 | 35×35 | [`unit_artillery.md`](image-audit/prompts/unit_artillery.md) |
| Gunship | `unit_gunship_{teal,red}.png` | 256×256 | 34×34 | [`unit_gunship.md`](image-audit/prompts/unit_gunship.md) |
| Harrier | `unit_harrier_{teal,red}.png` | 256×256 | 32×32 | [`unit_harrier.md`](image-audit/prompts/unit_harrier.md) |
| Harvester | `unit_harvester_{teal,red}.png` | 256×256 | 30×30 | [`unit_harvester.md`](image-audit/prompts/unit_harvester.md) |
| Raider | `unit_raider_{teal,red}.png` | 256×256 | 30×30 | [`unit_raider.md`](image-audit/prompts/unit_raider.md) |
| Capture Rig | `unit_rig_{teal,red}.png` | 256×256 | 30×30 | [`unit_rig.md`](image-audit/prompts/unit_rig.md) |
| Tank | `unit_tank_{teal,red}.png` | 256×256 | 38×38 | [`unit_tank.md`](image-audit/prompts/unit_tank.md) |
| Expedition carrier — approved benchmark | `unit_carrier_teal.png` | 256×256 | 200×200 (formerly 136×136) | Existing approved reference; not regenerated |

Runtime integration now routes the gunship and Harrier special renderers through their authored `optCW` colorways. Authored artillery suppresses the duplicate legacy barrel-band decoration, and the deployed hunker colorway takes priority over the standing colorway. Authored Harvester and Rig sprites suppress only the duplicate procedural hazard-tick strokes; game-driven Harvester egg/crystal cargo state, Rig captive glow, and capture ring remain. Gunship rotor motion and Harrier payload state also remain dynamic rather than baked into the sprites. Raider, tank, and artillery muzzle-flash/smoke anchors moved from 17 to 14 px, 22 to 17 px, and 28 to 16 px respectively so the effects meet the authored muzzles; APC/default and gunship anchors already aligned.

The carrier source art is unchanged, but its runtime draw box increased from 136×136 to 200×200. Its oriented selection ellipse and pointer-hit geometry now follow the enlarged rendered footprint. Navigation radius, shoreline-fit checks, and wake origin remain unchanged, so the visual correction does not alter pathing or coastal clearance.

### Phase 2 evidence and validation

- Frozen before state: [`manifest.json`](image-audit/phases/phase-2/before/manifest.json), [`inventory.tsv`](image-audit/phases/phase-2/before/inventory.tsv), [`source-1.png`](image-audit/phases/phase-2/before/source-1.png), and actual-size [`gameplay-1.png`](image-audit/phases/phase-2/before/gameplay-1.png). It records 17/19 present, with only the two artillery hunker slots missing.
- Frozen after state: [`manifest.json`](image-audit/phases/phase-2/after/manifest.json), [`inventory.tsv`](image-audit/phases/phase-2/after/inventory.tsv), [`source-1.png`](image-audit/phases/phase-2/after/source-1.png), and actual-size [`gameplay-1.png`](image-audit/phases/phase-2/after/gameplay-1.png). It records 19/19 present and no missing slot; exact file and pixel SHA-256 values are in the inventory.
- Source-scale and actual gameplay-size contact sheets were inspected for camera, silhouette, pair geometry, alpha edges, padding, and small-size readability. A live browser run showed the new Expedition vehicles plus selection/health feedback, and the browser console contained no warning or error entries.
- Static code checks passed: `node --check game.js` and `git diff --check`.
- Native validation passed with `xcodebuild -project mac/Broodfall.xcodeproj -scheme Broodfall -configuration Debug build` (`BUILD SUCCEEDED`). `python3 image-audit/generate.py verify-bundle /Users/bronsongannon/Library/Developer/Xcode/DerivedData/Broodfall-gzzfwjtnumwqfjfxepubshvogyuj/Build/Products/Debug/Broodfall.app --phase 2` then confirmed all 21 scoped files in the built app byte-match the workspace.

## Human technology replacement — Phase 3 complete (frozen 2026-09-05 record)

This section records the original 147-file Phase 3 installation and its historical verification. The 2026-09-08 revision above is authoritative for current soldier pixels, coverage, cache revision, and verification status; the frozen evidence and original prompt ledgers remain unchanged.

Phase 3 replaces the entire production human-soldier set as **147 authored files**, installed only after each unit's complete static, walk, death, faction, and applicable hunker family was ready. Marine and Sniper each have matched teal/red static, eight-frame walk, four-frame death, and hunker poses; Engineer, Medic, and Rocket each have matched teal/red static, eight-frame walk, and four-frame death sets; Boone/Commando is a player-only teal static, eight-frame walk, and four-frame death set.

Every target is a north-facing 256×256 RGBA sprite made as one distinct built-in ImageGen call. Each selected call includes all three approved benchmarks—`bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png`; derived pose calls additionally include the normalized unit master used to lock identity, and red edits use the corresponding normalized teal frame as their authoritative image input. The Expedition/teal family was authored first; every Rubicon/red frame is a precise image-to-image colorway edit rather than an independent pose redraw. Exact prompts, selected-output provenance, normalization, retries, and production destinations are preserved in one family ledger per unit.

| Production family | Files | Source canvas | Runtime draw box | Exact prompt record |
|---|---:|---:|---:|---|
| Marine | 28: teal/red static + walk 1–8 + death 1–4 + hunker | 256×256 | 30×30 | [`unit_marine_family.md`](image-audit/prompts/unit_marine_family.md) |
| Engineer | 26: teal/red static + walk 1–8 + death 1–4 | 256×256 | 29×29 | [`unit_engineer_family.md`](image-audit/prompts/unit_engineer_family.md) |
| Sniper | 28: teal/red static + walk 1–8 + death 1–4 + hunker | 256×256 | 32×32 | [`unit_sniper_family.md`](image-audit/prompts/unit_sniper_family.md) |
| Medic | 26: teal/red static + walk 1–8 + death 1–4 | 256×256 | 30×30 | [`unit_medic_family.md`](image-audit/prompts/unit_medic_family.md) |
| Rocket Trooper | 26: teal/red static + walk 1–8 + death 1–4 | 256×256 | 32×32 | [`unit_rocket_family.md`](image-audit/prompts/unit_rocket_family.md) |
| Boone / Commando | 13: teal static + walk 1–8 + death 1–4 | 256×256 | 32×32 | [`unit_commando_family.md`](image-audit/prompts/unit_commando_family.md) |

The authored draw boxes are independent of collision and pathfinding geometry. Walk playback uses an eight-frame, distance-driven cadence so planted motion stays coupled to travel speed. Hunker art takes priority for Marine and Sniper, human corpse rendering follows each family draw box, and selection/hunker rings follow the authored visual footprint. Authored Marine, Sniper, Rocket, and Commando details suppress their duplicate legacy procedural decorations. Marine, Sniper, Rocket, and Commando muzzle anchors are each 14 px so effects meet the new weapons. The production asset revision is `human-tech-20260906c5`.

### Phase 3 evidence and validation

- Frozen before state under [`image-audit/phases/phase-3/before/`](image-audit/phases/phase-3/before/) records 145/147 present, with the Marine teal/red hunker pair absent. Its inventory records 73 legacy alpha masks contacting a canvas edge; visual review identified 38 of those as meaningfully clipped by weapons, limbs, tools, packs, or cloaks.
- Frozen after state under [`image-audit/phases/phase-3/after/`](image-audit/phases/phase-3/after/) records 147/147 present. All 147 production sprites are 256×256 RGBA with transparent padding and zero canvas-edge contact; per-family geometry validation is preserved in [`family-validation.json`](image-audit/phases/phase-3/after/family-validation.json).
- [`human-animation-preview.html`](image-audit/human-animation-preview.html) provides actual-size and 4× motion QA for walk, death, static, and hunker states without changing production gameplay.
- The former 38 clipped-frame issue and missing Marine hunker pair are resolved by the complete Phase 3 replacement; the baseline montage remains below as historical evidence.
- Final verification passes: 147/147 sprites produced zero validator errors; all 14 review-only pair-overlap advisories were visually cleared in the five source sheets, seven gameplay sheets, and the 147-loaded motion harness across four representative map palettes. Browser warnings/errors were empty, `node --check`, Python compilation, and `git diff --check` passed, the requested macOS Debug build succeeded, and the bundle verifier byte-matched all 149 Phase 3 payload files.

## Recommended order

| Priority | Status | Work | Reason |
|---:|---|---|---|
| 1 | **REPLACE** | `water.png` through `water4.png` as one seamless four-frame family | Visible tiling and banding; `water4` abruptly changes to a photographic texture and has the worst edge mismatch. |
| 2 | **PHASES 1–3 COMPLETE** | Human buildings, vehicles, aircraft, and complete soldier families | The human-technology replacement now covers every scoped production family; preserve each family atomically. |
| 3 | **REPLACE AS FAMILIES** | High-frequency terrain, natural props, and combat FX | These are the largest remaining style breaks after human technology. |
| 4 | **COMPLETE — PHASE 2** | Aircraft/hunker art selection and carrier scale | Authored aircraft and deployed artillery render correctly; the carrier has a larger matched visual/selection footprint without navigation changes. |
| 5 | **INSTALLED — VALIDATION OPEN** | Infantry clipping, animation continuity, and human hunker coverage | The current brighter revision installs 160 approved soldier files; its 36 validator errors and 22 warnings remain open for review. Frozen Phase 3 separately records its original 147-file validation. |
| 6 | **REFRESH LAST** | Map thumbnails and store screenshots | Re-capture only after the in-game art pass is stable. |

## Family decisions

| Family | Decision | Notes |
|---|---|---|
| Naval trio | **KEEP** | Current benchmark. Phase 2 enlarged the carrier's runtime and interaction footprint while preserving navigation and shore fit. |
| Portraits and key art | **KEEP** | Strong cinematic realism, consistent lighting, and grounded tone. |
| macOS icon family | **KEEP** | Crystal silhouette holds through 32 px; 16 px is abstract but still recognizable. |
| Legacy neutral military fallbacks | **POLISH** | Angles and silhouettes remain useful as absent-slot fallbacks, but active final-color human families now supersede them. |
| Legacy neutral mechanical fallbacks | **POLISH** | Useful overhead geometry remains available for absent slots; active final-color buildings now supersede it. |
| Wildlife except Spitter | **POLISH** | Silhouettes and animation read well. Improve surface texture and midtone separation; Broodmother is dark at play size. |
| Dino structures and natural props | **POLISH** | Strong concepts, but line weight, realism, and edge treatment vary. |
| Smoke and puff FX | **POLISH** | Preserve timing and silhouettes; introduce translucent textured smoke. |
| Map thumbnails | **POLISH** | Normalize exposure and framing. Rebuild `coast.jpg` first without transient units or UI. |
| Red/teal building colorways | **14 TEAL REVISIONS APPROVED; 14 RED REVISIONS PENDING** | All 14 Phase 1 teal families now use the lighter, aqua-dominant, weathered Barracks reference. All 14 installed red counterparts remain based on superseded teal and require new colorway generation from current teal plus separate preview approval. |
| Red/teal vehicle colorways | **COMPLETE — PHASE 2** | Nine paired travel/deployed families now match the naval benchmark and preserve authored orientation plus dynamic state overlays. |
| Infantry static/walk/death sets | **INSTALLED — VALIDATION OPEN** | The 2026-09-08 revision installs 160 files, including both Commando colorways, complete eight-frame walks and four-frame deaths, and applicable hunker poses. See the open validator findings above; the original 147-file Phase 3 record is historical. |
| Spitter teal/wild sets | **REPLACE AS COMPLETE SETS** | Flat cyan and acid-green treatment is the largest wildlife palette break. |
| Water family | **REPLACE** | The four frames do not read as one animation or a reliably seamless material. |
| `tree.png`, `tree_dead.png`, `crate.png` | **REPLACE** | High-frequency props in a visibly different illustration language. |
| Explosion and shot FX | **REPLACE** | Comic starbursts and orange outlined clouds fight the more grounded benchmark. |
| Store screenshots | **REPLACE AFTER ART PASS** | They document the outgoing roster at a very wide scale and have weak focal compositions. |
| Legacy BODY/fallback pieces | **KEEP UNTIL LOADER CHANGES** | They are visually old, but the BODY loader is all-or-nothing. Removing one currently disables normal custom body/building art. |
| Sprite and portrait source folders | **REFERENCE** | Masters and generation inputs only. Opaque backgrounds and inconsistent dimensions are expected here. |

## Baseline technical findings (before Phase 1)

- **506 canonical images / 152.94 MiB:** 483 PNG and 23 JPEG.
- **368 live game images:** 325 sprites, 25 FX, 14 map thumbnails, and 4 portraits.
- **All files decode correctly.** No corrupt, blank, uniform, zero-size, or fully transparent images were found.
- **Transparency is healthy.** All 321 transparent live sprites have real alpha; only the four full-frame water tiles are RGB, as expected.
- **Animation numbering is complete.** Every present walk series runs 1–8 and every present death series runs 1–4.
- **No top-level sprite filename is orphaned.** All 325 production sprite PNGs match a registered loader slot.
- **Baseline only: 38 frames were visibly cropped.** Phase 3 replaced them with padded 256×256 RGBA frames that have zero edge contact; the board below is retained as frozen history.
- **Five FX pairs are exact duplicates:** `explosion4/5`, `explosion7/8`, `puff2/4`, `puff3/5`, and `smoke6/7`.
- **Four aircraft colorways are loaded but unreachable:** `unit_gunship_teal/red` and `unit_harrier_teal/red`. Their special renderers use the neutral images and multiply-tint them instead.
- **Baseline only: hunker coverage was inconsistent.** Phase 2 resolved authored artillery hunker selection; Phase 3 added the missing Marine teal/red pair and preserved authored Sniper hunker priority.
- **Resolved in Phase 2:** gunship and Harrier special renderers now use authored team colorways; deployed artillery has a complete teal/red hunker pair with selection priority over standing art.
- **Resolved in Phase 2:** the carrier is drawn at 200×200 with matching oriented selection/hit geometry while navigation radius, shoreline fit, and wake origin remain unchanged.
- **Resolved in Phase 1:** sprite-backed flak now uses its own twin-barrel `flak_gun_{teal,red}` mount while turret retains its single-barrel pair; both preserve live aim and recoil.
- **The optional loader probes 903 names; 590 are intentionally absent.** These are mostly impossible team/animation combinations, not missing art. A manifest would avoid needless requests.
- **Store art is bundled but not referenced at runtime.** Consider excluding `assets/store` from the macOS game bundle.
- **The repo-local `mac/build` app is stale.** The current DerivedData build contains the carrier and shipyard correctly.

### Border-risk montage

Historical pre-overhaul evidence: every affected human frame listed here was replaced in Phase 3 and no longer touches a canvas edge.

![Sprites with content clipped at a canvas edge](image-audit/12-border-risk.png)

Affected groups:

- Engineer death 2–4, red and teal: 6 frames
- Medic death 1–4, red and teal: 8 frames
- Rocket death 1–4, red and teal: 8 frames
- Marine death 1 and 3 red; death 1–3 teal: 5 frames
- Commando death 3 teal: 1 frame
- Sniper walk 1, 3, 5, 6, and 7 red and teal: 10 frames

## Complete baseline visual reference

Every production frame is shown below with filename and native dimensions. Full per-file metadata is also available as [`image-audit/inventory.tsv`](image-audit/inventory.tsv) and [`image-audit/inventory.json`](image-audit/inventory.json).

### Buildings — 38 files

![Buildings contact sheet 1](image-audit/01-buildings-1.png)

![Buildings contact sheet 2](image-audit/01-buildings-2.png)

### Static units — 53 files

![Static units contact sheet 1](image-audit/02-units-static-1.png)

![Static units contact sheet 2](image-audit/02-units-static-2.png)

### Human animation — 132 files

![Human animation contact sheet 1](image-audit/03-human-animation-1.png)

![Human animation contact sheet 2](image-audit/03-human-animation-2.png)

![Human animation contact sheet 3](image-audit/03-human-animation-3.png)

![Human animation contact sheet 4](image-audit/03-human-animation-4.png)

![Human animation contact sheet 5](image-audit/03-human-animation-5.png)

### Dino animation — 80 files

![Dino animation contact sheet 1](image-audit/04-dino-animation-1.png)

![Dino animation contact sheet 2](image-audit/04-dino-animation-2.png)

![Dino animation contact sheet 3](image-audit/04-dino-animation-3.png)

### Terrain and fallback components — 22 files

![Terrain and fallback components](image-audit/05-terrain-components-1.png)

### Combat effects — 25 files

![Combat effects](image-audit/06-effects-1.png)

### Map thumbnails — 14 files

![Map thumbnails](image-audit/07-map-thumbnails-1.png)

### Portraits, key art, and store screenshots — 12 files

![Portraits, key art, and store screenshots](image-audit/08-portraits-store-1.png)

### Sprite source archive — 112 files

![Sprite source archive 1](image-audit/09-source-archive-1.png)

![Sprite source archive 2](image-audit/09-source-archive-2.png)

![Sprite source archive 3](image-audit/09-source-archive-3.png)

![Sprite source archive 4](image-audit/09-source-archive-4.png)

### Portrait masters — 6 files

![Portrait source masters](image-audit/10-portrait-sources-1.png)

### macOS icon family and masters — 12 files

![macOS app icons](image-audit/11-app-icons-1.png)

## Individual replacement guardrails

When replacing a family:

1. Author at a strict 90-degree overhead angle.
2. Preserve the existing facing direction and runtime pivot.
3. Keep occupancy consistent across idle, walk, hunker, and death frames.
4. Leave transparent padding around every extreme pose.
5. Use worn neutral material for most mass; reserve teal/red for identification panels and lights.
6. Test at actual 24–40 px unit size before approving the 256 px source.
7. Complete both team variants and the full animation family before switching the runtime over.
