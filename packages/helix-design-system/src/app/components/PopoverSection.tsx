import { ComponentDocPage } from './ComponentDocPage';
import { Popover, PopoverListHeader, Button, IconButton, FooterActions } from '../../components';
import { Settings } from 'lucide-react';

const rows = ['Profile', 'Billing', 'Team', 'Notifications'].map((l) => <div key={l} style={{ padding: '8px 12px', fontFamily: 'var(--font-family-body)', fontSize: 13 }}>{l}</div>);
const open = <Button hierarchy="secondary" appearance="outline" size="sm">Open popover</Button>;
const wrap = (n: React.ReactNode) => <div style={{ minHeight: 280 }}>{n}</div>;

export function PopoverSection() {
  return (
    <ComponentDocPage
      slug="popover"
      title="Popover"
      description="The base floating panel: a trigger plus a shell with Header, Body and Footer slots. Use it to build a trigger-and-panel from scratch; for finished patterns use Dropdown (actions) or Select (form field)."
      usage={[
        { heading: 'Rich content', body: 'Use a popover when the panel needs more than a tooltip — a short form, a list, a summary.' },
        { heading: 'Build blocks', body: 'Header, Body and Footer are slots, so Dropdown and Select are built from this same shell.' },
        { heading: 'Keep it short', body: 'A popover is dismissed on outside click — don’t put long, multi-step tasks in it.' },
      ]}
      demos={[
        { id: 'header', title: 'With header', node: wrap(<Popover trigger={open} header={<PopoverListHeader label="Account" supportingText="menu" action={<IconButton aria-label="Settings" hierarchy="secondary" appearance="ghost" size="xs" icon={<Settings size={12} />} />} />}>{rows}</Popover>) },
        { id: 'search', title: 'Search header', node: wrap(<Popover trigger={open} header={<PopoverListHeader type="search" />}>{rows}</Popover>) },
        { id: 'footer', title: 'With footer', node: wrap(<Popover trigger={open} footer={<div style={{ padding: '8px 4px 4px' }}><FooterActions><Button size="xs" hierarchy="secondary" appearance="outline">Cancel</Button><Button size="xs" hierarchy="tertiary">Apply</Button></FooterActions></div>}>{rows}</Popover>) },
      ]}
    />
  );
}
