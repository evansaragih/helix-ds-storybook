---
name: figma-variable-naming
description: "Naming convention and safe procedures for creating, renaming, merging, or deleting color variables in the Nusantics Design System Figma file (Semantics-Core / Semantics collections), agreed with the designer Sep 2026. Load this before any use_figma work that adds a new semantic variable, proposes a rename, or touches the Semantics/Semantics-Core collections. Complements the token-architecture section of helix-design-system (which covers the code-side --color-* mirror) — this skill is the Figma-side source-of-truth naming authority."
---

# Figma Variable Naming & Maintenance

Rules for the **Semantics-Core** (single-mode, brand-agnostic) and
**Semantics** (multi-mode: Nusantics/CeKolam/Causa) variable collections in
the Nusantics Design System Figma file. **Primitives** (raw ramps) are out
of scope here — they keep their existing raw naming (`{Ramp}/{Step}`), no
role/state semantics.

Always load `figma-use` before calling `use_figma` to act on any of this.

## Naming formula

```
Colors/{Category}/{Role}-{Emphasis}-{State}
```

- **One `/` only**, between `Colors` and `{Category}`. Everything after
  that — Role, Emphasis, State, or any compound modifier — is joined with
  `-` (hyphen), never nested with further `/`. This was a deliberate
  correction (Sep 2026): an earlier draft of this convention nested
  `Category/Role/Modifier` with slashes (e.g. `Icon/Onsurface/Neutral`,
  `Stroke/Focus-Ring/Neutral`) and was walked back in favor of flattening
  everything past Category into one hyphen-joined segment
  (`Icon/On-Surface-Neutral`, `Stroke/Focus-Ring-Neutral`) for consistency
  with how most of the system already worked (`Surface/Success-Bold-Hover`).
- **Category** — fixed set: `Text`, `Icon`, `Stroke`, `Surface`, `Link`,
  `Overlay`, `Linear`, `Data-viz`, `Shadow`, `Accent`. Determined by the
  CSS/visual property being set, same rule as the code-side convention in
  `helix-design-system` — never by which component happens to use it.
  `Accent` is the exception to that rule: it's a categorical-identity
  Category (see "Accent tokens" below), not tied to one CSS property —
  today's confirmed Accent variables are all fill/background usage
  (`FRAME_FILL`/`SHAPE_FILL` scope), so in practice `Colors/Accent/{Name}-
  {Emphasis}` reads as the Surface-equivalent for a categorical identity,
  the same way `Data-viz/Chart-N` does.
- **Role** — semantic meaning: `Success`, `Warning`, `Error`/`Destructive`,
  `Info`, `Neutral`, `Primary`, `Secondary`, `Tertiary`, `Brand`, etc.
