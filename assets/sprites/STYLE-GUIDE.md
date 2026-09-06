# Broodfall — visual style guide

Team spec sheet + character spec sheet (2026-07-12). The goal: get past the
single multiply-tint. Every faction gets a five-role palette, and every unit,
building, and dino gets a spec: which palette roles it wears, and one
**signature detail** that makes it readable at 30px.

## Human technology production lock (2026-09-05)

The naval benchmark—`bld_skiff.png`, `unit_carrier_teal.png`, and `bld_shipyard_teal.png`—governs camera, silhouette, and grounded hard-surface rendering. The user-approved 2026-09-06 Barracks is the land-building color/value reference: aqua-dominant weathered armor, dirty warm taupe/off-white secondary metal, crisp charcoal seams and machinery, and restrained amber lights. All 14 installed Expedition/teal Phase 1 families now apply that reference. Production sprites require true alpha, safe transparent padding, and no baked ground, drop shadow, scenery, people, text, logo, or perspective. The palette roles below remain the faction-identity system, but no longer imply broad flat-color fills or heavy cartoon outlines.

Phase 1 is complete as 14 teal/red families (28 target files): HQ, barracks, factory, supply depot, power plant, refinery, airpad, missile silo, turret base, flak base, hydro dam, Overwatch Array base, single-barrel anti-ground mount, and distinct twin-barrel AA mount. All 14 teal families use the approved lighter, aqua-dominant, weathered Barracks reference. All 14 installed red counterparts still derive from superseded teal finals and must be regenerated as precise image-to-image colorway edits of the current teal files, with each red preview separately approved before installation; red assets are never independently redrawn.

The hydro art is an intentionally ultra-wide 256×40 source drawn at 192×30 across its unchanged 84×64 collision footprint. The sensor art is a static base under the game-driven rotating dish/feed horn/sweep. Turret and flak base art omits the weapon; separate 28×28 runtime mounts preserve aim and recoil. Construction state, selection and health UI, production/upgrade progress, rally indicators, power state, and lowered-building treatment remain renderer-owned layers rather than baked art.

