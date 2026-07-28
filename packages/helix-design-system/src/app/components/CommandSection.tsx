import { FlaskConical, FileText, Settings, User } from 'lucide-react';
import { PageLayout, Section } from './PageLayout';
import { Command } from '../../components';

const toc = [
  { id: 'command-usage', label: 'Usage Guidelines' },
  { id: 'command-default', label: 'Default' },
  { id: 'command-types', label: 'Checkbox & Radio' },
  { id: 'command-header-menu', label: 'Header Menu' },
];

const ITEMS = [
  { id: 'samples', label: 'View samples', group: 'Navigation', leadingContent: <FlaskConical size={16} />, shortcut: '⌘S' },
  { id: 'reports', label: 'View reports', group: 'Navigation', leadingContent: <FileText size={16} />, shortcut: '⌘R' },
  { id: 'profile', label: 'My profile', group: 'Account', leadingContent: <User size={16} /> },
  { id: 'settings', label: 'Settings', group: 'Account', leadingContent: <Settings size={16} /> },
  { id: 'archived', label: 'Archived item', group: 'Account', disabled: true },
];

const CHECKABLE_ITEMS = [
  { id: 'a', label: 'Show completed', checked: true },
  { id: 'b', label: 'Show pending', checked: false },
  { id: 'c', label: 'Show archived', checked: false },
];

function DemoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{title}</p>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>{children}</div>
    </div>
  );
}

export function CommandSection() {
  return (
    <PageLayout
      category="Components"
      title="Command"
      description="A searchable list of actions, grouped and keyboard-navigable, with optional checkbox/radio selection and a header overflow menu."
      tocItems={toc}
    >
      <Section id="command-usage" title="Usage Guidelines">
        <div style={{ padding: 16, backgroundColor: '#FEF5E7', borderRadius: 10, border: '1px solid #FDE8BC' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#7F4E00', lineHeight: '1.6' }}>
            <strong>Deprecated</strong> — superseded by <code>MenuItem</code> in the Figma design system. Kept here for backwards
            compatibility with existing usages; prefer composing menus from <code>MenuItem</code> for new work.
          </p>
        </div>
      </Section>

      <Section id="command-default" title="Default">
        <DemoCard title="Default, with header and no-header variants">
          <Command items={ITEMS} header="Quick actions" placeholder="Search actions…" />
          <Command items={ITEMS} placeholder="Search actions…" />
        </DemoCard>
      </Section>

      <Section id="command-types" title="Checkbox & Radio">
        <DemoCard title="Selectable list types">
          <Command type="checkbox" items={CHECKABLE_ITEMS} header="Filter status" />
          <Command type="radio" items={CHECKABLE_ITEMS} header="Sort by" />
        </DemoCard>
      </Section>

      <Section id="command-header-menu" title="Header Menu">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Pass <code>headerMenu</code> to show a ••• overflow menu on the header row (e.g. Refresh, Export).
        </p>
        <DemoCard title="With header menu">
          <Command
            items={ITEMS}
            header="Quick actions"
            headerMenu={[
              { id: 'refresh', label: 'Refresh', onSelect: () => {} },
              { id: 'export', label: 'Export', onSelect: () => {} },
            ]}
          />
        </DemoCard>
      </Section>
    </PageLayout>
  );
}
