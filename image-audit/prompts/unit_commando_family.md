# Boone / Commando infantry family — exact ImageGen prompts and provenance

Status: 13 teal production finals were generated with the built-in ImageGen tool,
normalized with `image-audit/process_generated_sprite.py`, staged outside the
workspace, and installed atomically after visual approval. There is intentionally no red Boone
family. Every production asset has its own distinct ImageGen call; no spritesheet
request or programmatic artwork generation was used.

## Approved benchmark inputs

Every production call included all three approved benchmark files:

1. `assets/sprites/bld_skiff.png`
2. `assets/sprites/unit_carrier_teal.png`
3. `assets/sprites/bld_shipyard_teal.png`

Every walk/death call also included the approved normalized Boone teal master as
Image 1. The two final transparency-correction calls included their corresponding
normalized pose as Image 1, the Boone master as Image 2, and all three benchmarks
as Images 3–5.

Raw built-in outputs are preserved under:
`/Users/bronsongannon/.codex/generated_images/01a0753f-7464-7623-b149-49c00cbb5d6c/`.

Normalized production staging directory:
`/tmp/broodfall-commando.OmrTm7/`.

## Production file and selected-original map

| Production path | Selected generated original | Normalized staging path |
| --- | --- | --- |
| `assets/sprites/unit_commando_teal.png` | `exec-b362e4ef-a675-4b1f-bbdc-c0082191d97d.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_teal.png` |
| `assets/sprites/unit_commando_walk1_teal.png` | `exec-77c8d2ad-7930-4b6a-bba9-69d72e7ff84c.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk1_teal.png` |
| `assets/sprites/unit_commando_walk2_teal.png` | `exec-2e2992eb-6aba-418e-a0d6-6ca077da3204.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk2_teal.png` |
| `assets/sprites/unit_commando_walk3_teal.png` | `exec-ceace82b-7c4e-4f42-95f4-70c28dfd0c4e.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk3_teal.png` |
| `assets/sprites/unit_commando_walk4_teal.png` | `exec-95810e23-5532-4132-bd73-455c3b812a34.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk4_teal.png` |
| `assets/sprites/unit_commando_walk5_teal.png` | `exec-e53d5199-e3ea-430e-9943-faa0e1f734bf.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk5_teal.png` |
| `assets/sprites/unit_commando_walk6_teal.png` | `exec-7d206097-cc46-4907-8f7a-8d9e6acf3bf0.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk6_teal.png` |
| `assets/sprites/unit_commando_walk7_teal.png` | `exec-4ff4d186-f2db-468b-a84d-07a8d4c05b40.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk7_teal.png` |
| `assets/sprites/unit_commando_walk8_teal.png` | `exec-0eabe457-e176-4441-9826-8b3c4df90e60.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_walk8_teal.png` |
| `assets/sprites/unit_commando_death1_teal.png` | `exec-9109c007-1bf6-4f28-a843-ad8ec5490374.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_death1_teal.png` |
| `assets/sprites/unit_commando_death2_teal.png` | `exec-5f053ebc-ea3c-4b4b-a0ad-f95842687d60.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_death2_teal.png` |
| `assets/sprites/unit_commando_death3_teal.png` | `exec-56e95685-eed7-4a7f-92e2-0cfd26df406a.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_death3_teal.png` |
| `assets/sprites/unit_commando_death4_teal.png` | `exec-671092fc-a4c7-4226-b53c-75b1a9150845.png` | `/tmp/broodfall-commando.OmrTm7/unit_commando_death4_teal.png` |

## Teal static base call (rejected first draft)

References, in order: `bld_skiff.png`, `unit_carrier_teal.png`,
`bld_shipyard_teal.png`.

Raw output: `exec-888504ce-757e-4ecb-b532-3d61d7fbdaa8.png`.

Exact submitted prompt:

~~~text
Use case: stylized-concept
Asset type: single production RTS infantry sprite master for Broodfall, one isolated character only
Input images: Image 1 (bld_skiff.png), Image 2 (unit_carrier_teal.png), and Image 3 (bld_shipyard_teal.png) are mandatory approved style, palette, material, weathering, and rendering benchmarks; use all three as visual references, but do not copy their vehicle/building shapes.
Primary request: Create Boone, a veteran special-forces commando, as one complete north-facing teal-faction infantry sprite. Boone must read as clearly heavier, better armored, and more elite than a standard Marine while retaining plausible grounded adult human proportions when rendered at a 32×32 gameplay draw size. Avoid a mascot, bobblehead, chibi, or thin photoreal-human silhouette.
Subject: One intact commando in weathered gunmetal and charcoal heavy tactical armor with muted taupe equipment, restrained teal identification panels, small off-white technical trim, and sparse warm amber micro-lights. Bake a tasteful set of clearly visible gold master-sergeant chevrons into the upper back armor; these chevrons are the sole intentional marking. A compact elite assault rifle is physically held and attached, aligned due north.
Style/medium: grounded semi-realistic pre-rendered RTS game sprite, material language and restrained contrast matching all three supplied Broodfall references; crisp readable silhouette and functional mechanical detail without cartoon outlines.
Composition/framing: exact strict 90-degree orthographic overhead camera, looking straight down with no horizon and no visible side-view perspective; character faces due north (top of canvas); body, head, limbs, rifle, equipment, and chevrons centered on one stable pivot with generous even transparent padding. Natural adult anatomy; head smaller than shoulder span; elite armor adds believable mass without exaggeration.
Lighting/mood: neutral soft studio illumination only on the character, restrained highlights, no dramatic cast light.
Scene/backdrop: genuinely transparent background, isolated sprite only.
Constraints: exactly one character; complete connected subject; rifle remains attached; gold chevrons visibly baked into upper-back armor; production-ready clean alpha; preserve safe padding; readable at 32×32; no translation, no rotation, no cropping.
Avoid: ground, floor, terrain, scenery, cast shadow, contact shadow, ambient shadow blob, halo, aura, smoke, particles, bloom, backdrop, frame, border, text, letters, numerals, logos, watermark, additional people, extra weapons, detached equipment, gore, dinosaurs, perspective tilt, isometric view, side view, cartoon outline, cel shading, mascot proportions, giant head, giant shoulders.
~~~

This valid exploratory render was rejected because Boone's silhouette was not
materially heavier than the Marine family at the exact gameplay draw.

## Teal static breadth/readability pass (selected master)

References, in order: normalized first static draft, `bld_skiff.png`,
`unit_carrier_teal.png`, `bld_shipyard_teal.png`.

Raw output: `exec-b362e4ef-a675-4b1f-bbdc-c0082191d97d.png`.

Exact submitted prompt:

~~~text
Use case: precise-object-edit
Asset type: revised single production RTS infantry sprite master for Broodfall, one isolated character only
Input images: Image 1 is the current normalized Boone commando draft and is the edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are mandatory approved style, palette, material, weathering, and rendering benchmarks; use all three benchmark references while editing, but do not copy their vehicle/building shapes.
Primary request: Keep the same Boone identity, exact strict-overhead due-north orientation, weapon direction, heavy-armor design, gold upper-back master-sergeant chevrons, palette, materials, and transparent isolation. Change only his gameplay silhouette and grounded anatomy: make Boone visibly heavier and more elite than a standard Marine by broadening the connected shoulder/upper-torso armor and stance approximately 20 percent, adding believable lateral armor mass, and separating the boot silhouettes slightly. Shorten the apparent rifle projection only if needed so the armored body occupies more of the total sprite height. He must read as a sturdy adult special-forces commando at a 32×32 draw, not a narrow figure and not a mascot.
Subject: One intact veteran commando in weathered gunmetal and charcoal heavy tactical armor, muted taupe equipment, restrained teal ID panels, small off-white technical trim, sparse warm amber micro-lights, with tasteful clearly visible gold master-sergeant chevrons baked into the upper back. Compact elite assault rifle remains physically held/attached and points due north.
Style/medium: grounded semi-realistic pre-rendered RTS game sprite matching all three supplied Broodfall benchmarks; crisp readable silhouette, subdued contrast, functional detail, no cartoon outline.
Composition/framing: exact strict 90-degree orthographic overhead camera looking straight down, due north at canvas top, no horizon or perspective tilt. Center one complete connected subject on one stable pivot with generous even transparent padding. Target connected opaque silhouette width approximately 55–60 percent of total silhouette height including the rifle. Plausible adult anatomy: head distinctly smaller than shoulder span; armor mass is broad but believable.
Scene/backdrop: genuinely transparent background, isolated sprite only.
Constraints: edit only silhouette breadth/stance and proportional body occupancy; preserve Boone identity, all faction/material details, attached north-pointing rifle, and visible gold chevrons; exactly one character; complete clean alpha; safe padding; no cropping.
Avoid: ground, floor, terrain, scenery, any cast/contact shadow, ambient blob, halo, aura, smoke, particles, bloom, backdrop, frame, border, text, letters, numerals, logos, watermark, additional people, extra weapons, detached equipment, gore, dinosaurs, perspective tilt, isometric view, side view, cartoon/cel shading, giant head, giant shoulders, mascot/chibi proportions.
~~~

## Teal walk calls

For each row, the exact submitted prompt is the template below with `<<LABEL>>`,
`<<REQUEST>>`, and `<<SHORT>>` replaced verbatim by that row's values.

| Output | Raw output | LABEL | REQUEST | SHORT |
| --- | --- | --- | --- | --- |
| `unit_commando_walk1_teal.png` | `exec-77c8d2ad-7930-4b6a-bba9-69d72e7ff84c.png` | walk animation frame 1 of 8 | left-foot contact: the left boot reaches modestly forward/north and has just planted while the right boot trails modestly back/south; use only subtle natural arm counter-motion compatible with the rifle-ready hold | left-contact gait phase |
| `unit_commando_walk2_teal.png` | `exec-2e2992eb-6aba-418e-a0d6-6ca077da3204.png` | walk animation frame 2 of 8 | left-side down/compression: Boone's weight settles onto the planted forward left leg, both knees flex slightly, and the trailing right heel begins to unload | left-side compression gait phase |
| `unit_commando_walk3_teal.png` | `exec-ceace82b-7c4e-4f42-95f4-70c28dfd0c4e.png` | walk animation frame 3 of 8 | left leg planted/right leg passing: the left boot visibly carries weight while the right knee and boot pass close beneath the centerline | left-planted/right-passing gait phase |
| `unit_commando_walk4_teal.png` | `exec-95810e23-5532-4132-bd73-455c3b812a34.png` | walk animation frame 4 of 8 | high point/right advancing: Boone is supported over the planted left foot while the right knee and boot advance modestly north, ready to become the next contact | high-point/right-advancing gait phase |
| `unit_commando_walk5_teal.png` | `exec-e53d5199-e3ea-430e-9943-faa0e1f734bf.png` | walk animation frame 5 of 8 | right-foot contact: the right boot reaches modestly forward/north and has just planted while the left boot trails modestly back/south; this is the complementary half-cycle to frame 1, with only subtle natural arm counter-motion compatible with the rifle-ready hold | right-contact gait phase |
| `unit_commando_walk6_teal.png` | `exec-7d206097-cc46-4907-8f7a-8d9e6acf3bf0.png` | walk animation frame 6 of 8 | right-side down/compression: Boone's weight settles onto the planted forward right leg, both knees flex slightly, and the trailing left heel begins to unload; complementary to frame 2 | right-side compression gait phase |
| `unit_commando_walk7_teal.png` | `exec-4ff4d186-f2db-468b-a84d-07a8d4c05b40.png` | walk animation frame 7 of 8 | right leg planted/left leg passing: the right boot visibly carries weight while the left knee and boot pass close beneath the centerline; complementary to frame 3 | right-planted/left-passing gait phase |
| `unit_commando_walk8_teal.png` | `exec-0eabe457-e176-4441-9826-8b3c4df90e60.png` | walk animation frame 8 of 8 | high point/left advancing: Boone is supported over the planted right foot while the left knee and boot advance modestly north; complementary to frame 4 and spatially loop-ready into the left contact of frame 1 | high-point/left-advancing loop-ready gait phase |

