import { PageLayout, Section } from './PageLayout';
import { MenuItem, Command } from '../../components';
import type { CommandItem } from '../../components';
import {
  Search, Settings, Trash2, LogOut, Copy, Edit3,
  Star, Bell, User, Download, ExternalLink, Archive,
  FileText, FolderOpen, Zap, ToggleLeft, Moon, Globe,
  Calendar
} from 'lucide-react';

const toc = [
  { id: 'usage-guidelines', label: 'Usage Guidelines' },
  { id: 'menu-states', label: 'States' },
  { id: 'menu-variants', label: 'Variants' },
  { id: 'menu-sizes', label: 'Sizes' },
  { id: 'menu-examples', label: 'Examples' },
  { id: 'menu-command', label: 'Command' },
];

const checkboxItems: CommandItem[] = [
  { id: 'filter-1', label: 'Filter 1', checked: true },
  { id: 'filter-2', label: 'Filter 2', checked: false },
  { id: 'filter-3', label: 'Filter 3', checked: false },
];

const radioItems: CommandItem[] = [
  { id: 'profile-1', label: 'Profile 1', checked: true },
  { id: 'profile-2', label: 'Profile 2', checked: false },
  { id: 'profile-3', label: 'Profile 3', checked: false },
];

const commandItems: CommandItem[] = [
  { id: 'new-doc',      label: 'New Document',      group: 'Create', leadingContent: <FileText size={16} />,   shortcut: '⌘N' },
  { id: 'new-folder',   label: 'New Folder',        group: 'Create', leadingContent: <FolderOpen size={16} />, shortcut: '⌘⇧N' },
  { id: 'search',       label: 'Search files…',     group: 'Navigate', leadingContent: <Search size={16} />,   shortcut: '⌘K' },
  { id: 'goto',         label: 'Go to page',        group: 'Navigate', leadingContent: <Globe size={16} /> },
  { id: 'run',          label: 'Run action',        group: 'Actions', leadingContent: <Zap size={16} /> },
  { id: 'toggle',       label: 'Toggle sidebar',    group: 'Actions', leadingContent: <ToggleLeft size={16} />, shortcut: '⌘\\' },
  { id: 'dark-mode',    label: 'Toggle dark mode',  group: 'Actions', leadingContent: <Moon size={16} /> },
  { id: 'settings',     label: 'Settings',          group: 'Actions', leadingContent: <Settings size={16} />,  shortcut: '⌘,' },
  { id: 'delete',       label: 'Delete selected',   group: 'Danger',  leadingContent: <Trash2 size={16} />,    shortcut: '⌫' },
];

function MenuGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      padding: '6px',
      backgroundColor: '#FFFFFF',
      border: '1px solid #EEEEEE',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-sm)',
      minWidth: '220px',
    }}>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{
      height: '1px',
      backgroundColor: '#EEEEEE',
      margin: '4px 0',
    }} />
  );
}

