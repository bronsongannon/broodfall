# Broodfall human-tech art overhaul — new-task handoff

## Recommended task settings

Before sending this prompt in Codex:

- Open the existing **Broodfall** project at `/Users/bronsongannon/Desktop/broodfall`.
- Use the current working tree directly; do not start from a clean branch or discard uncommitted work.
- Select **GPT-5.6 Sol**.
- Select **Ultra** reasoning if the Codex model picker offers it; otherwise select **Max**, the highest available setting.
- Keep image generation enabled.

Paste everything below this line into the new task.

---

We are doing a complete visual replacement of Broodfall's human technology in three ordered phases:

1. **All human buildings**
2. **All human vehicles and aircraft**
3. **All human soldiers, including their complete animation families**

Do not replace or restyle any dinosaurs yet. This includes the Spitter, Raptor, Screecher, Ironback, Broodmother, Grazer/Critter, nests, dens, roosts, eggs, or their animation frames.

Work autonomously through each phase. Do not stop after planning, making a single sample, or generating concept sheets. Produce and install production assets, verify them at gameplay size, and finish the full phase before moving to the next. Use subagents for distinct, non-overlapping asset families when that improves throughput, but enforce one shared art specification across every subagent.

## Repository and safety

- Workspace: `/Users/bronsongannon/Desktop/broodfall`
- The working tree is intentionally dirty. Preserve every existing change.
- At the time of this handoff, `.claude/session-start.json` and the roadmap widget were unrelated user changes. They were later cleaned up explicitly at the user's request; preserve their current replacements unless a new task targets them.
- Existing work in `game.js`, `index.html`, `CAMPAIGN.md`, sprite documentation, and the new naval assets is intentional and must survive.
- Do not use `git reset`, `git checkout --`, or other destructive cleanup.
- Do not commit or push unless I explicitly ask.
- The currently generated audit is [`IMAGE-AUDIT.md`](/Users/bronsongannon/Desktop/broodfall/IMAGE-AUDIT.md), with contact sheets and inventories under `/Users/bronsongannon/Desktop/broodfall/image-audit/`.

## Non-negotiable visual benchmark

Use these three approved assets as style references for every generated human-tech asset:

- `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_skiff.png`
- `/Users/bronsongannon/Desktop/broodfall/assets/sprites/unit_carrier_teal.png`
- `/Users/bronsongannon/Desktop/broodfall/assets/sprites/bld_shipyard_teal.png`

The target language is:

- Strict orthographic 90-degree overhead view
- Grounded semi-realistic RTS art, not glossy mobile-game vector art
- Weathered charcoal/gunmetal and muted taupe structural mass
- Restrained faction color on identification panels, rails, stripes, and lights—not the entire object
- Expedition: teal panels, off-white technical trim, warm amber lights
- Rubicon: dark iron, restrained red panels, universal hazard yellow, warm amber lights
- Crisp silhouette readable at the actual 24–100 px gameplay size
- Surface wear, panel seams, salt/dust staining, functional machinery
- Clean true-alpha transparency
- No baked ground, water, coastline, wake, drop shadow, text, numerals, logos, people, or scenery
- No perspective tilt or isometric camera

Do not copy the naval subjects into land assets. The references establish materials, rendering, palette restraint, overhead accuracy, and finish.

## Image-generation workflow

- Read the installed `imagegen` skill completely before generating anything.
- Use the built-in ImageGen tool, one distinct asset per generation call.
- Generate the teal/Expedition version first.
- Create the red/Rubicon version as an image-to-image recolor of the approved teal asset. Preserve exact silhouette, geometry, equipment, footprint, pivot, and lighting. Never independently regenerate the red counterpart.
- Ask for genuine transparency. Inspect the resulting file; built-in output can occasionally contain a baked checkerboard despite the prompt. If so, remove only the background and preserve antialiased edges.
- Normalize production sprites to 256×256 RGBA unless an existing runtime contract clearly requires a rectangular canvas. Keep the subject centered with safe transparent padding.
- Never stretch artwork to force it into 256×256. Scale proportionally and pad the canvas.
- View every final PNG after processing. Check alpha extrema, visible bounding box, canvas contact, and game-scale readability.
- Keep generated originals outside the workspace and copy only selected finals into `assets/sprites/`.
- Record the exact final prompt and saved path for every asset under `image-audit/prompts/`.

