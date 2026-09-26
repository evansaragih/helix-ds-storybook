# causa-admin-portal (21 colors) — By app · sign-off only

Base URL: https://causa-admin-portal.nusanticsresearch.com
Source: live artifact screenshot (2026-09-08), tiles p2_006 onward

## /order/[id] [dynamic] (7 colors)

1. `red-50` BACKGROUND · Order — no proposal — confidence Low — MARKETING/LANDING PAGE
2. `#e6e6e6` BACKGROUND · Lab Selection — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE
3. `#1c1c1c` TEXT · Lab Selection — migrate to nusantics/text-primary (Δ11.5) — decision: **Different token** (selected) → `Semantics-Core/Colors/Stroke/Strong` — confidence Low — UI CHROME (OTHER)
4. `#1c3391` TEXT · Lab Selection — no proposal — confidence None — UI CHROME (OTHER)
5. `#d6e4fe` BACKGROUND · Lab Selection — no proposal — confidence None — UI CHROME (OTHER)

6. `#d1d5db` BORDER · Lab Selection — migrate to nusantics/stroke-subtle (Δ7.5) — decision: **Use proposal** (selected) — confidence Medium — DEMO/PLAYGROUND
7. `gray-500` TEXT · Formatting — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /sample/delivery/[id] [dynamic] (5 colors)

8. `#333` COLOR · Pa Form Template — no proposal — confidence Low — PDF/PRINT TEMPLATE
9. `#000` BORDER · Handover Form Template — no proposal — confidence Low — GRADIENT BANNER/CARD
10. `#dcfce7` COLOR · Helpers — no proposal — confidence None — UI CHROME (OTHER)
11. `#ff8c00` BACKGROUND · Handover Form Template — no proposal — confidence None — PDF/PRINT TEMPLATE
12. `#16a34a` COLOR · Helpers — migrate to primitive green-60 (Δ4.1, context only) — confidence None — DEMO/PLAYGROUND

## /organization — component: src/constants/formatting.tsx (4 colors)

13. `#f47e20` BACKGROUND · Npwp Box — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
14. `gray-200` BORDER · General Info — migrate to causa/data-viz-chart-8 (Δ8.8) — confidence Low — DEMO/PLAYGROUND
15. `gray-500` TEXT · Formatting — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND
16. `gray-400` TEXT · General Info — migrate to text-text-info (nusantics, if brand-adaptive) — confidence None — (continues next tile)

## /service/items (2 colors)

17. `green-50` TEXT · Items — migrate to primitive nusantics-sustainable-green-0 (Δ8.7, context only) — confidence None — MARKETING/LANDING PAGE
18. `#fafafa` TEXT · Items — migrate to nusantics/surface-subtle (Δ5.2) — confidence Medium — DEMO/PLAYGROUND

## /sample/list (2 colors)

19. `gray-600` TEXT · Form Delivery — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND
20. `gray-400` TEXT · Form Delivery — migrate to text-text-info (nusantics, if brand-adaptive) — confidence None — DEMO/PLAYGROUND

## /event-order/[id] [dynamic] (1 color)

21. `red-50` BACKGROUND · Event Order — no proposal — confidence Low — MARKETING/LANDING PAGE

---
**App total: 21 colors — confirmed complete.**

## Recurring colors
- `#1c1c1c` — already DECIDED (Different token → Semantics-Core/Colors/Stroke/Strong), consistent with other apps.
- `#d1d5db` — already DECIDED (Use proposal → nusantics/stroke-subtle), consistent.
- `#f47e20` — still undecided, High confidence, same recurring color across every app so far.
- Standard "demo/playground" gray-200/400/500/600 recurring set, same as other apps.
