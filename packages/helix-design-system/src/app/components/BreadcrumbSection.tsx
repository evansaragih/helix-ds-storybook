import { ComponentDocPage } from './ComponentDocPage';
import { Breadcrumb } from '../../components';

const ITEMS = [
  { label: 'Home', href: '#' },
  { label: 'Lab', href: '#' },
  { label: 'Processing', href: '#' },
  { label: 'Batch 24', href: '#' },
  { label: 'Sample SMP-0142' },
];

export function BreadcrumbSection() {
  return (
    <ComponentDocPage
      slug="breadcrumb"
      title="Breadcrumb"
      description="A trail of links showing where the current page sits in the hierarchy. It shows at most three crumbs: the first, a “…” menu with every step in between, and the current page. The last crumb can switch context."
      usage={[
        { heading: 'Show location, not history', body: 'A breadcrumb reflects the page hierarchy — not the path the user took to get here.' },
        { heading: 'Three crumbs at most', body: 'Past three, only the first and the last stay visible. The “…” opens a menu listing every step between them, so none is lost.' },
        { heading: 'Last crumb is the page', body: 'The current page is not a link; it can be a switcher between siblings.' },
      ]}
      demos={[
        { id: 'dividers', title: 'Dividers', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}><Breadcrumb items={ITEMS} /><Breadcrumb items={ITEMS} divider="slash" /></div> },
        { id: 'collapsed', title: 'Collapsed', description: 'Five crumbs collapse to three. Click the “…” to see the steps in between.', node: <div style={{ minHeight: 160 }}><Breadcrumb items={ITEMS} /></div> },
        { id: 'menu', title: 'Context switcher', node: <div style={{ minHeight: 160 }}><Breadcrumb items={ITEMS.slice(0, 3)} currentMenu={[{ label: 'Processing' }, { label: 'Reporting' }, { label: 'Archive' }]} /></div> },
      ]}
    />
  );
}
