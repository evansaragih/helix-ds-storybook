import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComparisonTable } from 'helix-design-system/components';

const COLUMNS = [
  { key: 'starter', label: 'Starter' },
  { key: 'pro', label: 'Pro', highlighted: true, badge: 'Popular' },
  { key: 'enterprise', label: 'Enterprise' },
];

const ROWS = [
  { feature: 'Sample submissions / month', group: 'Usage', values: { starter: '10', pro: '100', enterprise: 'Unlimited' } },
  { feature: 'Turnaround time', group: 'Usage', values: { starter: '10 days', pro: '5 days', enterprise: '2 days' } },
  { feature: 'Microbiome report', group: 'Features', values: { starter: true, pro: true, enterprise: true } },
  { feature: 'API access', group: 'Features', values: { starter: false, pro: true, enterprise: true } },
  { feature: 'Custom integrations', group: 'Features', values: { starter: false, pro: 'partial', enterprise: true } },
  { feature: 'Dedicated support', group: 'Support', values: { starter: false, pro: false, enterprise: true } },
];

const meta = {
  title: 'Components/Data Display/ComparisonTable',
  component: ComparisonTable,
  tags: ['autodocs'],
  args: {
    columns: COLUMNS,
    rows: ROWS,
    featureLabel: 'Feature',
  },
} satisfies Meta<typeof ComparisonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 720 }}><ComparisonTable {...args} /></div>,
};

export const TwoPlans: Story = {
  args: {
    columns: [
      { key: 'free', label: 'Free' },
      { key: 'paid', label: 'Paid', highlighted: true },
    ],
    rows: ROWS.map((r) => ({ ...r, values: { free: r.values.starter, paid: r.values.pro } })),
  },
  render: (args) => <div style={{ width: 480 }}><ComparisonTable {...args} /></div>,
};

export const StickyHeader: Story = {
  args: { stickyHeader: true },
  render: (args) => (
    <div style={{ width: 720, height: 240, overflow: 'auto' }}>
      <ComparisonTable {...args} />
    </div>
  ),
};
