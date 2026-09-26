import { forwardRef } from 'react';
import { Logo, type LogoVariant, type LogoTone } from './Logo';
import { ProgressBar } from './ProgressBar';

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value: number;
  max?: number;
  logoVariant?: LogoVariant;
  logoTone?: LogoTone;
  width?: number;
}

/**
 * Card shown while a page or view is fetching data — brand logo over a
 * determinate progress bar. Update `value` as the load progresses.
 */
export const PageLoader = forwardRef<HTMLDivElement, PageLoaderProps>(({
  value,
  max = 100,
  logoVariant = 'wordmark',
  logoTone = 'default',
  width = 220,
  style,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        width,
        padding: 12,
        boxSizing: 'border-box',
        borderRadius: 'var(--radius-xl, 12px)',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.04), 0px 1px 2px rgba(0, 0, 0, 0.08)',
        ...style,
      }}
      {...props}
    >
      <Logo variant={logoVariant} tone={logoTone} height={26} />
      <ProgressBar value={value} max={max} labelType="none" height={8} style={{ width: '100%' }} />
    </div>
  );
});

PageLoader.displayName = 'PageLoader';
