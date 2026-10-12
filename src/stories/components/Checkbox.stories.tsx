import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    checked: { control: 'select', options: [false, true, 'indeterminate'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Label', supportingText: 'Supporting text', size: 'md' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Checked × State. Hover and focus are interactive — hover or tab to them. */
export const CheckedAndStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 16 }}>
      {([false, true, 'indeterminate'] as const).flatMap((checked) => [
        <Checkbox key={`${checked}-d`} {...args} checked={checked} label="Default" supportingText={undefined} />,
        <Checkbox key={`${checked}-i`} {...args} checked={checked} invalid label="Invalid" supportingText={undefined} />,
        <Checkbox key={`${checked}-x`} {...args} checked={checked} disabled label="Disabled" supportingText={undefined} />,
      ])}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md'] as const).map((size) => <Checkbox key={size} {...args} size={size} checked />)}
    </div>
  ),
};

export const WithoutLabel: Story = { args: { label: undefined, supportingText: undefined, 'aria-label': 'Select row' } };
