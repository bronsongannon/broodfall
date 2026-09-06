# Engineer infantry family prompt record

- Generation mode: built-in ImageGen only.
- Deliverables: 26 individually generated production finals — teal and red static, walk1–walk8, and death1–death4.
- Approved benchmarks supplied to every selected production call: `assets/sprites/bld_skiff.png`, `assets/sprites/unit_carrier_teal.png`, and `assets/sprites/bld_shipyard_teal.png`.
- Teal pose calls use the normalized static Engineer as authoritative identity/scale reference and, after frame 1, the preceding normalized teal pose as continuity reference. Red calls use the corresponding normalized teal pose as authoritative geometry plus all three benchmarks as secondary style references.
- Every output was normalized independently with `python3 image-audit/process_generated_sprite.py ORIGINAL FINAL --canvas 256x256 --padding 14`; proportional fit and alpha cleanup only, never hand-drawn or programmatically authored art.
- The family remained outside `assets/sprites/` until all 26 finals passed QA, then was copied as one atomic family batch.

## Selected production calls

### Expedition / teal — static identity master

- Built-in ImageGen mode: generate with all three approved benchmarks
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-4e3edb73-2d16-4d01-8854-1049f8125da1.png`
- Final: `assets/sprites/unit_engineer_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_teal.png --canvas 256x256 --padding 14`

```text
Use case: stylized-concept
Asset type: production RTS human-infantry unit sprite, Engineer static idle frame
Primary request: Create one single north-facing field Engineer viewed from a strict 90-degree orthographic overhead camera. This is the locked identity and scale master for a 13-pose animation family. The signature silhouette must unmistakably read as Engineer through BOTH a recognizable brimmed hard hat and a large recognizable open-ended repair wrench carried along the soldier's right side.
Input images: Image 1 (bld_skiff.png) is the primary material, weathering, palette, and rendering reference; Image 2 (unit_carrier_teal.png) is the strict overhead vehicle/readability reference; Image 3 (bld_shipyard_teal.png) is the industrial detail and restrained faction-color reference. Do not copy their shapes.
Scene/backdrop: None. Genuine transparent background only.
Subject: One human military field Engineer in a balanced idle stance, facing due north. Grounded adult human anatomy with a clearly readable industrial hard hat: low domed crown, longitudinal crown ridges, and a distinct projecting brim visible from overhead. Weathered gunmetal and dusty taupe work armor, restrained teal faction panels, tiny amber micro-lights, compact tool harness/backpack, and one large open-ended steel wrench held close alongside the right forearm with its crescent/open jaw clearly visible. No firearm. The engineer must have a sturdy technical silhouette distinct from a Marine while remaining clearly military. Show both legs and arms as believable overhead forms.
Style/medium: grounded semi-realistic painted game sprite; crisp controlled edges and material detail that survive reduction to 24–32 pixels; visually consistent with the three reference assets.
Composition/framing: subject centered on a square canvas; strict 90-degree bird's-eye orthographic projection; hard-hat brim/head points exactly north/up; fixed pivot at exact canvas center; generous and even transparent padding on every edge; occupy roughly 64% of canvas height and 42% width so all later poses fit safely.
Lighting/mood: neutral soft overhead illumination; functional, worn battlefield engineering equipment.
Color palette: weathered dark gunmetal, muted dusty taupe, restrained dark teal accents only, sparse amber micro-lights. Keep hard hat industrial taupe/gunmetal with restrained teal paneling, not bright construction yellow.
Materials/textures: scratched painted armor, brushed steel joints and wrench, rugged fabric, compact industrial tools; no glossy toy plastic.
Constraints: one soldier only; hard hat and open-ended wrench are mandatory and visibly recognizable; complete isolated body; true alpha transparency; no cast shadow or ambient blob; no ground plane; no crop; no edge contact; no perspective tilt; no rotation away from north; no text, letters, numbers, insignia, logo, watermark, scenery, particles, weapons fire, people, creatures, or props separate from the soldier. Preserve plausible human proportions and readable body mass. This exact body, hard hat, backpack, wrench geometry, scale, and pivot will be reused unchanged across animation frames.
Avoid: generic combat helmet, carbine, rifle, gun, tool arm replacing the wrench, hidden wrench jaw, chibi, bobblehead, oversized head, cartoon mascot, overly thin limbs, front-facing camera, three-quarter camera, isometric view, foreshortened vehicle-like perspective, side view, painterly background, floor texture, circular base, shadow, glow halo, UI icon frame, sprite sheet, montage, multiple poses.
```

### Rubicon / red — static counterpart

- Built-in ImageGen mode: precise image-to-image recolor; normalized teal authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-eba1620b-23e9-4b96-9361-e2627151760f.png`
- Final: `assets/sprites/unit_engineer_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry unit sprite, Engineer static idle red faction counterpart
Primary request: Edit Image 1, the supplied normalized teal Engineer static sprite, into the red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact normalized teal Engineer static frame and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep this exact same north-facing field Engineer, recognizable brimmed/ridged hard hat, recognizable open-ended wrench, body, armor, backpack, stance, pose, scale, framing, pivot, and all material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted rendering and edge detail exactly, consistent with the benchmark references.
Composition/framing: preserve the strict 90-degree orthographic overhead view, exact silhouette, exact geometry, exact subject position, exact transparent padding, and canvas occupancy.
Lighting/mood: preserve unchanged.
Color palette: recolor only the restrained teal faction panels and teal indicator accents to restrained dark military red/crimson. Keep weathered gunmetal, dusty taupe, steel wrench, black, amber micro-lights, highlights, shadows, and every non-teal pixel visually unchanged.
Constraints: faction recolor only; do not redraw, redesign, move, rotate, scale, crop, thicken, thin, or change any body part, hard-hat part, wrench part, equipment part, edge, pose, lighting, material, alpha boundary, or transparent region; one soldier only; true alpha; no ground, cast shadow, ambient blob, text, logo, insignia, watermark, scenery, extra props, or effects.
Avoid: new details, generic helmet, missing hard-hat brim, altered anatomy, altered wrench shape or open jaw, altered backpack, changed stance, changed silhouette, changed pixel footprint, orange/pink/purple accents, broad red wash, background, shadow, sprite sheet, montage.
```

