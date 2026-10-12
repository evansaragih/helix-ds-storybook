import { forwardRef, useId } from 'react';

export interface HelixAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Rendered height in px; width follows the 3:4 aspect */
  size?: number;
  /** Seconds for one full twist. Default 6. */
  duration?: number;
  /** Number of base-pair rungs. Default 14. */
  rungs?: number;
}

const W = 240;
const H = 320;
const AMP = 62;
const TURNS = 1.5;

/** A looping double helix. Every strand node and rung is a CSS-animated sine pair (ease-in-out alternate), so the loop is seamless, GPU-cheap and brand-aware; it holds a still pose under prefers-reduced-motion. */
export const HelixAnimation = forwardRef<HTMLDivElement, HelixAnimationProps>(({ size = 320, duration = 6, rungs = 14, style, ...props }, ref) => {
  const k = useId().replace(/:/g, '');
  const T = duration;
  const half = T / 2;
  const items = Array.from({ length: rungs }, (_, i) => {
    const y = 28 + (i * (H - 56)) / (rungs - 1);
    const phase = ((i / (rungs - 1)) * TURNS * T) % T; // seconds into the cycle
    return { y, phase };
  });

  const css = `
.hx-${k} .n{animation:hx-${k}-x ${half}s cubic-bezier(.37,0,.63,1) infinite alternate;transform-box:fill-box;transform-origin:center}
.hx-${k} .d{animation:hx-${k}-d ${half}s cubic-bezier(.37,0,.63,1) infinite alternate;transform-box:fill-box;transform-origin:center}
.hx-${k} .b,.hx-${k} .b .d{animation-direction:alternate-reverse}
.hx-${k} .r{animation:hx-${k}-r ${half}s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes hx-${k}-x{from{translate:${-AMP}px 0}to{translate:${AMP}px 0}}
@keyframes hx-${k}-d{from{opacity:.3;scale:.62}to{opacity:1;scale:1}}
@keyframes hx-${k}-r{0%{scale:1 1;opacity:.9;animation-timing-function:cubic-bezier(.12,0,.39,0)}50%{scale:0 1;opacity:.3;animation-timing-function:cubic-bezier(.61,1,.88,1)}100%{scale:1 1;opacity:.9}}
@media (prefers-reduced-motion:reduce){.hx-${k} .n,.hx-${k} .d,.hx-${k} .r{animation-play-state:paused}}`;

  return (
    <div ref={ref} className={`hx-${k}`} style={{ width: (size * W) / H, height: size, ...style }} {...props}>
      <style>{css}</style>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" role="img" aria-label="Animated DNA double helix">
        {items.map(({ y, phase }, i) => {
          const dx = `-${phase}s`;
          const dd = `-${(phase + T / 4) % T}s`;
          const dr = `-${(phase % half)}s`;
          return (
            <g key={i}>
              <rect className="r" x={W / 2 - AMP} y={y - 1} width={AMP * 2} height={2} rx={1} fill="var(--color-stroke-strong, #9F9F9F)" style={{ animationDelay: dr }} />
              <g className="n" style={{ animationDelay: dx }}>
                <circle className="d" cx={W / 2} cy={y} r={8} fill="var(--color-brand-primary, #F57E20)" style={{ animationDelay: dd }} />
              </g>
              <g className="n b" style={{ animationDelay: dx }}>
                <circle className="d" cx={W / 2} cy={y} r={8} fill="var(--color-brand-tertiary, #476142)" style={{ animationDelay: dd }} />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
});

HelixAnimation.displayName = 'HelixAnimation';
