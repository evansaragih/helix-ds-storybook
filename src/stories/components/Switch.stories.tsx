import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from 'helix-design-system/components';

const meta = {
  title: 'Atomic/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Label', size: 'md' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md'] as const).map((size) => <Switch key={size} {...args} size={size} defaultChecked />)}
    </div>
  ),
};

/** Figma States — Off, On, Disabled, Invalid. Hover and focus are interactive. */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Switch {...args} label="Off" />
      <Switch {...args} label="On" defaultChecked />
      <Switch {...args} label="Disabled" disabled />
      <Switch {...args} label="Invalid" invalid feedback="This setting is required." />
    </div>
  ),
};

export const WithSupportingText: Story = { args: { supportingText: 'Notify me when a sample finishes processing.' } };
