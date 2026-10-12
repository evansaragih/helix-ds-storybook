import { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { IconButton } from './IconButton';
import { Select } from './Select';

/** Figma Content */
export type PaginationContent =
  | 'numbered' | 'simple' | 'simple-reversed' | 'simple-split'
  | 'grouped' | 'pagination-right' | 'pagination-left'
  | 'page-count' | 'showing';
/** Figma Density — full uses labelled Previous / Next; compact uses icon buttons */
export type PaginationDensity = 'full' | 'compact';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total number of items */
  total: number;
  pageSize?: number;
  /** Controlled current page (1-based) */
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  /** Page buttons shown on each side of the current page */
  siblingCount?: number;
  content?: PaginationContent;
  density?: PaginationDensity;
  /** Show the "rows per page" select (default: on for simple, page-count and showing content) */
  showRowsPerPage?: boolean;
  pageSizes?: number[];
  onPageSizeChange?: (size: number) => void;
}

const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

function buildPages(current: number, total: number, siblings: number): (number | '…')[] {
  if (total <= 7) return range(1, total);
  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showLeft = left > 2;
  const showRight = right < total - 1;
  if (!showLeft && showRight) return [...range(1, 3 + siblings * 2), '…', total];
  if (showLeft && !showRight) return [1, '…', ...range(total - 2 - siblings * 2, total)];
  return [1, '…', ...range(left, right), '…', total];
}

const text: React.CSSProperties = { fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '20px', letterSpacing: '-0.01px', color: 'var(--color-text-secondary, #49494A)', whiteSpace: 'nowrap' };

