---
name: figma-component-dashboard-navbar
description: "Characteristics of the Dashboard Navbar component (node 4810:3071, Navbars page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Dashboard Navbar via use_figma."
---

# Dashboard Navbar — Component Characteristics

Node `4810:3071` on the **Navbars** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Dashboard navigation header for authenticated pages: sidebar-toggle button, breadcrumb trail, and a search field on the left; an Upgrade now CTA, quick-action icon buttons, and a profile button on the right.

## Variant axes & properties

Single COMPONENT, no variants. Properties:
- `Left Content#7174:67` / `Right Content#7174:68` (SLOT) — real open slots. Populate with whichever named pieces a page needs; there are no boolean toggles for them, showing/hiding is done by what's dropped into the slot.

## Structure, tokens & known gotchas

Oct 2026: flagged in a component audit — D3 was Blocking because the description named 6 specific toggleable pieces (sidebarToggleButton, breadcrumb, searchInput, upgradeButton, actionButtons, profileButton) while the component exposed zero matching properties, only the 2 generic slots.

**First attempt (reverted per user preference):** pulled the 5 existing pieces (everything except search, which never existed) out of the slots into dedicated always-present wrapper frames so real BOOLEAN toggles could bind — Figma disallows binding new component properties onto anything living inside a SLOT (same restriction class as binding onto INSTANCE sublayers, see Group Item's skill file). This worked functionally (toggles worked, default look was pixel-identical) but changed the structure so the 5 pieces no longer lived *inside* Left Content/Right Content — user wanted the slots to keep owning all their content directly, with nothing structurally pulled outside, even at the cost of not having real per-instance toggles. Reverted: moved the 5 pieces back into their original slot positions, removed the wrapper frames, deleted the 5 boolean properties.

**Final resolution:** description rewritten to honestly describe this as slot-composition (drop in whichever pieces a page needs) rather than promising boolean toggles that don't exist. No structural change from the original — this was purely a documentation fix in the end.

**Known unresolved gap (not fixed, by design):** `searchInput` is named in the description but has zero backing content anywhere in the component. Left Content can hold a dropped-in search field (e.g. a real `Input` instance) but nothing is pre-built — stated explicitly in the description so no one expects a toggle for it.

**Also unresolved (per the same audit, a human decision, not guessed at here):** P1/P2 ambiguity — Figma's "Dashboard Navbar" vs code's generic `AppNavbar` (logo+secondaryNav+mainNav+buttonGroupSlot primitive) may or may not be the same component depending on whether `AppNavbar` is meant to be composed via its slots into this shape, or whether this needs its own dedicated code component.
