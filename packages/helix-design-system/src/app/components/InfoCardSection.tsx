import { PageLayout, Section } from './PageLayout';
import { InfoCard } from '../../components/InfoCard';
import { Lightbulb, Shield, Zap, Globe, Lock, Star } from 'lucide-react';

const toc = [
  { id: 'infocard-usage', label: 'Usage Guidelines' },
  { id: 'infocard-variants', label: 'Variants' },
  { id: 'infocard-compact', label: 'Compact' },
  { id: 'infocard-interactive', label: 'Interactive' },
  { id: 'infocard-examples', label: 'Examples' },
];

function Grid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>{children}</div>;
}

export function InfoCardSection() {
  return (
    <PageLayout
      category="Components"
      title="Info Card"
      description="Info cards surface contextual information, tips, or status messages within a page. They differ from Alerts — they're part of the page layout, not a transient notification."
      tocItems={toc}
    >
      <Section id="infocard-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Inline, not interrupting', body: 'Info cards live within the page. They don\'t block content or require dismissal. If you need an interruption, use an Alert or Dialog.' },
            { heading: 'Use semantic variants', body: 'Match the variant to the tone — brand for tips, success for completed states, warning for degraded experiences, error for failures.' },
            { heading: 'Keep content brief', body: 'Title under 6 words, description under 2 sentences. Info cards complement the page, they shouldn\'t dominate it.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="infocard-variants" title="Variants">
        <Grid>
          <InfoCard variant="default" title="Default card" description="Use for neutral information that doesn't carry a specific semantic meaning." icon={<Globe size={20} />} />
          <InfoCard variant="brand" title="Pro tip" description="You can drag and drop files directly into the editor to upload them instantly." icon={<Lightbulb size={20} />} />
          <InfoCard variant="success" title="Identity verified" description="Your account identity has been verified and full access is now enabled." icon={<Shield size={20} />} />
          <InfoCard variant="warning" title="Storage almost full" description="You've used 88% of your storage. Upgrade your plan to avoid service interruption." icon={<Zap size={20} />} />
          <InfoCard variant="error" title="Payment failed" description="Your last payment could not be processed. Please update your payment method." icon={<Lock size={20} />} />
          <InfoCard variant="info" title="New feature available" description="Try the new analytics dashboard — now available for all plans." icon={<Star size={20} />} />
        </Grid>
      </Section>

      <Section id="infocard-compact" title="Compact">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Compact cards render as a single row — useful inside settings pages, sidebars, or table rows.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <InfoCard compact variant="brand" title="Tip" description="Enable two-factor authentication for extra security." icon={<Shield size={16} />} />
          <InfoCard compact variant="warning" title="Billing" description="Your subscription renews on 15 Jun 2025." icon={<Zap size={16} />} action={{ label: 'Manage', onClick: () => {} }} />
          <InfoCard compact variant="success" title="Connected" description="GitHub integration is active." icon={<Globe size={16} />} />
        </div>
      </Section>

      <Section id="infocard-interactive" title="Interactive">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>onClick</code> to make the card clickable — useful for navigating to related pages.
        </p>
        <Grid>
          <InfoCard variant="default" title="View documentation" description="Read the full API reference and guides." icon={<Globe size={20} />} onClick={() => {}} />
          <InfoCard variant="brand" title="Upgrade to Pro" description="Unlock unlimited projects, advanced analytics, and priority support." icon={<Star size={20} />} onClick={() => {}} action={{ label: 'Upgrade', onClick: () => {} }} />
        </Grid>
      </Section>

      <Section id="infocard-examples" title="Examples">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Info cards with footer content for richer layouts.
        </p>
        <Grid>
          <InfoCard
            variant="brand"
            title="Getting started"
            description="Complete these steps to set up your workspace and invite your team."
            icon={<Lightbulb size={20} />}
            footer={
              <div style={{ display: 'flex', gap: 6 }}>
                {['Connect GitHub', 'Invite team', 'Create project'].map((step, i) => (
                  <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: i === 0 ? '#12843C' : '#828282' }}>
                    {i === 0 ? '✓' : '○'} {step}
                  </span>
                ))}
              </div>
            }
          />
          <InfoCard
            variant="info"
            title="System status"
            description="All services are operational. Last incident: 3 days ago."
            icon={<Activity size={20} />}
            action={{ label: 'Status page', onClick: () => {} }}
            footer={
              <div style={{ display: 'flex', gap: 8 }}>
                {['API', 'Dashboard', 'Webhooks', 'CDN'].map(s => (
                  <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#12843C' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#12843C', display: 'inline-block' }} /> {s}
                  </span>
                ))}
              </div>
            }
          />
        </Grid>
      </Section>
    </PageLayout>
  );
}

function Activity({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
