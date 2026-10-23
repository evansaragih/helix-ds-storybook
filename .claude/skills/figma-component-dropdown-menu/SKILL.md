---
name: figma-component-dropdown-menu
description: "Characteristics of the Dropdown Menu component set (node 3566:185019, Dropdown page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Dropdown Menu via use_figma."
---

# Dropdown Menu — Component Characteristics

Node `3566:185019` on the **Dropdown** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Dropdown Menu is an action menu: a Button trigger that opens a floating panel listing List Item actions (Edit, Delete, Switch account, etc). Items are chosen and the menu closes - nothing is filtered or multi-selected. Use for command/navigation menus triggered by a button or icon. Do not use for a form input that needs a value, search, or checkbox multi-select - use Select instead.

## Variant axes & properties

- `Header`
- `State`
- `Trigger`
- `Trigger Size`

## Structure, tokens & known gotchas

Header: False (default) / Heading (plain text) / Avatar group (user summary row). State shows Open or Closed as two static documentation layouts, not an interactive toggle. Internally nests a Popover pinned to Trigger=Button or Trigger=Tag (2026-10-01, Small/Medium/Large only, no XS), Direction=Bottom. 2026-10-01: each Trigger Size now selects the matching Popover 'Trigger Size' variant so the panel's baked absolute offset matches the trigger height (8px gap at every size) — also fixed a bug where every Closed-state variant's nested Popover had drifted to State=Open/Trigger Size=Small (harmless visually, wrong metadata). Floating panel is absolute-positioned — watch for ancestor overflow clipping.
