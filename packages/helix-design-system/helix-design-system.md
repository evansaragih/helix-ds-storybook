---
name: helix-design-system
description: >
  Full-stack design system and UX skill for the Helix Design System, shared across the
  Nusantics product family (Nusantics, CeKolam, Causa). Use for: screen design, prototyping,
  component specs, design tokens, color/typography/spacing systems, responsive grids,
  illustrations, data viz, micro-interactions, accessibility audits (WCAG), developer handoff,
  design briefs, UX principles, KPIs, north star vision, pattern library entries, heuristic
  evaluations, design critiques, and design ops. Always use this skill for any Helix design or
  UX work — brand constraints and multi-brand token architecture make it essential even for
  simple requests.
source: https://github.com/evansaragih/helix-design-system
figma: https://www.figma.com/design/GWzBKGr6512AeMOapwgQhj/Nusantics-Design-System
figma-library-key: lk-e3c3dcf508b950cab72ec5aa32e305f72bc08efc54a83d7a9b4637473942570e1eaaeba401d53cc889f6f45f4ad1fc5b46ce2ec1a566d65de2449f672f0225e0
---

# Helix Design System Skill

## Product Context

Nusantics is an Indonesian precision molecular diagnostics and microbiome biotech startup.
Three products share a unified **Helix Design System** (GitHub: `evansaragih/helix-design-system`,
Figma: `Nusantics-Design-System`, fileKey `GWzBKGr6512AeMOapwgQhj`).

Component specs in this document were verified 2026-07-23 against the published "Nusantics Design
System" Figma library (see `figma-library-key` above). When generating new designs in Figma, search
this library first (`search_design_system`) and reuse/import matching components rather than
inventing new styles — see the `figma-generate-design` skill.

| Product | Brand Persona | Primary Users | Brand Mode |
|---|---|---|---|
| **Nusantics** | Science-forward, clinical trust | Researchers, clinicians | `data-brand="nusantics"` (default) |
| **CeKolam** | Approachable, environmental | Aquaculture farmers, field officers | `data-brand="cekolam"` |
| **Causa** | Modern, analytical | Business analysts, product teams | `data-brand="causa"` |

All products are **website-first, mobile-responsive**.
Surfaces: admin dashboards, customer-facing portals, third-party integrations.

---

## Core Constraints (Always Enforce)

- ALWAYS use CSS custom properties — never hardcode hex values, font sizes, or spacing
- Use semantic tokens (`--color-*`, `--spacing-*`, `--radius-*`) in all components
- Brand switching via `data-brand="nusantics|cekolam|causa"` on root element
- Website-first layout; always define mobile breakpoints
- Follow the exact prop/variant API from `src/components/`
- No external UI libraries — build from Helix primitives only
- No hardcoded values in component specs or rendered code

---

## Token Architecture (3 Layers)

Source: `src/styles/theme.css`

### Layer 1 — Primitives (`--primitive-*`)
Raw color ramps. Never reference directly in components. Always go through a semantic token.

| Palette | Steps |
|---|---|
| `--primitive-orange-*` | 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 |
| `--primitive-cekolam-primary-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-teal-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-denim-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-slate-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-steel-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-olive-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-charcoal-*` | 0, 10, 30, 50, 60, 70, 80, 90 |
| `--primitive-neutral-*` | 0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100 |
| `--primitive-green/red/blue/yellow-*` | 0–100 |
| `--primitive-black` / `--primitive-white` | — |

### Layer 2 — Semantics (`--color-*`)
Purpose-named tokens. Always use these in components.

```
/* Text */
--color-text-primary:    #14141E   (body text)
--color-text-secondary:  #49494A   (subtitles)
--color-text-tertiary:   #828282   (captions)
--color-text-muted:      #9F9F9F   (disabled)
--color-text-on-primary: #FFFFFF   (on dark/colored surfaces)
--color-text-error:      #EF4444
--color-text-success:    #12843C
--color-text-warning:    #A66800
--color-text-info:       #014CC5
--color-text-brand-primary / secondary / tertiary  [brand-aware]

/* Backgrounds */
--color-bg-page: #FFFFFF  |  --color-bg-subtle: #EEEEEE
--color-bg-hover: #EEEEEE  |  --color-bg-inverse: #14141E
--color-bg-secondary: #F5F5F5

/* Containers */
--color-container-primary:    #FFFFFF
--color-container-secondary:  #F7F7F7
--color-container-tertiary:   #EEEEEE
--color-container-disabled:   #D7D7D7

/* Stroke / Border */
--color-stroke-default:   #D7D7D7
--color-stroke-subtle:    #EEEEEE
--color-stroke-hover:     #9F9F9F
--color-stroke-strong:    #49494A
--color-stroke-error:     #DC2626
--color-stroke-success:   #22C55E
--color-stroke-info:      #3B82F6
--color-stroke-neutral-20: rgba(255,255,255,0.2)   (inner border on solid buttons)

/* Input States */
--color-input-bg-default / hover / focus / disabled / error / success
--color-input-border-default / hover / focus* / error / success / disabled
--color-input-text-default / placeholder / disabled / error
(*focus is brand-aware)

/* Status Surfaces */
--color-status-brand-bg:    [brand-aware]
--color-status-error-bg:    #FEE2E2
--color-status-success-bg:  #E9F9EF
--color-status-warning-bg:  #FEF5E7
--color-status-info-bg:     #EBF2FE

/* Brand Tokens [brand-aware — resolved by data-brand] */
--color-brand-primary / hover / pressed
--color-brand-secondary / hover / pressed
--color-brand-tertiary / hover / pressed
--color-brand-primary-ring              (focus ring, 70% opacity)
--color-brand-primary-ghost-hover/focus
--color-destructive / hover / pressed   (NOT brand-aware, always #DC2626)
--color-btn-neutral / hover / pressed / border / text
--color-btn-invert / hover / pressed / border
--color-btn-disabled-bg / text
--color-shadow-brand-primary / secondary / tertiary

/* Shadows */
--shadow-sm / --shadow / --shadow-md / --shadow-lg
--color-shadow-neutral: rgba(0,0,0,0.08)
--color-overlay-black:  rgba(0,0,0,0.5)
--color-overlay-white:  rgba(255,255,255,0.1)
```

### Layer 3 — Brand Modes

| Token | Nusantics | CeKolam | Causa |
|---|---|---|---|
| `--color-brand-primary` | `#F57E20` | `#EB7323` | `#F57E20` |
| `--color-brand-secondary` | `#58595B` | `#089AAA` | `#434F6A` |
| `--color-brand-tertiary` | `#476142` | `#2B485E` | `#A4B8C4` |
| `--color-input-border-focus` | `#F57E20` | `#EB7323` | `#F57E20` |
| `--color-status-brand-bg` | `#FEF2E9` | `#FEF3EC` | `#FEF2E9` |

---

## Typography

```
--font-family-heading: 'Quicksand', sans-serif  (h1-h6, display)
--font-family-body:    'Rubik', sans-serif       (all other text)
--font-weight-regular: 400 / medium: 500 / semibold: 600 / bold: 700
--letter-spacing-default: -0.01em
```

| Token | Size | Usage |
|---|---|---|
| `--text-display-hero` | 76px | Hero |
| `--text-display-large` | 61px | Large display |
| `--text-heading-page-title` | 49px | h1 |
| `--text-heading-section-title` | 39px | h2 |
| `--text-heading-card-title` | 31px | h3 |
| `--text-heading-sub-section` | 25px | h4 |
| `--text-body-large` | 20px | Lead body |
| `--text-body-default` | 16px | Body |
| `--text-body-small` | 13px | Small/helper |
| `--text-caption-badge` | 10px | Badge labels |
| `--text-micro-legal` | 8px | Legal/micro |

Line heights: `--line-height-{size}` paired token (e.g. `--line-height-16` = 19.2px for 16px body).

---

## Spacing, Radius & Breakpoints

