# Act 2–3 dino roster — generation brief

The three dinos the remaining campaign is made of. Order matters: **Screecher
first** — it is the only one that unlocks the next buildable mission (M9 "The
Silence"). Ironback gates M10, Broodmother gates M13 and M20.

None of these block engine work. Raptor shipped procedurally drawn for a day
before its art landed; same here. Drop files in whenever they're ready.

Engine type keys (filenames must match exactly): `screecher`, `ironback`,
`broodmother`.

---

## Rules that differ from the rest of PROMPTS.md — read these

1. **Dinos are NOT tinted.** They use colorway slots (`_wild`), and colorway art
   bypasses the team-tint path entirely (`optCW`). So generate them in their
   FINAL colors — bone and moss — not the desaturated sand the tinted units use.
   Do **not** append the "desaturated sand, khaki and warm gray" color rule.
2. **Wild dinos read as NATURE, not a third army.** Wildlife photography, not
   faction paint. Luminance separation is load-bearing for colorblind players:
   bone sits at .72 against teal .59 and red .49. Keep them pale.
3. **Every sheet includes IDLE + DEATH from day one.** Standing rule since the
   spitter. Retro-fitting a death sheet months later costs more than asking for
   it up front.
4. Everything faces **UP** (head toward the top of the frame).

### The style block (paste at the START of every prompt)

> top-down orthographic 2D video game sprite, viewed directly from above,
> single object centered on a plain solid light-gray background, cartoonish
> chunky proportions with flat cel shading and clean dark outlines, like
> Kenney game assets, crisp silhouette readable at small size, no text, no
> watermark, no shadow on the ground

### The wild palette (append to every dino prompt)

> pale bone hide, moss-green back stripes, amber eyes, natural earthy colors,
> no bright saturated colors, no armor paint, no faction markings

---

## 1. Screecher — `unit_screecher_wild.png`

Pterosaur harasser. Flies, dives on harvesters, makes flak matter against dinos
for the first time. It **does** take a flap cycle: `walkT` accrues in
`moveToward` for every unit including flyers, and `drawUnitSprite` uses walk
frames for anything that has them, so a flap animates distance-driven exactly
like the marine's gait. (It only animates while moving — a stationary Screecher
holds one frame, which reads fine as a glide.)

**Static sprite:**

> [style block] a flying pterosaur seen from directly above with both wings
> spread wide and flat, long narrow toothed beak pointing up, slender neck, a
> short crest sweeping back from the skull, thin membrane wings stretched
> between elongated finger bones, small clawed feet tucked under the body, tail
> trailing straight down behind, wingspan filling the frame horizontally,
> [wild palette]

Signature detail (per STYLE-GUIDE): **bone wings with venom-green membrane
webbing** — the leathery wing membrane picks up the same `#a8d060` venom green
as the spitter's throat sac, so the two read as the same biology. Ask for it
explicitly: *"the thin wing membrane is translucent pale venom-green, the wing
bones and body are bone white"*.

**Death sheet — paste exactly:**

> a horizontal strip of exactly four separate top-down 2D video game sprite
> frames showing a flying pterosaur falling out of the sky and dying, read left
> to right, with a clear empty gap between each frame. Frame 1: wings still
> spread but buckling upward at the wrists, head snapping back. Frame 2: the
> body rolled part way onto its side, one wing folding across the body, tail
> whipping. Frame 3: crumpling inward, both wings collapsing over the back.
> Frame 4: lying flat and still, wings folded loosely across the body, neck
> limp and head turned to one side. Every frame is drawn from directly
> overhead, at the same scale, at the same distance from the camera, on a plain
> solid light-gray background. Cartoonish chunky proportions, flat cel shading,
> clean dark outlines, like Kenney game assets. Pale bone hide, translucent
> venom-green rim on the wing membranes, natural earthy colors. No grid lines,
> no frame borders, no boxes around the frames, no numbers, no labels, no text,
> no watermark, no drop shadows, no ground, no other views of the creature.

**Flap cycle video — paste exactly:**

> A locked, completely static overhead camera looking straight down at a single
> pterosaur hovering in place against a plain flat light-gray background. It
> stays centered in frame and does not travel, rotate, or drift. It beats its
> wings in a steady continuous flapping cycle, wings sweeping down and back up
> through the full range, head held steady and pointing toward the top of the
> frame the whole time. No camera movement, no zoom, no cuts, no drop shadow,
> no ground, no other objects, no text. 3 seconds.

NOTE: `slice_walk.py` autodetects the stride period from the LEG band, which a
flapping flyer does not have. Expect to pass the period manually or pull the
frames by hand for this one — flag it and I'll adjust the slicer.

---

## 2. Ironback — `unit_ironback_wild.png`

Ankylosaur siege bruiser. Slow, enormous HP, bonus damage vs buildings — the
dino answer to a turret line, countered by artillery and rocket troopers so the
existing RPS keeps working. Reads as a walking wall.

**Static sprite:**

> [style block] a heavily armored ankylosaur dinosaur seen from directly above,
> broad low oval body completely covered in overlapping slate-gray plate armor
> with raised bony ridges, small blunt head pointing up, four thick stumpy legs
> splayed out, a heavy tail ending in a large bony club, wide and squat
> proportions, body filling most of the frame, [wild palette]

Signature detail: **moss growing ON the plates.** This one is old. Ask for
*"patches of dark green moss and lichen growing in the seams between the armor
plates"* — it separates him from the pale, quick dinos and sells the idea that
he was down there a long time.

