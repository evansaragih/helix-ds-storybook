import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SideFilterPanel, FilterGroupCard, FilterSectionHeader } from 'helix-design-system/components';

const COLUMNS = [{ value: 'status', label: 'Status' }, { value: 'type', label: 'Sample type' }, { value: 'analyst', label: 'Analyst' }];
const VALUES: Record<string, { value: string; label: string }[]> = {
  status: [{ value: 'completed', label: 'Completed' }, { value: 'processing', label: 'Processing' }, { value: 'failed', label: 'Failed' }],
  type: [{ value: 'stool', label: 'Stool' }, { value: 'swab', label: 'Swab' }, { value: 'water', label: 'Water' }],
};

const meta = {
  title: 'Molecule/Filter/Side Filter Panel',
  component: SideFilterPanel,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SideFilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function Group({ initial }: { initial: string }) {
  const [column, setColumn] = useState(initial);
  const [selected, setSelected] = useState<string[]>([]);
  return <FilterGroupCard columns={COLUMNS} column={column} onColumnChange={(c) => { setColumn(c); setSelected([]); }} values={VALUES[column] ?? []} selected={selected} onSelectedChange={setSelected} onRemove={() => {}} />;
}

export const Playground: Story = {
  render: () => {
    const [field, setField] = useState<string>();
    const [dir, setDir] = useState<'asc' | 'desc'>('asc');
    return (
      <div style={{ border: '1px solid #EEEEEE', minHeight: 520 }}>
        <SideFilterPanel
          filterTitle="Filter samples by meta"
          onAddFilter={() => {}}
          sortTitle="Sort samples by"
          onAddSort={() => {}}
          sortFields={COLUMNS}
          sortField={field}
          onSortFieldChange={setField}
          sortDirection={dir}
          onSortDirectionChange={setDir}
        >
          <Group initial="status" />
          <Group initial="type" />
        </SideFilterPanel>
      </div>
    );
  },
};

export const SectionHeader: Story = {
  render: () => <div style={{ width: 320 }}><FilterSectionHeader title="Filter samples by meta" onAdd={() => {}} /></div>,
};
