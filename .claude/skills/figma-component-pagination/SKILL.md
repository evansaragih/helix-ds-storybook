---
name: figma-component-pagination
description: "Characteristics of the Pagination component set (node 4617:212378, Pagination page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Pagination via use_figma."
---

# Pagination — Component Characteristics

Node `4617:212378` on the **Pagination** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Full-width Pagination paired with its compact icon-nav counterpart. Content x Density variants.

## Variant axes & properties

- `Content`
- `Density`

## Structure, tokens & known gotchas

Internals (Previous/Next, page-number chips, icon-only nav) are live instances of Pagination / Atoms, except the two Grouped rows which use the existing Button Group molecule (segmented-pill pattern with corner-radius stitching per position, not compatible with plain Atoms instances).
