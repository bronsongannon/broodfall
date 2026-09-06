# unit_harrier prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with all three approved local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-f373-7be3-8bf1-961a03500e0a/exec-cd02a833-b42f-4895-97b5-77fcd891fede.png`
- Normalized edit target: `/tmp/broodfall-phase2-air.P49HjN/unit_harrier_teal.png`
- Final: `assets/sprites/unit_harrier_teal.png`

~~~text
Use case: stylized-concept
Asset type: Broodfall human-faction RTS unit sprite — teal Harrier master
Input images: Image 1 is the approved bld_skiff material/style reference; Image 2 is the approved unit_carrier_teal material/style and faction-palette reference; Image 3 is the approved bld_shipyard_teal material/style reference. Match their grounded semi-realistic rendering, restrained palette, weathering, and fine but readable mechanical finish; do not copy their shapes.
Scene/backdrop: No scene. Genuine fully transparent RGBA background around the isolated aircraft.
Primary request: Create one compact Harrier-like STOVL strike jet for a real-time strategy game, seen at a strict orthographic 90-degree overhead view, pointing exactly straight up toward 12 o'clock. Give it an unmistakable compact delta-wing / swept-wing combat-jet silhouette, a narrow armored nose, dark cockpit canopy, short sturdy fuselage, readable wing roots, and paired vectoring exhaust structures. It must remain immediately recognizable at an actual in-game display size of about 32 pixels.
Style/medium: Grounded semi-realistic hand-finished RTS sprite art, matching the approved references. Crisp readable silhouette, controlled panel seams, subtly chipped and worn painted metal, no exaggerated cartoon proportions.
Color palette: Weathered charcoal and gunmetal body, muted taupe structural armor, restrained Expedition teal and off-white identification panels only, tiny amber utility lights. Teal must be an accent rather than the dominant body color.
Materials/textures: Scuffed matte aerospace armor, dark vents, heat-darkened exhaust areas, restrained edge wear.
Composition/framing: Exactly one whole aircraft, centered on a square canvas with generous even transparent safety padding. Bilaterally symmetric footprint and exact geometric center/pivot. Keep all pixels well clear of the canvas edges.
Critical dynamic-layer constraint: Draw the aircraft itself with EMPTY hardpoints and no payload. Do not draw any bomb, missile, torpedo, rocket, external payload marker, targeting icon, payload glow, muzzle flash, exhaust plume, contrail, or moving effect; the game renders its payload indicator separately at runtime.
Lighting: Neutral soft overhead studio illumination consistent across the aircraft, with restrained highlights; no directional cast shadow.
Constraints: Strict 90-degree top-down orthographic projection with no visible horizon, no oblique side view, and no perspective convergence. Nose points straight up. Preserve a compact bold silhouette that survives 32-pixel downscaling. True alpha transparency.
Avoid: ground plane, drop shadow, ambient halo, runway, clouds, scenery, people, pilot figure, dinosaurs, text, letters, numbers, logos, insignia, watermark, checkerboard, border, multiple aircraft, perspective, isometric angle, baked payload, external effects.
~~~

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the normalized teal master
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-f373-7be3-8bf1-961a03500e0a/exec-529c9d7b-4049-4522-9e29-501474ceb0c0.png`
- Final: `assets/sprites/unit_harrier_red.png`

~~~text
Use case: precise-object-edit
Asset type: Broodfall human-faction RTS unit sprite — Rubicon red Harrier colorway
Input image: Image 1 is the approved normalized Expedition teal Harrier edit target.
Primary request: Perform a precise COLORWAY-ONLY edit. Recolor only the restrained Expedition teal identification panels and teal-painted narrow wing/fuselage accents to restrained Rubicon dark iron-red / muted oxide-red. Preserve every charcoal, gunmetal, muted taupe, off-white, black, and warm amber material exactly in role and placement. Preserve all wear, soot, seams, highlights, and values.
Composition/framing invariants: Preserve the exact silhouette, pixel footprint, geometry, delta/swept wings, narrow nose, cockpit, fuselage, vectoring-exhaust structures, empty hardpoints, orientation, scale, centering, pivot, transparent padding, and lighting. The jet must remain strict orthographic 90-degree overhead and point exactly straight up. Change no equipment.
Critical dynamic-layer invariant: Keep every hardpoint empty. Do not add any bomb, missile, torpedo, rocket, external payload, payload marker, targeting icon, glow, muzzle flash, exhaust plume, contrail, or moving effect; the game renders its payload indicator separately.
Constraints: Recolor only. Do not add, remove, redraw, move, resize, rotate, warp, sharpen into new geometry, or reinterpret any component. Retain genuine transparent RGBA background and clean antialiased alpha. Keep all artwork clear of canvas edges.
Avoid: independently regenerated jet, altered silhouette, changed wings or exhausts, broad saturated-red body areas, pink or neon red, changed neutrals, changed amber lights, hazard-yellow repaint, ground, drop shadow, halo, checkerboard, border, runway, clouds, scenery, people, dinosaurs, text, letters, numbers, logos, insignia, watermark, perspective, isometric angle, baked payload, external effects.
~~~

## QA

- Normalized proportionally to a padded 256×256 RGBA canvas with `image-audit/process_generated_sprite.py`; no stretching.
- Teal: alpha extrema `(0, 255)`, alpha bbox `(31, 14, 224, 242)`, no canvas contact.
- Red: alpha extrema `(0, 255)`, alpha bbox `(31, 14, 224, 242)`, no canvas contact.
- Teal/red alpha-mask IoU: `0.96374`; visible-pixel centroid delta is below 0.34 px per axis.
- Inspected at full resolution and exact 32×32 runtime draw size: the compact swept/delta-wing jet silhouette remains readable; all hardpoints remain visually empty and no payload/effect is baked in.
