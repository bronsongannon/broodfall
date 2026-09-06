# Marine infantry family — exact ImageGen prompt and provenance record

Status: production finals generated with the built-in ImageGen tool, normalized with
`image-audit/process_generated_sprite.py`, and staged atomically before installation.
No spritesheet request or programmatic artwork generation was used. Every final asset
has its own distinct built-in ImageGen call.

## Approved benchmark inputs

All production teal calls include these three benchmark files:

1. `assets/sprites/bld_skiff.png`
2. `assets/sprites/unit_carrier_teal.png`
3. `assets/sprites/bld_shipyard_teal.png`

Every teal pose call also includes the revised normalized teal static master as Image 1.
Every red call includes its matching normalized teal frame as Image 1 and the same three
approved benchmark files as Images 2–4. Image 1 is authoritative for identity, geometry,
pose, scale, pivot, and alpha; Images 2–4 are secondary visual-language constraints.

All raw production outputs came from:
`/Users/bronsongannon/.codex/generated_images/01a07502-9724-7c03-8555-58a849029e62/`.

## Teal static base call

References, in order: `bld_skiff.png`, `unit_carrier_teal.png`,
`bld_shipyard_teal.png`.

Raw output: `exec-48633c6b-ebdf-476e-9969-11fd5233d688.png`.

Exact submitted prompt:

~~~text
Use case: stylized-concept
Asset type: production real-time strategy infantry sprite master
Primary request: Render exactly one isolated human assault Marine as a strict top-down game sprite. This is a map token viewed from a camera directly above the crown of the helmet, never a character portrait.
Input images: Image 1 bld_skiff.png is the approved weathered gunmetal/taupe material and restrained teal/amber palette benchmark. Image 2 unit_carrier_teal.png is the approved exact camera benchmark: 90-degree orthographic plan view with north at the top. Image 3 bld_shipyard_teal.png is the approved industrial finish benchmark. Match their camera discipline and visual language; do not reproduce any vehicle or building.
Scene/backdrop: fully transparent alpha only, with empty padding around the one soldier.
Subject: one adult human assault Marine pointing north (head toward top edge, boots toward bottom edge), seen from directly above. The camera sees primarily the TOPS of helmet, shoulder armor, backpack, forearms, rifle, thighs, knees, and boots. The face and chest front must be hidden by the overhead angle. Grounded semi-realistic adult proportions: small helmet relative to body, broad but plausible shoulders, visible torso, separated legs and boots. He carries a short compact assault rifle held close and pointing north.
Style/medium: polished semi-realistic pre-rendered RTS unit sprite, weathered and materially grounded, optimized to remain coherent at 26 pixels tall.
Composition/framing: exact 90-degree orthographic overhead / plan view, zero horizon, zero camera tilt, zero perspective; symmetrical centered neutral standing footprint with stable pivot; entire body visible; generous transparent padding.
Lighting/mood: restrained neutral overhead lighting, military and utilitarian.
Color palette: chipped charcoal gunmetal armor, dusty taupe plates and webbing, small restrained dark-teal faction panels, sparse amber micro-lights.
Materials/textures: worn metal/composite plates, matte black fabric joints, dark steel rifle.
Constraints: output one soldier only; transparent background; safe padding on every side; north-facing map-view silhouette; rifle compact; readable at 24–32 pixels; pose suitable as master reference for walking, death, and hunker variants.
Avoid: eye-level view, frontal portrait, seeing the face, seeing chest front, three-quarter view, isometric view, oblique camera, side view, perspective, horizon, ground, floor, drop shadow, halo, glow backdrop, scenery, text, logo, watermark, UI, border, sprite sheet, multiple soldiers, duplicate parts, chibi anatomy, bobble head, oversized helmet, enormous shoulder pads, overly thin silhouette.
~~~

## Teal static readability pass (installed static master)

References, in order: normalized output of the teal static base call,
`bld_skiff.png`, `unit_carrier_teal.png`, `bld_shipyard_teal.png`.

