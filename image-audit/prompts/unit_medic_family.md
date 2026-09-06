# Medic infantry family — exact ImageGen prompt and provenance record

Status: complete. Production finals were generated with the built-in ImageGen
tool, normalized with `image-audit/process_generated_sprite.py` to 256×256 RGBA
with 14 px safe padding, staged and validated as a complete family, then installed
atomically. No spritesheet request or programmatic artwork generation was used.
Every candidate asset and every colorway retry had its own distinct built-in
ImageGen call.

## Approved benchmark inputs

Every teal call included all three approved benchmarks:

1. `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
2. `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
3. `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

The static teal call used those three benchmarks directly. Every derived teal
pose also used the normalized teal Medic master (and, for the death sequence,
the immediately preceding normalized teal pose) as its authoritative identity,
scale, pivot, and equipment reference. Every red call used its matching
normalized teal pose as authoritative Image 1 and all three approved benchmarks
as secondary style references.

All built-in ImageGen outputs in this record were written beneath:

`/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/`

Selected normalized staging directory:

`/tmp/broodfall-phase3-medic/final/`

## Selected static teal master

- Outcome: selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-1438bf22-7127-47b5-ae6a-e0a05b0b7244.png`
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_teal.png`
- Final production target: `assets/sprites/unit_medic_teal.png`
- Referenced images, in call order: the three approved benchmark inputs above

Exact submitted prompt:

```text
Use case: stylized-concept
Asset type: production real-time strategy unit sprite, Broodfall human Medic, teal faction, static/idle master pose
Primary request: Generate exactly one standalone north-facing human field Medic sprite for a complete animation family. This image is the authoritative teal master for every later walk and death frame.
Input images: Image 1 bld_skiff.png, Image 2 unit_carrier_teal.png, and Image 3 bld_shipyard_teal.png are mandatory visual benchmarks for Broodfall human technology materials, palette, weathering, lighting, and production finish. They are style references only; do not copy their vehicle/building silhouettes.
Scene/backdrop: genuinely transparent background with no floor, ground, scenery, shadow, halo, vignette, frame, text, or watermark.
Subject: one adult human Medic viewed from strict orthographic 90-degree overhead, facing due north. Grounded semi-realistic adult proportions readable when drawn at 30×30 pixels; compact but not chibi, not head-heavy, not overly thin. Gunmetal and dusty taupe expedition armor with a compact medical backpack and a small attached hand-carried field-medical kit. Off-white/white appears only as limited readable medical identity panels on the backpack/kit, never as an all-white body or large white blob. Add restrained teal faction identification, tiny warm amber equipment micro-lights, and one small universal red medical-cross marking for instant role readability. No weapon is required. Both hands, backpack, and kit remain physically attached and coherent.
Style/medium: grounded semi-realistic painted game sprite with crisp material separation and subtle weathering matching the three supplied Broodfall human-technology benchmarks.
Composition/framing: single centered subject only; strict 90-degree top-down orthographic camera; due-north heading; stable centered body pivot; vertically aligned, symmetrical idle stance with a believable small separation between boots; entire silhouette safely inside the canvas with generous transparent padding. Occupancy, visible body height, backpack size, hand-kit scale, and pivot must be suitable as the locked basis of a 26-frame family.
Lighting/mood: restrained neutral overhead lighting; dimensional but compact; no cast shadow.
Color palette: weathered gunmetal, dusty taupe, dark rubber, limited off-white medical panels, restrained teal IDs, tiny warm amber lights, one small red medical-cross symbol only.
Materials/textures: worn composite armor, painted metal buckles, canvas medical pouches, rubber joints; fine detail must survive at 30×30.
Constraints: exactly one Medic and no other object; true alpha transparency; crisp clean alpha edge; north is the top of the image; same scale and pivot expected for future animation frames; no ground contact plate; no detached equipment; no lettering, branding, logos, insignia, or symbols except the single universal red medical cross.
Avoid: perspective or isometric angle; visible horizon; scenery; floor; shadow; glow halo; smoke; blood or gore; exaggerated muscles; toy/chibi proportions; giant helmet/head; spindly limbs; large white silhouette; extra people; vehicles; buildings; weapons; text; watermark.
```

## Selected static red counterpart

- Outcome: selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-17dfcd35-43fa-484e-b61b-30c5ae252395.png`
- Authoritative Image 1: `/tmp/broodfall-phase3-medic/final/unit_medic_teal.png`
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_red.png`
- Final production target: `assets/sprites/unit_medic_red.png`
- Images 2–4: the three approved benchmark inputs above

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic, red faction, static/idle master pose
Primary request: Perform a faction-colorway edit of Image 1 only. Convert the restrained teal faction identification paint/panels on this exact Medic into restrained tactical red. This is not a redesign and not a new pose.
Input images: Image 1 unit_medic_teal.png is the authoritative normalized teal Medic master and must determine every pixel-level geometric property: pose, silhouette, anatomy, stance, scale, centered pivot, canvas occupancy, head, armor, compact medical backpack, attached hand-carried field kit, medical-cross placement, lighting, weathering, and transparent alpha edge. Image 2 bld_skiff.png, Image 3 unit_carrier_teal.png, and Image 4 bld_shipyard_teal.png are mandatory secondary Broodfall style/material benchmarks only.
Required change: recolor only teal faction-identification areas to a restrained weathered red faction color. Preserve gunmetal, dusty taupe, dark rubber, limited off-white medical panels, warm amber micro-lights, and the small universal red medical-cross markings. The medical cross remains red and clearly distinct from the faction panels.
Geometry invariants: preserve the exact static north-facing pose, strict orthographic overhead camera, silhouette, limb and boot positions, torso, backpack, case, hand attachment, proportions, visible height, width, equipment scale, pivot, padding, edge shape, and transparency as tightly as possible. No translation, rotation, crop, rescale, pose change, equipment change, lighting change, or added detail.
Scene/backdrop: true transparent background; no floor, ground, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Style/medium: same grounded semi-realistic weathered Broodfall game sprite as Image 1.
Constraints: exactly one Medic; red faction recolor only; retain all alpha; attached equipment; no new objects; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: changing pose; perspective/isometric change; mirroring; detached gear; chibi/toy anatomy; large white blob; ground; shadow; halo; scenery; blood/gore; text; watermark.
```

## Selected teal walk calls

For each row, the exact submitted prompt was the template below with `<<N>>`
and `<<PHASE>>` replaced verbatim by the values shown. Image 1 was the selected
normalized teal static master; Images 2–4 were the three approved benchmarks.

