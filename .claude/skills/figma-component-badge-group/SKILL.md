---
name: figma-component-badge-group
description: "Characteristics of the Badge Group component set (node 2877:101030, Badge page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Badge Group via use_figma."
---

# Badge Group — Component Characteristics

Node `2877:101030` on the **Badge** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Badge Group molecule, matching the Origin reference (node 38:6509). Composed from live Badge component instances (nested one size down: group Size=md nests Badge Size=sm, group Size=lg nests Badge Size=md) plus a description text node.

## Variant axes & properties

- `Content Swap#7652:0` (INSTANCE_SWAP, default = `Supporting Text` atom, node `7652:921`, same page) — replaces the old plain `Supporting Text#6019:0` TEXT property (Oct 2026). The description slot now holds an *instance*, swappable to any other component (Avatar, Icon Tile, Progress, etc), not just text.
- `Position` (Leading, Trailing)
- `Color` (Brand=default, Neutral, Error, Warning, Success, Info — matches Badge's full 6-color set)
- `Icon` (False=default, Dot)
- `Size` (md=default, lg)

## Structure, tokens & known gotchas

Editing the Badge component's styling propagates into every Badge Group instance automatically (nested-instance composition).

Oct 2026: was missing a 6th Color value, `Info`, that the underlying `Badge` component (node `3945:173`) already had — Badge Group's original 5 colors matched the Origin reference's original set, but Badge had since grown `Info` without Badge Group following. Fixed by cloning all 8 `Color=Brand` variants (Position × Icon × Size) into `Color=Info`, swapping each nested Badge instance's `Color` property to `Info` — set grew from 40 to 48 variants, no errors, confirmed by screenshot.

**Gotcha hit adding the new variants:** cloning into a fresh y-offset computed per-source-node (`sourceY + sourceHeight + 200`) does NOT account for the component set's actual established grid — it overlapped existing rows instead of extending them. The set's real layout is two stacked blocks (all `Size=md` rows, then all `Size=lg` rows), each row spaced exactly 46px apart within a block, two columns (Leading x=20, Trailing x=420). Adding a new Color meant inserting 2 new rows *inside* the md block, which required shifting the entire lg block down by 92px (2 rows) to avoid collision — not just appending after the last existing row. Always diff the full existing grid's x/y pattern before placing new variants, and verify zero overlap programmatically (sort each column by y, check `next.y >= prev.bottom`) before calling it done — a screenshot alone can hide a few-pixel overlap or a legitimate one can look like overlap in a busy grid; do both.

**Second gotcha, caught by the user not by me:** cloning `Color=Brand` into `Color=Info` only swapped the nested Badge instance's `Color` property — it did NOT update the outer container's own fill/text tokens, which stayed bound to Brand's tokens (`Colors/Surface/Subtle/Primary`, `Colors/Text/Primary`) instead of switching to the Info equivalents. Token naming pattern per color: fill is `Colors/Surface/{Status}-Subtle` (Error→Destructive-Subtle, Warning→Warning-Subtle, Success→Success-Subtle, Info→Info-Subtle; Neutral is just `Colors/Surface/Subtle`; Brand is `Colors/Surface/Subtle/Primary`), text is `Colors/Text/{Status}` (Info→`Colors/Text/Info`). Also: at the time, the Supporting Text node was the variant's own direct TEXT child (`v.children.find(c => c.type === 'TEXT')`), not via `findAllWithCriteria`/`findOne` with no scoping — those also match the nested Badge instance's own internal "Label" text first, which is a different node bound independently (this scoping caveat no longer applies post-slot-conversion below, since Supporting Text is now an INSTANCE not a TEXT node). When cloning a variant into a new Color value, always check and rebind every color-dependent token on the *outer* structure too, not just the nested instance's own variant property — a nested instance's Color swap does not propagate to sibling/ancestor nodes' own bindings.

## Supporting Text → native SLOT conversion (Oct 2026)

The plain `Supporting Text` TEXT node was converted into a true content slot, at
the user's request ("buat slot, bisa diisi component lain nanti... seperti biasa
buat component ada yang slot"). 0 live instances of Badge Group existed at the
time, so this was zero-risk — always re-check instance count before repeating this
kind of restructure on a component that *does* have live usage (see
`feedback_check_downstream_overrides_before_restructuring`).

**First attempt was wrong and got corrected by the user — worth remembering why:**
the first pass built a hand-rolled INSTANCE_SWAP property pointing at a new
standalone "Supporting Text" atom component. The user rejected this: swapping
between pre-registered components isn't what they meant by "slot" — and more
concretely, the swap-instance approach also silently dropped the per-Color text
fill (all 48 variants rendered in one flat black, because the shared atom's fill
was never copied from each original color). Both problems trace to the same root
cause: INSTANCE_SWAP is for choosing between a fixed menu of components, not an
open "drop anything in here" container.

**The actual fix: Figma's native `SLOT` component property type** (GA since the
2026-06-10 plugin API update). A slot accepts literally any content — text,
instances, frames, groups, multiple children — not just a menu of swappable
components. Correct API sequence (the parts that aren't obvious from the docs):

```js
// 1. Create the property ONCE on the COMPONENT_SET (defaultValue is '', not a node id)
const slotKey = set.addComponentProperty('Content Slot', 'SLOT', '', { description: '...' });

// 2. For EACH variant, build a plain FRAME (not an instance) holding the default content,
//    then mark that frame as the slot by setting componentPropertyReferences on IT:
frame.componentPropertyReferences = { slotContentId: slotKey }; // fixed key name, always 'slotContentId'
```

- `slotContentId` is a **fixed literal key**, same as `visible`/`characters`/
  `mainComponent` are for other property types — not something you invent per slot.
- The target **must be a FRAME** (plain `figma.createFrame()`), not a TEXT node or
  INSTANCE directly — Figma throws `cannotApplySlotPropertyToNonFrameNode`
  otherwise. Wrap whatever default content you want inside the frame.
- **Once linked, the frame's own `.type` changes to `'SLOT'` and its `.name`
  auto-renames to match the property name** ("Content Slot" here) — it stops being
  `'FRAME'`/whatever you originally named it. Any verification script checking
  `node.type === 'FRAME'` or the old layer name will wrongly report "no frame
  found" — check `node.type === 'SLOT'` instead after linking.
- There's also a `component.createSlot()` convenience method that creates the
  frame + property together in one call (returns the property id via
  `slotNode.componentPropertyReferences.slotContentId`) — not used here since each
  of the 48 variants needed its own independently-built default-content frame
  linked to one shared property, which `addComponentProperty` + manual
  `componentPropertyReferences` handles more directly than looping `createSlot()`.

**Per-color text fill (the part that broke on the first attempt):** the default
text inside each slot frame is bound — properly, via `setBoundVariableForPaint`,
not raw hex — to a `Colors/Text/{Status}` token matching that variant's `Color`
axis: Brand→`Colors/Text/Primary`, Neutral→`Colors/Text/Secondary`,
Error→`Colors/Text/Error`, Warning→`Colors/Text/Warning`,
Success→`Colors/Text/Success`, Info→`Colors/Text/Info`. This mirrors the same
per-color text-token pattern already documented above for the outer container.
**When reading back a paint's bound variable to verify, use
`fills[0].boundVariables.color.id`, not `fills[0].boundVariable.id`** — the latter
path doesn't exist on SolidPaint and silently returns `undefined`, which looks
like "not bound" even when binding succeeded (cost real time re-debugging a false
negative here).

**Leftover from the reverted first attempt:** the standalone `Supporting Text` atom
component (was node `7652:921`) was deleted once the real slot was in place — if
you see a dangling reference to that id anywhere, it no longer exists.

**Earlier general finding, still true:** `componentPropertyReferences` cannot be
set on a node that is a *sublayer inside an instance* (a child of an INSTANCE
node) — only on nodes that are direct children of the COMPONENT/COMPONENT_SET
being defined (which includes a FRAME being made into a SLOT), or on an INSTANCE's
own top-level attributes (`visible`/`characters`/`mainComponent`). This is also why
two-level property bubbling (exposing a grandchild instance's own custom property
up through an intermediate instance) isn't possible — only fixed top-level
attributes bubble one hop.
