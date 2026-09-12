# Installation QA — open issues

The 160 installed PNGs exactly match the user-approved previews. Their selected versions and runtime walk-order mappings are in `selection.json`; 147 outgoing files are recoverable in `before/assets/`. No new art was generated during installation. Original Phase 3 evidence is unchanged.

The unmodified validation thresholds report **36 errors and 22 warnings**. These are not 36 separate broken sprites: some checks overlap. No checks have been waived. See `validation.json` for all results.

## Priority correction request

- `unit_marine_hunker_teal.png`: eroded/translucent dark rifle, forearms, and knee regions; opaque fraction 0.699.
- `unit_marine_death3_red.png`: lost dark connecting mass around waist, inner thighs, and rifle; opaque fraction 0.702.
- `unit_marine_death4_red.png`: strongest visible erosion around waist, underside of legs, and gun; opaque fraction 0.626. At 30 px the body reads more fragmented than its aqua counterpart.
- Lesser concern: red Marine walk7 has source-scale stippled edges/rifle/hand regions, although no missing limb is apparent at game size.

Do not regenerate or replace these without the user's next approval. Preview aqua/red together for any corrections.

## Other reviewed findings, still open

- Marine and Engineer paired walk poses are not exact geometry-preserving recolors. Examples: Marine walk1 has a broader red waist/backpack and more level feet; Engineer walks2–4 have differing boot positions and torso width. Class identity is readable at runtime size, but pair checks correctly catch differences.
- Sniper has eight pair errors and eleven warnings. Production walk3 (original frame2) has real hood/cloak/boot outline differences. At 32 px the pairs remain recognizable and north-facing; this is not grounds to claim identical geometry or silently waive the validator.
- Medic production walk3 and Rocket walk3 are deliberately shorter passing poses, top-aligned during the approved preview normalization. Their bounding-box centers are respectively 7 and 8 source pixels above center. The generic center check flags these intentional choices; further anchor-based review is required, not an automatic re-centering that could shift head/weapon anchors.
- Medic death2 has a real faction pose/outline difference (raw IoU 0.868); both retain the white medical kit. Medic death4 remains a pair error. These were preserved exactly as approved.
- Commando death4 raw IoU is 0.959 but exterior IoU is 0.944. Both full sprites appear solid; minor body/equipment outline differences remain. No automatic correction or threshold change was applied.

## Verification completed

- Preflight: all 160 images are 256×256 RGBA with alpha 0–255, no canvas contact, and installed SHA-256 hashes matching selection.
- Audit coverage: 147/160 before (new red Commando absent), 160/160 after. Source and gameplay sheets generated separately from historical records.
- JavaScript syntax and diff checks pass. Validator exits 1 with the open issues above.
- Browser harness reports 160 loaded, no missing sprites; walk progression observed. Viewed walk on moss/ash, death on snow, and static/hunker mode on steppe. No captured warning/error console entries. This does not certify flawless animation.
- Live Crystal Basin match smoke test started, approved Marine sprites visible; console warning/error list empty. Match left paused. Comprehensive gameplay-overlay regression remains uncompleted pending art corrections.
- macOS Debug `xcodebuild` succeeded. Phase 3 bundle comparison passed all 162 scoped payload files (160 sprites plus `game.js` and `index.html`).
- No commit or push. Existing `.claude/session-start.json`, the roadmap widget (now `.claude/launch-roadmap.html`), and `CAMPAIGN.md` edits were preserved.

Exact prompt provenance remains incomplete for some early Marine/Engineer/static drafts. Surviving manifests and selection builders are archived under `provenance/`; missing original prompts were not invented.
