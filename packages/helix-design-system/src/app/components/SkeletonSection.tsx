import { ComponentDocPage } from './ComponentDocPage';
import { Skeleton } from '../../components';

export function SkeletonSection() {
  return (
    <ComponentDocPage
      slug="skeleton"
      title="Skeleton"
      description="A neutral placeholder block that stands in for content while it loads. Compose several to mirror the final layout; use Spinner when the layout is unknown."
      usage={[
        { heading: 'Mirror the content', body: 'Match the shape and rough size of what will load to avoid layout shift.' },
        { heading: 'Don\'t mix with real data', body: 'Swap the whole group at once rather than one block at a time.' },
        { heading: 'Spinner for unknowns', body: 'If you can\'t predict the layout, a Spinner or Loading State is clearer.' },
      ]}
      demos={[
        { id: 'shapes', title: 'Shapes', node: (<div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>{(['text','title','circle','rectangle'] as const).map(s => <Skeleton key={s} shape={s} />)}</div>) },
        { id: 'composed', title: 'Composed list item', node: (<div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 320 }}><Skeleton shape="circle" /><div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}><Skeleton shape="title" width="60%" /><Skeleton shape="text" width="100%" /></div></div>) },
      ]}
    />
  );
}
