import { forwardRef } from 'react';
import { Check, X, Minus } from 'lucide-react';

export type CellValue = boolean | 'partial' | string | number | React.ReactNode;

export interface ComparisonColumn {
  key: string;
  label: string;
  /** Highlight this column (e.g., recommended plan) */
  highlighted?: boolean;
  /** Badge to show on column header */
  badge?: string;
}

export interface ComparisonRow {
  feature: string;
  /** Optional category group label to create section headers */
  group?: string;
  values: Record<string, CellValue>;
}

export interface ComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** Label for the feature column */
  featureLabel?: string;
  stickyHeader?: boolean;
}

function renderCell(value: CellValue): React.ReactNode {
  if (value === true)       return <Check size={18} color="var(--color-text-success, #12843C)" strokeWidth={2.5} />;
  if (value === false)      return <X size={18} color="var(--color-text-tertiary, #828282)" strokeWidth={2} />;
  if (value === 'partial')  return <Minus size={18} color="var(--color-text-warning, #A66800)" strokeWidth={2} />;
  return (
    <span style={{
      fontFamily: 'var(--font-family-body)', fontSize: 13,
      color: 'var(--color-text-primary, #14141E)', lineHeight: '19.2px',
    }}>
      {value as React.ReactNode}
    </span>
  );
}

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(({
  columns,
  rows,
  featureLabel = 'Feature',
  stickyHeader = false,
  style,
  ...props
}, ref) => {
  const colWidth = `${Math.floor(80 / columns.length)}%`;

  return (
    <div
      ref={ref}
      style={{
        overflowX: 'auto',
        borderRadius: 12,
        border: '1px solid var(--color-stroke-subtle, #EEEEEE)',
        ...style,
      }}
      {...props}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        {/* Header */}
        <thead>
          <tr>
            <th style={{
              width: '20%',
              padding: '16px 20px',
              textAlign: 'left',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500,
              fontSize: 12,
              color: 'var(--color-text-tertiary, #828282)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
              borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
              position: stickyHeader ? 'sticky' : undefined,
              top: stickyHeader ? 0 : undefined,
              zIndex: stickyHeader ? 1 : undefined,
            }}>
              {featureLabel}
            </th>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  width: colWidth,
                  padding: '16px 20px',
                  textAlign: 'center',
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: col.highlighted ? 'var(--color-brand-primary, #F57E20)' : 'var(--color-text-primary, #14141E)',
                  backgroundColor: col.highlighted ? 'var(--color-brand-primary-ghost-hover, #FEF2E9)' : 'var(--color-container-secondary, #F7F7F7)',
                  borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                  borderLeft: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                  position: stickyHeader ? 'sticky' : undefined,
                  top: stickyHeader ? 0 : undefined,
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  {col.label}
                  {col.badge && (
                    <span style={{
                      padding: '2px 8px', borderRadius: 20,
                      backgroundColor: col.highlighted ? 'var(--color-brand-primary, #F57E20)' : '#E0E0E0',
                      color: col.highlighted ? '#FFFFFF' : 'var(--color-text-secondary, #49494A)',
                      fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 11,
                      lineHeight: '16px',
                    }}>
                      {col.badge}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, ri) => (
            <>
              {row.group && (
                <tr key={`group-${ri}`}>
                  <td
                    colSpan={columns.length + 1}
                    style={{
                      padding: '10px 20px',
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: 600,
                      fontSize: 11,
                      color: 'var(--color-text-tertiary, #828282)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      backgroundColor: 'var(--color-container-secondary, #F7F7F7)',
                      borderBottom: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                    }}
                  >
                    {row.group}
                  </td>
                </tr>
              )}
              <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? '1px solid var(--color-stroke-subtle, #EEEEEE)' : 'none' }}>
                <td style={{
                  padding: '14px 20px',
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 400,
                  fontSize: 13,
                  color: 'var(--color-text-primary, #14141E)',
                  lineHeight: '19.2px',
                }}>
                  {row.feature}
                </td>
                {columns.map(col => (
                  <td
                    key={col.key}
                    style={{
                      padding: '14px 20px',
                      textAlign: 'center',
                      backgroundColor: col.highlighted ? 'rgba(245,126,32,0.04)' : 'transparent',
                      borderLeft: '1px solid var(--color-stroke-subtle, #EEEEEE)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {renderCell(row.values[col.key])}
                    </div>
                  </td>
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
});

ComparisonTable.displayName = 'ComparisonTable';
