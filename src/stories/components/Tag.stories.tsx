import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from 'helix-design-system/components';
import { Globe } from 'lucide-react';

const meta = {
  title: 'Components/Data Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    label: 'Label',
    size: 'md',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Tag key={size} {...args} size={size} label={size} />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: { leadingIcon: <Globe size={12} /> },
};

export const WithAvatar: Story = {
  args: { avatarSrc: 'https://i.pravatar.cc/64?img=12' },
};

export const WithStatusDot: Story = {
  args: { status: true },
};

export const Closable: Story = {
  args: { onClose: () => {} },
};

export const WithCount: Story = {
  args: { count: 5 },
};

export const Selectable: Story = {
  args: { checkbox: true, checked: true },
};

export const Combined: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag label="Design" onClose={() => {}} />
      <Tag label="Global" leadingIcon={<Globe size={12} />} count={5} />
      <Tag label="Selected" checkbox checked onClose={() => {}} />
    </div>
  ),
};