### Expedition / teal — walk 1 (left contact)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-9c101209-befb-4908-b909-4a324775e700.png`
- Final: `assets/sprites/unit_engineer_walk1_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk1_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 1 of 8
Primary request: Using Image 1, the exact normalized static teal Engineer, as the authoritative identity and geometry master, create only walk-cycle frame 1: left-foot contact. Pose the left boot modestly forward toward north/up and the right boot modestly back toward south/down at first ground contact.
Input images: Image 1 is the authoritative normalized teal Engineer static master and pose-edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for material finish, industrial weathering, palette discipline, and strict overhead readability only; do not copy their shapes.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed, crown-ridged, projecting-brim hard hat and the same large open-ended steel wrench held close along the right forearm. Same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, texture, palette, lighting, and crisp edges, consistent with the secondary references.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; same overall scale and occupancy as Image 1; generous transparent padding.
Pose specification: gait phase 1 of 8 — left heel/boot reaches forward and contacts, right leg extends back; tiny natural counter-swing in shoulders/arms only; torso, hard hat, backpack, and wrench remain stable, centered, and north-facing. Walking, not running.
Constraints: change only limb articulation needed for this gait phase; preserve identity and every fixed equipment design; one complete isolated soldier; hard hat and wrench remain unmistakable; no translation, rotation, scale pulse, perspective change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, muzzle flash, extra props, sprite sheet, montage, or multiple poses; true alpha transparency.
Avoid: chibi/head-heavy anatomy, thin limbs, generic helmet, firearm, missing/closed wrench jaw, diagonal travel, side view, isometric angle, exaggerated stride, hopping, running, motion blur, floor, halo.
```

