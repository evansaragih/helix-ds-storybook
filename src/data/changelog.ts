/**
 * Per-component spec data: description, status, and changelog.
 *
 * This is the single source of truth for "what is this component" and "what
 * changed and when" for every component documented in this Storybook. See
 * CHANGELOG_GUIDE.md at the repo root for the full workflow on how to add or
 * update an entry — including for brand-new components.
 *
 * Nothing else needs to be touched for an entry to show up everywhere:
 * - The component's own Docs tab renders its `description`, `status`, and
 *   `changelog` table automatically (see src/stories/blocks/ComponentDocsPage.tsx).
 * - The global Changelog page (src/stories/Changelog.mdx) flattens every
 *   component's `changelog[]`, sorts newest-first, and links back to that
 *   component's Docs page.
 */

export interface ChangelogEntry {
  /** "YYYY-MM-DD", the day the change was made. */
  date: string;
  /** Matches package.json's version at the time, e.g. "0.0.1". */
  version: string;
  /** One sentence describing what changed. */
  summary: string;
}

export type ComponentStatus = 'stable' | 'beta' | 'deprecated';

export interface ComponentChangelog {
  /** Lowercased component name, e.g. "cardmetric" for CardMetric. Must match
   * the story title's last segment so it resolves to the right Docs page. */
  id: string;
  /** Display name — the Figma component set name, e.g. "Icon Button". */
  name: string;
  /** Figma tier and page above the component, e.g. "Molecule/Alert". Must match
   * the story file's `title: '<category>/<name>'` exactly (names follow the Figma page / component set). */
  category: string;
  /** One to three sentences: what it is, when to use it, and any notable
   * behavior. Shown at the top of the component's Docs page. */
  description: string;
  status: ComponentStatus;
  /** Append-only. Never edit or delete a past entry — add a new one instead. */
  changelog: ChangelogEntry[];
}

