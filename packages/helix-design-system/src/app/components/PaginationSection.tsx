import { ComponentDocPage } from './ComponentDocPage';
import { Pagination } from '../../components';
import type { PaginationContent } from '../../components';

const CONTENT: PaginationContent[] = ['numbered', 'simple', 'simple-reversed', 'simple-split', 'grouped', 'pagination-right', 'pagination-left', 'page-count', 'showing'];

export function PaginationSection() {
  return (
    <ComponentDocPage
      slug="pagination"
      title="Pagination"
      description="Page navigation for long lists and tables. Pick a content layout (numbered, simple, grouped, page count, showing…) and a density (full or compact icon navigation)."
      usage={[
        { heading: 'Match the data', body: 'Numbered suits tables with a known total; simple suits feeds and logs.' },
        { heading: 'Compact in tight spaces', body: 'The compact density swaps labels for icon buttons inside panels and cards.' },
        { heading: 'Rows per page', body: 'Offer it where users scan large tables; skip it for short lists.' },
      ]}
      demos={[
        { id: 'content', title: 'Content', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 800 }}>{CONTENT.map((c) => <div key={c}><div style={{ fontSize: 11, color: '#828282', marginBottom: 6 }}>{c}</div><Pagination total={100} defaultPage={2} content={c} /></div>)}</div> },
        { id: 'compact', title: 'Compact density', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>{(['numbered', 'simple', 'grouped'] as const).map((c) => <Pagination key={c} total={100} defaultPage={2} content={c} density="compact" style={{ width: 'auto' }} />)}</div> },
      ]}
    />
  );
}
