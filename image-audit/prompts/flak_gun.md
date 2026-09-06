# `flak_gun` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Style references: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-d33e7d4c-bcdc-4df5-8eb8-042e56314a98.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/flak_gun_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS rotating anti-air weapon sprite, Expedition colorway, destined for flak_gun_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their strict overhead accuracy, restrained palette, weathered hard-surface materials, and grounded finish, but do not copy naval subjects, layouts, or weaponry
Scene/backdrop: genuinely transparent background; one isolated rotating weapon mount only
Subject: a visually distinct twin-barrel rapid-tracking anti-aircraft mount viewed directly from overhead, authored pointing exactly straight up toward the top edge: a compact low circular traverse collar, paired breech housings and recoil rails in the lower half, and exactly two slender equal-length autocannon barrels projecting into the upper half. Both barrels are perfectly straight, exactly vertical, parallel to each other, evenly spaced, and pointing upward—never splayed or angled. Include a compact off-center optical/sensor pod and ammunition feed covers to communicate AA tracking. This sprite is only the rotating mount that sits over a separate flak base
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view; perfectly centered; twin barrels exactly vertical and parallel; complete isolated mount visible; traverse pivot aligned to the canvas center and about 58% down from the artwork's top so the barrels extend forward; fill about 78% of a square canvas with safe transparent padding on every edge; extremely clear at 28×28 pixels. No perspective tilt, foreshortening, isometric view, diagonal aim, or splay
Lighting/mood: neutral diffuse overhead lighting; no cast shadow
Color palette: mostly weathered charcoal/gunmetal with muted taupe mechanisms; restrained Expedition teal only on small identification panels, recoil-rail guards, and sensor housing; off-white technical trim; one tiny warm amber sensor light
Materials/textures: scuffed steel, panel seams, fasteners, twin recoil rails, vented barrel jackets, chipped paint, dust/salt staining; simple bold value-separated shapes and strong silhouette, minimal micro-detail
Constraints: exactly two barrels, identical length, straight up, parallel; one isolated rotating AA mount only; no building base, foundation, radar dish, scenery, ammunition, projectile, muzzle flash, smoke, crew, people, text, letters, numerals, logos, insignia, shadow, checkerboard, border, or frame; genuine clean alpha transparency with antialiased edges; no canvas contact
Avoid: single barrel, three or more barrels, splayed barrels, complete building, naval cannon battery, giant teal housing, glossy mobile-game vector art, toy-like cyan, sci-fi laser, perspective
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Edit target: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/flak_gun_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-7eea0593-c381-4087-ad8c-a5115abb6cf3.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/flak_gun_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS rotating twin-barrel anti-air mount sprite, Rubicon colorway, destined for flak_gun_red.png
Input image: Image 1 is the approved normalized Expedition twin-barrel AA mount edit target
Primary request: perform a precise colorway edit only. Recolor the restrained Expedition teal identification panels, recoil-rail guards, ammunition-feed covers, and sensor housing to restrained Rubicon dark iron-red and muted oxide-red. Keep the weathered charcoal/gunmetal twin barrels and traverse collar, muted taupe mechanisms, off-white technical trim, optical glass, and tiny warm amber sensor light unchanged. Universal industrial hazard accents, if any, remain hazard yellow
Composition/framing: preserve pixel-for-pixel placement of the exact silhouette, exactly two barrels, paired breeches, sensor pod, traverse collar, footprint, pivot, scale, centering, transparent padding, strict vertical orientation, and neutral lighting. Both equal-length barrels remain exactly straight up, parallel, and evenly spaced in strict orthographic 90-degree overhead
Constraints: color pixels only; do not add, remove, redraw, move, resize, rotate, splay, thicken, shorten, duplicate, or reinterpret any component. Exactly two barrels; isolated rotating AA mount only; no building base, foundation, radar dish, scenery, projectile, muzzle flash, smoke, crew, text, letters, numerals, logos, insignia, shadow, checkerboard, border, or canvas contact. Genuine clean alpha transparency
Avoid: independently regenerated flak mount, single or three-plus barrels, splayed barrels, changed geometry, saturated bright-red housing, perspective tilt, sci-fi laser
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition flak mount
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-fadbf1ef-3caa-4747-88a1-e0da28e3f3bd.png`
- Production destination: `assets/sprites/flak_gun_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the rotating housing and recoil-rail guards muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white trim, charcoal/gunmetal barrels and mechanisms, near-black recesses, optical glass, the amber sensor light, and restrained wear. The user approved the result with exactly two parallel barrels, the paired breeches, sensor pod, traverse collar, vertical orientation, and footprint preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/flak_gun_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
