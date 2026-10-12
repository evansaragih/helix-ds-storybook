import { ComponentDocPage } from './ComponentDocPage';
import { LoadingState } from '../../components';

export function LoadingStateSection() {
  return (
    <ComponentDocPage
      slug="loading-state"
      title="Loading States"
      description="A loading placeholder for a list, table, card or whole section while data loads. Use the skeleton types when the final layout is known, the spinner type when it is not."
      usage={[
        { heading: 'Skeleton when known', body: 'List, Card and Table mirror the final content so nothing jumps when data arrives.' },
        { heading: 'Spinner when unknown', body: 'The spinner type centers a short message for waits with no predictable layout.' },
        { heading: 'Compact inside panels', body: 'Use the compact size inside cards, popovers and drawers.' },
      ]}
      demos={[
        { id: 'types', title: 'Types', node: (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 360px)', gap: 16 }}>{(['spinner','list','card','table'] as const).map(t => <div key={t} style={{ background: '#fff', border: '1px solid #EEEEEE', borderRadius: 8 }}><LoadingState type={t} /></div>)}</div>) },
        { id: 'compact', title: 'Compact', node: (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 360px)', gap: 16 }}>{(['spinner','list','card','table'] as const).map(t => <div key={t} style={{ background: '#fff', border: '1px solid #EEEEEE', borderRadius: 8 }}><LoadingState type={t} size="compact" /></div>)}</div>) },
      ]}
    />
  );
}
