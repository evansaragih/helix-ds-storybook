---
name: figma-component-sidebar
description: "Characteristics of the Sidebar component set (node 119:17697, Sidebars page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Sidebar via use_figma."
---

# Sidebar — Component Characteristics

Node `119:17697` on the **Sidebars** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

App-wide collapsible side navigation for an authenticated dashboard product. Use for primary in-app navigation between top-level sections. Do not use for a public/marketing page — use the top Navbar components instead.

## Variant axes & properties

- `State` (Expanded=default, Collapsed)
- `First Section#7460:0` (SLOT)

State picks Expanded (240px — full logo wordmark, badge, labeled nav items, named support links, profile name) or Collapsed (62px — icon-only logo mark, no badge, icon-only nav items, icon-only support links, avatar only). Confirmed via screenshot comparison, not guessed.

## Structure, tokens & known gotchas

Top-level structure (same in both states): `Header` (logo + badge, fixed) → `First Section` (SLOT, the main nav list) → `Menu List` (`Footer Content` support links + profile `List Item`, fixed). First Section is populated by default with 6 example `_sidebar-item` instances (Home/Dashboard/Project/Task/Reporting/Users) — this is the main nav list, not a workspace/org-switcher slot (an earlier audit speculated the latter without checking; verified by inspecting actual slot contents).

Oct 2026: flagged in a component audit — D9 was Blocking, description was completely empty. Fixed by inspecting both State variants directly (screenshot + tree walk) rather than guessing from variant names or slot naming alone.

**Known naming note (not fixed here, cross-component):** Figma name "Sidebar" vs code export `AppSidebar` — same `App*` prefix pattern also seen on Dashboard Navbar (code: `AppNavbar`). The audit suggested standardizing this prefix convention once (in Figma or in code) rather than resolving it per-component; flagging here for whoever picks that up.
