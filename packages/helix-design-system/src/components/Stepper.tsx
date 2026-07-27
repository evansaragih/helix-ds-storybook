import { forwardRef, useState } from 'react';
import { Check } from 'lucide-react';

export type StepperOrientation = 'horizontal' | 'vertical';
export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

export interface Step {
  id: string;
  label: string;
  description?: string;
  status?: StepStatus;
  icon?: React.ReactNode;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[];
  orientation?: StepperOrientation;
  /** Controlled active step index (0-based) */
  activeStep?: number;
  /** Makes step labels clickable — also enables the brand-primary hover color on the label */
  onStepClick?: (index: number) => void;
}

function StepCircle({ step, index }: { step: Step; index: number }) {
  const status = step.status ?? 'pending';

  const bg =
    status === 'completed' ? 'var(--color-text-success, #12843C)' :
    status === 'active'    ? 'var(--color-brand-primary, #F57E20)' :
    status === 'error'     ? 'var(--color-status-error-bg, #FEE2E2)' :
    'var(--color-container-tertiary, #EEEEEE)';

  const borderColor =
    status === 'completed' ? 'var(--color-text-success, #12843C)' :
    status === 'active'    ? 'var(--color-brand-primary, #F57E20)' :
    status === 'error'     ? 'var(--color-stroke-error, #DC2626)' :
    'var(--color-stroke-default, #D7D7D7)';

  const textColor =
    status === 'completed' ? '#FFFFFF' :
    status === 'active'    ? '#FFFFFF' :
    status === 'error'     ? 'var(--color-text-error, #EF4444)' :
    'var(--color-text-muted, #9F9F9F)';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 32,
      height: 32,
      borderRadius: '50%',
      backgroundColor: bg,
      border: `2px solid ${borderColor}`,
      flexShrink: 0,
      transition: 'all 0.2s',
    }}>
      {status === 'completed'
        ? <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
        : step.icon
        ? <span style={{ display: 'flex', color: textColor, width: 14, height: 14 }}>{step.icon}</span>
        : <span style={{
            fontFamily: 'var(--font-family-body)',
            fontWeight: 500,
            fontSize: 12,
            lineHeight: 1,
            color: textColor,
          }}>{index + 1}</span>
      }
    </div>
  );
}

function StepLabel({ step, clickable, onClick, style }: { step: Step; clickable: boolean; onClick?: () => void; style: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  const baseColor = step.status === 'active' || step.status === 'completed'
    ? 'var(--color-text-primary, #14141E)'
    : 'var(--color-text-tertiary, #828282)';

  return (
    <p
      onClick={clickable ? onClick : undefined}
      onMouseEnter={clickable ? () => setHovered(true) : undefined}
      onMouseLeave={clickable ? () => setHovered(false) : undefined}
      style={{
        margin: 0,
        fontFamily: 'var(--font-family-body)',
        fontWeight: step.status === 'active' ? 600 : 400,
        color: clickable && hovered ? 'var(--color-brand-primary, #F57E20)' : baseColor,
        letterSpacing: '-0.01px',
        cursor: clickable ? 'pointer' : undefined,
        transition: 'color 0.15s',
        ...style,
      }}
    >
      {step.label}
    </p>
  );
}

function ConnectorLine({ status, orientation }: { status: StepStatus; orientation: StepperOrientation }) {
  const isComplete = status === 'completed';
  if (orientation === 'vertical') {
    return (
      <div style={{
        width: 2,
        flex: 1,
        minHeight: 24,
        backgroundColor: isComplete
          ? 'var(--color-text-success, #12843C)'
          : 'var(--color-stroke-subtle, #EEEEEE)',
        marginLeft: 15,
        transition: 'background-color 0.2s',
      }} />
    );
  }
  return (
    <div style={{
      flex: 1,
      height: 2,
      backgroundColor: isComplete
        ? 'var(--color-text-success, #12843C)'
        : 'var(--color-stroke-subtle, #EEEEEE)',
      transition: 'background-color 0.2s',
    }} />
  );
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(({
  steps,
  orientation = 'horizontal',
  activeStep,
  onStepClick,
  style,
  className,
  ...props
}, ref) => {
  const enriched = steps.map((s, i) => ({
    ...s,
    status: s.status ?? (
      activeStep !== undefined
        ? i < activeStep ? 'completed' : i === activeStep ? 'active' : 'pending'
        : 'pending'
    ) as StepStatus,
  }));

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        style={{ display: 'flex', flexDirection: 'column', ...style }}
        className={className}
        {...props}
      >
        {enriched.map((step, i) => (
          <div key={step.id}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <StepCircle step={step} index={i} />
                {i < steps.length - 1 && (
                  <ConnectorLine status={step.status} orientation="vertical" />
                )}
              </div>
              <div style={{ paddingTop: 4, paddingBottom: i < steps.length - 1 ? 24 : 0, flex: 1 }}>
                <StepLabel
                  step={step}
                  clickable={!!onStepClick}
                  onClick={() => onStepClick?.(i)}
                  style={{ fontSize: 13, lineHeight: '19.2px' }}
                />
                {step.description && (
                  <p style={{
                    margin: '2px 0 0',
                    fontFamily: 'var(--font-family-body)',
                    fontSize: 12,
                    lineHeight: '18px',
                    color: 'var(--color-text-tertiary, #828282)',
                  }}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ display: 'flex', alignItems: 'flex-start', ...style }}
      className={className}
      {...props}
    >
      {enriched.map((step, i) => (
        <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start', flex: i < steps.length - 1 ? 1 : 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <StepCircle step={step} index={i} />
            <StepLabel
              step={step}
              clickable={!!onStepClick}
              onClick={() => onStepClick?.(i)}
              style={{ fontSize: 12, lineHeight: '18px', textAlign: 'center', maxWidth: 80 }}
            />
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, paddingTop: 15, paddingLeft: 8, paddingRight: 8 }}>
              <ConnectorLine status={step.status} orientation="horizontal" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

Stepper.displayName = 'Stepper';
