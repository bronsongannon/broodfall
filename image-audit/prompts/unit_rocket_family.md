# Rocket Trooper production family prompt ledger

This ledger records the Phase 3 Rocket Trooper family produced with the built-in ImageGen tool. Each production sprite came from its own ImageGen call. No sprite sheet or programmatic artwork was used. Generated images were proportionally normalized, never stretched, with image-audit/process_generated_sprite.py to 256×256 RGBA with 14 px safe padding.

## Reference and path keys

- R1: /Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png
- R2: /Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png
- R3: /Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png
- T: /tmp/broodfall-phase3-rocket/finals
- G: /Users/bronsongannon/.codex/generated_images/01a07533-c926-7d21-b7ec-ae9acfd6079c
- P: /Users/bronsongannon/Desktop/broodfall/assets/sprites

Every teal call included R1, R2, and R3. Every red call used its normalized teal counterpart as authoritative Image 1 and included R1, R2, and R3 as secondary references. The selected walk1–walk3 red calls also included one rejected normalized red draft solely as a color-direction reference; Image 1 remained authoritative.

## Selected production provenance

| Production asset | Selected generated original | Submitted input images, in order | Normalized staging final | Production final |
|---|---|---|---|---|
| unit_rocket_teal.png | G/exec-ec1648e4-1ad9-482a-95c2-ee7747329f71.png | R1; R2; R3 | T/unit_rocket_teal.png | P/unit_rocket_teal.png |
| unit_rocket_red.png | G/exec-54d7fa82-b98b-4776-83eb-c985e75fe45f.png | T/unit_rocket_teal.png; R1; R2; R3 | T/unit_rocket_red.png | P/unit_rocket_red.png |
| unit_rocket_walk1_teal.png | G/exec-eb0426e0-d13b-40f1-ae7f-21108154a7cd.png | T/unit_rocket_teal.png; R1; R2; R3 | T/unit_rocket_walk1_teal.png | P/unit_rocket_walk1_teal.png |
| unit_rocket_walk1_red.png | G/exec-e671ff68-de69-46ee-a7db-f0b07eda3edb.png | T/unit_rocket_walk1_teal.png; normalized draft from G/exec-07067cb4-4725-49bd-adf7-ebee7545f685.png; R1; R2; R3 | T/unit_rocket_walk1_red.png | P/unit_rocket_walk1_red.png |
| unit_rocket_walk2_teal.png | G/exec-3e4e1d72-5875-4bd2-b300-a591474f4ee1.png | T/unit_rocket_teal.png; T/unit_rocket_walk1_teal.png; R1; R2; R3 | T/unit_rocket_walk2_teal.png | P/unit_rocket_walk2_teal.png |
| unit_rocket_walk2_red.png | G/exec-6a4a8476-b3e2-4269-8c14-4f7b7c54e9a4.png | T/unit_rocket_walk2_teal.png; normalized draft from G/exec-07108d68-fffa-4343-9b4a-8e73629235ff.png; R1; R2; R3 | T/unit_rocket_walk2_red.png | P/unit_rocket_walk2_red.png |
| unit_rocket_walk3_teal.png | G/exec-b8894894-1777-400f-a8e4-e6528258fd3d.png | T/unit_rocket_teal.png; T/unit_rocket_walk2_teal.png; R1; R2; R3 | T/unit_rocket_walk3_teal.png | P/unit_rocket_walk3_teal.png |
| unit_rocket_walk3_red.png | G/exec-5a128831-3118-480d-b18a-5df30bed9f97.png | T/unit_rocket_walk3_teal.png; normalized draft from G/exec-e22c1a2a-9e37-4bbb-9ada-f5c524bc85d1.png; R1; R2; R3 | T/unit_rocket_walk3_red.png | P/unit_rocket_walk3_red.png |
| unit_rocket_walk4_teal.png | G/exec-7e1dedda-60a0-4772-8572-814bbe12b4a6.png | T/unit_rocket_teal.png; T/unit_rocket_walk3_teal.png; R1; R2; R3 | T/unit_rocket_walk4_teal.png | P/unit_rocket_walk4_teal.png |
| unit_rocket_walk4_red.png | G/exec-a21fae31-a7e8-4d2b-9137-bb616afebb7a.png | T/unit_rocket_walk4_teal.png; R1; R2; R3 | T/unit_rocket_walk4_red.png | P/unit_rocket_walk4_red.png |
| unit_rocket_walk5_teal.png | G/exec-792e0021-018d-4a9c-b7ba-69dcc5826c1f.png | T/unit_rocket_teal.png; R1; R2; R3 | T/unit_rocket_walk5_teal.png | P/unit_rocket_walk5_teal.png |
| unit_rocket_walk5_red.png | G/exec-6597eb08-462b-494c-a1b6-b8dad53bbe23.png | T/unit_rocket_walk5_teal.png; R1; R2; R3 | T/unit_rocket_walk5_red.png | P/unit_rocket_walk5_red.png |
| unit_rocket_walk6_teal.png | G/exec-a5880fbf-212c-4d98-9451-e1cd0c5cbcf0.png | T/unit_rocket_teal.png; T/unit_rocket_walk5_teal.png; R1; R2; R3 | T/unit_rocket_walk6_teal.png | P/unit_rocket_walk6_teal.png |
| unit_rocket_walk6_red.png | G/exec-46629d5a-7ed6-4e42-8125-3ac4a4ef16db.png | T/unit_rocket_walk6_teal.png; R1; R2; R3 | T/unit_rocket_walk6_red.png | P/unit_rocket_walk6_red.png |
| unit_rocket_walk7_teal.png | G/exec-1ebfa913-b612-4b79-9890-e13691ac7f7a.png | T/unit_rocket_teal.png; T/unit_rocket_walk6_teal.png; R1; R2; R3 | T/unit_rocket_walk7_teal.png | P/unit_rocket_walk7_teal.png |
| unit_rocket_walk7_red.png | G/exec-215b05ad-2635-4ac8-9d8c-68948f85700d.png | T/unit_rocket_walk7_teal.png; R1; R2; R3 | T/unit_rocket_walk7_red.png | P/unit_rocket_walk7_red.png |
| unit_rocket_walk8_teal.png | G/exec-fcddb3aa-2c25-46c5-abf0-b58a3603baf4.png | T/unit_rocket_teal.png; T/unit_rocket_walk7_teal.png; R1; R2; R3 | T/unit_rocket_walk8_teal.png | P/unit_rocket_walk8_teal.png |
| unit_rocket_walk8_red.png | G/exec-65e98240-c322-457c-adfa-697540a43b18.png | T/unit_rocket_walk8_teal.png; R1; R2; R3 | T/unit_rocket_walk8_red.png | P/unit_rocket_walk8_red.png |
| unit_rocket_death1_teal.png | G/exec-91b81194-6967-4d51-8098-4fcc7229fed4.png | T/unit_rocket_teal.png; R1; R2; R3 | T/unit_rocket_death1_teal.png | P/unit_rocket_death1_teal.png |
| unit_rocket_death1_red.png | G/exec-39fcfa72-b54b-4f0a-9021-f22df43a8e72.png | T/unit_rocket_death1_teal.png; R1; R2; R3 | T/unit_rocket_death1_red.png | P/unit_rocket_death1_red.png |
| unit_rocket_death2_teal.png | G/exec-55cc6dd2-1f19-4c3c-9c37-c8eab1096ddc.png | T/unit_rocket_teal.png; T/unit_rocket_death1_teal.png; R1; R2; R3 | T/unit_rocket_death2_teal.png | P/unit_rocket_death2_teal.png |
| unit_rocket_death2_red.png | G/exec-0e112e4e-b0c6-4da6-96d0-8391415bcc49.png | T/unit_rocket_death2_teal.png; R1; R2; R3 | T/unit_rocket_death2_red.png | P/unit_rocket_death2_red.png |
| unit_rocket_death3_teal.png | G/exec-4ad05ad1-4aa1-42ba-a844-c7be839e9028.png | T/unit_rocket_teal.png; T/unit_rocket_death2_teal.png; R1; R2; R3 | T/unit_rocket_death3_teal.png | P/unit_rocket_death3_teal.png |
| unit_rocket_death3_red.png | G/exec-afdd1cf4-b977-4822-9d7b-d11ba8486f3c.png | T/unit_rocket_death3_teal.png; R1; R2; R3 | T/unit_rocket_death3_red.png | P/unit_rocket_death3_red.png |
| unit_rocket_death4_teal.png | G/exec-47bfd0c3-f627-4c32-8b68-32e6049be972.png | T/unit_rocket_teal.png; T/unit_rocket_death3_teal.png; R1; R2; R3 | T/unit_rocket_death4_teal.png | P/unit_rocket_death4_teal.png |
| unit_rocket_death4_red.png | G/exec-64f214f5-1c97-4891-85a1-39c30163b942.png | T/unit_rocket_death4_teal.png; R1; R2; R3 | T/unit_rocket_death4_red.png | P/unit_rocket_death4_red.png |

## Exact selected prompts

These are the exact resolved prompt strings submitted to ImageGen. The input list is in submitted order; path keys expand exactly as listed above.

### unit_rocket_teal.png

- Selected generated original: G/exec-ec1648e4-1ad9-482a-95c2-ee7747329f71.png
- Submitted input images, in order: R1; R2; R3
- Normalized staging final: T/unit_rocket_teal.png
- Production final: P/unit_rocket_teal.png

~~~text
Use case: stylized-concept
Asset type: single production RTS infantry sprite, Rocket Trooper static teal master
Primary request: Create exactly one Rocket Trooper standing in a neutral combat-ready idle pose, facing straight north, for Broodfall. The unmistakable shoulder-fired launcher tube is physically carried over one shoulder, points straight north, and remains part of the compact readable silhouette.
Input images: Image 1 (bld_skiff.png), Image 2 (unit_carrier_teal.png), and Image 3 (bld_shipyard_teal.png) are authoritative style, material, palette, weathering, and strict overhead-projection references only; do not copy their vehicle/building geometry.
Scene/backdrop: genuinely transparent background.
Subject: one adult human heavy-weapons soldier only; grounded semi-realistic proportions that remain readable at 32×32; compact armored torso, anatomically plausible arms and legs, stable shoulder-mounted tube, small restrained red warhead tip as a universal weapon cue.
Style/medium: polished hand-painted game sprite; weathered gunmetal and taupe armor; restrained teal faction identification surfaces; off-white technical trim; universal hazard-yellow service marks; tiny amber equipment lights; subtle wear consistent with the references.
Composition/framing: strict 90-degree orthographic overhead view, camera directly above with no visible horizon or side-on perspective; soldier faces canvas north; centered on a 1:1 canvas with generous transparent safe padding; fixed central gameplay pivot; balanced compact footprint.
Lighting/mood: neutral diffuse tactical readability, restrained highlights, no cast shadow.
Constraints: exactly one isolated subject; preserve a practical infantry scale and occupancy suitable for later matching animation frames; launcher is unmistakable, attached, and aligned north; true alpha transparency; clean antialiased silhouette.
Avoid: chibi/bobblehead/toy anatomy, spindly anatomy, oversized head or shoulders, detached equipment, extra weapons, extra people, scenery, terrain, ground patch, shadow, glow, halo, smoke, particles, border, text, letters, numbers, logo, watermark, isometric view, tilted camera, three-quarter view, perspective foreshortening, sprite sheet, multiple poses, animation strip.
~~~

### unit_rocket_red.png

