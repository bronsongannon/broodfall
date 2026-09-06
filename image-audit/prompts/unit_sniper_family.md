# `unit_sniper` family prompt record

## Scope and provenance

- Generator: built-in ImageGen only; one distinct call per generated frame or edit, never a spritesheet.
- Final family: 28 production files — teal/red static, walk 1–8, death 1–4, and hunker.
- Selected teal derivations used the locked normalized Sniper master as Image 1 plus all three approved benchmark files on every call.
- Every selected red edit used its corresponding normalized teal frame as authoritative Image 1 plus all three approved benchmarks as secondary references.
- Approved benchmark references:
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`
- Normalization: `python3 image-audit/process_generated_sprite.py ORIGINAL STAGED_FINAL --canvas 256x256`; proportional fit only, 14 px safe padding, no stretching or programmatic drawing.
- Atomic staging roots: `/tmp/broodfall-phase3-sniper/teal/` and `/tmp/broodfall-phase3-sniper/red/`.
- QA sheets: `image-audit/phases/phase-3/work/sniper-family-source.png` and `image-audit/phases/phase-3/work/sniper-family-gameplay.png`.

## Selected production call ledger and exact prompts

### Teal static — selected gameplay-readability refinement

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-2ab39bac-5eda-472a-ac4c-adc8d8110fa2.png`
- Final target: `assets/sprites/unit_sniper_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Expedition Sniper static gameplay-readability refinement, destined for unit_sniper_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static edit target and exact geometry, pose, scale, pivot, equipment, rifle, cloak, and alpha master. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for restrained but readable Expedition teal placement, small off-white technical trim breaks, warm amber micro-lights, weathered materials, and strict overhead rendering. Do not copy their naval subjects or components.
Primary request: geometry-lock the exact same lean-but-substantial Sniper and improve only tiny-scale faction readability. Add restrained readable weathered teal to the compact optics cowl plus the two upper-cloak fasteners or narrow shoulder identification tabs, totaling approximately 8–12% of the visible soldier surface. Add one small off-white technical trim break around the cowl/upper harness and one clearly visible warm amber scope/optic glint. Keep the long precision rifle, cloak, armor, and all neutral materials unchanged.
Hard invariants: preserve the exact source alpha mask and exterior boundary; preserve identical Sniper identity, grounded anatomy, lean body mass, cloak outline/mass/length/folds/asymmetrical edge, long precision-rifle geometry and exact north alignment, helmet, armor, gear, static stance, footprint, total scale, exact pivot, centering, padding, strict 90-degree overhead camera, lighting, texture, dirt, scratches, and antialiased edges. Keep the cloak weathered muted taupe/gunmetal and do not broaden it toward Marine mass. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Composition/framing: one isolated soldier centered on the exact pivot with complete rifle, cloak, legs, and boots visible and safe transparent padding on every edge; optimize faction accents for legibility at approximately 27×27 gameplay pixels without becoming saturated body paint.
Constraints: color/marking refinement only; one distinct production frame, not a spritesheet; genuine transparent background exactly as the source; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: changed silhouette, broader/heavier Marine proportions, large teal cloak, fully teal armor, cyan neon, changed rifle, missing cloak, changed pose, multiple optics lights, camera shift, multiple poses.
```

