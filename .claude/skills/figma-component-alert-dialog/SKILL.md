---
name: figma-component-alert-dialog
description: "Characteristics of the Alert Dialog component set (node 6147:38740, Alert Dialog page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Alert Dialog via use_figma."
---

# Alert Dialog — Component Characteristics

Node `6147:38740` on the **Alert Dialog** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Alert Dialog is a lightweight confirmation/warning modal: an icon + title + description with 1-3 footer actions, built on Content Container (Content Style=Floating, no separate header row). Use for short confirm/cancel or destructive-action prompts. Do not use for content that needs a dedicated header, form fields, or a scrollable body - use Dialog instead.

## Variant axes & properties

- `Layout`

## Structure, tokens & known gotchas

Layout controls icon/text arrangement (Horizontal/Stacked centered/Stacked left aligned). Icon status, Title, Description, and Footer Actions setup are not exposed as top-level properties — drill into the nested _alert-dialog-content and Footer Actions instances directly.
