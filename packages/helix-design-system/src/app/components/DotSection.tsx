import { ComponentDocPage } from './ComponentDocPage';
import { Dot } from '../../components';

export function DotSection() {
  return (
    <ComponentDocPage
      slug="dot"
      title="Dot"
      description="A small filled circle indicating status or presence — on an Avatar, or inside a Badge or Tag. Use Badge when the marker needs a text label."
      usage={[
        { heading: 'Marker, not message', body: 'A dot alone carries no text — pair it with a label or place it on something that already explains it.' },
        { heading: 'Pick the semantic color', body: 'Success, warning and error mirror the status tokens; brand and neutral are for non-status presence.' },
        { heading: 'Ring on busy surfaces', body: 'Turn on the white ring when the dot overlaps an Avatar or icon so it stays legible.' },
      ]}
      demos={[
        { id: 'colors', title: 'Colors', node: (<div style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#14141E', padding: 16, borderRadius: 8 }}>{(['brand','neutral','info','success','warning','error','on-primary'] as const).map(c => <Dot key={c} color={c} size="xl" />)}</div>) },
        { id: 'sizes', title: 'Sizes', node: (<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>{(['xs','sm','md','lg','xl','2xl'] as const).map(s => <Dot key={s} size={s} />)}</div>) },
        { id: 'ring', title: 'With ring', node: (<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>{(['brand','success','warning','error'] as const).map(c => <Dot key={c} color={c} size="2xl" ring />)}</div>) },
      ]}
    />
  );
}
