import { ComponentDocPage } from './ComponentDocPage';
import { EmptyState } from '../../components';

const TYPES = ['search', 'users', 'files', 'integrations', 'no-data', 'no-lab-results', 'error', 'no-permission'] as const;
const box = (n: React.ReactNode, w = 384) => <div style={{ width: w, border: '1px solid #EEEEEE', borderRadius: 12, background: '#fff' }}>{n}</div>;

export function EmptyStateSection() {
  return (
    <ComponentDocPage
      slug="empty-state"
      title="Empty States"
      description="A placeholder for lists, tables and search results with no content — no data, no results, an error, or no permission."
      usage={[
        { heading: 'Say why, then what next', body: 'Explain why it is empty in one line and offer the action that fills it.' },
        { heading: 'Match the scenario', body: 'Pick the Type that fits — each ships with an illustration and sensible default text.' },
        { heading: 'Compact in panels', body: 'Use the compact size inside cards, popovers and drawers.' },
      ]}
      demos={[
        { id: 'types', title: 'Types', node: <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 384px)', gap: 16 }}>{TYPES.map((t) => <div key={t}>{box(<EmptyState type={t} primaryAction={{ label: 'New item' }} secondaryAction={{ label: 'Clear search' }} />)}</div>)}</div> },
        { id: 'compact', title: 'Compact', node: box(<EmptyState type="search" size="compact" primaryAction={{ label: 'New item' }} secondaryAction={{ label: 'Clear' }} />, 352) },
        { id: 'biotech', title: 'Biotech illustrations', node: <div style={{ display: 'flex', gap: 16 }}>{(['dna', 'rna', 'lab-flask', 'microscope'] as const).map((i) => <div key={i}>{box(<EmptyState type="no-lab-results" illustration={i} title={i} description="Biotech illustration" />, 240)}</div>)}</div> },
      ]}
    />
  );
}
