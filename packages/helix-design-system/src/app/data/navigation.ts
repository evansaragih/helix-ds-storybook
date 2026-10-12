export type ComponentLevel = 'Atomic' | 'Molecule' | 'Organism' | 'Template';

export interface NavItem {
  label: string;
  id: string;
  level?: ComponentLevel;
}

export const foundationItems: NavItem[] = [
  { label: 'Color', id: 'primitives' },
  { label: 'Typography', id: 'typography' },
  { label: 'Spacing Layout', id: 'utilities' },
  { label: 'Elevation', id: 'elevation' },
  { label: 'Icons', id: 'icons' },
  { label: 'Brand Identity', id: 'brand-identity' },
];

const components: NavItem[] = [
  { label: 'Button', id: 'button' },
  { label: 'Icon Button', id: 'icon-button' },
  { label: 'Checkbox', id: 'checkbox' },
  { label: 'Radio Button', id: 'radio-button' },
  { label: 'Progress Indicator', id: 'progress-bar' },
  { label: 'Slider', id: 'slider' },
  { label: 'Loading indicator', id: 'spinner' },
  { label: 'Divider', id: 'divider' },
  { label: 'Icon Tile', id: 'icon-tile' },
  { label: 'Dot', id: 'dot' },
  { label: 'Accordion', id: 'accordion' },
  { label: 'Alert', id: 'alert' },
  { label: 'Toastr', id: 'toast' },
  { label: 'Alert Dialog', id: 'alert-dialog' },
  { label: 'Avatar', id: 'avatar' },
  { label: 'Avatar Group', id: 'avatar-group' },
  { label: 'Badge', id: 'badge' },
  { label: 'Breadcrumb', id: 'breadcrumb' },
  { label: 'Callout', id: 'callout' },
  { label: 'Carousel', id: 'carousel' },
  { label: 'Content Divider', id: 'content-divider' },
  { label: 'Content Container', id: 'content-container' },
  { label: 'Dialog', id: 'dialog' },
  { label: 'Dropdown', id: 'dropdown-menu' },
  { label: 'Empty States', id: 'empty-state' },
  { label: 'Skeleton', id: 'skeleton' },
  { label: 'Loading States', id: 'loading-state' },
  { label: 'Field', id: 'field' },
  { label: 'Filter', id: 'toolbar-filter' },
  { label: 'Footer Action', id: 'footer-actions' },
  { label: 'Input', id: 'input' },
  { label: 'Group Item', id: 'group-item' },
  { label: 'List Item', id: 'list-item' },
  { label: 'Sortable List Item', id: 'sortable-list-item' },
  { label: 'Label Value', id: 'label-value' },
  { label: 'Lightbox', id: 'lightbox' },
  { label: 'Pagination', id: 'pagination' },
  { label: 'Popover', id: 'popover' },
  { label: 'Section Header', id: 'section-header' },
  { label: 'Select', id: 'select' },
  { label: 'Sheets', id: 'sheet' },
  { label: 'Stepper', id: 'stepper' },
  { label: 'Switch', id: 'switch' },
  { label: 'Tab', id: 'tabs' },
  { label: 'Tag', id: 'tag' },
  { label: 'Tooltip', id: 'tooltip' },
  { label: 'Tables', id: 'table' },
  { label: 'Navbars', id: 'navbar' },
  { label: 'Sidebars', id: 'sidebar' },
  { label: 'Dropzone', id: 'dropzone' },
  { label: 'Upload Progress Drawer', id: 'upload-progress-drawer' },
  { label: 'Meta Badge', id: 'info-badge' },
  { label: 'Metric Tile', id: 'metric-tile' },
  { label: 'Date Pickers', id: 'date-picker' },
  { label: 'Comparison Tables', id: 'comparison-table' },
  { label: 'Dashboard Layout', id: 'dashboard-layout' },
];

/** Atomic design level per Figma page / Storybook group; anything not listed is a Molecule. */
const levelById: Record<string, ComponentLevel> = {
  'button': 'Atomic',
  'icon-button': 'Atomic',
  'checkbox': 'Atomic',
  'radio-button': 'Atomic',
  'progress-bar': 'Atomic',
  'slider': 'Atomic',
  'spinner': 'Atomic',
  'divider': 'Atomic',
  'icon-tile': 'Atomic',
  'dot': 'Atomic',
  'switch': 'Atomic',
  'navbar': 'Organism',
  'sidebar': 'Organism',
  'dropzone': 'Organism',
  'upload-progress-drawer': 'Organism',
  'info-badge': 'Organism',
  'metric-tile': 'Organism',
  'date-picker': 'Organism',
  'comparison-table': 'Organism',
  'dashboard-layout': 'Template',
};

export const componentItems: NavItem[] = components.map((c) => ({ ...c, level: levelById[c.id] ?? 'Molecule' }));

export const componentLevels: ComponentLevel[] = ['Atomic', 'Molecule', 'Organism', 'Template'];

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

/** Groups shown on the sidebar rail; each opens a second panel listing its pages. */
export const navGroups: NavGroup[] = [
  { id: 'foundations', label: 'Foundations', items: foundationItems },
  ...componentLevels.map((level) => ({ id: level, label: level, items: componentItems.filter((i) => i.level === level) })),
];

/** The rail group a page belongs to, or null for pages outside any group (Overview). */
export const groupOfSection = (sectionId: string): string | null =>
  navGroups.find((g) => g.items.some((i) => i.id === sectionId))?.id ?? null;