### Teal walk 1 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-d0cd389a-c885-40d4-8c15-c97c744b4278.png`
- Final target: `assets/sprites/unit_sniper_walk1_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 1 of 8, destined for unit_sniper_walk1_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 1 of 8: left boot forward at ground contact and right boot extended back, initiating one restrained marching stride toward north. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 2 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-4c11b6c7-daf8-4265-b427-b489d4515a09.png`
- Final target: `assets/sprites/unit_sniper_walk2_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 2 of 8, destined for unit_sniper_walk2_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 2 of 8: left leg accepting weight in a low compression/down phase, left boot planted and right heel lifting. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 3 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-fae4a838-91e9-4220-8e9d-96e88a5b042e.png`
- Final target: `assets/sprites/unit_sniper_walk3_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 3 of 8, destined for unit_sniper_walk3_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 3 of 8: left boot planted under the body while the right leg passes forward through the centerline. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 4 — selected gait generation

- Outcome: Superseded only by the cleanup call immediately below; retained as its authoritative pose input.
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-da2f469f-a672-449f-a0f0-f733d0d1c680.png`
- Final target: `assets/sprites/unit_sniper_walk4_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 4 of 8, destined for unit_sniper_walk4_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 4 of 8: body at the subtle high point with the right leg advancing toward contact and the left heel beginning to lift. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 5 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-2ecb5806-01e7-44b2-9fb1-fc0adbf3c403.png`
- Final target: `assets/sprites/unit_sniper_walk5_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 5 of 8, destined for unit_sniper_walk5_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 5 of 8: right boot forward at ground contact and left boot extended back, the mirrored contact phase. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 6 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-19d5fd82-3435-4280-bd45-2df4690dd3ec.png`
- Final target: `assets/sprites/unit_sniper_walk6_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 6 of 8, destined for unit_sniper_walk6_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 6 of 8: right leg accepting weight in a low compression/down phase, right boot planted and left heel lifting. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 7 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-4a6321cd-90b6-49a6-83af-2db0198a504d.png`
- Final target: `assets/sprites/unit_sniper_walk7_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 7 of 8, destined for unit_sniper_walk7_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 7 of 8: right boot planted under the body while the left leg passes forward through the centerline. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 8 — selected gait generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-7f4c6216-d454-489a-b5e7-711ced42871a.png`
- Final target: `assets/sprites/unit_sniper_walk8_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected walk cycle frame 8 of 8, destined for unit_sniper_walk8_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, scale, pivot, equipment, cloak, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at walk-cycle phase 8 of 8: body at the subtle high point with the left leg advancing toward the next frame-1 contact, loop-ready. Keep the upper body, helmet, compact optics cowl, shoulders, arms, unmistakable long precision rifle, compact weathered shoulder-fastened marksman cloak, restrained teal cowl/shoulder/fastener IDs, off-white technical trim break, and warm amber optic glint almost perfectly stable. The rifle remains aligned exactly north and the cloak retains its same mass, length, folds, asymmetrical edge, and readable outline. Preserve the same adult human anatomy, lean-but-substantial body mass, armor, webbing, weathering, taupe/gunmetal palette, identity, and visual occupancy.
Animation invariants: this is one distinct production frame, not a spritesheet. The body pivot must remain exactly centered with no whole-body translation; preserve the static master's total scale, torso and shoulder width, rifle length, cloak silhouette, gear size, faction-accent proportion, camera angle, north orientation, lighting, and alpha-safe framing. Only articulate the legs and the minimum natural hip/cloth counter-motion needed for this exact gait phase. Feet must read as planted/contacting, not floating. It must intercut with seven sibling frames without scale pulse, rotation wobble, cloak popping, faction-color flicker, or silhouette identity drift.
Composition/framing: strict orthographic 90-degree overhead; same centered pivot and safe transparent padding as the master; complete rifle, cloak, and boots visible; optimized for approximately 27×27 gameplay pixels.
Constraints: genuinely transparent background with clean antialiased alpha; one soldier only; no ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached equipment, blood, gore, canvas contact, perspective, or camera change.
Avoid: redesign, new gear, missing or billowing cloak, changed armor/faction colors, shortened or angled rifle, missing optic glint, crouching, running, exaggerated stride, chibi anatomy, motion blur, duplicate limbs, interpolation sheet, multiple poses.
```

