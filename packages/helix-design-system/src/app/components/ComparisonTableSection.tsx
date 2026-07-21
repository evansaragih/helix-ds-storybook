import { PageLayout, Section } from './PageLayout';
import { ComparisonTable } from '../../components/ComparisonTable';

const toc = [
  { id: 'comparison-usage', label: 'Usage Guidelines' },
  { id: 'comparison-basic', label: 'Basic' },
  { id: 'comparison-grouped', label: 'Grouped Rows' },
  { id: 'comparison-highlighted', label: 'Highlighted Column' },
];

const planCols = [
  { key: 'starter', label: 'Starter' },
  { key: 'pro', label: 'Pro', highlighted: true, badge: 'Popular' },
  { key: 'enterprise', label: 'Enterprise' },
];

const planRows = [
  { feature: 'Team members', values: { starter: '1–5', pro: '1–25', enterprise: 'Unlimited' } },
  { feature: 'Projects', values: { starter: '3', pro: 'Unlimited', enterprise: 'Unlimited' } },
  { feature: 'Storage', values: { starter: '5 GB', pro: '50 GB', enterprise: '500 GB' } },
  { feature: 'Custom domain', values: { starter: false, pro: true, enterprise: true } },
  { feature: 'Analytics', values: { starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced + export' } },
  { feature: 'API access', values: { starter: false, pro: true, enterprise: true } },
  { feature: 'Priority support', values: { starter: false, pro: 'partial', enterprise: true } },
  { feature: 'SSO / SAML', values: { starter: false, pro: false, enterprise: true } },
  { feature: 'SLA', values: { starter: false, pro: false, enterprise: '99.9%' } },
];

const groupedCols = [
  { key: 'basic', label: 'Basic' },
  { key: 'advanced', label: 'Advanced', highlighted: true, badge: 'Recommended' },
];

const groupedRows = [
  { feature: 'Dashboard', group: 'Analytics', values: { basic: true, advanced: true } },
  { feature: 'Custom reports', group: 'Analytics', values: { basic: false, advanced: true } },
  { feature: 'Data export', group: 'Analytics', values: { basic: 'CSV only', advanced: 'CSV, JSON, PDF' } },
  { feature: 'Role management', group: 'Access Control', values: { basic: 'partial', advanced: true } },
  { feature: 'Audit log', group: 'Access Control', values: { basic: false, advanced: true } },
  { feature: 'Email notifications', group: 'Notifications', values: { basic: true, advanced: true } },
  { feature: 'Slack integration', group: 'Notifications', values: { basic: false, advanced: true } },
];

export function ComparisonTableSection() {
  return (
    <PageLayout
      category="Components"
      title="Comparison Table"
      description="Comparison tables present feature availability across plans or tiers. They use boolean, partial, and custom cell values to help users evaluate options side by side."
      tocItems={toc}
    >
      <Section id="comparison-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Highlight the recommendation', body: 'Use the highlighted column to draw attention to the most popular or recommended plan. This reduces decision fatigue.' },
            { heading: 'Group related features', body: 'Use row groups to organise long feature lists. Keep each group focused on a single capability area.' },
            { heading: 'Be honest with "partial"', body: 'Use the partial cell (dash icon) for features that are available in a limited form. Don\'t show ✓ for partial access.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="comparison-basic" title="Basic">
        <ComparisonTable columns={planCols} rows={planRows} featureLabel="Feature" />
      </Section>

      <Section id="comparison-grouped" title="Grouped Rows">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Set a <code>group</code> on each row to insert category headers that organise the feature list into sections.
        </p>
        <ComparisonTable columns={groupedCols} rows={groupedRows} featureLabel="Feature" />
      </Section>

      <Section id="comparison-highlighted" title="Highlighted Column">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Set <code>highlighted: true</code> on a column to apply the brand accent treatment. Combine with a <code>badge</code> to call out the recommended tier.
        </p>
        <ComparisonTable
          columns={[
            { key: 'free', label: 'Free' },
            { key: 'pro', label: 'Pro', highlighted: true, badge: 'Best value' },
          ]}
          rows={[
            { feature: 'Projects',        values: { free: '1', pro: 'Unlimited' } },
            { feature: 'Team members',    values: { free: '1', pro: 'Unlimited' } },
            { feature: 'Custom domain',   values: { free: false, pro: true } },
            { feature: 'Analytics',       values: { free: 'partial', pro: true } },
            { feature: 'Priority support',values: { free: false, pro: true } },
          ]}
        />
      </Section>
    </PageLayout>
  );
}
