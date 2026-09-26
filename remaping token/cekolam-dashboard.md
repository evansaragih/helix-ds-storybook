# cekolam-dashboard (26 colors) — By app · sign-off only

Base URL: https://cekolam.id — PRODUCTION (NO STAGING), LANDING-PAGE ONLY, SAFE TO REVIEW
Source: live artifact screenshot (2026-09-08), tiles p2_004 onward

## / (homepage) — component: src/utils/constant/map-pins.ts (22 colors)

1. `#2a4c51` BACKGROUND · Group Teams — no proposal — confidence Low — TEAM/AVATAR ACCENT
2. `#000` COLOR · Bundling Plan — no proposal — confidence Low — GRADIENT BANNER/CARD
3. `#dc7a3a` COLOR · Group Teams — migrate to cekolam/brand-primary-subtle-pressed (Δ13.5) — confidence Low — TEAM/AVATAR ACCENT
4. `#f0f2f6` BACKGROUND · Component — migrate to nusantics/surface-subtle (Δ8.7) — confidence Low — MARKETING/LANDING PAGE
5. `#061c21` BACKGROUND · Pricing Plan — migrate to shared/brands/linear-tertiary-dark (Δ11.7) — confidence Low — MARKETING/LANDING PAGE
6. `#fef7f1` BACKGROUND · Retail Bundling — migrate to nusantics/surface-subtle (Δ9.2) — confidence Low — MARKETING/LANDING PAGE
7. `#2d2e2f` TEXT · Map Statistic — migrate to causa/icon-onsurface-primary (Δ14.6) — confidence Low — MAP/GEO MARKER
8. `#fcdac0` COLOR · Map Pins — migrate to nusantics/brand-primary-subtle-hover (Δ11.8) — confidence Low — MAP/GEO MARKER
9. `#4597a5` COLOR · Group Teams — no proposal — confidence None — TEAM/AVATAR ACCENT
10. `#367681` BORDER · Exposition — no proposal — confidence None — MARKETING/LANDING PAGE

11. `#ea4c89` TEXT · Contact Us — no proposal — confidence None — THIRD-PARTY BRAND COLOR
12. `#0a66c2` TEXT · Contact Us — no proposal — confidence None — THIRD-PARTY BRAND COLOR
13. `orange-500` BACKGROUND · Bundling Plan — no proposal — confidence None — MARKETING/LANDING PAGE
14. `#e69f2c` BACKGROUND · Home — no proposal — confidence None — GRADIENT BANNER/CARD
15. `#6f8a91` COLOR · Map Pins — no proposal — confidence None — MAP/GEO MARKER
16. `#f47e20` COLOR · Statistic Stats Card — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
17. `#d1d5db` TEXT · Timeline Journey — migrate to nusantics/stroke-subtle (Δ7.5) — decision: **Use proposal** (selected) — confidence Medium — DEMO/PLAYGROUND
18. `#fafafa` BACKGROUND · Testimonial — migrate to nusantics/surface-subtle (Δ5.2) — confidence Medium — DEMO/PLAYGROUND
19. `gray-600` TEXT · Benefit — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND
20. `gray-200` BACKGROUND · Sales — migrate to causa/data-viz-chart-8 (Δ8.8) — confidence Low — DEMO/PLAYGROUND
21. `gray-500` TEXT · Exposition — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND
22. `gray-400` TEXT · Pagination — migrate to text-text-info (nusantics, if brand-adaptive) — confidence None — (continues next tile)

## /id/contact-us — component: src/components/landing-page/hero/contact-us.tsx (2 colors)

23. `#ea4c89` TEXT · Contact Us — no proposal — confidence None — THIRD-PARTY BRAND COLOR
24. `#0a66c2` TEXT · Contact Us — no proposal — confidence None — THIRD-PARTY BRAND COLOR

## /privacy-policy (1 color)

25. `#585a5b` TEXT · Privacy Policy — migrate to nusantics/text-brand-secondary (Δ1.0) — confidence High — MARKETING/LANDING PAGE

## /id/blogs (1 color)

26. `gray-500` TEXT · Blogs — migrate to primitive nusantics-dusty-blue-70 (Δ13.6, context only) — confidence None — DEMO/PLAYGROUND

---
**App total: 26 colors — confirmed complete.**

## Recurring colors across this app
- `#f47e20` (High, →`nusantics/brand-primary-default`) — same recurring color from the other 2 apps, still undecided.
- `#d1d5db` — **already DECIDED** (Use proposal → `nusantics/stroke-subtle`, same color-level decision seen in cekolam-internal-dashboard).
- `gray-500`/`gray-600`/`gray-200`/`gray-400` — same recurring "demo/playground" primitive-only or semantic-code-side proposals seen in the other apps.
- `#ea4c89`, `#0a66c2` — flagged explicitly as **THIRD-PARTY BRAND COLOR** (LinkedIn blue `#0a66c2` is literally LinkedIn's brand color) — should almost certainly be **Keep custom**, not tokenized.

