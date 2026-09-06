# `bld_flak` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Style references: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-3b7a6d1f-9556-49ef-8af9-4a4c42ec71a9.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_flak_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS defensive-building base sprite, Expedition colorway, destined for bld_flak_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their strict overhead accuracy, restrained palette, weathered hard-surface materials, and grounded finish, but do not copy naval subjects or layouts
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a compact expeditionary anti-air FLak BASE viewed directly from overhead, visually distinct from a heavy anti-ground turret: a low four-lobed square-to-cross-shaped stabilizer platform with clipped corners, lightweight armored outriggers, paired recessed ammunition-feed drums, small sky-tracking sensor cabinets, cooling vents, cable conduits, bolts, and an EMPTY central circular rotating-mount socket. Make the silhouette and equipment read as rapid-tracking anti-air/sensor machinery at 40 pixels. This is base machinery only. Keep the center clear and uncluttered for a separately rotating twin-barrel AA mount. Absolutely no weapon, gun, barrel, cannon, turret head, muzzle, radar dish, or projectile baked into the base
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, perfectly centered and axis-aligned, complete footprint visible, fills about 82% of a square canvas with safe transparent padding on every edge; designed to stay readable at 40×40 pixels. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber powered-status light housing near one perimeter corner; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, sensor housings, narrow cable guards, and ring insets; off-white technical trim; warm amber light
Materials/textures: scuffed armored plate, panel seams, fasteners, vent grilles, compact servos, chipped paint, dust/salt staining; bold value-separated shapes, minimal micro-clutter
Constraints: one flak base only; central rotating-mount socket clear; base machinery only; genuine clean alpha transparency including antialiased edges; no canvas contact; no baked gun or barrels, no radar dish, no baked ground, concrete pad, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, scenery, checkerboard, border, or frame
Avoid: complete flak gun with weapon, heavy round anti-ground turret silhouette, tank turret, giant teal slab, glossy mobile-game vector art, toy-like cyan, sci-fi neon, perspective walls
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Edit target: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_flak_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-f0e26f98-0dcc-407d-93b1-7cde90946716.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_flak_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS anti-air flak-base sprite, Rubicon colorway, destined for bld_flak_red.png
Input image: Image 1 is the approved normalized Expedition anti-air flak BASE edit target
Primary request: perform a precise colorway edit only. Recolor the restrained Expedition teal identification treatment—small sensor cabinets, inset armor panels, narrow cable guards, ammunition-feed housings, and status-light housing—to restrained Rubicon dark iron-red and muted oxide-red. Keep the weathered charcoal/gunmetal and muted taupe structure, off-white technical trim, and warm amber light unchanged. Universal industrial hazard accents, if any, remain hazard yellow
Composition/framing: preserve the exact four-lobed square-to-cross silhouette, empty central rotating-mount socket, paired feed drums, sensor-oriented equipment, machinery, panel seams, footprint, pivot, scale, centering, transparent padding, orientation, and neutral lighting. Strict orthographic 90-degree overhead view remains unchanged
Constraints: color pixels only; do not add, remove, redraw, move, resize, rotate, fill, or reinterpret any component. Base machinery only; keep the central socket clear. Absolutely no gun, barrels, cannon, turret head, radar dish, muzzle, weapon, or projectile. Genuine transparent background with clean antialiased alpha; no baked checkerboard, ground, slab, water, shadow, text, letters, numerals, logos, insignia, people, scenery, border, or canvas contact
Avoid: independently regenerated flak base, complete armed flak turret, heavy round anti-ground silhouette, altered machinery, saturated bright-red slab, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition flak base
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-12707f48-4c40-40e2-a255-ec7a1639ff0f.png`
- Production destination: `assets/sprites/bld_flak_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the base's broad armor fields muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white trim, charcoal feed machinery and recesses, the amber status light, and restrained wear. The user approved the result with the four-lobed silhouette, paired feed drums, sensor equipment, and empty central rotating-mount socket preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_flak_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
