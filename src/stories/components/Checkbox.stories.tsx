import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['Medium', 'Small'] },
    align: { control: 'select', options: ['Left', 'Right'] },
  },
  args: {
    label: 'Accept terms and conditions',
    description: 'You agree to our Terms of Service and Privacy Policy.',
    size: 'Medium',
    align: 'Left',
    checked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { checked: 'indeterminate' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['Medium', 'Small'] as const).map((size) => (
        <Checkbox key={size} {...args} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  args: { invalid: true, checked: true, description: 'This field is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const NoLabel: Story = {
  args: { label: undefined, description: undefined },
};
