import { forwardRef } from 'react';

export type TextLinkVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'destructive';
export type TextLinkWeight = 'regular' | 'semibold';
export type TextLinkSize = 'sm' | 'md' | 'lg';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: TextLinkVariant;
  weight?: TextLinkWeight;
  size?: TextLinkSize;
  underline?: 'always' | 'hover' | 'none';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Render as a button instead of anchor */
  asButton?: boolean;
  onPress?: () => void;
}

const VARIANT_COLORS: Record<TextLinkVariant, { default: string; hover: string }> = {
  primary:     { default: 'var(--color-brand-primary, #F57E20)',    hover: 'var(--color-brand-primary-hover, #DF6505)' },
  secondary:   { default: 'var(--color-brand-secondary, #476142)',  hover: '#3E5639' },
  tertiary:    { default: 'var(--color-brand-tertiary, #089AAA)',   hover: '#077E8C' },
  neutral:     { default: 'var(--color-text-primary, #14141E)',     hover: '#49494A' },
  destructive: { default: 'var(--color-destructive, #DC2626)',      hover: '#B91C1C' },
};

const SIZES: Record<TextLinkSize, { fontSize: number; lineHeight: string; iconSize: number }> = {
  sm: { fontSize: 12, lineHeight: '18px',   iconSize: 14 },
  md: { fontSize: 14, lineHeight: '21px',   iconSize: 16 },
  lg: { fontSize: 16, lineHeight: '24px',   iconSize: 18 },
};

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(({
  variant = 'primary',
  weight = 'regular',
  size = 'md',
  underline = 'hover',
  leadingIcon,
  trailingIcon,
  asButton,
  onPress,
  children,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}, ref) => {
  const colors = VARIANT_COLORS[variant];
  const sz = SIZES[size];

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontFamily: 'var(--font-family-body)',
    fontWeight: weight === 'semibold' ? 500 : 400,
    fontSize: sz.fontSize,
    lineHeight: sz.lineHeight,
    letterSpacing: weight === 'semibold' ? '-0.13px' : '-0.01px',
    color: colors.default,
    textDecoration: underline === 'always' ? 'underline' : 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    outline: 'none',
    ...style,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = colors.hover;
    if (underline === 'hover') e.currentTarget.style.textDecoration = 'underline';
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = colors.default;
    if (underline === 'hover') e.currentTarget.style.textDecoration = 'none';
    onMouseLeave?.(e);
  };

  return (
    <a
      ref={ref}
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onPress ? (e) => { e.preventDefault(); onPress(); } : undefined}
      {...props}
    >
      {leadingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', width: sz.iconSize, height: sz.iconSize, flexShrink: 0 }}>
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon && (
        <span style={{ display: 'flex', alignItems: 'center', width: sz.iconSize, height: sz.iconSize, flexShrink: 0 }}>
          {trailingIcon}
        </span>
      )}
    </a>
  );
});

TextLink.displayName = 'TextLink';
