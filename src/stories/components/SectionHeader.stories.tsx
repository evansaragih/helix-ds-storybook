import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeader, Button, ToolbarFilter } from 'helix-design-system/components';
import { Plus } from 'lucide-react';

const meta = {
  title: 'Molecule/Section Header',
  component: SectionHeader,
  tags: ['autodocs'],
  args: { title: 'Growth Analytics' },
  decorators: [(Story) => <div style={{ width: 900 }}><Story /></div>],
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithAction: Story = {
  args: { actions: <Button hierarchy="primary" appearance="solid" size="sm" leadingIcon={<Plus size={14} />}>Add new</Button> },
};

export const WithToolbar: Story = {
  args: {
    actions: <Button hierarchy="primary" appearance="solid" size="sm">Add new</Button>,
    toolbar: <ToolbarFilter />,
  },
};
