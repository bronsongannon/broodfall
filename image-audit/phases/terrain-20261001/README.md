# First cached-terrain upgrade — 2026-10-01

Implemented for **Overgrown Basin** and **Evac Coast** only. The working-tree baseline includes the existing uncommitted M14 work; this pass does not replace or commit it.

## Changes and boundaries

- Map-specific seeded material palettes replace the visible tile grid and legacy random ground streaks/pebbles. Smooth large tonal regions, domain-warped medium soil/erosion patches, low-contrast fine grain, and sparse grouped scratches keep the ground subordinate to the weathered human-tech sprites.
- Evac Coast's existing road centerlines are retained. Painted shoulders vary in width, blend into the biome, and contain interrupted wandering ruts, compressed lips, worn crowns, and small washouts. Overgrown Basin has no authored roads; none were added.
- Everything is baked into `groundCv` at setup/repaint. The temporary half-resolution material canvas is not retained. The per-frame renderer is byte-identical to the pre-task working tree; no live terrain noise or extra frame passes were introduced.
- Authored terrain geometry, collision/elevation data, pathfinding, mission definitions/balance, water/elevation painters, and natural-prop painters/assets are unchanged. Other maps retain the legacy ground treatment. Existing ground flora is intentionally still the legacy random painter, so plant placement is not part of the deterministic material guarantee.
- The two existing 256×192 map-picker thumbnails were refreshed from `groundCv` alone (no units or UI). Original thumbnails are preserved below. No new sprite artwork was generated or installed.

## Comparable gameplay captures

Loopback-only preview, fixed 1280×800 CSS/backing viewport, DPR 1, one world pixel per CSS pixel. Both versions use the same setup seed and camera, reveal the map, and pause at the initial state. Preview-only instrumentation separates setup randomness from paint randomness so changing the material algorithm cannot move the comparison's buildings/units. Existing aqua/red human-tech assets are visible at their actual gameplay scale. Coast includes the same small static asset-reference group in both versions. No QA instrumentation is shipped in `game.js`.

| Map/view | Camera | Before | After |
| --- | --- | --- | --- |
| Overgrown Basin, southwest base | 0, 2656 | [Capture](before/overgrown.jpg) | [Capture](after/overgrown.jpg) |
| Evac Coast, haul road / human tech | 2850, 1325 | [Capture](before/coast.jpg) | [Capture](after/coast.jpg) |
| Evac Coast, shoreline / road | 3328, 600 | [Capture](before/coast-shore.jpg) | [Capture](after/coast-shore.jpg) |

The shoreline pair confirms the unchanged coast/water/ridge treatment alongside the new soil and road. Remaining natural-prop and water artwork is explicitly deferred, not signed off by this phase.

## Frame pacing

One preview tab at a time; 1-second warmup, 8-second paused render sample, then a separate 8-second active-simulation sample. These are local browser smoke measurements, not a native-wrapper or full-battle benchmark. The controlled browser presentation rate settled near 30 Hz for both versions; earlier exploratory views also reached 60 Hz. Use these matched final samples, not the transient rate, for comparison. The submission values are the game's smoothed rendering-submission estimate, not GPU timing.

| Map | Setup before → after | Paused draws/s before → after | Paused draw p95 before → after | Mean submission before → after |
| --- | --- | --- | --- | --- |
| Overgrown Basin | 14.7 → 252.2 ms | 30.10 → 30.11 | 33.8 → 34.3 ms | 0.388 → 0.386 ms |
| Evac Coast | 11.3 → 248.2 ms | 30.00 → 29.25 | 34.3 → 34.9 ms | 0.716 → 0.712 ms |

| Map | Active draws/s before → after | Active draw p95 before → after | Mean submission before → after | Mean simulation before → after |
| --- | --- | --- | --- | --- |
| Overgrown Basin | 30.38 → 30.24 | 34.3 → 34.3 ms | 0.412 → 0.433 ms | 0.379 → 0.396 ms |
| Evac Coast | 30.24 → 29.42 | 34.2 → 34.5 ms | 0.658 → 0.634 ms | 0.662 → 0.663 ms |

The richer material adds about **0.24 seconds of one-time setup work**. Final render submission costs remain closely matched; the small coast pacing difference is not evidence of an additional terrain frame pass. Shoreline render samples measured 30.05 → 30.10 draws/s and 0.427 → 0.442 ms mean submission. Raw reports are in [verification](verification/). Active samples contain 17 units on Overgrown Basin and 23 on Evac Coast; they do not exercise a large battle.

## Verification

- `node --check game.js`: pass.
- `git diff --check`: pass.
- Static comparison against the pre-task working tree: authored map geometry, mission/simulation source, natural-prop painters, cached water/elevation painters, and every per-frame drawing function unchanged. Only `overgrown` and `coast` opt into the new material. `index.html` and `CAMPAIGN.md` still byte-match their pre-task versions.
- Runtime geometry fingerprints (rocks + blocked/elevation grids) match before/after: Overgrown Basin `a2568364`; Evac Coast `7fd460cc`.
- Two independent soil/road bakes produce identical pixel fingerprints: Overgrown Basin `967972fb`; Evac Coast `2b7ac82e`. This checks the deterministic material, not unchanged legacy flora.
- No new warning/error appeared during the final map previews. The browser log retained two earlier `MutationObserver.observe` errors; neither the game nor the temporary QA page/probe contains `MutationObserver`, so their source remains outside this terrain implementation. They are not silently represented as a clean browser-log pass.
- Checklist and launch-roadmap status updated together for this ground/road milestone only. Verification was completed before committing; the user subsequently approved committing and pushing the terrain pass.
