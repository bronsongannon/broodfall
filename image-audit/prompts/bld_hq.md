# `bld_hq` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-0944e64d-b882-4c2b-b3c4-cb1c3a998522.png`
- Final: `assets/sprites/bld_hq_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_hq_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only (approved evacuation skiff, Expedition carrier, Expedition naval shipyard); do not copy their naval subjects or layouts
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a large expeditionary field headquarters seen directly from overhead, an octagonal-to-square fortified modular command complex with a dense central command roof, layered blast-resistant charcoal and muted taupe structural plates, compact rooftop communications hardware, vents, access panels, cable conduits, and practical service machinery; recognizable command-center silhouette rather than a factory, warehouse, airpad, or ship
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp painted hard-surface rendering, weathered rather than glossy; no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, perfectly centered and axis-aligned, complete footprint visible, fills about 84% of a square canvas with generous clean transparent padding on every edge; readable when reduced to 96×96 pixels. Keep the upper-left corner of the footprint visually open and low-profile for an existing animated pennant overlay. No perspective tilt, no isometric view
Lighting/mood: neutral diffuse overhead lighting with restrained warm amber work lights; no cast shadow
Color palette: most mass weathered charcoal/gunmetal and muted taupe; restrained Expedition teal only on small identification panels, rails, inset stripes, and indicator housings; off-white technical trim; warm amber lights
Materials/textures: panel seams, bolts, non-slip roof plates, dust/salt staining, chipped paint, functional machinery; crisp midtone separation at gameplay scale
Constraints: one building only; preserve a strong compact headquarters silhouette; no flag or pennant baked into the art; genuine clean alpha transparency including antialiased edges; no canvas contact; no baked ground, platform terrain, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, scenery, checkerboard, border, or framing device
Avoid: glossy mobile-game vector art, toy-like saturated cyan, giant faction-colored roof, sci-fi neon, perspective walls, visible horizon, cut-off antennas, transparent holes caused by checkerboard imitation
```

## Expedition / teal — approved aqua-dominant refinement (2026-09-06)

- Built-in ImageGen mode: precise color-only edit of the weathered HQ preview
- Edit target: `/Users/bronsongannon/.codex/generated_images/01a07719-33b8-7962-98cd-3b67603e40ea/exec-d7fea84c-510d-4011-baf2-77f9d62bff7d.png`
- User-approved generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-83cc283b-3e03-4255-8d0a-c8bc9e2ed574.png`
- Approved family references: the 2026-09-06 Barracks and Refinery teal finals
- Final: `assets/sprites/bld_hq_teal.png`
- Production normalization: border-connected checkerboard removal, proportional fit, 14 px safe padding, 256×256 RGBA

```text
Use case: precise-object-edit
Asset type: top-down real-time strategy HQ building sprite preview
Input images: Image 1 is the latest weathered HQ edit target. Image 2 is the exact approved Barracks reference. Image 3 is the approved matching Refinery reference.
Primary request: make one restrained color-only adjustment to Image 1. Increase saturation/chroma only on the HQ's existing aqua-painted armor surfaces by approximately 5%, so the aqua identity reads as clearly as the approved Barracks. Keep the aqua hue in the same muted weathered blue-green family. Do not make the aqua brighter or darker.
Absolute invariants: preserve overall perceived brightness, luminance distribution, contrast, dirty warm taupe/off-white accents, charcoal machinery, near-black panel seams and recesses, amber utility lights, chips, scratches, grime, patina, and every material texture exactly. Preserve the HQ's exact top-down orthographic geometry, silhouette, footprint, proportions, equipment placement, panel divisions, architectural details, orientation, crop, and scale. Do not redraw, redesign, simplify, add, remove, move, rotate, or reshape anything.
Color exclusions: do not saturate the taupe, charcoal, black, silver, or amber areas. Do not introduce bright cyan, neon teal, turquoise glow, blue lighting, cream, pastel beige, or clean white. The result must remain industrial, grounded, aged, and weathered.
Background: genuinely transparent alpha around the isolated building; no checkerboard baked into pixels.
Constraints: full building visible and centered; no text, logo, watermark, border, cast shadow beyond the silhouette, or new objects.
```

## Rubicon / red

> Revision status (2026-09-06): the installed red asset below was derived from the superseded Expedition final. Preserve this historical provenance; regenerate it only as a precise recolor of the newly approved aqua-dominant teal asset, and install only after separate user approval.

- Built-in ImageGen mode: image-to-image precise recolor of the approved teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-4c892cd3-e5f1-4a96-8f64-ea69921a45af.png`
- Final: `assets/sprites/bld_hq_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_hq_red.png
Input image: Image 1 is the approved Expedition HQ edit target
Primary request: recolor only the faction-identification treatment from Expedition teal to restrained Rubicon red; shift any teal inset panels, rail accents, small stripes, and teal indicator housings to dark iron-red / muted oxide-red. Keep universal hazard accents yellow where present and keep warm amber work lights. Preserve the weathered charcoal/gunmetal and muted taupe structural mass
Composition/framing: preserve the exact silhouette, geometry, roof equipment, footprint, pivot, scale, centering, transparent padding, orientation, and lighting pixel-for-pixel in placement; strict orthographic 90-degree overhead view remains unchanged
Constraints: change colorway only; do not add, remove, redraw, move, resize, rotate, or reinterpret any component. Do not add a flag or pennant—the game draws it dynamically. Return a genuinely transparent background with clean antialiased alpha. No baked checkerboard, ground, shadow, text, numerals, logos, insignia, people, vehicles, scenery, border, or canvas contact
Avoid: independently regenerated architecture, saturated bright red covering large surfaces, altered machinery, perspective tilt, new weapons or antennae
```
