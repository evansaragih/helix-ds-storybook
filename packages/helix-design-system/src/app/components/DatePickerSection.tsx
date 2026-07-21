import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { DatePicker } from '../../components/DatePicker';

const toc = [
  { id: 'datepicker-usage', label: 'Usage Guidelines' },
  { id: 'datepicker-basic', label: 'Basic' },
  { id: 'datepicker-range', label: 'Date Range' },
  { id: 'datepicker-states', label: 'States' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>{children}</div>
    </div>
  );
}

export function DatePickerSection() {
  const [date, setDate] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setRangeStart(start);
    setRangeEnd(end);
  };

  return (
    <PageLayout
      category="Components"
      title="Date Picker"
      description="Date pickers allow users to select a date (or date range) from a calendar popover. They are tied to a text input that shows the formatted value."
      tocItems={toc}
    >
      <Section id="datepicker-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Prefer natural input', body: 'For far-future or far-past dates (birth year, expiry year), a text input with separate fields can be faster than a calendar.' },
            { heading: 'Show the format', body: 'Use a placeholder that shows the expected format (DD/MM/YYYY). Users should always know how to enter the date.' },
            { heading: 'Restrict invalid dates', body: 'Use minDate and maxDate to prevent selecting past dates for future bookings, or future dates for historical records.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="datepicker-basic" title="Basic">
        <Card title="Single date selection">
          <DatePicker
            label="Start date"
            value={date}
            onChange={setDate}
            placeholder="DD/MM/YYYY"
          />
          <DatePicker
            label="With pre-selected value"
            value={date2}
            onChange={setDate2}
          />
        </Card>
      </Section>

      <Section id="datepicker-range" title="Date Range">
        <Card title="Range selection">
          <DatePicker
            mode="range"
            label="Date range"
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onRangeChange={handleRangeChange}
          />
        </Card>
        <div style={{ marginTop: 12 }}>
          {(rangeStart || rangeEnd) && (
            <p style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#828282', margin: 0 }}>
              Selected: {rangeStart?.toLocaleDateString()} – {rangeEnd?.toLocaleDateString() ?? '…'}
            </p>
          )}
        </div>
      </Section>

      <Section id="datepicker-states" title="States">
        <Card title="All states">
          <DatePicker label="Default" placeholder="Select a date" />
          <DatePicker label="With value" value={new Date()} />
          <DatePicker label="Disabled" disabled placeholder="Not available" />
          <DatePicker label="Error" error="Please select a valid date" placeholder="Select a date" />
        </Card>
      </Section>
    </PageLayout>
  );
}