- Selected generated original: G/exec-54d7fa82-b98b-4776-83eb-c985e75fe45f.png
- Submitted input images, in order: T/unit_rocket_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_red.png
- Production final: P/unit_rocket_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper static idle sprite, unit_rocket_red.png, opaque-surface color-only correction
Primary request: EDIT IMAGE 1 IN PLACE. Replace only restrained teal faction paint with restrained dark weathered Rubicon oxide-red. Preserve the exact source drawing and alpha geometry. All physical soldier, armor, body, limb, launcher, and equipment surfaces must be fully opaque like Image 1—not translucent, ghosted, faded, doubled, or see-through.
Input images: Image 1 is the authoritative normalized teal production edit target for exact character identity, static idle pose, exterior contour, true negative-space cutouts, alpha coverage, opacity, launcher, materials, scale, pivot, padding, lighting, and non-teal colors. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png secondary references for grounded materials and restrained accents only; ignore their shapes and composition.
Color edit only: teal-painted helmet/armor identification panels become muted Rubicon red with identical value, scratches, and wear. Preserve taupe, gunmetal, off-white, black, hazard-yellow, amber lights, and universal red warhead.
Alpha/geometry invariants: normalized exterior bbox remains x=60..194, y=14..241; exterior silhouette IoU must be >=0.95. Preserve Image 1's legitimate transparent gaps and clean antialiased OUTER edge, but keep at least 90% of all nonzero subject pixels alpha>=250, matching the solid opaque teal source. No semitransparent lower body, internal fade, duplicate silhouette, afterimage, motion blur, glow, or ghost.
Keep exact strict 90-degree overhead north orientation, static idle anatomy/limbs, attached north-pointing launcher, center, scale, and canvas occupancy. Do not redraw, move, rotate, mirror, resize, crop, widen, narrow, sharpen, simplify, add, or remove detail.
Output: exactly one isolated RGBA sprite on genuine transparency. No ground, shadow, halo, scenery, text, logo, watermark, border, perspective, sprite sheet, or extra pose.
~~~

### unit_rocket_walk1_teal.png

- Selected generated original: G/exec-eb0426e0-d13b-40f1-ae7f-21108154a7cd.png
- Submitted input images, in order: T/unit_rocket_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk1_teal.png
- Production final: P/unit_rocket_walk1_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 1 of 8, teal
Primary request: Create a new animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 1/8: LEFT-FOOT CONTACT. The left foot is forward/north at first ground contact and the right foot is back/south; the pose must read clearly from directly overhead while the central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, canvas occupancy, palette, lighting, and pivot reference. Images 2–4 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube physically attached/carried over the shoulder and pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Image 1 exactly: weathered gunmetal and taupe armor, restrained teal faction panels, off-white technical trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Animation lock: change only the legs and the minimum natural hip/arm counter-motion needed for LEFT CONTACT; hold the upper body, head, armor, shoulder tube, tube direction, and lighting stable. No body translation, turn, tilt, bob, scale pulse, silhouette redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached and intact; true alpha transparency; clean antialiased silhouette.
Avoid: chibi, spindly anatomy, detached launcher or warhead, extra equipment, extra person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, isometric or three-quarter view, sprite sheet, multiple poses.
~~~

### unit_rocket_walk1_red.png

- Selected generated original: G/exec-e671ff68-de69-46ee-a7db-f0b07eda3edb.png
- Submitted input images, in order: T/unit_rocket_walk1_teal.png; normalized draft from G/exec-07067cb4-4725-49bd-adf7-ebee7545f685.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk1_red.png
- Production final: P/unit_rocket_walk1_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 1/8 left-contact, unit_rocket_walk1_red.png, exact-footprint recolor retry
Primary request: RECOLOR IMAGE 1 IN PLACE. Change only teal paint to restrained dark Rubicon red. Preserve the same source silhouette; this is not a redraw. The normalized source visible bbox is x=65..190, y=14..241; output must keep that compact exterior footprint and exceed 0.96 exterior-mask IoU.
Input images: Image 1 is the authoritative normalized teal production frame and exact edit target for every geometric and alpha relationship. Image 2 is a prior red color draft only; borrow restrained red hue, not shape. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material benchmarks only.
Color edit only: teal helmet/armor identification panels become weathered Rubicon oxide-red; gunmetal, taupe, off-white, black, hazard yellow, amber lights, launcher and universal red warhead stay unchanged.
Geometry/alpha lock: exact walk frame 1/8 left-contact leg phase, arms tucked to source width, exact launcher/body boundary, fixed center/pivot/scale/padding, strict 90-degree overhead north orientation, exact external contour and transparent cutouts. Do not broaden shoulders/arms, lengthen limbs, move feet, translate, crop, rotate, mirror, scale, sharpen, simplify, or redraw.
Background: exact genuine transparency. One isolated sprite. No ground, shadow, halo, glow, checkerboard, scenery, text, logo, border, perspective, sprite sheet, or extra pose.
~~~

### unit_rocket_walk2_teal.png

- Selected generated original: G/exec-3e4e1d72-5875-4bd2-b300-a591474f4ee1.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk1_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk2_teal.png
- Production final: P/unit_rocket_walk2_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 2 of 8, teal
Primary request: Create a new animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 2/8: LEFT-SIDE COMPRESSION / DOWN POSITION. The left foot remains planted forward/north after contact, the right leg trails, both knees compress slightly, and the pelvis reaches the lowest gait point; the pose must read clearly from directly overhead while the central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, canvas occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk1_teal.png) is the authoritative immediately preceding gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube physically attached/carried over the shoulder and pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal and taupe armor, restrained teal faction panels, off-white technical trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Animation lock: change only the legs and the minimum natural hip/arm counter-motion needed for LEFT COMPRESSION; hold the upper body, head, armor, shoulder tube, tube direction, and lighting stable. Do not literally move the body down the canvas: compression is anatomical only. No body translation, turn, tilt, bob, scale pulse, silhouette redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached and intact; true alpha transparency; clean antialiased silhouette.
Avoid: chibi, spindly anatomy, detached launcher or warhead, extra equipment, extra person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, isometric or three-quarter view, sprite sheet, multiple poses.
~~~

### unit_rocket_walk2_red.png

- Selected generated original: G/exec-6a4a8476-b3e2-4269-8c14-4f7b7c54e9a4.png
- Submitted input images, in order: T/unit_rocket_walk2_teal.png; normalized draft from G/exec-07108d68-fffa-4343-9b4a-8e73629235ff.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk2_red.png
- Production final: P/unit_rocket_walk2_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 2/8 left-compression sprite, unit_rocket_walk2_red.png, exterior-silhouette correction
Primary request: EDIT IMAGE 1 IN PLACE. Recolor only its teal faction paint to restrained dark Rubicon oxide-red. Do not redraw or change the gait pose. The border-connected-hole-filled exterior silhouette at alpha threshold 16 must overlap Image 1 by at least 0.96.
Input images: Image 1 is the authoritative normalized teal production walk frame 2/8 left-compression and absolute source of truth for exterior geometry, pose, anatomy, launcher, scale, pivot, padding, lighting, texture, alpha edge, and all non-teal colors. Image 2 is a rejected red draft: use only its restrained red hue; ignore its altered edges/geometry/details. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png secondary material/style benchmarks only.
Required edit: preserve Image 1 and replace only teal-painted helmet/armor identification panels with dark weathered Rubicon red of the same value and wear. Preserve taupe, gunmetal, off-white, black, hazard yellow, amber lights, and universal red warhead tip.
Absolute invariants: exact strict-overhead north-facing walk frame 2/8 left-compression pose; exact launcher shape/attachment/direction; exact body and limb positions; exact outer boundary, occupied scale, center pivot, safe padding, internal materials, and camera. No mirroring, translation, rotation, bob, crop, or scale change. One isolated sprite on genuine transparency.
Avoid: regenerated soldier, changed leg phase, geometry drift, altered launcher, broad red wash, red on neutral materials, new/removed detail, ground, shadow, halo, glow, scenery, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_walk3_teal.png

- Selected generated original: G/exec-b8894894-1777-400f-a8e4-e6528258fd3d.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk2_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk3_teal.png
- Production final: P/unit_rocket_walk3_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 3 of 8, teal
Primary request: Create a new animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 3/8: LEFT FOOT PLANTED / RIGHT FOOT PASSING. The left foot is planted under and slightly north of the body while the right foot lifts and passes beside it toward north; legs momentarily overlap more tightly than the contact poses; the central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, canvas occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk2_teal.png) is the authoritative immediately preceding gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube physically attached/carried over the shoulder and pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal and taupe armor, restrained teal faction panels, off-white technical trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Animation lock: change only the legs and minimum natural hip/arm counter-motion needed for LEFT PLANTED / RIGHT PASSING; hold upper body, head, armor, shoulder tube, tube direction, and lighting stable. No body translation, turn, tilt, bob, scale pulse, silhouette redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached and intact; true alpha transparency; clean antialiased silhouette.
Avoid: chibi, spindly anatomy, detached launcher or warhead, extra equipment, extra person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, isometric or three-quarter view, sprite sheet, multiple poses.
~~~

### unit_rocket_walk3_red.png

- Selected generated original: G/exec-5a128831-3118-480d-b18a-5df30bed9f97.png
- Submitted input images, in order: T/unit_rocket_walk3_teal.png; normalized draft from G/exec-e22c1a2a-9e37-4bbb-9ada-f5c524bc85d1.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk3_red.png
- Production final: P/unit_rocket_walk3_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 3/8 left-planted right-passing sprite, unit_rocket_walk3_red.png, exterior-silhouette correction
Primary request: EDIT IMAGE 1 IN PLACE. Recolor only teal faction paint to restrained dark Rubicon oxide-red. Do not redraw or change the gait pose. Border-connected-hole-filled exterior alpha silhouette at threshold 16 must overlap Image 1 by at least 0.96.
Input images: Image 1 is authoritative normalized teal walk frame 3/8 left-planted right-passing, absolute source for exterior geometry, gait pose, anatomy, launcher, scale, pivot, padding, lighting, texture, alpha edge, and non-teal colors. Image 2 is a rejected red draft: use only its red hue; ignore its geometry/details. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material/style benchmarks only.
Required edit: preserve Image 1 and replace only teal-painted identification panels with dark weathered Rubicon red of same value/wear. Preserve taupe, gunmetal, off-white, black, hazard yellow, amber, universal red warhead tip.
Absolute invariants: exact overhead north-facing walk frame 3/8 left-planted right-passing; exact launcher and limb positions; exact outer boundary, occupied scale, center pivot, padding, materials, camera. No mirror, translation, rotation, bob, crop, or scale change. One isolated sprite on genuine transparency.
Avoid: regenerated soldier, changed leg phase, geometry drift, altered launcher, broad red wash, red on neutral materials, new/removed detail, ground, shadow, halo, scenery, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_walk4_teal.png

- Selected generated original: G/exec-7e1dedda-60a0-4772-8572-814bbe12b4a6.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk3_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk4_teal.png
- Production final: P/unit_rocket_walk4_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 4 of 8, teal
Primary request: Create a new animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 4/8: HIGH POINT / RIGHT FOOT ADVANCING. The left leg supports a slightly raised pelvis while the right knee and foot advance forward/north in the air, preparing for contact; the central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, canvas occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk3_teal.png) is the authoritative immediately preceding gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube physically attached/carried over the shoulder and pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal and taupe armor, restrained teal faction panels, off-white technical trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Animation lock: change only the legs and minimum natural hip/arm counter-motion needed for HIGH / RIGHT ADVANCING; hold upper body, head, armor, shoulder tube, tube direction, and lighting stable. Do not literally move the body up the canvas: high point is anatomical only. No body translation, turn, tilt, bob, scale pulse, silhouette redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached and intact; true alpha transparency; clean antialiased silhouette.
Avoid: chibi, spindly anatomy, detached launcher or warhead, extra equipment, extra person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, isometric or three-quarter view, sprite sheet, multiple poses.
~~~

### unit_rocket_walk4_red.png

