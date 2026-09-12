# Broodfall status

Updated: 2026-08-31

## Current baseline

- Development branch: `main`
- Live web build: `https://bronsongannon.github.io/broodfall/`
- Campaign: missions 1-12 built; mission 12 is "Exodus"
- Core web build: dependency-free `index.html` + `game.js`
- Native wrapper: macOS WKWebView/StoreKit project exists under `mac/`
- Syntax baseline: `node --check game.js` passes

## Current focus

1. Playtest and tune Mission 12's named convoy, road set-pieces, and 120-second boarding hold.
2. Design and build Mission 13 while preserving the standing rule that each mission's own hardest moment must have real teeth.
3. Continue selected pacing checks on Missions 9 and 10 without padding sections already declared settled.

## Release posture

- Finish all 20 campaign missions before selling the complete game.
- Act 1 is the free demo; Acts 2-3 are the paid one-time unlock.
- Mac App Store submission is a rehearsal after the campaign is complete, not the current milestone.
- The Steam target remains 2027-02-10, with an October 2026 Next Fest demo target documented in `BROODFALL-BRIEF.md`.

## Critical guardrails and open work

- `DEV_PRERELEASE` must be `false` before any production archive; when true it keeps developer tools/paywall bypass available in release builds.
- Sandbox entitlements, signing, notarization, and clean-Mac testing remain unfinished.
- Store listing copy and keywords remain unfinished; use no competitor trademarks.
- Voice production is intentionally deferred until campaign dialogue is final.
- Mission 9 still needs a density playtest; its length is already accepted.
- Mission 10 still needs a stopwatch/army-cost playtest against the current two-phase fortress.

## Deployment guardrail

GitHub Pages deploys every push to `main`. Feature work should be reviewed on branches before merging so a routine commit never changes the public game unexpectedly.
