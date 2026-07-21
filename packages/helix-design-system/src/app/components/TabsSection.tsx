import { PageLayout, Section } from './PageLayout';
import { Tabs } from '../../components';
import { LayoutDashboard, User, Settings } from 'lucide-react';

const toc = [
  { id: 'tabs-usage',  label: 'Usage Guidelines' },
  { id: 'tabs-styles', label: 'Styles' },
  { id: 'tabs-sizes',  label: 'Sizes' },
  { id: 'tabs-icons',  label: 'With Icons' },
];

const basicItems = [
  { id: 'overview',  label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings',  label: 'Settings' },
];

const contentItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={14} />,
    content: <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>Dashboard panel — charts and KPIs would live here.</p>,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <User size={14} />,
    content: <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>Profile panel — user details and preferences.</p>,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={14} />,
    content: <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#49494A' }}>Settings panel — account and notification preferences.</p>,
  },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      {children}
    </div>
  );
}

export function TabsSection() {
  return (
    <PageLayout
      category="Components"
      title="Tabs"
      description="Tabs organise content into labelled panels, showing one at a time. Three visual styles and two sizes cover most layouts."
      tocItems={toc}
    >
      <Section id="tabs-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Parallel, not sequential', body: 'Use tabs for content at the same conceptual level. Wizards with sequential steps should use a Stepper instead.' },
            { heading: 'Keep tab count low', body: 'Five or fewer tabs is the sweet spot. More than seven forces horizontal scrolling on mobile.' },
            { heading: 'Labels, not actions', body: 'Tab labels are nouns or noun phrases — "Overview", "Settings". They are not verbs or calls to action.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="tabs-styles" title="Styles">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>primary</code> is a pill/segmented control; <code>line</code> uses an underline indicator; <code>default</code> is plain with no indicator.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {(['primary', 'line', 'default'] as const).map(s => (
            <DemoCard key={s} title={`tabStyle="${s}"`}>
              <Tabs tabStyle={s} items={basicItems} defaultValue="overview" renderContent={false} />
            </DemoCard>
          ))}
        </div>
      </Section>

      <Section id="tabs-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          <code>sm</code> (32 px height) for compact toolbars; <code>md</code> (40 px, default) for standard page headers.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <DemoCard title="sm">
            <Tabs size="sm" tabStyle="primary" items={basicItems} defaultValue="overview" renderContent={false} />
          </DemoCard>
          <DemoCard title="md">
            <Tabs size="md" tabStyle="primary" items={basicItems} defaultValue="overview" renderContent={false} />
          </DemoCard>
        </div>
      </Section>

      <Section id="tabs-icons" title="With Icons">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Provide an <code>icon</code> on each tab item. Icons appear to the left of the label.
        </p>
        <DemoCard title="Icon tabs with content panels">
          <Tabs tabStyle="line" items={contentItems} defaultValue="dashboard" />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
