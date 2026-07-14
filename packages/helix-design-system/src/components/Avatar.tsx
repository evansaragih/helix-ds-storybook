import { forwardRef } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarShape = 'circular' | 'rounded';
export type AvatarContent = 'image' | 'icon' | 'placeholder';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  /** 'image' = src required; 'icon' = icon required; 'placeholder' = shows initials */
  content?: AvatarContent;
  src?: string;
  alt?: string;
  /** Initials to show for placeholder (max 2 chars, auto-derived from name if name given) */
  initials?: string;
  /** Full name — auto-generates initials from first + last word */
  name?: string;
  /** Icon node for content=icon */
  icon?: React.ReactNode;
}

interface SizeConfig {
  size: number;
  fontSize: number;
  iconSize: number;
  radius: number;
  roundedRadius: number;
}

const SIZES: Record<AvatarSize, SizeConfig> = {
  xs: { size: 26, fontSize: 13, iconSize: 12, radius: 9999, roundedRadius: 8 },
  sm: { size: 38, fontSize: 13, iconSize: 14, radius: 9999, roundedRadius: 8 },
  md: { size: 48, fontSize: 20, iconSize: 18, radius: 9999, roundedRadius: 8 },
  lg: { size: 58, fontSize: 20, iconSize: 22, radius: 9999, roundedRadius: 8 },
};

function getInitials(name?: string, initials?: string): string {
  if (initials) return initials.slice(0, 2).toUpperCase();
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  size = 'md',
  shape = 'circular',
  content = 'placeholder',
  src,
  alt = '',
  initials,
  name,
  icon,
  style,
  className,
  ...props
}, ref) => {
  const cfg = SIZES[size];
  const radius = shape === 'circular' ? cfg.radius : cfg.roundedRadius;

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: cfg.size,
    height: cfg.size,
    borderRadius: radius,
    flexShrink: 0,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'var(--color-container-tertiary, #EEEEEE)',
    ...style,
  };

  if (content === 'image' && src) {
    return (
      <div ref={ref} style={base} className={className} {...props}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  if (content === 'icon' && icon) {
    return (
      <div ref={ref} style={base} className={className} {...props}>
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: cfg.iconSize, height: cfg.iconSize, color: 'var(--color-text-tertiary, #828282)',
        }}>
          {icon}
        </span>
      </div>
    );
  }

  // Placeholder: initials on brand-colored background
  const text = getInitials(name, initials);
  return (
    <div
      ref={ref}
      style={{
        ...base,
        backgroundColor: 'var(--color-brand-primary, #F57E20)',
      }}
      className={className}
      {...props}
    >
      <span style={{
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 500,
        fontSize: cfg.fontSize,
        lineHeight: 1,
        color: '#FFFFFF',
        letterSpacing: '-0.01em',
        userSelect: 'none',
      }}>
        {text}
      </span>
    </div>
  );
});

Avatar.displayName = 'Avatar';