```
/* Spacing scale */
--spacing-0/2/4/6/8/12/16/20/24/32/40/48/64/80/96

/* Border Radius */
--radius-none: 0    --radius-xs: 2px   --radius-sm: 4px
--radius-md: 6px    --radius-lg: 8px   (inputs, dashboard buttons)
--radius-xl: 12px   --radius-2xl: 16px (cards, sheets, dialogs)
--radius-3xl: 24px  (dropdowns, popovers)
--radius-full: 9999px (landing page buttons, pills)

/* Breakpoints */
--container-sm: 640px  --container-md: 768px
--container-lg: 1024px  --container-xl: 1280px  --container-2xl: 1536px
```

---

## Keyframe Animations (defined in theme.css — do not redefine)

```
badge-spin    0.75s linear — spinner in Button, Badge
toast-in      opacity 0→1 + translateY(12px→0)
toast-out     opacity 1→0 + translateY(0→12px)
trace-border  SVG stroke-dashoffset reveal — floating Input focus border
```

---

## Component Library — 43 Components

All exported from `src/components/index.ts`.
Radix UI used internally: Accordion, Select, Tabs, Tooltip, Dialog.

---

### Button

```tsx
type ButtonVariant =
  'primary' | 'secondary' | 'tertiary' | 'destructive' | 'neutral' | 'invert' |
  'ghost-neutral' | 'ghost-brand' |
  'primary-outline' | 'secondary-outline' | 'tertiary-outline' |
  'primary-subtle' | 'neutral-subtle'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

props: variant='primary', size='sm', loading, leadingIcon, trailingIcon, pill, disabled
```

| Size | Height | Font | Radius |
|---|---|---|---|
| xs | 24px | 11px | 6px |
| sm | 36px | 13px | 8px |
| md | 48px | 16px | 8px |
| lg | 58px | 20px | 10px |