| Output / final production target | Raw output | N | PHASE |
| --- | --- | ---: | --- |
| `assets/sprites/unit_medic_walk1_teal.png` | `exec-474d2017-b6ec-414d-b994-598de3085db2.png` | 1 | Required pose — frame 1 of 8, LEFT CONTACT: left boot reaches forward/north and makes heel/contact while right boot trails back/south. This is a readable but restrained contact silhouette. Keep the pelvis centered and the planted/contact relationship believable; torso and medical kit remain steady. |
| `assets/sprites/unit_medic_walk2_teal.png` | `exec-b204c773-d7f8-4b02-adfb-e85216a1647f.png` | 2 | Required pose — frame 2 of 8, LEFT COMPRESSION/DOWN: weight settles onto the forward left leg, left knee compresses slightly, right leg begins to unload and recover. Show a subtle lowered/compressed gait phase without moving or scaling the body on canvas; torso, pack, and kit stay steady. |
| `assets/sprites/unit_medic_walk3_teal.png` | `exec-13c35921-4ca9-4a3d-b9af-d1c7d25bad89.png` | 3 | Required pose — frame 3 of 8, LEFT PLANTED / RIGHT PASSING: left foot is firmly planted under/just ahead of the body while the right foot lifts and passes beside it toward the next step. Clear passing pose, centered pelvis, steady torso and equipment. |
| `assets/sprites/unit_medic_walk4_teal.png` | `exec-23f8ee93-7b2f-4483-aec4-7552d4f3b82d.png` | 4 | Required pose — frame 4 of 8, HIGH / RIGHT ADVANCING: the body is at the restrained high point of the gait while the right leg advances forward/north, preparing for contact; left leg extends behind. No canvas bob or scale change; show the high phase only through joint articulation. Loop-friendly and steady above the hips. |
| `assets/sprites/unit_medic_walk5_teal.png` | `exec-4f31a659-4553-4fdc-aef0-54606e0cea0f.png` | 5 | Required pose — frame 5 of 8, RIGHT CONTACT: right boot reaches forward/north and makes heel/contact while left boot trails back/south. This mirrors frame 1's gait logic without mirroring identity details. Keep the pelvis centered and the contact relationship believable; torso and medical kit remain steady. |
| `assets/sprites/unit_medic_walk6_teal.png` | `exec-592f6728-03a9-40bc-8a16-62b69c087230.png` | 6 | Required pose — frame 6 of 8, RIGHT COMPRESSION/DOWN: weight settles onto the forward right leg, right knee compresses slightly, left leg begins to unload and recover. Show a subtle lowered/compressed gait phase without moving or scaling the body on canvas; torso, pack, and kit stay steady. |
| `assets/sprites/unit_medic_walk7_teal.png` | `exec-324d6a56-9313-4405-86da-2d87cfe61617.png` | 7 | Required pose — frame 7 of 8, RIGHT PLANTED / LEFT PASSING: right foot is firmly planted under/just ahead of the body while the left foot lifts and passes beside it toward the next step. Clear passing pose, centered pelvis, steady torso and equipment. |
| `assets/sprites/unit_medic_walk8_teal.png` | `exec-153fdc9b-47d8-47d7-89a5-447099ceea71.png` | 8 | Required pose — frame 8 of 8, HIGH / LEFT ADVANCING, LOOP-READY: the body is at the restrained high point while the left leg advances forward/north, preparing to return seamlessly to frame 1 contact; right leg extends behind. No canvas bob or scale change; show the high phase only through joint articulation. Torso and equipment stay steady. |

Exact submitted teal-walk prompt template:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic, teal faction, 8-frame walk loop
Input images: Image 1 unit_medic_teal.png is the authoritative normalized Medic master for identity, silhouette, scale, centered pivot, equipment, materials, lighting, and alpha treatment. Image 2 bld_skiff.png, Image 3 unit_carrier_teal.png, and Image 4 bld_shipyard_teal.png are mandatory Broodfall human-technology style benchmarks.
Scene/backdrop: genuinely transparent background; no floor, ground, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Subject lock: exactly the same adult north-facing Medic as Image 1, strict orthographic 90-degree overhead, grounded semi-realistic proportions readable at 30×30. Preserve the exact head, gunmetal/dusty-taupe armor, compact medical backpack, attached hand-carried field kit, limited off-white medical identity panels, restrained teal faction IDs, warm amber micro-lights, and small universal red medical-cross marking. No weapon required; all hands and equipment remain attached.
Animation lock: this is one pose from an 8-frame in-place northbound walk loop. Keep torso, head, shoulders, backpack, hand kit, upper-body orientation, visible body height, body mass, equipment scale, lighting, canvas occupancy, and centered pivot as stable as possible. Articulate only the minimum natural hip, knee, boot, and subtle arm counter-motion required for the named gait phase. The body must not translate, rotate, zoom, bob, pulse in scale, or drift on the canvas. Maintain believable planted-foot contact and loop continuity.
Style/medium: grounded semi-realistic painted game sprite with crisp material separation and subtle weathering matching all references.
Composition/framing: one centered full-body subject only, due north at canvas top, generous transparent padding, no crop.
Constraints: true alpha transparency; crisp alpha edge; same size/pivot as Image 1; attached kit/backpack; no gore; no new objects; no lettering, branding, insignia, logos, or symbols except the universal medical cross.
Avoid: perspective/isometric change, camera change, mirrored identity details, detached limbs or gear, giant head, chibi/toy anatomy, spindly form, large white blob, ground, shadow, halo, scenery, blood, text, watermark.
<<PHASE>>
```

## Selected red walk calls

For each row, the exact submitted prompt was the template below with `<<N>>`
replaced by the shown frame number. Image 1 was the matching normalized teal
walk frame; Images 2–4 were the three approved benchmarks.

| Output / final production target | Raw output | N |
| --- | --- | ---: |
| `assets/sprites/unit_medic_walk1_red.png` | `exec-8f257701-3e23-4f0e-b3c0-4e1559dc3fd2.png` | 1 |
| `assets/sprites/unit_medic_walk2_red.png` | `exec-95c6f58e-9fca-4501-b70d-73b6c66aab70.png` | 2 |
| `assets/sprites/unit_medic_walk3_red.png` | `exec-57938520-fa6e-4d84-850b-a4c187f95382.png` | 3 |
| `assets/sprites/unit_medic_walk4_red.png` | `exec-c106de04-80f0-4433-b158-4888332ddd63.png` | 4 |
| `assets/sprites/unit_medic_walk5_red.png` | `exec-3d023a7a-158b-41ae-a3d3-d625dba423ae.png` | 5 |
| `assets/sprites/unit_medic_walk6_red.png` | `exec-4a17093f-77c8-42f5-91d6-9c2ce3bb09ab.png` | 6 |
| `assets/sprites/unit_medic_walk7_red.png` | `exec-35465ea6-c6d8-4ea2-a421-3a94138530e8.png` | 7 |
| `assets/sprites/unit_medic_walk8_red.png` | `exec-b1f0e5e3-f84d-4315-bc4c-c819d9141d8a.png` | 8 |

Exact submitted red-walk prompt template:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic walk frame <<N>> of 8, red faction
Primary request: Perform a faction-colorway edit of Image 1 only. Convert the restrained teal faction identification paint/panels on this exact Medic into restrained tactical red. This is not a redesign and not a new pose.
Input images: Image 1 unit_medic_walk<<N>>_teal.png is the authoritative normalized teal pose and must determine every pixel-level geometric property: pose, silhouette, anatomy, stance, gait phase, scale, centered pivot, canvas occupancy, head, armor, compact medical backpack, attached hand-carried field kit, medical-cross placement, lighting, weathering, and transparent alpha edge. Image 2 bld_skiff.png, Image 3 unit_carrier_teal.png, and Image 4 bld_shipyard_teal.png are mandatory secondary Broodfall style/material benchmarks only.
Required change: recolor only teal faction-identification areas to a restrained weathered red faction color. Preserve gunmetal, dusty taupe, dark rubber, limited off-white medical panels, warm amber micro-lights, and the small universal red medical-cross markings. The medical cross remains red and clearly distinct from the faction panels.
Geometry invariants: preserve the exact walk-frame-<<N>> gait pose, north-facing heading, strict orthographic overhead camera, silhouette, limb and boot positions, torso, backpack, case, hand attachment, proportions, visible height, width, equipment scale, pivot, padding, edge shape, and transparency as tightly as possible. No translation, rotation, crop, rescale, pose change, equipment change, lighting change, or added detail.
Scene/backdrop: true transparent background; no floor, ground, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Style/medium: same grounded semi-realistic weathered Broodfall game sprite as Image 1.
Constraints: exactly one Medic; red faction recolor only; retain all alpha; attached equipment; no new objects; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: changing pose or gait phase; perspective/isometric change; mirroring; detached gear; chibi/toy anatomy; large white blob; ground; shadow; halo; scenery; blood/gore; text; watermark.
```