- **Emphasis** — `Bold` or `Subtle`. **Never `Solid`** — "Bold" describes
  intent (how much attention this should draw), "Solid" describes render
  implementation (opaque fill). Intent-based naming survives a future
  visual-treatment change (e.g. a gradient replacing a flat fill);
  implementation-based naming doesn't. No emphasis segment = the base/
  default color for that Role (don't write `-Default` as an emphasis).
- **State** — `Hover`, `Pressed`, `Disabled`, always last. No `Default`
  suffix for the base/resting state — its absence *is* the signal
  ("Success-Bold" is the default state of Success-Bold; "Success-Bold-
  Hover" is the hover state).

### Casing

Title-Case every word inside a segment, hyphen between words:
`On-Primary`, `On-Dark`, `On-Surface-Neutral`, `Focus-Ring-Neutral`,
`Neutral-White-Start`. Don't concatenate without a separator
(`Onprimary`) and don't lowercase after the first letter of a compound
(`Onsurface`) — both were rejected in favor of the hyphenated Title Case
form above.

## Worked reference table

Old → new renames actually executed in the file (Sep 2026), useful as the
canonical example set:

| Old | New |
|---|---|
| `Text/Primary` | `Text/Default` |
| `Text/Secondary` | `Text/Subtle` |
| `Text/Tertiary` | `Text/Subtler` |
| `Text/Muted` + `Text/Disabled` (duplicate value, merged into one) | `Text/Subtlest` |
| `Text/On-primary` | `Text/On-Primary` |
| `Icon/Onsurface/Neutral` | `Icon/On-Surface-Neutral` |
| `Stroke/Focus-Ring/Neutral` | `Stroke/Focus-Ring-Neutral` |
| `Surface/Success-Base` | `Surface/Success` |
| `Surface/Success-Solid-Default` | `Surface/Success-Bold` |
| `Surface/Success-Solid-Hover` | `Surface/Success-Bold-Hover` |
| `Linear/Neutral/White-Start` | `Linear/Neutral-White-Start` |
| `Link/Neutral/Default` | `Link/Neutral` |
| `Link/Neutral/Hover` | `Link/Neutral-Hover` |
| `Data-viz (!)/Chart-3` | `Data-viz/Chart-3` |

## Tier naming: descriptive, not ranked

Don't name an emphasis/prominence spectrum with abstract rank words
(`Primary/Secondary/Tertiary/Muted`) — nobody can tell from the name alone
which one to use for body text vs. a caption. Use a **comparative-adjective
spectrum instead**: `Default → Subtle → Subtler → Subtlest`. This is the
Atlassian-style pattern and it's self-documenting: the further down the
list, the less emphasis, no memorization required. Applied so far only to
`Text` (its Role segment was the outlier — `Surface` already used
`Default/Subtle/Inverse/Neutral`-style descriptive naming). Check whether a
similar rank-word smell exists before adding a new tier spectrum elsewhere.

## Accent tokens (decorative/categorical color — not a status Role)

For a color that carries **no semantic status meaning** — a user-pickable
label color, an avatar background, an extra chart series color, anything
where the color itself is the identity, not an indicator of success/error/
etc. — mark it explicitly with an `Accent` segment:

```
Colors/Text/Accent-Green-Lime
Colors/Text/Accent-Green-Lime-Subtle
Colors/Surface/Accent-Green-Lime-Bold-Hover
```

The `Accent` word is load-bearing, not decoration — it's the signal that
this token has no functional/status meaning and shouldn't be reused
anywhere a Role token (`Success`, `Error`, etc.) would be expected. Name
the color itself after its actual hue (`Green-Lime`, `Purple-Mist`), not a
generic index (`Accent-1`, `Accent-2`) — a real name maps cleanly back to
its Primitive ramp and is easier to recall during handoff.

**Don't create an Accent family speculatively.** Only add one when a
specific component actually needs arbitrary/categorical color. First
confirmed family (Sep 2026): a 14-color `Surface`-only Accent set, in
`Semantics-Core` (see "Accent color-family construction rule" below) —
before that, Badge and Tag colors were fixed per role and no Accent family
existed.

### Accent color-family construction rule (Bold/Subtle/Subtler tiers)

When building a categorical Accent color family — e.g. brand-identity tags
or badge/label colors with no status meaning — follow this repeatable
recipe rather than improvising per color:

- **Collection**: `Semantics-Core` — Accent colors are categorical
  identifiers, not brand-specific, so (unlike most tokens, which start in
  `Semantics` and only migrate to `Semantics-Core` once confirmed identical
  across brand modes) Accent goes straight into `Semantics-Core` from
  creation. There's no brand-mode reason a given Accent hue would ever
  differ across Nusantics/CeKolam/Causa.
- **Tier scope**: default to `Surface` only (background/fill). Only add
  matching `Text`/`Stroke` members of the triad if a real component
  actually needs custom label/border color to go with the background — see
  "don't create the full triad speculatively" above.
- **Emphasis spectrum**: `Bold` → `Subtle` → `Subtler`, three tiers.
  **History**: a third `Subtler` tier was tried in an earlier Sep 2026
  pass, dropped almost immediately for being unused, then **revived** in a
  later Sep 2026 pass once a real consumer needed a lighter-than-Subtle
  background — at that point `Subtle`'s old value was reassigned to
  `Subtler` (one tier lighter than before) and `Subtle` was repinned to a
  darker step, per the mapping below. This history matters operationally:
  it's a live example of "add a tier back once a real consumer needs it,
  from that consumer's actual context" — not a one-off exception.
- **Sourcing rule**: alias directly to a **Primitives** step — never
  through an existing Semantics/Semantics-Core token (e.g. never through
  `Colors/Brand/Primary/Default`), even when the resulting color is
  visually identical to an existing brand color. Accent tokens are
  decorative/categorical identifiers, independent of the functional
  Brand/Status token graph; aliasing through Brand would wrongly couple a
  decorative token's value to a functional token's future changes.
- **Step mapping** (same three steps on *every* ramp — final, standardized
  Sep 2026, applies uniformly even to ramps that aren't perfectly
  monotonic; see gotcha below for why this was chosen over per-ramp
  custom steps):
  - `Bold` = step `70`.
  - `Subtle` = step `30`.
  - `Subtler` = step `20` (this was the old `Subtle` value before the
    tier was revived — reassigned, not a fresh pick).
- **Naming**: name the color after its actual hue, not the bucket it came
  from.
  - For a brand ramp: Primitives splits each brand into several named
    sub-hues (e.g. Nusantics → `Lively Orange`, `Cool Grey`, `Sustainable
    Green`, `Pale Green`, `Navy Blue`, `Dusty Blue`). Use whichever sub-hue
    is that brand's actual primary color (cross-check against
    `Colors/Brand/Primary/Default`'s alias target for that brand's mode) —
    never the brand name itself as the color name.
  - For a plain hue ramp (`Red`, `Blue`, `Yellow`, `Green`, …): give it a
    specific, recognizable name matching its hex, not the flat ramp name —
    e.g. `Red/50` (`#dc2626`) → `Crimson`, `Yellow/50` (`#f59e0b`, actually
    amber-toned) → `Amber`, not `Red`/`Yellow`.
  - Record brand/ramp traceability (which brand, which Primitives ramp and
    step) in the variable's **description**, not the name — the name
    should stand on its own as a color identity, independent of context.

Worked example (Sep 2026, 14 colors total, all on the final `70/30/20`
steps): `Lively Orange` (Nusantics), `Pumpkin Orange` (CeKolam), `YInMn
Blue` (Causa), `Crimson` (Red), `Royal Blue` (Blue), `Amber` (Yellow),
`Emerald` (Green), `Forest Green` (Nusantics/Sustainable Green), `Sage
Green` (Nusantics/Pale Green), `Navy` (Nusantics/Navy Blue), `Steel Blue`
(Nusantics/Dusty Blue), `Teal` (CeKolam/Blue Green), `Slate Blue`
(Causa/Powder Blue), `Sky Blue` (Causa/Azure) — each as
`Colors/Accent/{Name}-Bold` / `-Subtle` / `-Subtler` (42 variables total).

**Gotcha: not every ramp is monotonic — the fixed `70/30/20` steps are a
deliberate simplicity-over-precision tradeoff, not a claim that step 70 is
always the "best-looking" vivid step.** Some ramps get lighter or duller
at some steps than their neighbors (e.g. `Causa/Azure/50` is `#e3eef0`,
nearly white, while `Azure/80` is `#35a6d9`, the actually-azure color;
`Nusantics/Sustainable Green/50` is a dark olive while `/40` is the vivid
green). An earlier pass picked a custom Bold step per ramp to route around
this — but the team decided a single fixed step across all colors is
easier to reason about and extend than a table of per-ramp exceptions, so
`70/30/20` is now applied uniformly even where it isn't each ramp's single
best-looking step. If a specific color's result looks visibly wrong when
you actually build one, that's a signal to revisit this tradeoff for that
ramp specifically — don't silently special-case it.
Also skip a sub-hue if its value duplicates one you already added —
`CeKolam/Rhino/50` (`#2b485e`) is pixel-identical to `Nusantics/Navy
Blue/50`, so no separate `Rhino` Accent color was created. Achromatic
sub-hues (`Cool Grey`, `Atomic Grey`, `Authentic Grey`, `Dim Gray`) were
deliberately excluded from Accent — greys are structural
(`Stroke/Neutral-*`, `Text/Subtle`, etc. already cover them), not
categorical identity colors, so making them Accent tokens would violate
"don't create tokens just in case" above.

### Correction (2026-09-08): `Accent` is its own flat Category, not a Role nested under Text/Surface/Stroke

An earlier draft of this section claimed `Accent` occupies the Role slot
under an existing Category (`Colors/Surface/Accent-Green-Lime-Subtle`,
`Colors/Text/Accent-Green-Lime`, etc.) — **that was wrong, written before
any Accent variable actually existed, and contradicted by the real thing
once it was built.** The confirmed 42-variable Accent family (see below)
uses a flat structure instead:

```
Colors/Accent/{Name}-Bold
Colors/Accent/{Name}-Subtle
Colors/Accent/{Name}-Subtler
```

`Accent` sits in the Category slot itself (like `Data-viz`), not nested
inside `Surface`/`Text`/`Stroke`. `{Name}` takes the Role slot (the hue
identity — `Crimson`, `Lively Orange`, etc.), and `Bold`/`Subtle`/`Subtler`
are the Emphasis tier. There is currently no confirmed pattern for a
Text- or Stroke-specific Accent variant (e.g. label text matching a badge's
Accent background) — all 42 existing Accent variables are fill/background
usage only (`FRAME_FILL`/`SHAPE_FILL` scope). If a real component needs a
matching label/border color, that's new ground — don't invent a nested
`Colors/Text/Accent-*` path by analogy without checking with the designer
first, since the flat `Colors/Accent/{Name}-*` pattern may need a different
extension (e.g. a scope suffix) instead.

### Accent vs. Data-viz — pick by context, not just "no status meaning"

Both `Accent` and `Data-viz` cover colors with no success/error/warning-style
status meaning, but they're not interchangeable:

- **`Data-viz`** — categorical color used *in a chart/graph* (a data series,
  a bar segment). Already has its own dedicated Category and numbered scale
  (`Chart-1`…`Chart-8`); use that, not Accent, for anything chart-context.
- **`Accent`** — categorical color used *outside* a chart (a badge, tag,
  avatar, category label) where the color itself is the identity. Use this
  for everything else that fits the "no status meaning" description.

Surfaced via a live color-remapping audit (2026-09): disease-category Badge
text colors and a chart's per-series `COLOR` values were initially about to
get lumped into the same bucket ("no proposal, one-off, keep custom") until
this distinction was drawn — the badge colors are `Accent` candidates, the
chart-series ones route through `Data-viz` instead. The same audit is what
led to the real 42-variable Accent family below.

## Gap-finding: Category × Role coverage matrix

Before assuming a semantic token is missing (or that one is safely
unused), build the matrix: for each Category (`Text/Icon/Stroke/Surface/
Shadow/Link`) × each Role in use elsewhere (`Primary/Secondary/Tertiary/
Brand/Success/Warning/Info/Destructive/Neutral/Disabled/Selected`), count
how many variables match. A cell that's `0` while the same Role is
populated for *other* Categories is a real gap candidate. A cell that's
`0` because the Role genuinely doesn't apply to that Category (e.g. `Link`
has no `Success/Warning/Info` — confirmed against `TextLink.tsx`'s actual
variant set, not every role belongs everywhere) is not a gap — don't fill
it speculatively. This caught two real holes in Aug 2026: `Text-Selected`
+ `Icon-Selected` (existed for `Surface`/`Stroke` but not `Text`/`Icon`,
despite "selected" nav/tab/chip items typically needing text+icon color to
change too, not just background) and `Shadow-Info` (the other three status
roles — Success/Warning/Destructive — all had a `Shadow/*` entry, Info was
just missed when the pattern was built).