/** Mirrors Storybook's own title-to-id slugging so links resolve correctly. */
function slugify(input: string): string {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

/** The Storybook docs entry id for a component, e.g. `?path=/docs/${id}`. */
export function getComponentDocsId(c: Pick<ComponentChangelog, 'category' | 'name'>): string {
  return `${slugify(`${c.category}/${c.name}`)}--documentation`;
}

export const componentChangelogs: ComponentChangelog[] = [
  {
    id: 'accordion', category: 'Molecule', name: 'Accordion', status: 'stable',
    description: 'Vertically stacked, collapsible content sections for progressive disclosure — FAQs, settings groups, long-form details a user can opt into. Supports single or multiple open panels across three visual styles (default, border, card).',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground and expanded-state stories.' },
    ],
  },
  {
    id: 'alert', category: 'Molecule/Alert', name: 'Alert', status: 'stable',
    description: 'Inline, non-blocking banner for surfacing contextual information, warnings, or errors within a page or form. Supports an icon, a badge, and up to two actions — use it for messages the user should see but doesn’t need to dismiss a modal for.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant stories.' },
      { date: '2026-07-23', version: '0.0.1', summary: 'Fixed the action/secondaryAction buttons to match Figma\'s updated "Alert / with Action Buttons" variants (node 855:23516): 36px height, 8px/12px padding, 24px row indent (was 32px), and the primary action now has a border plus the same inner white-highlight ring as Button.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Fixed default variant icons to match what Figma literally specs (nodes 855:23508-23512) instead of arbitrary lucide picks: default/success now both use `CircleCheck` (was `Info`/`CheckCircle2`), info/warning now both use `RiErrorWarningLine` from react-icons/ri (was `Info`/`AlertTriangle`), and error now uses `IoCloseCircleOutline` from react-icons/io5 (was `XCircle`).' },
    ],
  },
  {
    id: 'alertdialog', category: 'Molecule', name: 'Alert Dialog', status: 'stable',
    description: 'Modal confirmation dialog for actions that need explicit user confirmation before proceeding, especially destructive ones like delete. Blocks interaction until confirmed or cancelled — use Dialog instead for general-purpose modal content.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-23', version: '0.0.1', summary: 'Added an optional `checkboxAction` prop (e.g. "Don\'t show this again"), rendered left of the Cancel/Confirm buttons, matching Figma\'s updated "Dialog / Action Buttons" (node 26:11850).' },
    ],
  },
  {
    id: 'avatar', category: 'Molecule/Avatar', name: 'Avatar', status: 'stable',
    description: 'Compact visual representation of a user or entity — photo, icon, or initials — in a circular or rounded tile. Used in navbars, lists, comments, and anywhere content needs to be attributed to a person.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with size and fallback stories.' },
    ],
  },
  {
    id: 'avatargroup', category: 'Molecule/Avatar', name: 'Avatar Group', status: 'beta',
    description: 'Stacks multiple Avatars with a 50%-style overlap and a white separator ring, collapsing anything past `max` into a "+N" count badge. Optionally pairs with a dashed add-user button (circle or square) for team-management surfaces. Use AvatarLabelGroup instead when the viewer needs to identify one specific person rather than see headcount.',
    changelog: [
      { date: '2026-07-21', version: '0.0.1', summary: 'New component, matching Figma\'s "Avatar group" component set (xs/sm/md sizes, add-user button, overflow badge). Documented in Storybook with Sizes and add-button stories.' },
    ],
  },
  {
    id: 'avatarlabelgroup', category: 'Molecule/Avatar', name: 'Avatar Label Group', status: 'beta',
    description: 'Pairs a single Avatar with a bold name and muted email below it, in sm/md/lg/xl sizes — for comment authors, assignee rows, and member lists where the viewer needs to identify one specific person, not just a count.',
    changelog: [
      { date: '2026-07-21', version: '0.0.1', summary: 'New component, matching Figma\'s "Avatar label group" component set. Documented in Storybook with size, no-email, and placeholder-avatar stories.' },
    ],
  },
  {
    id: 'badge', category: 'Molecule/Badge', name: 'Badge', status: 'stable',
    description: 'Small label for tagging status, category, or count next to other content — "New", a plan tier, a notification count. Not interactive by default; supports an optional close (×) button when it needs to be dismissible.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant stories.' },
    ],
  },
  {
    id: 'breadcrumb', category: 'Molecule', name: 'Breadcrumb', status: 'stable',
    description: 'Horizontal trail of links showing the user’s location within a nested hierarchy, letting them jump back to any ancestor level. The last item renders as plain text (current page), not a link.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'button', category: 'Atomic/Button', name: 'Button', status: 'stable',
    description: 'The primary interactive control for triggering actions. Covers solid, outline, and ghost treatments across brand-aware (primary/secondary/tertiary), neutral, invert, and destructive intents, plus loading and pill (fully-rounded) states.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant, size, icon, loading, and pill stories.' },
      { date: '2026-07-23', version: '0.0.1', summary: 'Added `primary-subtle` and `neutral-subtle` variants, matching Figma\'s new "Style=Subtle" option on "Buttons / Button" (node 26:2341, subtle variants at 1053:103964 and 1424:21109); `neutral-subtle` is a frosted-glass treatment for buttons placed over images/dark surfaces and both dim via opacity rather than the shared disabled tokens when disabled.' },
    ],
  },
  {
    id: 'iconbutton', category: 'Atomic/Button', name: 'Icon Button', status: 'beta',
    description: 'Icon-only counterpart to Button, sharing the same variant/state model — available as a square (matches Figma\'s "Buttons / Icon") or fully circular pill ("Buttons / Icon Pill") shape, both a fixed 36×36 (1:1) footprint differing only in corner radius, plus a bare `transparent` variant. Always requires an `aria-label` since there is no visible text.',
    changelog: [
      { date: '2026-07-21', version: '0.0.1', summary: 'New component, matching Figma\'s "Buttons / Icon" and "Buttons / Icon Pill" component sets. Documented in Storybook with Shapes, Variants, and Disabled stories.' },
      { date: '2026-07-21', version: '0.0.1', summary: 'Corrected the square shape\'s footprint from 38×36 to a true 1:1 36×36, matching Figma exactly.' },
      { date: '2026-07-23', version: '0.0.1', summary: 'Added `primary-subtle` and `neutral-subtle` variants to match Button\'s new subtle style, for type-level parity — Figma\'s "Buttons / Icon" and "Buttons / Icon Pill" sets don\'t yet have a Subtle style, so these reuse Button\'s subtle colors pending a matching icon-button spec.' },
    ],
  },
  {
    id: 'carousel', category: 'Molecule', name: 'Carousel', status: 'stable',
    description: 'Horizontally scrollable set of slides with arrow and dot navigation, plus optional autoplay. For cycling through a small set of featured items — not a substitute for a paginated list.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-21', version: '0.0.1', summary: 'Fixed dot indicators to overlay the bottom edge of the slide track (matching Figma) instead of rendering as a separate row below it.' },
    ],
  },
  {
    id: 'checkbox', category: 'Atomic', name: 'Checkbox', status: 'stable',
    description: 'Binary or indeterminate selection control for forms and lists where a user can pick any number of options (including zero). Use Switch instead for settings that take effect immediately rather than on form submit.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'contentcontainer', category: 'Molecule', name: 'Content Container', status: 'beta',
    description: 'Generic single-card shell for metrics cards, feature cards, and custom layouts — an opinionated header (leading icon + title/description + optional badge + optional action button) above a freeform content slot. Shadow-only, no border, matching Figma\'s "Content Container". Reach for Card instead when you don\'t need the icon/title/description/badge header composition.',
    changelog: [
      { date: '2026-07-21', version: '0.0.1', summary: 'New component, matching Figma\'s "Content Container" (node 233:17314). Documented in Storybook with NoActionButton, NoBadge, CustomHeader, and NoBody stories.' },
    ],
  },
  {
    id: 'comparisontables', category: 'Organism', name: 'Comparison Tables', status: 'stable',
    description: 'Feature-comparison grid — think pricing tiers — with boolean/partial cell values, a highlighted column for the recommended option, and grouped feature rows.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'datepicker', category: 'Organism/Date Pickers', name: 'Date Picker', status: 'stable',
    description: 'Text input paired with a calendar popover for selecting a single date, a date range, a month, or a year, with min/max date constraints and a clear button.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'dialog', category: 'Molecule', name: 'Dialog', status: 'stable',
    description: 'General-purpose modal for tasks that need focused attention — forms, detail views — without leaving the current page. Use AlertDialog instead when the sole purpose is a yes/no confirmation.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'divider', category: 'Atomic', name: 'Divider', status: 'stable',
    description: 'Thin line — optionally labeled — used to visually separate sections of content, horizontally or vertically. Renders with `role="separator"` for accessibility.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with orientation stories.' },
    ],
  },
  {
    id: 'dropzone', category: 'Organism/Dropzone', name: 'Dropzone', status: 'stable',
    description: 'Drag-and-drop (or click-to-browse) file upload target with inline validation for file type and size, and a list of accepted files with per-file removal.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Reworked the idle/drag-over drop zone to a horizontal layout — a larger 56px icon well (solid brand bg on drag-over) beside a merged two-line text block, replacing the previous vertical layout with separate title/browse-link/constraint-pill rows; matches Figma\'s "Input / Upload-file" (node 1666:24135). Padding tightened to 16px.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Added the decorative background layer from the same Figma node — concentric rings, 6 scattered rotated file-type icon chips, and left/right edge fade gradients, clipped behind the drop zone content — which had been skipped in the initial resync.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Fixed the decorative background to match Figma\'s actual rendering: rings now use true Figma sizes at 12% opacity (was a much bolder 25%). Also fixed the text block to grow with the zone (`flex: 1`) instead of leaving dead space when stretched, and added a `size=\'md\'|\'lg\'` prop for a taller, centered vertical layout — matching Figma\'s Medium/Large variants — for explicit height control. Added Stretch (width slider) and Large stories.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Icon chips: pulled in from Figma\'s literal ~260-340px offsets (which clip almost entirely out of view at normal widths) to visible positions within a typical zone, and switched their horizontal offset to `%` of the zone\'s own width so they scale outward as it\'s resized instead of sitting at a fixed pixel position. Stretch story\'s "Height (size)" toggle now switches the live instance between md/lg instead of that being a separate static story.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Rebuilt the decorative background as a single SVG (`viewBox` matching Figma\'s real "Input / Upload-file" frame at 343×84/343×217, `preserveAspectRatio="none"`) using Figma\'s literal ring radii and chip coordinates, so resizing the zone in either width or height scales the whole pattern precisely and proportionally — the same mechanism a Figma frame resize with Scale constraints uses — instead of the previous CSS-percentage approximation. Zone now honors an explicit height via `style` (`flex: 1 1 auto`).' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Ring count corrected from 5 to all 21 rings Figma actually has (diameters 142→1340px), and removed the Stretch story now that Playground\'s resize handle (added the same day) already covers width/height testing — one story instead of two overlapping ones.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Switched the decorative background\'s icon chip coordinates from the small Medium/Large frames (which clip almost all 6 chips out of view) to Figma\'s unclipped "Input / Upload-file" reference instance (node 2346:7574), which shows the intended tidy arrangement. Rebuilt as a normalized `viewBox="0 0 100 100"` SVG with `preserveAspectRatio="xMidYMid slice"` so the whole pattern scales uniformly (no distortion) to cover the zone as it resizes in either dimension — replacing the previous `preserveAspectRatio="none"` approach, which stretched chips into distorted rectangles at very wide/short aspect ratios.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Restored the icon chips\' drop shadow, lost when they moved from CSS (`box-shadow`) to SVG rects — added an `feDropShadow`-based filter approximating Figma\'s two-layer `0px 2px 4px rgba(0,0,0,.04), 0px 4px 8px rgba(0,0,0,.08)` chip shadow.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Added `react-icons` as a dependency and switched the decorative illustration\'s icons from lucide substitutes to the exact glyphs Figma specs — `IoMdCloudUpload` (main icon), `IoDocuments`, `IoDocumentText`, `IoDocumentAttach`, `BsFileEarmarkMedicalFill`, `BsFileEarmarkPdfFill`, `HiDocumentReport` (chips) — for pixel-exact fidelity. This is a deliberate, scoped exception to the lucide-react standard documented on the new `Foundations/Icons` page; every other icon in Dropzone (file rows, error state) stays lucide.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Fixed the 6 background icon chips rendering enormous (spilling far outside their card) at large zone sizes — react-icons\' `IconBase` always overrides `width`/`height` props with its own `size`-derived value (defaulting to `"1em"` if `size` isn\'t passed), so the `width`/`height` props being set had no effect and icons fell back to a stray ~16-user-unit size that scaled up massively inside the zoomed SVG. Switched to the `size` prop, which react-icons actually respects.' },
      { date: '2026-07-29', version: '0.0.1', summary: 'Reverted the decorative background from a scale-to-fill SVG (`viewBox` + `preserveAspectRatio`) to fixed-size, center-anchored CSS elements — checking Figma\'s raw node data confirmed the ring/chip pattern never scales there; resizing the actual component only reveals or clips more of a fixed-size illustration. The previous scale-to-fill approach grew the whole pattern with the zone, which doesn\'t match Figma at all once stretched.' },
      { date: '2026-07-29', version: '0.0.1', summary: 'Fixed the icon+text content pinning to the left instead of staying centered when the zone is stretched wide — the text block had `flex: 1` (added earlier to fix text not reflowing), which stretches it edge-to-edge and leaves no space for `justify-content: center` to center the group. Swapped to `max-width: 420px` so the group sizes to content and centers as a unit, while still wrapping correctly at narrow widths.' },
    ],
  },
  {
    id: 'emptystates', category: 'Molecule', name: 'Empty States', status: 'stable',
    description: 'A general state placeholder — pairs an illustration with a message and an optional primary/secondary call-to-action. Covers empty/no-data, no-results, error, and no-permission scenarios today, with room to extend to success/warning flows that need the same pattern. Has a compact variant for smaller containers.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-10-16', version: '0.0.1', summary: 'Reframed the component description from a narrow "no-data/no-results" placeholder to a general state placeholder, matching a Figma rename of the component set from "Empty State" to "State" — intended to extend to success/warning flows later. Component export and prop API are unchanged (EmptyState, EmptyStateType, etc.) — this is a docs/description-only change.' },
    ],
  },
  {
    id: 'input', category: 'Molecule/Input', name: 'Input', status: 'stable',
    description: 'Standard text field with label, helper/error text, leading/trailing content and dividers, and an optional floating-label variant with an animated focus border.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Added a "Filled" state (non-floating sizes only): a field with a value now keeps the focus-colored border plus a subtle shadow even when not focused, matching Figma\'s new "State=Filled" variant. Added a Filled story.' },
      { date: '2026-10-15', version: '0.0.1', summary: 'Floating + `required` now marks the field with a red dot on the box\'s top-right corner instead of an asterisk in the label.' },
    ],
  },
  {
    id: 'marketingnavbar', category: 'Organism/Navbars', name: 'Marketing Navbar', status: 'stable',
    description: 'Top-level application navigation bar combining logo, nav links, search/notification actions, and the current user’s identity. Supports sticky and transparent (hero-section) modes.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'pagination', category: 'Molecule', name: 'Pagination', status: 'stable',
    description: 'Page-number navigation for paging through large datasets, with smart ellipsis truncation around the current page and an optional rows-per-page selector.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'popover', category: 'Molecule', name: 'Popover', status: 'stable',
    description: 'Lightweight floating panel anchored to a trigger element, for short-lived contextual content — menus, small forms, previews — that doesn’t warrant a full Dialog. Ships Header/Body/Footer sub-components.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'progressbar', category: 'Atomic/Progress Indicator', name: 'Progress Bar', status: 'stable',
    description: 'Horizontal indicator of completion progress (0–100%), with several label placements — title, trailing, floating above/below, or within the fill itself.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'radiobutton', category: 'Atomic', name: 'Radio Button', status: 'stable',
    description: 'Single-choice selection control used within a RadioGroup, for picking exactly one option from a small visible set. RadioGroup wires up name/checked/onChange to its RadioButton children automatically.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'select', category: 'Molecule', name: 'Select', status: 'stable',
    description: 'Dropdown control for choosing one value from a list, with support for grouped options, labels, helper/error text, and validation states.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'sheets', category: 'Molecule', name: 'Sheets', status: 'stable',
    description: 'Edge-anchored panel (left/right/top/bottom) that slides in over the page — for secondary workflows that need more room than a Popover but less commitment than navigating away.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'spinner', category: 'Atomic/Loading indicator', name: 'Spinner', status: 'stable',
    description: 'Indeterminate circular loading indicator, used inline, inside buttons, or centered in a container while content is loading. Five sizes, five color variants tied to brand/neutral/white.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with size stories.' },
    ],
  },
  {
    id: 'stepper', category: 'Molecule', name: 'Stepper', status: 'stable',
    description: 'Horizontal or vertical sequence of steps showing progress through a multi-stage process — onboarding, checkout, a wizard — with completed/active/pending/error states per step.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Added optional `onStepClick` prop, which makes step labels clickable and turns them `--color-brand-primary` on hover, matching Figma\'s new hover variant on "stepper / label" (node 138:12263). No-op when omitted. Added a Clickable story.' },
      { date: '2026-07-27', version: '0.0.1', summary: 'Fixed the active/selected step\'s label to use `--color-brand-primary` (was `--color-text-primary`) — Figma\'s "isHover=True" label styling turns out to represent the active step\'s resting color, not a literal mouse-hover state.' },
    ],
  },
  {
    id: 'switch', category: 'Atomic', name: 'Switch', status: 'stable',
    description: 'Binary on/off toggle for settings that take effect immediately. Use Checkbox instead when the choice is part of a form that gets submitted rather than applied right away.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'tables', category: 'Molecule', name: 'Tables', status: 'stable',
    description: 'Structured tabular data display with configurable striping, row hover, and borders, plus custom cell rendering per column and an optional frozen rightmost column for wide/scrollable tables. Reach for ComparisonTable instead for feature-comparison grids specifically.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-13', version: '0.0.1', summary: 'Added freezeLastColumn prop to pin the rightmost column while scrolling horizontally.' },
    ],
  },
  {
    id: 'tabshorizontal', category: 'Molecule/Tab', name: 'Tabs Horizontal', status: 'stable',
    description: 'Set of switchable panels under labeled triggers, for organizing related content into sections a user can flip between without navigating away. Three visual styles: primary (pill), line (underline), and default.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-23', version: '0.0.1', summary: 'Added optional `showNavArrows` prop, which makes the tab list horizontally scrollable and adds frosted-glass prev/next circular buttons at its edges, matching Figma\'s new `tabNavPrevNext` option on "Tab Group" (node 498:52594). Added a WithNavArrows story.' },
    ],
  },
  {
    id: 'toastr', category: 'Molecule/Alert', name: 'Toastr', status: 'stable',
    description: 'Transient, auto-dismissing notification for confirming the result of an action — success, error, etc. — rendered outside normal page flow. The component itself is unpositioned; a host-level container places the stack using the exported ToastPosition values.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant stories.' },
    ],
  },
  {
    id: 'filter', category: 'Molecule', name: 'Filter', status: 'stable',
    description: 'Composite search + filter-group + active-filter-count toolbar for filtering lists and tables, with a results count and a clear-all action. Groups can be single- or multi-select.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'tooltip', category: 'Molecule', name: 'Tooltip', status: 'stable',
    description: 'Small text label that appears on hover or focus to give extra context for an element, in a light or dark variant. Requires the app to be wrapped in `TooltipProvider`.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'uploadprogressdrawer', category: 'Organism/Dropzone', name: 'Upload Progress Drawer', status: 'beta',
    description: 'Floating panel that tracks a batch file upload — per-file waiting/uploading/success/failed status, transfer speed, and an overall progress bar — meant to be paired with Dropzone. Self-positions fixed at the bottom-right of the viewport; expanded/collapsed via `onExpandedChange`.',
    changelog: [
      { date: '2026-07-09', version: '0.0.1', summary: 'Documented in Storybook with Expanded, Collapsed, AllWaiting, AllFailed, and a Live Upload Demo composed with Dropzone.' },
    ],
  },
  {
    id: 'badgegroup', category: 'Molecule/Badge', name: 'Badge Group', status: 'beta',
    description: 'Badge with a leading or trailing add-on (dot, icon, avatar, flag) as one pill.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Badge Group.' },
    ],
  },
  {
    id: 'callout', category: 'Molecule', name: 'Callout', status: 'beta',
    description: 'Highlighted inline note for tips or context within content.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'contentdivider', category: 'Molecule', name: 'Content Divider', status: 'beta',
    description: 'Divider carrying a label or action, for separating labelled sections.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma; replaces the label option removed from Divider.' },
    ],
  },
  {
    id: 'dashboardfooter', category: 'Organism/Navbars', name: 'Dashboard Footer', status: 'beta',
    description: 'Footer bar for dashboard pages.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Navbars page.' },
    ],
  },
  {
    id: 'dashboardlayout', category: 'Template', name: 'Dashboard Layout', status: 'beta',
    description: 'Page template composing Dashboard Navbar, Sidebar and content area.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma.' },
    ],
  },
  {
    id: 'dashboardnavbar', category: 'Organism/Navbars', name: 'Dashboard Navbar', status: 'beta',
    description: 'Top navigation bar for dashboard pages.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Navbars page.' },
    ],
  },
  {
    id: 'dot', category: 'Atomic', name: 'Dot', status: 'beta',
    description: 'Small status dot used inside badges and lists.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'dropdown', category: 'Molecule', name: 'Dropdown', status: 'beta',
    description: 'Radix-based dropdown menu built from List Item rows; item hover follows Figma List Item states.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma; item hover and destructive states aligned to List Item.' },
    ],
  },
  {
    id: 'field', category: 'Molecule', name: 'Field', status: 'beta',
    description: 'Label, control, hint and error wrapper for form controls.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'fieldmessage', category: 'Molecule/Input', name: 'Field Message', status: 'beta',
    description: 'Helper, error and success message shown under an input.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Input page.' },
    ],
  },
  {
    id: 'sidefilterpanel', category: 'Molecule/Filter', name: 'Side Filter Panel', status: 'beta',
    description: 'Side panel holding filter groups for a table or list.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Filter page.' },
    ],
  },
  {
    id: 'footeraction', category: 'Molecule', name: 'Footer Action', status: 'beta',
    description: 'Button row for dialog, sheet and form footers.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'groupitem', category: 'Molecule/Item', name: 'Group Item', status: 'beta',
    description: 'Selectable Checkbox or Radio row with title and description.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Item page.' },
      { date: '2026-10-16', version: '0.0.1', summary: 'Hover now matches Figma: the white card turns grey (Colors/Surface/Hover) and the shell keeps its shadow, so the grey outline on hover is gone. Selected still shows the brand edge.' },
    ],
  },
  {
    id: 'icontile', category: 'Atomic', name: 'Icon Tile', status: 'beta',
    description: 'Icon inside a tinted rounded tile.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'infobadge', category: 'Organism/Meta Badge', name: 'Info Badge', status: 'beta',
    description: 'Compact badge presenting a labelled piece of metadata.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Meta Badge page.' },
    ],
  },
  {
    id: 'labelvalue', category: 'Molecule', name: 'Label Value', status: 'beta',
    description: 'Label with its value, for detail views.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'lightbox', category: 'Molecule', name: 'Lightbox', status: 'beta',
    description: 'Full-screen overlay for previewing an image or file.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'listitem', category: 'Molecule/Item', name: 'List Item', status: 'beta',
    description: 'Row for menus and navigation lists with leading icon and trailing shortcut; states Default, Active, Primary, Destructive, Disabled.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma Item page; replaces Menu Item.' },
    ],
  },
  {
    id: 'loadingstate', category: 'Molecule/Loading States', name: 'Loading State', status: 'beta',
    description: 'Placeholder shown while a section loads.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'metrictile', category: 'Organism', name: 'Metric Tile', status: 'beta',
    description: 'Tile showing a headline metric with label and trend.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma; replaces Card Metric.' },
    ],
  },
  {
    id: 'pageloader', category: 'Atomic/Loading indicator', name: 'Page Loader', status: 'beta',
    description: 'Full-page loading indicator with the brand logo.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma; Logo gained a `brand` prop.' },
    ],
  },
  {
    id: 'progresscircle', category: 'Atomic/Progress Indicator', name: 'Progress Circle', status: 'beta',
    description: 'Circular progress indicator, including the XXS 40px size.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma.' },
    ],
  },
  {
    id: 'sectionheader', category: 'Molecule', name: 'Section Header', status: 'beta',
    description: 'Title, description and actions heading for a page section.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma.' },
    ],
  },
  {
    id: 'sidebars', category: 'Organism', name: 'Sidebars', status: 'beta',
    description: 'Vertical navigation sidebar with grouped links.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Sidebars page.' },
    ],
  },
  {
    id: 'skeleton', category: 'Molecule/Loading States', name: 'Skeleton', status: 'beta',
    description: 'Animated placeholder shapes for content that is loading.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma.' },
    ],
  },
  {
    id: 'sortablelistitem', category: 'Molecule/Item', name: 'Sortable List Item', status: 'beta',
    description: 'Draggable list row with a grip handle.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Item page.' },
    ],
  },
  {
    id: 'tabsvertical', category: 'Molecule/Tab', name: 'Tabs Vertical', status: 'beta',
    description: 'Vertical tabs in Bordered, Filled and Contained appearances.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma Tab page.' },
    ],
  },
  {
    id: 'tag', category: 'Molecule', name: 'Tag', status: 'beta',
    description: 'Removable label chip for filters and selected values.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma.' },
    ],
  },
  {
    id: 'textarea', category: 'Molecule/Input', name: 'Text Area', status: 'beta',
    description: 'Multi-line text input.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Rebuilt from Figma Input page.' },
    ],
  },
  {
    id: 'verificationcodeinput', category: 'Molecule/Input', name: 'Verification Code Input Field', status: 'beta',
    description: 'Segmented one-time-code input; replaces the removed Input OTP.',
    changelog: [
      { date: '2026-10-08', version: '0.0.1', summary: 'Added from Figma Input page; Input OTP dropped.' },
    ],
  },
];

export function getComponentChangelog(id: string): ComponentChangelog | undefined {
  return componentChangelogs.find((c) => c.id === id);
}

export interface FlattenedChangelogEntry extends ChangelogEntry {
  componentId: string;
  componentName: string;
  docsId: string;
}

/**
 * All changelog entries across every component, flattened and sorted newest-first.
 *
 * `changelog[]` is append-only, so within a single component, an entry later
 * in the array is always chronologically newer — even when two entries share
 * the same `date` (day-level granularity, no time-of-day). Array.sort() is
 * stable, so a plain date comparator would leave same-date ties in their
 * original (oldest-first) order, which is backwards. We break ties by
 * original flattened position instead, so the later-appended entry — the
 * more recent one — sorts first.
 */
export function getChangelogEntries(): FlattenedChangelogEntry[] {
  const flattened = componentChangelogs.flatMap((c) =>
    c.changelog.map((entry) => ({
      ...entry,
      componentId: c.id,
      componentName: c.name,
      docsId: getComponentDocsId(c),
    })),
  );
  return flattened
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => {
      if (a.entry.date !== b.entry.date) return a.entry.date < b.entry.date ? 1 : -1;
      return b.index - a.index;
    })
    .map(({ entry }) => entry);
}
