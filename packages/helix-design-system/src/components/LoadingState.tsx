import { forwardRef } from 'react';
import { Spinner } from './Spinner';
import { Skeleton } from './Skeleton';

export type LoadingStateType = 'spinner' | 'list' | 'card' | 'table';
export type LoadingStateSize = 'default' | 'compact';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** spinner = centered spinner + message; list / card / table = skeleton layouts that mirror the final content */
  type?: LoadingStateType;
  /** default = whole section; compact = inline / inside a panel */
  size?: LoadingStateSize;
  /** Spinner type only */
  label?: string;
  /** Spinner type only */
  supportingText?: string;
}

const ROWS = { list: 4, table: 4 };

/** A loading placeholder for a list, table, card or whole section while data loads. Use the skeleton types when the final layout is known; the spinner type when it is not. */
export const LoadingState = forwardRef<HTMLDivElement, LoadingStateProps>(({
  type = 'spinner',
  size = 'default',
  label = 'Loading…',
  supportingText = 'Please wait a moment.',
  style,
  ...props
}, ref) => {
  const compact = size === 'compact';
  const pad = compact ? 12 : 24;
  const gap = compact ? 12 : 16;
  const rows = compact ? 2 : ROWS.list;

  let body: React.ReactNode;
  if (type === 'spinner') {
    body = (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap, textAlign: 'center' }}>
        <Spinner size={compact ? 32 : 48} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: compact ? 13 : 16, lineHeight: compact ? '19.2px' : '24px', color: 'var(--color-text-primary, #14141E)' }}>{label}</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{supportingText}</p>
        </div>
      </div>
    );
  } else if (type === 'list') {
    body = Array.from({ length: rows }, (_, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Skeleton shape="circle" width={compact ? 32 : 40} height={compact ? 32 : 40} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton shape="title" width="60%" height={compact ? 14 : 20} />
          <Skeleton shape="text" width="100%" />
        </div>
      </div>
    ));
  } else if (type === 'card') {
    body = (
      <>
        <Skeleton shape="rectangle" width="100%" height={compact ? 96 : 140} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton shape="title" width={200} />
          <Skeleton shape="text" width="100%" />
          <Skeleton shape="text" width="72%" />
        </div>
      </>
    );
  } else {
    const cols = [0, 1, 2];
    body = (
      <>
        <div style={{ display: 'flex', gap: 16 }}>
          {cols.map((c) => <div key={c} style={{ flex: 1, minWidth: 0 }}><Skeleton shape="title" width="100%" /></div>)}
        </div>
        {Array.from({ length: compact ? 3 : ROWS.table }, (_, r) => (
          <div key={r} style={{ display: 'flex', gap: 16 }}>
            {cols.map((c) => <div key={c} style={{ flex: 1, minWidth: 0 }}><Skeleton shape="text" width="100%" /></div>)}
          </div>
        ))}
      </>
    );
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-busy="true"
      aria-label={type === 'spinner' ? label : 'Loading'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: type === 'spinner' ? 'center' : 'stretch',
        justifyContent: type === 'spinner' ? 'center' : 'flex-start',
        gap,
        padding: pad,
        boxSizing: 'border-box',
        backgroundColor: 'var(--color-container-primary, #FFFFFF)',
        ...style,
      }}
      {...props}
    >
      {body}
    </div>
  );
});

LoadingState.displayName = 'LoadingState';
