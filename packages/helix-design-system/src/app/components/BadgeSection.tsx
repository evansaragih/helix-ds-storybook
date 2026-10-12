import { ComponentDocPage } from './ComponentDocPage';
import { Badge, BadgeGroup } from '../../components';
import { Star } from 'lucide-react';

const COLORS = ['brand', 'info', 'success', 'warning', 'error', 'neutral'] as const;
const APPEARANCES = ['solid', 'outline', 'subtle'] as const;

export function BadgeSection() {
  return (
    <ComponentDocPage
      slug="badge"
      title="Badge"
      description="Status or label badge. Use for compact status, category or count indicators. For clickable filter chips use Tag."
      usage={[
        { heading: 'Status, not action', body: 'A badge describes something. If it can be clicked or removed, use a Tag.' },
        { heading: 'Pick the color by meaning', body: 'Success, warning, error and info carry meaning; brand and neutral are for everything else.' },
        { heading: 'Solid for emphasis', body: 'Use Solid sparingly; Subtle and Outline keep dense tables calm.' },
      ]}
      demos={[
        { id: 'matrix', title: 'Color and Appearance',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {APPEARANCES.map((a) => <div key={a} style={{ display: 'flex', gap: 8 }}>{COLORS.map((c) => <Badge key={c} size="md" color={c} appearance={a} label={c} />)}</div>)}
            </div>
          ) },
        { id: 'sizes', title: 'Sizes',
          node: <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{(['xs', 'sm', 'md', 'lg'] as const).map((s) => <Badge key={s} size={s} label={s} />)}</div> },
        { id: 'slots', title: 'Icon, status and loading',
          node: <div style={{ display: 'flex', gap: 8 }}><Badge size="md" leadingIcon={<Star size={12} />} label="Leading" /><Badge size="md" trailingIcon={<Star size={12} />} label="Trailing" /><Badge size="md" status color="success" label="Status" /><Badge size="md" loading label="Loading" /></div> },
        { id: 'group', title: 'Badge Group',
          node: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>{(['brand', 'neutral', 'error', 'warning', 'success'] as const).map((c) => <BadgeGroup key={c} color={c} badge="New">We just launched the lab portal</BadgeGroup>)}<BadgeGroup size="lg" position="trailing" dot badge="Beta">Lab portal is in beta</BadgeGroup></div> },
      ]}
    />
  );
}