### Rubicon / red — walk 1

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-7f060904-ec17-4500-be93-8aca20f7237d.png`
- Final: `assets/sprites/unit_engineer_walk1_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk1_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 1 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 1, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact normalized teal Engineer walk frame 1 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in left-foot-contact pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 2 (left compression)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-7d2b4329-4264-4dd6-a0c5-c997d2b29f9a.png`
- Final: `assets/sprites/unit_engineer_walk2_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk2_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 2 of 8
Primary request: Create walk-cycle frame 2, the left-side down/compression phase, while preserving the exact Engineer identity and fixed sprite geometry.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 1 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 2 of 8 — weight settles onto the forward left leg after contact, left knee flexes slightly in subtle down/compression, right leg begins unloading from its rear position. Advance naturally from Image 2. Torso, hard hat, backpack, and wrench stay stable, centered, and north-facing; no vertical scale squash.
Constraints: change only limb articulation required for this gait phase; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; one complete isolated soldier; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, exaggerated crouch, running, hopping, diagonal travel, torso bob, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 2

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-de7a1b6c-3f4a-4dd2-91b8-81636d4e79eb.png`
- Final: `assets/sprites/unit_engineer_walk2_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk2_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 2 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 2, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 2 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in left down/compression pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 3 (right passing)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-d19ea456-32a0-4883-af1d-f0aeb46c087f.png`
- Final: `assets/sprites/unit_engineer_walk3_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk3_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 3 of 8
Primary request: Create walk-cycle frame 3, the left-planted/right-passing phase, while preserving the exact Engineer identity and fixed sprite geometry.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 2 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 3 of 8 — left foot remains planted under load while right foot lifts and passes inward alongside it, right knee bending naturally. Advance smoothly from Image 2. Torso, hard hat, backpack, and wrench stay stable, centered, and north-facing; feet remain plausibly connected to a planted walk.
Constraints: change only limb articulation required for this gait phase; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; one complete isolated soldier; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, both feet airborne, running, hopping, diagonal travel, torso bob, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 3

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-5d1886b5-4e67-4c25-b1d0-b2f48ab34389.png`
- Final: `assets/sprites/unit_engineer_walk3_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk3_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 3 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 3, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 3 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in left-planted/right-passing pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 4 (right advancing)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-1b17e463-d30b-437f-8a05-0dddce9027d4.png`
- Final: `assets/sprites/unit_engineer_walk4_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk4_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 4 of 8
Primary request: Create walk-cycle frame 4, the high-point/right-advancing phase, while preserving the exact Engineer identity and fixed sprite geometry.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 3 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 4 of 8 — body reaches a subtle high point over planted left foot while right knee and boot advance north/up toward next contact. Advance smoothly from Image 2. Torso, hard hat, backpack, and wrench stay stable, centered, and north-facing; do not enlarge or vertically translate the sprite.
Constraints: change only limb articulation required for this gait phase; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; one complete isolated soldier; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, both feet airborne, running, hopping, diagonal travel, torso bob, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 4

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-278e1ecb-3d53-4574-8909-00153542cb12.png`
- Final: `assets/sprites/unit_engineer_walk4_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk4_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 4 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 4, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 4 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in high-point/right-advancing pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 5 (right contact)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-19938a48-7917-435a-aabd-f8f3f76ccf01.png`
- Final: `assets/sprites/unit_engineer_walk5_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk5_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 5 of 8
Primary request: Create walk-cycle frame 5, the opposite right-foot contact phase, while preserving the exact Engineer identity and fixed sprite geometry.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 4 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 5 of 8 — right heel/boot reaches forward toward north/up and contacts while left leg extends back toward south/down, the precise opposite of frame 1. Tiny natural counter-swing only. Torso, hard hat, backpack, and wrench remain stable, centered, and north-facing. This is a planted walk, not running.
Constraints: change only limb articulation required for this gait phase; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; one complete isolated soldier; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, repeating left-foot contact, both feet airborne, running, hopping, diagonal travel, torso bob, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 5

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-2857e1b0-15c4-43f5-bf9c-75eed6be60ba.png`
- Final: `assets/sprites/unit_engineer_walk5_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk5_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 5 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 5, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 5 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in opposite right-foot-contact pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 6 (right compression)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-b81e0162-1469-4178-a740-7f3f61e731d9.png`
- Final: `assets/sprites/unit_engineer_walk6_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk6_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 6 of 8
Primary request: Create walk-cycle frame 6, the right-side down/compression phase, while preserving the exact Engineer identity and fixed sprite geometry.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 5 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 6 of 8 — weight settles onto forward right leg after contact, right knee flexes slightly in subtle down/compression, left leg begins unloading from rear. Exact opposite-side complement of frame 2; advance naturally from Image 2. Torso, hard hat, backpack, and wrench stay stable, centered, north-facing; no vertical scale squash.
Constraints: change only limb articulation required for this gait phase; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; one complete isolated soldier; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, exaggerated crouch, running, hopping, diagonal travel, torso bob, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 6

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-6ff0d0cf-ed1d-4240-ba6a-bacb8d3cd829.png`
- Final: `assets/sprites/unit_engineer_walk6_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk6_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 6 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 6, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 6 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in right down/compression pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 7 (left passing)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-ca675dd7-2fcf-4292-bd96-7c6707b0b540.png`
- Final: `assets/sprites/unit_engineer_walk7_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk7_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 7 of 8
Primary request: Create walk-cycle frame 7, the right-planted/left-passing phase, while preserving the exact Engineer identity and fixed sprite geometry.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 6 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 7 of 8 — right foot remains planted under load while left foot lifts and passes inward alongside it, left knee bending naturally. Exact opposite-side complement of frame 3; advance smoothly from Image 2. Torso, hard hat, backpack, and wrench stay stable, centered, north-facing; maintain believable ground contact.
Constraints: change only limb articulation required for this gait phase; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; one complete isolated soldier; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, both feet airborne, running, hopping, diagonal travel, torso bob, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 7

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-f0363a14-42b3-4521-893d-fc84ddb12bd4.png`
- Final: `assets/sprites/unit_engineer_walk7_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk7_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 7 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer walk frame 7, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 7 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same north-facing Engineer in right-planted/left-passing pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; one soldier; true alpha; no ground, shadow, text, logo, scenery, effects, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail.
```

### Expedition / teal — walk 8 (left advancing, clean final)

- Built-in ImageGen mode: precise pose edit; normalized teal master/previous pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-bee6397e-7254-4456-8919-bf4e227b1aec.png`
- Final: `assets/sprites/unit_engineer_walk8_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk8_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 8 of 8, clean final
Primary request: Create walk-cycle frame 8, the high-point/left-advancing loop-closure phase, while preserving the exact Engineer identity and fixed sprite geometry. Output a clean isolated sprite with zero detached pixels or debris.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is corrected normalized teal walk frame 7 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine fully transparent background only, completely empty beyond the connected soldier silhouette.
Subject: The identical north-facing field Engineer with the same recognizable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench held close along the right forearm, same weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, textures, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; face exactly north/up; exact canvas-center pivot; fixed scale and occupancy matching Image 1 and Image 2; generous transparent padding.
Pose specification: gait phase 8 of 8 — body reaches subtle high point over planted right foot while left knee and boot advance north/up toward next left-foot contact. Exact opposite-side complement of frame 4; advance smoothly from Image 2 and finish loop-ready so frame 1 follows without a jump. Torso, hard hat, backpack, and wrench remain stable, centered, north-facing; no sprite translation.
Constraints: change only limb articulation required; preserve identity and fixed equipment; hard hat and wrench remain unmistakable; exactly one complete connected isolated soldier silhouette; all pixels outside the soldier/equipment silhouette fully transparent; no detached pixels, dust, flecks, debris, fragments, dots, particles, or artifacts anywhere; no translation, rotation, scale pulse, camera change, body/tool size change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, motion blur, sprite sheet, montage, or multiple poses; true alpha.
Avoid: stray pixels, detached marks, chibi, generic helmet, firearm, missing wrench jaw, both feet airborne, running, hopping, diagonal travel, torso bob, loop discontinuity, isometric or side view, background, floor, halo.
```

