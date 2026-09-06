# `bld_supply` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-805cb378-7d56-4957-83b5-cc561d8382c8.png`
- Final: `assets/sprites/bld_supply_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_supply_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them solely as style, material, wear, palette-restraint, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated sprite only
Subject: a compact expeditionary logistics supply depot viewed directly from overhead, a sturdy square low-profile warehouse module with integrated roof cargo handling rails, neatly secured crates and small cargo containers contained within the building footprint, loading hatches, vents, tie-downs, and practical service panels; immediately readable as organized supplies and storage rather than a factory, barracks, refinery, or headquarters
Style/medium: grounded semi-realistic 2D RTS game art matching the supplied references; crisp weathered painted hard-surface rendering, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, centered and axis-aligned, full compact footprint visible, fills about 82% of a square canvas with safe transparent padding on every edge; crisp and readable at exactly 56×56 pixels. Keep a simple unobstructed trim-band area along the top edge of the building for a game-drawn faction band. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; a few restrained warm amber work lights; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, cargo-corner markings, rails, and light housings; off-white technical trim; warm amber lights
Materials/textures: scuffed metal cargo lids, reinforced roof plates, panel seams, fasteners, non-slip surfaces, dust/salt staining, chipped paint; bold value grouping and clean silhouette at gameplay size
Constraints: one compact supply depot only; crates and containers must be attached, secured, or recessed within its footprint, never loose outside; keep the top trim-band area clear; no baked faction band; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, concrete slab, terrain, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, loose scenery, checkerboard, border, or frame
Avoid: scattered crate scene, open landscape, shipping yard, huge containers obscuring the building, glossy mobile-game vector art, saturated cyan slab, sci-fi neon, perspective walls, visible horizon
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074c3-5699-7fe3-b2c4-7255a3119e3b/exec-c4632687-d887-4f97-993e-3e2d5c82a935.png`
- Final: `assets/sprites/bld_supply_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_supply_red.png and normalized to a 256×256 RGBA canvas
Input image: Image 1 is the approved normalized Expedition logistics supply depot edit target
Primary request: perform a precise colorway-only edit. Recolor Expedition teal identification panels, cargo-corner markings, rails, and teal light housings to restrained Rubicon dark oxide-red / iron-red. Deepen selected light neutral armor accents toward weathered dark iron while converting only small secondary off-white faction-identification trim accents to muted hazard yellow. Preserve subdued neutral taupe where it is structural, preserve charcoal/gunmetal cargo and machinery, and preserve warm amber work lights
Composition/framing: preserve the exact silhouette, geometry, secured integrated crates and containers, loading hardware, footprint, pivot, scale, centering, transparent padding, orientation, and lighting. Strict orthographic 90-degree overhead remains unchanged
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. Keep the simple top trim-band area unobstructed for the game-drawn faction band; do not add a baked band. Keep every crate and container secured within the footprint. Genuine transparent background with clean antialiased alpha. No baked checkerboard, ground, slab, terrain, water, shadow, text, letters, numerals, logos, insignia, people, vehicles, weapons, loose scenery, border, or canvas contact
Avoid: independently regenerated depot, changed cargo layout, scattered crates, large saturated red roof fields, bright lemon-yellow slabs, altered machinery, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition supply depot
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a0772c-8b54-7662-a164-a0efe6a2179c/exec-bf6ba606-925f-4610-8063-fce87f472012.png`
- Production destination: `assets/sprites/bld_supply_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the depot's large painted panels muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white structure, charcoal cargo hardware, near-black seams, amber work lights, and restrained wear. The user approved the result with the square footprint, secured cargo arrangement, loading hardware, and clear top trim-band area preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_supply_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
