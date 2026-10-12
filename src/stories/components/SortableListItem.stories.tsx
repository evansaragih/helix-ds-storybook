import type { Meta, StoryObj } from '@storybook/react-vite';
import { SortableListItem } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Item/Sortable List Item',
  component: SortableListItem,
  tags: ['autodocs'],
  args: { children: 'Group name', dragging: false, disabled: false },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
} satisfies Meta<typeof SortableListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <SortableListItem {...args}>Default</SortableListItem>
      <SortableListItem {...args} dragging>Dragging</SortableListItem>
      <SortableListItem {...args} disabled>Disabled</SortableListItem>
    </div>
  ),
};
