import { useState } from 'react';
import { ComponentDocPage } from './ComponentDocPage';
import { Sheet, Button, FooterActions, Input } from '../../components';
import type { SheetSide } from '../../components';

function SheetDemo({ side }: { side: SheetSide }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button hierarchy="secondary" appearance="outline" size="sm" onClick={() => setOpen(true)}>{side}</Button>
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        title="Edit sample"
        description="Update the sample details."
        footer={<FooterActions><Button hierarchy="secondary" appearance="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button><Button size="sm" onClick={() => setOpen(false)}>Save</Button></FooterActions>}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Input label="Sample name" placeholder="SMP-2026-0142" />
          <Input label="Analyst" placeholder="Dewi Lestari" />
        </div>
      </Sheet>
    </>
  );
}

export function SheetSection() {
  return (
    <ComponentDocPage
      slug="sheet"
      title="Sheets"
      description="An edge-anchored overlay panel — a left or right side panel, or a top or bottom bar — for secondary tasks, detail views and forms that slide in while the page stays visible behind. For a centered task use Dialog."
      usage={[
        { heading: 'Secondary tasks', body: 'Use a sheet for detail views and edit forms where keeping the page behind visible helps.' },
        { heading: 'Side by purpose', body: 'Left or right for panels; top or bottom for short bars such as filters or actions.' },
        { heading: 'Dialog for focus', body: 'A centered task that must be finished or dismissed belongs in a Dialog.' },
      ]}
      demos={[{ id: 'sides', title: 'Sides', description: 'Click a side to open the sheet. Escape or the close button dismisses it.', node: <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{(['left', 'right', 'top', 'bottom'] as const).map((s) => <SheetDemo key={s} side={s} />)}</div> }]}
    />
  );
}