- Selected generated original: G/exec-a21fae31-a7e8-4d2b-9137-bb616afebb7a.png
- Submitted input images, in order: T/unit_rocket_walk4_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk4_red.png
- Production final: P/unit_rocket_walk4_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 4/8 high-point/right-advancing sprite, unit_rocket_walk4_red.png, opaque-surface color-only correction
Primary request: EDIT IMAGE 1 IN PLACE. Replace only restrained teal faction paint with restrained dark weathered Rubicon oxide-red. Preserve the exact source drawing and alpha geometry. All physical soldier, armor, body, limb, launcher, and equipment surfaces must be fully opaque like Image 1—not translucent, ghosted, faded, doubled, or see-through.
Input images: Image 1 is the authoritative normalized teal production edit target for exact character identity, walk frame 4/8 high-point/right-advancing pose, exterior contour, true negative-space cutouts, alpha coverage, opacity, launcher, materials, scale, pivot, padding, lighting, and non-teal colors. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png secondary references for grounded materials and restrained accents only; ignore their shapes and composition.
Color edit only: teal-painted helmet/armor identification panels become muted Rubicon red with identical value, scratches, and wear. Preserve taupe, gunmetal, off-white, black, hazard-yellow, amber lights, and universal red warhead.
Alpha/geometry invariants: normalized exterior bbox remains x=68..187, y=14..241; exterior silhouette IoU must be >=0.95. Preserve Image 1's legitimate transparent gaps and clean antialiased OUTER edge, but keep at least 90% of all nonzero subject pixels alpha>=250, matching the solid opaque teal source. No semitransparent lower body, internal fade, duplicate silhouette, afterimage, motion blur, glow, or ghost.
Keep exact strict 90-degree overhead north orientation, walk frame 4/8 high-point/right-advancing anatomy/limbs, attached north-pointing launcher, center, scale, and canvas occupancy. Do not redraw, move, rotate, mirror, resize, crop, widen, narrow, sharpen, simplify, add, or remove detail.
Output: exactly one isolated RGBA sprite on genuine transparency. No ground, shadow, halo, scenery, text, logo, watermark, border, perspective, sprite sheet, or extra pose.
~~~

### unit_rocket_walk5_teal.png

- Selected generated original: G/exec-792e0021-018d-4a9c-b7ba-69dcc5826c1f.png
- Submitted input images, in order: T/unit_rocket_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk5_teal.png
- Production final: P/unit_rocket_walk5_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 5 of 8, teal — alternate-contact production take
Primary request: Render the exact Rocket Trooper identity from Image 1 in a conspicuous opposite-leg long-stride contact pose. The CANVAS-LEFT LEG is the forward leg: its knee, shin, and boot are lifted/placed toward the TOP/NORTH of the canvas, visibly closer to the soldier's shoulders. The CANVAS-RIGHT LEG is the trailing leg: its knee, shin, and boot extend toward the BOTTOM/SOUTH of the canvas, visibly farther from the shoulders. These relative vertical boot positions are mandatory.
Input images: Image 1 (unit_rocket_teal.png) is authoritative for exact character identity, adult body mass, armor/launcher geometry, scale, palette, lighting, occupancy, and pivot; pose may change only in the legs/minimal hip counter-motion. Images 2–4 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: exactly the same one adult teal Rocket Trooper; shoulder-fired launcher stays physically attached over the CANVAS-LEFT side, points straight north, and retains the restrained red warhead tip.
Style/medium: polished hand-painted game sprite matching Image 1 exactly; weathered gunmetal/taupe, restrained teal identification, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing north, centered square, fixed gameplay pivot and exact same visible scale/occupied height as Image 1, generous transparent padding.
Pose lock: canvas-left boot HIGH/NORTH; canvas-right boot LOW/SOUTH. Do not mirror the soldier. Keep head, shoulders, torso, arms, asymmetrical launcher, tube direction, colors, lighting, and camera locked. No body translation, turn, tilt, bob, or scale change.
Constraints: one isolated subject; anatomically plausible gait; true alpha; launcher attached/intact; clean antialiased silhouette.
Avoid: canvas-left boot lower than canvas-right boot, repeated prior leg pose, whole-body mirror, chibi, spindly body, detached launcher, extra equipment/person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_walk5_red.png

- Selected generated original: G/exec-6597eb08-462b-494c-a1b6-b8dad53bbe23.png
- Submitted input images, in order: T/unit_rocket_walk5_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk5_red.png
- Production final: P/unit_rocket_walk5_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper walk frame 5/8 opposite-contact colorway silhouette-lock pass, unit_rocket_walk5_red.png
Input images: Image 1 is the approved normalized Expedition walk frame 5/8 opposite-contact Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are the approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry or composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior and interior alpha-boundary pixel; alpha-mask IoU at threshold 16 must exceed 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, walk frame 5/8 opposite-contact pose, shoulder launcher attachment/geometry/direction, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw any structure.
Background: genuine transparency exactly as Image 1, with no checkerboard, matte, ground, cast shadow, contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/width/length or limb change, altered launcher, red applied to neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### unit_rocket_walk6_teal.png

- Selected generated original: G/exec-a5880fbf-212c-4d98-9451-e1cd0c5cbcf0.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk5_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk6_teal.png
- Production final: P/unit_rocket_walk6_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 6 of 8, teal
Primary request: Create the next animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 6/8: RIGHT-SIDE COMPRESSION / DOWN POSITION. Continue from Image 2: the canvas-left foot remains planted forward/north after contact, the canvas-right leg trails back/south, both knees compress slightly, and the pelvis reaches the lowest anatomical gait point without translating on the canvas.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, canvas occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk5_teal.png) is the authoritative immediately preceding opposite-contact gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube physically attached over the canvas-left shoulder and pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal/taupe armor, restrained teal panels, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing north, centered 1:1 canvas, same visible height, mass, launcher scale, occupied area, and fixed pivot as Image 1, generous transparent safe padding.
Animation lock: change only the legs and minimum natural hip/arm counter-motion needed for RIGHT-SIDE COMPRESSION. Canvas-left foot stays the forward planted foot; canvas-right foot stays trailing. Hold head, upper body, armor, asymmetrical launcher, north direction, palette, and lighting stable. Compression is anatomical only: no canvas translation, turn, tilt, bob, scale pulse, redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached/intact; true alpha; clean antialiased silhouette.
Avoid: swapped/repeated wrong leg phase, chibi, spindly anatomy, detached launcher, extra equipment/person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_walk6_red.png

- Selected generated original: G/exec-46629d5a-7ed6-4e42-8125-3ac4a4ef16db.png
- Submitted input images, in order: T/unit_rocket_walk6_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk6_red.png
- Production final: P/unit_rocket_walk6_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper walk frame 6/8 opposite-side compression colorway silhouette-lock pass, unit_rocket_walk6_red.png
Input images: Image 1 is the approved normalized Expedition walk frame 6/8 opposite-side compression Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior/interior alpha boundary pixel; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, walk frame 6/8 opposite-side compression pose, shoulder launcher attachment/geometry/direction, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, internal metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw structure.
Background: genuine transparency exactly as Image 1; no checkerboard, matte, ground, cast/contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered launcher, red on neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### unit_rocket_walk7_teal.png

- Selected generated original: G/exec-1ebfa913-b612-4b79-9890-e13691ac7f7a.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk6_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk7_teal.png
- Production final: P/unit_rocket_walk7_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 7 of 8, teal
Primary request: Create the next animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 7/8: RIGHT FOOT PLANTED / LEFT FOOT PASSING. Continue the opposite half-cycle from Image 2: the support leg is planted under and slightly north of the body while the other foot lifts and passes beside it toward north; the legs overlap more tightly than in contact frames and the fixed central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk6_teal.png) is the authoritative immediately preceding gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher physically attached over the canvas-left shoulder, pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal/taupe, restrained teal panels, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing north, centered square, same visible height, mass, launcher scale, occupied area, and fixed pivot as Image 1, generous transparent safe padding.
Animation lock: change only legs and minimum natural hip/arm counter-motion for RIGHT PLANTED / LEFT PASSING; hold head, torso, armor, asymmetrical shoulder launcher, tube direction, palette, and lighting stable. No translation, turn, tilt, bob, scale pulse, redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached/intact; true alpha; clean antialiased silhouette.
Avoid: contact-pose leg spread, wrong/repeated phase, chibi, spindly anatomy, detached launcher, extra equipment/person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_walk7_red.png

- Selected generated original: G/exec-215b05ad-2635-4ac8-9d8c-68948f85700d.png
- Submitted input images, in order: T/unit_rocket_walk7_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk7_red.png
- Production final: P/unit_rocket_walk7_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper walk frame 7/8 right-planted left-passing colorway silhouette-lock pass, unit_rocket_walk7_red.png
Input images: Image 1 is the approved normalized Expedition walk frame 7/8 right-planted left-passing Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior/interior alpha boundary pixel; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, walk frame 7/8 right-planted left-passing pose, shoulder launcher attachment/geometry/direction, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, internal metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw structure.
Background: genuine transparency exactly as Image 1; no checkerboard, matte, ground, cast/contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered launcher, red on neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### unit_rocket_walk8_teal.png

- Selected generated original: G/exec-fcddb3aa-2c25-46c5-abf0-b58a3603baf4.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk7_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk8_teal.png
- Production final: P/unit_rocket_walk8_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 8 of 8, teal
Primary request: Create the final loop-ready animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 8/8: HIGH POINT / LEFT FOOT ADVANCING. Continue from Image 2: the current support leg raises the pelvis slightly while the opposite knee and foot advance forward/north in the air, preparing to flow seamlessly into frame 1 left-contact; the fixed central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk7_teal.png) is the authoritative immediately preceding gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher physically attached over the canvas-left shoulder, pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal/taupe, restrained teal panels, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing north, centered square, same visible height, mass, launcher scale, occupied area, and fixed pivot as Image 1, generous transparent safe padding.
Animation lock: change only legs and minimum natural hip/arm counter-motion for HIGH / LEFT ADVANCING; hold head, torso, armor, asymmetrical shoulder launcher, tube direction, palette, and lighting stable. The pose must lead naturally into frame 1 without a translation, turn, tilt, bob, scale pulse, redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached/intact; true alpha; clean antialiased silhouette.
Avoid: wrong/repeated gait phase, contact stance, chibi, spindly anatomy, detached launcher, extra equipment/person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_walk8_red.png

- Selected generated original: G/exec-65e98240-c322-457c-adfa-697540a43b18.png
- Submitted input images, in order: T/unit_rocket_walk8_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_walk8_red.png
- Production final: P/unit_rocket_walk8_red.png

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper walk frame 8/8 high-point left-advancing colorway silhouette-lock pass, unit_rocket_walk8_red.png
Input images: Image 1 is the approved normalized Expedition walk frame 8/8 high-point left-advancing Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior/interior alpha boundary pixel; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, walk frame 8/8 high-point left-advancing pose, shoulder launcher attachment/geometry/direction, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, internal metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw structure.
Background: genuine transparency exactly as Image 1; no checkerboard, matte, ground, cast/contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered launcher, red on neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### unit_rocket_death1_teal.png

- Selected generated original: G/exec-91b81194-6967-4d51-8098-4fcc7229fed4.png
- Submitted input images, in order: T/unit_rocket_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death1_teal.png
- Production final: P/unit_rocket_death1_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry death animation sprite, Rocket Trooper death frame 1 of 4, teal
Primary request: Create the first death-animation pose of the exact Rocket Trooper established by Image 1: INITIAL HIT / STAGGER, still mostly upright. The soldier recoils slightly from a hit, one knee softens and the torso shifts minimally off balance, but the fall has only just begun. No gore.
Input images: Image 1 (unit_rocket_teal.png) is authoritative for exact character identity, adult body mass, armor geometry, launcher dimensions, scale, canvas occupancy, faction palette, lighting, and central pivot. Images 2–4 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; shoulder-fired launcher remains unmistakable, physically strapped/carried, intact, and generally north-aligned with restrained red warhead tip.
Style/medium: polished hand-painted game sprite matching Image 1 exactly: weathered gunmetal/taupe armor, restrained teal identification, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing generally north, centered square, same visible scale and fixed gameplay pivot as Image 1, generous transparent safe padding sized for later broader fall poses.
Animation lock: frame 1 is mostly upright and clearly earlier than kneeling/falling/prone frames. Change only balance, one softened knee, and minimal recoil. Preserve head, armor, shoulder launcher, materials, palette, and lighting. No translation, scale pulse, camera change, explosion, dismemberment, or detached equipment.
Constraints: exactly one isolated subject; launcher remains attached and intact; no gore; true alpha; clean antialiased silhouette.
Avoid: already kneeling, already sideways, already prone, missing/detached launcher or warhead, blood, wounds, chibi, spindly anatomy, extra person/equipment, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_death1_red.png

- Selected generated original: G/exec-39fcfa72-b54b-4f0a-9021-f22df43a8e72.png
- Submitted input images, in order: T/unit_rocket_death1_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death1_red.png
- Production final: P/unit_rocket_death1_red.png

