import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldMessage } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input/Field Message',
  component: FieldMessage,
  tags: ['autodocs'],
  argTypes: { state: { control: 'select', options: ['default', 'error'] }, size: { control: 'select', options: ['md', 'sm'] }, showIcon: { control: 'boolean' } },
  args: { children: 'This is a hint text to help user.', state: 'default', size: 'md' },
} satisfies Meta<typeof FieldMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const StatesAndSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <FieldMessage>This is a hint text to help user.</FieldMessage>
      <FieldMessage state="error">This is an error message.</FieldMessage>
      <FieldMessage size="sm">Small hint text.</FieldMessage>
      <FieldMessage size="sm" state="error">Small error text.</FieldMessage>
    </div>
  ),
};
