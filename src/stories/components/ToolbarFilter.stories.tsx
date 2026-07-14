import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToolbarFilter, Button } from 'helix-design-system/components';

const FILTERS = [
  {
    key: 'status',
    label: 'Status',
    multiple: true,
    options: [
      { value: 'completed', label: 'Completed' },
      { value: 'processing', label: 'Processing' },
      { value: 'failed', label: 'Failed' },
    ],
  },
  {
    key: 'type',
    label: 'Sample type',
    options: [
      { value: 'stool', label: 'Stool' },
      { value: 'swab', label: 'Swab' },
      { value: 'water', label: 'Water' },
    ],
  },
];

const meta = {
  title: 'Components/Navigation/ToolbarFilter',
  component: ToolbarFilter,
  tags: ['autodocs'],
  args: {
    filters: FILTERS,
    searchPlaceholder: 'Search samples…',
    totalResults: 128,
  },
} satisfies Meta<typeof ToolbarFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToolbarDemo(args: React.ComponentProps<typeof ToolbarFilter>) {
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<Record<string, string | string[]>>({ status: ['completed'] });

  return (
    <ToolbarFilter
      {...args}
      searchValue={search}
      onSearchChange={setSearch}
      activeFilters={active}
      onFilterChange={(key, value) => setActive((prev) => ({ ...prev, [key]: value }))}
      onClearAll={() => setActive({})}
    />
  );
}

export const Playground: Story = {
  render: (args) => <div style={{ width: 720 }}><ToolbarDemo {...args} /></div>,
};

export const NoActiveFilters: Story = {
  render: (args) => {
    function Demo() {
      const [search, setSearch] = useState('');
      return (
        <ToolbarFilter
          {...args}
          searchValue={search}
          onSearchChange={setSearch}
          activeFilters={{}}
          onFilterChange={() => {}}
        />
      );
    }
    return <div style={{ width: 720 }}><Demo /></div>;
  },
};

export const WithActions: Story = {
  render: (args) => <div style={{ width: 720 }}><ToolbarDemo {...args} actions={<Button size="sm">Export</Button>} /></div>,
};

export const NoSearch: Story = {
  render: (args) => {
    function Demo() {
      const [active, setActive] = useState<Record<string, string | string[]>>({});
      return (
        <ToolbarFilter
          {...args}
          activeFilters={active}
          onFilterChange={(key, value) => setActive((prev) => ({ ...prev, [key]: value }))}
        />
      );
    }
    return <div style={{ width: 720 }}><Demo /></div>;
  },
};