## Selected teal death calls

### Death frame 1 teal

- Outcome: selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-8d6c0c79-04a6-4fc4-b9ef-888dd9a33064.png`
- Authoritative Image 1: `/tmp/broodfall-phase3-medic/final/unit_medic_teal.png`
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_death1_teal.png`
- Final production target: `assets/sprites/unit_medic_death1_teal.png`
- Images 2–4: the three approved benchmark inputs

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic death animation frame 1 of 4, teal faction
Primary request: Create frame 1 of a four-frame non-gory death/fall animation from the exact Medic master in Image 1: initial impact/stagger, still mostly upright and still north-facing, with a clear but restrained loss-of-balance reaction.
Input images: Image 1 unit_medic_teal.png is the authoritative normalized identity master for anatomy, proportions, face/head, gunmetal and dusty-taupe armor, compact medical backpack, attached hand-carried field kit, limited off-white medical panels, restrained teal IDs, warm amber micro-lights, universal red medical crosses, body scale, centered pivot, lighting, weathering, and alpha treatment. Image 2 bld_skiff.png, Image 3 unit_carrier_teal.png, and Image 4 bld_shipyard_teal.png are mandatory Broodfall human-technology style/material benchmarks.
Scene/backdrop: true transparent background with no ground, floor, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Required pose: initial hit/stagger only. The Medic remains mostly upright with feet still under the body; knees and torso begin to react and the balance line tips subtly sideways/back. Show a readable first beat before collapse, not a walking pose and not already prone. Keep the body centered; no canvas translation or scale pulse.
Identity/equipment lock: same exact adult north-facing Medic, strict orthographic 90-degree overhead, grounded semi-realistic proportions readable at 30×30. Backpack, hand kit, straps, pouches, hands, and all gear remain attached and move naturally with the body. Preserve all role markings and materials. No weapon required.
Style/medium: grounded semi-realistic weathered Broodfall painted game sprite; crisp material separation.
Composition/framing: one complete centered subject, generous transparent padding, no crop; scale and pivot consistent with Image 1 and suitable for a coherent four-frame progression.
Constraints: exactly one Medic; clean true alpha; no detached items; no blood, wounds, gore, smoke, projectile, attacker, or impact effect; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: full collapse or prone pose yet; perspective/isometric camera change; giant head; chibi/toy anatomy; spindly body; large white blob; ground; shadow; halo; scenery; text; watermark.
```

### Death frame 2 teal

- Outcome: selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-fffa16c7-b8f1-483d-aa20-223e839ab67c.png`
- Authoritative inputs: normalized static master as Image 1 and normalized selected death frame 1 as Image 2
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_death2_teal.png`
- Final production target: `assets/sprites/unit_medic_death2_teal.png`
- Images 3–5: the three approved benchmark inputs

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic death animation frame 2 of 4, teal faction
Primary request: Continue the exact non-gory Medic fall from Image 2 into frame 2: knees buckle and balance decisively breaks, progressing naturally from frame 1 while not yet fully prone.
Input images: Image 1 unit_medic_teal.png is the authoritative normalized identity/scale master. Image 2 unit_medic_death1_teal.png is the authoritative immediately preceding pose and must determine continuity of fall direction, identity, equipment, materials, lighting, and alpha treatment. Image 3 bld_skiff.png, Image 4 unit_carrier_teal.png, and Image 5 bld_shipyard_teal.png are all mandatory Broodfall human-technology style/material benchmarks.
Scene/backdrop: true transparent background; no ground, floor, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Required pose: second beat of the same fall. Knees bend/buckle, hips lower, torso tips farther in exactly the direction established by Image 2, and one foot loses stable contact. Clearly more collapsed and broader than frame 1, but not yet horizontal or fully prone. Maintain a coherent anatomical transition, centered pivot, and stable body/equipment scale; do not translate or zoom the whole figure.
Identity/equipment lock: preserve the exact grounded semi-realistic adult Medic from Image 1: strict orthographic 90-degree overhead camera, gunmetal/dusty-taupe armor, compact attached medical backpack, attached hand-carried field kit, limited off-white identity panels, restrained teal IDs, warm amber micro-lights, and universal red medical crosses. All hands, straps, pouches, and equipment remain attached and follow the fall naturally. No weapon required.
Style/medium: same weathered Broodfall painted game sprite with crisp readable materials at 30×30.
Composition/framing: exactly one complete centered subject, generous transparent padding, no crop; coherent four-frame family scale/pivot.
Constraints: clean true alpha; no detached gear; no blood, wounds, gore, smoke, projectile, attacker, or impact effect; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: remaining fully upright; already fully prone; changing fall direction; camera/perspective/isometric change; mirroring identity details; giant head; chibi/toy anatomy; spindly body; large white blob; ground; shadow; halo; scenery; text; watermark.
```

