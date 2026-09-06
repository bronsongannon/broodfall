# `unit_tank` prompt record

## Expedition / teal — initial generation

- Built-in ImageGen mode: generate with all three approved local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-78e9140c-1566-43e6-ac08-3a8c7fa5b79c.png`
- Processing: proportionally normalized with `image-audit/process_generated_sprite.py --canvas 256x256`; the first result was retained only as the geometry-refinement input because its footprint was too narrow at gameplay size

```text
Use case: stylized-concept
Asset type: Broodfall production RTS vehicle sprite, Expedition colorway, destined for unit_tank_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use all three solely as style, material, surface-wear, palette-restraint, rendering-detail, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated vehicle sprite only
Subject: a heavy expeditionary main battle tank viewed directly from overhead, pointing exactly straight up/north; broad armored tracked hull with clearly separated left and right continuous tracks, reinforced glacis, compact central rotating turret, and one unmistakable long single cannon barrel aligned straight forward to the top; dense but disciplined hatches, vents, stowage, armor seams, and mechanical deck detail; massive stable MBT silhouette, not an artillery vehicle or personnel carrier
Style/medium: grounded semi-realistic 2D RTS hard-surface game art matching the supplied references; crisp weathered painted metal, physically coherent machinery, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view with no visible side faces, centered on the exact canvas pivot, axis-aligned and vertically oriented with nose/barrel toward the top; complete vehicle and barrel visible; fill roughly 84% of a square 256×256 canvas with safe transparent padding on every edge; silhouette and turret/barrel identity must remain crisp and readable when reduced to about 38×38 gameplay pixels
Lighting/mood: neutral diffuse overhead lighting, restrained warm amber marker lights, no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, turret insets, rails, and light housings; sparse off-white technical trim; warm amber lights
Materials/textures: scuffed armor plate, chipped paint, track links, bolts, weld seams, dust/salt staining, non-slip panels, practical field repairs; strong silhouette and midtone separation at tiny scale
Constraints: one tank only; genuinely clean alpha transparency with antialiased edges; straight-up orientation; exact central pivot; no canvas contact; no ground, terrain, road, dust cloud, water, wake, drop shadow, glow halo, text, letters, numerals, logos, insignia, people, visible crew, scenery, checkerboard, border, or frame
Avoid: isometric or three-quarter view, perspective tilt, visible horizon, toy-like cartoon tank, saturated cyan body, an entire teal turret or hull, sci-fi neon, multiple cannons, missile racks, oversized antennae, clipped barrel or tracks
```

## Expedition / teal — selected proportion refinement

- Built-in ImageGen mode: precise-object edit of the normalized first pass
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-c26f6c0b-f2ea-4e2e-aca2-06a02334e3cd.png`
- Final: `assets/sprites/unit_tank_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Expedition tank geometry refinement
Input image: Image 1 is the generated Expedition main battle tank edit target
Primary request: refine only the vehicle proportions for tiny RTS readability. Redraw the same tank as a substantially broader, more compact heavy MBT while preserving its exact identity, strict straight-up orientation, materials, weathering, restrained palette, track-and-turret layout, and single centerline cannon. Widen the armored hull, both tracks, and turret; shorten the hull modestly and shorten the exposed cannon barrel enough that the complete visible footprint is approximately 2:3 width-to-height including the barrel, while the hull itself reads broad and massive. Keep the cannon unmistakable and pointing exactly to the top
Composition/framing: strict orthographic 90-degree overhead, no visible side faces, exact central pivot, complete vehicle centered with even transparent safe padding; optimize for a crisp heavy silhouette at 38×38 pixels
Constraints: geometry-proportion correction only; preserve grounded semi-realistic rendering, weathered charcoal/gunmetal, muted taupe, restrained Expedition teal/off-white identification accents, and amber lights. Genuine transparent background with clean antialiased alpha. No ground, terrain, dust, water, wake, shadow, text, letters, numerals, logos, insignia, people, scenery, checkerboard, border, or canvas contact
Avoid: independent redesign, artillery silhouette, narrow spear-like hull, overlong barrel, multiple cannons, missile racks, perspective tilt, isometric view, cartoon style, saturated cyan
```

