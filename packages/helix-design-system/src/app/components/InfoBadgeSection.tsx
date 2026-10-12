import { ComponentDocPage } from './ComponentDocPage';
import { InfoBadge } from '../../components';
import { FileText } from 'lucide-react';

export function InfoBadgeSection() {
  return (
    <ComponentDocPage
      slug="info-badge"
      title="Meta Badge"
      description="A compact label and value highlight with a leading icon — for IDs, references and metadata. Use Label Value for plain read-only data."
      usage={[
        { heading: 'Highlight a reference', body: 'Use for IDs and codes the user may need to find or copy.' },
        { heading: 'Pick the density', body: 'Snippet card is roomy; Info Pill and Meta Badge are inline.' },
        { heading: 'Reference card', body: 'The orange reference card emphasises the value itself.' },
      ]}
      demos={[
        { id: 'appearances', title: 'Appearances', node: (<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>{(['snippet-card','meta-badge','info-pill','reference-card'] as const).map(a => <InfoBadge key={a} appearance={a} icon={<FileText size={20} />} label="Submission ID" value="RCP-2026-a7f3c8d1" />)}</div>) },
      ]}
    />
  );
}
