import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog, Button, FooterActions, Input } from 'helix-design-system/components';
import { Beaker } from 'lucide-react';

const body = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Input label="Sample name" placeholder="SMP-2026-0142" />
    <Input label="Analyst" placeholder="Dewi Lestari" />
  </div>
);

const footer = (
  <FooterActions>
    <Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </FooterActions>
);

const meta = {
  title: 'Molecule/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    headerLayout: { control: 'select', options: ['stacked-horizontal', 'stacked-left', 'stacked-centered'] },
    iconStatus: { control: 'select', options: ['default', 'success', 'warning', 'destructive', 'info'] },
    showClose: { control: 'boolean' },
  },
  args: {
    trigger: <Button>Open dialog</Button>,
    title: 'New sample',
    description: 'Add the details for a new sample. You can edit them later.',
    icon: <Beaker size={24} />,
    iconStatus: 'default',
    headerLayout: 'stacked-horizontal',
    children: body,
    footer,
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const StackedLeft: Story = { args: { headerLayout: 'stacked-left' } };
export const StackedCentered: Story = { args: { headerLayout: 'stacked-centered' } };
export const NoIcon: Story = { args: { icon: undefined } };
export const WithHeaderAction: Story = { args: { headerAction: <Button size="sm" hierarchy="secondary" appearance="outline">Export</Button> } };
export const Open: Story = { args: { defaultOpen: true, trigger: undefined } };

/** Long content scrolls inside the body; header and footer stay pinned and the dialog never exceeds the viewport. */
export const LongContent: Story = {
  args: {
    defaultOpen: true,
    trigger: undefined,
    title: 'Skipped comparisons',
    description: '55 comparisons were skipped.',
    children: (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Array.from({ length: 55 }, (_, i) => <li key={i}>SUBJ-{String(i + 1).padStart(3, '0')} vs SUBJ-{String(i + 2).padStart(3, '0')}</li>)}
      </ul>
    ),
  },
};
