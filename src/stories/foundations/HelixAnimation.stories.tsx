import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelixAnimation } from 'helix-design-system/components';

const meta = {
  title: 'Foundations/Helix Animation',
  component: HelixAnimation,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'range', min: 120, max: 640, step: 20 } },
    duration: { control: { type: 'range', min: 2, max: 14, step: 1 } },
    rungs: { control: { type: 'range', min: 8, max: 24, step: 1 } },
  },
  args: { size: 360, duration: 6, rungs: 14 },
} satisfies Meta<typeof HelixAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Brands: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 48 }}>
      {(['nusantics', 'cekolam', 'causa'] as const).map((b) => (
        <div key={b} data-brand={b} style={{ textAlign: 'center', fontFamily: 'var(--font-family-body)', fontSize: 13 }}>
          <HelixAnimation {...args} size={240} />
          {b}
        </div>
      ))}
    </div>
  ),
};
