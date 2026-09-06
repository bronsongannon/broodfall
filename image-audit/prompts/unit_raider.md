# `unit_raider` prompt record

## Expedition / teal — initial generation

- Built-in ImageGen mode: generate with all three approved local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-735899d3-7261-45aa-a820-5f8e4b8c10aa.png`
- Processing: border-connected baked checkerboard was cleared and the art was proportionally normalized with `image-audit/process_generated_sprite.py --canvas 256x256`; the first result was retained only as the geometry-refinement input because its footprint was too narrow at gameplay size

```text
Use case: stylized-concept
Asset type: Broodfall production RTS vehicle sprite, Expedition colorway, destined for unit_raider_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use all three solely as style, material, surface-wear, palette-restraint, rendering-detail, and strict overhead-camera references. Do not copy their naval subjects, silhouettes, layouts, water context, or specific components
Scene/backdrop: genuinely transparent background; one isolated vehicle sprite only
Subject: a fast expeditionary light attack raider viewed directly from overhead, pointing exactly straight up/north; compact narrow armored buggy/scout-car silhouette with four clearly readable rugged wheels, tapered wedge-like armored nose, enclosed low-profile central cabin, short rear engine deck, and one small restrained forward weapon mount integrated on the centerline; agile and lightly armored, unmistakably distinct from a tank, truck, harvester, or civilian sports car; no visible occupant
Style/medium: grounded semi-realistic 2D RTS hard-surface game art matching the supplied references; crisp weathered painted metal and practical field engineering, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead view with no visible side faces, centered on the exact canvas pivot, axis-aligned and vertically oriented with the nose toward the top; complete vehicle and wheels visible; fill roughly 82% of a square 256×256 canvas with safe transparent padding on every edge; compact silhouette and wheel/weapon cues must remain crisp and readable when reduced to about 30×30 gameplay pixels
Lighting/mood: neutral diffuse overhead lighting, restrained warm amber head/marker lights, no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small identification panels, cabin insets, rails, and light housings; sparse off-white technical trim; warm amber lights
Materials/textures: scuffed armor plate, chipped paint, rubber tread, bolts, vents, dust/salt staining, practical suspension guards; strong silhouette and midtone separation at tiny scale
Constraints: one raider only; genuinely clean alpha transparency with antialiased edges; straight-up orientation; exact central pivot; no canvas contact; no ground, terrain, road, dust cloud, water, wake, drop shadow, glow halo, text, letters, numerals, logos, insignia, people, visible driver, scenery, checkerboard, border, or frame
Avoid: isometric or three-quarter view, perspective tilt, visible horizon, toy-like cartoon buggy, saturated cyan body, an entire teal hood or roof, glossy civilian sports car, sci-fi neon, huge cannon, tank tracks, six or eight wheels, clipped wheels
```

## Expedition / teal — proportion refinement

- Built-in ImageGen mode: precise-object edit of the normalized first pass
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-54e9655c-3d72-4642-976d-f090afd7022f.png`
- The shape was selected; its pale generated contact halo was removed in the following transparency-only pass

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Expedition raider geometry refinement
Input image: Image 1 is the generated Expedition light attack raider edit target
Primary request: refine only the vehicle proportions for tiny RTS readability. Redraw the same raider as a broader, shorter, compact four-wheel attack buggy/scout car while preserving its exact identity, strict straight-up orientation, materials, weathering, restrained palette, wedge-like armored nose, enclosed central cabin, rear engine deck, exposed suspension, and small restrained centerline forward weapon mount. Increase wheel track and body width and reduce excess chassis length so the complete visible footprint is approximately 3:4 width-to-height. It must remain agile and lightly armored, clearly distinct from a tank or civilian sports car
Composition/framing: strict orthographic 90-degree overhead, no visible side faces, exact central pivot, complete vehicle and four wheels centered with even transparent safe padding; optimize the wheel/body/weapon silhouette for 30×30 pixels
Constraints: geometry-proportion correction only; preserve grounded semi-realistic rendering, weathered charcoal/gunmetal, muted taupe, restrained Expedition teal/off-white identification accents, and amber lights. No people or visible driver. Genuine transparent background with clean antialiased alpha. No ground, terrain, road, dust, water, wake, shadow, text, letters, numerals, logos, insignia, scenery, checkerboard, border, or canvas contact
Avoid: independent redesign, narrow spear-like racer, six or eight wheels, tank tracks, huge cannon, glossy civilian car, perspective tilt, isometric view, cartoon style, saturated cyan
```

## Expedition / teal — selected transparency cleanup

- Built-in ImageGen mode: background-extraction edit of the normalized proportion refinement
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-203f7190-d11e-4c3d-bc0d-1350198787ba.png`
- Final: `assets/sprites/unit_raider_teal.png`

