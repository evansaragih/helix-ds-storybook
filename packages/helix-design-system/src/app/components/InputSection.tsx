import { useState, useRef, useEffect } from 'react';
import { PageLayout, Section } from './PageLayout';
import { Search, Eye, EyeOff, Copy, ChevronDown } from 'lucide-react';
import { Input, Command, MenuItem, Alert } from '../../components';
import type { CommandItem } from '../../components';

const toc = [
  { id: 'input-usage',    label: 'Usage Guidelines' },
  { id: 'input-sizes',    label: 'Sizes' },
  { id: 'input-floating', label: 'Floating' },
  { id: 'input-states',   label: 'States' },
  { id: 'input-addons',   label: 'Leading & Trailing' },
  { id: 'input-support',  label: 'Helper & Validation' },
];

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
      <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Country phone picker ─────────────────────────────────────────── */

const COUNTRIES = [
  { id: 'id', flag: '🇮🇩', code: '+62', label: 'Indonesia' },
  { id: 'us', flag: '🇺🇸', code: '+1',  label: 'United States' },
  { id: 'gb', flag: '🇬🇧', code: '+44', label: 'United Kingdom' },
  { id: 'sg', flag: '🇸🇬', code: '+65', label: 'Singapore' },
  { id: 'my', flag: '🇲🇾', code: '+60', label: 'Malaysia' },
  { id: 'au', flag: '🇦🇺', code: '+61', label: 'Australia' },
  { id: 'jp', flag: '🇯🇵', code: '+81', label: 'Japan' },
];

const COMMAND_COUNTRIES: CommandItem[] = COUNTRIES.map(c => ({
  id: c.id,
  label: c.label,
  leadingContent: <span style={{ fontSize: 16 }}>{c.flag}</span>,
  shortcut: c.code,
}));

function PhoneSelectInput() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(COUNTRIES[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <Input
        size="md"
        label="Phone"
        placeholder="812 3456 7890"
        leadingDivider
        leadingContent={
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'var(--font-family-body)', fontSize: 13, fontWeight: 600,
              color: '#49494A',
            }}
          >
            <span style={{ fontSize: 16 }}>{selected.flag}</span>
            {selected.code}
            <ChevronDown size={14} color="#828282" />
          </button>
        }
      />

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          zIndex: 100,
        }}>
          <Command
            items={COMMAND_COUNTRIES}
            placeholder="Search country…"
            width={240}
            onSelect={(item) => {
              const country = COUNTRIES.find(c => c.id === item.id);
              if (country) setSelected(country);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── Currency price selector ──────────────────────────────────────── */

const CURRENCIES = [
  { id: 'idr', symbol: 'Rp',  code: 'IDR' },
  { id: 'usd', symbol: '$',   code: 'USD' },
  { id: 'eur', symbol: '€',   code: 'EUR' },
  { id: 'sgd', symbol: 'S$',  code: 'SGD' },
  { id: 'myr', symbol: 'RM',  code: 'MYR' },
];

function PriceSelectInput() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(CURRENCIES[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <Input
        size="md"
        label="Price"
        placeholder="0"
        leadingContent={
          <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, fontWeight: 600, color: '#49494A' }}>
            {selected.symbol}
          </span>
        }
        leadingDivider
        trailingDivider
        trailingContent={
          <button
            onClick={() => setOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              border: 'none', background: 'none', cursor: 'pointer', padding: 0,
              fontFamily: 'var(--font-family-body)', fontSize: 13, fontWeight: 500,
              color: '#49494A',
            }}
          >
            {selected.code}
            <ChevronDown size={14} color="#828282" />
          </button>
        }
      />

      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          right: 0,
          zIndex: 100,
          minWidth: 140,
          backgroundColor: 'white',
          borderRadius: 10,
          border: '1px solid #EEEEEE',
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          padding: '4px',
          overflow: 'hidden',
        }}>
          {CURRENCIES.map(c => (
            <MenuItem
              key={c.id}
              label={c.code}
              size="Small"
              state={selected.id === c.id ? 'Selected' : 'Default'}
              leadingContent={
                <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 12, fontWeight: 600, color: '#828282', minWidth: 20 }}>
                  {c.symbol}
                </span>
              }
              onSelect={() => { setSelected(c); setOpen(false); }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Password input with show/hide toggle ─────────────────────────── */

function PasswordInput({ floating, label = 'Password', defaultValue, error, errorText }: { floating?: boolean; label?: string; defaultValue?: string; error?: boolean; errorText?: string }) {
  const [visible, setVisible] = useState(false);

  const toggle = (
    <button
      type="button"
      onClick={() => setVisible(v => !v)}
      style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#828282' }}
      aria-label={visible ? 'Hide password' : 'Show password'}
    >
      {visible ? <Eye size={16} /> : <EyeOff size={16} />}
    </button>
  );

  return floating
    ? <Input floating label={label} type={visible ? 'text' : 'password'} defaultValue={defaultValue} trailingContent={toggle} error={error} errorText={errorText} />
    : <Input size="md" label={label} type={visible ? 'text' : 'password'} defaultValue={defaultValue} trailingContent={toggle} error={error} errorText={errorText} />;
}

/* ─── API key input with copy + success alert ──────────────────────── */

function ApiKeyInput() {
  const [copied, setCopied] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const value = 'sk-abc123xyz';

  const dismiss = () => {
    setDismissing(true);
    setTimeout(() => { setCopied(false); setDismissing(false); }, 250);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setDismissing(false);
    setTimeout(() => dismiss(), 3000);
  };

  return (
    <>
      <Input
        size="md"
        label="API key"
        defaultValue={value}
        trailingDivider
        trailingContent={
          <button
            type="button"
            onClick={handleCopy}
            style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: '#828282' }}
            aria-label="Copy API key"
          >
            <Copy size={16} />
          </button>
        }
      />
      {copied && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 360,
          animation: `${dismissing ? 'toast-out' : 'toast-in'} 0.25s ease forwards`,
        }}>
          <Alert
            variant="success"
            title="API key copied"
            description="The key has been copied to your clipboard."
            onClose={dismiss}
          />
        </div>
      )}
    </>
  );
}

