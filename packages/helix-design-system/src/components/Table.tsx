import { forwardRef } from 'react';

export type TableSize = 'sm' | 'md';

export interface Column<T = Record<string, unknown>> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  /** Figma Left Side Header — body cells in this column use the darker header text color (usually the first column) */
  rowHeader?: boolean;
  /** Figma Footer cell content for this column — renders a footer row when any column has one */
  footer?: React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> extends React.HTMLAttributes<HTMLDivElement> {
  columns: Column<T>[];
  data: T[];
  size?: TableSize;
  striped?: boolean;
  hoverable?: boolean;
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
  freezeLastColumn = false,
  emptyText = 'No data',
  getRowKey,
  style,
  className,
  ...props
}: TableProps<T>) {
  // Figma Table Cell: body 52 / 40, header 48 / 40 (Medium / Small), 16px side padding, 13px text
  const bodyH = size === 'sm' ? 40 : 52;
  const headH = size === 'sm' ? 40 : 48;
  const cellPx = 16;
  const fontSize = 13;
  const hasFooter = columns.some((c) => c.footer !== undefined);

  return (
    <div
      style={{
        width: '100%',
        borderRadius: 6,
        border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
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
                    height: headH,
                    padding: `0 ${cellPx}px`,
                    textAlign: col.align ?? 'left',
                    fontFamily: 'var(--font-family-body)',
                    fontWeight: 500,
                    fontSize,
                    lineHeight: '20px',
                    color: 'var(--color-text-primary, #14141E)',
                    letterSpacing: '-0.01px',
                    borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
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
                fontFamily: 'var(--font-family-body)',
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
                    transition: hoverable ? 'background-color var(--motion-duration-fast) var(--motion-easing-standard)' : 'none',
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
                          height: bodyH,
                          padding: `0 ${cellPx}px`,
                          textAlign: col.align ?? 'left',
                          fontFamily: 'var(--font-family-body)',
                          fontWeight: 400,
                          fontSize,
                          lineHeight: '20px',
                          color: col.rowHeader ? 'var(--color-text-primary, #14141E)' : 'var(--color-text-secondary, #49494A)',
                          letterSpacing: '-0.01px',
                          borderBottom: ri < data.length - 1 || hasFooter
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
        {hasFooter && (
          <tfoot>
            <tr style={{ backgroundColor: 'var(--color-container-secondary, #F7F7F7)' }}>
              {columns.map((col) => (
                <td key={col.key} style={{ height: headH, padding: `0 ${cellPx}px`, textAlign: col.align ?? 'left', fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize, lineHeight: '20px', color: 'var(--color-text-primary, #14141E)', whiteSpace: 'nowrap' }}>
                  {col.footer}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

Table.displayName = 'Table';
