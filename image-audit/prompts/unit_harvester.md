# unit_harvester prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with all three approved local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-f373-7be3-8bf1-961a03500e0a/exec-71b16497-e760-409a-8aa5-38f244399201.png`
- Normalized edit target: `/tmp/broodfall-phase2-air.P49HjN/unit_harvester_teal.png`
- Final: `assets/sprites/unit_harvester_teal.png`

~~~text
Use case: stylized-concept
Asset type: Broodfall human-faction RTS unit sprite — teal Harvester master
Input images: Image 1 is the approved bld_skiff material/style reference; Image 2 is the approved unit_carrier_teal material/style and faction-palette reference; Image 3 is the approved bld_shipyard_teal material/style reference. Match their grounded semi-realistic rendering, restrained palette, weathering, and fine but readable mechanical finish; do not copy their shapes.
Scene/backdrop: No scene. Genuine fully transparent RGBA background around the isolated vehicle.
Primary request: Create one compact industrial resource-harvesting ground vehicle for a real-time strategy game, seen at a strict orthographic 90-degree overhead view, pointing exactly straight up toward 12 o'clock. It should read at an actual in-game display size of about 30 pixels as a rugged expedition mining/logistics machine: broad tracked or heavy-wheeled stance, armored forward operator/engine module, industrial side mechanisms, and a large clearly readable EMPTY recessed cargo/loading bed centered toward the rear. The open bed must visually accept a separate crystal/resource-load overlay drawn by the game.
Style/medium: Grounded semi-realistic hand-finished RTS sprite art, matching the approved references. Crisp readable silhouette, controlled panel seams, subtly chipped and worn painted metal, no exaggerated cartoon proportions.
Color palette: Weathered charcoal and gunmetal body, muted taupe structural armor, restrained Expedition teal and off-white identification panels only, tiny amber utility lights, subtle hazard-yellow safety marks limited to industrial pinch points. Teal must be an accent rather than the dominant body color.
Materials/textures: Scuffed matte armor, dark track or wheel machinery, gridded empty cargo-bed floor, restrained edge wear and work grime.
Composition/framing: Exactly one whole vehicle, centered on a square canvas with generous even transparent safety padding. Bilaterally balanced footprint and exact geometric center/pivot. Keep all pixels well clear of the canvas edges.
Critical dynamic-layer constraint: The rear cargo/loading bed must be visibly empty. Do not draw crystals, ore, minerals, resource chunks, cargo glow, floating load indicator, harvesting beam, dust, exhaust plume, or other load/effect; the game draws the crystal/load overlay separately at runtime.
Lighting: Neutral soft overhead studio illumination consistent across the vehicle, with restrained highlights; no directional cast shadow.
Constraints: Strict 90-degree top-down orthographic projection with no visible horizon, no oblique side view, and no perspective convergence. Nose/front points straight up. Preserve a sturdy compact silhouette and simple large-value grouping that survives 30-pixel downscaling. True alpha transparency.
Avoid: ground plane, drop shadow, ambient halo, road, dirt, rocks, crystals, ore, scenery, people, driver figure, dinosaurs, text, letters, numbers, logos, insignia, watermark, checkerboard, border, multiple vehicles, perspective, isometric angle, baked resource load, external effects.
~~~

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the normalized teal master
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-f373-7be3-8bf1-961a03500e0a/exec-5008da79-269e-434f-b566-948291cde6fc.png`
- Final: `assets/sprites/unit_harvester_red.png`

~~~text
Use case: precise-object-edit
Asset type: Broodfall human-faction RTS unit sprite — Rubicon red Harvester colorway
Input image: Image 1 is the approved normalized Expedition teal Harvester edit target.
Primary request: Perform a precise COLORWAY-ONLY edit. Recolor only the restrained Expedition teal identification panels and teal-painted small machine accents to restrained Rubicon dark iron-red / muted oxide-red. Preserve every charcoal, gunmetal, muted taupe, off-white, black, warm amber, and existing hazard-yellow material exactly in role and placement. Preserve all wear, grime, seams, highlights, tires/tracks, and bed-floor values.
Composition/framing invariants: Preserve the exact silhouette, pixel footprint, geometry, forward operator/engine module, side industrial mechanisms, wheels/tracks, EMPTY recessed rear cargo/loading bed, orientation, scale, centering, pivot, transparent padding, and lighting. The vehicle must remain strict orthographic 90-degree overhead and point exactly straight up. Change no equipment.
Critical dynamic-layer invariant: Keep the cargo/loading bed visibly EMPTY and unchanged. Do not add crystals, ore, minerals, resource chunks, cargo glow, floating load indicator, harvesting beam, dust, exhaust plume, or any load/effect; the game renders the resource-load overlay separately.
Constraints: Recolor only. Do not add, remove, redraw, move, resize, rotate, warp, sharpen into new geometry, or reinterpret any component. Retain genuine transparent RGBA background and clean antialiased alpha. Keep all artwork clear of canvas edges.
Avoid: independently regenerated harvester, altered silhouette, changed cargo bed, broad saturated-red body areas, pink or neon red, changed neutrals, changed hazard-yellow marks, changed amber lights, ground, drop shadow, halo, checkerboard, border, road, rocks, crystals, scenery, people, dinosaurs, text, letters, numbers, logos, insignia, watermark, perspective, isometric angle, baked resource load, external effects.
~~~

## QA

- Normalized proportionally to a padded 256×256 RGBA canvas with `image-audit/process_generated_sprite.py`; no stretching.
- Teal: alpha extrema `(0, 255)`, alpha bbox `(68, 14, 187, 242)`, no canvas contact.
- Red: alpha extrema `(0, 255)`, alpha bbox `(68, 14, 188, 242)`, no canvas contact.
- Teal/red alpha-mask IoU: `0.96834`; visible-pixel centroid delta is below 0.38 px per axis.
- Inspected at full resolution and exact 30×30 runtime draw size: the industrial chassis and large rear loading bed remain distinct; bed is empty and ready for the existing crystal/load overlay.
