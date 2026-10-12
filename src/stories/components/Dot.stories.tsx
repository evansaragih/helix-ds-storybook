import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dot } from 'helix-design-system/components';

const COLORS = ['brand', 'neutral', 'info', 'success', 'warning', 'error', 'on-primary'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const meta = {
  title: 'Atomic/Dot',
  component: Dot,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    size: { control: 'select', options: SIZES },
    ring: { control: 'boolean' },
  },
  args: { color: 'brand', size: 'md', ring: false },
} satisfies Meta<typeof Dot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Colors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#14141E', padding: 16, borderRadius: 8 }}>
      {COLORS.map((color) => <Dot key={color} {...args} color={color} size="xl" />)}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {SIZES.map((size) => <Dot key={size} {...args} size={size} />)}
    </div>
  ),
};

export const WithRing: Story = {
  args: { ring: true, size: '2xl' },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--color-bg-subtle, #EEEEEE)', padding: 16, borderRadius: 8 }}>
      {COLORS.filter((c) => c !== 'on-primary').map((color) => <Dot key={color} {...args} color={color} />)}
    </div>
  ),
};
