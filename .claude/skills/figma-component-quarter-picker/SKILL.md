---
name: figma-component-quarter-picker
description: "Characteristics of the Quarter Picker component set (node 8418:6841, Input Pickers page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Quarter Picker via use_figma."
---

# Quarter Picker — Component Characteristics

Node `8418:6841` on the **Input Pickers** page (renamed from Date Pickers, id 1910:168), Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Quarter Picker is a Popover-based field: an Input+Label trigger that opens a floating panel with a year header (chevrons) and four tiles, Q1 to Q4, each with its months. Use for choosing a single quarter, for example in report filters. For a month use Month Picker; for a day or a week use Date Picker.

## Variant axes & properties

- `State` (Closed, Open). Single selection only (by decision).

## Structure, tokens & known gotchas

Built Oct 31 2026 (first as `Period=Quarter` in Date Picker, then split out). A library search still lists an older published "Quarter Picker" (Mode=Expanded / Compact Grid / Input Trigger / Range); that is a stale remote entry with no page in this file, it disappears on the next publish, and it was not reused. Tell the developer if the name is mapped in code.
- Each variant is one `Popover` instance (`Trigger=Input+Label`, Small); the Open variant has the `_picker-base` variant `Mode=Quarter, Time Input=None` (8418:6822, 252x188; the base set is shared with Date / Time / Month Picker and is not split per picker) in the `Body Item List` slot, slot padding bound to Spacing/12. Free layout: Closed at (20, 20), Open at (20, 140), set 340x600; the panel is absolute-positioned and overflows the variant frame.
- Base = `_month-header` instance with the month dropdown hidden (year + chevrons only) + `Quarter Body` of two rows of two `_period-cell` instances (Q1-Q4 with Jan-Mar / Apr-Jun / Jul-Sep / Okt-Des, Q2 Selected), `Show Months` on. The base is FIXED 252 wide, HUG tall: with every child FILL a HUG width collapses to 100.
- `_period-cell` (8402:69689, shared with Month Picker): see `figma-component-month-picker`. Since Nov 26 2026 the Q1 to Q4 label and the months line are both 13px Regular (the label was 16px).
- Trigger Label / Placeholder read Quarter / Select quarter (empty state).
- Gotchas: `clone()` of a variant lands on the page, not in the set. After swapping the nested base in the slot, re-apply the slot padding bindings (a new child can land 8px off).

Measured 2026-11-26: Open variant 284 x 220 (`_picker-base` 252 x 188); `Quarter Body` 152 tall (VERTICAL, gap 8, padding 8) with two `Quarter Row`s of 64 (gap 8), tiles 122 x 64, centred text; Selected tile fill #F57E20. Code mirror: `QuarterPicker.tsx` (`Molecule/Input Pickers/Quarter Picker`), tile = `PickerCell` with `sub`.
