# `bld_hydro` prompt record

## Expedition / teal — initial generation

- Built-in ImageGen mode: generate with three local style references
- Generated original (superseded by the geometry correction below): `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-af228f30-0577-4519-82b4-4a7f6bc8e9f0.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_hydro_teal.png; final proportional canvas contract is an extra-wide 256×57 RGBA sprite drawn about 192×43 pixels in game
Input images: Images 1–3 are style/material/camera references only; match their overhead accuracy, restrained palette, weathering, and finish, but do not copy naval subjects
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a long bridge-like expeditionary hydroelectric dam viewed directly from overhead and running perfectly horizontally left-to-right, with massive bank abutments at both ends, a narrow reinforced maintenance deck, three clearly separated central spillway/turbine gate housings, service rails, compact control machinery, conduits, and amber work lamps; an engineered river barrier with a crisp elongated silhouette
Style/medium: grounded semi-realistic 2D RTS game art matching supplied references; crisp weathered industrial hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view; perfectly horizontal, centered, axis-aligned, and extremely elongated at about 4.5:1 visible aspect ratio; entire dam visible with safe transparent padding beyond both abutments and above/below every rail; strong readability when reduced to roughly 172×38 pixels. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting, restrained warm amber work lights, no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small gate panels, rail accents, inset stripes, and indicator housings; off-white technical trim; warm amber lights
Materials/textures: stained concrete-like composite abutments, chipped metal deck plates, panel seams, bolts, salt/dust streaks, hydraulic gate machinery; crisp midtone separation at gameplay size
Constraints: one dry dam structure only. Do not include any water, river, shoreline, waterfall, spray, spillway foam, churn, reflection, ground, bridge traffic, people, vehicles, text, letters, numerals, logos, insignia, scenery, or drop shadow; the game draws water/churn dynamically. Genuine clean alpha transparency with antialiased edges; no canvas contact, baked checkerboard, border, or frame
Avoid: vertical orientation, perspective walls, isometric camera, bulky square power plant, fantasy stone dam, giant teal surfaces, glossy mobile-game vector art, sci-fi neon
```

## Expedition / teal — final geometry correction

- Built-in ImageGen mode: precise-object edit of the initial generated dam
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-87e43262-1cee-439c-89aa-307c310eb629.png`
- Final: `assets/sprites/bld_hydro_teal.png` (256×40 RGBA; drawn at 192×30 without stretching)

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS hydro dam sprite geometry correction
Input image: Image 1 is the Expedition hydro dam edit target
Primary request: keep the same dam design, materials, three spillway/turbine bays, maintenance deck, color treatment, weathering, and strict 90-degree overhead camera, but redesign only the two end abutments so they are much shallower top-to-bottom and integrated tightly into the horizontal wall. The complete visible silhouette including both end abutments must be at least 4.5 times wider than it is tall. Achieve this by rebuilding/shortening the end structures, not by stretching or squashing pixels
Composition/framing: one perfectly horizontal dam centered in a very wide composition, full silhouette visible with safe transparent padding; no perspective or isometric tilt
Constraints: preserve three central gate modules and all core functional details; do not add or remove water because none may be present. Genuine clean alpha transparency. No ground, river, shoreline, waterfall, spray, foam, churn, reflection, shadow, text, letters, numerals, logos, people, vehicles, scenery, checkerboard, border, or canvas contact
Avoid: tall towers at either end, bulky square end buildings, vertical orientation, stretched artwork, changed palette, giant teal areas
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-5459e7b2-9286-48a5-bef3-3d1f189dcb12.png`
- Final: `assets/sprites/bld_hydro_red.png` (256×40 RGBA)

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS hydro dam sprite, Rubicon colorway, destined for bld_hydro_red.png
Input image: Image 1 is the approved Expedition hydro dam edit target
Primary request: recolor only the faction-identification treatment from Expedition teal to restrained Rubicon red; shift the narrow teal gate faces, rail insets, service panels, and indicator housings to dark iron-red / muted oxide-red. Preserve all weathered charcoal/gunmetal, muted taupe structural plates, off-white technical trim, and warm amber work lights
Composition/framing: preserve the exact ultra-wide horizontal silhouette, shallow abutments, geometry, three gate modules, equipment, footprint, pivot, scale, centering, transparent padding, orientation, and lighting; strict orthographic 90-degree overhead remains unchanged
Constraints: colorway change only; do not add, remove, redraw, move, resize, stretch, rotate, or reinterpret any component. Genuine transparent background with clean antialiased alpha. No water, river, shoreline, waterfall, spray, foam, churn, ground, shadow, text, letters, numerals, logos, insignia, people, vehicles, scenery, checkerboard, border, or canvas contact
Avoid: independently regenerated dam, tall end towers, large saturated red areas, changed machinery, vertical orientation, perspective tilt
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition hydro dam
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-def3de8f-0951-4c1e-842e-cb17c31edde3.png`
- Production destination: `assets/sprites/bld_hydro_teal.png`
- Normalized production canvas: 256×40 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the three gate faces and long painted structural panels muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white abutment trim, charcoal machinery and recesses, amber work lights, and restrained wear. The user approved the result with the exact ultra-wide silhouette, three-module layout, shallow ends, crop, and orientation preserved.
- Raw-output condition: 1983×793 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_hydro_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
