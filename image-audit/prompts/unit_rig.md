# `unit_rig` prompt record

## Expedition / teal — initial generation

- Built-in ImageGen mode: generate with all three approved local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-430d13fc-ecbc-4552-9ed6-ae8df86536f2.png`
- Processing: border-connected baked checkerboard was cleared and the art was proportionally normalized with `image-audit/process_generated_sprite.py --canvas 256x256`; the first result was retained only as the geometry-refinement input because its footprint was too narrow at gameplay size

```text
Use case: stylized-concept
Asset type: Broodfall production RTS vehicle sprite, Expedition colorway, destined for unit_rig_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use all three solely as style, material, surface-wear, palette-restraint, rendering-detail, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated vehicle sprite only
Subject: an expeditionary live-specimen containment and recovery rig viewed directly from overhead, pointing exactly straight up/north; compact rugged six-wheel utility vehicle with a blunt armored cab at the front/top, practical rear containment bed occupying the center-to-lower half, and a strong pale metal cage perimeter with clearly spaced crossbars around an open dark recessed bed; preserve a broad unobstructed central cage/bed area so the game can draw its existing captive green glow overlay visibly inside it; recovery winch and small equipment lockers may sit around the perimeter, but no creature, cargo, people, weapon, or baked glow in the bed
Style/medium: grounded semi-realistic 2D RTS hard-surface game art matching the supplied references; crisp weathered painted metal, believable containment hardware, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view with no visible side faces, centered on the exact canvas pivot, axis-aligned and vertically oriented with cab/nose toward the top; complete vehicle, wheels, and cage visible; fill roughly 82% of a square 256×256 canvas with safe transparent padding on every edge; cab-versus-open-cage identity must remain crisp and readable when reduced to about 30×30 gameplay pixels
Lighting/mood: neutral diffuse overhead lighting, restrained warm amber marker/hazard lights, no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small cab identification panels, rails, and light housings; off-white cage bars and technical trim; sparse muted hazard-yellow safety tabs; warm amber lights; the empty bed remains dark neutral with no luminous color
Materials/textures: scuffed armor plate, chipped paint, rubber tread, cage steel, bolts, hinges, vents, dust/salt staining, practical field repairs; strong silhouette and midtone separation at tiny scale
Constraints: one containment rig only; genuinely clean alpha transparency with antialiased edges; straight-up orientation; exact central pivot; no canvas contact; keep the central rear containment bed visibly open for the runtime captive overlay; no specimen, dinosaur, animal, cargo, person, visible driver, weapon, baked green glow, ground, terrain, road, dust cloud, water, wake, drop shadow, text, letters, numerals, logos, insignia, scenery, checkerboard, border, or frame
Avoid: isometric or three-quarter view, perspective tilt, visible horizon, toy-like cartoon truck, saturated cyan body, enclosed solid cargo box, filled cage, glowing bed, prison bars covering the entire vehicle, tank turret, clipped wheels or cage
```

## Expedition / teal — selected proportion refinement

- Built-in ImageGen mode: precise-object edit of the normalized first pass
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-70427528-3fd2-4402-9900-77002ae174c8.png`
- Final: `assets/sprites/unit_rig_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Expedition containment-rig geometry refinement
Input image: Image 1 is the generated Expedition live-specimen containment rig edit target
Primary request: refine only the vehicle proportions for tiny RTS readability. Redraw the same rig as a broader, shorter, more compact six-wheel recovery vehicle while preserving its exact identity, strict straight-up orientation, materials, weathering, restrained palette, front armored cab, winch, equipment lockers, pale cage perimeter, and completely empty dark central containment bed. Increase chassis and cage width and reduce excess bed length so the complete visible footprint is approximately 3:4 width-to-height. Keep the broad central bed open, dark, and unobstructed so the game can draw its existing captive green glow overlay inside it
Composition/framing: strict orthographic 90-degree overhead, no visible side faces, exact central pivot, complete vehicle centered with even transparent safe padding; optimize the cab-versus-open-cage silhouette for 30×30 pixels
Constraints: geometry-proportion correction only; preserve grounded semi-realistic rendering, weathered charcoal/gunmetal, muted taupe, restrained Expedition teal/off-white identification accents, sparse hazard yellow, and amber lights. No specimen, dinosaur, animal, cargo, person, visible driver, weapon, or baked glow. Genuine transparent background with clean antialiased alpha. No ground, terrain, dust, water, wake, shadow, text, letters, numerals, logos, insignia, scenery, checkerboard, border, or canvas contact
Avoid: independent redesign, long narrow flatbed, enclosed cargo box, filled cage, glowing bed, perspective tilt, isometric view, cartoon style, saturated cyan
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-0605d8ae-f910-4c88-8a64-2ba24468f6fb.png`
- Final: `assets/sprites/unit_rig_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon colorway, destined for unit_rig_red.png and normalized to a 256×256 RGBA canvas
Input image: Image 1 is the approved normalized Expedition live-specimen containment rig edit target
Primary request: perform a precise faction-colorway-only edit. Recolor only the restrained Expedition teal identification panels, cab insets, locker accents, small rails, and teal light housings to restrained Rubicon dark oxide-red / weathered iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor, pale off-white cage bars and technical trim, sparse hazard-yellow safety tabs, warm amber lights, dark empty bed, rubber wheels, dirt, salt staining, scratches, and chipped-paint wear
Composition/framing: preserve the exact compact six-wheel silhouette, front cab, winch, equipment lockers, cage perimeter, completely open dark central containment bed, geometry, footprint, scale, pivot, centering, transparent padding, 3:4 visible proportions, straight-up orientation, strict orthographic 90-degree overhead camera, and lighting. The bed must remain broad and unobstructed for the game-drawn captive green glow overlay
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. No specimen, dinosaur, animal, cargo, person, weapon, or baked glow. Preserve genuine transparent background and clean antialiased alpha. No ground, terrain, road, dust, water, wake, cast shadow, glow halo, text, letters, numerals, logos, insignia, scenery, checkerboard, border, or canvas contact
Avoid: independently regenerated rig, changed cage or bed, filled or glowing bed, red cage bars, large saturated red panels, changed hazard yellow or amber lights, perspective tilt, sci-fi neon
```

## Processing and QA

- Selected outputs were cleared only of border-connected baked checkerboard, then proportionally fitted, never stretched, to 256×256 RGBA with 14 px minimum vertical padding via `image-audit/process_generated_sprite.py`.
- Teal: alpha extrema `(0, 255)`, bbox `(41, 14, 215, 242)`, canvas-edge alpha max `0`, visible footprint about `20.4×26.7 px` inside the runtime 30 px draw box.
- Red: alpha extrema `(0, 255)`, bbox `(41, 14, 214, 242)`, canvas-edge alpha max `0`, visible footprint about `20.3×26.7 px` inside the runtime 30 px draw box.
- Teal/red alpha-mask IoU at alpha > 16: `0.98296`.
- Full-size colored-background and repeated 30 px gameplay inspections passed for clean edges, strict overhead orientation, six-wheel/cab/open-bed identity, restrained faction color, and absence of ground/shadow/text/scenery.
- Runtime overlay fit was checked against `drawRigGlow(s)`: the central-to-rear bed remains dark, broad, unobstructed, and free of any baked specimen or green glow.
