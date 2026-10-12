import { useState } from 'react';
import { ComponentDocPage } from './ComponentDocPage';
import { Toastr, Alert, Button } from '../../components';

function ToastrDemo() {
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | null>(null);
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map((p) => (
        <Button key={p} hierarchy="secondary" appearance="outline" size="sm" onClick={() => setPosition(p)}>{p}</Button>
      ))}
      <Toastr open={position !== null} position={position ?? 'top-right'} onClose={() => setPosition(null)}>
        <Alert layout="compact" status="success" title="Sample saved" description="Your changes were saved to batch 24." secondaryAction={{ label: 'Dismiss', onClick: () => setPosition(null) }} action={{ label: 'View batch', onClick: () => setPosition(null) }} />
      </Toastr>
    </div>
  );
}

export function ToastrSection() {
  return (
    <ComponentDocPage
      slug="toastr"
      title="Toastr"
      description="A toast pinned to a viewport corner that slides and fades in and out, with a soft chime. There is no backdrop, so the page behind stays clickable. Use for transient system notices; for inline page messages use Alert directly."
      usage={[
        { heading: 'Non-blocking', body: 'There is no backdrop, so the user can keep working. Close it with Escape or its own Dismiss action, and add an auto-close if the notice is transient.' },
        { heading: 'Alert as content', body: 'Place an Alert, usually the Compact layout, inside the Toastr.' },
        { heading: 'Four corners', body: 'Top or bottom, left or right — pick the corner that does not cover the task. The toast slides in from its own edge.' },
        { heading: 'Sound', body: 'A soft chime plays each time it opens; pass sound={false} to silence it. Browsers only allow audio after the user has interacted with the page.' },
      ]}
      demos={[{ id: 'positions', title: 'Positions', description: 'Click a position to open the Toastr. Press Escape or use Dismiss to close it.', node: <ToastrDemo /> }]}
    />
  );
}
