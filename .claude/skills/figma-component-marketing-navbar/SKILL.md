---
name: figma-component-marketing-navbar
description: "Characteristics of the Marketing Navbar component set (node 4858:241048, Navbars page) in the Nusantics Design System Figma file — variant axes, slot/token structure, and known gotchas. Load before editing, extending, or auditing Marketing Navbar via use_figma."
---

# Marketing Navbar — Component Characteristics

Node `4858:241048` on the **Navbars** page, Nusantics Design System Figma file
(`GWzBKGr6512AeMOapwgQhj`). Companion to `figma-component-build` (general
build/audit rules) — this file is the per-component cheat sheet.

## What it is / when to use it

Public marketing-site navigation header, transparent-to-solid on scroll. Use for the top nav of a public/marketing page meant to sit over a hero image or colored block. Do not use for an authenticated dashboard/app page — use Dashboard Navbar instead.

## Variant axes & properties

- `State` (onTop=default, onScroll)
- `Left Content#7174:62` (SLOT)
- `Right Content#6368:285` (SLOT)

State switches the whole color scheme: `onTop` is fully transparent with white logo/nav text (overlay a hero section); `onScroll` is a solid `Colors/Surface/Default` fill (opacity 1, no background blur) with dark logo/nav text. It was a 60% translucent white (`Colors/Surface/Transparent/60`) until Oct 2026; it now applies as soon as the page starts scrolling, even while the hero is still on screen. Confirmed by inspecting the actual fill/text colors per variant (not guessed) — `onTop`'s logo renders pure white (`Colors/Surface/Default` token, invisible on Figma's own white canvas, which is why it looks "missing" in an isolated screenshot — it's correct, just needs a colored backdrop to see). This is a manual state switch for previewing designs over different backgrounds — it does not auto-trigger from real scroll position in Figma.

## Structure, tokens & known gotchas

Oct 2026: onScroll switched from 60% translucent white to a solid Surface/Default fill; the component description was updated to match. Files that import this component as a library copy (e.g. the Nusantics Landing Page file, node `93:60623`, `remote: true`) keep the old translucent variant until the library is published and the update accepted there.

Oct 2026: flagged in a component audit — D9 was Blocking, description was completely empty (no what-is, no state explanation, no do-not-use pointer to its sibling Dashboard Navbar). Fixed by inspecting both State variants' actual fill/stroke/text-color values to document the mechanism accurately instead of guessing from the variant names alone.

**No code exists anywhere in the monorepo for this component** (confirmed via grep across all libs/apps). The audit flagged an open question worth surfacing before anyone builds it: `nusantics-corporate-website` is the one app in this repo built on MUI, isolated from the shared design system per the monorepo's own architecture rules — confirm whether this component is meant to land there (as a separate MUI build, outside `ui-kit/design-system` scope) or in the shared design system, before starting engineering work.
