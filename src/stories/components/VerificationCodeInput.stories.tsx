import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerificationCodeInput } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input/Verification Code Input Field',
  component: VerificationCodeInput,
  tags: ['autodocs'],
  argTypes: { layout: { control: 'select', options: ['4-digit', '6-digit-split'] }, disabled: { control: 'boolean' } },
  args: { layout: '4-digit', label: 'Secure code', hint: 'This is a hint text to help user.' },
} satisfies Meta<typeof VerificationCodeInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const SixDigitSplit: Story = { args: { layout: '6-digit-split' } };
export const WithError: Story = { args: { error: 'That code is not valid.', hint: undefined } };
export const Disabled: Story = { args: { disabled: true } };
