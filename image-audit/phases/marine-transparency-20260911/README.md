# Marine transparency repair candidates

Status: user-approved and installed on 2026-09-11. Exactly the three selected candidates replaced their production counterparts; the art-cache revision is now `human-soldiers-20260911a`. Gameplay code is unchanged apart from the cache revision. The user explicitly authorized commit and push.

All 160 production hashes were verified against the original approved mapping plus the three overrides in `selection.json`. The macOS Debug build passed, and the built bundle matched all 162 scoped payload files. JavaScript syntax and diff checks passed. The full unchanged validator reports 32 errors and 22 warnings, down from 36/22. All three targeted opacity errors and the hunker pair error are resolved; death 3/4 faction-outline findings and the remaining historical art findings are still open. No new browser or live-game regression run was performed for this PNG-only repair.

The built-in image editor repaired aqua hunker and red death frames 3 and 4. Exact requests and original generation paths are in `prompts.json`; durable raw copies are in `raw/`. Outgoing production PNGs are in `before/`. The contact sheet and `qa.json` are the frozen pre-approval comparison, so their preview-only labels intentionally remain. The paired opposite-color sprites are unchanged.

Run `python3 image-audit/phases/marine-transparency-20260911/build_preview.py` from the repository root to reproduce the candidates, comparison sheet, and `qa.json`. This uses the existing normalization helper, with background tolerance 105 for hunker and 85 for death frames. It also clears checkerboard inside explicitly inspected empty gaps; exact seeds and pixel counts are recorded in the script and QA. Body texture was repaired by image generation, not recolored or repainted by the preparation script.

Selected files are `preview/unit_marine_hunker_teal-candidate.png`, `preview/unit_marine_death3_red-candidate.png`, and `preview/unit_marine_death4_red-candidate.png`. Earlier v1/v2 files are intermediate extraction attempts, not selected candidates.

All candidates are 256×256 RGBA with transparent borders. Opaque fractions of visible pixels improved from 0.699 to 0.950, 0.702 to 0.920, and 0.626 to 0.922. These measure visible-pixel opacity, not missing body area. The enlarged checkerboard and 30-pixel moss composites were visually inspected: dark physical body/weapon regions read solid and intended gaps remain transparent.

The image edits are not pixel-identical alpha-only transformations: minor rendering/outline changes remain. Before/after filled-exterior IoU is 0.987, 0.965, and 0.940 respectively, with the largest difference in death frame 4. These differences were disclosed in the approved preview. They do not certify exact geometry or waive any family validation threshold; full-family results are preserved in `validation.json`.
