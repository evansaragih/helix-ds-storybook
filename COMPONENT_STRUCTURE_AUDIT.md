# Component Structure Audit

Audit of how the 38 components in `src/stories/components/` are structured, run 2026-07-10.

## 1. How every component is structured

Each component has two required, linked parts:

**Story file** — `src/stories/components/<Component>.stories.tsx`
- `meta.title`: `'Components/<category>/<Name>'` — category is one of `Inputs & Forms`, `Data Display`, `Navigation`, `Feedback & Status`, `Overlays`, `Layout`
- `meta.component`: imported from `helix-design-system/components`
- `tags: ['autodocs']`
- `argTypes`: controls per prop
- `args`: default/playground values
- Named story exports: `Playground` first, then variant/state stories

**Changelog entry** — `src/data/changelog.ts` (`ComponentChangelog` object)
- `id`: lowercased, non-alphanumeric-stripped last segment of the story title
- `name`: display name
- `category`: must match the story's title category exactly
- `description`: required, 1–3 sentences
- `status`: `stable | beta | deprecated`
- `changelog`: append-only `{ date, version, summary }[]`

**Rendering wiring**
- `src/stories/blocks/ComponentDocsPage.tsx` renders `status` + `description` + `changelog` on each component's Docs tab
- `src/stories/blocks/ChangelogTable.tsx` + `getChangelogEntries()` aggregate all entries onto the global Changelog page (paginated 15/page)

## 2. Bookkeeping check — clean

All 38 story `meta.title` values match their `changelog.ts` `category`/`id` exactly. 38 stories, 38 changelog entries — no orphans either direction.

| File | Story title | changelog id | changelog category | Match |
|---|---|---|---|---|
| Accordion.stories.tsx | Components/Navigation/Accordion | accordion | Navigation | ✅ |
| Alert.stories.tsx | Components/Feedback & Status/Alert | alert | Feedback & Status | ✅ |
| AlertDialog.stories.tsx | Components/Overlays/AlertDialog | alertdialog | Overlays | ✅ |
| Avatar.stories.tsx | Components/Data Display/Avatar | avatar | Data Display | ✅ |
| Badge.stories.tsx | Components/Data Display/Badge | badge | Data Display | ✅ |
| Breadcrumb.stories.tsx | Components/Navigation/Breadcrumb | breadcrumb | Navigation | ✅ |
| Button.stories.tsx | Components/Inputs & Forms/Button | button | Inputs & Forms | ✅ |
| Card.stories.tsx | Components/Data Display/Card | card | Data Display | ✅ |
| CardMetric.stories.tsx | Components/Data Display/CardMetric | cardmetric | Data Display | ✅ |
| Carousel.stories.tsx | Components/Layout/Carousel | carousel | Layout | ✅ |
| Checkbox.stories.tsx | Components/Inputs & Forms/Checkbox | checkbox | Inputs & Forms | ✅ |
| Command.stories.tsx | Components/Navigation/Command | command | Navigation | ✅ (deprecated) |
| ComparisonTable.stories.tsx | Components/Data Display/ComparisonTable | comparisontable | Data Display | ✅ |
| DatePicker.stories.tsx | Components/Inputs & Forms/DatePicker | datepicker | Inputs & Forms | ✅ |
| Dialog.stories.tsx | Components/Overlays/Dialog | dialog | Overlays | ✅ |
| Divider.stories.tsx | Components/Layout/Divider | divider | Layout | ✅ |
| Dropzone.stories.tsx | Components/Inputs & Forms/Dropzone | dropzone | Inputs & Forms | ✅ |
| EmptyState.stories.tsx | Components/Feedback & Status/EmptyState | emptystate | Feedback & Status | ✅ |
| InfoCard.stories.tsx | Components/Data Display/InfoCard | infocard | Data Display | ✅ |
| Input.stories.tsx | Components/Inputs & Forms/Input | input | Inputs & Forms | ✅ |
| InputOTP.stories.tsx | Components/Inputs & Forms/InputOTP | inputotp | Inputs & Forms | ✅ |
| MenuItem.stories.tsx | Components/Navigation/MenuItem | menuitem | Navigation | ✅ |
| Navbar.stories.tsx | Components/Navigation/Navbar | navbar | Navigation | ✅ |
| Pagination.stories.tsx | Components/Navigation/Pagination | pagination | Navigation | ✅ |
| Popover.stories.tsx | Components/Overlays/Popover | popover | Overlays | ✅ |
| ProgressBar.stories.tsx | Components/Data Display/ProgressBar | progressbar | Data Display | ✅ |
| RadioButton.stories.tsx | Components/Inputs & Forms/RadioButton | radiobutton | Inputs & Forms | ✅ |
| Select.stories.tsx | Components/Inputs & Forms/Select | select | Inputs & Forms | ✅ |
| Sheet.stories.tsx | Components/Overlays/Sheet | sheet | Overlays | ✅ |
| Spinner.stories.tsx | Components/Feedback & Status/Spinner | spinner | Feedback & Status | ✅ |
| Stepper.stories.tsx | Components/Navigation/Stepper | stepper | Navigation | ✅ |
| Switch.stories.tsx | Components/Inputs & Forms/Switch | switch | Inputs & Forms | ✅ |
| Table.stories.tsx | Components/Data Display/Table | table | Data Display | ✅ |
| Tabs.stories.tsx | Components/Navigation/Tabs | tabs | Navigation | ✅ |
| TextLink.stories.tsx | Components/Inputs & Forms/TextLink | textlink | Inputs & Forms | ✅ |
| Toast.stories.tsx | Components/Feedback & Status/Toast | toast | Feedback & Status | ✅ |
| ToolbarFilter.stories.tsx | Components/Navigation/ToolbarFilter | toolbarfilter | Navigation | ✅ |
| Tooltip.stories.tsx | Components/Overlays/Tooltip | tooltip | Overlays | ✅ |
| UploadProgressDrawer.stories.tsx | Components/Overlays/Upload Progress Drawer | uploadprogressdrawer | Overlays | ✅ (beta) |

