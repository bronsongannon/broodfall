'use strict';
/* ============================================================
   BROODFALL — a tiny real-time strategy game
   Harvest crystals · train an army · destroy the enemy HQ
   ============================================================ */

// ---------------- DOM ----------------
const cv = document.getElementById('game');
// alpha:false — the ground blit covers the viewport every frame, so the canvas
// never needs to composite against the page. Cheaper per-frame compositing.
const cx = cv.getContext('2d', { alpha: false });
const mini = document.getElementById('minimap');
const mcx = mini.getContext('2d');
const elCrystals = document.getElementById('res-crystals');
const elSupply = document.getElementById('res-supply');
const elWave = document.getElementById('wave-timer');
const elEggs = document.getElementById('res-eggs');
const elCard = document.getElementById('card');
const elQpanel = document.getElementById('qpanel');
const elDock = document.getElementById('dock');
const elToast = document.getElementById('toast');
const elOverlay = document.getElementById('overlay');
const elOvTitle = document.getElementById('ov-title');
const elOvSub = document.getElementById('ov-sub');
const elHelp = document.getElementById('help');
const btnHelp = document.getElementById('btn-help');
const btnMute = document.getElementById('btn-mute');
const btnFog = document.getElementById('btn-fog');
const btnPause = document.getElementById('btn-pause');
const btnQuit = document.getElementById('btn-quit');
const elPauseBanner = document.getElementById('pause-banner');

// ---------------- World ----------------
const TILE = 32, MAP_W = 96, MAP_H = 72;
const W = MAP_W * TILE, H = MAP_H * TILE;      // 3072 x 2304 world px
const view = { w: window.innerWidth, h: window.innerHeight };
// ---------------- Render quality ----------------
// Frame cost here is FILL RATE, not unit count: every frame blits the ground
// and then the fog across the whole viewport, so it scales with backing-store
// pixels. A Retina Mac asks for dpr 2, which at fullscreen is 8M pixels on a
// laptop and ~15M on a 5K iMac — several times what canvas 2D can push at
// 60fps, and it pins the GPU (Bronson 2026-07-27: lag in a nest fight, machine
// running hot). So: cap the backing store to a pixel budget and adapt it to
// whatever the machine actually manages.
const PX_BUDGET_MAX = 3.2e6, PX_BUDGET_MIN = 1.15e6;
// On battery the budget cap tightens: WebKit demotes energy-hungry pages to
// ~30Hz on battery power, and unplugged couch play is the point of the Mac
// build — better to render a touch softer and NEVER attract the throttle.
// Only the wrapper can see the power source; it reports through BFPower.
const PX_BUDGET_BATTERY = 2.0e6;
let onBattery = false;
const budgetMax = () => onBattery ? PX_BUDGET_BATTERY : PX_BUDGET_MAX;
// The governor's finding is remembered, so a machine that had to give up pixels
// starts there next launch instead of stuttering its way back down every time.
const GFX_KEY = 'cc.gfx';
// (clamp() isn't defined this early in the file — inline the bounds)
const storedGfx = +localStorage.getItem(GFX_KEY) || 0;
let pxBudget = Math.max(PX_BUDGET_MIN, Math.min(PX_BUDGET_MAX, storedGfx || PX_BUDGET_MAX));
let dpr = 1;
function resize() {
  const raw = window.devicePixelRatio || 1;
  view.w = window.innerWidth; view.h = window.innerHeight;
  const fit = Math.sqrt(pxBudget / Math.max(1, view.w * view.h));
  // never sharper than the display, never coarser than 0.8 CSS pixels
  dpr = Math.min(raw, Math.max(0.8, fit));
  cv.width = Math.round(view.w * dpr); cv.height = Math.round(view.h * dpr);
  cv.style.width = view.w + 'px'; cv.style.height = view.h + 'px';
}
window.addEventListener('resize', resize);
resize();

const cam = { x: 0, y: 0 };
// event camera: swing to something the player must not miss (a den erupting)
// and hold it there for a beat. Any camera input cancels the hold.
let camFocus = null;
// `lock` ticks are uninterruptible: a mouse resting near a screen edge counts
// as camera input, and that was silently eating the pan before it ever moved
// (playtest 2026-07-26: "I still didn't get an immediate camera pan").
function focusCam(x, y, hold = 200, lock = 50) { camFocus = { x, y, hold, lock }; }
function clampCam() {
  cam.x = Math.max(0, Math.min(Math.max(0, W - view.w), cam.x));
  cam.y = Math.max(0, Math.min(Math.max(0, H - view.h), cam.y));
}

// ---------------- Data ----------------
// noAA: this unit's weapon cannot hit flyers. fly: this unit is airborne —
// ignores ground collision, only noAA-free weapons can touch it.
const UNIT = {
  harvester: { label: 'Harvester', cost: 60,  supply: 1, hp: 90,  speed: 1.7,  r: 11, dmg: 2,  range: 26,  cooldown: 50,  buildTime: 6 * 60,  sight: 170, carry: 12, noAA: 1 },
  engineer:  { label: 'Engineer',  cost: 90,  supply: 1, hp: 60,  speed: 1.9,  r: 9,  dmg: 2,  range: 22,  cooldown: 55,  buildTime: 6 * 60,  sight: 190, repair: 0.55, noAA: 1 },
  marine:    { label: 'Marine',    cost: 80,  supply: 1, hp: 70,  speed: 1.9,  r: 9,  dmg: 9,  range: 125, cooldown: 36,  buildTime: 5 * 60,  sight: 200 },
  sniper:    { label: 'Sniper',    cost: 130, supply: 1, hp: 45,  speed: 1.7,  r: 8,  dmg: 30, range: 190, cooldown: 110, buildTime: 7 * 60,  sight: 310 },
  // Unarmed. Follows wounded flesh (infantry + dinos) and patches it up.
  medic:     { label: 'Medic',     cost: 100, supply: 1, hp: 60,  speed: 1.6,  r: 9,  dmg: 0,  range: 0,   cooldown: 0,   buildTime: 6 * 60,  sight: 200, heal: 0.4, noAA: 1 },
  raider:    { label: 'Raider',    cost: 150, supply: 1, hp: 155, speed: 3.0,  r: 11, dmg: 7,  range: 100, cooldown: 20,  buildTime: 6 * 60,  sight: 240 },
  tank:      { label: 'Tank',      cost: 220, supply: 2, hp: 280, speed: 1.25, r: 14, dmg: 34, range: 155, cooldown: 95,  buildTime: 10 * 60, sight: 210, noAA: 1 },
  // Anti-armor specialist: slow rockets that hit vehicles 1.6x — and can hit air.
  rocket:    { label: 'Rocket Trooper', cost: 140, supply: 1, hp: 55, speed: 1.7, r: 9, dmg: 28, range: 160, cooldown: 90, buildTime: 8 * 60, sight: 210, vehBonus: 1.6 },
  // Battle bus: hauls 4 infantry. Light MG, no AA. Cargo dies with the ride.
  apc:       { label: 'APC',       cost: 200, supply: 2, hp: 240, speed: 2.6,  r: 13, dmg: 5,  range: 100, cooldown: 30,  buildTime: 9 * 60,  sight: 220, noAA: 1, cargo: 4 },
  // Air. Fast harasser that flies over everything; helpless targets: tanks,
  // artillery, workers. Countered by marines/snipers/raiders/spitters/turrets.
  gunship:   { label: 'Gunship',   cost: 240, supply: 2, hp: 150, speed: 3.2,  r: 12, dmg: 10, range: 130, cooldown: 18,  buildTime: 11 * 60, sight: 260, fly: 1 },
  // Strike bomber: one devastating bomb per run, then home to the Airpad to rearm.
  harrier:   { label: 'Harrier',   cost: 320, supply: 2, hp: 120, speed: 4.2,  r: 12, dmg: 0,  range: 0,   cooldown: 0,   buildTime: 13 * 60, sight: 240, fly: 1, bomb: 120, bombSplash: 55, bombBldBonus: 1.4 },
  // Siege piece. Shells fly to where the target WAS (no homing) and splash on
  // impact — devastating vs buildings/nests, whiffs vs anything fast. Can't
  // fire inside minRange, and sight < range means it wants spotters.
  artillery: { label: 'Artillery', cost: 270, supply: 2, hp: 110, speed: 0.95, r: 13, dmg: 55, range: 300, minRange: 90, cooldown: 170, buildTime: 12 * 60, sight: 230, splash: 40, bldBonus: 1.5, noAA: 1 },
  // Native wildlife (team 3) — but also hatchable by the player from captured
  // eggs. Cost 0 because nobody buys them with crystals; supply only bites for
  // player-owned ones (supplyUsed is per-team; wild team-3 dinos aren't counted).
  spitter:   { label: 'Spitter',   cost: 0,   supply: 1, hp: 95,  speed: 2.1,  r: 10, dmg: 11, range: 115, cooldown: 44,  buildTime: 0, sight: 200 },
  // Fast melee pack hunter, spawned by Raptor Dens. "Melee" is faked with a very
  // short range (the engine has no melee system and doesn't need one) — fire()
  // skips the projectile and lands the bite directly. Claws shred infantry
  // (infBonus, the flesh mirror of the rocket trooper's vehBonus). r 9 -> 12 and
// range 16 -> 20 together (2026-07-28, Bronson: it should read scary): the
// attack test is `dist - target.r <= range` and separation holds bodies about
// r1+r2 apart, so growing r alone shrank the melee margin to ONE pixel against
// a tank. Reach has to grow with the body or a bigger raptor stops connecting.
  // Act 2 roster, provisional stats (2026-07-28 — art landed first, same as the
  // raptor did). Screecher: flying harasser, meant to go for the economy.
  // Ironback: slow siege bruiser, the dino answer to a turret line — countered
  // by artillery and rockets so the existing RPS still holds.
  screecher: { label: 'Screecher', cost: 0,   supply: 1, hp: 70,  speed: 3.0,  r: 12, dmg: 9,  range: 95, cooldown: 40,  buildTime: 0, sight: 240, fly: 1 },
  ironback:  { label: 'Ironback',  cost: 0,   supply: 2, hp: 620, speed: 0.95, r: 16, dmg: 24, range: 34, cooldown: 62,  buildTime: 0, sight: 190, noAA: 1, bldBonus: 2.0 },
  // The finale boss (M13 scripted walker, M20 combat). A walking den: while she
  // lives she lays broods — see BROODMOTHER_* + updateUnit. Jaw is fake melee
  // like the raptor's claws. Slow on purpose: she is terrain that advances.
  broodmother: { label: 'Broodmother', cost: 0, supply: 0, hp: 4200, speed: 0.55, r: 30, dmg: 85, range: 42, cooldown: 95, buildTime: 0, sight: 280, noAA: 1, bldBonus: 1.6, melee: 1 },
  raptor:    { label: 'Raptor',    cost: 0,   supply: 1, hp: 65,  speed: 3.4,  r: 12,  dmg: 9,  range: 20,  cooldown: 32,  buildTime: 0, sight: 220, noAA: 1, infBonus: 1.5, melee: 1 },
  // Ambient wildlife: harmless grazers that wander campaign maps. No weapon
  // auto-targets them — but a deliberate kill enrages every real dino on the
  // level (dinoRage). Atmosphere with a conscience.
  critter:   { label: 'Grazer',    cost: 0,   supply: 0, hp: 45,  speed: 1.1,  r: 8,  dmg: 0,  range: 0,   cooldown: 0,   buildTime: 0, sight: 120, noAA: 1, stridePx: 85 },
  // Xenobiology field unit: unarmed harvester chassis with a containment cage.
  // Right-click a spitter to capture it (short channel at contact range), then
  // haul it back to the HQ lab. Campaign-granted for now — not in any trains list.
  // supply 0: mission-granted drops must never push a capped player over the
  // limit and silently stall every production queue
  rig:       { label: 'Capture Rig', cost: 140, supply: 0, hp: 150, speed: 2.0, r: 11, dmg: 0, range: 0, cooldown: 0, buildTime: 8 * 60, sight: 210, noAA: 1 },
};
const RIG_CAP_RANGE = 40;        // capture channel starts at contact range
const RIG_CAP_TIME = 3 * 60;     // seconds of channeling to bag a specimen
// req: tech tree — every listed building must STAND (built) on your team before
// you can place this one. The chain: Depot → Barracks → Factory → Airpad → Silo,
// with defenses hanging off the tier that fights their target. Refinery is
// economy and stays ungated. Pre-placed buildings ignore req (only placement checks).
// gen/pow: the power grid — gen produces, pow draws. Demand over capacity =
// LOW POWER: production at half speed, towers fire at half rate, nukes grounded.
const BLD = {
  hq:       { label: 'Headquarters', hp: 3000, w: 96, h: 96, supply: 20, sight: 300, trains: ['harvester', 'engineer'], gen: 8 },
  barracks: { label: 'Barracks',     hp: 1100, w: 78, h: 78, supply: 4,  sight: 250, trains: ['marine', 'sniper', 'medic', 'rocket'], cost: 150, buildTime: 13 * 60, req: ['supply'], pow: 3 },
  factory:  { label: 'Factory',      hp: 1000, w: 88, h: 72, supply: 4,  sight: 220, trains: ['raider', 'tank', 'artillery', 'apc'], cost: 200, buildTime: 15 * 60, req: ['barracks'], pow: 4 },
  // Beyond housing: the depot is the base's logistics hub — it slowly patches
  // up nearby friendly buildings (a weak, free engineer that never wanders off).
  supply:   { label: 'Supply Depot', hp: 500,  w: 56, h: 56, supply: 8,  sight: 180, cost: 100, buildTime: 10 * 60, sink: 1 },
  // Cheap and fragile — the classic raid target. The HQ's reactor covers a
  // small base; every plant past that buys 10 more grid capacity.
  power:    { label: 'Power Plant',  hp: 400,  w: 60, h: 60, supply: 0,  sight: 180, cost: 120, buildTime: 9 * 60, gen: 10, req: ['supply'], sink: 1 },
  // hydro: river-only mega-generator (Bronson 2026-07-25: "no need for a ton
  // of power plants... but expensive/take time"). 3 plants' output for ~3.3x
  // the price and 3.3x the build time; must stand ON a water channel.
  hydro:    { label: 'Hydro Dam',    hp: 600,  w: 84, h: 64, supply: 0,  sight: 200, cost: 400, buildTime: 30 * 60, gen: 30, req: ['power'], water: 1, needsEngineer: 1 },
  refinery: { label: 'Refinery',     hp: 700,  w: 70, h: 70, supply: 0,  sight: 240, cost: 175, buildTime: 12 * 60, req: ['supply'] },
  airpad:   { label: 'Airpad',       hp: 600,  w: 62, h: 62, supply: 2,  sight: 220, trains: ['gunship', 'harrier'], cost: 175, buildTime: 12 * 60, req: ['factory'], pow: 3 },
  // Endgame. Buy warheads here; the defender gets 30 loud seconds to react.
  silo:     { label: 'Missile Silo', hp: 900,  w: 70, h: 70, supply: 0,  sight: 200, cost: 500, buildTime: 20 * 60, req: ['airpad'], pow: 6 },
  turret:   { label: 'Turret',       hp: 450,  w: 40, h: 40, supply: 0,  sight: 260, dmg: 15, range: 200, cooldown: 42, cost: 140, buildTime: 8 * 60, req: ['barracks'], pow: 2 },
  // Dino nest (team 3): guards a rich crystal patch and respawns spitters
  // until it's destroyed. Clear it or mine poor — the expansion gatekeeper.
  // airOnly: this defense only engages flyers
  flak:     { label: 'Flak Turret',  hp: 420,  w: 40, h: 40, supply: 0,  sight: 280, dmg: 14, range: 240, cooldown: 16, cost: 160, buildTime: 8 * 60, airOnly: 1, req: ['factory'], pow: 2 },
  nest:     { label: 'Dino Nest',    hp: 850,  w: 64, h: 64, supply: 0,  sight: 200 },
  // Raptor Den (team 3): the nest's evil twin. Where nests defend a patch, the
  // den HUNTS — periodic raptor packs sent at the nearest structure of ANY
  // faction (dinos are weather, not a team). Act 2's proactive-dino lever;
  // no skirmish map places one yet, missions spawn them via bld triggers.
  den:      { label: 'Raptor Den',   hp: 2200, w: 144, h: 144, supply: 0, sight: 240 },
};
const DEPOT_HEAL_RADIUS = 240;   // the depot's repair field
const DEPOT_HEAL_RATE = 0.06;    // hp/tick per depot — a fraction of an engineer's 0.55
const BAY_REPAIR_RADIUS = 200;   // factory (ground) / airpad (flyers) vehicle repair bay
const BAY_REPAIR_RATE = 0.5;     // hp/tick — close to an engineer, but…
const BAY_REPAIR_COST = 0.15;    // …it bills you: crystals per hp restored
const NEST_BROOD = 3;          // spitters alive per nest
const NEST_RESPAWN = 7 * 60;   // one replacement every 7s
const NEST_LEASH = 360;        // guards give up the chase past this radius from home
const NEST_EGGS = 3;           // eggs left in the rubble when a nest dies
const NEST_BURST_CD = 30 * 60; // hitting a nest makes 2-3 extra defenders erupt (once per cooldown)
const SPITTER_CAP = 5;         // max hatched spitters a side can field at once
// a den does not creep out of the ground — it ERUPTS, and the pack is already
// coming (Bronson 2026-07-26). Birth burst, not a pair of door guards.
const DEN_BIRTH_MIN = 5, DEN_BIRTH_MAX = 7;
const DEN_PACK_SIZE = 3;       // raptors per hunting pack
const DEN_PACK_EVERY = 50 * 60; // a new hunt leaves the den every 50s
const DEN_RAPTOR_CAP = 12;     // max living raptors per den — hunts pause at cap
// The Broodmother's laying clock (she is a den on legs — see updateUnit).
// Slower than a den's hunts but relentless: left alone she snowballs an escort.
// How close a hostile gets before an unarmed unit stops advancing on
// attack-move. Wider than a marine's 125 range so support holds BEHIND the
// line the escorts form, not level with it.
const SUPPORT_STANDOFF = 190;
const BROODMOTHER_LAY_EVERY = 40 * 60;
const BROODMOTHER_LAY_SIZE = 2;
const BROODMOTHER_BROOD_CAP = 8;
// an engineer must stand at the site for the whole build. Wide enough that a
// crew on the bank can raise a dam spanning mid-channel (WALK_HALF_L is 155).
const ENG_BUILD_RANGE = 175;
const HARRIER_CAP = 5;         // max harriers a side can field (alive + queued)
const HARRIER_REARM = 7 * 60;  // seconds on the pad between sorties

// ---------------- Maps ----------------
// Every position is explicit — no procedural generation, each map is authored.
// patches: neutral fields; nests: guard positions (per patch, may be several).
const MAPS = {
  basin: {
    label: 'Crystal Basin',
    desc: 'The classic. Twin rich fields mid-map, each watched by a nest.',
    pHQ: [210, H - 210], pRax: [400, H - 140], pPatch: [260, H - 440],
    eHQ: [W - 210, 210], eRax: [W - 400, 140], eFac: [W - 560, 200],
    eSup: [[W - 300, 100], [W - 150, 340]], eTur: [[W - 350, 330], [W - 480, 220]],
    eAir: [W - 660, 300],
    ePatch: [W - 260, 440],
    patches: [
      { p: [W / 2, H / 2 - 200], n: 8, a: 2600, nests: [[W / 2 + 110, H / 2 - 290]] },
      { p: [W / 2, H / 2 + 200], n: 8, a: 2600, nests: [[W / 2 - 110, H / 2 + 290]] },
    ],
    // two staggered ridges pinch the middle into an S-shaped corridor
    ridges: [
      [W * 0.40, H * 0.08, W * 0.50, H * 0.28, 48],
      [W * 0.50, H * 0.72, W * 0.60, H * 0.92, 48],
    ],
    boulders: [[W * 0.17, H * 0.46, 55], [W * 0.83, H * 0.54, 55]],
    // corner hills watching each base's approach lane — multi-disc clusters so
    // they read as rolling ground, not stamped circles (clear of M1's
    // relocated fields and M2's Survey Post Beta — keep it that way)
    plateaus: [
      { c: [[W * 0.13, H * 0.26, 150], [W * 0.13 + 90, H * 0.26 + 70, 110], [W * 0.13 - 70, H * 0.26 - 80, 100]],
        ramps: [[W * 0.13 + 150, H * 0.26, 95]] },
      { c: [[W * 0.88, H * 0.74, 150], [W * 0.88 - 80, H * 0.74 + 85, 105], [W * 0.88 + 95, H * 0.74 - 60, 95]],
        ramps: [[W * 0.88 - 150, H * 0.74, 95]] },
    ],
    flora: { blotch: 'rgba(90,140,90,0.5)', blotch2: 'rgba(35,65,40,0.55)', tuft: 'rgba(125,190,125,0.5)', bush: '#243a22', bushHi: '#35502e', canopy: '#2a4526', canopyHi: '#3a5c32', clumps: 70 },
    groves: [[W * 0.30, H * 0.72, 110, 6], [W * 0.70, H * 0.28, 110, 6]],
    trees: [[W * 0.63, H * 0.40], [W * 0.08, H * 0.72], [W * 0.92, H * 0.36], [W * 0.35, H * 0.60]],
    // crystal country: dead spire formations near the living fields
    spires: [[W * 0.44, H * 0.33, 26], [W * 0.56, H * 0.67, 26], [W * 0.25, H * 0.55, 22]],
  },
  gauntlet: {
    label: 'The Gauntlet',
    desc: 'Bases face off across a nest-choked center column. Win the middle, win the game.',
    ground: { base: '#211710', mottle: 'rgba(255,180,110,0.02)', pebble: 'rgba(225,175,120,0.07)', grid: 'rgba(230,185,140,0.026)' },   // rust badlands
    pHQ: [230, H / 2 + 40], pRax: [420, H / 2 + 150], pPatch: [270, H / 2 - 240],
    eHQ: [W - 230, H / 2 - 40], eRax: [W - 420, H / 2 - 150], eFac: [W - 580, H / 2 + 10],
    eSup: [[W - 260, H / 2 + 200], [W - 160, H / 2 - 260]], eTur: [[W - 430, H / 2 + 110], [W - 430, H / 2 - 200]],
    eAir: [W - 620, H / 2 + 170],
    ePatch: [W - 270, H / 2 + 240],
    patches: [
      { p: [W / 2, 260], n: 8, a: 2600, nests: [[W / 2 + 100, 170]] },
      { p: [W / 2, H / 2], n: 9, a: 3000, nests: [[W / 2 - 120, H / 2 - 90]] },
      { p: [W / 2, H - 260], n: 8, a: 2600, nests: [[W / 2 + 100, H - 170]] },
    ],
    // twin walls with a center gate and edge runs — the gauntlet itself
    ridges: [
      [W * 0.34, H * 0.16, W * 0.34, H * 0.40, 46],
      [W * 0.34, H * 0.60, W * 0.34, H * 0.84, 46],
      [W * 0.66, H * 0.16, W * 0.66, H * 0.40, 46],
      [W * 0.66, H * 0.60, W * 0.66, H * 0.84, 46],
    ],
    // rolling mesas over the edge runs — hold one and the flanking lane is yours
    plateaus: [
      { c: [[W * 0.22, H * 0.10, 130], [W * 0.22 + 105, H * 0.10 + 55, 95], [W * 0.22 - 115, H * 0.10 + 30, 85]],
        ramps: [[W * 0.22, H * 0.10 + 130, 90]] },
      { c: [[W * 0.78, H * 0.90, 130], [W * 0.78 - 105, H * 0.90 - 55, 95], [W * 0.78 + 115, H * 0.90 - 30, 85]],
        ramps: [[W * 0.78, H * 0.90 - 130, 90]] },
    ],
    flora: { blotch: 'rgba(210,150,90,0.5)', blotch2: 'rgba(60,35,20,0.55)', tuft: 'rgba(205,175,105,0.45)', bush: '#4a3b20', bushHi: '#63512c', canopy: '#57492a', canopyHi: '#6e5e37', clumps: 34 },
    trees: [[W * 0.15, H * 0.85], [W * 0.42, H * 0.06], [W * 0.61, H * 0.96], [W * 0.85, H * 0.15], [W * 0.12, H * 0.28], [W * 0.88, H * 0.70]],
    // collapsed ground pockmarks the edge runs
    pits: [[W * 0.44, H * 0.05, 38], [W * 0.56, H * 0.95, 38]],
  },
  boneyard: {
    label: 'The Boneyard',
    desc: 'North vs south across three broken lanes — and a monstrously rich middle.',
    ground: { base: '#1b1b1e', mottle: 'rgba(210,215,235,0.016)', pebble: 'rgba(215,215,230,0.075)', grid: 'rgba(185,195,225,0.026)' },   // cold ash flats
    pHQ: [W / 2, H - 200], pRax: [W / 2 + 200, H - 140], pPatch: [W / 2 - 260, H - 380],
    eHQ: [W / 2, 200], eRax: [W / 2 - 200, 140], eFac: [W / 2 - 400, 240],
    eSup: [[W / 2 + 180, 100], [W / 2 - 140, 340]], eTur: [[W / 2 + 260, 330], [W / 2 - 330, 300]],
    eAir: [W / 2 + 350, 250],
    ePatch: [W / 2 + 260, 380],
    patches: [
      { p: [W * 0.16, H * 0.5], n: 8, a: 2600, nests: [[W * 0.16 + 120, H * 0.5 - 120]] },
      { p: [W * 0.84, H * 0.5], n: 8, a: 2600, nests: [[W * 0.84 - 120, H * 0.5 + 120]] },
      { p: [W / 2, H / 2], n: 12, a: 3400, nests: [[W / 2 - 150, H / 2 - 100], [W / 2 + 150, H / 2 + 100]] },
    ],
    // two broken walls make three north-south gates: west run, center punch, east run
    ridges: [
      [W * 0.27, H * 0.36, W * 0.43, H * 0.36, 46],
      [W * 0.57, H * 0.36, W * 0.73, H * 0.36, 46],
      [W * 0.27, H * 0.64, W * 0.43, H * 0.64, 46],
      [W * 0.57, H * 0.64, W * 0.73, H * 0.64, 46],
    ],
    // the boulders became ribcages — this map earns its name now
    bones: [[W * 0.08, H * 0.26, 52, 0.6], [W * 0.92, H * 0.74, 52, -0.6], [W * 0.30, H * 0.16, 42, 0.2], [W * 0.70, H * 0.84, 42, -0.2]],
    // burial-mound rises between the wall pairs — vision anchors for the mid-band
    plateaus: [
      { c: [[W * 0.33, H * 0.50, 120], [W * 0.33 + 75, H * 0.50 - 55, 90], [W * 0.33 - 90, H * 0.50 + 55, 80]],
        ramps: [[W * 0.33, H * 0.50 - 120, 80]] },
      { c: [[W * 0.67, H * 0.50, 120], [W * 0.67 - 75, H * 0.50 + 55, 90], [W * 0.67 + 90, H * 0.50 - 55, 80]],
        ramps: [[W * 0.67, H * 0.50 + 120, 80]] },
    ],
    flora: { blotch: 'rgba(180,190,210,0.4)', blotch2: 'rgba(15,15,22,0.55)', tuft: 'rgba(170,180,200,0.35)', bush: '#2c3038', bushHi: '#3d4350', dead: true, clumps: 26 },
    trees: [[W * 0.12, H * 0.14], [W * 0.30, H * 0.85], [W * 0.72, H * 0.12], [W * 0.88, H * 0.86], [W * 0.42, H * 0.50], [W * 0.60, H * 0.78]],
  },
  valley: {
    label: 'Fossil Valley',
    desc: 'Quiet corner expansions — and a mega-field dead center under double nest guard.',
    ground: { base: '#121a0e', mottle: 'rgba(160,220,120,0.018)', pebble: 'rgba(155,205,135,0.06)', grid: 'rgba(150,220,150,0.028)' },   // deep moss
    // twin overlooks flanking the center approaches — artillery perches with
    // one ramp each (N ramp faces west, S ramp faces east); second disc rolls
    // each one out into a hill line instead of a stamped circle
    plateaus: [
      { c: [[W * 0.5, H * 0.13, 150], [W * 0.5 + 115, H * 0.13 + 55, 105]], ramps: [[W * 0.5 - 150, H * 0.13, 95]] },
      { c: [[W * 0.5, H * 0.87, 150], [W * 0.5 - 115, H * 0.87 - 55, 105]], ramps: [[W * 0.5 + 150, H * 0.87, 95]] },
    ],
    // Valley is the only map whose player base sits in the BOTTOM-RIGHT corner,
    // which is exactly where the command panel lives (394x242 from the corner) —
    // the HQ and barracks were unclickable underneath it (Bronson, 2026-07-29,
    // playing M3). Both corners pulled inward by the same delta so the diagonal
    // stays symmetric for skirmish. Any future map: keep bases clear of the
    // bottom-right 394x242 (dock) and the bottom-left 210x160 (minimap).
    pHQ: [W - 520, H - 360], pRax: [W - 700, H - 300], pPatch: [W - 570, H - 590],
    eHQ: [520, 360], eRax: [700, 300], eFac: [860, 360],
    eSup: [[610, 250], [460, 490]], eTur: [[660, 480], [790, 370]],
    eAir: [960, 450],
    ePatch: [570, 590],
    patches: [
      { p: [W - 320, 320], n: 6, a: 2100, nests: [[W - 440, 250]] },
      { p: [320, H - 320], n: 6, a: 2100, nests: [[440, H - 250]] },
      { p: [W / 2, H / 2], n: 10, a: 3400, nests: [[W / 2 - 130, H / 2 - 110], [W / 2 + 130, H / 2 + 110]] },
    ],
    // a broken ring around the mega-field: gates at N/E/S/W, diagonals blocked
    ridges: [
      [W * 0.37, H * 0.37, W * 0.44, H * 0.29, 44],
      [W * 0.56, H * 0.29, W * 0.63, H * 0.37, 44],
      [W * 0.37, H * 0.63, W * 0.44, H * 0.71, 44],
      [W * 0.56, H * 0.71, W * 0.63, H * 0.63, 44],
    ],
    boulders: [[W * 0.25, H * 0.25, 60], [W * 0.75, H * 0.75, 60]],
    flora: { blotch: 'rgba(110,190,110,0.5)', blotch2: 'rgba(25,55,28,0.55)', tuft: 'rgba(135,210,135,0.55)', bush: '#1e3d1c', bushHi: '#2f5a2a', canopy: '#1d3f1b', canopyHi: '#2e5827', clumps: 100 },
    groves: [[W * 0.12, H * 0.60, 120, 7], [W * 0.88, H * 0.40, 120, 7]],
    trees: [[W * 0.26, H * 0.065], [W * 0.80, H * 0.90], [W * 0.46, H * 0.78], [W * 0.55, H * 0.25]],
    // spire sentinels splitting the N/S gates of the ring — the mega-field
    // announces itself before you see a single crystal
    spires: [[W * 0.5, H * 0.32, 24], [W * 0.5, H * 0.68, 24]],
  },
  trade: {
    label: 'Trade Road',
    desc: 'Dry steppe crossed by the old haul road — long sightlines, ambush country.',
    // built FOR M2's coordinate skeleton: convoy runs SW→NE, the road bends at
    // the ambush trigger [2200,1250], danger (field B's nests) sits on the
    // straight diagonal — "swing EAST" stays true here. Bases mirror basin's
    // known-good corner blocks.
    ground: { base: '#201b10', mottle: 'rgba(235,200,120,0.022)', pebble: 'rgba(225,195,130,0.07)', grid: 'rgba(220,190,130,0.024)', hi: 'rgba(240,230,190,0.10)' },
    pHQ: [210, H - 210], pRax: [400, H - 140], pPatch: [260, H - 440],
    eHQ: [W - 210, 210], eRax: [W - 400, 140], eFac: [W - 560, 200],
    eSup: [[W - 300, 100], [W - 150, 340]], eTur: [[W - 350, 330], [W - 480, 220]],
    eAir: [W - 660, 300],
    ePatch: [W - 260, 440],
    patches: [
      { p: [1560, 1180], n: 8, a: 2600, nests: [[1450, 1070], [1670, 1290]] },   // the mounds ON the shortcut diagonal
      { p: [640, 1100], n: 7, a: 2200, nests: [[750, 990]] },
      { p: [2380, 1760], n: 7, a: 2200, nests: [[2270, 1650]] },
    ],
    // one ridge breaks the shortcut diagonal; the road threads south of it
    ridges: [[1700, 780, 2050, 1050, 46]],
    // the haul road itself — painted packed earth with wheel ruts
    roads: [[[380, 2050], [1450, 1720], [2200, 1250], [2500, 880], [2760, 520]]],
    // road overlooks: the bend watch (south) and the Beta overlook (north)
    plateaus: [
      { c: [[1900, 1800, 125], [2010, 1880, 90]], ramps: [[1890, 1675, 80]] },
      { c: [[2150, 760, 115], [2040, 680, 85]], ramps: [[2265, 790, 80]] },
    ],
    flora: { blotch: 'rgba(200,170,90,0.5)', blotch2: 'rgba(70,55,25,0.55)', tuft: 'rgba(210,185,110,0.5)', bush: '#4a4020', bushHi: '#645628', canopy: '#4e4a22', canopyHi: '#67612e', clumps: 85 },
    groves: [[700, 1750, 100, 5]],
    trees: [[1150, 450], [2650, 1500], [1450, 2100], [2950, 1050], [500, 600]],
    // waystation flavor: dry wells off the road joints + one caravan casualty
    pits: [[1380, 1580, 34], [2380, 1360, 30]],
    bones: [[1050, 1500, 45, 0.4]],
  },
  fen: {
    label: 'Blackwater Fen',
    desc: 'Two black channels carve the swamp into thirds. Hold the causeways or swim with whatever lives below.',
    // roster map #5 (M5 Ghost Survey's home). Twin water bands make three
    // belts; four causeways are the only ground routes. Mid-belt holds all
    // the neutral crystal — every fight funnels onto a bridge.
    ground: { base: '#0d1410', mottle: 'rgba(140,180,140,0.02)', pebble: 'rgba(120,160,130,0.05)', grid: 'rgba(120,190,160,0.022)', hi: 'rgba(200,230,200,0.08)' },
    pHQ: [210, H - 210], pRax: [400, H - 140], pPatch: [260, H - 440],
    eHQ: [W - 210, 210], eRax: [W - 400, 140], eFac: [W - 560, 200],
    eSup: [[W - 300, 100], [W - 150, 340]], eTur: [[W - 350, 330], [W - 480, 220]],
    eAir: [W - 660, 300],
    ePatch: [W - 260, 440],
    rivers: [
      [0, 860, 640, 820, 52], [940, 800, 1750, 760, 52], [2050, 730, W, 700, 52],
      [0, 1560, 900, 1520, 52], [1200, 1500, 2100, 1460, 52], [2400, 1440, W, 1420, 52],
    ],
    patches: [
      { p: [W * 0.30, H * 0.50], n: 7, a: 2300, nests: [[W * 0.30 + 110, H * 0.50 - 110]] },
      { p: [W * 0.70, H * 0.50], n: 7, a: 2300, nests: [[W * 0.70 - 110, H * 0.50 + 110]] },
      { p: [W * 0.5, H * 0.5], n: 10, a: 3000, nests: [[W * 0.5 - 110, H * 0.5 - 110], [W * 0.5 + 110, H * 0.5 + 110]] },
    ],
    // one dry mound south of the channels — the only high ground in the bog
    plateaus: [
      { c: [[1536, 1850, 110], [1640, 1920, 80]], ramps: [[1426, 1820, 75]] },
    ],
    flora: { blotch: 'rgba(60,120,80,0.5)', blotch2: 'rgba(8,18,12,0.6)', tuft: 'rgba(120,190,110,0.5)', bush: '#16301a', bushHi: '#28492a', canopy: '#14331e', canopyHi: '#245231', clumps: 110 },
    groves: [[500, 1050, 110, 6], [2550, 1250, 110, 6]],
    trees: [[1250, 350], [1850, 1950], [2900, 1650], [350, 600]],
    pits: [[700, 1900, 30], [2200, 500, 30]],
    bones: [[1536, 600, 45, 0.1]],
  },
  silo: {
    label: 'The Silo Fields',
    desc: 'Wind-scoured snow plains. No walls worth hiding behind — position, vision, and nerve.',
    // roster map #6 (M6 Countdown's home). Deliberately OPEN: two short
    // center ridge stubs and scattered drift cover only — armies meet in
    // the white with nowhere to hide.
    ground: { base: '#343b42', mottle: 'rgba(255,255,255,0.03)', pebble: 'rgba(230,240,250,0.08)', grid: 'rgba(200,220,240,0.03)', hi: 'rgba(255,255,255,0.14)' },
    pHQ: [230, H / 2 + 40], pRax: [420, H / 2 + 150], pPatch: [270, H / 2 - 240],
    eHQ: [W - 230, H / 2 - 40], eRax: [W - 420, H / 2 - 150], eFac: [W - 580, H / 2 + 10],
    eSup: [[W - 260, H / 2 + 200], [W - 160, H / 2 - 260]], eTur: [[W - 430, H / 2 + 110], [W - 430, H / 2 - 200]],
    eAir: [W - 620, H / 2 + 170],
    ePatch: [W - 270, H / 2 + 240],
    patches: [
      { p: [W * 0.28, H * 0.22], n: 7, a: 2300, nests: [[W * 0.28 + 110, H * 0.22 - 110]] },
      { p: [W * 0.72, H * 0.78], n: 7, a: 2300, nests: [[W * 0.72 - 110, H * 0.78 + 110]] },
      { p: [W / 2, H / 2], n: 10, a: 3200, nests: [[W / 2 - 110, H / 2 - 110], [W / 2 + 110, H / 2 + 110]] },
    ],
    ridges: [
      [W * 0.5, H * 0.30, W * 0.5, H * 0.14, 44],
      [W * 0.5, H * 0.70, W * 0.5, H * 0.86, 44],
    ],
    boulders: [[W * 0.30, H * 0.42, 50], [W * 0.70, H * 0.58, 50]],
    // silo bluffs — the two firing platforms this mission is named for
    plateaus: [
      { c: [[W * 0.22, H * 0.76, 130], [W * 0.22 + 80, H * 0.76 + 60, 90]], ramps: [[W * 0.22, H * 0.76 - 130, 85]] },
      { c: [[W * 0.78, H * 0.24, 130], [W * 0.78 - 80, H * 0.24 - 60, 90]], ramps: [[W * 0.78, H * 0.24 + 130, 85]] },
    ],
    flora: { blotch: 'rgba(235,245,255,0.5)', blotch2: 'rgba(25,32,45,0.5)', tuft: 'rgba(180,175,140,0.45)', bush: '#3d4a42', bushHi: '#55645a', canopy: '#5c7a74', canopyHi: '#9db8b2', clumps: 30 },
    groves: [[W * 0.35, H * 0.65, 100, 5], [W * 0.65, H * 0.35, 100, 5]],
    trees: [[W * 0.12, H * 0.20], [W * 0.88, H * 0.80], [W * 0.45, H * 0.06], [W * 0.55, H * 0.94]],
    pits: [[W * 0.38, H * 0.06, 32], [W * 0.62, H * 0.94, 32]],
  },
  mine: {
    label: 'Strip Mine',
    desc: 'A motherlode at the bottom of a torn-open quarry. The benches above it decide who mines and who bleeds.',
    // roster map #8 (M8 Strip Mine / M16 Lin's Gambit). Two terraced benches
    // flank the center pit; their ramps + haul roads are the ways down to
    // the richest field in the game.
    ground: { base: '#1c1814', mottle: 'rgba(200,160,120,0.02)', pebble: 'rgba(190,170,150,0.07)', grid: 'rgba(200,170,140,0.024)', hi: 'rgba(230,215,190,0.11)' },
    pHQ: [W / 2, H - 200], pRax: [W / 2 + 200, H - 140], pPatch: [W / 2 - 260, H - 380],
    eHQ: [W / 2, 200], eRax: [W / 2 - 200, 140], eFac: [W / 2 - 400, 240],
    eSup: [[W / 2 + 180, 100], [W / 2 - 140, 340]], eTur: [[W / 2 + 260, 330], [W / 2 - 330, 300]],
    eAir: [W / 2 + 350, 250],
    ePatch: [W / 2 + 260, 380],
    patches: [
      { p: [W / 2, H / 2], n: 12, a: 3400, nests: [[W / 2 - 150, H / 2 - 100], [W / 2 + 150, H / 2 + 100]] },
      { p: [W * 0.14, H * 0.62], n: 7, a: 2300, nests: [[W * 0.14 + 110, H * 0.62 - 110]] },
      { p: [W * 0.86, H * 0.38], n: 7, a: 2300, nests: [[W * 0.86 - 110, H * 0.38 + 110]] },
    ],
    boulders: [[W * 0.08, H * 0.10, 55], [W * 0.92, H * 0.90, 55]],
    // the benches: terraced spoil heaps overlooking the motherlode
    plateaus: [
      { c: [[1044, 1014, 140], [1167, 783, 110]], ramps: [[940, 1115, 85], [1245, 705, 85]] },
      { c: [[2028, 1290, 140], [1905, 1521, 110]], ramps: [[2132, 1189, 85], [1827, 1599, 85]] },
    ],
    roads: [
      [[1536, 320], [1300, 600], [1245, 705]],
      [[1536, 1984], [1772, 1704], [1827, 1599]],
    ],
    spires: [[1536, 700, 26], [1536, 1600, 26]],
    pits: [[700, 500, 36], [2372, 1800, 36], [940, 1830, 32], [2150, 520, 32]],
    flora: { blotch: 'rgba(150,120,80,0.5)', blotch2: 'rgba(25,18,12,0.6)', tuft: 'rgba(160,140,100,0.4)', bush: '#3a3226', bushHi: '#4f4534', dead: true, clumps: 20 },
    trees: [[400, 1700], [2672, 600], [2900, 2000]],
  },
  hwm: {
    label: 'High Water Mark',
    desc: 'One great river, two crossings, and a fortress on the far bank. Where the war gets decided.',
    // roster map #7 (M7, the Act 1 finale). The river runs the map's full
    // height; both causeways are assault funnels — or build a Hydro Dam and
    // walk your infantry over where they least expect it.
    ground: { base: '#141c11', mottle: 'rgba(170,220,140,0.02)', pebble: 'rgba(170,205,150,0.06)', grid: 'rgba(160,220,170,0.026)', hi: 'rgba(215,240,205,0.10)' },
    pHQ: [230, H / 2 + 40], pRax: [420, H / 2 + 150], pPatch: [270, H / 2 - 240],
    eHQ: [W - 230, H / 2 - 40], eRax: [W - 420, H / 2 - 150], eFac: [W - 580, H / 2 + 10],
    eSup: [[W - 260, H / 2 + 200], [W - 160, H / 2 - 260]], eTur: [[W - 430, H / 2 + 110], [W - 430, H / 2 - 200]],
    eAir: [W - 620, H / 2 + 170],
    ePatch: [W - 270, H / 2 + 240],
    rivers: [
      [W * 0.52, 0, W * 0.50, H * 0.30, 60],
      [W * 0.49, H * 0.42, W * 0.51, H * 0.68, 60],
      [W * 0.50, H * 0.80, W * 0.52, H, 60],
    ],
    patches: [
      { p: [W * 0.30, H * 0.22], n: 7, a: 2400, nests: [[W * 0.30 + 110, H * 0.22 - 110]] },
      { p: [W * 0.70, H * 0.78], n: 7, a: 2400, nests: [[W * 0.70 - 110, H * 0.78 + 110]] },
      { p: [W * 0.38, H * 0.66], n: 8, a: 2800, nests: [[W * 0.38 - 110, H * 0.66 + 110]] },
      { p: [W * 0.62, H * 0.34], n: 8, a: 2800, nests: [[W * 0.62 + 110, H * 0.34 - 110]] },
    ],
    ridges: [
      [W * 0.14, H * 0.36, W * 0.26, H * 0.28, 44],
      [W * 0.86, H * 0.64, W * 0.74, H * 0.72, 44],
    ],
    // artillery overlooks staring down each crossing
    plateaus: [
      { c: [[W * 0.37, H * 0.30, 120], [W * 0.37 + 70, H * 0.30 + 80, 85]], ramps: [[W * 0.37 - 60, H * 0.30 + 105, 80]] },
      { c: [[W * 0.63, H * 0.70, 120], [W * 0.63 - 70, H * 0.70 - 80, 85]], ramps: [[W * 0.63 + 60, H * 0.70 - 105, 80]] },
    ],
    flora: { blotch: 'rgba(120,200,110,0.5)', blotch2: 'rgba(15,35,15,0.55)', tuft: 'rgba(150,220,130,0.5)', bush: '#1c4018', bushHi: '#31612a', canopy: '#1b4517', canopyHi: '#2f6626', clumps: 95 },
    groves: [[W * 0.30, H * 0.52, 105, 6], [W * 0.70, H * 0.48, 105, 6]],
    trees: [[W * 0.12, H * 0.14], [W * 0.88, H * 0.86], [W * 0.42, H * 0.90], [W * 0.58, H * 0.10]],
  },
  forks: {
    label: 'Twin Forks',
    desc: 'A valley split in two by the fork. Every attack picks a prong — every defense guesses.',
    // roster map #11 (M11 Strange Bedfellows). The SE flat + its own patch is
    // the second base pocket — the mission parks the allied red HQ there.
    ground: { base: '#161a17', mottle: 'rgba(190,215,190,0.02)', pebble: 'rgba(190,210,195,0.06)', grid: 'rgba(180,215,195,0.026)', hi: 'rgba(225,240,225,0.11)' },
    pHQ: [W * 0.30, H - 210], pRax: [W * 0.30 + 190, H - 140], pPatch: [W * 0.30 - 250, H - 400],
    eHQ: [W / 2, 200], eRax: [W / 2 - 200, 140], eFac: [W / 2 - 400, 240],
    eSup: [[W / 2 + 180, 100], [W / 2 - 140, 340]], eTur: [[W / 2 + 260, 330], [W / 2 - 330, 300]],
    eAir: [W / 2 + 350, 250],
    ePatch: [W / 2 + 260, 380],
    patches: [
      { p: [W / 2, H * 0.56], n: 10, a: 3200, nests: [[W / 2 - 120, H * 0.56 - 110], [W / 2 + 120, H * 0.56 + 110]] },
      { p: [W * 0.12, H * 0.42], n: 7, a: 2300, nests: [[W * 0.12 + 110, H * 0.42 - 110]] },
      { p: [W * 0.88, H * 0.42], n: 7, a: 2300, nests: [[W * 0.88 - 110, H * 0.42 + 110]] },
      { p: [W * 0.72, H - 500], n: 7, a: 2300, nests: [] },   // the ally pocket's field
    ],
    // the fork: two diagonal walls wedging south + a stem below the junction
    ridges: [
      [W * 0.20, H * 0.24, W * 0.44, H * 0.48, 46],
      [W * 0.80, H * 0.24, W * 0.56, H * 0.48, 46],
      [W * 0.50, H * 0.70, W * 0.50, H * 0.86, 44],
    ],
    boulders: [[W * 0.08, H * 0.78, 55], [W * 0.92, H * 0.20, 55]],
    // the junction overlook, SW of the mega-field — sees both prongs and the
    // fork mouth without sitting on the crystal (that broke the 200px rule)
    plateaus: [
      { c: [[W * 0.42, H * 0.66, 125], [W * 0.42 - 90, H * 0.66 + 55, 85]], ramps: [[W * 0.42 + 110, H * 0.66 + 60, 80]] },
    ],
    flora: { blotch: 'rgba(160,200,160,0.45)', blotch2: 'rgba(18,26,20,0.55)', tuft: 'rgba(170,210,160,0.45)', bush: '#26382a', bushHi: '#3d5a42', canopy: '#234020', canopyHi: '#3a6033', clumps: 70 },
    groves: [[W * 0.16, H * 0.62, 105, 6], [W * 0.84, H * 0.62, 105, 6]],
    trees: [[W * 0.35, H * 0.10], [W * 0.65, H * 0.90], [W * 0.06, H * 0.30], [W * 0.94, H * 0.72]],
    pits: [[W * 0.40, H * 0.78, 32], [W * 0.60, H * 0.22, 32]],
  },
  overgrown: {
    label: 'Overgrown Basin',
    desc: 'Crystal Basin, two years later. The planet took it back.',
    // roster map #14 (M14 Return to Ruin / M15). Basin's EXACT bones — same
    // fields, ridges, hills — swallowed under jungle. Story reuse on purpose.
    ground: { base: '#0f1a0c', mottle: 'rgba(150,220,130,0.022)', pebble: 'rgba(140,200,130,0.06)', grid: 'rgba(140,220,150,0.024)', hi: 'rgba(200,240,190,0.10)' },
    pHQ: [210, H - 210], pRax: [400, H - 140], pPatch: [260, H - 440],
    eHQ: [W - 210, 210], eRax: [W - 400, 140], eFac: [W - 560, 200],
    eSup: [[W - 300, 100], [W - 150, 340]], eTur: [[W - 350, 330], [W - 480, 220]],
    eAir: [W - 660, 300],
    ePatch: [W - 260, 440],
    patches: [
      { p: [W / 2, H / 2 - 200], n: 8, a: 2600, nests: [[W / 2 + 110, H / 2 - 290]] },
      { p: [W / 2, H / 2 + 200], n: 8, a: 2600, nests: [[W / 2 - 110, H / 2 + 290]] },
    ],
    ridges: [
      [W * 0.40, H * 0.08, W * 0.50, H * 0.28, 48],
      [W * 0.50, H * 0.72, W * 0.60, H * 0.92, 48],
    ],
    boulders: [[W * 0.17, H * 0.46, 55], [W * 0.83, H * 0.54, 55]],
    plateaus: [
      { c: [[W * 0.13, H * 0.26, 150], [W * 0.13 + 90, H * 0.26 + 70, 110], [W * 0.13 - 70, H * 0.26 - 80, 100]],
        ramps: [[W * 0.13 + 150, H * 0.26, 95]] },
      { c: [[W * 0.88, H * 0.74, 150], [W * 0.88 - 80, H * 0.74 + 85, 105], [W * 0.88 + 95, H * 0.74 - 60, 95]],
        ramps: [[W * 0.88 - 150, H * 0.74, 95]] },
    ],
    flora: { blotch: 'rgba(90,180,90,0.5)', blotch2: 'rgba(10,25,10,0.6)', tuft: 'rgba(140,220,120,0.55)', bush: '#173a14', bushHi: '#2c5c24', canopy: '#153d12', canopyHi: '#2a6320', clumps: 135 },
    // the jungle is winning: basin's groves doubled + strays everywhere
    groves: [[W * 0.30, H * 0.72, 110, 7], [W * 0.70, H * 0.28, 110, 7], [1650, 250, 100, 5], [1400, 2050, 100, 5]],
    trees: [[W * 0.63, H * 0.40], [W * 0.08, H * 0.72], [W * 0.92, H * 0.36], [W * 0.35, H * 0.60], [560, 1300], [2500, 1000], [1050, 300], [2000, 1800]],
    spires: [[W * 0.44, H * 0.33, 26], [W * 0.56, H * 0.67, 26], [W * 0.25, H * 0.55, 22]],
    pits: [[W * 0.20, H * 0.15, 32], [W * 0.80, H * 0.85, 32]],
  },
};

// ---------------- Difficulty ----------------
// All knobs the AI cares about; 'normal' is the pre-difficulty baseline.
const DIFFS = {
  easy:   { label: 'Easy',    desc: 'Slower assaults, lazier enemy economy. Learn the ropes.',
            firstWave: 150, waveEvery: 1.4, capRate: 1.2, trickle: 0.55, aiUpgrades: false },
  normal: { label: 'Normal',  desc: 'The intended fight.',
            firstWave: 95,  waveEvery: 0.95, capRate: 2.4, trickle: 1.2, aiUpgrades: true, aiNukes: false },
  hard:   { label: 'Hard',    desc: 'Early pressure, relentless waves, a rich enemy. Good luck.',
            firstWave: 75,  waveEvery: 0.75, capRate: 3.2, trickle: 1.8, aiUpgrades: true, aiNukes: true },
  specops: { label: 'Spec Ops', desc: 'The enemy cheats. Openly. Bring everything you have.',
            firstWave: 60,  waveEvery: 0.55, capRate: 4.5, trickle: 2.6, aiUpgrades: true, aiNukes: true },
};
let diff = DIFFS.normal;

// ---------------- Campaign ----------------
// Recurring voices. Lines are plain prefixed text; the dialogue bar shows a
// portrait PiP per speaker (art optional, monogram fallback).
const CAST = {
  ops: { name: 'CPT. VEGA',   color: '#8fd8cf', init: 'V' },   // expedition ops commander
  sci: { name: 'DR. LIN',     color: '#e8d38a', init: 'L' },   // xenobiologist
  red: { name: 'CDR. KRAUSS', color: '#f0a898', init: 'K' },   // Rubicon Mining field commander
};
// Cast portraits (optional art slots, same philosophy as sfx): drop
// assets/portraits/<who>.png (ops/sci/red) — square bust crop, ~256px.
// Missing file = colored monogram fallback in the PiP.
const PORTRAITS = {};
for (const who of Object.keys(CAST)) {
  const img = new Image();
  img.onload = () => { PORTRAITS[who] = img; };
  img.src = 'assets/portraits/' + who + '.png';
}
// Mission specs are pure data, same philosophy as MAPS. Objective types:
// unitCount / built / mined / flag (set by a trigger). hidden objectives appear
// when a trigger activates them. Triggers: {when:{time|done|groupDead|mined},
// delay?, say?, objective?, complete?, spawn?, rally?, alarm?}. `rally` sends a
// whole team (or an existing group's survivors, via `of`) at a point — the
// world mobilising, as opposed to `spawn` conjuring reinforcements. winWhen
// lists the objective ids that must all be done; player HQ loss is a defeat.
const MISSIONS = [
  {
    title: 'Landfall', act: 'Act I — The Crystal War',
    map: 'basin', diff: 'easy', noEnemy: true, bare: true,
    // Landfall teaches the depot, the barracks and the turret. Nothing else is
    // authorised — a tutorial shouldn't offer a missile silo.
    allow: { bld: ['supply', 'barracks', 'turret', 'refinery'],
             unit: ['harvester', 'engineer', 'marine', 'sniper'] },
    // Landfall spreads the neutral fields to opposite corners of the valley so
    // scouting is a real trip — and keeps the nests well away from the base.
    fields: [
      { p: [W * 0.30, H * 0.22], n: 8, a: 2600, nests: [[W * 0.30 + 110, H * 0.22 - 110]] },
      { p: [W * 0.72, H * 0.62], n: 8, a: 2600, nests: [[W * 0.72 + 120, H * 0.62 + 100]] },
    ],
    brief: [
      ['ops', 'Dropships are down and the beacon is live, Commander. This valley holds the richest crystal signature on the planet — and Rubicon Mining wants it as badly as we do.'],
      ['ops', 'Before their survey teams arrive, I want a working outpost: crystals in the bank, rifles on the wall — then push out and map the valley.'],
      ['sci', 'And Commander — the mounds near the large fields are nesting sites. Xenobiology would be very grateful for a look at the local wildlife. A close look.'],
    ],
    intro: [
      ['ops', 'First order of business: more hands on the crystal. Select the HQ and press Q to train another Harvester.'],
    ],
    objectives: [
      { id: 'harv',    text: 'Train another Harvester (HQ — Q)',       type: 'unitCount', unit: 'harvester', count: 4 },
      { id: 'depot',   text: 'Build a Supply Depot (C)',               type: 'built', bld: 'supply', count: 1, hidden: true },
      { id: 'rax',     text: 'Build a Barracks (B)',                   type: 'built', bld: 'barracks', count: 1, hidden: true },
      { id: 'marines', text: 'Train 4 Marines (Barracks — Q)',         type: 'unitCount', unit: 'marine', count: 4, hidden: true },
      { id: 'turret',  text: 'Build a Turret on the perimeter (T)',    type: 'built', bld: 'turret', count: 1, hidden: true },
      { id: 'scout1',  text: 'Scout the northern crystal field',       type: 'reach', x: W * 0.30, y: H * 0.22, r: 250, hidden: true },
      { id: 'scout2',  text: 'Scout the eastern crystal field',        type: 'reach', x: W * 0.72, y: H * 0.62, r: 250, hidden: true },
      { id: 'repel',   text: 'Repel the spitter pack',                 type: 'flag', hidden: true },
      { id: 'capture', text: 'Capture the marked spitter with the Capture Rig (right-click it) and haul it to the HQ', type: 'captive', count: 1, hidden: true, mark: [1050, 1650] },
      { id: 'hold',    text: 'Hold the outpost against the colony reprisal', type: 'groupDead', group: 'reprisal', hidden: true },
      { id: 'mine',    text: 'Mine 1250 crystals',                     type: 'mined', amount: 1250 },
    ],
    winWhen: ['harv', 'depot', 'rax', 'marines', 'turret', 'scout1', 'scout2', 'repel', 'capture', 'hold', 'mine'],
    // The wildlife never hunts what it hasn't seen: the retaliation probe only
    // comes AFTER your patrol is spotted at the fields (playtest feedback).
    triggers: [
      { when: { done: ['harv'] }, objective: 'depot',
        say: [['ops', 'Good. Now stretch our supply line — press C and place a Supply Depot near the base. Nothing else goes up without logistics.']] },
      { when: { done: ['depot'] }, objective: 'rax',
        say: [['ops', 'Depot is up — its crews will quietly patch nearby buildings, and new construction is unlocking. Next: a Barracks, key B.']] },
      { when: { done: ['rax'] }, objective: ['marines', 'turret'],
        say: [['ops', 'Barracks online. Train four Marines — select it and press Q — and anchor a Turret to the perimeter with T. Standard doctrine, even on a quiet world.']] },
      { when: { done: ['marines', 'turret'] }, objective: ['scout1', 'scout2'],
        say: [['ops', 'Perimeter is set. Time to learn the neighborhood — push a patrol out to the two marked crystal fields: one up north, one out east.'],
              ['sci', 'Quietly, Commander. The wildlife hasn\'t noticed us yet — observe them, don\'t provoke them. They only defend what they can see.']] },
      { when: { done: ['scout1', 'scout2'] },
        say: [['sci', 'Nesting colonies, live broods… magnificent. Ah — Commander, they\'ve spotted your patrol. Seismic contacts converging on your base. Fast.']] },
      { when: { done: ['scout1', 'scout2'] }, delay: 12, objective: 'repel', alarm: '⚠ Wildlife closing on the perimeter!',
        spawn: { group: 'probe', unit: 'spitter', team: 3, n: 4, at: [1050, H - 130], order: 'attackhq' },
        say: [['ops', 'Contacts! They followed the patrol home — marines, weapons free!']] },
      { when: { groupDead: 'probe' }, complete: 'repel',
        say: [['ops', 'Clean work. The perimeter holds.'],
              ['sci', 'They only came because we were seen. Noted. Now — before anything else, I need one alive. A living specimen changes everything.']] },
      { when: { groupDead: 'probe' }, delay: 10, objective: 'capture',
        spawn: [
          { group: 'rig',   unit: 'rig',     team: 1, n: 1, at: [380, H - 340] },
          { group: 'scout', unit: 'spitter', team: 3, n: 1, at: [1050, 1650], order: 'guard', specimen: true },
        ],
        say: [['ops', 'Lin\'s Capture Rig just dropped at the base — the caged harvester wearing the green ring. It is the ONLY unit that can take the specimen alive. A lone spitter is prowling the flats, marked on your map and wearing the SAME green ring: select the rig and right-click it. Your troops fire at half rate near the specimen — keep them clear and let the rig work. Lin needs this one breathing.']] },
      // The colony answers the abduction. This is Landfall's real fight: before
      // it, everything after the capture was a passive mining grind and the
      // mission ended at ~12 min (Bronson, 2026-07-28). It pays off the turret
      // and the four marines the tutorial made you build, and seeds Act 2's
      // "something answered".
      // Warning THEN charge: at the tutorial minimum (four marines, one turret)
      // a passive player loses 5 runs in 6, so the mission names the threat and
      // spends 20s telling you to reinforce before it lands — teach, then test.
      // Three marines queued in that window holds 6 of 6; the barracks can pump
      // for the whole fight.
      { when: { done: ['capture'] }, delay: 12, objective: 'hold',
        alarm: '⚠ Every nest on the map just went active — they are coming for the specimen!',
        say: [['sci', 'Commander — every mound on this map went active in the same second. Not the ones that saw you. ALL of them. They did not see this one taken, they FELT it taken.'],
              ['ops', 'That is the whole valley walking at us and we have about twenty seconds. Queue marines, drop another turret — spend everything, Commander. Nothing we mined matters if the outpost is gone.']] },
      // Every nest empties and converges. `rally` pulls the standing broods and
      // roamers off their leashes; the spawns are each nest disgorging what was
      // still inside, so the charge visibly STARTS at the mounds you scouted.
      { when: { done: ['capture'] }, delay: 32,
        alarm: '⚠ Contact — both fields are emptying toward the base!',
        rally: { team: 3, group: 'reprisal' },
        spawn: [
          { group: 'reprisal', unit: 'spitter', team: 3, n: 1, at: [W * 0.30 + 110, H * 0.22 - 110], order: 'attackhq' },
          { group: 'reprisal', unit: 'spitter', team: 3, n: 1, at: [W * 0.72 + 120, H * 0.62 + 100], order: 'attackhq' },
        ],
        say: [['ops', 'Here they come — north field and east field, converging. Everything on the wall. Hold the outpost, Commander.']] },
      // Enraged, not wandering: survivors keep walking at the base until it's
      // settled. Without this a straggler idles in the fog and the objective
      // hangs on a map-wide hunt (playtest harness: ~2 runs in 5 stalled).
      { when: { done: ['capture'], notDone: ['hold'] }, delay: 45, repeat: true, every: 15,
        rally: { of: 'reprisal' } },
      { when: { groupDead: 'reprisal' }, delay: 2,
        say: [['ops', 'Perimeter held. Every one of them is down, Commander.'],
              ['sci', 'They emptied their own nests to come here. Left the broods, left the crystal, and walked into rifles for one caged animal. Log that. That is not territorial behaviour — that is a response.']] },
      // safety nets: the tutorial can't dead-end — a lost rig (or specimen) respawns
      { when: { groupDead: 'scout', notDone: ['capture'], noCaptive: true }, delay: 10, repeat: true,
        spawn: { group: 'scout', unit: 'spitter', team: 3, n: 1, at: [1050, 1650], order: 'guard', specimen: true },
        say: [['sci', 'We lost track of that one. Another is prowling the same ground — send the rig, Commander.']] },
      { when: { groupDead: 'rig', notDone: ['capture'] }, delay: 8, repeat: true,
        spawn: { group: 'rig', unit: 'rig', team: 1, n: 1, at: [380, H - 340] },
        say: [['ops', 'We lost the rig. Orbital is dropping another — they are not cheap, Commander. Patch the next one with an engineer.']] },
    ],
    outro: [
      ['ops', 'Specimen crated, walls manned, stockpile growing. Textbook landfall, Commander.'],
      ['sci', 'Remarkable… its tissue is laced with crystal. They aren\'t just defending territory — they\'re connected to it. I need time. And a much bigger lab.'],
    ],
    winText: 'The expedition has its foothold — and its first live specimen. High above, Rubicon Mining\'s survey fleet has just made its burn for the planet.',
    loseText: 'The outpost fell before it ever stood. Expedition command is reconsidering the landing site.',
  },
  {
    title: 'Claim Jumpers', act: 'Act I — The Crystal War',
    map: 'trade', diff: 'easy', noEnemy: true,   // rehomed 2026-07-24 (roster: M2 gets its own map)
    allow: { bld: ['supply', 'barracks', 'turret', 'refinery', 'power'],
             unit: ['harvester', 'engineer', 'marine', 'sniper', 'rocket'] },
    patches: [[2870, 590, 6, 2200]],   // Survey Post Beta's rich field
    brief: [
      // NOTE: only Vega's (ops) lines may be reworded freely — they're unvoiced
      // until her voice lands. Krauss's brief line has an installed clip.
      ['ops', 'Survey Post Beta sits on a rich northern field, but its silos are empty and our home patch is thinning. We are opening a convoy route up the old trade road — today.'],
      ['red', 'Intercepted, unregistered channel: "To the expedition in grid four: this valley is a Rubicon Mining resource corridor. Consider your route subject to... review." — C. Krauss, Field Commander.'],
      ['ops', 'That would be Rubicon. Escort the convoy out and back, Commander — and shoot anything that touches a harvester.'],
    ],
    intro: [
      ['ops', 'Six haulers, and Beta needs at least FOUR of them on the pad — select the whole convoy, not half of it. Take them north-east along the marked route, swing EAST around the nest mounds, and keep rifles between the raiders and the cargo.'],
    ],
    objectives: [
      { id: 'out',  text: 'Deliver 4 harvesters to Survey Post Beta', type: 'groupReach', group: 'convoy', unit: 'harvester', x: 2760, y: 520, r: 240, count: 4, mark: [2760, 520] },
      { id: 'load', text: 'Hold Survey Post Beta while the haulers load', type: 'survive', secs: 60, hidden: true, mark: [2760, 520] },
      { id: 'back', text: 'Bring 4 delivered harvesters home', type: 'groupReach', group: 'convoy', unit: 'harvester', after: 'out', x: 300, y: 2000, r: 260, count: 4, hidden: true, mark: [300, 2000] },
    ],
    winWhen: ['out', 'load', 'back'],
    triggers: [
      { when: { time: 0.5 }, crystals: 250,
        spawn: [
          { group: 'convoy', unit: 'harvester', team: 1, n: 6, at: [380, 1960] },
          { unit: 'marine', team: 1, n: 2, at: [470, 1880] },
          { unit: 'rocket', team: 1, n: 2, at: [530, 1930] },
          { bld: 'refinery', team: 1, at: [2700, 470] },
          { bld: 'turret',   team: 1, at: [2570, 560] },
          { bld: 'supply',   team: 1, at: [2820, 360] },
        ] },
      // the toll collectors arrive once the convoy is committed to the road
      { when: { near: [2200, 1250, 500] }, alarm: '⚠ Raiders closing on the convoy!',
        spawn: [
          { unit: 'raider', team: 2, n: 2, at: [2350, 100], to: [2050, 1350] },
          { unit: 'raider', team: 2, n: 1, at: [2990, 1500], to: [2400, 1100] },
        ],
        say: [['red', 'Attention, expedition convoy: you are traversing a Rubicon resource corridor. Per intersystem claim law, your cargo is subject to a toll. My associates will collect.']] },
      { when: { done: ['out'] }, objective: 'load',
        spawn: [
          { unit: 'marine', team: 1, n: 2, at: [2650, 600] },
          { unit: 'rocket', team: 1, n: 1, at: [2700, 640] },
        ],
        say: [['ops', 'Beta\'s silos are filling — sixty seconds to load the haulers. The post garrison is yours, Commander. Dig in; nobody rolls until the cargo is aboard.'],
              ['red', 'Still rolling? I respect persistence. My accountants do not.']] },
      // the loading siege: Krauss hits the post while the convoy is pinned
      { when: { done: ['out'] }, delay: 10, alarm: '⚠ Raiders hitting Survey Post Beta!',
        spawn: [
          { unit: 'raider', team: 2, n: 3, at: [2990, 200], to: [2760, 520] },
          { unit: 'tank',   team: 2, n: 1, at: [2200, 60],  to: [2700, 470] },
        ],
        say: [['red', 'You parked a fortune in my corridor. Collections — move in.']] },
      { when: { done: ['out'] }, delay: 60, objective: 'back',
        say: [['ops', 'Cargo aboard! Turn it around, Commander — the road home is never the same road.']] },
      // they set the southern ambush AHEAD of the convoy, on the home stretch
      { when: { done: ['out'] }, delay: 70, alarm: '⚠ Ambush forming on the southern leg!',
        spawn: [
          { unit: 'raider', team: 2, n: 4, at: [1500, 2240], to: [900, 1900] },
          { unit: 'raider', team: 2, n: 3, at: [60, 1400], to: [500, 1850] },
        ] },
      // background pressure: toll collectors every so often until it's over
      { when: { time: 100, notDone: ['back'] }, repeat: true, every: 45,
        spawn: { unit: 'raider', team: 2, n: 1, at: [2200, 60], to: [350, 1950] } },
      // lose the convoy, lose the contract
      // NOT before the convoy exists: the player starts with 3 harvesters and
      // the haulers spawn at t=0.5s, so an ungated quota check loses at tick 0
      { when: { time: 5, unitsBelow: ['harvester', 4] }, lose: true },
    ],
    outro: [
      ['ops', 'Convoy home, silos full, and every raider they sent is cooling in the flats. That is a route, Commander.'],
      ['red', 'A courtesy visit, nothing more. The next one is a billing dispute.'],
      ['sci', 'Odd detail: the raiders drove within meters of two nest mounds and the broods never stirred. The wildlife has... opinions about who it minds.'],
    ],
    winText: 'The route is open — and Rubicon now knows your convoy schedule. This stopped being a survey the moment Krauss put a price on the road.',
    loseText: 'The convoy is scrap on the trade road. Survey Post Beta goes hungry, and Krauss bills the expedition for "corridor cleanup."',
  },
  {
    title: 'The Nest Problem', act: 'Act I — The Crystal War',
    map: 'valley', diff: 'easy', noEnemy: true,
    allow: { bld: ['supply', 'barracks', 'turret', 'refinery', 'power', 'factory'],
             unit: ['harvester', 'engineer', 'marine', 'sniper', 'rocket', 'medic', 'raider', 'tank', 'artillery'] },
    brief: [
      ['ops', 'Dead center of Fossil Valley: the richest field either outfit has surveyed, and two nest mounds sitting on it like a padlock.'],
      ['red', 'Open broadcast, Rubicon side of the valley: "Clearance operations commence at dawn. The mounds are geological obstructions. Bonuses per acre cleared."'],
      ['sci', 'They are not obstructions, they are colonies. And since nobody will stop the dig — at least let me show you how to take one apart properly. From a distance.'],
    ],
    intro: [
      ['ops', 'Rubicon is throwing riflemen at their mound and calling it a strategy. We do math instead: build a Factory — key V.'],
    ],
    objectives: [
      { id: 'fac',   text: 'Build a Factory (V)', type: 'built', bld: 'factory', count: 1 },
      { id: 'arty',  text: 'Field two Artillery (Factory — D)', type: 'unitCount', unit: 'artillery', count: 2, hidden: true },
      { id: 'nest',  text: 'Destroy the southern nest — from beyond its leash', type: 'destroy', bld: 'nest', x: 1666, y: 1262, r: 160, hidden: true, mark: [1666, 1262] },
      { id: 'hatch', text: 'Salvage the clutch and hatch a pack of 3 Spitters (HQ — R)', type: 'unitCount', unit: 'spitter', count: 3, hidden: true },
      // the pack has to DO something before the mission is a win (Bronson,
      // 2026-07-29: "we hatch the dinos but we need them to do something
      // first"). Lin's field test: walk them onto the NORTHERN mound — the one
      // Rubicon has been feeding riflemen into for three shifts — and take it.
      { id: 'pack',  text: 'Walk the pack onto the northern mound', type: 'groupReach', unit: 'spitter', x: 1406, y: 1042, r: 300, count: 3, hidden: true, mark: [1406, 1042] },
      { id: 'north', text: 'Take the northern nest with the pack', type: 'destroy', bld: 'nest', x: 1406, y: 1042, r: 160, hidden: true, mark: [1406, 1042] },
      { id: 'mine8', text: 'Mine 800 crystals', type: 'mined', amount: 800 },
    ],
    winWhen: ['fac', 'arty', 'nest', 'hatch', 'pack', 'north', 'mine8'],
    triggers: [
      { when: { done: ['fac'] }, objective: 'arty',
        say: [['ops', 'Factory online. Two Artillery — key D. Their guns out-range their own eyes, so walk a marine ahead as a spotter.']] },
      { when: { done: ['arty'] }, objective: 'nest',
        say: [['sci', 'On the record: I object to this entire doctrine. Off the record — your shells fly farther than the brood will chase. Park past their leash and the mound cannot answer you.'],
              ['ops', 'You heard the doctor. Crack the southern mound, Commander. Artillery talks, everybody walks.']] },
      // Rubicon's clearance "strategy", on open comms, forever
      { when: { time: 75, notDone: ['nest'] },
        say: [['red', 'First shift, forward! Every acre of mound is an acre of bonus!']] },
      { when: { time: 78, notDone: ['north'] }, repeat: true, every: 55,
        spawn: { unit: 'marine', team: 2, n: 4, at: [420, 320], to: [1406, 1042] } },
      { when: { time: 170, notDone: ['nest'] },
        say: [['red', '...Casualty reports are a rounding error. Second shift, forward. Payroll — stop counting.']] },
      { when: { time: 290, notDone: ['nest'] },
        say: [['red', 'Where is my third shift? ...Fine. Contractors, then. Contractors love bonuses.']] },
      { when: { done: ['nest'] }, objective: 'hatch',
        say: [['ops', 'Mound down, brood scattered, nobody scratched. Salvage crew — those eggs ride home with the crystal.'],
              ['sci', 'Careful with the clutch! I want the whole thing incubated — three at least. If we cannot stop the digging, we will at least understand what it wakes.']] },
      { when: { done: ['hatch'] }, objective: ['pack', 'north'],
        say: [['sci', 'They imprinted. Commander, they are following your units around like the fence is not there — and I would like to know what they do at a mound that is not theirs.'],
              ['ops', 'The northern mound. Rubicon has fed three shifts into it and it is still standing. Walk your pack up there and let us find out whose side biology is on.']] },
      { when: { done: ['pack'] },
        say: [['sci', 'The wild brood is not fleeing them — it is engaging them. Same species, and they are tearing at each other. Whatever binds these colonies, WE just broke it by hatching one in a lab.'],
              ['ops', 'Save the philosophy, doctor. Finish the mound.']] },
      { when: { done: ['north'] },
        say: [['red', 'Open channel: the expedition just cleared in ten minutes what cost me three shifts. ...I want to know how.'],
              ['sci', 'He should not want to know how. Nobody should.']] },
    ],
    outro: [
      ['ops', 'Both mounds down, the field is ours, and the things that cracked the second one are eating out of our hands.'],
      ['sci', 'That is what troubles me. They turned on their own colony without hesitating — and the moment it fell, the hum deepened. Two valleys over, something answered it. I am filing that under "later."'],
    ],
    winText: 'The mega-field is under expedition control. On the survey charts, the hum keeps spreading — deeper, and wider.',
    loseText: 'The nest problem solved you instead. Survey command is re-reading Dr. Lin\'s objection with fresh respect.',
  },
  {
    // M4 — the defensive toolkit mission. Everything red sends is SCRIPTED
    // (noEnemy), because a live AI would let the player rush instead of dig in.
    // The teaching beat: raiders `aim` at power plants, so the player learns the
    // brownout from the receiving end while their turrets slow to half rate.
    title: 'Dig In', act: 'Act I — The Crystal War',
    allow: { bld: ['supply', 'barracks', 'turret', 'refinery', 'power', 'factory'],
             unit: ['harvester', 'engineer', 'marine', 'sniper', 'rocket', 'medic', 'raider', 'tank', 'artillery', 'apc'] },
    map: 'gauntlet', diff: 'normal', noEnemy: true,
    brief: [
      ['ops', 'Rubicon has stopped pretending this is paperwork, Commander. Their survey teams pulled back overnight and their armor moved up. That means an offensive.'],
      ['ops', 'We are not going to sit in the camp and take it. The center field of the Gauntlet is the richest ground on this map — we take it, we fortify it, and we make Krauss pay for every meter.'],
      ['red', 'Open channel, Rubicon Actual: you are welcome to try holding the middle. I have been watching how you power that little camp of yours. Everything you own runs off a handful of very soft buildings.'],
      ['sci', 'He is not wrong, Commander. Turrets without power are ornaments. Keep the grid alive or the wall stops being a wall.'],
    ],
    intro: [
      ['ops', 'First, the tenants. There is a nest sitting on the center field — you know the drill by now. Artillery, from beyond the leash.'],
    ],
    objectives: [
      { id: 'nest',   text: 'Clear the nest off the center field', type: 'destroy', bld: 'nest', x: 1416, y: 1062, r: 170, mark: [1416, 1062] },
      { id: 'ref',    text: 'Build a Refinery on the center field', type: 'built', bld: 'refinery', count: 1, x: 1536, y: 1152, r: 430, hidden: true, mark: [1536, 1152] },
      { id: 'plant',  text: 'Build a Power Plant at the expansion (O)', type: 'built', bld: 'power', count: 1, x: 1536, y: 1152, r: 430, hidden: true },
      { id: 'turret', text: 'Anchor two Turrets at the expansion (T)', type: 'built', bld: 'turret', count: 2, x: 1536, y: 1152, r: 430, hidden: true },
      { id: 'hold',   text: 'Hold the expansion', type: 'survive', secs: 360, hidden: true },
    ],
    winWhen: ['nest', 'ref', 'plant', 'turret', 'hold'],
    triggers: [
      { when: { done: ['nest'] }, objective: 'ref',
        say: [['ops', 'Mound down. Now plant a Refinery on that field — the crystal under it is what this whole fight is about.']] },
      { when: { done: ['ref'] }, objective: ['plant', 'turret'],
        say: [['ops', 'Refinery online. Now make it a position, not a target: a Power Plant to run the guns, and two Turrets to be the guns.'],
              ['sci', 'And keep the plant behind the turrets, not in front of them. I should not have to say that. I am saying it anyway.']] },
      { when: { done: ['plant', 'turret'] }, objective: 'hold', alarm: '⚠ Rubicon armor inbound!',
        say: [['red', 'There it is. A refinery, a power plant, and two guns you cannot afford to lose. Thank you for putting them all in one place.'],
              ['ops', 'Contacts on the east approach. Dig in, Commander — hold this ground and the middle of the map is ours.']] },
      // the siege: raiders go for the PLANTS, and the pressure escalates
      { when: { done: ['plant', 'turret'], notDone: ['hold'] }, delay: 6, repeat: true, every: 42,
        spawn: { unit: 'raider', team: 2, n: 2, at: [3000, 1152], aim: 'power', order: 'attackhq' } },
      { when: { done: ['plant', 'turret'], notDone: ['hold'] }, delay: 70, repeat: true, every: 55,
        spawn: { unit: 'marine', team: 2, n: 3, at: [2990, 940], aim: 'turret', order: 'attackhq' } },
      // surge waves (2026-08-01, Bronson: "some waves with twice the people
      // so it is a scary challenge") — the repeats are the drumbeat, these
      // three one-shots are the punches. Each is ~double a standing wave and
      // arrives with an alarm so the fear is seen coming.
      { when: { done: ['plant', 'turret'], notDone: ['hold'] }, delay: 90, alarm: '⚠ Massed raider wave — double strength!',
        spawn: [
          { unit: 'raider', team: 2, n: 4, at: [3000, 1152], aim: 'power',  order: 'attackhq' },
          { unit: 'marine', team: 2, n: 3, at: [2990, 1000], aim: 'turret', order: 'attackhq' },
        ] },
      { when: { done: ['plant', 'turret'] }, delay: 120,
        say: [['red', 'Cut the power and the wall is just masonry. Second element — find their plants.']] },
      { when: { done: ['plant', 'turret'], notDone: ['hold'] }, delay: 130, repeat: true, every: 60,
        spawn: { unit: 'tank', team: 2, n: 1, at: [3000, 1360], aim: 'power', order: 'attackhq' } },
      { when: { done: ['plant', 'turret'] }, delay: 210, alarm: '⚠ Heavy armor push — double strength!',
        spawn: [
          { unit: 'tank',   team: 2, n: 4, at: [3000, 1152], aim: 'power', order: 'attackhq' },
          { unit: 'rocket', team: 2, n: 5, at: [2990, 1300], aim: 'turret', order: 'attackhq' },
        ],
        say: [['ops', 'That is everything he has been holding back. Repair through it, Commander — Engineers on the turrets, and keep the grid up.']] },
      { when: { done: ['plant', 'turret'], notDone: ['hold'] }, delay: 290, repeat: true, every: 45,
        spawn: { unit: 'raider', team: 2, n: 3, at: [2990, 980], aim: 'power', order: 'attackhq' } },
      { when: { done: ['plant', 'turret'], notDone: ['hold'] }, delay: 305, alarm: '⚠ Krauss commits everything!',
        spawn: [
          { unit: 'raider', team: 2, n: 6, at: [3000, 1100], aim: 'power',  order: 'attackhq' },
          { unit: 'marine', team: 2, n: 4, at: [2990, 1250], aim: 'turret', order: 'attackhq' },
          { unit: 'tank',   team: 2, n: 2, at: [3000, 1360], aim: 'power',  order: 'attackhq' },
        ],
        say: [['red', 'All elements, final push. Flatten it or stop billing me.']] },
      { when: { done: ['hold'] },
        say: [['red', 'Enough. Pull them back. ...Noted, Commander. You dig well.']] },
    ],
    outro: [
      ['ops', 'The line held and the field is ours. That is the first ground Rubicon has actually lost, Commander.'],
      ['sci', 'I logged something odd through all of it. Every time their armor came through the pass, the nests along the ridge went quiet. Not scattered — quiet. Listening.'],
    ],
    winText: 'The center of the Gauntlet belongs to the expedition, and Rubicon knows the cost of taking it back. Somewhere under the ridge, something counted the shots.',
    loseText: 'The expansion is slag and the center field is Rubicon\'s. Krauss found the power plants first, exactly as he said he would.',
  },
  {
    // M5 — the commando mission: `noBase` means NO player HQ at all, so checkEnd
    // switches to "lose when the last of the squad falls". No economy, no
    // reinforcements — the squad you land with is the squad you leave with.
    title: 'Ghost Survey', act: 'Act I — The Crystal War',
    // commando raid: no HQ, no construction, no production. Nothing to offer.
    allow: { bld: [], unit: [] },
    map: 'fen', diff: 'normal', noEnemy: true, noBase: true, start: [600, 1900],
    // NO nests on this one. The squad has no economy and no replacements, and
    // the causeways are the only crossings — so any mound near a crossing sits
    // on the one route the player can take. Measured: a nest at the west
    // causeway mouth erupted five spitters into the column and took six of
    // eleven before the first relay. In heavy fog that isn't a hazard you plan
    // around, it's a coin flip. The fields stay as scenery (there's no economy
    // to guard) and the roaming critters keep the swamp alive; the threat here
    // is Rubicon, which is the point of the mission.
    fields: [
      { p: [922, 1152],  n: 7,  a: 2300 },
      { p: [2150, 1152], n: 7,  a: 2300 },
      { p: [1536, 1152], n: 10, a: 3000 },
    ],
    brief: [
      ['ops', 'No base this time, Commander. One transport, one squad, and a swamp Rubicon thinks is empty.'],
      ['ops', 'Krauss has four survey relays strung across Blackwater Fen feeding a field lab on the north bank. We are going to take the relays off the board and walk out of that lab with his geological data.'],
      ['sci', 'I want the drilling logs specifically. He has been sinking bores far deeper than any crystal deposit justifies, and I would very much like to know what he thinks is down there.'],
      ['ops', 'Fog is heavy and the causeways are the only crossings. Move carefully — nothing is coming to bail you out.'],
    ],
    intro: [
      ['ops', 'Squad is on the ground. Relays are marked — work north, and use the medic. Every body you lose is a body you do not get back.'],
    ],
    objectives: [
      { id: 'relays',  text: 'Destroy Krauss\'s four survey relays', type: 'groupDead', group: 'relays', mark: [700, 980] },
      { id: 'power',   text: 'Cut the field lab\'s power — both generators', type: 'groupDead', group: 'labpower', hidden: true, mark: [2620, 200] },
      { id: 'lab',     text: 'Reach the darkened lab and pull the drilling logs', type: 'reach', x: 2450, y: 300, r: 150, hidden: true, mark: [2450, 300] },
      { id: 'exfil',   text: 'Reach the emergency LZ on the east coast (3+ alive)', type: 'groupReach', group: 'squad', x: 2880, y: 2040, r: 220, count: 3, hidden: true, mark: [2880, 2040] },
    ],
    winWhen: ['relays', 'power', 'lab', 'exfil'],
    triggers: [
      { when: { time: 0.5 },
        spawn: [
          { group: 'squad', unit: 'marine',   team: 1, n: 5, at: [600, 1900] },
          { group: 'squad', unit: 'sniper',   team: 1, n: 2, at: [660, 1960] },
          { group: 'squad', unit: 'medic',    team: 1, n: 2, at: [540, 1960] },
          { group: 'squad', unit: 'engineer', team: 1, n: 1, at: [600, 2010] },
          { group: 'squad', unit: 'apc',      team: 1, n: 1, at: [700, 1860] },
          // Krauss's quiet little network — four posts, corner to corner
          { group: 'relays', bld: 'supply', team: 2, at: [700, 980] },
          { group: 'relays', bld: 'supply', team: 2, at: [2400, 1330] },
          { group: 'relays', bld: 'supply', team: 2, at: [1350, 420] },
          { group: 'relays', bld: 'supply', team: 2, at: [500, 380] },
          { bld: 'barracks', team: 2, at: [2450, 300] },
          { bld: 'turret',   team: 2, at: [2400, 430] },
          // the lab runs off its own grid; dark, its door opens
          { group: 'labpower', bld: 'power', team: 2, at: [2620, 200] },
          { group: 'labpower', bld: 'power', team: 2, at: [2270, 170] },
          // difficulty pass (2026-08-01, Bronson speedran the fen in <4 min):
          // every relay is properly garrisoned — marines screen, a sniper or
          // rocket gives each post reach. Guards, not nests: visible, plannable.
          { unit: 'marine', team: 2, n: 3, at: [760, 1040],  order: 'guard' },
          { unit: 'sniper', team: 2, n: 1, at: [700, 900],   order: 'guard' },
          { unit: 'marine', team: 2, n: 3, at: [2340, 1280], order: 'guard' },
          { unit: 'rocket', team: 2, n: 1, at: [2460, 1390], order: 'guard' },
          { unit: 'marine', team: 2, n: 3, at: [1400, 480],  order: 'guard' },
          { unit: 'sniper', team: 2, n: 1, at: [1290, 370],  order: 'guard' },
          { unit: 'marine', team: 2, n: 3, at: [560, 450],   order: 'guard' },
          { unit: 'marine', team: 2, n: 3, at: [2450, 240],  order: 'guard' },
          { unit: 'sniper', team: 2, n: 1, at: [2530, 370],  order: 'guard' },
          { unit: 'marine', team: 2, n: 2, at: [2820, 960],  order: 'guard' },
          { unit: 'rocket', team: 2, n: 1, at: [2700, 850],  order: 'guard' },
          // the swamp isn't empty either: a wild pack claims the center
          // crystal field (OFF the causeway line — routable around, per the
          // no-nests-on-the-route rule) and a pair haunts the south-east bank
          { unit: 'spitter', team: 3, n: 3, at: [1536, 1152], order: 'guard' },
          { unit: 'spitter', team: 3, n: 2, at: [2700, 1720], order: 'guard' },
        ] },
      { when: { time: 14 },
        say: [['sci', 'The relays are listening posts, Commander — if one of them sees you before it dies, the lab knows you are coming.']] },
      // patrols sweep the causeways from the start: the fen is watched, not empty
      { when: { time: 70, notDone: ['exfil'] }, repeat: true, every: 80,
        spawn: { unit: 'marine', team: 2, n: 3, at: [2900, 250], order: 'attackhq', to: [1600, 1100] } },
      { when: { groupDead: 'relays' }, objective: 'power',
        say: [['ops', 'All four relays are dark. Krauss just went blind across the whole fen.'],
              ['red', 'Relay net is down. ...All of it? In a swamp? Seal the lab and get me eyes on the north bank.'],
              ['sci', 'Sealed means powered, Commander. Two generators behind the lab — take those and the door is just a door.']] },
      // he starts sweeping for you once the relays drop
      { when: { groupDead: 'relays', notDone: ['exfil'] }, delay: 30, repeat: true, every: 70,
        spawn: { unit: 'raider', team: 2, n: 3, at: [2900, 200], order: 'attackhq', to: [1500, 900] } },
      { when: { groupDead: 'labpower' }, objective: 'lab',
        say: [['sci', 'Lab is dark. Walk in and pull the drilling logs — everything he has on what is under this swamp.']] },
      { when: { groupDead: 'labpower', notDone: ['exfil'] }, delay: 25, repeat: true, every: 80,
        spawn: { unit: 'marine', team: 2, n: 2, at: [2900, 400], order: 'attackhq', to: [2450, 300] } },
      // the way you came in is closed — the long walk down the coast
      { when: { done: ['lab'] }, objective: 'exfil', alarm: '⚠ Landing zone overrun — divert to the east coast!',
        say: [['sci', 'I have the logs. His deepest bore is four kilometers down and still reading crystal. That is not a deposit — a deposit has a bottom.'],
              ['red', 'They are in my lab. Burn the swamp behind them and put a platoon on that landing zone. Nobody flies out of here.'],
              ['ops', 'Original LZ is gone. New extraction on the east coast, marked — move, Commander, and do not stop to win anything.']] },
      { when: { done: ['lab'] }, delay: 4,
        spawn: { unit: 'marine', team: 2, n: 4, at: [600, 1900], order: 'guard' } },
      // Krauss's platoon actually LANDS on the LZ (his line above promises it —
      // pre-difficulty-pass nothing spawned there and the walk ended in a hug)
      { when: { done: ['lab'] }, delay: 10,
        spawn: [
          { unit: 'marine', team: 2, n: 4, at: [2880, 2040], order: 'guard' },
          { unit: 'sniper', team: 2, n: 1, at: [2820, 1980], order: 'guard' } ] },
      // the pursuit: one cadence, no valve (the optional fuel-dump objective
      // was tried 2026-08-01 and cut same day — Bronson: "kill the secondary
      // mission"). Tuned between the old 58/75 and the valve-era heavy 45/60.
      { when: { done: ['lab'], notDone: ['exfil'] }, delay: 14, repeat: true, every: 50,
        spawn: { unit: 'marine', team: 2, n: 3, at: [2500, 250], order: 'attackhq', to: [2700, 1500] } },
      { when: { done: ['lab'], notDone: ['exfil'] }, delay: 55, repeat: true, every: 70,
        spawn: { unit: 'raider', team: 2, n: 2, at: [2990, 1200], order: 'attackhq', to: [2880, 2040] } },
      // the long walk gets the reveal, so the debrief doesn't have to carry it
      { when: { done: ['lab'] }, delay: 30,
        say: [['sci', 'Commander, while you walk — I have been reading. He is not drilling toward a deposit. He is drilling toward a single crystal. One structure, kilometers across.'],
              ['ops', 'That is not possible.'],
              ['sci', 'The seismic returns say it is not inert either. It has a rhythm. A slow one. I would very much like to be wrong about this.']] },
      // the squad is the mission — lose too many and there is nothing to extract
      { when: { groupBelow: ['squad', 3] }, lose: true },
    ],
    outro: [
      ['ops', 'Transport is up and everyone aboard is breathing. Clean work in a filthy swamp.'],
    ],
    winText: 'The relays are dead, the drilling logs are in expedition hands, and Dr. Lin has stopped sleeping. Whatever Rubicon is digging toward, it has a pulse.',
    loseText: 'The squad did not come out of the fen. Rubicon\'s relays are still listening, and nobody up the chain knows what Krauss is drilling toward.',
  },
  {
    // M6 — the deadline mission. The silo objective carries `limit` + onExpire
    // 'lose', so the HUD runs a live countdown and running it out ends the run.
    // Mid-mission Krauss fires a scripted tac nuke (trigger action `nuke`) at
    // the center nest field: the direct fuse for Act 2.
    title: 'Countdown', act: 'Act I — The Crystal War',
    allow: { bld: ['supply', 'barracks', 'turret', 'refinery', 'power', 'factory', 'airpad', 'flak'],
             unit: ['harvester', 'engineer', 'marine', 'sniper', 'rocket', 'medic', 'raider', 'tank', 'artillery', 'apc', 'gunship', 'harrier'] },
    map: 'silo', diff: 'normal', noEnemy: true,
    brief: [
      ['ops', 'Priority flash, Commander. Rubicon has a missile silo on the east side of the Silo Fields and our intercepts say it is fuelling now. The targeting package is our headquarters.'],
      ['red', 'Rubicon Actual, recorded for the claim board: the expedition has repeatedly interfered with lawful resource operations. Escalation is regrettable and entirely theirs.'],
      ['ops', 'He has built a defense line to buy the clock time. We do not have time to be elegant — assemble, push east, and put that silo in the ground.'],
      ['sci', 'And Commander — he has been firing tactical warheads into nest fields all week to clear ground. Whatever he thinks he is clearing, he is not clearing it. He is waking it.'],
    ],
    intro: [
      ['ops', 'Orbital dropped a strike element with you. Clock is live and it is not generous — build what you need and move.'],
    ],
    objectives: [
      { id: 'silo', text: 'Destroy Krauss\'s missile silo', type: 'destroy', bld: 'silo', x: 2700, y: 1152, r: 240,
        limit: 720, onExpire: 'lose', mark: [2700, 1152] },
    ],
    winWhen: ['silo'],
    triggers: [
      { when: { time: 0.5 }, crystals: 500,
        spawn: [
          { unit: 'tank',   team: 1, n: 2, at: [430, 1290] },
          { unit: 'rocket', team: 1, n: 2, at: [500, 1360] },
          { unit: 'marine', team: 1, n: 3, at: [380, 1380] },
          // Krauss's silo complex and the line built to buy it time
          { bld: 'silo',   team: 2, at: [2700, 1152] },
          { bld: 'power',  team: 2, at: [2860, 1040] },
          { bld: 'power',  team: 2, at: [2860, 1270] },
          { bld: 'turret', team: 2, at: [2430, 980] },
          { bld: 'turret', team: 2, at: [2430, 1330] },
          { bld: 'turret', team: 2, at: [2560, 1152] },
          { bld: 'supply', team: 2, at: [2880, 1152] },
          { unit: 'marine', team: 2, n: 4, at: [2480, 1152], order: 'guard' },
          { unit: 'tank',   team: 2, n: 2, at: [2600, 1000], order: 'guard' },
        ] },
      { when: { time: 20 },
        say: [['sci', 'The silo is drawing power from two plants behind the line. Take those and the launch stalls — it will not stop the clock, but it will slow it.']] },
      // scripted counterattacks: he is buying minutes, not winning
      { when: { time: 75, notDone: ['silo'] }, repeat: true, every: 60,
        spawn: { unit: 'raider', team: 2, n: 2, at: [2900, 900], order: 'attackhq' } },
      { when: { time: 150, notDone: ['silo'] }, repeat: true, every: 75,
        spawn: { unit: 'tank', team: 2, n: 1, at: [2900, 1400], order: 'attackhq' } },
      // the fuse for Act 2 — he nukes a nest field to clear ground, on camera
      { when: { time: 235, notDone: ['silo'] }, focus: [1536, 1152],
        say: [['red', 'Clearance shot on the center field. Log it as geological obstruction removal.']] },
      // a salvo, one warhead per colony — a single shell at the midpoint left
      // one mound standing on 87hp and made Lin's next line a lie
      { when: { time: 240, notDone: ['silo'] },
        nuke: [{ at: [1426, 1042] }, { at: [1646, 1262] }],
        say: [['sci', 'He is firing on the CENTER FIELD? There are two colonies on that ground — Commander, if you have anything near the middle of this map, move it NOW.']] },
      { when: { time: 278, notDone: ['silo'] },
        say: [['sci', 'Seismographs just went off the scale, and it is not the blast. The hum did not stop when the colonies died. It got LOUDER. Something answered that.'],
              ['ops', 'Log it and keep it off the open channel, doctor. One war at a time.']] },
      { when: { time: 420, notDone: ['silo'] },
        say: [['ops', 'Six minutes on the clock, Commander. Whatever is left of that line, go through it.']] },
      { when: { time: 600, notDone: ['silo'] }, alarm: '⚠ Two minutes to launch!',
        say: [['red', 'Fuelling complete. Two minutes. I would start running, but I am told you people dig in.']] },
    ],
    outro: [
      ['ops', 'Silo is wreckage and the warhead never left the tube. That was closer than I will be putting in the report.'],
      ['red', 'An expensive afternoon. ...You should know the launch order did not originate with me. I only build what the claim board pays for.'],
      ['sci', 'Commander — while you were shooting, I was listening. The field he burned is still humming. Dead colonies do not hum. Something is using them.'],
    ],
    winText: 'The warhead is scrap and Krauss is answering to a claim board that wanted it fired. Under the burned center field, the hum has not stopped — and now it has company.',
    loseText: 'The countdown reached zero. Expedition headquarters is a crater, and Rubicon\'s claim board files the loss as geological obstruction removal.',
  },
  {
    // Act 1 finale. First mission fought against a LIVE red base — noEnemy is off,
    // so placeBase(2), the base-building AI and the assault waves all run. The act
    // ends mid-victory-speech: the HQ kill is NOT the win condition, the den that
    // erupts afterward is (objective 'brood'), which is why checkEnd leaves
    // campaign victory entirely to the objective list.
    title: 'High Water Mark', act: 'Act I — The Crystal War',
    allow: { bld: ['supply', 'barracks', 'turret', 'refinery', 'power', 'factory', 'airpad', 'flak', 'hydro'],
             unit: ['harvester', 'engineer', 'marine', 'sniper', 'rocket', 'medic', 'raider', 'tank', 'artillery', 'apc', 'gunship', 'harrier'] },
    map: 'hwm', diff: 'normal',
    brief: [
      ['ops', 'Rubicon has dug in across the river, Commander. One channel, two causeways, and Krauss has a fort staring down each of them. That is the whole war in one map.'],
      ['red', 'Rubicon Actual to expedition command: you are welcome to the west bank. It is the cheaper half. Cross the water and we will discuss it at length.'],
      ['ops', 'Then we cross. Break both river forts, put his headquarters in the mud, and this contract dispute is over.'],
      ['sci', 'One request before you start shelling. The riverbed reads hollow for two kilometers — the hum I have been logging since the first nest runs directly under his fortress. Whatever you break over there, break it carefully.'],
    ],
    intro: [
      ['ops', 'Your engineers can put that river to work first: a Hydro Dam spans the channel and powers a third of a base by itself — and its walkway carries infantry straight across. Depot, plant, then dam. Key J.'],
    ],
    objectives: [
      { id: 'dam',   text: 'Build a Hydro Dam across the river (J)', type: 'built', bld: 'hydro', count: 1 },
      { id: 'fortN', text: 'Break the northern river fort', type: 'flag', hidden: true, mark: [1780, 1000] },
      { id: 'fortS', text: 'Break the southern river fort', type: 'flag', hidden: true, mark: [1790, 1860] },
      { id: 'hq',    text: 'Destroy Rubicon headquarters', type: 'destroy', bld: 'hq', x: 2842, y: 1112, r: 420, hidden: true, mark: [2842, 1112] },
      { id: 'brood', text: 'Something is surfacing in the ruins — stand your ground', type: 'flag', hidden: true, mark: [2760, 1180] },
    ],
    winWhen: ['dam', 'fortN', 'fortS', 'hq', 'brood'],
    triggers: [
      // a task force lands with you — this is the offensive, not another survey
      { when: { time: 0.5 }, crystals: 150,
        spawn: [
          { unit: 'marine', team: 1, n: 3, at: [420, 1330] },
          { unit: 'rocket', team: 1, n: 2, at: [480, 1260] },
        ] },
      // the two crossing forts, pre-built on the east bank
      { when: { time: 1 },
        spawn: [
          { group: 'fortN', bld: 'turret', team: 2, at: [1760, 940] },
          { group: 'fortN', bld: 'turret', team: 2, at: [1790, 1060] },
          { group: 'fortN', bld: 'supply', team: 2, at: [1880, 1000] },
          // clear of the southern overlook's cliff rim — a fort hugging the rim
          // makes a wall+building pinch that swallows attackers (map gotcha)
          { group: 'fortS', bld: 'turret', team: 2, at: [1770, 1830] },
          { group: 'fortS', bld: 'turret', team: 2, at: [1800, 1950] },
          { group: 'fortS', bld: 'supply', team: 2, at: [1700, 1745] },
          { unit: 'marine', team: 2, n: 2, at: [1850, 1000], order: 'guard' },
          { unit: 'rocket', team: 2, n: 1, at: [1830, 940],  order: 'guard' },
          { unit: 'marine', team: 2, n: 2, at: [1860, 1870], order: 'guard' },
          { unit: 'rocket', team: 2, n: 1, at: [1840, 1810], order: 'guard' },
        ] },
      { when: { done: ['dam'] }, objective: ['fortN', 'fortS'],
        say: [['ops', 'Dam is holding and the grid has never looked better. Note the walkway, Commander — rifles cross there, tracks do not. Vehicles still take a causeway.'],
              ['ops', 'Now the forts. North and south crossing, both marked. Artillery from the overlooks will out-range those turrets if you spot for it.'],
              ['red', 'Ah — the dam. Enjoy it. I built my quarter on the assumption that nobody would spend four hundred on scenery.']] },
      { when: { groupDead: 'fortN' }, complete: 'fortN',
        say: [['ops', 'Northern crossing is open. Push armor through before he plugs it.']] },
      { when: { groupDead: 'fortS' }, complete: 'fortS',
        say: [['ops', 'Southern fort is rubble. Both causeways are ours, Commander.']] },
      { when: { done: ['fortN', 'fortS'] }, objective: 'hq',
        say: [['red', 'Both crossings. In one afternoon. ...Fine. Pull the line back to the headquarters — everything we have, on the wire.'],
              ['ops', 'He is out of river to hide behind. Finish it.']] },
      // Krauss's war, deteriorating on open comms
      { when: { time: 220, notDone: ['hq'] },
        say: [['red', 'Corporate wants a status update. Tell them the corridor is contested and the bonuses are suspended.']] },
      { when: { time: 400, notDone: ['hq'] },
        say: [['sci', 'Commander — the seismographs. Every shell that lands over there rings something underneath it. That is not bedrock answering.']] },
      { when: { time: 620, notDone: ['hq'] },
        say: [['red', 'Second line, hold. HOLD. We are not losing a claim to a survey crew with a dam fetish.']] },
      // the victory speech, and the interruption
      { when: { done: ['hq'] },
        say: [['ops', 'Rubicon headquarters is down. Krauss is off the air and his people are walking out with their hands up.'],
              ['ops', 'Commander — on behalf of the expedition, that is the war. The crystal fields are ours, the charter is ours, and as of this moment Rubicon Mining\'s claim on this planet is—']] },
      { when: { done: ['hq'] }, delay: 7, objective: 'brood', alarm: '⚠ Seismic rupture under the enemy ruins!',
        focus: [2760, 1180],   // the act's cliffhanger — put it on screen, always
        // invuln: Act 1 does NOT get to answer this. The den erupts, the pack
        // it births comes with it, and the act ends whatever the player does.
        spawn: [{ group: 'den', bld: 'den', at: [2760, 1180], invuln: true }],
        say: [['sci', 'THE GROUND — Commander, get your people off that ridge, the whole plate just—']] },
      { when: { done: ['hq'] }, delay: 22,
        say: [['ops', 'What IS that? They came up through the foundations. Through solid rock, doctor, how—'],
              ['sci', 'Faster than anything we have catalogued. And they are not coming out of the river or the fields. They are coming out of HIS base.']] },
      { when: { done: ['hq'] }, delay: 48, complete: 'brood' },
    ],
    outro: [
      ['ops', 'Expedition command, this is Vega. Rubicon Mining is finished on this planet. We did not win it.'],
      ['sci', 'They waited until you were done.'],
    ],
    winText: 'The war for the crystal fields is over in ninety minutes and settled in ninety seconds. Something has been under the valley the entire time — patient, listening, counting. It let two companies exhaust each other first.',
    loseText: 'The high water mark is a line on the west bank. Rubicon holds the river, the fortress, and whatever is sleeping beneath it.',
  },
  {
    // Act 2 opens on an ECONOMY race — the first mission you can lose without
    // losing a fight. Krauss's haul counter is the antagonist; his forward
    // refinery is the thing you can do about it. The nuke and the den that
    // answers it are the act's thesis delivered in ninety seconds.
    title: 'Strip Mine', act: 'Act II — The Awakening',   // full arsenal from here on
    map: 'mine', diff: 'normal',
    brief: [
      ['ops', 'The motherlode at the bottom of the Strip Mine is the richest single field either outfit has surveyed, and Rubicon started hauling it out four days ago. They are not contesting the ground, Commander. They are just taking it faster than we are.'],
      ['red', 'Open channel, Rubicon side: "The claim board rewards tonnage, not paperwork. Dig, gentlemen. Whatever is in the way is overburden."'],
      ['sci', 'Overburden. There are two colonies on that field and he is calling them overburden. Commander, I have asked for this on the record before and I will ask again: do not let him clear that ground.'],
    ],
    intro: [
      ['ops', 'Simple terms: out-haul him. Bank twenty-five hundred before his counter hits four thousand, and put his forward refinery in the pit while you are at it.'],
    ],
    objectives: [
      { id: 'race', text: 'Out-haul Rubicon — bank 6000 crystals', type: 'mined', amount: 6000 },
      { id: 'fwd',  text: 'Destroy Rubicon\'s forward refinery', type: 'destroy', bld: 'refinery', x: 2150, y: 430, r: 210, mark: [2150, 430] },
      { id: 'hold', text: 'Survive what comes out of the crater', type: 'survive', secs: 90, hidden: true },
    ],
    winWhen: ['race', 'fwd', 'hold'],
    triggers: [
      // his forward refinery: the counter you can actually shoot
      { when: { time: 0.5 }, crystals: 300,
        spawn: [
          { bld: 'refinery', team: 2, at: [2150, 430] },
          { bld: 'turret',   team: 2, at: [2320, 380] },
          { bld: 'supply',   team: 2, at: [2020, 310] },
          { unit: 'harvester', team: 2, n: 3, at: [2150, 530] },
          { unit: 'marine',  team: 2, n: 3, at: [2240, 480], order: 'guard' },
          { unit: 'tank',    team: 2, n: 1, at: [2060, 400], order: 'guard' },
        ] },
      // THE RACE. His strip-mining operation hauls ~640/min while the forward
      // camp feeds it and ~210/min once you raze it — so the objective is the
      // valve, not decoration. Tuned so hands-off you lose at ~11min, and a
      // raid inside the first five minutes buys roughly nine extra minutes.
      { when: { time: 8, notDone: ['fwd'] }, repeat: true, every: 10, haul: 107 },
      { when: { done: ['fwd'] }, repeat: true, every: 10, haul: 35 },
      { when: { time: 25 },
        say: [['ops', 'His forward refinery sits on the high bench above the pit, deep on his side — it is feeding his whole strip-mining operation. Put it in the ground and his haul collapses to a trickle — that is the mission, Commander, not out-digging him.'],
              ['sci', 'The benches are the high ground here, Commander. Whoever holds them sees the whole motherlode. Whoever does not, does not.']] },
      // the race, narrated: Krauss's counter is the antagonist
      { when: { haul: 2500 },
        say: [['red', 'Twenty-five hundred tons off the motherlode and the day is young. Do send my regards to your accountants.']] },
      { when: { haul: 4500 }, alarm: '⚠ Rubicon is out-hauling you.',
        say: [['ops', 'He is ahead of us, Commander, and he is not slowing down. More harvesters, more refineries — or take his.']] },
      { when: { haul: 6000 }, alarm: '⚠ Rubicon\'s haul is nearly at quota!',
        say: [['red', 'Six thousand. At seven the claim board declares the field worked and the grid is mine on paper. You are welcome to the paperwork.']] },
      { when: { haul: 7000 }, lose: true },
      // he clears the "overburden" — the same clearance shot as M6, casually,
      // as a mining operation rather than an act of war
      { when: { time: 200 }, focus: [1536, 1152],
        say: [['red', 'Clearance shot on the pit floor. Both mounds. Bill it to overburden removal.']] },
      { when: { time: 206 },
        nuke: [{ at: [1386, 1052] }, { at: [1686, 1252] }],
        say: [['sci', 'He is doing it AGAIN — Commander, anything you have on the pit floor, move it now!']] },
      { when: { time: 244 },
        say: [['sci', 'Both colonies are gone and the hum did not stop. It is louder than the Silo Fields and it is coming from UNDER the pit. That is not an echo. That is something moving.']] },
      // the answer: Act 2's first unprovoked dinos, and they do not pick a side
      { when: { done: ['race', 'fwd'] }, delay: 8, objective: 'hold',
        alarm: '⚠ The pit floor is breaking open!',
        focus: [1536, 1152],
        spawn: [
          { bld: 'den', team: 3, at: [1536, 1152] },
          { unit: 'raptor', team: 3, n: 4, at: [1450, 1230], order: 'attackhq' },
        ],
        say: [['sci', 'The crater floor just came apart. That is a den, Commander — a nest builds, a den HUNTS. And it is not hunting us specifically.'],
              ['ops', 'It broke for Rubicon\'s lines first. Hold what you have for ninety seconds and let it do the math — everything on the wall.']] },
      { when: { done: ['hold'] },
        say: [['red', 'Expedition, this is Krauss on open channel. My forward camp is gone. Not overrun — GONE. Whatever came out of your pit walked through a turret line without slowing down.']] },
    ],
    outro: [
      ['ops', 'Quota banked, his refinery is scrap, and the thing in the crater is still down there.'],
      ['sci', 'It did not come out because we dug. It came out because he BURNED it. Twice. The colonies were an alarm and he has been tripping it all week.'],
      ['red', 'Recorded, expedition. I am filing this as an unclassified hazard and requesting reinforcement. Do not mistake that for an apology.'],
    ],
    winText: 'You won the field and the claim board will never know why it stopped mattering. Krauss has started asking for help — and the thing under the Strip Mine has learned that the noise comes from the north.',
    loseText: 'Rubicon worked the motherlode dry and the grid is theirs on paper. The colonies are still standing, which is the only mercy in the report.',
  },
];

// Research, StarCraft-style: bought at the producing building, occupies its queue.
// Levels live on teams[t].up; effects applied via weaponMult/armorMult/carryCap/effSpeed.
const UPG = {
  infWeapons: { label: 'Infantry Weapons', at: 'barracks', max: 3, cost: [100, 175, 250], time: [20 * 60, 25 * 60, 30 * 60] },
  infArmor:   { label: 'Infantry Armor',   at: 'barracks', max: 3, cost: [100, 175, 250], time: [20 * 60, 25 * 60, 30 * 60] },
  vehWeapons: { label: 'Vehicle Weapons',  at: 'factory',  max: 3, cost: [125, 200, 275], time: [22 * 60, 27 * 60, 32 * 60] },
  vehArmor:   { label: 'Vehicle Armor',    at: 'factory',  max: 3, cost: [125, 200, 275], time: [22 * 60, 27 * 60, 32 * 60] },
  harvest:    { label: 'Harvester Systems', at: 'hq',      max: 3, cost: [125, 200, 275], time: [20 * 60, 25 * 60, 30 * 60] },
};
const IS_INF = { marine: 1, sniper: 1, engineer: 1, medic: 1, rocket: 1 };
const IS_DINO = { spitter: 1, raptor: 1, critter: 1, screecher: 1, ironback: 1, broodmother: 1 };
const isFlesh = (u) => !!IS_INF[u.type] || !!IS_DINO[u.type];   // what a medic can heal: infantry + dinos
const isVehicle = (u) => u.kind === 'unit' && !IS_INF[u.type] && !IS_DINO[u.type];   // what an engineer can repair
// Veterancy: every unit remembers its kills. 2/4/8 kills → +10% damage and
// −8% damage taken per rank, and Legends (rank 3) slowly self-heal.
const RANK_AT = [2, 4, 8];
const RANK_NAMES = ['', 'Veteran', 'Elite', 'Legend'];
const rankOf = (u) => (u.kills >= RANK_AT[2] ? 3 : u.kills >= RANK_AT[1] ? 2 : u.kills >= RANK_AT[0] ? 1 : 0);
const weaponMult = (e) => e.kind === 'unit'
  ? (1 + 0.12 * teams[e.team].up[IS_INF[e.type] ? 'infWeapons' : 'vehWeapons']) * (1 + 0.10 * rankOf(e)) : 1;
const armorMult = (e) => e.kind === 'unit'
  ? (1 - 0.10 * teams[e.team].up[IS_INF[e.type] ? 'infArmor' : 'vehArmor']) * (1 - 0.08 * rankOf(e)) : 1;
const carryCap = (u) => UNIT.harvester.carry + 3 * teams[u.team].up.harvest;
const effSpeed = (u) => u.speed * (u.type === 'harvester' ? 1 + 0.10 * teams[u.team].up.harvest : 1);

const PLACE_NEAR_BASE = 300;       // most buildings must go near an existing friendly building
const REFINERY_NEAR_CRYSTAL = 240; // refineries instead must go near a live crystal patch
const SUPPLY_HARD_CAP = 100;
// player-placeable buildings and their hotkeys (shown on the command card)
// A mission can restrict what the PLAYER may field, so the tutorial arc isn't
// cluttered with tech it hasn't taught (Bronson, 2026-07-29: "the first two
// levels don't need an air pad or a factory because we are working on the
// barracks… I shouldn't be able to construct a missile silo on the first
// level"). `allow: { bld: [...], unit: [...] }` on a mission spec; absent means
// everything, so skirmish is untouched. Team 1 only — the AI builds what its
// own logic wants.
const missionAllows = (kind, type) => {
  if (!mission || !mission.allow || !mission.allow[kind]) return true;
  return mission.allow[kind].includes(type);
};
const BUILD_MENU = [['turret', 'T'], ['barracks', 'B'], ['factory', 'V'], ['supply', 'C'], ['power', 'O'], ['hydro', 'J'], ['refinery', 'G'], ['airpad', 'X'], ['flak', 'Y'], ['silo', 'N']];
// tech tree checks (see BLD req fields)
function hasTech(team, type) {
  if (devMode && team === 1) return true;   // dev mode: the whole tree, no prerequisites
  const req = BLD[type].req;
  return !req || req.every(r => buildings.some(b => b.team === team && b.type === r && b.built >= 1));
}
const techLabel = (type) => (BLD[type].req || []).map(r => BLD[r].label).join(' + ');
// Team color schemes (CAMPAIGN.md). Colorblind rule: the three teams separate
// by BRIGHTNESS, not just hue — teal mid (lum ~.59), red dark (~.49), wild
// dinos pale bone (~.72) — so minimap dots stay readable under any color vision.
// bld: optional darker tint for STRUCTURES (red's identity touch — Rubicon
// architecture reads heavier than its vehicles). Wild dinos read as *nature*,
// not a faction: bone hide, moss darks. Broodfallen (corrupted red) comes in Act 3.
// Five-role palettes (assets/sprites/STYLE-GUIDE.md): main=hull, trim=panels,
// accent=lights/tips (the 5% that pops), bld=structures, fx=projectiles/glow.
const COLORS = {
  1: { main: '#3fb9c9', dark: '#1e6570', light: '#9fe8ef', trim: '#e8e4d8', accent: '#f0c86a', bld: '#2f97a6', fx: '#9fe8ef' },
  2: { main: '#e0564a', dark: '#7c2a24', light: '#f5a89a', trim: '#3a3f45', accent: '#f2b63d', bld: '#b8443a', fx: '#f5a89a' },
  3: { main: '#c2bb96', dark: '#5f5c3e', light: '#eae4cb', trim: '#5f5c3e', accent: '#a8d060', bld: '#c2bb96', fx: '#b6e06a' },   // dinos: bone hide, moss, venom
};
const HAZARD_YELLOW = '#f2b63d';   // industrial hazard striping is universal, not a team color
const CRYSTAL_COLOR = '#6fe3d0';

// ---------------- State ----------------
let nextId = 1;
let units = [], buildings = [], crystals = [], bullets = [], fxs = [], eggs = [];
let rocks = [];   // impassable terrain circles {x, y, r} — flyers ignore them
let nukes = [];          // inbound warheads {x, y, team, tier, t, max}
let nukeTargeting = null;   // the silo currently picking a target
const NUKE = {
  tac: { label: 'Tactical Nuke', cost: 10000, radius: 170, dmg: 1300, hqSafe: true },
  hq:  { label: 'Bunker Buster', cost: 25000, radius: 200, dmg: 3200, hqSafe: false },
};
const NUKE_COUNTDOWN = 30 * 60;     // both sides get 30 loud seconds
const NUKE_HQ_EXCLUSION = 180;      // tactical warheads can't be aimed at an HQ itself (blast still spares HQs entirely)
const newUp = () => ({ infWeapons: 0, infArmor: 0, vehWeapons: 0, vehArmor: 0, harvest: 0 });
// team 3 = neutral dinos — no economy, but weaponMult/armorMult index into it
const teams = {
  1: { crystals: 180, eggs: 0, captives: 0, mined: 0, up: newUp() },
  2: { crystals: 180, eggs: 0, captives: 0, mined: 0, up: newUp() },
  3: { crystals: 0, eggs: 0, captives: 0, mined: 0, up: newUp() },
};
let tick = 0;
let gameOver = null;                 // null | 'win' | 'lose'
let waveAt = 100 * 60, waveNum = 0;  // first enemy assault at 100s
let muted = false;
let fogMemory = true;   // true = explored ground stays dimly visible; false = re-fogs to black

// ---------------- Utils ----------------
const dist2 = (x1, y1, x2, y2) => { const dx = x2 - x1, dy = y2 - y1; return dx * dx + dy * dy; };
const dist = (x1, y1, x2, y2) => Math.sqrt(dist2(x1, y1, x2, y2));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const isCombat = (u) => u.type !== 'harvester' && u.type !== 'engineer' && u.type !== 'medic' && u.type !== 'rig' && u.type !== 'critter';
// Professional non-combatants: heal/repair crews ignore attack commands and
// hold at standoff on A-moves. Keyed by TYPE, not dmg — the engineer carries a
// token dmg 2 melee poke that slipped it past every `dmg <= 0` guard (playtest
// 2026-08-01: engineers charged the A-move point right alongside the medics).
const isSupport = (u) => u.type === 'medic' || u.type === 'engineer';

// ---------------- FX sprites (Kenney particle packs, CC0 — see assets/fx/) ----------------
// If the images fail to load (e.g. moved/deleted), spritesReady stays false and
// every effect falls back to the original procedural drawing.
const SPR = { explosion: [], smoke: [], puff: [], shotLarge: new Image(), shotThin: new Image() };
let spritesReady = false;
(function loadSprites() {
  let pending = 0, failed = false;
  const done = () => { if (--pending === 0 && !failed) spritesReady = true; };
  const load = (img, src) => { pending++; img.onload = done; img.onerror = () => { failed = true; }; img.src = src; return img; };
  for (let i = 0; i < 9; i++) SPR.explosion.push(load(new Image(), 'assets/fx/explosion' + i + '.png'));
  for (let i = 0; i < 8; i++) SPR.smoke.push(load(new Image(), 'assets/fx/smoke' + i + '.png'));
  for (let i = 0; i < 6; i++) SPR.puff.push(load(new Image(), 'assets/fx/puff' + i + '.png'));
  load(SPR.shotLarge, 'assets/fx/shot_large.png');
  load(SPR.shotThin, 'assets/fx/shot_thin.png');
})();
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------------- Body sprites (units & buildings) ----------------
// Kenney Top-Down Tanks / Top-Down Shooter / Tower Defense packs (CC0).
// Same deal as the FX: if anything fails to load, bodiesReady stays false and
// units/buildings keep their procedural look.
const BODY = {};
let bodiesReady = false;
(function loadBodies() {
  const names = ['tank_body', 'tank_barrel', 'raider_barrel', 'crate',
    'inf_marine', 'inf_sniper', 'inf_engineer',
    'bld_plate', 'bld_plate_oct', 'turret_gun', 'bld_vent_a', 'bld_vent_b'];
  let pending = names.length, failed = false;
  for (const n of names) {
    const i = new Image();
    i.onload = () => { if (--pending === 0 && !failed) bodiesReady = true; };
    i.onerror = () => { failed = true; };
    i.src = 'assets/sprites/' + n + '.png';
    BODY[n] = i;
  }
})();

// Optional art slots — no files exist for these yet. Drop a PNG with the
// right name into assets/sprites/ and it's used automatically next reload;
// until then the procedural drawing stays. See assets/sprites/ART-WANTED.md.
const OPT = {};
(function loadOptional() {
  const names = ['dino_spitter', 'dino_nest', 'dino_den', 'gunship', 'artillery', 'egg', 'medic', 'rocket_trooper', 'apc', 'harrier'];
  for (const k in UNIT) names.push('unit_' + k);   // unit_marine.png, unit_tank.png, …
  for (const k in BLD) if (k !== 'nest' && k !== 'den') names.push('bld_' + k);   // bld_hq.png, … (dino structures use dino_* slots)
  names.push('unit_marine_hunker', 'unit_sniper_hunker', 'unit_artillery_hunker');   // dug-in poses
  names.push('rock', 'crystal');   // terrain art (natural colors, not tinted)
  names.push('tree', 'tree_dead', 'spire', 'bones', 'pit', 'water', 'water2', 'water3', 'water4');   // terrain + seamless water tile frames
  // pre-colored colorway slots (STYLE-GUIDE.pdf / Gemini pipeline): drawn AS-IS,
  // no team tint. _teal = team 1, _red = team 2, _wild = untamed dinos.
  for (const k in UNIT) names.push('unit_' + k + '_teal', 'unit_' + k + '_red');
  for (const k in BLD) if (k !== 'nest' && k !== 'den') names.push('bld_' + k + '_teal', 'bld_' + k + '_red');
  names.push('unit_marine_hunker_teal', 'unit_marine_hunker_red',
    'unit_sniper_hunker_teal', 'unit_sniper_hunker_red',
    'unit_artillery_hunker_teal', 'unit_artillery_hunker_red',
    'turret_gun_teal', 'turret_gun_red');
  // every dino gets a _wild static slot — the hand-list this replaces silently
  // skipped the Screecher and Ironback, so their installed art never loaded
  for (const k in IS_DINO) names.push('unit_' + k + '_wild');
  // animation frame slots. Any prefix of frames works — the game uses however
  // many it finds. death: sliced from Gemini spritesheets. walk: sliced from
  // AI walk-in-place videos via slice_walk.py (2026-07-20, DaVinci marine first;
  // units without walk art keep the procedural sway fallback).
  for (const k in UNIT) {
    for (const cw of ['_teal', '_red', '_wild']) {
      for (let i = 1; i <= 4; i++) names.push('unit_' + k + '_death' + i + cw);
      for (let i = 1; i <= 8; i++) names.push('unit_' + k + '_walk' + i + cw);
    }
  }
  // terrain art is baked into the pre-rendered ground canvas — if one of these
  // finishes loading AFTER setup() painted it (cold load), repaint the ground
  const TERRAIN_SLOTS = new Set(['rock', 'tree', 'tree_dead', 'spire', 'bones', 'pit', 'water']);
  for (const n of names) {
    const i = new Image();
    OPT[n] = { img: i, ok: false };
    i.onload = () => {
      OPT[n].ok = true;
      if (TERRAIN_SLOTS.has(n) && groundM) paintGround(groundM);
    };
    i.onerror = () => { OPT[n].err = true; };   // settled-absent, distinct from still-loading
    i.src = 'assets/sprites/' + n + '.png';
  }
})();
const opt = (n) => (OPT[n] && OPT[n].ok) ? OPT[n].img : null;
let groundM = null;   // the map whose terrain is currently baked into groundCv

// team-color tinted copies, built once per (sprite, tint) on first use
const tintCache = new Map();
function teamSprite(img, team, tint) {
  tint = tint || COLORS[team].main;
  const key = img.src + '|' + tint;
  let c = tintCache.get(key);
  if (!c) {
    c = document.createElement('canvas');
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    const g = c.getContext('2d');
    g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'multiply';          // team color, keeps shading
    g.fillStyle = tint;
    g.fillRect(0, 0, c.width, c.height);
    g.globalCompositeOperation = 'destination-in';    // restore transparency
    g.drawImage(img, 0, 0);
    tintCache.set(key, c);
  }
  return c;
}
// structures can run a darker tint than the team's vehicles (red's identity touch)
const bldSprite = (img, team) => teamSprite(img, team, COLORS[team].bld || COLORS[team].main);
// pre-colored colorway art (Gemini pipeline): full-color sprites that bypass
// the tint entirely. Missing files fall through to tinted neutral art as ever.
const CW = { 1: '_teal', 2: '_red', 3: '_wild' };
const optCW = (base, team) => opt(base + (CW[team] || ''));
// animation frames: consecutive numbered slots, memoized once found (images
// load async, so an empty result is retried until the files settle)
const animCache = {};
function animFrames(type, kind, team, max) {
  const key = type + kind + team;
  const hit = animCache[key];
  if (hit && hit.length) return hit;
  const a = [];
  let settled = true;
  for (let i = 1; i <= max; i++) {
    const n = 'unit_' + type + '_' + kind + i + (CW[team] || '');
    const f = opt(n);
    if (f) { a.push(f); continue; }
    // stop at the first missing frame — but only memoize if that slot has
    // SETTLED (unregistered or 404'd). A still-loading slot means the prefix
    // may grow: return it uncached and re-collect until the files decide.
    settled = !OPT[n] || !!OPT[n].err;
    break;
  }
  if (a.length && settled) animCache[key] = a;
  return a;
}

// world px of ground covered per full walk cycle — cadence knob for walk
// frames (smaller = faster leg churn; feet look planted when this ≈ sprite size).
// UNIT[type].stridePx overrides per unit: heavy quadrupeds need a long stride
// or their amble plays back frantic (grazer playtest 2026-07-21).
const WALK_STRIDE_PX = 34;
const strideOf = (t) => UNIT[t].stridePx || WALK_STRIDE_PX;

// distance from unit/building center to the muzzle tip of its drawn barrel
const MUZZLE_LEN = { marine: 15, sniper: 24, rocket: 16, raider: 17, tank: 22, artillery: 28, gunship: 13, turret: 22, flak: 20, engineer: 11, harvester: 12 };
const FX_CAP = 450;

// "base under attack" alerts: pulsing minimap pings + a throttled alarm
// end-of-match scoreboard for the player
let stats = { built: 0, lost: 0, kills: 0, mined: 0 };

let alerts = [];          // {x, y, t}
let lastAlert = -1e9;
let lastNoRefinery = -1e9;   // throttled 'nowhere to deliver' warning
function raiseAlert(x, y, msg) {
  alerts.push({ x, y, t: 0 });
  if (tick - lastAlert < 12 * 60) return;   // one alarm per 12s, pings always show
  lastAlert = tick;
  toast(msg);
  snd.alarm();
}

let shakeAmp = 0;
function addShake(x, y, amp) {
  if (!isVisibleAt(x, y)) return;
  if (x < cam.x - 100 || x > cam.x + view.w + 100 || y < cam.y - 100 || y > cam.y + view.h + 100) return;
  // normal cap is 14; a single huge event (HQ collapse) may exceed it up to its own amp
  shakeAmp = Math.min(Math.max(14, amp), shakeAmp + amp);
}

function fxSprite(o) {
  if (fxs.length > FX_CAP) return;
  // Was Object.assign onto a fresh literal: two allocations per effect, and
  // this is the hottest spawner in the game. Write the defaults onto the
  // caller's own object instead — one allocation, at the call site.
  o.kind = 'sprite'; o.t = 0;
  if (o.delay === undefined) o.delay = 0;
  if (o.vx === undefined) o.vx = 0;
  if (o.vy === undefined) o.vy = 0;
  if (o.rot === undefined) o.rot = Math.random() * Math.PI * 2;
  if (o.rotV === undefined) o.rotV = 0;
  if (o.a0 === undefined) o.a0 = 1;
  if (o.a1 === undefined) o.a1 = 0;
  if (o.add === undefined) o.add = false;
  fxs.push(o);
}
function fxExplosion(x, y, size, big) {
  addShake(x, y, big ? 9 : Math.min(6, size * 0.3));
  if (!spritesReady) return;
  // a struggling GPU gets half the pyrotechnics — invisible in the chaos
  const nf = Math.max(1, Math.round((big ? 4 : 2) * perf.fxLevel));
  for (let i = 0; i < nf; i++) {
    const off = i ? size * 1.1 : 0;
    fxSprite({
      img: pick(SPR.explosion),
      x: x + (Math.random() - 0.5) * off, y: y + (Math.random() - 0.5) * off,
      s0: size * 0.9, s1: size * (big ? 3.2 : 2.4),
      max: (big ? 30 : 20) + i * 4, delay: i * 4,
      rotV: (Math.random() - 0.5) * 0.05, add: true,
    });
  }
  const ns = Math.max(1, Math.round((big ? 6 : 3) * perf.fxLevel));
  for (let i = 0; i < ns; i++) {
    fxSprite({
      img: pick(SPR.smoke),
      x: x + (Math.random() - 0.5) * size, y: y + (Math.random() - 0.5) * size,
      vx: (Math.random() - 0.5) * 0.5, vy: -0.25 - Math.random() * 0.4,
      s0: size * 0.8, s1: size * (big ? 2.6 : 2), a0: 0.55,
      max: (big ? 90 : 55) + Math.random() * 20, delay: 6 + i * (big ? 6 : 4),
      rotV: (Math.random() - 0.5) * 0.02,
    });
  }
}
function fxDamageSmoke(x, y, size) {
  if (!spritesReady) return;
  fxSprite({
    img: pick(SPR.smoke), x, y: y - size * 0.3,
    vx: (Math.random() - 0.5) * 0.3, vy: -0.35 - Math.random() * 0.25,
    s0: size * 0.7, s1: size * 2, a0: 0.6,
    max: 70 + Math.random() * 30, rotV: (Math.random() - 0.5) * 0.015,
  });
}
// open flame for badly damaged things — flickers bright then dies fast
function fxDamageFire(x, y, size) {
  if (!spritesReady) return;
  fxSprite({
    img: pick(SPR.explosion), x, y,
    vy: -0.15, s0: size * 0.6, s1: size,
    a0: 0.9, max: 14 + Math.random() * 8,
    rotV: (Math.random() - 0.5) * 0.06, add: true,
  });
}
function fxMinePuff(c, u) {
  if (!spritesReady) return;
  const a = Math.atan2(u.y - c.y, u.x - c.x);
  fxSprite({
    img: pick(SPR.puff),
    x: c.x + Math.cos(a) * (c.r + 2), y: c.y + Math.sin(a) * (c.r + 2),
    vx: Math.cos(a) * 0.3, vy: Math.sin(a) * 0.3 - 0.15,
    s0: 6, s1: 16, a0: 0.4, max: 26,
  });
}
function fxMuzzle(src, kind) {
  if (!spritesReady || fxs.length > FX_CAP) return;
  const len = MUZZLE_LEN[src.type] || 16;
  const tipX = src.x + Math.cos(src.faceA) * len, tipY = src.y + Math.sin(src.faceA) * len;
  fxs.push({
    kind: 'muzzle', img: kind === 'shell' ? SPR.shotLarge : SPR.shotThin,
    x: tipX, y: tipY, a: src.faceA,
    s: kind === 'shell' ? 30 : kind === 'snipe' ? 22 : 14,
    t: 0, max: kind === 'shell' ? 7 : 5,
  });
  if (kind === 'shell') {
    fxSprite({
      img: pick(SPR.puff),
      x: tipX + Math.cos(src.faceA) * 6, y: tipY + Math.sin(src.faceA) * 6,
      vx: Math.cos(src.faceA) * 0.6, vy: Math.sin(src.faceA) * 0.6,
      s0: 8, s1: 22, a0: 0.5, max: 30,
    });
    addShake(src.x, src.y, 1.5);
  }
}

function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------------- Fog of war ----------------
// One cell per map tile. `explored` is permanent; `visible` is what your
// units/buildings can currently see (recomputed every few ticks).
const fogW = MAP_W, fogH = MAP_H;
const explored = new Uint8Array(fogW * fogH);
const visible = new Uint8Array(fogW * fogH);
const fogCv = document.createElement('canvas');
fogCv.width = fogW; fogCv.height = fogH;
const fogCx = fogCv.getContext('2d');
const fogImg = fogCx.createImageData(fogW, fogH);

function fogCell(wx, wy) {
  const gx = Math.max(0, Math.min(fogW - 1, Math.floor(wx / TILE)));
  const gy = Math.max(0, Math.min(fogH - 1, Math.floor(wy / TILE)));
  return gy * fogW + gx;
}
const isVisibleAt = (wx, wy) => visible[fogCell(wx, wy)] === 1;
const isExploredAt = (wx, wy) => explored[fogCell(wx, wy)] === 1;
// what the player can currently make out on screen (depends on the fog-memory toggle)
const isShownAt = (wx, wy) => {
  const i = fogCell(wx, wy);
  return visible[i] === 1 || (fogMemory && explored[i] === 1);
};

// ---------------- Elevation (vision high ground) ----------------
// Plateaus are authored per map (MAPS.plateaus): raised discs whose rims grow
// a chain of cliff slabs (impassable — ramps are the only ground route up) and
// whose tiles sit at elev 1. Rules: low ground never REVEALS high tiles, and
// nothing AUTO-acquires a target standing above it. Explicit orders and
// retaliation still pierce; flyers ignore elevation entirely.
const elev = new Uint8Array(MAP_W * MAP_H);
const elevAt = (wx, wy) => elev[fogCell(wx, wy)];

function stampVision(x, y, r, fly) {
  const cx0 = Math.floor(x / TILE), cy0 = Math.floor(y / TILE);
  const cr = Math.ceil(r / TILE), r2 = r * r;
  const ve = fly ? 9 : elev[fogCell(x, y)];   // flyers see over cliffs
  for (let gy = Math.max(0, cy0 - cr); gy <= Math.min(fogH - 1, cy0 + cr); gy++) {
    for (let gx = Math.max(0, cx0 - cr); gx <= Math.min(fogW - 1, cx0 + cr); gx++) {
      const dx = (gx + 0.5) * TILE - x, dy = (gy + 0.5) * TILE - y;
      if (dx * dx + dy * dy <= r2) {
        const i = gy * fogW + gx;
        if (elev[i] > ve) continue;   // the cliff top stays dark from below
        visible[i] = 1; explored[i] = 1;
      }
    }
  }
}
let devReveal = false;   // dev mode: the whole map, no fog — for judging layouts
let devMode = false;     // cheat mode: free tech + bottomless crystals (Space x5 over the ? chip)
let dinoRage = 0;        // every murdered grazer makes the planet's dinos angrier (wider aggro, faster respawns)
const dinoAggro = () => Math.min(dinoRage * 25, 150);
let wildSeen = false;    // has the player laid eyes on any wildlife yet? Roamers stay clear of camp until then
// nearest standing player building within r — shared by the shy-wildlife logic
function nearestPlayerBld(x, y, r) {
  let best = null, bd = r * r;
  for (const b of buildings) {
    if (b.team !== 1 || b.hp <= 0) continue;
    const d2b = dist2(x, y, b.x, b.y);
    if (d2b < bd) { bd = d2b; best = b; }
  }
  return best;
}
function updateFog() {
  if (devReveal) {
    visible.fill(1); explored.fill(1);
    const d = fogImg.data;
    for (let i = 0; i < visible.length; i++) d[i * 4 + 3] = 0;
    fogCx.putImageData(fogImg, 0, 0);
    return;
  }
  visible.fill(0);
  for (const u of units) if (u.team === 1) stampVision(u.x, u.y, UNIT[u.type].sight, u.fly);
  for (const b of buildings) if (b.team === 1) stampVision(b.x, b.y, BLD[b.type].sight);
  const d = fogImg.data;
  for (let i = 0; i < visible.length; i++) {
    d[i * 4 + 3] = visible[i] ? 0 : (fogMemory && explored[i]) ? 150 : 255;   // rgb stays black
  }
  fogCx.putImageData(fogImg, 0, 0);
}

// ---------------- Audio ----------------
let actx = null;
let lastShotSound = 0;
function audioInit() {
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { /* no audio */ } }
  if (actx && actx.state === 'suspended') actx.resume();
}
function beep(freq, dur, type, vol, slideTo) {
  if (muted || !actx) return;
  try {
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, actx.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), actx.currentTime + dur);
    g.gain.setValueAtTime(vol || 0.04, actx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
    o.connect(g); g.connect(actx.destination);
    o.start(); o.stop(actx.currentTime + dur);
  } catch (e) { /* ignore */ }
}
// Sample sfx (optional, like the OPT sprite slots): drop assets/sfx/<name>.wav|ogg|mp3 and it
// plays instead of the procedural beep. Each file independent; missing file = beep fallback.
const SFX_NAMES = ['shot', 'shell', 'thump', 'spit', 'rocket', 'launch', 'snipe', 'boom',
                   'deposit', 'repair', 'ready', 'error', 'alarm', 'select',
                   'bite', 'screech', 'collapse', 'nuke'];
const SFX_EXTS = ['wav', 'ogg', 'mp3'];
const SFX_VOL = { shot: 0.16, shell: 0.3, thump: 0.35, spit: 0.2, rocket: 0.25, snipe: 0.2,
                  launch: 0.6, boom: 0.45, deposit: 0.2, repair: 0.15, ready: 0.3,
                  error: 0.3, alarm: 0.4, select: 0.12,
                  bite: 0.25, screech: 0.3, collapse: 0.5, nuke: 0.7 };
const SFX_POOL = 4;   // simultaneous overlapping plays per sound
const sfx = {};       // name -> { pool: [HTMLAudio...], i }
(function loadSfx() {
  for (const name of SFX_NAMES) tryExt(name, 0);
  function tryExt(name, i) {
    if (i >= SFX_EXTS.length) return;
    const el = new Audio();
    el.preload = 'auto';
    el.oncanplaythrough = () => {
      if (sfx[name]) return;
      const pool = [el];
      for (let k = 1; k < SFX_POOL; k++) pool.push(el.cloneNode());
      sfx[name] = { pool, i: 0 };
    };
    el.onerror = () => tryExt(name, i + 1);
    el.src = 'assets/sfx/' + name + '.' + SFX_EXTS[i];
  }
})();
// Per-sound and global rate limits. Every play() is a main-thread trip through
// Safari's media stack, invisible to the sim/draw timers — a battle spamming
// booms and screeches can stall the frame pipeline while both timers read
// idle. Two plays per tick, minimum spacing per sound: denser than that is
// audio mush anyway.
const SFX_MIN_GAP = { boom: 5, screech: 7, bite: 5, collapse: 8, alert: 10 };
const sfxBudget = { tick: -1, n: 0 };
function playSfx(name) {
  const s = sfx[name];
  if (!s) return false;   // no sample loaded — caller falls back to beep
  if (muted) return true;
  if (s.lastAt !== undefined && tick - s.lastAt < (SFX_MIN_GAP[name] || 2)) return true;   // swallowed, no beep
  if (sfxBudget.tick === tick) { if (sfxBudget.n >= 2) return true; }
  else { sfxBudget.tick = tick; sfxBudget.n = 0; }
  sfxBudget.n++; s.lastAt = tick;
  const el = s.pool[s.i = (s.i + 1) % s.pool.length];
  el.volume = SFX_VOL[name] !== undefined ? SFX_VOL[name] : 0.3;
  try { el.currentTime = 0; el.play().catch(() => { /* pre-gesture autoplay block */ }); } catch (e) { /* ignore */ }
  return true;
}
const snd = {
  shot()    { if (tick - lastShotSound < 4) return; lastShotSound = tick; if (!playSfx('shot')) beep(880, 0.05, 'square', 0.018); },
  shell()   { if (tick - lastShotSound < 4) return; lastShotSound = tick; if (!playSfx('shell')) beep(170, 0.16, 'sawtooth', 0.05, 60); },
  thump()   { if (tick - lastShotSound < 4) return; lastShotSound = tick; if (!playSfx('thump')) beep(90, 0.24, 'sawtooth', 0.07, 30); },
  spit()    { if (tick - lastShotSound < 4) return; lastShotSound = tick; if (!playSfx('spit')) beep(340, 0.09, 'triangle', 0.035, 120); },
  rocket()  { if (tick - lastShotSound < 4) return; lastShotSound = tick; if (!playSfx('rocket')) beep(420, 0.18, 'sawtooth', 0.04, 90); },
  launch()  { if (playSfx('launch')) return; beep(60, 0.9, 'sawtooth', 0.09, 400); setTimeout(() => beep(52, 0.9, 'sawtooth', 0.08, 300), 350); },
  snipe()   { if (tick - lastShotSound < 4) return; lastShotSound = tick; if (!playSfx('snipe')) beep(1600, 0.09, 'square', 0.03, 220); },
  boom()    { if (!playSfx('boom')) beep(95, 0.32, 'sawtooth', 0.07, 28); },
  deposit() { if (!playSfx('deposit')) beep(1240, 0.07, 'sine', 0.035); },
  repair()  { if (!playSfx('repair')) beep(760, 0.05, 'triangle', 0.03, 980); },
  ready()   { if (playSfx('ready')) return; beep(620, 0.07, 'sine', 0.045); setTimeout(() => beep(880, 0.09, 'sine', 0.045), 80); },
  error()   { if (!playSfx('error')) beep(170, 0.11, 'square', 0.045); },
  alarm()   { if (playSfx('alarm')) return; beep(520, 0.14, 'square', 0.06, 320); setTimeout(() => beep(520, 0.14, 'square', 0.06, 320), 200); },
  select()  { if (!playSfx('select')) beep(540, 0.035, 'sine', 0.02); },
  // raptor claws: sample or a short snap
  bite()    { if (!playSfx('bite')) beep(220, 0.06, 'square', 0.03, 90); },
  // dino death cry: organic, no explosion — dinos are meat, not machines
  screech() { if (!playSfx('screech')) beep(680, 0.12, 'sawtooth', 0.045, 1400); },
  // building death: rubble if we have it, else the plain boom
  collapse() { if (!playSfx('collapse')) this.boom(); },
  // the big one — sample, else the old triple boom
  nuke()    { if (playSfx('nuke')) return; this.boom(); setTimeout(() => this.boom(), 160); setTimeout(() => this.boom(), 340); },
};

// ---------------- Factories ----------------
function makeUnit(type, team, x, y) {
  const d = UNIT[type];
  const u = {
    id: nextId++, kind: 'unit', type, team,
    x, y, r: d.r, hp: d.hp, maxHp: d.hp,
    speed: d.speed, dmg: d.dmg, range: d.range, cooldown: d.cooldown,
    cool: 0, faceA: team === 1 ? -Math.PI / 4 : Math.PI * 0.75,
    carry: 0, mineT: 0, lastCrystal: null,
    kills: 0, eggCarry: false, fly: !!d.fly, stuckT: 0, ghostT: 0,
    capT: 0, captive: false,
    cargo: d.cargo ? [] : null, armed: !!d.bomb,
    walkT: 0, moving: false, recoil: 0,
    order: { type: 'idle' },
  };
  units.push(u);
  return u;
}
function makeBuilding(type, team, x, y, constructing) {
  const d = BLD[type];
  const b = {
    id: nextId++, kind: 'building', type, team,
    x, y, w: d.w, h: d.h, r: Math.max(d.w, d.h) / 2,
    hp: constructing ? 60 : d.hp, maxHp: d.hp,
    dmg: d.dmg || 0, range: d.range || 0, cooldown: d.cooldown || 0, cool: 0, faceA: 0,
    queue: [], prog: 0, boost: 1,   // boost 2 = rush-paid double production speed (current item only)
    warhead: null,                  // silos only: 'tac' | 'hq' when armed
    sunk: false,                    // depots/plants only: lowered flush with the ground, units drive over
    built: constructing ? 0 : 1,
    rally: null,
  };
  if (d.trains) {
    const dir = team === 1 ? -1 : 1;
    b.rally = { x: clamp(x + 120 * -dir, 40, W - 40), y: clamp(y + 90 * dir, 40, H - 40) };
  }
  buildings.push(b);
  return b;
}
function makeCrystal(x, y, amount) {
  const c = { id: nextId++, kind: 'crystal', x, y, r: 13, amount, maxAmount: amount };
  crystals.push(c);
  return c;
}
function makeEgg(x, y) {
  const e = { id: nextId++, kind: 'egg', x: clamp(x, 20, W - 20), y: clamp(y, 20, H - 20), r: 8 };
  eggs.push(e);
  return e;
}

// ---------------- Dino nests ----------------
function spawnSpitter(nest) {
  const a = Math.random() * Math.PI * 2;
  const u = makeUnit('spitter', 3,
    clamp(nest.x + Math.cos(a) * (nest.r + 18), 20, W - 20),
    clamp(nest.y + Math.sin(a) * (nest.r + 18), 20, H - 20));
  u.home = nest.id;
  u.order = { type: 'guard', hx: nest.x, hy: nest.y };
  return u;
}
function makeNest(x, y) {
  const b = makeBuilding('nest', 3, x, y);
  for (let i = 0; i < NEST_BROOD; i++) spawnSpitter(b);
  return b;
}
// ---------------- Raptor dens ----------------
function spawnRaptor(den) {
  const a = Math.random() * Math.PI * 2;
  const u = makeUnit('raptor', 3,
    clamp(den.x + Math.cos(a) * (den.r + 18), 20, W - 20),
    clamp(den.y + Math.sin(a) * (den.r + 18), 20, H - 20));
  u.home = den.id;
  u.order = { type: 'guard', hx: den.x, hy: den.y };
  return u;
}
function makeDen(x, y) {
  const b = makeBuilding('den', 3, x, y);
  b.packT = 0;
  const burst = DEN_BIRTH_MIN + Math.floor(Math.random() * (DEN_BIRTH_MAX - DEN_BIRTH_MIN + 1));
  for (let i = 0; i < burst; i++) spawnRaptor(b);
  // A den tearing open mid-match is the scariest beat in the game and it was
  // being missed entirely (playtest 2026-07-26: "I never saw one, at all").
  // Swing the camera onto it — but only if the player can actually see the
  // spot, so this never pans to blank shroud or leaks an unscouted den.
  if (started && tick > 0) {
    toast('⚠ A raptor den has torn open!');
    snd.alarm();
    if (isShownAt(x, y)) focusCam(x, y);
  }
  return b;
}

// ---------------- Map setup ----------------
function addPatch(px, py, n, amount) {
  const made = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.4;
    const rad = i === 0 ? 0 : 26 + (i % 3) * 16;
    made.push(makeCrystal(px + Math.cos(a) * rad, py + Math.sin(a) * rad, amount));
  }
  return made;
}

// ---------------- Terrain pathfinding ----------------
// Rocks are static, so they live in a tile grid. Movement uses straight-line
// walking when line-of-sight is clear (the common case) and a cached A* path
// around ridges when it isn't. Buildings stay dynamic (wall-slide handles them).
const blocked = new Uint8Array(MAP_W * MAP_H);
// grid values: 0 free · 1 blocked for everyone · 2 = dam walkway (water a
// standing Hydro Dam spans) — infantry and dinos cross, vehicles don't
// (Bronson 2026-07-25). `foot` threads through the whole pathing stack.
// a river segment as an ORGANIC path: meandering centerline (two sine
// octaves, deterministic from the segment coords) with width that swells and
// narrows along the run. Straight constant-width bands read as a racetrack
// (playtest 2026-07-26). Colliders, ground paint, and the water animation all
// share these exact points.
function riverPath([x1, y1, x2, y2, r]) {
  const dxn0 = x2 - x1, dyn0 = y2 - y1;
  const L = Math.hypot(dxn0, dyn0);
  const dxn = dxn0 / L, dyn = dyn0 / L, nx = -dyn, ny = dxn;
  const seed = (x1 * 0.37 + y1 * 0.73 + x2 * 0.11) % 6.283;
  const pts = [];
  for (let d = 0; d <= L; d += 30) {
    // meander eases to zero at the ends so causeway mouths stay put
    const ease = Math.min(1, d / 140, (L - d) / 140);
    const sway = (Math.sin(d * 0.011 + seed) * 0.55 + Math.sin(d * 0.0042 + seed * 2.7) * 0.45) * r * 0.5 * ease;
    // mouths flare outward (delta-style) so causeway gaps pinch hourglass
    const flare = 1 + 0.38 * (1 - Math.min(1, d / 130, (L - d) / 130));
    const width = r * flare * (0.82 + 0.22 * Math.sin(d * 0.016 + seed * 1.7) + 0.16 * Math.sin(d * 0.0061 - seed));
    pts.push({ x: x1 + dxn * d + nx * sway, y: y1 + dyn * d + ny * sway, r: width, d });
  }
  return pts;
}
const gridPass = (v, foot) => !v || (foot && v === 2);
function buildTerrainGrid() {
  blocked.fill(0);
  const stamp = (rk, val) => {
    const x0 = Math.max(0, Math.floor((rk.x - rk.r - 12) / TILE));
    const x1 = Math.min(MAP_W - 1, Math.floor((rk.x + rk.r + 12) / TILE));
    const y0 = Math.max(0, Math.floor((rk.y - rk.r - 12) / TILE));
    const y1 = Math.min(MAP_H - 1, Math.floor((rk.y + rk.r + 12) / TILE));
    for (let gy = y0; gy <= y1; gy++) for (let gx = x0; gx <= x1; gx++) {
      if (dist2(gx * TILE + 16, gy * TILE + 16, rk.x, rk.y) < (rk.r + 22) ** 2) {
        if (val === 1) blocked[gy * MAP_W + gx] = 1;
        else if (!blocked[gy * MAP_W + gx]) blocked[gy * MAP_W + gx] = 2;
      }
    }
  };
  for (const rk of rocks) stamp(rk, 1);
  stampWalkways();
}
// A dam's walkway is ONE FILE WIDE (Bronson 2026-07-26): a single plank of
// tiles along the dam's crossing axis, NOT the whole 115px bridged zone. The
// bridged zone is where foot units may physically stand (separation lets them
// in); the plank is the only part that is dry. Step off it and you drown.
const WALK_HALF_L = 155;   // half-length: mid-channel to both banks
const WALK_HALF_W = 22;    // half-width for the drown test — generous vs the
                           // ~32px tile plank so walking the plank never kills
function stampWalkways() {
  for (const b of buildings) {
    if (b.type !== 'hydro' || b.built < 1 || b.hp <= 0) continue;
    const ca = Math.cos(b.a || 0), sa = Math.sin(b.a || 0);
    const near = rocks.filter(rk => rk.water && dist2(rk.x, rk.y, b.x, b.y) < 300 * 300);
    const isWater = (gx, gy) => near.some(rk =>
      dist2(gx * TILE + 16, gy * TILE + 16, rk.x, rk.y) < (rk.r + 22) ** 2);
    const plank = (gx, gy) => {
      if (gx < 0 || gy < 0 || gx >= MAP_W || gy >= MAP_H) return;
      if (blocked[gy * MAP_W + gx] === 1 && isWater(gx, gy)) blocked[gy * MAP_W + gx] = 2;
    };
    let px = -1, py = -1;
    for (let d = -WALK_HALF_L; d <= WALK_HALF_L; d += 6) {
      const gx = Math.floor((b.x + ca * d) / TILE), gy = Math.floor((b.y + sa * d) / TILE);
      // a diagonal step needs its orthogonal filler or findPath (no corner
      // cutting) treats the plank as a chain of unreachable islands
      if (px >= 0 && gx !== px && gy !== py) plank(gx, py);
      plank(gx, gy);
      px = gx; py = gy;
    }
  }
}
// a wander/flee target the unit can actually stand on, pulling in toward the
// start until one lands on open ground (shorelines used to swallow roamers)
function walkableSpot(x, y, a, reach, foot) {
  for (let i = 0; i < 10; i++) {
    const r = reach * (1 - i * 0.09);
    const px = clamp(x + Math.cos(a) * r, 30, W - 30);
    const py = clamp(y + Math.sin(a) * r, 30, H - 30);
    const gx = Math.floor(px / TILE), gy = Math.floor(py / TILE);
    if (gridPass(blocked[gy * MAP_W + gx], foot)) return [px, py];
  }
  return null;
}
// the dam plank, as geometry: which dam a point is standing on, and where
function plankAt(x, y) {
  for (const b of buildings) {
    if (b.type !== 'hydro' || b.built < 1 || b.hp <= 0) continue;
    const ca = Math.cos(b.a || 0), sa = Math.sin(b.a || 0);
    const dx = x - b.x, dy = y - b.y;
    const along = dx * ca + dy * sa, perp = -dx * sa + dy * ca;
    if (Math.abs(along) <= WALK_HALF_L && Math.abs(perp) <= WALK_HALF_W) return { b, ca, sa, along, perp };
  }
  return null;
}
const walkAxisAt = (x, y) => { const p = plankAt(x, y); return p ? [p.ca, p.sa] : null; };
// a dam finished or died: re-flag its stretch of water, rebuild the grid
function refreshBridges() {
  for (const rk of rocks) delete rk.bridged;
  for (const b of buildings) {
    if (b.type !== 'hydro' || b.built < 1 || b.hp <= 0) continue;
    for (const rk of rocks) {
      if (rk.water && dist2(rk.x, rk.y, b.x, b.y) < 115 * 115) rk.bridged = true;
    }
  }
  buildTerrainGrid();
}
function losClear(x0, y0, x1, y1, foot) {
  const steps = Math.ceil(dist(x0, y0, x1, y1) / 16);
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const gx = Math.floor((x0 + (x1 - x0) * t) / TILE), gy = Math.floor((y0 + (y1 - y0) * t) / TILE);
    if (!gridPass(blocked[gy * MAP_W + gx], foot)) return false;
  }
  return true;
}
function nearestFreeTile(gx, gy, foot) {
  if (gridPass(blocked[gy * MAP_W + gx], foot)) return [gx, gy];
  for (let r = 1; r < 14; r++) {
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
      const nx = gx + dx, ny = gy + dy;
      if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue;
      if (gridPass(blocked[ny * MAP_W + nx], foot)) return [nx, ny];
    }
  }
  return null;
}
function findPath(x0, y0, x1, y1, foot) {
  const start = nearestFreeTile(Math.floor(x0 / TILE), Math.floor(y0 / TILE), foot);
  const goal = nearestFreeTile(Math.floor(x1 / TILE), Math.floor(y1 / TILE), foot);
  if (!start || !goal) return null;
  const [sx, sy] = start, [gx, gy] = goal;
  const sIdx = sy * MAP_W + sx, gIdx = gy * MAP_W + gx;
  if (sIdx === gIdx) return [{ x: x1, y: y1 }];
  const g = new Float32Array(MAP_W * MAP_H).fill(Infinity);
  const from = new Int32Array(MAP_W * MAP_H).fill(-1);
  const heap = [], hIdx = [];   // parallel arrays: fscore, node
  const push = (f, n) => {
    let i = heap.length; heap.push(f); hIdx.push(n);
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]]; [hIdx[p], hIdx[i]] = [hIdx[i], hIdx[p]];
      i = p;
    }
  };
  const pop = () => {
    const n = hIdx[0], last = heap.length - 1;
    heap[0] = heap[last]; hIdx[0] = hIdx[last];
    heap.pop(); hIdx.pop();
    let i = 0;
    while (true) {
      const l = i * 2 + 1, r = l + 1;
      let s = i;
      if (l < heap.length && heap[l] < heap[s]) s = l;
      if (r < heap.length && heap[r] < heap[s]) s = r;
      if (s === i) break;
      [heap[s], heap[i]] = [heap[i], heap[s]]; [hIdx[s], hIdx[i]] = [hIdx[i], hIdx[s]];
      i = s;
    }
    return n;
  };
  const hFn = (n) => {
    const nx = n % MAP_W, ny = (n / MAP_W) | 0;
    return Math.hypot(nx - gx, ny - gy);
  };
  g[sIdx] = 0;
  push(hFn(sIdx), sIdx);
  // closed set: without it, re-pushed nodes burned the iteration guard and
  // long cross-map searches came back null — units then walked straight at
  // cliff rims forever (found on The Silo Fields' corner diagonals, 2026-07-25)
  const closed = new Uint8Array(MAP_W * MAP_H);
  let found = false, guard = 0;
  while (heap.length && guard++ < 40000) {
    const cur = pop();
    if (closed[cur]) continue;
    closed[cur] = 1;
    if (cur === gIdx) { found = true; break; }
    const cx0 = cur % MAP_W, cy0 = (cur / MAP_W) | 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = cx0 + dx, ny = cy0 + dy;
      if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) continue;
      const n = ny * MAP_W + nx;
      if (!gridPass(blocked[n], foot)) continue;
      if (dx && dy && (!gridPass(blocked[cy0 * MAP_W + nx], foot) || !gridPass(blocked[ny * MAP_W + cx0], foot))) continue;   // no corner cutting
      const cost = g[cur] + (dx && dy ? 1.414 : 1);
      if (cost < g[n]) { g[n] = cost; from[n] = cur; push(cost + hFn(n), n); }
    }
  }
  if (!found) return null;
  // reconstruct, then smooth with line-of-sight so units cut natural corners
  const tiles = [];
  for (let n = gIdx; n !== -1; n = from[n]) tiles.push(n);
  tiles.reverse();
  const pts = tiles.map(n => ({ x: (n % MAP_W) * TILE + 16, y: ((n / MAP_W) | 0) * TILE + 16 }));
  pts.push({ x: x1, y: y1 });
  const out = [];
  let anchor = { x: x0, y: y0 }, i = 0;
  while (i < pts.length - 1) {
    let j = pts.length - 1;
    while (j > i && !losClear(anchor.x, anchor.y, pts[j].x, pts[j].y, foot)) j--;
    if (j === i) j = i + 1;   // can't skip — take the next step anyway
    out.push(pts[j]);
    anchor = pts[j];
    i = j;
  }
  return out;
}

// place one team's base from a map spec; returns its HQ
function placeBase(team, M) {
  const p = team === 1;
  const bare = p && mission && mission.bare;   // tutorial missions start with just the HQ + harvesters
  const hq = makeBuilding('hq', team, ...(p ? M.pHQ : M.eHQ));
  if (!bare) makeBuilding('barracks', team, ...(p ? M.pRax : M.eRax));
  if (!p) {
    makeBuilding('factory', 2, ...M.eFac);
    makeBuilding('airpad', 2, ...M.eAir);
    for (const s of M.eSup) makeBuilding('supply', 2, ...s);
    for (const t of M.eTur) makeBuilding('turret', 2, ...t);
  }
  const patch = addPatch(...(p ? M.pPatch : M.ePatch), 7, 1700);
  if (!p) {
    // one starting plant keeps the enemy base on the grid (HQ 8 + plant 10 ≥ its 14
    // draw). Placed AFTER the home patch exists so aiSpotFree can dodge the crystals.
    for (let i = 0; i < 24; i++) {
      const a = Math.random() * Math.PI * 2, r = 120 + Math.random() * 160;
      const x = clamp(hq.x + Math.cos(a) * r, 60, W - 60);
      const y = clamp(hq.y + Math.sin(a) * r, 60, H - 60);
      if (aiSpotFree('power', x, y)) { makeBuilding('power', 2, x, y); break; }
    }
  }
  // starting refinery: crystals only deliver here now, so every base opens with
  // one — dropped along the HQ->patch line (bare tutorial starts included)
  const mx = hq.x + (patch[0].x - hq.x) * 0.55, my = hq.y + (patch[0].y - hq.y) * 0.55;
  for (let i = 0; i < 40; i++) {
    const a = Math.random() * Math.PI * 2, r = i === 0 ? 0 : 60 + Math.random() * 130;
    const x = clamp(mx + Math.cos(a) * r, 60, W - 60);
    const y = clamp(my + Math.sin(a) * r, 60, H - 60);
    if (aiSpotFree('refinery', x, y)) { makeBuilding('refinery', team, x, y); break; }
  }
  hq.rally = { x: patch[0].x, y: patch[0].y };               // fresh harvesters auto-mine
  for (let i = 0; i < 3; i++) {
    // string the starting harvesters out along the HQ→patch line
    const t = 0.5 + i * 0.12;
    const u = makeUnit('harvester', team,
      hq.x + (patch[0].x - hq.x) * t, hq.y + (patch[0].y - hq.y) * t);
    u.order = { type: 'harvest', target: patch[i % patch.length] };
  }
  // two starter marines, posted toward the middle of the map
  if (!bare) {
    const a = Math.atan2(H / 2 - hq.y, W / 2 - hq.x);
    makeUnit('marine', team, hq.x + Math.cos(a) * 135, hq.y + Math.sin(a) * 135);
    makeUnit('marine', team, hq.x + Math.cos(a) * 165 + 22, hq.y + Math.sin(a) * 165 - 20);
  }
  return hq;
}

function setup(mapKey) {
  const M = MAPS[mapKey] || MAPS.basin;
  // terrain first, so the ground pre-render includes it
  for (const rg of (M.ridges || [])) {
    const [x1, y1, x2, y2, r] = rg;
    const n = Math.max(1, Math.round(dist(x1, y1, x2, y2) / (r * 1.1)));
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      rocks.push({ x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t, r: r * (0.85 + Math.random() * 0.3) });
    }
  }
  for (const [bx, by, br] of (M.boulders || [])) rocks.push({ x: bx, y: by, r: br });
  // water channels (2026-07-25, Blackwater Fen onward): chained circle
  // colliders on the ridge machinery — ground units can't cross, flyers
  // ignore rocks so they soar straight over. Gaps between river segments are
  // the causeways. Painted as smooth bands in paintGround; the individual
  // colliders are invisible (paintRock skips water).
  for (const seg of (M.rivers || [])) {
    for (const p of riverPath(seg)) rocks.push({ x: p.x, y: p.y, r: p.r * 0.95, water: true });
  }
  // trees: solid canopies riding the rock machinery — collision, pathing,
  // placement all come free. Groves scatter a stand inside a disc (min 70px
  // spacing keeps infantry seams); singles are lone landmarks. Ghosting units
  // still slip them (not cliffs). dead flag = bare-snag render (ash maps).
  const deadWood = !!(M.flora && M.flora.dead);
  for (const [gx, gy, gr, gn] of (M.groves || [])) {
    for (let i = 0, guard = 0; i < gn && guard < 60; guard++) {
      const a = Math.random() * Math.PI * 2, d = Math.random() * gr;
      const x = gx + Math.cos(a) * d, y = gy + Math.sin(a) * d;
      if (rocks.some(rk => rk.tree && dist2(x, y, rk.x, rk.y) < 70 * 70)) continue;
      rocks.push({ x, y, r: 14 + Math.random() * 5, tree: true, dead: deadWood });
      i++;
    }
  }
  for (const [tx, ty] of (M.trees || [])) {
    rocks.push({ x: tx, y: ty, r: 15 + Math.random() * 4, tree: true, dead: deadWood });
  }
  // obstacle variety beyond rock walls (playtest 2026-07-24): crystalline
  // spires, buried ribcages, sinkholes — all rocks mechanically, distinct art
  for (const [sx, sy, sr] of (M.spires || [])) rocks.push({ x: sx, y: sy, r: sr, spire: true });
  for (const [bx, by, br, ba] of (M.bones || [])) rocks.push({ x: bx, y: by, r: br, bone: true, a: ba || 0 });
  for (const [px, py, pr] of (M.pits || [])) rocks.push({ x: px, y: py, r: pr, pit: true });
  // plateaus: raise the interior tiles, then grow the cliff rim as a chain of
  // slab rocks — ramps leave gaps, the only ground route up
  elev.fill(0);
  for (const pl of (M.plateaus || [])) {
    const inRamp = (x, y) => (pl.ramps || []).some(([rx, ry, rr]) => dist2(x, y, rx, ry) < rr * rr);
    for (let gy = 0; gy < MAP_H; gy++) for (let gx = 0; gx < MAP_W; gx++) {
      const wx = (gx + 0.5) * TILE, wy = (gy + 0.5) * TILE;
      if (pl.c.some(([px, py, pr]) => dist2(wx, wy, px, py) < pr * pr)) elev[gy * MAP_W + gx] = 1;
    }
    for (const [px, py, pr] of pl.c) {
      const n = Math.max(10, Math.round((Math.PI * 2 * pr) / 30));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const x = px + Math.cos(a) * pr, y = py + Math.sin(a) * pr;
        // interior seams (inside a sibling disc) and ramp mouths stay open
        if (pl.c.some(([ox, oy, orr]) => (ox !== px || oy !== py) && dist2(x, y, ox, oy) < (orr - 10) ** 2)) continue;
        if (inRamp(x, y)) continue;
        rocks.push({ x, y, r: 17, cliff: true, a });
      }
    }
  }
  buildTerrainGrid();
  groundM = M;
  paintGround(M);
  // commando missions field no base at all — just the squad the triggers drop
  const pHQ = (mission && mission.noBase) ? null : placeBase(1, M);
  if (!(mission && mission.noEnemy)) placeBase(2, M);

  // neutral fields + their nest guards — clear the nest or mine poor.
  // A mission can replace the map's fields wholesale (M1 spreads them out).
  for (const spec of ((mission && mission.fields) || M.patches)) {
    addPatch(spec.p[0], spec.p[1], spec.n, spec.a);
    for (const nx of (spec.nests || [])) makeNest(nx[0], nx[1]);
  }
  // missions can author extra fields (e.g. M2's survey-post patch)
  if (mission && mission.patches) {
    for (const [px, py, n, amt] of mission.patches) addPatch(px, py, n, amt);
  }

  // ambient wildlife (campaign only): grazer herds wandering the map. Props
  // with a conscience — kill one and dinoRage rises for the whole level.
  if (mission) {
    let placed = 0;
    for (let i = 0; i < 200 && placed < 8; i++) {
      const x = 60 + Math.random() * (W - 120), y = 60 + Math.random() * (H - 120);
      if (rocks.some(rk => dist2(x, y, rk.x, rk.y) < (rk.r + 40) ** 2)) continue;
      if (buildings.some(b => dist2(x, y, b.x, b.y) < 300 ** 2)) continue;
      if (crystals.some(c => dist2(x, y, c.x, c.y) < 120 ** 2)) continue;
      const u = makeUnit('critter', 3, x, y);
      u.roam = true;
      u.order = { type: 'roam' };
      placed++;
    }
  }

  // camera centered on the player base — or, with no base, the insertion point
  const home = pHQ || { x: (mission && mission.start) ? mission.start[0] : W / 2,
                        y: (mission && mission.start) ? mission.start[1] : H / 2 };
  cam.x = home.x - view.w / 2;
  cam.y = home.y - view.h / 2;
  clampCam();
  updateFog();
}

// ---------------- Queries ----------------
function supplyUsed(team) {
  let s = 0;
  for (const u of units) {
    if (u.team !== team) continue;
    s += UNIT[u.type].supply;
    if (u.cargo) for (const c of u.cargo) s += UNIT[c.type].supply;   // passengers count
  }
  return s;
}
function supplyMax(team) {
  let s = 0;
  for (const b of buildings) if (b.team === team && b.built >= 1) s += BLD[b.type].supply;
  return Math.min(SUPPLY_HARD_CAP, s);
}
// the power grid — only standing, living buildings count on either side of the meter
function powerMax(team) {
  let s = 0;
  for (const b of buildings) if (b.team === team && b.built >= 1 && b.hp > 0) s += BLD[b.type].gen || 0;
  return s;
}
function powerUsed(team) {
  let s = 0;
  for (const b of buildings) if (b.team === team && b.built >= 1 && b.hp > 0) s += BLD[b.type].pow || 0;
  return s;
}
const lowPower = (team) => powerUsed(team) > powerMax(team);
function nearestCrystalTo(x, y, maxDist) {
  let best = null, bd = (maxDist || 1e9) ** 2;
  for (const c of crystals) {
    if (c.amount <= 0) continue;
    const d = dist2(x, y, c.x, c.y);
    if (d < bd) { bd = d; best = c; }
  }
  return best;
}
// harvesters can deliver to the HQ or any refinery — refineries are how you expand
function nearestDropoff(team, x, y) {
  // crystals go through the refinery, period (2026-07-14 playtest) — the HQ is a
  // command post, not an ore chute. Eggs and captives still ride to the HQ lab.
  let best = null, bd = 1e18;
  for (const b of buildings) {
    if (b.team !== team || b.built < 1 || b.type !== 'refinery') continue;
    const d = dist2(x, y, b.x, b.y);
    if (d < bd) { bd = d; best = b; }
  }
  return best;
}
function nearestWoundedAlly(u, range, pred) {
  pred = pred || isFlesh;
  let best = null, bd = 1e18;
  for (const o of units) {
    if (o === u || o.team !== u.team || o.hp <= 0 || o.hp >= o.maxHp || !pred(o)) continue;
    const d = dist(u.x, u.y, o.x, o.y) - o.r;
    if (d <= range && d * d < bd) { bd = d * d; best = o; }
  }
  return best;
}
// is a live engineer of this building's team standing at the site?
function engineerNear(b) {
  for (const u of units) {
    if (u.hp <= 0 || u.type !== 'engineer' || u.team !== b.team) continue;
    if (dist(u.x, u.y, b.x, b.y) - b.r <= ENG_BUILD_RANGE) return u;
  }
  return null;
}
// a site of ours that is stalled (or will stall) for want of a crew
function nearestUnbuiltSite(team, x, y, range) {
  let best = null, bd = 1e18;
  for (const b of buildings) {
    if (b.team !== team || b.hp <= 0 || b.built >= 1 || !BLD[b.type].needsEngineer) continue;
    const d = dist(x, y, b.x, b.y) - b.r;
    if (d <= range && d * d < bd) { bd = d * d; best = b; }
  }
  return best;
}
function nearestDamagedBuilding(team, x, y, range) {
  let best = null, bd = 1e18;
  for (const b of buildings) {
    if (b.team !== team || b.built < 1 || b.hp >= b.maxHp) continue;
    const d = dist(x, y, b.x, b.y) - b.r;
    if (d <= range && d * d < bd) { bd = d * d; best = b; }
  }
  return best;
}
// can this unit/building shoot at flyers?
const canAA = (e) => e.kind === 'unit' ? !UNIT[e.type].noAA : true;   // only turrets fire among buildings, and they have AA
function nearestEnemyUnit(x, y, team, range, aa, airOnly, fromAir) {
  let best = null, bd = 1e18;
  const ve = fromAir ? 9 : elevAt(x, y);
  for (const u of units) {
    if (u.team === team) continue;
    if (u.type === 'critter') continue;                   // wildlife: never auto-targeted, by anyone
    if (u.invuln) continue;                               // unkillable set-piece — don't park the army on it
    if (airOnly && !UNIT[u.type].fly) continue;           // flak ignores the ground war
    if (aa === false && UNIT[u.type].fly) continue;       // gun can't elevate — skip flyers
    if (team === 1 && !isVisibleAt(u.x, u.y)) continue;   // player can't target into the fog
    if (!u.fly && elevAt(u.x, u.y) > ve) continue;        // can't spot up the cliff — no auto-fire uphill
    const d = dist(x, y, u.x, u.y) - u.r;
    if (d <= range && d * d < bd) { bd = d * d; best = u; }
  }
  return best;
}
function nearestEnemyBuilding(x, y, team, range, fromAir) {
  let best = null, bd = 1e18;
  const ve = fromAir ? 9 : elevAt(x, y);
  for (const b of buildings) {
    if (b.team === team) continue;
    if (b.invuln) continue;                               // unkillable set-piece — don't park the army on it
    if (team === 1 && !isVisibleAt(b.x, b.y)) continue;
    if (elevAt(b.x, b.y) > ve) continue;                  // cliff-top structures are safe from below
    const d = dist(x, y, b.x, b.y) - b.r;
    if (d <= range && d * d < bd) { bd = d * d; best = b; }
  }
  return best;
}
function acquireTarget(x, y, team, range, attacker) {
  const aa = attacker ? canAA(attacker) : true;
  const air = !!(attacker && attacker.fly);
  return nearestEnemyUnit(x, y, team, range, aa, false, air) || nearestEnemyBuilding(x, y, team, range, air);
}
function thingAtPoint(wx, wy) {
  for (const u of units) {
    if (u.team !== 1 && !isVisibleAt(u.x, u.y)) continue;   // hidden by fog
    if (dist2(wx, wy, u.x, u.y) <= (u.r + 4) ** 2) return u;
  }
  for (const b of buildings) {
    if (b.team !== 1 && !isShownAt(b.x, b.y)) continue;
    if (Math.abs(wx - b.x) <= b.w / 2 + 3 && Math.abs(wy - b.y) <= b.h / 2 + 3) return b;
  }
  for (const c of crystals) if (c.amount > 0 && dist2(wx, wy, c.x, c.y) <= (c.r + 8) ** 2) return c;
  for (const e of eggs) if (isShownAt(e.x, e.y) && dist2(wx, wy, e.x, e.y) <= (e.r + 8) ** 2) return e;
  return null;
}
function nearestEggTo(x, y, maxDist) {
  let best = null, bd = (maxDist || 1e9) ** 2;
  for (const e of eggs) {
    const d = dist2(x, y, e.x, e.y);
    if (d < bd) { bd = d; best = e; }
  }
  return best;
}

// APC doors: passengers pile out in a ring; dead APCs take everyone with them
function unloadAPC(apc) {
  if (!apc.cargo || !apc.cargo.length) return;
  let i = 0;
  for (const p of apc.cargo) {
    const spot = spreadPoint(apc.x, apc.y + apc.r + 14, i++);
    p.x = clamp(spot.x, 20, W - 20); p.y = clamp(spot.y, 20, H - 20);
    p.order = { type: 'idle' };
    units.push(p);
  }
  apc.cargo = [];
  if (apc.team === 1) { toast('APC unloaded'); beep(500, 0.07, 'triangle', 0.04); }
}

// ---------------- Orders ----------------
function spreadPoint(x, y, i) {
  if (i === 0) return { x, y };
  const a = i * 2.39996, rad = 22 * Math.sqrt(i);
  return { x: clamp(x + Math.cos(a) * rad, 20, W - 20), y: clamp(y + Math.sin(a) * rad, 20, H - 20) };
}
function commandMove(sel, wx, wy, attackMove) {
  let i = 0;
  for (const e of sel) {
    if (e.kind !== 'unit') continue;
    const p = spreadPoint(wx, wy, i++);
    // support takes the A-move as attackmove too — NOT for fighting, but
    // because that case's standoff branch is where the hold-behind lives.
    // Routing them to plain 'move' (the old behavior) sent them beelining the
    // destination THROUGH the firing line while the escorts stopped to shoot.
    e.order = { type: attackMove && (isCombat(e) || isSupport(e)) ? 'attackmove' : 'move', x: p.x, y: p.y };
  }
}
function commandAttack(sel, target) {
  for (const e of sel) {
    if (e.kind !== 'unit') continue;
    // unarmed units don't charge: a right-clicked enemy used to send medics
    // (dmg 0) sprinting into the line of fire ahead of the army (playtest
    // 2026-07-25). They keep their current order — a medic's idle auto-heal
    // follows the wounded into the fight at its own pace.
    if ((e.dmg <= 0 && !e.bomb) || isSupport(e)) continue;
    e.order = e.type === 'harrier'
      ? { type: 'strike', target }
      : { type: 'attack', target, resume: null };
  }
}
function commandHarvest(sel, c) {
  let i = 0;
  for (const e of sel) {
    if (e.kind !== 'unit') continue;
    if (e.type === 'harvester') e.order = { type: 'harvest', target: c };
    else { const p = spreadPoint(c.x, c.y + 50, i++); e.order = { type: 'move', x: p.x, y: p.y }; }
  }
}
function commandCollect(sel, egg) {
  let i = 0;
  for (const e of sel) {
    if (e.kind !== 'unit') continue;
    if (e.type === 'harvester') e.order = { type: 'collect', target: egg };
    else { const p = spreadPoint(egg.x, egg.y + 40, i++); e.order = { type: 'move', x: p.x, y: p.y }; }
  }
}
function commandRepair(sel, b) {
  let i = 0;
  for (const e of sel) {
    if (e.kind !== 'unit') continue;
    if (e.type === 'engineer') e.order = { type: 'repair', target: b };
    else { const p = spreadPoint(b.x, b.y + b.h / 2 + 30, i++); e.order = { type: 'move', x: p.x, y: p.y }; }
  }
}

// ---------------- Production ----------------
function trainUnit(b, type) {
  const d = UNIT[type];
  const t = teams[b.team];
  if (type === 'harrier') {
    const fleet = units.filter(u => u.team === b.team && u.type === 'harrier').length
      + buildings.reduce((s, x) => s + (x.team === b.team ? x.queue.filter(q => q === 'harrier').length : 0), 0);
    if (fleet >= HARRIER_CAP) {
      if (b.team === 1) { toast(`Harrier fleet is at capacity (${HARRIER_CAP})`); snd.error(); }
      return false;
    }
  }
  if (b.queue.length >= 5) { if (b.team === 1) { toast('Queue is full'); snd.error(); } return false; }
  if (t.crystals < d.cost) { if (b.team === 1) { toast('Not enough crystals'); snd.error(); } return false; }
  t.crystals -= d.cost;
  b.queue.push(type);
  return true;
}
function spawnFromBuilding(b, type) {
  const rally = b.rally || { x: b.x, y: b.y + b.h };
  const a = Math.atan2(rally.y - b.y, rally.x - b.x);
  const sx = b.x + Math.cos(a) * (b.r + 16) + (Math.random() - 0.5) * 10;
  const sy = b.y + Math.sin(a) * (b.r + 16) + (Math.random() - 0.5) * 10;
  const u = makeUnit(type, b.team, clamp(sx, 20, W - 20), clamp(sy, 20, H - 20));
  if (b.team === 1) stats.built++;
  const c = nearestCrystalTo(rally.x, rally.y, 60);
  if (type === 'harvester' && c) u.order = { type: 'harvest', target: c };
  else u.order = { type: 'move', x: rally.x, y: rally.y };
  if (b.team === 1) snd.ready();
}
// queue entries are either a unit type ('marine') or research ('up:infWeapons')
const queueLabel = (q) => q.startsWith('up:') ? UPG[q.slice(3)].label : UNIT[q].label;
function queueTime(team, q) {
  if (!q.startsWith('up:')) return UNIT[q].buildTime;
  const g = UPG[q.slice(3)];
  return g.time[Math.min(teams[team].up[q.slice(3)], g.max - 1)];
}
function startResearch(b, key) {
  const g = UPG[key], t = teams[b.team];
  const pending = buildings.reduce((s, x) =>
    s + (x.team === b.team ? x.queue.filter(q => q === 'up:' + key).length : 0), 0);
  const lvl = t.up[key] + pending;
  if (lvl >= g.max) { if (b.team === 1) { toast(g.label + ' is fully researched'); snd.error(); } return false; }
  if (b.queue.length >= 5) { if (b.team === 1) { toast('Queue is full'); snd.error(); } return false; }
  if (t.crystals < g.cost[lvl]) { if (b.team === 1) { toast('Not enough crystals'); snd.error(); } return false; }
  t.crystals -= g.cost[lvl];
  b.queue.push('up:' + key);
  return true;
}
function updateProduction(b) {
  if (!b.queue.length) return;
  const item = b.queue[0];
  // brownout: assembly lines crawl at half speed (rush boosts still help)
  if (b.prog < queueTime(b.team, item)) { b.prog += b.boost * (lowPower(b.team) ? 0.5 : 1); return; }
  if (item.startsWith('up:')) {
    const key = item.slice(3);
    b.queue.shift(); b.prog = 0; b.boost = 1;
    teams[b.team].up[key]++;
    if (b.team === 1) { toast(`${UPG[key].label} Level ${teams[b.team].up[key]} — complete`); snd.ready(); }
    return;
  }
  const d = UNIT[item];
  if (supplyUsed(b.team) + d.supply > supplyMax(b.team)) {
    if (b.team === 1 && tick % 300 === 0) toast('Supply limit reached — unit on hold');
    return;
  }
  b.queue.shift(); b.prog = 0; b.boost = 1;
  spawnFromBuilding(b, item);
}
// rush fees: pay half the item's cost for double speed, or its full cost to finish now
function queueItemCost(b) {
  const q = b.queue[0];
  if (q.startsWith('up:')) {
    const k = q.slice(3);
    return UPG[k].cost[Math.min(teams[b.team].up[k], UPG[k].max - 1)];
  }
  return UNIT[q].cost;
}
// rush fees for buildings still going up — same price model as unit queues:
// half the building's cost doubles the crew, the full cost finishes it now
function rushConstruction(b, instant) {
  if (b.built >= 1) return;
  if (!instant && (b.buildBoost || 1) > 1) return;
  // "no matter what" — you can't buy your way past the crew requirement
  if (BLD[b.type].needsEngineer && !engineerNear(b)) {
    if (b.team === 1) { toast('No crew on site — an engineer has to build this one'); snd.error(); }
    return;
  }
  const cost = BLD[b.type].cost || 0;
  const fee = instant ? cost : Math.ceil(cost / 2);
  const t = teams[b.team];
  if (t.crystals < fee) { if (b.team === 1) { toast(`Not enough crystals (${fee} ⬡)`); snd.error(); } return; }
  t.crystals -= fee;
  if (instant) {
    // jump to one tick from done — the normal update crosses the finish line,
    // so completion side effects (refinery harvester, toasts) still fire
    const bt = BLD[b.type].buildTime || 1;
    const rem = Math.max(0, 1 - b.built - 1 / bt);
    b.hp = Math.min(b.maxHp, b.hp + b.maxHp * rem);
    b.built = Math.max(b.built, 1 - 1 / bt);
  } else b.buildBoost = 2;
  if (b.team === 1) {
    toast(instant ? '⚡ Rush crew — construction finishing now' : '⏩ Construction at double speed');
    beep(instant ? 980 : 720, 0.08, 'sine', 0.05);
  }
}
function rushProduction(b, instant) {
  if (!b.queue.length) return;
  if (!instant && b.boost > 1) return;
  const item = b.queue[0];
  const fee = instant ? queueItemCost(b) : Math.ceil(queueItemCost(b) / 2);
  const t = teams[b.team];
  if (t.crystals < fee) { if (b.team === 1) { toast(`Not enough crystals (${fee} ⬡)`); snd.error(); } return; }
  if (instant && !item.startsWith('up:') && supplyUsed(b.team) + UNIT[item].supply > supplyMax(b.team)) {
    if (b.team === 1) { toast('Supply limit reached — build a Supply Depot first'); snd.error(); }
    return;
  }
  t.crystals -= fee;
  if (instant) b.prog = queueTime(b.team, item);
  else b.boost = 2;
  if (b.team === 1) {
    toast(instant ? '⚡ Rush order — finishing now' : '⏩ Production at double speed');
    beep(instant ? 980 : 720, 0.08, 'sine', 0.05);
  }
}

// ---------------- Nukes ----------------
function buyNuke(b, tier) {
  const t = teams[b.team], spec = NUKE[tier];
  if (b.warhead) { if (b.team === 1) { toast('Silo is already armed'); snd.error(); } return false; }
  if (t.crystals < spec.cost) {
    if (b.team === 1) { toast(`Not enough crystals (${spec.cost.toLocaleString()} ⬡)`); snd.error(); }
    return false;
  }
  t.crystals -= spec.cost;
  b.warhead = tier;
  if (b.team === 1) { toast(`☢ ${spec.label} armed — select the silo and press L to launch`); snd.ready(); }
  return true;
}
function launchNuke(b, wx, wy) {
  const tier = b.warhead;
  if (!tier || b.hp <= 0 || !buildings.includes(b)) return false;   // silo must be standing
  if (lowPower(b.team)) {
    if (b.team === 1) { toast('⚡ LOW POWER — the silo can\'t launch. Build a Power Plant.'); snd.error(); }
    return false;
  }
  const spec = NUKE[tier];
  if (spec.hqSafe && buildings.some(x => x.type === 'hq' && dist2(wx, wy, x.x, x.y) < NUKE_HQ_EXCLUSION ** 2)) {
    if (b.team === 1) { toast('Tactical warheads can\'t be aimed at an HQ — that takes the Bunker Buster'); snd.error(); }
    return false;
  }
  b.warhead = null;
  nukes.push({ x: wx, y: wy, team: b.team, tier, t: 0, max: NUKE_COUNTDOWN });
  toast(b.team === 1 ? '🚀 Launch confirmed — impact in 30 seconds' : '☢ NUCLEAR LAUNCH DETECTED — impact in 30 seconds!');
  snd.launch();
  return true;
}
function detonate(n) {
  const spec = NUKE[n.tier];
  const hit = (e) => {
    const d = Math.max(0, dist(n.x, n.y, e.x, e.y) - (e.r || 0));
    if (d > spec.radius) return;
    const fall = 1 - 0.55 * (d / spec.radius);   // full at center, 45% at the rim
    const before = e.hp;
    damage(e, spec.dmg * fall, null);
    if (n.team === 1 && e.team !== 1 && before > 0 && e.hp <= 0) stats.kills++;
  };
  for (const u of units.slice()) if (u.hp > 0) hit(u);           // friendly fire: yes. It's a nuke.
  for (const b of buildings.slice()) {
    if (b.hp <= 0) continue;
    if (spec.hqSafe && b.type === 'hq') continue;                // tactical warheads spare HQs
    hit(b);
  }
  for (let i = 0; i < 10; i++) {
    fxExplosion(n.x + (Math.random() - 0.5) * spec.radius * 1.3,
                n.y + (Math.random() - 0.5) * spec.radius * 1.3, 28 + Math.random() * 22, true);
  }
  fxs.push({ kind: 'boom', x: n.x, y: n.y, t: 0, max: 45, size: spec.radius });
  addShake(n.x, n.y, 30);
  snd.nuke();
}
function updateNukes() {
  for (const n of nukes) {
    n.t++;
    if (n.t === n.max - 300 && n.team !== 1) { toast('☢ Impact in 5 seconds!'); snd.alarm(); }
    if (n.t >= n.max) detonate(n);
  }
  nukes = nukes.filter(n => n.t < n.max);
}

// ---------------- Combat ----------------
function fire(src, target) {
  if (src.kind === 'unit' && UNIT[src.type].melee) {
    // fake melee (raptor claws, the Broodmother's jaw): no projectile — the
    // pounce IS the hit, with the infantry bonus for anything meat and cloth.
    src.cool = src.cooldown;
    src.faceA = Math.atan2(target.y - src.y, target.x - src.x);
    src.recoil = src.type === 'broodmother' ? 6 : 3;   // the kick reads as a lunge-and-recover
    const infBonus = target.kind === 'unit' && IS_INF[target.type] ? (UNIT[src.type].infBonus || 1) : 1;
    fxs.push({ kind: 'slash', x: target.x, y: target.y, a: src.faceA, t: 0, max: 12 });
    if (src.team === 1 || Math.random() < 0.4) snd.bite();
    damage(target, src.dmg * weaponMult(src) * infBonus, src);
    return;
  }
  // browned-out towers still shoot, just half as often
  src.cool = src.cooldown * (src.kind === 'building' && lowPower(src.team) ? 2 : 1);
  // weapons discipline around a live-capture target: you CAN shoot it, but
  // everyone drags their trigger — half fire rate (was a hard lock; playtest
  // wanted the firefight to stay honest while the rig works)
  if (target.specimen && src.team === 1) src.cool *= 2;
  src.recoil = src.type === 'tank' || src.type === 'artillery' ? 6
    : src.type === 'turret' || src.type === 'flak' ? 4 : 2.5;
  src.faceA = Math.atan2(target.y - src.y, target.x - src.x);
  const kind = src.type === 'artillery' ? 'arc' : src.type === 'tank' ? 'shell'
    : src.type === 'sniper' ? 'snipe' : src.type === 'spitter' ? 'spit'
    : src.type === 'rocket' ? 'rocket' : 'bolt';
  const sx = src.x + Math.cos(src.faceA) * (src.r * 0.8);
  const sy = src.y + Math.sin(src.faceA) * (src.r * 0.8);
  if (kind === 'arc') {
    // artillery lobs at the target's CURRENT spot — no homing, splash on impact.
    // Fast units walk out from under it; buildings never do. That's the whole unit.
    const d = UNIT.artillery;
    bullets.push({
      x: sx, y: sy, x0: sx, y0: sy, tx: target.x, ty: target.y,
      target: null, dmg: src.dmg * weaponMult(src), team: src.team, src,
      speed: 5, kind, splash: d.splash, bldBonus: d.bldBonus,
    });
  } else {
    // rocket troopers punch armor: bonus applies vs vehicles only
    const armorBonus = (UNIT[src.type] && UNIT[src.type].vehBonus
      && target.kind === 'unit' && isVehicle(target)) ? UNIT[src.type].vehBonus : 1;
    bullets.push({
      x: sx, y: sy, tx: target.x, ty: target.y,
      target, dmg: src.dmg * weaponMult(src) * armorBonus, team: src.team, src,
      speed: kind === 'shell' ? 6.5 : kind === 'snipe' ? 13 : kind === 'spit' ? 6 : kind === 'rocket' ? 5.5 : 9,
      kind,
    });
  }
  if (kind !== 'spit') fxMuzzle(src, kind === 'arc' ? 'shell' : kind);   // no muzzle flash from a mouth
  if (src.team === 1 || Math.random() < 0.4) {
    if (kind === 'arc') snd.thump();
    else if (kind === 'shell') snd.shell(); else if (kind === 'snipe') snd.snipe();
    else if (kind === 'spit') snd.spit(); else if (kind === 'rocket') snd.rocket();
    else snd.shot();
  }
}
function damage(e, d, src) {
  if (e.invuln) return;   // scripted set-piece (M7's den): the story kills it, not the player
  d *= armorMult(e);
  if (e.kind === 'unit' && e.order.type === 'hunker') d *= 0.5;
  e.hp -= d;
  // warn the player when the home front takes hits (buildings & workers)
  if (e.team === 1 && !gameOver && src && src.team !== 1) {
    if (e.kind === 'building') raiseAlert(e.x, e.y, '⚠ Your base is under attack!');
    else if (e.type === 'harvester' || e.type === 'engineer') raiseAlert(e.x, e.y, '⚠ Your workers are under attack!');
  }
  // fight back if idle
  if (e.kind === 'unit' && isCombat(e) && e.order.type === 'idle' && src && src.hp > 0) {
    e.order = { type: 'attack', target: src, resume: null };
  }
  // kicking the nest: the brood answers IMMEDIATELY (playtest: nests felt
  // passive). Burst defenders aren't brood — survivors stay loose and roam.
  if (e.kind === 'building' && e.type === 'nest' && e.hp > 0 && src && src.team !== 3
      && tick - (e.burstAt || -1e9) > NEST_BURST_CD) {
    e.burstAt = tick;
    const n = 2 + (Math.random() < 0.5 ? 1 : 0);
    for (let i = 0; i < n; i++) {
      const d2 = spawnSpitter(e);
      d2.home = null;   // the nest still replaces its normal guards separately
      d2.roam = true;
      d2.order = src.hp > 0 ? { type: 'attack', target: src, resume: null } : { type: 'roam' };
    }
    if (isShownAt(e.x, e.y)) toast('🦖 The nest erupts — defenders pour out!');
  }
  // dead grazer = angry planet: every real dino gets more aggressive for the level
  if (e.hp <= 0 && e.type === 'critter' && src && src.team !== 3) {
    dinoRage++;
    if (src.team === 1) toast('🦖 The wildlife stirs… the dinosaurs grow agitated');
  }
  if (e.hp <= 0) {
    if (src && src.team === 1 && e.team !== 1) stats.kills++;
    if (e.team === 1 && e.kind === 'unit') stats.lost++;
    // veterancy credit: the killer remembers, and might rank up
    if (src && src.kind === 'unit' && src.hp > 0 && src.team !== e.team) {
      const before = rankOf(src);
      src.kills++;
      const after = rankOf(src);
      if (after > before) {
        if (src.team === 1) {
          fxs.push({ kind: 'text', x: src.x, y: src.y - 20, t: 0, max: 70, msg: '★ ' + RANK_NAMES[after] });
          toast(`${UNIT[src.type].label} promoted to ${RANK_NAMES[after]}!`);
          snd.ready();
        }
      }
    }
    kill(e);
  }
}
function kill(e) {
  e.hp = 0;
  if (nukeTargeting === e) { nukeTargeting = null; setCursor(); }   // no launching from rubble
  if (e.kind === 'unit' && e.cargo && e.cargo.length) {
    if (e.team === 1) stats.lost += e.cargo.length;   // passengers are lost too
    e.cargo = [];
  }
  // units with sliced death frames fall over and leave a body — a soft ring
  // instead of the full fireball (vehicles and buildings still explode)
  const corpse = e.kind === 'unit' ? animFrames(e.type, 'death', e.team, 4) : [];
  if (e.drowned) {
    // went under: rings on the surface, no body, no fireball
    fxs.push({ kind: 'ping', x: e.x, y: e.y, t: 0, max: 30, color: 'rgba(190,235,240,0.85)' });
    fxs.push({ kind: 'ping', x: e.x, y: e.y, t: 0, max: 46, color: 'rgba(140,205,215,0.6)' });
  } else if (corpse.length) {
    fxs.push({ kind: 'corpse', x: e.x, y: e.y, a: e.faceA, frames: corpse,
               t: 0, max: corpse.length * 9 + 170,
               size: e.kind === 'unit' && IS_DINO[e.type] ? dinoBox(e.type, e.r) * 2 : e.r * 2.7 });
    fxs.push({ kind: 'boom', x: e.x, y: e.y, t: 0, max: 16, size: (e.r || 16) * 0.9 });
  } else if (e.kind === 'unit' && IS_DINO[e.type]) {
    fxs.push({ kind: 'boom', x: e.x, y: e.y, t: 0, max: 18, size: (e.r || 16) * 0.9 });   // animals don't fireball
  } else {
    fxs.push({ kind: 'boom', x: e.x, y: e.y, t: 0, max: 26, size: (e.r || 16) * 1.6 });
    fxExplosion(e.x, e.y, (e.r || 16) * 1.3, e.kind === 'building');
  }
  if (e.kind === 'building' && e.type === 'nest') {
    // the clutch survives the blast — haul the eggs home to hatch your own brood
    for (let i = 0; i < NEST_EGGS; i++) {
      const a = (i / NEST_EGGS) * Math.PI * 2 + 0.7;
      makeEgg(e.x + Math.cos(a) * (e.r + 14), e.y + Math.sin(a) * (e.r + 14));
    }
    if (isShownAt(e.x, e.y)) toast('🥚 The nest left eggs behind — send a harvester to collect them');
  }
  if (e.kind === 'building' && e.type === 'hq') {
    // an HQ going down ends the game — sell it: second blast wave + double quake
    fxExplosion(e.x + 22, e.y + 16, e.r * 0.8, true);
    fxExplosion(e.x - 18, e.y - 14, e.r * 0.6, true);
    addShake(e.x, e.y, 20);
    snd.boom(); setTimeout(() => snd.boom(), 180);
  }
  if (e.kind === 'building') snd.collapse();
  else if (IS_DINO[e.type]) snd.screech();
  else snd.boom();
}

// ---------------- Unit update ----------------
function moveToward(u, tx, ty) {
  const d = dist(u.x, u.y, tx, ty);
  if (d < 5) return true;
  let a = Math.atan2(ty - u.y, tx - u.x);
  if (u.fly) {   // flyers go straight over everything
    u.faceA = a;
    const step = Math.min(effSpeed(u), d);
    u.x += Math.cos(a) * step;
    u.y += Math.sin(a) * step;
    return d - step < 5;
  }
  // ground units path around terrain: straight line when clear, cached A* when not
  const foot = !!(IS_INF[u.type] || IS_DINO[u.type]);   // dam walkways: infantry + dinos only
  let gx = tx, gy = ty;
  if (rocks.length && !losClear(u.x, u.y, tx, ty, foot)) {
    const o = u.order;
    if (!o._path || !o._path.length || Math.abs(tx - o._pgx) + Math.abs(ty - o._pgy) > 56) {
      o._path = findPath(u.x, u.y, tx, ty, foot) || [];
      o._pgx = tx; o._pgy = ty;
    }
    while (o._path.length && dist2(u.x, u.y, o._path[0].x, o._path[0].y) < 24 * 24) o._path.shift();
    // …and drop a waypoint we've been PUSHED past. Proximity alone can't retire
    // one: shove a unit off a waypoint (an ambush crowd, a wall slide) without
    // it ever coming within 24px and that waypoint stays at the head forever —
    // the unit turns around, walks back toward ground it already cleared, the
    // crowd pushes it forward, and it nets zero movement permanently. The ghost
    // watchdog fires and changes nothing, because nothing is actually colliding.
    // (Playtest, M2: the convoy froze mid-road at the ambush with three raiders
    // on it and never reached Survey Post Beta.)
    // "Behind us" = we're already at least as close to the NEXT waypoint as this
    // one is. Gated on line of sight so a genuine detour can't be corner-cut.
    while (o._path.length > 1
           && dist2(u.x, u.y, o._path[1].x, o._path[1].y)
              <= dist2(o._path[0].x, o._path[0].y, o._path[1].x, o._path[1].y)
           && losClear(u.x, u.y, o._path[1].x, o._path[1].y, foot))
      o._path.shift();
    if (o._path.length) { gx = o._path[0].x; gy = o._path[0].y; a = Math.atan2(gy - u.y, gx - u.x); }
  }
  // If a building or rock blocks the path just ahead, slide along its wall
  // toward the clear side instead of grinding into it until separation() helps.
  const look = u.r + 12;
  const lx = u.x + Math.cos(a) * look, ly = u.y + Math.sin(a) * look;
  const o2 = u.order;
  let sliding = false;
  if (!u.ghostT) for (const b of buildings) {
    if (b.sunk) continue;   // lowered depots/plants are drive-over ground
    if (b.type === 'hydro' && foot) continue;   // the dam IS the footbridge
    if (Math.abs(lx - b.x) >= b.w / 2 + u.r || Math.abs(ly - b.y) >= b.h / 2 + u.r) continue;
    // if the waypoint is at/inside this building (attack, repair, drop-off), walk straight in
    if (Math.abs(gx - b.x) < b.w / 2 + u.r + 10 && Math.abs(gy - b.y) < b.h / 2 + u.r + 10) break;
    // sticky slide: pick a side ONCE per wall and keep it — re-deciding every
    // tick flip-flopped the sign as the unit jittered, which read as a spin-out
    if (o2._slideB !== b.id) {
      const cross = (gx - u.x) * (b.y - u.y) - (gy - u.y) * (b.x - u.x);
      o2._slideB = b.id;
      o2._slideS = cross > 0 ? -1 : 1;
    }
    a += o2._slideS * Math.PI / 2;
    sliding = true;
    break;
  }
  // hysteresis: hold the dodge a few ticks past the last blocked frame —
  // without it the heading alternated goal/slide every other tick (the shimmy)
  if (sliding) o2._slideHold = 6;
  else if (o2._slideHold > 0) {
    o2._slideHold--;
    a += (o2._slideS || 1) * Math.PI / 2;
    sliding = true;
  }
  if (sliding) {
    // wedged on the same wall too long (concave corner, crowd) — ghost past the
    // lip instead of orbiting it. Mirrors the A* watchdog, which never fires
    // for building bumps because buildings aren't in the path grid.
    o2._slideT = (o2._slideT || 0) + 1;
    if (o2._slideT > 45) { u.ghostT = 40; o2._slideT = 0; o2._slideB = null; }
  } else { o2._slideT = 0; o2._slideB = null; }
  // building-pocket watchdog: on rock-free ground there is no A* path, so the
  // progress watchdog in updateUnit never runs — and inside a roomy pocket
  // between buildings the unit gets enough open ticks between wall bumps that
  // _slideT keeps resetting. Track raw distance-to-goal here instead: no new
  // best for 3s while trying to move = orbiting a building cluster. Ghost out.
  // (Playtest, M2: a convoy harvester circled Survey Post Beta's three
  // buildings forever without either escape ever firing.)
  if (!u.fly) {
    // new goal, or a gap in movement (unit stood mining/firing) — start fresh,
    // else the stale timer would fire a ghost on the first step after any pause
    if (o2._gx !== tx || o2._gy !== ty || tick - (o2._gTick || -9) > 2) {
      o2._gx = tx; o2._gy = ty; o2._gBest = Infinity; o2._gT = tick;
    }
    o2._gTick = tick;
    const dg = dist2(u.x, u.y, tx, ty);
    if (dg < o2._gBest - 400) { o2._gBest = dg; o2._gT = tick; }
    else if (tick - o2._gT > 180) { u.ghostT = 60; o2._gT = tick; }
  }
  // vehicles steer, they don't teleport-rotate: cap the hull turn rate so a
  // wall bump reads as a swerve, not a spin (infantry and dinos still snap)
  if (!IS_INF[u.type] && !IS_DINO[u.type]) {
    let da = a - u.faceA;
    while (da > Math.PI) da -= Math.PI * 2;
    while (da < -Math.PI) da += Math.PI * 2;
    u.faceA += Math.abs(da) > 0.22 ? Math.sign(da) * 0.22 : da;
  } else u.faceA = a;
  const step = Math.min(effSpeed(u), d);
  u.x += Math.cos(a) * step;
  u.y += Math.sin(a) * step;
  if (step > 0.2) {
    u.walkT += step;
    u.moving = true;
    // ground vehicles kick up dust while driving (skipped when the GPU is drowning)
    if (spritesReady && perf.fxLevel >= 1 && step > 0.6 && !IS_INF[u.type] && u.type !== 'spitter' && (tick + u.id) % 8 === 0) {
      fxSprite({
        img: pick(SPR.puff),
        x: u.x - Math.cos(a) * u.r, y: u.y - Math.sin(a) * u.r,
        vx: -Math.cos(a) * 0.25, vy: -Math.sin(a) * 0.25,
        s0: 5, s1: 14, a0: 0.22, max: 22,
      });
    }
  }
  return d - step < 5;
}

function updateUnit(u) {
  if (u.hp <= 0) return;   // killed earlier this tick (splash, capture) — the dead don't act
  // first contact: the moment any wild dino stands in player vision AWAY from
  // the base ("in the wild"), the wildlife stops being shy. A sighting at the
  // camp fence doesn't count — otherwise approaching = permission to enter.
  if (!wildSeen && u.team === 3 && (tick + u.id) % 30 === 0 &&
      isVisibleAt(u.x, u.y) && !nearestPlayerBld(u.x, u.y, 480)) wildSeen = true;
  if (u.cool > 0) u.cool--;
  // a ghost never re-solidifies while inside a building footprint — expiring
  // mid-building lets separation() eject it to the nearest face, which can be
  // right back into the pocket it was escaping
  if (u.ghostT > 0 && !(u.ghostT === 1 && !u.fly && buildings.some(b =>
    Math.abs(u.x - b.x) < b.w / 2 + u.r && Math.abs(u.y - b.y) < b.h / 2 + u.r))) u.ghostT--;
  u.moving = false;
  if (u.recoil) { u.recoil *= 0.78; if (u.recoil < 0.3) u.recoil = 0; }
  // pathing watchdog: while following a path, require steady progress toward
  // the goal. No progress for 2.5s = orbiting or wedged on a rock face —
  // re-route and briefly ghost through the obstacle lip to break the cycle.
  const op = u.order;
  if (op._path) {
    const dGoal = dist2(u.x, u.y, op._pgx, op._pgy);
    if (op._best === undefined || dGoal < op._best - 400) {
      op._best = dGoal; op._bestT = tick;
    } else if (tick - op._bestT > 90) {
      op._path = null; op._best = undefined;
      u.ghostT = 60;
    }
  }
  if (u.hp < u.maxHp && rankOf(u) >= 3) u.hp = Math.min(u.maxHp, u.hp + 0.05);   // Legends field-patch themselves
  // The Broodmother is a walking den: while she lives she lays raptor broods.
  // Her children escort her (guard where they hatch, so they aggro whatever
  // comes near the column) — killing her is the only way to stop the bleeding.
  if (u.type === 'broodmother' && u.hp > 0) {
    const kids = units.filter(k => k.hp > 0 && k.type === 'raptor' && k.home === u.id).length;
    if (kids < BROODMOTHER_BROOD_CAP) {
      u.broodT = (u.broodT || 0) + 1;
      if (u.broodT >= BROODMOTHER_LAY_EVERY) {
        u.broodT = 0;
        for (let i = 0; i < BROODMOTHER_LAY_SIZE; i++) spawnRaptor(u);
        if (isShownAt(u.x, u.y)) {
          toast('⚠ The Broodmother has laid a new brood!');
          snd.screech();
        }
      }
    } else u.broodT = 0;   // at cap: the clock idles, same rule as the den
  }
  const o = u.order;

  switch (o.type) {
    case 'idle': {
      // undelivered cargo always resumes its run — a move/stop order mid-haul
      // must never strand a specimen or egg (soft-locked the tutorial once)
      if (u.captive) { u.order = { type: 'returnCaptive' }; break; }
      if (u.eggCarry) { u.order = { type: 'returnEgg' }; break; }
      if (u.roam) { u.order = { type: 'roam' }; break; }   // loose dinos go back to wandering
      if (u.type === 'medic') {
        const w = nearestWoundedAlly(u, 260);
        if (w) u.order = { type: 'heal', target: w };
      } else if (u.type === 'engineer') {
        // an unmanned site outranks everything: nothing else on the field is
        // frozen solid waiting for this engineer to walk over
        const site = nearestUnbuiltSite(u.team, u.x, u.y, 700);
        if (site) { u.order = { type: 'build', target: site }; break; }
        const nb = nearestDamagedBuilding(u.team, u.x, u.y, 240);
        if (nb) u.order = { type: 'repair', target: nb };
        else {
          const v = nearestWoundedAlly(u, 240, isVehicle);
          if (v) u.order = { type: 'heal', target: v };
        }
      } else if (u.type === 'harrier') {
        if (!u.armed) { u.order = { type: 'rearm' }; break; }
        const t = acquireTarget(u.x, u.y, u.team, UNIT.harrier.sight, u);
        if (t) u.order = { type: 'strike', target: t };
      } else if (isCombat(u)) {
        const t = acquireTarget(u.x, u.y, u.team, u.range + 70, u);
        if (t) u.order = { type: 'attack', target: t, resume: null };
      }
      break;
    }
    case 'move': {
      if (moveToward(u, o.x, o.y)) u.order = { type: 'idle' };
      break;
    }
    case 'hunker': {
      // dug in: half damage taken, holds position, still shoots what's in range.
      // Artillery keeps its dead zone while dug in — closing the gap still beats it.
      const t = acquireTarget(u.x, u.y, u.team, u.range, u);
      if (t) {
        u.faceA = Math.atan2(t.y - u.y, t.x - u.x);
        const min = UNIT[u.type].minRange;
        const d = dist(u.x, u.y, t.x, t.y) - (t.r || 0);
        if (u.cool <= 0 && !(min && d < min)) fire(u, t);
      }
      break;
    }
    case 'guard': {
      // nest creep AI: pounce on anything near home, chase to the leash, then walk back.
      // Never leaves this order, so artillery pounding from beyond aggro range goes unanswered.
      const t = acquireTarget(u.x, u.y, u.team, u.range + 90 + (u.team === 3 ? dinoAggro() : 0), u);
      if (t && dist(t.x, t.y, o.hx, o.hy) < NEST_LEASH + (u.team === 3 ? dinoAggro() : 0)) {
        const d = dist(u.x, u.y, t.x, t.y) - (t.r || 0);
        if (d > u.range) moveToward(u, t.x, t.y);
        else {
          u.faceA = Math.atan2(t.y - u.y, t.x - u.x);
          if (u.cool <= 0) fire(u, t);
        }
      } else if (dist(u.x, u.y, o.hx, o.hy) > 55) {
        moveToward(u, o.hx, o.hy);
      }
      break;
    }
    case 'roam': {
      // loose wildlife: fight whatever comes close (if armed), otherwise amble
      if (u.dmg > 0) {
        const t = acquireTarget(u.x, u.y, u.team, u.range + 110 + dinoAggro(), u);
        if (t) { u.order = { type: 'attack', target: t, resume: null }; break; }
      }
      // shy phase: until the player has actually SEEN wildlife, roamers keep
      // out of camp — no dinos strolling through the base before first contact.
      // The flee point is STICKY: picked once and held until reached — re-aiming
      // every tick made the heading whipsaw between base buildings (spin-out).
      const rFoot = !!(IS_INF[u.type] || IS_DINO[u.type]);
      if (!wildSeen && u.team === 3) {
        if (o.flee && dist(u.x, u.y, o.x, o.y) < 26) o.flee = false;
        if (!o.flee) {
          const nb = nearestPlayerBld(u.x, u.y, 480);
          if (nb) {
            const a = Math.atan2(u.y - nb.y, u.x - nb.x);
            const spot = walkableSpot(u.x, u.y, a, 520, rFoot);
            if (spot) { o.x = spot[0]; o.y = spot[1]; o.flee = true; o._path = null; o.rt = 0; }
          }
        }
      } else o.flee = false;
      // Wildlife used to pick a spot across the river, walk to the shoreline
      // and grind there forever (playtest 2026-07-26). Two fixes: destinations
      // must be somewhere the animal can actually stand — dam planks included,
      // since dinos are foot units — and any wander that stops making progress
      // is abandoned after ~10s instead of held until reached.
      o.rt = (o.rt || 0) + 1;
      const stalled = o.rt > 600;
      if (o.x === undefined || dist(u.x, u.y, o.x, o.y) < 26 || stalled) {
        if (stalled || Math.random() < 0.008) {   // graze a while, then drift somewhere new
          for (let i = 0; i < 8; i++) {
            const spot = walkableSpot(u.x, u.y, Math.random() * Math.PI * 2, 200 + Math.random() * 500, rFoot);
            if (spot) { o.x = spot[0]; o.y = spot[1]; o._path = null; break; }
          }
          o.rt = 0;
        }
      } else moveToward(u, o.x, o.y);
      break;
    }
    case 'attackmove': {
      if (u.type === 'harrier') {
        if (!u.armed) { u.order = { type: 'rearm' }; break; }
        const ht = acquireTarget(u.x, u.y, u.team, UNIT.harrier.sight, u);
        if (ht) { u.order = { type: 'strike', target: ht }; break; }
        if (moveToward(u, o.x, o.y)) u.order = { type: 'idle' };
        break;
      }
      // Unarmed support must not walk THROUGH its own firing line. Armed
      // escorts stop at weapon range to shoot; a unit with no weapon has
      // nothing to stop it, so it marches past them into the enemy — measured
      // at 100px ahead of the lead marine and dead in six seconds, and NOT a
      // speed problem (the medic is already slower than a marine). It holds at
      // standoff instead, and the idle auto-heal/repair services whoever falls
      // back to it.
      if (u.dmg <= 0 || isSupport(u)) {
        if (acquireTarget(u.x, u.y, u.team, SUPPORT_STANDOFF, u)) { u.order = { type: 'idle' }; break; }
        if (moveToward(u, o.x, o.y)) u.order = { type: 'idle' };
        break;
      }
      const t = acquireTarget(u.x, u.y, u.team, u.range + 90, u);
      if (t) { u.order = { type: 'attack', target: t, resume: { x: o.x, y: o.y } }; break; }
      if (moveToward(u, o.x, o.y)) u.order = { type: 'idle' };
      break;
    }
    case 'attack': {
      const t = o.target;
      if (!t || t.hp <= 0) {
        u.order = o.resume ? { type: 'attackmove', x: o.resume.x, y: o.resume.y } : { type: 'idle' };
        break;
      }
      // ordered at a flyer with a gun that can't elevate — give up rather than chase forever
      if (t.kind === 'unit' && UNIT[t.type].fly && !canAA(u)) {
        u.order = o.resume ? { type: 'attackmove', x: o.resume.x, y: o.resume.y } : { type: 'idle' };
        break;
      }
      const d = dist(u.x, u.y, t.x, t.y) - (t.r || 0);
      if (d > u.range) moveToward(u, t.x, t.y);
      else {
        u.faceA = Math.atan2(t.y - u.y, t.x - u.x);
        // artillery has a dead zone — anything that closes inside minRange is safe from it
        const min = UNIT[u.type].minRange;
        if (u.cool <= 0 && u.dmg > 0 && !(min && d < min)) fire(u, t);
      }
      break;
    }
    case 'harvest': {
      let c = o.target;
      if (!c || c.amount <= 0) {
        c = nearestCrystalTo(u.x, u.y, 600);
        if (!c) { u.order = { type: 'idle' }; break; }
        o.target = c;
      }
      if (u.carry >= carryCap(u)) { u.lastCrystal = c; u.order = { type: 'return' }; break; }
      const d = dist(u.x, u.y, c.x, c.y);
      if (d > c.r + u.r + 4) moveToward(u, c.x, c.y);
      else {
        u.faceA = Math.atan2(c.y - u.y, c.x - u.x);
        u.mineT++;
        if (u.mineT >= 9) {
          u.mineT = 0;
          u.carry++;
          c.amount--;
          fxMinePuff(c, u);
        }
      }
      break;
    }
    case 'board': {
      const apc = o.target;
      if (!apc || apc.hp <= 0 || !units.includes(apc) || !apc.cargo || apc.cargo.length >= UNIT.apc.cargo) {
        u.order = { type: 'idle' };
        break;
      }
      const d = dist(u.x, u.y, apc.x, apc.y);
      if (d > apc.r + u.r + 8) moveToward(u, apc.x, apc.y);
      else {
        apc.cargo.push(u);
        units = units.filter(x => x !== u);       // inside now — out of the world
        selection = selection.filter(s => s !== u);
        if (u.team === 1) beep(440, 0.06, 'triangle', 0.04);
      }
      break;
    }
    case 'strike': {
      // bomb run: fly at the target, one devastating hit, then home to rearm
      const t = o.target;
      if (!u.armed) { u.order = { type: 'rearm' }; break; }
      if (!t || t.hp <= 0) { u.order = { type: 'idle' }; break; }
      if (!moveToward(u, t.x, t.y) && dist(u.x, u.y, t.x, t.y) > 30) break;
      // bombs away
      u.armed = false;
      const D = UNIT.harrier;
      for (const e of units.slice()) {
        if (e.team === u.team || e.hp <= 0) continue;
        if (e.specimen && u.team === 1) continue;   // protected specimens shrug off player splash
        if (dist(t.x, t.y, e.x, e.y) <= D.bombSplash + e.r) damage(e, D.bomb * weaponMult(u), u);
      }
      for (const b of buildings.slice()) {
        if (b.team === u.team || b.hp <= 0) continue;
        if (dist(t.x, t.y, b.x, b.y) <= D.bombSplash + b.r) damage(b, D.bomb * D.bombBldBonus * weaponMult(u), u);
      }
      fxs.push({ kind: 'boom', x: t.x, y: t.y, t: 0, max: 20, size: D.bombSplash });
      fxExplosion(t.x, t.y, 26, true);
      addShake(t.x, t.y, 8);
      snd.boom();
      u.order = { type: 'rearm' };
      break;
    }
    case 'rearm': {
      const pad = buildings.find(b => b.team === u.team && b.type === 'airpad' && b.built >= 1);
      if (!pad) { u.order = { type: 'idle' }; break; }
      const d = dist(u.x, u.y, pad.x, pad.y);
      if (d > 30) { moveToward(u, pad.x, pad.y); o.t = 0; }
      else if ((o.t = (o.t || 0) + 1) >= HARRIER_REARM) {   // 7s on the pad
        u.armed = true;
        u.order = { type: 'idle' };
        if (u.team === 1) { toast('Harrier rearmed'); snd.ready(); }
      }
      break;
    }
    case 'heal': {
      const pred = u.type === 'engineer' ? isVehicle : isFlesh;
      const rate = u.type === 'engineer' ? UNIT.engineer.repair : UNIT.medic.heal;
      const t = o.target;
      if (!t || t.hp <= 0 || t.hp >= t.maxHp || !units.includes(t)) {
        const w = nearestWoundedAlly(u, 300, pred);
        if (w) { o.target = w; break; }
        u.order = { type: 'idle' };
        break;
      }
      const d = dist(u.x, u.y, t.x, t.y) - t.r;
      if (d > 26) moveToward(u, t.x, t.y);
      else {
        u.faceA = Math.atan2(t.y - u.y, t.x - u.x);
        t.hp = Math.min(t.maxHp, t.hp + rate);
        if (tick % 12 === 0) {
          fxs.push({ kind: 'spark', x: t.x + (Math.random() - 0.5) * 10, y: t.y - 8, t: 0, max: 18 });
        }
        if (tick % 60 === 0 && u.team === 1) snd.repair();
      }
      break;
    }
    // stand at a site and pour it. The progress itself lives in updateBuilding
    // (presence is what counts, so a second engineer wandering past also helps);
    // this order is what walks the crew out there and keeps them there.
    case 'build': {
      const site = o.target;
      if (!site || site.hp <= 0 || site.built >= 1) {
        const next = nearestUnbuiltSite(u.team, u.x, u.y, 500);
        u.order = next ? { type: 'build', target: next } : { type: 'idle' };
        break;
      }
      const d = dist(u.x, u.y, site.x, site.y) - site.r;
      if (d > ENG_BUILD_RANGE - 30) moveToward(u, site.x, site.y);
      else {
        u.faceA = Math.atan2(site.y - u.y, site.x - u.x);
        if (tick % 10 === 0) {
          fxs.push({ kind: 'spark', x: site.x + (Math.random() - 0.5) * site.w * 0.7,
                     y: site.y + (Math.random() - 0.5) * site.h * 0.7, t: 0, max: 18 });
        }
        if (tick % 40 === 0 && u.team === 1) snd.repair();
      }
      break;
    }
    case 'repair': {
      const b = o.target;
      if (!b || b.hp <= 0 || b.hp >= b.maxHp) {
        const nb = nearestDamagedBuilding(u.team, u.x, u.y, 280);
        if (nb) { o.target = nb; break; }
        u.order = { type: 'idle' };
        break;
      }
      const d = dist(u.x, u.y, b.x, b.y);
      if (d > b.r + u.r + 10) moveToward(u, b.x, b.y);
      else {
        u.faceA = Math.atan2(b.y - u.y, b.x - u.x);
        b.hp = Math.min(b.maxHp, b.hp + UNIT.engineer.repair);
        if (tick % 10 === 0) {
          fxs.push({ kind: 'spark', x: b.x + (Math.random() - 0.5) * b.w * 0.7, y: b.y + (Math.random() - 0.5) * b.h * 0.7, t: 0, max: 18 });
        }
        if (tick % 40 === 0 && u.team === 1) snd.repair();
      }
      break;
    }
    case 'collect': {
      // egg run: walk to the egg, scoop it up, bring it home to the HQ lab
      let egg = o.target;
      if (!egg || !eggs.includes(egg)) {
        egg = nearestEggTo(u.x, u.y, 500);
        if (!egg) { u.order = { type: 'idle' }; break; }
        o.target = egg;
      }
      if (u.eggCarry) { u.order = { type: 'returnEgg' }; break; }
      const d = dist(u.x, u.y, egg.x, egg.y);
      if (d > egg.r + u.r + 4) moveToward(u, egg.x, egg.y);
      else {
        u.eggCarry = true;
        u.lastEggSite = { x: egg.x, y: egg.y };   // remember the clutch for repeat trips
        eggs = eggs.filter(e => e !== egg);
        u.order = { type: 'returnEgg' };
      }
      break;
    }
    case 'capture': {
      // capture rig: close to contact range, channel, and bag a live specimen
      const tgt = o.target;
      if (u.captive) { u.order = { type: 'returnCaptive' }; break; }
      if (!tgt || tgt.hp <= 0 || !units.includes(tgt) || !tgt.specimen) { u.capT = 0; u.order = { type: 'idle' }; break; }
      const d = dist(u.x, u.y, tgt.x, tgt.y) - tgt.r;
      if (d > RIG_CAP_RANGE) { u.capT = 0; moveToward(u, tgt.x, tgt.y); }
      else {
        u.faceA = Math.atan2(tgt.y - u.y, tgt.x - u.x);
        u.capT++;
        if (tick % 9 === 0) {
          fxs.push({ kind: 'spark', x: tgt.x + (Math.random() - 0.5) * 16, y: tgt.y + (Math.random() - 0.5) * 16, t: 0, max: 16 });
        }
        if (u.capT >= RIG_CAP_TIME) {
          u.capT = 0;
          tgt.hp = 0;                       // silent removal — no death fx, no kill credit
          u.captive = true;
          if (u.team === 1) { toast('🦖 Specimen bagged — haul the rig back to the HQ'); snd.ready(); }
          u.order = { type: 'returnCaptive' };
        }
      }
      break;
    }
    case 'returnCaptive': {
      const hq = buildings.find(b => b.team === u.team && b.type === 'hq' && b.built >= 1);
      if (!hq) { u.order = { type: 'idle' }; break; }
      const d = dist(u.x, u.y, hq.x, hq.y);
      if (d > hq.r + u.r + 8) moveToward(u, hq.x, hq.y);
      else {
        u.captive = false;
        teams[u.team].captives++;
        if (u.team === 1) {
          fxs.push({ kind: 'text', x: u.x, y: u.y - 14, t: 0, max: 60, msg: '🦖 specimen delivered' });
          toast('🦖 Live specimen delivered to the lab');
          snd.deposit();
        }
        u.order = { type: 'idle' };
      }
      break;
    }
    case 'returnEgg': {
      const hq = buildings.find(b => b.team === u.team && b.type === 'hq' && b.built >= 1);
      if (!hq) { u.order = { type: 'idle' }; break; }
      const d = dist(u.x, u.y, hq.x, hq.y);
      if (d > hq.r + u.r + 8) moveToward(u, hq.x, hq.y);
      else {
        u.eggCarry = false;
        teams[u.team].eggs++;
        if (u.team === 1) {
          fxs.push({ kind: 'text', x: u.x, y: u.y - 14, t: 0, max: 50, msg: '+1 🥚' });
          toast(`Egg secured (${teams[1].eggs} 🥚) — select the HQ to hatch a Spitter`);
          snd.deposit();
        }
        // more eggs at the clutch (or nearby)? keep hauling; otherwise back to normal life
        const next = (u.lastEggSite && nearestEggTo(u.lastEggSite.x, u.lastEggSite.y, 400))
          || nearestEggTo(u.x, u.y, 900);
        u.order = next ? { type: 'collect', target: next } : { type: 'idle' };
      }
      break;
    }
    case 'return': {
      const hq = nearestDropoff(u.team, u.x, u.y);
      if (!hq) {
        if (u.team === 1 && tick - lastNoRefinery > 12 * 60) {
          lastNoRefinery = tick;
          toast('⚠ No refinery standing — crystals have nowhere to go');
          snd.error();
        }
        u.order = { type: 'idle' }; break;
      }
      const d = dist(u.x, u.y, hq.x, hq.y);
      if (d > hq.r + u.r + 8) moveToward(u, hq.x, hq.y);
      else {
        teams[u.team].crystals += u.carry;
        teams[u.team].mined += u.carry;   // per-team tally: the M8 race reads team 2's
        if (u.team === 1) {
          stats.mined += u.carry;
          fxs.push({ kind: 'text', x: u.x, y: u.y - 14, t: 0, max: 50, msg: '+' + u.carry });
          // no deposit sound for crystals (playtest: too chatty) — eggs/captives keep it
        }
        u.carry = 0;
        const c = (u.lastCrystal && u.lastCrystal.amount > 0) ? u.lastCrystal : nearestCrystalTo(u.x, u.y, 700);
        u.order = c ? { type: 'harvest', target: c } : { type: 'idle' };
      }
      break;
    }
  }
}

// Off the plank, into the river: the bridged zone around a dam is the only
// water a ground unit can physically enter, and only the plank is footing.
// Blow the dam while a column is crossing and the whole column goes under.
const DROWN_TICKS = 26;   // ~0.45s flailing before it's over
const PLANK_HUG = 7;      // how far off the centerline a crosser may drift —
                          // under one unit-width, so nobody passes anybody
function drownSweep() {
  for (const u of units) {
    if (u.hp <= 0 || u.fly) continue;
    let wet = false;
    for (const rk of rocks) {
      if (!rk.water) continue;
      if (dist2(u.x, u.y, rk.x, rk.y) < rk.r * rk.r) { wet = true; break; }
    }
    const p = plankAt(u.x, u.y);
    if (wet && !p) {
      if ((u.drownT = (u.drownT || 0) + 1) > DROWN_TICKS) { u.drowned = true; kill(u); }
      continue;
    }
    if (u.drownT) u.drownT = 0;
    // over water, hug the dam's centerline. The grid plank is tile-quantised
    // (32px tiles, and the axis cuts them at an angle), so without this a
    // column spreads to the full tile width and crosses two abreast.
    if (wet && p && Math.abs(p.perp) > PLANK_HUG) {
      const fix = p.perp - Math.sign(p.perp) * PLANK_HUG;
      u.x += p.sa * fix; u.y -= p.ca * fix;
    }
  }
}

// keep units from stacking, and out of buildings
function separation() {
  for (let i = 0; i < units.length; i++) {
    const a = units[i];
    for (let j = i + 1; j < units.length; j++) {
      const b = units[j];
      if (!!a.fly !== !!b.fly) continue;   // different altitudes never collide
      const dx = b.x - a.x, dy = b.y - a.y;
      const min = a.r + b.r;
      if (Math.abs(dx) > min || Math.abs(dy) > min) continue;
      const d2 = dx * dx + dy * dy;
      if (d2 >= min * min || d2 === 0) continue;
      const d = Math.sqrt(d2), push = (min - d) / 2;
      let nx = dx / d, ny = dy / d;
      // on a one-file dam plank, crowding shoves fore and aft — never sideways.
      // Without this, your own column jostles itself into the river and drowns.
      const wa = walkAxisAt(a.x, a.y) || walkAxisAt(b.x, b.y);
      if (wa) { const dot = nx * wa[0] + ny * wa[1]; nx = dot * wa[0]; ny = dot * wa[1]; }
      a.x -= nx * push; a.y -= ny * push;
      b.x += nx * push; b.y += ny * push;
    }
    const aFoot = !!(IS_INF[a.type] || IS_DINO[a.type]);
    if (!a.fly) for (const rk of rocks) {
      // Shorelines still shove foot units back onto dry land, so nobody walks
      // into a river — but once a body is a full radius INSIDE the channel it
      // is swimming, not standing, and the drown sweep owns it. That is what
      // makes blowing a dam under a crossing column lethal instead of a shove.
      if (rk.water && aFoot && dist2(a.x, a.y, rk.x, rk.y) < Math.max(0, rk.r - a.r) ** 2) continue;
      if (rk.bridged && aFoot) continue;   // dam walkway — infantry and dinos cross
      if (a.ghostT > 0 && !rk.cliff && !rk.water) continue;   // ghosts slip pinch rocks — never cliffs OR open water
      const dx = a.x - rk.x, dy = a.y - rk.y;
      const min = rk.r + a.r;
      if (Math.abs(dx) > min || Math.abs(dy) > min) continue;
      const d2 = dx * dx + dy * dy;
      if (d2 >= min * min) continue;
      if (d2 === 0) { a.x = rk.x + min; continue; }
      const d = Math.sqrt(d2), push = min - d;
      a.x += (dx / d) * push; a.y += (dy / d) * push;
    }
    for (const bl of buildings) {
      if (a.fly || a.ghostT > 0) break;    // flyers hover; ghosting units slip out of pockets
      if (bl.sunk) continue;               // lowered depots/plants are drive-over ground
      if (bl.type === 'hydro' && aFoot) continue;   // crossing the dam's walkway
      const cxp = clamp(a.x, bl.x - bl.w / 2, bl.x + bl.w / 2);
      const cyp = clamp(a.y, bl.y - bl.h / 2, bl.y + bl.h / 2);
      const dx = a.x - cxp, dy = a.y - cyp;
      const d2 = dx * dx + dy * dy;
      if (d2 >= a.r * a.r) continue;
      if (d2 === 0) { a.x = bl.x + (bl.w / 2 + a.r + 2) * (a.x >= bl.x ? 1 : -1); continue; }
      const d = Math.sqrt(d2), push = a.r - d;
      a.x += (dx / d) * push; a.y += (dy / d) * push;
    }
    a.x = clamp(a.x, a.r, W - a.r);
    a.y = clamp(a.y, a.r, H - a.r);
  }
}

// ---------------- Buildings ----------------
function updateBuilding(b) {
  if (b.hp <= 0) return;   // dead this tick — no healing, firing, or spawning from the grave
  if (b.built < 1) {
    // Some structures don't raise themselves: a Hydro Dam is poured by hand and
    // an engineer has to be standing at the site the whole time (Bronson
    // 2026-07-26, "no matter what"). Lose the crew and the pour just stops.
    if (BLD[b.type].needsEngineer && !engineerNear(b)) {
      b.engStall = (b.engStall || 0) + 1;
      if (b.team === 1 && b.engStall % 300 === 60) {
        toast(`⚠ ${BLD[b.type].label} needs an engineer at the site to build`);
      }
      return;
    }
    b.engStall = 0;
    const bt = BLD[b.type].buildTime || BLD.turret.buildTime;
    b.built = Math.min(1, b.built + (b.buildBoost || 1) / bt);
    // hp accrues incrementally so combat damage during construction STICKS —
    // the old max(hp, maxHp*built) floor silently healed any non-lethal hit
    b.hp = Math.min(b.maxHp, b.hp + (b.maxHp / bt) * (b.buildBoost || 1));
    if (b.built >= 1 && b.type === 'hydro') refreshBridges();   // the walkway opens
    if (b.built >= 1 && b.type === 'refinery') {
      // refineries come online with a free harvester, C&C style
      const u = makeUnit('harvester', b.team, b.x, b.y + b.h / 2 + 16);
      const c = nearestCrystalTo(b.x, b.y, 500);
      u.order = c ? { type: 'harvest', target: c } : { type: 'idle' };
      if (b.team === 1) { toast('Refinery online — free harvester deployed'); snd.ready(); }
    }
    return;
  }
  if (b.type === 'nest') {
    // keep the brood topped up until the nest dies; the clock only runs while
    // short a dino, so each loss costs the full respawn delay
    const brood = units.filter(u => u.team === 3 && u.home === b.id).length;
    if (brood >= NEST_BROOD) { b.respawnT = 0; return; }
    b.respawnT = (b.respawnT || 0) + 1;
    if (b.respawnT >= Math.max(3 * 60, NEST_RESPAWN - dinoRage * 45)) {
      b.respawnT = 0;
      spawnSpitter(b);
    }
    return;
  }
  if (b.type === 'den') {
    // the den HUNTS. Every DEN_PACK_EVERY it births a raptor pack and sends it
    // at the nearest standing structure of ANY faction — dens don't pick sides.
    // Survivors that finish a hunt trot home and thicken the door guard.
    const pack = units.filter(u => u.team === 3 && u.home === b.id);
    for (const u of pack) {
      if (u.order.type === 'idle') u.order = { type: 'guard', hx: b.x, hy: b.y };
    }
    if (pack.length >= DEN_RAPTOR_CAP) return;   // hunts pause at cap, clock and all
    b.packT = (b.packT || 0) + 1;
    if (b.packT >= Math.max(25 * 60, DEN_PACK_EVERY - dinoRage * 90)) {
      b.packT = 0;
      let t = null, bd = 1e18;
      for (const o of buildings) {
        if (o.team === 3 || o.hp <= 0 || o.built < 1) continue;
        const d = dist2(b.x, b.y, o.x, o.y);
        if (d < bd) { bd = d; t = o; }
      }
      for (let i = 0; i < DEN_PACK_SIZE; i++) {
        const u = spawnRaptor(b);
        if (t) u.order = { type: 'attackmove', x: t.x + (i - 1) * 26, y: t.y + 26 };
      }
      // warn at the TARGET, not the den — pinging the den would leak its
      // location through the fog before the player has ever seen it
      if (t && t.team === 1) raiseAlert(t.x, t.y, '🦖 A raptor pack is on the hunt — it smells your base!');
    }
    return;
  }
  if (b.type === 'supply') {
    // logistics field: the depot slowly patches up nearby friendly buildings —
    // a weak, free engineer that never wanders off (fields from several depots stack)
    for (const o of buildings) {
      if (o.team !== b.team || o.built < 1 || o.hp <= 0 || o.hp >= o.maxHp) continue;
      if (dist2(b.x, b.y, o.x, o.y) > DEPOT_HEAL_RADIUS ** 2) continue;
      o.hp = Math.min(o.maxHp, o.hp + DEPOT_HEAL_RATE);
      if ((tick + o.id) % 60 === 0) {
        fxs.push({ kind: 'spark', x: o.x + (Math.random() - 0.5) * o.w * 0.6, y: o.y + (Math.random() - 0.5) * o.h * 0.6, t: 0, max: 18 });
      }
    }
  }
  if (b.type === 'factory' || b.type === 'airpad') {
    // repair bay: the factory fixes ground vehicles, the airpad fixes flyers —
    // for a fee. Drive home damaged, drive out patched and poorer.
    const t = teams[b.team];
    for (const u of units) {
      if (t.crystals < 1) break;
      if (u.team !== b.team || u.hp <= 0 || u.hp >= u.maxHp || !isVehicle(u)) continue;
      if (!!u.fly !== (b.type === 'airpad')) continue;
      if (dist2(b.x, b.y, u.x, u.y) > BAY_REPAIR_RADIUS ** 2) continue;
      const healed = Math.min(BAY_REPAIR_RATE, u.maxHp - u.hp, t.crystals / BAY_REPAIR_COST);
      u.hp += healed;
      t.crystals -= healed * BAY_REPAIR_COST;
      if ((tick + u.id) % 30 === 0) {
        fxs.push({ kind: 'spark', x: u.x + (Math.random() - 0.5) * 14, y: u.y + (Math.random() - 0.5) * 14, t: 0, max: 16 });
        if (b.team === 1) snd.repair();
      }
    }
  }
  if (b.cool > 0) b.cool--;
  if (b.recoil) { b.recoil *= 0.78; if (b.recoil < 0.3) b.recoil = 0; }
  if (b.dmg > 0) {
    const t = BLD[b.type].airOnly
      ? nearestEnemyUnit(b.x, b.y, b.team, b.range, true, true)
      : acquireTarget(b.x, b.y, b.team, b.range, b);
    if (t) {
      b.faceA = Math.atan2(t.y - b.y, t.x - b.x);
      if (b.cool <= 0) fire(b, t);
    }
  }
  updateProduction(b);
}

// ---------------- Bullets & FX ----------------
function updateBullets() {
  for (const p of bullets) {
    if (p.target && p.target.hp > 0) { p.tx = p.target.x; p.ty = p.target.y; }
    const d = dist(p.x, p.y, p.tx, p.ty);
    if (d <= p.speed + 2) {
      p.dead = true;
      if (p.kind === 'arc') {
        // splash at the impact point: full damage to everything hostile in the
        // radius; buildings eat the siege bonus on top
        for (const u of units) {
          if (u.team === p.team || u.hp <= 0) continue;
          if (dist(p.tx, p.ty, u.x, u.y) <= p.splash + u.r) damage(u, p.dmg, p.src);
        }
        for (const b of buildings) {
          if (b.team === p.team || b.hp <= 0) continue;
          if (dist(p.tx, p.ty, b.x, b.y) <= p.splash + b.r) damage(b, p.dmg * p.bldBonus, p.src);
        }
        fxs.push({ kind: 'boom', x: p.tx, y: p.ty, t: 0, max: 18, size: p.splash * 0.8 });
        fxExplosion(p.tx, p.ty, 18, false);
        addShake(p.tx, p.ty, 3);
        continue;
      }
      if (p.target && p.target.hp > 0 && dist(p.tx, p.ty, p.target.x, p.target.y) < (p.target.r || 12) + 14) {
        damage(p.target, p.dmg, p.src);
      }
      if (p.kind === 'shell') {
        fxs.push({ kind: 'boom', x: p.tx, y: p.ty, t: 0, max: 14, size: 14 });
        fxExplosion(p.tx, p.ty, 12, false);
      } else if (p.kind === 'rocket') {
        fxs.push({ kind: 'boom', x: p.tx, y: p.ty, t: 0, max: 12, size: 11 });
        fxExplosion(p.tx, p.ty, 9, false);
      }
      continue;
    }
    const a = Math.atan2(p.ty - p.y, p.tx - p.x);
    p.a = a;
    p.x += Math.cos(a) * p.speed;
    p.y += Math.sin(a) * p.speed;
    if (p.kind === 'rocket' && spritesReady && tick % 3 === 0) {
      fxSprite({ img: pick(SPR.puff), x: p.x, y: p.y, s0: 5, s1: 12, a0: 0.35, max: 20 });
    }
  }
  bullets = bullets.filter(p => !p.dead);
}
function updateFx() {
  // Compact IN PLACE. `fxs = fxs.filter(...)` allocated a brand-new array every
  // tick — 60 a second, each up to FX_CAP long — and the same for alerts. That
  // garbage is collected BETWEEN frames, so it never showed up in the sim or
  // draw timers while still costing frames. Measured on Bronson's Mac mini:
  // fps tracked fx COUNT and ignored unit count entirely (84u/47fx = 60fps,
  // 83u/96fx = 23fps), and suppressing fx DRAWING changed nothing — the cost
  // was the effects existing, not being drawn.
  let w = 0;
  for (let i = 0; i < fxs.length; i++) {
    const f = fxs[i];
    if (++f.t < f.max) fxs[w++] = f;
  }
  fxs.length = w;
  w = 0;
  for (let i = 0; i < alerts.length; i++) {
    const a = alerts[i];
    if (++a.t < 150) alerts[w++] = a;
  }
  alerts.length = w;
  // smoke + fire from badly damaged buildings and tanks (only where the player can see)
  if (spritesReady && tick % 7 === 0) {
    for (const b of buildings) {
      if (b.built < 1 || b.hp >= b.maxHp * 0.65 || !isVisibleAt(b.x, b.y)) continue;
      const frac = 1 - b.hp / b.maxHp;
      const sx = b.x + (Math.random() - 0.5) * b.w * 0.6, sy = b.y + (Math.random() - 0.5) * b.h * 0.6;
      if (Math.random() < frac * 1.2) fxDamageSmoke(sx, sy, 18 + frac * 14);
      if (frac > 0.5 && Math.random() < frac * 0.8) fxDamageFire(sx, sy, 10 + frac * 10);
    }
    for (const u of units) {
      if (u.type !== 'tank' || u.hp >= u.maxHp * 0.55 || !isVisibleAt(u.x, u.y)) continue;
      if (Math.random() < 0.85) fxDamageSmoke(u.x, u.y, 13);
      if (u.hp < u.maxHp * 0.3 && Math.random() < 0.5) fxDamageFire(u.x, u.y, 8);
    }
  }
}

// ---------------- Enemy AI ----------------
// site check mirroring canPlaceBuilding, minus the team-1-only rules
function aiSpotFree(type, wx, wy) {
  const d = BLD[type];
  if (wx < 40 || wy < 40 || wx > W - 40 || wy > H - 40) return false;
  for (const b of buildings) {
    if (Math.abs(wx - b.x) < (b.w + d.w) / 2 + 10 && Math.abs(wy - b.y) < (b.h + d.h) / 2 + 10) return false;
  }
  // refineries keep a wider standoff from the crystals themselves — auto-placed
  // ones were landing right on the field's doorstep (playtest feedback)
  const cGap = d.w / 2 + (type === 'refinery' ? 65 : 26);
  for (const c of crystals) if (c.amount > 0 && dist2(wx, wy, c.x, c.y) < cGap ** 2) return false;
  for (const rk of rocks) if (Math.abs(wx - rk.x) < d.w / 2 + rk.r && Math.abs(wy - rk.y) < d.h / 2 + rk.r) return false;
  if (type === 'refinery' && !crystals.some(c => c.amount > 0 && dist2(wx, wy, c.x, c.y) < REFINERY_NEAR_CRYSTAL ** 2)) return false;
  return true;
}
function aiPlace(type, nearX, nearY) {
  const t = teams[2];
  if (t.crystals < BLD[type].cost) return false;
  for (let i = 0; i < 24; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = type === 'refinery' ? 50 + Math.random() * 120 : 90 + Math.random() * 190;
    const x = clamp(nearX + Math.cos(a) * r, 60, W - 60);
    const y = clamp(nearY + Math.sin(a) * r, 60, H - 60);
    if (!aiSpotFree(type, x, y)) continue;
    t.crystals -= BLD[type].cost;
    makeBuilding(type, 2, x, y, true);
    return true;
  }
  return false;
}
// richest live crystal that has no AI drop-off yet and no nest standing guard
function aiExpansionSpot() {
  let best = null, bestAmt = 0;
  for (const c of crystals) {
    if (c.amount <= 0 || c.amount <= bestAmt) continue;
    if (buildings.some(b => b.team === 2 && (b.type === 'hq' || b.type === 'refinery') && dist2(b.x, b.y, c.x, c.y) < 500 ** 2)) continue;
    if (buildings.some(b => (b.type === 'nest' || b.type === 'den') && dist2(b.x, b.y, c.x, c.y) < 420 ** 2)) continue;
    bestAmt = c.amount; best = c;
  }
  return best;
}
// the AI plays by the same tech tree: if a requirement is missing, build that
// first; if it's already under construction, wait for it instead of stacking dupes
function aiBuild(type, nearX, nearY) {
  const miss = (BLD[type].req || []).find(r => !buildings.some(b => b.team === 2 && b.type === r && b.built >= 1));
  if (miss) {
    if (buildings.some(b => b.team === 2 && b.type === miss)) return false;   // requirement is going up — wait
    return aiBuild(miss, nearX, nearY);
  }
  return aiPlace(type, nearX, nearY);
}
function aiUpdate() {
  if (tick % 30 !== 0 || gameOver) return;
  if (mission && mission.noEnemy) return;   // scripted missions may field no red team
  const t = teams[2];
  // small passive trickle that grows over time, so the AI never fully stalls
  t.crystals += (1.2 + Math.min(3, tick / 21600)) * diff.trickle;

  const hq = buildings.find(b => b.team === 2 && b.type === 'hq');
  const rax = buildings.find(b => b.team === 2 && b.type === 'barracks');
  const harvesters = units.filter(u => u.team === 2 && u.type === 'harvester');

  if (hq && harvesters.length < 3 && hq.queue.length === 0 && t.crystals >= UNIT.harvester.cost) {
    trainUnit(hq, 'harvester');
  }
  // keep one engineer on staff for base repairs (after the opening)
  const engineers = units.filter(u => u.team === 2 && u.type === 'engineer');
  if (hq && engineers.length < 1 && tick > 120 * 60 && hq.queue.length === 0 && t.crystals >= UNIT.engineer.cost) {
    trainUnit(hq, 'engineer');
  }
  // army size ramps over time so the first assaults are survivable while learning
  const fac = buildings.find(b => b.team === 2 && b.type === 'factory' && b.built >= 1);
  const air = buildings.find(b => b.team === 2 && b.type === 'airpad' && b.built >= 1);
  const queued = [rax, fac, air].reduce((s, bld) =>
    s + (bld ? bld.queue.reduce((q, ty) => q + (ty.startsWith('up:') ? 0 : UNIT[ty].supply), 0) : 0), 0);
  const armySupply = units.reduce((s, u) => (u.team === 2 && isCombat(u) ? s + UNIT[u.type].supply : s), 0) + queued;
  const armyCap = 3 + Math.floor((tick / 3600) * diff.capRate);   // +capRate supply per minute
  if (rax && rax.queue.length < 2 && armySupply < armyCap) {
    const roll = Math.random();
    const medics = units.filter(u => u.team === 2 && u.type === 'medic').length;
    if (t.crystals >= UNIT.sniper.cost && roll < 0.3) trainUnit(rax, 'sniper');
    else if (tick > 4 * 3600 && medics < 2 && t.crystals >= UNIT.medic.cost && roll < 0.45) trainUnit(rax, 'medic');
    else if (tick > 5 * 3600 && t.crystals >= UNIT.rocket.cost && roll < 0.6) trainUnit(rax, 'rocket');
    else if (t.crystals >= UNIT.marine.cost) trainUnit(rax, 'marine');
  }
  if (fac && fac.queue.length < 2 && armySupply < armyCap) {
    const roll = Math.random();
    // artillery only after 4 min — early arty waves would out-range every defense
    if (tick > 4 * 3600 && t.crystals >= UNIT.artillery.cost && roll < 0.15) trainUnit(fac, 'artillery');
    else if (t.crystals >= UNIT.tank.cost && roll < 0.45) trainUnit(fac, 'tank');
    else if (t.crystals >= UNIT.raider.cost && roll < 0.75) trainUnit(fac, 'raider');
  }
  // --- base building: fix supply crunches, rebuild losses, expand when flush ---
  if (tick % 150 === 0 && hq) {
    const have = (ty) => buildings.filter(b => b.team === 2 && b.type === ty).length;
    if (lowPower(2) && t.crystals > BLD.power.cost + 50
        && !buildings.some(b => b.team === 2 && b.type === 'power' && b.built < 1)) {
      aiBuild('power', hq.x, hq.y);   // a browned-out army loses wars — fix the grid first (one at a time)
    } else if (supplyMax(2) - supplyUsed(2) < 5 && supplyMax(2) < SUPPLY_HARD_CAP && t.crystals > BLD.supply.cost + 100) {
      aiBuild('supply', hq.x, hq.y);
    } else if (!buildings.some(b => b.team === 2 && b.type === 'refinery')
               && t.crystals > BLD.refinery.cost) {
      // no refinery in ANY state = no income at all now — rebuild before anything
      // military (built<1 counts: one rebuild at a time, same rule as power)
      const c = nearestCrystalTo(hq.x, hq.y, 900);
      aiBuild('refinery', c ? c.x + 70 : hq.x, c ? c.y + 70 : hq.y);
    } else if (!have('barracks') && t.crystals > BLD.barracks.cost) {
      aiBuild('barracks', hq.x, hq.y);
    } else if (!have('factory') && t.crystals > BLD.factory.cost + 150) {
      aiBuild('factory', hq.x, hq.y);
    } else if (!have('airpad') && tick > 5 * 3600 && t.crystals > BLD.airpad.cost + 250) {
      aiBuild('airpad', hq.x, hq.y);
    } else if (units.some(u => u.team === 1 && u.fly) && have('flak') < 2 && t.crystals > 300) {
      aiBuild('flak', hq.x, hq.y);   // player went air — answer with AA
    } else if (diff.aiNukes && !have('silo') && tick > 8 * 3600 && t.crystals > BLD.silo.cost + 400) {
      aiBuild('silo', hq.x, hq.y);
    } else if (t.crystals > 400 && have('refinery') < 3 && tick > 4 * 3600) {
      const spot = aiExpansionSpot();
      // aiBuild, not aiPlace: refineries need a depot now — if the AI somehow lost
      // every depot, this builds one at the expansion (an outpost wants supply anyway)
      if (spot) aiBuild('refinery', spot.x + 60, spot.y + 60);
    }
  }
  // nuclear ambitions (Hard / Spec Ops only)
  if (diff.aiNukes) {
    const silo = buildings.find(b => b.team === 2 && b.type === 'silo' && b.built >= 1);
    if (silo) {
      if (!silo.warhead && t.crystals >= NUKE.hq.cost + 500) buyNuke(silo, 'hq');
      else if (!silo.warhead && t.crystals >= NUKE.tac.cost + 500) buyNuke(silo, 'tac');
      else if (silo.warhead && Math.random() < 0.02) {
        let target = null;
        if (silo.warhead === 'hq') target = buildings.find(b => b.team === 1 && b.type === 'hq');
        else {
          const cands = buildings.filter(b => b.team === 1 && b.type !== 'hq' &&
            !buildings.some(h => h.type === 'hq' && dist2(b.x, b.y, h.x, h.y) < NUKE_HQ_EXCLUSION ** 2));
          target = cands[Math.floor(Math.random() * cands.length)];
        }
        if (target) launchNuke(silo, target.x, target.y);
      }
    }
  }
  // gunships arrive mid-game — the AI holds off so early waves stay learnable
  if (air && air.queue.length < 1 && armySupply < armyCap && tick > 6 * 3600 && Math.random() < 0.35) {
    if (tick > 9 * 3600 && t.crystals >= UNIT.harrier.cost && Math.random() < 0.4) trainUnit(air, 'harrier');
    else if (t.crystals >= UNIT.gunship.cost) trainUnit(air, 'gunship');
  }
  // once the economy is rolling, the AI researches upgrades with spare cash
  if (diff.aiUpgrades && tick > 5 * 3600 && t.crystals > 350 && Math.random() < 0.06) {
    const keys = Object.keys(UPG);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const host = buildings.find(b => b.team === 2 && b.type === UPG[key].at && b.built >= 1 && b.queue.length === 0);
    if (host) startResearch(host, key);
  }
}
function waveUpdate() {
  if (gameOver) return;
  if (mission && (mission.noEnemy || mission.noWaves)) return;
  if (tick < waveAt) return;
  waveNum++;
  waveAt = tick + Math.max(55, 82 - waveNum * 3) * 60 * diff.waveEvery;
  const targ = buildings.find(b => b.team === 1 && b.type === 'hq')
            || buildings.find(b => b.team === 1)
            || units.find(u => u.team === 1);
  if (!targ) return;
  let sent = 0;
  for (const u of units) {
    if (u.team !== 2) continue;
    if (isCombat(u)) {
      const p = spreadPoint(targ.x, targ.y, sent++);
      u.order = { type: 'attackmove', x: p.x, y: p.y };
    } else if (u.type === 'medic') {
      const p = spreadPoint(targ.x, targ.y, sent);
      u.order = { type: 'move', x: p.x, y: p.y };   // tags along, heals on arrival
    }
  }
  if (sent > 0) { toast('⚔ Enemy assault incoming!'); snd.alarm(); }
}

// ---------------- End condition ----------------
// the verdict overlay is delayed so the HQ explosion can play out — but the
// pending timeout must die with the world, or it fires over the menu / next game
let overlayTimer = null;
function overlayStats() {
  const mins = Math.floor(tick / 3600), secs = Math.floor((tick % 3600) / 60);
  document.getElementById('ov-stats').innerHTML =
    `<div><b>${mins}:${String(secs).padStart(2, '0')}</b><span>match time</span></div>` +
    `<div><b>${stats.built}</b><span>units fielded</span></div>` +
    `<div><b>${stats.lost}</b><span>units lost</span></div>` +
    `<div><b>${stats.kills}</b><span>kills</span></div>` +
    `<div><b>${Math.floor(stats.mined)}</b><span>crystals mined</span></div>`;
}
function checkEnd() {
  if (gameOver) return;
  const pAlive = buildings.some(b => b.team === 1 && b.type === 'hq');
  if (mission) {
    // once every win objective is done the outro is ceremony — no defeat path
    // may fire during the drain (M5: the exfil latches, the transport is away,
    // and the LZ garrison gunning down a straggler must not flip the verdict)
    if (ms && ms.outroDone) return;
    // campaign: victory comes from objectives (missionUpdate); HQ loss is always defeat
    // — except on commando missions, where there IS no HQ and the squad is the
    // mission: you lose when the last of them falls.
    if (mission.noBase) {
      if (tick > 120 && !units.some(u => u.team === 1 && u.hp > 0)) missionEnd(false);
      return;
    }
    if (!pAlive) missionEnd(false);
    return;
  }
  const eAlive = buildings.some(b => b.team === 2 && b.type === 'hq');
  if (!pAlive || !eAlive) {
    gameOver = pAlive ? 'win' : 'lose';
    // let the HQ explosion play out before the verdict drops
    overlayTimer = setTimeout(() => {
      elOvTitle.textContent = pAlive ? 'VICTORY' : 'DEFEAT';
      elOvTitle.className = pAlive ? 'win' : 'lose';
      elOvSub.textContent = pAlive
        ? 'The enemy headquarters is rubble. The crystal fields are yours, Commander.'
        : 'Your headquarters has fallen. The crystals belong to the enemy… for now.';
      overlayStats();
      document.getElementById('btn-again').textContent = '↻ Play again';
      elOverlay.classList.remove('hidden');
      beep(pAlive ? 520 : 220, 0.5, 'sine', 0.06, pAlive ? 1040 : 80);
    }, 1400);
  }
}

// ---------------- Input ----------------
const mouse = { sx: 0, sy: 0, wx: 0, wy: 0, overCanvas: false, inWindow: false };
let dragging = false, dragStart = null;
let selection = [];
let attackMoveMode = false;
let placing = null;                  // 'turret' while placing
const groups = {};
const keys = {};

function setCursor() {
  cv.style.cursor = (attackMoveMode || placing || nukeTargeting) ? 'crosshair' : 'default';
}
function pruneSelection() {
  selection = selection.filter(e => e.hp > 0 && (e.kind !== 'unit' || units.includes(e)));
}
// H: jump the camera home. The HQ if there is one, otherwise the centre of
// mass of whatever the player still owns — commando missions have no base.
function goHome() {
  const hq = buildings.find(b => b.team === 1 && b.type === 'hq' && b.hp > 0);
  let x, y;
  if (hq) { x = hq.x; y = hq.y; }
  else {
    const mine = units.filter(u => u.team === 1 && u.hp > 0);
    if (!mine.length) return;
    x = mine.reduce((a, u) => a + u.x, 0) / mine.length;
    y = mine.reduce((a, u) => a + u.y, 0) / mine.length;
  }
  camFocus = null;                 // a manual jump outranks any event pan
  cam.x = x - view.w / 2; cam.y = y - view.h / 2;
  clampCam();
}
const canHunker = (u) => u.type === 'marine' || u.type === 'artillery' || u.type === 'sniper';
function toggleHunker() {
  const diggers = selection.filter(s => s.kind === 'unit' && canHunker(s) && s.hp > 0);
  if (!diggers.length) return;
  const allDown = diggers.every(m => m.order.type === 'hunker');
  for (const m of diggers) m.order = allDown ? { type: 'idle' } : { type: 'hunker' };
  if (!allDown) {
    const label = diggers.every(d => d.type === 'artillery') ? 'Artillery dug in'
      : diggers.every(d => d.type === 'marine') ? 'Marines hunkered down'
      : diggers.every(d => d.type === 'sniper') ? 'Snipers gone prone' : 'Troops dug in';
    toast(label + ' — half damage, holding position');
  }
  beep(allDown ? 500 : 380, 0.07, 'triangle', 0.04);
}

cv.addEventListener('mousemove', (e) => {
  mouse.sx = e.clientX; mouse.sy = e.clientY;
  mouse.overCanvas = true;
});
window.addEventListener('mousemove', (e) => {
  mouse.sx = e.clientX; mouse.sy = e.clientY;
  mouse.inWindow = true;
});
document.addEventListener('mouseleave', () => { mouse.inWindow = false; });

cv.addEventListener('mousedown', (e) => {
  audioInit();
  if (e.button !== 0) return;
  if (skipOutro()) return;   // debrief running: click through to the scoreboard
  const wx = mouse.sx + cam.x, wy = mouse.sy + cam.y;
  if (nukeTargeting) {
    if (nukeTargeting.warhead && launchNuke(nukeTargeting, wx, wy)) { nukeTargeting = null; setCursor(); }
    return;
  }
  if (placing) { tryPlaceBuilding(placing, wx, wy); return; }
  if (attackMoveMode) {
    commandMove(selection, wx, wy, true);
    attackMoveMode = false; setCursor();
    fxs.push({ kind: 'ping', x: wx, y: wy, t: 0, max: 22, color: '#e0564a' });
    return;
  }
  dragging = true;
  dragStart = { x: wx, y: wy };
});
window.addEventListener('mouseup', (e) => {
  if (e.button !== 0 || !dragging) return;
  dragging = false;
  const wx = mouse.sx + cam.x, wy = mouse.sy + cam.y;
  const x0 = Math.min(dragStart.x, wx), x1 = Math.max(dragStart.x, wx);
  const y0 = Math.min(dragStart.y, wy), y1 = Math.max(dragStart.y, wy);
  if (x1 - x0 < 6 && y1 - y0 < 6) {
    // point select (own things only)
    const t = thingAtPoint(wx, wy);
    selection = (t && t.team === 1 && t.hp > 0) ? [t] : [];
  } else {
    const picked = units.filter(u => u.team === 1 && u.x >= x0 && u.x <= x1 && u.y >= y0 && u.y <= y1);
    if (picked.length) selection = picked;
    else {
      const b = buildings.find(b => b.team === 1 && b.x >= x0 && b.x <= x1 && b.y >= y0 && b.y <= y1);
      selection = b ? [b] : [];
    }
  }
  if (selection.length) snd.select();   // soft select blip
});
cv.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  audioInit();
  const wx = mouse.sx + cam.x, wy = mouse.sy + cam.y;
  if (placing || attackMoveMode || nukeTargeting) { placing = null; attackMoveMode = false; nukeTargeting = null; setCursor(); return; }
  pruneSelection();
  if (!selection.length) return;

  const hasUnits = selection.some(s => s.kind === 'unit');
  if (!hasUnits) {
    // building(s) selected → set rally
    for (const b of selection) if (b.rally) b.rally = { x: wx, y: wy };
    fxs.push({ kind: 'ping', x: wx, y: wy, t: 0, max: 22, color: '#8fd8cf' });
    return;
  }
  const t = thingAtPoint(wx, wy);
  if (t && t.kind === 'crystal') commandHarvest(selection, t);
  else if (t && t.kind === 'unit' && t.team === 1 && t.type === 'apc'
           && selection.some(s => s.kind === 'unit' && IS_INF[s.type] && s !== t)) {
    for (const s of selection) {
      if (s.kind !== 'unit' || s === t) continue;
      if (s.type === 'engineer' && t.hp < t.maxHp) s.order = { type: 'heal', target: t };
      else if (IS_INF[s.type]) s.order = { type: 'board', target: t };
    }
    fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#8fd8cf' });
  }
  else if (t && t.kind === 'unit' && t.team === 1 && t.hp < t.maxHp
           && selection.some(s => s.kind === 'unit' &&
                ((s.type === 'medic' && isFlesh(t)) || (s.type === 'engineer' && isVehicle(t))))) {
    for (const s of selection) {
      if (s.kind !== 'unit') continue;
      if ((s.type === 'medic' && isFlesh(t)) || (s.type === 'engineer' && isVehicle(t))) {
        s.order = { type: 'heal', target: t };
      }
    }
    fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#8ce6a0' });
  }
  else if (t && t.kind === 'egg') {
    commandCollect(selection, t);
    fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#e8e2cc' });
  }
  else if (t && t.kind === 'unit' && t.specimen && t.team !== 1
           && selection.some(s => s.kind === 'unit' && s.type === 'rig')) {
    // capture rigs take THE specimen — the rig is calibrated for the marked
    // target only; everyone else holds their orders so an over-eager escort
    // doesn't gun down the science project
    for (const s of selection) {
      if (s.kind === 'unit' && s.type === 'rig') { s.capT = 0; s.order = { type: 'capture', target: t }; }
    }
    fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#8fc94a' });
  }
  else if (t && t.kind === 'unit' && t.team === 3 && !t.specimen
           && selection.some(s => s.kind === 'unit' && s.type === 'rig')) {
    // rig + ordinary wildlife: escorts engage as usual, the rig holds — it
    // can only capture the marked specimen
    toast('The rig is calibrated for the marked specimen — it can\'t capture wild dinos');
    commandAttack(selection.filter(s => !(s.kind === 'unit' && s.type === 'rig')), t);
    fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#e0564a' });
  }
  else if (t && t.kind === 'unit' && t.specimen) {
    // no rig in the selection: a protected specimen can't be attacked — walk over instead
    commandMove(selection, wx, wy, false);
    fxs.push({ kind: 'ping', x: wx, y: wy, t: 0, max: 22, color: '#8fc94a' });
  }
  else if (t && t.kind === 'building' && t.team === 1 && selection.some(s => s.kind === 'unit' && s.type === 'engineer')) {
    commandRepair(selection, t);
    fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#8ce6a0' });
  }
  else if (t && t.team && t.team !== 1) { commandAttack(selection, t); fxs.push({ kind: 'ping', x: t.x, y: t.y, t: 0, max: 22, color: '#e0564a' }); }
  else { commandMove(selection, wx, wy, false); fxs.push({ kind: 'ping', x: wx, y: wy, t: 0, max: 22, color: '#8fd8cf' }); }
});
document.addEventListener('contextmenu', (e) => e.preventDefault());

// minimap
let miniDown = false;
function miniToCam(e) {
  const r = mini.getBoundingClientRect();
  const fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
  cam.x = fx * W - view.w / 2;
  cam.y = fy * H - view.h / 2;
  clampCam();
}
mini.addEventListener('mousedown', (e) => { audioInit(); if (e.button === 0) { miniDown = true; miniToCam(e); } });
window.addEventListener('mousemove', (e) => { if (miniDown) miniToCam(e); });
window.addEventListener('mouseup', () => { miniDown = false; });
mini.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  audioInit();
  pruneSelection();
  if (!selection.some(s => s.kind === 'unit')) return;
  const r = mini.getBoundingClientRect();
  const wx = clamp(((e.clientX - r.left) / r.width) * W, 20, W - 20);
  const wy = clamp(((e.clientY - r.top) / r.height) * H, 20, H - 20);
  commandMove(selection, wx, wy, false);
  fxs.push({ kind: 'ping', x: wx, y: wy, t: 0, max: 22, color: '#8fd8cf' });
});

// keyboard
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code.startsWith('Arrow')) e.preventDefault();
  audioInit();
  if (!started) return;   // menu / briefing on screen — gameplay hotkeys stay cold

  if (e.code === 'Escape') {
    if (!elHelp.classList.contains('hidden')) { setHelp(false); return; }
    attackMoveMode = false; placing = null; nukeTargeting = null; selection = []; setCursor(); return;
  }
  if (e.code === 'KeyM') { muted = !muted; btnMute.textContent = muted ? '🔇' : '🔊'; if (muted) stopVoice(); return; }
  if (e.code === 'KeyP') { togglePause(); return; }
  if (e.code === 'KeyF') { toggleFogMemory(); return; }
  if (e.code === 'Backquote') {   // dev mode: reveal the whole map
    devReveal = !devReveal;
    updateFog();
    toast(devReveal ? '🔧 Dev: full map revealed' : '🔧 Dev: fog restored');
    return;
  }
  if (gameOver) return;
  if (skipOutro()) return;   // debrief running: any key jumps to the scoreboard

  pruneSelection();
  if (e.code === KEY_AMOVE() && selection.some(s => s.kind === 'unit' && isCombat(s))) { attackMoveMode = true; placing = null; nukeTargeting = null; setCursor(); return; }
  if (e.code === KEY_STOP()) { for (const s of selection) if (s.kind === 'unit') s.order = { type: 'idle' }; return; }
  // H = home: snap the camera to base (Bronson 2026-07-27 — hunker moved to D).
  // With no HQ (commando missions) it centres on whatever you still have.
  if (e.code === 'KeyH') { goHome(); return; }
  // D = hunker. A building that trains still owns D as its 5th card slot, so
  // production wins when one is selected — the two can't both be selected.
  // I injects a repeatable stress wave (dev only). Each press adds the SAME
  // increment at the camera centre, so pressing it N times walks the load up a
  // known curve and every screenshot is comparable — across presses, across
  // builds, and across machines. Beats trying to reproduce "a big battle" by
  // hand, which is what made the earlier readings hard to line up.
  if (e.code === 'KeyI' && devMode) {
    const cxw = cam.x + view.w / 2, cyw = cam.y + view.h / 2;
    const tough = (t, team, x, y) => {
      const u = makeUnit(t, team, x, y);
      u.maxHp = 999999; u.hp = 999999;   // nothing dies: the load holds still while you read it
      return u;
    };
    const mine = [], theirs = [];
    for (let i = 0; i < 10; i++) mine.push(tough('marine', 1, cxw - 190 + (i % 5) * 26, cyw - 60 + ((i / 5) | 0) * 26));
    for (let i = 0; i < 4; i++) mine.push(tough('tank', 1, cxw - 250, cyw + 40 + i * 30));
    for (let i = 0; i < 10; i++) theirs.push(tough('marine', 2, cxw + 150 + (i % 5) * 26, cyw - 40 + ((i / 5) | 0) * 26));
    for (let i = 0; i < 4; i++) theirs.push(tough('tank', 2, cxw + 240, cyw + 40 + i * 30));
    mine.forEach(u => u.order = { type: 'attackmove', x: cxw + 220, y: cyw });
    theirs.forEach(u => u.order = { type: 'attackmove', x: cxw - 220, y: cyw });
    stressWaves++;
    toast(`🛠 Stress wave ${stressWaves} — ${units.length} units. Read the u/fx counts.`);
    return;
  }
  // K cycles effect DRAWING off (dev only) — a measurement tool, not a setting
  if (e.code === 'KeyK' && devMode) {
    fxDraw = (fxDraw + 1) % 3;
    toast(['🛠 Effects: drawing ALL', '🛠 Effects: drawing HALF', '🛠 Effects: drawing NONE (still simulated)'][fxDraw]);
    return;
  }
  if (e.code === KEY_HUNKER() && selection.some(s => s.kind === 'unit' && canHunker(s))
      && !selection.some(s => s.kind === 'building' && BLD[s.type].trains)) { toggleHunker(); return; }
  if (e.code === 'KeyU' && selection.some(s => s.kind === 'unit' && s.cargo && s.cargo.length)) {
    for (const s of selection) if (s.kind === 'unit' && s.cargo && s.cargo.length) unloadAPC(s);
    return;
  }
  // silo controls: Q/W buy warheads, L opens targeting
  const silo = selection.length === 1 && selection[0].kind === 'building'
    && selection[0].type === 'silo' && selection[0].built >= 1 ? selection[0] : null;
  if (silo) {
    if (e.code === 'KeyQ') { buyNuke(silo, 'tac'); lastCardSig = ''; return; }
    if (e.code === 'KeyW') { buyNuke(silo, 'hq'); lastCardSig = ''; return; }
    if (e.code === 'KeyL' && silo.warhead) {
      nukeTargeting = silo; placing = null; attackMoveMode = false; setCursor();
      toast('Pick a target — right-click to abort');
      return;
    }
  }
  if (!e.metaKey && !e.ctrlKey) {
    const bm = BUILD_MENU.find(([, k]) => e.code === 'Key' + k);
    if (bm) { startPlacing(bm[0]); return; }
  }

  // lower/raise a selected depot or power plant (no trains, so Q is free)
  if (e.code === 'KeyQ' && !selection.some(s => s.kind === 'building' && BLD[s.type].trains)) {
    const sb = selection.find(s => s.kind === 'building' && BLD[s.type].sink && s.built >= 1);
    if (sb) { toggleSink(sb); return; }
  }
  // production/research hotkeys on a selected building
  const prodKeys = { KeyQ: 0, KeyW: 1, KeyE: 2, KeyR: 3, KeyD: 4, KeyZ: 5 };
  if (prodKeys[e.code] !== undefined) {
    const b = selection.find(s => s.kind === 'building' && BLD[s.type].trains);
    if (b) {
      const a = cardActions(b)[prodKeys[e.code]];
      if (a) {
        if (a.kind === 'train') trainUnit(b, a.t);
        else if (a.kind === 'hatch') hatchSpitter(b);
        else startResearch(b, a.k);
      }
      return;
    }
  }
  // control groups 1-5
  const m = e.code.match(/^Digit([1-5])$/);
  if (m) {
    if (e.ctrlKey || e.metaKey) { groups[m[1]] = [...selection]; toast('Group ' + m[1] + ' saved'); e.preventDefault(); }
    else if (groups[m[1]]) { selection = groups[m[1]].filter(u => u.hp > 0 && (u.kind !== 'unit' || units.includes(u))); }
  }
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });

// controls modal: pauses the sim while open; shows automatically at game start
let paused = false;       // help modal open
let userPaused = false;   // the pause button / P key
let quitArm = 0;          // quit needs two clicks within 3s
function togglePause() {
  if (!started || gameOver) return;
  userPaused = !userPaused;
  elPauseBanner.classList.toggle('hidden', !userPaused);
  btnPause.textContent = userPaused ? '▶ resume' : '⏸ pause';
  syncVoicePause();
}
function quitToMenu() {
  started = false;
  userPaused = false;
  quitArm = 0;
  elPauseBanner.classList.add('hidden');
  btnPause.textContent = '⏸ pause';
  btnQuit.textContent = '⏹ menu';
  setHelp(false);
  resetWorld();
  renderMenu();
  elMenu.classList.remove('hidden');
}
btnPause.addEventListener('click', () => { audioInit(); togglePause(); });
btnQuit.addEventListener('click', () => {
  audioInit();
  if (!started) return;
  if (Date.now() - quitArm < 3000) { quitToMenu(); return; }
  quitArm = Date.now();
  btnQuit.textContent = '⏹ sure?';
  toast('Click again to abandon the match');
  setTimeout(() => { if (Date.now() - quitArm >= 2900) btnQuit.textContent = '⏹ menu'; }, 3100);
});
function setHelp(open) {
  elHelp.classList.toggle('hidden', !open);
  paused = open;
  syncVoicePause();
}
btnHelp.addEventListener('click', () => { audioInit(); setHelp(elHelp.classList.contains('hidden')); });
document.getElementById('btn-help-close').addEventListener('click', () => { audioInit(); setHelp(false); });
btnMute.addEventListener('click', () => { audioInit(); muted = !muted; btnMute.textContent = muted ? '🔇' : '🔊'; if (muted) stopVoice(); });
function toggleFogMemory() {
  fogMemory = !fogMemory;
  btnFog.textContent = fogMemory ? '🌫 map: remembered' : '🌫 map: re-fogs';
  updateFog();
  toast(fogMemory ? 'Explored ground stays visible' : 'Ground re-fogs when unwatched');
}
btnFog.addEventListener('click', () => { audioInit(); toggleFogMemory(); });

// building placement
function startPlacing(type) {
  if (!missionAllows('bld', type)) {
    toast(`${BLD[type].label} is not authorised for this operation.`);
    snd.error();
    return;
  }
  if (!hasTech(1, type)) {
    toast(`${BLD[type].label} requires: ${techLabel(type)}`);
    snd.error();
    return;
  }
  placing = type; attackMoveMode = false; nukeTargeting = null; setCursor(); lastCardSig = '';
}
function canPlaceBuilding(type, wx, wy) {
  const d = BLD[type];
  if (!missionAllows('bld', type)) return false;
  if (!hasTech(1, type)) return false;
  if (teams[1].crystals < d.cost) return false;
  // no crew, no pour — checked at placement so the ghost turns red rather than
  // letting you spend 400 on a site nobody can raise
  if (d.needsEngineer && !units.some(u => u.hp > 0 && u.team === 1 && u.type === 'engineer')) return false;
  if (wx < 40 || wy < 40 || wx > W - 40 || wy > H - 40) return false;
  // no building on ground you haven't scouted — the whole footprint must be
  // explored (playtest 2026-07-25: placing into black shroud felt wrong and
  // the red ghost leaked terrain info about unseen rocks)
  for (const [ox, oy] of [[0, 0], [-d.w / 2, -d.h / 2], [d.w / 2, -d.h / 2], [-d.w / 2, d.h / 2], [d.w / 2, d.h / 2]]) {
    const tx = Math.floor((wx + ox) / TILE), ty = Math.floor((wy + oy) / TILE);
    if (tx < 0 || ty < 0 || tx >= MAP_W || ty >= MAP_H || !explored[ty * MAP_W + tx]) return false;
  }
  for (const b of buildings) {
    if (Math.abs(wx - b.x) < (b.w + d.w) / 2 + 10 && Math.abs(wy - b.y) < (b.h + d.h) / 2 + 10) return false;
  }
  for (const c of crystals) if (c.amount > 0 && dist2(wx, wy, c.x, c.y) < (d.w / 2 + 26) ** 2) return false;
  // water buildings (hydro) invert the terrain rule: they stand ON a channel.
  // Water never blocks them; everything else still does; dry buildings still
  // reject water like any rock.
  for (const rk of rocks) {
    if (rk.water && d.water) continue;
    if (Math.abs(wx - rk.x) < d.w / 2 + rk.r && Math.abs(wy - rk.y) < d.h / 2 + rk.r) return false;
  }
  if (d.water) {
    return rocks.some(rk => rk.water && dist2(wx, wy, rk.x, rk.y) < rk.r * rk.r);
  }
  if (type === 'refinery') {
    return crystals.some(c => c.amount > 0 && dist2(wx, wy, c.x, c.y) < REFINERY_NEAR_CRYSTAL ** 2);
  }
  // defense towers must anchor to a permanent structure (HQ/Barracks/Factory/…) — no tower-to-tower creep
  const isDef = (t) => t === 'turret' || t === 'flak';
  return buildings.some(b => b.team === 1 && (!isDef(type) || !isDef(b.type)) &&
    dist2(wx, wy, b.x, b.y) < PLACE_NEAR_BASE ** 2);
}
function tryPlaceBuilding(type, wx, wy) {
  const d = BLD[type];
  if (!canPlaceBuilding(type, wx, wy)) {
    if (!hasTech(1, type)) toast(`${d.label} requires: ${techLabel(type)}`);
    else if (teams[1].crystals < d.cost) toast(`Not enough crystals (${d.cost} ⬡)`);
    else if (!explored[Math.floor(wy / TILE) * MAP_W + Math.floor(wx / TILE)]) toast('That ground is unscouted — walk a unit out there first');
    else if (d.needsEngineer && !units.some(u => u.hp > 0 && u.team === 1 && u.type === 'engineer'))
      toast(`${d.label} is built by hand — train an Engineer first (HQ)`);
    else if (BLD[type].water) toast('The dam needs moving water — place it on a river channel');
    else if (type === 'refinery') toast('Build the refinery next to a crystal patch, on open ground');
    else toast('Build closer to your base, on open ground');
    snd.error();
    return;
  }
  teams[1].crystals -= d.cost;
  const nb = makeBuilding(type, 1, wx, wy, true);
  if (d.water) nb.a = riverAngleAt(wx, wy) + Math.PI / 2;   // span the channel
  if (d.needsEngineer) {
    // send the crew without making the player micro it: prefer one already
    // selected, else the nearest engineer not carrying something more urgent
    let eng = selection.find(u => u.kind === 'unit' && u.type === 'engineer' && u.hp > 0);
    if (!eng) {
      let bd = 1e18;
      for (const u of units) {
        if (u.hp <= 0 || u.team !== 1 || u.type !== 'engineer') continue;
        const dd = dist2(u.x, u.y, wx, wy);
        if (dd < bd) { bd = dd; eng = u; }
      }
    }
    if (eng) { eng.order = { type: 'build', target: nb }; toast(`Engineer dispatched — ${d.label} needs a crew on site`); }
  }
  placing = null; setCursor();
  beep(440, 0.09, 'sine', 0.05);
}

// camera pan (arrows + screen edge)
function updateCamera() {
  const sp = 16;
  let manual = false;
  if (keys['ArrowLeft'] || (wasdPanning() && keys['KeyA'])) { cam.x -= sp; manual = true; }
  if (keys['ArrowRight'] || (wasdPanning() && keys['KeyD'])) { cam.x += sp; manual = true; }
  if (keys['ArrowUp'] || (wasdPanning() && keys['KeyW'])) { cam.y -= sp; manual = true; }
  if (keys['ArrowDown'] || (wasdPanning() && keys['KeyS'])) { cam.y += sp; manual = true; }
  if (mouse.inWindow && !miniDown) {
    const edge = 14;
    if (mouse.sx < edge) { cam.x -= sp; manual = true; }
    if (mouse.sx > view.w - edge) { cam.x += sp; manual = true; }
    if (mouse.sy < edge) { cam.y -= sp; manual = true; }
    if (mouse.sy > view.h - edge) { cam.y += sp; manual = true; }
  }
  // the event camera yields to the player — but only once it has actually
  // arrived, so an idle mouse parked at a screen edge can't cancel the swing
  if (camFocus && camFocus.lock > 0) camFocus.lock--;
  else if (manual || miniDown) camFocus = null;
  if (camFocus) {
    cam.x += (camFocus.x - view.w / 2 - cam.x) * 0.22;
    cam.y += (camFocus.y - view.h / 2 - cam.y) * 0.22;
    if (--camFocus.hold <= 0) camFocus = null;
  }
  clampCam();
  mouse.wx = mouse.sx + cam.x;
  mouse.wy = mouse.sy + cam.y;
}

// ---------------- UI ----------------
let toastTimer = null;
function toast(msg) {
  elToast.textContent = msg;
  elToast.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { elToast.style.opacity = '0'; }, 2400);
}

// the Q/W/E/R/D slots on a production building: its units, research, then specials
function cardActions(b) {
  const acts = BLD[b.type].trains
    .filter(t => b.team !== 1 || missionAllows('unit', t))
    .map(t => ({ kind: 'train', t }));
  for (const k in UPG) if (UPG[k].at === b.type) acts.push({ kind: 'up', k });
  // captured dino eggs hatch at the lab. The button only appears once eggs
  // exist (egg-chip precedent) — with zero eggs it ate a full card row and
  // pushed the construction buttons below the fold. Last slot, so Q/W/E stay
  // stable and R simply appears with the first egg.
  if (b.type === 'hq' && teams[b.team].eggs > 0) acts.push({ kind: 'hatch' });
  return acts;
}

// lower a depot/plant flush with the ground so units drive over it (SC2-style).
// Function is fully retained while sunk — supply, power gen, and the depot
// repair field all keep working; it just stops being a wall. Still attackable.
function toggleSink(b) {
  if (!BLD[b.type].sink || b.built < 1 || b.hp <= 0) return;
  b.sunk = !b.sunk;
  // raising with units on top is safe: separation() ejects footprint overlaps
  // to the nearest face on the next tick
  if (b.team === 1) {
    toast(b.sunk ? `⬇ ${BLD[b.type].label} lowered — units can drive over it` : `⬆ ${BLD[b.type].label} raised`);
    snd.select();
  }
  lastCardSig = '';
}

// deploy a spitter from a banked egg — instant, no queue: it's hatching, not manufacturing
function hatchSpitter(b) {
  const t = teams[b.team];
  if (t.eggs < 1) {
    if (b.team === 1) { toast('No eggs — destroy a dino nest and haul its clutch home'); snd.error(); }
    return false;
  }
  const pack = units.filter(u => u.team === b.team && u.type === 'spitter').length;
  if (pack >= SPITTER_CAP) {
    if (b.team === 1) { toast(`Your spitter pack is full (${SPITTER_CAP}) — the eggs will keep`); snd.error(); }
    return false;
  }
  if (supplyUsed(b.team) + UNIT.spitter.supply > supplyMax(b.team)) {
    if (b.team === 1) { toast('Supply limit reached — build a Supply Depot first'); snd.error(); }
    return false;
  }
  t.eggs--;
  spawnFromBuilding(b, 'spitter');
  if (b.team === 1) toast(`🦖 Spitter hatched! (${t.eggs} 🥚 left)`);
  return true;
}

// selling: 50% of cost back (scaled by construction progress), queued items
// refunded in full — they were paid for but never existed. Two-click confirm
// (the arm expires in 4s) so a mis-click can't vaporize a factory.
let sellArmId = null, sellArmAt = 0;
function sellBuilding(b) {
  if (b.type === 'hq') { toast("The HQ is not for sale — it's the expedition"); snd.error(); return; }
  let refund = Math.floor(BLD[b.type].cost * 0.5 * Math.min(1, b.built));
  for (const q of (b.queue || [])) {
    if (q.startsWith('up:')) {
      const g = UPG[q.slice(3)];
      refund += g.cost[Math.min(g.cost.length - 1, teams[b.team].up[q.slice(3)])];
    } else refund += UNIT[q].cost;
  }
  teams[b.team].crystals += refund;
  b.hp = 0;   // stale order targets see a dead building
  if (nukeTargeting === b) nukeTargeting = null;
  const i = buildings.indexOf(b);
  if (i >= 0) buildings.splice(i, 1);
  selection = selection.filter(x => x !== b);
  for (let k = 0; k < 6; k++) {
    fxSprite && spritesReady && fxSprite({
      img: pick(SPR.puff), x: b.x + (Math.random() - 0.5) * b.w, y: b.y + (Math.random() - 0.5) * b.h,
      vx: (Math.random() - 0.5) * 0.6, vy: -0.3 - Math.random() * 0.4, s0: 8, s1: 22, a0: 0.35, max: 30,
    });
  }
  if (b.type === 'hydro') refreshBridges();
  toast('Sold ' + BLD[b.type].label + ' — +' + refund + ' ⬡ salvaged');
  snd.ready();
  sellArmId = null;
  lastCardSig = ''; lastQSig = '';
}

let lastCardSig = '';
function cardSig() {
  pruneSelection();
  return selection.map(e => e.id).join(',') + '|' +
    selection.filter(e => e.queue).map(e => e.queue.join('.') + ':' + e.boost).join(';') + '|' +
    (placing || '') + (attackMoveMode ? 'A' : '') + '|' +
    BUILD_MENU.map(([t]) => (missionAllows('bld', t) ? '' : 'x') + (teams[1].crystals >= BLD[t].cost ? 'y' : 'n') + (hasTech(1, t) ? 'u' : 'l')).join('') + '|' +
    Object.values(teams[1].up).join('') + '.' + Math.floor(teams[1].crystals / 25) + '.' + teams[1].eggs +
    '.' + units.reduce((s, u) => s + (u.team === 1 && (u.type === 'spitter' || u.type === 'harrier') ? 1 : 0), 0) +
    '.' + selection.map(e => (e.warhead || '') + (e.cargo ? e.cargo.length : '') + (e.sunk ? 's' : '')).join('') +
    (nukeTargeting ? 'N' : '') + (sellArmId || '');
}
function refreshCard() {
  const sig = cardSig();
  if (sig === lastCardSig) return;
  lastCardSig = sig;

  let html = '';
  const b = selection.length === 1 && selection[0].kind === 'building' ? selection[0] : null;

  // construction buttons — the HQ is the construction yard (playtest
  // 2026-07-24: the row used to render LAST on every card and fell below the
  // HQ's fold, so the near-empty refinery card was the only place it showed —
  // Bronson reasonably concluded the refinery was the build hub). Now: HQ and
  // the empty-selection card only; placement hotkeys still work from anywhere.
  let buildRow = '', buildRowPlaced = false;
  if (!placing && !attackMoveMode) {
    buildRow = '<div class="row">';
    for (const [t, k] of BUILD_MENU) {
      if (!missionAllows('bld', t)) continue;
      if (!hasTech(1, t)) continue;   // progressive disclosure — locked buildings stay hidden
      if (BLD[t].water && !(groundM && groundM.rivers)) continue;   // no dams on dry maps
      const d = BLD[t];
      const dim = teams[1].crystals < d.cost ? ' class="dim"' : '';
      buildRow += `<button data-act="build:${t}"${dim}>${d.label} · ${d.cost} ⬡ <small>[${k}]</small></button>`;
    }
    buildRow += '</div>';
  }

  if (placing) {
    const hint = placing === 'refinery'
      ? 'Click open ground next to a crystal patch — harvesters will drop off there. Comes with a free harvester.'
      : 'Click open ground near your base. Right-click or Esc to cancel.';
    html = `<h3>Placing ${BLD[placing].label.toLowerCase()}</h3><div class="sub">${hint}</div>`;
  } else if (attackMoveMode) {
    html = '<h3>Attack-move</h3><div class="sub">Click a location — your troops will fight anything on the way.</div>';
  } else if (b && BLD[b.type].trains) {
    const d = BLD[b.type];
    // trains and research/hatch render into separate rows with construction
    // between them — training stays primary, building is always above the fold
    let rowTrain = '', rowOther = '';
    cardActions(b).forEach((a, i) => {
      const key = ['Q', 'W', 'E', 'R', 'D', 'Z'][i];
      if (a.kind === 'train') {
        const ud = UNIT[a.t];
        let label = `${ud.label} · ${ud.cost} ⬡`, capped = false;
        if (a.t === 'harrier') {
          const fleet = units.filter(u => u.team === 1 && u.type === 'harrier').length
            + buildings.reduce((s, x) => s + (x.team === 1 ? x.queue.filter(q => q === 'harrier').length : 0), 0);
          label = `${ud.label} · ${ud.cost} ⬡ (${fleet}/${HARRIER_CAP})`;
          capped = fleet >= HARRIER_CAP;
        }
        const dim = (teams[1].crystals < ud.cost || capped) ? ' class="dim"' : '';
        rowTrain += `<button data-act="train:${a.t}"${dim}>${label} <small>[${key}]</small></button>`;
      } else if (a.kind === 'hatch') {
        const pack = units.filter(u => u.team === 1 && u.type === 'spitter').length;
        const cls = ' class="wide' + ((teams[1].eggs < 1 || pack >= SPITTER_CAP) ? ' dim' : '') + '"';
        rowOther += `<button data-act="hatch"${cls}>🦖 Hatch Spitter · 1 🥚 (${teams[1].eggs} 🥚 · pack ${pack}/${SPITTER_CAP}) <small>[${key}]</small></button>`;
      } else {
        const g = UPG[a.k];
        const pending = buildings.reduce((s, x) =>
          s + (x.team === 1 ? x.queue.filter(q => q === 'up:' + a.k).length : 0), 0);
        const lvl = teams[1].up[a.k] + pending;
        if (lvl >= g.max) rowOther += `<button class="wide dim">⬆ ${g.label} MAX</button>`;
        else {
          const cls = ' class="wide' + (teams[1].crystals < g.cost[lvl] ? ' dim' : '') + '"';
          rowOther += `<button data-act="research:${a.k}"${cls}>⬆ ${g.label} ${lvl + 1} · ${g.cost[lvl]} ⬡ <small>[${key}]</small></button>`;
        }
      }
    });
    html = `<h3>${d.label}</h3><div class="sub">Right-click the map to set the rally point.</div>`;
    html += '<div class="row">' + rowTrain + '</div>';
    if (b.type === 'hq') { html += buildRow; buildRowPlaced = true; }   // the HQ is the construction yard
    if (rowOther) html += '<div class="row">' + rowOther + '</div>';
  } else if (b && b.type === 'silo') {
    html = '<h3>Missile Silo</h3>';
    if (b.built < 1) {
      html += '<div class="sub">Under construction…</div>';
    } else if (b.warhead) {
      html += `<div class="sub">${NUKE[b.warhead].label} armed and ready. Tactical warheads can’t be aimed near an HQ.</div><div class="row">`;
      html += `<button data-act="nuke:launch" class="wide">🚀 Launch ${NUKE[b.warhead].label} <small>[L]</small></button></div>`;
    } else {
      html += '<div class="sub">Buy a warhead. The Bunker Buster is the only one that can hit an HQ.</div><div class="row">';
      const d1 = teams[1].crystals < NUKE.tac.cost ? ' dim' : '';
      const d2 = teams[1].crystals < NUKE.hq.cost ? ' dim' : '';
      html += `<button data-act="nuke:tac" class="wide${d1}">☢ Tactical Nuke · 10,000 ⬡ <small>[Q]</small></button>`;
      html += `<button data-act="nuke:hq" class="wide${d2}">💥 Bunker Buster · 25,000 ⬡ <small>[W]</small></button></div>`;
    }
  } else if (b) {
    const desc = b.type === 'hydro' ? 'Hydroelectric dam: +' + BLD.hydro.gen + ' power from the river current — three plants in one, built the slow expensive way.'
      : b.type === 'supply' ? 'Raises your supply cap by ' + BLD.supply.supply + ', unlocks the Barracks, and slowly repairs nearby buildings.'
      : b.type === 'power' ? 'Feeds the grid +' + BLD.power.gen + ' power. Run out and production slows, towers fire at half rate, and nukes stay grounded.'
      : b.type === 'refinery' ? 'Harvesters drop crystals off here. Build more near far-away patches to expand.'
      : b.type === 'flak' ? 'Anti-air battery. Shreds gunships; ignores everything on the ground.'
      : 'Defensive structure. It shoots on its own.';
    html = `<h3>${BLD[b.type].label}</h3><div class="sub">${desc}</div>`;
    if (BLD[b.type].sink && b.built >= 1) {
      html += '<div class="row">' + (b.sunk
        ? '<button data-act="sink" class="wide">⬆ Raise structure <small>[Q]</small></button>'
        : '<button data-act="sink" class="wide">⬇ Lower into ground <small>[Q]</small></button>') + '</div>';
    }
  } else if (selection.length) {
    const counts = {};
    for (const u of selection) counts[u.type] = (counts[u.type] || 0) + 1;
    const label = Object.entries(counts).map(([t, n]) => `${n}× ${UNIT[t].label}`).join(', ');
    const engHint = selection.some(u => u.type === 'engineer') ? 'Right-click a damaged building or vehicle to repair it. ' : '';
    const rigHint = selection.some(u => u.type === 'rig') ? 'Right-click a spitter to capture it, then haul it to the HQ. ' : '';
    html = `<h3>${label}</h3><div class="sub">${rigHint}${engHint}Right-click: move · attack · harvest</div><div class="row">`;
    if (selection.some(u => isCombat(u))) html += '<button data-act="amove">Attack-move [A]</button>';
    if (selection.some(u => u.kind === 'unit' && canHunker(u))) html += '<button data-act="hunker">Hunker down [D]</button>';
    const aboard = selection.reduce((s, u) => s + (u.cargo ? u.cargo.length : 0), 0);
    if (aboard > 0) html += `<button data-act="unload">Unload ${aboard} [U]</button>`;
    html += '<button data-act="stop">Stop [S]</button></div>';
  } else {
    html = '<h3>Expedition Command</h3><div class="sub">Drag to select units. Right-click to give orders. Select the HQ to construct buildings.</div>';
  }
  if (b && b.team === 1 && b.type !== 'hq' && !placing && !attackMoveMode) {
    const armed = sellArmId === b.id && Date.now() - sellArmAt < 4000;
    const refund = Math.floor(BLD[b.type].cost * 0.5 * Math.min(1, b.built));
    html += '<div class="row">' + (armed
      ? '<button data-act="sell" class="wide">⚠ Confirm sell · +' + refund + ' ⬡</button>'
      : '<button data-act="sell">💰 Sell · +' + refund + ' ⬡</button>') + '</div>';
  }
  if (buildRow && !buildRowPlaced && !b && !selection.length) html += buildRow;
  // fold the leading title+hint into a fixed-width block; buttons flow beside it
  html = html.replace(/^<h3>(.*?)<\/h3>(<div class="sub">.*?<\/div>)?/,
    (m, t, s) => `<div class="hd"><h3>${t}</h3>${s || ''}</div>`);
  elCard.innerHTML = html;
}

// production queue lives in its own strip ABOVE the card, so appearing /
// disappearing never shifts the card's buttons (playtest feedback)
let lastQSig = '';
function refreshQueue() {
  const sel = selection.length === 1 && selection[0].kind === 'building' ? selection[0] : null;
  const con = sel && sel.built < 1 ? sel : null;                       // under construction
  const b = !con && sel && sel.queue && sel.queue.length ? sel : null; // producing
  const sig = con ? 'c' + con.id + '|' + Math.floor(con.built * 40) + '|' + (con.buildBoost || 1) + '|' + (con.engStall > 0 ? 'w' : '') + '|' + Math.floor(teams[1].crystals / 25)
    : b ? b.id + '|' + b.queue.join('.') + '|' + b.boost + '|' + Math.floor(teams[1].crystals / 25)
    : 'none';   // 'none', not '' — the click handlers use '' as a force-refresh sentinel
  if (sig === lastQSig) return;
  lastQSig = sig;
  if (!b && !con) {
    elQpanel.innerHTML = '<div class="queue">Production</div><div class="idle-note">nothing in the works — select a building and queue something up</div>';
    return;
  }
  if (con) {
    const cost = BLD[con.type].cost || 0;
    let html = `<div class="queue">Constructing: ${BLD[con.type].label}</div>`;
    html += '<div class="prog-wrap"><div class="prog" id="prog"></div></div>';
    if (con.engStall > 0) {
      html += '<div class="idle-note">⚠ waiting on an engineer — work is stopped until a crew reaches the site</div>';
      elQpanel.innerHTML = html;
      return;
    }
    html += '<div class="row">';
    if ((con.buildBoost || 1) === 1) {
      const dblFee = Math.ceil(cost / 2);
      html += `<button data-act="crush:double"${teams[1].crystals < dblFee ? ' class="dim"' : ''}>⏩ 2× speed · ${dblFee} ⬡</button>`;
    }
    html += `<button data-act="crush:instant"${teams[1].crystals < cost ? ' class="dim"' : ''}>⚡ Finish now · ${cost} ⬡</button></div>`;
    elQpanel.innerHTML = html;
    return;
  }
  let html = `<div class="queue">Building: ${b.queue.map(queueLabel).join(' → ')}</div>`;
  html += '<div class="prog-wrap"><div class="prog" id="prog"></div></div>';
  const base = queueItemCost(b);
  const dblFee = Math.ceil(base / 2);
  html += '<div class="row">';
  if (b.boost === 1) {
    const dim = teams[1].crystals < dblFee ? ' class="dim"' : '';
    html += `<button data-act="rush:double"${dim}>⏩ 2× speed · ${dblFee} ⬡</button>`;
  }
  const dimI = teams[1].crystals < base ? ' class="dim"' : '';
  html += `<button data-act="rush:instant"${dimI}>⚡ Finish now · ${base} ⬡</button></div>`;
  elQpanel.innerHTML = html;
}
// pointerdown, not click: the panels rebuild their HTML when crystals cross a
// 25-step, and a rebuild between mousedown and mouseup silently eats a click.
// Acting on the press is immune to that (and feels snappier mid-battle).
elDock.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  audioInit();
  const btn = e.target.closest('[data-act]');
  if (!btn || gameOver) return;
  const act = btn.getAttribute('data-act');
  if (act.startsWith('train:')) {
    const b = selection.find(s => s.kind === 'building' && BLD[s.type].trains);
    if (b) trainUnit(b, act.slice(6));
    lastCardSig = '';
  } else if (act.startsWith('research:')) {
    const b = selection.find(s => s.kind === 'building' && BLD[s.type].trains);
    if (b) startResearch(b, act.slice(9));
    lastCardSig = '';
  } else if (act.startsWith('nuke:')) {
    const b = selection.find(s => s.kind === 'building' && s.type === 'silo' && s.built >= 1);
    if (b) {
      const what = act.slice(5);
      if (what === 'launch') {
        if (b.warhead) { nukeTargeting = b; placing = null; attackMoveMode = false; setCursor(); toast('Pick a target — right-click to abort'); }
      } else buyNuke(b, what);
    }
    lastCardSig = '';
  } else if (act === 'unload') {
    for (const s of selection) if (s.kind === 'unit' && s.cargo && s.cargo.length) unloadAPC(s);
    lastCardSig = '';
  } else if (act === 'hatch') {
    const b = selection.find(s => s.kind === 'building' && s.type === 'hq');
    if (b) hatchSpitter(b);
    lastCardSig = '';
  } else if (act === 'sink') {
    const b = selection.find(s => s.kind === 'building' && BLD[s.type].sink && s.built >= 1);
    if (b) toggleSink(b);
    lastCardSig = '';
  } else if (act.startsWith('crush:')) {
    const cb = selection.find(x => x.kind === 'building' && x.built < 1);
    if (cb) rushConstruction(cb, act.slice(6) === 'instant');
    lastCardSig = ''; lastQSig = '';
  } else if (act.startsWith('rush:')) {
    const b = selection.find(s => s.kind === 'building' && s.queue && s.queue.length);
    if (b) rushProduction(b, act.slice(5) === 'instant');
    lastCardSig = ''; lastQSig = '';
  }
  else if (act.startsWith('build:')) { startPlacing(act.slice(6)); }
  else if (act === 'sell') {
    const b = selection.find(x => x.kind === 'building' && x.team === 1);
    if (b) {
      if (sellArmId === b.id && Date.now() - sellArmAt < 4000) sellBuilding(b);
      else { sellArmId = b.id; sellArmAt = Date.now(); toast('Click again to confirm the sale'); }
      lastCardSig = '';
    }
  }
  else if (act === 'stop') { for (const s of selection) if (s.kind === 'unit') s.order = { type: 'idle' }; }
  else if (act === 'hunker') { toggleHunker(); }
  else if (act === 'amove') { attackMoveMode = true; placing = null; nukeTargeting = null; setCursor(); lastCardSig = ''; }
});

let wasLowPower = false;
let lastAvail = null;   // build-menu availability — announces newly unlocked buildings
function refreshTopbar() {
  const avail = BUILD_MENU.filter(([t]) => missionAllows('bld', t) && hasTech(1, t) && !(BLD[t].water && !(groundM && groundM.rivers))).map(([t]) => t);
  if (lastAvail) {
    const fresh = avail.filter(t => !lastAvail.includes(t));
    if (fresh.length) {
      toast('🔓 Construction unlocked: ' + fresh.map(t => BLD[t].label).join(', '));
      snd.ready();
      lastCardSig = '';
    }
  }
  lastAvail = avail;
  elCrystals.textContent = '⬡ ' + Math.floor(teams[1].crystals);
  elSupply.textContent = '☰ ' + supplyUsed(1) + ' / ' + supplyMax(1);
  const pu = powerUsed(1), pm = powerMax(1), low = pu > pm;
  const elPower = document.getElementById('res-power');
  elPower.textContent = '⚡ ' + pu + ' / ' + pm;
  elPower.className = low ? 'chip warn' : 'chip';
  if (low && !wasLowPower) { toast('⚡ LOW POWER — production slowed, defenses degraded. Build a Power Plant (O).'); snd.alarm(); }
  wasLowPower = low;
  // the egg chip only appears once eggs enter your life
  const showEggs = teams[1].eggs > 0 || units.some(u => u.team === 1 && u.eggCarry);
  elEggs.style.display = showEggs ? '' : 'none';
  elEggs.textContent = '🥚 ' + teams[1].eggs;
  const noWaves = mission && (mission.noEnemy || mission.noWaves);
  elWave.style.display = noWaves ? 'none' : '';
  if (!noWaves) {
    const s = Math.max(0, Math.ceil((waveAt - tick) / 60));
    elWave.textContent = waveNum === 0 ? `⚔ first assault: ${s}s` : `⚔ next assault: ${s}s`;
  }
}
function refreshProgressBar() {
  const el = document.getElementById('prog');
  if (!el) return;
  const sel = selection.length === 1 ? selection[0] : null;
  if (sel && sel.kind === 'building' && sel.built < 1) {
    el.style.width = Math.min(100, sel.built * 100) + '%';
  } else if (sel && sel.queue && sel.queue.length) {
    el.style.width = Math.min(100, (sel.prog / queueTime(sel.team, sel.queue[0])) * 100) + '%';
  }
}

// ---------------- Ground texture (pre-rendered per map) ----------------
const groundCv = document.createElement('canvas');
groundCv.width = W; groundCv.height = H;
// top-down canopy (or bare snag on dead-flora maps). OPT slots: tree.png /
// tree_dead.png, same contract as rock.png.
function paintTree(g, rk, flo) {
  const seed = (rk.x * 7.3 + rk.y * 13.7) % (Math.PI * 2);
  g.fillStyle = 'rgba(0,0,0,0.38)';
  g.beginPath(); g.ellipse(rk.x + 6, rk.y + 8, rk.r * 1.15, rk.r * 0.9, 0, 0, Math.PI * 2); g.fill();
  const img = opt(rk.dead ? 'tree_dead' : 'tree');
  if (img) {
    const s = rk.r * 2.6;
    g.save(); g.translate(rk.x, rk.y); g.rotate(seed);
    g.drawImage(img, -s / 2, -s / 2, s, s);
    g.restore();
    return;
  }
  if (rk.dead) {
    // bleached snag: stub trunk + forking bare branches
    g.strokeStyle = '#565a63';
    g.lineWidth = 3.4;
    g.beginPath(); g.moveTo(rk.x, rk.y); g.lineTo(rk.x + Math.cos(seed) * rk.r * 0.5, rk.y + Math.sin(seed) * rk.r * 0.5); g.stroke();
    g.lineWidth = 1.8;
    for (let i = 0; i < 5; i++) {
      const a = seed + (i / 5) * Math.PI * 2 + 0.4;
      const len = rk.r * (0.7 + ((seed * (i + 3)) % 1) * 0.5);
      g.beginPath();
      g.moveTo(rk.x, rk.y);
      g.lineTo(rk.x + Math.cos(a) * len, rk.y + Math.sin(a) * len);
      g.stroke();
    }
    g.fillStyle = '#666b75';
    g.beginPath(); g.arc(rk.x, rk.y, rk.r * 0.18, 0, Math.PI * 2); g.fill();
    return;
  }
  const C = flo.canopy || '#2a4526', Chi = flo.canopyHi || '#3a5c32';
  g.fillStyle = C;
  for (let i = 0; i < 6; i++) {   // lobed canopy ring + core
    const a = seed + (i / 6) * Math.PI * 2;
    g.beginPath(); g.arc(rk.x + Math.cos(a) * rk.r * 0.5, rk.y + Math.sin(a) * rk.r * 0.5, rk.r * 0.55, 0, Math.PI * 2); g.fill();
  }
  g.beginPath(); g.arc(rk.x, rk.y, rk.r * 0.75, 0, Math.PI * 2); g.fill();
  g.fillStyle = Chi;   // sun side
  for (let i = 0; i < 3; i++) {
    const a = seed + (i / 3) * Math.PI * 2;
    g.beginPath(); g.arc(rk.x - rk.r * 0.22 + Math.cos(a) * rk.r * 0.28, rk.y - rk.r * 0.26 + Math.sin(a) * rk.r * 0.28, rk.r * 0.32, 0, Math.PI * 2); g.fill();
  }
}
function paintRock(g, rk, flo) {
  if (rk.water) return;   // water colliders are invisible — the band is painted in paintGround
  if (rk.tree) return paintTree(g, rk, flo || {});
  if (rk.cliff) {
    // scarp band: round-capped tangential strokes so the chained slabs read
    // as one eroded hillside edge, not a wall of black bricks (2026-07-24)
    g.save();
    g.translate(rk.x, rk.y);
    g.rotate(rk.a || 0);   // +x points away from the plateau
    g.lineCap = 'round';
    const t = rk.r * 1.22;   // tangential half-length — keeps the chain closed
    g.strokeStyle = 'rgba(0,0,0,0.30)';   // shadow falling downhill
    g.lineWidth = rk.r * 0.95;
    g.beginPath(); g.moveTo(3, -t); g.lineTo(3, t); g.stroke();
    g.strokeStyle = '#2c322b';            // scarp face
    g.lineWidth = rk.r * 0.8;
    g.beginPath(); g.moveTo(-rk.r * 0.2, -t); g.lineTo(-rk.r * 0.2, t); g.stroke();
    g.strokeStyle = '#454d45';            // sunlit lip on the high side
    g.lineWidth = rk.r * 0.24;
    g.beginPath(); g.moveTo(-rk.r * 0.5, -t * 0.9); g.lineTo(-rk.r * 0.5, t * 0.9); g.stroke();
    g.restore();
    return;
  }
  if (rk.spire) {
    // crystalline spire: jagged shard cluster in a dulled deep teal — reads
    // "crystal country terrain", deliberately NOT the mineable resource color
    const img = opt('spire');
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.beginPath(); g.ellipse(rk.x + 4, rk.y + 6, rk.r * 1.1, rk.r * 0.85, 0, 0, Math.PI * 2); g.fill();
    if (img) {
      const s = rk.r * 2.5;
      g.drawImage(img, rk.x - s / 2, rk.y - s / 2, s, s);
      return;
    }
    const seed = (rk.x * 7.3 + rk.y * 13.7) % (Math.PI * 2);
    g.fillStyle = '#1e2a27';
    g.beginPath(); g.arc(rk.x, rk.y, rk.r * 0.8, 0, Math.PI * 2); g.fill();
    for (let i = 0; i < 5; i++) {
      const a = seed + (i / 5) * Math.PI * 2;
      const len = rk.r * (0.8 + ((seed * (i + 2)) % 1) * 0.7);
      const bx = rk.x + Math.cos(a) * rk.r * 0.3, by = rk.y + Math.sin(a) * rk.r * 0.3;
      g.fillStyle = i % 2 ? '#3f6a63' : '#4d7d74';
      g.beginPath();
      g.moveTo(bx + Math.cos(a) * len, by + Math.sin(a) * len);
      g.lineTo(bx + Math.cos(a + 1.9) * rk.r * 0.3, by + Math.sin(a + 1.9) * rk.r * 0.3);
      g.lineTo(bx + Math.cos(a - 1.9) * rk.r * 0.3, by + Math.sin(a - 1.9) * rk.r * 0.3);
      g.closePath(); g.fill();
    }
    g.fillStyle = 'rgba(160,230,215,0.35)';   // faint living glint at the heart
    g.beginPath(); g.arc(rk.x - rk.r * 0.1, rk.y - rk.r * 0.15, rk.r * 0.2, 0, Math.PI * 2); g.fill();
    return;
  }
  if (rk.bone) {
    // half-buried ribcage of something enormous — the Boneyard earns its name
    const img = opt('bones');
    g.fillStyle = 'rgba(0,0,0,0.3)';
    g.beginPath(); g.ellipse(rk.x + 4, rk.y + 6, rk.r * 1.15, rk.r * 0.7, rk.a || 0, 0, Math.PI * 2); g.fill();
    if (img) {
      const s = rk.r * 2.6;
      g.save(); g.translate(rk.x, rk.y); g.rotate(rk.a || 0);
      g.drawImage(img, -s / 2, -s / 2, s, s);
      g.restore();
      return;
    }
    g.save();
    g.translate(rk.x, rk.y);
    g.rotate(rk.a || 0);   // spine runs along +x
    g.strokeStyle = '#b6af97';
    g.lineCap = 'round';
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(-rk.r * 0.9, 0); g.lineTo(rk.r * 0.75, 0); g.stroke();   // spine
    const ribs = 5;
    for (let i = 0; i < ribs; i++) {
      const x = -rk.r * 0.7 + (i / (ribs - 1)) * rk.r * 1.25;
      const h = rk.r * (0.75 - Math.abs(i - ribs / 2 + 0.5) * 0.12);
      g.lineWidth = 3.4;
      g.beginPath(); g.arc(x, -h * 0.15, h, Math.PI * 0.75, Math.PI * 1.6); g.stroke();
      g.beginPath(); g.arc(x, h * 0.15, h, Math.PI * 0.4, Math.PI * 1.25, true); g.stroke();
    }
    g.fillStyle = '#c4bda3';   // skull knob at the spine's head
    g.beginPath(); g.ellipse(rk.r * 0.85, 0, rk.r * 0.28, rk.r * 0.2, 0, 0, Math.PI * 2); g.fill();
    g.restore();
    return;
  }
  if (rk.pit) {
    // sinkhole: gradient-only collapsed ground — the first pass was concentric
    // flat ellipses and read as a cartoon eyeball (playtest 2026-07-24). Now:
    // a wobbled sunken apron fading into the soil, radial cracks, and a hole
    // that darkens toward the heart with no clean outline anywhere.
    const seed = (rk.x * 7.3 + rk.y * 13.7) % (Math.PI * 2);
    const img = opt('pit');
    if (img) {
      const s = rk.r * 2.9;
      g.save(); g.translate(rk.x, rk.y); g.rotate(seed);
      g.drawImage(img, -s / 2, -s / 2, s, s);
      g.restore();
      return;
    }
    const blob = (rad, jitter) => {
      g.beginPath();
      for (let i = 0; i <= 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        const rr = rad * (1 + jitter * Math.sin(a * 3 + seed) + jitter * 0.5 * Math.sin(a * 5 + seed * 2.3));
        const px = rk.x + Math.cos(a) * rr, py = rk.y + Math.sin(a) * rr * 0.88;
        i ? g.lineTo(px, py) : g.moveTo(px, py);
      }
      g.closePath();
    };
    let grad = g.createRadialGradient(rk.x, rk.y, rk.r * 0.2, rk.x, rk.y, rk.r * 1.45);
    grad.addColorStop(0, 'rgba(0,0,0,0.55)');
    grad.addColorStop(0.75, 'rgba(0,0,0,0.25)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad; blob(rk.r * 1.45, 0.10); g.fill();
    g.strokeStyle = 'rgba(0,0,0,0.30)';
    g.lineWidth = 2;
    for (let i = 0; i < 5; i++) {   // stress cracks reaching past the rim
      const a = seed + (i / 5) * Math.PI * 2 + Math.sin(seed * (i + 2)) * 0.4;
      const r2 = rk.r * (1.3 + ((seed * (i + 3)) % 1) * 0.45);
      g.beginPath();
      g.moveTo(rk.x + Math.cos(a) * rk.r * 0.85, rk.y + Math.sin(a) * rk.r * 0.75);
      g.lineTo(rk.x + Math.cos(a + 0.12) * r2, rk.y + Math.sin(a + 0.12) * r2 * 0.88);
      g.stroke();
    }
    grad = g.createRadialGradient(rk.x - rk.r * 0.15, rk.y - rk.r * 0.2, rk.r * 0.1, rk.x, rk.y, rk.r);
    grad.addColorStop(0, '#050605');
    grad.addColorStop(0.7, '#0a0c0a');
    grad.addColorStop(1, 'rgba(30,28,20,0.9)');
    g.fillStyle = grad; blob(rk.r * 0.95, 0.12); g.fill();
    return;
  }
  g.fillStyle = 'rgba(0,0,0,0.35)';   // ground shadow
  g.beginPath(); g.ellipse(rk.x + 5, rk.y + 7, rk.r * 1.02, rk.r * 0.88, 0, 0, Math.PI * 2); g.fill();
  const img = opt('rock');
  if (img) {
    const s = rk.r * 2.3;
    g.save();
    g.translate(rk.x, rk.y);
    g.rotate((rk.x * 7.3 + rk.y * 13.7) % (Math.PI * 2));   // stable variety per rock
    g.drawImage(img, -s / 2, -s / 2, s, s);
    g.restore();
    return;
  }
  const blob = (rad, fill, ox, oy) => {
    g.fillStyle = fill;
    g.beginPath();
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const rr2 = rad * (0.82 + Math.random() * 0.3);
      const px = rk.x + ox + Math.cos(a) * rr2, py = rk.y + oy + Math.sin(a) * rr2 * 0.92;
      i ? g.lineTo(px, py) : g.moveTo(px, py);
    }
    g.closePath(); g.fill();
  };
  blob(rk.r, '#2c322c', 0, 0);                    // rock body
  blob(rk.r * 0.62, '#3a423a', -rk.r * 0.12, -rk.r * 0.16);   // upper facet
  blob(rk.r * 0.3, '#485148', -rk.r * 0.2, -rk.r * 0.28);     // highlight
}
function paintGround(M) {
  // per-map ground palette — each battlefield gets its own soil so maps stop
  // looking interchangeable (playtest feedback). All fields optional.
  const pal = (M && M.ground) || {};
  const flo = (M && M.flora) || {};
  const g = groundCv.getContext('2d');
  const area = (W * H) / (2048 * 1536);   // texture density scales with map area
  g.fillStyle = pal.base || '#171c16';
  g.fillRect(0, 0, W, H);
  // shared value-noise fields: one geography drives BOTH texture passes below,
  // so the streaks and the tonal drift agree with each other
  {
    const cell = 260, cw = Math.ceil(W / cell) + 2, ch = Math.ceil(H / cell) + 2;
    const n1 = new Float32Array(cw * ch).map(() => Math.random());
    const cell2 = 90, cw2 = Math.ceil(W / cell2) + 2, ch2 = Math.ceil(H / cell2) + 2;
    const n2 = new Float32Array(cw2 * ch2).map(() => Math.random());
    const smooth = (t) => t * t * (3 - 2 * t);
    const sample = (n, cw3, sz, x, y) => {
      const gx = x / sz, gy = y / sz;
      const x0 = Math.floor(gx), y0 = Math.floor(gy);
      const tx = smooth(gx - x0), ty = smooth(gy - y0);
      const v00 = n[y0 * cw3 + x0], v10 = n[y0 * cw3 + x0 + 1];
      const v01 = n[(y0 + 1) * cw3 + x0], v11 = n[(y0 + 1) * cw3 + x0 + 1];
      return (v00 * (1 - tx) + v10 * tx) * (1 - ty) + (v01 * (1 - tx) + v11 * tx) * ty;
    };
    // soil streaks on a FLOW FIELD — the old pass scattered random ovals
    // ("no rhyme or reason", playtest 2026-07-24). Streak heading comes from
    // the smooth noise, so neighbors align and the ground reads as brushed
    // sediment: flows, drifts, wash lines.
    for (let i = 0; i < 1100 * area; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const a = sample(n1, cw, cell, x, y) * Math.PI * 2 + (sample(n2, cw2, cell2, x, y) - 0.5) * 0.8;
      const len = 10 + Math.random() * 24, wdt = 2.5 + Math.random() * 3.5;
      g.fillStyle = Math.random() < 0.5 ? (pal.mottle || 'rgba(255,255,255,0.012)') : 'rgba(0,0,0,0.05)';
      g.beginPath(); g.ellipse(x, y, len, wdt, a, 0, Math.PI * 2); g.fill();
    }
    // biome shading: the same noise painted as soft light/dark tonal drift —
    // no outlines, so nothing reads as a "shape" (the blob versions all did)
    const lightC = flo.blotch || 'rgba(90,140,90,0.5)', darkC = flo.blotch2 || 'rgba(20,35,22,0.5)';
    const step = 24;
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const v = sample(n1, cw, cell, x, y) * 0.65 + sample(n2, cw2, cell2, x, y) * 0.35 - 0.5;
        if (Math.abs(v) < 0.04) continue;
        g.globalAlpha = Math.min(0.16, Math.abs(v) * 0.42);
        g.fillStyle = v > 0 ? lightC : darkC;
        g.fillRect(x, y, step, step);
      }
    }
    g.globalAlpha = 1;
  }
  // faint grid
  g.strokeStyle = pal.grid || 'rgba(160,220,200,0.028)';
  g.lineWidth = 1;
  for (let x = 0; x <= W; x += TILE) { g.beginPath(); g.moveTo(x + 0.5, 0); g.lineTo(x + 0.5, H); g.stroke(); }
  for (let y = 0; y <= H; y += TILE) { g.beginPath(); g.moveTo(0, y + 0.5); g.lineTo(W, y + 0.5); g.stroke(); }
  // scattered pebbles
  for (let i = 0; i < 240 * area; i++) {
    const x = Math.random() * W, y = Math.random() * H;
    g.fillStyle = pal.pebble || 'rgba(190,200,190,0.06)';
    g.beginPath(); g.arc(x, y, 1 + Math.random() * 2.5, 0, Math.PI * 2); g.fill();
  }
  // ground flora, in clumps (uniform scatter reads as noise; clumps read as
  // vegetation): grass tufts + shrubs + the odd bush, all map-palette
  const tuftC = flo.tuft || 'rgba(125,190,125,0.5)';
  const bushC = flo.bush || '#243a22', bushHiC = flo.bushHi || '#35502e';
  const clumps = (flo.clumps != null ? flo.clumps : 40) * area;
  for (let i = 0; i < clumps; i++) {
    const cxp = Math.random() * W, cyp = Math.random() * H;
    const n = 4 + Math.floor(Math.random() * 6);
    for (let j = 0; j < n; j++) {
      const x = cxp + (Math.random() - 0.5) * 170, y = cyp + (Math.random() - 0.5) * 170;
      if (x < 8 || y < 8 || x > W - 8 || y > H - 8) continue;
      const kind = Math.random();
      if (kind < 0.55) {          // grass tuft: a little fan of blades
        g.strokeStyle = tuftC;
        g.lineWidth = 1.1;
        const blades = 3 + Math.floor(Math.random() * 3);
        for (let k = 0; k < blades; k++) {
          const a = -Math.PI / 2 + (k - blades / 2) * 0.45 + (Math.random() - 0.5) * 0.2;
          const len = 4 + Math.random() * 5;
          g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len); g.stroke();
        }
      } else if (kind < 0.85) {   // shrub: low dark sprig cluster
        g.fillStyle = bushC;
        for (let k = 0; k < 3; k++) {
          g.beginPath(); g.arc(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6, 1.6 + Math.random() * 2.2, 0, Math.PI * 2); g.fill();
        }
        g.fillStyle = bushHiC;
        g.beginPath(); g.arc(x - 1, y - 1.5, 1.4, 0, Math.PI * 2); g.fill();
      } else {                    // bush: two-tone dome with a shadow skirt
        const r = 5 + Math.random() * 5;
        g.fillStyle = 'rgba(0,0,0,0.25)';
        g.beginPath(); g.ellipse(x + 2, y + 2.5, r, r * 0.75, 0, 0, Math.PI * 2); g.fill();
        g.fillStyle = bushC;
        g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
        g.fillStyle = bushHiC;
        g.beginPath(); g.arc(x - r * 0.25, y - r * 0.3, r * 0.55, 0, Math.PI * 2); g.fill();
      }
    }
  }
  // worn haul roads (MAPS.roads polylines): packed-earth band, a dusty crown,
  // and wheel ruts. Painted over flora — a used road stays clear of grass.
  for (const line of ((M && M.roads) || [])) {
    g.lineCap = 'round'; g.lineJoin = 'round';
    const trace = () => { g.beginPath(); line.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.stroke(); };
    g.strokeStyle = 'rgba(62,50,30,0.6)'; g.lineWidth = 44; trace();
    g.strokeStyle = 'rgba(140,115,70,0.16)'; g.lineWidth = 26; trace();
    for (let i = 1; i < line.length; i++) {   // ruts hug each segment's normal
      const [x1, y1] = line[i - 1], [x2, y2] = line[i];
      const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L;
      g.strokeStyle = 'rgba(0,0,0,0.22)'; g.lineWidth = 2.5;
      for (const s of [-9, 9]) {
        g.beginPath(); g.moveTo(x1 + nx * s, y1 + ny * s); g.lineTo(x2 + nx * s, y2 + ny * s); g.stroke();
      }
    }
  }
  // water channels (MAPS.rivers): the read is DEPTH — saturated teal
  // shallows stepping down to a dark heart (v3, 2026-07-26: the pale rim
  // looked like concrete curbing and near-black fill read as asphalt).
  // Wet dark earth at the shore, stepped depth bands, bed pebbles in the
  // shallows, optional water.png texture breathing over the whole channel.
  // dirt causeways first, so the water mouths paint OVER the earth: a soft
  // gradient saddle between close segment ends — no edges, just packed ground
  {
    const rlist = ((M && M.rivers) || []);
    for (let i = 0; i + 1 < rlist.length; i++) {
      const [, , ax, ay] = rlist[i];
      const [bx2, by2] = rlist[i + 1];
      const gap = dist(ax, ay, bx2, by2);
      if (gap > 430) continue;
      const ang = Math.atan2(by2 - ay, bx2 - ax);
      g.save();
      g.translate((ax + bx2) / 2, (ay + by2) / 2);
      g.rotate(ang);
      g.scale((gap / 2 + 50) / 80, 1);
      let grad = g.createRadialGradient(0, 0, 8, 0, 0, 80);
      grad.addColorStop(0, 'rgba(112,94,60,0.30)');
      grad.addColorStop(0.7, 'rgba(96,80,52,0.16)');
      grad.addColorStop(1, 'rgba(96,80,52,0)');
      g.fillStyle = grad;
      g.beginPath(); g.arc(0, 0, 80, 0, Math.PI * 2); g.fill();
      g.restore();
    }
  }
  for (const seg of ((M && M.rivers) || [])) {
    const pts = riverPath(seg);
    const bankPoly = (scale, wobble) => {
      g.beginPath();
      const cap = (p, ang, w2, flip) => {   // rounded mouth, swept around the tip
        for (let k = 1; k < 14; k++) {
          const ca = ang + (flip ? -1 : 1) * Math.PI / 2 - (k / 14) * Math.PI;
          g.lineTo(p.x + Math.cos(ca) * w2, p.y + Math.sin(ca) * w2);
        }
      };
      const wAt = (p, wobble2, right) => p.r * scale + (wobble2 ? Math.sin(p.d * (right ? 0.09 : 0.07) + (right ? p.y : p.x)) * 3.5 : 0);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i], q = pts[Math.min(i + 1, pts.length - 1)], o = pts[Math.max(i - 1, 0)];
        const ang = Math.atan2(q.y - o.y, q.x - o.x);
        const w2 = wAt(p, wobble, false);
        const px = p.x - Math.sin(ang) * w2, py = p.y + Math.cos(ang) * w2;
        i ? g.lineTo(px, py) : g.moveTo(px, py);
        if (i === pts.length - 1) cap(p, ang, w2, false);
      }
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i], q = pts[Math.min(i + 1, pts.length - 1)], o = pts[Math.max(i - 1, 0)];
        const ang = Math.atan2(q.y - o.y, q.x - o.x);
        const w2 = wAt(p, wobble, true);
        g.lineTo(p.x + Math.sin(ang) * w2, p.y - Math.cos(ang) * w2);
        if (i === 0) cap(p, ang, w2, true);
      }
      g.closePath();
    };
    g.fillStyle = 'rgba(0,0,0,0.30)'; bankPoly(1.18, true); g.fill();      // wet dark earth shore
    // depth as a smooth ramp: many narrow bands from teal shallows to the
    // dark heart (three visible steps read as terraces, not depth)
    const DEPTH = [[1.0, '#1c4a4e'], [0.88, '#184247'], [0.76, '#143a3f'], [0.64, '#113338'], [0.52, '#0e2c31'], [0.42, '#0c272c'], [0.32, '#0a2226']];
    for (let di = 0; di < DEPTH.length; di++) {
      g.fillStyle = DEPTH[di][1];
      bankPoly(DEPTH[di][0], di < 4);
    g.fill();
    }
  }
  // raised ground: soft-shouldered hills, not stamped discs (playtest: the
  // circle-plus-rim look read as "dropped-in outposts"). Each disc becomes a
  // wobbled dome with a radial-gradient slope; overlapping discs merge into
  // one hilly mass. Ramps paint as tapered slope tongues aimed at the summit.
  const hillBlob = (px, py, pr, jitter) => {
    const seed = px * 0.37 + py * 0.61;
    g.beginPath();
    for (let i = 0; i <= 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      const rr = pr * (1 + jitter * Math.sin(a * 3 + seed) + jitter * 0.6 * Math.sin(a * 7 + seed * 1.7));
      const x = px + Math.cos(a) * rr, y = py + Math.sin(a) * rr;
      i ? g.lineTo(x, y) : g.moveTo(x, y);
    }
    g.closePath();
  };
  for (const pl of ((M && M.plateaus) || [])) {
    for (const [px, py, pr] of pl.c) {          // settling shadow downhill
      g.fillStyle = 'rgba(0,0,0,0.18)';
      hillBlob(px + 9, py + 13, pr * 1.06, 0.07); g.fill();
    }
    for (const [rx, ry, rr] of (pl.ramps || [])) {
      // ramp = soft elliptical glow stretched along the climb direction —
      // gradient-only, zero hard edges (strokes/quads here read as glitches)
      let nx = 0, ny = 0, bd = 1e18;
      for (const [px, py] of pl.c) { const d = dist2(rx, ry, px, py); if (d < bd) { bd = d; nx = px; ny = py; } }
      const a = Math.atan2(ny - ry, nx - rx);
      g.save();
      g.translate(rx, ry); g.rotate(a); g.scale(1.5, 0.95);
      const grad = g.createRadialGradient(0, 0, rr * 0.1, 0, 0, rr);
      grad.addColorStop(0, pal.hi || 'rgba(235,240,225,0.12)');
      grad.addColorStop(1, 'rgba(235,240,225,0)');
      g.fillStyle = grad;
      g.beginPath(); g.arc(0, 0, rr, 0, Math.PI * 2); g.fill();
      g.restore();
    }
    for (const [px, py, pr] of pl.c) {          // slope: bright summit fading to the foot
      const grad = g.createRadialGradient(px - pr * 0.15, py - pr * 0.2, pr * 0.1, px, py, pr * 1.05);
      grad.addColorStop(0, pal.hi || 'rgba(235,240,225,0.16)');
      grad.addColorStop(0.65, pal.hi ? pal.hi : 'rgba(235,240,225,0.09)');
      grad.addColorStop(1, 'rgba(235,240,225,0)');
      g.fillStyle = grad;
      hillBlob(px, py, pr * 1.05, 0.07); g.fill();
    }
    for (const [px, py, pr] of pl.c) {          // faint contour line under the rim
      g.strokeStyle = 'rgba(255,255,255,0.05)';
      g.lineWidth = 2;
      hillBlob(px, py, pr * 0.8, 0.09); g.stroke();
    }
  }
  for (const rk of rocks) paintRock(g, rk, flo);
}
paintGround();   // pre-menu backdrop; setup() repaints with the map's terrain

// ---------------- Drawing ----------------
// gold chevrons above a ranked unit — one per rank, stacked
function drawRank(u) {
  const rank = rankOf(u);
  if (!rank) return;
  cx.strokeStyle = '#f0c86a';
  cx.lineWidth = 1.6;
  const bx = u.x + u.r + 4, by = u.y - u.r - 4;
  for (let i = 0; i < rank; i++) {
    const yy = by - i * 4;
    cx.beginPath();
    cx.moveTo(bx - 3, yy); cx.lineTo(bx, yy - 3); cx.lineTo(bx + 3, yy);
    cx.stroke();
  }
}

function drawHpBar(x, y, w, hp, maxHp) {
  const f = clamp(hp / maxHp, 0, 1);
  cx.fillStyle = 'rgba(0,0,0,0.6)';
  cx.fillRect(x - w / 2, y, w, 4);
  cx.fillStyle = f > 0.55 ? '#7fd8a8' : f > 0.25 ? '#e8c46a' : '#e0564a';
  cx.fillRect(x - w / 2, y, w * f, 4);
}

function drawCrystal(c) {
  const f = 0.45 + 0.55 * (c.amount / c.maxAmount);
  const r = c.r * f + 3;
  if (c.amount <= 0) {
    cx.fillStyle = 'rgba(110,140,135,0.25)';
    cx.beginPath(); cx.arc(c.x, c.y, 5, 0, Math.PI * 2); cx.fill();
    return;
  }
  cx.save();
  cx.translate(c.x, c.y);
  cx.fillStyle = 'rgba(111,227,208,0.14)';
  cx.beginPath(); cx.arc(0, 0, r + 6, 0, Math.PI * 2); cx.fill();
  const img = opt('crystal');
  if (img) {
    const s = (r + 4) * 2.3;
    cx.rotate((c.id * 2.399) % (Math.PI * 2));
    cx.drawImage(img, -s / 2, -s / 2, s, s);
    cx.restore();
    return;
  }
  cx.fillStyle = CRYSTAL_COLOR;
  cx.beginPath();
  cx.moveTo(0, -r); cx.lineTo(r * 0.7, 0); cx.lineTo(0, r); cx.lineTo(-r * 0.7, 0);
  cx.closePath(); cx.fill();
  cx.fillStyle = 'rgba(255,255,255,0.55)';
  cx.beginPath();
  cx.moveTo(0, -r); cx.lineTo(r * 0.28, -r * 0.2); cx.lineTo(-r * 0.28, -r * 0.2);
  cx.closePath(); cx.fill();
  cx.restore();
}

function drawEgg(e) {
  // pickup ring: the same pulsing green "interact" language as the specimen —
  // reads as "this is collectible" without a word of tutorial
  cx.strokeStyle = `rgba(143,201,74,${0.45 + 0.25 * Math.sin(tick * 0.08)})`;
  cx.lineWidth = 2;
  cx.setLineDash([4, 5]);
  cx.beginPath(); cx.arc(e.x, e.y, e.r + 8, 0, Math.PI * 2); cx.stroke();
  cx.setLineDash([]);
  const img = opt('egg');
  if (img) {
    cx.drawImage(img, e.x - 9, e.y - 11, 18, 22);
    return;
  }
  cx.save();
  cx.translate(e.x, e.y);
  cx.fillStyle = 'rgba(232,226,204,0.16)';   // soft glow so they read on dark ground
  cx.beginPath(); cx.arc(0, 0, e.r + 5, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = '#e8e2cc';
  cx.beginPath(); cx.ellipse(0, 0, e.r * 0.72, e.r, 0.15, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = COLORS[3].dark;             // moss speckles on bone shell
  cx.beginPath(); cx.arc(-2, -3, 1.2, 0, Math.PI * 2); cx.fill();
  cx.beginPath(); cx.arc(2, 1, 1, 0, Math.PI * 2); cx.fill();
  cx.beginPath(); cx.arc(-1, 3.5, 0.9, 0, Math.PI * 2); cx.fill();
  cx.restore();
}

// sprite bodies for buildings; keeps the shared selection/hp/queue drawing in drawBuilding
function drawBuildingSprite(b, x, y) {
  const C = COLORS[b.team];
  const pre = optCW('bld_' + b.type, b.team);   // pre-colored colorway art: no tint
  const whole = pre || opt('bld_' + b.type);
  if (whole) {
    if (b.built < 1) {
      cx.globalAlpha = 0.55;
      cx.strokeStyle = 'rgba(200,220,210,0.5)';
      cx.lineWidth = 2;
      cx.setLineDash([6, 5]);
      rr(cx, x, y, b.w, b.h, 8); cx.stroke();
      cx.setLineDash([]);
    }
    cx.drawImage(pre ? whole : bldSprite(whole, b.team), x, y, b.w, b.h);
    if (b.type === 'turret' || b.type === 'flak') {   // rotating gun stays game-drawn
      cx.save();
      cx.translate(b.x, b.y);
      cx.rotate(b.faceA + Math.PI / 2);
      if (b.recoil) cx.translate(0, b.recoil);        // gun art points up: recoil = slide back
      const gunCW = optCW('turret_gun', b.team);
      cx.drawImage(gunCW || bldSprite(BODY.turret_gun, b.team), -14, -19, 28, 28);
      cx.restore();
    }
    if (b.type === 'silo' && b.warhead) {
      cx.fillStyle = '#e0564a';
      cx.beginPath(); cx.ellipse(b.x, b.y, 5, 11, 0, 0, Math.PI * 2); cx.fill();
    }
    if (b.built < 1) {
      cx.globalAlpha = 1;
      cx.fillStyle = 'rgba(255,255,255,0.8)';
      cx.font = '11px -apple-system, sans-serif';
      cx.textAlign = 'center';
      cx.fillText(Math.floor(b.built * 100) + '%', b.x, b.y - b.h / 2 - 8);
    }
    cx.globalAlpha = 1;
    return;
  }
  if (b.built < 1) {
    cx.globalAlpha = 0.55;
    cx.strokeStyle = 'rgba(200,220,210,0.5)';
    cx.lineWidth = 2;
    cx.setLineDash([6, 5]);
    rr(cx, x, y, b.w, b.h, 8); cx.stroke();
    cx.setLineDash([]);
  }
  if (b.type === 'hq') {
    cx.drawImage(bldSprite(BODY.bld_plate_oct, b.team), x, y, b.w, b.h);
    cx.drawImage(BODY.bld_vent_a, b.x - 15, b.y - 15, 30, 30);
    const pulse = 8 + Math.sin(tick * 0.08) * 2;
    cx.fillStyle = C.main;
    cx.save(); cx.translate(b.x, b.y); cx.rotate(Math.PI / 4);
    cx.fillRect(-pulse / 2, -pulse / 2, pulse, pulse);
    cx.restore();
  } else if (b.type === 'barracks') {
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), x, y, b.w, b.h);
    cx.drawImage(BODY.bld_vent_b, b.x - 12, y + 10, 24, 24);
    cx.fillStyle = C.dark;
    cx.fillRect(b.x - 12, y + b.h - 22, 24, 22);
  } else if (b.type === 'factory') {
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), x, y, b.w, b.h);
    cx.drawImage(BODY.bld_vent_b, x + 8, b.y - 14, 24, 24);
    cx.drawImage(BODY.bld_vent_b, x + b.w - 32, b.y - 14, 24, 24);
    cx.fillStyle = C.dark;
    cx.fillRect(b.x - 17, y + b.h - 20, 34, 20);   // vehicle bay door
  } else if (b.type === 'supply') {
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), x, y, b.w, b.h);
    cx.drawImage(BODY.crate, b.x - 18, b.y - 14, 16, 16);
    cx.drawImage(BODY.crate, b.x + 2, b.y - 14, 16, 16);
    cx.drawImage(BODY.crate, b.x - 8, b.y + 0, 16, 16);
  } else if (b.type === 'power') {
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), x, y, b.w, b.h);
    drawPowerBolt(b);
  } else if (b.type === 'refinery') {
    cx.drawImage(bldSprite(BODY.bld_plate_oct, b.team), x, y, b.w, b.h);
    const r = 11 + Math.sin(tick * 0.06) * 1.5;    // pulsing crystal emblem
    cx.fillStyle = CRYSTAL_COLOR;
    cx.beginPath();
    cx.moveTo(b.x, b.y - r); cx.lineTo(b.x + r * 0.7, b.y); cx.lineTo(b.x, b.y + r); cx.lineTo(b.x - r * 0.7, b.y);
    cx.closePath(); cx.fill();
  } else if (b.type === 'silo') {
    cx.drawImage(bldSprite(BODY.bld_plate_oct, b.team), x, y, b.w, b.h);
    cx.strokeStyle = C.dark; cx.lineWidth = 3;     // blast doors
    cx.beginPath(); cx.arc(b.x, b.y, 17, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = '#141a15';
    cx.beginPath(); cx.arc(b.x, b.y, 14, 0, Math.PI * 2); cx.fill();
    if (b.warhead) {
      cx.fillStyle = '#e0564a';                    // warhead riding the elevator
      cx.beginPath(); cx.ellipse(b.x, b.y, 5, 11, 0, 0, Math.PI * 2); cx.fill();
      cx.fillStyle = '#f2f2ee';
      cx.beginPath(); cx.arc(b.x, b.y - 8, 3, 0, Math.PI * 2); cx.fill();
      if (tick % 40 < 20) {                        // armed strobe
        cx.fillStyle = '#ffb060';
        cx.beginPath(); cx.arc(x + b.w - 9, y + 9, 3, 0, Math.PI * 2); cx.fill();
      }
    } else {
      cx.strokeStyle = '#3a423a'; cx.lineWidth = 2;   // empty tube stripes
      cx.beginPath(); cx.moveTo(b.x - 9, b.y - 9); cx.lineTo(b.x + 9, b.y + 9); cx.stroke();
      cx.beginPath(); cx.moveTo(b.x + 9, b.y - 9); cx.lineTo(b.x - 9, b.y + 9); cx.stroke();
    }
  } else if (b.type === 'airpad') {
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), x, y, b.w, b.h);
    cx.strokeStyle = C.light; cx.lineWidth = 2;    // helipad ring + H
    cx.beginPath(); cx.arc(b.x, b.y, 16, 0, Math.PI * 2); cx.stroke();
    cx.lineWidth = 3;
    cx.beginPath();
    cx.moveTo(b.x - 5, b.y - 6); cx.lineTo(b.x - 5, b.y + 6);
    cx.moveTo(b.x + 5, b.y - 6); cx.lineTo(b.x + 5, b.y + 6);
    cx.moveTo(b.x - 5, b.y); cx.lineTo(b.x + 5, b.y);
    cx.stroke();
    if (tick % 90 < 45) {                          // blinking pad beacon
      cx.fillStyle = '#f0c86a';
      cx.beginPath(); cx.arc(x + b.w - 8, y + 8, 2.5, 0, Math.PI * 2); cx.fill();
    }
  } else if (b.type === 'flak') {
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), b.x - 22, b.y - 22, 44, 44);
    cx.save();
    cx.translate(b.x, b.y);
    cx.rotate(b.faceA + Math.PI / 2);   // twin AA guns, splayed
    cx.drawImage(BODY.turret_gun, -18, -18, 24, 24);
    cx.drawImage(BODY.turret_gun, -6, -18, 24, 24);
    cx.restore();
    cx.fillStyle = C.light;             // sky-watch radar dot
    cx.beginPath(); cx.arc(b.x, b.y - 14, 2.5 + Math.sin(tick * 0.15) * 1, 0, Math.PI * 2); cx.fill();
  } else { // turret
    cx.drawImage(bldSprite(BODY.bld_plate, b.team), b.x - 22, b.y - 22, 44, 44);
    cx.save();
    cx.translate(b.x, b.y);
    cx.rotate(b.faceA + Math.PI / 2);   // gun art points up
    cx.drawImage(BODY.turret_gun, -14, -19, 28, 28);
    cx.restore();
  }
  if (b.built < 1) {
    cx.globalAlpha = 1;
    cx.fillStyle = 'rgba(255,255,255,0.8)';
    cx.font = '11px -apple-system, sans-serif';
    cx.textAlign = 'center';
    cx.fillText(Math.floor(b.built * 100) + '%', b.x, b.y - b.h / 2 - 8);
  }
  cx.globalAlpha = 1;
}

// industrial hazard striping: yellow band with dark diagonals, clipped to a rect
function drawHazardBand(x, y, w, h) {
  cx.save();
  cx.beginPath(); cx.rect(x, y, w, h); cx.clip();
  cx.fillStyle = HAZARD_YELLOW;
  cx.fillRect(x, y, w, h);
  cx.strokeStyle = '#26241f';
  cx.lineWidth = 3;
  cx.beginPath();
  for (let i = -h; i < w + h; i += 8) { cx.moveTo(x + i, y + h + 2); cx.lineTo(x + i + h + 4, y - 2); }
  cx.stroke();
  cx.restore();
}

// Phase B accent overlays (STYLE-GUIDE.md): each building's signature detail,
// drawn over the tinted body so sprite and procedural paths both get it
function drawBuildingDecor(b) {
  if (b.built < 1) return;
  const C = COLORS[b.team];
  const x = b.x - b.w / 2, y = b.y - b.h / 2;
  if (b.type === 'barracks') {
    // awning stripes over the door
    for (let i = 0; i < 5; i++) {
      cx.fillStyle = i % 2 ? C.trim : C.accent;
      cx.fillRect(b.x - 15 + i * 6, y + b.h - 27, 6, 5);
    }
  } else if (b.type === 'factory') {
    drawHazardBand(b.x - 17, y + b.h - 23, 34, 5);   // hazard-striped bay door lintel
  } else if (b.type === 'supply') {
    cx.fillStyle = C.trim;
    cx.globalAlpha = 0.75;
    cx.fillRect(x + 7, y + 5, b.w - 14, 3);          // one trim band across the pad
    cx.globalAlpha = 1;
  } else if (b.type === 'turret' || b.type === 'flak') {
    // status light: steady blink while the grid holds (brownout swaps it for the ⚡)
    if (tick % 70 < 45 && !lowPower(b.team)) {
      cx.fillStyle = C.accent;
      cx.beginPath(); cx.arc(x + b.w - 5, y + 5, 2, 0, Math.PI * 2); cx.fill();
    }
  } else if (b.type === 'silo') {
    cx.strokeStyle = C.accent;
    cx.globalAlpha = 0.7;
    cx.setLineDash([5, 4]);
    cx.lineWidth = 2;
    cx.beginPath(); cx.arc(b.x, b.y, 20, 0, Math.PI * 2); cx.stroke();
    cx.setLineDash([]);
    cx.globalAlpha = 1;
  }
}

// Rubicon Mining's pennant: dark-red flag on a pole at the HQ's corner, waving
// on the sim tick, with the company's diamond sigil. Cheap, reads at a glance.
function drawRubiconBanner(b) {
  const px = b.x - b.w / 2 + 12, py = b.y - b.h / 2 + 6;
  cx.strokeStyle = '#22201d';
  cx.lineWidth = 2;
  cx.beginPath(); cx.moveTo(px, py); cx.lineTo(px, py + 28); cx.stroke();
  const wave = Math.sin(tick * 0.06) * 2;
  cx.fillStyle = '#8f2f27';
  cx.beginPath();
  cx.moveTo(px, py);
  cx.lineTo(px + 21 + wave, py + 3);
  cx.lineTo(px + 15 + wave * 0.6, py + 6);
  cx.lineTo(px + 21 + wave, py + 9);
  cx.lineTo(px, py + 12);
  cx.closePath(); cx.fill();
  cx.fillStyle = '#f5a89a';   // diamond sigil
  cx.save();
  cx.translate(px + 7, py + 6);
  cx.rotate(Math.PI / 4);
  cx.fillRect(-2.5, -2.5, 5, 5);
  cx.restore();
}

// the plant's humming lightning-bolt emblem (shared by sprite + procedural paths)
function drawPowerBolt(b) {
  const hum = 0.8 + Math.sin(tick * 0.12) * 0.2;
  cx.fillStyle = `rgba(240,200,106,${hum})`;
  cx.beginPath();
  cx.moveTo(b.x + 3, b.y - 13); cx.lineTo(b.x - 7, b.y + 2); cx.lineTo(b.x - 1, b.y + 2);
  cx.lineTo(b.x - 3, b.y + 13); cx.lineTo(b.x + 7, b.y - 2); cx.lineTo(b.x + 1, b.y - 2);
  cx.closePath(); cx.fill();
}

// mound + eggs + rib bones; pulses so it reads as alive
function drawNest(b) {
  const img = opt('dino_nest');
  if (img) {
    const pulse = 1 + Math.sin(tick * 0.05) * 0.02;
    const w = b.w * 1.15 * pulse, h = b.h * 1.15 * pulse;
    cx.drawImage(img, b.x - w / 2, b.y - h / 2, w, h);
    return;
  }
  const C = COLORS[3];
  const pulse = 1 + Math.sin(tick * 0.05) * 0.03;
  cx.save();
  cx.translate(b.x, b.y);
  cx.fillStyle = '#3a3226';                                  // dirt mound
  cx.beginPath(); cx.ellipse(0, 0, b.w / 2 * pulse, b.h / 2 * 0.82 * pulse, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = C.dark;                                     // mossy rim
  cx.beginPath(); cx.ellipse(0, 0, b.w / 2 * 0.8, b.h / 2 * 0.62, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = '#2a2419';                                  // inner hollow
  cx.beginPath(); cx.ellipse(0, 2, b.w / 2 * 0.55, b.h / 2 * 0.42, 0, 0, Math.PI * 2); cx.fill();
  cx.strokeStyle = '#cfc5a8'; cx.lineWidth = 2;              // rib bones around the rim
  for (const a of [0.6, 1.6, 2.7, 4.1, 5.2]) {
    cx.beginPath();
    cx.arc(Math.cos(a) * b.w * 0.36, Math.sin(a) * b.h * 0.3, 6, a - 1.2, a + 1.2);
    cx.stroke();
  }
  for (let i = 0; i < 3; i++) {                              // egg clutch
    const ex = (i - 1) * 9, ey = 2 + (i % 2) * 5;
    cx.fillStyle = '#e8e2cc';
    cx.beginPath(); cx.ellipse(ex, ey, 5, 6.5, 0.2 * (i - 1), 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(ex - 1, ey - 2, 1.3, 0, Math.PI * 2); cx.fill();   // speckle
  }
  cx.restore();
}

// the dam is a WALL across the river: abutments on both banks, spillway
// gates, turbine housings, churning outflow. Oriented by b.a (set at
// placement from the local flow) — never the axis-aligned box that read
// as "a big turret" (playtest 2026-07-25).
function drawHydroDam(b, sel) {
  const C = COLORS[b.team];
  const a = b.a || 0;
  const len = 172, thick = 30;   // spans the r52 channel bands bank to bank
  cx.save();
  cx.translate(b.x, b.y);
  cx.rotate(a);
  if (b.built < 1) cx.globalAlpha = 0.75;
  // upstream shadow water pooling against the wall
  cx.fillStyle = 'rgba(4,10,12,0.55)';
  cx.fillRect(-len / 2 + 10, -thick / 2 - 12, len - 20, 12);
  // abutments biting into each bank
  cx.fillStyle = '#232a25';
  rr(cx, -len / 2, -thick / 2 - 4, 26, thick + 8, 5); cx.fill();
  rr(cx, len / 2 - 26, -thick / 2 - 4, 26, thick + 8, 5); cx.fill();
  // the wall
  cx.fillStyle = '#1b2321';
  rr(cx, -len / 2 + 22, -thick / 2, len - 44, thick, 6); cx.fill();
  cx.strokeStyle = b.built < 1 ? 'rgba(200,220,210,0.5)' : (C.bld || C.main);
  cx.lineWidth = 2;
  if (b.built < 1) cx.setLineDash([6, 5]);
  rr(cx, -len / 2 + 22, -thick / 2, len - 44, thick, 6); cx.stroke();
  cx.setLineDash([]);
  // turbine housings along the wall
  cx.fillStyle = C.bld || C.main;
  for (const hx of [-38, 0, 38]) {
    rr(cx, hx - 11, -9, 22, 18, 3); cx.fill();
    cx.fillStyle = '#0d1413';
    cx.fillRect(hx - 7, -3, 14, 6);
    cx.fillStyle = C.bld || C.main;
  }
  // spillway churn on the downstream side — animated white water
  if (b.built >= 1) {
    for (const hx of [-38, 0, 38]) {
      for (let i = 0; i < 3; i++) {
        const ph = ((tick * 1.6 + i * 9 + hx) % 26);
        cx.strokeStyle = 'rgba(210,240,235,' + (0.35 - ph * 0.012) + ')';
        cx.lineWidth = 2.2;
        cx.beginPath();
        cx.moveTo(hx - 8, thick / 2 + 2 + ph);
        cx.lineTo(hx + 8, thick / 2 + 2 + ph);
        cx.stroke();
      }
    }
  }
  cx.globalAlpha = 1;
  cx.restore();
  if (b.built < 1) {
    cx.fillStyle = 'rgba(255,255,255,0.8)';
    cx.font = '11px -apple-system, sans-serif';
    cx.textAlign = 'center';
    cx.fillText(Math.floor(b.built * 100) + '%', b.x, b.y - 48);
  }
  if (sel) {
    cx.strokeStyle = 'rgba(255,255,255,0.85)';
    cx.lineWidth = 2;
    const m = 96, L = 12;
    cx.beginPath();
    cx.moveTo(b.x - m, b.y - 52 + L); cx.lineTo(b.x - m, b.y - 52); cx.lineTo(b.x - m + L, b.y - 52);
    cx.moveTo(b.x + m - L, b.y - 52); cx.lineTo(b.x + m, b.y - 52); cx.lineTo(b.x + m, b.y - 52 + L);
    cx.moveTo(b.x + m, b.y + 52 - L); cx.lineTo(b.x + m, b.y + 52); cx.lineTo(b.x + m - L, b.y + 52);
    cx.moveTo(b.x - m + L, b.y + 52); cx.lineTo(b.x - m, b.y + 52); cx.lineTo(b.x - m, b.y + 52 - L);
    cx.stroke();
  }
}
function drawBuilding(b) {
  const C = COLORS[b.team];
  const x = b.x - b.w / 2, y = b.y - b.h / 2;
  const sel = selection.includes(b);

  if (b.type === 'nest') {
    drawNest(b);
    if (b.hp < b.maxHp) drawHpBar(b.x, y - 10, b.w * 0.8, b.hp, b.maxHp);
    return;
  }
  if (b.type === 'den') {
    drawDen(b);
    if (b.hp < b.maxHp) drawHpBar(b.x, y - 10, b.w * 0.8, b.hp, b.maxHp);
    return;
  }
  if (b.type === 'hydro') {
    drawHydroDam(b, sel);
    if (sel || b.hp < b.maxHp) drawHpBar(b.x, b.y - 60, b.w * 0.8, b.hp, b.maxHp);
    return;
  }
  // a lowered structure draws as a recessed pit: full-footprint dark plate,
  // then the body squashed and dimmed inside it (units drive over the top)
  const sunk = b.sunk && b.built >= 1;
  if (sunk) {
    cx.fillStyle = 'rgba(0,0,0,0.35)';
    rr(cx, x, y, b.w, b.h, 10); cx.fill();
    cx.strokeStyle = 'rgba(0,0,0,0.45)'; cx.lineWidth = 2;
    rr(cx, x + 2, y + 2, b.w - 4, b.h - 4, 8); cx.stroke();
    cx.save();
    cx.translate(b.x, b.y);
    cx.scale(0.6, 0.6);
    cx.translate(-b.x, -b.y);
    cx.globalAlpha *= 0.85;
  }
  if (bodiesReady) {
    drawBuildingSprite(b, x, y);
  } else {
  cx.fillStyle = '#232a25';
  rr(cx, x, y, b.w, b.h, 8); cx.fill();
  cx.strokeStyle = b.built < 1 ? 'rgba(200,220,210,0.5)' : C.main;
  cx.lineWidth = 2;
  if (b.built < 1) cx.setLineDash([6, 5]);
  rr(cx, x, y, b.w, b.h, 8); cx.stroke();
  cx.setLineDash([]);

  if (b.type === 'hq') {
    cx.fillStyle = '#1a201c';
    rr(cx, x + 13, y + 13, b.w - 26, b.h - 26, 6); cx.fill();
    cx.strokeStyle = C.dark; rr(cx, x + 13, y + 13, b.w - 26, b.h - 26, 6); cx.stroke();
    const pulse = 8 + Math.sin(tick * 0.08) * 2;
    cx.fillStyle = C.main;
    cx.save(); cx.translate(b.x, b.y); cx.rotate(Math.PI / 4);
    cx.fillRect(-pulse / 2, -pulse / 2, pulse, pulse);
    cx.restore();
    cx.fillStyle = C.light;
    cx.beginPath(); cx.arc(x + b.w - 16, y + 14, 3, 0, Math.PI * 2); cx.fill();
  } else if (b.type === 'barracks') {
    cx.fillStyle = C.dark;
    cx.fillRect(b.x - 12, y + b.h - 26, 24, 26);
    cx.fillStyle = C.main;
    for (let i = 0; i < 3; i++) cx.fillRect(x + 10, y + 12 + i * 10, b.w - 20, 3);
  } else if (b.type === 'turret') {
    cx.fillStyle = '#1a201c';
    cx.beginPath(); cx.arc(b.x, b.y, 13, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 4;
    cx.beginPath();
    cx.moveTo(b.x, b.y);
    cx.lineTo(b.x + Math.cos(b.faceA) * 22, b.y + Math.sin(b.faceA) * 22);
    cx.stroke();
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(b.x, b.y, 6, 0, Math.PI * 2); cx.fill();
    if (b.built < 1) {
      cx.fillStyle = 'rgba(255,255,255,0.8)';
      cx.font = '11px -apple-system, sans-serif';
      cx.textAlign = 'center';
      cx.fillText(Math.floor(b.built * 100) + '%', b.x, b.y - b.h / 2 - 8);
    }
  } else if (b.type === 'factory') {
    cx.fillStyle = C.dark;
    cx.fillRect(b.x - 17, y + b.h - 20, 34, 20);
    cx.fillStyle = C.main;
    cx.fillRect(x + 10, y + 12, b.w - 20, 4);
  } else if (b.type === 'supply') {
    cx.fillStyle = C.main;
    cx.fillRect(b.x - 16, b.y - 12, 13, 13);
    cx.fillRect(b.x + 3, b.y - 12, 13, 13);
    cx.fillRect(b.x - 6, b.y + 3, 13, 13);
  } else if (b.type === 'power') {
    drawPowerBolt(b);
  } else if (b.type === 'refinery') {
    cx.fillStyle = CRYSTAL_COLOR;
    cx.beginPath();
    cx.moveTo(b.x, b.y - 12); cx.lineTo(b.x + 8, b.y); cx.lineTo(b.x, b.y + 12); cx.lineTo(b.x - 8, b.y);
    cx.closePath(); cx.fill();
  } else if (b.type === 'silo') {
    cx.strokeStyle = C.main; cx.lineWidth = 2;
    cx.beginPath(); cx.arc(b.x, b.y, 16, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = '#141a15';
    cx.beginPath(); cx.arc(b.x, b.y, 13, 0, Math.PI * 2); cx.fill();
    if (b.warhead) {
      cx.fillStyle = '#e0564a';
      cx.beginPath(); cx.ellipse(b.x, b.y, 4.5, 10, 0, 0, Math.PI * 2); cx.fill();
    }
  } else if (b.type === 'flak') {
    cx.fillStyle = '#1a201c';
    cx.beginPath(); cx.arc(b.x, b.y, 13, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 3;
    for (const off of [-0.22, 0.22]) {
      cx.beginPath();
      cx.moveTo(b.x, b.y);
      cx.lineTo(b.x + Math.cos(b.faceA + off) * 20, b.y + Math.sin(b.faceA + off) * 20);
      cx.stroke();
    }
    cx.fillStyle = C.light;
    cx.beginPath(); cx.arc(b.x, b.y, 4, 0, Math.PI * 2); cx.fill();
  } else if (b.type === 'airpad') {
    cx.strokeStyle = C.light; cx.lineWidth = 2;
    cx.beginPath(); cx.arc(b.x, b.y, 15, 0, Math.PI * 2); cx.stroke();
    cx.lineWidth = 3;
    cx.beginPath();
    cx.moveTo(b.x - 5, b.y - 6); cx.lineTo(b.x - 5, b.y + 6);
    cx.moveTo(b.x + 5, b.y - 6); cx.lineTo(b.x + 5, b.y + 6);
    cx.moveTo(b.x - 5, b.y); cx.lineTo(b.x + 5, b.y);
    cx.stroke();
  }
  }

  // Phase B signature details + Rubicon's flag (drawn here so sprite AND
  // procedural paths both get them)
  drawBuildingDecor(b);
  if (b.type === 'hq' && b.team === 2 && b.built >= 1) drawRubiconBanner(b);
  if (sunk) cx.restore();   // selection corners + hp bar stay full-footprint

  if (sel) {
    cx.strokeStyle = 'rgba(255,255,255,0.85)';
    cx.lineWidth = 2;
    const m = 6, L = 12;
    const x0 = x - m, y0 = y - m, x1 = x + b.w + m, y1 = y + b.h + m;
    cx.beginPath();
    cx.moveTo(x0, y0 + L); cx.lineTo(x0, y0); cx.lineTo(x0 + L, y0);
    cx.moveTo(x1 - L, y0); cx.lineTo(x1, y0); cx.lineTo(x1, y0 + L);
    cx.moveTo(x1, y1 - L); cx.lineTo(x1, y1); cx.lineTo(x1 - L, y1);
    cx.moveTo(x0 + L, y1); cx.lineTo(x0, y1); cx.lineTo(x0, y1 - L);
    cx.stroke();
    // rally line
    if (b.rally && BLD[b.type].trains) {
      cx.strokeStyle = 'rgba(143,216,207,0.5)';
      cx.setLineDash([5, 6]);
      cx.beginPath(); cx.moveTo(b.x, b.y); cx.lineTo(b.rally.x, b.rally.y); cx.stroke();
      cx.setLineDash([]);
      cx.fillStyle = '#8fd8cf';
      cx.beginPath(); cx.arc(b.rally.x, b.rally.y, 4, 0, Math.PI * 2); cx.fill();
    }
    // repair field ring on a selected depot
    if (b.type === 'supply' && b.built >= 1) {
      cx.strokeStyle = 'rgba(140,230,160,0.35)';
      cx.setLineDash([4, 6]);
      cx.beginPath(); cx.arc(b.x, b.y, DEPOT_HEAL_RADIUS, 0, Math.PI * 2); cx.stroke();
      cx.setLineDash([]);
    }
  }
  // browned-out consumers wave a blinking bolt so the shortage is visible on the map
  if (BLD[b.type].pow && b.built >= 1 && tick % 50 < 30 && lowPower(b.team)) {
    cx.fillStyle = '#f0c86a';
    cx.font = 'bold 14px -apple-system, sans-serif';
    cx.textAlign = 'center';
    cx.fillText('⚡', b.x, y - 16);
  }
  if (sel || b.hp < b.maxHp) drawHpBar(b.x, y - 12, b.w * 0.8, b.hp, b.maxHp);
  if (b.queue && b.queue.length) {
    const f = clamp(b.prog / queueTime(b.team, b.queue[0]), 0, 1);
    cx.fillStyle = 'rgba(0,0,0,0.6)'; cx.fillRect(b.x - 20, y - 6, 40, 3);
    cx.fillStyle = '#3fb9c9'; cx.fillRect(b.x - 20, y - 6, 40 * f, 3);
  }
}

// called inside a translate(u.x,u.y)+rotate(u.faceA) transform, so +x is forward.
// Infantry art faces right (no extra rotation); vehicle art points up (rotate +90°).
function drawUnitSprite(u) {
  // walk cycle: real frames sliced from an AI walk video (slice_walk.py).
  // Frame advances with DISTANCE (walkT), not time, so feet read planted.
  // (A 2026-07-12 spritesheet walk attempt was reverted — too few frames,
  // wrong cadence; this 8-frame video slice is the do-over, 2026-07-20.)
  let walk = null;
  if (u.moving && u.order.type !== 'hunker') {
    const wf = animFrames(u.type, 'walk', u.team, 8);
    if (wf.length) walk = wf[Math.floor(u.walkT / (strideOf(u.type) / wf.length)) % wf.length];
  }
  // pre-colored colorway art wins outright — drawn as-is, no tint
  const pre = walk
    || (u.order.type === 'hunker' && optCW('unit_' + u.type + '_hunker', u.team))
    || optCW('unit_' + u.type, u.team);
  if (pre) {
    cx.rotate(Math.PI / 2);              // generated art faces up
    const s = u.r * 2.7;
    cx.drawImage(pre, -s / 2, -s / 2, s, s);
    return;
  }
  // dug-in units swap to their hunker pose; a missing standing sprite falls
  // back to the hunker art so partial art sets never break
  const hk = opt('unit_' + u.type + '_hunker');
  const whole = (u.order.type === 'hunker' && hk) || opt('unit_' + u.type) || hk;
  if (whole) {
    cx.rotate(Math.PI / 2);              // generated art faces up
    const s = u.r * 2.7;
    cx.drawImage(teamSprite(whole, u.team), -s / 2, -s / 2, s, s);
    return;
  }
  if (u.type === 'medic') {
    const img = opt('medic');
    if (img) {
      cx.drawImage(teamSprite(img, u.team), -12, -12, 24, 24);   // dedicated art faces right like infantry
    } else {
      const base = teamSprite(BODY.inf_engineer, u.team);
      const w = 24, h = w * base.height / base.width;
      cx.drawImage(base, -w * 0.45, -h / 2, w, h);
    }
    cx.rotate(-u.faceA);                    // badge stays upright
    cx.fillStyle = '#f2f2ee';
    cx.beginPath(); cx.arc(0, -9, 4.5, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#d84a3e';
    cx.fillRect(-1.2, -12.2, 2.4, 6.4); cx.fillRect(-3.2, -10.2, 6.4, 2.4);
    cx.rotate(u.faceA);
    return;
  }
  if (u.type === 'rocket') {
    const img = opt('rocket_trooper');
    if (img) { cx.drawImage(teamSprite(img, u.team), -12, -12, 24, 24); return; }
    const base = teamSprite(BODY.inf_marine, u.team);
    const w = 25, h = w * base.height / base.width;
    cx.drawImage(base, -w * 0.45, -h / 2, w, h);
    cx.fillStyle = '#3a3f38';                    // launch tube over the shoulder
    cx.fillRect(-6, -8, 17, 4);
    cx.fillStyle = '#e0564a';
    cx.fillRect(10, -8, 2.5, 4);                 // loaded rocket tip
    return;
  }
  if (u.type === 'marine' || u.type === 'sniper' || u.type === 'engineer') {
    const img = teamSprite(BODY['inf_' + u.type], u.team);
    const w = u.type === 'sniper' ? 30 : u.type === 'marine' ? 26 : 24;
    const h = w * img.height / img.width;
    cx.drawImage(img, -w * 0.45, -h / 2, w, h);
    return;
  }
  cx.rotate(Math.PI / 2);   // vehicle sprites point up
  if (u.type === 'tank') {
    cx.drawImage(teamSprite(BODY.tank_body, u.team), -16, -15, 32, 30);
    cx.drawImage(teamSprite(BODY.tank_barrel, u.team), -3.5, -21, 7, 24);
  } else if (u.type === 'artillery') {
    const art = opt('artillery');
    if (art) { cx.drawImage(teamSprite(art, u.team), -16, -20, 32, 40); return; }
    // narrow chassis, extra-long tube — reads as "siege" next to the tank
    cx.drawImage(teamSprite(BODY.tank_body, u.team), -12, -14, 24, 28);
    cx.drawImage(teamSprite(BODY.tank_barrel, u.team), -3, -32, 6, 34);
  } else if (u.type === 'apc') {
    const img = opt('apc');
    if (img) { cx.drawImage(teamSprite(img, u.team), -16, -15, 32, 30); }
    else {
      cx.drawImage(teamSprite(BODY.tank_body, u.team), -16, -14, 32, 28);
      cx.drawImage(BODY.crate, -8, -10, 16, 16);
      cx.fillStyle = '#12171380';                // troop bay doors
      cx.fillRect(-13, 6, 26, 5);
    }
  } else if (u.type === 'raider') {
    cx.drawImage(teamSprite(BODY.tank_body, u.team), -10, -13, 20, 26);
    cx.drawImage(teamSprite(BODY.raider_barrel, u.team), -2.5, -22, 5, 24);
  } else if (u.type === 'rig') {
    // harvester chassis with a containment cage bolted on the bed
    const hv = opt('unit_harvester');
    if (hv) { const s = u.r * 2.7; cx.drawImage(teamSprite(hv, u.team), -s / 2, -s / 2, s, s); }
    else cx.drawImage(teamSprite(BODY.tank_body, u.team), -13, -12, 26, 24);
    drawRigCage(u);
  } else { // harvester
    cx.drawImage(teamSprite(BODY.tank_body, u.team), -13, -12, 26, 24);
    cx.drawImage(BODY.crate, -7, -7, 14, 14);
    if (u.eggCarry) {
      cx.fillStyle = '#e8e2cc';
      cx.beginPath(); cx.ellipse(0, 0, 4, 5.2, 0, 0, Math.PI * 2); cx.fill();
    } else if (u.carry > 0) {
      cx.fillStyle = CRYSTAL_COLOR;
      cx.fillRect(-4, -4, 8, 8);
    }
  }
}

// the rig's cage, drawn in the unit's rotated frame (+y = rear of the truck
// after the vehicle-sprite rotate). Glows green with a specimen inside.
function drawRigCage(u) {
  if (u.captive) {
    cx.fillStyle = 'rgba(143,201,74,0.5)';
    rr(cx, -7, -3, 14, 12, 3); cx.fill();
    cx.fillStyle = '#8fc94a';
    cx.beginPath(); cx.ellipse(0, 3, 4.5, 3.2, 0, 0, Math.PI * 2); cx.fill();
  }
  cx.strokeStyle = u.captive ? '#c7f08a' : '#e8e2cc';
  cx.lineWidth = 1.5;
  rr(cx, -7, -3, 14, 12, 3); cx.stroke();
  cx.beginPath();
  cx.moveTo(-7, 3); cx.lineTo(7, 3);
  cx.moveTo(-2.5, -3); cx.lineTo(-2.5, 9);
  cx.moveTo(2.5, -3); cx.lineTo(2.5, 9);
  cx.stroke();
}

// procedural dino — drawn inside the unit's translate+rotate frame, +x forward.
// Team-colored: wild ones are acid green, hatched player dinos wear teal.
// No sprite art yet; when dino sprites land they slot in via drawUnitSprite.
// How big a dino's ART draws, as a multiple of its hit radius. Most dino art
// fills its circle; the raptor's whip tail and the screecher's wingspan hang
// outside it harmlessly, so those need a wider box for the BODY to read at the
// right mass. Derived from r (it used to be hard-coded at 17/13, which meant
// a dino's size ignored its own radius — the Ironback drew at 26px with a 43px
// hit circle). dinoBox is shared with the corpse fx so a body can't change
// size the instant it dies.
const DINO_BOX = { raptor: 1.9, screecher: 1.6, ironback: 2.1, broodmother: 2.2 };
const dinoBox = (type, r) => r * (DINO_BOX[type] || 1.3);
function drawDino(u) {
  // pre-colored colorway first (wild bone/moss art, or teal for tamed)
  const half = dinoBox(u.type, u.r);
  // walk frames (sliced dino videos) win while moving — same distance-driven
  // cycle as infantry, so the gait speed tracks actual ground covered
  let pre = null;
  if (u.moving) {
    const wf = animFrames(u.type, 'walk', u.team, 8);
    if (wf.length) pre = wf[Math.floor(u.walkT / (strideOf(u.type) / wf.length)) % wf.length];
  }
  pre = pre || optCW('unit_' + u.type, u.team);
  if (pre) {
    cx.rotate(Math.PI / 2);   // art faces up
    cx.drawImage(pre, -half, -half, half * 2, half * 2);
    return;
  }
  const img = opt('unit_' + u.type) || (u.type === 'spitter' && opt('dino_spitter'));
  if (img) {
    cx.rotate(Math.PI / 2);   // art faces up
    cx.drawImage(teamSprite(img, u.team), -half, -half, half * 2, half * 2);
    return;
  }
  const C = COLORS[u.team];
  if (u.type === 'critter') {
    // dumpy little grazer: dome back, head down in the moss, stub tail
    const bob = Math.sin(tick * 0.06 + u.id) * 0.8;
    cx.fillStyle = C.dark;                            // stub tail
    cx.beginPath(); cx.moveTo(-6, -1.5); cx.lineTo(-9.5, 0); cx.lineTo(-6, 1.5); cx.closePath(); cx.fill();
    cx.fillStyle = C.main;                            // dome body
    cx.beginPath(); cx.ellipse(0, 0, 6.5, 4.5, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.dark;                            // moss saddle
    cx.beginPath(); cx.ellipse(-0.5, 0, 3.4, 2.2, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.main;                            // grazing head, bobbing
    cx.beginPath(); cx.ellipse(6.5 + bob * 0.4, 0, 2.8, 2.1, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#e0a43c';                         // one placid amber eye
    cx.beginPath(); cx.arc(6.8 + bob * 0.4, -1, 0.7, 0, Math.PI * 2); cx.fill();
    return;
  }
  if (u.type === 'raptor') {
    // sleek pack hunter: whip tail, coiled haunches, head low and forward
    const wag = Math.sin(tick * 0.35 + u.id) * 3.5;
    cx.fillStyle = C.dark;                            // whip tail
    cx.beginPath();
    cx.moveTo(-3, -2); cx.lineTo(-16, wag); cx.lineTo(-3, 2);
    cx.closePath(); cx.fill();
    cx.fillStyle = C.main;                            // low lean body
    cx.beginPath(); cx.ellipse(0, 0, 8, 3.8, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.dark;                            // back stripes
    cx.beginPath(); cx.ellipse(-1.5, 0, 3.5, 1.8, 0, 0, Math.PI * 2); cx.fill();
    const gait = u.moving ? Math.sin(u.walkT * 0.7) * 2.5 : 0;
    cx.strokeStyle = C.dark; cx.lineWidth = 2;        // sickle-claw legs
    cx.beginPath();
    cx.moveTo(1, -3); cx.lineTo(4 + gait, -6);
    cx.moveTo(1, 3); cx.lineTo(4 - gait, 6);
    cx.stroke();
    cx.fillStyle = C.main;                            // narrow snout
    cx.beginPath(); cx.ellipse(9.5, 0, 4.5, 2.4, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#e0a43c';                         // amber predator eyeshine
    cx.beginPath(); cx.arc(8.5, -1.7, 0.9, 0, Math.PI * 2); cx.arc(8.5, 1.7, 0.9, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = '#cfc5a8'; cx.lineWidth = 1;     // bared teeth at the jaw line
    cx.beginPath(); cx.moveTo(11, -1); cx.lineTo(13.5, 0); cx.lineTo(11, 1); cx.stroke();
    return;
  }
  if (u.type === 'broodmother') {
    // The finale boss, v3 anatomy (DINOS-ACT23): what reads as DINOSAUR from
    // overhead is the LONG AXIS — skull, spine and tail in one line, ~3x
    // longer than wide, legs hidden under the mass. Round body + splayed
    // limbs is a tick, whatever the label says (Bronson, twice now).
    // Facing +x like every procedural dino.
    const pulse = 0.5 + 0.35 * Math.abs(Math.sin(tick * 0.06));
    const sway = u.moving ? Math.sin(u.walkT * 0.18) * 4 : Math.sin(tick * 0.03 + u.id) * 1.5;
    const RUST = '#8f4a3e', RUST_D = '#5e2f28', PLATE = '#4a4148', VEIN = `rgba(176,106,232,${pulse})`;
    // the long heavy tail — a third of her whole length, swinging with the stride
    cx.fillStyle = RUST;
    cx.beginPath();
    cx.moveTo(-8, -7);
    cx.quadraticCurveTo(-26, -6, -44, sway - 1.5);
    cx.lineTo(-44, sway + 1.5);
    cx.quadraticCurveTo(-26, 6, -8, 7);
    cx.closePath(); cx.fill();
    // hind feet: claws just peeking out from UNDER the hips, not splayed wide
    const gait = u.moving ? Math.sin(u.walkT * 0.32) * 5 : 0;
    cx.strokeStyle = RUST_D; cx.lineWidth = 4.5;
    cx.beginPath();
    cx.moveTo(-4, -6); cx.lineTo(0 + gait, -12);
    cx.moveTo(-4, 6);  cx.lineTo(0 - gait, 12);
    cx.stroke();
    cx.fillStyle = RUST;                                // egg-swollen hips: the widest point of a LONG body
    cx.beginPath(); cx.ellipse(-5, 0, 13, 10.5, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = RUST;                                // ribcage narrowing to the waist, then shoulders
    cx.beginPath(); cx.ellipse(10, 0, 11, 7.5, 0, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = RUST_D; cx.lineWidth = 2.6;        // small forearms tucked under the chest
    cx.beginPath();
    cx.moveTo(16, -4); cx.lineTo(20, -6.5);
    cx.moveTo(16, 4);  cx.lineTo(20, 6.5);
    cx.stroke();
    cx.fillStyle = PLATE;                               // carapace grown over back and hips
    cx.beginPath(); cx.ellipse(-5, 0, 9.5, 7.5, 0, 0, Math.PI * 2); cx.fill();
    cx.beginPath(); cx.ellipse(9, 0, 7, 5, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = VEIN;                                // egg-glow clustered over the hips
    for (const [ex, ey] of [[-8, -4.5], [-2, 5], [-9, 4], [-1, -5]]) {
      cx.beginPath(); cx.arc(ex, ey, 1.9, 0, Math.PI * 2); cx.fill();
    }
    cx.strokeStyle = VEIN; cx.lineWidth = 1.4;          // one biolum vein riding the spine seam
    cx.beginPath(); cx.moveTo(18, 0); cx.quadraticCurveTo(-20, 0, -40, sway); cx.stroke();
    cx.fillStyle = RUST;                                // thick neck flowing into the skull
    cx.beginPath(); cx.ellipse(20, 0, 6.5, 5, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = RUST;                                // the skull: huge, broad, a real jaw
    cx.beginPath();
    cx.moveTo(24, -6.5);
    cx.quadraticCurveTo(36, -5.5, 40, -1.8);
    cx.lineTo(40, 1.8);
    cx.quadraticCurveTo(36, 5.5, 24, 6.5);
    cx.closePath(); cx.fill();
    cx.strokeStyle = '#cfc5a8'; cx.lineWidth = 1.3;     // toothline down the snout
    cx.beginPath(); cx.moveTo(34, -3.4); cx.lineTo(40.5, 0); cx.lineTo(34, 3.4); cx.stroke();
    cx.fillStyle = RUST_D;                              // bony spine ridge, skull to tail
    for (let i = 0; i < 7; i++) {
      const sx2 = 20 - i * 8;
      cx.beginPath(); cx.moveTo(sx2, -1.8); cx.lineTo(sx2 - 3, 0); cx.lineTo(sx2, 1.8); cx.closePath(); cx.fill();
    }
    cx.fillStyle = '#e0a43c';                           // amber eyes — the lineage cue
    cx.beginPath(); cx.arc(26, -4, 1.4, 0, Math.PI * 2); cx.arc(26, 4, 1.4, 0, Math.PI * 2); cx.fill();
    return;
  }
  const wag = Math.sin(tick * 0.25 + u.id) * 3;    // tail sway
  cx.fillStyle = C.dark;                            // tail
  cx.beginPath();
  cx.moveTo(-4, -3); cx.lineTo(-15, wag); cx.lineTo(-4, 3);
  cx.closePath(); cx.fill();
  cx.fillStyle = C.main;                            // body
  cx.beginPath(); cx.ellipse(0, 0, 8.5, 5.5, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = C.dark;                            // back stripes
  cx.beginPath(); cx.ellipse(-1, 0, 4.5, 2.5, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = C.main;                            // head
  cx.beginPath(); cx.ellipse(9, 0, 4.5, 3.4, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = '#a8d060';                         // throat sac — venom is biology, not faction
  cx.beginPath(); cx.arc(7, 0, 2, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = '#e0a43c';                         // amber predator eyeshine
  cx.beginPath(); cx.arc(9.5, -2.2, 1, 0, Math.PI * 2); cx.arc(9.5, 2.2, 1, 0, Math.PI * 2); cx.fill();
}

// the Broodmother's living glow — pulsing purple over her egg-swollen hips and
// a vein riding the spine seam. Drawn in the facing frame (+x = head), after
// the body, so it composites over the installed sprite and the procedural
// fallback alike. Layered low-alpha circles, no per-frame gradients.
// One soft radial glow blob, pre-rendered ONCE — every visible glow is this
// sprite at some size and alpha. Hard-edged arcs and stroked "veins" read as
// lines scribbled over the art (Bronson); a gradient sprite has real falloff.
let broodGlowCv = null;
function broodGlowSprite() {
  if (broodGlowCv) return broodGlowCv;
  broodGlowCv = document.createElement('canvas');
  broodGlowCv.width = broodGlowCv.height = 64;
  const g = broodGlowCv.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 32);
  grad.addColorStop(0, 'rgba(210,150,255,0.85)');
  grad.addColorStop(0.45, 'rgba(176,106,232,0.32)');
  grad.addColorStop(1, 'rgba(176,106,232,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return broodGlowCv;
}
function drawBroodGlow(u) {
  const img = broodGlowSprite();
  const s = dinoBox(u.type, u.r) / 45;   // glow tracks the draw box, not fixed px
  cx.save(); cx.scale(s, s);
  cx.globalCompositeOperation = 'lighter';   // it's LIGHT — additive, one flip per frame
  const beat = tick * 0.05 + u.id;
  const blob = (x, y, r, a) => {
    if (a <= 0.015) return;
    cx.globalAlpha = Math.min(1, a);
    cx.drawImage(img, x - r, y - r, r * 2, r * 2);
  };
  // a modest egg-glow at the hips — the SPINE is the show, not this
  blob(-8, 0, 13, 0.26 + 0.1 * Math.abs(Math.sin(beat)));
  // the corruption lives along her BACK: an always-lit ribbon of light from
  // the hip mass up to the neck, with a brighter pulse climbing it
  for (let i = 0; i < 9; i++) {
    const px = -14 + i * 5;                 // -14 (hips) … +26 (neck)
    const pr = 5.5 - i * 0.18;              // narrowing as the ridge does
    const travel = 0.28 * Math.max(0, Math.sin(beat * 1.6 - i * 0.5));
    blob(px, 0, pr, 0.2 + travel);
  }
  cx.globalAlpha = 1;
  cx.globalCompositeOperation = 'source-over';
  cx.restore();
}

// raptor den — a burrow torn into the dirt, ringed by kill-trophies. Where the
// nest reads "clutch to defend", the den reads "something lives here and leaves".
function drawDen(b) {
  const img = opt('dino_den');
  if (img) {
    const pulse = 1 + Math.sin(tick * 0.05) * 0.02;
    const w = b.w * 1.15 * pulse, h = b.h * 1.15 * pulse;
    cx.drawImage(img, b.x - w / 2, b.y - h / 2, w, h);
    return;
  }
  const C = COLORS[3];
  cx.save();
  cx.translate(b.x, b.y);
  cx.fillStyle = '#3a3226';                                  // torn-earth mound
  cx.beginPath(); cx.ellipse(0, 0, b.w / 2, b.h / 2 * 0.85, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = C.dark;                                     // trampled moss ring
  cx.beginPath(); cx.ellipse(0, 1, b.w / 2 * 0.82, b.h / 2 * 0.66, 0, 0, Math.PI * 2); cx.fill();
  const breathe = 1 + Math.sin(tick * 0.05) * 0.05;
  cx.fillStyle = '#171310';                                  // the burrow mouth — deep and dark
  cx.beginPath(); cx.ellipse(2, 3, b.w / 2 * 0.42 * breathe, b.h / 2 * 0.3 * breathe, 0.3, 0, Math.PI * 2); cx.fill();
  cx.strokeStyle = '#cfc5a8'; cx.lineWidth = 2.5;            // kill-trophy ribs staked around the rim
  for (const a of [0.9, 2.1, 3.4, 4.6, 5.6]) {
    const rx = Math.cos(a) * b.w * 0.38, ry = Math.sin(a) * b.h * 0.3;
    cx.beginPath(); cx.moveTo(rx, ry); cx.lineTo(rx * 1.28, ry * 1.28 - 6); cx.stroke();
  }
  cx.strokeStyle = C.dark; cx.lineWidth = 1.5;               // claw drag-marks out the door
  for (const off of [-5, 0, 5]) {
    cx.beginPath(); cx.moveTo(10 + off * 0.3, 8 + off); cx.lineTo(b.w / 2 * 0.95, 12 + off * 1.6); cx.stroke();
  }
  cx.fillStyle = '#e0a43c';                                  // eyeshine in the dark
  const blink = Math.sin(tick * 0.03 + b.id) > -0.85 ? 1 : 0;
  if (blink) {
    cx.beginPath(); cx.arc(-2, 2, 1.2, 0, Math.PI * 2); cx.arc(4, 4, 1.2, 0, Math.PI * 2); cx.fill();
  }
  cx.restore();
}

// gunship — drawn inside translate+rotate, +x forward. Procedural (no air art yet).
function drawGunship(u) {
  const img = opt('unit_gunship') || opt('gunship');
  if (img) {
    cx.rotate(Math.PI / 2);   // art faces up
    cx.drawImage(teamSprite(img, u.team), -17, -17, 34, 34);
    cx.rotate(-Math.PI / 2);
    const ra = tick * 0.55 + u.id;   // keep the spinning rotor over the art
    cx.strokeStyle = 'rgba(220,235,230,0.55)';
    cx.lineWidth = 1.4;
    cx.beginPath();
    cx.moveTo(Math.cos(ra) * 15, Math.sin(ra) * 15);
    cx.lineTo(-Math.cos(ra) * 15, -Math.sin(ra) * 15);
    cx.moveTo(Math.cos(ra + Math.PI / 2) * 15, Math.sin(ra + Math.PI / 2) * 15);
    cx.lineTo(-Math.cos(ra + Math.PI / 2) * 15, -Math.sin(ra + Math.PI / 2) * 15);
    cx.stroke();
    return;
  }
  const C = COLORS[u.team];
  cx.fillStyle = C.dark;                              // tail boom
  cx.fillRect(-16, -1.5, 10, 3);
  cx.fillStyle = C.main;                              // tail fin
  cx.beginPath(); cx.moveTo(-16, 0); cx.lineTo(-19, -5); cx.lineTo(-13, 0); cx.closePath(); cx.fill();
  cx.fillStyle = C.dark;                              // fuselage
  cx.beginPath(); cx.ellipse(0, 0, 11, 6, 0, 0, Math.PI * 2); cx.fill();
  cx.strokeStyle = C.main; cx.lineWidth = 1.5;
  cx.beginPath(); cx.ellipse(0, 0, 11, 6, 0, 0, Math.PI * 2); cx.stroke();
  cx.fillStyle = C.light;                             // canopy
  cx.beginPath(); cx.ellipse(4.5, 0, 4, 3, 0, 0, Math.PI * 2); cx.fill();
  cx.fillStyle = '#0e1210';                           // weapon stubs
  cx.fillRect(-2, -8.5, 7, 2.5); cx.fillRect(-2, 6, 7, 2.5);
  const ra = tick * 0.55 + u.id;                      // main rotor
  cx.strokeStyle = 'rgba(220,235,230,0.75)';
  cx.lineWidth = 1.6;
  cx.beginPath();
  cx.moveTo(Math.cos(ra) * 15, Math.sin(ra) * 15);
  cx.lineTo(-Math.cos(ra) * 15, -Math.sin(ra) * 15);
  cx.moveTo(Math.cos(ra + Math.PI / 2) * 15, Math.sin(ra + Math.PI / 2) * 15);
  cx.lineTo(-Math.cos(ra + Math.PI / 2) * 15, -Math.sin(ra + Math.PI / 2) * 15);
  cx.stroke();
  cx.strokeStyle = 'rgba(220,235,230,0.18)';          // rotor blur disc
  cx.lineWidth = 1;
  cx.beginPath(); cx.arc(0, 0, 15, 0, Math.PI * 2); cx.stroke();
}

// delta-wing strike jet — +x forward. Red belly light = bomb still aboard.
function drawJet(u) {
  const C = COLORS[u.team];
  const img = opt('unit_harrier') || opt('harrier');
  if (img) {
    cx.rotate(Math.PI / 2);
    cx.drawImage(teamSprite(img, u.team), -16, -16, 32, 32);
    cx.rotate(-Math.PI / 2);
  } else {
    cx.fillStyle = C.dark;                        // delta wing
    cx.beginPath(); cx.moveTo(17, 0); cx.lineTo(-7, -12); cx.lineTo(-3, 0); cx.lineTo(-7, 12); cx.closePath(); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(17, 0); cx.lineTo(-7, -12); cx.lineTo(-3, 0); cx.lineTo(-7, 12); cx.closePath(); cx.stroke();
    cx.fillStyle = C.main;                        // fuselage
    cx.beginPath(); cx.ellipse(4, 0, 8, 2.8, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.light;                       // canopy
    cx.beginPath(); cx.arc(9, 0, 2.2, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.dark;                        // twin tails
    cx.fillRect(-9, -7, 4, 2.5); cx.fillRect(-9, 4.5, 4, 2.5);
  }
  if (u.armed) {                                  // the payload
    cx.fillStyle = '#e0564a';
    cx.beginPath(); cx.arc(-1, 0, 2.2, 0, Math.PI * 2); cx.fill();
  }
}

function drawCargoPips(u) {
  if (!u.cargo || !u.cargo.length) return;
  cx.fillStyle = '#e8e2cc';
  for (let i = 0; i < u.cargo.length; i++) cx.fillRect(u.x - 11 + i * 6.5, u.y + u.r + 4, 4.5, 4.5);
}

function drawUnit(u) {
  const C = COLORS[u.team];
  const sel = selection.includes(u);
  if (sel) {
    cx.strokeStyle = 'rgba(143,216,207,0.9)';
    cx.lineWidth = 1.5;
    cx.beginPath(); cx.arc(u.x, u.y, u.r + 5, 0, Math.PI * 2); cx.stroke();
  }
  if (u.type === 'gunship' || u.type === 'harrier') {
    cx.fillStyle = 'rgba(0,0,0,0.3)';   // ground shadow sells the altitude
    cx.beginPath(); cx.ellipse(u.x + 8, u.y + 13, u.r * 0.9, u.r * 0.45, 0, 0, Math.PI * 2); cx.fill();
    cx.save();
    cx.translate(u.x, u.y);
    cx.rotate(u.faceA);
    if (u.type === 'gunship') drawGunship(u); else drawJet(u);
    cx.restore();
    drawUnitDecor(u);
    if (sel || u.hp < u.maxHp) drawHpBar(u.x, u.y - u.r - 12, u.r * 2.4, u.hp, u.maxHp);
    drawRank(u);
    return;
  }
  if (IS_DINO[u.type]) {
    if (u.specimen) {
      // protected specimen: pulsing field ring so "don't shoot" reads at a glance
      cx.strokeStyle = `rgba(143,201,74,${0.5 + 0.3 * Math.sin(tick * 0.1)})`;
      cx.lineWidth = 2;
      cx.setLineDash([4, 5]);
      cx.beginPath(); cx.arc(u.x, u.y, u.r + 7, 0, Math.PI * 2); cx.stroke();
      cx.setLineDash([]);
    }
    cx.save();
    cx.translate(u.x, u.y);
    cx.rotate(u.faceA);
    if (u.moving && !animFrames(u.type, 'walk', u.team, 8).length)
      cx.rotate(Math.sin(u.walkT * 0.55) * 0.09);   // scurry wiggle (no-frames fallback)
    // drawDino leaves the +90° art rotation in place when it draws a sprite
    // (its caller always restores) — box it in, or anything drawn after it
    // inherits the turn. The glow ribbon ran PERPENDICULAR to her spine the
    // moment real art replaced the procedural body, for exactly this reason.
    cx.save();
    drawDino(u);
    cx.restore();
    // the Broodfallen corruption breathes: a pulsing purple glow OVER the art,
    // because the sprite's thin vein lines compress to nothing at game scale.
    // Drawn in the facing frame (+x = head) so it rides the spine.
    if (u.type === 'broodmother') drawBroodGlow(u);
    cx.restore();
    if (sel || u.hp < u.maxHp) drawHpBar(u.x, u.y - u.r - 10, u.r * 2.4, u.hp, u.maxHp);
    drawRank(u);
    return;
  }
  if (u.order.type === 'hunker') {
    // sandbag ring so dug-in marines read at a glance
    cx.strokeStyle = 'rgba(232,196,106,0.85)';
    cx.lineWidth = 3;
    cx.setLineDash([5, 4]);
    cx.beginPath(); cx.arc(u.x, u.y, u.r + 3, 0, Math.PI * 2); cx.stroke();
    cx.setLineDash([]);
  }
  cx.save();
  cx.translate(u.x, u.y);
  cx.rotate(u.faceA);
  if (u.recoil) cx.translate(-u.recoil, 0);                       // gun kick
  // infantry with walk frames animate via the frame cycle (drawUnitSprite);
  // the rest keep the original subtle sway until their walk video lands.
  // (A translate weight-shift was tried 2026-07-20 and read worse — don't.)
  if ((IS_INF[u.type]) && u.moving && !animFrames(u.type, 'walk', u.team, 8).length)
    cx.rotate(Math.sin(u.walkT * 0.4) * 0.07);
  if (bodiesReady) {
    drawUnitSprite(u);
    cx.restore();
    drawUnitDecor(u);
    if (sel || u.hp < u.maxHp) drawHpBar(u.x, u.y - u.r - 10, u.r * 2.4, u.hp, u.maxHp);
    drawRank(u);
    drawCargoPips(u);
    drawCapRing(u);
    return;
  }
  if (u.type === 'marine') {
    cx.fillStyle = C.dark;
    cx.beginPath(); cx.arc(0, 0, u.r, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(0, 0, u.r - 3, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = '#0e1210'; cx.lineWidth = 3;
    cx.beginPath(); cx.moveTo(2, 0); cx.lineTo(u.r + 6, 0); cx.stroke();
    cx.fillStyle = '#0e1210';
    cx.beginPath(); cx.arc(2, 0, 2.5, 0, Math.PI * 2); cx.fill();
  } else if (u.type === 'sniper') {
    // prone marksman: slim low body, hood at the back, long rifle with bipod
    cx.fillStyle = C.dark;
    rr(cx, -11, -4, 17, 8, 4); cx.fill();
    cx.strokeStyle = C.light; cx.lineWidth = 1.5;
    rr(cx, -11, -4, 17, 8, 4); cx.stroke();
    cx.fillStyle = C.light;
    cx.beginPath(); cx.arc(-6, 0, 3.2, 0, Math.PI * 2); cx.fill();          // hood
    cx.strokeStyle = '#0e1210'; cx.lineWidth = 2;
    cx.beginPath(); cx.moveTo(4, 0); cx.lineTo(u.r + 15, 0); cx.stroke();   // long rifle
    cx.fillStyle = '#0e1210';
    cx.beginPath(); cx.arc(5, -3.5, 1.8, 0, Math.PI * 2); cx.fill();        // scope
    cx.strokeStyle = '#0e1210'; cx.lineWidth = 1;
    cx.beginPath();
    cx.moveTo(u.r + 10, 0); cx.lineTo(u.r + 14, -4);                        // bipod legs
    cx.moveTo(u.r + 10, 0); cx.lineTo(u.r + 14, 4);
    cx.stroke();
  } else if (u.type === 'medic') {
    cx.fillStyle = C.dark;
    cx.beginPath(); cx.arc(0, 0, u.r, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#f2f2ee';
    cx.beginPath(); cx.arc(0, 0, u.r - 3, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#d84a3e';                                               // red cross
    cx.fillRect(-1.5, -5, 3, 10); cx.fillRect(-5, -1.5, 10, 3);
  } else if (u.type === 'engineer') {
    cx.fillStyle = C.dark;
    cx.beginPath(); cx.arc(0, 0, u.r, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#f0c86a';                                               // hard hat ring
    cx.beginPath(); cx.arc(0, 0, u.r - 2.5, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(0, 0, u.r - 5.5, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = '#c8d4cc'; cx.lineWidth = 2.5;                         // wrench arm
    cx.beginPath(); cx.moveTo(2, 0); cx.lineTo(u.r + 5, 0); cx.stroke();
    cx.strokeStyle = '#c8d4cc'; cx.lineWidth = 2;
    cx.beginPath(); cx.arc(u.r + 6, 0, 2.6, Math.PI * 0.6, Math.PI * 1.4, true); cx.stroke();
  } else if (u.type === 'raider') {
    cx.fillStyle = 'rgba(18,23,19,0.7)';
    cx.fillRect(-10, -11, 13, 4); cx.fillRect(-10, 7, 13, 4);                // wheels
    cx.fillStyle = C.dark;
    cx.beginPath(); cx.moveTo(15, 0); cx.lineTo(-11, -8); cx.lineTo(-11, 8); cx.closePath(); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(15, 0); cx.lineTo(-11, -8); cx.lineTo(-11, 8); cx.closePath(); cx.stroke();
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(-2, 0, 3.5, 0, Math.PI * 2); cx.fill();           // cockpit
    cx.strokeStyle = '#0e1210'; cx.lineWidth = 2;
    cx.beginPath(); cx.moveTo(3, 0); cx.lineTo(17, 0); cx.stroke();          // gun
  } else if (u.type === 'tank') {
    cx.fillStyle = C.dark;
    rr(cx, -15, -11, 30, 22, 5); cx.fill();
    cx.fillStyle = '#12171380';
    cx.fillRect(-15, -11, 30, 5); cx.fillRect(-15, 6, 30, 5);
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(0, 0, 8, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 4;
    cx.beginPath(); cx.moveTo(0, 0); cx.lineTo(22, 0); cx.stroke();
  } else if (u.type === 'apc') {
    cx.fillStyle = C.dark;
    rr(cx, -15, -12, 30, 24, 6); cx.fill();
    cx.fillStyle = '#12171380';
    cx.fillRect(-15, -12, 30, 5); cx.fillRect(-15, 7, 30, 5);
    cx.fillStyle = C.main;
    rr(cx, -8, -6, 16, 12, 3); cx.fill();        // troop bay
    cx.strokeStyle = '#0e1210'; cx.lineWidth = 2;
    cx.beginPath(); cx.moveTo(8, 0); cx.lineTo(18, 0); cx.stroke();   // MG stub
  } else if (u.type === 'artillery') {
    cx.fillStyle = C.dark;
    rr(cx, -13, -9, 26, 18, 4); cx.fill();
    cx.fillStyle = '#12171380';
    cx.fillRect(-13, -9, 26, 4); cx.fillRect(-13, 5, 26, 4);
    cx.fillStyle = C.main;
    cx.beginPath(); cx.arc(-2, 0, 6, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 3;
    cx.beginPath(); cx.moveTo(-2, 0); cx.lineTo(28, 0); cx.stroke();   // long siege tube
    cx.strokeStyle = C.light; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(24, -3); cx.lineTo(24, 3); cx.stroke();  // muzzle brake
  } else if (u.type === 'rig') {
    cx.fillStyle = C.dark;
    rr(cx, -12, -9, 24, 18, 5); cx.fill();
    cx.strokeStyle = C.main; cx.lineWidth = 1.5;
    rr(cx, -12, -9, 24, 18, 5); cx.stroke();
    cx.rotate(Math.PI / 2);   // cage helper expects the vehicle-sprite frame
    drawRigCage(u);
    cx.rotate(-Math.PI / 2);
  } else { // harvester
    cx.fillStyle = C.dark;
    rr(cx, -12, -9, 24, 18, 5); cx.fill();
    cx.fillStyle = C.main;
    rr(cx, -12, -9, 24, 18, 5); cx.strokeStyle = C.main; cx.lineWidth = 1.5; cx.stroke();
    cx.fillStyle = '#c8d4cc';
    cx.fillRect(10, -7, 4, 14); // front scoop
    if (u.eggCarry) {
      cx.fillStyle = '#e8e2cc';
      cx.beginPath(); cx.ellipse(-3, 0, 4, 5.2, 0, 0, Math.PI * 2); cx.fill();
    } else {
      cx.fillStyle = u.carry > 0 ? CRYSTAL_COLOR : '#26302a';
      rr(cx, -8, -5, 10, 10, 2); cx.fill();
    }
  }
  cx.restore();
  drawUnitDecor(u);
  if (sel || u.hp < u.maxHp) drawHpBar(u.x, u.y - u.r - 10, u.r * 2.4, u.hp, u.maxHp);
  drawRank(u);
  drawCargoPips(u);
  drawCapRing(u);
}

// Phase B accent overlays (STYLE-GUIDE.md): tiny signature details drawn over
// the tinted body — 5% of the pixels, most of the identity. Own transform so it
// works over sprite AND procedural bodies. Local frame: +x = facing.
function drawUnitDecor(u) {
  const C = COLORS[u.team];
  cx.save();
  cx.translate(u.x, u.y);
  cx.rotate(u.faceA);
  switch (u.type) {
    case 'marine':      // accent visor strip across the helmet
      cx.strokeStyle = C.accent;
      cx.lineWidth = 2;
      cx.beginPath(); cx.arc(1, 0, 4.5, -0.65, 0.65); cx.stroke();
      break;
    case 'sniper':      // scope glint — steady, not blinking (playtest 2026-07-20:
      // the blink read as unexplained muzzle flash)
      cx.fillStyle = C.accent;
      cx.beginPath(); cx.arc(7, -2, 1.4, 0, Math.PI * 2); cx.fill();
      break;
    case 'rocket':      // red warhead tip peeking from the tube
      cx.fillStyle = '#e0564a';
      cx.beginPath(); cx.arc(8, -5, 1.8, 0, Math.PI * 2); cx.fill();
      break;
    case 'harvester':
    case 'rig': {       // hazard ticks on the scoop; cargo state readable on any art
      cx.strokeStyle = HAZARD_YELLOW;
      cx.lineWidth = 2;
      cx.beginPath();
      for (const oy of [-6, -1, 4]) { cx.moveTo(9, oy); cx.lineTo(12, oy + 3); }
      cx.stroke();
      if (u.type === 'harvester') {
        if (u.eggCarry) {
          cx.fillStyle = '#e8e2cc';
          cx.beginPath(); cx.ellipse(-2, 0, 3.5, 4.5, 0, 0, Math.PI * 2); cx.fill();
        } else if (u.carry > 0) {
          cx.fillStyle = CRYSTAL_COLOR;
          cx.fillRect(-5, -3.5, 7, 7);
        }
      }
      break;
    }
    case 'raider':      // racing stripe + headlight
      cx.strokeStyle = C.trim;
      cx.globalAlpha = 0.85;
      cx.lineWidth = 2;
      cx.beginPath(); cx.moveTo(-9, 0); cx.lineTo(9, 0); cx.stroke();
      cx.globalAlpha = 1;
      cx.fillStyle = C.accent;
      cx.beginPath(); cx.arc(11, 0, 1.6, 0, Math.PI * 2); cx.fill();
      break;
    case 'tank':        // muzzle band
      cx.strokeStyle = C.accent;
      cx.lineWidth = 2;
      cx.beginPath(); cx.moveTo(14, -2.2); cx.lineTo(14, 2.2); cx.stroke();
      break;
    case 'apc':         // hazard chevrons on the rear ramp
      cx.strokeStyle = HAZARD_YELLOW;
      cx.lineWidth = 1.8;
      cx.beginPath();
      cx.moveTo(-8, -4); cx.lineTo(-11, 0); cx.lineTo(-8, 4);
      cx.moveTo(-5, -4); cx.lineTo(-8, 0); cx.lineTo(-5, 4);
      cx.stroke();
      break;
    case 'artillery':   // bands ringing the long barrel
      cx.strokeStyle = C.accent;
      cx.lineWidth = 1.8;
      cx.beginPath();
      cx.moveTo(17, -2); cx.lineTo(17, 2);
      cx.moveTo(22, -1.8); cx.lineTo(22, 1.8);
      cx.stroke();
      break;
    case 'gunship':     // nose sensor ball
      cx.fillStyle = C.accent;
      cx.beginPath(); cx.arc(9, 0, 1.8, 0, Math.PI * 2); cx.fill();
      break;
    case 'harrier':     // engine intake glow
      cx.fillStyle = C.accent;
      cx.globalAlpha = 0.9;
      cx.beginPath();
      cx.arc(2, -3.5, 1.4, 0, Math.PI * 2);
      cx.arc(2, 3.5, 1.4, 0, Math.PI * 2);
      cx.fill();
      cx.globalAlpha = 1;
      break;
  }
  cx.restore();
}

// capture channel progress — a green arc closing around the rig
function drawCapRing(u) {
  // player rigs wear the specimen's green field ring at all times — the rig
  // and its target share one visual language, so the pairing reads at a glance
  if (u.type === 'rig' && u.team === 1) {
    cx.strokeStyle = `rgba(143,201,74,${0.5 + 0.3 * Math.sin(tick * 0.1)})`;
    cx.lineWidth = 2;
    cx.setLineDash([4, 5]);
    cx.beginPath(); cx.arc(u.x, u.y, u.r + 9, 0, Math.PI * 2); cx.stroke();
    cx.setLineDash([]);
  }
  if (!u.capT || u.order.type !== 'capture') return;   // progress arc only while channeling
  cx.strokeStyle = '#8fc94a';
  cx.lineWidth = 3;
  cx.beginPath();
  cx.arc(u.x, u.y, u.r + 7, -Math.PI / 2, -Math.PI / 2 + (u.capT / RIG_CAP_TIME) * Math.PI * 2);
  cx.stroke();
}

function drawBullet(p) {
  if (p.kind === 'arc') {
    // fake a lob: shadow tracks the flight line, the shell rises on a parabola
    const total = dist(p.x0, p.y0, p.tx, p.ty) || 1;
    const k = clamp(1 - dist(p.x, p.y, p.tx, p.ty) / total, 0, 1);
    const lift = Math.sin(k * Math.PI) * Math.min(60, total * 0.22);
    cx.fillStyle = 'rgba(0,0,0,0.35)';
    cx.beginPath(); cx.ellipse(p.x, p.y, 4, 2.5, 0, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = '#f0c86a';
    cx.beginPath(); cx.arc(p.x, p.y - lift, 4.2, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = 'rgba(255,255,255,0.7)';
    cx.beginPath(); cx.arc(p.x - 1, p.y - lift - 1, 1.5, 0, Math.PI * 2); cx.fill();
  } else if (p.kind === 'shell') {
    cx.fillStyle = '#f0c86a';
    cx.beginPath(); cx.arc(p.x, p.y, 3.4, 0, Math.PI * 2); cx.fill();
  } else if (p.kind === 'rocket') {
    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.a || 0);
    cx.fillStyle = '#d8dcd0';
    cx.fillRect(-5, -1.5, 8, 3);
    cx.fillStyle = '#e0564a';
    cx.beginPath(); cx.moveTo(3, -1.5); cx.lineTo(6.5, 0); cx.lineTo(3, 1.5); cx.closePath(); cx.fill();
    cx.restore();
  } else if (p.kind === 'spit') {
    cx.fillStyle = '#a8e05a';
    cx.beginPath(); cx.arc(p.x, p.y, 3, 0, Math.PI * 2); cx.fill();
    cx.fillStyle = 'rgba(168,224,90,0.4)';   // dribbling acid trail
    cx.beginPath(); cx.arc(p.x - Math.cos(p.a || 0) * 5, p.y - Math.sin(p.a || 0) * 5, 1.8, 0, Math.PI * 2); cx.fill();
  } else if (p.kind === 'snipe') {
    cx.strokeStyle = 'rgba(255,255,255,0.9)';
    cx.lineWidth = 1.5;
    cx.beginPath();
    cx.moveTo(p.x, p.y);
    cx.lineTo(p.x - Math.cos(p.a || 0) * 18, p.y - Math.sin(p.a || 0) * 18);
    cx.stroke();
  } else {
    const C = COLORS[p.team];
    cx.strokeStyle = C.fx || C.light;   // team FX role: tracers wear the faction's glow
    cx.lineWidth = 2;
    cx.beginPath();
    cx.moveTo(p.x, p.y);
    cx.lineTo(p.x - Math.cos(p.a || 0) * 8, p.y - Math.sin(p.a || 0) * 8);
    cx.stroke();
  }
}

function drawFx(f) {
  const k = f.t / f.max;
  if (f.kind === 'slash') {
    // three bone-white claw rakes across the victim, angled from the attacker
    cx.save();
    cx.translate(f.x, f.y);
    cx.rotate((f.a || 0) + 0.5);
    cx.strokeStyle = `rgba(232,226,204,${0.9 * (1 - k)})`;
    cx.lineWidth = 2;
    for (const off of [-4.5, 0, 4.5]) {
      cx.beginPath();
      cx.moveTo(-7, off - 2);
      cx.quadraticCurveTo(0, off + 1, 8, off + 3);
      cx.stroke();
    }
    cx.restore();
    return;
  }
  if (f.kind === 'boom') {
    cx.strokeStyle = `rgba(240,180,100,${1 - k})`;
    cx.lineWidth = 3;
    cx.beginPath(); cx.arc(f.x, f.y, f.size * k + 4, 0, Math.PI * 2); cx.stroke();
    cx.fillStyle = `rgba(240,140,80,${0.5 * (1 - k)})`;
    cx.beginPath(); cx.arc(f.x, f.y, f.size * k * 0.7, 0, Math.PI * 2); cx.fill();
  } else if (f.kind === 'text') {
    cx.fillStyle = `rgba(111,227,208,${1 - k})`;
    cx.font = 'bold 13px -apple-system, sans-serif';
    cx.textAlign = 'center';
    cx.fillText(f.msg, f.x, f.y - 22 * k);
  } else if (f.kind === 'spark') {
    cx.strokeStyle = `rgba(140,230,160,${1 - k})`;
    cx.lineWidth = 2;
    const s = 4 * (1 - k) + 1;
    cx.beginPath();
    cx.moveTo(f.x - s, f.y); cx.lineTo(f.x + s, f.y);
    cx.moveTo(f.x, f.y - s); cx.lineTo(f.x, f.y + s);
    cx.stroke();
  } else if (f.kind === 'ping') {
    cx.strokeStyle = f.color;
    cx.globalAlpha = 1 - k;
    cx.lineWidth = 2;
    cx.beginPath(); cx.arc(f.x, f.y, 16 * (1 - k) + 3, 0, Math.PI * 2); cx.stroke();
    cx.globalAlpha = 1;
  } else if (f.kind === 'corpse') {
    // sliced death animation: play the fall, then the body lingers and fades
    const img = f.frames[Math.min(f.frames.length - 1, Math.floor(f.t / 9))];
    if (!img.complete || !img.naturalWidth) return;
    cx.save();
    cx.globalAlpha = Math.max(0, Math.min(1, (f.max - f.t) / 60));
    cx.translate(f.x, f.y);
    cx.rotate(f.a + Math.PI / 2);   // art faces up
    cx.drawImage(img, -f.size / 2, -f.size / 2, f.size, f.size);
    cx.restore();
  } else if (f.kind === 'sprite') {
    if (f.t < f.delay) return;
    const img = f.img;
    if (!img.complete || !img.naturalWidth) return;
    const dt = f.t - f.delay, kk = dt / (f.max - f.delay);
    const s = f.s0 + (f.s1 - f.s0) * kk;
    cx.save();
    cx.globalAlpha = Math.max(0, f.a0 + (f.a1 - f.a0) * kk);
    cx.translate(f.x + f.vx * dt, f.y + f.vy * dt);
    cx.rotate(f.rot + f.rotV * dt);
    cx.drawImage(img, -s / 2, -s / 2, s, s);
    cx.restore();
  } else if (f.kind === 'muzzle') {
    const img = f.img;
    if (!img.complete || !img.naturalWidth) return;
    const h = f.s, w = h * (img.naturalWidth / img.naturalHeight);
    cx.save();
    cx.globalAlpha = 1 - k;
    cx.translate(f.x, f.y);
    cx.rotate(f.a + Math.PI / 2);   // sprite art points up; face along the shot
    cx.drawImage(img, -w / 2, -h, w, h);
    cx.restore();
  }
}

// living water: drifting sheen streams over the painted channel bands — the
// static band alone read as "a road" (playtest 2026-07-25). Two dash streams
// per segment slide along the flow at different speeds; a slow counter-drift
// glint sells the current. Cheap: a few strokes per visible segment.
function drawRivers(vx, vy, vw, vh) {
  const rivers = (groundM && groundM.rivers) || [];
  if (!rivers.length) return;
  if (!groundM._rp) groundM._rp = rivers.map(riverPath);
  // band outlines cached as Path2D for the per-frame texture pass
  if (!groundM._wpaths) {
    groundM._wpaths = groundM._rp.map(pts => {
      const path = new Path2D();
      const angAt = (i2) => {
        const q = pts[Math.min(i2 + 1, pts.length - 1)], o = pts[Math.max(i2 - 1, 0)];
        return Math.atan2(q.y - o.y, q.x - o.x);
      };
      const edge = (i2, scale, sign) => {
        const p = pts[i2], ang = angAt(i2);
        // mirror the painted band's wobble EXACTLY (left/right differ) —
        // mismatched wobble made the texture bleed past the shoreline
        const w2 = p.r * scale + Math.sin(p.d * (sign > 0 ? 0.07 : 0.09) + (sign > 0 ? p.x : p.y)) * 3.5;
        return [p.x - Math.sin(ang) * w2 * sign, p.y + Math.cos(ang) * w2 * sign];
      };
      const cap2 = (i2, flip) => {   // same rounded mouths as the painted band
        const p = pts[i2], ang = angAt(i2), w2 = p.r * 0.96;
        for (let k = 1; k < 14; k++) {
          const ca = ang + (flip ? -1 : 1) * Math.PI / 2 - (k / 14) * Math.PI;
          path.lineTo(p.x + Math.cos(ca) * w2, p.y + Math.sin(ca) * w2);
        }
      };
      for (let i2 = 0; i2 < pts.length; i2++) {
        const [px, py] = edge(i2, 0.96, 1);
        i2 ? path.lineTo(px, py) : path.moveTo(px, py);
        if (i2 === pts.length - 1) cap2(i2, false);
      }
      for (let i2 = pts.length - 1; i2 >= 0; i2--) {
        const [px, py] = edge(i2, 0.96, -1);
        path.lineTo(px, py);
        if (i2 === 0) cap2(i2, true);
      }
      path.closePath();
      return path;
    });
  }
  // layered surface (Bronson 2026-07-26): water4 (the converted rapids
  // texture) is the STATIC BASE — the body of the water — while the three
  // calm frames crossfade AND physically slide downstream over it, so the
  // current visibly flows across the turbulence underneath.
  const base = opt('water4');
  const flows = [opt('water'), opt('water2'), opt('water3')].filter(Boolean);
  if (base || flows.length) {
    const CYCLE = 300;
    const ft = flows.length ? (tick % (flows.length * CYCLE)) / CYCLE : 0;
    const fi = Math.floor(ft), blend = ft - fi;
    for (let si = 0; si < groundM._wpaths.length; si++) {
      const path = groundM._wpaths[si];
      const [rx1, ry1, rx2, ry2] = rivers[si];
      const rl = Math.hypot(rx2 - rx1, ry2 - ry1);
      const fdx = (rx2 - rx1) / rl, fdy = (ry2 - ry1) / rl;
      if (base) {
        cx.globalAlpha = 0.38;
        cx.fillStyle = cx.createPattern(base, 'repeat');
        cx.fill(path);
      }
      if (flows.length) {
        const drift = tick * 0.35;   // the flow layer slides with the current
        const mkPat = (img) => {
          const p = cx.createPattern(img, 'repeat');
          try { p.setTransform(new DOMMatrix([1, 0, 0, 1, fdx * drift, fdy * drift])); } catch (e) { /* old engine — static flow */ }
          return p;
        };
        cx.globalAlpha = 0.20;
        cx.fillStyle = mkPat(flows[fi]);
        cx.fill(path);
        if (flows.length > 1) {
          cx.globalAlpha = 0.20 * blend;
          cx.fillStyle = mkPat(flows[(fi + 1) % flows.length]);
          cx.fill(path);
        }
      }
      cx.globalAlpha = 1;
    }
  }
  cx.save();
  cx.lineCap = 'round';
  for (let si = 0; si < rivers.length; si++) {
    const [x1, y1, x2, y2, r] = rivers[si];
    if (Math.max(x1, x2) + r * 2 < vx || Math.min(x1, x2) - r * 2 > vx + vw ||
        Math.max(y1, y2) + r * 2 < vy || Math.min(y1, y2) - r * 2 > vy + vh) continue;
    const pts = groundM._rp[si];
    const total = pts[pts.length - 1].d;
    const at = (d) => pts[Math.max(0, Math.min(pts.length - 1, Math.floor(d / 30)))];
    const norm = (i2) => {
      const q = pts[Math.min(i2 + 1, pts.length - 1)], o = pts[Math.max(i2 - 1, 0)];
      const ang = Math.atan2(q.y - o.y, q.x - o.x);
      return [ang, -Math.sin(ang), Math.cos(ang)];
    };
    // campaign only: a dark shape gliding beneath the surface, slow patrol
    if (mission) {
      const gd = (tick * 0.32 + si * 700) % (total * 2);
      const d = gd < total ? gd : total * 2 - gd;   // back and forth
      const p = at(d), i2 = Math.floor(d / 30);
      const [ang, nx, ny] = norm(i2);
      const off = Math.sin(tick * 0.008 + si) * p.r * 0.3;
      cx.save();
      cx.translate(p.x + nx * off, p.y + ny * off);
      cx.rotate(ang + (gd < total ? 0 : Math.PI));
      cx.fillStyle = 'rgba(0,0,0,0.20)';
      cx.beginPath();
      cx.ellipse(0, 0, 16, 5, 0, 0, Math.PI * 2);
      cx.fill();
      cx.restore();
    }
  }
  cx.restore();
}
function riverAngleAt(x, y) {
  let best = 0, bd = 1e18;
  for (const [x1, y1, x2, y2] of ((groundM && groundM.rivers) || [])) {
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
    const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / L2));
    const d = dist2(x, y, x1 + dx * t, y1 + dy * t);
    if (d < bd) { bd = d; best = Math.atan2(dy, dx); }
  }
  return best;
}
function render() {
  cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cx.clearRect(0, 0, view.w, view.h);
  cx.save();
  shakeAmp *= 0.9;
  if (shakeAmp < 0.3) shakeAmp = 0;
  cx.translate(-cam.x + (Math.random() - 0.5) * shakeAmp, -cam.y + (Math.random() - 0.5) * shakeAmp);

  // only touch the pixels the camera can see — full-world blits were the
  // number one frame cost on the big map (padded for screen shake)
  const vx = Math.max(0, cam.x - 24), vy = Math.max(0, cam.y - 24);
  const vw = Math.min(W - vx, view.w + 48), vh = Math.min(H - vy, view.h + 48);
  const inView = (x, y, m) => x > vx - m && x < vx + vw + m && y > vy - m && y < vy + vh + m;
  cx.drawImage(groundCv, vx, vy, vw, vh, vx, vy, vw, vh);
  drawRivers(vx, vy, vw, vh);
  for (const c of crystals) if (inView(c.x, c.y, 40) && isShownAt(c.x, c.y)) drawCrystal(c);
  for (const e of eggs) if (inView(e.x, e.y, 30) && isShownAt(e.x, e.y)) drawEgg(e);
  for (const b of buildings) if (inView(b.x, b.y, 130) && (b.team === 1 || isShownAt(b.x, b.y))) drawBuilding(b);
  for (const u of units) if (inView(u.x, u.y, 60) && (u.team === 1 || isVisibleAt(u.x, u.y))) drawUnit(u);
  for (const p of bullets) if (inView(p.x, p.y, 60) && (p.team === 1 || isVisibleAt(p.x, p.y))) drawBullet(p);
  // Effects are drawn in two passes, normal blending then additive. Flipping
  // globalCompositeOperation per sprite breaks the GPU's batching, and a nest
  // fight can have a hundred muzzle flashes and fireballs queued at once.
  addFx.length = 0;
  let fxSeen = 0;
  if (fxDraw < 2) for (const f of fxs) {
    if (fxDraw === 1 && (fxSeen++ & 1)) continue;   // draw every other one
    if (!inView(f.x, f.y, 260)) continue;
    const worldFx = f.kind === 'boom' || f.kind === 'sprite' || f.kind === 'muzzle' || f.kind === 'corpse';
    if (worldFx && !isVisibleAt(f.x, f.y)) continue;
    if (f.kind === 'muzzle' || (f.kind === 'sprite' && f.add)) addFx.push(f);
    else drawFx(f);
  }
  if (addFx.length) {
    cx.globalCompositeOperation = 'lighter';
    for (const f of addFx) drawFx(f);
    cx.globalCompositeOperation = 'source-over';
  }

  // fog of war (small canvas scaled up = soft edges), viewport slice only
  cx.drawImage(fogCv, vx / TILE, vy / TILE, vw / TILE, vh / TILE, vx, vy, vw, vh);

  // inbound nukes: pulsing ground zero + countdown, visible through fog
  for (const n of nukes) {
    if (!inView(n.x, n.y, 340)) continue;
    const spec = NUKE[n.tier];
    const pulse = 0.5 + 0.4 * Math.abs(Math.sin(tick * 0.12));
    cx.strokeStyle = `rgba(255,86,60,${pulse})`;
    cx.lineWidth = 2.5;
    cx.beginPath(); cx.arc(n.x, n.y, spec.radius, 0, Math.PI * 2); cx.stroke();
    cx.lineWidth = 1.5;
    cx.beginPath();
    cx.moveTo(n.x - 16, n.y); cx.lineTo(n.x + 16, n.y);
    cx.moveTo(n.x, n.y - 16); cx.lineTo(n.x, n.y + 16);
    cx.stroke();
    cx.fillStyle = `rgba(255,120,90,${0.6 + 0.4 * pulse})`;
    cx.font = 'bold 18px -apple-system, sans-serif';
    cx.textAlign = 'center';
    cx.fillText('☢ ' + Math.ceil((n.max - n.t) / 60), n.x, n.y - spec.radius - 10);
  }

  // mission objective beacons: pulsing markers, visible through fog
  if (mission && ms) {
    for (const o of ms.objectives) {
      if (!o.active || o.done || !o.mark) continue;
      for (const [mx, my] of objMarks(o)) {
        if (!inView(mx, my, 120)) continue;
        const k = Math.abs(Math.sin(tick * 0.06));
        const rad = 24 + 9 * k;
        cx.strokeStyle = `rgba(111,227,208,${0.4 + 0.4 * k})`;
        cx.lineWidth = 2.5;
        cx.beginPath(); cx.arc(mx, my, rad, 0, Math.PI * 2); cx.stroke();
        cx.lineWidth = 1.5;
        cx.beginPath(); cx.arc(mx, my, 5, 0, Math.PI * 2); cx.stroke();
        cx.fillStyle = `rgba(159,232,239,${0.6 + 0.35 * k})`;
        cx.font = 'bold 13px -apple-system, sans-serif';
        cx.textAlign = 'center';
        cx.fillText('◈', mx, my - rad - 8);
      }
    }
  }

  // nuke targeting ghost
  if (nukeTargeting && mouse.overCanvas && nukeTargeting.warhead) {
    const spec = NUKE[nukeTargeting.warhead];
    const bad = spec.hqSafe && buildings.some(x => x.type === 'hq' && dist2(mouse.wx, mouse.wy, x.x, x.y) < NUKE_HQ_EXCLUSION ** 2);
    cx.strokeStyle = bad ? 'rgba(255,60,40,0.9)' : 'rgba(255,180,80,0.8)';
    cx.setLineDash([6, 6]);
    cx.lineWidth = 2;
    cx.beginPath(); cx.arc(mouse.wx, mouse.wy, spec.radius, 0, Math.PI * 2); cx.stroke();
    cx.setLineDash([]);
    if (bad) {
      cx.font = 'bold 14px -apple-system, sans-serif';
      cx.textAlign = 'center';
      cx.fillStyle = 'rgba(255,80,60,0.95)';
      cx.fillText('too close to an HQ', mouse.wx, mouse.wy - spec.radius - 8);
    }
  }

  // drag select rect
  if (dragging && dragStart) {
    const wx = mouse.wx, wy = mouse.wy;
    cx.strokeStyle = 'rgba(143,216,207,0.9)';
    cx.fillStyle = 'rgba(143,216,207,0.08)';
    cx.lineWidth = 1;
    const x = Math.min(dragStart.x, wx), y = Math.min(dragStart.y, wy);
    cx.fillRect(x, y, Math.abs(wx - dragStart.x), Math.abs(wy - dragStart.y));
    cx.strokeRect(x, y, Math.abs(wx - dragStart.x), Math.abs(wy - dragStart.y));
  }
  // building placement ghost
  if (placing && mouse.overCanvas) {
    const d = BLD[placing];
    const ok = canPlaceBuilding(placing, mouse.wx, mouse.wy);
    cx.globalAlpha = 0.55;
    cx.fillStyle = ok ? '#3fb9c9' : '#e0564a';
    rr(cx, mouse.wx - d.w / 2, mouse.wy - d.h / 2, d.w, d.h, 6); cx.fill();
    cx.globalAlpha = 1;
    const ringR = BLD[placing].range || (placing === 'supply' ? DEPOT_HEAL_RADIUS : 0);
    if (ringR) {
      cx.strokeStyle = placing === 'supply'
        ? (ok ? 'rgba(140,230,160,0.35)' : 'rgba(224,86,74,0.35)')
        : (ok ? 'rgba(63,185,201,0.35)' : 'rgba(224,86,74,0.35)');
      cx.setLineDash([4, 6]);
      cx.beginPath(); cx.arc(mouse.wx, mouse.wy, ringR, 0, Math.PI * 2); cx.stroke();
      cx.setLineDash([]);
    }
  }
  cx.restore();
  // dev-mode perf readout — the numbers to report back when a machine struggles.
  // Top-right, under the chip row: the command bar owns the bottom of the screen
  // and its height is a CSS knob, so anchoring to the bottom put this underneath it.
  if (devMode) {
    cx.font = '12px ui-monospace, Menlo, monospace';
    cx.textAlign = 'right';
    cx.fillStyle = perf.fps >= 55 ? 'rgba(143,216,207,0.85)'
      : perf.fps >= 40 ? 'rgba(240,200,106,0.9)' : 'rgba(224,86,74,0.95)';
    const mp = (cv.width * cv.height / 1e6).toFixed(1);
    const floor = perf.extern > 0 ? ' · CAP↑' : perf.budget <= PX_BUDGET_MIN + 1e4 ? ' · FLOOR' : '';
    const bat = onBattery ? ' · BAT' : '';
    const thin = (perf.fxLevel < 1 ? ' · FX½' : '') + FX_DRAW_LABEL[fxDraw];
    cx.fillText(`${perf.fps} fps · ${cv.width}×${cv.height} (${mp}MP) · ${dpr.toFixed(2)}x${floor}${thin}${bat}`,
      view.w - 14, 62);
    if (tick - (perf.extStamp || 0) >= 60) { perf.extRate = perf.extN || 0; perf.extN = 0; perf.extStamp = tick; }
    cx.fillText(`sim ${simMs.toFixed(1)}ms · draw ${perf.submit.toFixed(1)}ms · ${units.length}u · ${fxs.length}fx · ext ${perf.extRate || 0}/s`,
      view.w - 14, 78);
  }
  if (++frameNo % 3 === 0) renderMinimap();
}
let frameNo = 0;
const addFx = [];   // additive-blend effects, batched into one pass
// Diagnostic only (dev mode, key K): 0 = draw every effect, 1 = draw half,
// 2 = draw none. It suppresses DRAWING ONLY — effects still spawn, update and
// expire, so the fx counter and the whole sim are untouched and the reading
// isolates draw-call cost from everything else. Answers one question: is the
// wrapper's collapse under battle load the volume of small blended drawImage
// calls? (Chrome carries 286fx at 60; the WKWebView wrapper stalls at 55fx/28.)
let fxDraw = 0;
let stressWaves = 0;   // dev stress-test counter (key I)
const FX_DRAW_LABEL = ['', ' · FX½·dev', ' · FX-OFF·dev'];

function renderMinimap() {
  const sx = mini.width / W, sy = mini.height / H;
  mcx.fillStyle = '#0c100c';
  mcx.fillRect(0, 0, mini.width, mini.height);
  for (const c of crystals) {
    if (c.amount <= 0 || !isShownAt(c.x, c.y)) continue;
    mcx.fillStyle = CRYSTAL_COLOR;
    mcx.fillRect(c.x * sx - 1, c.y * sy - 1, 2, 2);
  }
  for (const e of eggs) {
    if (!isShownAt(e.x, e.y)) continue;
    mcx.fillStyle = tick % 60 < 34 ? '#8fc94a' : '#e8e2cc';   // green blink: "come get these"
    mcx.fillRect(e.x * sx - 1.5, e.y * sy - 1.5, 3, 3);
  }
  for (const rk of rocks) {
    mcx.fillStyle = rk.water ? '#123339' : rk.tree ? (rk.dead ? '#4a4f58' : '#31502e')
      : rk.spire ? '#3f6a63' : rk.bone ? '#8a8674' : rk.pit ? '#101410' : '#3d443d';
    mcx.beginPath(); mcx.arc(rk.x * sx, rk.y * sy, Math.max(1.5, rk.r * sx), 0, Math.PI * 2); mcx.fill();
  }
  for (const b of buildings) {
    if (b.team !== 1 && !isShownAt(b.x, b.y)) continue;
    mcx.fillStyle = COLORS[b.team].main;
    mcx.fillRect(b.x * sx - 2, b.y * sy - 2, 4, 4);
  }
  for (const u of units) {
    if (u.team !== 1 && !isVisibleAt(u.x, u.y)) continue;
    mcx.fillStyle = COLORS[u.team].main;
    mcx.fillRect(u.x * sx - 1, u.y * sy - 1, 2, 2);
  }
  mcx.drawImage(fogCv, 0, 0, mini.width, mini.height);
  for (const n of nukes) {
    if (tick % 24 >= 12) continue;
    mcx.fillStyle = '#ff5040';
    mcx.beginPath(); mcx.arc(n.x * sx, n.y * sy, 3.5, 0, Math.PI * 2); mcx.fill();
  }
  for (const a of alerts) {                       // attack pings pulse over the fog
    const k = (a.t % 40) / 40;
    mcx.strokeStyle = `rgba(240,90,70,${1 - k})`;
    mcx.lineWidth = 1.5;
    mcx.beginPath(); mcx.arc(a.x * sx, a.y * sy, 2 + k * 8, 0, Math.PI * 2); mcx.stroke();
  }
  if (mission && ms) {                            // objective beacons blink teal over the fog
    for (const o of ms.objectives) {
      if (!o.active || o.done || !o.mark || tick % 40 >= 28) continue;
      mcx.strokeStyle = '#6fe3d0';
      mcx.lineWidth = 1.5;
      for (const m of objMarks(o)) {
        mcx.beginPath(); mcx.arc(m[0] * sx, m[1] * sy, 4, 0, Math.PI * 2); mcx.stroke();
      }
    }
  }
  mcx.strokeStyle = 'rgba(255,255,255,0.7)';
  mcx.lineWidth = 1;
  mcx.strokeRect(cam.x * sx, cam.y * sy, view.w * sx, view.h * sy);
}

// ---------------- Main loop ----------------
function update() {
  if (devMode && teams[1]) teams[1].crystals = Math.max(teams[1].crystals, 99999);
  tick++;
  updateCamera();
  if (tick % 8 === 1) updateFog();

  for (const u of units) updateUnit(u);
  separation();
  drownSweep();
  for (const b of buildings) updateBuilding(b);
  updateBullets();
  updateFx();
  updateNukes();
  aiUpdate();
  waveUpdate();
  missionUpdate();

  const anyDead = units.some(u => u.hp <= 0) || buildings.some(b => b.hp <= 0);
  if (anyDead) {
    units = units.filter(u => u.hp > 0);
    if (buildings.some(b => b.type === 'hydro' && b.hp <= 0)) {
      buildings = buildings.filter(b => b.hp > 0);
      refreshBridges();   // a dead dam takes its crossing with it
    } else buildings = buildings.filter(b => b.hp > 0);
    pruneSelection();
    checkEnd();
  }

  if (tick % 8 === 0) { refreshTopbar(); refreshCard(); refreshQueue(); }
  refreshProgressBar();
}

let last = performance.now(), acc = 0;
// Render at most 60 times a second. requestAnimationFrame runs at the DISPLAY's
// refresh rate, so a 120Hz ProMotion Mac was doing double the GPU work for a
// sim that only ever advances 60 times a second — pure heat, no extra motion.
const DRAW_EVERY = 1000 / 61;   // a hair under 60 so we never skip a real frame
let simMs = 0;                  // rolling update() cost — CPU side of the dev readout
let lastDraw = -1e9;
// The verdict both futility paths reach: quality cuts don't move the needle,
// so the frame cap is upstream (battery throttle, OS pacing). Give the
// pixels back and hold — sharp at 30 beats blurry at 30.
function capUpstream() {
  perf.futile = 0; perf.floorSlow = 0;
  perf.extern = 60 * 120;   // hold ~2 min before re-testing the theory
  pxBudget = budgetMax() * 0.85;
  perf.ceil = PX_BUDGET_MAX;
  perf.fxLevel = 1;
  resize(); render();
  perf.budget = Math.round(pxBudget); perf.scale = +dpr.toFixed(2);
  perf.frame = 16.7; perf.cool = 300;
}

// the wrapper's PowerBridge pushes power-source changes here; a plain browser
// never calls it, so web builds simply stay on the AC profile
window.BFPower = {
  _update(b) {
    b = !!b;
    if (b === onBattery) return;
    onBattery = b;
    if (onBattery && pxBudget > PX_BUDGET_BATTERY) {
      pxBudget = PX_BUDGET_BATTERY;
      resize();
      if (started) render();   // repaint the cleared canvas inside the same beat
      perf.budget = Math.round(pxBudget); perf.scale = +dpr.toFixed(2);
      perf.frame = 16.7; perf.cool = 180;
    }
    // going to AC needs no action: the governor climbs on its own
  },
};
const perf = { frame: 16.7, fps: 60, submit: 0, budget: Math.round(pxBudget), scale: 1, cool: 240, fxLevel: 1, ceil: storedGfx ? Math.min(PX_BUDGET_MAX, storedGfx * 1.06) : PX_BUDGET_MAX, relaxHold: 0, brandStreak: 0 };
// rAF-driven scheduler wraps the body so the wrapper's native display timer
// can also tick the game: WKWebView throttles rAF to ~20-30Hz on battery, and
// no page-side code can escape that — but a native 60Hz timer calling
// __extFrame can. The 10ms draw gate keeps the two clocks from double-drawing.
let lastRaf = -1e9;
function frame(now) {
  requestAnimationFrame(frame);
  lastRaf = now;
  frameBody(now);
}
// only fills in when rAF is starving (gap > 25ms), never when it's healthy;
// `force` is for tests. document.hidden keeps a hidden window paused.
window.__extFrame = (force) => {
  const now = performance.now();
  if (force || (!document.hidden && now - lastRaf > 20)) {
    perf.extN = (perf.extN || 0) + 1;   // fills that actually ran, for the readout
    frameBody(now);
  }
};
function frameBody(now) {
  acc += Math.min(100, now - last);
  last = now;
  while (acc >= 1000 / 60) {
    if (!started || paused || userPaused) { /* menu, controls, or pause — world waits */ }
    else if (!gameOver) {
      const s0 = performance.now();
      update();
      simMs += (performance.now() - s0 - simMs) * 0.06;   // rolling sim cost for the dev readout
    }
    else { tick++; updateFx(); updateCamera(); }   // aftermath keeps burning behind the overlay
    acc -= 1000 / 60;
  }
  // Frame gate, minimum-interval form. The first version skipped any frame
  // arriving under 16.39ms — but a clean 60Hz vsync feed jitters around
  // 16.67ms, and every timestamp landing a hair early got skipped, turning
  // the next gap into 33ms: HALF the frames dropped, an idle machine pinned
  // at ~27fps (Bronson's readout: 27fps with sim 0.2ms / draw 0.1ms at the
  // budget floor — the governor punishing resolution for a stall this gate
  // was causing). The 12ms form can never skip a real 60Hz frame; it exists
  // only to halve 120Hz ProMotion down to 60, which it still does.
  const gap = now - lastDraw;
  if (gap < 10) return;   // 120Hz halves to 60; 90/100Hz feeds draw natively
  lastDraw = now;
  const t0 = performance.now();
  render();
  perf.submit += (performance.now() - t0 - perf.submit) * 0.06;   // diagnostic only

  // The governor watches DRAW-TO-DRAW time, not the time spent inside render().
  // Canvas 2D calls only queue work — timing them measures command submission
  // and reports ~0.1ms even while the GPU is drowning. The interval between
  // presented frames is the honest signal: capped at 60fps it sits near 16.7ms
  // when healthy and stretches the moment the GPU can't keep up.
  if (gap < 100 && !document.hidden) perf.frame += (gap - perf.frame) * 0.05;
  perf.fps = Math.round(1000 / perf.frame);
  // The ceiling relaxes FAST while healthy (~1.2%/s) so sharpness returns
  // within a minute of conditions improving (plugging in: Bronson sat at 60fps
  // on the FLOOR because the old rate needed ~90 minutes). What prevents
  // wall-ramming is the brand streak: every failed probe freezes relaxation
  // for 1 minute per consecutive failure, so a genuine GPU wall settles into
  // a probe every few minutes while a lifted cap recovers almost immediately.
  if (perf.relaxHold > 0) perf.relaxHold--;
  else if (perf.frame < 17.4 && perf.ceil < PX_BUDGET_MAX) perf.ceil = Math.min(PX_BUDGET_MAX, perf.ceil * 1.0002);
  // Judgement for the last down-step: if frames are exactly as slow at the
  // lower quality, pixels were never the problem. Two futile cuts in a row
  // means the frame cap is upstream (battery throttling, OS frame pacing) —
  // give the resolution back and hold. Sharp at 30 beats blurry at 30.
  if (perf.judge != null && perf.cool === 1) {
    if (perf.frame > 21 && perf.frame > perf.judge - 4) perf.futile = (perf.futile || 0) + 1;
    else perf.futile = 0;
    perf.judge = null;
    if (perf.futile >= 2) capUpstream();
  }
  if (perf.extern > 0) perf.extern--;
  if (started && !paused && !userPaused && --perf.cool <= 0) {
    // Battles are where it hurts (Bronson 2026-07-30: under 25fps in the dino
    // fight), so the DOWN reaction is fast and hard — deep drops cut deeper and
    // reconsider in ~1.2s, while sharpening back up stays slow and cautious.
    const want = perf.extern > 0 ? 0         // cap proven upstream: cuts are futile, hold
      : perf.frame > 33 ? 0.6                // under ~30fps: emergency cut
      : perf.frame > 21 ? 0.75               // under ~48fps: give up pixels
      : perf.frame < 17.4 && pxBudget * 1.15 <= Math.min(budgetMax(), perf.ceil) ? 1.12   // pinned: sharpen only for a real (15%+) gain
      : 0;
    if (want) {
      const next = clamp(Math.min(pxBudget * want, want < 1 ? Infinity : perf.ceil), PX_BUDGET_MIN, budgetMax());
      if (Math.abs(next - pxBudget) > 2e4) {
        // A down-step brands the level that failed: the ceiling drops to 92%
        // of it, and climbs may not cross it — otherwise the governor rams the
        // same failing level forever, and every resize in that loop presents
        // as a flicker. Brand/judge ONLY on a real resize: at the floor there
        // is no cut to judge, and the old placement starved the futile logic.
        if (want < 1) {
          perf.ceil = Math.max(PX_BUDGET_MIN, pxBudget * 0.92);
          perf.judge = perf.frame;   // remember how slow it was, to judge the cut later
          perf.brandStreak = Math.min(5, (perf.brandStreak || 0) + 1);
          perf.relaxHold = 60 * 60 * perf.brandStreak;   // backoff: 1 min per failure, capped at 5
        }
        pxBudget = next; resize();
        render();   // repaint INSIDE the same frame — resize clears the canvas,
                    // and presenting that blank was the visible flicker
        try { localStorage.setItem(GFX_KEY, String(Math.round(pxBudget))); } catch (e) { /* private mode */ }
        perf.budget = Math.round(pxBudget); perf.scale = +dpr.toFixed(2);
        perf.frame = 16.7;   // re-measure from scratch at the new size
        perf.cool = want < 1 ? 72 : 180;   // downs re-check in ~1.2s; ups stay patient
      } else if (want < 1) {
        // wanted to cut with nowhere lower to go: floor-starved. Sustained
        // slowness with zero pixels left to give convicts the upstream cap
        // directly — this was Bronson's 21fps FLOOR·FX½ wrapper state, where
        // the judge gate could never fire because no resize ever reset it.
        if ((perf.floorSlow = (perf.floorSlow || 0) + 1) >= 90) capUpstream();
      }
    } else if (perf.floorSlow) perf.floorSlow = 0;
    // out of pixels to give and still slow: thin the battle effects themselves.
    // fxLevel 1 = full; 0.5 = explosions spawn half the sprites, dust skipped.
    perf.fxLevel = (pxBudget <= PX_BUDGET_MIN + 1e4 && perf.frame > 21) ? 0.5 : 1;
  }
}

// ---------------- Mission engine ----------------
// mission = the static MISSIONS entry; ms = this run's cloned state, so specs
// stay pristine across restarts. All timing rides the sim tick, so pause and
// the help modal freeze dialogue and triggers along with the world.
let mission = null, ms = null;
const elObjectives = document.getElementById('objectives');
const elObjTitle = document.getElementById('obj-title');
const elObjList = document.getElementById('obj-list');
const elDialogue = document.getElementById('dialogue');
const elDlgName = document.getElementById('dlg-name');
const elDlgText = document.getElementById('dlg-text');
const elDlgPip = document.getElementById('dlg-pip');
const elDlgImg = document.getElementById('dlg-img');
const elDlgInit = document.getElementById('dlg-init');
const elDlgWave = document.getElementById('dlg-wave');
const CAMPAIGN_KEY = 'cc.campaign';
const campaignDone = () => parseInt(localStorage.getItem(CAMPAIGN_KEY) || '0', 10) || 0;

function missionInit(idx) {
  mission = MISSIONS[idx];
  preloadVoices(mission);
  ms = {
    idx,
    // reach objectives mark their own spot; anything else can set an explicit mark
    objectives: mission.objectives.map(o => ({
      ...o, done: false, active: !o.hidden, startAt: 0,
      mark: o.mark || (o.type === 'reach' ? [o.x, o.y] : null),
    })),
    triggers: (mission.triggers || []).map(t => ({ ...t, fired: false, armedAt: -1 })),
    // a scripted rival counter (M8's strip-mining race). Deliberately NOT the
    // AI's organic teams[2].mined: that number is an accident of harvester
    // pathing the player cannot read or influence, and measuring it proved
    // razing Krauss's forward camp moved his total by 6 crystals in 7000.
    // Scripted, it becomes an antagonist with a valve the player can shut.
    groups: {}, flags: {}, haul: 0, winAt: 0, outroDone: false,
  };
}

// Voice lines (optional, like sfx/portrait slots): drop
// assets/voice/<who>_<hash8>.mp3|ogg|wav and the line plays voiced; missing file
// = silent typewriter as before. Filenames come from voiceKey(who, text) — the
// hash covers speaker + text, so rewording a line correctly orphans its old clip.
// CC.exportVoiceScript() downloads the full studio script with filenames.
const VOICE_EXTS = ['mp3', 'ogg', 'wav'];
const VOICE_VOL = 0.9;
const voice = {};        // key -> loaded HTMLAudio
const voiceTried = {};   // key -> probe already issued
const voiceFailed = {};  // key -> probe settled with NO file (all exts 404'd)
function voiceKey(who, text) {
  const s = who + '|' + text;
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return who + '_' + h.toString(16).padStart(8, '0');
}
function loadVoice(who, text) {
  const key = voiceKey(who, text);
  if (voiceTried[key]) return;
  voiceTried[key] = true;
  (function tryExt(i) {
    if (i >= VOICE_EXTS.length) { voiceFailed[key] = true; return; }
    const el = new Audio();
    el.preload = 'auto';
    el.oncanplaythrough = () => { if (!voice[key]) voice[key] = el; };
    el.onerror = () => tryExt(i + 1);
    el.src = 'assets/voice/' + key + '.' + VOICE_EXTS[i];
  })(0);
}
// probe every line a mission can speak, so clips are buffered before they fire
function preloadVoices(m) {
  for (const [w, t] of (m.brief || [])) loadVoice(w, t);
  for (const [w, t] of (m.intro || [])) loadVoice(w, t);
  for (const tr of (m.triggers || [])) for (const [w, t] of (tr.say || [])) loadVoice(w, t);
  for (const [w, t] of (m.outro || [])) loadVoice(w, t);
}
let voiceCur = null;
function playVoice(who, text) {
  stopVoice();
  const clip = voice[voiceKey(who, text)];
  if (!clip || muted) return null;
  clip.volume = VOICE_VOL;
  try { clip.currentTime = 0; clip.play().catch(() => { /* pre-gesture autoplay block */ }); } catch (e) { /* ignore */ }
  voiceCur = clip;
  return clip;
}
function stopVoice() {
  if (voiceCur) { try { voiceCur.pause(); } catch (e) { /* ignore */ } voiceCur = null; }
}
// pause/help freeze the sim tick, so dialogue timing stops — hold the audio with it
function syncVoicePause() {
  if (!voiceCur || voiceCur.ended) return;
  if (userPaused || paused) { try { voiceCur.pause(); } catch (e) {} }
  else { try { voiceCur.play().catch(() => {}); } catch (e) {} }
}
function exportVoiceScript() {
  const rows = [], seen = new Set();
  const add = (mi, ctx, who, text) => {
    const key = voiceKey(who, text);
    if (seen.has(key)) return;
    seen.add(key);
    rows.push([mi + 1, ctx, CAST[who].name, key + '.mp3', text]);
  };
  MISSIONS.forEach((m, i) => {
    for (const [w, t] of (m.brief || [])) add(i, 'briefing', w, t);
    for (const [w, t] of (m.intro || [])) add(i, 'intro', w, t);
    for (const tr of (m.triggers || [])) for (const [w, t] of (tr.say || [])) add(i, 'trigger', w, t);
    for (const [w, t] of (m.outro || [])) add(i, 'outro', w, t);
  });
  const tsv = 'mission\tcontext\tspeaker\tfile\tline\n' + rows.map(r => r.join('\t')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([tsv], { type: 'text/tab-separated-values' }));
  a.download = 'voice-script.tsv';
  a.click();
  return rows.length + ' lines exported';
}

// dialogue: a queue of speaker lines, revealed typewriter-style on the sim tick.
// When lines back up (fast players out-build the script), the current line types
// faster and holds shorter so the commentary catches up instead of lagging.
let dlgQueue = [], dlgCur = null, dlgStart = 0, dlgUntil = 0, dlgHold = 0, dlgClipEnd = 0;
// Hold long enough to actually READ it. 0.055s/char is ~18 characters a second,
// which is unhurried adult reading pace; the old 0.035 (~28/s) outran the eye
// (Bronson 2026-07-27: "text moves too fast, I can't even finish reading").
// Voiced lines ignore all of this — they hold for the clip's own length.
const dlgDur = (text) => Math.min(11 * 60, Math.floor((1.9 + text.length * 0.055) * 60));
function say(who, text) { dlgQueue.push({ who, text }); }
function dlgUpdate() {
  if (!dlgCur && dlgQueue.length) {
    // cold-load grace: if this line's clip probe is still in flight (fresh page,
    // slow network), hold up to 1s so the line starts voiced, not silent.
    // Unvoiced lines settle to voiceFailed almost instantly, so they don't wait.
    const peek = dlgQueue[0];
    loadVoice(peek.who, peek.text);   // no-op if already probed
    const vk = voiceKey(peek.who, peek.text);
    if (!voice[vk] && !voiceFailed[vk] && dlgHold < 60) { dlgHold++; return; }
    dlgHold = 0;
    dlgCur = dlgQueue.shift();
    dlgStart = tick; dlgUntil = tick + dlgDur(dlgCur.text);
    const c = CAST[dlgCur.who];
    elDlgName.textContent = c.name; elDlgName.style.color = c.color;
    elDlgText.textContent = '';
    elDlgPip.style.borderColor = c.color;
    elDlgWave.style.color = c.color;
    const art = PORTRAITS[dlgCur.who];
    if (art) {
      elDlgImg.src = art.src;
      elDlgImg.classList.remove('hidden'); elDlgInit.classList.add('hidden');
    } else {
      elDlgImg.classList.add('hidden'); elDlgInit.classList.remove('hidden');
      elDlgInit.textContent = c.init; elDlgInit.style.color = c.color;
    }
    elDialogue.classList.remove('hidden');
    elDialogue.classList.add('talking');
    // a voiced line holds the bar for the clip's length (metadata is in — the
    // clip only registers on canplaythrough); text pacing stays the floor
    dlgClipEnd = 0;
    const clip = playVoice(dlgCur.who, dlgCur.text);
    if (clip && isFinite(clip.duration) && clip.duration > 0) {
      dlgClipEnd = tick + Math.ceil(clip.duration * 60);
      dlgUntil = tick + Math.max(dlgDur(dlgCur.text), Math.ceil(clip.duration * 60) + 24);
    }
  }
  if (!dlgCur) return;
  const rush = dlgQueue.length > 0;
  const rate = rush ? 2.6 : 1.4;
  const chars = Math.floor((tick - dlgStart) * rate);
  if (chars <= dlgCur.text.length + 3) elDlgText.textContent = dlgCur.text.slice(0, chars);
  // rush-cut trims the post-line hold, NEVER a playing clip — a voiced line
  // always finishes speaking before the next one starts (playtest: Krauss got
  // cut off mid-sentence when Lin's line was queued behind his)
  // A backlog trims the hold but can no longer gut it: the old rule left a flat
  // 1s after typing, so a queued 120-character line flashed by in under two
  // seconds. Now the floor scales with the line — 65% of its normal read time.
  const until = rush
    ? Math.max(dlgClipEnd + 12,
        Math.min(dlgUntil, dlgStart + Math.max(Math.ceil(dlgCur.text.length / rate) + 45,
                                               Math.floor(dlgDur(dlgCur.text) * 0.65))))
    : dlgUntil;
  if (tick >= until) {
    dlgCur = null;
    dlgClipEnd = 0;
    stopVoice();   // safety stop — the clip has already ended unless the line was skipped
    elDialogue.classList.remove('talking');
    if (!dlgQueue.length) elDialogue.classList.add('hidden');
  }
}

let lastObjSig = '';
// A groupDead objective with a mark tracks its SURVIVORS — one beacon per
// living member — instead of pinning the authored spot forever. Playtest, M5:
// three relays down, the fourth alive in heavy fog, and the only beacon pulsed
// over the FIRST relay's rubble; nothing on screen pointed at the survivor.
// The authored mark still serves as the pre-spawn / all-dead fallback, and an
// objective with no mark stays unmarked (M1's reprisal must not leak positions).
function objMarks(o) {
  if (!o.mark) return [];
  if (o.type === 'groupDead') {
    const g = groupAlive(o.group);
    if (g && g.length) return g.map(m => [m.x, m.y]);
  }
  return [o.mark];
}
// How far along a counted objective is, as "3/4" — null when it doesn't count.
// Playtest, M2: a player delivered three haulers, left three idle at the start,
// and the HUD said only "Escort the convoy to Survey Post Beta (4+ harvesters
// alive)" — which reads as a survival rule, not a delivery quota. Nothing on
// screen showed 3 of 4. Progress has to be visible or the objective is a riddle.
function objProgress(o) {
  if (o.done) return null;
  // groupDead counts kills against the group's fixed roster (same M5 lesson:
  // "3/4 relays" is the difference between a hung objective and a hunt)
  if (o.type === 'groupDead' && ms.groups[o.group]) {
    const total = ms.groups[o.group].length;
    return (total - (groupAlive(o.group) || []).length) + '/' + total;
  }
  if (!o.count) return null;
  if (o.type === 'groupReach')
    return (o.arrived ? reachPool(o).filter(u => o.arrived[u.id]).length : 0) + '/' + o.count;
  if (o.type === 'unitCount')
    return Math.min(o.count, units.filter(u => u.team === 1 && u.hp > 0 && u.type === o.unit).length) + '/' + o.count;
  if (o.type === 'built')
    return Math.min(o.count, buildings.filter(b => b.team === 1 && b.hp > 0 && b.type === o.bld && b.built >= 1
      && (o.r == null || dist2(b.x, b.y, o.x, o.y) < o.r * o.r)).length) + '/' + o.count;
  return null;
}
function refreshObjectives() {
  if (!mission || !ms) { elObjectives.classList.add('hidden'); lastObjSig = ''; return; }
  const objs = ms.objectives.filter(o => o.active);
  // clocks AND counts are in the signature so both actually repaint
  const sig = objs.map(o => o.id + (o.done ? '1' : '0') + (objClock(o) ?? '') + (objProgress(o) ?? '')).join(',');
  if (sig === lastObjSig) return;
  lastObjSig = sig;
  elObjTitle.textContent = `Mission ${ms.idx + 1} — ${mission.title}`;
  elObjList.innerHTML = objs.map(o => {
    const c = objClock(o);
    const clock = c == null ? ''
      : `<span class="obj-clock${c <= 60 ? ' urgent' : ''}">${mmss(c)}</span>`;
    const prog = objProgress(o);
    const count = prog ? `<span class="obj-count">${prog}</span>` : '';
    return `<div class="obj${o.done ? ' done' : ''}">${o.done ? '✔' : '◈'} ${o.text}${count}${clock}</div>`;
  }).join('');
  elObjectives.classList.remove('hidden');
}

// Who can satisfy a groupReach. `unit` widens the pool from the tagged spawn
// group to every living unit of that type the player owns — a replacement
// hauler is worth what an original was. `after` narrows it to units that
// already arrived at an EARLIER objective, which is what makes a return leg
// mean something: without it, harvesters that never left home sat inside the
// home circle and latched the trip back before the convoy had moved.
function reachPool(o) {
  let g = o.unit ? units.filter(u => u.team === 1 && u.hp > 0 && u.type === o.unit)
                 : (groupAlive(o.group) || []);
  if (o.after) {
    const prev = ms.objectives.find(x => x.id === o.after);
    g = g.filter(u => prev && prev.arrived && prev.arrived[u.id]);
  }
  return g;
}
// Arrival is recorded for every ACTIVE groupReach — including completed ones,
// so a later leg chaining off it still sees fresh visits. Only active ones, or
// a unit could latch a leg it was standing on before that leg was ever ordered.
function latchArrivals(o) {
  if (o.type !== 'groupReach' || !o.active) return;
  o.arrived = o.arrived || {};
  for (const u of reachPool(o))
    if (dist2(u.x, u.y, o.x, o.y) < o.r * o.r) o.arrived[u.id] = 1;
}
function objMet(o) {
  switch (o.type) {
    case 'unitCount': return units.filter(u => u.team === 1 && u.hp > 0 && u.type === o.unit).length >= o.count;
    // `built` takes an optional x/y/r so a mission can demand it HERE, not anywhere
    case 'built': return buildings.filter(b => b.team === 1 && b.hp > 0 && b.type === o.bld && b.built >= 1
      && (o.r == null || dist2(b.x, b.y, o.x, o.y) < o.r * o.r)).length >= o.count;
    // hold the line for N seconds — the clock starts when the objective appears
    case 'survive': return tick >= (o.startAt || 0) + o.secs * 60;
    // every tagged structure in a spawn group is rubble (relay sweeps)
    case 'groupDead': { const g = groupAlive(o.group); return !!g && g.length === 0; }
    case 'mined': return stats.mined >= o.amount;
    case 'reach': return units.some(u => u.team === 1 && u.hp > 0 && dist2(u.x, u.y, o.x, o.y) < o.r * o.r);
    case 'captive': return teams[1].captives >= o.count;
    // enough of a named group has made it to the marked spot (convoy escort)
    // Arrival LATCHES per unit: a convoy that trickles in over a minute would
    // otherwise never have N inside the circle at the same instant — the early
    // arrivals scatter to mine before the stragglers reach the post. Once a unit
    // has touched the circle it counts as delivered for as long as it lives.
    case 'groupReach': return reachPool(o).filter(u => o.arrived && o.arrived[u.id]).length >= o.count;
    // no living hostile building of this type left near the mark (nest cracks).
    // It must have been THERE first: a target the mission spawns on a trigger
    // doesn't exist at tick 0, and without `seen` the objective completes
    // instantly (M6 was won before Krauss's silo was built).
    case 'destroy': {
      const alive = buildings.some(b =>
        b.team !== 1 && b.hp > 0 && b.type === o.bld && dist2(b.x, b.y, o.x, o.y) < o.r * o.r);
      if (alive) o.seen = true;
      return !!o.seen && !alive;
    }
    case 'flag': return !!ms.flags[o.id];
  }
  return false;
}
function condMet(w) {
  if (!w) return true;
  if (w.time != null && tick < w.time * 60) return false;
  if (w.done) for (const id of w.done) {
    const o = ms.objectives.find(o => o.id === id);
    if (!o || !o.done) return false;
  }
  if (w.notDone) for (const id of w.notDone) {
    const o = ms.objectives.find(o => o.id === id);
    if (o && o.done) return false;
  }
  // "no specimen in play" — guards respawn triggers while a rig is mid-haul
  if (w.noCaptive && units.some(u => u.team === 1 && u.captive)) return false;
  if (w.mined != null && stats.mined < w.mined) return false;
  // the rival's haul — an economy race the player can LOSE without a shot fired
  if (w.haul != null && ms.haul < w.haul) return false;
  if (w.groupDead) {
    const g = groupAlive(w.groupDead);
    if (!g || g.length) return false;
  }
  // too few of a UNIT TYPE left alive — the type-based twin of groupBelow, so a
  // convoy mission fails on "you cannot deliver the quota any more" rather than
  // on which particular haulers died
  if (w.unitsBelow) {
    if (units.filter(u => u.team === 1 && u.hp > 0 && u.type === w.unitsBelow[0]).length >= w.unitsBelow[1])
      return false;
  }
  // too few of a group left alive (convoy attrition → mission failure)
  if (w.groupBelow) {
    const g = groupAlive(w.groupBelow[0]);
    if (!g || g.length >= w.groupBelow[1]) return false;
  }
  // any player unit near a point (route progress, ambush triggers)
  if (w.near && !units.some(u => u.team === 1 && u.hp > 0
      && dist2(u.x, u.y, w.near[0], w.near[1]) < w.near[2] * w.near[2])) return false;
  return true;
}
function activateObjective(id) {
  const o = ms.objectives.find(o => o.id === id);
  if (!o || o.active) return;
  o.active = true;
  o.startAt = tick;   // survive/limit clocks run from the moment the order lands
  toast('◈ New objective: ' + o.text); snd.ready();
}
// seconds left on an objective's clock: `secs` counts down to completion
// (survive), `limit` counts down to failure (deadline). null = no clock.
function objClock(o) {
  const span = o.type === 'survive' ? o.secs : o.limit;
  if (span == null || o.done) return null;
  return Math.max(0, Math.ceil(span - (tick - (o.startAt || 0)) / 60));
}
const mmss = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
function doSpawn(sp) {
  const ids = sp.group ? (ms.groups[sp.group] = ms.groups[sp.group] || []) : null;
  const hq = buildings.find(b => b.team === 1 && b.type === 'hq');
  if (sp.bld) {   // pre-built structures (outposts, survey posts, dino lairs)
    // dino structures come alive: dens get their door guard + hunt clock,
    // nests their brood — a bare makeBuilding would spawn them inert
    const b = sp.bld === 'den' ? makeDen(sp.at[0], sp.at[1])
      : sp.bld === 'nest' ? makeNest(sp.at[0], sp.at[1])
      : makeBuilding(sp.bld, sp.team || 1, sp.at[0], sp.at[1]);
    if (sp.invuln) b.invuln = true;   // scripted, unkillable (M7's den erupts; you don't get to answer it)
    if (ids) ids.push(b.id);
    return;
  }
  for (let i = 0; i < sp.n; i++) {
    const u = makeUnit(sp.unit, sp.team || 3,
      clamp(sp.at[0] + (i % 3) * 30 - 30, 20, W - 20),
      clamp(sp.at[1] + ((i / 3) | 0) * 30 - i * 10, 20, H - 20));
    // `aim` sends a wave after a KIND of structure — Krauss's raiders going
    // for the power plants first is the whole lesson of M4
    const aimed = sp.aim && buildings.filter(b => b.team === 1 && b.hp > 0 && b.type === sp.aim)
      .sort((a, b2) => dist2(a.x, a.y, sp.at[0], sp.at[1]) - dist2(b2.x, b2.y, sp.at[0], sp.at[1]))[0];
    if (aimed) u.order = { type: 'attackmove', x: aimed.x, y: aimed.y };
    else if (sp.order === 'attackhq' && hq) u.order = { type: 'attackmove', x: hq.x, y: hq.y };
    else if (sp.order === 'guard') u.order = { type: 'guard', hx: u.x, hy: u.y };
    else if (sp.to) u.order = { type: isCombat(u) ? 'attackmove' : 'move', x: sp.to[0], y: sp.to[1] };
    if (sp.specimen) u.specimen = true;   // protected: player weapons won't track it
    if (sp.invuln) u.invuln = true;       // scripted set-piece (M13's Broodmother walk): the story owns it
    if (ids) ids.push(u.id);
  }
}
// living members of a spawn group (units and buildings both count)
function groupAlive(name) {
  const g = ms.groups[name];
  if (!g) return null;
  const out = [];
  for (const id of g) {
    const u = units.find(x => x.id === id && x.hp > 0) || buildings.find(x => x.id === id && x.hp > 0);
    if (u) out.push(u);
  }
  return out;
}
function fireTrigger(t) {
  if (t.say) for (const [who, line] of t.say) say(who, line);
  if (t.objective) for (const id of [].concat(t.objective)) activateObjective(id);
  if (t.complete) ms.flags[t.complete] = true;
  if (t.spawn) for (const sp of [].concat(t.spawn)) doSpawn(sp);
  // The world's own wildlife mobilises: every living unit of a team drops what
  // it was doing and converges on a point (default: the player HQ). Nest guards
  // forget their nest (home = null) so the leash can't walk them home mid-charge
  // — which also means the nests start rebuilding a brood behind the wave.
  // Tagging them into a group lets a `groupDead` objective track "until they're
  // all down"; the group is fixed at fire time, so the refill can't gate the win.
  if (t.rally) {
    const hq = buildings.find(b => b.team === 1 && b.hp > 0 && b.type === 'hq');
    const tx = t.rally.to ? t.rally.to[0] : hq && hq.x;
    const ty = t.rally.to ? t.rally.to[1] : hq && hq.y;
    const ids = t.rally.group ? (ms.groups[t.rally.group] = ms.groups[t.rally.group] || []) : null;
    // `of` re-orders the survivors of an existing group instead of sweeping the
    // whole team — that's what keeps a repeat re-rally from hoovering up the
    // fresh brood the nests grow behind the wave (the objective would never end)
    const pool = t.rally.of ? (groupAlive(t.rally.of) || []) : units;
    if (tx != null) for (const u of pool) {
      if (!t.rally.of && u.team !== (t.rally.team || 3)) continue;
      // groups can hold buildings too (relay sweeps) — those don't take orders
      if (u.hp <= 0 || !units.includes(u)) continue;
      // grazers are never auto-targeted and specimens are weapons-locked —
      // sweeping either into an assault group would make the objective unwinnable
      if (u.type === 'critter' || u.specimen) continue;
      if (t.rally.unit && u.type !== t.rally.unit) continue;
      u.home = null; u.roam = false;
      u.order = { type: 'attackmove', x: tx, y: ty };
      if (ids && !ids.includes(u.id)) ids.push(u.id);
    }
  }
  if (t.alarm) { toast(t.alarm); snd.alarm(); }
  if (t.focus) focusCam(t.focus[0], t.focus[1]);   // scripted event camera
  // a launch the story orders — no silo required, unlike the player's
  if (t.nuke) {
    for (const n of [].concat(t.nuke)) {
      nukes.push({ x: n.at[0], y: n.at[1], team: n.team || 2,
                   tier: n.tier || 'tac', t: 0, max: NUKE_COUNTDOWN });
    }
    toast('☢ NUCLEAR LAUNCH DETECTED — impact in 30 seconds!');
    snd.launch();
  }
  if (t.haul) ms.haul += t.haul;   // the rival's off-map operation ticking over
  if (t.crystals) teams[1].crystals += t.crystals;
  // scripted defeat (convoy lost, etc.) — but never once the win is already
  // draining: all objectives ✔ + outro playing, then a straggler dying to the
  // LZ garrison flipped M5 to FAILED mid-victory-speech. Won is won.
  if (t.lose && !ms.outroDone) missionEnd(false);
}

function missionUpdate() {
  if (!mission || gameOver) return;
  dlgUpdate();
  if (tick % 10 !== 0) return;
  for (const o of ms.objectives) latchArrivals(o);
  // destroy targets latch `seen` even before the objective reveals — a target
  // the player razes early must still count once it activates (M5's optional
  // fuel dump stands from t=0). A target that doesn't exist yet still never
  // latches, so the M6 tick-0 false-complete fix is preserved.
  for (const o of ms.objectives) if (o.type === 'destroy' && !o.done && !o.seen) objMet(o);
  for (const o of ms.objectives) {
    if (!o.active || o.done) continue;
    // a deadline that runs out: the mission decides what that costs
    if (o.limit != null && objClock(o) === 0) {
      o.expired = true;
      if (o.onExpire === 'lose') { if (!ms.outroDone) { missionEnd(false); return; } }
      o.limit = null;   // soft deadline — the clock just stops mattering
      continue;
    }
    if (!objMet(o)) continue;
    o.done = true;
    toast('✔ ' + o.text); snd.ready();
  }
  for (const t of ms.triggers) {
    if (t.fired) continue;
    if (t.armedAt < 0 && tick >= (t.coolUntil || 0) && condMet(t.when)) t.armedAt = tick;
    if (t.armedAt >= 0 && tick >= t.armedAt + (t.delay || 0) * 60) {
      if (t.repeat) {
        // repeatables re-verify at fire time — the world may have moved on.
        // `every` throttles periodic repeats (theater waves, harassers).
        t.armedAt = -1;
        t.coolUntil = tick + (t.every || 0) * 60;
        if (condMet(t.when)) fireTrigger(t);
      } else { t.fired = true; fireTrigger(t); }
    }
  }
  if (!ms.outroDone && mission.winWhen.every(id => {
    const o = ms.objectives.find(o => o.id === id);
    return o && o.done;
  })) {
    ms.outroDone = true;
    // Small headroom only — the per-line loop below already accounts for voice
    // clip length, and 2.5s of dead air after the last word made the debrief
    // feel like a hang (Bronson 2026-07-27: should be under 7 seconds).
    let wait = 45;
    for (const [who, line] of (mission.outro || [])) {
      say(who, line);
      // a voiced line holds the bar for the clip, so the win timer must too —
      // otherwise MISSION COMPLETE lands mid-sentence (mirrors dlgUpdate)
      const clip = voice[voiceKey(who, line)];
      wait += (clip && isFinite(clip.duration) && clip.duration > 0)
        ? Math.max(dlgDur(line), Math.ceil(clip.duration * 60) + 24)
        : dlgDur(line);
    }
    ms.winAt = tick + wait;
  }
  // winAt is an estimate over the OUTRO lines only — if another trigger's
  // dialogue was already queued when the last objective completed, the outro
  // starts late. The drain guard makes it exact: never drop MISSION COMPLETE
  // while anyone is still talking (missionEnd freezes dlgUpdate mid-line).
  if (ms.outroDone && ms.winAt && tick >= ms.winAt && !dlgCur && !dlgQueue.length) missionEnd(true);
  refreshObjectives();
}

// The debrief is a victory lap, not a cutscene — a click or a key jumps
// straight to the scoreboard instead of waiting the outro out.
function skipOutro() {
  if (!mission || !ms || !ms.outroDone || gameOver) return false;
  dlgQueue.length = 0; dlgCur = null; dlgClipEnd = 0;
  stopVoice();
  elDialogue.classList.remove('talking');
  elDialogue.classList.add('hidden');
  ms.winAt = tick;
  return true;
}
function missionEnd(win) {
  if (gameOver) return;
  gameOver = win ? 'win' : 'lose';
  if (win) localStorage.setItem(CAMPAIGN_KEY, String(Math.max(campaignDone(), ms.idx + 1)));
  overlayTimer = setTimeout(() => {
    elOvTitle.textContent = win ? 'MISSION COMPLETE' : 'MISSION FAILED';
    elOvTitle.className = win ? 'win' : 'lose';
    elOvSub.textContent = (win ? mission.winText : mission.loseText) || '';
    overlayStats();
    document.getElementById('btn-again').textContent = win ? '▶ Continue' : '↻ Back to base';
    elOverlay.classList.remove('hidden');
    beep(win ? 520 : 220, 0.5, 'sine', 0.06, win ? 1040 : 80);
  }, win ? 600 : 1400);
}

// ---------------- Store / entitlements ----------------
// One owns() API with per-platform backends (BROODFALL-BRIEF item 3):
//  - Mac App Store wrapper: webkit.messageHandlers.bfstore bridges to StoreKit 2
//    (mac/Broodfall/StoreBridge.swift); state arrives via BFStore._update().
//  - web / file:// (no bridge): everything unlocked — GitHub Pages stays the
//    free playtest build. Steam later plugs in as its own backend here.
// Free tier (locked 2026-07-23): first FREE_MISSIONS campaign missions and the
// FREE_MAPS skirmish maps; one non-consumable purchase unlocks the rest.
const FREE_MISSIONS = 3;
const FREE_MAPS = ['basin'];
// ⚠ PRERELEASE SWITCH — keeps dev tools (Space×5, CC.unlockAll, CC.devMode)
// alive in EVERY wrapper build while Bronson playtests local .apps, and lets
// dev mode open the paywall. MUST be flipped to false in the App Store
// submission archive (ship checklist ap8) — true in a shipping build is a
// paywall bypass. Web/file:// builds ignore it (always unlocked anyway).
const DEV_PRERELEASE = true;
const BFStore = (() => {
  const native = !!(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bfstore);
  // In the wrapper, fail CLOSED until StoreKit answers — a paywall that flashes
  // open is a refund ticket; one that flashes shut is a beat of patience.
  let state = { owned: !native, price: null, debug: false, busy: false };
  const post = (msg) => { try { window.webkit.messageHandlers.bfstore.postMessage(msg); } catch (e) { /* bridge gone */ } };
  if (native) post({ cmd: 'state' });
  return {
    native,
    owns() { return state.owned; },
    // dev cheats live only where there is no paywall (web), no customer (DEBUG
    // builds), or while the prerelease switch is on (local playtest .apps)
    devAllowed() { return DEV_PRERELEASE || !native || state.debug; },
    get price() { return state.price; },
    get busy() { return state.busy; },
    buy() { if (native && !state.owned && !state.busy) { state.busy = true; post({ cmd: 'buy' }); renderMenu(); } },
    restore() { if (native && !state.busy) { state.busy = true; post({ cmd: 'restore' }); renderMenu(); } },
    _update(s) {
      const hadIt = state.owned;
      state = { ...state, ...s, busy: false };
      if (s.error) toast('⚠ ' + s.error);
      else if (state.owned && !hadIt) toast('💎 Full game unlocked — every mission, every map. Good hunting, commander.');
      if (!started) renderMenu();
    },
  };
})();
// dev mode implies full access (it's only reachable where devAllowed() is true)
const missionPaywalled = (i) => i >= FREE_MISSIONS && !BFStore.owns() && !devMode;
const mapPaywalled = (k) => !FREE_MAPS.includes(k) && !BFStore.owns() && !devMode;
function storeNudge() {
  toast(`🔒 That's part of the full game — one purchase (${BFStore.price || '$9.99'}) unlocks everything, forever.`);
  const el = document.getElementById('menu-store');
  el.classList.remove('nudge');
  void el.offsetWidth;   // restart the shake animation
  el.classList.add('nudge');
}
function renderStoreStrip() {
  const el = document.getElementById('menu-store');
  if (!BFStore.native || BFStore.owns()) { el.classList.add('hidden'); return; }
  el.classList.remove('hidden');
  if (BFStore.busy) {
    el.innerHTML = '<div class="store-note">Contacting the App Store…</div>';
    return;
  }
  el.innerHTML =
    `<button id="btn-buy">💎 Unlock the full game — ${BFStore.price || '$9.99'}</button>` +
    '<div class="store-sub">Every campaign mission — including the free story updates — and every skirmish map. One purchase, no ads, ever.</div>' +
    '<button id="btn-restore">Restore purchase</button>';
  document.getElementById('btn-buy').onclick = () => { audioInit(); BFStore.buy(); };
  document.getElementById('btn-restore').onclick = () => { audioInit(); BFStore.restore(); };
}

// ---------------- Start menu ----------------
let started = false;
const elMenu = document.getElementById('menu');
// WASD camera (opt-in). Every letter WASD wants is already a command, and only
// I and K are unbound in the whole alphabet — so turning this on MOVES two unit
// commands rather than stacking them. attack-move and stop go to E and Q, which
// collide with nothing: those are production keys, and production only fires
// with a building selected while attack-move/stop only matter with units
// selected. Same trick D already uses (hunker on units, artillery on a Factory).
let wasdCam = localStorage.getItem('cc.wasd') === '1';
const KEY_AMOVE = () => (wasdCam ? 'KeyE' : 'KeyA');
const KEY_STOP  = () => (wasdCam ? 'KeyQ' : 'KeyS');
const KEY_HUNKER = () => (wasdCam ? 'KeyR' : 'KeyD');
// WASD pans only while NO building is selected. W and D are production slots
// and can't be given up, so selecting a building hands those letters back to
// the build card — which is also when you are least likely to be panning.
const wasdPanning = () => wasdCam && !selection.some(x => x.kind === 'building');
const MENU_CONTROLS = {
  arrows: { label: 'Arrows', desc: 'Classic RTS. A = attack-move, S = stop.' },
  wasd:   { label: 'WASD + arrows', desc: 'WASD also pans. Attack-move moves to E, stop to Q.' },
};
function applyControlScheme() {
  const cam = document.getElementById('hk-cam');
  if (cam) cam.textContent = wasdCam
    ? 'WASD / arrow keys / screen edge / minimap' : 'Arrow keys / screen edge / minimap';
  const am = document.getElementById('hk-amove'); if (am) am.textContent = wasdCam ? 'E' : 'A';
  const st = document.getElementById('hk-stop');  if (st) st.textContent = wasdCam ? 'Q' : 'S';
  const hk = document.getElementById('hk-hunker'); if (hk) hk.textContent = wasdCam ? 'R' : 'D';
  lastCardSig = '';   // card labels name these keys — force a repaint
}
let chosenMap = localStorage.getItem('cc.map') || 'basin';
let chosenDiff = localStorage.getItem('cc.diff') || 'normal';
if (!MAPS[chosenMap]) chosenMap = 'basin';
if (!DIFFS[chosenDiff]) chosenDiff = 'normal';

function menuButtons(el, table, chosen, pick, lockedFn) {
  el.innerHTML = '';
  for (const key in table) {
    const locked = lockedFn ? lockedFn(key) : false;
    const b = document.createElement('button');
    b.className = 'opt' + (key === chosen ? ' sel' : '') + (locked ? ' opt-locked' : '');
    b.innerHTML = `<b>${locked ? '🔒 ' : ''}${table[key].label}</b><span>${table[key].desc}</span>`;
    b.onclick = () => { audioInit(); if (locked) { storeNudge(); return; } pick(key); };
    el.appendChild(b);
  }
}
const MENU_MODES = {
  skirmish: { label: 'Skirmish', desc: 'One map, one enemy, no script. Pick your battlefield.' },
  campaign: { label: 'Campaign', desc: 'The story of the expedition, one mission at a time.' },
};
let chosenMode = localStorage.getItem('cc.mode') || 'skirmish';
if (!MENU_MODES[chosenMode]) chosenMode = 'skirmish';
function renderMenu() {
  menuButtons(document.getElementById('menu-modes'), MENU_MODES, chosenMode, k => {
    chosenMode = k; localStorage.setItem('cc.mode', k); renderMenu();
  });
  document.getElementById('menu-skirmish').classList.toggle('hidden', chosenMode !== 'skirmish');
  document.getElementById('menu-campaign').classList.toggle('hidden', chosenMode !== 'campaign');
  if (chosenMode === 'skirmish') {
    // a remembered pick from an unlocked build must not smuggle a locked map past the gate
    if (mapPaywalled(chosenMap)) chosenMap = FREE_MAPS[0];
    menuButtons(document.getElementById('menu-maps'), MAPS, chosenMap, k => { chosenMap = k; renderMenu(); }, mapPaywalled);
    menuButtons(document.getElementById('menu-diffs'), DIFFS, chosenDiff, k => { chosenDiff = k; renderMenu(); });
  } else {
    renderMissionList();
  }
  menuButtons(document.getElementById('menu-controls'), MENU_CONTROLS, wasdCam ? 'wasd' : 'arrows', k => {
    wasdCam = (k === 'wasd');
    localStorage.setItem('cc.wasd', wasdCam ? '1' : '0');
    applyControlScheme();
    renderMenu();
  });
  renderStoreStrip();
  renderDevStrip();
}
// A visible dev toggle on the start menu — WRAPPER-ONLY (Bronson 2026-08-01:
// the Space×5 gesture is a ritual when you playtest daily). Gated on native
// so the public web build never shows it, and on devAllowed() so it dies in
// the App Store archive the moment DEV_PRERELEASE flips false (ap8). Same
// toggle as the gesture — one code path, one paywall audit surface.
function renderDevStrip() {
  const el = document.getElementById('menu-dev');
  if (!el) return;
  if (!BFStore.native || !BFStore.devAllowed()) { el.classList.add('hidden'); return; }
  el.classList.remove('hidden');
  el.innerHTML = `<button id="btn-dev" style="font-size: 12px; opacity: 0.75;${devMode ? ' border-color: rgba(240,200,106,0.8); color: #f0c86a; opacity: 1;' : ''}">🛠 Dev mode: ${devMode ? 'ON' : 'off'} — unlock everything</button>`;
  document.getElementById('btn-dev').onclick = () => { toggleDevMode(); renderMenu(); };
}
function renderMissionList() {
  const el = document.getElementById('menu-missions');
  el.innerHTML = '';
  const doneN = campaignDone();
  MISSIONS.forEach((m, i) => {
    const paywalled = missionPaywalled(i);
    const locked = i > doneN || paywalled;
    const b = document.createElement('button');
    b.className = 'mrow' + (locked ? ' locked' : '');
    b.innerHTML =
      `<span class="mnum">${String(i + 1).padStart(2, '0')}</span>` +
      `<span class="mtitle"><b>${m.title}</b><span>${m.act}</span></span>` +
      `<span class="mstat">${paywalled ? '💎' : locked ? '🔒' : i < doneN ? '✔' : '▶'}</span>`;
    if (!locked) b.onclick = () => { audioInit(); openBriefing(i); };
    else if (paywalled) { b.onclick = () => { audioInit(); storeNudge(); }; b.style.cursor = 'pointer'; }
    el.appendChild(b);
  });
}

// ---------------- Briefing screen ----------------
const elBriefing = document.getElementById('briefing');
let briefIdx = null, briefTimer = null;
function briefLineHtml(who, text) {
  const c = CAST[who];
  return `<p><b style="color:${c.color}">${c.name}</b><span>${text}</span></p>`;
}
function openBriefing(idx) {
  briefIdx = idx;
  const m = MISSIONS[idx];
  preloadVoices(m);
  document.getElementById('brief-kicker').textContent = `${m.act} · Mission ${idx + 1}`;
  document.getElementById('brief-title').textContent = m.title;
  document.getElementById('brief-objs').innerHTML =
    m.objectives.filter(o => !o.hidden).map(o => `<li>${o.text}</li>`).join('');
  // typewriter reveal, one line at a time; click the text to skip ahead.
  // A voiced line holds the next line until its clip ends (a blocked/missing
  // clip is paused, so it can never wedge the reveal).
  const box = document.getElementById('brief-lines');
  box.innerHTML = '';
  clearInterval(briefTimer);
  let li = 0, ci = 0, span = null, briefClip = null, briefHold = 0;
  briefTimer = setInterval(() => {
    if (li >= m.brief.length) {
      if (briefClip && !briefClip.paused) return;
      clearInterval(briefTimer); briefTimer = null; return;
    }
    const [who, text] = m.brief[li];
    if (!span) {
      if (briefClip && !briefClip.paused) return;   // let the previous line finish speaking
      // cold-load grace: on a fresh page the clip probe may still be in flight —
      // hold this line up to ~1.5s for it (settled misses skip straight through)
      const vk = voiceKey(who, text);
      if (!voice[vk] && !voiceFailed[vk] && ++briefHold < 90) return;
      briefHold = 0;
      const c = CAST[who];
      const p = document.createElement('p');
      const name = document.createElement('b');
      name.textContent = c.name; name.style.color = c.color;
      span = document.createElement('span');
      p.appendChild(name); p.appendChild(span); box.appendChild(p);
      briefClip = playVoice(who, text);
    }
    ci += 2;
    span.textContent = text.slice(0, ci);
    if (ci >= text.length) { li++; ci = 0; span = null; }
  }, 16);
  box.onclick = () => {
    clearInterval(briefTimer); briefTimer = null;
    stopVoice();
    box.innerHTML = m.brief.map(([who, text]) => briefLineHtml(who, text)).join('');
  };
  elBriefing.classList.remove('hidden');
}
function closeBriefing() {
  clearInterval(briefTimer); briefTimer = null;
  stopVoice();
  elBriefing.classList.add('hidden');
}
document.getElementById('btn-brief-back').addEventListener('click', () => { audioInit(); closeBriefing(); });
document.getElementById('btn-deploy').addEventListener('click', () => {
  audioInit();
  const idx = briefIdx;
  closeBriefing();
  startMission(idx);
});
// wipe the world so startGame can never stack two setups (also enables restarts)
function resetWorld() {
  units = []; buildings = []; crystals = []; bullets = []; fxs = []; eggs = []; alerts = []; rocks = [];
  nukes = []; nukeTargeting = null;
  blocked.fill(0);
  lastAlert = -1e9;
  stats = { built: 0, lost: 0, kills: 0, mined: 0 };
  selection = [];
  for (const k in groups) delete groups[k];
  teams[1] = { crystals: 180, eggs: 0, captives: 0, mined: 0, up: newUp() };
  teams[2] = { crystals: 180, eggs: 0, captives: 0, mined: 0, up: newUp() };
  teams[3] = { crystals: 0, eggs: 0, captives: 0, mined: 0, up: newUp() };
  tick = 0; gameOver = null; waveNum = 0; shakeAmp = 0;
  placing = null; attackMoveMode = false; setCursor();
  camFocus = null;
  explored.fill(0); visible.fill(0);
  elOverlay.classList.add('hidden');
  clearTimeout(overlayTimer); overlayTimer = null;
  lastCardSig = '';
  mission = null; ms = null;
  wasLowPower = false; lastAvail = null; dinoRage = 0; wildSeen = false;
  dlgQueue = []; dlgCur = null; dlgHold = 0; dlgClipEnd = 0;
  stopVoice();
  elDialogue.classList.add('hidden');
  elDialogue.classList.remove('talking');
  refreshObjectives();
}
function startGame(mapKey, diffKey, missionIdx) {
  // paywall backstop — the menu shouldn't get here, but console calls can
  if (missionIdx == null && mapPaywalled(mapKey)) { storeNudge(); return; }
  resetWorld();
  if (missionIdx != null) missionInit(missionIdx);
  diff = DIFFS[diffKey] || DIFFS.normal;
  waveAt = diff.firstWave * 60;
  setup(mapKey);
  started = true;
  userPaused = false;
  elPauseBanner.classList.add('hidden');
  btnPause.textContent = '⏸ pause';
  elMenu.classList.add('hidden');
  refreshTopbar();
  refreshCard();
  refreshQueue();
  setHelp(true);   // show the controls first — closing them starts the clock
  if (mission) {
    for (const [who, line] of (mission.intro || [])) say(who, line);
    refreshObjectives();
  } else {
    toast('Your harvesters are mining. Select the Barracks and press Q to train Marines!');
  }
}
function startMission(idx) {
  const m = MISSIONS[idx];
  if (!m) return;
  if (missionPaywalled(idx)) { storeNudge(); return; }   // paywall backstop (CC/console path)
  startGame(m.map, m.diff || 'normal', idx);
}
applyControlScheme();   // help text must match the remembered scheme on first paint
renderMenu();
document.getElementById('btn-start').addEventListener('click', () => {
  audioInit();
  localStorage.setItem('cc.map', chosenMap);
  localStorage.setItem('cc.diff', chosenDiff);
  startGame(chosenMap, chosenDiff);
});
// end-of-match button: skirmish restarts fresh; campaign returns to the mission list
document.getElementById('btn-again').addEventListener('click', () => {
  if (!mission) { location.reload(); return; }
  audioInit();
  chosenMode = 'campaign'; localStorage.setItem('cc.mode', 'campaign');
  quitToMenu();
});

// ---- dev mode: hover the "?  controls" chip and tap Space five times ----
// Toggles free tech + bottomless crystals + full campaign unlock, for skipping
// ahead in playtests. Works at the menu too; same gesture switches it back off.
let devHover = false, devTaps = 0, devTapAt = 0;
const devChip = document.getElementById('btn-help');
devChip.addEventListener('mouseenter', () => { devHover = true; devTaps = 0; });
devChip.addEventListener('mouseleave', () => { devHover = false; devTaps = 0; });
window.addEventListener('keydown', (e) => {
  if (e.code !== 'Space' || !devHover) return;
  e.preventDefault();
  const now = performance.now();
  if (now - devTapAt > 2500) devTaps = 0;   // taps must come in one burst
  devTapAt = now;
  if (++devTaps < 5) return;
  devTaps = 0;
  toggleDevMode();
});
function toggleDevMode() {
  // App Store release builds: cheats stay off — free tech + a fully open
  // campaign would be a paywall bypass. DEBUG wrapper builds re-enable them.
  if (!BFStore.devAllowed()) { toast('🛠 Dev mode is disabled in this build.'); return; }
  devMode = !devMode;
  devChip.style.borderColor = devMode ? 'rgba(240,200,106,0.8)' : '';
  devChip.style.color = devMode ? '#f0c86a' : '';
  lastAvail = null;   // rebaseline the build menu silently (no unlock-toast burst)
  if (devMode) {
    // back up real progress before unlocking — dev mode must never eat the save
    if (localStorage.getItem(CAMPAIGN_KEY + '.bak') === null) {
      localStorage.setItem(CAMPAIGN_KEY + '.bak', localStorage.getItem(CAMPAIGN_KEY) || '0');
    }
    localStorage.setItem(CAMPAIGN_KEY, String(MISSIONS.length));   // every mission open
    if (!started) renderMenu();
    if (teams[1]) teams[1].crystals = Math.max(teams[1].crystals, 99999);
    toast('🛠 DEV MODE — free tech, bottomless crystals, campaign unlocked');
  } else {
    const bak = localStorage.getItem(CAMPAIGN_KEY + '.bak');
    if (bak !== null) {
      localStorage.setItem(CAMPAIGN_KEY, bak);
      localStorage.removeItem(CAMPAIGN_KEY + '.bak');
      if (!started) renderMenu();
    }
    toast('🛠 Dev mode off — tech, wallet, and campaign progress back to normal');
  }
  snd.ready();
}

requestAnimationFrame(frame);

// debug handle (used for automated testing; harmless to leave in)
window.CC = {
  elevAt,
  get units() { return units; },
  get buildings() { return buildings; },
  get crystals() { return crystals; },
  get eggs() { return eggs; },
  get rocks() { return rocks; },
  get stats() { return stats; },
  get teams() { return teams; },
  get tick() { return tick; },
  get selection() { return selection; },
  set selection(s) { selection = s; },
  get waveAt() { return waveAt; },
  set waveAt(v) { waveAt = v; },
  get gameOver() { return gameOver; },
  get fog() { return { visible, explored }; },
  get fogMemory() { return fogMemory; },
  get devReveal() { return devReveal; },
  set devReveal(v) { devReveal = !!v; updateFog(); },
  // fx draw mode: 0 all / 1 half / 2 none. Diagnostic handle so a test can set
  // it outright instead of counting keypresses and inferring the state.
  get fxDraw() { return fxDraw; },
  set fxDraw(v) { fxDraw = ((v | 0) % 3 + 3) % 3; },
  get devMode() { return devMode; },
  set devMode(v) { if (BFStore.devAllowed()) devMode = !!v; },
  get fxs() { return fxs; },
  get spritesReady() { return spritesReady; },
  isVisibleAt, isExploredAt, isShownAt, updateFog, toggleFogMemory,
  damage, trainUnit, commandMove, fxExplosion,
  canPlaceBuilding, tryPlaceBuilding, makeBuilding, makeUnit, makeNest, makeDen, spawnRaptor, makeEgg, startResearch,
  cam, focusCam, get camFocus() { return camFocus; }, plankAt, blocked,
  perf, get dpr() { return dpr; }, resize,
  hatchSpitter, rankOf, startGame, MAPS, DIFFS,
  startMission, MISSIONS, CAST,
  exportVoiceScript, voiceKey, voice, PORTRAITS,
  get mission() { return mission; },
  get missionState() { return ms; },
  unlockAll() { if (!BFStore.devAllowed()) return; localStorage.setItem(CAMPAIGN_KEY, String(MISSIONS.length)); renderMenu(); },
  buyNuke, launchNuke, unloadAPC, NUKE,
  get nukes() { return nukes; },
  get started() { return started; },
  get diff() { return diff; },
  // run n game ticks synchronously — lets automated tests advance the sim even
  // when the tab is backgrounded and requestAnimationFrame is asleep
  step(n) { for (let i = 0; i < (n || 1) && !gameOver; i++) update(); },
};
