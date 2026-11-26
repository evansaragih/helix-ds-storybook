import { ComponentDocPage } from './ComponentDocPage';
import { DatePicker, MonthPicker, QuarterPicker, TimePicker, WeekPicker } from '../../components';

export function DatePickerSection() {
  return (
    <ComponentDocPage
      slug="date-picker"
      title="Input Pickers"
      description="Panels for picking a date, a date range, a week, a time, a month or a quarter. Compose any of them in a Popover under an Input to make a field."
      usage={[
        { heading: 'Pick the right picker', body: 'Date Picker for a day, a range, a calendar week or a date and time. Time Picker for a time only. Month Picker and Quarter Picker for a period. Week Picker when you need one week as a date range, counted in 7-day blocks from the 1st.' },
        { heading: 'Disable what isn’t valid', body: 'Use isDisabled to grey out what can’t be chosen, such as weekends, the past, or months that have no data yet.' },
        { heading: 'Panel, not field', body: 'The pickers are the panel only. Pair one with an Input and a Popover for a complete field; they share the same shell, so they sit alike in the popover.' },
        { heading: 'Keyboard', body: 'Tab enters a picker on the selected item. Calendars: arrows move by a day or a week, Home and End go to the start and end of the week, PageUp and PageDown change the month (Shift: the year). Month, Quarter and Week lists: arrows move, Home and End jump, PageUp and PageDown change the year or month. Time columns: up and down step, left and right switch column. Enter or Space selects.' },
        { heading: 'Read the value you need', body: 'Date Picker returns a Date, or a range from onRangeChange (also for week mode). Month, Quarter and Week Picker return the first day of the period, or { start, end } for a week. Set confirms a date and time or a time through onSet.' },
      ]}
      demos={[
        { id: 'single', title: 'Single', node: <DatePicker defaultValue={new Date(2026, 3, 15)} /> },
        { id: 'range', title: 'Range', node: <DatePicker mode="range" defaultMonth={new Date(2026, 3, 1)} defaultRange={{ start: new Date(2026, 3, 10), end: new Date(2026, 3, 17) }} /> },
        { id: 'range-time', title: 'Range with time', node: <DatePicker mode="range" showTime defaultMonth={new Date(2026, 3, 1)} defaultRange={{ start: new Date(2026, 3, 10, 9, 30, 0), end: new Date(2026, 3, 17, 17, 0, 0) }} /> },
        { id: 'week', title: 'Week (calendar row)', node: <DatePicker mode="week" showWeekNumbers defaultMonth={new Date(2026, 5, 1)} defaultRange={{ start: new Date(2026, 5, 7), end: new Date(2026, 5, 13) }} /> },
        { id: 'datetime', title: 'Date and Time', node: <DatePicker mode="date-time" defaultValue={new Date(2026, 3, 15, 9, 30, 0)} /> },
        { id: 'datetime-dropdown', title: 'Date and Time, dropdown', node: <DatePicker mode="date-time" timeInput="dropdown" defaultValue={new Date(2026, 3, 15, 9, 30, 0)} /> },
        { id: 'time', title: 'Time', node: <TimePicker defaultValue={new Date(2026, 3, 15, 9, 30, 0)} /> },
        { id: 'time-ampm', title: 'Time, 12-hour', node: <TimePicker showAmPm defaultValue={new Date(2026, 3, 15, 14, 30, 0)} /> },
        { id: 'month', title: 'Month', node: <MonthPicker defaultValue={new Date(2026, 5, 1)} /> },
        { id: 'quarter', title: 'Quarter', node: <QuarterPicker defaultValue={new Date(2026, 3, 1)} /> },
        { id: 'week-list', title: 'Week (list)', node: <WeekPicker defaultMonth={new Date(2026, 0, 1)} defaultValue={{ start: new Date(2026, 0, 8), end: new Date(2026, 0, 14) }} /> },
      ]}
    />
  );
}
