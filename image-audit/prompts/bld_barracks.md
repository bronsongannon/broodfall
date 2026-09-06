# `bld_barracks` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-51703dd7-2d5b-432b-89d0-4a027e0d10a2.png`
- Final: `assets/sprites/bld_barracks_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_barracks_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their overhead accuracy, restrained palette, wear, and finish, but do not copy naval subjects
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a compact expeditionary infantry barracks viewed directly from overhead, a rugged square prefabricated troop block with a clearly readable bottom-center personnel entrance, low reinforced roof sections, ventilation units, small gear lockers, utility conduits, and disciplined modular construction; recognizable as troop quarters/training support rather than headquarters, factory, warehouse, or vehicle bay
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, square footprint, centered and axis-aligned, full silhouette visible, fills about 84% of a square canvas with safe transparent padding on all edges; readable at 78×78 pixels. Keep the bottom-center entrance lintel clear and simple so the game can draw a small animated faction awning stripe overlay there. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting, a few restrained warm amber work lights, no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, rails, inset stripes, and light housings; off-white technical trim; warm amber lights
Materials/textures: plate seams, fasteners, non-slip panels, dust/salt staining, chipped paint, functional vents and machinery; strong midtone separation at gameplay size
Constraints: one barracks only; no baked striped awning; no weapons, flag, people, vehicles, loose scenery, or oversized antennas; genuine clean alpha transparency with antialiased edges; no canvas contact; no baked ground, concrete slab, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, checkerboard, border, or frame
Avoid: glossy mobile-game vector art, toy-like saturated cyan, entire teal roof, sci-fi neon, perspective walls, visible horizon, duplicated entrance overlays
```

## Expedition / teal — approved aqua-dominant refinement (2026-09-06)

- Built-in ImageGen mode: precise edit of the weathered aqua preview
- Edit target: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-5553d3f7-37aa-4339-be19-7a6945644f9b.png`
- User-approved generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Final: `assets/sprites/bld_barracks_teal.png`
- Production normalization: border-connected checkerboard removal, proportional fit, 14 px safe padding, 256×256 RGBA

```text
Use case: precise-object-edit
Asset type: Broodfall top-down RTS Barracks sprite refinement
Primary request: make the weathered Barracks approximately 6% lighter in its painted aqua and dirty warm-metal midtones. Preserve its aqua-dominant identity and make only this restrained value lift; do not return to the original dark treatment and do not make it pale, creamy, pastel, or clean.
Color/material target: muted weathered blue-green aqua armor; dirty warm taupe/off-white secondary metal; charcoal machinery; near-black panel seams and recesses; restrained amber utility lights.
Weathering: retain chips, scratches, grime in joints, edge wear, and subtle oxidized patina. Preserve crisp dark separation between panels for gameplay-size readability.
Strict invariants: preserve the exact structure, silhouette, top-down orthographic viewpoint, footprint, proportions, entrance, vents, pipes, equipment placement, panel divisions, crop, and scale. This is a brightness/material-balance refinement only; do not redesign, simplify, add, remove, rotate, or move anything.
Background: genuinely transparent alpha; no baked checkerboard.
Constraints: one centered building, full silhouette visible, no text, logo, watermark, border, scenery, or cast shadow outside the footprint.
```

## Rubicon / red

> Revision status (2026-09-06): the installed red asset below was derived from the superseded Expedition final. Preserve this historical provenance; regenerate it only as a precise recolor of the newly approved aqua-dominant teal asset, and install only after separate user approval.

- Built-in ImageGen mode: image-to-image precise recolor of the approved teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-367f5503-96b7-4467-9fba-0c6ac87e5a09.png`
- Final: `assets/sprites/bld_barracks_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_barracks_red.png
Input image: Image 1 is the approved Expedition barracks edit target
Primary request: recolor only the faction-identification treatment from Expedition teal to restrained Rubicon red; shift teal inset panels, rails, narrow stripes, and indicator housings to dark iron-red / muted oxide-red. Preserve all weathered charcoal/gunmetal and muted taupe structure, off-white technical trim, olive utility case, and warm amber work lights
Composition/framing: preserve the exact silhouette, geometry, equipment, bottom-center personnel entrance, footprint, pivot, scale, centering, transparent padding, orientation, and lighting; strict orthographic 90-degree overhead remains unchanged
Constraints: colorway change only; do not add, remove, redraw, move, resize, rotate, or reinterpret any component. Keep the bottom-center entrance lintel clear for the game-drawn awning stripe overlay; do not add stripes there. Genuine transparent background with clean antialiased alpha. No baked checkerboard, ground, slab, shadow, text, numerals, logos, insignia, people, weapons, vehicles, scenery, border, or canvas contact
Avoid: independently regenerated architecture, large saturated red roof areas, changed machinery, perspective tilt, duplicate awning details
```
