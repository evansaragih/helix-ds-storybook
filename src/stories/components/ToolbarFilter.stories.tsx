import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ToolbarFilter } from 'helix-design-system/components';

const SORT = [{ value: 'date', label: 'Date' }, { value: 'name', label: 'Name' }, { value: 'status', label: 'Status' }];
const STATUS = [{ value: 'completed', label: 'Completed' }, { value: 'processing', label: 'Processing' }, { value: 'failed', label: 'Failed' }];
const TYPE = [{ value: 'stool', label: 'Stool' }, { value: 'swab', label: 'Swab' }, { value: 'water', label: 'Water' }];

const meta = {
  title: 'Molecule/Filter',
  component: ToolbarFilter,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ width: 640, minHeight: 260 }}><Story /></div>],
} satisfies Meta<typeof ToolbarFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [sort, setSort] = useState('date');
    const [status, setStatus] = useState<string>();
    const [type, setType] = useState<string>();
    return (
      <ToolbarFilter
        sort={[{ id: 'sort', label: `Sort: ${SORT.find((s) => s.value === sort)?.label}`, options: SORT, value: sort, onValueChange: setSort }]}
        filters={[
          { id: 'status', label: 'Status', options: STATUS, value: status, onValueChange: setStatus },
          { id: 'type', label: 'Type', options: TYPE, value: type, onValueChange: setType },
        ]}
        onReset={() => { setSort('date'); setStatus(undefined); setType(undefined); }}
      />
    );
  },
};

export const WithoutReset: Story = {
  args: { filters: [{ id: 'status', label: 'Status', options: STATUS }] },
};
