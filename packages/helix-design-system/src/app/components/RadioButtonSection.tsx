import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { RadioButton, RadioGroup } from '../../components';

const toc = [
  { id: 'radio-usage',  label: 'Usage Guidelines' },
  { id: 'radio-states', label: 'States' },
  { id: 'radio-group',  label: 'Radio Group' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}

export function RadioButtonSection() {
  const [plan, setPlan] = useState('starter');
  const [role, setRole] = useState('viewer');

  return (
    <PageLayout
      category="Components"
      title="Radio Button"
      description="Radio buttons let users select exactly one option from a set. Use them when all choices are visible and mutually exclusive."
      tocItems={toc}
    >
      <Section id="radio-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Mutually exclusive only', body: 'Use radio buttons when the user must pick exactly one option. For multiple-select, use checkboxes instead.' },
            { heading: 'Show all options', body: 'Radio buttons reveal all choices at once. If you have more than 6–7 options, a Select dropdown is more compact.' },
            { heading: 'Always pre-select', body: 'Pre-select the most common or safest default. An empty radio group forces an extra decision from the user.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="radio-states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Individual radio states: unchecked, checked, disabled, and invalid.
        </p>
        <DemoCard title="All states">
          <RadioButton name="states" value="unchecked" checked={false} label="Unchecked" />
          <RadioButton name="states" value="checked" checked label="Checked" />
          <RadioButton name="states" value="disabled" checked={false} disabled label="Disabled" />
          <RadioButton name="states" value="disabled-checked" checked disabled label="Disabled checked" />
          <RadioButton name="states" value="invalid" checked={false} invalid label="Invalid" helperText="Please select a valid option." />
        </DemoCard>
      </Section>

      <Section id="radio-group" title="Radio Group">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Wrap related radio buttons in a <code>RadioGroup</code> with a shared <code>name</code>, <code>value</code>, and <code>onChange</code>.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <DemoCard title="Plan selection">
            <RadioGroup name="plan" value={plan} onChange={setPlan}>
              <RadioButton value="starter" label="Starter" helperText="Up to 3 projects" />
              <RadioButton value="pro" label="Pro" helperText="Unlimited projects" />
              <RadioButton value="enterprise" label="Enterprise" helperText="Custom limits + SLA" />
            </RadioGroup>
          </DemoCard>
          <DemoCard title="Role selection">
            <RadioGroup name="role" value={role} onChange={setRole}>
              <RadioButton value="owner" label="Owner" helperText="Full admin access" />
              <RadioButton value="editor" label="Editor" helperText="Can edit and publish" />
              <RadioButton value="viewer" label="Viewer" helperText="Read-only access" />
            </RadioGroup>
          </DemoCard>
        </div>
      </Section>
    </PageLayout>
  );
}
