---
name: figma-component-switch-item
description: "Characteristics of the Switch Item component set (node 3232:178617, Switch page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Switch Item via use_figma."
---

# Switch Item — Component Characteristics

Node `3232:178617` on the **Switch** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Switch Group Item molecule, mirroring Radio Group Item's structure (Nusantics 2914:201) with the radio control swapped for a live _switch instance. A selectable/toggleable card nesting title + description content.

## Variant axes & properties

- `Selected`
- `Size`
- `State`

## Structure, tokens & known gotchas

Properties: Selected (false/true, maps to switch Checked), Size (sm/md), State (Default/Hover/Focused/Disabled). Card and inner switch both respond to Hover/Focused for a consistent double-indicator pattern, matching Radio Group Item.
