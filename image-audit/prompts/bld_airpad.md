# `bld_airpad` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-9a15cf03-3b0b-42e2-bd5c-f7df985d7fe5.png`
- Final: `assets/sprites/bld_airpad_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_airpad_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their overhead accuracy, restrained palette, wear, and finish, but do not copy naval subjects
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a compact expeditionary VTOL airpad viewed directly from overhead, a rugged square-to-octagonal armored service platform with a clearly readable circular landing deck, recessed central lift/service hatch, tie-down sockets, four compact corner machinery pods, fueling conduits, access panels, and inset perimeter guide lights; recognizable as an aircraft landing and maintenance facility without using any letter or symbol
Style/medium: grounded semi-realistic 2D RTS game art matching supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, centered and axis-aligned, complete footprint visible, fills about 84% of a square canvas with safe transparent padding on all edges; readable at 62×62 pixels. Keep the central deck uncluttered enough for aircraft silhouettes. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting; restrained warm amber perimeter work lights; no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, deck edge insets, rails, and light housings; off-white technical trim; warm amber lights
Materials/textures: scuffed non-slip deck, panel seams, bolts, hydraulic machinery, dust/salt staining, chipped paint; strong silhouette and midtone separation at gameplay size
Constraints: one airpad only; genuine clean alpha transparency including antialiased edges; no canvas contact; no baked ground surrounding the facility, water, coastline, wake, drop shadow, text, letters (including no H), numerals, logos, insignia, people, aircraft, vehicles, weapons, scenery, checkerboard, border, or frame
Avoid: glossy mobile-game vector art, saturated cyan slab, airport runway scenery, giant faction-colored surface, sci-fi neon, perspective walls, visible horizon
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-c0f12da1-4085-440d-b7c2-7660f26bc378.png`
- Final: `assets/sprites/bld_airpad_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS building sprite, Rubicon colorway, destined for bld_airpad_red.png
Input image: Image 1 is the approved Expedition VTOL airpad edit target
Primary request: recolor only the faction-identification treatment from Expedition teal to restrained Rubicon red; shift teal inset panels, deck-edge accents, rails, and indicator housings to dark iron-red / muted oxide-red. Preserve the weathered charcoal/gunmetal landing deck, muted taupe structural machinery, off-white technical ring and trim, and warm amber guide lights
Composition/framing: preserve exact silhouette, geometry, equipment, circular landing deck, footprint, pivot, scale, centering, transparent padding, orientation, and lighting; strict orthographic 90-degree overhead remains unchanged
Constraints: colorway change only; do not add, remove, redraw, move, resize, rotate, or reinterpret any component. Genuine transparent background with clean antialiased alpha. No baked checkerboard, surrounding ground, water, runway scenery, shadow, text, letters, numerals, logos, insignia, people, aircraft, vehicles, weapons, scenery, border, or canvas contact
Avoid: independently regenerated airpad, large saturated red deck, changed machinery, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition airpad
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a0772c-daf4-78f3-a92b-63d3ece37062/exec-29f671ff-ffbd-49c9-865b-8fcdf6519bc5.png`
- Production destination: `assets/sprites/bld_airpad_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the landing-deck armor muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white structural trim, charcoal machinery and recesses, amber guide lights, and restrained weathering. The user approved the result with the circular deck, equipment layout, footprint, crop, and strict overhead orientation preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_airpad_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
