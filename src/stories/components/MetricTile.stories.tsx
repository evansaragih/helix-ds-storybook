import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricTile, InfoBadge, Divider } from 'helix-design-system/components';
import { Activity, Beaker } from 'lucide-react';

const SPARK = (
  <svg width="107" height="58" viewBox="0 0 107 58" aria-hidden="true">
    {Array.from({ length: 36 }, (_, i) => {
      const h = 8 + ((i * 37) % 38);
      return <rect key={i} x={i * 3} y={58 - h} width="2" height={h} rx="1" fill="var(--color-brand-primary, #F57E20)" />;
    })}
  </svg>
);

const meta = {
  title: 'Organism/Metric Tile',
  component: MetricTile,
  tags: ['autodocs'],
  argTypes: { variant: { control: 'select', options: ['simple', 'with-footer', 'detailed'] } },
  args: {
    variant: 'simple',
    icon: <Activity size={14} />,
    label: 'Metrics label',
    value: '1,234',
    delta: { label: '+4%', color: 'success' },
    comparison: 'vs February 2026',
    graph: SPARK,
  },
  decorators: [(Story) => <div style={{ width: 254 }}><Story /></div>],
} satisfies Meta<typeof MetricTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {};

export const WithFooter: Story = {
  args: { variant: 'with-footer', footer: <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: 'var(--color-text-secondary, #49494A)' }}>Updated 5 min ago</span> },
};

export const Detailed: Story = {
  args: {
    variant: 'detailed',
    children: (
      <>
        <Divider />
        <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, color: 'var(--color-text-secondary, #49494A)' }}>Retention rate</span>
        <div style={{ height: 120, borderRadius: 8, background: 'var(--color-container-secondary, #F7F7F7)' }} />
      </>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 12 }}>
        <InfoBadge appearance="snippet-card" icon={<Beaker size={24} />} label="Batch :" value="B-2026-24" />
        <InfoBadge appearance="snippet-card" icon={<Beaker size={24} />} label="Samples :" value="148" />
      </div>
    ),
  },
  decorators: [(Story) => <div style={{ width: 592 }}><Story /></div>],
};
