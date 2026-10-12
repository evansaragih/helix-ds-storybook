import { ComponentDocPage } from './ComponentDocPage';
import { Divider } from '../../components';

export function DividerSection() {
  return (
    <ComponentDocPage
      slug="divider"
      title="Divider"
      description="A simple horizontal or vertical separator line. Use for splitting adjacent sections with no label; for a divider with an embedded label or action use Content Divider."
      usage={[
        { heading: 'Space first', body: 'Try spacing and grouping before adding a line — dividers add visual noise.' },
        { heading: 'Line or dash', body: 'Use the solid line by default; the dashed one for softer, secondary separation.' },
        { heading: 'Need a label?', body: 'When the separator carries text or a button, use Content Divider instead.' },
      ]}
      demos={[
        { id: 'types', title: 'Line and dash', node: <div style={{ width: 500, display: 'flex', flexDirection: 'column', gap: 16 }}><Divider /><Divider type="dash" /></div> },
        { id: 'vertical', title: 'Vertical', node: <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 40, fontFamily: 'var(--font-family-body)', fontSize: 13 }}><span>Left</span><Divider orientation="vertical" /><span>Middle</span><Divider orientation="vertical" type="dash" /><span>Right</span></div> },
      ]}
    />
  );
}
