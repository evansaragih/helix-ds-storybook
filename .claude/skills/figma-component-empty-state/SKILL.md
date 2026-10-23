---
name: figma-component-empty-state
description: "Characteristics of the Empty State component set (node 4325:209521, Empty States page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Empty State via use_figma."
---

# Empty State — Component Characteristics

Node `4325:209521` on the **Empty States** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Empty state placeholder for lists, tables, and search results — no-data, no-results, error, and no-permission scenarios. Type picks the scenario + illustration (Search/Users/Files/Integrations/No Data/No Lab Results/Error/No Permission); Title and Description text stay overridable per instance.

## Variant axes & properties

- `Show Secondary Button#4392:0`
- `Show Primary Button#4392:5`
- `Icon Tile#6993:12`
- `Illustration#6993:17`
- `Show Footer#7002:0`
- `Show Title#7005:0`
- `Show Description#7005:17`
- `Instance Illustration#7174:45`
- `Type`
- `Size`

## Structure, tokens & known gotchas

Size=Default is full-page/section scale; Size=Compact is horizontal (icon left, text+buttons stacked right). 'Actions' is an open slot (layoutWrap=WRAP), not a fixed two-button block — more Button instances can be dragged in on an instance later. Button labels are not exposed as top-level properties (Figma blocks exposing a property nested more than one level deep) — double-click into a button instance to edit its label directly.
