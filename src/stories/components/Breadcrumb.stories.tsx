import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from 'helix-design-system/components';

const ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Processing', href: '#' },
  { label: 'Batch 24', href: '#' },
  { label: 'Sample SMP-0142' },
];

const meta = {
  title: 'Molecule/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: { divider: { control: 'select', options: ['chevron', 'slash'] } },
  args: { items: ITEMS, divider: 'chevron' },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ minHeight: 160, padding: 16 }}><Story /></div>],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
/** Up to three crumbs show as they are. */
export const ThreeCrumbs: Story = { args: { items: ITEMS.slice(0, 2).concat({ label: 'Processing' }) } };
export const Slash: Story = { args: { divider: 'slash' } };
/** Figma Extra Crumb — past three crumbs, everything between the first and the last collapses behind a "…" menu. */
export const Collapsed: Story = { args: { items: ITEMS } };
/** Figma last crumb as a context switcher. */
export const CurrentMenu: Story = {
  args: { items: ITEMS.slice(0, 3), currentMenu: [{ label: 'Processing' }, { label: 'Reporting' }, { label: 'Archive' }] },
};