Exact teal walk prompt template:

~~~text
Use case: precise-object-edit
Asset type: production Broodfall RTS Boone commando <<LABEL>>
Input images: Image 1 is the approved normalized Boone teal master and is authoritative for identity, exact strict-overhead camera, due-north orientation, adult proportions, heavy armor design, physical scale, center pivot, silhouette density, palette, material finish, attached rifle, gold chevrons, and alpha. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are all mandatory approved Broodfall benchmarks for weathered gunmetal/taupe material, restrained teal/amber/off-white accents, strict 90-degree plan-view discipline, and industrial rendering quality; use all three only as secondary style constraints and never introduce vehicle/building parts.
Primary request: Starting from Image 1, create only this exact planted gait pose — <<REQUEST>>. This is one distinct animation frame, never a spritesheet.
Subject: the identical veteran special-forces commando Boone, clearly heavier and more elite than a Marine yet plausibly adult, in weathered charcoal/gunmetal and muted taupe heavy armor, restrained teal ID panels, off-white technical trim, sparse amber micro-lights, and the same compact elite assault rifle. The tasteful gold master-sergeant chevrons stay baked on the upper back in the same place and remain visible.
Style/medium: identical grounded semi-realistic pre-rendered RTS sprite, crisp and coherent at a 32×32 gameplay draw.
Composition/framing: exact strict 90-degree orthographic overhead view, zero perspective, head and rifle pointing due north; keep the complete body centered on precisely the master pivot, at precisely the same physical scale and canvas occupancy, with generous transparent padding.
Constraints: change only legs and the minimum necessary lower-body articulation to express the <<SHORT>>; keep helmet, shoulders, torso, upper-back armor, backpack, chevrons, rifle geometry and due-north axis rock-steady; boots must plant/read clearly without overall translation, rotation, zoom, vertical bob, or scale pulse; preserve body mass, connected anatomy, armor/equipment, palette, lighting, texture, alpha, and safe padding; exactly one intact character; genuine transparent background.
Avoid: torso sway, weapon swing, chevron movement or duplication, gait exaggeration, running, sliding feet, geometry redesign, giant/small body, vehicle/building parts, detached rifle or gear, extra weapons, duplicate limbs, ground, floor, shadow, halo, aura, scenery, smoke, particles, text, letters, numerals, logos, watermark, border, sprite sheet, extra figure, gore, dinosaurs, oblique/frontal/isometric view, chibi anatomy.
~~~

## Teal death pose calls

For each row, the exact submitted prompt is the template below with `<<LABEL>>`,
`<<REQUEST>>`, `<<READ>>`, and `<<EXTRA>>` replaced verbatim by that row's values.
Death 3 and 4 then received the separately recorded alpha-only correction calls.