~~~text
Use case: precise-object-edit
Asset type: exact color-only edit, unit_rocket_death1_teal.png to unit_rocket_death1_red.png
Primary request: preserve Image 1 exactly; replace only teal armor paint with muted weathered Rubicon red.
Input images: Image 1 is sole authoritative normalized edit target. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png material references only; ignore their shapes.
Keep exact: initial-hit mostly-upright stagger, limb positions, intact launcher, normalized bbox x=66..189 y=14..241, exterior alpha contour, scale, pivot, padding, strict overhead orientation, every neutral color/detail/light. True transparency. Exterior IoU target >0.96.
No redraw, pose change, widening, translation, rotation, scale, crop, mirror, detached gear, gore, new/removed detail, neutral recolor, ground, shadow, halo, scenery, text, logo, perspective, sprite sheet.
~~~

### unit_rocket_death2_teal.png

- Selected generated original: G/exec-55cc6dd2-1f19-4c3c-9c37-c8eab1096ddc.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_death1_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death2_teal.png
- Production final: P/unit_rocket_death2_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry death animation sprite, Rocket Trooper death frame 2 of 4, teal
Primary request: Create the second death-animation pose of the exact Rocket Trooper established by Image 1, continuing directly from Image 2: KNEES BUCKLING / BALANCE BREAKING. The soldier sinks onto or toward both knees, torso pitches and twists modestly off balance, and one arm braces instinctively; this is clearly farther into collapse than frame 1 but not yet a full sideways fall. No gore.
Input images: Image 1 (unit_rocket_teal.png) is authoritative for exact identity, adult body mass, armor/launcher geometry, scale, palette, lighting, and central pivot. Image 2 (unit_rocket_death1_teal.png) is the authoritative immediately preceding stagger pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; shoulder-fired launcher remains unmistakable, physically strapped/carried, intact, and falling together with the body; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2: weathered gunmetal/taupe, restrained teal identification, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, centered square, exact same character scale, body mass, and gameplay pivot as Image 1, generous transparent padding for the widening fall.
Animation progression: frame 2 must read as knees/balance breaking—lower and less stable than Image 2, yet still narrower/more upright than a sideways fallen frame. Keep launcher attached to shoulder harness and moving with torso. Preserve identity, materials, palette, lighting, and camera. No translation, scale pulse, explosion, dismemberment, or detached gear.
Constraints: exactly one isolated subject; intact attached launcher; no gore; true alpha; clean antialiased silhouette.
Avoid: simple walking pose, fully upright, fully sideways, fully prone, detached launcher/warhead, blood/wounds, chibi, spindly anatomy, extra person/equipment, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### unit_rocket_death2_red.png

- Selected generated original: G/exec-0e112e4e-b0c6-4da6-96d0-8391415bcc49.png
- Submitted input images, in order: T/unit_rocket_death2_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death2_red.png
- Production final: P/unit_rocket_death2_red.png

~~~text
Use case: precise-object-edit
Asset type: exact color-only edit of unit_rocket_death2_teal.png into unit_rocket_death2_red.png
Primary request: Keep Image 1's drawing and alpha silhouette exactly. Change ONLY the teal-blue paint to muted weathered Rubicon red. Make no other edit.
Input images: Image 1 is the sole authoritative normalized edit target. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png, supplied only because they define Broodfall material restraint; ignore their shapes and composition.
Keep exactly: every boundary and transparent cutout; kneeling/buckling pose; extended bracing hand; feet and knees; helmet and shoulders; shoulder launcher and warhead; x/y extent, center, scale, lighting, scratches, gunmetal, taupe, off-white, yellow and amber details. Do not redraw or reinterpret.
Output: one isolated strict 90-degree overhead RGBA sprite, same 256-square composition after normalization, true transparent background. Exterior alpha silhouette must match Image 1 above 0.96 IoU.
Do not: move, rotate, resize, widen, narrow, straighten, mirror, crop, add, remove, sharpen, restyle, detach, recolor neutrals, add ground/shadow/halo/glow/scenery/text/logo/border, change camera, make a sprite sheet.
~~~

### unit_rocket_death3_teal.png

- Selected generated original: G/exec-4ad05ad1-4aa1-42ba-a844-c7be839e9028.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_death2_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death3_teal.png
- Production final: P/unit_rocket_death3_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry death animation sprite, Rocket Trooper death frame 3 of 4, teal
Primary request: Create the third death-animation pose of the exact Rocket Trooper established by Image 1, continuing directly from Image 2: SIDEWAYS/BACK FALL. The knees have given way and the whole soldier is now tipping/falling onto the canvas-right side and slightly backward, torso and attached launcher rotating down together into a clearly broader, lower footprint. This is a transitional fall—more horizontal than frame 2, not yet fully settled/prone. No gore.
Input images: Image 1 (unit_rocket_teal.png) is authoritative for exact identity, adult body mass, armor/launcher geometry, scale, palette, lighting, and pivot. Image 2 (unit_rocket_death2_teal.png) is the authoritative immediately preceding kneeling/balance-breaking pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; shoulder-fired launcher stays unmistakable, physically strapped to/carried with the body, intact, with red warhead tip; arms and legs fall naturally with the torso.
Style/medium: polished hand-painted game sprite matching Images 1–2: weathered gunmetal/taupe, restrained teal identification, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead camera remains fixed; character falls within the canvas, centered around the same gameplay pivot; preserve exact body/launcher scale rather than enlarging to fill; broaden silhouette laterally with at least 14px transparent safe padding.
Animation progression: frame 3 must clearly bridge kneeling frame 2 and fully prone frame 4: torso diagonal/sideways, one shoulder near the ground, legs folding/spreading naturally, attached launcher rotating with the harness and resting partially against body. Preserve identity, materials, palette, lighting, and camera. No explosion, dismemberment, detached gear, translation, or scale pulse.
Constraints: exactly one isolated subject; intact attached launcher; no gore; true alpha; clean antialiased silhouette.
Avoid: upright/walking/kneeling-only pose, fully settled prone pose, still-north-vertical standing silhouette, detached launcher/warhead, blood/wounds, chibi, spindly anatomy, extra person/equipment, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective camera, sprite sheet, multiple poses.
~~~

### unit_rocket_death3_red.png

- Selected generated original: G/exec-afdd1cf4-b977-4822-9d7b-d11ba8486f3c.png
- Submitted input images, in order: T/unit_rocket_death3_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death3_red.png
- Production final: P/unit_rocket_death3_red.png

~~~text
Use case: precise-object-edit
Asset type: exact color-only edit of unit_rocket_death3_teal.png into unit_rocket_death3_red.png
Primary request: Keep Image 1's drawing, broad sideways-fall pose, and alpha silhouette exactly. Change ONLY teal-blue armor paint to muted weathered Rubicon red. Make no other edit.
Input images: Image 1 is the sole authoritative normalized edit target. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png, only for Broodfall material restraint; ignore their shapes/composition.
Keep exactly: every outer boundary and transparent cutout; transitional sideways/back fall angle; splayed legs; bracing hand; helmet/shoulders; intact launcher lying diagonally across the body with warhead; normalized bbox x=14..241 y=38..217; center, scale, lighting, scratches, gunmetal, taupe, off-white, yellow, amber. No redraw/reinterpretation.
Output: one isolated strict 90-degree overhead RGBA sprite, same composition and true transparent background. Exterior alpha silhouette must match Image 1 above 0.96 IoU.
Do not: move, rotate, resize, widen/narrow, straighten, mirror, crop, add/remove, sharpen, restyle, detach, recolor neutrals, add ground/shadow/halo/glow/scenery/text/logo/border, perspective, sprite sheet, extra pose.
~~~

### unit_rocket_death4_teal.png

- Selected generated original: G/exec-47bfd0c3-f627-4c32-8b68-32e6049be972.png
- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_death3_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death4_teal.png
- Production final: P/unit_rocket_death4_teal.png

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry death animation sprite, Rocket Trooper death frame 4 of 4, teal
Primary request: Create the final death-animation pose of the exact Rocket Trooper established by Image 1, continuing directly from Image 2: FULLY PRONE / STILL. The soldier has completed the fall and lies motionless on the canvas-right side/back in a settled low profile. Legs and arms rest naturally; the intact shoulder-fired launcher remains physically strapped to and resting across/alongside the body, with restrained red warhead tip still attached. No gore.
Input images: Image 1 (unit_rocket_teal.png) is authoritative for exact identity, adult body mass, armor/launcher geometry, production scale, palette, and lighting. Image 2 (unit_rocket_death3_teal.png) is the authoritative immediately preceding broad transitional fall pose, fall direction, and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only, now fully prone and still; all limbs anatomically plausible; launcher attached/intact and resting with the body rather than floating or separating.
Style/medium: polished hand-painted game sprite matching Images 1–2: weathered gunmetal/taupe, restrained teal identification, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead camera fixed; low broad horizontal/diagonal corpse silhouette centered around the same gameplay pivot; preserve exact body/launcher scale from Image 2 rather than enlarging to fill; at least 14px transparent safe padding.
Animation progression: clearly more settled, lower, and still than Image 2; reduce bracing/tension, place extended hand and limbs at rest, allow launcher to lie supported by torso/groundless pose while remaining harness-attached. Preserve identity, materials, palette, lighting, and camera. No explosion, dismemberment, detached gear, scale pulse, or ground element.
Constraints: exactly one isolated subject; intact attached launcher; no gore; true alpha; clean antialiased silhouette.
Avoid: upright/kneeling/active bracing pose, duplicate of frame 3, standing north-vertical silhouette, floating/detached launcher or warhead, blood/wounds, chibi, spindly anatomy, extra person/equipment, scenery, terrain, ground patch, cast shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective camera, sprite sheet, multiple poses.
~~~

### unit_rocket_death4_red.png

- Selected generated original: G/exec-64f214f5-1c97-4891-85a1-39c30163b942.png
- Submitted input images, in order: T/unit_rocket_death4_teal.png; R1; R2; R3
- Normalized staging final: T/unit_rocket_death4_red.png
- Production final: P/unit_rocket_death4_red.png

~~~text
Use case: precise-object-edit
Asset type: exact color-only edit of unit_rocket_death4_teal.png into unit_rocket_death4_red.png
Primary request: Keep Image 1's drawing, fully prone still pose, and alpha silhouette exactly. Change ONLY teal-blue armor paint to muted weathered Rubicon red. Make no other edit.
Input images: Image 1 is the sole authoritative normalized edit target. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png, only for Broodfall material restraint; ignore their shapes/composition.
Keep exactly: every outer boundary and transparent cutout; fully settled horizontal corpse angle; splayed legs and outstretched arm; helmet/shoulders; intact launcher resting across the body and warhead; normalized bbox x=14..241 y=67..188; center, scale, lighting, scratches, gunmetal, taupe, off-white, yellow, amber. No redraw/reinterpretation.
Output: one isolated strict 90-degree overhead RGBA sprite, same low horizontal composition and true transparent background. Exterior alpha silhouette must match Image 1 above 0.96 IoU.
Do not: add a backdrop or lighting vignette; move, rotate, resize, widen/narrow, straighten, mirror, crop, add/remove, sharpen, restyle, detach, recolor neutrals, add ground/shadow/halo/glow/scenery/text/logo/border, perspective, sprite sheet, extra pose.
~~~

## Rejected drafts

Metrics are `raw alpha IoU / border-connected-hole-filled exterior-silhouette IoU; opaque fraction` after proportional normalization. These drafts were never installed as selected production finals.

