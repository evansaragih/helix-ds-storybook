import { useState } from 'react';
import { PageLayout, Section } from './PageLayout';

type Brand = 'Helix' | 'CeKolam' | 'Causa';

const toc = [
  { id: 'usage-guidelines', label: 'Usage Guidelines' },
  { id: 'button-variants', label: 'Button Variants' },
  { id: 'button-styles', label: 'Button Styles' },
  { id: 'button-sizes', label: 'Button Sizes' },
  { id: 'button-states', label: 'Button States' },
];

const brandTokens: Record<Brand, {
  primary: string; primaryHover: string; primaryPressed: string;
  secondary: string; secondaryHover: string; secondaryPressed: string;
  tertiary: string; tertiaryHover: string; tertiaryPressed: string;
}> = {
  Helix: {
    primary: '#F57E20', primaryHover: '#DF6505', primaryPressed: '#B35001',
    secondary: '#58595B', secondaryHover: '#48494B', secondaryPressed: '#393A3B',
    tertiary: '#476142', tertiaryHover: '#3E5639', tertiaryPressed: '#2E402A',
  },
  CeKolam: {
    primary: '#EB7323', primaryHover: '#D4611A', primaryPressed: '#A84E14',
    secondary: '#089AAA', secondaryHover: '#077E8C', secondaryPressed: '#056570',
    tertiary: '#2B485E', tertiaryHover: '#243E50', tertiaryPressed: '#1A2E3C',
  },
  Causa: {
    primary: '#F57E20', primaryHover: '#DF6505', primaryPressed: '#B35001',
    secondary: '#434F6A', secondaryHover: '#38435A', secondaryPressed: '#2C3649',
    tertiary: '#A4B8C4', tertiaryHover: '#8C9EAC', tertiaryPressed: '#6E8290',
  },
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// 3-layer structure matching Figma exactly:
//   Layer 1 (outer)   — border + drop-shadow (no background fill)
//   Layer 2 (abs bg)  — absolute fill with the background color
//   Layer 3 (content) — padding + optional inner border rgba(255,255,255,0.2)
//   Layer 4 (overlay) — absolute inset:-1px carrying inset box-shadow (Primary/Secondary/Tertiary only)
function DocButton({
  bg, borderColor, text, dropShadow, innerShadow, focusRing,
  hasInnerBorder = false, label, disabled = false, darkBg = false,
}: {
  bg: string;
  borderColor: string;
  text: string;
  dropShadow?: string;
  innerShadow?: string;
  focusRing?: string;
  hasInnerBorder?: boolean;
  label: string;
  disabled?: boolean;
  darkBg?: boolean;
}) {
  const outerShadow = focusRing ? `0 0 0 3px ${focusRing}` : dropShadow;

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        display: 'inline-flex',
        position: 'relative',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        boxShadow: outerShadow,
        marginBottom: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}>
        {/* Absolute background fill */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: bg,
          borderRadius: '7px',
        }} aria-hidden="true" />
        {/* Content layer */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '36px',
          padding: '8px 11px',
          borderRadius: '7px',
          border: hasInnerBorder ? '1px solid rgba(255,255,255,0.2)' : 'none',
        }}>
          <span style={{
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '19.2px',
            color: text,
            letterSpacing: '-0.01px',
            whiteSpace: 'nowrap',
          }}>
            Button
          </span>
        </div>
        {/* Inner shadow overlay (Primary/Secondary/Tertiary only) */}
        {innerShadow && (
          <div style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '8px',
            zIndex: 2,
            pointerEvents: 'none',
            boxShadow: innerShadow,
          }} aria-hidden="true" />
        )}
      </div>
      <span style={{
        display: 'block',
        fontFamily: 'var(--font-family-body)',
        fontSize: '11px',
        color: darkBg ? 'rgba(255,255,255,0.5)' : '#828282',
      }}>
        {label}
      </span>
    </div>
  );
}

