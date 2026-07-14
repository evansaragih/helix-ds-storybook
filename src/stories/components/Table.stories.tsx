import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table, Badge } from 'helix-design-system/components';
import type { Column } from 'helix-design-system/components';

interface SampleRow {
  id: string;
  sample: string;
  type: string;
  status: 'completed' | 'processing' | 'failed';
  submitted: string;
}

const COLUMNS: Column<SampleRow>[] = [
  { key: 'id', header: 'ID', width: 100 },
  { key: 'sample', header: 'Sample' },
  { key: 'type', header: 'Type' },
  {
    key: 'status',
    header: 'Status',
    render: (row: SampleRow) => (
      <Badge
        label={row.status}
        variant={row.status === 'completed' ? 'green' : row.status === 'processing' ? 'yellow' : 'red'}
        size="sm"
      />
    ),
  },
  { key: 'submitted', header: 'Submitted', align: 'right' as const },
];

const DATA: SampleRow[] = [
  { id: 'A-2291', sample: 'Gut microbiome panel', type: 'Stool', status: 'completed', submitted: '2 days ago' },
  { id: 'A-2292', sample: 'Skin microbiome panel', type: 'Swab', status: 'processing', submitted: '1 day ago' },
  { id: 'A-2293', sample: 'Water quality panel', type: 'Water', status: 'failed', submitted: '3 days ago' },
  { id: 'A-2294', sample: 'Soil health panel', type: 'Soil', status: 'completed', submitted: '5 days ago' },
];

const meta = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    columns: COLUMNS as unknown as Column<unknown>[],
    data: DATA,
    size: 'md',
    hoverable: true,
    bordered: true,
    striped: false,
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 720 }}><Table {...args} /></div>,
};

export const Striped: Story = {
  args: { striped: true },
  render: (args) => <div style={{ width: 720 }}><Table {...args} /></div>,
};

export const WithCellBorders: Story = {
  args: { cellBorders: true },
  render: (args) => <div style={{ width: 720 }}><Table {...args} /></div>,
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => <div style={{ width: 720 }}><Table {...args} /></div>,
};

export const Empty: Story = {
  args: { data: [], emptyText: 'No samples submitted yet.' },
  render: (args) => <div style={{ width: 720 }}><Table {...args} /></div>,
};

export const Borderless: Story = {
  args: { bordered: false },
  render: (args) => <div style={{ width: 720 }}><Table {...args} /></div>,
};

const WIDE_COLUMNS: Column<SampleRow>[] = [
  { key: 'id', header: 'ID', width: 100 },
  { key: 'sample', header: 'Sample', width: 260 },
  { key: 'type', header: 'Type', width: 200 },
  {
    key: 'status',
    header: 'Status',
    width: 200,
    render: (row: SampleRow) => (
      <Badge
        label={row.status}
        variant={row.status === 'completed' ? 'green' : row.status === 'processing' ? 'yellow' : 'red'}
        size="sm"
      />
    ),
  },
  { key: 'submitted', header: 'Submitted', width: 200, align: 'right' as const },
];

export const FrozenLastColumn: Story = {
  args: { columns: WIDE_COLUMNS as unknown as Column<unknown>[], freezeLastColumn: true },
  render: (args) => (
    <div style={{ width: 480 }}>
      <Table {...args} />
    </div>
  ),
};
