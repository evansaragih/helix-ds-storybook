import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DatePicker } from 'helix-design-system/components';

const meta = {
  title: 'Components/Inputs & Forms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['date', 'range', 'month', 'year'] },
  },
  args: {
    mode: 'date',
    label: 'Collection date',
    placeholder: 'Select date',
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function DatePickerDemo(args: React.ComponentProps<typeof DatePicker>) {
  const [value, setValue] = useState<Date | null>(null);
  return <DatePicker {...args} value={value} onChange={setValue} />;
}

function RangeDemo(args: React.ComponentProps<typeof DatePicker>) {
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  return (
    <DatePicker
      {...args}
      mode="range"
      rangeStart={start}
      rangeEnd={end}
      onRangeChange={(s, e) => { setStart(s); setEnd(e); }}
    />
  );
}

export const Playground: Story = {
  render: (args) => <DatePickerDemo {...args} />,
};

export const Range: Story = {
  args: { label: 'Reporting period', placeholder: 'Select date range' },
  render: (args) => <RangeDemo {...args} />,
};

export const Invalid: Story = {
  args: { error: 'Please select a valid date.' },
  render: (args) => <DatePickerDemo {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <DatePickerDemo {...args} />,
};

export const WithMinMax: Story = {
  args: {
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
  },
  render: (args) => <DatePickerDemo {...args} />,
};
