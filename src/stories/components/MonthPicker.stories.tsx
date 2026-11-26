import type { Meta, StoryObj } from '@storybook/react-vite';
import { MonthPicker } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input Pickers/Month Picker',
  component: MonthPicker,
  tags: ['autodocs'],
  args: { defaultValue: new Date(2026, 5, 1) },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof MonthPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Month Picker — year header with chevrons (or the year dropdown) and a 3x4 grid of months. onChange receives the 1st of the month. */
export const Playground: Story = {};

/** Figma _period-cell State=Disabled — months after the current one can't be picked. */
export const WithDisabledMonths: Story = { args: { defaultValue: new Date(2026, 9, 1), isDisabled: (m: Date) => m > new Date(2026, 10, 1) } };

/** Month names follow `locale`; the default is Bahasa Indonesia, as in Figma. */
export const English: Story = { args: { locale: 'en-US' } };
