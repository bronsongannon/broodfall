# Broodfall — build checklist

> **THE AUGUST 14 SUBMISSION DATE IS DEAD (Bronson, 2026-08-11).** Build the
> game first, tackle the store after. The reasoning: the paid tier is Acts 2–3,
> so a store release before the campaign is finished would sell content that
> doesn't exist yet — the fastest route to refunds and one-star reviews, even
> when the updates are free. And Steam wishlists are earned BEFORE launch, which
> makes the **Next Fest demo (Oct 2026)** the highest-leverage date on the
> calendar, not an Apple submission.
>
> **Model:** Act 1 free = the demo, on both storefronts. $14.99 unlocks Acts 2–3
> and every map. All 20 missions complete at launch.
>
> **Horizon:** campaign complete → Next Fest demo Oct 2026 → Steam launch
> Feb 10, 2027. The Mac App Store submission happens when the game is done; it
> is a rehearsal of the pipeline, not a launch. Nothing below is deleted — the
> Apple track is intact and UNSCHEDULED.

Interactive version: `.claude/ship-widget.html` renders as a widget at the start
of every Claude session (SessionStart hook in `.claude/settings.json`). Keep this
file and the widget's task lists in sync.

## PRIORITY: finish the campaign (10 missions remain, 10 of 20 built)

Engine work still gating missions: allied AI faction (M11, M18), corrupted
spawner buildings (M14), den-seeding timer (M15), Broodmother combat version
(M20). Maps still to build: Evac Coast, The Crater. Standing rule: **M10+
missions are a mandatory 20–25 minutes.**

## Apple submission track — UNSCHEDULED, after the campaign is finished

Still the correct order when it's time. No dates until the game is done.

