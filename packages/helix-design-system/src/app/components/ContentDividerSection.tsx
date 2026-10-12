import { ComponentDocPage } from './ComponentDocPage';
import { ContentDivider, Button } from '../../components';

export function ContentDividerSection() {
  return (
    <ComponentDocPage
      slug="content-divider"
      title="Content Divider"
      description="A divider with content embedded inline — a section separator that also needs a label or an inline action. For a plain unlabeled line use Divider."
      usage={[
        { heading: 'Label a break', body: 'Use a label or caption to name the section that follows.' },
        { heading: 'Inline action', body: 'Place a Button or Icon Button in the middle for add-here patterns.' },
        { heading: 'Three looks', body: 'Sides, Top-Bottom and Background suit different densities.' },
      ]}
      demos={[
        { id: 'appearances', title: 'Appearances', node: (<div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>{(['sides','top-bottom','background'] as const).map(a => <ContentDivider key={a} appearance={a}>Notifications</ContentDivider>)}</div>) },
        { id: 'caption', title: 'Caption', node: (<div style={{ width: 320 }}><ContentDivider caption>Today</ContentDivider></div>) },
        { id: 'button', title: 'With button', node: (<div style={{ width: 320 }}><ContentDivider><Button hierarchy="secondary" appearance="solid" size="sm">Add</Button></ContentDivider></div>) },
      ]}
    />
  );
}
