# `unit_artillery` prompt record

## Expedition / teal — mobile

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-a67c-7592-b7bf-a1fb667bebe8/exec-1e28f829-7f59-44c5-b506-5ea758a586ec.png`
- Final: `assets/sprites/unit_artillery_teal.png`
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_artillery_teal.png` (proportional fit only; no stretching)

```text
Use case: stylized-concept
Asset type: Broodfall production RTS vehicle sprite, Expedition colorway, destined for unit_artillery_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are all required style, material, palette, detail-density, and camera references (approved evacuation skiff, Expedition carrier, Expedition naval shipyard); translate their grounded weathered human expedition technology language into a land siege vehicle, but do not copy any naval hull, deck, ship, dock, water, or layout
Scene/backdrop: genuinely transparent background; one isolated vehicle sprite only
Subject: a distinctive self-propelled long-range siege artillery vehicle in undeployed travel-ready configuration, built on a compact heavy tracked or rugged multi-wheel armored chassis; front points exactly toward the top of the canvas; a very long narrow heavy cannon tube runs on the centerline and projects prominently toward the top, seated in a practical reinforced recoil cradle and low armored breech mount; folded stabilizer/outrigger hardware is stowed tightly and visibly along both chassis sides; roof vents, service panels, ammunition access hatches, and compact machinery make its long-range siege role instantly readable; no separate decorative barrel, no infantry
Style/medium: grounded semi-realistic painted 2D RTS hard-surface game art matching every supplied reference; crisp mechanical detail, weathered and utilitarian, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view, absolutely no perspective tilt or visible side walls; chassis and cannon point exactly straight up; centered on the chassis gameplay pivot and axis-aligned; complete silhouette and full cannon visible with safe transparent padding on every edge; fill roughly 88% of square canvas vertically while remaining readable around 35 pixels high; cannon thick enough to remain visible at gameplay scale
Lighting/mood: neutral diffuse overhead illumination, restrained warm amber marker/work lights, no cast shadow
Color palette: most physical mass weathered charcoal/gunmetal and muted taupe; restrained Expedition teal and off-white only on small identification panels, inset stripes, equipment casings, or indicator housings; universal hazard yellow only on tiny functional caution marks; no large cyan body panels
Materials/textures: battered armor plates, panel seams, bolts, rubber or dark track surfaces, heat-discolored cannon metal, grime, chipped paint, dust and salt wear, subdued metal highlights, crisp midtone separation at thumbnail scale
Constraints: exactly one complete artillery vehicle and nothing else; undeployed/mobile posture with every stabilizer folded against the same chassis; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, road, dirt, platform, grass, water, wake, shell, projectile, muzzle flash, smoke, dust cloud, cast/drop shadow, text, letters, numerals, logos, insignia, people, exposed occupants, scenery, checkerboard, border, framing device, or perspective; no separate floating parts
Avoid: tank with ordinary short turret gun, missile launcher, howitzer towed behind a separate tractor, toy/mobile-game vector art, glossy plastic, saturated cyan, giant faction panels, ship-like hull, isometric angle, diagonal orientation, cropped cannon or chassis
```

## Rubicon / red — mobile

