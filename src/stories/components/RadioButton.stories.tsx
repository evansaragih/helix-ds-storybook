import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton, RadioGroup } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Radio Button',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    checked: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Label', supportingText: 'Supporting text', size: 'md', checked: false },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const CheckedAndStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 16 }}>
      {[false, true].flatMap((checked) => [
        <RadioButton key={`${checked}-d`} {...args} checked={checked} readOnly label="Default" supportingText={undefined} />,
        <RadioButton key={`${checked}-i`} {...args} checked={checked} readOnly invalid label="Invalid" supportingText={undefined} />,
        <RadioButton key={`${checked}-x`} {...args} checked={checked} readOnly disabled label="Disabled" supportingText={undefined} />,
      ])}
    </div>
  ),
};

export const Group: Story = {
  render: (args) => (
    <RadioGroup name="plan" defaultValue="pro">
      <RadioButton {...args} value="basic" label="Basic" supportingText="Up to 10 samples" />
      <RadioButton {...args} value="pro" label="Pro" supportingText="Up to 100 samples" />
      <RadioButton {...args} value="team" label="Team" supportingText="Unlimited samples" />
    </RadioGroup>
  ),
};