### Teal walk 4 — selected disconnected-fleck cleanup

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-49ce97dc-d304-44fa-ac6c-84b18b29b157.png`
- Final target: `assets/sprites/unit_sniper_walk4_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk4_teal.png`
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation cleanup, Expedition Sniper selected walk cycle frame 4 of 8
Input images: Image 1 is the current normalized walk-frame-4 edit target. Image 2 is the approved normalized Expedition Sniper static identity/master. Images 3–5 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard, used only as secondary references for strict overhead rendering, restrained readable teal, weathered materials, amber micro-lights, and Broodfall detail language.
Primary request: preserve the exact soldier and gait pose while removing every detached stray pixel, tiny floating fleck, matte remnant, checkerboard contamination, and any ground/contact-shadow residue outside the connected soldier/rifle/cloak silhouette. This remains gait phase 4: body at the subtle high point with the right leg advancing and the left heel beginning to lift.
Hard invariants: keep the exact same Sniper identity, body pivot, anatomy, scale, pose, long north-aligned precision rifle, cloak mass/folds/asymmetrical outline, teal cowl/shoulder/fastener IDs, off-white trim break, amber optic glint, armor, equipment, lighting, weathering, strict 90-degree overhead camera, and safe framing. Do not redesign, shift, rotate, resize, or recolor the figure.
Composition/framing: one isolated centered soldier only; complete rifle, cloak and boots visible; clean transparent safe padding on all edges; no disconnected marks anywhere on the canvas.
Constraints: one distinct production frame, not a spritesheet; genuine transparent background with clean antialiased alpha; no ground, terrain, shadow, base, footprint marker, dust, halo, floating pixels, text, logos, scenery, checkerboard, border, extra people, detached equipment, blood, gore, or canvas contact.
Avoid: changed gait, changed silhouette, missing cloak, shorter rifle, blur, over-cleaning the soldier texture, multiple poses.
```

### Teal death 1 — selected sequence generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-2f99fec3-3247-4a22-a30c-8e1e84552d81.png`
- Final target: `assets/sprites/unit_sniper_death1_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected death sequence frame 1 of 4, destined for unit_sniper_death1_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, equipment, cloak, anatomy, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at death-sequence phase 1 of 4: initial impact reaction: still upright and mostly centered, shoulders recoil and torso staggers slightly while knees soften; retain control of the long rifle. Preserve the same helmet and optics cowl, weathered gunmetal/taupe armor, restrained teal cowl/shoulder/fastener IDs, small off-white technical trim break, warm amber optic glint, practical gear, unmistakable long precision rifle, and compact shoulder-fastened weathered marksman cloak. The cloak must retain recognizable material, mass, length, folds, and asymmetrical edge through this state rather than vanish or become a different garment.
Sequence invariants: this is one distinct production frame, not a spritesheet. Maintain the same soldier identity, lean-but-substantial body mass, equipment proportions, rifle length, faction-accent proportion, material rendering, overhead lighting, and overall scale as the master. Progress naturally from upright stagger through knees/balance loss to a wider fall and final prone stillness. Preserve the exact centered gameplay pivot even as the body pose broadens; keep every body part, rifle, and cloak fully inside safe transparent padding. No scale pulse or camera change.
Composition/framing: strict orthographic 90-degree overhead; north remains the original facing direction; isolated complete figure centered on the same gameplay pivot, optimized for approximately 27×27 gameplay pixels.
Constraints: genuine transparent background with clean antialiased alpha; one soldier only; tasteful non-graphic defeat pose; no blood, gore, wounds, dismemberment, ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached floating gear, canvas contact, perspective, or camera change.
Avoid: missing cloak or rifle, missing faction accents/optic glint, redesigned soldier, kneeling prayer pose, sleeping peacefully while upright, ragdoll distortion, broken anatomy, duplicate limbs, weapon transformed or shortened, saturated teal, multiple poses.
```

### Teal death 2 — selected sequence generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-cedaf38b-004b-40fa-a5f1-398af808cf9b.png`
- Final target: `assets/sprites/unit_sniper_death2_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected death sequence frame 2 of 4, destined for unit_sniper_death2_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, equipment, cloak, anatomy, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at death-sequence phase 2 of 4: balance breaking: both knees buckle and the torso drops, cloak folds inward, but the soldier is not yet on the ground; the long rifle remains visibly held and north-oriented. Preserve the same helmet and optics cowl, weathered gunmetal/taupe armor, restrained teal cowl/shoulder/fastener IDs, small off-white technical trim break, warm amber optic glint, practical gear, unmistakable long precision rifle, and compact shoulder-fastened weathered marksman cloak. The cloak must retain recognizable material, mass, length, folds, and asymmetrical edge through this state rather than vanish or become a different garment.
Sequence invariants: this is one distinct production frame, not a spritesheet. Maintain the same soldier identity, lean-but-substantial body mass, equipment proportions, rifle length, faction-accent proportion, material rendering, overhead lighting, and overall scale as the master. Progress naturally from upright stagger through knees/balance loss to a wider fall and final prone stillness. Preserve the exact centered gameplay pivot even as the body pose broadens; keep every body part, rifle, and cloak fully inside safe transparent padding. No scale pulse or camera change.
Composition/framing: strict orthographic 90-degree overhead; north remains the original facing direction; isolated complete figure centered on the same gameplay pivot, optimized for approximately 27×27 gameplay pixels.
Constraints: genuine transparent background with clean antialiased alpha; one soldier only; tasteful non-graphic defeat pose; no blood, gore, wounds, dismemberment, ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached floating gear, canvas contact, perspective, or camera change.
Avoid: missing cloak or rifle, missing faction accents/optic glint, redesigned soldier, kneeling prayer pose, sleeping peacefully while upright, ragdoll distortion, broken anatomy, duplicate limbs, weapon transformed or shortened, saturated teal, multiple poses.
```

