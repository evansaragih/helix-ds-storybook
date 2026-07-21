import { forwardRef } from 'react';
import { Avatar } from './Avatar';

export type AvatarLabelGroupSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarLabelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  email?: string;
  src?: string;
  size?: AvatarLabelGroupSize;
}

interface SizeConfig {
  avatarSize: 'xs' | 'sm' | 'md' | 'lg';
  nameFontSize: number;
  emailFontSize: number;
  gap: number;
}

const SIZES: Record<AvatarLabelGroupSize, SizeConfig> = {
  sm: { avatarSize: 'xs', nameFontSize: 13, emailFontSize: 12, gap: 8 },
  md: { avatarSize: 'sm', nameFontSize: 14, emailFontSize: 13, gap: 10 },
  lg: { avatarSize: 'md', nameFontSize: 16, emailFontSize: 13, gap: 12 },
  xl: { avatarSize: 'lg', nameFontSize: 18, emailFontSize: 14, gap: 14 },
};

export const AvatarLabelGroup = forwardRef<HTMLDivElement, AvatarLabelGroupProps>(({
  name,
  email,
  src,
  size = 'md',
  style,
  ...props
}, ref) => {
  const cfg = SIZES[size];

  return (
    <div
      ref={ref}
      style={{ display: 'inline-flex', alignItems: 'center', gap: cfg.gap, ...style }}
      {...props}
    >
      <Avatar size={cfg.avatarSize} src={src} name={name} content={src ? 'image' : 'placeholder'} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span style={{
          fontFamily: 'var(--font-family-body)',
          fontWeight: 600,
          fontSize: cfg.nameFontSize,
          lineHeight: 1.3,
          color: 'var(--color-text-primary, #14141E)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {name}
        </span>
        {email && (
          <span style={{
            fontFamily: 'var(--font-family-body)',
            fontWeight: 400,
            fontSize: cfg.emailFontSize,
            lineHeight: 1.3,
            color: 'var(--color-text-tertiary, #828282)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {email}
          </span>
        )}
      </div>
    </div>
  );
});

AvatarLabelGroup.displayName = 'AvatarLabelGroup';
