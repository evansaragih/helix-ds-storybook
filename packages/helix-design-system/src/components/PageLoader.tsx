import { forwardRef } from 'react';
import { Logo } from './Logo';
import { ProgressBar } from './ProgressBar';

/** Figma Brand — sets the logo and the progress color */
export type PageLoaderBrand = 'nusantics' | 'cekolam' | 'causa';

export interface PageLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress 0–100 */
  value: number;
  brand?: PageLoaderBrand;
  /** Card width in px (Figma is 155) */
  width?: number;
}

/** A branded loading card: the logo over a determinate progress bar. Use for a full-page initial load; for a small inline wait use Spinner. */
export const PageLoader = forwardRef<HTMLDivElement, PageLoaderProps>(({
  value,
  brand,
  width = 155,
  style,
  ...props
}, ref) => (
  <div
    ref={ref}
    data-brand={brand}
    style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'stretch', gap: 8, width, padding: 12, boxSizing: 'border-box', borderRadius: 12,
      backgroundColor: 'var(--color-container-primary, #FFFFFF)', boxShadow: '0px 1px 1px rgba(0,0,0,0.04), 0px 1px 2px rgba(0,0,0,0.08)', ...style,
    }}
    {...props}
  >
    <div style={{ display: 'flex', alignItems: 'center', height: 26 }}><Logo variant="wordmark" height={16} brand={brand} /></div>
    <ProgressBar value={value} />
  </div>
));

PageLoader.displayName = 'PageLoader';
