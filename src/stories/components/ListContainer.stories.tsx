import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListContainer } from 'helix-design-system/components';

const items = [
  { id: 1, title: 'Unchecked', description: 'Description text', trailingBadgeLabel: '3:45' },
  { id: 2, title: 'Unchecked', description: 'Description text', trailingBadgeLabel: '3:45' },
  { id: 3, title: 'Unchecked', description: 'Description text', trailingBadgeLabel: '3:45' },
];

const meta = {
  title: 'Components/Data Display/ListContainer',
  component: ListContainer,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['card-list', 'row-list', 'data-table', 'sortable-list'] },
  },
  args: {
    title: 'Title',
    description: 'Description',
    badgeLabel: 'Blue',
    items,
    showPagination: false,
  },
} satisfies Meta<typeof ListContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <ListContainer {...args} />
    </div>
  ),
};

export const WithPagination: Story = {
  args: { showPagination: true, paginationProps: { total: 3, pageSize: 1, page: 2 } },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ListContainer {...args} />
    </div>
  ),
};

export const WithFooterActions: Story = {
  args: { showFooterActions: true },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ListContainer {...args} />
    </div>
  ),
};

export const CustomBody: Story = {
  args: { items: undefined, layout: 'row-list' },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ListContainer {...args}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Row A', 'Row B', 'Row C'].map((r) => (
            <div key={r} style={{ padding: '8px 12px', borderRadius: 6, backgroundColor: '#F7F7F7', fontFamily: 'var(--font-family-body, Rubik)', fontSize: 13 }}>
              {r}
            </div>
          ))}
        </div>
      </ListContainer>
    </div>
  ),
};