| Intended asset | Rejected generated original | Submitted input images, in order | Metrics | Rejection reason |
|---|---|---|---|---|
| unit_rocket_walk5_teal.png | G/exec-f4cc25ea-fb3d-46a5-9f1f-154cff59fe5e.png | T/unit_rocket_teal.png; T/unit_rocket_walk4_teal.png; R1; R2; R3 | .67993 / .67988; .90864 | Repeated prior leg phase; inadequate alternate-contact pose. IoU shown versus selected walk5. |
| unit_rocket_walk5_teal.png | G/exec-275a5db2-24f0-4813-8217-ea92a3bd4f56.png | T/unit_rocket_walk1_teal.png; T/unit_rocket_teal.png; R1; R2; R3 | .68055 / .68057; .91125 | Repeated prior leg phase. IoU shown versus selected walk5. |
| unit_rocket_red.png | G/exec-073ec277-7efe-4bf3-ac69-c2f10542a901.png | T/unit_rocket_teal.png; R1; R2; R3 | .81807 / .95861; .52203 | Internal-alpha mismatch and severe translucent ghosting. |
| unit_rocket_red.png | G/exec-e08ebe9e-3420-4fa7-8079-f7c66375f280.png | T/unit_rocket_teal.png; normalized draft from G/exec-073ec277-7efe-4bf3-ac69-c2f10542a901.png; R1; R2; R3 | .83867 / .94208; .50459 | Exterior mismatch and severe translucent ghosting. |
| unit_rocket_red.png | G/exec-e5b34f1c-0963-4637-832b-d6b2ba6a3bdc.png | T/unit_rocket_teal.png; R1; R2; R3 | .83709 / .97759; .51528 | Exterior passed, but opacity ghost failed. |
| unit_rocket_walk1_red.png | G/exec-ed410195-a12c-43de-aa0b-943db45c623b.png | T/unit_rocket_walk1_teal.png; R1; R2; R3 | .79629 / .92885; .49036 | Exterior failure and translucent ghost. |
| unit_rocket_walk1_red.png | G/exec-07067cb4-4725-49bd-adf7-ebee7545f685.png | T/unit_rocket_walk1_teal.png; normalized draft from G/exec-ed410195-a12c-43de-aa0b-943db45c623b.png; R1; R2; R3 | .79722 / .92834; .41762 | Exterior failure and translucent ghost; later used only as color-direction input. |
| unit_rocket_walk2_red.png | G/exec-07108d68-fffa-4343-9b4a-8e73629235ff.png | T/unit_rocket_walk2_teal.png; R1; R2; R3 | .94563 / .94545; .87074 | Exterior below .95; later used only as color-direction input. |
| unit_rocket_walk3_red.png | G/exec-e22c1a2a-9e37-4bbb-9ada-f5c524bc85d1.png | T/unit_rocket_walk3_teal.png; R1; R2; R3 | .75988 / .95093; .45119 | Barely acceptable exterior but severe opacity/internal-alpha failure; later used only as color-direction input. |
| unit_rocket_walk4_red.png | G/exec-df276239-002b-4824-b5f7-b36f894dd728.png | T/unit_rocket_walk4_teal.png; R1; R2; R3 | .78621 / .92981; .51860 | Exterior failure and translucent ghost. |
| unit_rocket_walk4_red.png | G/exec-98e92275-7944-4b7d-8b45-7321a1d2e93c.png | T/unit_rocket_walk4_teal.png; normalized draft from G/exec-df276239-002b-4824-b5f7-b36f894dd728.png; R1; R2; R3 | .95472 / .95465; .91240 | Exterior only in review band; selected retry improved geometry. |
| unit_rocket_walk4_red.png | G/exec-63af8c8a-c8a7-4854-945c-61e1ea0a002e.png | T/unit_rocket_walk4_teal.png; normalized draft from G/exec-98e92275-7944-4b7d-8b45-7321a1d2e93c.png; R1; R2; R3 | .94172 / .94139; .88952 | Exterior below .95. |
| unit_rocket_walk4_red.png | G/exec-e6fc67cd-280e-4c84-a491-67ae788b338a.png | T/unit_rocket_walk4_teal.png; R1; R2; R3 | .78121 / .95844; .52357 | Exterior passed, but opacity/internal-alpha ghost failed. |
| unit_rocket_death1_red.png | G/exec-8849757e-5182-4158-80a4-b81d8f17ca29.png | T/unit_rocket_death1_teal.png; R1; R2; R3 | .95516 / .95516; .92460 | Exterior remained in review band; selected retry improved to .96630. |
| unit_rocket_death1_red.png | G/exec-3bb77bea-0e8c-492c-acf8-efc37b530bba.png | T/unit_rocket_death1_teal.png; normalized draft from G/exec-8849757e-5182-4158-80a4-b81d8f17ca29.png; R1; R2; R3 | .92913 / .92918; .86890 | Exterior below .95. |
| unit_rocket_death2_red.png | G/exec-e854f5b4-9538-4fa1-af88-fda78ea7c85d.png | T/unit_rocket_death2_teal.png; R1; R2; R3 | .74508 / .93776; .49979 | Raw and exterior failures plus translucent ghost. |
| unit_rocket_death2_red.png | G/exec-e1791250-9aec-4062-86e8-8b27e5dd3d04.png | T/unit_rocket_death2_teal.png; normalized draft from G/exec-e854f5b4-9538-4fa1-af88-fda78ea7c85d.png; R1; R2; R3 | .44491 / .45093; .90930 | Major pose/geometry drift. |
| unit_rocket_death2_red.png | G/exec-167aa136-92be-4f4d-9499-6a00b89e8e68.png | T/unit_rocket_death2_teal.png; R1; R2; R3 | .73844 / .93426; .45698 | Raw/exterior failures and translucent ghost. |
| unit_rocket_death3_red.png | G/exec-0bee9b13-b67b-4898-b505-9a3cfeb80895.png | T/unit_rocket_death3_teal.png; R1; R2; R3 | .94698 / .94705; .86486 | Exterior narrowly below .95. |
| unit_rocket_death3_red.png | G/exec-7689ce9a-b7e6-4dc2-86d6-501349e0f18f.png | T/unit_rocket_death3_teal.png; normalized draft from G/exec-0bee9b13-b67b-4898-b505-9a3cfeb80895.png; R1; R2; R3 | .93629 / .93648; .89142 | Exterior below .95. |
| unit_rocket_death4_red.png | G/exec-c25e4ebf-a3ea-42ea-ae07-c4b7608ceb84.png | T/unit_rocket_death4_teal.png; R1; R2; R3 | .76265 / .92148; .41454 | Exterior failure and severe translucent ghost. |
| unit_rocket_death4_red.png | G/exec-8869a11b-fc19-450a-bd5f-80ceece53b87.png | T/unit_rocket_death4_teal.png; normalized draft from G/exec-c25e4ebf-a3ea-42ea-ae07-c4b7608ceb84.png; R1; R2; R3 | .94352 / .94391; .83391 | Opaque dramatic backdrop/perspective drift; visually invalid and exterior below .95. |

## Exact rejected-draft prompts

### exec-f4cc25ea-fb3d-46a5-9f1f-154cff59fe5e.png — rejected for unit_rocket_walk5_teal.png

- Submitted input images, in order: T/unit_rocket_teal.png; T/unit_rocket_walk4_teal.png; R1; R2; R3
- Rejection: Repeated prior leg phase; inadequate alternate-contact pose. IoU shown versus selected walk5.

~~~text
Use case: identity-preserve
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 5 of 8, teal
Primary request: Create a new animation pose of the exact Rocket Trooper established by Image 1. This is gait phase 5/8: RIGHT-FOOT CONTACT, the exact opposite of frame 1. The right foot is forward/north at first ground contact and the left foot is back/south; the pose must read clearly from directly overhead while the central body pivot does not translate.
Input images: Image 1 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity, armor geometry, body mass, launcher dimensions, scale, canvas occupancy, palette, lighting, and pivot reference. Image 2 (unit_rocket_walk4_teal.png) is the authoritative immediately preceding gait pose and continuity reference. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube physically attached/carried over the shoulder and pointing straight north; restrained red warhead tip remains.
Style/medium: polished hand-painted game sprite matching Images 1–2 exactly: weathered gunmetal and taupe armor, restrained teal faction panels, off-white technical trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Animation lock: change only the legs and minimum natural hip/arm counter-motion needed for RIGHT CONTACT; hold upper body, head, armor, shoulder tube, tube direction, and lighting stable. Make leg phasing visibly opposite frame 1 without mirroring or moving the asymmetric shoulder launcher. No body translation, turn, tilt, bob, scale pulse, silhouette redesign, or camera change.
Constraints: exactly one isolated subject; exact identity continuity; launcher attached and intact; true alpha transparency; clean antialiased silhouette.
Avoid: chibi, spindly anatomy, detached launcher or warhead, extra equipment, extra person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, isometric or three-quarter view, sprite sheet, multiple poses.
~~~

### exec-275a5db2-24f0-4813-8217-ea92a3bd4f56.png — rejected for unit_rocket_walk5_teal.png

- Submitted input images, in order: T/unit_rocket_walk1_teal.png; T/unit_rocket_teal.png; R1; R2; R3
- Rejection: Repeated prior leg phase. IoU shown versus selected walk5.

~~~text
Use case: precise-object-edit
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 5 of 8, teal — corrected opposite-contact take
Primary request: Starting from the exact Rocket Trooper in Image 1, change only the legs into the opposite contact pose for gait phase 5/8. The boot on the LEFT SIDE OF THE CANVAS must be visibly forward/north (higher on the canvas) at first ground contact. The boot on the RIGHT SIDE OF THE CANVAS must be visibly back/south (lower on the canvas). This must be the clear leg-phase opposite of Image 1; do not mirror the whole soldier.
Input images: Image 1 (unit_rocket_walk1_teal.png) is the authoritative character, rendering, scale, pivot, and first-contact pose whose leg positions must be swapped only. Image 2 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity and armor/launcher geometry. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube remains physically attached over the CANVAS-LEFT shoulder and points straight north; restrained red warhead tip remains.
Style/medium: match Images 1–2 exactly: polished hand-painted weathered gunmetal/taupe armor, restrained teal panels, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, exact same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Edit invariants: CHANGE ONLY LEG PHASING plus the minimum natural hip counter-motion. Canvas-left boot high/north; canvas-right boot low/south. Keep every upper-body pixel relationship conceptually locked: do not mirror, relocate, shorten, lengthen, rotate, or redesign the launcher, head, shoulders, arms, torso, armor panels, palette, lighting, or camera. No translation, bob, turn, tilt, or scale pulse.
Constraints: exactly one isolated subject; launcher attached/intact/north-aligned; true alpha; clean antialiased silhouette.
Avoid: repeating Image 1 leg positions, mirrored whole body, chibi, spindly anatomy, detached launcher, extra equipment/person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### exec-073ec277-7efe-4bf3-ac69-c2f10542a901.png — rejected for unit_rocket_red.png

- Submitted input images, in order: T/unit_rocket_teal.png; R1; R2; R3
- Rejection: Internal-alpha mismatch and severe translucent ghosting.

~~~text
Use case: precise-object-edit
Asset type: single production RTS infantry sprite faction variant, unit_rocket_red.png
Primary request: Create the Rubicon red counterpart of Image 1 (Rocket Trooper static idle) by changing ONLY restrained teal faction-identification surfaces to restrained Rubicon red. This is a precise faction-color edit, not a redraw.
Input images: Image 1 is the authoritative normalized teal production sprite and absolute source of truth for character identity, geometry, pose, shoulder-launcher shape and attachment, red warhead tip, scale, canvas occupancy, fixed pivot, lighting, weathering, alpha silhouette, and every non-faction color. Images 2–4 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are secondary authoritative references for Broodfall's grounded materials, restrained accent coverage, weathering, and strict overhead rendering; do not copy their geometry and do not recolor Image 1 toward teal.
Edit: replace only the teal-painted armor panels and tiny teal faction markings on Image 1 with a restrained dark Rubicon red of comparable value/saturation and identical wear. Preserve gunmetal, taupe, off-white trim, universal hazard-yellow service marks, amber micro-lights, black details, and the existing restrained red warhead tip exactly.
Composition/framing: preserve Image 1 pixel-for-pixel conceptually in strict 90-degree orthographic overhead projection; same orientation, body/limb pose, launcher direction, footprint, occupied-area scale, center pivot, safe padding, and transparent canvas.
Invariants: no geometry or pose change; no anatomy, launcher, armor, material, detail, lighting, edge, alpha, or scale drift; no mirroring, translation, rotation, crop, redraw, added symbols, or removed details. Keep true alpha transparency and the exact isolated silhouette.
Avoid: broad red wash, recoloring taupe/gunmetal/off-white/hazard yellow/amber/warhead, brighter candy red, new markings, detached equipment, extra objects, ground, shadow, halo, glow, scenery, text, logo, watermark, perspective change, sprite sheet, multiple poses.
~~~

