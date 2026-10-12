import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabelValue } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Label Value',
  component: LabelValue,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['vertical', 'horizontal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { label: 'Sample ID', value: 'SMP-2026-0142', layout: 'vertical', size: 'md' },
} satisfies Meta<typeof LabelValue>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => <LabelValue key={size} {...args} size={size} />)}
    </div>
  ),
};

export const Horizontal: Story = { args: { layout: 'horizontal' } };

/** Several side by side, e.g. a record summary. */
export const Row: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 48 }}>
      <LabelValue {...args} label="Sample ID" value="SMP-2026-0142" />
      <LabelValue {...args} label="Analyst" value="Dewi Lestari" />
      <LabelValue {...args} label="Received" value="7 Oct 2026" />
    </div>
  ),
};
