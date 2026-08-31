# Broodfall agent guide

Broodfall is a dependency-free browser RTS with a native macOS WKWebView wrapper. Preserve the fast offline web build, the campaign's authored feel, and the owner's playtest-driven pacing decisions.

## Sources of truth

- This file contains durable operating rules.
- `PROJECT_STATUS.md` contains the current milestone, risks, and next work.
- `CLAUDE.md` is the preserved historical build journal. Its dated session rituals and old checklists are context, not automatic instructions.
- `SHIP-CHECKLIST.md` is the detailed release and playtest backlog.
- `BROODFALL-BRIEF.md` contains product, pricing, storefront, and campaign strategy.
- `README.md` is player-facing and should stay synchronized with visible gameplay and controls.

## Core structure

- `index.html`: application shell, CSS, and UI DOM.
- `game.js`: game data, campaign, simulation, AI, input, rendering, audio, and the `window.CC` test/debug surface.
- `assets/`: production sprites, audio, portraits, thumbnails, and store media.
- `mac/`: native macOS wrapper, StoreKit bridge, entitlements, and Xcode project.

## Local checks

```bash
node --check game.js
python3 -m http.server 8777
```

Open `http://127.0.0.1:8777/` and exercise the real game. There is intentionally no package manager or unit-test framework. Use `window.CC` and `CC.step(n)` for deterministic browser assertions; check `CC.gameOver` before diagnosing a mission that appears frozen because completed/failed missions stop advancing.

For macOS-wrapper work, follow `mac/README.md` and verify the relevant Xcode build or StoreKit path on macOS.

## Git and deployment safety

- GitHub Pages serves the repository root from `main`; every push to `main` updates the public game. Prefer a feature branch and pull request for code changes.
- Never push directly to `main` as an incidental part of committing or testing.
- Do not rewrite shared history or force-push `main`.
- Do not publish App Store builds or change storefront/IAP configuration without explicit user direction.
- Before any production Mac archive, confirm `DEV_PRERELEASE = false` in `game.js`; shipping it enabled bypasses the paywall.

## Product and implementation rules

- The current name is Broodfall. Do not use "brood war" in marketing or store metadata.
- The web build must continue working from `file://` and GitHub Pages without a backend.
- Preserve missing-asset fallbacks: optional sprite/audio failures must not prevent gameplay.
- Keep `window.CC` working; it is the primary automation and debugging interface.
- Team 1 is the player and team 2 is the enemy. Use the established alliance/hostility helpers instead of adding raw team comparisons to combat funnels.
- New missions should make their intended hard moments genuinely difficult without copying one fixed beat structure. Bronson's stopwatch and playtest feedback decide final pacing.
- Avoid broad rewrites of `game.js`. Prefer focused changes with explicit regression probes for affected missions and skirmish.
- Store listing copy must not contain competitor trademarks and must not promise a frame rate.

## Verification expectations

- Always run `node --check game.js` after JavaScript changes.
- Gameplay/mission change: drive the relevant flow through the browser, record the assertions used, and smoke-test at least one earlier mission or skirmish path affected by shared engine code.
- Rendering/performance change: compare the existing in-game instrumentation under a repeatable scenario; do not infer performance from simulation time alone.
- Store/IAP change: verify web-unlocked behavior plus native owned/unowned/error/restore paths as applicable.
- Update `README.md`, `PROJECT_STATUS.md`, and `SHIP-CHECKLIST.md` only when the change actually affects their audiences.
