import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from 'helix-design-system/components';
import { Search } from 'lucide-react';

const VARIANTS = [
  'primary', 'primary-outline', 'secondary', 'secondary-outline',
  'tertiary', 'tertiary-outline', 'neutral', 'invert',
  'ghost-neutral', 'ghost-brand', 'destructive', 'transparent',
];

const meta = {
  title: 'Components/Inputs & Forms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
  args: {
    variant: 'primary',
    shape: 'circle',
    icon: <Search size={16} />,
    'aria-label': 'Search',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['circle', 'square'] as const).map((shape) => (
        <IconButton key={shape} {...args} shape={shape} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {VARIANTS.map((variant) => (
        <IconButton key={variant} {...args} variant={variant as any} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
