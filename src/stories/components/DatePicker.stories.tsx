import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from 'helix-design-system/components';

const meta = {
  title: 'Molecule/Input Pickers/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['single', 'range', 'week', 'date-time', 'time'] },
    weekStartsOn: { control: 'select', options: [0, 1] },
    timeInput: { control: 'inline-radio', options: ['spinner', 'dropdown'] },
  },
  args: { mode: 'single', defaultValue: new Date(2026, 3, 15) },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Mode=Range — two months side by side (Start | End). Click a start and an end date; the range can span both months. The arrows move both months together. */
export const Range: Story = { args: { mode: 'range', defaultMonth: new Date(2026, 3, 1), defaultRange: { start: new Date(2026, 3, 10), end: new Date(2026, 3, 17) } } };
/** Figma Mode=Range with Time Input=Spinner — Start time and End time under both calendars, then Now / Set. The range carries the times; Set reports it through onRangeSet. */
export const RangeWithTime: Story = { args: { mode: 'range', showTime: true, defaultMonth: new Date(2026, 3, 1), defaultRange: { start: new Date(2026, 3, 10, 9, 30, 0), end: new Date(2026, 3, 17, 17, 0, 0) } } };
/** Figma Mode=Range with Time Input=Dropdown. */
export const RangeWithTimeDropdown: Story = { args: { mode: 'range', showTime: true, timeInput: 'dropdown', defaultMonth: new Date(2026, 3, 1), defaultRange: { start: new Date(2026, 3, 10, 9, 30, 0), end: new Date(2026, 3, 17, 17, 0, 0) } } };

/** Figma Mode=Week — clicking a day selects its whole week. Read it from onRangeChange (start to end). */
export const Week: Story = { args: { mode: 'week', defaultMonth: new Date(2026, 5, 1), defaultRange: { start: new Date(2026, 5, 7), end: new Date(2026, 5, 13) } } };
/** Figma Show Week Number — adds a W column with the ISO week of each row; the panel grows from 252 to 288. */
export const WeekWithNumbers: Story = { args: { mode: 'week', showWeekNumbers: true, defaultMonth: new Date(2026, 5, 1), defaultRange: { start: new Date(2026, 5, 7), end: new Date(2026, 5, 13) } } };
/** Figma Mode=Date and Time, Time Input=Spinner — type in a field or use the arrow keys. Now fills in the current moment, Set reports the value through onSet. */
export const DateAndTime: Story = { args: { mode: 'date-time', defaultValue: new Date(2026, 3, 15, 9, 30, 0) } };
/** Figma Time Input=Dropdown — each segment is a Select. */
export const DateAndTimeDropdown: Story = { args: { mode: 'date-time', timeInput: 'dropdown', defaultValue: new Date(2026, 3, 15, 9, 30, 0) } };
/** Figma Show AM/PM — 12-hour clock. */
export const DateAndTimeAmPm: Story = { args: { mode: 'date-time', showAmPm: true, defaultValue: new Date(2026, 3, 15, 14, 30, 0) } };
/** Figma Show Seconds off — hours and minutes only. */
export const DateAndTimeNoSeconds: Story = { args: { mode: 'date-time', showSeconds: false, defaultValue: new Date(2026, 3, 15, 9, 30, 0) } };
export const Time: Story = { args: { mode: 'time', defaultValue: new Date(2026, 3, 15, 9, 30) } };
export const MondayFirst: Story = { args: { weekStartsOn: 1 } };
export const WithDisabledDates: Story = { args: { isDisabled: (d: Date) => d.getDay() === 0 || d.getDay() === 6 } };