### Rubicon / red — walk 8

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-68ba7509-c3de-4dde-b20d-29a64d4cfa6f.png`
- Final: `assets/sprites/unit_engineer_walk8_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_walk8_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry animation sprite, Engineer walk frame 8 of 8, red faction counterpart
Primary request: Edit Image 1, the exact normalized clean-final teal Engineer walk frame 8, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact corrected normalized teal Engineer walk frame 8 and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly, empty beyond the soldier silhouette.
Subject: Keep the exact same north-facing Engineer in high-point/left-advancing loop-ready pose, with the same recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, exact geometry, exact pose, exact position, exact transparent padding, and canvas occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, gait, equipment, lighting, alpha boundary, or transparent region; exactly one connected soldier; no detached pixels, dust, flecks, debris, fragments, dots, particles, ground, shadow, text, logo, scenery, effects, sprite sheet, or montage; true alpha.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, background, extra detail, stray pixels.
```

### Expedition / teal — death 1 (initial stagger)

- Built-in ImageGen mode: precise pose edit; normalized teal static master authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-4a7d863e-16d4-42b2-bcd5-1d4d0f2ad82a.png`
- Final: `assets/sprites/unit_engineer_death1_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death1_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 1 of 4
Primary request: Create death-animation frame 1, an initial impact stagger while still mostly upright, preserving the exact Engineer identity and equipment.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical north-facing field Engineer with the same unmistakable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench, weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, texture, palette, lighting, and crisp edges, consistent with the secondary references.
Composition/framing: strict 90-degree orthographic overhead; still generally facing north/up; exact canvas-center pivot; same scale and body mass as Image 1; generous transparent padding that anticipates later wider fall poses.
Pose specification: death phase 1 of 4 — sudden impact makes the upper torso recoil and cant slightly toward the Engineer's left, shoulders tense, one knee begins to give, but the soldier remains substantially upright/on both feet. The wrench is still gripped and angles only slightly outward; hard hat remains on the head and clearly readable. It must visibly begin a fall without looking dead/prone yet.
Constraints: change only pose articulation required for the initial stagger; preserve identity, hard hat, wrench, backpack, armor, scale, and pivot; one complete connected isolated soldier; non-gory; no blood, wound detail, dismemberment, detached equipment, detached pixels, translation, scale pulse, camera change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, muzzle flash, sprite sheet, montage, or multiple poses; true alpha.
Avoid: chibi, generic helmet, firearm, missing wrench jaw, already-prone pose, dramatic sideways collapse, explosive motion, gore, severed parts, diagonal camera, isometric/side view, background, floor, halo.
```

