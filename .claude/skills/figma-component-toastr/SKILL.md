---
name: figma-component-toastr
description: "Characteristics of the Toastr component set (node 6774:1461, Alert page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Toastr via use_figma."
---

# Toastr — Component Characteristics

Node `6774:1461` on the **Alert** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Toastr is a full-viewport dialog-style overlay for surfacing an Alert as a toast notification, dimmed backdrop behind it. Use for transient system notices that need a scrim (dialog-like emphasis) rather than an inline banner. Do not use for inline page alerts - use Alert (Redesign) directly instead.

**Code:** `Toastr from helix-design-system`

## Variant axes & properties

- `Toast Content#6810:0`
- `Position`
