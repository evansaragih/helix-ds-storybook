import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { AlertDialog } from '../../components/AlertDialog';
import { Button } from '../../components';

const toc = [
  { id: 'alertdialog-usage', label: 'Usage Guidelines' },
  { id: 'alertdialog-variants', label: 'Variants' },
  { id: 'alertdialog-sizes', label: 'Sizes' },
  { id: 'alertdialog-examples', label: 'Examples' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </div>
  );
}

export function AlertDialogSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <PageLayout
      category="Components"
      title="Alert Dialog"
      description="Alert dialogs interrupt the user to confirm a consequential action or communicate a critical state. They require an explicit response before the user can proceed."
      tocItems={toc}
    >
      {/* Portaled dialogs */}
      <AlertDialog
        open={open === 'default'}
        variant="default"
        title="Save changes?"
        description="You have unsaved changes that will be lost if you navigate away. Do you want to save before leaving?"
        confirmAction={{ label: 'Save changes', onClick: () => setOpen(null) }}
        cancelAction={{ label: 'Discard', onClick: () => setOpen(null) }}
        onClose={() => setOpen(null)}
      />
      <AlertDialog
        open={open === 'destructive'}
        variant="destructive"
        title="Delete project?"
        description="This will permanently delete the project and all its data. This action cannot be undone."
        confirmAction={{ label: 'Delete project', onClick: () => setOpen(null) }}
        cancelAction={{ label: 'Cancel', onClick: () => setOpen(null) }}
        onClose={() => setOpen(null)}
      />
      <AlertDialog
        open={open === 'info'}
        variant="info"
        title="Session about to expire"
        description="Your session will expire in 2 minutes due to inactivity. Would you like to stay signed in?"
        confirmAction={{ label: 'Stay signed in', onClick: () => setOpen(null) }}
        cancelAction={{ label: 'Sign out', onClick: () => setOpen(null) }}
        onClose={() => setOpen(null)}
      />
      <AlertDialog
        open={open === 'small'}
        variant="destructive"
        size="sm"
        title="Remove member?"
        description="Evan Himawan will lose access immediately."
        confirmAction={{ label: 'Remove', onClick: () => setOpen(null) }}
        cancelAction={{ label: 'Cancel', onClick: () => setOpen(null) }}
        onClose={() => setOpen(null)}
      />
      <AlertDialog
        open={open === 'no-cancel'}
        variant="info"
        title="Verification required"
        description="Check your email for a verification link before continuing."
        confirmAction={{ label: 'Got it', onClick: () => setOpen(null) }}
        onClose={() => setOpen(null)}
      />

      <Section id="alertdialog-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Reserve for high stakes', body: 'Only interrupt the user for actions that are destructive, irreversible, or have significant consequences. Don\'t use for low-stakes confirmations.' },
            { heading: 'Make actions clear', body: 'Label confirm/cancel buttons with specific verbs ("Delete project", not "OK"). The user must understand the consequence without reading the description.' },
            { heading: 'Always offer an escape', body: 'Provide a cancel action or ESC-to-close. Dialogs that trap the user create frustration.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="alertdialog-variants" title="Variants">
        <DemoCard title="Open a variant">
          <Button variant="neutral" size="sm" onClick={() => setOpen('default')}>Default</Button>
          <Button variant="destructive" size="sm" onClick={() => setOpen('destructive')}>Destructive</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen('info')}>Info</Button>
        </DemoCard>
      </Section>

      <Section id="alertdialog-sizes" title="Sizes">
        <DemoCard title="Size variants">
          <Button variant="neutral" size="sm" onClick={() => setOpen('destructive')}>Medium (default)</Button>
          <Button variant="neutral" size="sm" onClick={() => setOpen('small')}>Small</Button>
        </DemoCard>
      </Section>

      <Section id="alertdialog-examples" title="Examples">
        <DemoCard title="Common patterns">
          <Button variant="neutral" size="sm" onClick={() => setOpen('no-cancel')}>Confirmation only</Button>
          <Button variant="destructive" size="sm" onClick={() => setOpen('destructive')}>Remove member</Button>
          <Button variant="primary" size="sm" onClick={() => setOpen('info')}>Session warning</Button>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
