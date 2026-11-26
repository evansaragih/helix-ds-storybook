---
name: figma-component-time-picker
description: "Characteristics of the Time Picker component set (node 8416:6688, Input Pickers page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Time Picker via use_figma."
---

# Time Picker — Component Characteristics

Node `8416:6688` on the **Input Pickers** page (renamed from Date Pickers, id 1910:168), Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Time Picker is a Popover-based field: an Input+Label trigger that opens a floating panel with scroll columns (Hours, Minutes, optional Seconds and AM/PM) and a Now / Set action row. Use for choosing a time only. For a date + time use Date Picker (`Mode=Date and Time`, which has its own Spinner / Dropdown time inputs).

## Variant axes & properties

- `State` (Closed, Open)
- Booleans on the nested `_picker-base` instance (`Mode=Time, Time Input=Columns`): `Show Seconds` (default on), `Show AM/PM` (default off)

## Structure, tokens & known gotchas

Split out of Date Picker on Oct 31 2026 (was `Mode=Time, Time Input=Columns`). Each variant is one `Popover` instance (`Trigger=Input+Label`, Small); the Open variant has the `_picker-base` variant `Mode=Time, Time Input=Columns` (8416:6561, 134x320; the base set is shared with Date / Month / Quarter Picker and is not split per picker) in `_popover-base`'s `Body Item List` slot, slot padding bound to Spacing/0 (the base carries its own Action row). Free layout: Closed at (20, 20), Open at (20, 140), set 320x600; the panel is absolute-positioned (static Y for the Small trigger) and overflows the variant frame.
- Base = Hours / Minutes / Seconds / AM PM columns with `[old] Divider`s, columns 268 tall and clipped, Action row (Now / Set) in flow. Seconds and AM PM (+ their dividers) are bound to the `_picker-base` set's booleans (`Show Seconds#8375:0`, `Show AM/PM#8375:5`). Hidden bound layers need an explicit `visible=false` in the master.
- Trigger Label / Placeholder read Time / Select time.
- Measured 2026-11-26: Open variant 142 x 328 (`_picker-base` 134 x 320, slot padding 0); `Time` frame 134 x 268, clipped, with Hours / Minutes / Seconds columns 44 wide, 1px dividers, `_day` cells 36 x 36 with 4px side and 8px top padding; the selected cell uses `_day` State=Selected (#F57E20, radius 6); `Action` row 52 tall (padding 8, `Button` Now 51 wide at the left, Set 45 wide at the right). Code mirror: `TimePicker.tsx` (`Molecule/Input Pickers/Time Picker`).
- The Seconds column (30 selected) in the Open sample was edited by the designer; leave it.
- Gotcha: after swapping the nested base inside the slot, re-apply the slot's Spacing/0 padding bindings, otherwise the new child sits 8px off (right/down) and the third column clips.
- No Spinner / Dropdown style for time only by decision; use Date Picker's Date and Time for those.
