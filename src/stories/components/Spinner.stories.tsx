import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Loading indicator/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    brand: { control: 'select', options: ['nusantics', 'cekolam', 'causa', 'neutral'] },
    size: { control: { type: 'number', min: 12, max: 96 } },
  },
  args: { brand: 'nusantics', size: 48 },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Brand. Neutral is white, so it sits on a dark surface. */
export const Brands: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center', background: '#F7F7F7', padding: 24, borderRadius: 12 }}>
      {(['nusantics', 'cekolam', 'causa'] as const).map((brand) => <Spinner key={brand} {...args} brand={brand} />)}
      <div style={{ background: '#14141E', padding: 12, borderRadius: 8 }}><Spinner {...args} brand="neutral" /></div>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {[16, 24, 32, 48, 64].map((size) => <Spinner key={size} {...args} size={size} />)}
    </div>
  ),
};