### exec-e08ebe9e-3420-4fa7-8079-f7c66375f280.png — rejected for unit_rocket_red.png

- Submitted input images, in order: T/unit_rocket_teal.png; normalized draft from G/exec-073ec277-7efe-4bf3-ac69-c2f10542a901.png; R1; R2; R3
- Rejection: Exterior mismatch and severe translucent ghosting.

~~~text
Use case: precise-object-edit
Asset type: single production RTS infantry sprite faction recolor, unit_rocket_red.png — geometry-lock correction
Primary request: EDIT IMAGE 1 IN PLACE. Recolor ONLY its teal-painted faction panels to restrained dark Rubicon red. Do not redraw, reinterpret, simplify, sharpen, move, resize, or regenerate the soldier. The output silhouette at alpha threshold 16 must overlap Image 1 by at least 96%.
Input images: Image 1 (normalized unit_rocket_teal.png) is the absolute authoritative edit target for every pixel relationship: exact silhouette, alpha edge, holes, pose, anatomy, launcher, armor, scale, center, padding, lighting, texture, and all non-teal colors. Image 2 is a rejected red color-direction draft only; borrow its restrained dark-red hue, but NOT its altered geometry, silhouette, pose, proportions, edges, or details. Images 3–5 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are secondary material/style references only.
Required edit: preserve Image 1 exactly and replace only restrained teal faction-identification paint with restrained dark Rubicon red at comparable value/saturation, carrying across the exact same chips and wear. Keep taupe, gunmetal, off-white trim, black, hazard yellow, amber micro-lights, and the existing universal red warhead tip unchanged.
Absolute invariants: strict 90° overhead orientation; exact launcher attachment/shape/direction; exact body and limb pose; exact canvas occupancy and pivot; exact transparent alpha footprint and antialiasing; exact safe padding. No changes outside teal-painted pixels. One isolated sprite on true transparency.
Avoid: any redraw or geometry drift, altered alpha edge, moved pixels, broad red wash, recolored neutral materials or warhead, new detail, removed detail, extra object, ground, shadow, halo, glow, scenery, text, logo, watermark, perspective change, sprite sheet.
~~~

### exec-e5b34f1c-0963-4637-832b-d6b2ba6a3bdc.png — rejected for unit_rocket_red.png

- Submitted input images, in order: T/unit_rocket_teal.png; R1; R2; R3
- Rejection: Exterior passed, but opacity ghost failed.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper colorway silhouette-lock retry, unit_rocket_red.png
Input images: Image 1 is the approved normalized Expedition Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are the approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmark references; retain their grounded material discipline and restrained accent density only, but make no geometry or composition changes from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on the helmet stripe, shoulder/forearm plates, and knee accents with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior and interior alpha boundary pixel; alpha-mask IoU at threshold 16 must exceed 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, pose, shoulder launcher, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw any structure.
Background: genuine transparency exactly as Image 1, with no checkerboard, matte, ground, cast shadow, contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/width/length or limb change, altered launcher, red applied to neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### exec-ed410195-a12c-43de-aa0b-943db45c623b.png — rejected for unit_rocket_walk1_red.png

- Submitted input images, in order: T/unit_rocket_walk1_teal.png; R1; R2; R3
- Rejection: Exterior failure and translucent ghost.

~~~text
Use case: precise-object-edit
Asset type: single production RTS infantry sprite faction variant, unit_rocket_walk1_red.png
Primary request: Create the Rubicon red counterpart of Image 1 (Rocket Trooper walk frame 1/8 left-contact) by changing ONLY restrained teal faction-identification surfaces to restrained Rubicon red. This is a precise faction-color edit, not a redraw.
Input images: Image 1 is the authoritative normalized teal production sprite and absolute source of truth for character identity, geometry, pose, shoulder-launcher shape and attachment, red warhead tip, scale, canvas occupancy, fixed pivot, lighting, weathering, alpha silhouette, and every non-faction color. Images 2–4 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are secondary authoritative references for Broodfall's grounded materials, restrained accent coverage, weathering, and strict overhead rendering; do not copy their geometry and do not recolor Image 1 toward teal.
Edit: replace only the teal-painted armor panels and tiny teal faction markings on Image 1 with a restrained dark Rubicon red of comparable value/saturation and identical wear. Preserve gunmetal, taupe, off-white trim, universal hazard-yellow service marks, amber micro-lights, black details, and the existing restrained red warhead tip exactly.
Composition/framing: preserve Image 1 pixel-for-pixel conceptually in strict 90-degree orthographic overhead projection; same orientation, body/limb pose, launcher direction, footprint, occupied-area scale, center pivot, safe padding, and transparent canvas.
Invariants: no geometry or pose change; no anatomy, launcher, armor, material, detail, lighting, edge, alpha, or scale drift; no mirroring, translation, rotation, crop, redraw, added symbols, or removed details. Keep true alpha transparency and the exact isolated silhouette.
Avoid: broad red wash, recoloring taupe/gunmetal/off-white/hazard yellow/amber/warhead, brighter candy red, new markings, detached equipment, extra objects, ground, shadow, halo, glow, scenery, text, logo, watermark, perspective change, sprite sheet, multiple poses.
~~~

### exec-07067cb4-4725-49bd-adf7-ebee7545f685.png — rejected for unit_rocket_walk1_red.png

- Submitted input images, in order: T/unit_rocket_walk1_teal.png; normalized draft from G/exec-ed410195-a12c-43de-aa0b-943db45c623b.png; R1; R2; R3
- Rejection: Exterior failure and translucent ghost; later used only as color-direction input.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 1/8 left-contact sprite, unit_rocket_walk1_red.png, exterior-silhouette correction
Primary request: EDIT IMAGE 1 IN PLACE. Recolor only its teal faction paint to restrained dark Rubicon oxide-red. Do not redraw or change the gait pose. The border-connected-hole-filled exterior silhouette at alpha threshold 16 must overlap Image 1 by at least 0.96.
Input images: Image 1 is the authoritative normalized teal production walk frame 1/8 left-contact and absolute source of truth for exterior geometry, pose, anatomy, launcher, scale, pivot, padding, lighting, texture, alpha edge, and all non-teal colors. Image 2 is a rejected red draft: use only its restrained red hue; ignore its altered edges/geometry/details. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png secondary material/style benchmarks only.
Required edit: preserve Image 1 and replace only teal-painted helmet/armor identification panels with dark weathered Rubicon red of the same value and wear. Preserve taupe, gunmetal, off-white, black, hazard yellow, amber lights, and universal red warhead tip.
Absolute invariants: exact strict-overhead north-facing walk frame 1/8 left-contact pose; exact launcher shape/attachment/direction; exact body and limb positions; exact outer boundary, occupied scale, center pivot, safe padding, internal materials, and camera. No mirroring, translation, rotation, bob, crop, or scale change. One isolated sprite on genuine transparency.
Avoid: regenerated soldier, changed leg phase, geometry drift, altered launcher, broad red wash, red on neutral materials, new/removed detail, ground, shadow, halo, glow, scenery, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### exec-07108d68-fffa-4343-9b4a-8e73629235ff.png — rejected for unit_rocket_walk2_red.png

- Submitted input images, in order: T/unit_rocket_walk2_teal.png; R1; R2; R3
- Rejection: Exterior below .95; later used only as color-direction input.

~~~text
Use case: precise-object-edit
Asset type: single production RTS infantry sprite faction variant, unit_rocket_walk2_red.png
Primary request: Create the Rubicon red counterpart of Image 1 (Rocket Trooper walk frame 2/8 left-compression) by changing ONLY restrained teal faction-identification surfaces to restrained Rubicon red. This is a precise faction-color edit, not a redraw.
Input images: Image 1 is the authoritative normalized teal production sprite and absolute source of truth for character identity, geometry, pose, shoulder-launcher shape and attachment, red warhead tip, scale, canvas occupancy, fixed pivot, lighting, weathering, alpha silhouette, and every non-faction color. Images 2–4 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are secondary authoritative references for Broodfall's grounded materials, restrained accent coverage, weathering, and strict overhead rendering; do not copy their geometry and do not recolor Image 1 toward teal.
Edit: replace only the teal-painted armor panels and tiny teal faction markings on Image 1 with a restrained dark Rubicon red of comparable value/saturation and identical wear. Preserve gunmetal, taupe, off-white trim, universal hazard-yellow service marks, amber micro-lights, black details, and the existing restrained red warhead tip exactly.
Composition/framing: preserve Image 1 pixel-for-pixel conceptually in strict 90-degree orthographic overhead projection; same orientation, body/limb pose, launcher direction, footprint, occupied-area scale, center pivot, safe padding, and transparent canvas.
Invariants: no geometry or pose change; no anatomy, launcher, armor, material, detail, lighting, edge, alpha, or scale drift; no mirroring, translation, rotation, crop, redraw, added symbols, or removed details. Keep true alpha transparency and the exact isolated silhouette.
Avoid: broad red wash, recoloring taupe/gunmetal/off-white/hazard yellow/amber/warhead, brighter candy red, new markings, detached equipment, extra objects, ground, shadow, halo, glow, scenery, text, logo, watermark, perspective change, sprite sheet, multiple poses.
~~~

### exec-e22c1a2a-9e37-4bbb-9ada-f5c524bc85d1.png — rejected for unit_rocket_walk3_red.png

- Submitted input images, in order: T/unit_rocket_walk3_teal.png; R1; R2; R3
- Rejection: Barely acceptable exterior but severe opacity/internal-alpha failure; later used only as color-direction input.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper walk frame 3/8 left-planted right-passing colorway silhouette-lock pass, unit_rocket_walk3_red.png
Input images: Image 1 is the approved normalized Expedition walk frame 3/8 left-planted right-passing Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are the approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry or composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior and interior alpha-boundary pixel; alpha-mask IoU at threshold 16 must exceed 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, walk frame 3/8 left-planted right-passing pose, shoulder launcher attachment/geometry/direction, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw any structure.
Background: genuine transparency exactly as Image 1, with no checkerboard, matte, ground, cast shadow, contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/width/length or limb change, altered launcher, red applied to neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### exec-df276239-002b-4824-b5f7-b36f894dd728.png — rejected for unit_rocket_walk4_red.png

- Submitted input images, in order: T/unit_rocket_walk4_teal.png; R1; R2; R3
- Rejection: Exterior failure and translucent ghost.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Rocket Trooper walk frame 4/8 high-point right-advancing colorway silhouette-lock pass, unit_rocket_walk4_red.png
Input images: Image 1 is the approved normalized Expedition walk frame 4/8 high-point right-advancing Rocket Trooper and exact geometry/alpha-mask edit target. Images 2–4 are the approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry or composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve the exact source alpha mask and every exterior and interior alpha-boundary pixel; alpha-mask IoU at threshold 16 must exceed 0.96. Preserve identical silhouette, transparent holes, framing, anatomy, walk frame 4/8 high-point right-advancing pose, shoulder launcher attachment/geometry/direction, equipment, footprint, scale, pivot, centering, padding, north orientation, strict 90-degree overhead camera, texture, dirt, scratches, highlights, metal shadows, hazard-yellow marks, amber lights, gunmetal, taupe, off-white, and black details. Do not redraw any structure.
Background: genuine transparency exactly as Image 1, with no checkerboard, matte, ground, cast shadow, contact shadow, outline, halo, text, logo, people, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/width/length or limb change, altered launcher, red applied to neutral armor, saturated red slabs, altered lighting, perspective change, sprite sheet, multiple poses.
~~~

### exec-98e92275-7944-4b7d-8b45-7321a1d2e93c.png — rejected for unit_rocket_walk4_red.png

