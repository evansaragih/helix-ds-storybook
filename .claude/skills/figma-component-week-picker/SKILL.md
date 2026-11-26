---
name: figma-component-week-picker
description: "Characteristics of the Week Picker component set (node 8507:8808, Input Pickers page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Week Picker via use_figma."
---

# Week Picker — Component Characteristics

Node `8507:8808` on the **Input Pickers** page (id 1910:168), Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Week Picker is a Popover-based field: an Input+Label trigger that opens a floating panel with a month and year header (dropdowns + chevrons) and a list of the weeks in that month, each labelled with its date range: W1 (1 - 7 Jan 2026), W2 (8 - 14 Jan 2026), ... Use when the value passed on is the date range of one week (requested for CK demand planning, whose API takes a date range). For a calendar where a whole row is selected use Date Picker `Mode=Week`; for a month or quarter use Month Picker or Quarter Picker.

## Variant axes & properties

- `State` (Closed, Open). Single selection only.

## Structure, tokens & known gotchas

Built Nov 3 2026 from a comment by jason.nusantics ("pemilihan granularnya year-month terus optionnya si minggu yang available di situ dan juga date rangenya"). Weeks are 7-day blocks from the 1st of the month (W1 = 1-7, W2 = 8-14, ...), so the last one can be shorter (W5 = 29-31 Jan); they do NOT follow the calendar's Su-Sa rows.
- Each variant is one `Popover` instance (`Trigger=Input+Label`, Small), cloned from Month Picker. The Open variant has the `_picker-base` variant `Mode=Week List, Time Input=None` (8507:7572, 252 wide, FIXED, HUG tall, 240 tall) in the `Body Item List` slot, slot padding Spacing/12. Free layout: Closed at (20, 20), Open at (20, 140), set 340x600; the panel is absolute-positioned and overflows the variant frame. The base set is shared with the other pickers and is not split per picker.
- Base variant = the standard `_month-header` (month AND year dropdowns + chevrons, month text Jan, year 2026) + `Week List Body` (VERTICAL, gap Spacing/2, top/bottom padding Spacing/8) of five `List Item` instances (set 3624:190909, State=Default, FILL wide, 36 tall). Row 2 is `State=Active` with `Show Check` on, like Select Single Filled. List Item rather than Group Item: this is a single-select option list in a popover (the Select pattern); Group Item is for Checkbox/Radio group rows in forms.
- List Item's `Label` property is not wired to the row text: set the row label by editing the TEXT inside the instance's Body Content slot (`setProperties` with the Label key does nothing visible).
- Labels are static sample text (Jan 2026); there is no per-month generation in Figma. Measured 2026-11-26: the chosen row (row 2) reads `State=Hover` with fill #FEF2E9, text #F57E20 and `Show Check` on, even though the component description says Active; treat the tinted-with-check look as the selected style.
- Trigger Label / Placeholder read Week / Select week (empty state, like the other pickers).
- Open question: Date Picker `Mode=Week` (calendar row select) overlaps with this component; kept for now, retire it if Week Picker covers the need.
- Gotchas: `clone()` of a variant lands on the page, not in the set; `findOne('_popover-trigger')` right after cloning returns null (read it in a later call); the page was renamed Date Pickers -> Input Pickers, find it by id 1910:168.

Measured 2026-11-26: Open variant 284 x 272 (`_picker-base` 252 x 240); header = `_month-header` with prev at x=0, next at x=223 and two 84-wide dropdowns (x=37, x=131, gap 10) reading "Jan" and "2026"; `Week List Body` 204 tall (gap 2, padding 8 top and bottom); rows 252 x 36, padding 8 / 12, radius 6, 13px Regular #49494A. Code mirror: `WeekPicker.tsx` (`Molecule/Input Pickers/Week Picker`), header = `PickerMonthHeader`.
