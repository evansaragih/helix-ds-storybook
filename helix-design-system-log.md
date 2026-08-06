# Helix Design System — Log

Durable narrative record of architecture, audits, and decisions for the Helix
Design System (Storybook + `packages/helix-design-system`, multi-brand:
Nusantics / CeKolam / Causa). Companion to
`.claude/skills/helix-design-system/SKILL.md`, which holds the distilled
ruleset. This file holds the *history* — what we found, what we decided, and
why — so nothing has to be re-derived from scratch next time.

Modeled after `origin-design-system-log.md` (Origin DS), started once Helix
had enough components in production that inconsistency started having a real
cost.

---

## §1 — 2026-08-06: Initial audit (pre-migration baseline)

First pass auditing Helix's actual architecture against the standard Origin
already follows (two-tier tokens, single-source-of-truth icons, enforced
type scale). No components were changed — audit only, findings below are the
baseline to migrate from.

### Token architecture — mostly there, adoption is the gap

`packages/helix-design-system/src/styles/theme.css` already documents a
three-layer model (Primitive → Semantic → Brand mode) and it's a genuinely
good structure: ~15 primitive color ramps, semantic tokens for text/bg/
container/stroke/input/status/shadow, and three `[data-brand]` overrides
(nusantics/cekolam/causa) that only touch the semantic layer. This is
further along than the "we have no tokens" assumption — **the model is
sound, but components don't consistently use it.**

Found via `grep -lE "#[0-9A-Fa-f]{6}" *.tsx` in
`packages/helix-design-system/src/components/`: **45 of 46 component files**
contain raw hex literals. Not all of these are violations — many are
legitimate `var(--color-x, #fallback)` CSS custom-property fallbacks (see
`Pagination.tsx:53`), which is a reasonable defensive pattern. But a real
subset bypasses the token layer outright, e.g. `IconButton.tsx`'s
`destructive` variant hardcodes `bg: '#DC2626'` and `color: '#FFFFFF'`
instead of `var(--color-destructive)` / `var(--color-text-on-primary)`,
sitting right next to sibling variants (`secondary`, `neutral`, `invert`)
that correctly reference semantic vars. Same file, same variant object,
inconsistent discipline.

**Action item:** grep-driven pass per component distinguishing legitimate
`var(x, #fallback)` fallbacks from outright hardcoded values, then rebind
the latter to existing semantic tokens. Should be a zero-visual-diff change
(swapping a literal for the token that already equals that literal) — safe
to do without designer-facing impact, screenshot-diff each component after.

### Icon system — no single source of truth (Origin's biggest structural edge)

No dedicated `Icon` component exists in
`packages/helix-design-system/src/components/`. Icons are imported directly
per-component:

- 28 files import from `lucide-react` (the de facto default)
- 3 files (`Alert.tsx`, `CardMetric.tsx`, `Dropzone.tsx`) import from
  `react-icons` subpackages instead (`react-icons/io5`, `react-icons/bs`,
  `react-icons/ri`, `react-icons/io`, `react-icons/hi`) — likely pulled in
  for exact Figma parity on specific glyphs lucide didn't have (see commit
  `d18d138`, `8c2aa27`).

This is the direct equivalent of Origin's pre-`_Icon Base` state: no
component owns "a glyph at a size in a semantic color," so size and color
are whatever each call site hardcodes inline, and there's no swap-safe
single point of glyph truth. Origin solved this with `_Icon Base` (INSTANCE_SWAP
+ Size + Type props) and `Featured icon` as the only exported wrapper.

**Action item (design + follow-up build task, not urgent):** decide whether
Helix standardizes on `lucide-react` only (likely — react-icons usage is
small and isolated to 3 files) and wrap it in an `Icon` primitive component
with `size`/`color` props bound to semantic tokens, so future components
stop importing icon libraries directly.

### Typography — in good shape

`grep` for hardcoded `fontSize`/`text-[Npx]` in components found only 2
files (`Input.tsx`, `MenuItem.tsx`) with inline pixel font sizes, both small
(10–13px, likely helper/caption text not covered by the current scale).
Everything else routes through the `--text-*` / `--line-height-*` scale
defined in `theme.css`. This is close to Origin's "always use the defined
scale" rule already — no major rework needed here, just close the two gaps
or extend the scale if 10–13px is a real recurring need.

### Component variant architecture — no `cva`, no enforced pattern

`grep -l "cva(" *.tsx` returned **zero** files — no component in Helix uses
`class-variance-authority` despite the Radix + Tailwind stack this is built
on being the standard pairing for it. Variants are hand-rolled per
component (e.g. `IconButton.tsx`'s inline variant-object pattern seen
above). This isn't wrong, but it means there's no shared convention for how
a new component should declare its variants/sizes/states — each one
reinvents the pattern, which is exactly how gaps like the `destructive`
hardcode above happen unnoticed.

**Open question for later, not blocking:** worth standardizing on `cva` (or
formalizing the current hand-rolled variant-object pattern explicitly in
the skill) so new components have one obvious way to declare variants
instead of picking whatever the last component did.

### Versioning / changelog — not yet real

`packages/helix-design-system/package.json` is still `"version": "0.0.1"`.
`src/stories/Changelog.mdx` exists in Storybook but isn't being filled per
change. No semver discipline yet distinguishing invisible token rebinds
(patch) from new components (minor) from visual/API breaks (major).

**Action item:** start versioning releases for real once the token-rebind
migration begins, so devs/designers have a visible record instead of silent
diffs.

### Summary — what's genuinely solid vs. what's the gap

Solid: the token *model* (3-layer, brand-aware, well-documented in
`theme.css` comments), the typography scale, multi-brand theming via
`[data-brand]`.

Gaps vs. Origin: (1) inconsistent token *adoption* in component code, (2)
no icon single-source-of-truth component, (3) no shared variant-declaration
convention, (4) no real versioning/changelog discipline yet.

None of these require touching what designers currently use in Figma —
they're implementation-layer (component code) and process (versioning)
issues, not token/variant/visual-API changes.
