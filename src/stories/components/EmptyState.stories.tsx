import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from 'helix-design-system/components';

const meta = {
  title: 'Components/Feedback & Status/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'search', 'folder', 'image', 'file'] },
  },
  args: {
    variant: 'default',
    title: 'No samples yet',
    description: 'Once you submit a sample, it will show up here.',
    action: { label: 'Submit a sample', onClick: () => {} },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 420 }}><EmptyState {...args} /></div>,
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['default', 'search', 'folder', 'image', 'file'] as const).map((variant) => (
        <div key={variant} style={{ width: 260, border: '1px solid var(--color-stroke-subtle)', borderRadius: 8 }}>
          <EmptyState {...args} variant={variant} action={undefined} compact />
        </div>
      ))}
    </div>
  ),
};

export const WithSecondaryAction: Story = {
  args: {
    secondaryAction: { label: 'Learn more', onClick: () => {}, variant: 'outline' },
  },
  render: (args) => <div style={{ width: 420 }}><EmptyState {...args} /></div>,
};

export const NoAction: Story = {
  args: { action: undefined },
  render: (args) => <div style={{ width: 420 }}><EmptyState {...args} /></div>,
};

export const Compact: Story = {
  args: { compact: true },
  render: (args) => <div style={{ width: 320, border: '1px solid var(--color-stroke-subtle)', borderRadius: 8 }}><EmptyState {...args} /></div>,
};

export const SearchNoResults: Story = {
  args: {
    variant: 'search',
    title: 'No results found',
    description: 'Try adjusting your search or filters.',
    action: undefined,
  },
  render: (args) => <div style={{ width: 420 }}><EmptyState {...args} /></div>,
};
