import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from 'helix-design-system/components';
import { LayoutDashboard } from 'lucide-react';

const ITEMS = [
  { id: 'overview', label: 'Overview', content: <div>Overview content</div> },
  { id: 'activity', label: 'Activity', content: <div>Activity content</div>, badge: 3 },
  { id: 'settings', label: 'Settings', content: <div>Settings content</div> },
  { id: 'archived', label: 'Archived', content: <div>Archived content</div>, disabled: true },
];

const meta = {
  title: 'Molecule/Tab/Tabs Horizontal',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    appearance: { control: 'select', options: ['line', 'filled', 'contained'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    showNavigation: { control: 'boolean' },
  },
  args: { items: ITEMS, appearance: 'line', size: 'md', defaultValue: 'overview' },
  decorators: [(Story) => <div style={{ width: 420 }}><Story /></div>],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Appearance — Line, Filled and Contained. */
export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['line', 'filled', 'contained'] as const).map((appearance) => <Tabs key={appearance} {...args} appearance={appearance} renderContent={false} />)}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => <Tabs key={size} {...args} size={size} appearance="filled" renderContent={false} />)}
    </div>
  ),
};

export const WithIcons: Story = {
  args: { items: ITEMS.map((i) => ({ ...i, icon: <LayoutDashboard size={16} /> })) },
};

/** Figma Nav Prev / Next — shown only when the tabs are wider than the space; narrow the canvas to see them. */
export const WithNavigation: Story = {
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
  args: { items: Array.from({ length: 10 }, (_, i) => ({ id: `t${i}`, label: `Tab ${i + 1}` })) },
};
