import { ComponentDocPage } from './ComponentDocPage';
import { Alert } from '../../components';

const STATUSES = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const;
const LAYOUTS = ['card', 'compact', 'card-buttons', 'card-link'] as const;
const actions = { action: { label: 'View changes', onClick: () => {} }, secondaryAction: { label: 'Dismiss', onClick: () => {} }, onClose: () => {} };

export function AlertSection() {
  return (
    <ComponentDocPage
      slug="alert"
      title="Alert"
      description="A message banner with a status icon tile. Use for notices that stay in the page; for a transient notice that floats over the page use Toastr."
      usage={[
        { heading: 'Match the status', body: 'Success for completion, warning for caution, error for failures, info for neutral messages.' },
        { heading: 'Be concise', body: 'Keep the title short; add a description only when it helps the user act.' },
        { heading: 'Offer a path', body: 'For errors, add an action that helps resolve it.' },
        { heading: 'Compact has no close', body: 'The Compact layout carries its actions as buttons and has no close ×; use Card layouts when the user needs to dismiss with ×.' },
        { heading: 'Optional sound', body: 'Pass sound to play a soft chime when an alert appears in response to something. It is off by default so alerts rendered with the page stay quiet.' },
      ]}
      demos={[
        { id: 'layouts', title: 'Layouts', description: 'Card, Compact, Card w/ Buttons and Card w/ Link.',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {LAYOUTS.map((l) => <div key={l} style={{ width: l === 'compact' ? 600 : 360 }}><Alert {...actions} layout={l} status="info" title="Informational alert" description="Use to highlight helpful information or guidance." /></div>)}
            </div>
          ) },
        { id: 'status', title: 'Status',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
              {STATUSES.map((s) => <Alert key={s} {...actions} status={s} title={`${s[0].toUpperCase()}${s.slice(1)} alert`} description="Supporting description for this status." />)}
            </div>
          ) },
      ]}
    />
  );
}
