import { ComponentDocPage } from './ComponentDocPage';
import { LabelValue } from '../../components';

export function LabelValueSection() {
  return (
    <ComponentDocPage
      slug="label-value"
      title="Label Value"
      description="A read-only label and value display for static data — it replaces disabled inputs. For editable data use Input."
      usage={[
        { heading: 'Read-only data', body: 'Use for record details and summaries. If the user can edit it, use an Input.' },
        { heading: 'Vertical by default', body: 'Switch to horizontal for dense key-value lists.' },
        { heading: 'Side by side', body: 'Group several in a row for a record summary.' },
      ]}
      demos={[
        { id: 'sizes', title: 'Sizes', node: (<div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>{(['sm','md','lg'] as const).map(s => <LabelValue key={s} size={s} label="Sample ID" value="SMP-2026-0142" />)}</div>) },
        { id: 'horizontal', title: 'Horizontal', node: (<LabelValue layout="horizontal" label="Analyst" value="Dewi Lestari" />) },
        { id: 'row', title: 'Record summary', node: (<div style={{ display: 'flex', gap: 48 }}><LabelValue label="Sample ID" value="SMP-2026-0142" /><LabelValue label="Analyst" value="Dewi Lestari" /><LabelValue label="Received" value="7 Oct 2026" /></div>) },
      ]}
    />
  );
}
