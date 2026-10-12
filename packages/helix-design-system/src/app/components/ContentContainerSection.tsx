import { ComponentDocPage } from './ComponentDocPage';
import { ContentContainer, Button } from '../../components';

const header = <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px' }}>Section title</span>;
const body = <div style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>Content goes here — any layout fits inside the body slot.</div>;
const footer = <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}><Button size="sm" hierarchy="secondary" appearance="outline">Cancel</Button><Button size="sm">Save</Button></div>;
const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 16, width: 480 };
const w = (n: React.ReactNode) => <div style={{ width: 480 }}>{n}</div>;

export function ContentContainerSection() {
  return (
    <ComponentDocPage
      slug="content-container"
      title="Content Container"
      description="The shared shell behind Dialog, Sheet and dashboard section cards, built from Header, Body and Footer slots. Use it to give arbitrary content a consistent surface, border and padding."
      usage={[
        { heading: 'A neutral shell', body: 'Reach for it when you need a card with a header and body — not for a floating panel (use Popover).' },
        { heading: 'Slots, not props', body: 'Pass any content to header, children and footer; the container only supplies surface, border and padding.' },
        { heading: 'Intent sparingly', body: 'The destructive and brand tints are for single callouts, not for whole pages.' },
      ]}
      demos={[
        { id: 'basic', title: 'Header, body and footer', description: 'Flush: the body runs to the edges and the footer sits on a subtle surface.', node: w(<ContentContainer header={header} footer={footer} contentSurface="default">{body}</ContentContainer>) },
        { id: 'content', title: 'Content style', description: 'Flush runs the body edge to edge; Floating insets it in a fully rounded card.', node: <div style={col}><ContentContainer header={header} headerDivider={false}>{body}</ContentContainer><ContentContainer contentStyle="floating" header={header} headerDivider={false}>{body}</ContentContainer></div> },
        { id: 'surface', title: 'Surface', description: 'White or Gray shell. Gray pairs best with a Floating, default-surface body.', node: <div style={col}><ContentContainer surface="gray" contentStyle="floating" contentSurface="default" header={header} headerDivider={false}>{body}</ContentContainer><ContentContainer surface="gray" contentStyle="floating" contentSurface="default" header={header} footer={footer}>{body}</ContentContainer></div> },
        { id: 'split', title: 'Dividers and border', description: 'Header Divider, Section Split and Border are independent switches.', node: <div style={col}><ContentContainer contentSurface="default" divided={false} header={header} footer={footer}>{body}</ContentContainer><ContentContainer contentSurface="default" border={false} header={header} footer={footer}>{body}</ContentContainer></div> },
        { id: 'intent', title: 'Intent', node: <div style={col}><ContentContainer intent="destructive" contentStyle="floating" contentSurface="default" footer="This action cannot be undone.">{body}</ContentContainer><ContentContainer intent="brand" contentStyle="floating" contentSurface="default" footer="Recommended for your plan.">{body}</ContentContainer></div> },
      ]}
    />
  );
}
