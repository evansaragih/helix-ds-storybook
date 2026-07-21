import { PageLayout, Section } from './PageLayout';
import { Alert } from '../../components';
import { Wifi, ShieldCheck, Download } from 'lucide-react';

const toc = [
  { id: 'alert-usage',       label: 'Usage Guidelines' },
  { id: 'alert-variants',    label: 'Variants' },
  { id: 'alert-badge',       label: 'With Badge' },
  { id: 'alert-actions',     label: 'With Actions' },
  { id: 'alert-dismissible', label: 'Dismissible' },
  { id: 'alert-examples',    label: 'Examples' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

export function AlertSection() {
  return (
    <PageLayout
      category="Components"
      title="Alert"
      description="Alerts communicate important messages to the user — status updates, warnings, errors, or confirmations. They support semantic color variants, an optional badge, action buttons, and a dismiss action."
      tocItems={toc}
    >
      {/* Usage Guidelines */}
      <Section id="alert-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Match the severity', body: 'Use the correct semantic variant — success for completion, warning for caution, error for failures, info for neutral messages.' },
            { heading: 'Be concise',          body: 'Keep the title under 8 words. Use description only when extra context genuinely helps the user act.' },
            { heading: 'Offer a path out',    body: 'If an error occurred, provide an action that helps resolve it. Dismissible alerts should close immediately.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Variants */}
      <Section id="alert-variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Five semantic variants — each mapped to the status surface tokens from the design token system.
        </p>
        <Card title="All variants">
          <Alert
            variant="default"
            title="Default alert"
            description="Use for general notices or brand-aware announcements that don't carry a specific status."
          />
          <Alert
            variant="info"
            title="Informational alert"
            description="Use to highlight helpful information or guidance. Not urgent — the user can continue without action."
          />
          <Alert
            variant="success"
            title="Success alert"
            description="Confirms that an action completed successfully. Keep it short — the user already knows what they did."
          />
          <Alert
            variant="warning"
            title="Warning alert"
            description="Signals a potential issue that hasn't caused a failure yet. Prompt the user to review before proceeding."
          />
          <Alert
            variant="error"
            title="Error alert"
            description="Indicates a failure. Always describe what went wrong and, when possible, how to fix it."
          />
        </Card>
      </Section>

      {/* With Badge */}
      <Section id="alert-badge" title="With Badge">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          An optional badge appears next to the title to surface a version label, status tag, or category. The badge variant is automatically matched to the alert variant.
        </p>
        <Card title="Badge on alert">
          <Alert variant="info"    title="New update available"     description="Version 3.2.0 includes performance improvements and bug fixes."  badge="v3.2.0" />
          <Alert variant="success" title="Deployment complete"      description="Your application was deployed to production successfully."         badge="Live" />
          <Alert variant="warning" title="Storage limit approaching" description="You've used 85 % of your available storage quota."                  badge="85%" />
          <Alert variant="error"   title="Payment failed"           description="Your last payment could not be processed. Please update your card." badge="Failed" />
        </Card>
      </Section>

      {/* With Actions */}
      <Section id="alert-actions" title="With Actions">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Alerts can carry a primary action and an optional secondary action. Action color is automatically derived from the variant.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Primary action only">
            <Alert
              variant="info"
              title="New features available"
              description="Explore the latest updates in your workspace."
              action={{ label: 'Learn more', onClick: () => {} }}
            />
            <Alert
              variant="success"
              title="Backup complete"
              description="All your data has been backed up successfully."
              action={{ label: 'View backup', onClick: () => {} }}
            />
          </Card>
          <Card title="Primary + secondary action">
            <Alert
              variant="warning"
              title="Unsaved changes"
              description="You have unsaved changes that will be lost if you navigate away."
              action={{ label: 'Save now', onClick: () => {} }}
              secondaryAction={{ label: 'Discard', onClick: () => {} }}
            />
            <Alert
              variant="error"
              title="Connection lost"
              description="Unable to reach the server. Check your network and try again."
              action={{ label: 'Retry', onClick: () => {} }}
              secondaryAction={{ label: 'Go offline', onClick: () => {} }}
            />
          </Card>
        </div>
      </Section>

      {/* Dismissible */}
      <Section id="alert-dismissible" title="Dismissible">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>onClose</code> to show a close button. Use for non-critical notices the user can safely dismiss.
        </p>
        <Card title="Dismissible alerts">
          <Alert
            variant="default"
            title="Pro tip"
            description="You can drag and drop files directly into the editor to upload them."
            onClose={() => {}}
          />
          <Alert
            variant="info"
            title="Scheduled maintenance"
            description="The service will be unavailable on Sunday, 4 May from 02:00 – 04:00 UTC."
            onClose={() => {}}
          />
          <Alert
            variant="success"
            title="Profile updated"
            onClose={() => {}}
          />
        </Card>
      </Section>

      {/* Examples */}
      <Section id="alert-examples" title="Examples">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Real-world combinations with custom icons, badges, and actions.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="System status">
            <Alert
              variant="success"
              icon={<Wifi size={20} />}
              title="All systems operational"
              description="No incidents reported. Last checked 2 minutes ago."
              badge="Live"
              onClose={() => {}}
            />
            <Alert
              variant="warning"
              icon={<ShieldCheck size={20} />}
              title="Security review required"
              description="Your API keys haven't been rotated in 90 days."
              action={{ label: 'Rotate now', onClick: () => {} }}
              onClose={() => {}}
            />
          </Card>
          <Card title="User actions">
            <Alert
              variant="info"
              icon={<Download size={20} />}
              title="Export ready"
              description="Your data export is ready to download. The file will be available for 24 hours."
              badge="New"
              action={{ label: 'Download', onClick: () => {} }}
              secondaryAction={{ label: 'Dismiss', onClick: () => {} }}
            />
            <Alert
              variant="error"
              title="Failed to save"
              description="An unexpected error occurred while saving your changes."
              action={{ label: 'Try again', onClick: () => {} }}
              secondaryAction={{ label: 'Copy error', onClick: () => {} }}
            />
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
}
