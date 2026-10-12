import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingState } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Loading States/Loading State',
  component: LoadingState,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['spinner', 'list', 'card', 'table'] },
    size: { control: 'select', options: ['default', 'compact'] },
  },
  args: { type: 'spinner', size: 'default' },
  decorators: [(Story) => <div style={{ width: 384, border: '1px solid var(--color-stroke-subtle, #EEEEEE)', borderRadius: 8 }}><Story /></div>],
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Types: Story = {
  decorators: [],
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 384px)', gap: 16 }}>
      {(['spinner', 'list', 'card', 'table'] as const).map((type) => (
        <div key={type} style={{ border: '1px solid var(--color-stroke-subtle, #EEEEEE)', borderRadius: 8 }}>
          <LoadingState {...args} type={type} />
        </div>
      ))}
    </div>
  ),
};

export const Compact: Story = {
  decorators: [],
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 384px)', gap: 16 }}>
      {(['spinner', 'list', 'card', 'table'] as const).map((type) => (
        <div key={type} style={{ border: '1px solid var(--color-stroke-subtle, #EEEEEE)', borderRadius: 8 }}>
          <LoadingState {...args} type={type} size="compact" />
        </div>
      ))}
    </div>
  ),
};