### Death frame 3 teal

- Outcome: selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-d3002dd6-e601-4067-929e-7da20729f8ee.png`
- Authoritative inputs: normalized static master as Image 1 and normalized selected death frame 2 as Image 2
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_death3_teal.png`
- Final production target: `assets/sprites/unit_medic_death3_teal.png`
- Images 3–5: the three approved benchmark inputs

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic death animation frame 3 of 4, teal faction
Primary request: Continue the exact non-gory Medic fall from Image 2 into frame 3: the body is now falling sideways/back into a clearly broader near-ground silhouette, one beat before the final fully prone still pose.
Input images: Image 1 unit_medic_teal.png is the authoritative normalized identity/scale master. Image 2 unit_medic_death2_teal.png is the authoritative immediately preceding pose and must determine continuity of fall direction, identity, equipment, materials, lighting, and alpha treatment. Image 3 bld_skiff.png, Image 4 unit_carrier_teal.png, and Image 5 bld_shipyard_teal.png are all mandatory Broodfall human-technology style/material benchmarks.
Scene/backdrop: true transparent background; no ground, floor, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Required pose: third beat of the same fall. Continue the exact established tilt and collapse direction: hips and torso descend sideways/back, shoulders rotate down, legs extend and splay naturally, producing a substantially broader near-horizontal footprint. The Medic is visibly mid-collapse or just contacting the unseen plane, but is not yet the final settled corpse. Maintain coherent anatomy and continuous motion from Image 2. Preserve stable anatomical/equipment scale and a centered family pivot; do not zoom the body.
Identity/equipment lock: preserve the exact grounded semi-realistic adult Medic from Image 1: strict orthographic 90-degree overhead camera, gunmetal/dusty-taupe armor, compact attached medical backpack, attached hand-carried field kit, limited off-white identity panels, restrained teal IDs, warm amber micro-lights, and universal red medical crosses. All hands, straps, pouches, and equipment remain attached and follow the fall naturally. No weapon required.
Style/medium: same weathered Broodfall painted game sprite with crisp readable materials at 30×30.
Composition/framing: exactly one complete centered subject, generous transparent padding, no crop; broader footprint is expected while body mass and kit scale remain consistent.
Constraints: clean true alpha; no detached gear; no blood, wounds, gore, smoke, projectile, attacker, or impact effect; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: upright or seated-only pose; final perfectly settled prone still pose; changing fall direction; camera/perspective/isometric change; mirroring identity details; giant head; chibi/toy anatomy; spindly body; large white blob; ground; shadow; halo; scenery; text; watermark.
```

### Death frame 4 teal — selected opaque replacement

- Outcome: selected production source; supersedes the translucent initial death-4 teal draft recorded below
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-6df74288-b760-4fc0-a6b3-f415640bf59e.png`
- Authoritative inputs: normalized static master as Image 1 and normalized selected death frame 3 as Image 2
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_death4_teal.png`
- Final production target: `assets/sprites/unit_medic_death4_teal.png`
- Images 3–5: the three approved benchmark inputs

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic death animation frame 4 of 4, teal faction — replacement candidate
Primary request: Create a new final death frame by settling the exact frame-3 Medic in Image 2 only slightly farther onto the same side/back. The result must be a fully prone, motionless final body while preserving the substantial coherent body mass and equipment silhouette of frame 3.
Input images: Image 1 unit_medic_teal.png is the authoritative normalized identity and anatomical-scale master. Image 2 unit_medic_death3_teal.png is the authoritative immediately preceding pose and governs fall direction, body mass, head, limbs, armor, backpack, attached hand case, materials, lighting, and transparency. Images 3 bld_skiff.png, 4 unit_carrier_teal.png, and 5 bld_shipyard_teal.png are all mandatory Broodfall human-technology style/material benchmarks.
Scene/backdrop: genuine transparent background; no ground, floor, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Required pose: final settled fourth beat following Image 2's left-to-right broad fall orientation. Keep the head at image-right, boots at image-left, torso and hips between them, and the same fall side. Lower the remaining bracing upper arm and relax the legs/feet a little so the Medic reads unmistakably still and fully prone. This must be a subtle settling continuation from frame 3, not a newly invented corpse pose. Preserve a solid, readable, compact silhouette with clearly attached limbs and case; avoid making the body unusually narrow or sparse.
Identity/equipment lock: exact grounded semi-realistic adult Medic; strict orthographic 90-degree overhead; gunmetal/dusty-taupe armor; compact attached medical backpack; attached hand-carried medical case; limited off-white medical panels; restrained teal faction IDs; warm amber micro-lights; universal red medical crosses. All hands, straps, pouches, and gear remain attached. No weapon required.
Scale/pivot lock: preserve Image 2's anatomical scale, body thickness, equipment scale, centered pivot, and approximate broad 228-pixel normalized span. Entire complete body safely padded, no crop.
Style/medium: same weathered Broodfall painted game sprite, crisp and readable at 30×30.
Constraints: exactly one Medic; clean true alpha; no blood, wounds, gore, smoke, projectile, attacker, debris, or impact effect; no lettering, branding, logos, insignia, or symbols except the existing medical crosses.
Avoid: upright, seated, kneeling, active bracing, or mid-fall pose; changing fall direction; radically rearranging limbs; thin/skeletal silhouette; camera/perspective/isometric change; mirroring identity; detached gear; giant head; chibi/toy anatomy; large white blob; ground; shadow; halo; scenery; text; watermark.
```

## Selected red death calls

### Death frame 1 red — selected geometry-lock retry

