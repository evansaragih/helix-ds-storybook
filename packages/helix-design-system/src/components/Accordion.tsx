import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { forwardRef } from 'react';

export type AccordionType = 'single' | 'multiple';
export type AccordionStyle = 'default' | 'border' | 'card';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: AccordionType;
  accordionStyle?: AccordionStyle;
  defaultValue?: string | string[];
  className?: string;
  style?: React.CSSProperties;
}

const STYLE_CONFIGS = {
  default: {
    container: {},
    item: {
      borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
    },
    trigger: {
      backgroundColor: 'transparent',
    },
  },
  border: {
    container: {
      border: '1px solid var(--color-stroke-default, #D7D7D7)',
      borderRadius: 'var(--radius-lg, 8px)',
      overflow: 'hidden',
    },
    item: {
      borderBottom: '1px solid var(--color-stroke-default, #D7D7D7)',
    },
    trigger: {
      backgroundColor: 'transparent',
    },
  },
  card: {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: 8,
    },
    item: {
      border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
      borderRadius: 'var(--radius-lg, 8px)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    },
    trigger: {
      backgroundColor: 'var(--color-container-primary, #FFFFFF)',
    },
  },
};

function AccordionItemComponent({
  item,
  accordionStyle,
}: {
  item: AccordionItem;
  accordionStyle: AccordionStyle;
}) {
  const cfg = STYLE_CONFIGS[accordionStyle];
  return (
    <RadixAccordion.Item
      value={item.id}
      disabled={item.disabled}
      style={cfg.item}
    >
      <RadixAccordion.Header asChild>
        <RadixAccordion.Trigger
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '14px 16px',
            border: 'none',
            cursor: item.disabled ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '19.2px',
            color: item.disabled
              ? 'var(--color-text-muted, #9F9F9F)'
              : 'var(--color-text-primary, #14141E)',
            letterSpacing: '-0.01px',
            gap: 8,
            textAlign: 'left',
            outline: 'none',
            ...cfg.trigger,
          }}
        >
          <span style={{ flex: 1 }}>{item.title}</span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 20,
              height: 20,
              flexShrink: 0,
              color: item.disabled
                ? 'var(--color-text-muted, #9F9F9F)'
                : 'var(--color-text-tertiary, #828282)',
              // Radix data-state drives rotation via the CSS below
            }}
          >
            <ChevronDown
              size={16}
              strokeWidth={2}
              style={{ transition: 'transform 0.2s ease' }}
            />
          </span>
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
      <RadixAccordion.Content
        style={{
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '0 16px 16px',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: '19.2px',
            color: 'var(--color-text-secondary, #49494A)',
            letterSpacing: '-0.01px',
          }}
        >
          {item.content}
        </div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  items,
  type = 'single',
  accordionStyle = 'default',
  defaultValue,
  className,
  style,
}, ref) => {
  const cfg = STYLE_CONFIGS[accordionStyle];

  const sharedProps = {
    defaultValue: defaultValue as string | undefined,
    collapsible: type === 'single' ? (true as const) : undefined,
    style: { ...cfg.container, ...style } as React.CSSProperties,
    className,
  };

  if (type === 'multiple') {
    return (
      <RadixAccordion.Root
        ref={ref as React.Ref<HTMLDivElement>}
        type="multiple"
        defaultValue={Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : undefined}
        style={{ ...cfg.container, ...style } as React.CSSProperties}
        className={className}
      >
        {items.map((item) => (
          <AccordionItemComponent key={item.id} item={item} accordionStyle={accordionStyle} />
        ))}
      </RadixAccordion.Root>
    );
  }

  return (
    <RadixAccordion.Root
      ref={ref as React.Ref<HTMLDivElement>}
      type="single"
      defaultValue={Array.isArray(defaultValue) ? defaultValue[0] : defaultValue}
      collapsible
      style={{ ...cfg.container, ...style } as React.CSSProperties}
      className={className}
    >
      {items.map((item) => (
        <AccordionItemComponent key={item.id} item={item} accordionStyle={accordionStyle} />
      ))}
    </RadixAccordion.Root>
  );
});

Accordion.displayName = 'Accordion';
