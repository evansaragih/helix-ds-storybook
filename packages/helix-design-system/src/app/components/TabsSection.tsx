import { ComponentDocPage } from './ComponentDocPage';
import { Tabs } from '../../components';
import { LayoutDashboard } from 'lucide-react';

const items = [
  { id: 'overview', label: 'Overview', content: <div>Overview content</div> },
  { id: 'activity', label: 'Activity', badge: 3, content: <div>Activity content</div> },
  { id: 'settings', label: 'Settings', content: <div>Settings content</div> },
  { id: 'archived', label: 'Archived', disabled: true },
];

export function TabsSection() {
  return (
    <ComponentDocPage
      slug="tabs"
      title="Tab"
      description="A set of tabs that switch between panels of content — horizontal (Line, Filled, Contained) or vertical (Bordered, Filled, Contained)."
      usage={[
        { heading: 'Peers, not steps', body: 'Tabs switch between sibling views of the same thing. For a sequence use Stepper.' },
        { heading: 'Short labels', body: 'One or two words each; add an icon or a count badge only when it helps.' },
        { heading: 'Vertical for many', body: 'Use the vertical set for settings pages with more than five sections.' },
      ]}
      demos={[
        { id: 'appearances', title: 'Horizontal appearances', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 420 }}>{(['line', 'filled', 'contained'] as const).map((a) => <Tabs key={a} appearance={a} items={items} renderContent={false} />)}</div> },
        { id: 'sizes', title: 'Sizes', description: 'Small 36 · Medium 44 · Large 52.', node: <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 420 }}>{(['sm', 'md', 'lg'] as const).map((s) => <Tabs key={s} size={s} appearance="filled" items={items} renderContent={false} />)}</div> },
        { id: 'icons', title: 'With icons and navigation', description: 'When the tabs do not fit, Prev / Next buttons appear and scroll the row; they dim at either end.', node: <div style={{ width: 420 }}><Tabs items={Array.from({ length: 8 }, (_, i) => ({ id: `t${i}`, label: `Tab ${i + 1}`, icon: <LayoutDashboard size={16} /> }))} renderContent={false} /></div> },
        { id: 'vertical', title: 'Vertical', node: <div style={{ display: 'flex', gap: 32 }}>{(['bordered', 'filled', 'contained'] as const).map((a) => <Tabs key={a} orientation="vertical" appearance={a} items={items} renderContent={false} />)}</div> },
      ]}
    />
  );
}
