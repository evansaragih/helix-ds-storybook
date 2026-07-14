import React from 'react';
import { Title, Subtitle, Primary, Controls, Stories, useOf } from '@storybook/addon-docs/blocks';
import { getComponentChangelog, type ComponentStatus } from '../../data/changelog';

const STATUS_LABEL: Record<ComponentStatus, string> = {
  stable: 'Stable',
  beta: 'Beta',
  deprecated: 'Deprecated',
};

const STATUS_COLOR: Record<ComponentStatus, { bg: string; fg: string }> = {
  stable: { bg: '#dcfce7', fg: '#166534' },
  beta: { bg: '#fef9c3', fg: '#854d0e' },
  deprecated: { bg: '#fee2e2', fg: '#991b1b' },
};

/** Derives the changelog data id from a story title's last segment, e.g. "Components/CardMetric" -> "cardmetric". */
function componentIdFromTitle(title: string): string {
  const lastSegment = title.split('/').pop() ?? title;
  return lastSegment.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function StatusBadge({ status }: { status: ComponentStatus }) {
  const color = STATUS_COLOR[status];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: color.bg,
        color: color.fg,
      }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function ChangelogSection({ componentId }: { componentId: string }) {
  const entry = getComponentChangelog(componentId);
  if (!entry) return null;

  const sorted = [...entry.changelog].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return (
    <>
      <h2>Changelog</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Version</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((change, i) => (
            <tr key={i}>
              <td>{change.date}</td>
              <td>{change.version}</td>
              <td>{change.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

/**
 * Default docs page for every component (wired up globally in preview.tsx).
 * Same layout as Storybook's built-in autodocs page, plus a status badge and
 * a description up top and a changelog table at the bottom — all sourced
 * from src/data/changelog.ts instead of docgen/parameters, so one edit there
 * updates the component's Docs page everywhere.
 */
export function ComponentDocsPage() {
  const resolved = useOf('meta', ['meta']);
  const componentId = componentIdFromTitle(resolved.preparedMeta.title);
  const entry = getComponentChangelog(componentId);

  return (
    <>
      <Title />
      {entry && <StatusBadge status={entry.status} />}
      <Subtitle />
      {entry && <p>{entry.description}</p>}
      <Primary />
      <Controls />
      <Stories />
      <ChangelogSection componentId={componentId} />
    </>
  );
}