- [x] Developer Program membership — covered by existing account
- [ ] NEXT UP: Create the Broodfall app record in App Store Connect — unblocked by the 2026-07-23 rename; bundle ID `com.bronsongannon.broodfall`, free-with-IAP — **and in the same visit create the IAP itself: non-consumable `com.bronsongannon.broodfall.full`, $14.99** (price REVISED 2026-07-28 with the business model — sale $9.99 on a ~45-day cadence, calendar in BROODFALL-BRIEF.md; the code ships expecting exactly that product id). OPEN DECISION riding on the same revision: free tier is now "all of Act 1 + 4 skirmish maps" on paper, but `FREE_MISSIONS` is still 3 and `FREE_MAPS` still ['basin'] in game.js — decide whether the constants move before this Mac submission or at the Steam launch when Acts 2–3 exist to sell (unscheduled)
- [x] IAP gate — DONE 2026-07-22 (coded + verified, was the last CRITICAL from the audit). `BFStore` entitlement layer in game.js (per-platform backends per BROODFALL-BRIEF item 3: StoreKit via `bfstore` message bridge in the wrapper, all-unlocked on the web build; fails CLOSED in-wrapper until StoreKit answers), gates campaign missions 4+ (list + `startMission` backstop) and all skirmish maps but Crystal Basin (picker + `startGame` backstop + remembered-pick fallback), unlock strip with localized price + restore-purchases UI (guideline 3.1.1), dev mode / `CC.devMode` / `CC.unlockAll` dead in release wrapper builds (DEBUG builds re-enable). Swift side: `mac/Broodfall/StoreBridge.swift` (StoreKit 2, `Transaction.currentEntitlements` + `updates` listener, purchase/restore/error pushes). Local testing: `mac/Products.storekit` wired into the Run scheme — hit Run in Xcode and the buy button completes a test purchase. Verified: wrapper builds; browser harness with a fake bridge passed every gate, the unlock transition, busy/error/debug paths, and a clean 600-tick soak; web build regression-free (no paywall UI).
- [x] Build the Mac wrapper — WKWebView shell in Xcode loading the game locally (2026-07-22: `mac/`, sandboxed + signed, full game verified inside — see mac/README.md)
- [x] App icon + 1024px store icon (2026-07-22: pipeline + archive-ready icon from the game's crystal sprite, `mac/icon/`; commissioned upgrade optional — one-file drop-in, budget can go to store key art instead)
- [ ] Store listing — screenshots DONE 2026-07-26 (six 2560×1600 drafts in assets/store/screenshots/); description/subtitle/keywords still to draft (unscheduled). TWO RULES: (1) performance copy = "smooth, adaptive, tuned for battery play", never a frame number; (2) NO competitor trademarks anywhere in listing/keywords — no StarCraft, Brood War, Command & Conquer, Blizzard (Apple 2.3.7 rejects for competitor marks in metadata; "brood war" is a registered Blizzard mark per the standing BROODFALL-BRIEF rule). Genre in our own words: classic-style real-time strategy.
- [x] Privacy policy page — DONE 2026-07-26: privacy.html at the Pages root → https://bronsongannon.github.io/broodfall/privacy.html (the URL App Store Connect asks for)
- [ ] Sandbox entitlements, code signing, notarize, test on a clean Mac (unscheduled)
      (native menu bar + fullscreen + quit in the wrapper to dodge guideline 4.2)
- [ ] Archive, upload, submit for review (unscheduled). **FIRST STEP of the archive: flip `DEV_PRERELEASE` to `false` in game.js** (added 2026-07-24 so Bronson's local wrapper builds keep dev tools; true in a shipped build = paywall bypass)

## Game build roadmap

- [x] Mission framework + Mission 1 "Landfall" (briefings, objectives, capture op)
- [x] Tech tree, power grid, depot repair field, factory/airpad repair bays
- [x] Landfall pacing round 3 — DONE 2026-07-28 (Bronson: "reaching 12 min", wanted it harder). Taking the specimen now empties EVERY nest on the map onto your base: new `rally` trigger action pulls the standing broods and roamers off their leashes, each nest disgorges one more, ~8 spitters converge from both scouted fields. Warning then charge — Lin names it and Vega orders you to reinforce 20s before contact, because at the tutorial minimum (4 marines + 1 turret) a passive player loses 5 runs in 6 while three marines queued in that window holds 6 of 6. Probe wave 3→4, mine 1000→1250
- [ ] Playtest Landfall again — does the reprisal land it in the 15-minute window, and does the fight feel like a reaction to the capture?
- [x] Team color pass — wild dino bone/moss, red identity touches (2026-07-12)
- [x] Raptor + Raptor Den — engine complete, M7 scripts the debut (2026-07-13)
- [x] Missions 2–3: harvester convoy escort, first nest crack (2026-07-12)
- [x] PERFORMANCE — SETTLED 2026-07-31 after a week of live readouts from Bronson's MacBook Air and Mac mini. **Final posture: large battles hold ~30-39fps in the Mac wrapper and no longer degrade as the fight grows; light play and small skirmishes hit 60.** Two real fixes and three dead ends, in order:
      **FIX 1 — the missing JIT entitlement.** `ENABLE_HARDENED_RUNTIME = YES` with no `com.apple.security.cs.allow-jit`, so JavaScriptCore ran interpreted. Wrapper measured `sim 5.4ms` at 58 units where Chrome measured `0.6ms` at 82 — a ~10x script gap. Adding the entitlement took sim to 0.3-0.4ms. Permitted for App Store distribution.
      **FIX 2 — allocation churn in the effects system.** `updateFx` did `fxs = fxs.filter(...)` EVERY TICK — a fresh array 60x/second, plus one for alerts — and `fxSprite`, the hottest spawner, did `Object.assign` onto a fresh literal (two allocations per spark). That garbage is collected BETWEEN frames, so it never appeared in the sim or draw timers while still costing frames. Compacted in place; defaults written onto the caller's literal. Measured before/after at quarter screen: 83u/96fx 23fps -> 151u/114fx 32fps. Full screen: 62u/79fx 29fps -> 151u/121fx 39fps. **~2.4x the units at higher fps, and crucially fps stopped tracking battle size.**
      **DEAD END 1 — battery throttling.** The original 2026-07-30 conclusion. Disproved by the Mac mini: desktop, AC power, 120Hz display, Game Mode on, same collapse.
      **DEAD END 2 — fill rate / pixel budget.** Frame rate is independent of backing-store size, and post-fix the QUARTER-size window is consistently SLOWER than full (29/30/32 vs 35/35/39) — backwards for a pixel bottleneck.
      **DEAD END 3 — draw-call volume.** The dev fx-draw toggle (key K) changes nothing in any mode: 32/34 with effects not drawn, 34 half, 35-39 all.
      **WHAT REMAINS is frame PACING, not throughput** — `sim 0.3ms + draw 0.4ms` is under a millisecond of work in a 28ms frame, and the missing ~27ms is now constant regardless of load, pixels or effects. That is a WebKit/WebContent property. Not worth fighting before submission; the Electron (Chromium) wrapper already planned for Steam is where to re-evaluate, with no deadline attached — Chrome on the same Mac mini runs 82u/286fx at 60fps.
      **STORE LISTING RULE: never promise a frame number.** Say the game runs smoothly in large battles. That is now true and defensible.
      Dev instruments for re-measuring, all dev-mode-gated: **I** injects a repeatable stress wave (14 units a side per press, tough enough that nothing dies, so a screenshot curve is comparable across builds and machines); **K** cycles effect DRAWING all/half/none while effects keep simulating; the readout prints fps, backing size, scale, sim, draw, unit and fx counts.
      METHOD NOTE, since it cost several rounds: counting `drawImage` calls to verify the fx toggle DOES NOT WORK — the governor calls `resize(); render()` inside the same frame when it changes budget, so any frame where it sharpens is counted twice and "effects off" measured MORE draws than "effects on". Screenshots and the `draw` submission timer are the honest instruments.
- [x] Act 2 opener M8 "Strip Mine" BUILT 2026-07-28 — economy race (out-haul Krauss before his counter hits 7000), his forward refinery is the valve that throttles it, he nukes the pit colonies as "overburden", and a Raptor Den erupts from the crater hunting BOTH sides. New engine: scripted rival `haul` counter + trigger action, per-team mined tally
- [x] Screecher + Ironback art COMPLETE 2026-07-28 — statics, walk/flap cycles, death frames, both installed with provisional stats. Broodmother SCRAPPED (read as a tick; redesign brief in assets/sprites/DINOS-ACT23.md)
- [x] Raptor scaled up 2026-07-28 (Bronson: should read scary) — 34px → 46px; drawDino now derives size from `r` instead of hard-coding it (the Ironback was drawing at 26px with a 43px hit circle), melee reach grown with the body, raptor death frames renormalized
- [x] Playtest fixes 2026-07-29 — M2 convoy arrival LATCHES (it needed 4 haulers inside the circle simultaneously; a trickling convoy could peak at 3 and hang) + a visible 60s loading clock replaces the dead window at Beta; unarmed units hold a 190px standoff on attack-move instead of walking through their own firing line (medic was ending up 100px AHEAD of the lead marine and dying in 6s — not a speed problem); medic speed 1.8 → 1.6; WASD camera toggle on the start menu
- [x] ~~Trade-road pathing pocket~~ — NOT REAL (2026-07-29). The "frozen" haulers were a harness artifact: the convoy had dropped below 4, the scripted defeat had already fired, and the sim was stopped. With the convoy alive the road walks fine 3/3
- [x] M2 root cause FOUND 2026-07-29 via a console dump from Bronson: three of six haulers never left the start, so the quota sat at 3/4 with nothing on screen saying so. Objective text read "(4+ harvesters alive)" — a survival rule — when it meant "deliver four". Fixed: counted objectives (groupReach/unitCount/built) show live n/N progress in the HUD; groupReach takes `unit` so ANY harvester counts, not the tagged spawn group; the loss rule became `unitsBelow` to match (you could previously hold 6 harvesters and still fail because the wrong 3 died); objective + intro reworded. GOTCHA caught in test: the widened loss rule fires at tick 0 unless gated — the player starts with 3 harvesters and the convoy spawns at t=0.5s
- [x] M2 return leg was completing for FREE (2026-07-29, Bronson: "the mission completed without me having all the harvesters head back"). Fallout from widening the arrival pool to any harvester: NINE harvesters sit inside the home circle when the return activates, so it latched 4 instantly. groupReach gained `after: '<objId>'` — the trip home only counts haulers that actually reached Beta. Latching moved out of objMet into missionUpdate so a completed leg keeps recording visits and a replacement can still do the round trip
- [x] M2 PACING SETTLED 2026-07-29: 9:44 with the return leg skipping itself → **10:14** with it enforced, and Bronson's call is **keep it as is**. Do NOT lengthen M2 toward the old ~15-min figure — that target came from the 2026-07-14 Q&A and is superseded here by a real playthrough. The length ramp still applies to LATER missions
- [x] M3 no longer ends the moment you hatch (2026-07-29, Bronson: "we hatch the dinos but we need them to do something first"). Hatch count 1 → 3, then Lin's field test: walk the pack onto the NORTHERN mound Rubicon has been feeding riflemen into for three shifts, and take it. Rubicon's theater squads now keep spawning until that nest falls, so you arrive mid-slaughter. New beat: the wild brood ENGAGES the tamed pack — same species, tearing at each other — which is Lin's Act 2 thesis landing early
- [x] Per-mission arsenal allowlist 2026-07-29 — `allow: {bld, unit}` per mission; M1 offers depot/barracks/turret/refinery only, M5 offers nothing at all (commando), M8 opens the full arsenal. Skirmish and the AI untouched
- [x] Maps grew 50% (2026-08-04): 144×108 tiles / 4608×3456 px — Brood War scale, serving the 20–30-min match goal. All ~203 absolute mission coordinates scaled ×1.5; full campaign + skirmish re-verified same night. Pacing on the bigger ground still needs a live skirmish
- [x] M9 "The Silence" REBUILT as the Roost (2026-08-05) after the switchback mountain died in playtest ("i hate this mission. its terrible" — lesson: fantasy first, geometry second). Land in force at dusk, build the listening post, hold a 12-minute night against three roost lanes (killing a roost silences its lane), recover three flight recorders, dawn recalls the flock mid-attack. Night doubled same evening: 28/30/35s deep-night cadences + mass launches at 340s/580s. Verified end to end; zero errors
- [x] M9 pacing round 1 from Bronson's live playtest (2026-08-12): the night was DEAD AIR — root cause was an engine subtlety, a repeat trigger's true period is `every` PLUS `delay` (each cycle re-arms then waits delay again), so the "28/30/35s" lanes actually fired every 103/125/150s. Retuned to staggered periods 65/75/90s = a hit every 20–30s while all roosts stand. Same session: roosts are a real building now (`roost` — cliff-spur eyrie with guano streaks, bone-twig crown, perched wing-stretching screecher + 2 wing-guards; OPT slot dino_roost) instead of wearing spitter-nest art; and FULL CLEAR = EARLY DAWN via the new `finish` trigger action (the ✔ twin of `cancel`): three roosts cold + three recorders home ends the night — no more sitting out a clock you already beat. All verified: cadence measured 12 waves/5min, early-dawn chain to WIN, roost renders distinct
- [ ] Playtest M9 again — LENGTH IS SETTLED (Bronson 2026-08-12: finished under 15 min, "which is fine" — clears the ≥10-min bar, do not pad it). The open question is DENSITY only: does the retuned night (a hit every 20–30s) feel jam-packed without drowning the recorder sorties, and does the early-dawn reward tempt you into risking the roost attacks? Knobs: lane periods (65/75/90s), wave sizes (2/2/3), the two mass launches
- [x] M10 "Broodfall" BUILT (2026-08-11) — the title drop. Siege the walled city; at HQ half-health the kill objective is CANCELLED, an unkillable swarm (first Ironbacks) eats the city in real time, and the win flips to "evacuate 8 units through the eastern pass". New engine, all generic: `bldBelow` trigger condition, `cancel` trigger action (struck-through HUD + winWhen-settled), `aiOff` (red stands down mid-mission), groupReach `any` (evac counts mixed types), and the swarm-leash pattern (invuln pack + repeating re-rally onto the fortress = terror as theater, escape winnable) — EXCEPT three hunters that break off at +20s and chase the column on 20-second-old scent via the new `rally at: 'units'` (Bronson's call, same day: not fully leashed, a few chase all the way and catch up). The hunter test exposed a hole, now fixed generically: trigger action `noBase` flips the loss rule mid-mission, so the written-off base dying during the evacuation no longer prints MISSION FAILED — your people are the loss condition after the flip. New map: Krauss's Bastion (13 of 15) — walled NE city, two kill-lane gates, eastern evac pass; wall enforcement proven by flood-fill (gates plugged = city sealed). Full win chain, both cancel variants, lose path, 15k-tick hard soak, regressions, thumbnail — all verified, zero errors
- [ ] Playtest M10 with a stopwatch — the 20–25-min mandate starts HERE. Mission runs diff 'hard' (Krauss CAN nuke mid-siege, deliberate); watch whether the flip lands as horror or relief, whether the evac reads as a run or a stroll, and whether the fortress assault alone carries 15+ min
- [ ] Pacing pass toward 20–30 minute matches — game-wide: skirmish AND the mission ramp (M9 ≥10 min; every mission M10+ mandatory 20–25 per the 2026-08-04 standing rule)

## Art and audio

- [x] Cast portraits: Vega, Lin, Krauss — DONE 2026-07-21 via DaVinci (photorealistic film-still set, bust-cropped for the PiP; full-res originals in assets/portraits/source/)
- [ ] Voice engine pick + generate Act 1 lines — script is exported at assets/voice/voice-script.tsv, workflow in assets/voice/README.md

- [x] Source the 14 sound-effect slots — all filled, Kenney CC0 + one Freesound klaxon (2026-07-13)
- [x] Generate unit_rig.png and bld_power.png — superseded by full colorway art set (2026-07-12)
- [x] Dino art hunt — resolved via Gemini colorway pipeline (2026-07-12)
- [x] Standing sniper art (2026-07-12)
- [x] Turret gun red (2026-07-12)
- [x] Rocket trooper death sheet — red recolor (2026-07-12; teal frames re-sliced too, old grid artifacts fixed)
- [x] Spitter death sheets — wild AND teal colorways (2026-07-12)
- [x] Infantry death sheets: marine, sniper, medic, engineer, teal + red (2026-07-12)
      (death frames: infantry + dinos only; vehicles keep the fireball, aircraft skip;
      every future dino sheet includes IDLE + DEATH from day one)

## Shipped — M2 playtest round (Jul 23)

- [x] Voice lines never cut off anymore: a queued backlog used to truncate a playing clip
      (Krauss lost 3s of his M2 line to Lin) — rush now only trims the after-clip hold
- [x] Stuck-unit escape: units orbiting a building cluster (the "barricaded" convoy
      harvester at Survey Post Beta) now detect zero progress and ghost out in ~3s
- [x] Sinkable Supply Depots + Power Plants: Q (or the card button) lowers them flush with
      the ground — army drives over, all function retained, Q again raises

## Shipped — playtest round + full code audit (Jul 11–12)

- [x] Mission 1 reworked: exploration first — dinos only retaliate after your patrol is spotted
- [x] Specimen weapons-lock: player fire (including splash) physically can't hurt the capture target
- [x] Progressive build menu: locked buildings hidden, unlock toasts; Depot is the true tier-0
- [x] Dialogue backlog fast-forward — tutorial commentary drains in ~16s instead of ~45s
- [x] Constructing buildings no longer heal away combat damage (were nearly unkillable mid-build)
- [x] Interrupted specimen/egg hauls auto-resume — killed a tutorial soft-lock
- [x] Units killed mid-tick can no longer act or count toward mission objectives
- [x] Nuke safety: no dead-silo launches, no mode-stacking accidental launches, no overlay race on quit
- [x] Menu hotkeys gated off, mission rig costs no supply, enemy plant can't spawn on crystals, AI refineries obey the tech tree
- [ ] Map roster: 15 maps / 20 missions locked 2026-07-24 (table in CAMPAIGN.md). 13 built (Krauss's Bastion landed 2026-08-11 with M10); 2 to build — Evac Coast (M13), The Crater (M18–M20)
- [x] Mission 7 "High Water Mark" built 2026-07-26 — the Act 1 finale and the first campaign mission with a live red base (AI + waves). Dam → both river forts → Krauss's HQ → the den that erupts mid-victory-speech. Win chain, lose path and an 18k-tick hands-off soak verified
- [x] Missions 4–6 ("Dig In", "Ghost Survey", "Countdown") — BUILT 2026-07-27. **ACT 1 IS COMPLETE, 7/20 missions.** Shipped with them: the framework batch (`survive` + `limit`/`onExpire` deadline objectives with a live HUD countdown, `groupDead`, location-aware `built`, `noBase` commando missions, trigger action `nuke` for scripted launches, spawn `aim` at a building type). Paid tier is now 4 missions instead of 1
