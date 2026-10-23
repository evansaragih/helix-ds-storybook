---
name: figma-component-content-divider
description: "Characteristics of the Content Divider component set (node 4135:539, Content Divider page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Content Divider via use_figma."
---

# Content Divider — Component Characteristics

Node `4135:539` on the **Content Divider** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

A divider with content (label, button, icon group, tab group) embedded inline. Use for a section separator that also needs a label or inline action. Do not use for a plain unlabeled line — use Divider instead.

## Variant axes & properties

- `Appearance`
- `Content`

## Legacy buttons replaced (2026-10-20)

The 6 direct legacy instances (`Buttons / Button` "Add" x3 in Content=Button, `Buttons / Icon` x3 in Content=Icon Button; Neutral / Solid / sm) now point to the current `Button` (Secondary / Outline / sm, text `Add`) and `Icon Button` (Secondary / Outline / sm, Notification Badge off, `li:plus`). Legacy "Neutral Solid" is a white bordered 36px button, which is what Secondary/Outline renders; the new border is a bit lighter.
- Tab Group (View all / Active / Inactive): its 3 `Button Group` instances pointed to a REMOVED older Button Group set (`4077:206948`, variant `Icon=False`, no page — Figma showed "Component removed from library") that held the 9 legacy `Buttons / Button`. They now use the current Button Group (`2885:101644`, `Appearance=Outline, Icon=True, Text=True, Size=Small`, built on `_button group base` + the current Button) with the three labels set. The current Button Group never used legacy buttons; an earlier note saying it did was wrong. Selected look for `Active` was not added (all items Default as before); `_button group base` has `State=Selected` if wanted.
- Also fixed on the Navbars page: 3 top-level legacy instances (a Button 197 wide FILL and two Icon Buttons). Two of them had empty legacy contents (no `_button base` child), so they use default content.
- Still legacy elsewhere (counted 2026-10-20, flaky scans: re-count before acting): about 20 direct `Buttons / ...` instances nested in the Navbars mockup screens (pagination Previous/1/3/Next, action buttons, Icon Pill), 21 `Buttons / Button (merged)` (Date Pickers `Now` Ghost / `Set` Primary, Comparison Table `Upgrade Sekarang`, [old] Card / Metric) and ~141 on deprecated, Trash and CeKolam pages.
