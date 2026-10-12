import { ComponentDocPage } from './ComponentDocPage';
import { DropdownMenu, Button, Tag, ListItem } from '../../components';
import { Pencil, Copy, Trash2 } from 'lucide-react';

export function DropdownMenuSection() {
  return (
    <ComponentDocPage
      slug="dropdown-menu"
      title="Dropdown"
      description="An action menu opened from a Button, Icon Button, Tag or List Item. Choosing an item runs it and closes the menu. Use Select for choosing a value."
      usage={[
        { heading: 'Actions, not values', body: 'Items run commands. For picking a value use Select.' },
        { heading: 'Destructive last', body: 'Group risky actions below a divider and color them as destructive.' },
        { heading: 'Header for context', body: 'Add a heading or avatar group when the menu acts on a shared object.' },
      ]}
      demos={[
        { id: 'basic', title: 'Button trigger', node: (<div style={{ minHeight: 280 }}><DropdownMenu trigger={<Button hierarchy="secondary" appearance="outline" size="sm">Actions</Button>} header="Sample actions" items={[{ label: 'Edit', icon: <Pencil size={16} />, shortcut: '⌘E' }, { label: 'Duplicate', icon: <Copy size={16} /> }, { type: 'divider' }, { label: 'Delete', icon: <Trash2 size={16} />, destructive: true }]} /></div>) },
        { id: 'list-item', title: 'List Item trigger', description: 'A plain row, such as an account row in a sidebar or navbar.', node: (<div style={{ minHeight: 240 }}><DropdownMenu trigger={<ListItem label="Account" />} items={[{ label: 'Profile' }, { label: 'Settings' }, { type: 'divider' }, { label: 'Sign out', destructive: true }]} /></div>) },
        { id: 'tag', title: 'Tag trigger', node: (<div style={{ minHeight: 240 }}><DropdownMenu trigger={<Tag label="Status" />} items={[{ label: 'Pending' }, { label: 'In progress' }, { label: 'Done' }]} /></div>) },
      ]}
    />
  );
}
