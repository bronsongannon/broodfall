# `bld_turret` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Style references: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-22c71ad2-c4b8-459d-986d-2b6dabab30ee.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_turret_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS defensive-building base sprite, Expedition colorway, destined for bld_turret_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their strict overhead accuracy, restrained palette, weathered hard-surface materials, and grounded finish, but do not copy naval subjects or layouts
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a compact low-profile expeditionary anti-ground turret BASE viewed directly from overhead: a broad heavy circular-to-hexagonal armored foundation with a strong squat silhouette, layered radial armor plates, four restrained anchoring lugs, recessed cable channels, service panels, bolts, compact ammunition-feed machinery, and a clearly defined EMPTY central circular rotating-mount socket. This is base machinery only. Keep the central socket open, level, and visually uncluttered so a separately rotating cannon can sit over it. Absolutely no weapon, gun, barrel, cannon, turret head, muzzle, or projectile baked into the base
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, perfectly centered and axis-aligned, complete footprint visible, fills about 82% of a square canvas with safe transparent padding on every edge; designed to stay readable at 40×40 pixels. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber powered-status light housing near the perimeter; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, narrow ring insets, cable guards, and light housing; off-white technical trim; warm amber light
Materials/textures: scuffed armored plate, panel seams, fasteners, non-slip maintenance covers, chipped paint, dust/salt staining; bold value-separated shapes, minimal micro-clutter
Constraints: one turret base only; central rotating-mount socket clear; base machinery only; genuine clean alpha transparency including antialiased edges; no canvas contact; no baked gun or barrels, no baked ground, concrete pad, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, scenery, checkerboard, border, or frame
Avoid: complete turret with weapon, tank turret, twin guns, giant teal disc, glossy mobile-game vector art, toy-like cyan, sci-fi neon, perspective walls
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Edit target: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_turret_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-b9f2a3af-0054-4f81-aac6-e23e257381f1.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_turret_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS anti-ground turret-base sprite, Rubicon colorway, destined for bld_turret_red.png
Input image: Image 1 is the approved normalized Expedition anti-ground turret BASE edit target
Primary request: perform a precise colorway edit only. Recolor the restrained Expedition teal identification treatment—small inset armor panels, narrow ring insets, cable guards, and status-light housing—to restrained Rubicon dark iron-red and muted oxide-red. Keep the weathered charcoal/gunmetal and muted taupe structure, off-white technical trim, and warm amber light unchanged. Universal industrial hazard accents, if any, remain hazard yellow
Composition/framing: preserve the exact heavy circular-to-hexagonal silhouette, empty central rotating-mount socket, all machinery, anchoring lugs, panel seams, footprint, pivot, scale, centering, transparent padding, orientation, and neutral lighting. Strict orthographic 90-degree overhead view remains unchanged
Constraints: color pixels only; do not add, remove, redraw, move, resize, rotate, fill, or reinterpret any component. Base machinery only; keep the central socket clear. Absolutely no gun, barrel, cannon, turret head, muzzle, weapon, or projectile. Genuine transparent background with clean antialiased alpha; no baked checkerboard, ground, slab, water, shadow, text, letters, numerals, logos, insignia, people, scenery, border, or canvas contact
Avoid: independently regenerated turret base, complete armed turret, altered machinery, saturated bright-red disc, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition turret base
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-22c1265b-0393-4e71-8458-21883ef930dc.png`
- Production destination: `assets/sprites/bld_turret_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the base's main armor fields muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white trim, charcoal machinery, near-black recesses, the amber status light, and restrained wear. The user approved the result with the heavy circular-to-hexagonal silhouette, anchoring lugs, machinery, and empty central rotating-mount socket preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_turret_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
