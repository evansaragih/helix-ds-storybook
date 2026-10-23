---
name: figma-component-breadcrumb
description: "Characteristics of the Breadcrumb component set (node 4491:210640, Breadcrumb page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Breadcrumb via use_figma."
---

# Breadcrumb — Component Characteristics

Node `4491:210640` on the **Breadcrumb** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A complete breadcrumb trail (Home > ... > App Center > Applications). Divider=Chevron/Slash selects the separator icon. State=Closed/Open controls the last crumb's context-switcher affordance.

## Variant axes & properties

- `Extra Crumb 1#4843:0`
- `Extra Crumb 2#4843:5`
- `Divider`
- `State`

## Structure, tokens & known gotchas

The last crumb uses the real Popover component (Trigger=Tag) instead of a plain _breadcrumb instance: State=Closed -> Popover(Direction=None), State=Open -> Popover(Direction=Bottom). Old superseded _breadcrumb nodes were hidden (not deleted — Figma blocked removal) rather than left visible.
