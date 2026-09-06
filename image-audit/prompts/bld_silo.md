# `bld_silo` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Style references: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`, `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-9eabf0f9-877f-434d-a71d-0cdfc8ff3ba5.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_silo_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_silo_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their strict overhead accuracy, restrained palette, weathered hard-surface materials, and grounded finish, but do not copy naval subjects or layouts
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a hardened expeditionary missile-launch silo viewed directly from overhead, a squat circular-to-octagonal armored installation with a strong compact silhouette; an open central cylindrical launch tube with a deep dark empty well; two heavy blast-door halves fully retracted outward on visible rails, plus restrained radial service machinery, hydraulic actuators, vents, cable conduits, access panels, bolts, and maintenance hatches around the outer ring. The tube is empty: absolutely no missile, rocket, warhead, nose cone, projectile, or permanent object in its center. Keep the center and a clean annular zone immediately around the tube visually open for a separately drawn live warhead and animated hazard ring
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, perfectly centered and axis-aligned, complete footprint visible, fills about 84% of a square canvas with safe transparent padding on every edge; readable at 70×70 pixels. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber equipment lights; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, rails, narrow insets, and light housings; off-white technical trim; warm amber lights
Materials/textures: scuffed armored plate, panel seams, fasteners, hydraulic rails, chipped paint, dust/salt staining, functional machinery; strong midtone separation at gameplay size
Constraints: one silo base only; open empty launch tube and retracted blast doors; center kept clear; no baked hazard ring; genuine clean alpha transparency including antialiased edges; no canvas contact; no baked ground, concrete pad, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, scenery, checkerboard, border, or frame
Avoid: closed hatch, permanent missile or warhead, giant teal surface, glossy mobile-game vector art, toy-like cyan, sci-fi neon, perspective walls, visible horizon
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Edit target: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_silo_teal.png`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-9ac0-7b92-88e6-1310455d794f/exec-c0feb224-53a7-47f3-ad3b-183ea8bf18b7.png`
- Processing: `python3 image-audit/process_generated_sprite.py <original> <final> --canvas 256x256 --padding 14`
- Final: `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_silo_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS missile-silo sprite, Rubicon colorway, destined for bld_silo_red.png
Input image: Image 1 is the approved normalized Expedition silo edit target
Primary request: perform a precise colorway edit only. Recolor the restrained Expedition teal identification treatment—small inset panels, narrow rail accents, cable guards, and teal light housings—to restrained Rubicon dark iron-red and muted oxide-red. Keep the weathered charcoal/gunmetal and muted taupe armored structure, off-white technical trim, and warm amber work lights unchanged. Universal industrial hazard accents, if any, remain hazard yellow
Composition/framing: preserve the exact silhouette, geometry, open empty launch tube, fully retracted blast doors, machinery, panel seams, footprint, pivot, scale, centering, transparent padding, orientation, and neutral lighting. Strict orthographic 90-degree overhead view remains unchanged
Constraints: color pixels only; do not add, remove, redraw, move, resize, rotate, close, or reinterpret any component. Keep the central tube empty and its surrounding annular area clear for the live warhead and animated hazard ring. Absolutely no missile, rocket, warhead, nose cone, projectile, permanent center object, or baked hazard ring. Genuine transparent background with clean antialiased alpha; no baked checkerboard, ground, slab, water, shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, scenery, border, or canvas contact
Avoid: independently regenerated silo, altered doors, changed machinery, saturated red covering the entire facility, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition silo
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a0772c-daf4-78f3-a92b-63d3ece37062/exec-433d50de-32fb-4cc4-b029-7b91890e701a.png`
- Production destination: `assets/sprites/bld_silo_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the silo's broad armor and annular structure muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white trim, charcoal machinery and recesses, amber status lights, and restrained wear. The user approved the result with the open empty launch tube, retracted doors, clear live-warhead area, exact geometry, and overhead footprint preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_silo_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
