import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListItem } from 'helix-design-system/components';
import { Pencil, Trash2, Settings } from 'lucide-react';

const meta = {
  title: 'Molecule/Item/List Item',
  component: ListItem,
  tags: ['autodocs'],
  args: { label: 'List item', trailing: '⌘K', onClick: () => {} },
  decorators: [(Story) => <div style={{ width: 240 }}><Story /></div>],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma State — Default, Hover (interactive), Active, Primary, Destructive, Disabled. */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <ListItem {...args} label="Default" leading={<Settings size={16} />} />
      <ListItem {...args} label="Active" active />
      <ListItem {...args} label="Primary" primary />
      <ListItem {...args} label="Destructive" destructive leading={<Trash2 size={16} />} />
      <ListItem {...args} label="Disabled" disabled />
    </div>
  ),
};

export const WithLeading: Story = { args: { leading: <Pencil size={16} />, trailing: undefined } };
