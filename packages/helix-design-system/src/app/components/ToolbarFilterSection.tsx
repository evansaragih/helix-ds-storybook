import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { ToolbarFilter } from '../../components/ToolbarFilter';
import { Button } from '../../components';
import { Plus, Download } from 'lucide-react';

const toc = [
  { id: 'toolbar-usage', label: 'Usage Guidelines' },
  { id: 'toolbar-search', label: 'Search Only' },
  { id: 'toolbar-filters', label: 'With Filters' },
  { id: 'toolbar-full', label: 'Full Toolbar' },
];

const statusFilter = {
  key: 'status',
  label: 'Status',
  multiple: true,
  options: [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'archived', label: 'Archived' },
  ],
};

const roleFilter = {
  key: 'role',
  label: 'Role',
  options: [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ],
};

export function ToolbarFilterSection() {
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [search3, setSearch3] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});

  const handleFilterChange = (key: string, value: string | string[]) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setSearch2('');
    setActiveFilters({});
  };

  const totalResults = 247;

  return (
    <PageLayout
      category="Components"
      title="Toolbar Filter"
      description="Toolbar filters give users control over list and table views by combining search, filter dropdowns, result counts, and action buttons in a single composable bar."
      tocItems={toc}
    >
      <Section id="toolbar-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Always show result count', body: 'After any filter is applied, show the number of matching results. This gives users instant feedback on the impact of their selection.' },
            { heading: 'Persist active state', body: 'Active filters should be visually distinct — highlighted border, fill, and count badge. Users should be able to see at a glance which filters are on.' },
            { heading: 'Easy to clear', body: 'Provide a "Clear all" button whenever at least one filter is active. Don\'t make users individually deselect each filter.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="toolbar-search" title="Search Only">
        <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
          <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>Search bar</p>
          <ToolbarFilter
            searchValue={search1}
            onSearchChange={setSearch1}
            searchPlaceholder="Search members…"
            totalResults={totalResults}
          />
        </div>
      </Section>

      <Section id="toolbar-filters" title="With Filters">
        <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
          <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>Search + filters (try clicking the filter buttons)</p>
          <ToolbarFilter
            searchValue={search2}
            onSearchChange={setSearch2}
            filters={[statusFilter, roleFilter]}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAll}
            totalResults={totalResults}
          />
        </div>
      </Section>

      <Section id="toolbar-full" title="Full Toolbar">
        <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
          <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>Search + filters + actions</p>
          <ToolbarFilter
            searchValue={search3}
            onSearchChange={setSearch3}
            searchPlaceholder="Search projects…"
            filters={[statusFilter, roleFilter]}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAll}
            totalResults={totalResults}
            actions={
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="neutral" size="sm" leadingIcon={<Download size={14} />}>Export</Button>
                <Button variant="primary" size="sm" leadingIcon={<Plus size={14} />}>New project</Button>
              </div>
            }
          />
        </div>
      </Section>
    </PageLayout>
  );
}
