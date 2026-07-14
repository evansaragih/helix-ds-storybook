import { forwardRef } from 'react';

export type TableSize = 'sm' | 'md';

export interface Column<T = Record<string, unknown>> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[];
  data: T[];
  size?: TableSize;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  /** Show a border on every cell vs just rows */
  cellBorders?: boolean;
  /** Pin the rightmost column so it stays visible while scrolling horizontally */
  freezeLastColumn?: boolean;
  emptyText?: string;
  getRowKey?: (row: T, index: number) => React.Key;
}

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  size = 'md',
  striped = false,
  hoverable = true,
  bordered = true,
  cellBorders = false,
  freezeLastColumn = false,
  emptyText = 'No data',
  getRowKey,
  style,
  className,
  ...props
}: TableProps<T>) {
  const cellPy = size === 'sm' ? 8 : 12;
  const cellPx = 16;
  const fontSize = size === 'sm' ? 12 : 13;

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 'var(--radius-lg, 8px)',
        border: bordered ? '1px solid var(--color-stroke-subtle, #EEEEEE)' : 'none',
        overflow: 'auto',
        ...style,
      }}
      className={className}
      {...props}
    >
      <table style={{ width: 'max-content', minWidth: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--color-container-secondary, #F7F7F7)' }}>
            {columns.map((col, ci) => {
              const isFrozen = freezeLastColumn && ci === columns.length - 1;
              return (
                <th
                  key={col.key}
                  style={{
                    padding: `${cellPy}px ${cellPx}px`,
                    textAlign: col.align ?? 'left',
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 500,
                    fontSize,
                    lineHeight: '19.2px',
                    color: 'var(--color-text-primary, #14141E)',
                    letterSpacing: '-0.01px',
                    borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                    borderRight: cellBorders && ci < columns.length - 1
                      ? '1px solid var(--color-stroke-subtle, #EEEEEE)'
                      : 'none',
                    whiteSpace: 'nowrap',
                    width: col.width,
                    ...(isFrozen && {
                      position: 'sticky',
                      right: 0,
                      zIndex: 2,
                      backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
                      boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.10), -6px 0 8px rgba(0, 0, 0, 0.06)',
                    }),
                  }}
                >
                  {col.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{
                padding: '32px 16px',
                textAlign: 'center',
                fontFamily: 'Rubik, sans-serif',
                fontSize: 13,
                color: 'var(--color-text-muted, #9F9F9F)',
              }}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, ri) => {
              const baseBg = striped && ri % 2 === 1
                ? 'var(--color-container-secondary, #F7F7F7)'
                : 'var(--color-container-primary, #FFFFFF)';
              const hoverBg = 'var(--color-status-brand-bg, #FEF2E9)';

              return (
                <tr
                  key={getRowKey ? getRowKey(row, ri) : ri}
                  style={{
                    backgroundColor: striped && ri % 2 === 1 ? baseBg : 'transparent',
                    transition: hoverable ? 'background-color 0.1s' : 'none',
                  }}
                  onMouseEnter={hoverable ? (e) => {
                    const tr = e.currentTarget as HTMLTableRowElement;
                    tr.style.backgroundColor = hoverBg;
                    const frozenCell = tr.querySelector<HTMLElement>('[data-frozen-cell]');
                    if (frozenCell) frozenCell.style.backgroundColor = hoverBg;
                  } : undefined}
                  onMouseLeave={hoverable ? (e) => {
                    const tr = e.currentTarget as HTMLTableRowElement;
                    tr.style.backgroundColor = striped && ri % 2 === 1 ? baseBg : 'transparent';
                    const frozenCell = tr.querySelector<HTMLElement>('[data-frozen-cell]');
                    if (frozenCell) frozenCell.style.backgroundColor = baseBg;
                  } : undefined}
                >
                  {columns.map((col, ci) => {
                    const isFrozen = freezeLastColumn && ci === columns.length - 1;
                    return (
                      <td
                        key={col.key}
                        data-frozen-cell={isFrozen ? '' : undefined}
                        style={{
                          padding: `${cellPy}px ${cellPx}px`,
                          textAlign: col.align ?? 'left',
                          fontFamily: 'Rubik, sans-serif',
                          fontWeight: 400,
                          fontSize,
                          lineHeight: '19.2px',
                          color: 'var(--color-text-secondary, #49494A)',
                          letterSpacing: '-0.01px',
                          borderBottom: ri < data.length - 1
                            ? '1px solid var(--color-stroke-subtle, #EEEEEE)'
                            : 'none',
                          borderRight: cellBorders && ci < columns.length - 1
                            ? '1px solid var(--color-stroke-subtle, #EEEEEE)'
                            : 'none',
                          ...(isFrozen && {
                            position: 'sticky',
                            right: 0,
                            zIndex: 1,
                            backgroundColor: baseBg,
                            boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.10), -6px 0 8px rgba(0, 0, 0, 0.06)',
                          }),
                        }}
                      >
                        {col.render
                          ? col.render(row, ri)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = 'Table';
