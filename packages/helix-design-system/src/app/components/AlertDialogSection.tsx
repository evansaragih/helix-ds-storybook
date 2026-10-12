import { useState } from 'react';
import { ComponentDocPage } from './ComponentDocPage';
import { AlertDialog, Button } from '../../components';
import type { AlertDialogProps } from '../../components';

function Demo({ label, ...rest }: { label: string } & Partial<AlertDialogProps>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button hierarchy="secondary" appearance="outline" size="sm" onClick={() => setOpen(true)}>{label}</Button>
      <AlertDialog
        title="Alert Dialog title"
        description="This is a supporting description that gives context about the action being confirmed."
        {...rest}
        open={open}
        onClose={() => setOpen(false)}
        confirmAction={{ label: rest.iconStatus === 'destructive' ? 'Delete' : 'Confirm', onClick: () => setOpen(false) }}
        cancelAction={{ label: 'Cancel', onClick: () => setOpen(false) }}
      />
    </>
  );
}

export function AlertDialogSection() {
  return (
    <ComponentDocPage
      slug="alert-dialog"
      title="Alert Dialog"
      description="A modal that interrupts the flow to confirm a decision or acknowledge something important. For general content use Dialog."
      usage={[
        { heading: 'Confirm, don’t explain', body: 'Keep the title a clear question or statement and the description to one or two sentences.' },
        { heading: 'Destructive status', body: 'Use the destructive icon status — it also turns the confirm button red — for deletions.' },
        { heading: 'Name the action', body: 'Label the confirm button with the verb (Delete, Publish), not “OK”.' },
      ]}
      demos={[
        { id: 'layouts', title: 'Layouts', description: 'Stacked left, horizontal and stacked centered. Click to open.',
          node: <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><Demo label="stacked-left" layout="stacked-left" /><Demo label="horizontal" layout="horizontal" /><Demo label="stacked-centered" layout="stacked-centered" /></div> },
        { id: 'status', title: 'Icon status',
          node: <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{(['default', 'success', 'warning', 'destructive', 'info'] as const).map((s) => <Demo key={s} label={s} iconStatus={s} />)}</div> },
      ]}
    />
  );
}
