import { ComponentDocPage } from './ComponentDocPage';
import { IconTile } from '../../components';
import { Beaker } from 'lucide-react';

export function IconTileSection() {
  return (
    <ComponentDocPage
      slug="icon-tile"
      title="Icon Tile"
      description="A tile with a centered icon on a colored background — a decorative or status icon container for list items and modals. For a clickable icon use Icon Button."
      usage={[
        { heading: 'Decorative container', body: 'Use for leading visuals in list items, empty states and featured icons — not for actions.' },
        { heading: 'Solid for emphasis', body: 'Solid tiles pull attention; use Subtle when several tiles sit together.' },
        { heading: 'Match the status', body: 'Success, warning, destructive and info tiles should agree with the message beside them.' },
      ]}
      demos={[
        { id: 'sizes', title: 'Sizes', node: (<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>{(['xs','sm','md','lg'] as const).map(s => <IconTile key={s} size={s} icon={<Beaker />} />)}</div>) },
        { id: 'colors', title: 'Colors and appearance', node: (<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{(['solid','subtle'] as const).map(a => <div key={a} style={{ display: 'flex', gap: 12 }}>{(['primary','secondary','tertiary','success','warning','destructive','info','neutral'] as const).map(c => <IconTile key={c} color={c} appearance={a} icon={<Beaker />} />)}</div>)}</div>) },
        { id: 'shape', title: 'Shape', node: (<div style={{ display: 'flex', gap: 16 }}><IconTile shape="square" icon={<Beaker />} /><IconTile shape="circle" icon={<Beaker />} /></div>) },
      ]}
    />
  );
}
