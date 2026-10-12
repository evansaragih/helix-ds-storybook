import { ComponentDocPage } from './ComponentDocPage';
import { IconButton } from '../../components';
import { Search } from 'lucide-react';

const HIERARCHIES = ['primary', 'secondary', 'tertiary', 'destructive'] as const;
const APPEARANCES = ['solid', 'outline', 'subtle', 'ghost'] as const;

export function IconButtonSection() {
  return (
    <ComponentDocPage
      slug="icon-button"
      title="Icon Button"
      description="A button that shows only an icon, no label. Use for compact actions in toolbars, headers and table rows. For actions that need a text label use Button."
      usage={[
        { heading: 'Always label it', body: 'An icon alone has no text — set aria-label, and add a Tooltip when the icon is not obvious.' },
        { heading: 'Match Button', body: 'Hierarchy and Appearance work exactly like Button. Link is not available.' },
        { heading: 'Badge for counts', body: 'Use the notification badge for unread or pending counts.' },
      ]}
      demos={[
        { id: 'matrix', title: 'Hierarchy and Appearance',
          node: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, max-content)', gap: 12 }}>
              {HIERARCHIES.flatMap((h) => APPEARANCES.map((a) => <IconButton key={h + a} aria-label={`${h} ${a}`} hierarchy={h} appearance={a} icon={<Search size={16} />} />))}
            </div>
          ) },
        { id: 'sizes', title: 'Sizes and shape', description: 'Extra small 24 · small 36 · medium 44 · large 52. Rounded or Pill.',
          node: (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
              {(['xs', 'sm', 'md', 'lg'] as const).map((s) => <IconButton key={s} aria-label={s} size={s} shape="pill" icon={<Search size={16} />} />)}
              {(['xs', 'sm', 'md', 'lg'] as const).map((s) => <IconButton key={`r${s}`} aria-label={s} size={s} shape="rounded" hierarchy="secondary" icon={<Search size={16} />} />)}
            </div>
          ) },
        { id: 'badge', title: 'Notification badge',
          node: <div style={{ display: 'flex', gap: 32, padding: 12 }}>{(['sm', 'md', 'lg'] as const).map((s) => <IconButton key={s} aria-label={s} size={s} hierarchy="secondary" notificationCount={3} icon={<Search size={16} />} />)}</div> },
      ]}
    />
  );
}
