import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Loading States/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: { shape: { control: 'select', options: ['text', 'title', 'circle', 'rectangle'] } },
  args: { shape: 'text' },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
      {(['text', 'title', 'circle', 'rectangle'] as const).map((shape) => <Skeleton key={shape} shape={shape} />)}
    </div>
  ),
};

/** Compose skeletons to mirror the final content shape. */
export const ListItem: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 320 }}>
      <Skeleton shape="circle" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <Skeleton shape="title" width="60%" />
        <Skeleton shape="text" width="100%" />
      </div>
    </div>
  ),
};
