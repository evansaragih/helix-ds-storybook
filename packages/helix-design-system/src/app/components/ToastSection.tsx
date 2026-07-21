import { PageLayout, Section } from './PageLayout';
import { Toast } from '../../components/Toast';

const toc = [
  { id: 'toast-usage', label: 'Usage Guidelines' },
  { id: 'toast-variants', label: 'Variants' },
  { id: 'toast-anatomy', label: 'Anatomy' },
  { id: 'toast-examples', label: 'Examples' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  );
}

export function ToastSection() {
  return (
    <PageLayout
      category="Components"
      title="Toast"
      description="Toasts are brief, auto-dismissing notifications that confirm an action or surface an important status update. They appear in a fixed corner of the viewport."
      tocItems={toc}
    >
      <Section id="toast-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Confirm, don\'t interrupt', body: 'Toasts confirm completed actions. They should not block content or require user interaction to continue a task.' },
            { heading: 'Keep titles short', body: 'Title under 6 words. Use description only when extra context is valuable — it\'s optional.' },
            { heading: 'Auto-dismiss carefully', body: 'Default to 4 s. For error toasts, use a longer duration (6–8 s) or make them persistent so users can read and act.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="toast-variants" title="Variants">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Five semantic variants using the same status colour system as Alert. Duration is disabled in the examples below so they remain visible.
        </p>
        <Card title="All variants">
          <Toast variant="default" title="Settings saved" duration={0} />
          <Toast variant="success" title="File uploaded" description="report-q4-2024.pdf was uploaded successfully." duration={0} />
          <Toast variant="info" title="Sync in progress" description="Your workspace is syncing with the latest changes." duration={0} />
          <Toast variant="warning" title="Storage limit approaching" description="You've used 85 % of your available quota." duration={0} />
          <Toast variant="error" title="Export failed" description="An error occurred while generating your report. Please try again." duration={0} />
        </Card>
      </Section>

      <Section id="toast-anatomy" title="Anatomy">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Toasts can include a title, an optional description, an optional action, and a close button.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card title="Title only">
            <Toast variant="success" title="Profile updated" duration={0} onClose={() => {}} />
            <Toast variant="error" title="Connection lost" duration={0} />
          </Card>
          <Card title="With description">
            <Toast variant="info" title="New release available" description="Version 2.4.0 brings performance improvements." duration={0} onClose={() => {}} />
            <Toast variant="warning" title="Unsaved changes" description="Navigate away to discard, or save now." duration={0} onClose={() => {}} />
          </Card>
        </div>
      </Section>

      <Section id="toast-examples" title="Examples">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card title="With action">
            <Toast
              variant="default"
              title="Item moved to trash"
              description="This item will be permanently deleted after 30 days."
              action={{ label: 'Undo', onClick: () => {} }}
              duration={0}
              onClose={() => {}}
            />
            <Toast
              variant="error"
              title="Payment declined"
              description="Please check your card details and try again."
              action={{ label: 'Update card', onClick: () => {} }}
              duration={0}
              onClose={() => {}}
            />
          </Card>
          <Card title="Dismissible">
            <Toast variant="success" title="Changes published" description="Your edits are now live." duration={0} onClose={() => {}} />
            <Toast variant="info" title="Scheduled maintenance" description="Service will be unavailable on Sunday 04:00 – 06:00 UTC." duration={0} onClose={() => {}} />
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
}
