import { ComponentDocPage } from './ComponentDocPage';
import { Select } from '../../components';

const OPTIONS = [
  { value: 'jakarta', label: 'Jakarta' },
  { value: 'bandung', label: 'Bandung' },
  { value: 'surabaya', label: 'Surabaya' },
  { value: 'medan', label: 'Medan' },
  { value: 'bali', label: 'Bali', disabled: true },
];

const col = (children: React.ReactNode, width = 320) => <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width, minHeight: 80 }}>{children}</div>;

export function SelectSection() {
  return (
    <ComponentDocPage
      slug="select"
      title="Select"
      description="A form field: an Input-style trigger that opens a list of selectable options. Single selection closes on pick; multi selection adds search and Apply / Clear. For command menus use Dropdown."
      usage={[
        { heading: 'Choosing a value', body: 'Use Select to pick a value for a field. For running commands use Dropdown.' },
        { heading: 'Multi for filters', body: 'Multi selection commits on Apply, so the form does not change while the user is still choosing.' },
        { heading: 'Few options → Radio', body: 'Under about five options, Radio Buttons are faster to scan.' },
      ]}
      demos={[
        { id: 'triggers', title: 'Triggers', description: 'Input, Input + Label, Input-Floating and Input Horizontal. Click a trigger to open it.',
          node: col(<>
            <Select options={OPTIONS} placeholder="Select a city" />
            <Select options={OPTIONS} label="City" placeholder="Select a city" />
            <Select options={OPTIONS} label="City" floating />
            <Select options={OPTIONS} label="City" layout="horizontal" placeholder="Select a city" />
          </>, 360) },
        { id: 'multi', title: 'Multi selection', node: col(<Select options={OPTIONS} label="Cities" selection="multi" defaultValues={['jakarta', 'bandung']} placeholder="Select cities" />) },
        { id: 'states', title: 'Hint, error and disabled', node: col(<>
          <Select options={OPTIONS} label="City" hint="Choose the lab nearest to you." />
          <Select options={OPTIONS} label="City" error="Select a city to continue." />
          <Select options={OPTIONS} label="City" disabled />
        </>) },
      ]}
    />
  );
}
