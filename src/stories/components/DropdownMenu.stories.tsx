import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropdownMenu, Button, Tag, IconButton, AvatarGroup, ListItem } from 'helix-design-system/components';
import { Pencil, Copy, Trash2, MoreHorizontal } from 'lucide-react';

const ITEMS = [
  { label: 'Edit', icon: <Pencil size={16} />, shortcut: '⌘E' },
  { label: 'Duplicate', icon: <Copy size={16} /> },
  { type: 'divider' as const },
  { label: 'Archive', disabled: true },
  { label: 'Delete', icon: <Trash2 size={16} />, destructive: true },
];

const meta = {
  title: 'Molecule/Dropdown',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: { side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] }, align: { control: 'select', options: ['start', 'center', 'end'] } },
  args: { items: ITEMS, trigger: <Button hierarchy="secondary" appearance="outline" size="sm">Actions</Button> },
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ minHeight: 280, paddingTop: 16 }}><Story /></div>],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const WithHeading: Story = { args: { header: 'Sample actions' } };
export const WithAvatarGroup: Story = {
  args: { header: <AvatarGroup size="xs" items={[{ id: 1, name: 'Sari Dewi' }, { id: 2, name: 'Budi Santoso' }, { id: 3, name: 'Rina K' }]} /> },
};
export const TagTrigger: Story = { args: { trigger: <Tag label="Status" /> } };
/** Figma _popover-trigger Type=List Item — a plain row, e.g. an account row in a sidebar or navbar. */
export const ListItemTrigger: Story = { args: { trigger: <ListItem label="Account" /> } };
export const IconTrigger: Story = {
  args: { trigger: <IconButton aria-label="More" hierarchy="secondary" appearance="ghost" shape="rounded" icon={<MoreHorizontal size={16} />} />, align: 'end' },
};
