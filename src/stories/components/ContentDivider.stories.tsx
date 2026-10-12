import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContentDivider, Button, IconButton } from 'helix-design-system/components';
import { Plus } from 'lucide-react';

const meta = {
  title: 'Molecule/Content Divider',
  component: ContentDivider,
  tags: ['autodocs'],
  argTypes: {
    appearance: { control: 'select', options: ['sides', 'top-bottom', 'background'] },
    caption: { control: 'boolean' },
  },
  args: { appearance: 'sides', children: 'Notifications' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
} satisfies Meta<typeof ContentDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Appearances: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {(['sides', 'top-bottom', 'background'] as const).map((appearance) => (
        <ContentDivider key={appearance} {...args} appearance={appearance} />
      ))}
    </div>
  ),
};

export const Caption: Story = { args: { children: 'Today', caption: true } };

export const WithButton: Story = {
  args: { children: <Button hierarchy="secondary" appearance="solid" size="sm">Add</Button> },
};

export const WithIconButton: Story = {
  args: { children: <IconButton aria-label="Add" hierarchy="secondary" appearance="solid" shape="rounded" icon={<Plus size={16} />} /> },
};
