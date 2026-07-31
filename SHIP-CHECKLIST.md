# Ship checklist — Mac App Store by August 14, 2026

> **Deadline moved +2 weeks (Bronson, 2026-07-31; was July 31).** The final week
> went to the fps saga (resolved: battery throttle is the platform, posture
> below) and Act 1 completion — the store-facing work (app record, listing,
> notarization) hasn't started. Two clean weeks beats a scrambled two days.

Working checklist (updated 2026-07-16). Goal: submit Broodfall v1 (skirmish + Mission 1)
to Apple by end of month. Apple Developer membership already covered by the
existing account (one membership, unlimited apps) — no enrollment wait.

Interactive version: `.claude/ship-widget.html` renders as a widget at the start
of every Claude session (SessionStart hook in `.claude/settings.json`). Keep this
file and the widget's task lists in sync.

## Apple submission track (critical path, in order)

- [x] Developer Program membership — covered by existing account
- [ ] NEXT UP: Create the Broodfall app record in App Store Connect — unblocked by the 2026-07-23 rename; bundle ID `com.bronsongannon.broodfall`, free-with-IAP — **and in the same visit create the IAP itself: non-consumable `com.bronsongannon.broodfall.full`, $14.99** (price REVISED 2026-07-28 with the business model — sale $9.99 on a ~45-day cadence, calendar in BROODFALL-BRIEF.md; the code ships expecting exactly that product id). OPEN DECISION riding on the same revision: free tier is now "all of Act 1 + 4 skirmish maps" on paper, but `FREE_MISSIONS` is still 3 and `FREE_MAPS` still ['basin'] in game.js — decide whether the constants move before this Mac submission or at the Steam launch when Acts 2–3 exist to sell — by Aug 4
- [x] IAP gate — DONE 2026-07-22 (coded + verified, was the last CRITICAL from the audit). `BFStore` entitlement layer in game.js (per-platform backends per BROODFALL-BRIEF item 3: StoreKit via `bfstore` message bridge in the wrapper, all-unlocked on the web build; fails CLOSED in-wrapper until StoreKit answers), gates campaign missions 4+ (list + `startMission` backstop) and all skirmish maps but Crystal Basin (picker + `startGame` backstop + remembered-pick fallback), unlock strip with localized price + restore-purchases UI (guideline 3.1.1), dev mode / `CC.devMode` / `CC.unlockAll` dead in release wrapper builds (DEBUG builds re-enable). Swift side: `mac/Broodfall/StoreBridge.swift` (StoreKit 2, `Transaction.currentEntitlements` + `updates` listener, purchase/restore/error pushes). Local testing: `mac/Products.storekit` wired into the Run scheme — hit Run in Xcode and the buy button completes a test purchase. Verified: wrapper builds; browser harness with a fake bridge passed every gate, the unlock transition, busy/error/debug paths, and a clean 600-tick soak; web build regression-free (no paywall UI).
- [x] Build the Mac wrapper — WKWebView shell in Xcode loading the game locally (2026-07-22: `mac/`, sandboxed + signed, full game verified inside — see mac/README.md)
- [x] App icon + 1024px store icon (2026-07-22: pipeline + archive-ready icon from the game's crystal sprite, `mac/icon/`; commissioned upgrade optional — one-file drop-in, budget can go to store key art instead)
- [ ] Store listing — screenshots DONE 2026-07-26 (six 2560×1600 drafts in assets/store/screenshots/); description/subtitle/keywords still to draft — by Aug 8
- [x] Privacy policy page — DONE 2026-07-26: privacy.html at the Pages root → https://bronsongannon.github.io/broodfall/privacy.html (the URL App Store Connect asks for)
- [ ] Sandbox entitlements, code signing, notarize, test on a clean Mac — by Aug 11
      (native menu bar + fullscreen + quit in the wrapper to dodge guideline 4.2)
- [ ] Archive, upload, submit for review — by Aug 12 (2-day buffer). **FIRST STEP of the archive: flip `DEV_PRERELEASE` to `false` in game.js** (added 2026-07-24 so Bronson's local wrapper builds keep dev tools; true in a shipped build = paywall bypass)

## Game build roadmap

- [x] Mission framework + Mission 1 "Landfall" (briefings, objectives, capture op)
- [x] Tech tree, power grid, depot repair field, factory/airpad repair bays
- [x] Landfall pacing round 3 — DONE 2026-07-28 (Bronson: "reaching 12 min", wanted it harder). Taking the specimen now empties EVERY nest on the map onto your base: new `rally` trigger action pulls the standing broods and roamers off their leashes, each nest disgorges one more, ~8 spitters converge from both scouted fields. Warning then charge — Lin names it and Vega orders you to reinforce 20s before contact, because at the tutorial minimum (4 marines + 1 turret) a passive player loses 5 runs in 6 while three marines queued in that window holds 6 of 6. Probe wave 3→4, mine 1000→1250
- [ ] Playtest Landfall again — does the reprisal land it in the 15-minute window, and does the fight feel like a reaction to the capture?
- [x] Team color pass — wild dino bone/moss, red identity touches (2026-07-12)
- [x] Raptor + Raptor Den — engine complete, M7 scripts the debut (2026-07-13)
- [x] Missions 2–3: harvester convoy escort, first nest crack (2026-07-12)
- [x] GPU/perf pass — DONE 2026-07-27 (Bronson: fullscreen wrapper lag in a nest fight + machine running hot). Render capped to 60fps (a 120Hz ProMotion Mac was doing double the GPU work), backing store capped to a 3.2M-pixel budget (−38% on a MacBook Air fullscreen up to −78% on a 5K display), alpha:false context, additive effects batched into one blend pass, and an adaptive governor that steps quality down under 48fps and back up at 60 — persisted to `cc.gfx` so a slow Mac starts where it left off. Dev mode shows a two-line diagnostic readout top-right. **RESOLVED 2026-07-30 after a week of live readouts from Bronson's M5 Air: the performance claim is NOT "60fps" — it's adaptive.** Final measured posture: **plugged in = 60fps at full sharpness; on battery = sharp, stable, full-effects ~22-26fps**, because macOS paces WKWebView's WebContent (and Safari) at ~22-26Hz on battery and nothing App-Store-safe pierces it (native frame driver tried, measured via `ext N/s` instrumentation, removed; Game Mode engages but doesn't lift it). The graceful stack that makes battery play good: BAT power profile (2.0MP budget via PowerBridge.swift), futile-cut/floor-starve conviction (CAP↑ restores sharpness when cuts can't help), two-speed ceiling recovery, no-flicker same-frame repaints. Store listing rule: say "smooth, adaptive performance tuned for battery play" — never promise a number
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
- [ ] Pacing pass toward 20–30 minute matches

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
- [ ] Map roster: 15 maps / 20 missions locked 2026-07-24 (table in CAMPAIGN.md). 11 built (High Water Mark, Twin Forks, Overgrown Basin landed 2026-07-26); 4 to build — Krauss's Bastion, Exodus Road, Evac Coast, The Crater
- [x] Mission 7 "High Water Mark" built 2026-07-26 — the Act 1 finale and the first campaign mission with a live red base (AI + waves). Dam → both river forts → Krauss's HQ → the den that erupts mid-victory-speech. Win chain, lose path and an 18k-tick hands-off soak verified
- [x] Missions 4–6 ("Dig In", "Ghost Survey", "Countdown") — BUILT 2026-07-27. **ACT 1 IS COMPLETE, 7/20 missions.** Shipped with them: the framework batch (`survive` + `limit`/`onExpire` deadline objectives with a live HUD countdown, `groupDead`, location-aware `built`, `noBase` commando missions, trigger action `nuke` for scripted launches, spawn `aim` at a building type). Paid tier is now 4 missions instead of 1