## Rubicon / red — first colorway pass (discarded)

- Built-in ImageGen mode: image-to-image precise recolor of the normalized selected teal master
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-14c362c9-da4d-4b55-b39a-f82bceabb605.png`
- Result was visually sound but discarded after alpha-mask QA in favor of the closer silhouette-lock retry

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon colorway, destined for unit_tank_red.png and normalized to a 256×256 RGBA canvas
Input image: Image 1 is the approved normalized Expedition main battle tank edit target
Primary request: perform a precise faction-colorway-only edit. Recolor only the restrained Expedition teal identification panels, turret insets, small rail accents, and teal light housings to restrained Rubicon dark oxide-red / weathered iron-red. Preserve all charcoal/gunmetal machinery, muted taupe and off-white structural armor, dark tracks, warm amber lights, neutral stowage, dirt, salt staining, scratches, and chipped-paint wear
Composition/framing: preserve the exact compact heavy silhouette, single long centerline cannon, turret, hull, track geometry, equipment, footprint, scale, pivot, centering, transparent padding, 2:3 visible proportions, straight-up orientation, strict orthographic 90-degree overhead camera, and lighting
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. Preserve genuine transparent background and clean antialiased alpha. No ground, terrain, road, dust, water, wake, cast shadow, glow halo, text, letters, numerals, logos, insignia, people, scenery, checkerboard, border, or canvas contact
Avoid: independently regenerated tank, altered barrel or tracks, large saturated red slabs, bright-red whole turret or hull, changed neutral armor, changed amber lights, perspective tilt, sci-fi neon
```

## Rubicon / red — selected silhouette-lock retry

- Built-in ImageGen mode: image-to-image precise recolor of the same normalized teal master
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-8a1a5b98-f12f-4ad4-a59e-514083945a08.png`
- Final: `assets/sprites/unit_tank_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon tank colorway silhouette-lock retry
Input image: Image 1 is the approved normalized Expedition tank and is the exact geometry/alpha-mask edit target
Primary request: change color only. Replace only the small weathered teal faction paint areas on the turret side insets, hull side insets, barrel collar, and teal equipment case with restrained weathered dark oxide-red / iron-red. Keep every non-teal pixel visually unchanged
Hard invariants: preserve the exact source alpha mask and every exterior boundary pixel; preserve identical silhouette, 256×256 framing, geometry, single cannon, turret, tracks, equipment, footprint, scale, pivot, centering, padding, straight-up orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, shadows internal to the metal, and amber lights. Do not redraw any structure
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, cast shadow, contact shadow, outline, halo, text, logos, people, scenery, border, or canvas contact
Avoid: regenerated tank, any shape/width/length change, altered barrel or tracks, red applied to neutral charcoal/taupe/off-white armor, saturated red slabs, altered lighting
```

## Processing and QA

- Both selected outputs were proportionally fitted, never stretched, to 256×256 RGBA with 14 px minimum vertical padding via `image-audit/process_generated_sprite.py`.
- Teal: alpha extrema `(0, 255)`, bbox `(48, 14, 207, 242)`, canvas-edge alpha max `0`, visible footprint about `23.6×33.8 px` inside the runtime 38 px draw box.
- Red: alpha extrema `(0, 255)`, bbox `(50, 14, 206, 242)`, canvas-edge alpha max `0`, visible footprint about `23.2×33.8 px` inside the runtime 38 px draw box.
- Teal/red alpha-mask IoU at alpha > 16: `0.98209`.
- Full-size colored-background and repeated 38 px gameplay inspections passed for clean edges, strict overhead orientation, clear track/turret/barrel identity, restrained faction color, and absence of ground/shadow/text/scenery.