```text
Use case: background-extraction
Asset type: Broodfall production RTS vehicle sprite transparency cleanup for unit_raider_teal.png
Input image: Image 1 is the approved compact Expedition raider edit target
Primary request: remove only the pale white/gray baked drop shadow, contact shadow, checkerboard residue, outline, and halo surrounding or underneath the vehicle. Produce a genuinely transparent background immediately outside the physical raider. Preserve the vehicle itself pixel-for-pixel in appearance as closely as possible: exact compact four-wheel silhouette, geometry, wheel positions, suspension, wedge nose, centerline weapon, cabin, engine deck, proportions, scale, centering, pivot, straight-up orientation, materials, weathering, colors, amber lights, and strict orthographic overhead lighting
Composition/framing: exact same square framing and centered footprint; complete raider with transparent safe padding; no crop or canvas contact
Constraints: background/edge cleanup only; do not add, remove, move, resize, rotate, redraw, recolor, relight, or reinterpret any vehicle component. Genuine clean alpha transparency with antialiased physical edges only. No ground, terrain, road, dust, water, wake, cast shadow, contact shadow, ambient shadow outside the vehicle, glow halo, pale outline, checkerboard, text, letters, numerals, logos, insignia, people, scenery, border, or frame
Avoid: any independent redesign, altered wheels or weapon, added shadow, white edge fringe, black matte, perspective tilt, isometric view
```

## Rubicon / red — first colorway pass (discarded)

- Built-in ImageGen mode: image-to-image precise recolor of the approved normalized teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-28f96800-8acd-4536-a1ac-139733d78c20.png`
- Result was visually sound but discarded after alpha-mask QA in favor of the closer silhouette-lock retry

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon colorway, destined for unit_raider_red.png and normalized to a 256×256 RGBA canvas
Input image: Image 1 is the approved normalized Expedition light attack raider edit target
Primary request: perform a precise faction-colorway-only edit. Recolor only the restrained Expedition teal identification panels, cabin inset, small rail accents, and teal light housings to restrained Rubicon dark oxide-red / weathered iron-red. Preserve all charcoal/gunmetal machinery, muted taupe and off-white structural armor, black rubber wheels, warm amber lights, dirt, salt staining, scratches, and chipped-paint wear
Composition/framing: preserve the exact compact four-wheel silhouette, wedge nose, centerline light weapon mount, enclosed cabin, engine deck, suspension, geometry, footprint, scale, pivot, centering, transparent padding, 3:4 visible proportions, straight-up orientation, strict orthographic 90-degree overhead camera, and lighting
Constraints: recolor only; do not add, remove, redraw, move, resize, rotate, sharpen into new geometry, or reinterpret any component. Preserve genuine transparent background and clean antialiased alpha with no pale edge fringe. No ground, terrain, road, dust, water, wake, cast shadow, contact shadow, glow halo, text, letters, numerals, logos, insignia, people, scenery, checkerboard, border, or canvas contact
Avoid: independently regenerated raider, changed wheels or weapon, large saturated red body panels, glossy red sports car, changed neutral armor or amber lights, perspective tilt, sci-fi neon
```

## Rubicon / red — selected silhouette-lock retry

- Built-in ImageGen mode: image-to-image precise recolor of the same normalized teal master
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074e5-ced6-7e22-a276-3fb865832942/exec-973e015f-c3eb-4dbc-bf93-126f51049afb.png`
- Final: `assets/sprites/unit_raider_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS vehicle sprite, Rubicon raider colorway silhouette-lock retry
Input image: Image 1 is the approved normalized Expedition raider and is the exact geometry/alpha-mask edit target
Primary request: change color only. Replace only the small weathered teal faction paint areas on the center cabin inset, side rail insets, small nose/rear trim, and teal equipment surfaces with restrained weathered dark oxide-red / iron-red. Keep every non-teal pixel visually unchanged
Hard invariants: preserve the exact source alpha mask and every exterior boundary pixel; preserve identical compact four-wheel silhouette, 256×256 framing, geometry, wheel positions, suspension, wedge nose, centerline weapon, cabin, engine deck, footprint, scale, pivot, centering, padding, straight-up orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, and amber lights. Do not redraw any structure
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, cast shadow, contact shadow, outline, pale fringe, halo, text, logos, people, scenery, border, or canvas contact
Avoid: regenerated raider, any shape/width/length change, altered wheels or weapon, red applied to neutral charcoal/taupe/off-white armor, saturated red slabs, altered lighting
```

## Processing and QA

- Selected outputs were cleared only of border-connected baked checkerboard, then proportionally fitted, never stretched, to 256×256 RGBA with 14 px minimum vertical padding via `image-audit/process_generated_sprite.py`.
- Teal: alpha extrema `(0, 255)`, bbox `(37, 14, 218, 242)`, canvas-edge alpha max `0`, visible footprint about `21.2×26.7 px` inside the runtime 30 px draw box.
- Red: alpha extrema `(0, 255)`, bbox `(38, 14, 218, 242)`, canvas-edge alpha max `0`, visible footprint about `21.1×26.7 px` inside the runtime 30 px draw box.
- Teal/red alpha-mask IoU at alpha > 16: `0.97497`.
- Full-size magenta-background inspection specifically verified that the pale generated contact halo was removed. Repeated 30 px gameplay inspection passed for strict overhead orientation, four-wheel wedge/weapon identity, restrained faction color, and absence of ground/shadow/text/scenery.
