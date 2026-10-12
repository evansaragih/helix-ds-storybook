import { ComponentDocPage } from './ComponentDocPage';
import { ListItem } from '../../components';
import { Pencil, Trash2, Settings } from 'lucide-react';

export function ListItemSection() {
  return (
    <ComponentDocPage
      slug="list-item"
      title="List Item"
      description="A single row for menus, dropdowns and navigation lists, with optional leading icon and trailing shortcut. Use Group Item for a Checkbox or Radio choice."
      usage={[
        { heading: 'Leading icon', body: 'Add an icon to make a row scannable; keep icons consistent across the list.' },
        { heading: 'Active vs primary', body: 'Active marks the current location; primary emphasises a preferred action.' },
        { heading: 'Destructive', body: 'Use for actions that delete or remove, and keep them last in the list.' },
      ]}
      demos={[
        { id: 'states', title: 'States', node: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 240 }}>
            <ListItem label="Default" leading={<Settings size={16} />} trailing="⌘K" />
            <ListItem label="Active" active />
            <ListItem label="Primary" primary leading={<Pencil size={16} />} />
            <ListItem label="Destructive" destructive leading={<Trash2 size={16} />} />
            <ListItem label="Disabled" disabled />
          </div>
        ) },
      ]}
    />
  );
}