## Don't create tokens "just in case"

If a color doesn't have a confirmed component consumer yet, it stays in
**Primitives** with its raw technical name (ramp/step, opacity as `-a{N}`
per the `helix-design-system` alpha convention) — it does **not** get
promoted to Semantics-Core with a guessed functional name. A semantic name
requires a real usage to derive meaning from; naming it speculatively
produces exactly the kind of implementation-leaked name this whole
convention exists to avoid (e.g. `Stroke/White/100`, `Stroke/Neutral-50`,
`Overlay/Black-70`, `Surface/Transparent/0`…`60` — 13 tokens deliberately
left un-renamed in the Sep 2026 pass, pending confirmed usage). When one of
these gets its first real consumer, name it then, from that consumer's
actual context — don't pre-guess.

## Before creating any new semantic variable

1. Does a variable with this **exact resolved value** already exist
   anywhere in Semantics-Core? If yes, reuse it — don't create a duplicate
   under a new name. (`Text/Muted` and `Text/Disabled` existed side by side
   for a while because nobody checked this before adding the second one.)
2. Does the Category/Role/Emphasis/State combination already exist under a
   different but equivalent name? Rename/consolidate rather than adding a
   parallel token.
3. Is this genuinely a new Role, or is it an Accent (no status meaning)? Pick
   the right family per above — don't force a decorative color into a
   status-Role name or vice versa.

