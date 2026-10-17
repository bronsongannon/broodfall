# Three-style boulder pass — 2026-10-13

Bronson liked the weathered boulder prototype and asked to use all three reviewed options by map. The three approved image concepts are installed as new, neutral rock slots; the previous `assets/sprites/rock.png` remains a fallback.

| Style | Maps with authored boulders | Production sprite | Full-resolution source |
| --- | --- | --- | --- |
| Weathered cluster | Crystal Basin, Fossil Valley, Twin Forks, Overgrown Basin | `assets/sprites/rock_weathered.png` | `assets/sprites/source/rock_weathered_source.png` |
| Layered outcrop | Strip Mine, Krauss's Bastion | `assets/sprites/rock_layered.png` | `assets/sprites/source/rock_layered_source.png` |
| Fractured granite | The Silo Fields, Evac Coast | `assets/sprites/rock_granite.png` | `assets/sprites/source/rock_granite_source.png` |

The production PNGs are 512 px on their long edge, downscaled from the approved full-resolution transparent outputs with alpha preserved. [The prompt set](prompts.md) records the built-in ImageGen source requests. These are neutral natural props, so aqua/red team counterparts do not apply.

## Visual review

- [All eight boulder maps at 1:1 gameplay scale](gameplay-size-maps.jpg). Each panel is a 360×260 crop of the actual cached ground around an authored boulder, with no thumbnail scaling.
- [Crystal Basin before](before-basin.jpg) and [after](after-basin.jpg): fixed 1280×800 gameplay viewport, camera x=180/y=1200, world pixels shown 1:1. Unseeded flora can vary between cold starts; the rock and shadow are the comparison targets.

All three new optional sprites loaded in a fresh local Chrome run, all 14 map setups completed, and the eight assigned boulder views rendered. Visible sprite bounds, measured above a low-alpha threshold, fit inside the existing circular collider at their runtime draw scales. The hard black ellipse was replaced by soft contact shade, and fixed north-west lighting is no longer randomized by full sprite rotation.

Only the static boulder paint in `groundCv`, three optional art loads, and per-map visual style selection changed. Boulder coordinates/radii, collision, paths, mission logic, ridges, cliffs, water, and per-frame drawing are unchanged. The long polygon ridge visible in Trade Road remains a separate visual problem. Headless map setup is a one-time load observation, not a Mac-wrapper frame-pacing benchmark.

`node --check game.js` and `git diff --check` passed.
