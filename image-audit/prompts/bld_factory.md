# `bld_factory` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-508c6421-8339-4e33-89ff-bf06f14bc724.png`
- Final: `assets/sprites/bld_factory_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_factory_teal.png and normalized to a 256×209 RGBA canvas matching its 88×72 runtime aspect ratio
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them solely as style, material, wear, palette-restraint, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated sprite only
Subject: an expeditionary land vehicle factory viewed directly from overhead, a rugged broad rectangular armored assembly building with a clearly readable bottom-center vehicle bay and recessed threshold, paired roof assembly halls, compact fabrication machinery, ventilation housings, service conduits, panel hatches, and disciplined modular construction; unmistakably a factory rather than a depot, barracks, shipyard, or headquarters
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered painted hard-surface rendering, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, centered and axis-aligned, complete footprint visible, broad 88:72 silhouette, fills about 84% of a 256×209 canvas with safe transparent padding on every edge; crisp and readable at exactly 88×72 pixels. Keep the bottom-center vehicle-bay lintel visually clear and plain so the game can draw its animated hazard-band overlay there. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber work lights; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, rails, inset accents, and light housings; off-white technical trim; warm amber lights
Materials/textures: scuffed armor plate, roof seams, bolts, vents, non-slip service panels, dust/salt staining, chipped paint, practical machinery; strong silhouette and midtone separation at gameplay size
Constraints: one factory only; no baked hazard band, no striped lintel, and no duplicate overlay detail; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, concrete slab, terrain, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, loose scenery, checkerboard, border, or frame
Avoid: glossy mobile-game vector art, toy-like saturated cyan, an entire teal roof, sci-fi neon, perspective walls, visible horizon, giant smokestacks, cut-off parts
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-9c375bee-3e01-428f-9be5-c22f6eecd0bd.png`
- Final: `assets/sprites/bld_factory_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_factory_red.png and normalized to a 256×209 RGBA canvas
Input image: Image 1 is the approved normalized Expedition vehicle factory edit target
Primary request: perform a precise colorway-only edit. Recolor Expedition teal identification panels, rails, inset accents, and teal light housings to restrained Rubicon dark oxide-red / iron-red. Deepen selected light neutral armor accents toward weathered dark iron while converting only small secondary off-white faction-identification trim accents to muted hazard yellow. Preserve subdued neutral taupe where it is structural, preserve charcoal/gunmetal machinery, and preserve warm amber work lights
Composition/framing: preserve the exact silhouette, geometry, paired roof halls, machinery, bottom-center vehicle bay, footprint, pivot, scale, centering, transparent padding, 88:72 proportions, orientation, and lighting. Strict orthographic 90-degree overhead remains unchanged
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. Keep the bottom-center vehicle-bay lintel visually clear and plain for the game-drawn animated hazard-band overlay; do not add a hazard band, striped lintel, or duplicate overlay detail. Keep genuine transparent background and clean antialiased alpha. No baked checkerboard, ground, slab, terrain, water, shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, scenery, border, or canvas contact
Avoid: independently regenerated factory, changed bay, new stripes, large saturated red roof fields, bright lemon-yellow slabs, altered machinery, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition factory
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a0772c-8b54-7662-a164-a0efe6a2179c/exec-823cb451-b9f9-4fa4-8809-af3a9e6fe76e.png`
- Production destination: `assets/sprites/bld_factory_teal.png`
- Normalized production canvas: 256×209 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the paired roof halls and other large painted armor muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white secondary structure, charcoal machinery, near-black seams, amber work lights, and restrained wear. The user approved the result with the exact broad rectangular footprint, non-square framing, machinery layout, and plain bottom-center vehicle bay preserved.
- Raw-output condition: 1348×1167 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_factory_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