### Teal death 3 — selected sequence generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-9c5ef950-af13-4303-98da-c5d16bab825b.png`
- Final target: `assets/sprites/unit_sniper_death3_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected death sequence frame 3 of 4, destined for unit_sniper_death3_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, equipment, cloak, anatomy, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at death-sequence phase 3 of 4: falling sideways and slightly backward: torso and legs rotate only within the pose under the fixed overhead camera, producing a deliberately wider ground footprint; cloak spreads naturally beneath/along the body and the long rifle remains visibly associated with the soldier. Preserve the same helmet and optics cowl, weathered gunmetal/taupe armor, restrained teal cowl/shoulder/fastener IDs, small off-white technical trim break, warm amber optic glint, practical gear, unmistakable long precision rifle, and compact shoulder-fastened weathered marksman cloak. The cloak must retain recognizable material, mass, length, folds, and asymmetrical edge through this state rather than vanish or become a different garment.
Sequence invariants: this is one distinct production frame, not a spritesheet. Maintain the same soldier identity, lean-but-substantial body mass, equipment proportions, rifle length, faction-accent proportion, material rendering, overhead lighting, and overall scale as the master. Progress naturally from upright stagger through knees/balance loss to a wider fall and final prone stillness. Preserve the exact centered gameplay pivot even as the body pose broadens; keep every body part, rifle, and cloak fully inside safe transparent padding. No scale pulse or camera change.
Composition/framing: strict orthographic 90-degree overhead; north remains the original facing direction; isolated complete figure centered on the same gameplay pivot, optimized for approximately 27×27 gameplay pixels.
Constraints: genuine transparent background with clean antialiased alpha; one soldier only; tasteful non-graphic defeat pose; no blood, gore, wounds, dismemberment, ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached floating gear, canvas contact, perspective, or camera change.
Avoid: missing cloak or rifle, missing faction accents/optic glint, redesigned soldier, kneeling prayer pose, sleeping peacefully while upright, ragdoll distortion, broken anatomy, duplicate limbs, weapon transformed or shortened, saturated teal, multiple poses.
```

### Teal death 4 — selected sequence generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-d6195c96-3337-47a7-a73f-0c6d59aa7474.png`
- Final target: `assets/sprites/unit_sniper_death4_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry animation frame, Expedition Sniper selected death sequence frame 4 of 4, destined for unit_sniper_death4_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, equipment, cloak, anatomy, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper at death-sequence phase 4 of 4: fully prone and motionless on the ground: complete body settled in a clear final casualty silhouette, cloak spread in a compact readable shape, long precision rifle lying with/along the soldier and still unmistakable. Preserve the same helmet and optics cowl, weathered gunmetal/taupe armor, restrained teal cowl/shoulder/fastener IDs, small off-white technical trim break, warm amber optic glint, practical gear, unmistakable long precision rifle, and compact shoulder-fastened weathered marksman cloak. The cloak must retain recognizable material, mass, length, folds, and asymmetrical edge through this state rather than vanish or become a different garment.
Sequence invariants: this is one distinct production frame, not a spritesheet. Maintain the same soldier identity, lean-but-substantial body mass, equipment proportions, rifle length, faction-accent proportion, material rendering, overhead lighting, and overall scale as the master. Progress naturally from upright stagger through knees/balance loss to a wider fall and final prone stillness. Preserve the exact centered gameplay pivot even as the body pose broadens; keep every body part, rifle, and cloak fully inside safe transparent padding. No scale pulse or camera change.
Composition/framing: strict orthographic 90-degree overhead; north remains the original facing direction; isolated complete figure centered on the same gameplay pivot, optimized for approximately 27×27 gameplay pixels.
Constraints: genuine transparent background with clean antialiased alpha; one soldier only; tasteful non-graphic defeat pose; no blood, gore, wounds, dismemberment, ground, terrain, pedestal, base, footprint marker, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached floating gear, canvas contact, perspective, or camera change.
Avoid: missing cloak or rifle, missing faction accents/optic glint, redesigned soldier, kneeling prayer pose, sleeping peacefully while upright, ragdoll distortion, broken anatomy, duplicate limbs, weapon transformed or shortened, saturated teal, multiple poses.
```