/** Page navigation for long lists and tables. Pick a content layout (numbered, simple, grouped, page count, showing…) and a density (full or compact icon navigation). */
export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  total,
  pageSize = 10,
  page: controlledPage,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
  content = 'numbered',
  density = 'full',
  showRowsPerPage,
  pageSizes = [10, 25, 50, 100],
  onPageSizeChange,
  style,
  ...props
}, ref) => {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalSize, setInternalSize] = useState(pageSize);
  const size = onPageSizeChange ? pageSize : internalSize;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const controlled = controlledPage !== undefined;
  const current = Math.min(Math.max(controlled ? controlledPage! : internalPage, 1), totalPages);
  const compact = density === 'compact';

  const go = (p: number) => {
    const next = Math.min(Math.max(p, 1), totalPages);
    if (!controlled) setInternalPage(next);
    onPageChange?.(next);
  };
  const changeSize = (s: number) => { setInternalSize(s); onPageSizeChange?.(s); go(1); };

  const withRows = showRowsPerPage ?? ['simple', 'simple-reversed', 'simple-split', 'page-count', 'showing'].includes(content);
  const pages = buildPages(current, totalPages, siblingCount);

  const prev = compact
    ? <IconButton key="prev" aria-label="Previous page" hierarchy="secondary" size="sm" icon={<ChevronLeft size={16} />} disabled={current <= 1} onClick={() => go(current - 1)} />
    : <Button key="prev" hierarchy="secondary" size="sm" disabled={current <= 1} onClick={() => go(current - 1)}>Previous</Button>;
  const next = compact
    ? <IconButton key="next" aria-label="Next page" hierarchy="secondary" size="sm" icon={<ChevronRight size={16} />} disabled={current >= totalPages} onClick={() => go(current + 1)} />
    : <Button key="next" hierarchy="secondary" size="sm" disabled={current >= totalPages} onClick={() => go(current + 1)}>Next</Button>;

  const pageButton = (p: number | '…', i: number, grouped = false, pos?: 'first' | 'mid' | 'last') => p === '…'
    ? <span key={`d${i}`} aria-hidden="true" style={{ ...text, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: grouped ? 36 : 24, color: 'var(--color-text-tertiary, #828282)' }}>…</span>
    : (
      <Button
        key={p}
        size="sm"
        hierarchy={p === current ? 'primary' : 'secondary'}
        aria-current={p === current ? 'page' : undefined}
        onClick={() => go(p)}
        style={{ minWidth: 36, paddingLeft: 8, paddingRight: 8, ...(grouped ? { borderRadius: pos === 'first' ? '6px 0 0 6px' : pos === 'last' ? '0 6px 6px 0' : 0, marginLeft: pos === 'first' ? 0 : -1 } : {}) }}
      >
        {p}
      </Button>
    );

  const pageList = <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{pages.map((p, i) => pageButton(p, i))}</div>;

  const grouped = (
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Button size="sm" hierarchy="secondary" disabled={current <= 1} onClick={() => go(current - 1)} style={{ borderRadius: '6px 0 0 6px' }}>{compact ? <ChevronLeft size={16} /> : 'Previous'}</Button>
      {pages.map((p, i) => pageButton(p, i, true, 'mid'))}
      <Button size="sm" hierarchy="secondary" disabled={current >= totalPages} onClick={() => go(current + 1)} style={{ borderRadius: '0 6px 6px 0', marginLeft: -1 }}>{compact ? <ChevronRight size={16} /> : 'Next'}</Button>
    </div>
  );

  const rows = withRows && !compact && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={text}>Rows per page</span>
      <div style={{ width: 72 }}>
        <Select options={pageSizes.map((s) => ({ value: String(s), label: String(s) }))} value={String(size)} onValueChange={(v) => changeSize(Number(v))} />
      </div>
    </div>
  );

  const pageText = <span style={text}>Page {current} of {totalPages}</span>;
  const pageInput = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={text}>Showing page</span>
      <input
        aria-label="Current page"
        inputMode="numeric"
        value={current}
        onChange={(e) => { const n = Number(e.target.value.replace(/\D/g, '')); if (n) go(n); }}
        style={{ width: 36, height: 36, boxSizing: 'border-box', textAlign: 'center', borderRadius: 8, border: '1px solid var(--color-stroke-subtle, #EEEEEE)', fontFamily: 'var(--font-family-body)', fontSize: 13, outline: 'none' }}
      />
      <span style={text}>of {totalPages}</span>
    </div>
  );
  const indicator = <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{pageText}{rows}</div>;

  const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8, width: '100%', ...style };

  let body: React.ReactNode;
  switch (content) {
    case 'simple':
      body = <><div style={{ flex: 1 }}>{compact ? null : indicator}</div>{compact ? <>{prev}{pageText}{next}</> : <div style={{ display: 'flex', gap: 8 }}>{prev}{next}</div>}</>; break;
    case 'simple-reversed':
      body = <>{compact ? <>{prev}{pageText}{next}</> : <div style={{ display: 'flex', gap: 8 }}>{prev}{next}</div>}<div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{compact ? null : indicator}</div></>; break;
    case 'simple-split':
      body = <>{prev}<div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{compact ? pageText : indicator}</div>{next}</>; break;
    case 'grouped':
      body = <><div style={{ flex: 1 }}>{compact ? null : indicator}</div>{grouped}</>; break;
    case 'pagination-right':
      body = <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{grouped}</div>; break;
    case 'pagination-left':
      body = <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>{grouped}</div>; break;
    case 'page-count':
      body = <>{compact ? null : <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>{pageInput}{rows && <><span aria-hidden="true" style={{ width: 1, height: 32, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' }} />{rows}</>}</div>}<div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>{compact ? <>{prev}{pageText}{next}</> : <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{prev}{pageList}{next}</div>}</div></>; break;
    case 'showing':
      body = compact
        ? <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>{prev}{pageText}{next}</div>
        : <>{pageInput}<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>{prev}{pageList}{next}</div>{rows}</>; break;
    default: // numbered
      body = <>{compact ? prev : prev}<div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{pageList}</div>{next}</>;
  }

  return (
    <div ref={ref} role="navigation" aria-label="Pagination" style={row} {...props}>
      {body}
    </div>
  );
});

Pagination.displayName = 'Pagination';
