/**
 * JS mirror of the --motion-* tokens in theme.css. Components reference the
 * CSS vars directly inside inline `transition`/`animation` strings; these
 * numeric constants exist only for setTimeout-based unmount delays, which
 * can't read var(). Keep both in sync by hand if the tokens change.
 */
export const MOTION_DURATION_FAST = 160;
export const MOTION_DURATION_BASE = 200;
export const MOTION_DURATION_SLOW = 280;

export const MOTION_EASING_STANDARD = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const MOTION_EASING_DECELERATE = 'cubic-bezier(0.32, 0.72, 0, 1)';
