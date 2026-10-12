import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressCircle } from 'helix-design-system/components';
import { Upload } from 'lucide-react';

const SIZES = ['xxs', 'xs', 'sm', 'md', 'lg'] as const;

const meta = {
  title: 'Atomic/Progress Indicator/Progress Circle',
  component: ProgressCircle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
    thickness: { control: 'select', options: ['thick', 'thin'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
    label: { control: 'boolean' },
  },
  args: { value: 40, size: 'md', thickness: 'thick', label: true, supportingText: 'Active users' },
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Size × Thickness. */
export const SizesAndThickness: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['thick', 'thin'] as const).map((thickness) => (
        <div key={thickness} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {SIZES.map((size) => <ProgressCircle key={size} {...args} size={size} thickness={thickness} />)}
        </div>
      ))}
    </div>
  ),
};

/** Figma Label Slot — put any content in the center. */
export const CustomCenter: Story = { args: { children: <Upload size={28} color="#F57E20" /> } };
export const NoLabel: Story = { args: { label: false, thickness: 'thin' } };
