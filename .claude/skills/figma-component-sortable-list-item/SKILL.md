---
name: figma-component-sortable-list-item
description: "Characteristics of the Sortable List Item component set (node 6780:1050, Item page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Sortable List Item via use_figma."
---

# Sortable List Item — Component Characteristics

Node `6780:1050` on the **Item** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A reorderable list row: drag handle + nested List Item content, for drag-and-drop sortable lists. Use for any list where item order is user-controlled via drag. Do not use for a static navigable row — use List Item instead.

## Variant axes & properties

- `State`

## Structure, tokens & known gotchas

State covers Default/Hover/Focused/Pressed/Disabled (baseline) plus Dragging (elevated, Shadow/Medium + Surface/Default bg). The interactive background lives on the OUTER frame, not the nested List Item (its own fill is cleared per instance) so drag handle + label highlight as one row. Focused reuses Input's ring convention. Pressed currently reuses List Item's own Hover state for text/icon color only (List Item itself has no Pressed state yet) — flagged for follow-up audit.
