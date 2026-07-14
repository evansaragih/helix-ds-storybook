import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from 'helix-design-system/components';

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian', disabled: true },
];

const meta = {
  title: 'Components/Inputs & Forms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    options: OPTIONS,
    label: 'Favorite fruit',
    placeholder: 'Select a fruit…',
    size: 'md',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 280 }}><Select {...args} /></div>,
};

export const Grouped: Story = {
  args: {
    options: undefined,
    groups: [
      { label: 'Citrus', options: [{ value: 'orange', label: 'Orange' }, { value: 'lemon', label: 'Lemon' }] },
      { label: 'Tropical', options: [{ value: 'mango', label: 'Mango' }, { value: 'papaya', label: 'Papaya' }] },
    ],
  },
  render: (args) => <div style={{ width: 280 }}><Select {...args} /></div>,
};

export const Invalid: Story = {
  args: { invalid: true, errorText: 'Please select a fruit.' },
  render: (args) => <div style={{ width: 280 }}><Select {...args} /></div>,
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'apple' },
  render: (args) => <div style={{ width: 280 }}><Select {...args} /></div>,
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} {...args} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
};
