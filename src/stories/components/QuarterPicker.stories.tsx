import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuarterPicker } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input Pickers/Quarter Picker',
  component: QuarterPicker,
  tags: ['autodocs'],
  args: { defaultValue: new Date(2026, 3, 1) },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof QuarterPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Quarter Picker — year header and four tiles, Q1 to Q4, each with its months. onChange receives the 1st day of the quarter. */
export const Playground: Story = {};

/** Figma _period-cell State=Disabled — quarters after the current one can't be picked. */
export const WithDisabledQuarters: Story = { args: { defaultValue: new Date(2026, 6, 1), isDisabled: (q: Date) => q > new Date(2026, 9, 1) } };

/** Month names in the tiles follow `locale`; the default is Bahasa Indonesia, as in Figma. */
export const English: Story = { args: { locale: 'en-US' } };
