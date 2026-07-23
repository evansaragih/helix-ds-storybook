import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardMetric } from 'helix-design-system/components';
import { FlaskConical } from 'lucide-react';

const meta = {
  title: 'Components/Data Display/CardMetric',
  component: CardMetric,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
  },
  args: {
    label: 'Samples processed',
    value: 1284,
    trend: 'up',
    trendValue: '+12.4%',
    trendLabel: 'vs last month',
    icon: <FlaskConical size={18} />,
  },
} satisfies Meta<typeof CardMetric>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 280 }}><CardMetric {...args} /></div>,
};

export const Trends: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {(['up', 'down', 'neutral'] as const).map((trend) => (
        <div key={trend} style={{ width: 260 }}>
          <CardMetric {...args} trend={trend} trendValue={trend === 'up' ? '+12.4%' : trend === 'down' ? '-4.1%' : '0%'} />
        </div>
      ))}
    </div>
  ),
};

export const WithUnit: Story = {
  args: { label: 'Average turnaround', value: 5.2, unit: 'days', icon: undefined, trend: 'down', trendValue: '-0.8d' },
  render: (args) => <div style={{ width: 280 }}><CardMetric {...args} /></div>,
};

export const WithoutTrend: Story = {
  args: { trend: undefined, trendValue: undefined, trendLabel: undefined, description: 'Updated 2 hours ago' },
  render: (args) => <div style={{ width: 280 }}><CardMetric {...args} /></div>,
};

export const WithChartAndFooter: Story = {
  args: {
    onMoreClick: () => {},
    chart: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-tertiary)', fontSize: 12 }}>Chart goes here</div>,
    footerAction: { label: 'View details', onClick: () => {} },
    floatingIcon: <FlaskConical size={20} />,
  },
  render: (args) => <div style={{ width: 320 }}><CardMetric {...args} /></div>,
};
