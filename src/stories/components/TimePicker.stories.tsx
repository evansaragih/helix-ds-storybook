import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input Pickers/Time Picker',
  component: TimePicker,
  tags: ['autodocs'],
  args: { defaultValue: new Date(2026, 3, 15, 9, 30, 0) },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma Time Picker — scroll columns for hours, minutes and seconds, then Now / Set. Read the time from onChange (live) or onSet (confirmed). */
export const Playground: Story = {};

/** Figma Show Seconds off — hours and minutes only. */
export const NoSeconds: Story = { args: { showSeconds: false } };

/** Figma Show AM/PM — 12-hour clock with an AM/PM column. */
export const AmPm: Story = { args: { showAmPm: true, defaultValue: new Date(2026, 3, 15, 14, 30, 0) } };

/** Hours, minutes, seconds and AM/PM together. */
export const AmPmNoSeconds: Story = { args: { showAmPm: true, showSeconds: false, defaultValue: new Date(2026, 3, 15, 14, 30, 0) } };
