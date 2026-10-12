import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tag } from 'helix-design-system/components';
import { Globe } from 'lucide-react';

const meta = {
  title: 'Molecule/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['neutral', 'brand', 'transparent'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Tag', size: 'md', color: 'neutral' },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Color × State. */
export const ColorsAndStates: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 12 }}>
      {(['neutral', 'brand', 'transparent'] as const).flatMap((color) => [
        <Tag key={`${color}-d`} {...args} color={color} label={`${color}`} />,
        <Tag key={`${color}-s`} {...args} color={color} selected label="selected" />,
        <Tag key={`${color}-x`} {...args} color={color} disabled label="disabled" />,
        <Tag key={`${color}-c`} {...args} color={color} onClose={() => {}} label="closable" />,
      ])}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => <Tag key={size} {...args} size={size} label={size} />)}
    </div>
  ),
};

export const Slots: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Tag {...args} leadingIcon={<Globe size={12} />} label="Leading icon" />
      <Tag {...args} leadingDot label="Leading dot" />
      <Tag {...args} trailingCount={5} label="Trailing count" />
      <Tag {...args} trailingIcon={<Globe size={12} />} label="Trailing icon" />
      <Tag {...args} onClose={() => {}} label="Trailing close" />
    </div>
  ),
};

export const WithCheckbox: Story = {
  render: (args) => {
    const [on, setOn] = useState(true);
    return <Tag {...args} leadingCheckbox selected={on} onSelectedChange={setOn} label="Selectable" />;
  },
};
