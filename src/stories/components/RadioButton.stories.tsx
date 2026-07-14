import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton, RadioGroup } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    label: 'Option A',
    size: 'md',
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'md'] as const).map((size) => (
        <RadioButton key={size} {...args} size={size} checked label={`Size ${size}`} />
      ))}
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { helperText: 'Recommended for most users', checked: true },
};

export const Invalid: Story = {
  args: { invalid: true, helperText: 'Please select an option.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

export const Group: Story = {
  render: () => (
    <RadioGroup name="plan" defaultValue="pro">
      <RadioButton value="starter" label="Starter" helperText="For individuals getting started" />
      <RadioButton value="pro" label="Pro" helperText="For growing teams" />
      <RadioButton value="enterprise" label="Enterprise" helperText="For large organizations" />
    </RadioGroup>
  ),
};