### Teal hunker — selected low-overwatch generation

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-b7113d3b-2481-47c1-bf1f-3993392a46a4.png`
- Final target: `assets/sprites/unit_sniper_hunker_teal.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry state sprite, Expedition Sniper selected hunker/overwatch pose, destined for unit_sniper_hunker_teal.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static master and exact identity, palette, equipment, cloak, anatomy, scale, faction markings, and rendering reference. Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained readable teal, small off-white trim, amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects or components.
Primary request: redraw the exact same Sniper in a compact low prone overwatch/hunker pose, braced toward north. Lower the torso and legs into a stable firing position while keeping the helmet, optics cowl, shoulders, armor, webbing, restrained teal cowl/shoulder/fastener IDs, small off-white technical trim break, warm amber optic glint, and unmistakable long precision rifle fully recognizable. The rifle must remain clearly readable, centered and aligned exactly straight north. Arrange the compact shoulder-fastened weathered marksman cloak naturally close around/under the low body; retain the same cloak material, mass, folds, length cues, and asymmetrical outline so it remains a signature feature without becoming a ground patch.
State invariants: this is one distinct production sprite, not a spritesheet. Preserve the same soldier identity, adult human proportions, lean-but-substantial body mass, armor and equipment scale, rifle length, faction-accent proportion, color balance, weathering, strict overhead rendering, and exact gameplay pivot. The lower hunker silhouette may become wider and more compact, but must not become smaller overall or shift off center.
Composition/framing: strict orthographic 90-degree overhead, facing exactly up/north, one complete prone/low soldier centered on the exact pivot with even transparent safe padding; complete rifle, cloak, legs and boots visible; readable at approximately 27×27 gameplay pixels.
Constraints: genuine transparent background with clean antialiased alpha; no ground, terrain, trench, sandbags, pedestal, base, footprint marker, foliage, dust, cast/contact shadow, halo, text, readable letters, numerals, logos, insignia, watermark, scenery, checkerboard, border, frame, extra people, detached gear, blood, gore, canvas contact, perspective, or camera change.
Avoid: missing cloak, missing faction accents/optic glint, tiny shrunk character, corpse pose, standing pose, crouch seen from the side, rifle angled away from north, bipod extending into ground scenery, camouflage blob, billowing cape, redesigned armor, chibi anatomy, multiple poses.
```

### Red static — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-89fa500f-8fc7-4d2f-a1a4-0ba89d787b96.png`
- Final target: `assets/sprites/unit_sniper_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected static colorway, destined for unit_sniper_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper static edit target and authoritative exact geometry/alpha-mask master (unit_sniper_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 1 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-5c99710e-006b-4488-8934-6c07c3c804d6.png`
- Final target: `assets/sprites/unit_sniper_walk1_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk1_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 1 of 8 colorway, destined for unit_sniper_walk1_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 1 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk1_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 2 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-fad63587-3385-4652-a699-f36da8f89252.png`
- Final target: `assets/sprites/unit_sniper_walk2_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk2_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 2 of 8 colorway, destined for unit_sniper_walk2_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 2 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk2_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 3 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-2a83324a-1330-42a5-bf9f-5275ff3e4bd9.png`
- Final target: `assets/sprites/unit_sniper_walk3_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk3_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 3 of 8 colorway, destined for unit_sniper_walk3_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 3 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk3_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 4 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-a594bdbc-e00d-439e-8154-ea5840bf58ce.png`
- Final target: `assets/sprites/unit_sniper_walk4_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk4_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 4 of 8 colorway, destined for unit_sniper_walk4_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 4 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk4_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 5 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-45356278-27a0-4e38-8b2a-7020f8c91845.png`
- Final target: `assets/sprites/unit_sniper_walk5_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk5_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 5 of 8 colorway, destined for unit_sniper_walk5_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 5 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk5_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 6 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-47912594-9e4d-4d63-8291-a3e26b9046c9.png`
- Final target: `assets/sprites/unit_sniper_walk6_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk6_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 6 of 8 colorway, destined for unit_sniper_walk6_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 6 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk6_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 7 of 8 — selected colorway edit

- Outcome: Superseded only by the silhouette-lock retry immediately below; retained as its Rubicon color-placement input.
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-d442d6ea-f950-4b51-8e71-35e5e8d8673b.png`
- Final target: `assets/sprites/unit_sniper_walk7_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk7_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 7 of 8 colorway, destined for unit_sniper_walk7_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 7 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk7_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk cycle frame 8 of 8 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-ae14b3e5-505a-46b0-8659-d5bc780dc099.png`
- Final target: `assets/sprites/unit_sniper_walk8_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk8_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected walk cycle frame 8 of 8 colorway, destined for unit_sniper_walk8_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 8 of 8 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_walk8_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red death sequence frame 1 of 4 — selected colorway edit

- Outcome: Selected production source after the canonical threshold-16 alpha-mask gate; teal/red IoU is `0.95117` at `alpha > 16`.
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-84f74872-4cef-4b17-b286-4b777b783062.png`
- Independently generated siblings from the same exact prompt, discarded after normalization: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-af8e57bf-90c4-4946-b78d-c5359b703fb8.png` (`0.94350` IoU) and `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-95659fad-023c-4fcb-9e7f-2675eb9a8bb4.png` (`0.91223` IoU).
- Final target: `assets/sprites/unit_sniper_death1_red.png`
- Referenced images, in call order:
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_sniper_death1_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry texture-only recolor, Rubicon Sniper death frame 1, exact-silhouette retry
Input images: Image 1 is the installed 256×256 normalized Expedition Sniper death1 sprite and the immutable edit target. Images 2–4 are the approved skiff, teal carrier, and teal shipyard and are secondary material/palette references only; ignore their geometry and subjects.
Primary request: preserve Image 1 as the base image and alter hue only inside its existing opaque artwork. Change just the small teal-painted pixels on the helmet center, narrow shoulder IDs, cloak fasteners, chest/equipment inset, and optics housing to restrained weathered dark oxide-red. Leave every other RGB value and every alpha value as close to pixel-identical to Image 1 as possible.
Non-negotiable mask lock: the output silhouette must overlay Image 1 exactly. Do not regenerate or redraw the soldier. Preserve all transparent pixels, antialiased edge pixels, outline coordinates, alpha footprint, connected shape, rifle/cloak/body/limb contours, 256×256 registration, bbox, pose, scale, pivot, centering, and strict overhead camera. Do not move even one exterior edge.
Preserve: muted taupe cloak; charcoal/gunmetal rifle and armor; off-white trim; warm amber optic; dirt, scratches, highlights, internal shadows, anatomy, equipment, and stagger pose.
Background: exact source transparency. No matte, checkerboard, ground, shadow, halo, text, logo, scenery, detached pixels, border, or canvas contact.
Avoid: new rendering, changed geometry, pose drift, red on neutral fabric/armor, broad bright-red paint, added symbols, altered rifle or cloak.
```

