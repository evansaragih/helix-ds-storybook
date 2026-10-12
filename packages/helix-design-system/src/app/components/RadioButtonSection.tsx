import { useState } from 'react';
import { ComponentDocPage } from './ComponentDocPage';
import { RadioButton, RadioGroup } from '../../components';

function PlanGroup() {
  const [plan, setPlan] = useState('pro');
  return (
    <RadioGroup name="plan" value={plan} onChange={setPlan}>
      <RadioButton value="basic" label="Basic" supportingText="Up to 10 samples" />
      <RadioButton value="pro" label="Pro" supportingText="Up to 100 samples" />
      <RadioButton value="team" label="Team" supportingText="Unlimited samples" />
    </RadioGroup>
  );
}

export function RadioButtonSection() {
  return (
    <ComponentDocPage
      slug="radio-button"
      title="Radio Button"
      description="A labeled radio button row: control, label and optional supporting text. Use for choosing exactly one option from a small set."
      usage={[
        { heading: 'One answer', body: 'Radios are mutually exclusive. For several answers use Checkbox.' },
        { heading: 'Preselect a default', body: 'Always preselect an option so the group is never empty.' },
        { heading: 'Few options', body: 'Past about five options use a Select instead.' },
      ]}
      demos={[
        { id: 'states', title: 'Checked and State',
          node: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, max-content)', gap: 20 }}>
              {[false, true].flatMap((c) => [
                <RadioButton key={`${c}d`} checked={c} readOnly label="Default" />,
                <RadioButton key={`${c}i`} checked={c} readOnly invalid label="Invalid" />,
                <RadioButton key={`${c}x`} checked={c} readOnly disabled label="Disabled" />,
              ])}
            </div>
          ) },
        { id: 'group', title: 'Group', description: 'RadioGroup wires a list of Radio Buttons into one single-choice group.', node: <PlanGroup /> },
      ]}
    />
  );
}
