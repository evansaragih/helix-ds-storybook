import { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  total: number;
  pageSize?: number;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  showRowsPerPage?: boolean;
  pageSizes?: number[];
  onPageSizeChange?: (size: number) => void;
}

function range(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function buildPages(current: number, total: number, siblings: number): (number | '...')[] {
  const totalPages = total;
  if (totalPages <= 7) return range(1, totalPages);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, totalPages);

  const showLeft = leftSibling > 2;
  const showRight = rightSibling < totalPages - 1;

  if (!showLeft && showRight) {
    const leftItems = range(1, 3 + siblings * 2);
    return [...leftItems, '...', totalPages];
  }
  if (showLeft && !showRight) {
    const rightItems = range(totalPages - 2 - siblings * 2, totalPages);
    return [1, '...', ...rightItems];
  }
  return [1, '...', ...range(leftSibling, rightSibling), '...', totalPages];
}

function PageBtn({
  children, active, disabled, onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const bg = active
    ? 'var(--color-brand-primary, #F57E20)'
    : disabled
    ? 'transparent'
    : hovered
    ? 'var(--color-container-tertiary, #EEEEEE)'
    : 'transparent';

  const color = active
    ? '#FFFFFF'
    : disabled
    ? 'var(--color-text-muted, #9F9F9F)'
    : 'var(--color-text-secondary, #49494A)';

  const boxShadow = active
    ? '0px 0.5px 4px 0px var(--color-brand-primary, #F57E20), inset 0px -5px 4px 0px var(--color-brand-primary, #F57E20)'
    : 'none';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minWidth: 36,
        height: 36,
        padding: '8px 11px',
        borderRadius: 8,
        border: active
          ? '1px solid var(--color-brand-primary, #F57E20)'
          : '1px solid transparent',
        backgroundColor: bg,
        color,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 400,
        fontSize: 13,
        lineHeight: '19.2px',
        letterSpacing: '-0.01px',
        outline: 'none',
        transition: 'background-color 0.15s, color 0.15s',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxShadow,
      }}
    >
      {children}
    </button>
  );
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  total,
  pageSize = 10,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  showRowsPerPage = false,
  pageSizes = [10, 25, 50, 100],
  onPageSizeChange,
  style,
  className,
  ...props
}, ref) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const resolvedPageSize = onPageSizeChange ? pageSize : internalPageSize;
  const totalPages = Math.max(1, Math.ceil(total / resolvedPageSize));
  const isControlled = controlledPage !== undefined;
  const current = Math.min(Math.max(isControlled ? controlledPage! : internalPage, 1), totalPages);

  const go = (p: number) => {
    const next = Math.min(Math.max(p, 1), totalPages);
    if (!isControlled) setInternalPage(next);
    onPageChange?.(next);
  };

  const handlePageSizeChange = (size: number) => {
    setInternalPageSize(size);
    onPageSizeChange?.(size);
    go(1);
  };

  const pages = buildPages(current, totalPages, siblingCount);

  const paginationControls = (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
      <PageBtn disabled={current <= 1} onClick={() => go(current - 1)}>
        <ChevronLeft size={14} strokeWidth={2} />
        Previous
      </PageBtn>

      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36, color: 'var(--color-text-muted, #9F9F9F)',
          }}>
            <MoreHorizontal size={12} />
          </span>
        ) : (
          <PageBtn key={p} active={p === current} onClick={() => go(p as number)}>
            {p}
          </PageBtn>
        )
      )}

      <PageBtn disabled={current >= totalPages} onClick={() => go(current + 1)}>
        Next
        <ChevronRight size={14} strokeWidth={2} />
      </PageBtn>
    </div>
  );

  if (!showRowsPerPage) {
    return (
      <div
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        style={{ display: 'inline-flex', alignItems: 'center', ...style }}
        className={className}
        {...props}
      >
        {paginationControls}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="navigation"
      aria-label="Pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        ...style,
      }}
      className={className}
      {...props}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 400,
          fontSize: 13,
          lineHeight: '19.2px',
          letterSpacing: '-0.01px',
          color: 'var(--color-text-secondary, #49494A)',
          whiteSpace: 'nowrap',
        }}>
          Rows per page
        </span>
        {pageSizes && pageSizes.length > 0 && (
          <select
            value={resolvedPageSize}
            onChange={e => handlePageSizeChange(Number(e.target.value))}
            style={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: 13,
              lineHeight: '19.2px',
              color: 'var(--color-text-secondary, #49494A)',
              border: '1px solid var(--color-input-border-default, #D7D7D7)',
              borderRadius: 8,
              padding: '6px 12px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {pageSizes.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        )}
      </div>

      {paginationControls}
    </div>
  );
});

Pagination.displayName = 'Pagination';