Exact prompts are stored under [`../../image-audit/prompts/`](../../image-audit/prompts/), and the authoritative source/runtime dimensions plus validation links are in [`README.md`](README.md#human-technology-phase-1--buildings) and [`../../IMAGE-AUDIT.md`](../../IMAGE-AUDIT.md#human-technology-replacement--phase-1-complete).

Phase 2 is complete as nine matched teal/red vehicle or aircraft pairs/poses (18 target files): APC, mobile artillery, deployed artillery hunker, gunship, Harrier, harvester, raider, capture rig, and tank. Every selected final is a 256×256 RGBA sprite with safe alpha padding and no canvas contact. The original Expedition carrier remains the approved benchmark; its runtime presentation was enlarged from 136×136 to 200×200 with matching oriented selection and hit geometry, while navigation radius, shoreline fit, and wake origin stay unchanged.

The authored gunship and Harrier colorways now route through their special renderers without losing dynamic rotor or payload state. Artillery hunker has selection priority over standing art, and authored artillery avoids duplicate legacy barrel decoration. Authored Harvester and Rig avoid only duplicate hazard-tick strokes while retaining egg/crystal cargo state, captive glow, and the capture ring. Raider, tank, and artillery muzzle-flash/smoke anchors align with their new silhouettes. Phase 2 prompt records are indexed in [`PROMPTS.md`](PROMPTS.md#human-technology-phase-2--authoritative-prompt-set), and full dimensions plus validation status are in [`README.md`](README.md#human-technology-phase-2--vehicles-and-aircraft) and [`../../IMAGE-AUDIT.md`](../../IMAGE-AUDIT.md#human-technology-replacement--phase-2-complete).

Phase 3 is complete as six atomic human-soldier families totaling 147 production files: Marine 28, Engineer 26, Sniper 28, Medic 26, Rocket Trooper 26, and player-only Boone/Commando 13 teal files. Marine and Sniper include hunker poses; every family includes its static, all eight walk frames, and all four death frames. Every file is a north-facing 256×256 RGBA sprite with safe transparent padding and no canvas-edge contact.

Built-in ImageGen made each production asset in a distinct call. Every selected call includes the approved skiff, carrier, and naval shipyard benchmarks; derived poses additionally include the normalized family master for identity continuity. Teal was authored first; each red frame is a precise image-to-image colorway edit of the corresponding normalized teal final. The exact family ledgers in [`PROMPTS.md`](PROMPTS.md#human-technology-phase-3--authoritative-prompt-set) supersede all older human-sprite generation notes.

Soldier presentation uses authored draw boxes independent of collision: Marine 30×30, Engineer 29×29, Sniper 32×32, Medic 30×30, Rocket 32×32, and Commando 32×32. Eight-frame walks advance by distance traveled, authored Marine/Sniper hunker sprites take priority, and corpses plus selection/hunker rings follow the authored visual footprint. Authored Marine, Sniper, Rocket, and Commando assets suppress duplicate procedural decoration. Those four armed families use 14 px muzzle anchors. The production cache revision is `human-tech-20260906c5`.

The Phase 3 audit moves from 145/147 before, with the Marine hunker pair missing and 73 legacy alpha masks contacting a canvas edge (including 38 manually identified as visibly clipped), to 147/147 after with zero edge contact. The clipping and hunker gaps are resolved. Full evidence is under [`../../image-audit/phases/phase-3/`](../../image-audit/phases/phase-3/).

Final verification passes: all 147 sprites produce zero hardened-validator errors, and the 14 review-only overlap advisories are visually cleared. Source/gameplay sheets and four-palette motion QA pass with no browser console findings; code/diff checks, the macOS Debug build, and byte verification of all 149 bundled Phase 3 payload files also pass.

## How color works (the five roles)

| Role | What it paints | Example |
|---|---|---|
| **Hull** | The body mass — what the multiply tint does today | tank chassis, marine armor |
| **Trim** | Panels, stripes, cloth, secondary mass (~20% of the sprite) | bay doors, shoulder pads, racing stripe |
| **Accent** | Lights, visors, energy, tips (~5%, the "pop") | visor strip, warning lights, barrel band |
| **Structure** | Building-only hull variant (usually darker/heavier) | Rubicon architecture |
| **FX** | That team's projectiles, engine glow, selection feedback | tracer color, spit glob |

Rule of thumb per sprite: 75% hull, 20% trim, 5% accent.

**Colorblind rule (enforced):** teams separate by LUMINANCE, not just hue —
bone .72 / teal .59 / red .49 / (Broodfallen rust ~.38). Any new team scheme
must land on its own brightness band; check the minimap first.

## Team spec sheet

### Expedition (player, team 1) — "survey fleet"
Clean, scientific, a little weather-worn. NASA-meets-field-geology.

| Role | Hex | Notes |
|---|---|---|
| Hull | `#3fb9c9` | established teal |
| Trim | `#e8e4d8` | off-white panels — lab equipment in the dirt |
| Accent | `#f0c86a` | warm amber lights/visors |
| Structure | `#2f97a6` | buildings one shade deeper than vehicles |
| FX | `#9fe8ef` | pale-teal tracers/glow |

### Rubicon Mining (red, team 2) — "strip-mine conglomerate"
Heavy iron, corporate hazard-striping, machines that eat mountains. Not evil — profitable.

| Role | Hex | Notes |
|---|---|---|
| Hull | `#e0564a` | established red |
| Trim | `#3a3f45` | industrial charcoal/iron |
| Accent | `#f2b63d` | hazard yellow — chevrons, warning plates |
| Structure | `#b8443a` | darker corporate architecture (SHIPPED via bldSprite) |
| FX | `#f5a89a` | hot salmon tracers |

Identity extras (shipped): Rubicon pennant on the HQ (`drawRubiconBanner`).

### Wild dinos (team 3) — "fauna, not faction"
Bone hide, moss shadow. They should read like wildlife photography, not a third army.

| Role | Hex | Notes |
|---|---|---|
| Hide | `#c2bb96` | pale bone (SHIPPED) |
| Stripe | `#5f5c3e` | moss back-stripes/tail |
| Accent | `#a8d060` | venom — sac, spit, drool (biology, not faction; SHIPPED on sac) |
| Eyes/claw | `#e0a43c` | amber — predator eyeshine |
| FX | `#b6e06a` | acid spit glob + trail |

Player-hatched spitters stay teal-hulled (they're YOUR fauna) but keep venom accents.

### The Broodfallen (Act 3 preview) — "what the planet did to Rubicon"
Corrupted red: rust eaten by overgrowth, lit from inside by something wrong.

| Role | Hex | Notes |
|---|---|---|
| Hull | `#8f4a3e` | dead rust — recognizably red's bones |
| Trim | `#4a5540` | overgrowth olive |
| Accent | `#9fd44a` | sickly green — infection glow |
| Biolum | `#b48ad8` | purple bioluminescence, night-light pulsing |
| FX | `#a4e05a` | corrupted acid |

## Character spec sheet

Format: **Name — palette usage — signature detail** (the one thing that must
survive at 30px). Phase 3 final-color soldier art bakes these details into each
frame; the renderer suppresses only the corresponding duplicate decoration.

### Infantry (both human teams; trim/accent from their table)

- **Marine** — hull armor, trim shoulder pads — *accent visor strip across the helmet*
- **Sniper** — trim-heavy cloak (drab, low contrast) — *accent scope glint, one pixel of menace*
- **Medic** — weathered gunmetal/taupe body with limited universal off-white backpack and hand-case panels — *medical crosses on the kit + restrained shoulder/helmet team IDs*
- **Engineer** — hull coveralls — *accent hard hat (shipped) + steel tool arm*
- **Rocket Trooper** — hull armor, charcoal launch tube — *red warhead tip peeking from the tube*
- **Boone / Commando** — heavier elite armor, restrained teal — *three gold master-sergeant chevrons*

### Vehicles

- **Harvester** — hull chassis, trim cargo bed — *hazard-stripe scoop + live crystal/egg cargo treatment (shipped)*
- **Raider** — hull wedge — *trim racing stripe nose-to-tail + accent headlight*
- **Tank** — hull mass, trim turret ring — *accent muzzle band on the barrel*
- **APC** — hull box, trim bay doors — *hazard chevrons on the rear ramp*
- **Artillery** — hull carriage, trim recoil rails — *accent bands ringing the long barrel*
- **Capture Rig** — harvester spec + bone-white cage — *xeno-green containment glow when loaded (shipped)*

### Air
- **Gunship** — hull fuselage, trim tail boom — *accent nose sensor ball*
- **Harrier** — hull delta, trim wingtips — *accent engine intake glow*

### Dinos (wild palette; tamed swap hide→team hull, keep venom/eyes)
- **Spitter** — bone hide, moss back-stripes — *venom throat sac (shipped) + amber eyes*
- **Raptor** (future) — moss-forward hide (darker than spitter) — *bone claws + eyeshine*
- **Screecher** (future) — bone wings — *venom membrane webbing*
- **Ironback** (future) — slate plate armor over bone — *moss growing ON the plates*
- **Broodmother** (future) — Broodfallen palette — *purple biolum pulse*

### Buildings (structure hull; trim/accent from team table)
- **HQ** — structure mass — *team-FX beacon pulse (exists) + flag (Rubicon shipped; Expedition pennant TBD)*
- **Barracks** — structure walls — *trim awning stripes over the door*
- **Factory** — structure mass — *hazard-striped bay doors*
- **Supply Depot** — structure pad — *natural wood/steel crates + one trim band*
- **Power Plant** — structure dome — *amber coil glow (shipped as bolt emblem)*
- **Refinery** — structure — *crystal-teal intake glow (exists)*
- **Turret / Flak** — structure base — *steel gun + accent status light when powered*
- **Missile Silo** — structure ring — *red warhead + hazard ring around the doors*
- **Airpad** — structure pad — *white pad markings (exists) + accent landing beacon*

## Legacy death-sheet workflow (2026-07-12; superseded by Phase 3)

The game still plays `unit_<type>_death1..4_<colorway>.png`, lingers on the
body, and fades it instead of substituting the fireball. The former Gemini
sheet and DaVinci walk-video workflow is no longer valid for human production
art: Phase 3 uses one distinct built-in ImageGen call per selected static,
walk, death, or hunker asset, with every call carrying the three approved
benchmarks and every derived pose also carrying its normalized family master. Complete eight-frame walk cycles now
ship and use distance-driven runtime cadence. Retain this note only to explain
the older source archive; follow the Phase 3 family ledgers for revisions.

## Implementation phases

- **Phase A — SHIPPED (2026-07-12):** single tint + per-team structure tint
  (`bldSprite`, `COLORS[team].bld`) + Rubicon banner + bone/moss dinos + pinned
  venom accents.
- **Phase B — SHIPPED (2026-07-12):** `COLORS` gained `trim`/`accent`/`fx`
  roles (+ `bld` for all teams — player structures now deep teal); per-class
  overlays in `drawUnitDecor` (visor strips, scope glint, warhead tips, hazard
  scoop ticks + cargo state, racing stripes, muzzle/barrel bands, APC chevrons,
  aircraft sensor/intake dots) and `drawBuildingDecor` (barracks awning, factory
  hazard bay door, depot trim band, turret/flak status light, silo hazard ring)
  — drawn over BOTH sprite and procedural bodies via their own transform.
  `HAZARD_YELLOW` is universal industrial, not a team color. Tracers wear the
  team `fx` role; spitter eyes went amber (predator eyeshine).
- **Phase C — SHIPPED engine-side as COLORWAY SLOTS (2026-07-12):** instead of
  trim masks, the game accepts pre-colored art that bypasses tinting entirely:
  `unit_<type>_teal.png` / `unit_<type>_red.png`, `bld_<type>_teal/_red.png`,
  `unit_spitter_wild.png` (+ `_teal` for tamed), `turret_gun_teal/_red.png`,
  and hunker colorways (`unit_<type>_hunker_teal/_red.png`). When present they
  draw AS-IS; anything missing falls back to tinted neutral art, then
  procedural. The accompanying PDF/Gemini notes describe the historical slot
  rollout only and do not govern current human production. Phases 1–3 instead
  use the exact built-in ImageGen records under `image-audit/prompts/`, teal
  first and red image-to-image from each normalized teal final.
- **Human technology Phase 1 — SHIPPED (2026-09-05):** all 12 teal/red human
  building pairs plus separate teal/red anti-ground and AA mounts were replaced
  as one coherent family using the production lock above. New registered pairs
  are `bld_hydro`, `bld_sensor`, and `flak_gun`; flak no longer shares the
  turret's single-barrel art. Frozen before/after audit sheets show 25/31 to
  31/31 coverage, and the Debug app bundle passed byte-for-byte verification.
- **Human technology Phase 2 — COMPLETE (2026-09-05):** nine
  teal/red vehicle and aircraft pairs or poses replace all 18 target slots;
  frozen audit coverage moves from 17/19 to 19/19 including the unchanged
  carrier benchmark. Browser rendering, interaction UI, console, and static
  code checks passed. The native Debug build succeeded, and all 21 scoped
  Phase 2 files in the rebuilt app byte-match the workspace.
- **Human technology Phase 3 — COMPLETE (2026-09-05):** six complete soldier
  families replace all 147 scoped human infantry files. All statics, eight-frame
  walks, four-frame deaths, faction counterparts, and Marine/Sniper hunker
  poses were installed atomically; the former 38 clipped frames and missing
  Marine hunker pair are resolved. Final verification results are tracked in
  the Phase 3 production-lock section above.
