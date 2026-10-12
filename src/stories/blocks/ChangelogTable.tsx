import React, { useMemo, useState } from 'react';
import { DatePicker, Popover, Pagination, Button } from 'helix-design-system/components';
import { getChangelogEntries } from '../../data/changelog';

const PAGE_SIZE = 15;

function parseEntryDate(dateStr: string): Date {
  // "YYYY-MM-DD" — parse as local date, not UTC, so range comparisons match what's displayed.
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function ChangelogTable() {
  const allEntries = useMemo(() => getChangelogEntries(), []);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!rangeStart && !rangeEnd) return allEntries;
    return allEntries.filter((entry) => {
      const d = parseEntryDate(entry.date);
      if (rangeStart && d < rangeStart) return false;
      if (rangeEnd && d > rangeEnd) return false;
      return true;
    });
  }, [allEntries, rangeStart, rangeEnd]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageEntries = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setRangeStart(start);
    setRangeEnd(end);
    setPage(1);
  };

  const clearFilter = () => {
    setRangeStart(null);
    setRangeEnd(null);
    setPage(1);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <Popover
          width={300}
          trigger={
            <Button hierarchy="secondary" appearance="outline" size="sm">
              {rangeStart || rangeEnd
                ? `${rangeStart?.toLocaleDateString() ?? '…'} – ${rangeEnd?.toLocaleDateString() ?? '…'}`
                : 'Filter by date range'}
            </Button>
          }
        >
          <DatePicker
            mode="range"
            range={{ start: rangeStart ?? undefined, end: rangeEnd ?? undefined }}
            onRangeChange={(r) => handleRangeChange(r.start ?? null, r.end ?? null)}
            style={{ border: 'none', boxShadow: 'none', padding: 0 }}
          />
        </Popover>
        {(rangeStart || rangeEnd) && (
          <Button hierarchy="secondary" appearance="ghost" size="sm" onClick={clearFilter}>
            Clear filter
          </Button>
        )}
        <span style={{ fontSize: 13, color: 'var(--color-text-tertiary)' }}>
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {filtered.length !== allEntries.length ? ` (of ${allEntries.length} total)` : ''}
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Component</th>
            <th>Version</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {pageEntries.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '24px 0', color: 'var(--color-text-tertiary)' }}>
                No changes in this date range.
              </td>
            </tr>
          )}
          {pageEntries.map((entry, i) => (
            <tr key={`${entry.componentId}-${currentPage}-${i}`}>
              <td>{entry.date}</td>
              <td>
                <a href={`/?path=/docs/${entry.docsId}`} target="_top">{entry.componentName}</a>
              </td>
              <td>{entry.version}</td>
              <td>{entry.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ marginTop: 20 }}>
          <Pagination total={filtered.length} pageSize={PAGE_SIZE} page={currentPage} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
