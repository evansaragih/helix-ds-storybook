# nusantics-corporate-website (31 colors) — By app · sign-off only

Base URL: https://nusantics.com — PRODUCTION (NO STAGING), LANDING-PAGE ONLY, SAFE TO REVIEW
Source: live artifact screenshot (2026-09-08), tiles p2_001 onward

## /id/product-pipeline — component: src/components/custom/banner-footer-v2.tsx (6 colors)

1. `#585a5b` COLOR · Product Pipeline — migrate to nusantics/text-brand-secondary (Δ1.0) — confidence High — MARKETING/LANDING PAGE
2. `#0c4a6e` BACKGROUND · Product Pipeline — no proposal — confidence None — MARKETING/LANDING PAGE
3. `#e1dc66` COLOR · Product Pipeline — no proposal — confidence None — MARKETING/LANDING PAGE
4. `#63d0ff` COLOR · Product Pipeline — no proposal — confidence None — MARKETING/LANDING PAGE
5. `#e6e6e6` COLOR · Banner Footer V2 — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE
6. `#f47e20` COLOR · Product Pipeline — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## /id/products/[businessUnit] [dynamic] (4 colors)

7. `#585a5b` COLOR · Products — migrate to nusantics/text-brand-secondary (Δ1.0) — confidence High — MARKETING/LANDING PAGE
8. `#bfbfbf` TEXT · Card Content — migrate to primitive neutral-20 (Δ8.7, context only — not auto-resolve) — confidence None — MARKETING/LANDING PAGE
9. `#e6e6e6` COLOR · Banner Footer V2 — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE
10. `#f47e20` COLOR · Products — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## / (homepage) — component: src/styles/theme.ts (4 colors)

11. `#585a5b` TEXT · Theme — migrate to nusantics/text-brand-secondary (Δ1.0) — confidence High(?) — MARKETING/LANDING PAGE

12. `#feecde` COLOR · Theme — migrate to nusantics/surface-destructive-subtle (Δ10.8) — confidence Low — MARKETING/LANDING PAGE
13. `#e6e6e6` BORDER · Theme — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE
14. `#f47e20` COLOR · Theme — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## [component] src/styles/globals.css — no route link (4 colors)

15. `#98d8ef` COLOR · Globals — migrate to cekolam/brand-secondary-subtle-hover (Δ12.7) — confidence Low — MARKETING/LANDING PAGE
16. `#fccaa1` COLOR · Globals — no proposal — confidence None — MARKETING/LANDING PAGE
17. `rgba(0,0,0,0.32)` COLOR · Globals — migrate to primitive black-0 (Δ0.0, context only — not auto-resolve) — confidence None — MARKETING/LANDING PAGE
18. `#f47e20` TEXT · Globals — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)

## /id — component: src/components/custom/banner-footer-v2.tsx (3 colors)

19. `#bfbfbf` TEXT · Card Content — migrate to primitive neutral-20 (Δ8.7, context only) — confidence None — MARKETING/LANDING PAGE
20. `#f2c69c` BACKGROUND · Nusantics Corporate Website — migrate to primitive cekolam-pumkin-orange-20 (Δ11.0, context only) — confidence None — MARKETING/LANDING PAGE
21. `#e6e6e6` COLOR · Banner Footer V2 — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE

## [component] src/styles/react-slick.css — no route link (3 colors)

22. `#fccaa1` COLOR · React Slick — no proposal — confidence None — MARKETING/LANDING PAGE
23. `#f47e20` COLOR · React Slick — migrate to nusantics/brand-primary-default (Δ1.0) — confidence High — UI CHROME (OTHER)
24. `gray-600` TEXT · React Slick — migrate to causa/text-brand-primary (Δ12.2) — confidence Low — DEMO/PLAYGROUND

## /id/products/[businessUnit]/[productCategory]/[productDetail] [dynamic] (2 colors)

25. `#585a5b` TEXT · Accordion — migrate to nusantics/text-brand-secondary (Δ1.0) — confidence High — MARKETING/LANDING PAGE
26. `#e6e6e6` COLOR · Products — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE

## /id/media-coverage — component: src/components/custom/card-content.tsx (2 colors)

27. `#bfbfbf` TEXT · Card Content — migrate to primitive neutral-20 (Δ8.7, context only) — confidence None — MARKETING/LANDING PAGE
28. `#e6e6e6` COLOR · Card Content — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE

## /id/research-collaboration — component: src/components/custom/navigation/footer.tsx (1 color)

29. `#000` COLOR · Footer — no proposal — confidence Low — GRADIENT BANNER/CARD

## [component] src/components/custom/card-content-v2.tsx — no route link (1 color)

30. `#bfbfbf` TEXT · Card Content V2 — migrate to primitive neutral-20 (Δ8.7, context only) — confidence None — MARKETING/LANDING PAGE

## [component] src/components/custom/navigation/navbar.tsx — no route link (1 color)

31. `#e6e6e6` COLOR · Navbar — migrate to nusantics/brand-tertiary-subtle (Δ11.2) — confidence Low — MARKETING/LANDING PAGE

---
**App total: 31 colors transcribed — confirmed complete** (next app in the doc is `cekolam-dashboard`, 26 colors).

## Recurring colors across this app (color-level, decide once, applies everywhere)
- **`#f47e20`** (COLOR/TEXT, High confidence, appears 6×) → auto-proposal `nusantics/brand-primary-default` (Δ1.0). Same color as the ~15× recurring item in cekolam-internal-dashboard — **still undecided there too**. This is the single highest-leverage color across the whole audit so far (21+ occurrences across 2 apps).
- **`#e6e6e6`** (COLOR/BORDER, Low confidence, appears 6×) → auto-proposal `nusantics/brand-tertiary-subtle` (Δ11.2).
- **`#585a5b`** (COLOR/TEXT, High confidence, appears 4×) → auto-proposal `nusantics/text-brand-secondary` (Δ1.0).
- **`#bfbfbf`** (TEXT, appears 4×) → 🔴 PRIMITIVE ONLY, auto-proposal is `primitive neutral-20` (context only, not auto-resolve) — needs a real semantic recommendation, not yet checked against Figma.
- **`#fccaa1`** (COLOR, appears 2×) → no proposal at all.
- **`gray-600`** (TEXT, appears 1×, Low) → auto-proposal `causa/text-brand-primary` (Δ12.2) — same code-side proposal seen repeatedly in cekolam-internal-dashboard.

## Status
This app hasn't been individually cross-checked against real Figma variables yet (unlike cekolam-internal-dashboard, where I did that verification pass). Given `#f47e20` → `nusantics/brand-primary-default` was already confirmed real in Figma (`Semantics/Colors/Surface/Brand/Primary` for BG/COLOR roles, `Semantics/Colors/Text/Brand/Primary` for TEXT roles) during that pass, the same mapping almost certainly applies here too — same underlying design system, same token name.