## 3. Story/variant naming — current state (post-cleanup)

Exported story names per file, after standardizing on `Playground` / `Variants` / `Invalid`:

| File | Story exports |
|---|---|
| Accordion.stories.tsx | Playground, Variants, Multiple, WithDisabledItem |
| Alert.stories.tsx | Playground, Variants, WithBadge, WithActions, Closable |
| AlertDialog.stories.tsx | Playground, Destructive, Info, Loading, Small |
| Avatar.stories.tsx | Playground, Sizes, Shapes, WithImage, WithIcon, Placeholder |
| Badge.stories.tsx | Playground, Variants, Sizes, WithIcon, WithStatusDot, Loading, Closable |
| Breadcrumb.stories.tsx | Playground, Sizes, TwoLevels, DeepPath |
| Button.stories.tsx | Playground, Variants, Sizes, WithIcons, Loading, Disabled, Pill |
| Card.stories.tsx | Playground, WithHeaderAndFooter, Hoverable |
| CardMetric.stories.tsx | Playground, Trends, WithUnit, WithoutTrend |
| Carousel.stories.tsx | Playground, MultipleVisible, AutoPlay, NoArrowsOrDots |
| Checkbox.stories.tsx | Playground, Checked, Indeterminate, Sizes, Invalid, Disabled, DisabledChecked, NoLabel |
| Command.stories.tsx | Playground, NoHeader, CheckboxType, RadioType, HideSearch, WithHeaderMenu |
| ComparisonTable.stories.tsx | Playground, TwoPlans, StickyHeader |
| DatePicker.stories.tsx | Playground, Range, Invalid, Disabled, WithMinMax |
| Dialog.stories.tsx | Playground, Sizes, NoFooter, NoCloseButton |
| Divider.stories.tsx | Playground, Variants, WithLabel, LabelAlignment, Vertical |
| Dropzone.stories.tsx | Playground, SingleFile, Invalid, Disabled, NoConstraints |
| EmptyState.stories.tsx | Playground, Variants, WithSecondaryAction, NoAction, Compact, SearchNoResults |
| InfoCard.stories.tsx | Playground, Variants, Compact, WithAction, Clickable, WithFooter |
| Input.stories.tsx | Playground, Sizes, Floating, WithLeadingIcon, WithDividerContent, HelperText, Invalid, CharCount, Disabled |
| InputOTP.stories.tsx | Playground, Alphanumeric, Invalid, Disabled, Prefilled |
| MenuItem.stories.tsx | Playground, Menu, WithSupportingText, WithSubmenu, Destructive, Selected, Disabled, Sizes, WithShortcutAndChevron |
| Navbar.stories.tsx | Playground, NoLinks, WithActions, WithMobileMenu, WithAvatarImage, Transparent |
| Pagination.stories.tsx | Playground, FewPages, ManyPagesWithSiblings, WithRowsPerPage, FirstPage, LastPage |
| Popover.stories.tsx | Playground, SimpleContent, Placements |
| ProgressBar.stories.tsx | Playground, LabelTypes, Complete, Empty, CustomColor, Animated |
| RadioButton.stories.tsx | Playground, Checked, Sizes, WithHelperText, Invalid, Disabled, DisabledChecked, Group |
| Select.stories.tsx | Playground, Grouped, Invalid, Disabled, Sizes |
| Sheet.stories.tsx | Playground, Sides, NoFooter, CustomSize |
| Spinner.stories.tsx | Playground, Sizes, Variants |
| Stepper.stories.tsx | Playground, Vertical, AllCompleted, WithError, JustStarted |
| Switch.stories.tsx | Playground, Checked, Sizes, WithHelperText, Invalid, Disabled, DisabledChecked |
| Table.stories.tsx | Playground, Striped, WithCellBorders, Small, Empty, Borderless |
| Tabs.stories.tsx | Playground, Variants, WhiteOnDark |
| TextLink.stories.tsx | Playground, Variants, Sizes, Underline, WithLeadingIcon, WithTrailingIcon, Semibold |
| Toast.stories.tsx | Playground, Variants, WithAction, Closable, NoDescription |
| ToolbarFilter.stories.tsx | Playground, NoActiveFilters, WithActions, NoSearch |
| Tooltip.stories.tsx | Playground, Sides, LightVariant, Disabled |
| UploadProgressDrawer.stories.tsx | Playground, Collapsed, AllWaiting, AllFailed, LiveUploadDemo |

