import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, BadgeGroup } from 'helix-design-system/components';
import { Star } from 'lucide-react';

const COLORS = ['brand', 'info', 'success', 'warning', 'error', 'neutral'] as const;
const APPEARANCES = ['solid', 'outline', 'subtle'] as const;

const meta = {
  title: 'Molecule/Badge/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: COLORS },
    appearance: { control: 'select', options: APPEARANCES },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    status: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: { label: 'Badge', color: 'brand', appearance: 'subtle', size: 'md' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Color × Appearance. */
export const ColorAppearance: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {APPEARANCES.map((appearance) => (
        <div key={appearance} style={{ display: 'flex', gap: 8 }}>
          {COLORS.map((color) => <Badge key={color} {...args} color={color} appearance={appearance} label={color} />)}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => <Badge key={size} {...args} size={size} label={size} />)}
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge {...args} leadingIcon={<Star size={12} />} label="Leading" />
      <Badge {...args} trailingIcon={<Star size={12} />} label="Trailing" />
      <Badge {...args} status label="Status" />
      <Badge {...args} loading label="Loading" />
    </div>
  ),
};
