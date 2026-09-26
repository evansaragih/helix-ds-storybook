# operations-portal (18 colors) — By app · sign-off only

Base URL: https://operations-portal.nusanticsresearch.com
Source: live artifact screenshot (2026-09-08), tiles p2_010 onward

## /biomescan/reports (8 colors)

1. `#feeee2` BACKGROUND · Reports — migrate to bg-surface-warning-subtle (causa, if brand-adaptive) — decision: **Different token** (selected) → `Semantics/Colors/Surface/Brand/Primary` — confidence Medium — UI CHROME (OTHER)
2. `#e6e6e6` BACKGROUND · Reports — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE
3. `#1c1c1c` TEXT · Reports — migrate to nusantics/text-primary (Δ11.5) — decision: **Different token** (selected) → `Semantics-Core/Colors/Stroke/Strong` — confidence Low — UI CHROME (OTHER)
4. `#1c3391` TEXT · Reports — no proposal — confidence None — (continues next tile)

5. `#cb0b04` TEXT · Reports — decision: **Assign token** (selected) → `Semantics-Core/Colors/Text/Error` — confidence None — STATUS BADGE
6. `#ffd4d6` BACKGROUND · Reports — no proposal — confidence None — UI CHROME (OTHER)
7. `#faa701` TEXT · Reports — migrate to primitive yellow-50 (Δ14.4, context only) — confidence None — UI CHROME (OTHER)
8. `#d6e4fe` BACKGROUND · Reports — no proposal — confidence None — UI CHROME (OTHER)

## /cekolam (6 colors)

9. `yellow-200` BACKGROUND · Alert Notification — decision: **Assign token** (selected) → `Semantics-Core/Colors/Surface/Warning-Bold` — confidence None — UI CHROME (OTHER)
10. `#cacaca` BORDER · Step — migrate to primitive cekolam-atomic-grey-20 (Δ9.3, context only) — decision: **Different token** (selected) → `Semantics-Core/Colors/Stroke/Subtle` — confidence None — UI CHROME (OTHER)
11. `#f47e20` BACKGROUND · Report — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
12. `gray-800` TEXT · Step — migrate to causa/icon-onsurface-primary (Δ13.1) — confidence Low — CHART/ANALYTICS
13. `gray-900` TEXT · Step — migrate to nusantics/text-primary (Δ10.3) — confidence Low — DEMO/PLAYGROUND
14. `gray-500` TEXT · Report — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

## /manufacturing/kit-code-credits (3 colors)

15. `yellow-200` BACKGROUND · Kit Code Credits — decision: **Assign token** (selected) → `Semantics-Core/Colors/Surface/Warning-Bold` — confidence None — UI CHROME (OTHER)
16. `#123` COLOR · Kit Code Credits — migrate to shared/brands/linear-tertiary-dark (Δ12.7) — confidence Low — DEMO/PLAYGROUND
17. `#125` COLOR · Kit Code Credits — migrate to primitive blue-90 (Δ12.1, context only) — confidence None — DEMO/PLAYGROUND

## /sample/[uuid] [dynamic] (1 color)

18. `gray-600` BORDER · Sample — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND

---
**App total: 18 colors — confirmed complete.**

## Recurring colors
- `#f47e20` — still undecided, High confidence, recurring across every app.
- `#cb0b04`, `#1c1c1c`, `#cacaca`, `yellow-200` — all already DECIDED (color-level), consistent with cekolam-internal-dashboard.
- Standard gray-500/600/800/900 "demo/playground" recurring set.