Raw output: `exec-bac34600-05b9-4492-96d6-dceee919f2e0.png`.

Exact submitted prompt:

~~~text
Use case: precise-object-edit
Asset type: production RTS infantry sprite master readability pass
Primary request: Refine the supplied normalized teal assault Marine master with a restrained but unmistakably readable faction/signature treatment at 24–32 pixels. Preserve the current grounded silhouette and exact top-down pose. Add a thin dark-teal visor strip on the helmet's north/front edge, a restrained visibly teal identification band across the helmet crown/front, small teal upper-shoulder identification panels, thin off-white technical trim on select shoulder/backpack edges, and only one or two tiny warm amber micro-lights. Keep all teal identification paint together to roughly 10–15 percent of the visible soldier area.
Input images: Image 1 is the authoritative normalized Marine edit target and absolute source of truth for silhouette, anatomy, pose, armor/equipment geometry, compact rifle, physical scale, center pivot, and alpha footprint. Image 2 bld_skiff.png is the approved weathered gunmetal/taupe, restrained accent, amber light, and off-white technical trim benchmark. Image 3 unit_carrier_teal.png is the approved strict 90-degree north-up orthographic and teal-readability benchmark. Image 4 bld_shipyard_teal.png is the approved dense weathered industrial finish benchmark. Use Images 2–4 only for palette/material discipline; never introduce vehicle or building parts.
Scene/backdrop: preserve genuine transparent alpha exactly.
Subject: the identical adult assault Marine, exact compact rifle and grounded human mass.
Style/medium: preserve the polished semi-realistic pre-rendered 3D RTS sprite treatment.
Composition/framing: preserve exact 90-degree orthographic overhead plan view, north orientation, placement, physical scale, canvas occupancy, and safe padding.
Constraints: edit only colors and tiny painted/illuminated surface details; preserve every silhouette boundary, pose, limb position, body proportion, armor plate shape, rifle geometry, lighting direction, material texture, center, transparency, and empty space as closely as possible; identification must remain legible when reduced to 28 pixels; one complete soldier only.
Avoid: redesign, geometry change, pose change, translation, rotation, crop, zoom, scale change, oversized glowing visor, cyan flood-fill, teal covering more than 15 percent, too many lights, changing gunmetal/taupe base, vehicle parts, building parts, ground, shadow, glow backdrop, scenery, text, logo, watermark, border, sprite sheet, extra figure, duplicate limbs.
~~~

## Teal walk calls

For each row below, the exact submitted prompt was the template that follows with
`<<LABEL>>`, `<<REQUEST>>`, and `<<SHORT>>` replaced verbatim by that row's
values. No other suffix, hidden instruction, or prompt text was used.

| Output | Raw output | LABEL | REQUEST | SHORT |
| --- | --- | --- | --- | --- |
| `unit_marine_walk1_teal.png` | `exec-50654f93-a47c-4a27-8548-270ceae8bb0f.png` | walk animation frame 1 of 8 | left-foot contact: left boot modestly forward/north and just contacting, right boot modestly back/south, with natural opposite arm counter-motion constrained by the rifle-ready pose | left-contact gait phase |
| `unit_marine_walk2_teal.png` | `exec-716df824-1549-4300-a2d6-bf3967afd1ec.png` | walk animation frame 2 of 8 | left-side down/compression: weight settles onto the forward left leg, both knees flex slightly, and the right heel begins to unload | left-side compression gait phase |
| `unit_marine_walk3_teal.png` | `exec-43817724-8323-4cdc-90e8-0e46ba1f6581.png` | walk animation frame 3 of 8 | left leg planted/right leg passing: left foot carries weight while right knee and boot pass close beneath the centerline | left-planted/right-passing gait phase |
| `unit_marine_walk4_teal.png` | `exec-aa2390c7-9188-4442-a48f-c9e52ea3ec64.png` | walk animation frame 4 of 8 | high point/right advancing: body is supported over planted left foot while the right knee and boot advance modestly north | high-point/right-advancing gait phase |
| `unit_marine_walk5_teal.png` | `exec-8994c71e-f0b0-40d8-8445-bbc59ce84a86.png` | walk animation frame 5 of 8 | right-foot contact: right boot modestly forward/north and just contacting, left boot modestly back/south, the complementary half-cycle to frame 1 | right-contact gait phase |
| `unit_marine_walk6_teal.png` | `exec-9f28afaa-02cc-486d-81d3-a0acd0f58f2b.png` | walk animation frame 6 of 8 | right-side down/compression: weight settles onto the forward right leg, both knees flex slightly, and the left heel begins to unload, complementary to frame 2 | right-side compression gait phase |
| `unit_marine_walk7_teal.png` | `exec-6f8f54ae-e2f9-444a-b096-8528b1c1f168.png` | walk animation frame 7 of 8 | right leg planted/left leg passing: right foot carries weight while left knee and boot pass close beneath the centerline, complementary to frame 3 | right-planted/left-passing gait phase |
| `unit_marine_walk8_teal.png` | `exec-3227f2d5-07c8-4ce1-adb1-c06d77876c4a.png` | walk animation frame 8 of 8 | high point/left advancing: body is supported over planted right foot while the left knee and boot advance modestly north, complementary to frame 4 and loop-ready into frame 1 | high-point/left-advancing gait phase |