- Outcome: selected production source after the canonical threshold-16 gate; raw alpha IoU `0.95495`, exterior-silhouette IoU `0.95564`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-5d720123-acb7-479f-955d-79d3def025bc.png`
- Authoritative Image 1: `/tmp/broodfall-phase3-medic/final/unit_medic_death1_teal.png`
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_death1_red.png`
- Final production target: `assets/sprites/unit_medic_death1_red.png`
- Images 2–4: the three approved benchmark inputs

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: Broodfall Medic sprite recolor, death1 teal to red
Image roles: Image 1 is the exact local edit target and authoritative geometry. Images 2, 3, and 4 are mandatory secondary Broodfall style references only.
Edit Image 1 in place: change ONLY the small teal faction-color patches to muted weathered red. Preserve every other pixel visually unchanged.
Preserve Image 1 exactly: same 256×256 transparent canvas; same thresholded alpha silhouette; same transparent holes; same pose and fall angle; same head, limbs, boots, torso, backpack, attached hand medical case, straps and pouches; same body thickness; same bounding box, scale, pivot, padding, texture, neutral gunmetal/taupe/off-white colors, amber lights, lighting, medical-cross symbols, and edge antialiasing.
Do not redraw, reinterpret, beautify, restage, straighten, rotate, translate, scale, thicken, thin, mirror, crop, change equipment, change anatomy, or change transparency. Do not add a floor, shadow, halo, scenery, gore, text, logo, watermark, or any new object. Return exactly one Medic on genuine transparency.
```

### Three retry-5 colorways of the translucent death-4 teal — rejected

| Raw output | EMPHASIS | Outcome |
| --- | --- | --- |
| `exec-81608c9a-3ad3-4eef-a86f-56245b2c3617.png` | Treat the source as a finished sprite whose geometry is already perfect. Preserve the exact narrow leg overlaps, arm gaps, and case outline. | rejected; raw IoU `0.83430` |
| `exec-d30860cb-73f2-448a-8ca5-a83c52475c0c.png` | This is a palette swap, not illustration. Lock all foreground and transparent regions to Image 1 and touch only pixels that are visibly teal. | rejected; raw IoU `0.79953` |
| `exec-80acbefe-3d0f-4350-861b-d87366ab58ea.png` | Return a pixel-faithful color variant: identical mask, identical pose, identical equipment and linework; only teal accents become muted red. | rejected; raw IoU `0.83254` |

Each call used the initial, later-rejected normalized teal death-4 sprite as
Image 1 and all three approved benchmarks as Images 2–4. Final target: not
installed.

Exact submitted prompt template:

```text
Use case: precise-object-edit
Asset type: final Broodfall Medic death4 faction palette swap
Primary request: <<EMPHASIS>>
Image 1 is the authoritative normalized teal sprite. Images 2 bld_skiff.png, 3 unit_carrier_teal.png, and 4 bld_shipyard_teal.png are mandatory secondary Broodfall palette/material references only.
Change only restrained teal faction panels in Image 1 to restrained weathered red. Keep neutral gunmetal, dusty taupe, dark rubber, off-white medical panels, amber lights, skin/head, grime, universal red medical crosses, and every other color/material unchanged.
Hard lock Image 1's 256×256 alpha mask and geometry: bbox x14..241 y67..188, horizontal fully prone fall orientation, exact head at right, overlapping boots at left, torso width, backpack, both arms, attached hand medical case below torso, straps, pouches, all internal transparent gaps, centered pivot, padding, antialiased edge, body thickness, scale, lighting, and texture placement. Do not redraw or regenerate any shape.
Exactly one Medic on genuine transparency. No ground, shadow, halo, scenery, blood, gore, text, logo, watermark, detached item, added object, rotation, translation, rescale, crop, thickening, thinning, mirroring, pose change, or camera change.
```

### First red edit of the selected opaque replacement — rejected

- Outcome: rejected; correct identity but exterior/raw IoU `0.92046/0.92040`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-641a256f-971f-4bd6-8cfe-e559d7698c50.png`
- Authoritative Image 1: selected opaque replacement teal death 4
- Images 2–4: all three approved benchmarks
- Final production target: not installed

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production RTS sprite faction recolor, Broodfall Medic death frame 4 of 4, red faction
Primary request: Make the red-faction counterpart of Image 1 by recoloring only its restrained teal faction-identification panels to restrained weathered red. Image 1 is a finished final-prone sprite; this is a palette edit only, not a redesign or pose generation.
Input images: Image 1 unit_medic_death4_teal_retry2.png is the authoritative normalized edit target for every geometric property and alpha pixel. Images 2 bld_skiff.png, 3 unit_carrier_teal.png, and 4 bld_shipyard_teal.png are all mandatory secondary Broodfall material/palette benchmarks only.
Preserve exactly from Image 1: thresholded alpha silhouette and every transparent gap; fully prone settled pose and fall direction; head at image-right, boots at image-left; anatomy, torso, limbs, compact backpack, attached hand medical case below the body, straps and pouches; body thickness, scale, centered pivot, bbox/padding, strict overhead camera, lighting, texture placement, gunmetal, dusty taupe, dark rubber, limited off-white medical panels, amber micro-lights, and universal red medical crosses.
Required change only: teal faction accents become muted tactical red. Medical crosses remain their existing red and all neutral materials stay neutral.
Scene/backdrop: preserve genuine transparency; no ground, floor, scenery, shadow, halo, glow, frame, text, or watermark.
Constraints: exactly one Medic; no redrawing, geometry change, pose drift, rotation, translation, scale change, crop, thickening/thinning, mirroring, detached gear, new detail, blood, gore, logo, or text.
```

### Opaque death-4 colorway retry set

All three calls used the selected opaque replacement teal death 4 as Image 1
and all three approved benchmarks as Images 2–4.

| Raw output | EXTRA | Outcome |
| --- | --- | --- |
| `exec-8950d720-f076-41f8-a990-42d5359f1d71.png` | Lock the outline of the raised upper-side arm, both overlapping boots, the right-edge head, and the lower hand-case exactly. | rejected in favor of a closer sibling; raw/exterior IoU `0.94711/0.95377` |
| `exec-8485db3c-fccb-403b-b023-3091bb8c99e7.png` | Preserve every exterior boundary pixel and every open transparent channel between legs, arms, case, torso, and backpack. | rejected in favor of a closer sibling; raw/exterior IoU `0.95148/0.95148` |
| `exec-efaf6fc0-d061-47d1-aff9-d5de35ce7c90.png` | Do not bulk up, narrow, straighten, or reposition this settled body; retain its exact connected foreground shape and holes. | selected; raw/exterior IoU `0.97956/0.97950` |

Exact submitted prompt template:

```text
Use case: precise-object-edit
Asset type: Broodfall Medic death4 teal-to-red palette edit, normalized production sprite
Primary request: Change ONLY the restrained teal faction accents in Image 1 to restrained weathered red. The source pose and artwork are final. This must be an exact colorway edit, not a regenerated soldier.
Input images: Image 1 unit_medic_death4_teal.png is the authoritative target for geometry, alpha, pose, anatomy, scale, and all equipment. Images 2 bld_skiff.png, 3 unit_carrier_teal.png, and 4 bld_shipyard_teal.png are mandatory secondary style/palette references only.
Non-negotiable geometry: keep Image 1's entire exterior silhouette, all transparent negative spaces, bbox, centered pivot, padding, fully prone left-to-right pose, fall direction, head at image-right, boots at image-left, torso/body thickness, limbs, compact backpack, attached medical case below the body, straps, pouches, strict overhead camera, lighting, texture, and antialiased alpha edge unchanged. <<EXTRA>>
Color invariants: retain all gunmetal, dusty taupe, dark rubber, limited off-white medical panels, warm amber micro-lights, grime, and existing universal red medical crosses. Only teal ID areas become muted tactical red.
Output exactly one Medic on genuine transparency. Do not redraw, restage, rotate, translate, rescale, crop, mirror, thicken, thin, change pose, change equipment, detach anything, add objects/details, add ground/shadow/halo/scenery, add blood/gore, or add text/logo/watermark.
```

### Final death-1 target-improvement retries — rejected

These were generated after the selected death-1 red already cleared the hard
gate, solely to try to exceed the preferred `0.96` exterior target. Neither
improved on the selected result.

| Raw output | EXTRA | Outcome |
| --- | --- | --- |
| `exec-99e3ab63-2095-49c2-8ab1-594516d8932f.png` | Keep the source stagger lean and the exact small left/right outline offsets; do not straighten the torso. | rejected; raw/exterior IoU `0.94385/0.94462` |
| `exec-12230245-6933-4475-ae13-b8458eb2ea54.png` | Lock both boot contours, shoulder widths, tilted head, case silhouette, and open negative spaces exactly to Image 1. | rejected; raw/exterior IoU `0.79896/0.95548`, visible interior/pose drift |

Each call used normalized teal death 1 as Image 1 and all three approved
benchmarks as Images 2–4. Final target: not installed.

Exact submitted prompt template:

```text
Use case: precise-object-edit
Asset type: Broodfall Medic death1 exact teal-to-red faction recolor
Primary request: Recolor only the restrained teal faction-ID patches of Image 1 to restrained weathered red. Image 1 is the final normalized death1 pose; do not redraw it.
Input images: Image 1 unit_medic_death1_teal.png is authoritative for every geometry and alpha property. Images 2 bld_skiff.png, 3 unit_carrier_teal.png, and 4 bld_shipyard_teal.png are all mandatory secondary palette/material references only.
Absolute lock: preserve Image 1's exterior alpha silhouette, internal transparent gaps, initial mostly-upright stagger pose, exact lean/fall direction, strict overhead camera, head, shoulders, torso, limbs, boots, backpack, attached medical case, straps, pouches, body thickness, scale, bbox, centered pivot, padding, edge antialiasing, neutral gunmetal/taupe/rubber/off-white materials, amber lights, grime, lighting, and universal red medical crosses. <<EXTRA>>
Output exactly the same single Medic with teal accents changed to muted tactical red on genuine transparency.
Do not rerender, restage, rotate, translate, rescale, crop, mirror, thicken, thin, straighten, alter equipment/anatomy, add ground/shadow/halo/scenery, add blood/gore, or add text/logo/watermark.
```

## QA summary

- Selected set: 26/26 files, all 256×256 RGBA, alpha extrema `(0, 255)`,
  zero alpha on every canvas edge, and no canvas contact.
- Canonical threshold-16 validator: exterior-silhouette IoU
  `0.95564–0.98580`; raw alpha IoU `0.95495–0.98565`; zero errors.
- Death frame 1 is the only advisory: exterior IoU `0.95564`, above the
  required `0.95` hard floor but below the preferred `0.96` review target.
  Full-size and exact 30×30 visual review confirmed equivalent pose,
  equipment, and gameplay read.
- Walk frames retain one centered northbound pivot and stable torso/backpack/
  field-case placement while advancing through the eight named gait phases.
- Death frames progress from upright stagger to knee collapse, broad fall,
  and an opaque final prone still pose. All kit remains attached; no gore.
- Full-size QA: `image-audit/phases/phase-3/work/medic-family-source.png`.
- Exact 30×30 QA: `image-audit/phases/phase-3/work/medic-family-gameplay.png`.
- Machine-readable QA:
  `image-audit/phases/phase-3/work/medic-family-validation.json`.

### Death frames 2–3 red

For each row, the exact submitted prompt was the template below with `<<N>>`
and `<<POSE>>` replaced verbatim. Image 1 was the matching normalized teal
death frame; Images 2–4 were the three approved benchmarks.

| Output / final production target | Raw output | N | POSE |
| --- | --- | ---: | --- |
| `assets/sprites/unit_medic_death2_red.png` | `exec-f9d80fce-b801-4646-b5b1-6d3fcef7a19c.png` | 2 | knees-buckled balance-breaking collapse |
| `assets/sprites/unit_medic_death3_red.png` | `exec-2291a024-f7ed-4eb1-a42f-36b9c5fd0ad6.png` | 3 | broader sideways/back near-ground fall |

Exact submitted prompt template:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic death frame <<N>> of 4, red faction
Primary request: Perform a faction-colorway edit of Image 1 only. Convert the restrained teal faction identification on this exact <<POSE>> Medic into restrained tactical red. This is not a redesign, rerender, or new pose.
Input images: Image 1 unit_medic_death<<N>>_teal.png is the authoritative normalized edit target and must determine every geometric and temporal property: exact death-frame-<<N>> pose, fall direction, silhouette, anatomy, limb positions, body scale, centered pivot, canvas occupancy, armor, compact medical backpack, attached hand-carried field kit, medical-cross placement, lighting, weathering, and transparent alpha edge. Image 2 bld_skiff.png, Image 3 unit_carrier_teal.png, and Image 4 bld_shipyard_teal.png are all mandatory secondary Broodfall style/material benchmarks only.
Required change: recolor only teal faction-identification paint/panels to restrained weathered red faction color. Preserve gunmetal, dusty taupe, dark rubber, limited off-white medical panels, warm amber micro-lights, and the small universal red medical-cross markings. Medical crosses remain red and distinct.
Geometry invariants: preserve Image 1's exact pose, fall orientation, north-relative direction, strict orthographic overhead camera, silhouette, anatomy, hand/kit attachment, backpack, all equipment, proportions, visible body length/width, pivot, padding, edge shape, and transparency as tightly as possible. No translation, rotation, crop, rescale, pose change, geometry change, equipment change, lighting change, or added detail.
Scene/backdrop: true transparent background; no floor, ground, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Style/medium: same grounded semi-realistic weathered Broodfall painted game sprite as Image 1.
Constraints: exactly one Medic; red faction recolor only; clean true alpha; all equipment attached; no blood, wounds, gore, smoke, attacker, projectile, or impact effect; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: changing death progression or pose; perspective/isometric change; mirroring; detached gear; chibi/toy anatomy; large white blob; ground; shadow; halo; scenery; text; watermark.
```

