import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from 'helix-design-system/components';

const meta = {
  title: 'Organism/Date Pickers/Date Picker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['single', 'range', 'date-time', 'time'] },
    weekStartsOn: { control: 'select', options: [0, 1] },
  },
  args: { mode: 'single', defaultValue: new Date(2026, 3, 15) },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Figma Mode=Range — click a start and an end date. */
export const Range: Story = { args: { mode: 'range', defaultMonth: new Date(2026, 3, 1), defaultRange: { start: new Date(2026, 3, 10), end: new Date(2026, 3, 17) } } };
export const DateAndTime: Story = { args: { mode: 'date-time', defaultValue: new Date(2026, 3, 15, 9, 30) } };
export const Time: Story = { args: { mode: 'time', defaultValue: new Date(2026, 3, 15, 9, 30) } };
export const MondayFirst: Story = { args: { weekStartsOn: 1 } };
export const WithDisabledDates: Story = { args: { isDisabled: (d: Date) => d.getDay() === 0 || d.getDay() === 6 } };