Exact teal walk prompt template:

~~~text
Use case: precise-object-edit
Asset type: production RTS infantry <<LABEL>>
Primary request: Starting from the supplied normalized teal Marine master, create only this exact gait phase — <<REQUEST>>. The Marine remains centered, points exactly north, and keeps the compact assault rifle rock-steady.
Input images: Image 1 is the authoritative normalized Marine identity, design, pose baseline, physical scale, camera, center pivot, and silhouette-density reference. Image 2 bld_skiff.png is the approved weathered gunmetal/taupe, restrained teal, amber micro-light, and off-white technical trim benchmark. Image 3 unit_carrier_teal.png is the approved strict 90-degree north-up orthographic readability benchmark. Image 4 bld_shipyard_teal.png is the approved dense industrial finish benchmark. Preserve Image 1's soldier exactly while using Images 2–4 only to maintain the established Broodfall visual language; never introduce vehicle/building parts.
Scene/backdrop: genuine transparent alpha only.
Subject: the same adult assault Marine, same modest helmet and thin visor strip, grounded human body mass, gunmetal/taupe armor, restrained teal identification panels, off-white technical trim, one or two amber micro-lights, and same compact assault rifle.
Style/medium: identical polished semi-realistic pre-rendered 3D RTS sprite treatment.
Composition/framing: exact 90-degree orthographic overhead plan view; head/top points north; whole body centered on exactly the same pivot and occupies the same physical scale as Image 1; generous transparent padding.
Constraints: change only the limbs enough to express the <<SHORT>>; keep torso, helmet, visor, backpack, rifle orientation, weapon size, armor design, teal coverage, trim, palette, lighting, camera, center, and scale locked; feet remain legible without overall translation, rotation, or scale pulsing; output one complete soldier only; true transparency.
Avoid: vehicle parts, building parts, translation, rotation, zoom, body redesign, altered equipment, weapon swing, bobbing, frontal or oblique view, isometric perspective, ground, floor, shadow, halo, text, logo, watermark, border, sprite sheet, extra figure, duplicate limbs, chibi anatomy.
~~~

## Teal death and hunker calls

For each row, the exact submitted prompt was the template below with the four
placeholders replaced verbatim by the row's values.

