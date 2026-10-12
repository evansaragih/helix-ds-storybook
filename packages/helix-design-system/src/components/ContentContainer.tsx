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
const WHITE = 'var(--color-container-primary, #FFFFFF)';
const SUBTLE = 'var(--color-container-secondary, #F7F7F7)';

/** Root background and border colour per Figma Intent (Surface only applies to the neutral intent). */
const INTENT: Record<ContentContainerIntent, { bg?: string; border: string }> = {
  neutral: { border: 'var(--color-stroke-subtle, #EEEEEE)' },
  destructive: { bg: 'var(--color-status-error-bg, #FEE2E2)', border: 'var(--primitive-red-70, #991B1B)' },
  brand: { bg: 'var(--color-status-brand-bg, #FEF2E9)', border: 'var(--color-brand-primary, #F57E20)' },
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
  const tone = INTENT[intent] ?? INTENT.neutral;
  const bg = tone.bg ?? (surface === 'gray' ? SUBTLE : WHITE);
  const floating = contentStyle === 'floating';
  const subtle = contentSurface === 'subtle';
  const splitHeader = header && headerDivider && divided;

  // Figma: floating bodies sit in a 2px inset with a fully rounded content card; a floating body
  // under a header divider and a flush subtle body are edge to edge with a hairline instead.
  const bodyInset = floating && !splitHeader ? 2 : 0;
  const contentBorder = floating ? (splitHeader && !subtle ? LINE : 'none') : subtle && header ? undefined : 'none';

  return (
    <div
      ref={ref}
      style={{
        display: 'flex', flexDirection: 'column', boxSizing: 'border-box', borderRadius: 12, overflow: 'hidden', backgroundColor: bg,
        border: border ? `1px solid ${tone.border}` : 'none', boxShadow: '0 1px 2px rgba(89,89,90,0.15)', ...style,
      }}
      {...props}
    >
      {header && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, padding: '12px 12px 8px', borderBottom: splitHeader ? LINE : 'none' }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: 24 }}>{header}</div>
        </div>
      )}
      {children !== undefined && (
        <div style={{ padding: bodyInset }}>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12, padding: 12, boxSizing: 'border-box', overflow: 'hidden',
            backgroundColor: subtle ? SUBTLE : WHITE,
            borderRadius: floating ? 12 : footer ? 0 : '0 0 12px 12px',
            ...(contentBorder !== undefined ? { border: contentBorder } : { borderTop: header ? LINE : 'none' }),
          }}>
            {children}
          </div>
        </div>
      )}
      {footer && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: floating ? 'flex-end' : 'flex-start', gap: floating ? 8 : 4, padding: 12, boxSizing: 'border-box',
          ...(!floating && divided ? { backgroundColor: SUBTLE, border: LINE } : {}),
        }}>
          <div style={{ flex: 1, minWidth: 0, minHeight: 24 }}>{footer}</div>
        </div>
      )}
    </div>
  );
});

ContentContainer.displayName = 'ContentContainer';