### Rubicon / red — death 1

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-b270ea12-9b60-46b4-abcd-f0ecee79d624.png`
- Final: `assets/sprites/unit_engineer_death1_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death1_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 1 of 4, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer death frame 1, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact normalized teal Engineer initial-stagger frame and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same mostly-upright staggered Engineer, north-facing orientation, recognizable ridged/brimmed hard hat, open-ended steel wrench, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, geometry, stagger pose, position, transparent padding, and occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, death progression, equipment, lighting, alpha boundary, or transparent region; one connected soldier; non-gory; true alpha; no ground, shadow, text, logo, scenery, effects, detached items, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, gore, background, extra detail.
```

### Expedition / teal — death 2 (knees buckle)

- Built-in ImageGen mode: precise pose edit; normalized static and preceding teal death pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-f30257cc-e29e-4756-a546-92001378cecd.png`
- Final: `assets/sprites/unit_engineer_death2_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death2_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 2 of 4
Primary request: Create death-animation frame 2, knees buckling and balance breaking, while preserving the exact Engineer identity and continuing directly from frame 1.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is normalized teal death frame 1 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical field Engineer with the same unmistakable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench, weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, texture, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; orientation still generally north/up while beginning to cant left; exact canvas-center pivot; fixed body scale matching Image 1 and progression from Image 2; generous transparent padding.
Pose specification: death phase 2 of 4 — continue from the initial leftward stagger: both knees buckle, hips sink, feet lose stable alignment, torso leans farther left/back, and the left arm reaches instinctively for balance. The Engineer is collapsing but not yet fully sideways or prone. Wrench remains visibly gripped or trapped close beside the right hand; hard hat stays on and readable.
Constraints: change only pose articulation required for knees/balance breaking; preserve identity, hard hat, wrench, backpack, armor, body mass, scale, and pivot; one complete connected isolated soldier; non-gory; no blood, wounds, dismemberment, detached equipment, detached pixels, translation, scale pulse, camera change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, sprite sheet, montage, or multiple poses; true alpha.
Avoid: generic helmet, firearm, missing wrench jaw, still-neutral standing pose, already fully prone pose, teleporting orientation, gore, severed parts, isometric/side camera, background, floor, halo.
```

### Rubicon / red — death 2

- Built-in ImageGen mode: precise faction recolor; corresponding normalized teal pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-2b15fec5-f08f-4ae8-ad00-fcb1a57a29bd.png`
- Final: `assets/sprites/unit_engineer_death2_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death2_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 2 of 4, red faction counterpart
Primary request: Edit Image 1, the exact normalized teal Engineer death frame 2, into its red faction counterpart. Change faction coloration only. Image 1 is authoritative for every geometry and alpha decision.
Input images: Image 1 is the exact normalized teal Engineer knees-buckling frame and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for materials, strict overhead readability, industrial wear, and restrained faction accent treatment only; they must not alter Image 1's design or footprint.
Scene/backdrop: Keep genuine transparent background exactly.
Subject: Keep the exact same collapsing Engineer, left/back lean, buckled knees, balance-reaching arm, recognizable ridged/brimmed hard hat, open-ended steel wrench beside the right hand, body, armor, backpack, anatomy, scale, pivot, and material wear.
Style/medium: preserve Image 1's grounded semi-realistic painted sprite rendering and edge detail exactly, consistent with the secondary references.
Composition/framing: preserve strict 90-degree overhead view, exact silhouette, geometry, pose, position, transparent padding, and occupancy.
Color palette: recolor only restrained teal faction panels and teal indicators to restrained dark military red/crimson. Keep gunmetal, taupe, steel wrench, amber micro-lights, highlights, shadows, and all non-teal pixels unchanged.
Constraints: faction recolor only; preserve hard-hat brim/ridges and wrench jaw; do not redraw, redesign, move, rotate, scale, crop, or alter anatomy, death progression, equipment, lighting, alpha boundary, or transparent region; one connected soldier; non-gory; true alpha; no ground, shadow, text, logo, scenery, effects, detached items, sprite sheet, montage.
Avoid: changed pose, changed silhouette, missing wrench, generic helmet, firearm, broad red wash, orange/pink/purple accents, gore, background, extra detail.
```

### Expedition / teal — death 3 (active side/back fall)

- Built-in ImageGen mode: precise pose edit; normalized static and preceding teal death pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-8a1d478b-e43e-4b7b-be3d-f3258769fd12.png`
- Final: `assets/sprites/unit_engineer_death3_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death3_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 3 of 4
Primary request: Create death-animation frame 3, the Engineer actively falling onto the left side/back with a wider footprint, preserving the exact identity and continuing directly from frame 2.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is normalized teal death frame 2 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine transparent background only.
Subject: The identical field Engineer with the same unmistakable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench, weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, texture, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; maintain the established north-up world orientation as the body rotates physically into the fall; pivot centered on the torso/hips; fixed body scale matching Image 1; wider horizontal footprint with at least 14px transparent safety padding.
Pose specification: death phase 3 of 4 — continue directly from Image 2: hips and left shoulder descend toward the ground, torso rolls visibly onto the left side/back, legs trail and splay naturally, balance-reaching left arm nears the ground, and the body becomes markedly more horizontal/wide. The Engineer is mid-collapse, not yet fully settled. Hard hat remains on the head. The wrench remains with the right hand/forearm and follows the fall as one connected silhouette; its open jaw remains visible.
Constraints: change only pose articulation required for the active fall; preserve identity, hard hat, wrench, backpack, armor, body mass, scale, and centered torso pivot; one complete connected isolated soldier; non-gory; no blood, wounds, dismemberment, detached equipment, detached pixels, translation outside centered fall arc, camera change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, particles, motion lines, sprite sheet, montage, or multiple poses; true alpha.
Avoid: generic helmet, firearm, missing wrench jaw, still-upright stance, fully settled corpse, standing reset, gore, severed parts, camera tilt, isometric/side camera, background, floor, halo.
```

