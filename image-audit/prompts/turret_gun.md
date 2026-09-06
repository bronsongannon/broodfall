# `turret_gun` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Style references: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-c9c7bc2e-28e5-49c9-94d4-d9cc43bbd22a.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/turret_gun_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS rotating weapon sprite, Expedition colorway, destined for turret_gun_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their strict overhead accuracy, restrained palette, weathered hard-surface materials, and grounded finish, but do not copy naval subjects, layouts, or weaponry
Scene/backdrop: genuinely transparent background; one isolated rotating weapon mount only
Subject: a grounded single-barrel anti-ground cannon viewed directly from overhead, authored pointing exactly straight up toward the top edge: one broad low circular traverse collar, a compact armored gun housing and breech in the lower half, one thick heavy cannon barrel projecting along the exact vertical centerline into the upper half, with a readable recoil sleeve and muzzle end. Heavy, deliberate battlefield engineering rather than futuristic energy weapon. This sprite is only the rotating mount that sits over a separate building base
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view; perfectly centered; barrel exactly vertical and pointing straight up; complete isolated mount visible; traverse pivot aligned to the horizontal center and about 58% down from the artwork's top so the barrel extends forward; fill about 78% of a square canvas with safe transparent padding on every edge; extremely clear at 28×28 pixels. No perspective tilt, foreshortening, isometric view, or diagonal aim
Lighting/mood: neutral diffuse overhead lighting; no cast shadow
Color palette: mostly weathered charcoal/gunmetal with muted taupe armored housing; restrained Expedition teal only on two small identification panels and a narrow barrel/recoil collar; off-white technical trim; one tiny warm amber status light
Materials/textures: scuffed steel, panel seams, bolts, recoil rails, chipped paint, dust/salt staining; simple bold value-separated shapes and strong silhouette, minimal micro-detail
Constraints: exactly one cannon barrel; one isolated rotating anti-ground mount only; no building base, foundation, scenery, ammunition, projectile, muzzle flash, smoke, crew, people, text, letters, numerals, logos, insignia, shadow, checkerboard, border, or frame; genuine clean alpha transparency with antialiased edges; no canvas contact
Avoid: twin barrels, splayed barrels, tank vehicle, entire building, naval cannon battery, giant teal housing, glossy mobile-game vector art, toy-like cyan, sci-fi laser, perspective
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Edit target: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/turret_gun_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-36e7b42d-52c0-45ae-a069-eb9b7fb55126.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/turret_gun_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS rotating anti-ground cannon sprite, Rubicon colorway, destined for turret_gun_red.png
Input image: Image 1 is the approved normalized Expedition single-barrel cannon edit target
Primary request: perform a precise colorway edit only. Recolor the restrained Expedition teal identification panels, narrow recoil collar, and small status-light housing to restrained Rubicon dark iron-red and muted oxide-red. Keep the weathered charcoal/gunmetal barrel and traverse collar, muted taupe armored housing, off-white technical trim, and tiny warm amber status light unchanged. Universal industrial hazard accents, if any, remain hazard yellow
Composition/framing: preserve pixel-for-pixel placement of the exact silhouette, single barrel, housing, recoil sleeve, traverse collar, footprint, pivot, scale, centering, transparent padding, strict vertical orientation, and neutral lighting. The one barrel remains exactly straight up toward the top edge in strict orthographic 90-degree overhead
Constraints: color pixels only; do not add, remove, redraw, move, resize, rotate, thicken, shorten, duplicate, or reinterpret any component. Exactly one barrel; isolated rotating mount only; no building base, foundation, scenery, projectile, muzzle flash, smoke, crew, text, letters, numerals, logos, insignia, shadow, checkerboard, border, or canvas contact. Genuine clean alpha transparency
Avoid: independently regenerated cannon, twin or splayed barrels, changed geometry, tank vehicle, saturated bright-red housing, perspective tilt, sci-fi laser
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition cannon mount
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-084ffd3a-8076-4c1c-b6d2-3bbe353c5acc.png`
- Production destination: `assets/sprites/turret_gun_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the rotating housing's painted armor muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white trim, a charcoal/gunmetal barrel and collar, near-black recesses, the tiny amber status light, and restrained wear. The user approved the result with the exact single-barrel silhouette, traverse mount, vertical orientation, scale, and footprint preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/turret_gun_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
