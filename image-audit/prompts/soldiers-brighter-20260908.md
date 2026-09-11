# Brighter soldier revision — 2026-09-08

This guide describes the provenance boundary for the user-approved brighter soldier revision. It is a summary, **not a verbatim generation prompt**. The original Phase 3 family ledgers remain historical records of different artwork.

## Authoritative selection and evidence

- [Selection mapping](../phases/soldiers-brighter-20260908/selection.json) identifies the selected revision outputs and their production destinations. Approved playback order can differ from original generation frame numbering; use this mapping rather than guessing from temporary filenames.
- [Before evidence](../phases/soldiers-brighter-20260908/before/) preserves the outgoing production state.
- [After evidence](../phases/soldiers-brighter-20260908/after/) records the revised production state and its checks.
- [Provenance artifacts](../phases/soldiers-brighter-20260908/provenance/) preserve surviving generation manifests, exact prompt records where recovered, normalization notes, and selection/preview artifacts. These may contain rejected iterations; their presence does not make them production selections.

The scope is 160 sprites: Marine 28, Engineer 26, Sniper 28, Medic 26, Rocket Trooper 26, and Commando 26. Each includes both teal/aqua and red static, eight-frame walk, and four-frame death sets; Marine and Sniper also include paired hunker poses. Red Commando adds 13 slots beyond the historical 147-file Phase 3 roster. The art-cache revision is `human-soldiers-20260908a`.

## Approved direction

The user requested brighter soldiers and stronger aqua/red armor coverage so factions and classes remain distinguishable at gameplay size. Approved distinctions include a narrower Engineer, the Medic's enlarged backpack and white uniform accents, and Boone's gold markings. Bodies and weapons face north together during standing/walking; Rocket launcher orientation follows the approved body direction during falling poses. Both colors should be previewed together for subsequent soldier work. Approval precedes installation or commit, and complete families remain the installation unit.

## Provenance limitations

Some early revision prompt manifests, especially Marine and Engineer records, were not recovered. Do not infer their exact wording from final pixels, later prompts, conversation summaries, or the older Phase 3 ledgers. The surviving records are preserved as found; missing exact prompts remain explicitly missing. The selection mapping establishes which approved files are installed but does not fill absent generation provenance. Temporary/raw paths appearing inside archived manifests describe their original generation environment and are not promises that those paths remain available on another machine.

All 160 approved selections are installed and byte-match their chosen outputs, with no canvas-edge contact. Validation remains open: the [current report](../phases/soldiers-brighter-20260908/validation.json) contains 36 errors and 22 warnings. [Triage](../phases/soldiers-brighter-20260908/triage.md) prioritizes Marine teal-hunker and red-death-3/4 alpha defects, identifies lesser red-walk-7 erosion, and leaves Engineer/Sniper source-pose drift open. Medic/Rocket pivot flags correspond to deliberate top-anchored passing-frame normalizations of 7/8 source pixels; those findings are not waived. This is not a clean validator pass or a completed revision.

The [verification record](../phases/soldiers-brighter-20260908/verification.json) separately records a successful macOS Debug build, byte-matched verification of all 162 Phase 3 bundle payload files (160 sprites plus `game.js` and `index.html`), and passing JavaScript syntax/diff checks. The browser harness loaded 160 sprites with zero missing assets and empty warning/error logs; screenshots cover moss/ash walks, snow deaths, and steppe static/hunker poses. A live Crystal Basin smoke check started a match and displayed the new Marine. This is not comprehensive gameplay-overlay regression coverage and does not supersede the open art findings.
