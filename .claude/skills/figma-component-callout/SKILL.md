---
name: figma-component-callout
description: "Characteristics of the Callout component set (node 6750:645, Callout page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Callout via use_figma."
---

# Callout — Component Characteristics

Node `6750:645` on the **Callout** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Static, contextual explainer box that stays part of the page content (doesn't auto-dismiss). Types: Error/Warning/Info/Success (status-colored) and Neutral (no status, general notices - gray surface, dashed-circle icon). Use for explaining why something happened or reassuring impact. Do not use for transient action feedback (save confirmation, toast) - use Alert instead.

## Variant axes & properties

- `Icon#6750:0`
- `Trailing#7080:0`
- `Type`
- `Content`
- `Size`

## Trailing uses Action Bar (since 2026-10-19)

The old `Trailing` Button instance in every variant was replaced by a `Trailing Content` frame (auto-layout, hug, no fill) holding an `Action Bar` instance (`Placement=Inline, Actions=1`). The frame's visibility is bound to the existing `Trailing#7080:0` boolean (default off), 30 of 30 variants.
- Content is unchanged: Secondary / Outline / sm, label "Button". Edit label, hierarchy or icon by drilling into the Action Bar's nested Button.
- It is a plain frame, not a SLOT: making it a real slot across 30 variants needs the createSlot-then-recombine path from `figma-component-build`, which risks dropping the Icon/Trailing/Label properties. Do that only if a second action or free content is needed.
- Only the Callout page's own variants exist in the file; no instances were affected (scanned 2026-10-19).