| Pose | Initial raw output | LABEL | REQUEST | READ | EXTRA |
| --- | --- | --- | --- | --- | --- |
| `unit_commando_death1_teal.png` | `exec-9109c007-1bf6-4f28-a843-ad8ec5490374.png` | death animation frame 1 of 4 | the first instant of the death sequence: a sharp hit/stagger while still mostly upright. Knees soften, the heavy torso twists only slightly, one shoulder recoils, and the rifle remains held/attached but is knocked subtly off its ready line | initial impact/stagger, visibly earlier than collapse | already-prone pose, broad final corpse |
| `unit_commando_death2_teal.png` | `exec-5f053ebc-ea3c-4b4b-a0ad-f95842687d60.png` | death animation frame 2 of 4 | the second death phase: knees buckle and balance visibly breaks. From directly overhead, Boone's heavy body compresses and lists modestly toward screen-right while both knees bend; the rifle slips diagonally across the upper body but remains held and attached | knee collapse and loss of balance, later than frame 1 and earlier than a full fall | fully upright pose, fully prone final pose |
| `unit_commando_death3_teal.png` | `exec-afaf1d27-4cc5-4449-ba1c-c5854f26a899.png` | death animation frame 3 of 4 | the third death phase: actively falling sideways/back toward screen-right, heavy armored body close to the ground and footprint noticeably broader than standing. Helmet and upper torso tip right, hips and bent legs trail left/down, and the rifle lies diagonally across or immediately beside the body while still held/attached | dynamic near-ground sideways/back fall, significantly broader than standing and not yet the final still corpse | standing pose, final rigid corpse |
| `unit_commando_death4_teal.png` | `exec-9097cc22-2855-4b1e-95f3-aab264f18d28.png` | death animation frame 4 of 4 | the final death pose: fully prone, motionless, and settled as seen directly overhead, lying diagonally toward screen-right with a broad low footprint. Legs are slack and slightly bent; arms and attached rifle rest naturally against the armored body | fully prone unmistakably still final pose, broader and lower than frame 3 | upright or kneeling pose, active motion |

Exact teal death prompt template:

~~~text
Use case: precise-object-edit
Asset type: production Broodfall RTS Boone commando <<LABEL>>
Input images: Image 1 is the approved normalized Boone teal master and is authoritative for identity, exact strict-overhead camera, adult proportions, heavy armor design, physical scale, center pivot, silhouette density, palette, material finish, attached rifle, gold chevrons, and alpha. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are all mandatory approved Broodfall benchmarks for weathered gunmetal/taupe material, restrained teal/amber/off-white accents, strict 90-degree plan-view discipline, and industrial rendering quality; use all three only as secondary style constraints and never introduce vehicle/building parts.
Primary request: Transform the same Boone from Image 1 into <<REQUEST>>. This is one distinct animation frame, never a spritesheet.
Subject: the identical veteran special-forces commando Boone, clearly heavier and more elite than a Marine yet plausibly adult, in weathered charcoal/gunmetal and muted taupe heavy armor, restrained teal ID panels, off-white technical trim, sparse amber micro-lights, and the same compact elite assault rifle. Keep the tasteful gold master-sergeant chevrons baked into the same upper-back armor and visible wherever physically exposed by this pose.
Style/medium: identical grounded semi-realistic pre-rendered RTS sprite, crisp and coherent at a 32×32 gameplay draw.
Composition/framing: exact strict 90-degree orthographic overhead view, zero perspective; keep the body's gameplay center on precisely the master pivot and preserve the same physical body scale while allowing only the pose's natural wider footprint; fit the whole intact body, rifle, and gear with generous transparent padding.
Constraints: pose must clearly read as <<READ>>; preserve Boone identity, body mass, armor/equipment design, chevrons, signature color placement, materials, palette, lighting, camera, connected anatomy, and physical scale; rifle and every piece of gear remain physically attached/in hand; exactly one complete character; genuine transparent background; no gore.
Avoid: vehicle/building parts, <<EXTRA>>, blood, gore, wounds, dismemberment, detached rifle, detached gear, extra weapons, duplicated body or limbs, giant/small body, off-center crop, perspective, oblique/frontal/isometric view, ground, floor, shadow, halo, aura, scenery, smoke, particles, text, letters, numerals, logos, watermark, border, sprite sheet, extra figure, dinosaurs, chibi anatomy.
~~~

## Death 3/4 transparency correction calls (selected finals)

The initial pose calls above captured the intended progression but retained a faint
contact-shadow fringe. They were rejected as production finals. The following two
distinct built-in calls removed the fringe; their outputs are the selected originals.

