import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoCard } from 'helix-design-system/components';
import { Info, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

const meta = {
  title: 'Components/Data Display/InfoCard',
  component: InfoCard,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'brand', 'success', 'warning', 'error', 'info'] },
  },
  args: {
    variant: 'default',
    title: 'Sample results ready',
    description: 'Your microbiome analysis has completed processing.',
    icon: <Info size={20} />,
  },
} satisfies Meta<typeof InfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <div style={{ width: 360 }}><InfoCard {...args} /></div>,
};

const VARIANT_ICONS = {
  default: <Info size={20} />,
  brand: <Sparkles size={20} />,
  success: <CheckCircle2 size={20} />,
  warning: <AlertTriangle size={20} />,
  error: <XCircle size={20} />,
  info: <Info size={20} />,
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
      {(['default', 'brand', 'success', 'warning', 'error', 'info'] as const).map((variant) => (
        <InfoCard key={variant} {...args} variant={variant} icon={VARIANT_ICONS[variant]} title={`${variant[0].toUpperCase()}${variant.slice(1)} card`} />
      ))}
    </div>
  ),
};

export const Compact: Story = {
  args: { compact: true },
  render: (args) => <div style={{ width: 360 }}><InfoCard {...args} /></div>,
};

export const WithAction: Story = {
  args: { action: { label: 'View report', onClick: () => {} } },
  render: (args) => <div style={{ width: 360 }}><InfoCard {...args} /></div>,
};

export const Clickable: Story = {
  args: { onClick: () => {} },
  render: (args) => <div style={{ width: 360 }}><InfoCard {...args} /></div>,
};

export const WithFooter: Story = {
  args: {
    footer: (
      <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 12, color: 'var(--color-text-tertiary)' }}>
        Updated 3 minutes ago
      </span>
    ),
  },
  render: (args) => <div style={{ width: 360 }}><InfoCard {...args} /></div>,
};
