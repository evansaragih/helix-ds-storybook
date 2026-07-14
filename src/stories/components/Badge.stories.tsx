import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from 'helix-design-system/components';
import { Star } from 'lucide-react';

const meta = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive', 'ghost', 'blue', 'green', 'yellow', 'red', 'brand-subtle', 'gray'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: {
    label: 'Badge',
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {['default', 'secondary', 'outline', 'destructive', 'ghost', 'blue', 'green', 'yellow', 'red', 'brand-subtle', 'gray'].map((variant) => (
        <Badge key={variant} {...args} variant={variant as any} label={variant} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Badge key={size} {...args} size={size} label={size} />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: { leadingIcon: <Star size={12} /> },
};

export const WithStatusDot: Story = {
  args: { status: true, variant: 'green', label: 'Active' },
};

export const Loading: Story = {
  args: { loading: true, label: 'Syncing' },
};

export const Closable: Story = {
  args: { onClose: () => {} },
};