export function MenuItemSection() {
  const stateCards: Array<{ state: NonNullable<React.ComponentProps<typeof MenuItem>['state']>; label: string }> = [
    { state: 'Default', label: 'Default' },
    { state: 'Hover', label: 'Hover' },
    { state: 'Focus', label: 'Focus' },
    { state: 'Pressed', label: 'Pressed' },
    { state: 'Selected', label: 'Selected' },
    { state: 'Disabled', label: 'Disabled' },
  ];

  return (
    <PageLayout
      category="Components"
      title="Menu"
      description="Menu items are the individual interactive rows inside menus, dropdowns, and context menus. They support icons, labels, supporting text, shortcuts, and submenu indicators."
      tocItems={toc}
    >
      {/* Usage Guidelines */}
      <Section id="usage-guidelines" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { heading: 'Labels', body: 'Keep labels concise — one or two words. Use sentence case, not title case.' },
            { heading: 'Grouping', body: 'Separate unrelated actions with a divider. Limit a single menu to 7–9 items before splitting.' },
            { heading: 'Destructive actions', body: 'Use the Destructive variant for permanent, irreversible actions like Delete or Remove.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: '16px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* States */}
      <Section id="menu-states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Menu items respond to pointer and keyboard interactions with distinct visual states.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {stateCards.map(({ state, label }) => (
            <div key={state} style={{ padding: '16px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 12px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>{label}</p>
              <MenuGroup>
                <MenuItem
                  label="Menu item"
                  state={state}
                  leadingContent={<Settings size={16} />}
                  shortcut={state === 'Default' ? undefined : undefined}
                />
              </MenuGroup>
            </div>
          ))}
        </div>
      </Section>

      {/* Variants */}
      <Section id="menu-variants" title="Variants">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Default */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Default</p>
            <MenuGroup>
              <MenuItem label="Edit" leadingContent={<Edit3 size={16} />} shortcut="⌘E" />
              <MenuItem label="Duplicate" leadingContent={<Copy size={16} />} shortcut="⌘D" />
              <MenuItem label="Archive" leadingContent={<Archive size={16} />} />
              <Divider />
              <MenuItem label="Move to…" leadingContent={<ExternalLink size={16} />} hasSubmenu />
              <Divider />
              <MenuItem label="Delete" variant="Destructive" leadingContent={<Trash2 size={16} />} shortcut="⌫" />
            </MenuGroup>
          </div>

          {/* Destructive */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Destructive</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282', lineHeight: '1.5' }}>
              Use for permanent, irreversible actions. Always place at the bottom of the menu, separated by a divider.
            </p>
            <MenuGroup>
              <MenuItem label="Remove from project" variant="Destructive" leadingContent={<Trash2 size={16} />} />
              <MenuItem label="Delete permanently" variant="Destructive" leadingContent={<Trash2 size={16} />} shortcut="⌫" />
              <MenuItem label="Sign out" variant="Destructive" leadingContent={<LogOut size={16} />} />
            </MenuGroup>
          </div>
        </div>
      </Section>

      {/* Sizes */}
      <Section id="menu-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Menu items are available in Medium (40px) and Small (32px) heights.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 4px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Medium (Default)</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>Height: 40px · Font: 14px</p>
            <MenuGroup>
              <MenuItem size="Medium" label="Profile" leadingContent={<User size={18} />} />
              <MenuItem size="Medium" label="Notifications" leadingContent={<Bell size={18} />} />
              <MenuItem size="Medium" label="Settings" leadingContent={<Settings size={18} />} />
              <Divider />
              <MenuItem size="Medium" label="Sign out" variant="Destructive" leadingContent={<LogOut size={18} />} />
            </MenuGroup>
          </div>
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 4px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Small</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>Height: 32px · Font: 13px</p>
            <MenuGroup>
              <MenuItem size="Small" label="Profile" leadingContent={<User size={16} />} />
              <MenuItem size="Small" label="Notifications" leadingContent={<Bell size={16} />} />
              <MenuItem size="Small" label="Settings" leadingContent={<Settings size={16} />} />
              <Divider />
              <MenuItem size="Small" label="Sign out" variant="Destructive" leadingContent={<LogOut size={16} />} />
            </MenuGroup>
          </div>
        </div>
      </Section>

      {/* Examples */}
      <Section id="menu-examples" title="Examples">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {/* Context menu */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Context Menu</p>
            <MenuGroup>
              <MenuItem label="Open" leadingContent={<ExternalLink size={16} />} />
              <MenuItem label="Open in new tab" leadingContent={<ExternalLink size={16} />} shortcut="⌘↵" />
              <Divider />
              <MenuItem label="Copy link" leadingContent={<Copy size={16} />} shortcut="⌘L" />
              <MenuItem label="Download" leadingContent={<Download size={16} />} shortcut="⌘S" />
              <Divider />
              <MenuItem label="Delete" variant="Destructive" leadingContent={<Trash2 size={16} />} />
            </MenuGroup>
          </div>

          {/* Navigation menu */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Navigation Menu</p>
            <MenuGroup>
              <MenuItem label="Dashboard" leadingContent={<Star size={16} />} state="Selected" />
              <MenuItem label="Search" leadingContent={<Search size={16} />} shortcut="⌘K" />
              <MenuItem label="Notifications" leadingContent={<Bell size={16} />} trailingContent={
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '9999px', backgroundColor: '#F57E20', fontFamily: 'Rubik, sans-serif', fontSize: '10px', color: 'white', fontWeight: 600 }}>3</span>
              } />
              <MenuItem label="Settings" leadingContent={<Settings size={16} />} hasSubmenu />
              <Divider />
              <MenuItem label="Profile" leadingContent={<User size={16} />} supportingText="Evan Himawan" />
            </MenuGroup>
          </div>

          {/* With supporting text */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>With Supporting Text</p>
            <MenuGroup>
              <MenuItem label="Starter" supportingText="Up to 3 projects, free forever" leadingContent={<Star size={16} />} />
              <MenuItem label="Pro" supportingText="Unlimited projects, $12/mo" leadingContent={<Star size={16} />} state="Selected" />
              <MenuItem label="Enterprise" supportingText="Custom pricing, contact us" leadingContent={<Star size={16} />} />
              <Divider />
              <MenuItem label="Manage billing" leadingContent={<Settings size={16} />} />
            </MenuGroup>
          </div>
        </div>
      </Section>

      {/* Command */}
      <Section id="menu-command" title="Command">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          The Command extends the menu with a search input that filters items in real time. Use it for command palettes, quick launchers, or any menu with more than 7 options. Fully keyboard navigable — ↑ ↓ to move, Enter to select, Escape to clear.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {/* Live demo */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Live demo</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>Type to filter · ↑↓ to navigate · Enter to select</p>
            <Command
              items={commandItems}
              placeholder="Search commands…"
              width="100%"
              onSelect={(item) => console.log('selected:', item.label)}
            />
          </div>

          {/* Empty state */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Empty state</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>Shown when the query matches no items</p>
            <Command
              items={commandItems}
              placeholder="Search commands…"
              value="xyznotfound"
              width="100%"
            />
          </div>

          {/* Checkbox variant */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Checkbox</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>Multi-select filter with a clear action</p>
            <Command
              type="checkbox"
              header="Last edited by"
              items={checkboxItems}
              placeholder="Search…"
              width="100%"
              headerMenu={[
                { id: 'delete-filter', label: 'Delete filter', leadingContent: <Calendar size={16} /> },
                { id: 'settings', label: 'Settings', leadingContent: <Settings size={16} />, shortcut: '⌘S' },
              ]}
            />
          </div>

          {/* Radio variant */}
          <div style={{ padding: '20px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>Radio</p>
            <p style={{ margin: '0 0 16px', fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#828282' }}>Single-select filter with a clear action</p>
            <Command
              type="radio"
              header="Last edited by"
              items={radioItems}
              placeholder="Search…"
              width="100%"
              headerMenu={[
                { id: 'delete-filter', label: 'Delete filter', leadingContent: <Calendar size={16} /> },
                { id: 'settings', label: 'Settings', leadingContent: <Settings size={16} />, shortcut: '⌘S' },
              ]}
            />
          </div>
        </div>

        {/* Anatomy */}
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { heading: 'Search input', body: 'Fixed at the top. Auto-focused when the palette opens. Escape clears the query.' },
            { heading: 'Groups', body: 'Items can belong to a named group. Group headers appear in uppercase muted text above their items.' },
            { heading: 'Keyboard nav', body: '↑ / ↓ moves the active highlight. Enter selects. Disabled items are skipped.' },
          ].map(g => (
            <div key={g.heading} style={{ padding: '16px', backgroundColor: '#F7F7F7', borderRadius: '10px', border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: '13px', color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
