import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert, AlertDialog, Button, DropdownMenu, Popover, Select, Sheet, Toastr, Tooltip, TooltipProvider } from 'helix-design-system/components';
import { Section } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Motion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component: 'Three durations and two easings, used by every component through the --motion-* tokens. Floating panels share one enter/exit (.helix-pop); dialogs and sheets have their own. Reduced-motion is handled once, globally.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DURATIONS: [string, string, string][] = [
  ['--motion-duration-fast', '160ms', 'Micro-interactions: hover, focus ring, chevron rotate'],
  ['--motion-duration-base', '200ms', 'Small overlays: popover, dropdown, tooltip, toast, dialog'],
  ['--motion-duration-slow', '280ms', 'Large panels: sheet, drawer; progress fills'],
];
const EASINGS: [string, string, string][] = [
  ['--motion-easing-standard', 'cubic-bezier(0.4, 0, 0.2, 1)', 'Symmetric — state changes, expand / collapse, exits'],
  ['--motion-easing-decelerate', 'cubic-bezier(0.32, 0.72, 0, 1)', 'Entrances — fast in, gentle settle'],
];

function Track({ duration, easing }: { duration: string; easing: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-label={`Replay ${duration} ${easing}`}
      style={{ position: 'relative', width: 220, height: 36, padding: 0, border: '1px solid var(--color-stroke-subtle)', borderRadius: 8, background: 'var(--color-container-secondary)', cursor: 'pointer' }}
    >
      <span
        style={{
          position: 'absolute', top: 6, left: on ? 'calc(100% - 30px)' : 6, width: 24, height: 24, borderRadius: 6,
          background: 'var(--color-brand-primary)', transition: `left var(${duration}) var(${easing})`,
        }}
      />
    </button>
  );
}

export const Tokens: Story = {
  render: () => (
    <Section title="Tokens" description="Click a track to replay it. Components reference these CSS variables inside their inline transition / animation strings — never a literal like 0.15s.">
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '12px 24px', alignItems: 'center', fontSize: 13 }}>
        {DURATIONS.map(([v, ms, use]) => (
          <div key={v} style={{ display: 'contents' }}>
            <code>{v}</code><span style={{ fontWeight: 500 }}>{ms}</span><span style={{ color: 'var(--color-text-tertiary)' }}>{use}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: '12px 24px', alignItems: 'center', fontSize: 13, marginTop: 24 }}>
        {EASINGS.map(([v, curve, use]) => (
          <div key={v} style={{ display: 'contents' }}>
            <code>{v}</code><code style={{ color: 'var(--color-text-secondary)' }}>{curve}</code><span style={{ color: 'var(--color-text-tertiary)' }}>{use}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 32 }}>
        {DURATIONS.map(([d]) => EASINGS.map(([e]) => (
          <div key={d + e} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Track duration={d} easing={e} />
            <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{d.replace('--motion-duration-', '')} · {e.replace('--motion-easing-', '')}</span>
          </div>
        )))}
      </div>
    </Section>
  ),
};

export const Overlays: Story = {
  render: function Render() {
    const [dialog, setDialog] = useState(false);
    const [sheet, setSheet] = useState(false);
    const [toast, setToast] = useState(false);
    const [value, setValue] = useState('');
    return (
      <TooltipProvider>
        <Section title="Overlays" description="Open and close each one — the exit should animate too, not vanish. Popover, Select, Dropdown and Tooltip share .helix-pop (a 4px drift away from the trigger, direction from data-side).">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', minHeight: 220 }}>
            <Popover trigger={<Button hierarchy="secondary" appearance="outline" size="sm">Popover</Button>} side="bottom">
              <Alert status="info" layout="compact" title="Popover" description="shared enter / exit" />
            </Popover>
            <DropdownMenu
              trigger={<Button hierarchy="secondary" appearance="outline" size="sm">Dropdown</Button>}
              items={[{ label: 'Edit' }, { label: 'Duplicate' }, { type: 'divider' }, { label: 'Delete', destructive: true }]}
            />
            <div style={{ width: 200 }}>
              <Select placeholder="Select" value={value} onValueChange={setValue} options={[{ value: 'a', label: 'Udang' }, { value: 'b', label: 'Benur' }, { value: 'c', label: 'Pakan' }]} />
            </div>
            <Tooltip content="Tooltip (same motion)"><Button hierarchy="secondary" appearance="outline" size="sm">Tooltip</Button></Tooltip>
            <Button size="sm" onClick={() => setDialog(true)}>Alert dialog</Button>
            <Button size="sm" onClick={() => setSheet(true)}>Sheet</Button>
            <Button size="sm" onClick={() => setToast(true)}>Toastr</Button>
          </div>
          <AlertDialog
            open={dialog}
            onClose={() => setDialog(false)}
            iconStatus="destructive"
            title="Delete this sample?"
            description="Fade + scale in, 200ms; reverses on close."
            confirmAction={{ label: 'Delete', onClick: () => setDialog(false) }}
            cancelAction={{ label: 'Cancel', onClick: () => setDialog(false) }}
          />
          <Sheet open={sheet} onClose={() => setSheet(false)} title="Sheet" description="Slides in over 280ms (decelerate).">
            <div style={{ padding: 12 }}>Large panels use the slow token.</div>
          </Sheet>
          <Toastr open={toast} onClose={() => setToast(false)} width={420}>
            <Alert status="success" layout="compact" title="Saved" description="Slides and fades in from its corner." />
          </Toastr>
        </Section>
      </TooltipProvider>
    );
  },
};
