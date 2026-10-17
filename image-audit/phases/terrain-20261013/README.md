# Cached-terrain roster pass — 2026-10-13

The first ground pass covered Overgrown Basin and Evac Coast. This pass applies the same cached, seeded soil and road material system to the other twelve authored maps:

| Palette family | Maps |
| --- | --- |
| Weathered green earth | Crystal Basin, Fossil Valley, High Water Mark, Twin Forks |
| Rust and warm sediment | The Gauntlet, Trade Road, Strip Mine, Krauss's Bastion |
| Cold ash and wind-scoured snow | The Boneyard, The Silo Fields |
| Dark wet soil | Blackwater Fen, Exodus Road |

Each new map has its own fixed material seed and shade/cover/soil/mineral/road colors. The large tonal fields, medium erosion patches, and restrained detail come from the October 1 painter. Trade Road, Strip Mine, Exodus Road, and Krauss's Bastion also adopt its blended shoulders, broken wheel ruts, and worn road surface. Their existing road centerlines are unchanged. Overgrown Basin and Evac Coast retain their approved palettes and seeds.

## Visual review

- [Full 14-map contact sheet](contact.jpg), captured from the actual `groundCv` material at 256×192 per map after optional art loaded.
- [Previous map-picker thumbnails](before/) and [refreshed thumbnails](after/) for the twelve newly updated maps. The refreshed files are installed in `assets/thumbs/`.
- Fixed 1280×800, 1:1 gameplay views for [Crystal Basin](gameplay/basin.jpg), [Trade Road](gameplay/trade.jpg), [Blackwater Fen](gameplay/fen.jpg), [The Silo Fields](gameplay/silo.jpg), [Strip Mine](gameplay/mine.jpg), [Exodus Road](gameplay/exodus.jpg), and [Krauss's Bastion](gameplay/bastion.jpg). These show roads, snow, swamp water, quarry terrain, and human-tech assets at gameplay scale.

The screenshots come from a temporary, local headless Chrome preview of the real game code. All fourteen map setups and seven sampled gameplay scenes loaded. Setup with the new cache measured 182–209 ms across the roster in that headless run. This is a one-time setup observation, not a before/after performance benchmark; headless frame pacing is not representative of the Mac wrapper.

## Scope and checks

Only map `ground.terrain` data and a now-current ground-painter comment changed in `game.js`. All non-ground map definitions, simulation and mission code, water/prop/elevation painters, and the per-frame renderer match the previous commit. `paintGround()` runs at setup or an optional-art repaint, then draws from `groundCv` during play. The legacy soil fallback remains for the pre-menu backdrop and unspecified future maps.

The refreshed picker thumbnails are captures of the code-rendered ground, not new unit or building artwork. Natural-prop placement is still handled by the legacy random flora painter; the deterministic guarantee applies to the soil and road materials. This pass does not revise water or natural-prop assets.

`node --check game.js` and `git diff --check` passed. No commit or push was requested for this pass.
