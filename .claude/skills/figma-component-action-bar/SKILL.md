---
name: figma-component-action-bar
description: "Characteristics of the Action Bar component set (node 4872:215516, Action Bar page, formerly Footer Actions) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Action Bar via use_figma."
---

# Action Bar — Component Characteristics

Node `4872:215516` on the **Action Bar** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Renamed from **Footer Actions** on 2026-10-19 when it
became a general-purpose action row. Companion to `figma-component-build`
(general build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A row of action buttons with an optional leading slot. Use for the footer of a
Dialog, Sheet or Popover, the trailing actions of a header, or an inline action
group. Do not use for a segmented cluster of joined buttons — use Button Group.

## Variant axes & properties

- `Placement` — Footer / Header / Inline
- `Alignment` — Fill container / Right aligned
- `Actions` — 1 / 2 / 3
- `Left Content` — None / Checkbox / Text Link / Button / Icon Button

21 variants in total.

## Structure, tokens & known gotchas

| Placement | Alignment | Actions | Left Content | Buttons | Gap | Width |
|---|---|---|---|---|---|---|
| Footer (14, the original set) | Fill container or Right aligned | 1–3 | None; Checkbox / Text Link / Button on Right aligned | sm | Spacing/12 | Fill = 400 fixed; Right aligned with a left slot = 400 fixed, without = hug |
| Header (4) | Right aligned only | 1–2 | None or Icon Button | xs | Spacing/8 | hug |
| Inline (3) | Right aligned only | 1–3 | None | sm | Spacing/8 | hug |

- `Placement` only changes button size, gap and width. Header and Inline gap/size
  (xs/8 and sm/8) are a first-pass choice from 2026-10-19 — adjust if the design
  review says otherwise.
- `Icon Button` Left Content exists on Header only. It reuses Icon Button
  (node 5785:217503), Secondary/Solid/xs, with the default `square-dashed`
  placeholder glyph — drill into the instance to swap the icon.
- No Destructive property (dropped 2026-09-24) — restyle the trailing Button's own
  Hierarchy directly instead.
- Per standing feedback: a single-button footer row should right-align the button
  structurally (CSS :only-child), not per instance.
- All slots' text/icon/hierarchy are edited by drilling into the nested instance
  directly — Figma does not allow re-exposing a nested instance's own properties up
  to this component's level.
- The set does not auto-resize when variants are added via script: after cloning
  variants in, call `set.resizeWithoutConstraints(maxRight, maxBottom)`.
- A cloned variant keeps its source's fixed height (the Left Content=Button
  variants are 36 fixed): set `layoutSizingVertical = 'HUG'` on Header variants.
- A backup of the pre-Destructive-drop set (25 variants) sits on the same page; it
  is not part of the live component.
- The `_modal-header` Header Trailing Content slot (node 6153:4, shared by Dialog and
  Sheet, only in Layout=Stacked Horizontal) holds an Action Bar instance by default
  (Placement=Header, Actions=1, Left Content=Icon Button) since 2026-10-19. Dialog and
  Sheet instances keep `Show Trailing Action` off, so it only appears when toggled on.
  Stacked Left and Stacked Centered still have no trailing slot.
- Consumers: Dialog/Sheet header slot (Header), Alert action rows (Compact = Inline, link rows
  = Footer), Callout Trailing Content (Inline, Actions=1). Overridden button text must stay consistent with the host component, never Cancel / Confirm
  defaults — Alert uses Dismiss / View changes.
- Also still to convert in Figma: Select multi footer, Section Header actions, Empty State actions,
  Dashboard Footer (see project memory), plus Alert `Card w/ Buttons, Status=Default`.
