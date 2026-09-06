# unit_gunship prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with all three approved local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-f373-7be3-8bf1-961a03500e0a/exec-9267a0c2-592d-4d42-97a2-dca5c76995ae.png`
- Normalized edit target: `/tmp/broodfall-phase2-air.P49HjN/unit_gunship_teal.png`
- Final: `assets/sprites/unit_gunship_teal.png`

~~~text
Use case: stylized-concept
Asset type: Broodfall human-faction RTS unit sprite — teal Gunship master
Input images: Image 1 is the approved bld_skiff material/style reference; Image 2 is the approved unit_carrier_teal material/style and faction-palette reference; Image 3 is the approved bld_shipyard_teal material/style reference. Match their grounded semi-realistic rendering, restrained palette, weathering, and fine but readable mechanical finish; do not copy their shapes.
Scene/backdrop: No scene. Genuine fully transparent RGBA background around the isolated vehicle.
Primary request: Create one compact military rotorcraft gunship body for a real-time strategy game, seen at a strict orthographic 90-degree overhead view, pointing exactly straight up toward 12 o'clock. It must read unmistakably as a compact armored attack rotorcraft at an actual in-game display size of about 34 pixels: a strong broad-shouldered fuselage, short weapon-stub shoulders, compact tail, cockpit/nose armor, central rotor hub, and a clear centered pivot.
Style/medium: Grounded semi-realistic hand-finished RTS sprite art, matching the approved references. Crisp readable silhouette, controlled panel seams, subtly chipped and worn painted metal, no exaggerated cartoon proportions.
Color palette: Weathered charcoal and gunmetal body, muted taupe structural armor, restrained Expedition teal and off-white identification panels only, tiny amber utility lights. Teal must be an accent rather than the dominant body color.
Materials/textures: Scuffed matte armor plate, dark mechanical recesses, restrained edge wear, subtle soot around vents.
Composition/framing: Exactly one whole vehicle, centered on a square canvas with generous even transparent safety padding. Bilaterally balanced footprint and exact geometric center/pivot. Keep all pixels well clear of the canvas edges.
Critical dynamic-layer constraint: Render the aircraft BODY AND CENTRAL ROTOR HUB ONLY. Do not draw any rotor blades, rotor disc, rotor arc, rotor blur, or rotor shadow; the game draws the animated spinning rotor separately at runtime. Do not bake muzzle flash, projectiles, exhaust, wake, payload markers, or any moving effect into the body.
Lighting: Neutral soft overhead studio illumination consistent across the body, with restrained highlights; no directional cast shadow.
Constraints: Strict 90-degree top-down orthographic projection with no visible horizon, no oblique side view, and no perspective convergence. Nose points straight up. Preserve a compact footprint and bold outer silhouette that survives 34-pixel downscaling. True alpha transparency.
Avoid: ground plane, drop shadow, ambient halo, water, wake, scenery, people, pilot figure, dinosaurs, text, letters, numbers, logos, insignia, watermark, checkerboard, border, multiple vehicles, perspective, isometric angle, baked rotor blades, rotor blur, external effects.
~~~

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the normalized teal master
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-f373-7be3-8bf1-961a03500e0a/exec-07d33ef3-6213-4bae-b4bb-ae8865a9f6b2.png`
- Final: `assets/sprites/unit_gunship_red.png`

~~~text
Use case: precise-object-edit
Asset type: Broodfall human-faction RTS unit sprite — Rubicon red Gunship colorway
Input image: Image 1 is the approved normalized Expedition teal Gunship edit target.
Primary request: Perform a precise COLORWAY-ONLY edit. Recolor only the restrained Expedition teal identification panels and teal-painted small accents to restrained Rubicon dark iron-red / muted oxide-red. Preserve every charcoal, gunmetal, muted taupe, off-white, black, and warm amber material exactly in role and placement. Preserve all wear, grime, seams, highlights, and values.
Composition/framing invariants: Preserve the exact silhouette, pixel footprint, geometry, proportions, cockpit, armor, weapon-stub shoulders, compact tail, central rotor hub, orientation, scale, centering, pivot, transparent padding, and lighting. The aircraft must remain strict orthographic 90-degree overhead and point exactly straight up. Change no equipment.
Critical dynamic-layer invariant: Keep this as BODY AND CENTRAL ROTOR HUB ONLY. Do not add any rotor blade, rotor disc, rotor arc, blur, shadow, muzzle flash, projectile, exhaust, wake, or moving effect.
Constraints: Recolor only. Do not add, remove, redraw, move, resize, rotate, warp, sharpen into new geometry, or reinterpret any component. Retain genuine transparent RGBA background and clean antialiased alpha. Keep all artwork clear of canvas edges.
Avoid: independently regenerated gunship, altered silhouette, changed hardpoints, broad saturated-red body areas, pink or neon red, changed neutrals, changed amber lights, hazard-yellow repaint, ground, drop shadow, halo, checkerboard, border, scenery, people, dinosaurs, text, letters, numbers, logos, insignia, watermark, perspective, isometric angle, rotor blades, external effects.
~~~

## QA

- Normalized proportionally to a padded 256×256 RGBA canvas with `image-audit/process_generated_sprite.py`; no stretching.
- Teal: alpha extrema `(0, 255)`, alpha bbox `(54, 14, 202, 242)`, no canvas contact.
- Red: alpha extrema `(0, 255)`, alpha bbox `(53, 14, 202, 242)`, no canvas contact.
- Teal/red alpha-mask IoU: `0.95572`; visible-pixel centroid delta is below 0.31 px per axis.
- Inspected at full resolution and exact 34×34 runtime draw size: compact rotorcraft body, centered rotor hub, and weapon shoulders remain readable; no baked rotor or external effect.
