import React, { useEffect, useRef, useState } from 'react';

/** Converts a computed rgb()/rgba() string to a #hex (or rgba(...) if it has alpha) for display. */
function toReadableColor(computed: string): string {
  const m = computed.match(/[\d.]+/g);
  if (!m) return computed;
  const [r, g, b, a] = m.map(Number);
  if (a !== undefined && a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
  return (
    '#' +
    [r, g, b]
      .map((x) => Math.round(x).toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

export function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ marginBottom: description ? 4 : 16, fontSize: 20 }}>{title}</h3>
      {description && (
        <p style={{ marginBottom: 16, color: 'var(--color-text-secondary)', fontSize: 14, maxWidth: 640 }}>
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export function SwatchGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>{children}</div>;
}

/** Color swatch that reads its own resolved background color live, so it reflects the active brand mode. */
export function TokenSwatch({ label, varName }: { label: string; varName: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [resolved, setResolved] = useState('');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setResolved(toReadableColor(getComputedStyle(el).backgroundColor));
    update();
    const brandRoot = el.closest('[data-brand]');
    if (!brandRoot) return;
    const observer = new MutationObserver(update);
    observer.observe(brandRoot, { attributes: true, attributeFilter: ['data-brand'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 148 }}>
      <div
        ref={ref}
        style={{
          height: 64,
          borderRadius: 8,
          background: `var(${varName})`,
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      />
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>{varName}</div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{resolved}</div>
    </div>
  );
}

/** Color swatch for non-brand-aware primitives — value is static so it's passed straight in, no DOM read needed. */
export function StaticSwatch({ label, hex }: { label: string; hex: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 104 }}>
      <div
        style={{
          height: 48,
          borderRadius: 8,
          background: hex,
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      />
      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-text-primary)' }}>{label}</div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-muted)' }}>{hex}</div>
    </div>
  );
}

/**
 * Horizontal bar sized via a CSS var (spacing/container/max-width scales) — the value itself is static/documented.
 * `divisor` scales large values (containers, max-widths) down to a readable width while staying var()-driven.
 */
export function Bar({ varName, value, divisor = 1 }: { label?: string; varName: string; value: string; divisor?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
      <div style={{ width: 140, fontSize: 12, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>
        {varName}
      </div>
      <div
        style={{
          height: 20,
          width: divisor === 1 ? `var(${varName})` : `calc(var(${varName}) / ${divisor})`,
          background: 'var(--color-brand-primary)',
          borderRadius: 4,
        }}
      />
      <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>{value}</div>
    </div>
  );
}

export function RadiusBox({ label, varName, value }: { label: string; varName: string; value: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 108 }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: `var(${varName})`,
          background: 'var(--color-container-secondary)',
          border: '1.5px solid var(--color-brand-primary)',
        }}
      />
      <div style={{ fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{label}</div>
      <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-tertiary)', textAlign: 'center' }}>
        {varName}
      </div>
      <div style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>{value}</div>
    </div>
  );
}
