import { ComponentDocPage } from './ComponentDocPage';
import { ContentContainer, Button } from '../../components';

const header = <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px' }}>Section title</span>;
const body = <div style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>Content goes here — any layout fits inside the body slot.</div>;
const footer = <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}><Button size="sm" hierarchy="secondary" appearance="outline">Cancel</Button><Button size="sm">Save</Button></div>;
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
        { id: 'basic', title: 'Header, body and footer', node: w(<ContentContainer header={header} footer={footer}>{body}</ContentContainer>) },
        { id: 'style', title: 'Surface and content style', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 480 }}><ContentContainer surface="gray" contentSurface="default" header={header}>{body}</ContentContainer><ContentContainer surface="gray" contentStyle="floating" contentSurface="default" header={header} footer={footer}>{body}</ContentContainer></div> },
        { id: 'intent', title: 'Intent', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 480 }}><ContentContainer intent="destructive" contentStyle="floating" contentSurface="default" footer="This action cannot be undone.">{body}</ContentContainer><ContentContainer intent="brand" contentStyle="floating" contentSurface="default" footer="Recommended for your plan.">{body}</ContentContainer></div> },
      ]}
    />
  );
}
