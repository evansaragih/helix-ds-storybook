---
name: figma-component-select
description: "Characteristics of the Select component set (node 3587:9659, Select page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Select via use_figma."
---

# Select — Component Characteristics

Node `3587:9659` on the **Select** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Select is a form field: an Input trigger (Input/Input+Label/Input-Floating) that opens a Popover listing selectable List Item rows. Open=False shows the trigger only; Open=True shows trigger + panel. Selection=Single picks one item and closes; Selection=Multi shows checkbox List Items with a Footer (Reset/Select all). Use for choosing a value into a form field. Do not use for a command/action menu with no selected value — use Dropdown Menu instead.

## Variant axes & properties

- `Open`
- `Trigger`
- `Selection`

## Structure, tokens & known gotchas

Floating panel is absolute-positioned, can be clipped by ancestor overflow. _popover-base's position is a static offset baked per pre-built Trigger variant — does NOT auto-follow if the trigger's height changes on an instance; reposition _popover-base's Y to (new trigger height + gap) manually when that happens.

## Filled axis (2026-10-20)

Select has a `Filled` axis (False / True): 28 variants. `Filled=True` shows a chosen value in the nested Input Field (`Filled=True`): Single = `Olivia Rhye`, Multi = `2 selected`, Floating keeps the caption (`Assignee` / `Team`), labels use `Assignee` (people) / `Team` (departments).
- Closed variants: `Selection=None` (Filled=False only), `Selection=Single` and `Selection=Multi` (Filled=True only). Open variants have Single and Multi, both Filled values.
- Open + Single + Filled=True: the Olivia Rhye List Item is `State=Active` with `Show Check` on (trailing check icon). Open + Multi + Filled=True: first two Checkbox rows `Checked=Checked` (Checkbox values are `Unchecked/Checked/Indeterminate`).
- Layout: a grid, columns = Trigger x Filled (8), rows = Closed None / Closed Single / Closed Multi / Open Single / Open Multi. Open panels overflow their frame; the grid is placed from the measured `_popover-base` extents (`absoluteBoundingBox` of the panel instance), not from the variant height.
- Observed state in the file at the time of writing: the open Multi Filled=True triggers read `Engineering, Design` while the closed Multi ones read `2 selected`; the open ones look hand-edited after the build, align them when the display rule is decided.
- Backup of the pre-Filled set: `BACKUP 2026-10-20 Select (pre Filled)` on the Select page.
- Code: `Select.tsx` should expose the filled/selected display for engineers (value text, count for multi, check on the selected single row).

## Used inside Toolbar Filter's Sort panel (2026-10-20)

The Sort panel in `Toolbar Filter` (Dropdown Menu `7261:47836`, slot `Sort List`) had faux selects: `Input` instances (Filled=True, 108x36) in each Sortable List Item's `Body Content` and `Trailing Content` → Field → `Content` slot. Replaced all 6 with `Select` `Open=False, Trigger=Input, Selection=Single, Filled=True`, resized to 108x36, value text overridden (`Project` / `Status` / `Created date`, `Ascending` / `Descending`).
- Trigger choice: closed Select sizes are `Input` 240x36, `Input+Label` 180x62, `Input-Floating` 139x48, `Input Horizontal` 240x36. Only the two 36px ones fit a compact row; `Input` was chosen. None has a chevron AND no label — gap: a compact trigger with a chevron does not exist yet (adding one means a new `Trigger` value on this set, a shared change).
- Value text is overridden by drilling into the nested Input Field (Select exposes no TEXT property), so it will not follow future Select changes. Select placed in a Field `Content` slot nests its own Field/Input, so a tree scan for slots named `Content` finds 2 per row.
- Select's open panel was not used here: the Sort rows only show the closed trigger. The dropdown options for sort fields would still be the default people list until the open panel is designed for that context.
