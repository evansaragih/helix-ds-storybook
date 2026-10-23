import { forwardRef, useRef, useState } from 'react';
import { Checkbox } from './Checkbox';
import { RadioButton } from './RadioButton';

export type GroupItemControl = 'checkbox' | 'radio' | 'none';
export type GroupItemSize = 'sm' | 'md';
/** Figma Type — Standard (also Icon simple / Avatar when `leading` is set) · Icon card · Item Photo Card */
export type GroupItemType = 'standard' | 'icon-card' | 'photo-card';

export interface GroupItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  /** Which control the row selects with. Photo cards have none by default. */
  control?: GroupItemControl;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  title: React.ReactNode;
  /** Brand-coloured text at the end of the title row — a price, a file size */
  trailing?: React.ReactNode;
  description?: React.ReactNode;
  /** Standard: an IconTile (Icon simple) or Avatar placed before the text, which moves the control to the end. Icon card: the IconTile in the header. */
  leading?: React.ReactNode;
  /** Icon card: the content of the white card under the header */
  children?: React.ReactNode;
  /** Photo card: the picture, shown as a square above the text */
  image?: React.ReactNode;
  type?: GroupItemType;
  size?: GroupItemSize;
  /** Destructive ring, e.g. for a delete / remove choice */
  destructive?: boolean;
  disabled?: boolean;
  /** Radio only — the group's name and this row's value */
  name?: string;
  value?: string;
}

const NEUTRAL = 'rgba(89,89,90,0.15)';
const BRAND_A15 = 'rgba(245,126,32,0.15)';
const DESTRUCTIVE_A15 = 'rgba(220,38,38,0.15)';

/** A selectable row for a Checkbox or Radio group (form checklist, settings list, plan picker): a grey Content Container shell around a white card. Use ListItemCard for a generic menu or navigation row. */
export const GroupItem = forwardRef<HTMLDivElement, GroupItemProps>(({
  control,
  checked = false,
  onCheckedChange,
  title,
  trailing,
  description,
  leading,
  children,
  image,
  type = 'standard',
  size = 'md',
  destructive = false,
  disabled = false,
  name,
  value,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const sm = size === 'sm';
  const kind = control ?? (type === 'photo-card' ? 'none' : 'checkbox');

  // Figma State: Default / Hover / Focused / Destructive / Disabled — the shell keeps its shadow; Hover only turns the white card grey (see `card`); checked adds a brand edge
  const shadow = disabled ? `0 1px 2px ${NEUTRAL}`
    : destructive ? `0 0 0 3px ${DESTRUCTIVE_A15}`
    : focused ? `0 0 0 2px ${BRAND_A15}`
    : checked ? `0 1px 2px ${NEUTRAL}, inset 0 0 0 1px var(--color-brand-primary, #F57E20)`   // selected: brand edge (not in Figma yet)
    : `0 1px 2px ${NEUTRAL}`;

  const ctrl = kind === 'none' ? null : kind === 'checkbox' ? (
    <Checkbox size="md" checked={checked} disabled={disabled} invalid={destructive} onChange={(c) => onCheckedChange?.(c === true)} />
  ) : (
    <RadioButton size="md" name={name} value={value} checked={checked} disabled={disabled} invalid={destructive} onChange={(e) => onCheckedChange?.(e.target.checked)} />
  );

  const font = (px: number, line: string, weight: number, color: string, tracking = '-0.01px'): React.CSSProperties => ({
    margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: weight, fontSize: px, lineHeight: line, letterSpacing: tracking, color,
  });
  const titleStyle = sm ? font(13, '19.2px', 500, 'var(--color-text-primary, #14141E)', '-0.13px') : font(16, '24px', 500, 'var(--color-text-primary, #14141E)', '-0.16px');
  const bodyStyle = (color: string) => (sm ? font(13, '19.2px', 400, color) : font(16, '24px', 400, color));
  const brandText = sm ? font(13, '19.2px', 400, 'var(--color-brand-primary, #F57E20)') : font(16, '24px', 400, 'var(--color-brand-primary, #F57E20)');

  const text = (descColor: string) => (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: sm ? 2 : 4 }}>
      <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
        <p style={{ ...titleStyle, flex: 1, minWidth: 0 }}>{title}</p>
        {trailing && <p style={{ ...brandText, flexShrink: 0, whiteSpace: 'nowrap' }}>{trailing}</p>}
      </div>
      {description && <p style={bodyStyle(descColor)}>{description}</p>}
    </div>
  );

  const card = (inner: React.ReactNode, padding: React.CSSProperties['padding']) => (
    <div style={{ boxSizing: 'border-box', width: '100%', padding, borderRadius: 12, backgroundColor: hovered && !disabled ? 'var(--color-bg-hover, #EEEEEE)' : 'var(--color-container-primary, #FFFFFF)', transition: 'background-color var(--motion-duration-fast) var(--motion-easing-standard)' }}>{inner}</div>
  );

  let content: React.ReactNode;
  if (type === 'icon-card') {
    content = (
      <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px 8px' }}>
          {leading && <span style={{ display: 'flex', flexShrink: 0 }}>{leading}</span>}
          <p style={{ ...titleStyle, flex: 1, minWidth: 0 }}>{title}</p>
          {ctrl}
        </div>
        <div style={{ padding: 2 }}>{card(children, 16)}</div>
      </>
    );
  } else if (type === 'photo-card') {
    content = (
      <div style={{ padding: 2 }}>
        {card(
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ aspectRatio: '1 / 1', width: '100%', borderRadius: 5, overflow: 'hidden', backgroundColor: '#EFF0F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{image}</div>
            {ctrl ? <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>{ctrl}{text('#9F9F9F')}</div> : text('#9F9F9F')}
          </div>,
          16,
        )}
      </div>
    );
  } else {
    content = (
      <div style={{ padding: 2 }}>
        {card(
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {!leading && ctrl}
            {leading && <span style={{ display: 'flex', flexShrink: 0 }}>{leading}</span>}
            {text('var(--color-text-secondary, #49494A)')}
            {leading && ctrl}
          </div>,
          sm ? '12px 16px' : 16,
        )}
      </div>
    );
  }

  return (
    <div
      ref={(el) => { root.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }}
      onMouseEnter={(e) => { setHovered(true); onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); onMouseLeave?.(e); }}
      onFocus={(e) => { setFocused((e.target as HTMLElement).matches(':focus-visible')); onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); onBlur?.(e); }}
      // The control is its own label, so the rest of the card forwards clicks to it instead of nesting a second label
      onClick={(e) => {
        onClick?.(e);
        if (disabled || e.defaultPrevented) return;
        const t = e.target as HTMLElement;
        if (t.closest('label, input, button, a')) return;
        root.current?.querySelector<HTMLInputElement>('input')?.click();
      }}
      style={{
        display: 'block',
        boxSizing: 'border-box',
        overflow: 'hidden',
        borderRadius: 12,
        backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
        boxShadow: shadow,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : kind === 'none' ? 'default' : 'pointer',
        transition: 'box-shadow var(--motion-duration-fast) var(--motion-easing-standard)',
        ...style,
      }}
      {...props}
    >
      {content}
    </div>
  );
});

GroupItem.displayName = 'GroupItem';
