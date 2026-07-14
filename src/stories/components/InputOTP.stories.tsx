import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputOTP } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['Digits Only', 'Alphanumeric'] },
    state: { control: 'select', options: ['Default', 'Invalid', 'Error', 'Disabled'] },
  },
  args: {
    variant: 'Digits Only',
    state: 'Default',
    label: 'Enter verification code',
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Alphanumeric: Story = {
  args: { variant: 'Alphanumeric', label: 'Enter your access code' },
};

export const Invalid: Story = {
  args: { state: 'Invalid', value: '123' },
};

export const Disabled: Story = {
  args: { state: 'Disabled', value: '123456' },
};

export const Prefilled: Story = {
  args: { value: '482913' },
};
