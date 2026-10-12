import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Slider } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['default', 'compact'] },
    valueTooltip: { control: 'select', options: ['interact', 'always', 'never'] },
    disabled: { control: 'boolean' },
  },
  args: { defaultValue: 50, size: 'default', valueTooltip: 'interact', 'aria-label': 'Value' },
  decorators: [(Story) => <div style={{ width: 280, padding: '56px 0 16px' }}><Story /></div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Size — Default 8px track · Compact 4px track. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
      <Slider {...args} size="default" valueTooltip="always" />
      <Slider {...args} size="compact" valueTooltip="always" />
    </div>
  ),
};

/** Figma State=Disabled — grey thumb, no value bubble. */
export const Disabled: Story = { args: { disabled: true } };

/** Shown all the time instead of on hover, focus and drag. */
export const ValueAlwaysVisible: Story = { args: { valueTooltip: 'always' } };

export const Controlled: Story = {
  render: (args) => {
    const [v, setV] = useState(30);
    return <Slider {...args} value={v} onValueChange={setV} formatValue={(n) => `${n}%`} />;
  },
};
