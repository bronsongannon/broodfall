# Broodfall project guidance

## Shared startup context

- Before substantive work, read `.claude/settings.json` and `.claude/session-start.json` for the shared Claude/Codex project context. Claude hooks and tool names are integration details; do not attempt unavailable Claude-only calls from Codex.
- Read `SHIP-CHECKLIST.md` for current priorities and delivery status. It is the source of truth if another roadmap or status summary disagrees.
- For roadmap, planning, or status work, also read `.claude/launch-roadmap.html`. Show it with available visualization tools only when it materially helps the request; never block ordinary work when a widget or visualization tool is unavailable.
- Keep `SHIP-CHECKLIST.md` and `.claude/launch-roadmap.html` synchronized whenever milestones, priorities, or completion status change.

## Repository working agreements

- Preserve unrelated local changes and never fold them into a commit without explicit user approval.
- Ask for approval before installing newly generated artwork. Preview both aqua and red counterparts together at their actual gameplay size.
- Do not commit or push unless the user explicitly requests it.
- `CAMPAIGN.md` owns mission design, `IMAGE-AUDIT.md` owns current visual-audit status, and `SHIP-CHECKLIST.md` owns the delivery roadmap.
