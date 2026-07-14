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
  /** Display name, e.g. "CardMetric". */
  name: string;
  /** Sidebar subgroup under Components/, e.g. "Data Display". Must match the
   * story file's `title: 'Components/<category>/<name>'` exactly. */
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
  return `${slugify(`Components/${c.category}/${c.name}`)}--documentation`;
}

export const componentChangelogs: ComponentChangelog[] = [
  {
    id: 'accordion', category: 'Navigation', name: 'Accordion', status: 'stable',
    description: 'Vertically stacked, collapsible content sections for progressive disclosure — FAQs, settings groups, long-form details a user can opt into. Supports single or multiple open panels across three visual styles (default, border, card).',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground and expanded-state stories.' },
    ],
  },
  {
    id: 'alert', category: 'Feedback & Status', name: 'Alert', status: 'stable',
    description: 'Inline, non-blocking banner for surfacing contextual information, warnings, or errors within a page or form. Supports an icon, a badge, and up to two actions — use it for messages the user should see but doesn’t need to dismiss a modal for.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant stories.' },
    ],
  },
  {
    id: 'alertdialog', category: 'Overlays', name: 'AlertDialog', status: 'stable',
    description: 'Modal confirmation dialog for actions that need explicit user confirmation before proceeding, especially destructive ones like delete. Blocks interaction until confirmed or cancelled — use Dialog instead for general-purpose modal content.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'avatar', category: 'Data Display', name: 'Avatar', status: 'stable',
    description: 'Compact visual representation of a user or entity — photo, icon, or initials — in a circular or rounded tile. Used in navbars, lists, comments, and anywhere content needs to be attributed to a person.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with size and fallback stories.' },
    ],
  },
  {
    id: 'badge', category: 'Data Display', name: 'Badge', status: 'stable',
    description: 'Small label for tagging status, category, or count next to other content — "New", a plan tier, a notification count. Not interactive by default; supports an optional close (×) button when it needs to be dismissible.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant stories.' },
    ],
  },
  {
    id: 'breadcrumb', category: 'Navigation', name: 'Breadcrumb', status: 'stable',
    description: 'Horizontal trail of links showing the user’s location within a nested hierarchy, letting them jump back to any ancestor level. The last item renders as plain text (current page), not a link.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'button', category: 'Inputs & Forms', name: 'Button', status: 'stable',
    description: 'The primary interactive control for triggering actions. Covers solid, outline, and ghost treatments across brand-aware (primary/secondary/tertiary), neutral, invert, and destructive intents, plus loading and pill (fully-rounded) states.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant, size, icon, loading, and pill stories.' },
    ],
  },
  {
    id: 'card', category: 'Data Display', name: 'Card', status: 'stable',
    description: 'General-purpose content container with optional header and footer, used to group related information into a distinct visual block. Reach for CardMetric instead when the content is a single labeled stat.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'cardmetric', category: 'Data Display', name: 'CardMetric', status: 'stable',
    description: 'Compact stat tile for dashboards — a labeled value with an optional unit, accent icon, and up/down/neutral trend indicator. Purpose-built for KPI rows; use Card for anything less structured.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'carousel', category: 'Layout', name: 'Carousel', status: 'stable',
    description: 'Horizontally scrollable set of slides with arrow and dot navigation, plus optional autoplay. For cycling through a small set of featured items — not a substitute for a paginated list.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'checkbox', category: 'Inputs & Forms', name: 'Checkbox', status: 'stable',
    description: 'Binary or indeterminate selection control for forms and lists where a user can pick any number of options (including zero). Use Switch instead for settings that take effect immediately rather than on form submit.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'command', category: 'Navigation', name: 'Command', status: 'deprecated',
    description: 'Deprecated. A searchable command/menu list with checkbox and radio row types. Figma marks this legacy — compose MenuItem instead for any new work; see the changelog entry for migration notes.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-08', version: '0.0.1', summary: 'Marked deprecated — Figma tags this component "Command (Deprecated)"; compose MenuItem rows instead for any new work. Still documented here for legacy screens only.' },
    ],
  },
  {
    id: 'comparisontable', category: 'Data Display', name: 'ComparisonTable', status: 'stable',
    description: 'Feature-comparison grid — think pricing tiers — with boolean/partial cell values, a highlighted column for the recommended option, and grouped feature rows.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'datepicker', category: 'Inputs & Forms', name: 'DatePicker', status: 'stable',
    description: 'Text input paired with a calendar popover for selecting a single date, a date range, a month, or a year, with min/max date constraints and a clear button.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'dialog', category: 'Overlays', name: 'Dialog', status: 'stable',
    description: 'General-purpose modal for tasks that need focused attention — forms, detail views — without leaving the current page. Use AlertDialog instead when the sole purpose is a yes/no confirmation.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'divider', category: 'Layout', name: 'Divider', status: 'stable',
    description: 'Thin line — optionally labeled — used to visually separate sections of content, horizontally or vertically. Renders with `role="separator"` for accessibility.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with orientation stories.' },
    ],
  },
  {
    id: 'dropzone', category: 'Inputs & Forms', name: 'Dropzone', status: 'stable',
    description: 'Drag-and-drop (or click-to-browse) file upload target with inline validation for file type and size, and a list of accepted files with per-file removal.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'emptystate', category: 'Feedback & Status', name: 'EmptyState', status: 'stable',
    description: 'Placeholder shown when a list, search, or section has no content yet — pairs an icon and message with an optional primary/secondary call-to-action. Has a compact variant for smaller containers.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'infocard', category: 'Data Display', name: 'InfoCard', status: 'stable',
    description: 'Status-tinted callout card (default/brand/success/warning/error/info) with optional action and footer — more persistent and content-rich than a Toast or Alert, for surfacing a standing piece of information.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'input', category: 'Inputs & Forms', name: 'Input', status: 'stable',
    description: 'Standard text field with label, helper/error text, leading/trailing content and dividers, and an optional floating-label variant with an animated focus border.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'inputotp', category: 'Inputs & Forms', name: 'InputOTP', status: 'stable',
    description: 'Segmented one-time-passcode input, one character per slot, with per-token focus and error states — for phone/email verification flows.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'menuitem', category: 'Navigation', name: 'MenuItem', status: 'stable',
    description: 'Single selectable row used inside menus, dropdowns, and command lists — supports leading/trailing content, keyboard shortcuts, submenus, and a destructive variant. The building block other overlay components compose into a list.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'navbar', category: 'Navigation', name: 'Navbar', status: 'stable',
    description: 'Top-level application navigation bar combining logo, nav links, search/notification actions, and the current user’s identity. Supports sticky and transparent (hero-section) modes.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'pagination', category: 'Navigation', name: 'Pagination', status: 'stable',
    description: 'Page-number navigation for paging through large datasets, with smart ellipsis truncation around the current page and an optional rows-per-page selector.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'popover', category: 'Overlays', name: 'Popover', status: 'stable',
    description: 'Lightweight floating panel anchored to a trigger element, for short-lived contextual content — menus, small forms, previews — that doesn’t warrant a full Dialog. Ships Header/Body/Footer sub-components.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'progressbar', category: 'Data Display', name: 'ProgressBar', status: 'stable',
    description: 'Horizontal indicator of completion progress (0–100%), with several label placements — title, trailing, floating above/below, or within the fill itself.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'radiobutton', category: 'Inputs & Forms', name: 'RadioButton', status: 'stable',
    description: 'Single-choice selection control used within a RadioGroup, for picking exactly one option from a small visible set. RadioGroup wires up name/checked/onChange to its RadioButton children automatically.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'select', category: 'Inputs & Forms', name: 'Select', status: 'stable',
    description: 'Dropdown control for choosing one value from a list, with support for grouped options, labels, helper/error text, and validation states.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'sheet', category: 'Overlays', name: 'Sheet', status: 'stable',
    description: 'Edge-anchored panel (left/right/top/bottom) that slides in over the page — for secondary workflows that need more room than a Popover but less commitment than navigating away.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'spinner', category: 'Feedback & Status', name: 'Spinner', status: 'stable',
    description: 'Indeterminate circular loading indicator, used inline, inside buttons, or centered in a container while content is loading. Five sizes, five color variants tied to brand/neutral/white.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with size stories.' },
    ],
  },
  {
    id: 'stepper', category: 'Navigation', name: 'Stepper', status: 'stable',
    description: 'Horizontal or vertical sequence of steps showing progress through a multi-stage process — onboarding, checkout, a wizard — with completed/active/pending/error states per step.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'switch', category: 'Inputs & Forms', name: 'Switch', status: 'stable',
    description: 'Binary on/off toggle for settings that take effect immediately. Use Checkbox instead when the choice is part of a form that gets submitted rather than applied right away.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with state stories.' },
    ],
  },
  {
    id: 'table', category: 'Data Display', name: 'Table', status: 'stable',
    description: 'Structured tabular data display with configurable striping, row hover, and borders, plus custom cell rendering per column and an optional frozen rightmost column for wide/scrollable tables. Reach for ComparisonTable instead for feature-comparison grids specifically.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
      { date: '2026-07-13', version: '0.0.1', summary: 'Added freezeLastColumn prop to pin the rightmost column while scrolling horizontally.' },
    ],
  },
  {
    id: 'tabs', category: 'Navigation', name: 'Tabs', status: 'stable',
    description: 'Set of switchable panels under labeled triggers, for organizing related content into sections a user can flip between without navigating away. Three visual styles: primary (pill), line (underline), and default.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'textlink', category: 'Inputs & Forms', name: 'TextLink', status: 'stable',
    description: 'Inline or standalone hyperlink styled per brand/semantic intent — lower-emphasis than Button, for navigational or inline actions within body copy or lists.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'toast', category: 'Feedback & Status', name: 'Toast', status: 'stable',
    description: 'Transient, auto-dismissing notification for confirming the result of an action — success, error, etc. — rendered outside normal page flow. The component itself is unpositioned; a host-level container places the stack using the exported ToastPosition values.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with variant stories.' },
    ],
  },
  {
    id: 'toolbarfilter', category: 'Navigation', name: 'ToolbarFilter', status: 'stable',
    description: 'Composite search + filter-group + active-filter-count toolbar for filtering lists and tables, with a results count and a clear-all action. Groups can be single- or multi-select.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'tooltip', category: 'Overlays', name: 'Tooltip', status: 'stable',
    description: 'Small text label that appears on hover or focus to give extra context for an element, in a light or dark variant. Requires the app to be wrapped in `TooltipProvider`.',
    changelog: [
      { date: '2026-07-08', version: '0.0.1', summary: 'Documented in Storybook with Playground story.' },
    ],
  },
  {
    id: 'uploadprogressdrawer', category: 'Overlays', name: 'Upload Progress Drawer', status: 'beta',
    description: 'Floating panel that tracks a batch file upload — per-file waiting/uploading/success/failed status, transfer speed, and an overall progress bar — meant to be paired with Dropzone. Self-positions fixed at the bottom-right of the viewport; expanded/collapsed via `onExpandedChange`.',
    changelog: [
      { date: '2026-07-09', version: '0.0.1', summary: 'Documented in Storybook with Expanded, Collapsed, AllWaiting, AllFailed, and a Live Upload Demo composed with Dropzone.' },
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
