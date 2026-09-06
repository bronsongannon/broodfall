# `bld_refinery` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-3f011084-4fca-4f6c-9fa7-4b4f3446e1fd.png`
- Final: `assets/sprites/bld_refinery_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_refinery_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them solely as style, material, wear, palette-restraint, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated sprite only
Subject: an expeditionary crystal-processing refinery viewed directly from overhead, a compact heavy industrial facility with an armored central crusher/separator housing, enclosed shielded intake hopper showing only a few small contained mineral facets, short integrated conveyor housings, processing drums, pipework, vents, service platforms, and collection canisters; readable as a refinery through machinery rather than a giant crystal
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered painted hard-surface rendering, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, centered and axis-aligned, complete footprint visible, fills about 82% of a square canvas with safe transparent padding on every edge; crisp and readable at exactly 70×70 pixels. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber work lights and only a faint contained mineral glint; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, rails, pipe collars, and indicator housings; off-white technical trim; warm amber lights
Materials/textures: worn industrial plate, dark steel drums, scuffed hopper, pipes, grilles, panel seams, bolts, dust/salt staining, chipped paint; strong value hierarchy and mechanical silhouette at gameplay size
Constraints: one refinery only; any crystal material must remain a small contained process detail inside the shielded intake, never a loose pile or oversized glowing gem; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, concrete slab, terrain, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, loose scenery, checkerboard, border, or frame
Avoid: loose crystal pile, giant crystal, oversized glowing gemstone, fantasy mine, neon mineral glow, glossy mobile-game vector art, saturated cyan roof, perspective walls, visible horizon
```

## Expedition / teal — approved aqua-dominant refinement (2026-09-06)

- Built-in ImageGen mode: precise edit of the weathered aqua preview
- Edit target: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-fc71cd24-1059-4409-b412-1f698114cb20.png`
- User-approved generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-1bfce4e0-616b-4d55-baa1-25abc015a651.png`
- Approved brightness/weathering reference: the 2026-09-06 Barracks teal final
- Final: `assets/sprites/bld_refinery_teal.png`
- Production normalization: border-connected checkerboard removal, proportional fit, 14 px safe padding, 256×256 RGBA

```text
Use case: precise-object-edit
Asset type: top-down real-time strategy building sprite preview
Input images: Image 1 is the latest weathered aqua Refinery edit target. Image 2 is the exact approved color, brightness, and weathering reference: the Barracks. Images 3–5 are supporting references for Broodfall's established human industrial technology language only.
Primary request: regrade the Refinery so it belongs to exactly the same visual family as the approved Barracks. Lift the Refinery's painted aqua and warm-metal midtones by approximately 6% from Image 1, matching the perceived brightness and contrast balance of Image 2. Keep aqua as the dominant large-surface color.
Color/material target: muted weathered blue-green aqua armor; dirty warm taupe/off-white secondary metal accents; charcoal mechanical components; near-black seams and recesses; small restrained amber lamps. The taupe must look aged and metallic—not cream, ivory, beige pastel, or clean white.
Weathering: retain restrained chips, edge wear, scratches, grime in joints, and subtle oxidized patina. Preserve strong dark separation between panels so the sprite remains readable when small.
Strict invariants: keep the Refinery's exact structure, silhouette, top-down orthographic viewpoint, footprint, proportions, placement of all tanks, pipes, vents, central machinery, lights, panel divisions, and architectural details. This is a color/value/material edit only. Do not redesign, simplify, add, remove, rotate, crop, or relocate anything.
Background: genuinely transparent alpha around the isolated building; no checkerboard baked into pixels.
Constraints: centered, full building visible, no cast shadow extending outside silhouette, no text, logo, watermark, border, or new objects.
```

## Rubicon / red

> Revision status (2026-09-06): the installed red asset below was derived from the superseded Expedition final. Preserve this historical provenance; regenerate it only as a precise recolor of the newly approved aqua-dominant teal asset, and install only after separate user approval.

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-739cfea2-c639-4082-9521-b9219e0e2738.png`
- Final: `assets/sprites/bld_refinery_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_refinery_red.png and normalized to a 256×256 RGBA canvas
Input image: Image 1 is the approved normalized Expedition crystal-processing refinery edit target
Primary request: perform a precise colorway-only edit. Recolor Expedition teal identification panels, rails, pipe collars, and teal indicator housings to restrained Rubicon dark oxide-red / iron-red. Deepen selected light neutral armor accents toward weathered dark iron while converting only small secondary off-white faction-identification trim accents to muted hazard yellow. Preserve subdued neutral taupe where it is structural, preserve charcoal/gunmetal processing machinery, preserve warm amber work lights, and leave the few small contained mineral facets inside the shielded intake unchanged
Composition/framing: preserve the exact silhouette, geometry, enclosed intake, crusher/separator housing, drums, pipes, integrated conveyors, footprint, pivot, scale, centering, transparent padding, orientation, and lighting. Strict orthographic 90-degree overhead remains unchanged
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. Keep crystal material small and contained; do not add loose crystals, a crystal pile, or an oversized glowing gem. Genuine transparent background with clean antialiased alpha. No baked checkerboard, ground, slab, terrain, water, shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, loose scenery, border, or canvas contact
Avoid: independently regenerated refinery, giant crystal, enlarged glow, changed machinery, large saturated red fields, bright lemon-yellow slabs, perspective tilt, fantasy mine, sci-fi neon
```
