import { forwardRef } from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'white';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
}

const SIZES: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

const COLORS: Record<SpinnerVariant, string> = {
  primary:   'var(--color-brand-primary, #F57E20)',
  secondary: 'var(--color-brand-secondary, #476142)',
  tertiary:  'var(--color-brand-tertiary, #089AAA)',
  neutral:   'var(--color-text-secondary, #828282)',
  white:     '#FFFFFF',
};

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(({
  size = 'md',
  variant = 'primary',
  style,
  ...props
}, ref) => {
  const px = SIZES[size];
  const color = COLORS[variant];
  const thickness = px <= 16 ? 1.5 : px <= 24 ? 2 : 2.5;

  return (
    <span
      ref={ref}
      role="status"
      aria-label="Loading"
      style={{
        display: 'inline-block',
        width: px,
        height: px,
        borderRadius: '50%',
        border: `${thickness}px solid ${color}`,
        borderTopColor: 'transparent',
        animation: 'spinner-spin 0.75s linear infinite',
        flexShrink: 0,
        ...style,
      }}
      {...props}
    />
  );
});

Spinner.displayName = 'Spinner';
