# Marine walk 7 repair preview

Status: user-approved and installed on 2026-09-12; not committed or pushed. The art-cache revision is `human-soldiers-20260911b`.

All 160 production soldier hashes match the approved cumulative selection. The full unchanged validator reports 32 errors and 21 warnings; the red Marine walk-7 opacity warning is resolved. JavaScript syntax and diff checks pass. The macOS Debug build succeeded, and all 162 scoped files in the built bundle match the workspace.

Only `unit_marine_walk7_red.png` is targeted. Aqua remains unchanged and is shown beside the candidate. Two built-in image-editor attempts confirmed the damaged rifle/hand/boot regions but introduced unacceptable pose-width drift, so neither redraw was selected. The installed asset is instead an alpha-only repair of the approved production PNG: its RGB pixels remain byte-for-byte unchanged, its outer silhouette and padding remain unchanged, and only interior alpha erosion and enclosed pinholes are promoted to opaque. The two generated attempts are retained under `raw/` as provenance; the outgoing production PNG is retained under `before/`.

Final built-in edit request used for the selected repair workflow: repair only unintended transparency in the existing north-pointing rifle, gripping hands/forearms, and forward boot edge; preserve the exact red armor, asymmetric walking pose, silhouette, proportions, scale, placement, brightness, and weathering; retain intentional gaps and genuine transparent background; no redesign, recoloring, added equipment, ground, shadow, text, logo, or watermark.
