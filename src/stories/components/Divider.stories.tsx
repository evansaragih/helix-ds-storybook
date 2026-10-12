import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    type: { control: 'select', options: ['line', 'dash'] },
  },
  args: { orientation: 'horizontal', type: 'line' },
  decorators: [(Story) => <div style={{ width: 500 }}><Story /></div>],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Dash: Story = { args: { type: 'dash' } };

/** Figma Rotation=Vertical — stretches to the height of its row. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 40, fontFamily: 'var(--font-family-body)', fontSize: 13 }}>
      <span>Left</span><Divider {...args} /><span>Right</span>
    </div>
  ),
};
