---
name: figma-component-list-item
description: "Characteristics of the List Item component set (node 3624:190909, Item page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing List Item via use_figma."
---

# List Item — Component Characteristics

Node `3624:190909` on the **Item** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Generic list/menu row shared across Dropdown Menu, Sidebar, and Navbar. Use for any navigable or actionable list row. Do not use for a Checkbox/Radio group's own selection row — use Group Item instead.

## Variant axes & properties

- `Instance Trailing Content#3624:0`
- `Label#5752:0`
- `Show Leading#6575:0`
- `Show Trailing Content#6575:211`
- `Show Trailing Icon#6585:8`
- `Show Body#6941:0`
- `Body Content#6946:0`
- `Trailing Content#7179:0`
- `Leading Content#7208:69`
- `State`

## Structure, tokens & known gotchas

Four independently toggleable sections: Leading Content (icon, Show Leading), Body Content (SLOT, Show Body — holds Label text by default, visible by default, swappable for arbitrary content like Input/Button), Trailing Content (SLOT, Show Trailing Content — holds Shortcut text + Icon Button by default, also swappable).


## Show Check (2026-10-20)

New boolean `Show Check` (default off) on all 7 State variants shows a `li:check` icon (16px) pinned to the right edge (absolute position, constraints right/center) so it never affects the row layout. Use with `State=Active` to mark the chosen row of a single-select list (Select Single Filled=True). The older `Show Trailing Icon` property has no node bound to it and is switched on by 18 unrelated instances (nav links, Sort rows), which is why the check is a separate property instead of being bound to it. Variants carry SLOT properties, so do not `clone()` them; add nodes in place.
