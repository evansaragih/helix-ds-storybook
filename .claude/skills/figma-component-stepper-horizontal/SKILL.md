---
name: figma-component-stepper-horizontal
description: "Characteristics of the Stepper Horizontal component set (node 7532:1423, Stepper page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Stepper Horizontal via use_figma."
---

# Stepper Horizontal — Component Characteristics

Node `7532:1423` on the **Stepper** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Horizontal step navigation: markers + connectors in one row, step title/description/badge below or above them (Label Position). Use inside a Stepper flow panel for a left-to-right progress/wizard layout. Do not use for the vertical layout — use Stepper Vertical instead.

## Variant axes & properties

- `Slot Label#7532:0`
- `Slot Icon Button#7532:1`
- `Label Position` (Bottom=default, Top=mirrored)

## Structure, tokens & known gotchas

Oct 2026: was a bare single COMPONENT with zero variants and an empty description (flagged Blocking on both D3 variant-completeness and D9 usage-guidance in a component audit) — converted to a proper COMPONENT_SET mirroring Stepper Vertical's Label Position axis. Bottom variant is the original layout (VERTICAL auto-layout, children order Steps then Slot Label); Top variant is a clone with children reordered (Slot Label then Steps) — same mirroring pattern Stepper Vertical uses for Right/Left, just on the other axis (above/below instead of left/right of the markers row).

Known cardinality mismatch (flagged in the same audit, not fixed here): code unifies this and Stepper Vertical into one `Stepper` component with an `orientation` prop, while Figma keeps them as two separate components. Not addressed by this fix — a separate design/eng decision about which side should move.
