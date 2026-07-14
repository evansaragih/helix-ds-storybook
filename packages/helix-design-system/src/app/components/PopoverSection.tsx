import { PageLayout, Section } from './PageLayout';
import { Popover, PopoverHeader, PopoverBody, PopoverFooter } from '../../components/Popover';
import { Button, Input } from '../../components';
import { Settings, HelpCircle, Bell } from 'lucide-react';

const toc = [
  { id: 'popover-usage', label: 'Usage Guidelines' },
  { id: 'popover-basic', label: 'Basic' },
  { id: 'popover-placement', label: 'Placement' },
  { id: 'popover-with-form', label: 'With Form' },
  { id: 'popover-examples', label: 'Examples' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start', minHeight: 120 }}>{children}</div>
    </div>
  );
}

export function PopoverSection() {
  return (
    <PageLayout
      category="Components"
      title="Popover"
      description="Popovers are floating panels anchored to a trigger element. Use them to display supplementary content, forms, or actions without navigating away from the current page."
      tocItems={toc}
    >
      <Section id="popover-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Light, not deep', body: 'Popovers should contain concise content. For rich content that needs more space, use a Sheet or Dialog instead.' },
            { heading: 'Close on outside click', body: 'Popovers should always close when the user clicks outside. Make this behaviour consistent across all usage.' },
            { heading: 'Don\'t nest', body: 'Avoid opening a popover from inside another popover. This creates a confusing layering experience.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="popover-basic" title="Basic">
        <Card title="Simple popover (click to open)">
          <Popover
            trigger={<Button variant="neutral" size="sm">Open popover</Button>}
            placement="bottom-start"
          >
            <PopoverBody>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A', lineHeight: '1.6' }}>
                This is a basic popover. Click outside to close it.
              </p>
            </PopoverBody>
          </Popover>

          <Popover
            trigger={<Button variant="neutral" size="sm" leadingIcon={<HelpCircle size={14} />}>Help</Button>}
            placement="bottom-start"
          >
            <PopoverHeader title="Keyboard shortcuts" description="Speed up your workflow" />
            <PopoverBody>
              {[['⌘K', 'Command palette'], ['⌘S', 'Save'], ['⌘Z', 'Undo']].map(([key, label]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #EEEEEE' }}>
                  <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#14141E' }}>{label}</span>
                  <kbd style={{ fontFamily: 'monospace', fontSize: 12, backgroundColor: '#F7F7F7', border: '1px solid #EEEEEE', borderRadius: 4, padding: '2px 6px', color: '#828282' }}>{key}</kbd>
                </div>
              ))}
            </PopoverBody>
          </Popover>
        </Card>
      </Section>

      <Section id="popover-placement" title="Placement">
        <Card title="Placement options">
          {(['bottom-start', 'bottom', 'bottom-end', 'top-start'] as const).map(p => (
            <Popover key={p} trigger={<Button variant="neutral" size="sm">{p}</Button>} placement={p}>
              <PopoverBody>
                <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#49494A' }}>Placement: {p}</p>
              </PopoverBody>
            </Popover>
          ))}
        </Card>
      </Section>

      <Section id="popover-with-form" title="With Form">
        <Card title="Inline form">
          <Popover
            trigger={<Button variant="primary" size="sm" leadingIcon={<Settings size={14} />}>Quick settings</Button>}
            placement="bottom-start"
            width={300}
          >
            <PopoverHeader title="Quick settings" description="Apply changes instantly" />
            <PopoverBody>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Input size="md" placeholder="Display name" label="Name" />
                <Input size="md" placeholder="team@company.com" label="Notification email" />
              </div>
            </PopoverBody>
            <PopoverFooter>
              <Button variant="neutral" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Save</Button>
            </PopoverFooter>
          </Popover>
        </Card>
      </Section>

      <Section id="popover-examples" title="Examples">
        <Card title="Notification popover">
          <Popover
            trigger={
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, border: '1px solid #EEEEEE', backgroundColor: '#FFF', cursor: 'pointer', fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#14141E' }}>
                <Bell size={14} /> Notifications <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F57E20', display: 'inline-block' }} />
              </button>
            }
            placement="bottom-end"
            width={320}
          >
            <PopoverHeader title="Notifications" description="3 unread" />
            <PopoverBody>
              {['Deployment complete', 'New comment on PR #42', 'Your export is ready'].map(n => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #F0F0F0' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#F57E20', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: 13, color: '#14141E' }}>{n}</span>
                </div>
              ))}
            </PopoverBody>
            <PopoverFooter>
              <Button variant="ghost-brand" size="sm">Mark all as read</Button>
            </PopoverFooter>
          </Popover>
        </Card>
      </Section>
    </PageLayout>
  );
}
