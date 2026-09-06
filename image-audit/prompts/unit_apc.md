# `unit_apc` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-a67c-7592-b7bf-a1fb667bebe8/exec-4133a6ba-555c-47f1-9415-ae86285f3e31.png`
- Final: `assets/sprites/unit_apc_teal.png`
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_apc_teal.png` (proportional fit only; no stretching)

```text
Use case: stylized-concept
Asset type: Broodfall production RTS vehicle sprite, Expedition colorway, destined for unit_apc_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are all required style, material, palette, detail-density, and camera references (approved evacuation skiff, Expedition carrier, Expedition naval shipyard); translate their grounded weathered human expedition technology language into a land vehicle, but do not copy any naval hull, deck, ship, dock, water, or layout
Scene/backdrop: genuinely transparent background; one isolated vehicle sprite only
Subject: an unmistakable armored personnel carrier for unloading infantry, a compact heavy 6-wheel expeditionary troop transport with three rugged wheels visibly projecting on each side, blunt wedge-armored front pointing straight toward the top of the canvas, broad enclosed troop compartment, distinct armored rear troop ramp centered at the bottom, practical roof hatches, vents, tie-downs, stowage boxes, and one very small defensive cupola; it must read as troop carrier rather than tank, truck, artillery, or construction rig
Style/medium: grounded semi-realistic painted 2D RTS hard-surface game art matching every supplied reference; crisp mechanical detail, weathered and utilitarian, no thick cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, absolutely no perspective tilt or visible side walls; vehicle points exactly straight up; centered on its gameplay pivot and axis-aligned; complete silhouette visible with clean safe transparent padding on all edges; fill roughly 82% of square canvas while remaining readable around 35 pixels high; strong broad troop-carrier silhouette
Lighting/mood: neutral diffuse overhead illumination, restrained warm amber marker/work lights, no cast shadow
Color palette: most physical mass weathered charcoal/gunmetal and muted taupe; restrained Expedition teal and off-white only on small identification panels, inset stripes, hatch markings, or indicator housings; universal hazard yellow may appear only as a tiny practical rear ramp marking; no large cyan body panels
Materials/textures: battered armor plates, panel seams, bolts, rubber tires, grime, chipped paint, dust and salt wear, subdued metal highlights, crisp midtone separation at thumbnail scale
Constraints: exactly one APC and nothing else; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, road, dirt, platform, grass, water, wake, smoke, dust cloud, cast/drop shadow, text, letters, numerals, logos, insignia, people, exposed occupants, scenery, checkerboard, border, framing device, or perspective; no separate loose parts
Avoid: top-down mobile-game vector style, glossy plastic, toy proportions, saturated cyan, giant faction panels, tank cannon, oversized weapon turret, open pickup bed, ship-like hull, isometric angle, diagonal orientation, cropped wheels or ramp
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-a67c-7592-b7bf-a1fb667bebe8/exec-4bd4360e-de36-4390-ba51-c2c45c9ed896.png`
- Final: `assets/sprites/unit_apc_red.png`
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_apc_red.png` (border-connected background removal and proportional fit only; no stretching)

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon colorway, destined for unit_apc_red.png
Input image: Image 1 is the approved normalized Expedition APC edit target
Primary request: recolor only the faction-identification treatment from Expedition teal and off-white to restrained Rubicon dark iron-red / muted oxide-red. Change only the tiny teal inset stripes, small identification panels, and teal indicator housings; preserve the weathered charcoal/gunmetal and muted taupe structural mass, black rubber tires, universal hazard-yellow ramp markings, and warm amber marker/work lights
Composition/framing: preserve the exact APC silhouette, six-wheel geometry, armored troop compartment, roof hatches, tiny defensive cupola, rear troop ramp, equipment, footprint, pivot, scale, centering, transparent padding, straight-up orientation, strict orthographic 90-degree camera, materials, wear, and lighting pixel-for-pixel in placement
Constraints: colorway edit only; do not add, remove, redraw, move, resize, rotate, crop, or reinterpret any component; keep it unmistakably the same troop carrier. Return a genuinely transparent background with clean antialiased alpha. No baked checkerboard, ground, road, dust, smoke, shadow, text, letters, numerals, logos, insignia, people, scenery, border, or canvas contact
Avoid: independently regenerated vehicle, altered wheel count, altered ramp, saturated bright red over large surfaces, new weapon, perspective tilt, geometry drift, scale drift, recolored hazard-yellow or amber lights
```

## QA

- Final canvases: 256×256 RGBA; alpha extrema `(0, 255)`.
- Expedition bbox `(67, 14, 188, 242)`; Rubicon bbox `(66, 14, 190, 242)`.
- Canvas-edge alpha maximum: `0` for both colorways.
- Teal/red binary-alpha IoU at threshold 8: `0.9778`.
- Inspected at full 256×256 source scale and at the runtime-like 35×35 draw size. The six-wheel silhouette, small cupola, broad troop body, and rear ramp remain distinct; no ground, shadow, scenery, people, text, or canvas contact is visible.
