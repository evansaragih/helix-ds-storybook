import { ComponentDocPage } from './ComponentDocPage';
import { DatePicker } from '../../components';

export function DatePickerSection() {
  return (
    <ComponentDocPage
      slug="date-picker"
      title="Date Pickers"
      description="A calendar panel for picking a single date, a date range, a date and time, or a time. Compose it in a Popover under an Input to make a date field."
      usage={[
        { heading: 'Pick the mode', body: 'Single for one date, Range for a period, Date and Time when the hour matters, Time for time only.' },
        { heading: 'Disable what isn’t valid', body: 'Use isDisabled to grey out dates that can’t be chosen, such as weekends or the past.' },
        { heading: 'Panel, not field', body: 'The picker is the panel only — pair it with an Input and a Popover for a complete field.' },
      ]}
      demos={[
        { id: 'single', title: 'Single', node: <DatePicker defaultValue={new Date(2026, 3, 15)} /> },
        { id: 'range', title: 'Range', node: <DatePicker mode="range" defaultMonth={new Date(2026, 3, 1)} defaultRange={{ start: new Date(2026, 3, 10), end: new Date(2026, 3, 17) }} /> },
        { id: 'datetime', title: 'Date and Time', node: <DatePicker mode="date-time" defaultValue={new Date(2026, 3, 15, 9, 30)} /> },
        { id: 'time', title: 'Time', node: <DatePicker mode="time" defaultValue={new Date(2026, 3, 15, 9, 30)} /> },
      ]}
    />
  );
}