### Red death sequence frame 2 of 4 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-b332228f-54b1-46af-a381-c6d91032961a.png`
- Final target: `assets/sprites/unit_sniper_death2_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_death2_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected death sequence frame 2 of 4 colorway, destined for unit_sniper_death2_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper death sequence frame 2 of 4 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_death2_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red death sequence frame 3 of 4 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-1a026310-c4e7-45d4-b68f-356e20904d9a.png`
- Final target: `assets/sprites/unit_sniper_death3_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_death3_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected death sequence frame 3 of 4 colorway, destined for unit_sniper_death3_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper death sequence frame 3 of 4 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_death3_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red death sequence frame 4 of 4 — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-ac71dcc0-03f7-4232-b252-092079ed573a.png`
- Final target: `assets/sprites/unit_sniper_death4_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_death4_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected death sequence frame 4 of 4 colorway, destined for unit_sniper_death4_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper death sequence frame 4 of 4 edit target and authoritative exact geometry/alpha-mask master (unit_sniper_death4_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red hunker/overwatch pose — selected colorway edit

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-aeb35b81-7d3d-45e4-bf2f-3c864f12552a.png`
- Final target: `assets/sprites/unit_sniper_hunker_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_hunker_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper selected hunker/overwatch pose colorway, destined for unit_sniper_hunker_red.png and normalized to a 256×256 RGBA canvas
Input images: Image 1 is the approved normalized Expedition Sniper hunker/overwatch pose edit target and authoritative exact geometry/alpha-mask master (unit_sniper_hunker_teal.png). Images 2–4 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard; use them only as secondary references for strict overhead orthographic rendering, weathered gunmetal/taupe materials, restrained faction-color placement, warm amber micro-lights, surface wear, and Broodfall detail language. Do not copy their naval subjects, teal faction color, or components.
Primary request: perform a precise faction-colorway-only edit. Replace only the restrained Expedition teal identification paint on helmet/cowl panels, narrow shoulder IDs, upper-cloak fasteners, armor insets, optics-housing accents, equipment tabs, and teal light housings with restrained weathered Rubicon dark oxide-red / iron-red. Preserve all charcoal/gunmetal machinery, muted taupe armor and fabric, the complete weathered marksman cloak, long precision rifle, dark joints, neutral webbing, the small off-white technical trim break, warm amber optic glint and micro-lights, dirt, scratches, chipped-paint wear, and internal material shading.
Hard invariants: change color only. Preserve the exact source alpha mask and every exterior boundary pixel; preserve identical Sniper identity, pose, gait/death/state articulation, anatomy, lean body mass, silhouette, cloak mass/folds/asymmetrical outline, long precision-rifle geometry and direction, helmet, armor, gear, footprint, total scale, exact pivot, centering, padding, original north-facing reference, strict 90-degree overhead camera, texture, lighting, and antialiased edges. Do not add, remove, redraw, move, resize, rotate, or reinterpret any component.
Background: genuine transparency exactly as the source, with no checkerboard, matte, ground, terrain, base, cast/contact shadow, outline, halo, text, readable letters, numerals, logos, insignia, people, scenery, border, frame, or canvas contact.
Avoid: independently regenerated soldier, any shape/pose change, missing or altered cloak, changed rifle, red applied to taupe cloak or neutral armor, large saturated red slabs, changed amber optic glint, perspective tilt, camera change, blood, gore, multiple poses.
```