type VariantState = {
  label: string;
  bg: string;
  borderColor: string;
  text: string;
  dropShadow?: string;
  innerShadow?: string;
  focusRing?: string;
  hasInnerBorder?: boolean;
  disabled?: boolean;
};

function VariantCard({ name, description, states, darkBg }: {
  name: string;
  description: string;
  states: VariantState[];
  darkBg?: boolean;
}) {
  return (
    <div style={{ padding: '20px 24px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee', marginBottom: '12px' }}>
      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '16px', color: '#14141e' }}>{name}</p>
        <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '13px', color: '#828282' }}>{description}</p>
      </div>
      <div style={{
        display: 'flex', gap: '24px', padding: '20px',
        backgroundColor: darkBg ? '#14141E' : 'white',
        borderRadius: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'flex-end',
      }}>
        {states.map((s) => (
          <DocButton
            key={s.label}
            bg={s.bg}
            borderColor={s.borderColor}
            text={s.text}
            dropShadow={s.dropShadow}
            innerShadow={s.innerShadow}
            focusRing={s.focusRing}
            hasInnerBorder={s.hasInnerBorder}
            label={s.label}
            disabled={s.disabled}
            darkBg={darkBg}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {states.map((s) => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', backgroundColor: 'white', borderRadius: '6px' }}>
            <div style={{
              width: '28px', height: '28px',
              backgroundColor: s.bg,
              borderRadius: '4px',
              border: `1px solid ${s.borderColor}`,
              flexShrink: 0,
            }} />
            <div>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '12px', fontWeight: 500, color: '#14141e' }}>{s.label}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282' }}>{s.bg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandSelector({ brand, onChange }: { brand: Brand; onChange: (b: Brand) => void }) {
  return (
    <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#EEEEEE', borderRadius: '8px', width: 'fit-content', marginBottom: '24px' }}>
      {(['Helix', 'CeKolam', 'Causa'] as Brand[]).map((b) => (
        <button
          key={b}
          onClick={() => onChange(b)}
          style={{
            padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: '13px',
            backgroundColor: brand === b ? '#FFFFFF' : 'transparent',
            color: brand === b ? '#14141E' : '#828282',
            boxShadow: brand === b ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s',
          }}
        >
          {b}
        </button>
      ))}
    </div>
  );
}

export function ButtonSection() {
  const [brand, setBrand] = useState<Brand>('Helix');
  const c = brandTokens[brand];

  const solidVariants = [
    {
      name: 'Primary',
      description: 'Main call-to-action. Use for the single most important action on a surface.',
      states: [
        { label: 'Default', bg: c.primary, borderColor: c.primary, text: '#FFFFFF', hasInnerBorder: true, dropShadow: `0px 0.5px 4px 0px ${c.primary}`, innerShadow: `inset 0px -5px 4px 0px ${c.primary}` },
        { label: 'Hover', bg: c.primaryHover, borderColor: c.primary, text: '#FFFFFF', hasInnerBorder: true, dropShadow: `0px 0.5px 4px 0px ${c.primary}`, innerShadow: `inset 0px -5px 4px 0px ${c.primaryPressed}` },
        { label: 'Focus', bg: c.primary, borderColor: c.primary, text: '#FFFFFF', hasInnerBorder: true, focusRing: hexToRgba(c.primary, 0.7), innerShadow: `inset 0px -5px 4px 0px ${c.primary}` },
        { label: 'Disabled', bg: '#D7D7D7', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Secondary',
      description: 'Secondary actions. Use alongside Primary for supporting actions.',
      states: [
        { label: 'Default', bg: c.secondary, borderColor: c.secondary, text: '#FFFFFF', hasInnerBorder: true, dropShadow: `0px 0.5px 4px 0px ${c.secondary}`, innerShadow: `inset 0px -5px 4px 0px ${c.secondary}` },
        { label: 'Hover', bg: c.secondaryHover, borderColor: c.secondary, text: '#FFFFFF', hasInnerBorder: true, dropShadow: `0px 0.5px 4px 0px ${c.secondary}`, innerShadow: `inset 0px -5px 4px 0px ${c.secondaryPressed}` },
        { label: 'Focus', bg: c.secondary, borderColor: c.secondary, text: '#FFFFFF', hasInnerBorder: true, focusRing: hexToRgba(c.secondary, 0.7), innerShadow: `inset 0px -5px 4px 0px ${c.secondary}` },
        { label: 'Disabled', bg: '#D7D7D7', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Tertiary',
      description: 'Tertiary actions with brand accent for supplementary or contextual actions.',
      states: [
        { label: 'Default', bg: c.tertiary, borderColor: c.tertiary, text: '#FFFFFF', hasInnerBorder: true, dropShadow: `0px 0.5px 4px 0px ${c.tertiary}`, innerShadow: `inset 0px -5px 4px 0px ${c.tertiary}` },
        { label: 'Hover', bg: c.tertiaryHover, borderColor: c.tertiary, text: '#FFFFFF', hasInnerBorder: true, dropShadow: `0px 0.5px 4px 0px ${c.tertiary}`, innerShadow: `inset 0px -5px 4px 0px ${c.tertiaryPressed}` },
        { label: 'Focus', bg: c.tertiary, borderColor: c.tertiary, text: '#FFFFFF', hasInnerBorder: true, focusRing: hexToRgba(c.tertiary, 0.7), innerShadow: `inset 0px -5px 4px 0px ${c.tertiary}` },
        { label: 'Disabled', bg: '#D7D7D7', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Destructive',
      description: 'Destructive or irreversible actions — delete, remove, or permanently alter.',
      states: [
        { label: 'Default', bg: '#DC2626', borderColor: '#DC2626', text: '#FFFFFF', hasInnerBorder: true },
        { label: 'Hover', bg: '#B91C1C', borderColor: '#DC2626', text: '#FFFFFF', hasInnerBorder: true },
        { label: 'Focus', bg: '#DC2626', borderColor: '#DC2626', text: '#FFFFFF', hasInnerBorder: true, focusRing: hexToRgba('#DC2626', 0.7) },
        { label: 'Disabled', bg: '#D7D7D7', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Neutral',
      description: 'Low-emphasis actions on light backgrounds. Minimal visual weight.',
      states: [
        { label: 'Default', bg: '#F7F7F7', borderColor: '#D7D7D7', text: '#49494A' },
        { label: 'Hover', bg: '#EEEEEE', borderColor: '#D7D7D7', text: '#49494A' },
        { label: 'Focus', bg: '#F7F7F7', borderColor: '#D7D7D7', text: '#49494A', focusRing: '#D7D7D7' },
        { label: 'Disabled', bg: '#D7D7D7', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Invert',
      description: 'For use on dark or colored backgrounds where standard buttons lack contrast.',
      darkBg: true,
      states: [
        { label: 'Default', bg: '#59595A', borderColor: '#3A3A3B', text: '#FFFFFF', hasInnerBorder: true },
        { label: 'Hover', bg: '#49494A', borderColor: '#3A3A3B', text: '#FFFFFF', hasInnerBorder: true },
        { label: 'Focus', bg: '#59595A', borderColor: '#3A3A3B', text: '#FFFFFF', hasInnerBorder: true, focusRing: '#D7D7D7' },
        { label: 'Disabled', bg: '#D7D7D7', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
  ];

  const ghostVariants = [
    {
      name: 'Ghost — Neutral',
      description: 'No border or fill. Use for the least prominent actions or inline navigation.',
      states: [
        { label: 'Default', bg: 'transparent', borderColor: 'transparent', text: '#14141E' },
        { label: 'Hover', bg: '#F7F7F7', borderColor: '#EEEEEE', text: '#14141E' },
        { label: 'Focus', bg: '#EEEEEE', borderColor: '#D7D7D7', text: '#14141E', focusRing: '#D7D7D7' },
        { label: 'Disabled', bg: 'transparent', borderColor: 'transparent', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Ghost — Primary Brand',
      description: 'Ghost with brand primary text. Use for inline brand actions with no visual weight.',
      states: [
        { label: 'Default', bg: 'transparent', borderColor: 'transparent', text: c.primary },
        { label: 'Hover', bg: hexToRgba(c.primary, 0.08), borderColor: 'transparent', text: c.primary },
        { label: 'Focus', bg: hexToRgba(c.primary, 0.16), borderColor: 'transparent', text: c.primaryPressed, focusRing: hexToRgba(c.primary, 0.7) },
        { label: 'Disabled', bg: 'transparent', borderColor: 'transparent', text: '#9F9F9F', disabled: true },
      ],
    },
  ];

  const outlineVariants = [
    {
      name: 'Primary Outline',
      description: 'Outlined variant of Primary — lower visual weight than Solid.',
      states: [
        { label: 'Default', bg: 'transparent', borderColor: c.primary, text: c.primary },
        { label: 'Hover', bg: hexToRgba(c.primary, 0.08), borderColor: c.primary, text: c.primary },
        { label: 'Focus', bg: hexToRgba(c.primary, 0.16), borderColor: c.primaryPressed, text: c.primaryPressed, focusRing: hexToRgba(c.primary, 0.7) },
        { label: 'Disabled', bg: 'transparent', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Secondary Outline',
      description: 'Outlined variant of Secondary for lower visual weight.',
      states: [
        { label: 'Default', bg: 'transparent', borderColor: c.secondary, text: c.secondary },
        { label: 'Hover', bg: hexToRgba(c.secondary, 0.08), borderColor: c.secondary, text: c.secondary },
        { label: 'Focus', bg: hexToRgba(c.secondary, 0.16), borderColor: c.secondaryPressed, text: c.secondaryPressed, focusRing: hexToRgba(c.secondary, 0.7) },
        { label: 'Disabled', bg: 'transparent', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
    {
      name: 'Tertiary Outline',
      description: 'Outlined variant of Tertiary for lower visual weight.',
      states: [
        { label: 'Default', bg: 'transparent', borderColor: c.tertiary, text: c.tertiary },
        { label: 'Hover', bg: hexToRgba(c.tertiary, 0.08), borderColor: c.tertiary, text: c.tertiary },
        { label: 'Focus', bg: hexToRgba(c.tertiary, 0.16), borderColor: c.tertiaryPressed, text: c.tertiaryPressed, focusRing: hexToRgba(c.tertiary, 0.7) },
        { label: 'Disabled', bg: 'transparent', borderColor: '#D7D7D7', text: '#9F9F9F', disabled: true },
      ],
    },
  ];

  const sizes: { label: string; height: string; px: string; py: string; fontSize: string; lineHeight: string; usage: string }[] = [
    { label: 'Extra Small', height: '24px', px: '6px', py: '4px', fontSize: '11px', lineHeight: '15.6px', usage: 'Compact rows, tags, badges' },
    { label: 'Small', height: '36px', px: '11px', py: '8px', fontSize: '13px', lineHeight: '19.2px', usage: 'Table actions, dense toolbars' },
    { label: 'Medium', height: '52px', px: '16px', py: '12px', fontSize: '16px', lineHeight: '24px', usage: 'Forms, cards, default dialogs' },
    { label: 'Large', height: '64px', px: '20px', py: '12px', fontSize: '20px', lineHeight: '30px', usage: 'Hero sections, full-width CTAs' },
  ];

  return (
    <PageLayout
      category="Components"
      title="Button"
      description="Buttons allow users to take actions and make choices. Brand-aware variants (Primary, Secondary, Tertiary) update color per brand mode."
      tocItems={toc}
    >
      <Section id="usage-guidelines" title="Usage Guidelines">
        <div style={{ padding: '20px 24px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
          <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#49494a', lineHeight: '1.8' }}>
            <li style={{ marginBottom: '8px' }}>Use <strong>Primary</strong> for the single most important action — one per view</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>Secondary</strong> alongside Primary for supporting actions (e.g. "Save" + "Cancel")</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>Tertiary</strong> for supplementary actions that carry brand context</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>Destructive</strong> only for irreversible actions like delete or remove</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>Outline</strong> variants when a filled button is too visually heavy</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>Ghost</strong> for the least prominent actions — inline or tertiary navigation</li>
            <li style={{ marginBottom: '8px' }}>Use <strong>Invert</strong> on dark or colored backgrounds</li>
            <li>Primary, Secondary, and Tertiary colors change based on the active brand (Helix, CeKolam, Causa)</li>
          </ul>
        </div>
      </Section>

      <Section id="button-variants" title="Button Variants">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Each variant shows Default, Hover, Focus (focus ring), and Disabled states. Primary, Secondary, and Tertiary include drop-shadow and inner shadow per Figma effect styles.
        </p>
        <BrandSelector brand={brand} onChange={setBrand} />

        <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '12px', color: '#828282', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Solid</p>
        {solidVariants.map((v) => (
          <VariantCard key={v.name} name={v.name} description={v.description} states={v.states} darkBg={v.darkBg} />
        ))}

        <p style={{ margin: '16px 0 12px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '12px', color: '#828282', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Ghost</p>
        {ghostVariants.map((v) => (
          <VariantCard key={v.name} name={v.name} description={v.description} states={v.states} />
        ))}
      </Section>

      <Section id="button-styles" title="Button Styles">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Primary, Secondary, and Tertiary are available in Solid and Outline. Outline uses a transparent background with a colored border — no inner highlight border.
        </p>
        <BrandSelector brand={brand} onChange={setBrand} />
        {outlineVariants.map((v) => (
          <VariantCard key={v.name} name={v.name} description={v.description} states={v.states} />
        ))}
        <div style={{ padding: '16px 20px', backgroundColor: '#EBF2FE', borderRadius: '8px', border: '1px solid #3B82F6', marginTop: '16px' }}>
          <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '13px', color: '#014CC5' }}>Solid vs Outline</p>
          <ul style={{ margin: 0, paddingLeft: '20px', fontFamily: 'var(--font-family-body)', fontSize: '13px', color: '#49494a', lineHeight: '1.8' }}>
            <li>Solid: higher visual prominence, best for primary CTAs</li>
            <li>Outline: lower visual weight, best in toolbars or alongside a Solid primary button</li>
          </ul>
        </div>
      </Section>

      <Section id="button-sizes" title="Button Sizes">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Four sizes defined by Figma height tokens. Heights: 24 / 36 / 52 / 64px.
        </p>
        <BrandSelector brand={brand} onChange={setBrand} />

        <div style={{ display: 'flex', gap: '20px', padding: '24px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '16px' }}>
          {sizes.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-flex',
                position: 'relative',
                border: `1px solid ${c.primary}`,
                borderRadius: '8px',
                boxShadow: `0px 0.5px 4px 0px ${c.primary}`,
                marginBottom: '8px',
              }}>
                <div style={{ position: 'absolute', inset: 0, backgroundColor: c.primary, borderRadius: '7px' }} aria-hidden="true" />
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: s.height,
                  padding: `${s.py} ${s.px}`,
                  borderRadius: '7px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  overflow: 'hidden',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-family-body)', fontWeight: 400,
                    fontSize: s.fontSize, lineHeight: s.lineHeight,
                    color: '#FFFFFF', letterSpacing: '-0.01px', whiteSpace: 'nowrap',
                  }}>Button</span>
                </div>
                <div style={{
                  position: 'absolute', inset: '-1px', borderRadius: '8px',
                  zIndex: 2, pointerEvents: 'none',
                  boxShadow: `inset 0px -5px 4px 0px ${c.primary}`,
                }} aria-hidden="true" />
              </div>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '12px', fontWeight: 600, color: '#14141e' }}>{s.label}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282' }}>h={s.height} · {s.fontSize}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {sizes.map((s) => (
            <div key={s.label} style={{ padding: '14px 16px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '13px', color: '#14141e' }}>{s.label}</p>
              <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282' }}>Height: {s.height}</p>
              <p style={{ margin: '0 0 2px', fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282' }}>Padding: {s.py} {s.px}</p>
              <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282' }}>Font: {s.fontSize}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#9f9f9f' }}>{s.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="button-states" title="Button States">
        <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-family-body)', fontSize: '14px', color: '#828282', lineHeight: '1.6' }}>
          Focus rings are implemented as <code style={{ fontFamily: 'monospace', fontSize: '12px', backgroundColor: '#f7f7f7', padding: '1px 5px', borderRadius: '4px' }}>box-shadow: 0 0 0 3px rgba(color, 0.7)</code> — matching the Figma <strong>Ring Default</strong> effect. Primary, Secondary, and Tertiary also carry a drop-shadow and inset shadow from Figma effect styles.
        </p>
        <BrandSelector brand={brand} onChange={setBrand} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'Primary', default: c.primary, hover: c.primaryHover, pressed: c.primaryPressed, ring: hexToRgba(c.primary, 0.7), hasShadow: true, textColor: '#FFFFFF' as const },
            { name: 'Secondary', default: c.secondary, hover: c.secondaryHover, pressed: c.secondaryPressed, ring: hexToRgba(c.secondary, 0.7), hasShadow: true, textColor: '#FFFFFF' as const },
            { name: 'Tertiary', default: c.tertiary, hover: c.tertiaryHover, pressed: c.tertiaryPressed, ring: hexToRgba(c.tertiary, 0.7), hasShadow: true, textColor: '#FFFFFF' as const },
            { name: 'Destructive', default: '#DC2626', hover: '#B91C1C', pressed: '#991B1B', ring: hexToRgba('#DC2626', 0.7), hasShadow: false, textColor: '#FFFFFF' as const },
            { name: 'Neutral', default: '#F7F7F7', hover: '#EEEEEE', pressed: '#D7D7D7', ring: '#D7D7D7', hasShadow: false, textColor: '#49494A' as const },
          ].map((v) => (
            <div key={v.name} style={{ padding: '16px 20px', backgroundColor: '#f7f7f7', borderRadius: '8px', border: '1px solid #eee' }}>
              <p style={{ margin: '0 0 14px', fontFamily: 'var(--font-family-body)', fontWeight: 600, fontSize: '13px', color: '#14141e' }}>{v.name}</p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <DocButton
                  label="Default"
                  bg={v.default}
                  borderColor={v.default}
                  text={v.textColor}
                  hasInnerBorder={v.hasShadow || v.name === 'Destructive'}
                  dropShadow={v.hasShadow ? `0px 0.5px 4px 0px ${v.default}` : undefined}
                  innerShadow={v.hasShadow ? `inset 0px -5px 4px 0px ${v.default}` : undefined}
                />
                <DocButton
                  label="Hover"
                  bg={v.hover}
                  borderColor={v.default}
                  text={v.textColor}
                  hasInnerBorder={v.hasShadow || v.name === 'Destructive'}
                  dropShadow={v.hasShadow ? `0px 0.5px 4px 0px ${v.default}` : undefined}
                  innerShadow={v.hasShadow ? `inset 0px -5px 4px 0px ${v.pressed}` : undefined}
                />
                <DocButton
                  label="Focus"
                  bg={v.default}
                  borderColor={v.default}
                  text={v.textColor}
                  hasInnerBorder={v.hasShadow || v.name === 'Destructive'}
                  focusRing={v.ring}
                  innerShadow={v.hasShadow ? `inset 0px -5px 4px 0px ${v.default}` : undefined}
                />
                <DocButton
                  label="Disabled"
                  bg="#D7D7D7"
                  borderColor="#D7D7D7"
                  text="#9F9F9F"
                  disabled
                />
                <div style={{ marginLeft: 'auto', padding: '8px 12px', backgroundColor: 'white', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: v.default, boxShadow: `0 0 0 3px ${v.ring}` }} />
                  <div>
                    <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: '11px', fontWeight: 500, color: '#14141e' }}>Ring Default/{v.name}</p>
                    <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '10px', color: '#828282' }}>{v.ring}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
