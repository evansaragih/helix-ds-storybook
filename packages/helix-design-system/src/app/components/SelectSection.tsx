import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { Select } from '../../components';

const toc = [
  { id: 'select-usage',  label: 'Usage Guidelines' },
  { id: 'select-sizes',  label: 'Sizes' },
  { id: 'select-states', label: 'States' },
  { id: 'select-groups', label: 'Option Groups' },
];

const countryOptions = [
  { value: 'id', label: 'Indonesia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'my', label: 'Malaysia' },
  { value: 'th', label: 'Thailand' },
  { value: 'ph', label: 'Philippines' },
];

const roleGroups = [
  {
    label: 'Admin',
    options: [
      { value: 'super-admin', label: 'Super Admin' },
      { value: 'admin', label: 'Admin' },
    ],
  },
  {
    label: 'User',
    options: [
      { value: 'editor', label: 'Editor' },
      { value: 'viewer', label: 'Viewer' },
      { value: 'guest', label: 'Guest' },
    ],
  },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </div>
  );
}

export function SelectSection() {
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('');

  return (
    <PageLayout
      category="Components"
      title="Select"
      description="Select provides a dropdown for choosing one option from a list. It supports flat options and grouped options, three sizes, and optional label/helper/error text."
      tocItems={toc}
    >
      <Section id="select-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Use for 5+ options', body: 'For fewer than 5 mutually exclusive options, consider radio buttons instead — they show all choices at a glance.' },
            { heading: 'Write clear labels', body: 'The placeholder and label together should tell the user exactly what they\'re selecting. Avoid generic placeholders like "Select...".' },
            { heading: 'Group related options', body: 'Use option groups when your list has natural categories. It helps users scan and find the right option faster.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="select-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Three heights: <code>sm</code> (32 px), <code>md</code> (40 px, default), <code>lg</code> (48 px).
        </p>
        <DemoCard title="Size comparison">
          <Select size="sm" options={countryOptions} placeholder="Small — pick country" label="Country (sm)" />
          <Select size="md" options={countryOptions} placeholder="Medium — pick country" label="Country (md)" />
          <Select size="lg" options={countryOptions} placeholder="Large — pick country" label="Country (lg)" />
        </DemoCard>
      </Section>

      <Section id="select-states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Default, disabled, and error states.
        </p>
        <DemoCard title="All states">
          <Select options={countryOptions} label="Default" placeholder="Pick a country" value={country} onChange={setCountry} />
          <Select options={countryOptions} label="Disabled" placeholder="Unavailable" disabled />
          <Select options={countryOptions} label="Error" placeholder="Pick a country" errorText="Please select a country to continue." />
          <Select options={countryOptions} label="With helper" placeholder="Pick a country" helperText="Used for shipping calculations." />
        </DemoCard>
      </Section>

      <Section id="select-groups" title="Option Groups">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>groups</code> instead of <code>options</code> to render labelled option groups in the dropdown.
        </p>
        <DemoCard title="Grouped options">
          <Select groups={roleGroups} label="Role" placeholder="Assign a role" value={role} onChange={setRole} />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
