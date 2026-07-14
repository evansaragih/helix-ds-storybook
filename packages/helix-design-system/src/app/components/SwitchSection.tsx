import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { Switch } from '../../components';

const toc = [
  { id: 'switch-usage',  label: 'Usage Guidelines' },
  { id: 'switch-sizes',  label: 'Sizes' },
  { id: 'switch-states', label: 'States' },
  { id: 'switch-labels', label: 'With Labels' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

export function SwitchSection() {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);

  return (
    <PageLayout
      category="Components"
      title="Switch"
      description="Switches toggle a single boolean setting on or off. They are an immediate-commit control — the change takes effect as soon as the user taps or clicks."
      tocItems={toc}
    >
      <Section id="switch-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Immediate effect', body: 'Switches apply the change without needing a Save button. Make sure the consequence is reversible and instant.' },
            { heading: 'Always have a label', body: 'A switch without a label forces the user to infer meaning. Always describe what the setting controls.' },
            { heading: 'One setting per switch', body: 'Each switch should toggle exactly one setting. Use checkboxes when you need multi-select from a list.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="switch-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>sm</code> (32 × 18 px) is suitable for dense settings lists. <code>md</code> (44 × 24 px, default) is more touch-friendly.
        </p>
        <DemoCard title="Size comparison">
          <Switch size="sm" checked label="Small switch" />
          <Switch size="md" checked label="Medium switch" />
        </DemoCard>
      </Section>

      <Section id="switch-states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          All interactive states: unchecked, checked, disabled off, disabled on, and invalid.
        </p>
        <DemoCard title="All states">
          <Switch checked={false} label="Unchecked" />
          <Switch checked label="Checked" />
          <Switch disabled label="Disabled off" />
          <Switch checked disabled label="Disabled on" />
          <Switch invalid label="Invalid" helperText="This setting has an error." />
        </DemoCard>
      </Section>

      <Section id="switch-labels" title="With Labels">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Combine <code>label</code> and <code>helperText</code> for settings with additional context.
        </p>
        <DemoCard title="Interactive">
          <Switch
            checked={checked}
            onChange={setChecked}
            label="Email notifications"
            helperText="Receive an email for every new comment on your posts."
          />
          <Switch
            checked={checked2}
            onChange={setChecked2}
            label="Marketing emails"
            helperText="Get product news and offers from Helix."
          />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
