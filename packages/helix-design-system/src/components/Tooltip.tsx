import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  /** The text — for Simple, the only content; for Detailed, the body under the title */
  content: React.ReactNode;
  /** Figma Content=Detailed — a bold title above the body */
  title?: React.ReactNode;
  /** Figma Content=Two-Block — a grey additional block above the main one */
  additionalContent?: React.ReactNode;
  /** The element the tooltip describes (it receives hover and focus) */
  children: React.ReactElement;
  side?: TooltipSide;
  align?: TooltipAlign;
  /** Figma Arrow=None sets this to false */
  arrow?: boolean;
  delayDuration?: number;
  disabled?: boolean;
}

export const TooltipProvider = RadixTooltip.Provider;

const SHADOW = '0 1px 3px rgba(89,89,90,0.15), 0 1px 2px rgba(89,89,90,0.15)';
const text: React.CSSProperties = { fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)' };

/** A contextual popup that labels or explains an element on hover or focus. Use for short helper text (Simple) or a longer explanation (Two-Block, Detailed). Don't put interactive content in it. */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  title,
  additionalContent,
  children,
  side = 'top',
  align = 'center',
  arrow = true,
  delayDuration = 400,
  disabled = false,
}, ref) => {
  if (disabled) return children;
  const detailed = title !== undefined;

  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          ref={ref}
          className="helix-pop"
          side={side}
          align={align}
          sideOffset={arrow ? 4 : 8}
          style={{
            zIndex: 9999, maxWidth: detailed ? 228 : 320, borderRadius: 8, overflow: 'visible',
            backgroundColor: 'var(--color-container-primary, #FFFFFF)', boxShadow: SHADOW,
          }}
        >
          <div style={{ overflow: 'hidden', borderRadius: 8 }}>
            {additionalContent && (
              <div style={{ ...text, padding: '8px 12px', backgroundColor: 'var(--color-container-tertiary, #EEEEEE)' }}>{additionalContent}</div>
            )}
            {detailed ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 16 }}>
                <span style={{ ...text, fontWeight: 500 }}>{title}</span>
                <span style={text}>{content}</span>
              </div>
            ) : (
              <div style={{ ...text, padding: '8px 12px' }}>{content}</div>
            )}
          </div>
          {arrow && <RadixTooltip.Arrow width={10} height={6} style={{ fill: 'var(--color-container-primary, #FFFFFF)' }} />}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
});

Tooltip.displayName = 'Tooltip';
