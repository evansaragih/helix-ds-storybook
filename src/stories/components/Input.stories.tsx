import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from 'helix-design-system/components';
import { Search, ChevronDown } from 'lucide-react';

const meta = {
  title: 'Molecule/Input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    floating: { control: 'boolean' },
    required: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Label', placeholder: 'Placeholder', hint: 'This is a hint text to help user.' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma State — Default, Hovered, Focused, Error, Disabled. Hover and focus are interactive. */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input {...args} />
      <Input {...args} defaultValue="Filled text" />
      <Input {...args} error="This is an error message." hint={undefined} />
      <Input {...args} disabled />
    </div>
  ),
};

export const Floating: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input {...args} floating />
      <Input {...args} floating defaultValue="Filled text" />
      <Input {...args} floating error="This is an error message." hint={undefined} />
    </div>
  ),
};

export const Horizontal: Story = { args: { layout: 'horizontal' }, decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>] };

export const LeadingAndTrailing: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Input {...args} label="Search" leading={<Search size={16} />} hint={undefined} />
      <Input {...args} label="Country" leading="+62" leadingDivider trailing={<ChevronDown size={16} />} hint={undefined} />
      <Input {...args} label="Website" leading="https://" leadingDivider required hint={undefined} />
    </div>
  ),
};
