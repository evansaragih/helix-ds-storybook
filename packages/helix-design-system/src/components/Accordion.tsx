import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { forwardRef, useId } from 'react';

export type AccordionType = 'single' | 'multiple';

export interface AccordionItem {
  id: string;
  /** The trigger text */
  title: React.ReactNode;
  /** The panel content, shown on the footer band when open */
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** single = one panel open at a time; multiple = any number */
  type?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

const STROKE = 'var(--color-stroke-subtle, #EEEEEE)';
const TRACK = 'var(--color-container-secondary, #F7F7F7)';

/** A stack of expandable sections. Each item shows its title; opening it reveals the content beneath. Use to condense long, scannable content such as FAQs or settings groups. */
export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  items,
  type = 'single',
  defaultValue,
  value,
  onValueChange,
  className,
  style,
}, ref) => {
  const scope = `helix-accordion-${useId().replace(/:/g, '')}`;

  const css = `
    .${scope} [data-state="closed"][role="region"] { animation: helix-acc-up var(--motion-duration-base) var(--motion-easing-standard); }
    .${scope} [data-state="open"][role="region"] { animation: helix-acc-down var(--motion-duration-base) var(--motion-easing-standard); }
    @keyframes helix-acc-down { from { height: 0; opacity: 0 } to { height: var(--radix-accordion-content-height); opacity: 1 } }
    @keyframes helix-acc-up { from { height: var(--radix-accordion-content-height); opacity: 1 } to { height: 0; opacity: 0 } }
    .${scope} .helix-acc-item[data-state="closed"]:not([data-disabled]):hover { background-color: ${TRACK} !important; }
    .${scope} .helix-acc-trigger:focus-visible { outline: 2px solid var(--color-brand-primary, #F57E20); outline-offset: -2px; }
    .${scope} .helix-acc-trigger[data-state="open"] svg { transform: rotate(180deg); }
    /* Figma State=Expand: grey container, header on a white inset pill, content on the grey footer band */
    .${scope} .helix-acc-item[data-state="open"] { background-color: ${TRACK} !important; padding: 2px; }
    .${scope} .helix-acc-item[data-state="open"] .helix-acc-trigger { background-color: var(--color-container-primary, #FFFFFF) !important; border-radius: 10px !important; min-height: 38px !important; padding: 6px 12px !important; }
    @media (prefers-reduced-motion: reduce) { .${scope} [role="region"] { animation: none !important } }
  `;

  // Radix types `type` as a discriminated union; one branch per type keeps the value types honest.
  const common = { className: `${scope}${className ? ` ${className}` : ''}`, style: { display: 'flex', flexDirection: 'column' as const, gap: 8, ...style } };
  const children = items.map((item) => (
    <RadixAccordion.Item
      key={item.id}
      value={item.id}
      disabled={item.disabled}
      className="helix-acc-item"
      style={{ boxSizing: 'border-box', borderRadius: 12, border: `1px solid ${STROKE}`, backgroundColor: 'var(--color-container-primary, #FFFFFF)', overflow: 'hidden', opacity: item.disabled ? 0.5 : 1, transition: 'background-color var(--motion-duration-fast) var(--motion-easing-standard)' }}
    >
      <RadixAccordion.Header style={{ margin: 0 }}>
        <RadixAccordion.Trigger
          className="helix-acc-trigger"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, width: '100%', minHeight: 42, boxSizing: 'border-box', padding: '8px 12px',
            border: 'none', background: 'transparent', textAlign: 'left', cursor: item.disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, lineHeight: '19.2px', letterSpacing: '-0.01px', color: 'var(--color-text-primary, #14141E)',
          }}
        >
          <span>{item.title}</span>
          <ChevronDown size={16} style={{ flexShrink: 0, color: 'var(--color-text-secondary, #49494A)', transition: 'transform var(--motion-duration-base) var(--motion-easing-standard)' }} />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content style={{ overflow: 'hidden' }}>
        <div style={{ padding: '12px 10px 10px', fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>
          {item.content}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  ));

  return (
    <>
      <style>{css}</style>
      {type === 'multiple' ? (
        <RadixAccordion.Root
          ref={ref}
          type="multiple"
          defaultValue={Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : undefined}
          value={Array.isArray(value) ? value : value ? [value] : undefined}
          onValueChange={onValueChange}
          {...common}
        >{children}</RadixAccordion.Root>
      ) : (
        <RadixAccordion.Root
          ref={ref}
          type="single"
          collapsible
          defaultValue={Array.isArray(defaultValue) ? defaultValue[0] : defaultValue}
          value={Array.isArray(value) ? value[0] : value}
          onValueChange={onValueChange}
          {...common}
        >{children}</RadixAccordion.Root>
      )}
    </>
  );
});

Accordion.displayName = 'Accordion';
