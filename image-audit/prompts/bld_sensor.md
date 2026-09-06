# `bld_sensor` prompt record

## Expedition / teal

- Built-in ImageGen mode: generate with three local style references
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-4301310a-2af3-4f25-853a-bc6e9e7403b3.png`
- Final: `assets/sprites/bld_sensor_teal.png`

```text
Use case: stylized-concept
Asset type: Broodfall production RTS building sprite, Expedition colorway, destined for bld_sensor_teal.png and normalized to a 256×256 RGBA canvas
Input images: Images 1–3 are style/material/camera references only; match their overhead accuracy, restrained palette, wear, and finish, but do not copy naval subjects
Scene/backdrop: genuinely transparent background; isolated sprite only
Subject: a compact scientific overwatch sensor base viewed directly from overhead, a rugged square-to-octagonal low platform with four stabilizing corner feet, shielded electronics cabinets, cable conduits, cooling vents, calibration instruments, and a clearly empty circular central azimuth mount/socket for the game-drawn rotating radar dish; recognizable as scientific surveillance hardware rather than a weapon turret, power plant, or airpad
Style/medium: grounded semi-realistic 2D RTS game art matching supplied references; crisp weathered hard-surface painting, no heavy cartoon outline
Composition/framing: strict orthographic 90-degree overhead, centered and axis-aligned, full compact silhouette visible, fills about 82% of a square canvas with safe transparent padding on every edge; readable at 60×60 pixels. Keep the exact center clear and visually simple for a rotating dish/feed-horn overlay and radar sweep. No perspective tilt or isometric view
Lighting/mood: neutral diffuse overhead lighting, a few restrained warm amber instrument lights, no cast shadow
Color palette: weathered charcoal/gunmetal and muted taupe structural mass; restrained Expedition teal only on small instrument panels, cable guards, inset stripes, and indicator housings; off-white technical trim; warm amber lights
Materials/textures: panel seams, bolts, dusty/salt-stained electronics housings, non-slip service plates, functional machinery; strong midtone separation at gameplay scale
Constraints: base platform only—absolutely no radar dish, antenna bowl, rotating arm, feed horn, beam, radar sweep, weapon, gun barrel, or mast baked into the art. Genuine clean alpha transparency with antialiased edges; no canvas contact; no baked ground, concrete terrain, water, coastline, wake, drop shadow, text, letters, numerals, logos, insignia, people, vehicles, scenery, checkerboard, border, or frame
Avoid: military turret silhouette, satellite dish already present, glossy mobile-game vector art, giant teal surface, sci-fi neon, perspective walls, visible horizon
```

## Rubicon / red

- Built-in ImageGen mode: image-to-image precise recolor of the approved teal final
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-3835cf41-da26-410a-97fc-8ad86b326c49.png`
- Final: `assets/sprites/bld_sensor_red.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS sensor-base sprite, Rubicon colorway, destined for bld_sensor_red.png
Input image: Image 1 is the approved Expedition overwatch sensor base edit target
Primary request: recolor only the faction-identification treatment from Expedition teal to restrained Rubicon red; shift teal electronics panels, cable guards, narrow inset stripes, and indicator housings to dark iron-red / muted oxide-red. Preserve the weathered charcoal/gunmetal and muted taupe structure, off-white technical trim, and warm amber instrument lights
Composition/framing: preserve exact silhouette, geometry, four stabilizing feet, electronics cabinets, empty circular center mount, footprint, pivot, scale, centering, transparent padding, orientation, and lighting; strict orthographic 90-degree overhead remains unchanged
Constraints: colorway change only; do not add, remove, redraw, move, resize, rotate, or reinterpret any component. Keep the exact center empty for the game-drawn rotating radar dish and sweep. Genuine transparent background with clean antialiased alpha. No radar dish, antenna bowl, feed horn, mast, beam, sweep, weapon, ground, shadow, text, letters, numerals, logos, insignia, people, vehicles, scenery, checkerboard, border, or canvas contact
Avoid: independently regenerated base, military turret silhouette, large saturated red surfaces, changed equipment, perspective tilt, sci-fi neon
```

## Approved Expedition / teal refinement (2026-09-06)

- Built-in ImageGen mode: precise color/value/material edit of the high-resolution Expedition sensor base
- Selected raw preview: `/Users/bronsongannon/.codex/generated_images/01a0772c-daf4-78f3-a92b-63d3ece37062/exec-05cbd273-1902-44a7-b3e9-ad8dad64edf9.png`
- Production destination: `assets/sprites/bld_sensor_teal.png`
- Normalized production canvas: 256×256 RGBA
- Approved color/value reference: Barracks `/Users/bronsongannon/.codex/generated_images/01a074b5-e49a-77a3-a02b-be55b3fb8d8b/exec-06a799f0-ff68-46d0-a958-1265d7f67260.png`
- Prompt/result: recolor and relight only, making the sensor base's broad painted armor muted aqua-dominant at the approved Barracks brightness while retaining dirty warm taupe/off-white structure, charcoal electronics and recesses, amber instrument lights, and restrained weathering. The user approved the result with all four feet, electronics cabinets, empty center mount, exact crop, and strict overhead geometry preserved.
- Raw-output condition: 1254×1254 PNG, `hasAlpha: no`, with a baked checkerboard; it is not production-ready until background extraction and normalization.
- Red dependency: the currently installed `assets/sprites/bld_sensor_red.png` derives from the superseded teal art and must be regenerated from the newly approved teal, previewed, and separately approved before installation.
