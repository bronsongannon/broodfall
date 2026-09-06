# `bld_power` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-3bb6be51-3e4c-42f5-9209-c0e8c9a0e00b.png`
- Final: `assets/sprites/bld_power_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_power_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them solely as style, material, wear, palette-restraint, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated sprite only
Subject: a compact expeditionary mechanical power generator and transformer facility viewed directly from overhead, with a sturdy square armored base, paired turbine or generator housings, transformer coils, bus bars, cooling vents, insulated conduits, maintenance hatches, and small amber status lamps; recognizable through physical power-generation machinery, not through any emblem
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered painted hard-surface rendering, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, centered and axis-aligned, complete footprint visible, fills about 82% of a square canvas with safe transparent padding on every edge; crisp and readable at exactly 60×60 pixels. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber electrical work lights, not neon; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, conduit collars, rails, and indicator housings; off-white technical trim; warm amber lights
Materials/textures: worn metal housings, ceramic insulators, copper-dark coils, panel seams, bolts, cooling grilles, dust/salt staining, chipped paint; bold machinery shapes and midtone separation at gameplay size
Constraints: one power facility only; communicate function via machinery; no lightning bolt, power symbol, emblem, sign, giant glowing core, giant neon mark, or oversized coil; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, concrete slab, terrain, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, loose scenery, checkerboard, border, or frame
Avoid: old bolt-overlay motif, neon lightning graphic, arc electricity, glossy mobile-game vector art, saturated cyan roof, sci-fi reactor orb, perspective walls, visible horizon
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-c63f2b27-1b76-42de-b0dc-599174e9ca36.png`
- Final: `assets/sprites/bld_power_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_power_red.png and normalized to a 256×256 RGBA canvas
Input image: Image 1 is the approved normalized Expedition mechanical generator and transformer facility edit target
Primary request: perform a precise colorway-only edit. Recolor Expedition teal identification panels, conduit collars, rails, and teal indicator housings to restrained Rubicon dark oxide-red / iron-red. Deepen selected light neutral armor accents toward weathered dark iron while converting only small secondary off-white faction-identification trim accents to muted hazard yellow. Preserve subdued neutral taupe where it is structural, preserve charcoal/gunmetal housings, dark copper conductors, ceramic insulators, and warm amber work lights
Composition/framing: preserve the exact silhouette, geometry, paired generator housings, transformer coils, bus bars, conduits, footprint, pivot, scale, centering, transparent padding, orientation, and lighting. Strict orthographic 90-degree overhead remains unchanged
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. Function must remain conveyed through machinery only; do not add a lightning bolt, power symbol, emblem, sign, giant glow, neon mark, or electrical arcs. Genuine transparent background with clean antialiased alpha. No baked checkerboard, ground, slab, terrain, water, shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, scenery, border, or canvas contact
Avoid: independently regenerated power plant, old bolt-overlay motif, changed machinery, large saturated red fields, bright lemon-yellow slabs, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition power plant
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a0772c-8b54-7662-a164-a0efe6a2179c/exec-3110c974-f5a8-46f2-8188-2ca69c7f14c6.png`
- Production destination: `assets/sprites/bld_power_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the base armor and appropriate generator casings muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white structure, charcoal machinery, dark copper conductors, ceramic insulators, near-black seams, amber lamps, and restrained wear. The user approved the result with the paired generators, transformers, bus bars, vents, conduits, and footprint preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_power_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