### Red walk 7 — selected silhouette-lock retry

- Outcome: Selected production source
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-4e24bdb5-0ee1-425c-9601-bb8b5728f4f4.png`
- Final target: `assets/sprites/unit_sniper_walk7_red.png`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_walk7_teal.png`
  - `/tmp/broodfall-phase3-sniper/red/unit_sniper_walk7_red.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper walk cycle frame 7 of 8 silhouette-lock colorway retry, destined for unit_sniper_walk7_red.png
Input images: Image 1 is the approved normalized Expedition Sniper walk cycle frame 7 of 8 and authoritative exact geometry/alpha-mask edit target. Image 2 is the prior Rubicon recolor and is used only as a restrained dark oxide-red color-placement reference, not as geometry. Images 3–5 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard, used only as secondary Broodfall material, weathering, strict overhead, restrained color, and amber-light references.
Primary request: change color only. Replace only the small weathered teal identification areas on the cowl/helmet center, narrow shoulder IDs, cloak fasteners, armor insets, optics housing, and equipment tabs with restrained weathered dark oxide-red / iron-red. Keep every non-teal source pixel visually unchanged, including the muted taupe cloak, charcoal/gunmetal armor and rifle, off-white trim break, warm amber optic glint, dirt, scratches, texture, and internal shading.
Absolute geometry invariants: preserve Image 1's exact alpha mask and every exterior boundary pixel; preserve identical pose articulation, body/limb placement, cloak folds and edge, rifle geometry, silhouette, footprint, width, height, scale, pivot, centering, padding, north reference, strict 90-degree overhead camera, and antialiased edge. Do not redraw any structure, add detail outside the source silhouette, or omit source detail.
Background: genuine transparency exactly as Image 1; zero detached pixels, matte, checkerboard, ground, shadow, halo, text, logos, scenery, border, or canvas contact.
Avoid: regenerated soldier, altered pose, changed cloak/rifle, red on neutral cloth/armor, broad saturated red, shifted or widened silhouette, extra equipment, changed lighting.
```