## 4. Fixes applied this pass

- `UploadProgressDrawer.stories.tsx`: `Expanded` → `Playground` (was the only component missing a baseline `Playground` story).
- `Accordion.stories.tsx`, `Tabs.stories.tsx`: `Styles` → `Variants`.
- `Divider.stories.tsx`: `Types` → `Variants`.
- `DatePicker.stories.tsx`, `Dropzone.stories.tsx`: `WithError` → `Invalid`.
- `Input.stories.tsx`: `ErrorState` → `Invalid`.

Verified: `npx tsc -p tsconfig.json --noEmit` shows no new errors from the 7 touched files (pre-existing errors remain in `helix-design-system/src/components/Alert.tsx`, unrelated to this change).

## 5. Remaining naming outliers (not yet touched — candidates for a future pass)

One-off names that don't reuse an existing convention but also don't obviously map to one:

- `Stepper.stories.tsx` uses `WithError` (not renamed to `Invalid` — a stepper's error state is per-step, not a single form-field validity state, so it may be a genuinely different concept from `Invalid`).
- `ProgressBar.stories.tsx`'s `LabelTypes` is unique to that component (no sibling to unify with).
- `Command.stories.tsx` is `deprecated` — likely not worth restructuring further since it's slated for removal in favor of `MenuItem`.

Worth a decision on whether `WithError` (Stepper) should also become `Invalid`, or whether it's legitimately distinct from the single-field validity meaning `Invalid` carries elsewhere.