- Submitted input images, in order: T/unit_rocket_walk4_teal.png; normalized draft from G/exec-df276239-002b-4824-b5f7-b36f894dd728.png; R1; R2; R3
- Rejection: Exterior only in review band; selected retry improved geometry.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 4/8 high-point right-advancing sprite, unit_rocket_walk4_red.png, exterior-silhouette correction
Primary request: EDIT IMAGE 1 IN PLACE. Recolor only teal faction paint to restrained dark Rubicon oxide-red. Do not redraw or change the gait pose. Border-connected-hole-filled exterior alpha silhouette at threshold 16 must overlap Image 1 by at least 0.96.
Input images: Image 1 is authoritative normalized teal walk frame 4/8 high-point right-advancing, absolute source for exterior geometry, gait pose, anatomy, launcher, scale, pivot, padding, lighting, texture, alpha edge, and non-teal colors. Image 2 is a rejected red draft: use only its red hue; ignore its geometry/details. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material/style benchmarks only.
Required edit: preserve Image 1 and replace only teal-painted identification panels with dark weathered Rubicon red of same value/wear. Preserve taupe, gunmetal, off-white, black, hazard yellow, amber, universal red warhead tip.
Absolute invariants: exact overhead north-facing walk frame 4/8 high-point right-advancing; exact launcher and limb positions; exact outer boundary, occupied scale, center pivot, padding, materials, camera. No mirror, translation, rotation, bob, crop, or scale change. One isolated sprite on genuine transparency.
Avoid: regenerated soldier, changed leg phase, geometry drift, altered launcher, broad red wash, red on neutral materials, new/removed detail, ground, shadow, halo, scenery, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

### exec-63af8c8a-c8a7-4854-945c-61e1ea0a002e.png — rejected for unit_rocket_walk4_red.png

- Submitted input images, in order: T/unit_rocket_walk4_teal.png; normalized draft from G/exec-98e92275-7944-4b7d-8b45-7321a1d2e93c.png; R1; R2; R3
- Rejection: Exterior below .95.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper walk frame 4/8 high/right-advancing, unit_rocket_walk4_red.png, exact-footprint recolor retry
Primary request: RECOLOR IMAGE 1 IN PLACE. Change only teal paint to restrained dark Rubicon red. Preserve the same source silhouette; this is not a redraw. The normalized source visible bbox is x=68..187, y=14..241; output must keep that compact exterior footprint and exceed 0.96 exterior-mask IoU.
Input images: Image 1 is the authoritative normalized teal production frame and exact edit target for every geometric and alpha relationship. Image 2 is a prior red color draft only; borrow restrained red hue, not shape. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material benchmarks only.
Color edit only: teal helmet/armor identification panels become weathered Rubicon oxide-red; gunmetal, taupe, off-white, black, hazard yellow, amber lights, launcher and universal red warhead stay unchanged.
Geometry/alpha lock: exact walk frame 4/8 high/right-advancing leg phase, arms tucked to source width, exact launcher/body boundary, fixed center/pivot/scale/padding, strict 90-degree overhead north orientation, exact external contour and transparent cutouts. Do not broaden shoulders/arms, lengthen limbs, move feet, translate, crop, rotate, mirror, scale, sharpen, simplify, or redraw.
Background: exact genuine transparency. One isolated sprite. No ground, shadow, halo, glow, checkerboard, scenery, text, logo, border, perspective, sprite sheet, or extra pose.
~~~

### exec-e6fc67cd-280e-4c84-a491-67ae788b338a.png — rejected for unit_rocket_walk4_red.png

- Submitted input images, in order: T/unit_rocket_walk4_teal.png; R1; R2; R3
- Rejection: Exterior passed, but opacity/internal-alpha ghost failed.

~~~text
Use case: precise-object-edit
Asset type: exact color-only edit, unit_rocket_walk4_teal.png to unit_rocket_walk4_red.png
Primary request: preserve Image 1 exactly; replace only teal armor paint with muted weathered Rubicon red.
Input images: Image 1 is sole authoritative normalized edit target. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png material references only; ignore their shapes.
Keep exact: high-point/right-advancing gait pose, limb positions, launcher, normalized bbox x=68..187 y=14..241, exterior alpha contour, scale, pivot, padding, strict overhead north orientation, every neutral color/detail/light. True transparency. Exterior IoU target >0.96.
No redraw, widening, translation, rotation, scale, crop, mirror, new/removed detail, neutral recolor, ground, shadow, halo, scenery, text, logo, perspective, sprite sheet.
~~~

### exec-8849757e-5182-4158-80a4-b81d8f17ca29.png — rejected for unit_rocket_death1_red.png

- Submitted input images, in order: T/unit_rocket_death1_teal.png; R1; R2; R3
- Rejection: Exterior remained in review band; selected retry improved to .96630.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry death sprite, Rubicon Rocket Trooper death frame 1/4 initial-hit stagger colorway silhouette-lock pass, unit_rocket_death1_red.png
Input images: Image 1 is the approved normalized Expedition Rocket Trooper death frame 1/4 initial-hit stagger and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve exact source alpha mask and every exterior/interior alpha boundary; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical silhouette, framing, anatomy, exact death frame 1/4 initial-hit stagger collapse pose, attached intact shoulder launcher, equipment, footprint, scale, pivot, centering, padding, strict 90-degree overhead camera, texture, dirt, scratches, lighting, hazard-yellow, amber, gunmetal, taupe, off-white, black details. No redraw, pose progression change, gore, detachment, or new damage.
Background: true transparency exactly as Image 1; no checkerboard, matte, terrain, ground, cast/contact shadow, outline, halo, particles, text, logo, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered/detached launcher, red on neutral armor, saturated red wash, blood, explosion, perspective change, sprite sheet, multiple poses.
~~~

### exec-3bb77bea-0e8c-492c-acf8-efc37b530bba.png — rejected for unit_rocket_death1_red.png

- Submitted input images, in order: T/unit_rocket_death1_teal.png; normalized draft from G/exec-8849757e-5182-4158-80a4-b81d8f17ca29.png; R1; R2; R3
- Rejection: Exterior below .95.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper death frame 1/4 initial-hit stagger, unit_rocket_death1_red.png, exact-footprint recolor retry
Primary request: RECOLOR IMAGE 1 IN PLACE. Change only teal paint to restrained dark Rubicon red. Preserve the exact collapse pose and source silhouette; not a redraw. Normalized source visible bbox is x=66..189, y=14..241; exterior-mask IoU target is at least 0.96.
Input images: Image 1 is authoritative normalized teal production death frame and exact edit target for geometry, alpha, anatomy, launcher, pose, scale, pivot, padding, lighting, texture, and non-teal colors. Image 2 is a prior red draft only; borrow hue, not shape. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material benchmarks only.
Color edit only: teal armor IDs become weathered Rubicon oxide-red; preserve gunmetal/taupe/off-white/black/hazard-yellow/amber and universal red warhead.
Geometry/alpha lock: exact death frame 1/4 initial-hit stagger; exact attached launcher and limbs; exact outer contour, occupied scale, center, padding, strict 90-degree overhead camera. Do not straighten the fall, move limbs, widen armor, detach gear, translate, crop, rotate, mirror, scale, sharpen, simplify, or redraw. No gore.
Background: exact genuine transparency. One isolated sprite. No ground, shadow, halo, particles, scenery, text, logo, border, perspective, sprite sheet, extra pose.
~~~

### exec-e854f5b4-9538-4fa1-af88-fda78ea7c85d.png — rejected for unit_rocket_death2_red.png

- Submitted input images, in order: T/unit_rocket_death2_teal.png; R1; R2; R3
- Rejection: Raw and exterior failures plus translucent ghost.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry death sprite, Rubicon Rocket Trooper death frame 2/4 knees-buckling balance-break colorway silhouette-lock pass, unit_rocket_death2_red.png
Input images: Image 1 is the approved normalized Expedition Rocket Trooper death frame 2/4 knees-buckling balance-break and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve exact source alpha mask and every exterior/interior alpha boundary; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical silhouette, framing, anatomy, exact death frame 2/4 knees-buckling balance-break collapse pose, attached intact shoulder launcher, equipment, footprint, scale, pivot, centering, padding, strict 90-degree overhead camera, texture, dirt, scratches, lighting, hazard-yellow, amber, gunmetal, taupe, off-white, black details. No redraw, pose progression change, gore, detachment, or new damage.
Background: true transparency exactly as Image 1; no checkerboard, matte, terrain, ground, cast/contact shadow, outline, halo, particles, text, logo, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered/detached launcher, red on neutral armor, saturated red wash, blood, explosion, perspective change, sprite sheet, multiple poses.
~~~

### exec-e1791250-9aec-4062-86e8-8b27e5dd3d04.png — rejected for unit_rocket_death2_red.png

- Submitted input images, in order: T/unit_rocket_death2_teal.png; normalized draft from G/exec-e854f5b4-9538-4fa1-af88-fda78ea7c85d.png; R1; R2; R3
- Rejection: Major pose/geometry drift.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper death frame 2/4 knees buckling and balance breaking, unit_rocket_death2_red.png, exact-footprint recolor retry
Primary request: RECOLOR IMAGE 1 IN PLACE. Change only teal paint to restrained dark Rubicon red. Preserve the exact collapse pose and source silhouette; not a redraw. Normalized source visible bbox is x=60..195, y=14..241; exterior-mask IoU target is at least 0.96.
Input images: Image 1 is authoritative normalized teal production death frame and exact edit target for geometry, alpha, anatomy, launcher, pose, scale, pivot, padding, lighting, texture, and non-teal colors. Image 2 is a prior red draft only; borrow hue, not shape. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material benchmarks only.
Color edit only: teal armor IDs become weathered Rubicon oxide-red; preserve gunmetal/taupe/off-white/black/hazard-yellow/amber and universal red warhead.
Geometry/alpha lock: exact death frame 2/4 knees buckling and balance breaking; exact attached launcher and limbs; exact outer contour, occupied scale, center, padding, strict 90-degree overhead camera. Do not straighten the fall, move limbs, widen armor, detach gear, translate, crop, rotate, mirror, scale, sharpen, simplify, or redraw. No gore.
Background: exact genuine transparency. One isolated sprite. No ground, shadow, halo, particles, scenery, text, logo, border, perspective, sprite sheet, extra pose.
~~~

### exec-167aa136-92be-4f4d-9499-6a00b89e8e68.png — rejected for unit_rocket_death2_red.png

- Submitted input images, in order: T/unit_rocket_death2_teal.png; R1; R2; R3
- Rejection: Raw/exterior failures and translucent ghost.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production death sprite, Rubicon Rocket Trooper, unit_rocket_death2_red.png
Input images: Image 1 is the approved normalized teal Rocket Trooper death frame 2 and exact edit target. Images 2–4 are bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png secondary material references only.
Primary request: change color only. Replace only the small weathered teal helmet, shoulder, forearm, and knee identification panels with restrained dark oxide-red / Rubicon iron-red. Keep every non-teal pixel unchanged.
Hard invariants: preserve Image 1's exact knees-buckling balance-break pose, bracing hand, body tilt, intact attached shoulder launcher, exterior alpha silhouette, x=60..195 and y=14..241 normalized footprint, anatomy, scale, pivot, centering, transparent padding, strict 90-degree overhead camera, materials, texture, lighting, taupe, gunmetal, off-white, black, hazard yellow, amber lights, and red warhead. Do not redraw, straighten, rotate, widen, move limbs, detach gear, translate, resize, mirror, crop, or add damage.
Background: genuine transparency exactly as Image 1; one isolated sprite; no checkerboard, matte, ground, shadow, halo, particles, scenery, text, logo, border, perspective, sprite sheet, or extra pose.
Metric: border-connected-hole-filled exterior alpha-mask IoU at threshold 16 must exceed 0.96 relative to Image 1.
~~~

### exec-0bee9b13-b67b-4898-b505-9a3cfeb80895.png — rejected for unit_rocket_death3_red.png

