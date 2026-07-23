import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from 'helix-design-system/components';

const ITEMS = [
  { id: 'overview', label: 'Overview', content: <div style={{ padding: '16px 0' }}>Overview content</div> },
  { id: 'activity', label: 'Activity', content: <div style={{ padding: '16px 0' }}>Activity content</div>, badge: 3 },
  { id: 'settings', label: 'Settings', content: <div style={{ padding: '16px 0' }}>Settings content</div> },
  { id: 'archived', label: 'Archived', content: <div style={{ padding: '16px 0' }}>Archived content</div>, disabled: true },
];

const meta = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabStyle: { control: 'select', options: ['primary', 'line', 'default'] },
    size: { control: 'select', options: ['sm', 'md'] },
    type: { control: 'select', options: ['default', 'white'] },
  },
  args: {
    items: ITEMS,
    tabStyle: 'primary',
    size: 'sm',
    defaultValue: 'overview',
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['primary', 'line', 'default'] as const).map((tabStyle) => (
        <div key={tabStyle}>
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: 'var(--color-text-tertiary)', marginBottom: 8 }}>{tabStyle}</p>
          <Tabs {...args} tabStyle={tabStyle} />
        </div>
      ))}
    </div>
  ),
};

export const WithNavArrows: Story = {
  args: {
    showNavArrows: true,
    items: Array.from({ length: 10 }, (_, i) => ({ id: `tab-${i}`, label: `Tab ${i + 1}`, content: <div style={{ padding: '16px 0' }}>{`Content ${i + 1}`}</div> })),
    defaultValue: 'tab-0',
  },
  render: (args) => <div style={{ width: 320 }}><Tabs {...args} /></div>,
};

export const WhiteOnDark: Story = {
  args: { type: 'white' },
  render: (args) => (
    <div style={{ background: 'var(--color-bg-inverse)', padding: 24, borderRadius: 8 }}>
      <Tabs {...args} />
    </div>
  ),
};
