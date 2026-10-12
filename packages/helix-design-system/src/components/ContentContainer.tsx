import { forwardRef } from 'react';

/** Figma Surface */
export type ContentContainerSurface = 'white' | 'gray';
/** Figma Intent — tints the container for destructive / brand callouts */
export type ContentContainerIntent = 'neutral' | 'destructive' | 'brand';
/** Figma Content Style — flush runs the body to the header and footer edges; floating rounds it fully */
export type ContentContainerStyle = 'flush' | 'floating';
/** Figma Content Surface — subtle is a grey inset with a border; default is white */
export type ContentContainerContentSurface = 'subtle' | 'default';

export interface ContentContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Header slot (Figma Header Content Slot). Omit to hide the header. */
  header?: React.ReactNode;
  /** Footer slot (Figma Footer Content). Omit to hide the footer. */
  footer?: React.ReactNode;
  /** Body content (Figma Container Content) */
  children?: React.ReactNode;
  surface?: ContentContainerSurface;
  intent?: ContentContainerIntent;
  contentStyle?: ContentContainerStyle;
  contentSurface?: ContentContainerContentSurface;
  /** Show the divider under the header (Figma Header Divider) */
  headerDivider?: boolean;
  /** Draw dividers between header, body and footer (Figma Section Split=Divided). Default true. */
  divided?: boolean;
  /** Outer border (Figma Border). Default true. */
  border?: boolean;
}

const LINE = '1px solid var(--color-stroke-subtle, #EEEEEE)';
const INTENT_BG: Record<ContentContainerIntent, string | undefined> = {
  neutral: undefined,
  destructive: 'var(--color-status-error-bg, #FEE2E2)',
  brand: 'var(--color-status-brand-bg, #FEF2E9)',
};

/** The shared shell behind Dialog, Sheet and dashboard section cards, built from Header, Body and Footer slots. Use it to give arbitrary content a consistent surface, border and padding. */
export const ContentContainer = forwardRef<HTMLDivElement, ContentContainerProps>(({
  header,
  footer,
  children,
  surface = 'white',
  intent = 'neutral',
  contentStyle = 'flush',
  contentSurface = 'subtle',
  headerDivider = true,
  divided = true,
  border = true,
  style,
  ...props
}, ref) => {
  const bg = INTENT_BG[intent] ?? (surface === 'gray' ? 'var(--color-container-secondary, #F7F7F7)' : 'var(--color-container-primary, #FFFFFF)');
  const floating = contentStyle === 'floating';
  const top = !floating && header ? 0 : 10;
  const bottom = !floating && footer ? 0 : 10;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box', borderRadius: 12, overflow: 'hidden', backgroundColor: bg,
        border: border ? LINE : 'none', boxShadow: '0 1px 2px rgba(89,89,90,0.15)', ...style,
      }}
      {...props}
    >
      {header && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 12px 8px', borderBottom: headerDivider && divided ? LINE : 'none' }}>
          <div style={{ flex: 1, minWidth: 0 }}>{header}</div>
        </div>
      )}
      {children !== undefined && (
        <div style={{ padding: 2 }}>
          <div style={{
            padding: 12, boxSizing: 'border-box', borderRadius: `${top}px ${top}px ${bottom}px ${bottom}px`,
            backgroundColor: contentSurface === 'subtle' ? 'var(--color-container-secondary, #F7F7F7)' : 'var(--color-container-primary, #FFFFFF)',
            border: contentSurface === 'subtle' ? LINE : 'none',
          }}>
            {children}
          </div>
        </div>
      )}
      {footer && <div style={{ padding: 12, borderTop: divided ? LINE : 'none' }}>{footer}</div>}
    </div>
  );
});

ContentContainer.displayName = 'ContentContainer';