- Submitted input images, in order: T/unit_rocket_death3_teal.png; R1; R2; R3
- Rejection: Exterior narrowly below .95.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry death sprite, Rubicon Rocket Trooper death frame 3/4 broad sideways transitional fall colorway silhouette-lock pass, unit_rocket_death3_red.png
Input images: Image 1 is the approved normalized Expedition Rocket Trooper death frame 3/4 broad sideways transitional fall and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve exact source alpha mask and every exterior/interior alpha boundary; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical broad corpse silhouette, framing, anatomy, exact death frame 3/4 broad sideways transitional fall pose, attached intact launcher resting with body, equipment, footprint, scale, pivot, centering, padding, strict 90-degree overhead camera, texture, dirt, scratches, lighting, hazard-yellow, amber, gunmetal, taupe, off-white, black details. No redraw, pose progression change, gore, detachment, or new damage.
Background: true transparency exactly as Image 1; no checkerboard, matte, terrain, ground, cast/contact shadow, outline, halo, particles, text, logo, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered/detached launcher, red on neutral armor, saturated red wash, blood, explosion, perspective change, sprite sheet, multiple poses.
~~~

### exec-7689ce9a-b7e6-4dc2-86d6-501349e0f18f.png — rejected for unit_rocket_death3_red.png

- Submitted input images, in order: T/unit_rocket_death3_teal.png; normalized draft from G/exec-0bee9b13-b67b-4898-b505-9a3cfeb80895.png; R1; R2; R3
- Rejection: Exterior below .95.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper death frame 3/4 sideways/back transitional fall, unit_rocket_death3_red.png, exact broad-footprint recolor retry
Primary request: RECOLOR IMAGE 1 IN PLACE. Change only teal paint to restrained dark Rubicon red. Preserve exact fallen body and launcher silhouette; this is not a redraw. Normalized source bbox is x=14..241, y=38..217; exterior-mask IoU target at least 0.96.
Input images: Image 1 is authoritative normalized teal production death frame and exact edit target for geometry, alpha, anatomy, attached launcher, pose, scale, pivot, padding, lighting, texture, and non-teal colors. Image 2 is prior red draft only for hue, never shape. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material benchmarks only.
Color edit only: teal armor IDs become weathered Rubicon oxide-red; preserve gunmetal/taupe/off-white/black/hazard-yellow/amber and universal red warhead.
Geometry/alpha lock: exact death frame 3/4 sideways/back transitional fall; exact limb splay, fall angle, body length, attached launcher direction and placement; exact outer contour, occupied scale, center, padding, fixed strict-overhead camera. Do not rotate the corpse, move limbs, widen/narrow body, detach gear, translate, crop, mirror, scale, sharpen, simplify, or redraw. No gore.
Background: exact genuine transparency. One isolated sprite. No ground, shadow, halo, particles, scenery, text, logo, border, perspective, sprite sheet, extra pose.
~~~

### exec-c25e4ebf-a3ea-42ea-ae07-c4b7608ceb84.png — rejected for unit_rocket_death4_red.png

- Submitted input images, in order: T/unit_rocket_death4_teal.png; R1; R2; R3
- Rejection: Exterior failure and severe translucent ghost.

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry death sprite, Rubicon Rocket Trooper death frame 4/4 fully-prone still final colorway silhouette-lock pass, unit_rocket_death4_red.png
Input images: Image 1 is the approved normalized Expedition Rocket Trooper death frame 4/4 fully-prone still final and exact geometry/alpha-mask edit target. Images 2–4 are approved bld_skiff.png, unit_carrier_teal.png, and bld_shipyard_teal.png benchmarks; retain only their grounded material discipline and restrained accent density, with no geometry/composition change from Image 1.
Primary request: change color only. Replace only the small weathered teal faction-paint areas on Image 1 with restrained weathered dark oxide-red / Rubicon iron-red. Keep every non-teal pixel visually unchanged, including the universal red warhead tip.
Hard invariants: preserve exact source alpha mask and every exterior/interior alpha boundary; threshold-16 alpha-mask IoU target exceeds 0.96. Preserve identical broad corpse silhouette, framing, anatomy, exact death frame 4/4 fully-prone still final pose, attached intact launcher resting with body, equipment, footprint, scale, pivot, centering, padding, strict 90-degree overhead camera, texture, dirt, scratches, lighting, hazard-yellow, amber, gunmetal, taupe, off-white, black details. No redraw, pose progression change, gore, detachment, or new damage.
Background: true transparency exactly as Image 1; no checkerboard, matte, terrain, ground, cast/contact shadow, outline, halo, particles, text, logo, scenery, border, or canvas contact.
Avoid: regenerated soldier, any shape/limb change, altered/detached launcher, red on neutral armor, saturated red wash, blood, explosion, perspective change, sprite sheet, multiple poses.
~~~

### exec-8869a11b-fc19-450a-bd5f-80ceece53b87.png — rejected for unit_rocket_death4_red.png

- Submitted input images, in order: T/unit_rocket_death4_teal.png; normalized draft from G/exec-c25e4ebf-a3ea-42ea-ae07-c4b7608ceb84.png; R1; R2; R3
- Rejection: Opaque dramatic backdrop/perspective drift; visually invalid and exterior below .95.

~~~text
Use case: precise-object-edit
Asset type: Broodfall Rubicon Rocket Trooper death frame 4/4 fully prone and still, unit_rocket_death4_red.png, exact broad-footprint recolor retry
Primary request: RECOLOR IMAGE 1 IN PLACE. Change only teal paint to restrained dark Rubicon red. Preserve exact fallen body and launcher silhouette; this is not a redraw. Normalized source bbox is x=14..241, y=67..188; exterior-mask IoU target at least 0.96.
Input images: Image 1 is authoritative normalized teal production death frame and exact edit target for geometry, alpha, anatomy, attached launcher, pose, scale, pivot, padding, lighting, texture, and non-teal colors. Image 2 is prior red draft only for hue, never shape. Images 3–5 are bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png secondary material benchmarks only.
Color edit only: teal armor IDs become weathered Rubicon oxide-red; preserve gunmetal/taupe/off-white/black/hazard-yellow/amber and universal red warhead.
Geometry/alpha lock: exact death frame 4/4 fully prone and still; exact limb splay, fall angle, body length, attached launcher direction and placement; exact outer contour, occupied scale, center, padding, fixed strict-overhead camera. Do not rotate the corpse, move limbs, widen/narrow body, detach gear, translate, crop, mirror, scale, sharpen, simplify, or redraw. No gore.
Background: exact genuine transparency. One isolated sprite. No ground, shadow, halo, particles, scenery, text, logo, border, perspective, sprite sheet, extra pose.
~~~

## Rejected invocation with no generated draft

One additional walk5 teal retry was submitted with six references. ImageGen rejected the call at preflight because `referenced_image_paths` accepts at most five paths, so no generated-original file exists and it is not counted among the 48 generated originals. The exact prompt is below; the attempted input order was T/unit_rocket_walk1_teal.png; T/unit_rocket_teal.png; T/unit_rocket_walk4_teal.png; R1; R2; R3.

~~~text
Use case: precise-object-edit
Asset type: single production RTS infantry animation sprite, Rocket Trooper walk frame 5 of 8, teal — corrected opposite-contact take
Primary request: Starting from the exact Rocket Trooper in Image 1, change only the legs into the opposite contact pose for gait phase 5/8. The boot on the LEFT SIDE OF THE CANVAS must be visibly forward/north (higher on the canvas) at first ground contact. The boot on the RIGHT SIDE OF THE CANVAS must be visibly back/south (lower on the canvas). This must be the clear leg-phase opposite of Image 1; do not mirror the whole soldier.
Input images: Image 1 (unit_rocket_walk1_teal.png) is the authoritative character, rendering, scale, pivot, and first-contact pose whose leg positions must be swapped only. Image 2 (unit_rocket_teal.png) is the authoritative normalized Rocket Trooper identity and armor/launcher geometry. Image 3 (unit_rocket_walk4_teal.png) is the immediately preceding gait continuity reference. Images 4–6 (bld_skiff.png, unit_carrier_teal.png, bld_shipyard_teal.png) are authoritative style, material, weathering, palette, and strict overhead-projection references only.
Scene/backdrop: genuinely transparent background.
Subject: the same one adult teal Rocket Trooper only; grounded semi-realistic anatomy; unmistakable shoulder-fired launcher tube remains physically attached over the CANVAS-LEFT shoulder and points straight north; restrained red warhead tip remains.
Style/medium: match Images 1–3 exactly: polished hand-painted weathered gunmetal/taupe armor, restrained teal panels, off-white trim, hazard-yellow service marks, amber micro-lights.
Composition/framing: strict 90-degree orthographic overhead, facing canvas north, centered 1:1 canvas, exact same visible height, body mass, launcher scale, occupied area, and fixed gameplay pivot as Image 1, generous transparent safe padding.
Edit invariants: CHANGE ONLY LEG PHASING plus the minimum natural hip counter-motion. Canvas-left boot high/north; canvas-right boot low/south. Keep every upper-body pixel relationship conceptually locked: do not mirror, relocate, shorten, lengthen, rotate, or redesign the launcher, head, shoulders, arms, torso, armor panels, palette, lighting, or camera. No translation, bob, turn, tilt, or scale pulse.
Constraints: exactly one isolated subject; launcher attached/intact/north-aligned; true alpha; clean antialiased silhouette.
Avoid: repeating Image 1 leg positions, mirrored whole body, chibi, spindly anatomy, detached launcher, extra equipment/person, scenery, terrain, ground, shadow, glow, halo, smoke, particles, border, text, logo, watermark, perspective, sprite sheet, multiple poses.
~~~

## QA and acceptance

- Staged validator: `rocket: 26/26 files exterior_iou=0.95157..0.98195 raw_iou=0.95150..0.98208 errors=0 warnings=4`.
- Production validator after installation: `rocket: 26/26 files exterior_iou=0.95157..0.98195 raw_iou=0.95150..0.98208 errors=0 warnings=4`.
- Production validator JSON (includes per-file 256×256 RGBA, alpha extrema, zero edge-alpha, bbox, opacity, gait stability, raw IoU, and exterior IoU): image-audit/phases/phase-3/work/rocket/qa/unit_rocket_production_validation.json
- Staged validator JSON: image-audit/phases/phase-3/work/rocket/qa/unit_rocket_stage_validation.json
- Install parity: all 26 production PNGs byte-match their approved files in T after same-directory atomic replacement; no transaction directory remains.
- Review-band exterior advisories, all visually accepted: walk1 .95898; walk2 .95972; death3 .95157; death4 .95313.
- Hardened hygiene/stability results: edge alpha maximum 0; safe padding minimum 14 px; opaque fraction minimum .86711; largest connected-component share minimum .999811; static/walk bbox-center span maximum .5 px; occupied-area CV maximum .05378.

| Pose | Raw alpha IoU | Exterior-silhouette IoU | Teal opaque fraction | Red opaque fraction |
|---|---:|---:|---:|---:|
| static | .98137 | .98137 | .91818 | .92166 |
| walk1 | .95898 | .95898 | .91564 | .91703 |
| walk2 | .95991 | .95972 | .91380 | .89965 |
| walk3 | .97056 | .97076 | .91360 | .91811 |
| walk4 | .97524 | .97531 | .90780 | .91223 |
| walk5 | .98208 | .98195 | .91500 | .91830 |
| walk6 | .97418 | .97418 | .92125 | .92086 |
| walk7 | .96900 | .96958 | .92169 | .92058 |
| walk8 | .96954 | .97140 | .91434 | .92334 |
| death1 | .96630 | .96630 | .91958 | .90695 |
| death2 | .97370 | .96778 | .91150 | .91654 |
| death3 | .95150 | .95157 | .88509 | .86711 |
| death4 | .95303 | .95313 | .87107 | .86917 |

- Full-size family sheet: image-audit/phases/phase-3/work/rocket/qa/unit_rocket_family_full-256px.png
- Exact gameplay-scale family sheet: image-audit/phases/phase-3/work/rocket/qa/unit_rocket_family_exact-32px.png
- Magnified gameplay-scale family sheet: image-audit/phases/phase-3/work/rocket/qa/unit_rocket_family_32px-magnified.png
- Focused advisory full-size sheet: image-audit/phases/phase-3/work/rocket/qa/unit_rocket_advisory_pairs_full-256px.png
- Focused advisory 32px sheet: image-audit/phases/phase-3/work/rocket/qa/unit_rocket_advisory_pairs_32px-magnified.png
- Visual acceptance: strict overhead identity, attached north-pointing launcher, opacity, faction surfaces, gait progression, death progression, scale, pivot, and alpha footprint approved at source and exact 32px.
