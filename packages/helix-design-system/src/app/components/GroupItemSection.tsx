import { ComponentDocPage } from './ComponentDocPage';
import { GroupItem, IconTile, Avatar, Badge } from '../../components';
import { Beaker, Image as ImageIcon } from 'lucide-react';

export function GroupItemSection() {
  return (
    <ComponentDocPage
      slug="group-item"
      title="Group Item"
      description="A selectable row for a Checkbox or Radio group — a form checklist, settings list or plan picker. Use List Item for a generic menu or navigation row."
      usage={[
        { heading: 'Checkbox or radio', body: 'Choose the control that matches the selection model.' },
        { heading: 'Describe the choice', body: 'Add a description when the title alone doesn\'t explain the consequence.' },
        { heading: 'Destructive ring', body: 'Flag choices that delete or remove things.' },
        { heading: 'Hover and focus', body: 'Hovering draws a grey edge and lifts the shadow; keyboard focus draws a brand ring. Clicking anywhere on the card toggles its control.' },
      ]}
      demos={[
        { id: 'states', title: 'States', node: (<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 400 }}><GroupItem title="Basic plan" description="Up to 10 samples per month." /><GroupItem checked title="Basic plan" description="Up to 10 samples per month." /><GroupItem destructive title="Delete all samples" description="This cannot be undone." /><GroupItem disabled title="Basic plan" description="Up to 10 samples per month." /></div>) },
        { id: 'types', title: 'Types', description: 'Standard, with an icon or avatar (the control moves to the end), Icon card and Item Photo Card.', node: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 483 }}>
            <GroupItem size="sm" title="Basic plan" trailing="$10/month" description="Includes up to 10 users, 20GB individual data and access to all features." leading={<IconTile icon={<Beaker size={24} />} size="md" appearance="solid" />} />
            <GroupItem size="sm" title="Olivia Rhye" description="Product Manager, Integrations" leading={<Avatar size="md" initials="OR" />} />
            <GroupItem type="icon-card" size="sm" title="Basic plan" leading={<IconTile icon={<Beaker size={20} />} size="sm" appearance="solid" />}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><strong style={{ fontSize: 31 }}>$10</strong><span style={{ flex: 1 }}>per month</span><Badge size="xs" color="success" appearance="subtle" label="Limited time only" /></div>
            </GroupItem>
            <div style={{ width: 296 }}><GroupItem type="photo-card" size="sm" title="Filename.pdf" trailing="14 MB" description="Last modify: 23.06.2026" image={<ImageIcon size={64} color="#6B7A8C" />} /></div>
          </div>
        ) },
      ]}
    />
  );
}
