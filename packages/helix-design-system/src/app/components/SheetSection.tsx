import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';
import { Sheet } from '../../components/Sheet';
import { Button, Input } from '../../components';
import { RadioButton, RadioGroup } from '../../components/RadioButton';

const toc = [
  { id: 'sheet-usage', label: 'Usage Guidelines' },
  { id: 'sheet-sides', label: 'Sides' },
  { id: 'sheet-examples', label: 'Examples' },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{children}</div>
    </div>
  );
}

export function SheetSection() {
  const [open, setOpen] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('most-recent');

  return (
    <PageLayout
      category="Components"
      title="Sheet"
      description="Sheets are panel overlays that slide in from a screen edge. Use them for secondary tasks, detail views, or forms that don't need to take over the full page."
      tocItems={toc}
    >
      <Sheet open={open === 'right'} onClose={() => setOpen(null)} side="right" title="Edit profile" description="Update your account information." footer={<><Button variant="neutral" size="sm" onClick={() => setOpen(null)}>Cancel</Button><Button variant="primary" size="sm">Save changes</Button></>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Full name" placeholder="Evan Himawan" size="md" />
          <Input label="Email" placeholder="evan@helix.com" size="md" />
          <Input label="Role" placeholder="Product Designer" size="md" />
        </div>
      </Sheet>

      <Sheet open={open === 'left'} onClose={() => setOpen(null)} side="left" title="Navigation" description="Browse pages and sections.">
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {['Dashboard', 'Analytics', 'Projects', 'Team', 'Settings'].map(item => (
            <button key={item} style={{ padding: '10px 12px', borderRadius: 8, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#14141E', textAlign: 'left' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F7F7F7'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >{item}</button>
          ))}
        </nav>
      </Sheet>

      <Sheet open={open === 'bottom'} onClose={() => setOpen(null)} side="bottom" title="Sort & Filter" description="Refine the current view." footer={<><Button variant="neutral" size="sm" onClick={() => { setSortBy('most-recent'); setOpen(null); }}>Reset</Button><Button variant="primary" size="sm" onClick={() => setOpen(null)}>Apply</Button></>}>
        <RadioGroup name="sort" value={sortBy} onChange={setSortBy}>
          <RadioButton value="most-recent" label="Most recent" />
          <RadioButton value="oldest-first" label="Oldest first" />
          <RadioButton value="alphabetical" label="Alphabetical" />
          <RadioButton value="by-status" label="By status" />
        </RadioGroup>
      </Sheet>

      <Section id="sheet-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Supplement, don\'t replace', body: 'Sheets keep the main page visible. If the user needs to fully focus on the task, use a Dialog or navigate to a new page.' },
            { heading: 'Include a clear title', body: 'Every sheet should have a title explaining the purpose. Avoid opening a sheet without context.' },
            { heading: 'Provide a close action', body: 'Always include a close button (X) and support pressing Escape. Don\'t rely solely on clicking the overlay.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="sheet-sides" title="Sides">
        <DemoCard title="Open from each side">
          <Button variant="neutral" size="sm" onClick={() => setOpen('right')}>Right (default)</Button>
          <Button variant="neutral" size="sm" onClick={() => setOpen('left')}>Left</Button>
          <Button variant="neutral" size="sm" onClick={() => setOpen('bottom')}>Bottom</Button>
        </DemoCard>
      </Section>

      <Section id="sheet-examples" title="Examples">
        <DemoCard title="Common patterns">
          <Button variant="primary" size="sm" onClick={() => setOpen('right')}>Edit profile</Button>
          <Button variant="neutral" size="sm" onClick={() => setOpen('left')}>Navigation menu</Button>
          <Button variant="neutral" size="sm" onClick={() => setOpen('bottom')}>Sort & Filter</Button>
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
