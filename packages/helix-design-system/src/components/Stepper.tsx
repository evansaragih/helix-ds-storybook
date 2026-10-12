import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { Badge } from './Badge';

/** Figma State */
export type StepStatus = 'completed' | 'in-progress' | 'pending';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface Step {
  id: string;
  /** Figma Step Title — the step's name */
  title: string;
  /** Figma Step — the small caption above the title; defaults to "Step N" */
  step?: string;
  /** Figma Label — the small line under the title, e.g. a date or note */
  label?: string;
  /** Figma Status badge text under the label, e.g. "Pending" */
  badge?: string;
  /** Figma State. Omit to derive it from `activeStep`. */
  status?: StepStatus;
  /** Marker icon when `markerType` is 'icon' (a completed step with no icon shows a check) */
  icon?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  orientation?: StepperOrientation;
  /** Index of the in-progress step (0-based). Earlier steps are completed, later ones pending. */
  activeStep?: number;
  /** Figma Type — numbers or icons inside the 36px markers */
  markerType?: 'number' | 'icon';
  /** Vertical only — which side the labels sit on (Figma Label Position) */
  labelPosition?: 'right' | 'left';
  /** Makes steps clickable; hovering a step turns its text brand-colored */
  onStepClick?: (index: number) => void;
}

const GREEN = 'var(--color-stroke-success, #22C55E)';
const BRAND = 'var(--color-brand-primary, #F57E20)';
const TRACK = 'var(--color-stroke-subtle, #EEEEEE)';

const BADGE_COLOR = { completed: 'success', 'in-progress': 'brand', pending: 'neutral' } as const;

function Marker({ status, index, type, icon }: { status: StepStatus; index: number; type: 'number' | 'icon'; icon?: React.ReactNode }) {
  const bg = status === 'completed' ? GREEN : status === 'in-progress' ? BRAND : 'var(--color-container-secondary, #F7F7F7)';
  const fg = status === 'pending' ? 'var(--color-text-secondary, #49494A)' : '#FFFFFF';
  const content = type === 'icon' ? (icon ?? (status === 'completed' ? <Check size={20} /> : <span>{index + 1}</span>)) : <span>{index + 1}</span>;
  return (
    <span aria-hidden="true" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, width: 36, height: 36, borderRadius: '50%', boxSizing: 'border-box',
      backgroundColor: bg, color: fg, border: status === 'pending' ? `1.5px solid ${TRACK}` : 'none',
      fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13,
    }}>
      {content}
    </span>
  );
}

/** One connector segment: completed is solid green, in-progress is half brand and half track, pending is the track color. */
function Connector({ status, vertical }: { status: StepStatus; vertical: boolean }) {
  const line = (color: string, size: string): React.CSSProperties => vertical
    ? { width: 1, height: size, backgroundColor: color, borderRadius: 16 }
    : { height: 1, width: size, backgroundColor: color, borderRadius: 16 };
  return (
    <span aria-hidden="true" style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', alignItems: 'flex-start', ...(vertical ? { flex: 1, minHeight: 24, padding: '8px 0' } : { flex: 1, padding: '0 8px', alignSelf: 'center' }) }}>
      {status === 'completed' ? <span style={line(GREEN, '100%')} />
        : status === 'in-progress' ? <><span style={line(BRAND, '50%')} /><span style={line(TRACK, '50%')} /></>
        : <span style={line(TRACK, '100%')} />}
    </span>
  );
}

/** Step navigation for a multi-step flow: numbered or icon markers joined by connectors, with a step caption, title, label and status badge. Horizontal across the top or vertical in a column. */
export const Stepper = forwardRef<HTMLDivElement, StepperProps>(({
  steps,
  orientation = 'horizontal',
  activeStep,
  markerType = 'number',
  labelPosition = 'right',
  onStepClick,
  style,
  ...props
}, ref) => {
  const vertical = orientation === 'vertical';
  const resolved = steps.map((s, i): StepStatus => s.status ?? (activeStep === undefined ? 'pending' : i < activeStep ? 'completed' : i === activeStep ? 'in-progress' : 'pending'));

  const labelFor = (s: Step, i: number, hoverable: boolean) => {
    const hover = hoverable ? 'helix-step-hover' : '';
    return (
      <span className={hover} style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, textAlign: vertical && labelPosition === 'left' ? 'right' : 'left', fontFamily: 'var(--font-family-body)', letterSpacing: '-0.01px' }}>
        <span className="helix-step-text" style={{ fontSize: 13, lineHeight: '20px', color: 'var(--color-text-secondary, #49494A)' }}>{s.step ?? `Step ${i + 1}`}</span>
        <span className="helix-step-text" style={{ fontSize: 13, lineHeight: '19.2px', fontWeight: 500, color: 'var(--color-text-primary, #14141E)' }}>{s.title}</span>
        {s.label && <span style={{ fontSize: 10, lineHeight: '16px', color: 'var(--color-text-secondary, #49494A)' }}>{s.label}</span>}
        {s.badge && <span style={{ display: 'flex', justifyContent: vertical && labelPosition === 'left' ? 'flex-end' : 'flex-start', marginTop: 2 }}><Badge size="xs" color={BADGE_COLOR[resolved[i]]} appearance={resolved[i] === 'pending' ? 'outline' : 'solid'} label={s.badge} /></span>}
      </span>
    );
  };

  const wrap = (i: number, children: React.ReactNode, key?: string) => onStepClick ? (
    <button key={key} type="button" onClick={() => onStepClick(i)} aria-current={resolved[i] === 'in-progress' ? 'step' : undefined}
      style={{ all: 'unset', cursor: 'pointer', display: 'block', minWidth: 0 }}>{children}</button>
  ) : <div key={key} aria-current={resolved[i] === 'in-progress' ? 'step' : undefined} style={{ minWidth: 0 }}>{children}</div>;

  const css = `.helix-step-hover:hover .helix-step-text, button:hover .helix-step-hover .helix-step-text{color:${BRAND}!important}`;

  if (vertical) {
    const left = labelPosition === 'left';
    return (
      <div ref={ref} role="list" style={{ display: 'flex', flexDirection: 'column', ...style }} {...props}>
        <style>{css}</style>
        {steps.map((s, i) => (
          <div key={s.id} role="listitem" style={{ display: 'flex', flexDirection: left ? 'row-reverse' : 'row', gap: 12, justifyContent: left ? 'flex-end' : 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <Marker status={resolved[i]} index={i} type={markerType} icon={s.icon} />
              {i < steps.length - 1 && <Connector status={resolved[i]} vertical />}
            </div>
            <div style={{ paddingBottom: i < steps.length - 1 ? 16 : 0 }}>{wrap(i, labelFor(s, i, Boolean(onStepClick)))}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} role="list" style={{ display: 'flex', ...style }} {...props}>
      <style>{css}</style>
      {steps.map((s, i) => (
        <div key={s.id} role="listitem" style={{ flex: i < steps.length - 1 ? 1 : '0 0 auto', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Marker status={resolved[i]} index={i} type={markerType} icon={s.icon} />
            {i < steps.length - 1 && <Connector status={resolved[i]} vertical={false} />}
          </div>
          {wrap(i, labelFor(s, i, Boolean(onStepClick)))}
        </div>
      ))}
    </div>
  );
});

Stepper.displayName = 'Stepper';
