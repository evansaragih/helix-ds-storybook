---
name: figma-component-date-picker
description: "Characteristics of the Date Picker component set (node 7188:4717, Date Pickers page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Date Picker via use_figma."
---

# Date Picker — Component Characteristics

Node `7188:4717` on the **Date Pickers** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Date Picker is a calendar picker panel built on Content Container: shell chrome (surface, border, shadow) comes from the container, the calendar comes from _date-picker-base. Use for picking a single date, a date range, a date + time, or a time. Do not use for a quarter/month-only picker - use Quarter Picker instead.

## Variant axes & properties

- `Mode`

## Structure, tokens & known gotchas

Mode picks the calendar body: Single, Range, Date and Time, Time. Month Header, Week Header and Day are reused instances from the existing calendar parts. The panel hugs its content; Date and Time / Time have their own Action row, so no Container footer is shown.
