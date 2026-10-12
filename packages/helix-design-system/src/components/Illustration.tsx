import { forwardRef, useMemo } from 'react';
import { ILLUSTRATIONS, type IllustrationName } from './illustrations';

export interface IllustrationProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  name: IllustrationName;
  /** Rendered width and height in px. Default 160 (the artwork's native size). */
  size?: number;
  /** Idle motion: the body floats and sways, sparkles twinkle, dots drift. Holds still under prefers-reduced-motion. Default true. */
  animated?: boolean;
}

type Role = 'shadow' | 'body' | 'spark' | 'dot' | 'node' | 'bubble';

/** Figma illustrations share one anatomy: a ground shadow first, a 4-point sparkle, then loose decorative dots; strand nodes and liquid bubbles are the remaining solid circles. */
function classify(svg: string): string {
  const paths = [...svg.matchAll(/<path\b[^>]*>/g)].map((m) => m[0]);
  const meta = paths.map((p, i) => {
    const d = /\sd="([^"]*)"/.exec(p)?.[1] ?? '';
    const fill = /\sfill="([^"]*)"/.exec(p)?.[1];
    const stroke = /\sstroke="/.test(p);
    const curves = (d.match(/C/g) ?? []).length;
    const lines = (d.match(/L/g) ?? []).length;
    return { i, d, fill, stroke, curves, lines };
  });
  const sparkAt = meta.findIndex((m) => m.curves === 0 && m.lines === 8);
  const solidDot = (m: (typeof meta)[number]) => !m.stroke && m.fill && m.fill !== 'none' && m.curves === 4 && m.d.length >= 137 && m.d.length <= 163;

  const roles: Role[] = meta.map((m) => {
    if (m.i === 0) return 'shadow';
    if (m.i === sparkAt) return 'spark';
    if (solidDot(m)) {
      if (m.fill!.toUpperCase() === '#FEF2E9') return 'bubble';
      return sparkAt >= 0 && m.i > sparkAt ? 'dot' : 'node';
    }
    return 'body';
  });

  const counters: Record<string, number> = {};
  let n = -1;
  return svg.replace(/<path\b/g, () => {
    n += 1;
    const role = roles[n];
    const idx = (counters[role] = (counters[role] ?? -1) + 1);
    return `<path class="il-${role}" style="--i:${idx}"`;
  });
}

const CSS = `
.helix-il svg{overflow:visible}
.helix-il [class^="il-"]{transform-box:fill-box;transform-origin:center}
.helix-il[data-animated="true"] .il-shadow{animation:hil-shadow 4.4s ease-in-out infinite alternate}
.helix-il[data-animated="true"] .il-body{transform-box:view-box;transform-origin:80px 138px;animation:hil-float 4.4s ease-in-out infinite alternate,hil-sway 6.6s ease-in-out infinite alternate}
.helix-il[data-animated="true"] .il-spark{animation:hil-twinkle 2.6s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.9s)}
.helix-il[data-animated="true"] .il-dot{animation:hil-drift calc(3.4s + var(--i) * .7s) ease-in-out infinite alternate;animation-delay:calc(var(--i) * -1.1s)}
.helix-il[data-animated="true"] .il-node{animation:hil-pulse 2.4s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -.3s)}
.helix-il[data-animated="true"] .il-bubble{animation:hil-rise 2.8s cubic-bezier(.3,0,.5,1) infinite;animation-delay:calc(var(--i) * -1.3s)}
@keyframes hil-float{from{translate:0 3px}to{translate:0 -4px}}
@keyframes hil-sway{from{rotate:-.9deg}to{rotate:.9deg}}
@keyframes hil-shadow{from{scale:1.04 1;opacity:1}to{scale:.82 1;opacity:.6}}
@keyframes hil-twinkle{from{scale:.55;rotate:0deg;opacity:.45}to{scale:1.15;rotate:90deg;opacity:1}}
@keyframes hil-drift{from{translate:-3px 2px;scale:.9}to{translate:3px -5px;scale:1.12}}
@keyframes hil-pulse{from{scale:.82}to{scale:1.22}}
@keyframes hil-rise{0%{translate:0 6px;scale:.6;opacity:0}20%{opacity:1}100%{translate:0 -16px;scale:1;opacity:0}}
@media (prefers-reduced-motion:reduce){.helix-il [class^="il-"]{animation:none!important}}`;

const cache = new Map<IllustrationName, string>();
const processed = (name: IllustrationName) => {
  let svg = cache.get(name);
  if (!svg) cache.set(name, (svg = classify(ILLUSTRATIONS[name])));
  return svg;
};

/** One of the Figma Empty State / Biotech illustrations, with an optional idle animation built from layered, out-of-phase motion so it never looks like a rigid loop. */
export const Illustration = forwardRef<HTMLSpanElement, IllustrationProps>(({ name, size = 160, animated = true, style, ...props }, ref) => {
  const html = useMemo(() => processed(name).replace('width="160" height="160"', `width="${size}" height="${size}"`), [name, size]);
  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="helix-il"
      data-animated={animated}
      style={{ display: 'flex', flexShrink: 0, width: size, height: size, ...style }}
      {...props}
    >
      <style>{CSS}</style>
      <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: html }} />
    </span>
  );
});

Illustration.displayName = 'Illustration';
