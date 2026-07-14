import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    label: 'Enable notifications',
    size: 'md',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['sm', 'md'] as const).map((size) => (
        <Switch key={size} {...args} size={size} defaultChecked label={`Size ${size}`} />
      ))}
    </div>
  ),
};

export const WithHelperText: Story = {
  args: { helperText: 'Get an email when a new report is ready.' },
};

export const Invalid: Story = {
  args: { invalid: true, helperText: 'This setting requires verification.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};
