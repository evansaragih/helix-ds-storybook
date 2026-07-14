import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from 'helix-design-system/components';

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    total: 240,
    pageSize: 10,
    defaultPage: 3,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FewPages: Story = {
  args: { total: 40, pageSize: 10, defaultPage: 2 },
};

export const ManyPagesWithSiblings: Story = {
  args: { total: 500, pageSize: 10, defaultPage: 25, siblingCount: 2 },
};

export const WithRowsPerPage: Story = {
  args: { showRowsPerPage: true, pageSizes: [10, 25, 50, 100] },
};

export const FirstPage: Story = {
  args: { defaultPage: 1 },
};

export const LastPage: Story = {
  args: { total: 240, pageSize: 10, defaultPage: 24 },
};
