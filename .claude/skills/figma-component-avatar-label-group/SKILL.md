---
name: figma-component-avatar-label-group
description: "Characteristics of the Avatar Label Group component set (node 2062:28774, Avatar page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Avatar Label Group via use_figma."
---

# Avatar Label Group — Component Characteristics

Node `2062:28774` on the **Avatar** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Avatar paired with a name/label (and optional secondary line, e.g. email). Size (sm/md/lg/xl) scales avatar and text together. Reused by Dropdown's List Header (Type=User) for account-switcher-style headers.

## Variant axes & properties

- `Size`
- `Status icon`
- `State`

## Structure, tokens & known gotchas

Known gap: Status icon and State currently only expose a single option each (False / Default) — no presence-dot or interactive-state variant exists yet.