## Safe rename / merge / delete procedure

Figma binds a node to a variable **by ID, not by name** — renaming a
variable's `.name` property does not require touching any bound node; every
instance updates automatically. This makes pure renames low-risk and cheap
to batch (see `use_figma` scripts from the Sep 2026 pass: a single script
looping `variable.name = newName` over ~46 variables, zero node traversal
needed).

**Deleting or merging two variables into one is different and needs the
full page-sweep procedure** — the surviving variable is a *different ID*
from the one being removed, so every node bound to the removed ID must be
re-pointed first:

1. Identify every page where the variable-to-be-removed is bound (fills +
   strokes; effects too if it's a Shadow/Overlay token) via
   `findAllWithCriteria` + `boundVariables` inspection, across **all**
   non-archive pages.
2. Re-bind every match to the surviving variable's ID
   (`figma.variables.setBoundVariableForPaint`).
3. Re-run the full-file sweep and confirm **zero** remaining bindings to
   the old ID.
4. Only then call `.remove()` on the old variable.
5. Screenshot a couple of representative pages afterward as a visual sanity
   check — a merge changes which ID a node points to even though the
   rendered color shouldn't change, so a silent binding failure is possible
   and won't show up unless you look.

Never skip step 3 before step 4 — deleting a still-bound variable silently
converts every node that referenced it into a disconnected hardcoded color
with no visible error at delete time.

## Communication sequencing

Per agreement with the designer (Sep 2026): renames execute in Figma
**first**, FE/dev team is informed **after** the Figma side is finalized —
not before, and not silently skipped. A rename changes the variable name
exposed through Figma's API/dev handoff, so treat it as a heads-up to send,
not something to leave for someone else to notice.