Scale note: draw him noticeably wider than tall. He should be the biggest
silhouette on the field short of the Broodmother.

**Walk video — paste exactly:**

> A locked, completely static overhead camera looking straight down at a single
> heavily armored ankylosaur dinosaur walking in place against a plain flat
> light-gray background. It stays centered in frame and does not travel,
> rotate, or drift. Its head points toward the top of the frame the whole time.
> A slow, heavy, lumbering four-legged plod with the body rocking side to side
> as the weight shifts, and the heavy clubbed tail swinging opposite to the
> shoulders. No camera movement, no zoom, no cuts, no drop shadow, no ground,
> no dust, no other objects, no text. 4 seconds.

**Death sheet — paste exactly:**

> a horizontal strip of exactly four separate top-down 2D video game sprite
> frames showing a heavily armored ankylosaur dinosaur collapsing and dying,
> read left to right, with a clear empty gap between each frame. Frame 1:
> standing but staggering, front legs buckling, head dropping. Frame 2: the
> front half down on the ground, hind legs still braced, tail lifted. Frame 3:
> the whole body settling heavily onto its belly, legs splaying out sideways
> from under the armor. Frame 4: lying completely flat and still, legs limp and
> splayed, clubbed tail slack, head flat on the ground. Every frame is drawn
> from directly overhead, at the same scale, at the same distance from the
> camera, on a plain solid light-gray background. Cartoonish chunky
> proportions, flat cel shading, clean dark outlines, like Kenney game assets.
> Slate-gray plate armor over pale bone hide with dark green moss in the seams,
> natural earthy colors. No grid lines, no frame borders, no boxes around the
> frames, no numbers, no labels, no text, no watermark, no drop shadows, no
> ground, no other views of the creature.

---

## 3. Broodmother — `unit_broodmother_wild.png` — SCRAPPED 2026-07-28, REDESIGN

First attempt is in `source/_scrapped/`. It came back a tick both times, and
that was the brief's fault, not the generator's.

**Post-mortem.** The old prompt asked for a "colossal insectoid-reptilian brood
queen" with a "bloated segmented abdomen", a "narrow armored thorax" and "six
clawed limbs". Abdomen, thorax and six limbs are the anatomy of an insect —
and drawn from directly overhead, an insect body plan can only read as a bug.
The prompt also said "she should look like what the other dinos become, not
like a bigger raptor", which pushed the generator away from the one silhouette
family the whole game is built on.

The deeper error: this imported a Zerg-style brood queen into a game whose
entire pitch is **Turok / Jurassic Park**. Broodfall's monsters are dinosaurs.
The finale boss has to be a dinosaur too, or she reads as a different IP.

**New direction — she is a DINOSAUR, and she is recognisably kin to the raptor
and the spitter.** Four limbs, not six. A heavy reptile skull with a real jaw,
not mandibles. The lineage cues stay: amber eyes, the same clean outline
weight, the same chunky proportions. What makes her the boss is *mass* and
*wrongness* — a brooding body swollen with eggs, dragging low, too heavy to
stand properly — not a change of species.

She keeps the Broodfallen palette (rust `#8f4a3e` + purple biolum) because
that is the corruption Act 2 and 3 are about, but it should sit ON dinosaur
anatomy, like something that grew over her.

**Static sprite — paste exactly:**

> top-down orthographic 2D video game sprite, viewed directly from above,
> single creature centered on a plain solid light-gray background, cartoonish
> chunky proportions with flat cel shading and clean dark outlines, like Kenney
> game assets, crisp silhouette readable at small size, no text, no watermark,
> no shadow on the ground. An enormous brooding mother dinosaur seen from
> directly above, built like a huge low-slung theropod: one broad heavy
> reptilian skull with a wide toothed jaw pointing toward the top of the frame,
> a thick muscular neck, four powerful clawed limbs splayed out to the sides
> carrying her weight, and a vastly swollen egg-heavy belly and hindquarters
> dragging low behind her, far wider than her shoulders. A ridge of bony spines
> runs down her spine to a short thick tail. Symmetric down the centre line.
> Dark rust-red hide with a heavy plated carapace grown over her back and
> flanks, deep purple bioluminescent veins glowing in the seams between the
> plates and along the swollen belly, amber eyes, oily desaturated colors, no
> bright colors except the purple glow.

Keep the glow to thin veins and belly seams. If the whole body glows she reads
as a UI element instead of an animal.

**Walk video and death sheet: do NOT generate until the static is approved.**
Both were wasted last time by anchoring to a design that got scrapped. Approve
the static first, then use it as the anchor for the other two.

When you do get there, the death frames follow the top-down rule the Ironback
sheet broke: from directly overhead, "collapsing" is invisible and asking for
it forces the generator into a side view. Describe the **silhouette going
slack** instead — limbs sprawling outward from the body, head lolling off the
centre line, the glow in the veins dimming to dark by the last frame.

---

## Processing (unchanged)

Static sprites:

```bash
python3 assets/sprites/process_sprite.py "raw.png" unit_screecher_wild.png
```

Border flood-fill background removal, drops floating islands (Gemini's ✦
watermark), crops to bounds, pads square, 256px.

Death sheets go through `slice_death.py` (or `slice_cluster.py` when the frames
nearly touch). Both slice the DEATH band only, normalize each frame by opaque
area against the static sprite, and kill the watermark. Walk videos go through
`slice_walk.py`.

**GOTCHA, every single time:** Gemini ignores facing. Check every sprite before
you install it — the harvester came out facing left, the raider and rig came out
facing down. `process_sprite.py` does not auto-orient.
