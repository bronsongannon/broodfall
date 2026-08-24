# Dialogue portraits + voice briefs

> **TOOL VERDICT (2026-08-13): ChatGPT generates all NEW portraits.** In the
> head-to-head it matched the house film-still style from the shared style
> block alone (DaVinci drifted documentary), then held character identity
> through a laugh and a full-body pose change — the two tests where synthetic
> identity normally dies. Workflow unchanged: generate one, approve, then
> attach the approved frame as the anchor for every further shot ("same
> person, same lighting…"; lock patch/wardrobe positions in the prompt — they
> drift before faces do). The EXISTING four (Vega, Lin, Krauss, Boone) are
> locked DaVinci faces — never regenerate them; new angles of them are the one
> case where results are unproven, so test with an anchor before committing.
> DaVinci keeps the documentary-photo register for marketing stills.
> First ChatGPT-consistent character banked for the commando DLC: the woman
> operator with the lighthouse patch (Boone's unit) — two portraits + a
> full-body, unnamed, in assets/portraits/source/ when Bronson files them.

The dialogue bar now shows a 56px character PiP (`#dlg-face`). Drop art into
these slots and it's picked up automatically next reload (same OPT pattern as
sprites); until then each character shows a colored-initials chip.

| File (assets/sprites/) | Character | Accent color |
| --- | --- | --- |
| `portrait_ops.png` | CPT. VEGA — expedition ops commander | teal `#8fd8cf` |
| `portrait_sci.png` | DR. LIN — xenobiologist | amber `#e8d38a` |
| `portrait_red.png` | CDR. KRAUSS — Rubicon Mining field commander | red `#f0a898` |

**Format:** square PNG, 256×256 is plenty (drawn at 56px). The box crops with
`background-size: cover`, so keep the face centered with headroom. Portraits are
**photorealistic** (Bronson's call, 2026-07-14), NOT the sprite style and not
painted — do not run them through process_sprite.py (keep the full-bleed photo
background, no transparency needed).

**Workflow (same trick that worked for unit art):** generate ONE portrait first,
approve it, then attach it as the style anchor when generating the other two so
the set matches. Recolor/adjust rather than regenerate once a face is approved —
these faces will appear hundreds of times across 20 missions.

## Shared style block (paste into every prompt)

> Photorealistic cinematic character portrait, head-and-shoulders, centered,
> facing slightly off-camera. Shot like a film still: 85mm lens look, shallow
> depth of field, strong single key light, dark muted background with a subtle
> hint of the character's accent color. Retro-futuristic expedition military
> wardrobe, grounded and practical — worn fabric, real materials (Command &
> Conquer live-action briefing energy). Natural skin texture, no smoothing,
> no illustration or painterly style. No text, no watermark, no frame.

## Character prompts (casting suggestions — edit before generating)

**CPT. VEGA (`portrait_ops.png`)** — Expedition ops commander, 40s, weathered
and steady. Practical teal-and-charcoal expedition uniform, short hair, thin
comms headset, faint scar through one eyebrow. Expression: calm command, half a
smile at the corner. Accent color teal (#8fd8cf) in collar piping and rim light.

**DR. LIN (`portrait_sci.png`)** — Xenobiologist, 30s, bright-eyed and a little
too delighted about dangerous wildlife. Khaki field-science jacket over
expedition fatigues, sample vials clipped to the strap, smart glasses pushed up.
Expression: fascinated, mid-thought. Accent color amber (#e8d38a) in the lens
glint and jacket trim.

**CDR. KRAUSS (`portrait_red.png`)** — Rubicon Mining field commander, 50s,
corporate menace in a military shell. Rust-red and gunmetal uniform with the
Rubicon pennant pin, gray stubble, close-cropped hair. Expression: unhurried,
amused, doing billing math with your life. Accent color red (#f0a898) rim light.

## Voice briefs (for the AI-TTS test — one voice per character)

Generate each character reading their test lines below. We want distinct,
real-sounding voices (same bar as the sfx: no robo-voice). If the test passes,
every dialogue line ships as a pre-recorded file keyed to the line.

**VEGA** — mid-range, clipped military cadence, dry warmth. Never excited,
never slow. Test lines:
- "Contacts! They followed the patrol home — marines, weapons free!"
- "Beta's silos are filling — sixty seconds to load the haulers. Dig in, Commander."

**LIN** — quick, warm, fascinated; the danger never dampens the curiosity.
Slight academic precision. Test lines:
- "Nesting colonies, live broods… magnificent. Ah — Commander, they've spotted your patrol."
- "They are not obstructions, they are colonies."

**KRAUSS** — smooth, unhurried, corporate-polite menace. A man reading your
obituary off an invoice. Test lines:
- "Attention, expedition convoy: your cargo is subject to a toll. My associates will collect."
- "A courtesy visit, nothing more. The next one is a billing dispute."

**BOONE** (added 2026-08-04 — MSgt. Dominic Boone, callsign "Lighthouse",
portrait slot `assets/portraits/cdo.png`) — commando lead for M5/M9, seeds the
commando DLC. THE RULE: he barely speaks, one short sentence at most, flat calm.
Low register, unhurried, worn — a man who has already seen the worst thing on
this planet and declines to describe it. Never shouts, even in contact. Test lines:
- "Rockets up. Watch the lanes."
- "Eggs in the street means the street is theirs. Keep walking."
- "It let us leave."

Portrait prompt (match the DaVinci film-still set — photoreal, same lighting
family as ops/sci/red, bust-crop before install, full-res raw to source/):
"Photorealistic film still, weathered male special forces master sergeant in
his mid-40s, expedition teal-accented combat armor with subdued gold sergeant
chevrons on the chest plate, short gray-flecked hair, calm unreadable
expression, faint scar through one eyebrow, dark swamp fog background with a
faint warm light behind him like a distant lighthouse lamp, cinematic
low-key lighting, head-and-shoulders framing."
