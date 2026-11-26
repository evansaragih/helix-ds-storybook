import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeekPicker } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input Pickers/Week Picker',
  component: WeekPicker,
  tags: ['autodocs'],
  args: { defaultMonth: new Date(2026, 0, 1), defaultValue: { start: new Date(2026, 0, 8), end: new Date(2026, 0, 14) } },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof WeekPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Week Picker — month and year header and the weeks of that month, each labelled with its date range. Weeks are 7-day blocks from the 1st, so the last can be shorter. onChange receives `{ start, end }`. */
export const Playground: Story = {};

/** The last week of a month can be shorter (W5 here is 3 days), and February can have only four. */
export const ShortLastWeek: Story = { args: { defaultMonth: new Date(2026, 1, 1), defaultValue: null } };

/** Weeks that can't be picked, for example the ones already in the past. */
export const WithDisabledWeeks: Story = { args: { isDisabled: (w: { start: Date; end: Date }) => w.end < new Date(2026, 0, 10) } };

/** Month names follow `locale`; the default is Bahasa Indonesia, as in Figma. */
export const English: Story = { args: { locale: 'en-US' } };