### Red death 1 — discarded silhouette-lock retry

- Outcome: Discarded because alpha-mask IoU (`0.93803`) remained below the `0.95` hard gate and the final selected death1 retry (`0.95117`).
- Generated original: `/Users/bronsongannon/.codex/generated_images/01a07503-153c-7913-8cda-1e634791238e/exec-e0220163-dddf-434a-b58f-730411fa9083.png`
- Final target: `not installed`
- Referenced images, in call order:
  - `/tmp/broodfall-phase3-sniper/teal/unit_sniper_death1_teal.png`
  - `/tmp/broodfall-phase3-sniper/red/unit_sniper_death1_red.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
  - `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

```text
Use case: precise-object-edit
Asset type: Broodfall production RTS infantry sprite, Rubicon Sniper death sequence frame 1 of 4 silhouette-lock colorway retry, destined for unit_sniper_death1_red.png
Input images: Image 1 is the approved normalized Expedition Sniper death sequence frame 1 of 4 and authoritative exact geometry/alpha-mask edit target. Image 2 is the prior Rubicon recolor and is used only as a restrained dark oxide-red color-placement reference, not as geometry. Images 3–5 are the approved evacuation skiff, Expedition carrier, and Expedition naval shipyard, used only as secondary Broodfall material, weathering, strict overhead, restrained color, and amber-light references.
Primary request: change color only. Replace only the small weathered teal identification areas on the cowl/helmet center, narrow shoulder IDs, cloak fasteners, armor insets, optics housing, and equipment tabs with restrained weathered dark oxide-red / iron-red. Keep every non-teal source pixel visually unchanged, including the muted taupe cloak, charcoal/gunmetal armor and rifle, off-white trim break, warm amber optic glint, dirt, scratches, texture, and internal shading.
Absolute geometry invariants: preserve Image 1's exact alpha mask and every exterior boundary pixel; preserve identical pose articulation, body/limb placement, cloak folds and edge, rifle geometry, silhouette, footprint, width, height, scale, pivot, centering, padding, north reference, strict 90-degree overhead camera, and antialiased edge. Do not redraw any structure, add detail outside the source silhouette, or omit source detail.
Background: genuine transparency exactly as Image 1; zero detached pixels, matte, checkerboard, ground, shadow, halo, text, logos, scenery, border, or canvas contact.
Avoid: regenerated soldier, altered pose, changed cloak/rifle, red on neutral cloth/armor, broad saturated red, shifted or widened silhouette, extra equipment, changed lighting.
```

## Earlier development iterations

Before the selected ledger above, initial design and animation drafts were generated to establish the Sniper identity. The first static pass used all three approved benchmarks; it was rejected for lacking the required cloak. A cloak refinement was made, then an all-benchmark provenance pass, followed by the selected gameplay-readability refinement recorded above. Early derived frames and the first five red recolors were never installed because their calls did not include all three benchmark references; all were regenerated and superseded by the exact selected calls above. No discarded output is referenced by the game.

## QA summary

- All 28 staged finals are 256×256 RGBA with alpha extrema `(0, 255)` and zero alpha on every canvas edge.
- Connected-component scan at alpha > 16 found no detached component of three or more pixels.
- Static + walk frames stay centered at x `127.5–128.0`, y `128.0`; teal widths `71–82` px and red widths `72–83` px, with identical 228 px normalized height.
- Teal/red alpha-mask IoU at alpha > 16 spans `0.95060–0.97671`, mean `0.95929`; death frame 1 is `0.95117` and every pair clears the `0.95` hard gate.
- Full-size colored-background and repeated exact-runtime 32×32 gameplay inspections passed for cloak/rifle identity, teal/red faction readability, stride progression, death progression, hunker readability, clean alpha edges, and absence of ground, cast shadow, text, logo, scenery, or canvas contact.