| Output | Selected raw output | POSE |
| --- | --- | --- |
| `unit_commando_death3_teal.png` | `exec-56e95685-eed7-4a7f-92e2-0cfd26df406a.png` | active sideways/back near-ground fall |
| `unit_commando_death4_teal.png` | `exec-671092fc-a4c7-4226-b53c-75b1a9150845.png` | fully prone motionless final pose |

For each row, Image 1 was the normalized initial pose, Image 2 the approved
normalized Boone master, and Images 3–5 the three approved benchmarks. The exact
submitted prompt was this template with `<<NAME>>` and `<<POSE>>` replaced by the
row values (`death3` / `death4` for `<<NAME>>`).

~~~text
Use case: background-extraction
Asset type: production Broodfall RTS Boone commando <<NAME>> transparency correction
Input images: Image 1 is the exact normalized <<NAME>> pose to clean and is authoritative for every silhouette boundary, limb and weapon position, armor detail, chevrons, scale, center, and color. Image 2 is the approved normalized Boone teal master and is mandatory for identity, heavy armor design, physical scale, palette, attached rifle, and gold-chevrons consistency. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are all mandatory approved Broodfall benchmarks for weathered materials, restrained accents, exact strict-overhead plan view, and clean isolated production rendering; use all three as secondary references without introducing vehicle/building parts.
Primary request: Remove only the faint pale/gray contact-shadow, floor haze, and translucent halo around or beneath Image 1's character. Return the identical <<POSE>> on genuinely empty transparent alpha. Do not redraw, reinterpret, move, rotate, resize, recolor, or alter the character.
Subject: preserve the exact same intact veteran special-forces commando Boone, weathered gunmetal/charcoal and muted taupe heavy armor, restrained teal ID, off-white trim, amber micro-lights, visible gold master-sergeant chevrons, and physically attached compact assault rifle.
Composition/framing: preserve Image 1's exact strict 90-degree orthographic overhead camera, pose, placement, canvas occupancy, center pivot, physical scale, and safe padding.
Constraints: change background alpha only; keep all actual character pixels, silhouette geometry, connected anatomy, rifle, equipment, chevrons, lighting, texture, and colors as close to pixel-identical as possible; exactly one character; background must be fully transparent right up to the normal antialiased character edge.
Avoid: any ground, floor, cast shadow, contact shadow, pale shadow, gray haze, white outline, halo, aura, glow, backdrop, scenery, particles, geometry change, pose change, translation, rotation, crop, zoom, redesign, extra limbs, detached rifle or gear, text, letters, numerals, logos, watermark, border, sprite sheet, extra figure, gore, dinosaurs.
~~~

## Normalization and QA

Every selected raw output was normalized independently with:

~~~text
python3 image-audit/process_generated_sprite.py RAW_OUTPUT NORMALIZED_OUTPUT --canvas 256x256 --padding 14
~~~

Final work artifacts:

- `image-audit/phases/phase-3/work/commando-family-source.png`
- `image-audit/phases/phase-3/work/commando-family-gameplay.png`
- `image-audit/phases/phase-3/work/commando-family-validation.json`

Final staged-family validation:

- 13/13 expected files are present, 256×256 RGBA, with alpha extrema `(0, 255)`.
- Maximum alpha on all four canvas edges is `0` for every file.
- Static plus all eight walk frames have threshold-16 bounding-box centers at x
  `127.5–128.0`, y exactly `128.0`, and height exactly `228` px; width varies only
  `95–107` px as the feet alternate.
- Every threshold-16 subject is one connected component; minimum largest-component
  share is `1.0`.
- Full/source and exact 32-pixel sheets were visually inspected: the torso, backpack,
  rifle axis, scale, and gold chevrons remain anchored; walk contacts alternate without
  translation or scale pulsing; death progresses from impact through knee collapse,
  broad near-ground fall, and fully prone stillness; no residual contact shadow or
  halo remains in the selected death 3/4 finals.

Rejected drafts are preserved outside the workspace in the staging directory and
were never installed. This includes the narrow initial static draft and the initial
death 3/4 pose outputs with faint contact-shadow fringe.
