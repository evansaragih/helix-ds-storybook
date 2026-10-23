---
name: figma-component-group-item
description: "Characteristics of the Group Item component set (node 7109:1053898, Item page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Group Item via use_figma."
---

# Group Item — Component Characteristics

Node `7109:1053898` on the **Item** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Selectable row for a Checkbox or Radio group. Use for a row inside Checkbox Group / Radio Group / Field Group's Items slot. Do not use for a generic menu/nav row — use List Item instead.

## Variant axes & properties

- `Size`
- `State`
- `Type`

No `Control` or `Selected` properties — see the Oct 2026 history below for why, and before re-attempting either.

## Structure, tokens & known gotchas

Each variant nests a live `Content Container` instance (`Surface=Gray, Content Style=Floating, Header=False, Footer=False`, node `7103:902`) — this is what gives the gray-padding + white-floating-card look, and it's a genuine open slot (`Container Content`) a consumer can drill into and swap, same as any other Content Container usage. Instance width varies per `Type` (Standard/Avatar/Icon simple ≈ 400, Item Photo Card narrower, Icon card its own `Body` wrapper instead of a plain `Row`) — match each variant's own existing Content Container width when touching this, don't assume one fixed number.

**Oct 2026, full history (built, then reverted — do not redo without explicit request):**
1. Sep 2026: had `Selected`/`Control` axes directly, matrix reduced from 128→32 variants via a `Selected Overlay` rectangle.
2. Oct 2: restructured to nest a live Content Container instance for the floating-card look. This silently broke `Selected`/`Control` — Figma disallows binding new component properties onto anything living inside a nested INSTANCE's slot/override territory, which is exactly where the row content now lived.
3. Oct (first fix attempt): diagnosed the real cause (not the absolute-position-node-drop red herring it was first filed as), detached every variant's Content Container instance into a plain frame so `Control` (INSTANCE_SWAP: Checkbox/Radio Button) and `Selected` (BOOLEAN, driving a rebuilt Selected Overlay) could bind directly again.
4. **Reverted** after the user caught that step 3 silently killed the real, usable `Container Content` SLOT (detaching an instance strips its slot-ness along with everything else) — the tradeoff had been undersold as "loses sync with Content Container's future design," not "loses the slot entirely." User chose to keep the slot and drop Control/Selected rather than a hybrid (fixed content + a separate empty slot, the pattern that worked for Dashboard Navbar) — Group Item's row content isn't "extra vs. named pieces" the way Dashboard Navbar's was, so a hybrid didn't map as cleanly here.

**Revert mechanics, if this ever needs redoing or re-reverting:** for each variant, pull the real content (`Row`, or `Body` for `Icon card`) out of the detached frame's `Container Content`, discard any `Selected Overlay` (it never existed before the Sep 2026 rebuild either), create a fresh Content Container instance, remove its default `Content Slot` placeholder, append the saved content into its `Container Content` slot, resize the instance to the original frame's width, then delete the old detached frame. Do this per-variant in small batches, not one giant script — a single bad `findOne` assumption (e.g. assuming every Type names its content node `Row`, when `Icon card` names it `Body`) throws and rolls back everything done in that call.

See [[feedback_prefer_pure_slots_over_toggle_restructure]] — this component (not Dashboard Navbar) is where that lesson actually originated; applied retroactively here once the user caught it.
