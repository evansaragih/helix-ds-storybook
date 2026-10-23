---
name: figma-component-popover
description: "Characteristics of the Popover component set (node 6265:25903, Popover page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Popover via use_figma."
---

# Popover — Component Characteristics

Node `6265:25903` on the **Popover** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Popover is the base floating-panel primitive: a Trigger (Button/Input/Input+Label/Input-Floating, swappable via its own Trigger variant) plus a floating shell with Header/Body/Footer slots and an optional scrollbar. Use for building any trigger-and-panel component from scratch. Do not use for a finished menu or field - use Dropdown Menu or Select instead, which nest a Popover instance rather than duplicating its shell.

## Variant axes & properties

- `Trigger`
- `State`
- `Trigger Size`

## Structure, tokens & known gotchas

Direction has only Bottom and None (Right/Left/Top dropped — X/Y calibration broke whenever trigger content changed). Floating panel is absolute-positioned — watch for ancestor overflow clipping. 2026-10-01: added a Trigger Size variant axis (Small/XS/Medium/Large) to Popover itself, each with its own baked absolute Y (trigger height + 8px gap) — a taller trigger now selects a different Popover variant with the right offset built in, since _popover-base's position/positioning-mode cannot be overridden on any instance (confirmed by testing) — it's a main-component-level restriction.
