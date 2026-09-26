# causa-dashboard (20 colors) — By app · sign-off only

Base URL: https://causa-dashboard.nusanticsresearch.com
Source: live artifact screenshot (2026-09-08), tiles p2_008 onward

## /id (10 colors)

1. `#f0f2f6` BACKGROUND · Causa Dashboard — migrate to nusantics/surface-subtle (Δ8.7) — confidence Low — MARKETING/LANDING PAGE
2. `#21293d` BACKGROUND · Hero — migrate to causa/brand-primary-pressed (Δ10.0) — confidence Low — GRADIENT BANNER/CARD
3. `slate-800` TEXT · Features — migrate to causa/icon-onsurface-primary (Δ12.7) — confidence Low — MARKETING/LANDING PAGE
4. `#8d8d8d` TEXT · Info Section — migrate to primitive cekolam-atomic-grey-40 (Δ1.0, context only) — confidence None — (continues next tile)

5. `green-50` BACKGROUND · Info Section — migrate to primitive nusantics-sustainable-green-0 (Δ8.7, context only) — confidence None — MARKETING/LANDING PAGE
6. `orange-200` BORDER · Features — no proposal — confidence None — MARKETING/LANDING PAGE
7. `orange-500` BACKGROUND · Features — no proposal — confidence None — MARKETING/LANDING PAGE
8. `#5ffa7a` BACKGROUND · Info Section — no proposal — confidence None — GRADIENT BANNER/CARD
9. `#2fbd2d` BACKGROUND · Info Section — no proposal — confidence None — GRADIENT BANNER/CARD
10. `slate-500` TEXT · Features — migrate to primitive nusantics-dusty-blue-70 (Δ5.4, context only) — confidence None — MARKETING/LANDING PAGE

## /order/create (4 colors)

11. `#374563` COLOR · Order Create — migrate to nusantics/data-viz-chart-8 (Δ13.3) — confidence Low — GRADIENT BANNER/CARD
12. `green-50` TEXT · Summary Dialog — migrate to primitive nusantics-sustainable-green-0 (Δ8.7, context only) — confidence None — MARKETING/LANDING PAGE
13. `#d1d5db` TEXT · Lab Selection Dialog — migrate to nusantics/stroke-subtle (Δ7.5) — decision: **Use proposal** (selected) — confidence Medium — DEMO/PLAYGROUND
14. `gray-500` TEXT · Summary Dialog — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /id/registration (2 colors)

15. `red-50` TEXT · Registration Summary Table — no proposal — confidence Low — MARKETING/LANDING PAGE
16. `#21293d` BACKGROUND · Registration — migrate to causa/brand-primary-pressed (Δ10.0) — confidence Low — GRADIENT BANNER/CARD

## /login (2 colors)

17. `#979797` TEXT · Login — migrate to nusantics/text-muted (Δ13.9) — confidence Low — UI CHROME (OTHER)
18. `#1b84ff` TEXT · Login — no proposal — confidence None — CHART/ANALYTICS

## /event-order/[id] [dynamic] (1 color)

19. `red-50` BACKGROUND · Event Order — no proposal — confidence Low — MARKETING/LANDING PAGE

## /order/[id] [dynamic] (1 color)

20. `red-50` BACKGROUND · Order — no proposal — confidence Low — MARKETING/LANDING PAGE

---
**App total: 20 colors — confirmed complete.**

## Recurring colors
- `#d1d5db` — already DECIDED (Use proposal → nusantics/stroke-subtle).
- Standard gray-500/slate-500/green-50 "demo/playground" and primitive-only recurring set, same as other apps.
- `red-50` recurs 3× within this app alone, always "no proposal" — candidate for a dedicated review (possibly a consistent error/alert background that deserves its own semantic token, given how often it shows up with no auto-match).
