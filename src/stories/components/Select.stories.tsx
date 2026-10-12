import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from 'helix-design-system/components';

const OPTIONS = [
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'bandung', label: 'Bandung' },
  { value: 'surabaya', label: 'Surabaya' },
  { value: 'medan', label: 'Medan' },
  { value: 'makassar', label: 'Makassar' },
  { value: 'bali', label: 'Bali', disabled: true },
];

const meta = {
  title: 'Molecule/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    selection: { control: 'select', options: ['single', 'multi'] },
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    floating: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { options: OPTIONS, placeholder: 'Select a city', label: 'City', selection: 'single' },
  decorators: [(Story) => <div style={{ width: 280, minHeight: 360 }}><Story /></div>],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Trigger — Input, Input + Label, Input-Floating, Input Horizontal. */
export const Triggers: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Select {...args} label={undefined} />
      <Select {...args} />
      <Select {...args} floating />
      <Select {...args} layout="horizontal" />
    </div>
  ),
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

/** Figma Selection=Multi — search, checkbox rows, and Clear / Apply. */
export const Multi: Story = { args: { selection: 'multi', defaultValues: ['jakarta', 'bandung'], placeholder: 'Select cities' } };

export const WithHint: Story = { args: { hint: 'Choose the lab nearest to you.' } };
export const WithError: Story = { args: { error: 'Select a city to continue.' } };
export const Disabled: Story = { args: { disabled: true } };
