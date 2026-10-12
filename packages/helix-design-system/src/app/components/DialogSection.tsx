import { ComponentDocPage } from './ComponentDocPage';
import { Dialog, Button, FooterActions, Input } from '../../components';
import { Beaker } from 'lucide-react';

const footer = (
  <FooterActions>
    <Button hierarchy="secondary" appearance="outline" size="sm">Cancel</Button>
    <Button size="sm">Save</Button>
  </FooterActions>
);
const body = <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}><Input label="Sample name" placeholder="SMP-2026-0142" /><Input label="Analyst" placeholder="Dewi Lestari" /></div>;

export function DialogSection() {
  return (
    <ComponentDocPage
      slug="dialog"
      title="Dialog"
      description="The general-purpose modal shell: a header (icon, title, description) with a divider, a free-form body, and an optional footer for actions. For a confirm / cancel decision use Alert Dialog."
      usage={[
        { heading: 'Self-contained task', body: 'Use a dialog for a short task that needs the user’s focus — a small form, a pick list, a preview.' },
        { heading: 'Actions in the footer', body: 'Primary action on the right of the footer; a secondary action beside it.' },
        { heading: 'Pick a header layout', body: 'Stacked horizontal for compact headers; stacked left or centered when the icon leads.' },
      ]}
      demos={[
        { id: 'layouts', title: 'Header layouts', description: 'Click a button to open the dialog.',
          node: (
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {(['stacked-horizontal', 'stacked-left', 'stacked-centered'] as const).map((l) => (
                <Dialog key={l} headerLayout={l} trigger={<Button hierarchy="secondary" appearance="outline" size="sm">{l}</Button>}
                  title="New sample" description="Add the details for a new sample. You can edit them later." icon={<Beaker size={24} />} footer={footer}>
                  {body}
                </Dialog>
              ))}
            </div>
          ) },
        { id: 'plain', title: 'Without icon', node: <Dialog trigger={<Button hierarchy="secondary" appearance="outline" size="sm">No icon</Button>} title="Rename batch" footer={footer}>{body}</Dialog> },
      ]}
    />
  );
}
