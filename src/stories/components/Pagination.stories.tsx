import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from 'helix-design-system/components';

const CONTENT = ['numbered', 'simple', 'simple-reversed', 'simple-split', 'grouped', 'pagination-right', 'pagination-left', 'page-count', 'showing'] as const;

const meta = {
  title: 'Molecule/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'select', options: CONTENT },
    density: { control: 'select', options: ['full', 'compact'] },
    showRowsPerPage: { control: 'boolean' },
  },
  args: { total: 100, pageSize: 10, defaultPage: 2, content: 'numbered', density: 'full' },
  decorators: [(Story) => <div style={{ width: 800 }}><Story /></div>],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Content × Density. */
export const AllContent: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {CONTENT.map((content) => (
        <div key={content} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 11, color: '#828282' }}>{content}</span>
          <Pagination {...args} content={content} />
        </div>
      ))}
    </div>
  ),
};

export const Compact: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      {(['numbered', 'simple', 'grouped'] as const).map((content) => <Pagination key={content} {...args} content={content} density="compact" style={{ width: 'auto' }} />)}
    </div>
  ),
};
