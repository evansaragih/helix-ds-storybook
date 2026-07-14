import { PageLayout, Section } from './PageLayout';
import { Dialog, Button } from '../../components';
import { Trash2 } from 'lucide-react';

const toc = [
  { id: 'dialog-usage',  label: 'Usage Guidelines' },
  { id: 'dialog-sizes',  label: 'Sizes' },
  { id: 'dialog-footer', label: 'With Footer' },
  { id: 'dialog-danger', label: 'Destructive' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>{children}</div>
    </div>
  );
}

export function DialogSection() {
  return (
    <PageLayout
      category="Components"
      title="Dialog"
      description="Dialogs interrupt the user flow to present critical information or request a decision. Keep them focused — one question or action per dialog."
      tocItems={toc}
    >
      <Section id="dialog-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Reserve for critical moments', body: 'Only use a dialog for decisions that cannot be undone inline or that require dedicated focus (e.g. deleting data, confirming a purchase).' },
            { heading: 'One action per dialog', body: 'Dialogs should present a single question with at most two choices. If you need a form, use a drawer or page instead.' },
            { heading: 'Name the action clearly', body: 'The primary button should say what happens — "Delete project", not "OK". The user should not need to re-read the body to understand the button.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="dialog-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Three widths: <code>sm</code> (384 px) for simple confirmations, <code>md</code> (480 px, default), <code>lg</code> (600 px) for richer content.
        </p>
        <DemoCard title="Dialog sizes">
          {(['sm', 'md', 'lg'] as const).map(s => (
            <Dialog
              key={s}
              size={s}
              title={`${s.toUpperCase()} Dialog`}
              description={`This is a ${s} dialog. Width is fixed at ${s === 'sm' ? '384' : s === 'md' ? '480' : '600'} px.`}
              trigger={<Button variant="primary-outline" size="sm">{s.toUpperCase()}</Button>}
            />
          ))}
        </DemoCard>
      </Section>

      <Section id="dialog-footer" title="With Footer">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass a <code>footer</code> prop to add a sticky action area at the bottom of the dialog.
        </p>
        <DemoCard title="Confirmation dialog">
          <Dialog
            title="Save changes?"
            description="You have unsaved changes. Would you like to save them before leaving this page?"
            trigger={<Button variant="primary" size="sm">Open with footer</Button>}
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button variant="neutral" size="sm">Discard</Button>
                <Button variant="primary" size="sm">Save changes</Button>
              </div>
            }
          />
        </DemoCard>
      </Section>

      <Section id="dialog-danger" title="Destructive">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Use a <code>destructive</code> primary button to signal an irreversible action.
        </p>
        <DemoCard title="Delete confirmation">
          <Dialog
            title="Delete project"
            description="This action cannot be undone. The project and all its data will be permanently deleted."
            trigger={
              <Button variant="destructive" size="sm" leadingIcon={<Trash2 size={14} />}>
                Delete project
              </Button>
            }
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Button variant="neutral" size="sm">Cancel</Button>
                <Button variant="destructive" size="sm">Delete permanently</Button>
              </div>
            }
          />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
