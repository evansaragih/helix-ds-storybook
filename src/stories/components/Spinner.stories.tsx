import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from 'helix-design-system/components';

const meta = {
  title: 'Components/Feedback & Status/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'neutral', 'white'] },
  },
  args: {
    size: 'md',
    variant: 'primary',
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      {(['primary', 'secondary', 'tertiary', 'neutral', 'white'] as const).map((variant) => (
        <div key={variant} style={{ padding: 8, backgroundColor: variant === 'white' ? '#59595A' : 'transparent', borderRadius: 6 }}>
          <Spinner {...args} variant={variant} />
        </div>
      ))}
    </div>
  ),
};
