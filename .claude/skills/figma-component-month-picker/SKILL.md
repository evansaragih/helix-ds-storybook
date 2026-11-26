---
name: figma-component-month-picker
description: "Characteristics of the Month Picker component set (node 8418:6821, Input Pickers page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Month Picker via use_figma."
---

# Month Picker — Component Characteristics

Node `8418:6821` on the **Input Pickers** page (renamed from Date Pickers, id 1910:168), Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Month Picker is a Popover-based field: an Input+Label trigger that opens a floating panel with a year header (chevrons) and a 3x4 grid of months. Use for choosing a single month, for example in report filters. For a quarter use Quarter Picker; for a day or a week use Date Picker.

## Variant axes & properties

- `State` (Closed, Open). Single selection only (by decision).

## Structure, tokens & known gotchas

Built Oct 31 2026 (first as `Period=Month` in Date Picker, then split out). Each variant is one `Popover` instance (`Trigger=Input+Label`, Small); the Open variant has the `_picker-base` variant `Mode=Month, Time Input=None` (8418:6792, 252x252; the base set is shared with Date / Time / Quarter Picker and is not split per picker) in the `Body Item List` slot, slot padding bound to Spacing/12. Free layout: Closed at (20, 20), Open at (20, 140), set 340x600; the panel is absolute-positioned and overflows the variant frame.
- Base = `_month-header` instance with the month dropdown hidden (year + chevrons only) + `Month Body` of four rows of three `_period-cell` instances (Jan Feb Mar Apr Mei Jun Jul Agu Sep Okt Nov Des, Jun Selected). Gaps and padding bound to Spacing/8; tile 44 tall, FILL wide (~79).
- `_period-cell` (8402:69689, shared with Quarter Picker): cloned from `_day`, States Default / Hover / Selected / Disabled (Disabled = old Outside), text props `Label#1452:18` and `Months#8402:5`, boolean `Show Months#8413:0` (default on; Month turns it off for a label-only tile). Button constraints are STRETCH so the instance can be resized. Gap and padding bound to Spacing/2 and Spacing/8, Label is 13px Regular (line-height 19.2) since Nov 26 2026 (was 16px / Body/Default-body); Months is 13px Regular. Exception: the Disabled variant still has a 16px / 24 label, which looks like an oversight (Default, Hover and Selected are 13px). Hover fill is #FFE1C9, Selected is #F57E20 with #FAFAFA text and radius 6.
- Trigger Label / Placeholder read Month / Select month (empty state, like the other pickers).
- Open issues: no current-month marker; no min/max range beyond the per-tile Disabled state.
- Gotchas: a variant that is HUG wide with all-FILL children collapses (the base is FIXED 252 wide, HUG tall). `clone()` of a variant lands on the page, not in the set. After swapping the nested base in the slot, re-apply the slot padding bindings (a new child can land 8px off).

Measured 2026-11-26: Open variant 284 x 284 (`_picker-base` 252 x 252); `_month-header` 36 tall with prev at x=0, next at x=223 and one year dropdown (177 wide, x=37); `Month Body` 216 tall (VERTICAL, gap 8, padding 8 top and bottom) with four `Month Row`s of 44 (gap 8), tiles 79 x 44. Code mirror: `MonthPicker.tsx` (`Molecule/Input Pickers/Month Picker`), tile = `PickerCell`.
