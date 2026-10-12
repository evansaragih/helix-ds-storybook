import { useState } from 'react';
import { ComponentDocPage } from './ComponentDocPage';
import { ToolbarFilter, FilterSectionHeader, FilterGroupCard, SideFilterPanel } from '../../components';

const STATUS = [{ value: 'completed', label: 'Completed' }, { value: 'processing', label: 'Processing' }, { value: 'failed', label: 'Failed' }];

const COLUMNS = [{ value: 'status', label: 'Status' }, { value: 'type', label: 'Sample type' }, { value: 'analyst', label: 'Analyst' }];
const VALUES: Record<string, { value: string; label: string }[]> = {
  status: STATUS,
  type: [{ value: 'stool', label: 'Stool' }, { value: 'swab', label: 'Swab' }, { value: 'water', label: 'Water' }],
};

function FilterGroup({ initial }: { initial: string }) {
  const [column, setColumn] = useState(initial);
  const [selected, setSelected] = useState<string[]>([]);
  return <FilterGroupCard columns={COLUMNS} column={column} onColumnChange={(c) => { setColumn(c); setSelected([]); }} values={VALUES[column] ?? []} selected={selected} onSelectedChange={setSelected} onRemove={() => {}} />;
}

function SidePanelDemo() {
  const [field, setField] = useState<string>();
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  return (
    <div style={{ border: '1px solid var(--color-stroke-subtle)', minHeight: 520 }}>
      <SideFilterPanel filterTitle="Filter samples by meta" onAddFilter={() => {}} sortTitle="Sort samples by" onAddSort={() => {}} sortFields={COLUMNS} sortField={field} onSortFieldChange={setField} sortDirection={dir} onSortDirectionChange={setDir}>
        <FilterGroup initial="status" />
        <FilterGroup initial="type" />
      </SideFilterPanel>
    </div>
  );
}

export function ToolbarFilterSection() {
  return (
    <ComponentDocPage
      slug="toolbar-filter"
      title="Filter"
      description="Controls for narrowing and ordering a list or table: a toolbar of sort and filter chips with a Reset link, a section header with an add button, and a side filter panel built from filter group cards."
      usage={[
        { heading: 'Chips for quick filters', body: 'Use the toolbar for a few common filters above a table; each chip opens its options.' },
        { heading: 'Panel for many filters', body: 'When people combine several columns, use the side panel with one card per column.' },
        { heading: 'Always reset', body: 'Show the Reset link so people can get back to the full list in one click.' },
      ]}
      demos={[
        { id: 'toolbar', title: 'Toolbar Filter', description: 'Click a chip to open its options.',
          node: <div style={{ width: 640, minHeight: 220 }}><ToolbarFilter sort={[{ id: 's', label: 'Sort: Date', options: [{ value: 'date', label: 'Date' }, { value: 'name', label: 'Name' }], value: 'date' }]} filters={[{ id: 'st', label: 'Status', options: STATUS }, { id: 'ty', label: 'Type', options: STATUS }]} onReset={() => {}} /></div> },
        { id: 'header', title: 'Filter Section Header', node: <div style={{ width: 320 }}><FilterSectionHeader title="Filter samples by meta" onAdd={() => {}} /></div> },
        { id: 'side-panel', title: 'Side Filter Panel', description: 'One filter group card per column, plus a sort section.', node: <SidePanelDemo /> },
      ]}
    />
  );
}
