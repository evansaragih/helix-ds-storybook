# Primitive Color Resolution — full transcription index

Source: live artifact "Primitive Color Resolution" (`https://claude.ai/code/artifact/b23fca44-2ab4-458d-8c6e-508c4d6194db`), mode **"By app · sign-off only"**, screenshot-transcribed 2026-09-08 (the live link itself isn't readable by this account — see PDF screencapture in project root).

Global stats (from doc header): 263 unique colors, 1355 total occurrences, 81 resolved automatically, 13 need sign-off, 169 open decisions, 15 cross-brand policy calls. Only 6/263 had a decision picked at time of capture. Doc footer: *"Generated from a one-time static scan on 2026-09-04 — re-run after apps/features change materially."*

## Files (in document order)

| File | App | Colors | Notes |
|---|---|---|---|
| [cekolam-internal-dashboard.md](cekolam-internal-dashboard.md) | cekolam-internal-dashboard | 141 | Full Figma-variable verification pass done — see its own Quick Answer table + Semantics-Core migration notes |
| [nusantics-corporate-website.md](nusantics-corporate-website.md) | nusantics-corporate-website | 31 | Production, landing-page only |
| [cekolam-dashboard.md](cekolam-dashboard.md) | cekolam-dashboard | 26 | Production, landing-page only |
| [causa-admin-portal.md](causa-admin-portal.md) | causa-admin-portal | 21 | |
| [causa-dashboard.md](causa-dashboard.md) | causa-dashboard | 20 | |
| [operations-portal.md](operations-portal.md) | operations-portal | 18 | |
| [nusantics-research-dashboard.md](nusantics-research-dashboard.md) | nusantics-research-dashboard | 14 | Illustration-heavy, likely Keep-custom cluster |
| [iam-portal.md](iam-portal.md) | iam-portal | 5 | Last app in the document |

## Cross-app recurring colors (decide once, applies everywhere)

These are the highest-leverage items — one decision resolves many occurrences at once across the whole codebase, not just one app.

| Color | Total occurrences (est.) | Apps seen in | Proposal | Status |
|---|---|---|---|---|
| **`#f47e20`** | ~25+ | cekolam-internal-dashboard (~15×), nusantics-corporate-website (6×), cekolam-dashboard, causa-admin-portal, operations-portal | `nusantics/brand-primary-default` (Δ1.0, High) → Figma-verified: `Semantics/Colors/Surface/Brand/Primary` (BG) or `Semantics/Colors/Text/Brand/Primary` (TEXT) | ❌ **Still undecided** — single highest-priority open decision in the whole audit |
| `#cb0b04` | 6+ | cekolam-internal-dashboard, operations-portal | — | ✅ DECIDED: Assign token → `Semantics-Core/Colors/Text/Error` (verified correct) |
| `#1c1c1c` | 4+ | cekolam-internal-dashboard, causa-admin-portal, operations-portal | `nusantics/text-primary` | ✅ DECIDED: Different token → `Semantics-Core/Colors/Stroke/Strong` (verified correct) |
| `#d1d5db` | 4+ | cekolam-internal-dashboard, cekolam-dashboard, causa-admin-portal, causa-dashboard | `nusantics/stroke-subtle` | ✅ DECIDED: Use proposal (color-level) |
| `#cacaca` | 2+ | cekolam-internal-dashboard, operations-portal | primitive only | ✅ DECIDED: Different token → `Semantics-Core/Colors/Stroke/Subtle` (verified correct, matches my independent recommendation) |
| `#feeee2` | 2+ | cekolam-internal-dashboard, operations-portal | `bg-surface-warning-subtle` | ✅ DECIDED: Different token → `Semantics/Colors/Surface/Brand/Primary` |
| `yellow-200` | 2+ | cekolam-internal-dashboard, operations-portal | no proposal | ✅ DECIDED (found in operations-portal): Assign token → `Semantics-Core/Colors/Surface/Warning-Bold` |
| `#e6e6e6` | 6+ | nusantics-corporate-website, causa-admin-portal, operations-portal | `nusantics/brand-tertiary-subtle` (Δ11.2, Low) | ❌ Undecided |
| `#585a5b` | 5+ | nusantics-corporate-website, cekolam-dashboard | `nusantics/text-brand-secondary` (Δ1.0, High) | ❌ Undecided |
| `gray-600` | 6+ | cekolam-internal-dashboard, nusantics-corporate-website, causa-admin-portal, operations-portal, iam-portal (3×) | `causa/text-brand-primary` (Δ12.2, Low) | ❌ Undecided |
| `gray-200` | 5+ | cekolam-internal-dashboard, cekolam-dashboard, causa-admin-portal, nusantics-research-dashboard | `causa/data-viz-chart-8` (Δ8.8, Low) | ❌ Undecided |
| `gray-500` | 6+ | cekolam-internal-dashboard, cekolam-dashboard (×2), causa-admin-portal (×2), causa-dashboard, operations-portal | primitive only → Figma-verified `Semantics-Core/Colors/Text/Subtlest` | ❌ Undecided |
| `#bfbfbf` | 4× | nusantics-corporate-website only | primitive `neutral-20`, context only | ❌ Undecided, not yet Figma-checked |
| `red-50` | 4× | causa-admin-portal, causa-dashboard (×3) | no proposal | ❌ Undecided — recurs enough it may deserve its own semantic token rather than staying "no proposal" forever |

## Key findings so far

1. **Figma has an active Semantics → Semantics-Core migration in progress.** Tokens with identical values across Nusantics/CeKolam/Causa brand modes are being moved one-by-one into a brand-agnostic `Semantics-Core` collection. Partially migrated (e.g. `Data-viz/Chart-1,2,6,7,8` still in `Semantics` with a naming glitch `Data-viz (!)/Chart-N`, while `Chart-3,4,5` already moved) — worth flagging to the designer as an in-progress cleanup.
2. **Every already-decided item checked so far turned out correct** — initial suspicion of "typos" in the `Semantics-Core/...` prefixes was wrong; re-verification confirmed all of them.
3. **`#f47e20` is the single highest-leverage undecided color** in the entire audit — deciding it once (Use proposal) would resolve 25+ occurrences across at least 5 apps instantly.
4. Several "auto-proposals" are primitives, not semantic tokens — the tool itself flags these as `"context only — not an auto-resolve target"`. Don't mistake these for real recommendations (see cekolam-internal-dashboard.md's Quick Answer table for the full breakdown of which ones are real vs. primitive-only).
