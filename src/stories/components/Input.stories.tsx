import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from 'helix-design-system/components';
import { Search, Mail } from 'lucide-react';

const meta = {
  title: 'Components/Inputs & Forms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    size: 'md',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <Input key={size} {...args} size={size} label={`Size ${size}`} />
      ))}
    </div>
  ),
};

export const Floating: Story = {
  args: { floating: true, label: 'Email address' },
};

export const WithLeadingIcon: Story = {
  args: { leadingContent: <Search size={16} />, placeholder: 'Search…', label: undefined },
};

export const WithDividerContent: Story = {
  args: { leadingContent: <Mail size={16} />, leadingDivider: true, label: 'Email' },
};

export const HelperText: Story = {
  args: { helperText: 'We’ll never share your email.' },
};

export const Invalid: Story = {
  args: { error: true, errorText: 'Please enter a valid email address.' },
};

export const CharCount: Story = {
  args: { showCharCount: true, maxLength: 120, label: 'Bio', helperText: undefined },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'disabled@example.com' },
};