### Death frame 4 red — selected colorway of opaque replacement

- Outcome: selected production source; raw alpha IoU `0.97956`, exterior-silhouette IoU `0.97950`
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-efaf6fc0-d061-47d1-aff9-d5de35ce7c90.png`
- Authoritative Image 1: the selected normalized opaque replacement at `/tmp/broodfall-phase3-medic/final/unit_medic_death4_teal.png`
- Normalized selected source: `/tmp/broodfall-phase3-medic/final/unit_medic_death4_red.png`
- Final production target: `assets/sprites/unit_medic_death4_red.png`
- Images 2–4: the three approved benchmark inputs

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: Broodfall Medic death4 teal-to-red palette edit, normalized production sprite
Primary request: Change ONLY the restrained teal faction accents in Image 1 to restrained weathered red. The source pose and artwork are final. This must be an exact colorway edit, not a regenerated soldier.
Input images: Image 1 unit_medic_death4_teal.png is the authoritative target for geometry, alpha, pose, anatomy, scale, and all equipment. Images 2 bld_skiff.png, 3 unit_carrier_teal.png, and 4 bld_shipyard_teal.png are mandatory secondary style/palette references only.
Non-negotiable geometry: keep Image 1's entire exterior silhouette, all transparent negative spaces, bbox, centered pivot, padding, fully prone left-to-right pose, fall direction, head at image-right, boots at image-left, torso/body thickness, limbs, compact backpack, attached medical case below the body, straps, pouches, strict overhead camera, lighting, texture, and antialiased alpha edge unchanged. Do not bulk up, narrow, straighten, or reposition this settled body; retain its exact connected foreground shape and holes.
Color invariants: retain all gunmetal, dusty taupe, dark rubber, limited off-white medical panels, warm amber micro-lights, grime, and existing universal red medical crosses. Only teal ID areas become muted tactical red.
Output exactly one Medic on genuine transparency. Do not redraw, restage, rotate, translate, rescale, crop, mirror, thicken, thin, change pose, change equipment, detach anything, add objects/details, add ground/shadow/halo/scenery, add blood/gore, or add text/logo/watermark.
```