| Output | Raw output | LABEL | REQUEST | READ | EXTRA-AVOID |
| --- | --- | --- | --- | --- | --- |
| `unit_marine_death1_teal.png` | `exec-679a7c6d-b4fd-4bcd-af1e-dbe5a22d2dd5.png` | death animation frame 1 of 4 | the first instant of a death sequence: a sharp hit/stagger while still mostly upright. Knees soften, torso twists only slightly, one shoulder recoils, and the compact rifle is still held but knocked subtly off its ready line | initial impact/stagger, clearly earlier than collapse | blood, gore, dismemberment, detached gear, already-prone pose |
| `unit_marine_death2_teal.png` | `exec-55b24ff1-1159-4acd-a633-9b0eaf75bcf4.png` | death animation frame 2 of 4 | the second death phase: knees buckling and balance visibly breaking. From directly overhead, the body compresses and lists modestly toward screen-right while both knees bend; the compact rifle slips across the upper body but remains held/attached | knee collapse and loss of balance, later than frame 1 and earlier than a full fall | blood, gore, dismemberment, detached gear, fully upright pose, fully prone final pose |
| `unit_marine_death3_teal.png` | `exec-c2f26d19-0d9f-4b0b-bcd0-24dbdf301499.png` | death animation frame 3 of 4 | the third death phase: actively falling sideways/back toward screen-right, body close to the ground and footprint noticeably broader than standing. Helmet and upper torso tip right, hips and bent legs trail left/down, and the compact rifle lies diagonally across or beside the body while remaining held/attached | a dynamic near-ground fall, significantly broader than standing and not yet the final still corpse | blood, gore, dismemberment, detached gear, standing pose, final rigid corpse |
| `unit_marine_death4_teal.png` | `exec-754f7ba4-7dab-4413-9d61-669eea263b53.png` | death animation frame 4 of 4 | the final death pose: fully prone, motionless, and settled as seen directly overhead, lying diagonally toward screen-right with a broad low footprint. Legs are slack and slightly bent; arms and compact rifle rest naturally against the body; all equipment remains attached | a fully prone, unmistakably still final pose, broader and lower than frame 3 | blood, gore, dismemberment, detached gear, upright or kneeling pose, active motion |
| `unit_marine_hunker_teal.png` | `exec-88c2b1f1-0b93-453f-aec4-c1b91395fc6d.png` | hunker-state sprite | a compact defensive hunker pose: low crouch / near-prone braced firing posture, clearly distinct from standing and death. The Marine still faces and aims north; knees are deeply bent and spread modestly, torso lowered behind shoulder armor, compact rifle braced forward, body balanced and alert | a stable living low defensive posture, neither walking nor dying | corpse, limp limbs, blood, gore, detached equipment, standing pose, trench, sandbags |

Exact teal death/hunker prompt template:

~~~text
Use case: precise-object-edit
Asset type: production RTS infantry <<LABEL>>
Primary request: Transform the supplied normalized teal Marine master into <<REQUEST>>.
Input images: Image 1 is the authoritative normalized Marine identity, armor/equipment design, thin visor, palette, physical scale, strict overhead camera, and center-pivot reference. Image 2 bld_skiff.png is the approved weathered gunmetal/taupe, restrained teal, amber micro-light, and off-white technical trim benchmark. Image 3 unit_carrier_teal.png is the approved strict 90-degree north-up orthographic readability benchmark. Image 4 bld_shipyard_teal.png is the approved dense industrial finish benchmark. Preserve Image 1's exact soldier while using Images 2–4 only to maintain Broodfall visual language; never introduce vehicle/building parts.
Scene/backdrop: genuine transparent alpha only.
Subject: the same adult assault Marine with identical modest helmet and teal visor strip, grounded body mass, gunmetal/taupe armor, restrained teal identification panels, off-white technical trim, one or two amber micro-lights, and compact rifle.
Style/medium: identical polished semi-realistic pre-rendered 3D RTS sprite treatment.
Composition/framing: strict 90-degree orthographic overhead plan view; keep the body's visual center on the same gameplay pivot, preserve the same physical body scale, and leave generous transparent padding.
Constraints: pose must clearly read as <<READ>>; preserve identity, body mass, equipment, armor design, signature teal/trim placement, materials, palette, lighting, camera, and physical scale; one complete intact soldier only; true transparency; rifle remains attached/in hand.
Avoid: vehicle parts, building parts, <<EXTRA-AVOID>>, apparent giant/small body, off-center crop, perspective, oblique or frontal view, ground, floor, shadow, halo, scenery, text, logo, watermark, border, sprite sheet, duplicate body or limbs, chibi anatomy.
~~~