### Rubicon / red — death 3 (high-registration selection)

- Built-in ImageGen mode: ultra-conservative faction recolor; teal pose absolute authority; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-42ab891e-7750-4167-9d6c-220b914cbee3.png`
- Final: `assets/sprites/unit_engineer_death3_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death3_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 3 of 4, high-registration red faction counterpart
Primary request: Perform an ultra-conservative color-only edit of Image 1, the exact normalized teal Engineer death frame 3. Produce its red faction counterpart with pixel registration held as tightly as possible. Image 1 is absolute authority: every contour, occupied region, active-fall pose, and transparent boundary must remain visually identical.
Input images: Image 1 is the exact normalized teal Engineer active-sideways-fall frame and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks only for understanding subdued red faction accent treatment, weathered metal, and strict overhead readability; ignore any geometry from Images 2–4.
Scene/backdrop: Retain Image 1's genuine transparent background exactly, empty beyond the existing connected body/tool silhouette.
Subject: Do not reinterpret the subject. Keep the exact same actively falling Engineer rolling onto left side/back, exact splayed limbs, exact ridged/brimmed hard hat, exact open-ended steel wrench connected beside the right hand, exact armor, backpack, anatomy, scale, position, and wear.
Style/medium: retain Image 1's painted pixels, rendering, lighting, textures, sharpness, and antialiased edges; this is a faction-palette swap, not a repaint.
Composition/framing: lock strict 90-degree overhead view, silhouette, contour, geometry, pose, pixel footprint, position, transparent padding, and occupancy to Image 1.
Color palette: replace only visibly teal-painted faction panels and teal indicator marks with restrained dark military crimson/red of equivalent brightness and saturation. Preserve every gunmetal, taupe, skin, steel wrench, black, amber light, highlight, shadow, and non-teal region unchanged.
Constraints: color substitution only; preserve alpha mask and boundary as exactly as image editing permits; no new brushwork beyond teal-to-red regions; no redraw, redesign, edge movement, contour shift, anatomy change, equipment change, texture change, re-lighting, movement, rotation, scaling, crop, detached pixel, ground, shadow, text, logo, effect, or scenery; one continuous non-gory figure.
Avoid: artistic reinterpretation, geometry drift, pose drift, silhouette drift, altered wrench/hand relationship, altered hard hat, broad red wash, recoloring taupe/gunmetal/skin, orange/pink/purple, background, new details, sprite sheet.
```

### Expedition / teal — death 4 (final prone, clean final)

- Built-in ImageGen mode: precise pose edit; normalized static and preceding teal death pose authoritative; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-36ee8c32-fd92-43e0-8973-e205a8f45153.png`
- Final: `assets/sprites/unit_engineer_death4_teal.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death4_teal.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 4 of 4, clean final
Primary request: Create death-animation frame 4, the final fully prone and motionless Engineer, preserving the exact identity and settling naturally from frame 3. Output a completely clean isolated sprite with zero stray or detached pixels.
Input images: Image 1 is the authoritative normalized teal Engineer static identity/scale master. Image 2 is normalized teal death frame 3 and the immediate pose-continuity reference. Image 3 (bld_skiff.png), Image 4 (unit_carrier_teal.png), and Image 5 (bld_shipyard_teal.png) are secondary Broodfall benchmarks for weathered materials, restrained palette, industrial detail, and strict overhead readability only; do not copy their shapes or alter the Engineer identity.
Scene/backdrop: None; genuine fully transparent background only, completely empty beyond the connected soldier-and-wrench silhouette.
Subject: The identical field Engineer with the same unmistakable low-domed crown-ridged projecting-brim hard hat, the same large open-ended steel wrench, weathered gunmetal/dusty taupe work armor, restrained teal panels, amber micro-lights, compact backpack/tool harness, anatomy, body mass, and tool scale.
Style/medium: preserve Image 1's grounded semi-realistic painted game-sprite rendering, texture, palette, lighting, and crisp edges, consistent with Images 3–5.
Composition/framing: strict 90-degree orthographic overhead; preserve established north-up world orientation as body lies across it; pivot centered on torso/hips; fixed body scale matching Image 1; wide horizontal prone footprint with at least 14px transparent safety padding.
Pose specification: death phase 4 of 4 — settle directly from Image 2 into a completely prone, motionless position on left side/back. Torso and backpack rest fully down, head/hard hat rests naturally, arms and legs relax with no active bracing, footprint low and clearly wider than standing. Hard hat remains on and recognizable. The wrench lies motionless in the right hand, with fingers visibly gripping the handle so the wrench and body form one continuous connected silhouette; its open jaw remains readable. Final still corpse, not mid-fall.
Constraints: change only pose articulation needed to settle active fall; preserve identity, hard hat, wrench, backpack, armor, body mass, and scale; exactly one continuous connected isolated soldier-and-held-tool alpha component; all other pixels fully transparent; no detached pixel, dust, fleck, debris, fragment, dot, particle, blood, wound, dismemberment, detached equipment, translation outside centered footprint, camera change, crop, edge contact, ground, cast shadow, ambient blob, text, logo, scenery, motion line, sprite sheet, montage, or multiple poses; true alpha.
Avoid: stray pixels, separate wrench, generic helmet, firearm, missing wrench jaw, upright/kneeling pose, active reaching/bracing, floating body, gore, severed parts, camera tilt, isometric/side camera, background, floor, halo.
```

