import { forwardRef } from 'react';
import { Dot } from './Dot';
import type { DotSize } from './Dot';

/** Figma Size — XXSmall 13 · XSmall 24 · Small 36 · Medium 48 · Large 58 */
export type AvatarSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
/** Figma Shape — Rounded (default) or Circular */
export type AvatarShape = 'rounded' | 'circular';
/** Figma Content */
export type AvatarContent = 'image' | 'icon' | 'placeholder';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  content?: AvatarContent;
  /** 1px ring around the avatar; adds 2px to each side (Figma Border) */
  border?: boolean;
  /** Presence dot on the bottom-right corner (Figma Status). Use either this or `companyLogo`. */
  status?: boolean;
  /** Small logo / icon tile on the bottom-right corner (Figma Company logo). Use either this or `status`. */
  companyLogo?: React.ReactNode;
  /** Image URL for content 'image' */
  src?: string;
  alt?: string;
  /** Initials for the placeholder (max 2 chars); derived from `name` when omitted */
  initials?: string;
  /** Full name — used for placeholder initials */
  name?: string;
  /** Icon node for content 'icon' */
  icon?: React.ReactNode;
}

interface SizeConfig { box: number; font: number; icon: number; radius: number; dot: DotSize; dotPx: number; logo: number }

const SIZES: Record<AvatarSize, SizeConfig> = {
  xxs: { box: 13, font: 7,  icon: 8,  radius: 4.27, dot: 'sm', dotPx: 6,  logo: 10 },
  xs:  { box: 24, font: 13, icon: 12, radius: 8,    dot: 'sm', dotPx: 6,  logo: 10 },
  sm:  { box: 36, font: 13, icon: 14, radius: 8,    dot: 'lg', dotPx: 10, logo: 14 },
  md:  { box: 48, font: 16, icon: 18, radius: 8,    dot: 'xl', dotPx: 12, logo: 16 },
  lg:  { box: 58, font: 20, icon: 22, radius: 8,    dot: '2xl', dotPx: 16, logo: 18 },
};

function getInitials(name?: string, initials?: string): string {
  if (initials) return initials.slice(0, 2).toUpperCase();
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** A person or entity avatar — image, icon or initials — with an optional presence dot or company-logo overlay. */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  size = 'md',
  shape = 'rounded',
  content = 'placeholder',
  border = false,
  status = false,
  companyLogo,
  src,
  alt = '',
  initials,
  name,
  icon,
  style,
  ...props
}, ref) => {
  const cfg = SIZES[size];
  const radius = shape === 'circular' ? 9999 : cfg.radius;

  const face: React.CSSProperties = {
    width: cfg.box, height: cfg.box, borderRadius: radius, overflow: 'hidden',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  };

  let inner: React.ReactNode;
  if (content === 'image' && src) {
    inner = <div style={face}><img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>;
  } else if (content === 'icon' && icon) {
    inner = (
      <div style={{ ...face, backgroundColor: 'var(--color-container-tertiary, #EEEEEE)', color: 'var(--color-text-tertiary, #828282)' }}>
        <span style={{ display: 'flex', width: cfg.icon, height: cfg.icon }}>{icon}</span>
      </div>
    );
  } else {
    inner = (
      <div style={{ ...face, backgroundColor: 'var(--color-brand-primary-hover, #DF6505)' }}>
        <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: cfg.font, lineHeight: 1, color: '#FFFFFF', letterSpacing: '-0.01em', userSelect: 'none' }}>
          {getInitials(name, initials)}
        </span>
      </div>
    );
  }

  const ringed = border ? 2 : 0;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexShrink: 0,
        width: cfg.box + ringed * 2,
        height: cfg.box + ringed * 2,
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        borderRadius: radius + ringed,
        backgroundColor: border ? 'var(--color-container-primary, #FFFFFF)' : undefined,
        boxShadow: border ? 'inset 0 0 0 1px var(--color-stroke-subtle, #EEEEEE)' : undefined,
        ...style,
      }}
      {...props}
    >
      {inner}
      {status && !companyLogo && (
        <span style={{ position: 'absolute', right: ringed, bottom: ringed, display: 'flex' }}>
          <Dot color="success" size={cfg.dot} ring />
        </span>
      )}
      {companyLogo && (
        <span style={{
          position: 'absolute', right: ringed, bottom: ringed, width: cfg.logo, height: cfg.logo, borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxSizing: 'border-box',
          backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)', border: '1px solid #FFFFFF',
        }}>
          {companyLogo}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';