## Rejected drafts and exact retry provenance

Every item in this section was staged and inspected but was **not installed**.
Where a template is used, the table gives every placeholder value verbatim;
there was no additional prompt suffix or hidden prompt text.

### Initial death frame 4 teal — rejected for internal translucency

- Outcome: rejected; the full-size checkerboard review revealed body-wide
  translucency/internal-alpha loss even though the exterior pose was usable
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07530-1416-7f01-82eb-6a3182cf1708/exec-b5f6f5e1-76c7-4d40-a460-2963bbcdf5a0.png`
- Final production target: not installed
- References: normalized static master, normalized death frame 3, then all three
  approved benchmarks

Exact submitted prompt:

```text
Use case: precise-object-edit
Asset type: production real-time strategy unit sprite, Broodfall human Medic death animation frame 4 of 4, teal faction
Primary request: Finish the exact non-gory Medic fall from Image 2 in frame 4: a fully prone, completely settled, motionless final body pose with a broad low silhouette suitable for a persistent corpse sprite.
Input images: Image 1 unit_medic_teal.png is the authoritative normalized identity/scale master. Image 2 unit_medic_death3_teal.png is the authoritative immediately preceding pose and must determine continuity of fall direction, final side/back orientation, identity, equipment, materials, lighting, and alpha treatment. Image 3 bld_skiff.png, Image 4 unit_carrier_teal.png, and Image 5 bld_shipyard_teal.png are all mandatory Broodfall human-technology style/material benchmarks.
Scene/backdrop: true transparent background; no visible ground, floor, scenery, cast shadow, halo, vignette, frame, text, or watermark.
Required pose: final fourth beat. Settle the body fully onto its side/back following exactly the direction established by Image 2. Head, torso, hips, and legs lie low and still with a clearly horizontal/broad footprint; limbs rest naturally with no active bracing or walking posture. It must unmistakably read as the final stationary prone pose, not mid-fall. Preserve believable anatomy, stable anatomical/equipment scale, and a centered family pivot; do not enlarge the corpse.
Identity/equipment lock: preserve the exact grounded semi-realistic adult Medic from Image 1: strict orthographic 90-degree overhead camera, gunmetal/dusty-taupe armor, compact attached medical backpack, attached hand-carried field kit, limited off-white identity panels, restrained teal IDs, warm amber micro-lights, and universal red medical crosses. All hands, straps, pouches, and equipment remain attached and settle naturally with the body. No weapon required.
Style/medium: same weathered Broodfall painted game sprite with crisp readable materials at 30×30.
Composition/framing: exactly one complete centered prone subject, generous transparent padding, no crop; broad footprint expected while body mass and kit scale remain coherent with prior frames.
Constraints: clean true alpha; no detached gear; no blood, wounds, gore, smoke, projectile, attacker, debris, or impact effect; no lettering, branding, logos, insignia, or symbols except the existing universal medical crosses.
Avoid: upright, seated, kneeling, or mid-fall pose; changing fall direction; camera/perspective/isometric change; mirroring identity details; giant head; chibi/toy anatomy; spindly body; large white blob; ground; shadow; halo; scenery; text; watermark.
```

### Initial red death calls rejected by the geometry/alpha gate

These used the same exact red-death template recorded in “Death frames 2–3
red,” with the substitutions below.

| Intended output | Raw output | N | POSE | Outcome |
| --- | --- | ---: | --- | --- |
| `unit_medic_death1_red.png` | `exec-b73651be-b8f4-45b0-b9e3-729139d49822.png` | 1 | initial mostly-upright hit/stagger | rejected: raw alpha IoU `0.94936`, below the hard floor |
| `unit_medic_death4_red.png` | `exec-f827f3ce-82ef-41a4-a61a-48be95993ec3.png` | 4 | fully prone settled still body | rejected with the translucent teal draft; raw alpha IoU `0.81991` and visible internal-alpha mismatch |

Final production targets: not installed.

### Geometry-critical retry 2 — rejected

| Intended output | Raw output | N | POSE | BBOX | SPECIAL | Outcome |
| --- | --- | ---: | --- | --- | --- | --- |
| `unit_medic_death1_red.png` | `exec-931c3342-ceae-4b96-ae65-0571eca58711.png` | 1 | initial mostly-upright stagger | `(52,14) through (202,241)` | The stagger tilt, head angle, both boot outlines, left arm contour, right hand-case contour, and every gap between limbs must be identical. | rejected: pose straightened; raw IoU `0.76307` |
| `unit_medic_death4_red.png` | `exec-ae000932-1430-4c80-8fda-18c503e68ed6.png` | 4 | fully prone settled still body | `(14,67) through (241,188)` | The long horizontal outline, exact head circle at image-right, upper back, both boot tips at image-left, narrow arm/torso gaps, field-case outline below the torso, and every transparent negative-space pocket must be identical. | rejected with translucent teal source; raw IoU `0.83293` |

Exact submitted retry-2 prompt template:

```text
Use case: precise-object-edit
Asset type: production RTS sprite faction recolor, Broodfall Medic death frame <<N>> of 4, red faction — geometry-critical retry
Primary request: Recolor Image 1 only. Replace restrained teal faction-ID pixels with restrained weathered red. Do not reinterpret, repaint, rerender, redraw, thicken, thin, clean up, or redesign the subject. The output must look like the same <<POSE>> sprite with only its teal faction accents changed to red.
Input images: Image 1 unit_medic_death<<N>>_teal.png is the sole authoritative target for geometry and alpha. Images 2 bld_skiff.png, 3 unit_carrier_teal.png, and 4 bld_shipyard_teal.png are mandatory secondary material/palette references only and must not influence pose or outline.
NON-NEGOTIABLE ALPHA LOCK: reproduce Image 1's entire foreground-vs-transparent mask as closely as image editing permits. The thresholded-alpha bounding box must remain <<BBOX>> on a 256×256 canvas after normalization. Do not add, remove, expand, contract, smooth, shift, rotate, or restage any opaque region. <<SPECIAL>> Keep every silhouette edge, internal transparent gap, limb overlap, equipment edge, crop, padding, centered pivot, and body scale unchanged.
Required color edit only: teal faction paint/fabric accents become restrained tactical red. Preserve unchanged all gunmetal, dusty taupe, dark rubber, limited off-white medical panels, warm amber micro-lights, skin/head, grime, lighting, and universal red medical crosses. Medical crosses remain their existing red.
Pose/identity invariants: exact death-frame-<<N>> pose and fall direction; exact strict orthographic overhead camera; exact anatomy, head, torso, limbs, boots, compact medical backpack, attached field case, straps, pouches, proportions, lighting, texture placement, and transparent alpha edge from Image 1.
Scene/backdrop: preserve genuine transparency exactly; no ground, floor, scenery, shadow, halo, glow, frame, text, or watermark.
Constraints: exactly one Medic; faction recolor only; no blood/gore; no detached gear; no new objects or details; no lettering, branding, logos, insignia, or symbols except the existing medical crosses.
Avoid: any pose or silhouette drift; thicker/thinner body; changing limb placement; changing equipment size; changing transparent holes; all-red armor; camera/perspective change; mirroring; ground; shadow; halo; scenery; text; watermark.
```

### Retry 3 with prior-red color reference — rejected

| Intended output | Raw output | N | PRIOR-RED | POSE | SPECIAL | Outcome |
| --- | --- | ---: | --- | --- | --- | --- |
| `unit_medic_death1_red.png` | `exec-78ac4836-904e-4abc-b480-cd84d00b2294.png` | 1 | initial rejected red death 1 | initial stagger | The teal target leans toward image-left with head and torso tilted. Keep that exact lean. Do not straighten the body. | rejected: raw IoU `0.94971`, still below hard floor |
| `unit_medic_death4_red.png` | `exec-34e31d0e-bbb4-42f3-be16-176be48635c1.png` | 4 | initial rejected red death 4 | final prone body | Keep the exact narrow teal target silhouette, especially the slim overlapping legs, arm gaps, field case below the torso, and head placement at image-right. Do not bulk up or thicken the figure. | rejected with translucent teal source; raw IoU `0.82466` |

Each call referenced, in order: matching normalized teal, `<<PRIOR-RED>>`, then
all three approved benchmarks. Final targets: not installed.

Exact submitted retry-3 prompt template:

```text
Use case: precise-object-edit
Asset type: geometry-locked faction recolor of Broodfall Medic death frame <<N>>, teal to red
Primary request: Edit Image 1 with one and only one change: turn its small restrained teal faction panels red. Preserve the source image otherwise.
Input images: Image 1 is the authoritative normalized teal death-frame target. Image 2 is a rejected red draft and may be consulted only for the desired muted red hue; never copy its geometry. Images 3 bld_skiff.png, 4 unit_carrier_teal.png, and 5 bld_shipyard_teal.png are mandatory secondary material benchmarks only.
Absolute invariants: keep Image 1's foreground alpha mask, transparent negative spaces, silhouette, <<POSE>> pose, fall direction, camera, head, limbs, boots, torso, compact backpack, hand-held medical case, anatomy, scale, pivot, crop, padding, lighting, texture placement, off-white medical panels, warm amber details, and red medical crosses unchanged. <<SPECIAL>>
Output: the same exact Image 1 with teal ID pixels recolored restrained weathered red. True transparent background. Exactly one Medic.
Do not: redraw, rerender, restage, straighten, rotate, translate, rescale, thicken, thin, mirror, recolor neutral armor, change a medical cross, add ground/shadow/halo/scenery/text/watermark, detach gear, or add gore.
```

### Minimal retry 4

Two calls used the following exact template with `<<N>>` replaced by `1` and
`4`. The death-1 result is the selected production source recorded above.
The death-4 result was rejected with the translucent teal source.

| N | Raw output | Outcome |
| ---: | --- | --- |
| 1 | `exec-5d720123-acb7-479f-955d-79d3def025bc.png` | selected; raw/exterior IoU `0.95495/0.95564` |
| 4 | `exec-f75ff29c-8fdb-47d8-bf4d-3873c4dd54e3.png` | rejected; raw IoU `0.82530` |

Exact submitted prompt template:

```text
Use case: precise-object-edit
Asset type: Broodfall Medic sprite recolor, death<<N>> teal to red
Image roles: Image 1 is the exact local edit target and authoritative geometry. Images 2, 3, and 4 are mandatory secondary Broodfall style references only.
Edit Image 1 in place: change ONLY the small teal faction-color patches to muted weathered red. Preserve every other pixel visually unchanged.
Preserve Image 1 exactly: same 256×256 transparent canvas; same thresholded alpha silhouette; same transparent holes; same pose and fall angle; same head, limbs, boots, torso, backpack, attached hand medical case, straps and pouches; same body thickness; same bounding box, scale, pivot, padding, texture, neutral gunmetal/taupe/off-white colors, amber lights, lighting, medical-cross symbols, and edge antialiasing.
Do not redraw, reinterpret, beautify, restage, straighten, rotate, translate, scale, thicken, thin, mirror, crop, change equipment, change anatomy, or change transparency. Do not add a floor, shadow, halo, scenery, gore, text, logo, watermark, or any new object. Return exactly one Medic on genuine transparency.
```
