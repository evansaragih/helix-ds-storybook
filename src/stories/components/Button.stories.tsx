import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'helix-design-system/components';
import { ArrowRight, Plus } from 'lucide-react';

const meta = {
  title: 'Components/Inputs & Forms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'tertiary', 'destructive', 'neutral', 'invert',
        'ghost-neutral', 'ghost-brand', 'primary-outline', 'secondary-outline', 'tertiary-outline',
        'primary-subtle', 'neutral-subtle',
      ],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: {
    children: 'Button label',
    variant: 'primary',
    size: 'sm',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {[
        'primary', 'secondary', 'tertiary', 'destructive', 'neutral', 'invert',
        'ghost-neutral', 'ghost-brand', 'primary-outline', 'secondary-outline', 'tertiary-outline',
        'primary-subtle', 'neutral-subtle',
      ].map((variant) => (
        <Button key={variant} {...args} variant={variant as any}>
          {variant}
        </Button>
      ))}
    </div>
  ),
};

export const Subtle: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, padding: 24, borderRadius: 8, background: 'linear-gradient(135deg, #58595B, #14141E)' }}>
      <Button {...args} variant="primary-subtle">Primary subtle</Button>
      <Button {...args} variant="neutral-subtle">Neutral subtle</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    leadingIcon: <Plus />,
    trailingIcon: <ArrowRight />,
    children: 'Add item',
  },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Pill: Story = {
  args: { pill: true, size: 'lg', children: 'Get started' },
};