## Phase 1 — buildings

Replace the active teal/red colorway pairs for:

- `bld_hq_teal.png` / `bld_hq_red.png`
- `bld_barracks_teal.png` / `bld_barracks_red.png`
- `bld_factory_teal.png` / `bld_factory_red.png`
- `bld_supply_teal.png` / `bld_supply_red.png`
- `bld_power_teal.png` / `bld_power_red.png`
- `bld_refinery_teal.png` / `bld_refinery_red.png`
- `bld_airpad_teal.png` / `bld_airpad_red.png`
- `bld_silo_teal.png` / `bld_silo_red.png`
- `bld_turret_teal.png` / `bld_turret_red.png`
- `bld_flak_teal.png` / `bld_flak_red.png`

Keep these approved assets unchanged:

- `bld_shipyard_teal.png`
- `bld_skiff.png`

Add bespoke colorway art for the currently procedural facilities:

- `bld_hydro_teal.png` / `bld_hydro_red.png`
- `bld_sensor_teal.png` / `bld_sensor_red.png`

Building-specific runtime rules:

- Read `drawBuildingSprite`, `drawBuildingDecor`, `drawHydroDam`, and the sensor branch in `drawBuilding` before prompting.
- HQ must leave room for the existing animated Rubicon pennant overlay.
- Barracks currently receives an awning-stripe overlay.
- Factory currently receives a hazard-band overlay above its vehicle bay.
- Supply receives a trim-band overlay.
- Silo receives a live hazard ring and a separately drawn center warhead. The base art must have an open launch tube/doors and must not contain a permanent missile.
- Turret and flak base art must not bake in a rotating weapon.
- Replace `turret_gun_teal.png` / `turret_gun_red.png` with a grounded anti-ground cannon pointing straight up.
- Add `flak_gun_teal.png` / `flak_gun_red.png` as a visually distinct twin-barrel AA mount pointing straight up, then register and render those slots instead of making flak share the turret cannon.
- Preserve recoil and rotation behavior for both weapon mounts.
- Hydro art must be a long bridge-like dam that can rotate across a river channel. Do not bake in water or animated spillway foam. Modify `drawHydroDam` to render the new base art while retaining dynamic water/churn, construction state, selection, and damage UI.
- Sensor art must be a compact scientific overwatch base. Do not bake in the rotating dish or radar sweep. Modify the sensor renderer to use the new base art while preserving those dynamic overlays.
- If a baked signature detail and a procedural overlay duplicate one another, prefer the better artwork and remove only the redundant overlay. Preserve gameplay-state overlays such as power, warhead, selection, production, radar, and damage indicators.

After active colorways work, deal with neutral legacy building files deliberately. Either repaint them to the same standard or change the fallback loader so obsolete BODY components are no longer load-bearing. Do not simply delete one BODY file: the current BODY loader is all-or-nothing.

## Phase 2 — vehicles and aircraft

Replace complete teal/red pairs for:

- `unit_apc_teal.png` / `unit_apc_red.png`
- `unit_artillery_teal.png` / `unit_artillery_red.png`
- `unit_gunship_teal.png` / `unit_gunship_red.png`
- `unit_harrier_teal.png` / `unit_harrier_red.png`
- `unit_harvester_teal.png` / `unit_harvester_red.png`
- `unit_raider_teal.png` / `unit_raider_red.png`
- `unit_rig_teal.png` / `unit_rig_red.png`
- `unit_tank_teal.png` / `unit_tank_red.png`
- `unit_artillery_hunker_teal.png` / `unit_artillery_hunker_red.png`

Keep `unit_carrier_teal.png` as the approved vehicle benchmark.

Vehicle runtime rules:

- All authored vehicle art points straight up.
- Preserve class silhouette and apparent gameplay footprint; test against each unit's `r` value.
- Gunship and Harrier have special renderers that currently ignore their authored teal/red colorway files and multiply-tint neutral art. Fix those renderers to prefer `optCW()` so the replacements actually appear.
- Keep the Harvester's load-state crystal treatment, Rig captive glow, APC unload identity, turret/barrel rotation, aircraft rotors, and all selection/combat overlays working.
- Fix artillery hunker selection so the special pose wins over the static colorway.
- The carrier currently appears shorter than the evacuation skiff in play. Increase its runtime draw footprint enough that it reads as the capital ship without breaking navigation clearance, selection, wake origin, or shore collision.

## Phase 3 — soldiers

Replace soldiers only as complete families. Never install a new static beside an old animation family.

Families:

- Marine: teal and red static, walk 1–8, death 1–4, and new hunker pose
- Engineer: teal and red static, walk 1–8, death 1–4
- Sniper: teal and red static, walk 1–8, death 1–4, hunker pose
- Medic: teal and red static, walk 1–8, death 1–4
- Rocket Trooper: teal and red static, walk 1–8, death 1–4
- Commando/Boone: teal-only static, walk 1–8, death 1–4

Soldier rules:

- Strict overhead, facing straight up.
- Use grounded human proportions that remain readable at roughly 24–32 px—less rounded/chibi than the outgoing set, but not thin photoreal figures that disappear against terrain.
- Lock the same pivot, visible height, body mass, weapon scale, and occupancy across every frame.
- Preserve signature silhouettes: Marine visor/rifle, Engineer hard hat/wrench, Sniper cloak/long rifle, Medic white field kit, Rocket shoulder tube, Boone's heavier armor and gold chevrons.
- Leave safe transparent padding around every falling body, rifle barrel, launcher, wrench, medic pack, and cloak.
- The audit found 38 current frames with real edge clipping. The replacement families must eliminate all canvas contact.
- Validate walk cadence in motion, not only as thumbnails. Feet should feel planted and the sprite must not drift or pulse in scale.

## Explicitly out of scope

- Do not modify any dinosaur or dino-structure image.
- Do not replace terrain, water, trees, crystals, combat FX, portraits, key art, thumbnails, or store screenshots during these three phases. Report them as later work only.
- Do not redesign gameplay, rebalance stats, rewrite missions, or change dialogue as part of the art pass.

## Verification requirements

For every phase:

1. Generate a labeled contact sheet before and after replacement.
2. Inspect source sprites at full size and at their actual in-game draw size.
3. Test teal and red versions side by side on representative maps.
4. Test construction transparency, selection corners, health bars, queue bars, rally lines, power state, lowered/sunk buildings, and weapon rotation where applicable.
5. Confirm there are no baked backgrounds, halos, hard crop edges, orientation errors, or unexpected canvas distortion.
6. Check browser console warnings/errors.
7. Run `node --check game.js` and `git diff --check`.
8. Build the macOS app with:
   `xcodebuild -project mac/Broodfall.xcodeproj -scheme Broodfall -configuration Debug build`
9. Verify representative final PNGs exist in the rebuilt app bundle and match the workspace files.
10. Update `IMAGE-AUDIT.md`, its contact sheets, `assets/sprites/README.md`, `assets/sprites/ART-WANTED.md`, and any obsolete sprite documentation.

The local preview server has recently been available at `http://127.0.0.1:4173/`. Reuse it if running; otherwise start the existing project dev workflow. Mark the live browser preview as the deliverable when the phase is complete.

## Completion standard

A phase is complete only when every listed asset is installed, its counterpart is geometrically consistent, runtime selection actually uses it, in-game scale has been inspected, tests pass, the macOS bundle is current, and the audit/documentation reflects the result.

At the end of each phase, report:

- Final saved paths
- Exact prompt set and built-in ImageGen mode
- Any runtime code changes
- Browser and native-build verification
- Remaining known issues
- Git status, without committing or pushing