/* ─── Section ──────────────────────────────────────────────────────── */

export function InputSection() {
  return (
    <PageLayout
      category="Components"
      title="Input"
      description="Inputs let users enter and edit text in forms and dialogs. They come in four sizes for the default variant and a floating variant where the label lives inside the field."
      tocItems={toc}
    >
      {/* Usage Guidelines */}
      <Section id="input-usage" title="Usage Guidelines">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { heading: 'Use clear labels',    body: "Every field needs a label. Don't rely on placeholder text alone — it disappears when the user starts typing." },
            { heading: 'Match size to context', body: 'Use xs/sm for dense UIs like tables or toolbars. Use md for forms. Use lg or floating for prominent single-field layouts.' },
            { heading: 'Give immediate feedback', body: "Show validation on blur or submit. Always pair color change with a helper message — don't rely on color alone." },
          ].map(g => (
            <div key={g.heading} style={{ padding: 16, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: 13, color: '#14141E' }}>{g.heading}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 12, color: '#49494A', lineHeight: '1.6' }}>{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Sizes */}
      <Section id="input-sizes" title="Sizes">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Four sizes for the default text field — extra small (32px), small (38px), medium (42px), and large (48px).
        </p>
        <Card title="All sizes">
          <Input size="xs" label="Extra small (XS)" placeholder="32px height" />
          <Input size="sm" label="Small (SM)"        placeholder="38px height" />
          <Input size="md" label="Medium (MD)"       placeholder="42px height" />
          <Input size="lg" label="Large (LG)"        placeholder="48px height" />
        </Card>
      </Section>

      {/* Floating */}
      <Section id="input-floating" title="Floating">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          The floating variant is a single size (56px). When empty and unfocused the label sits centered as a large placeholder — click or type to animate it up to a small caption.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Default">
            <Input floating label="Email address" />
            <PasswordInput floating label="Password" />
          </Card>
          <Card title="With leading content">
            <Input floating label="Search" leadingContent={<Search size={18} />} />
            <Input floating label="Website" leadingContent={<span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, color: '#828282' }}>https://</span>} leadingDivider />
          </Card>
        </div>
      </Section>

      {/* States */}
      <Section id="input-states" title="States">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Inputs respond to hover and focus automatically. Error and disabled states are set explicitly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Interactive">
            <Input size="md" label="Default — hover or click to interact" placeholder="This is placeholder" />
            <Input size="md" label="With value" defaultValue="This is filled text" />
          </Card>
          <Card title="Static states">
            <Input size="md" label="Disabled" placeholder="Cannot be edited" disabled />
            <Input size="md" label="Error" defaultValue="invalid-value" error errorText="This field is required." />
          </Card>
        </div>
      </Section>

      {/* Leading & Trailing */}
      <Section id="input-addons" title="Leading & Trailing">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Use leading or trailing content to add icons, prefixes, or interactive selectors.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Icons">
            <Input size="md" label="Search"   placeholder="Search..."   leadingContent={<Search size={16} />} />
            <PasswordInput label="Password" />
          </Card>
          <Card title="Dropdown selectors">
            <PhoneSelectInput />
            <PriceSelectInput />
          </Card>
          <Card title="Required + secondary label">
            <Input size="md" label="Full name" required placeholder="Jane Doe" />
            <Input size="md" label="Bio" secondaryLabel="Optional" placeholder="Tell us about yourself" />
          </Card>
          <Card title="Trailing action">
            <ApiKeyInput />
            <Input size="lg" label="Large with icon" placeholder="Larger field" trailingContent={<Search size={18} />} />
          </Card>
        </div>
      </Section>

      {/* Helper & Validation */}
      <Section id="input-support" title="Helper & Validation">
        <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-family-body)', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Add a helper message below the field. Use <code>error</code> + <code>errorText</code> for validation. Use <code>showCharCount</code> + <code>maxLength</code> for character limits.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          <Card title="Helper text">
            <Input size="md" label="Username" placeholder="helix_user" helperText="Only letters, numbers and underscores." />
            <Input size="md" label="Email" placeholder="you@example.com" helperText="We'll never share your email." />
          </Card>
          <Card title="Error state">
            <Input size="md" label="Email" defaultValue="not-an-email" error errorText="Please enter a valid email address." />
            <PasswordInput label="Password" defaultValue="abc" error errorText="Password must be at least 8 characters." />
          </Card>
          <Card title="Character count">
            <Input size="md" label="Display name" placeholder="Your name…" showCharCount maxLength={30} />
            <Input size="lg" label="Short bio" placeholder="Tell us about yourself…" showCharCount maxLength={120} />
          </Card>
        </div>
      </Section>
    </PageLayout>
  );
}
