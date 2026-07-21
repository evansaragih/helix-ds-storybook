import * as RadixTooltip from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: TooltipSide;
  align?: TooltipAlign;
  sideOffset?: number;
  delayDuration?: number;
  /** Dark variant (default) or light */
  variant?: 'dark' | 'light';
  disabled?: boolean;
}

export const TooltipProvider = RadixTooltip.Provider;

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  content,
  children,
  side = 'top',
  align = 'center',
  sideOffset = 6,
  delayDuration = 400,
  variant = 'dark',
  disabled = false,
}, ref) => {
  if (disabled) return children;

  const isDark = variant === 'dark';

  return (
    <RadixTooltip.Root delayDuration={delayDuration}>
      <RadixTooltip.Trigger asChild>
        {children}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          ref={ref}
          side={side}
          align={align}
          sideOffset={sideOffset}
          style={{
            backgroundColor: isDark ? '#59595A' : '#FFFFFF',
            color: isDark ? '#FFFFFF' : 'var(--color-text-primary, #14141E)',
            border: isDark ? 'none' : '1px solid var(--color-stroke-subtle, #EEEEEE)',
            borderRadius: 'var(--radius-md, 6px)',
            padding: '6px 10px',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '19.2px',
            letterSpacing: '-0.01px',
            boxShadow: isDark ? 'none' : 'var(--shadow-sm)',
            maxWidth: 240,
            zIndex: 9999,
            animationDuration: '0.15s',
          }}
        >
          {content}
          <RadixTooltip.Arrow
            style={{
              fill: isDark ? '#59595A' : '#FFFFFF',
            }}
          />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
});

Tooltip.displayName = 'Tooltip';
