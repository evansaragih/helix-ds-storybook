import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconTile } from 'helix-design-system/components';
import { Beaker } from 'lucide-react';

const COLORS = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'destructive', 'info', 'neutral'] as const;

const meta = {
  title: 'Atomic/Icon Tile',
  component: IconTile,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    color: { control: 'select', options: COLORS },
    appearance: { control: 'select', options: ['solid', 'subtle'] },
    shape: { control: 'select', options: ['square', 'circle'] },
  },
  args: { icon: <Beaker />, size: 'md', color: 'primary', appearance: 'solid', shape: 'square' },
} satisfies Meta<typeof IconTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => <IconTile key={size} {...args} size={size} />)}
    </div>
  ),
};

export const ColorsAndAppearance: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['solid', 'subtle'] as const).map((appearance) => (
        <div key={appearance} style={{ display: 'flex', gap: 12 }}>
          {COLORS.map((color) => <IconTile key={color} {...args} color={color} appearance={appearance} />)}
        </div>
      ))}
    </div>
  ),
};

export const Circle: Story = { args: { shape: 'circle' } };