Rules:
- Solid variants (primary/secondary/tertiary/destructive/invert): inner highlight `inset 0 0 0 1px rgba(255,255,255,0.2)`
- Focus ring: `0 0 0 3px var(--color-brand-*-ring)`
- Disabled: `--color-btn-disabled-bg` bg + `--color-btn-disabled-text` text; cursor not-allowed
- `pill=true`: border-radius 9999px (landing page context)
- Ghost/outline: transparent bg, uses `--color-brand-*-ghost-hover/focus` on interaction
- Loading: shows `badge-spin` spinner, hides icons and children label
- `primary-subtle`: bg `--color-status-brand-bg` (#FEF2E9), text `--color-brand-primary`, no border, hover bg `#EADFD6`; disabled dims to 50% opacity instead of swapping to the shared disabled tokens
- `neutral-subtle`: frosted-glass style for buttons placed over images/dark surfaces — bg `rgba(255,255,255,0.1)` + `backdrop-filter: blur(2px)`, `1px solid white` border, text `--color-text-secondary` (→ `--color-text-primary` on hover/focus), hover bg `rgba(255,255,255,0.3)`; disabled dims to 50% opacity

---

### IconButton

Icon-only counterpart to Button — maps to Figma's "Buttons / Icon" (square) and "Buttons / Icon Pill" (circle) component sets.

```tsx
type IconButtonVariant = ButtonVariant | 'transparent'
type IconButtonShape = 'square' | 'circle'

props: variant='primary', shape='circle', icon (required), disabled, 'aria-label' (required)
```

Rules:
- Fixed size: 36×36px for both `circle` and `square` shapes — 1:1, no size prop (one size per Figma spec)
- Shares the same variant palette/hover/focus/disabled tokens as `Button`
- `transparent` variant has no border and no idle background — hover/focus states only
- Always requires `aria-label` (no visible text label)

---

### Input

```tsx
type InputSize = 'xs' | 'sm' | 'md' | 'lg'

props: size='md', floating, label, required, secondaryLabel,
       leadingContent, leadingDivider, trailingContent, trailingDivider,
       helperText, error, errorText, showCharCount
```

| Size | Height | Radius | Px |
|---|---|---|---|
| xs | 32px | 6px | 10px |
| sm | 38px | 6px | 12px |
| md | 42px | 8px | 12px |
| lg | 48px | 8px | 16px |

Rules:
- Floating variant: height 56px, label animates from vertical center (font 16px) to top-caption (font 10px) on focus/fill
- Floating focus: SVG `trace-border` animation traces the border path
- Error: bg `--color-input-bg-error`, border `--color-input-border-error`, trailing `AlertCircle` icon
- Focus border: `--color-input-border-focus` (brand-aware)
- Helper text: Rubik 12px `--color-text-tertiary`; error text: `--color-text-error`

---

### Badge

```tsx
type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' |
                   'blue' | 'green' | 'yellow' | 'red' | 'brand-subtle' | 'gray'
type BadgeSize = 'sm' | 'md' | 'lg' | 'xl'

props: label (required), variant='default', size='md', leadingIcon, trailingIcon,
       status (dot), loading (spinner), onClose (× button)
```

| Variant | bg | text |
|---|---|---|
| default | `--color-brand-primary` | `--color-text-on-primary` |
| destructive | `--color-status-error-bg` | `--color-destructive` |
| blue | `--color-status-info-bg` | `--color-text-info` |
| green | `--color-status-success-bg` | `--color-text-success` |
| yellow | `--color-status-warning-bg` | `--color-text-warning` |
| red | `--color-status-error-bg` | `--color-text-error` |
| secondary | `--color-container-secondary` | `--color-text-primary` (border: `--color-brand-secondary`) |
| outline | transparent | `--color-text-primary` (border: `--color-stroke-default 0.5px`) |

---

### Alert

```tsx
type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

props: variant='default', title (required), description, icon (override),
       badge, action, secondaryAction, onClose
```

| Variant | bg | border | icon | action bg | Default Icon |
|---|---|---|---|---|---|
| default | `--color-container-primary` (#FFFFFF) | `--color-stroke-subtle` (#EEEEEE) | `--color-brand-primary` | `--color-brand-primary` | Info |
| info | `--color-status-info-bg` | `--color-stroke-info` (#3B82F6) | `--color-text-info` | `--color-stroke-info` | Info |
| success | `--color-status-success-bg` | `--color-text-success` (#12843C) | `--color-text-success` | `--color-stroke-success` (#22C55E) | CheckCircle2 |
| warning | `--color-status-warning-bg` | `--primitive-yellow-50` (#F59E0B) | `--color-text-warning` | `--primitive-yellow-50` (#F59E0B) | AlertTriangle |
| error | `--color-status-error-bg` | `--color-stroke-error` (#DC2626) | `--color-destructive` | `--color-destructive` | XCircle |

Layout: border-radius 8px, padding 16px, full width.
Icon: 20×20px. Title: Rubik 500 14px. Description: Rubik 400 13px `--color-text-secondary`.
Actions row: `padding-left: 24px` (aligns under the title/description, past the icon), gap 12px, buttons height 36px, `padding: 8px 12px`, `border-radius: 8px`.
- Primary: bg `actionBg`, border `1px solid actionBg`, inner highlight `inset 0 0 0 1px rgba(255,255,255,0.2)`, text `actionText`
- Secondary: transparent bg, `1px solid` variant border, text `--color-text-primary` (not accent-colored)

---

### Accordion

```tsx
type AccordionType = 'single' | 'multiple'
type AccordionStyle = 'default' | 'border' | 'card'

interface AccordionItem { id, title, content: ReactNode, disabled? }
props: items, type='single', accordionStyle='default', defaultValue
```

| Style | Container | Item separation | Trigger bg |
|---|---|---|---|
| default | none | border-bottom `--color-stroke-subtle` | transparent |
| border | `border: --color-stroke-default`, `--radius-lg` | border-bottom `--color-stroke-default` | transparent |
| card | flex-col gap 8px | full border `--color-stroke-subtle` + `--radius-lg` + `--shadow-sm` | `--color-container-primary` |

Trigger: Rubik 400 13px, line-height 19.2px, letter-spacing -0.01px, padding 14px 16px, ChevronDown 16px (rotates via Radix data-state).
Content: Rubik 400 13px `--color-text-secondary`, line-height 19.2px, padding `0 16px 16px`.
Disabled: trigger + icon use `--color-text-muted`.

---

### Select

```tsx
type SelectSize = 'sm' | 'md' | 'lg'
interface SelectOption { value, label, disabled? }
interface SelectGroup { label?, options: SelectOption[] }

props: options, groups (for grouped), value, defaultValue, onValueChange,
       placeholder='Select…', disabled, invalid, size='md',
       label, helperText, errorText, required
```

| Size | Height | Px | Radius |
|---|---|---|---|
| sm | 38px | 12px | 6px |
| md | 42px | 12px | 8px |
| lg | 48px | 16px | 8px |

Trigger: full-width, `--color-input-bg-default`, ChevronDown in `--color-text-tertiary`.
Invalid: border `--color-stroke-error`. Disabled: bg `--color-input-bg-disabled`.
Dropdown: white bg, border-radius 10px, `--shadow`, padding 4px, max-height 320px, z-index 9999.
Group label: Rubik 600 11px uppercase, `letter-spacing: 0.06em`, `--color-text-tertiary`.
Selected indicator: Check 14px in `--color-brand-primary`.

---

### Tabs

```tsx
type TabsStyle = 'primary' | 'line' | 'default'
type TabsSize = 'sm' | 'md'
type TabsType = 'default' | 'white'

interface TabItem { id, label, content?, disabled?, badge?, icon? }
props: items, tabStyle='primary', size='sm', type='default',
       defaultValue, value, onValueChange, renderContent=true, showNavArrows=false
```

| Style | List bg | Active tab | Indicator |
|---|---|---|---|
| primary | `--color-container-tertiary` | solid `--color-brand-primary` bg + white text (or white bg + `--color-text-secondary` if `type="white"`) | none |
| line | transparent | transparent, text `--color-brand-primary` | 2px bottom border brand-primary |
| default | transparent | transparent | none |

Size sm: font 13px, py 6px, px 12px. Size md: font 14px, py 8px, px 16px.
Line-style active color: `--color-brand-primary` (or white if `type="white"`).
Inactive: `--color-text-tertiary`. Disabled: `--color-text-muted`.
Badge count pill: 18px height, radius-full, bg brandColor, font 10px.
`showNavArrows=true`: tab list becomes horizontally scrollable (`overflow-x: auto`, hidden scrollbar) with two 24px circular "Buttons / Icon Pill"-style prev/next buttons (`--color-btn-neutral` bg, `backdrop-filter: blur(2px)`, `--color-stroke-default` border) absolutely positioned at the list's left/right edges, vertically centered — for overflowing tab rows.

---

### Stepper

```tsx
type StepperOrientation = 'horizontal' | 'vertical'
type StepStatus = 'completed' | 'active' | 'pending' | 'error'

interface Step { id, label, description?, status?, icon? }
props: steps, orientation='horizontal', activeStep? (0-based, auto-derives status)
```

Step circle (32×32px, 50% radius):

| Status | bg | border | Content |
|---|---|---|---|
| completed | `--color-text-success` (#12843C) | `--color-text-success` (#12843C) | Check icon, white |
| active | `--color-brand-primary` | `--color-brand-primary` | index number, white |
| pending | `--color-container-tertiary` | `--color-stroke-default` | index number, `--color-text-muted` |
| error | `--color-status-error-bg` | `--color-stroke-error` | icon/index, `--color-text-error` |

Connector: 2px line; `--color-text-success` (#12843C) if step completed, `--color-stroke-subtle` if pending.
Horizontal: connector `flex: 1` between circles with `padding-top: 15px`.
Vertical: connector `width: 2px, flex: 1, minHeight: 24px, margin-left: 15px`.
Label: Rubik 500 when active, 400 otherwise. 12px horizontal, 13px vertical.

---

### Table

```tsx
type TableSize = 'sm' | 'md'
interface Column<T> { key, header, render?, width?, align? }

props: columns, data, size='md', striped, hoverable=true, bordered=true,
       cellBorders, emptyText='No data', getRowKey
```

| Size | Cell py | Font |
|---|---|---|
| sm | 8px | 12px |
| md | 12px | 13px |

Cell px always 16px.
Thead: bg `--color-container-secondary`, Rubik 500, `--color-text-primary`.
Tbody: Rubik 400, `--color-text-secondary`.
Row border-bottom: `--color-stroke-subtle` (except last).
Outer wrapper: `--radius-lg`, border `--color-stroke-subtle`, `overflow: auto`.
Hover row: bg `--color-status-brand-bg` (brand-aware subtle tint). Striped odd rows: `--color-container-secondary`.
Empty state: 32px py, centered, `--color-text-muted`.

---

### Dialog

```tsx
props: open, defaultOpen, onOpenChange, trigger, title, description,
       children (body), footer, size='md', showClose=true
```

| Size | Max width |
|---|---|
| sm | 384px |
| md | 480px |
| lg | 600px |

Overlay: `--color-overlay-black` + `backdrop-filter: blur(2px)`, z-index 9998.
Panel: white, `--radius-lg` (8px), `--shadow-md`, z-index 9999, centered via transform.
Width: `min(sizeWidth, calc(100vw - 32px))` — mobile safe.
Header: padding `20px 24px 16px`, border-bottom `--color-stroke-subtle`.
Close button: 28×28px, borderless, transparent bg.
Body: padding `16px 24px`.
Footer: padding `12px 24px 20px`, border-top `--color-stroke-subtle`, `justify-content: flex-end`, gap 8px.
Title: Rubik 500 16px. Description: Rubik 400 13px `--color-text-secondary`.

---

### Tooltip

```tsx
props: content, children (trigger), side='top', align='center',
       sideOffset=6, delayDuration=400, variant='dark', disabled

export const TooltipProvider = RadixTooltip.Provider  // wrap app root
```

| Variant | bg | text | border | shadow |
|---|---|---|---|---|
| dark | `#59595A` (neutral) | white | none | none |
| light | white | `--color-text-primary` | `--color-stroke-subtle` | `--shadow-sm` |

Padding: `6px 10px`, `--radius-md`, Rubik 400 13px/19.2px, max-width 240px.
Arrow fill matches bg. Wrap app in `<TooltipProvider>` to enable.

---

### Card

```tsx
props: header, footer,
       elevation='sm' ('none'|'sm'|'default'|'md'),
       padding='md' ('none'|'sm'|'md'|'lg'),
       bordered=false, hoverable=false
```

| Padding | px |
|---|---|
| none | 0 |
| sm | 12px |
| md | 16px |
| lg | 24px |

Container: `--color-container-primary`, `--radius-lg` (8px), no outer border by default — shadow-only, matching Figma's "Content Container" (`bordered` opts back into a `--color-stroke-subtle` outline for cases that need one).
Header: padding `pad × pad × pad/2`, border-bottom `--color-stroke-subtle`.
Footer: padding `pad/2 × pad × pad`, border-top, bg `--color-container-secondary`.
Hoverable: `translateY(-1px)` + elevates to `--shadow` on hover.
Sub-components: `CardHeader` (mb 12px), `CardTitle` (Rubik 500 16px), `CardDescription` (Rubik 400 13px `--color-text-secondary`).

---

### ContentContainer

Matches Figma's "Content Container" (node 233:17314) — "Metrics cards, feature cards, custom layouts".

```tsx
props: title, description, leadingIcon, badgeLabel, badgeVariant='blue',
       headerContent (full header override), showActionButton=true, actionIcon, onActionClick,
       padding='md' ('none'|'sm'|'md'|'lg')
```

Container: `--color-container-primary`, `--radius-lg` (8px), two-layer drop-shadow (`0px 1px 2px rgba(0,0,0,.04)` + `0px 1px 3px rgba(0,0,0,.08)`), no border — shadow-only.
Header: 16px padding all sides, border-bottom `--color-stroke-subtle`, only rendered if title/description/badgeLabel/headerContent is given.
Header content slot (default): 32×32 leading icon tile (`--color-status-brand-bg` bg, brand-primary color) + title (Rubik 500 16px) + description (Rubik 400 13px secondary) + optional Badge, all in one row.
Action button: `IconButton` (`shape="square"`, `variant="primary-outline"`), right-aligned, hidden via `showActionButton={false}`.
Body: rendered only if children given, padding per `padding` prop, `flex-col gap-12`.
Reach for `Card` instead when you don't need the opinionated icon/title/description/badge header composition.

---

### Switch

```tsx
props: checked, defaultChecked, disabled, invalid, onCheckedChange,
       label, helperText, size='md' ('sm'|'md')
```

| Size | Track W×H | Thumb | Offset |
|---|---|---|---|
| md | 44×24px | 18px | 3px |
| sm | 36×20px | 14px | 3px |

Track bg states: disabled→`--color-container-disabled`; invalid→`--color-status-error-bg`; checked→`--color-brand-primary`; hover→`--color-bg-subtle`; default→`--color-container-tertiary`.
Border: invalid→`--color-stroke-error`; checked→brand-primary; default→`--color-stroke-default`.
Thumb: white (checked), `--color-text-tertiary` (unchecked), `--color-text-muted` (disabled).
Thumb animation: `translateX(thumbTravel)` via `cubic-bezier(0.4,0,0.2,1) 0.2s`.

---

### Checkbox

```tsx
props: checked (bool|'indeterminate'), onChange, label, description,
       size='Medium' ('Medium'|'Small'), align='Left' ('Left'|'Right'),
       invalid, disabled
```

| Size | Box | Icon |
|---|---|---|
| Medium | 20×20px | 14px |
| Small | 16×16px | 14px |

bg/border states: disabled (checked or unchecked)→bg+border `--color-input-bg-disabled`; invalid+checked→`--color-destructive`; checked→`--color-brand-primary`; hover→border `#9F9F9F` + bg `rgba(0,0,0,0.02)`; default→transparent/`--color-input-border-default`.
Focus ring: `0 0 0 3px rgba(245,126,32,0.2)` (or red if invalid).
Indeterminate: renders `Minus` icon instead of `Check` (strokeWidth 3).
Hidden native `<input type="checkbox">` for accessibility.

---

### RadioButton & RadioGroup

```tsx
interface RadioButtonProps {
  label?, helperText?, invalid, size='md' ('sm'|'md'),
  disabled, checked, onChange
}

interface RadioGroupProps {
  name, value?, defaultValue?, onChange?, children (RadioButton nodes)
}
```

| Size | Circle | Dot |
|---|---|---|
| md | 20×20px | 8px |
| sm | 16×16px | 6px |

Border 2px; states: disabled→`--color-stroke-default`; invalid→`--color-stroke-error`; checked/focused→`--color-brand-primary`; hovered→`--color-stroke-hover`; default→`--color-stroke-default`.
Bg: checked→`--color-brand-primary`; disabled→`--color-container-disabled`; else white.
Inner dot: white (checked), `--color-text-muted` (disabled+checked).
Focus ring: `0 0 0 3px var(--color-brand-primary-ring)`.
RadioGroup: `role="radiogroup"`, flex-col gap 8px, auto-wires name/checked/onChange to children.

---

### ProgressBar

```tsx
type ProgressLabelType = 'none' | 'title' | 'trailing' | 'top-floating' | 'bottom-floating' | 'within'

props: value (0-100), max=100, labelType='none', label,
       color='--color-brand-primary', trackColor='--color-container-tertiary',
       height=8, animated, showPercent=true
```

| labelType | Layout |
|---|---|
| none | track only |
| title | label + percent row above track, `gap: 8px` |
| trailing | track + percent inline right, `gap: 12px` |
| top-floating | pill badge above track |
| bottom-floating | pill badge below track |
| within | percent inside fill (when pct > 8%) |

Track: radius-full, overflow hidden. Fill: animated `width 0.4s ease` if animated=true.
Label/percent text (title, trailing): Rubik 400 13px/19.2px `--color-text-primary`.
Floating pills (top/bottom-floating): `--color-container-primary` (#FFFFFF) bg, `0.5px solid --color-stroke-subtle` border, `border-radius: 9999px`, `padding: 2px 6px`, text Rubik 400 10px/15.6px `--color-text-primary`.
Within-fill label: Rubik 400 10px/15.6px white, centered vertically inside the fill.

---

### Avatar

```tsx
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'
type AvatarShape = 'circular' | 'rounded'
type AvatarContent = 'image' | 'icon' | 'placeholder'

props: size='md', shape='circular', content='placeholder',
       src, alt, initials (max 2), name (auto-derives initials), icon
```

| Size | px | Font | Icon | Rounded radius |
|---|---|---|---|---|
| xs | 26 | 13px | 12 | 8px (`--radius-lg`) |
| sm | 38 | 13px | 14 | 8px (`--radius-lg`) |
| md | 48 | 20px | 18 | 8px (`--radius-lg`) |
| lg | 58 | 20px | 22 | 8px (`--radius-lg`) |

Circular: radius-full. Placeholder bg: `--color-brand-primary`, white Rubik 500 text.
Icon bg: `--color-container-tertiary`, icon `--color-text-tertiary`.
Image: object-fit cover. Initials derived: first char of first + last word in name.

---

### AvatarGroup

```tsx
interface AvatarGroupItem { id: string | number; name?: string; src?: string; alt?: string }

props: items (required), size='sm' ('xs'|'sm'|'md'), max, showAddButton, addButtonShape='circle' ('circle'|'square'), onAddClick
```

Rules:
- Avatars overlap with a negative `margin-left`; each carries a `0 0 0 2px var(--color-surface)` ring to separate it from its neighbor
- `max` collapses remaining avatars into an orange "+N" circle styled to match the avatar size
- `showAddButton` appends a dashed-outline button (circle or square) for an add-member action
- Sizes: `xs`/`sm`/`md` only (no `lg` — matches Figma's Avatar Group component set)

### AvatarLabelGroup

```tsx
type AvatarLabelGroupSize = 'sm' | 'md' | 'lg' | 'xl'

props: name (required), email, src, size='md'
```

Pairs a single `Avatar` with a bold name and muted email — use to identify one specific person (comment authors, assignee rows), not headcount.

---

### Divider

```tsx
props: orientation='horizontal' ('horizontal'|'vertical'),
       type='line' ('line'|'dash'),
       label, labelAlign='center' ('left'|'center'|'right'),
       color='--color-stroke-subtle', thickness=1
```

Horizontal: full width, `border-bottom`.
Vertical: `align-self: stretch`, `border-left`.
Labeled: flex row with span borders + label text (Rubik 12px `--color-text-tertiary`).
Always include `role="separator"` + `aria-orientation`.

---

### Pagination

```tsx
props: total, pageSize=10, page (controlled), defaultPage=1,
       onPageChange, siblingCount=1, showFirstLast=false, showRowsPerPage=false,
       pageSizes=[10,25,50,100], onPageSizeChange
```

Buttons: 36×36px min, border-radius 8px, Rubik 13px, font 400 (weight never changes on active).
Active: bg `--color-brand-primary`, white text, border `--color-brand-primary`, dual drop/inset shadow.
Inactive: transparent bg, `--color-text-secondary`.
Hover (inactive): bg `--color-container-tertiary`.
Disabled nav: `--color-text-muted`. Ellipsis: `MoreHorizontal` icon, non-interactive.
Smart page range: shows `[1, ..., siblings around current, ..., last]`.
Rows-per-page select (when `showRowsPerPage`): border `--color-input-border-default`, `border-radius: 8px`, padding `6px 12px`.

---

### AlertDialog

```tsx
type AlertDialogVariant = 'default' | 'destructive' | 'info'

interface AlertDialogAction { label: string; onClick: () => void; loading?: boolean }
interface AlertDialogCheckboxAction { label: ReactNode; checked: boolean; onChange: (checked: boolean) => void }

props: open (required), variant='default', title (required), description,
       icon (override), confirmAction (required), cancelAction, onClose (required),
       size='md' ('sm'|'md'), checkboxAction
```

| Variant | Icon bg | Icon color | Default Icon |
|---|---|---|---|
| default | `--color-brand-primary-ghost-hover` (`#FEF2E9`) | `--color-brand-primary` | Info |
| destructive | `#FEE2E2` | `--color-destructive` | Trash2 |
| info | `#EBF2FE` | `--color-text-info` | AlertTriangle |

| Size | Max width | Body padding | Title font | Action padding |
|---|---|---|---|---|
| sm | 360px | `24px 24px 0` | 16px/24px line-height | `20px 24px 24px` |
| md | 440px | `32px 32px 0` | 16px/24px line-height | `24px 32px 32px` |

Rules:
- Overlay: `rgba(0,0,0,0.4)` + `backdrop-filter: blur(2px)`, `role="alertdialog"`, z-index 1000, click-outside and Escape both call `onClose`
- Panel: white, `border-radius: 8px`, `box-shadow: 0px 24px 48px rgba(0,0,0,0.12)`
- Icon container: 40×40px, `border-radius: 8px`, bg per variant
- Title: `--font-family-heading` 500
- Description: Rubik 400 13px/19.2px `--color-text-secondary`
- Actions row: `flex-direction: row-reverse`, gap 8px — confirm renders first (rightmost)
- confirmAction uses `Button` `variant="destructive"` when `variant="destructive"`, else `variant="primary"`; cancelAction uses `variant="neutral"`; both `size="sm"`
- confirmAction supports `loading` (passed straight to `Button`'s loading state)
- `checkboxAction` (e.g. "Don't show this again"): renders a `Checkbox` (`size="Small"`) at the start of the actions row, which switches to `justify-content: space-between` to pin it left of the Cancel/Confirm group

---

### Breadcrumb

```tsx
interface BreadcrumbItem { label, href?, onClick? }

props: items (required), separator (override, default ChevronRight), size='md' ('sm'|'md')
```

| Size | Font | Icon |
|---|---|---|
| sm | 12px/18px | 8px |
| md | 13px/19.2px | 10px |

Rules:
- `<nav aria-label="Breadcrumb">` wrapping an `<ol>`, gap 4px between items
- Last item: `aria-current="page"`, Rubik 400, `--color-text-primary`, no link
- Non-last items: `<a>`, Rubik 400, `--color-text-tertiary`, hover → `--color-brand-primary`
- Separator: `ChevronRight` `strokeWidth: 1.5` in `--color-text-tertiary` between items (not after last)

---

### Carousel

```tsx
interface CarouselItem { id: string | number; content: ReactNode }

props: items (required), visibleCount=1 (1|2|3|4), autoPlay=0 (ms, 0=disabled),
       showArrows=true, showDots=true, gap=16
```

Rules:
- Track: `overflow: hidden`, slides in a flex row, `transition: transform 0.4s cubic-bezier(0.4,0,0.2,1)`
- Slide width: `calc((100% - (visibleCount-1)*gap) / visibleCount)`
- Arrows: 36×36px circle, inset 16px from edge, bg `--color-btn-invert` (`#59595A`) with `backdrop-filter: blur(2px)`, border `rgba(255,255,255,0.2)`, icon white 14px; disabled at bounds (`opacity: 0.4`, `cursor: not-allowed`) — not looping via arrows
- autoPlay loops back to index 0 once past `maxIndex` (`items.length - visibleCount`)
- Dots: 12px circle default, active dot widens to 40px (pill) at 12px height, `border-radius: var(--radius-3xl, 24px)`, active bg `--color-brand-primary`, inactive bg `--color-status-brand-bg` (`#FEF2E9`); `transition: width 0.3s ease, background-color 0.2s`; only rendered when `maxIndex > 0`
- Dots are absolutely positioned `bottom: 12px` inside the track, overlapping the bottom edge of the slide content (matches Figma) — not a separate row below the track

---

### CardMetric

```tsx
type MetricTrend = 'up' | 'down' | 'neutral'
interface CardMetricFooterAction { label: string; onClick: () => void }

props: label (required), value (required, string|number), unit, trend, trendValue,
       trendLabel, icon, accentColor='var(--color-brand-primary, #F57E20)', description,
       onMoreClick, chart, footerAction, floatingIcon
```

| Trend | Color | bg | Icon |
|---|---|---|---|
| up | `--color-text-success` | `#E9F9EF` | TrendingUp |
| down | `--color-destructive` | `#FEE2E2` | TrendingDown |
| neutral | `--color-text-tertiary` | `#F7F7F7` | Minus |

Rules:
- Container: `--color-container-secondary` (#F7F7F7), no border, `--shadow-sm`, `border-radius: 8px`, padding 16px, flex-col gap 12px
- Label: Rubik 500 13px/19.2px `--color-text-secondary`, `letter-spacing: -0.01px`
- Icon well: 36×36px, `border-radius: 8px`, bg = `accentColor` at ~9% alpha (`${accentColor}18`), icon color = `accentColor`
- Value: `--font-family-heading` 700 25px/30px `--color-text-primary`, `letter-spacing: -0.01px`; unit inline Rubik 400 16px `--color-text-secondary`
- Trend pill: inline-flex, `padding: 2px 6px`, `border-radius: 9999px` (pill), bg per trend, icon 14px + Rubik 400 10px trendValue in trend color
- `trendLabel` (or fallback `description`): Rubik 400 13px/19.2px `--color-text-tertiary`, rendered beside the trend pill
- `onMoreClick`: renders a borderless 24×24px overflow button (`MoreHorizontal`, `--color-text-tertiary`) in the header, after the icon well
- `chart`: bordered slot below the trend row — white bg, `0.5px solid --color-stroke-subtle`, `border-radius: 12px`, `height: 210px`
- `footerAction`: renders a `1px dashed --color-stroke-subtle` divider then a full-width "label + `ArrowRight`" link row (Rubik 400 13px `--color-text-secondary`, `justify-content: space-between`)
- `floatingIcon`: decorative 64×64px circular badge floating over the top-right corner (`top:-9px; right:-9px`), `rgba(255,255,255,0.2)` bg + `backdrop-filter: blur(2px)`, icon bottom-aligned inside 20px padding

---

### ComparisonTable

```tsx
type CellValue = boolean | 'partial' | string | number | ReactNode

interface ComparisonColumn { key, label, highlighted?, badge? }
interface ComparisonRow { feature, group?, values: Record<string, CellValue> }

props: columns (required), rows (required), featureLabel='Feature', stickyHeader=false
```

Rules:
- Outer wrapper: `overflow-x: auto`, `border-radius: 12px`, border `--color-stroke-subtle`
- Table: `border-collapse: collapse`, `table-layout: fixed`; feature column fixed at 20% width, remaining columns split `80% / columns.length` evenly
- Header cells: `padding: 16px 20px`, Rubik 500 12px uppercase `letter-spacing: 0.5px` `--color-text-tertiary`, bg `--color-container-secondary`, border-bottom `--color-stroke-subtle`
- Highlighted column header: text `--color-brand-primary`, bg `--color-brand-primary-ghost-hover`, plus left border `--color-stroke-subtle`
- Column badge: `padding: 2px 8px`, `border-radius: 20px`, bg `--color-brand-primary` (highlighted) or `#E0E0E0`, Rubik 500 11px/16px
- Cell value rendering: `true` → `Check` 18px `--color-text-success`; `false` → `X` 18px `--color-text-tertiary`; `'partial'` → `Minus` 18px `--color-text-warning`; else raw string/node in Rubik 400 13px/19.2px `--color-text-primary`
- Highlighted column cells: bg `rgba(245,126,32,0.04)`
- Group rows: full-width `colSpan` cell, Rubik 600 11px uppercase `--color-text-tertiary`, bg `--color-container-secondary`
- `stickyHeader=true`: header `position: sticky, top: 0`

---

### DatePicker

```tsx
type DatePickerMode = 'date' | 'range' | 'month' | 'year'

props: value, onChange, rangeStart, rangeEnd, onRangeChange, mode='date',
       placeholder, disabled, minDate, maxDate, label, error
```

Rules:
- Trigger: height 40px, `padding: 0 12px`, `border-radius: 8px`, min-width 200px, Calendar icon 16px `--color-text-tertiary`
- Border: `--color-destructive` (error) → `--color-brand-primary` (open) → `--color-stroke-subtle` (default); disabled bg `--color-container-secondary`, `cursor: not-allowed`
- Focus/open ring: `outline: 3px solid var(--color-brand-primary-ring, rgba(245,126,32,0.2))`
- Clear button (X, 14px) shown only when a value is set and not disabled
- Error text: Rubik 12px/18px `--color-destructive`, below trigger
- Calendar panel: absolute, `top: calc(100% + 4px)`, white bg, border `--color-stroke-subtle`, `border-radius: var(--radius-md, 6px)`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.10)`, padding 12px, min-width 280px, z-index 300
- Month nav label: Rubik 400 13px `--color-text-primary`; day headers: Rubik 400 13px `--color-text-tertiary`
- Day cell: `aspect-ratio: 1`, `border-radius: var(--radius-md, 6px)`, Rubik 400 13px
- Selected/range-endpoint day: bg `--color-brand-primary`, white text. In-range day and today (not active): bg `--color-status-brand-bg` (`#FEF2E9`), `--color-text-primary` text. Disabled day (outside min/maxDate): `#D7D7D7`, `cursor: not-allowed`
- Range mode: first click sets `rangeStart` with null end; second click resolves start/end by date order and closes the panel; non-range modes close on select
- Closes on outside click (mousedown) and has no Escape handler

---

### Dropzone

```tsx
interface DropzoneFile { file: File; id: string }

props: accept, multiple=false, maxSize (bytes), disabled=false, error=false,
       errorText, label, helperText, onFilesChange
```

Rules:
- Label: Rubik 400 13px/19.2px, `--color-text-primary` (or `--color-text-disabled` `#929292` when disabled)
- Drop zone: `padding: 32px 24px`, `border-radius: var(--radius-lg, 8px)`, `border: 1.5px dashed`
- Border color: disabled → `--color-stroke-subtle`; error (prop or oversized file) → `--color-destructive`; drag-over → `--color-brand-primary`; default → `--color-stroke-default`
- Background: disabled → `--color-container-secondary`; drag-over → `--color-status-brand-bg` (`#FEF2E9`); default → `#FFFFFF`
- Icon well: 48×48px, `border-radius: 12px`, border/bg brand-tinted on drag-over (`rgba(245,126,32,0.08)`), `UploadCloud` 22px
- Title copy: "Drop to upload" while dragging, else "Drag & drop your file here" — Rubik 500 14px/21px
- Helper row (when not dragging): "or **browse files**" — browse text underlined `--color-brand-primary` (brand-disabled `#929292` when disabled)
- Constraint pills (accept/maxSize): `padding: 2px 8px`, `border-radius: 99px`, border `--color-stroke-subtle`, bg `--color-container-secondary`, Rubik 11px `--color-text-tertiary`
- File rows: `padding: 8px 12px`, `border-radius: 8px`, border `--color-stroke-subtle`, `FileText` icon `--color-brand-primary`, filename Rubik 500 13px, size Rubik 400 11px `--color-text-tertiary`; remove (×) button 24×24px `border-radius: 6px`, hover bg `#F5F5F5`
- Error/helper text row: `AlertCircle` 12px + text 12px/18px, `--color-destructive` when erroring (oversized-file message takes priority over `errorText`) else `--color-text-tertiary`
- `multiple=false` keeps only the first accepted file

---

### EmptyState

```tsx
type EmptyStateVariant = 'default' | 'search' | 'folder' | 'image' | 'file'
interface EmptyStateAction { label, onClick, variant?: 'primary'|'outline' }

props: variant='default', icon (override), title (required), description,
       action, secondaryAction, compact=false
```

| Variant | Icon |
|---|---|
| default | Inbox |
| search | Search |
| folder | FolderOpen |
| image | ImageOff |
| file | FileX |

| | Padding | Icon well | Icon size | Title font |
|---|---|---|---|---|
| default | `64px 24px` | 40×40px | 32px | 16px/24px |
| compact | `32px 24px` | 32×32px | 24px | 14px/21px |

Rules:
- Icon well: `border-radius: var(--radius-lg, 8px)`, bg `--color-status-brand-bg` (`#FEF2E9`), icon `--color-brand-primary` (`#F57E20`)
- Title: Rubik 500, `--color-text-primary`, `max-width: 320px`
- Description: Rubik 400 13px, `line-height: 19.2px`, `letter-spacing: -0.01px`, `--color-text-secondary`, `max-width: 380px`
- Actions row: gap 8px, `margin-top: 24px`; secondaryAction renders first (outline-style, border `--color-stroke-subtle`, transparent bg, `--color-text-primary`)
- action: `variant='outline'` → transparent bg + `--color-brand-primary` border/text; default (filled) → bg `--color-brand-primary`, white text
- Both action buttons: `padding: 8px 16px`, `border-radius: 8px`, Rubik 400 14px

---

### InfoCard

```tsx
type InfoCardVariant = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info'

props: variant='default', title, description, icon, footer,
       action: { label, onClick }, compact=false, onClick
```

| Variant | bg | border | accent |
|---|---|---|---|
| default | `#FFFFFF` | `--color-stroke-subtle` | `--color-text-secondary` |
| brand | `--color-brand-primary-ghost-hover` | `--primitive-orange-10` | `--color-brand-primary` |
| success | `--color-status-success-bg` | `--primitive-green-10` | `--color-text-success` |
| warning | `--color-status-warning-bg` | `--primitive-yellow-20` | `--color-text-warning` |
| error | `--color-status-error-bg` | `--primitive-red-10` | `--color-destructive` |
| info | `--color-status-info-bg` | `--primitive-blue-10` | `--color-text-info` |

Rules:
- Container: `border-radius: 12px`, `border: 1px solid` per variant, `box-sizing: border-box`, `width: 100%`
- Default (non-compact): `flex-direction: column`, `padding: 20px`, gap 16px. Compact: `flex-direction: row`, `align-items: center`, `padding: 12px 16px`, gap 12px
- Icon block: 40×40px `border-radius: 10px` bg = variant border color (non-compact) or bare 20×20px icon (compact), color = `accent`
- Title: Rubik 600, 14px/21px default or 13px/19.2px compact, `--color-text-primary`, `letter-spacing: -0.01px`
- Description: Rubik 400, 13px default / 12px compact, `line-height: 1.6`, `--color-text-secondary`
- Action button (inline): border = variant border color, transparent bg, Rubik 500 13px, text = `accent`
- Footer (non-compact only): `border-top: 1px solid` variant border, `padding-top: 12px`
- `onClick` present → `role="button"`, `tabIndex=0`, `cursor: pointer`, hover adds `box-shadow: 0 2px 12px rgba(0,0,0,0.08)`

---

### Navbar

```tsx
interface NavbarLink { label, href?, active?, onClick? }

props: logo, links=[], actions, showSearch=false, showNotifications=false,
       user: { name, avatar?, initials? }, sticky=false, transparent=false, onMenuClick
```

Rules:
- Bar: height 64px, `padding: 0 24px`, gap 24px, `border-bottom: 1px solid var(--color-stroke-subtle)` (omitted when `transparent`)
- `sticky=true`: `position: sticky, top: 0, z-index: 100`
- `transparent=true`: bg transparent, no border (for hero sections)
- Mobile menu button (shown only if `onMenuClick` passed): 36×36px, `border-radius: 8px`, `Menu` icon 20px `--color-text-secondary`
- Nav links: `padding: 6px 12px`, `border-radius: 8px`, Rubik 14px/21px; active → weight 500, `--color-brand-primary` text, bg `--color-brand-primary-ghost-hover`; inactive → weight 400 `--color-text-secondary`, hover → `--color-text-primary` + bg `--color-container-secondary`
- Search/notification buttons: 36×36px, `border-radius: 8px`, border `--color-stroke-subtle`, transparent bg, icon 16px `--color-text-secondary`
- Notification badge dot: 8px, `border-radius: 50%`, bg `--color-brand-primary`, `2px solid #FFFFFF` ring, positioned top-right
- User block: avatar/initials 36×36px `border-radius: 8px` (image `object-fit: cover`; initials tile bg `--color-brand-primary`, white Rubik 600 14px), name Rubik 500 13px/19.2px `--color-text-primary`
- No links → flexible spacer fills the row instead

---

### Popover

```tsx
type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right' |
                        'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

props: trigger (required), children (required), placement='bottom-start',
       width=300, closeOnOutsideClick=true, open, onOpenChange

// Sub-components: PopoverHeader { title, description }, PopoverBody, PopoverFooter
```

Rules:
- Panel: `position: absolute`, `z-index: 200`, white bg, border `--color-stroke-subtle`, `border-radius: 8px`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.10), 0px 2px 8px rgba(0,0,0,0.06)`, offset 8px from trigger on the placement side
- Supports controlled (`open`/`onOpenChange`) or uncontrolled toggling on trigger click
- Closes on outside mousedown when `closeOnOutsideClick=true` (default)
- PopoverHeader: `padding: 16px 16px 12px`, `border-bottom: 1px solid var(--color-stroke-subtle)`; title Rubik 500 13px/19.2px `--color-text-primary`; description Rubik 400 12px/18px `--color-text-tertiary`
- PopoverBody: `padding: 12px 16px`
- PopoverFooter: `padding: 12px 16px`, `border-top: 1px solid var(--color-stroke-subtle)`, `justify-content: flex-end`, gap 8px

---

### Sheet

```tsx
type SheetSide = 'right' | 'left' | 'top' | 'bottom'

props: open (required), onClose (required), side='right', title, description,
       children, footer, size (width for left/right, height for top/bottom),
       closeOnOverlayClick=true
```

| Side | Default size | Radius |
|---|---|---|
| right | width 384px | none (flush to edge) |
| left | width 384px | none (flush to edge) |
| top | height 320px | none (flush to edge) |
| bottom | height 320px | none (flush to edge) |

Rules:
- Overlay: `rgba(0,0,0,0.4)` + `backdrop-filter: blur(2px)`, z-index 900, fades `opacity 320ms ease`
- Panel: white, `box-shadow: 0px 24px 48px rgba(0,0,0,0.12)`, slides in/out via `transform 320ms cubic-bezier(0.32,0.72,0,1)` (hidden state translates fully off-screen per side)
- Escape key and (if `closeOnOverlayClick`) overlay click both call `onClose`
- Header: `padding: 24px 24px 16px`, border-bottom `--color-stroke-subtle` (only if body/footer present); title `--font-family-heading` 500 16px/24px `--color-text-primary`; description Rubik 400 13px/19.2px `--color-text-secondary`
- Close button: 32×32px, borderless, transparent bg, `X` 16px `--color-text-secondary`
- Body: `flex: 1`, `overflow-y: auto`, `padding: 20px 24px`
- Footer: `padding: 16px 24px`, `border-top: 1px solid var(--color-stroke-subtle)`, `justify-content: flex-end`, gap 8px
- Unmounts (`display: none` equivalent, returns `null`) 320ms after `open` becomes false to let the exit transition finish

---

### Spinner

```tsx
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'white'

props: size='md', variant='primary'
```

| Size | px | Border thickness |
|---|---|---|
| xs | 12 | 1.5px |
| sm | 16 | 1.5px |
| md | 24 | 2px |
| lg | 32 | 2px |
| xl | 48 | 2.5px |

Rules:
- `role="status"`, `aria-label="Loading"`, `border-radius: 50%`
- Ring color per variant: primary `--color-brand-primary`, secondary `--color-brand-secondary`, tertiary `--color-brand-tertiary`, neutral `--color-text-secondary`, white `#FFFFFF`
- `border-top-color: transparent` creates the spinning gap; animation `spinner-spin 0.75s linear infinite`

---

### TextLink

```tsx
type TextLinkVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'destructive'
type TextLinkWeight = 'regular' | 'semibold'
type TextLinkSize = 'sm' | 'md' | 'lg'

props: variant='primary', weight='regular', size='md',
       underline='hover' ('always'|'hover'|'none'),
       leadingIcon, trailingIcon, asButton, onPress
```

| Variant | Default | Hover |
|---|---|---|
| primary | `--color-brand-primary` | `--color-brand-primary-hover` |
| secondary | `--color-brand-secondary` | `#3E5639` |
| tertiary | `--color-brand-tertiary` | `#077E8C` |
| neutral | `--color-text-primary` | `#49494A` |
| destructive | `--color-destructive` | `#B91C1C` |

| Size | Font | Icon |
|---|---|---|
| sm | 12px/18px | 14px |
| md | 14px/21px | 16px |
| lg | 16px/24px | 18px |

Rules:
- Renders as `<a>`; `weight='semibold'` → 600, else 400; `underline='always'` sets `text-decoration: underline` permanently, `'hover'` toggles on mouse enter/leave, `'none'` never underlines
- `onPress` intercepts the click (`preventDefault`) instead of navigating — use for button-like link actions
- Icons rendered in fixed-size wrapper matching `iconSize`, `flex-shrink: 0`

---

### ToolbarFilter

```tsx
interface FilterOption { value, label }
interface FilterGroup { key, label, options: FilterOption[], multiple? }

props: searchValue='', onSearchChange, searchPlaceholder='Search…',
       filters=[], activeFilters={}, onFilterChange, onClearAll,
       actions, totalResults
```

Rules:
- Root: `display: flex`, `align-items: center`, gap 8px, `flex-wrap: wrap`
- Search input: height 36px, `padding-left: 32px` (Search icon 14px `--color-text-tertiary` inset), `border-radius: 8px`, border `--color-stroke-subtle`, Rubik 13px, width 200px; inline clear (×, 12px) shown when non-empty; only rendered if `onSearchChange` is passed
- Filter trigger button: height 36px, `border-radius: 8px`, `Filter` icon 14px, Rubik 13px; active (count > 0) → border + text `--color-brand-primary`, bg `--color-brand-primary-ghost-hover`; inactive → border `--color-stroke-subtle`, white bg, `--color-text-primary`
- Active-count badge: `min-width: 18px`, height 18px, `border-radius: 9px`, bg `--color-brand-primary`, white Rubik 600 11px
- ChevronDown rotates 180° when the group's dropdown is open (`transition: transform 0.2s`)
- Dropdown panel: absolute, `top: calc(100% + 4px)`, white bg, border `--color-stroke-subtle`, `border-radius: 10px`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.10)`, min-width 180px
- Option row: `padding: 9px 14px`, Rubik 13px, active → `--color-brand-primary` text; hover bg `#F7F7F7`
- `multiple=true` groups render a 16×16px checkbox (`border-radius: 4px`, checked → bg/border `--color-brand-primary` + white `X` 10px `strokeWidth 3`)
- Clear-all button: only rendered when any filter is active and `onClearAll` passed — `X` 14px + "Clear all", `--color-text-tertiary` → `--color-text-primary` on hover
- Results count: right-aligned via flexible spacer, Rubik 13px `--color-text-tertiary`, pluralizes "result/results"

---

### Toast

```tsx
type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'
type ToastPosition = 'top-right' | 'top-center' | 'top-left' |
                     'bottom-right' | 'bottom-center' | 'bottom-left'

props: variant='default', title (required), description,
       action: { label, onClick }, onClose, duration=4000
```

| Variant | Icon | Icon color |
|---|---|---|
| default | Info | `--color-brand-primary` |
| info | Info | `--color-text-info` |
| success | CheckCircle2 | `--color-text-success` |
| warning | AlertTriangle | `--color-text-warning` |
| error | XCircle | `--color-destructive` |

Rules:
- Card: `display: flex`, `padding: 14px 16px`, white bg, border `--color-stroke-subtle`, `border-radius: 12px`, `box-shadow: 0px 8px 24px rgba(0,0,0,0.10), 0px 2px 8px rgba(0,0,0,0.06)`, `min-width: 280px`, `max-width: 400px`
- `role="status"`, `aria-live="polite"`
- Icon: 18px, colored per variant, `margin-top: 1px` to align with title baseline
- Title: Rubik 500 14px/21px `--color-text-primary`, `letter-spacing: -0.01px`
- Description: Rubik 400 13px/19.2px `--color-text-secondary`
- Inline action: no border/bg, Rubik 500 13px, underlined, color = variant icon color
- Dismiss (×) button: 20×20px, `--color-text-tertiary`, only rendered when `onClose` passed
- Auto-dismiss: fires `onClose` after `duration` ms via `setTimeout` — only wired up when both `duration` truthy and `onClose` provided (`duration=0` disables)
- `ToastPosition` values are exported for a host-level toast container to place stacks; the component itself renders unpositioned

---

### MenuItem

```tsx
props: variant='Default'|'Destructive', state='Default'|'Hover'|'Focus'|'Pressed'|'Disabled'|'Selected',
  label, supportingText?, leadingContent?, trailingContent?, shortcut?, hasSubmenu=false,
  size='Medium'|'Small', onSelect?
```

Sizes: `Small` → 32px min-height, 13px label (line-height 19.2px), 16px icons.
`Medium` → 40px min-height, 16px label (line-height 24px), 20px icons.
Font: Rubik 400, `--color-text-primary`.

States (bg / label+icon color):
- Default: transparent / `--color-text-primary`
- Hover, Focus: `--color-status-brand-bg` (#FEF2E9) / `--color-text-primary`
- Pressed: `--color-stroke-default` / `--color-text-primary`
- Selected: solid `--color-brand-primary` / `--color-text-on-primary` (white) — matches Figma's "Active" variant
- Disabled: transparent, 50% opacity / `--color-text-muted`
- Destructive (variant): label+icon `--color-text-error` (#EF4444); Hover/Focus bg `--primitive-red-10` (#FCA5A5); Selected bg `--primitive-red-0` (#FEE2E2) with `--color-text-error` label

Shortcut badge (when no trailing/submenu): `--color-container-tertiary` bg, `--color-text-secondary`, 4px radius.
Submenu chevron: 18×18 stroke path, shown when `hasSubmenu` and no `trailingContent`.

---

### Command (Deprecated)

Figma marks this component `Command ⚠️` / "Command (Deprecated)" in the doc frame — treat as legacy; prefer `MenuItem` compositions for new work.

```tsx
type CommandType = 'default' | 'checkbox' | 'radio'
props: type='default', header?, headerMenu?, items, placeholder='This is placeholder',
  onSelect?, onQueryChange?, value?, hideSearch=false, width=237
```

Container: white bg, border `--color-stroke-default`, `border-radius: 6px`, `--shadow-sm`, `width: 237` (default).
Search input: `Input` size `sm` with leading search icon, rounded 8px.
Group label: Rubik 500 13px/19.2px, letter-spacing -0.13px, `--color-text-primary`.
Item row: Rubik 400 13px/19.2px, letter-spacing -0.01px, `--color-text-primary`; min-height 32px, 6px/8px padding, 6px radius.
Row states: hover/keyboard-active → `--color-status-brand-bg` (#FEF2E9); checked checkbox/radio row → `--color-status-brand-bg` as well (not just the control).
Checkbox (checked): 16px, `--color-brand-primary` bg/border, white check. Unchecked: white bg, `1px solid #BABABA`.
Radio (checked): 16px, white bg, `--color-brand-primary` border + 6px brand-primary dot. Unchecked: white bg, `1px solid #BABABA`.
Shortcut text (e.g. `⌘S`): Rubik 400 13px/19.2px, letter-spacing -0.01px, `--color-text-tertiary`, 60% opacity — not a monospace/Inter treatment.
Divider between groups: 1px `--color-stroke-default`.

---

### InputOTP

Full prop API in source file. N-slot OTP input with token-based focus/error states.

---

### ListContainer

Matches Figma's "List Container" (node 1057:19300) — defines four layout modes: Card List, Row List, Data Table, Sortable List.

```tsx
type ListContainerLayout = 'card-list' | 'row-list' | 'data-table' | 'sortable-list';

props: title, description, leadingIcon, badgeLabel, badgeVariant='blue', headerContent,
       showActionButton=true, actionIcon, onActionClick,
       toolbarFilter (slot rendered below header — bring your own ToolbarFilter or filter pills),
       layout='card-list', items (ListContainerItem[], auto-renders as ListItemCard rows),
       showPagination=true, paginationProps, showFooterActions=false,
       onCancel, onContinue, cancelLabel='Cancel', continueLabel='Continue'
```

Same shadow-only container, header, and 16px padding as `ContentContainer` (they intentionally share the same visual header treatment).
Body: if `items` is given and no `children`, auto-renders each as `ListItemCard` (gap 8). Otherwise renders `children` directly — this is how Row List / Data Table / Sortable List layouts are supported: bring your own rows/`Table` as children, `layout` is descriptive only in that case.
Footer: only rendered if `showPagination && paginationProps` or `showFooterActions` — bg `--color-container-secondary`, border-top `--color-stroke-subtle`, 12px padding. Pagination footer uses the existing `Pagination` component; actions footer renders `Button` Cancel (ghost-neutral) + Continue (primary).
`ListItemCard` (also exported standalone) — matches Figma's "Item / Card": 40×40 leading content, title (Rubik 400 13px primary) + description (Rubik 400 13px tertiary), optional trailing badge, 1px `--color-stroke-subtle` border, `--radius-lg`.

---

## Quick Reference: Common Tasks

### Screen Design
1. Set `data-brand="nusantics|cekolam|causa"` on root
2. Import `theme.css` (or inline `:root` variables)
3. Use semantic tokens only — zero hardcoded values
4. Desktop-first; mobile at `--container-md` / `--container-sm`

### New Component
1. Match variant + size API pattern from existing components
2. States: default → hover → focus → disabled → error
3. Solid variants: add inner highlight `inset 0 0 0 1px rgba(255,255,255,0.2)`
4. Focus ring: `0 0 0 3px var(--color-brand-*-ring)`
5. `pill` prop → `--radius-full` (landing page)

### Color Usage Rules
| Context | Token |
|---|---|
| Body text | `--color-text-primary` |
| Subtitles | `--color-text-secondary` |
| Captions | `--color-text-tertiary` |
| Disabled | `--color-text-muted` |
| Brand actions | `--color-brand-primary` |
| Danger | `--color-destructive` |
| Surfaces | `--color-container-primary/secondary/tertiary` |
| Status | `--color-status-{error/success/warning/info}-bg` + matching text token |

### Developer Handoff
- Reference token names, never hex values
- Annotate which tokens are brand-aware
- Include all interactive states + loading/error
- Reference keyframe names from `theme.css`
- Note `pill` vs default radius (landing vs dashboard context)

---

## Output Principles

- **Token-first**: Every visual value references a CSS custom property. State this explicitly.
- **Multi-brand ready**: Annotate which tokens resolve differently per brand mode.
- **Accessible by default**: Contrast ratios, ARIA roles, keyboard nav in every spec.
- **Handoff-complete**: Edge cases, loading/error states — not just happy paths.
- **Opinionated but documented**: Make a decision, explain the rationale in one sentence.
