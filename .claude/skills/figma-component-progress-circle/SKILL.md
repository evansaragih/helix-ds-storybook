---
name: figma-component-progress-circle
description: "Characteristics of the Progress Circle component set (node 7183:893, Progress Indicator page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Progress Circle via use_figma."
---

# Progress Circle — Component Characteristics

Node `7183:893` on the **Progress Indicator** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A circular ring showing determinate completion percentage. Use where a compact circular indicator fits better than a horizontal bar (e.g. a small upload status). Do not use for a full-width progress read — use Progress Bar instead.

## Variant axes & properties

- `Value#7183:210`
- `Supporting Text#7183:211`
- `Label Slot#7183:212`
- `Size`
- `Thickness`
- `Label`

## Structure, tokens & known gotchas

When Label=True, the center content is a SLOT (default: Supporting Text + Value percentage) — swap in an icon, Icon Tile, or any custom content per instance instead of the default text. An older pre-rebuild version is deliberately still alive in the file (used by 2 live Dropzone instances at its 40px footprint) — check migration status before deleting it. See figma-component-build's 'Known reusable components' section.