- Built-in ImageGen mode: image-to-image precise recolor of the normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-a67c-7592-b7bf-a1fb667bebe8/exec-332e7f8a-4169-468d-bc55-429aa6a3c3c7.png`
- Final: `assets/sprites/unit_artillery_red.png`
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_artillery_red.png` (proportional fit only; no stretching)

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon colorway, destined for unit_artillery_red.png
Input image: Image 1 is the approved normalized Expedition undeployed artillery edit target
Primary request: recolor only the faction-identification treatment from Expedition teal and off-white to restrained Rubicon dark iron-red / muted oxide-red. Change only the small teal inset stripes, equipment casings, identification panels, and teal indicator housings; preserve the weathered charcoal/gunmetal and muted taupe chassis mass, dark track surfaces, heat-discolored cannon metal, universal hazard-yellow marks, and warm amber work lights
Composition/framing: preserve the exact artillery silhouette, long centerline cannon tube, recoil cradle, breech, folded side stabilizers, chassis geometry, equipment, footprint, pivot, scale, centering, transparent padding, straight-up orientation, strict orthographic 90-degree camera, materials, wear, and lighting pixel-for-pixel in placement
Constraints: colorway edit only; do not add, remove, redraw, move, resize, rotate, crop, deploy, or reinterpret any component; keep it unmistakably the same undeployed long-range siege vehicle. Return a genuinely transparent background with clean antialiased alpha. No baked checkerboard, ground, road, dust, smoke, muzzle flash, shell, shadow, text, letters, numerals, logos, insignia, people, scenery, border, or canvas contact
Avoid: independently regenerated vehicle, altered cannon length or thickness, altered stabilizers, saturated bright red over large surfaces, new weapon, perspective tilt, geometry drift, scale drift, recolored hazard-yellow or amber lights
```

## Expedition / teal — deployed hunker

- Built-in ImageGen mode: image-to-image precise deployment edit of the normalized teal mobile final, with all three approved style references also supplied
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-a67c-7592-b7bf-a1fb667bebe8/exec-6a9c7f21-40e8-4055-b6cd-999b1e394385.png`
- Final: `assets/sprites/unit_artillery_hunker_teal.png`
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_artillery_hunker_teal.png` (border-connected background removal and proportional fit only; no stretching)

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Expedition deployed/hunker colorway, destined for unit_artillery_hunker_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition undeployed artillery edit target and defines the exact vehicle identity, chassis, geometry, pivot, scale, lighting, and color; Images 2–4 are the required approved evacuation skiff, Expedition carrier, and Expedition naval shipyard references for material/style fidelity only
Primary request: create the SAME exact self-propelled long-range siege artillery vehicle in a visibly deployed firing/hunker pose. Keep the central armored chassis, tracks, roof panels, breech mount, complete long cannon, visual scale, and gameplay pivot fixed in exactly the same placement and proportions. Change only the deployment hardware: unfold the existing paired stabilizer/outrigger assemblies symmetrically outward from the chassis sides into broad grounded bracing arms with compact foot plates, creating a wider deployed silhouette; show the cannon seated slightly rearward within its same recoil cradle as a credible ready-to-fire/recoil pose, without changing the tube length, caliber, centerline, aim, or chassis
Scene/backdrop: genuinely transparent background; one isolated vehicle sprite only
Style/medium: grounded semi-realistic painted 2D RTS hard-surface game art exactly matching Image 1 and the supplied references; crisp weathered utilitarian machinery, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view; chassis and cannon point exactly straight up; same centered gameplay pivot and axis alignment as Image 1; full cannon and all deployed stabilizer feet visible with safe transparent padding; same chassis length/width and same overall source scale as Image 1; broaden only the deployed side outriggers; cannon remains thick enough to read around 35 pixels high
Lighting/mood: preserve Image 1's neutral diffuse overhead illumination and restrained warm amber marker lights; no cast shadow
Color palette: preserve Image 1's weathered charcoal/gunmetal and muted taupe mass, restrained small Expedition teal/off-white identification accents, universal tiny hazard-yellow marks, and amber lights
Constraints: same exact named vehicle and same chassis geometry/pivot/scale as Image 1; deploy existing stabilizers only and position cannon in its same cradle; do not redesign the vehicle, change tracks, change roof panels, change equipment inventory, change faction colors, or change material language; genuine clean alpha transparency with antialiased edges; no canvas contact; no ground, pads beneath feet, road, dust, smoke, shell, projectile, muzzle flash, cast/drop shadow, text, letters, numerals, logos, insignia, people, scenery, checkerboard, border, or separate floating parts
Avoid: independently regenerated artillery, different vehicle, altered chassis width or length, altered cannon length/caliber, new decorative second barrel, giant turret, diagonal orientation, isometric/perspective tilt, cropped outriggers or muzzle, scale drift, saturated cyan
```

## Rubicon / red — deployed hunker

- Built-in ImageGen mode: image-to-image precise recolor of the normalized teal hunker final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-a67c-7592-b7bf-a1fb667bebe8/exec-e1b276c9-a390-4ed3-ba5f-860e655a8844.png`
- Final: `assets/sprites/unit_artillery_hunker_red.png`
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_artillery_hunker_red.png` (proportional fit only; no stretching)

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon deployed/hunker colorway, destined for unit_artillery_hunker_red.png
Input image: Image 1 is the approved normalized Expedition deployed artillery hunker edit target
Primary request: recolor only the faction-identification treatment from Expedition teal and off-white to restrained Rubicon dark iron-red / muted oxide-red. Change only the small teal inset stripes, stabilizer equipment casings, identification panels, and teal indicator housings; preserve the weathered charcoal/gunmetal and muted taupe chassis mass, dark tracks, heat-discolored cannon metal, universal hazard-yellow stabilizer-foot markings, and warm amber work lights
Composition/framing: preserve the exact deployed artillery silhouette, long centerline cannon tube, recoil cradle, breech, chassis geometry, both wide unfolded stabilizer arms and foot plates, equipment, footprint, pivot, scale, centering, transparent padding, straight-up orientation, strict orthographic 90-degree camera, materials, wear, and lighting pixel-for-pixel in placement
Constraints: colorway edit only; do not add, remove, redraw, move, fold, resize, rotate, crop, or reinterpret any component; keep it unmistakably the same deployed hunker pose of the same long-range siege vehicle. Return a genuinely transparent background with clean antialiased alpha. No baked checkerboard, ground or pads beneath stabilizer feet, road, dust, smoke, muzzle flash, shell, shadow, text, letters, numerals, logos, insignia, people, scenery, border, or canvas contact
Avoid: independently regenerated vehicle, altered cannon or chassis, altered stabilizer angles or foot plates, saturated bright red over large surfaces, new weapon, perspective tilt, geometry drift, scale drift, recolored hazard-yellow or amber lights
```

## QA

- All four finals: 256×256 RGBA; alpha extrema `(0, 255)`; canvas-edge alpha maximum `0`.
- Mobile Expedition bbox `(75, 14, 180, 242)`; mobile Rubicon bbox `(75, 14, 180, 242)`; binary-alpha IoU at threshold 8: `0.9777`.
- Hunker Expedition bbox `(31, 14, 225, 242)`; hunker Rubicon bbox `(31, 14, 224, 242)`; binary-alpha IoU at threshold 8: `0.9635`.
- Inspected at full 256×256 source scale and at the runtime-like 35×35 draw size. The mobile state reads as a narrow, long-barreled siege chassis with folded side hardware; the hunker reads as the same centerline cannon/chassis with symmetrical deployed braces and hazard-marked feet. No ground or foot pads, shadow, projectile, muzzle flash, scenery, people, text, or canvas contact is visible.