## Red faction counterpart calls

For each row, the exact submitted prompt was the red template below with
`<<VARIANT>>` replaced verbatim. Each row's Image 1 is the normalized teal file
in the same row; Images 2–4 are the three approved benchmarks listed above.

| Red output | Authoritative teal Image 1 | Raw output | VARIANT |
| --- | --- | --- | --- |
| `unit_marine_red.png` | `unit_marine_teal.png` | `exec-ddd816e5-ef36-4f3f-909e-d8ee17a4f1ee.png` | static master |
| `unit_marine_walk1_red.png` | `unit_marine_walk1_teal.png` | `exec-15101568-4c11-4b27-9f98-1bd418a26bc7.png` | walk animation frame 1 of 8, left-contact |
| `unit_marine_walk2_red.png` | `unit_marine_walk2_teal.png` | `exec-7b90c990-cbc8-4f30-9f63-b2b31f7febd4.png` | walk animation frame 2 of 8, left-side compression |
| `unit_marine_walk3_red.png` | `unit_marine_walk3_teal.png` | `exec-148fa689-0f5c-465e-bf79-6976c2b5bf7c.png` | walk animation frame 3 of 8, left planted/right passing |
| `unit_marine_walk4_red.png` | `unit_marine_walk4_teal.png` | `exec-b6237b02-2bfd-4e7c-97a7-d84c859966dd.png` | walk animation frame 4 of 8, high point/right advancing |
| `unit_marine_walk5_red.png` | `unit_marine_walk5_teal.png` | `exec-e6fec7df-57cb-4499-bdfd-c7c185ec4dc6.png` | walk animation frame 5 of 8, right-contact |
| `unit_marine_walk6_red.png` | `unit_marine_walk6_teal.png` | `exec-900765a0-0af5-4cd0-b5ac-b63ef0c4d464.png` | walk animation frame 6 of 8, right-side compression |
| `unit_marine_walk7_red.png` | `unit_marine_walk7_teal.png` | `exec-18b65563-28ad-44a1-b867-bd2ccc85d9a8.png` | walk animation frame 7 of 8, right planted/left passing |
| `unit_marine_walk8_red.png` | `unit_marine_walk8_teal.png` | `exec-a8781696-bba2-4c45-8c08-c585c9c167c1.png` | walk animation frame 8 of 8, high point/left advancing and loop-ready |
| `unit_marine_death1_red.png` | `unit_marine_death1_teal.png` | `exec-8c25132d-8ac8-45d4-8c67-ae37a39903db.png` | death animation frame 1 of 4, initial hit/stagger |
| `unit_marine_death2_red.png` | `unit_marine_death2_teal.png` | `exec-8570d7ea-5ed1-4bf9-b1b5-dcd33537f3f3.png` | death animation frame 2 of 4, knees/balance breaking |
| `unit_marine_death3_red.png` | `unit_marine_death3_teal.png` | `exec-1851ed58-6583-4b09-8f09-98c601b8e745.png` | death animation frame 3 of 4, active sideways/back fall |
| `unit_marine_death4_red.png` | `unit_marine_death4_teal.png` | `exec-bbcb6f2a-e856-4467-9b38-0ac1e7848f96.png` | death animation frame 4 of 4, final prone still pose |
| `unit_marine_hunker_red.png` | `unit_marine_hunker_teal.png` | `exec-b40da790-bbcc-4aed-a7ac-45c788a9a502.png` | hunker-state low defensive pose |

Exact red prompt template:

~~~text
Use case: precise-object-edit
Asset type: Broodfall production RTS Marine red faction counterpart — <<VARIANT>>
Primary request: Make a surgical faction-color edit of the supplied normalized teal Marine frame. Change only its restrained teal identification paint, teal helmet/visor strip, and teal indicator accents to restrained military red/crimson. This must be the exact red counterpart of this frame, not a new pose or redesign.
Input images: Image 1 is the sole authoritative edit target and source of truth for every silhouette boundary, pose, anatomy, equipment, geometry, texture, lighting, physical scale, center, camera, and alpha footprint. Image 2 bld_skiff.png is the approved weathered gunmetal/taupe, restrained accent, amber micro-light, and off-white trim benchmark. Image 3 unit_carrier_teal.png is the approved strict 90-degree north-up orthographic readability benchmark. Image 4 bld_shipyard_teal.png is the approved dense industrial finish benchmark. Use Images 2–4 only as secondary Broodfall style constraints; Image 1 controls all geometry and pose; never add vehicle/building parts.
Scene/backdrop: preserve genuine transparent alpha exactly.
Subject: preserve the identical adult assault Marine, including gunmetal/taupe armor, modest helmet, thin visor strip, off-white technical trim, one or two amber micro-lights, compact rifle, and this exact animation pose.
Style/medium: preserve the existing polished semi-realistic pre-rendered 3D RTS sprite without reinterpretation.
Composition/framing: preserve exact 90-degree orthographic overhead view, north orientation where applicable, placement, physical scale, canvas occupancy, and safe padding.
Color edit: replace only visibly teal faction surfaces with dark restrained red/crimson faction surfaces; keep red coverage at the same roughly 10–15 percent as teal coverage; retain all charcoal, taupe, black, steel, off-white trim, amber lights, highlights, dirt, chips, and wear unchanged.
Constraints: pixels and alpha silhouette should align as closely as possible with Image 1; preserve pose, limb positions, body proportions, rifle position, armor shapes, every non-teal color, lighting, texture, transparency, and empty space; one complete soldier only.
Avoid: vehicle parts, building parts, any geometry change, pose change, movement, rotation, translation, crop, zoom, scale change, regenerated detail, equipment redesign, new markings, changing amber lights, red flood-fill, red covering more than 15 percent, ground, floor, shadow, glow backdrop, scenery, text, logo, watermark, border, sprite sheet, extra figure, duplicate limbs.
~~~

## Normalization and QA artifacts

Each raw output was normalized independently with:

~~~text
python3 image-audit/process_generated_sprite.py RAW_OUTPUT FINAL_OUTPUT
~~~

Default normalization parameters were retained: 256×256 RGBA output, 14-pixel
minimum fit padding, and border-connected background tolerance 38. The script
proportionally fits artwork and preserves real alpha/antialiased edges.

Family QA sheets:

- `image-audit/phases/phase-3/work/marine-family-source.png`
- `image-audit/phases/phase-3/work/marine-family-gameplay.png`

Final staged-family validation:

- 28/28 expected files present; every file is 256×256 RGBA with alpha extrema
  `(0, 255)` and maximum alpha `0` on all four canvas edges.
- Canonical alpha-footprint comparison (`alpha > 16`) passed with teal/red IoU
  min/mean/max `0.959972 / 0.976196 / 0.990802`. The minimum is death 4 and
  rounds to the `0.96` review target; all other pairs are above `0.9667`.
- A stricter antialias-fringe comparison (`alpha > 2`) measured min/mean/max
  `0.938112 / 0.954776 / 0.978793`. This lower auxiliary number reflects faint
  resampling fringe differences; the canonical threshold-16 silhouettes pass.
- Teal walk-frame threshold-2 bounding-box centers stay at x `127.5–128.0` and
  y `128.0`; all eight are exactly 228 px high, with width `108–122` px as the
  feet alternate through the gait.
- Source-scale and 28-pixel gameplay-scale sheets were both visually inspected:
  visor/faction reads remain clear, walk contacts alternate without pivot drift,
  death progresses from stagger through prone stillness, and hunker is compact,
  alive, and distinct from death.

Superseded exploratory outputs and pre-correction pose attempts were rejected and
never installed. In particular, an initial frontal static result and an early pose
batch lacking all three benchmark inputs were discarded; every production output
mapped above uses the corrected reference chain.