### Rubicon / red — death 4 (high-registration selection)

- Built-in ImageGen mode: ultra-conservative faction recolor; teal pose absolute authority; all three benchmarks secondary
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-af5d01a7-cb25-47e5-93bd-96d80c220797.png`
- Final: `assets/sprites/unit_engineer_death4_red.png`
- Input paths: normalized Engineer pose(s) stated in the prompt, plus all three approved benchmark files
- Processing: `python3 image-audit/process_generated_sprite.py ORIGINAL assets/sprites/unit_engineer_death4_red.png --canvas 256x256 --padding 14`

```text
Use case: precise-object-edit
Asset type: production RTS human-infantry death animation sprite, Engineer death frame 4 of 4, high-registration red faction counterpart
Primary request: Perform an ultra-conservative color-only edit of Image 1, the exact normalized teal Engineer death frame 4. Produce its red faction counterpart with pixel registration held as tightly as possible. Image 1 is absolute authority: every contour, occupied region, pose, and transparent boundary must remain visually identical.
Input images: Image 1 is the exact normalized teal Engineer final-prone frame and authoritative edit target. Image 2 (bld_skiff.png), Image 3 (unit_carrier_teal.png), and Image 4 (bld_shipyard_teal.png) are secondary Broodfall benchmarks only for understanding subdued red faction accent treatment, weathered metal, and strict overhead readability; ignore any geometry from Images 2–4.
Scene/backdrop: Retain Image 1's genuine transparent background exactly, empty beyond the existing connected body/tool silhouette.
Subject: Do not reinterpret the subject. Keep the exact same motionless prone Engineer on left side/back, exact relaxed limbs, exact ridged/brimmed hard hat, exact open-ended steel wrench continuously held by the right hand, exact armor, backpack, anatomy, scale, position, and wear.
Style/medium: retain Image 1's painted pixels, rendering, lighting, textures, sharpness, and antialiased edges; this is a faction-palette swap, not a repaint.
Composition/framing: lock strict 90-degree overhead view, silhouette, contour, geometry, pose, pixel footprint, position, transparent padding, and occupancy to Image 1.
Color palette: replace only visibly teal-painted faction panels and teal indicator marks with restrained dark military crimson/red of equivalent brightness and saturation. Preserve every gunmetal, taupe, skin, steel wrench, black, amber light, highlight, shadow, and non-teal region unchanged.
Constraints: color substitution only; preserve alpha mask and boundary as exactly as image editing permits; no new brushwork beyond teal-to-red regions; no redraw, redesign, edge movement, contour shift, anatomy change, equipment change, texture change, re-lighting, movement, rotation, scaling, crop, detached pixel, ground, shadow, text, logo, effect, or scenery; one continuous non-gory figure.
Avoid: artistic reinterpretation, geometry drift, pose drift, silhouette drift, altered wrench/hand connection, altered hard hat, broad red wash, recoloring taupe/gunmetal/skin, orange/pink/purple, background, new details, sprite sheet.
```

## Superseded iterations

These built-in ImageGen outputs were rejected before installation. They are retained in the generation cache for auditability and were never copied into the production family:

| Generated original | Intended pose | Rejection reason |
|---|---|---|
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-aabc4d39-ca4f-4b68-81f1-d676e51532c6.png` | static teal | Generic helmet/tool-arm draft; failed mandatory hard-hat-and-wrench signature. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-89245f30-4090-48c6-b389-79a8c3b0197a.png` | static red | Recolor of rejected identity draft. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-c665c211-f333-4cc7-bdd7-7aef10f555dd.png` | static red | Correct identity, but benchmark set was not supplied to red edit. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-d7023a86-3d3b-4ddc-9f57-db0cb5d68de0.png` | walk1 teal | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-39f32400-d7ab-4843-bc43-0ee15f5fe345.png` | walk1 red | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-59227556-91d9-4f5b-b5dd-219f5393cc70.png` | walk2 teal | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-f96cb21c-01b3-469f-bb70-0310639fb8a6.png` | walk2 red | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-730f8c34-3d9e-4f7e-b24f-faa1511c0637.png` | walk3 teal | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-dc62a660-aba1-4a86-bfda-dbc26de74aa3.png` | walk3 red | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-bc5f7928-728a-4b0e-a8b9-90fa1356c845.png` | walk4 teal | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-36f44470-895a-4f9b-8fbe-edd2c636de2a.png` | walk4 red | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-5532769c-1f43-4bfa-81e4-244894f09f1d.png` | walk5 teal | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-2294183a-4897-42ce-9b19-5ca40d073575.png` | walk5 red | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-20fbbb36-54ec-4457-b1ef-f54383670735.png` | walk6 teal | Missing mandatory three-benchmark provenance. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-51a55873-b294-4c74-bdac-0205f1ae6c6c.png` | walk8 teal | Detached background flecks; replaced by clean final. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-de68bdb7-6ce5-4c9f-88d9-6da508435b56.png` | death3 red | Valid recolor but lower threshold-alpha registration (0.94213); replaced by high-registration edit. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-45db5cb7-f7a5-49db-8424-49b84782baca.png` | death4 teal | Minor detached antialias artifact; replaced by clean final. |
| `/Users/bronsongannon/.codex/generated_images/01a07502-de4c-7b62-bdcb-d2b07f800d6e/exec-59b7c23b-38e4-40a4-8480-0b781a2e9ea3.png` | death4 red | Valid recolor but lower threshold-alpha registration (0.90855); replaced by high-registration edit. |

## QA

- 26 selected finals, each generated by its own built-in ImageGen call and normalized to 256×256 RGBA.
- Alpha extrema are `(0, 255)` for every file; canvas-edge alpha maximum is `0`.
- Threshold-alpha IoU at alpha > 8 across every corresponding teal/red pair is `0.96653–0.97903`.
- Threshold bboxes remain centered: x center `127.5–128.0`, y center `127.5–128.0`; widths `139–228`, heights `170–228`. Standing/walk frames retain the fixed vertical span `14–242`; death frames widen progressively without edge contact.
- At alpha > 16 every final is one 8-connected subject/equipment component; no material detached marks survive. Antialiased edges are preserved.
- Full-scale review: `image-audit/phases/phase-3/work/engineer-source-contact.png`.
- Runtime-scale review at the authored 29×29 draw size: `image-audit/phases/phase-3/work/engineer-gameplay-contact.png`.
- Visual progression passes: eight planted gait phases preserve the hard hat, wrench, backpack, body mass, pivot, and north-up orientation; four death phases read in order as initial stagger → buckled knees/broken balance → active sideways/back fall → fully prone still body.
- No ground, cast shadow, text, logo, scenery, gore, dinosaur imagery, firearm substitution, or canvas contact is visible.
