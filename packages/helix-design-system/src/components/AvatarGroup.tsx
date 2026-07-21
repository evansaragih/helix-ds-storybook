import { forwardRef } from 'react';
import { Plus } from 'lucide-react';
import { Avatar, type AvatarSize } from './Avatar';

export interface AvatarGroupItem {
  id: string | number;
  name?: string;
  src?: string;
  alt?: string;
}

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AvatarGroupItem[];
  size?: AvatarSize;
  /** Max avatars to render before collapsing the rest into a "+N" badge */
  max?: number;
  showAddButton?: boolean;
  addButtonShape?: 'circle' | 'square';
  onAddClick?: () => void;
}

const SIZES: Record<AvatarSize, { diameter: number; overlap: number; fontSize: number }> = {
  xs: { diameter: 26, overlap: 10, fontSize: 11 },
  sm: { diameter: 38, overlap: 14, fontSize: 13 },
  md: { diameter: 48, overlap: 18, fontSize: 14 },
  lg: { diameter: 58, overlap: 22, fontSize: 16 },
};

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
  items,
  size = 'sm',
  max,
  showAddButton = false,
  addButtonShape = 'circle',
  onAddClick,
  style,
  ...props
}, ref) => {
  const cfg = SIZES[size];
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? Math.max(0, items.length - max) : 0;

  const ring = { boxShadow: '0 0 0 2px var(--color-surface, #FFFFFF)' };

  return (
    <div
      ref={ref}
      style={{ display: 'inline-flex', alignItems: 'center', ...style }}
      {...props}
    >
      {visible.map((item, i) => (
        <div
          key={item.id}
          style={{
            marginLeft: i === 0 ? 0 : -cfg.overlap,
            borderRadius: '50%',
            ...ring,
            position: 'relative',
            zIndex: visible.length - i,
          }}
        >
          <Avatar size={size} src={item.src} alt={item.alt} name={item.name} content={item.src ? 'image' : 'placeholder'} />
        </div>
      ))}

      {overflow > 0 && (
        <div
          style={{
            marginLeft: -cfg.overlap,
            width: cfg.diameter,
            height: cfg.diameter,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-brand-primary, #F57E20)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-family-body)',
            fontWeight: 500,
            fontSize: cfg.fontSize,
            position: 'relative',
            zIndex: 0,
            ...ring,
          }}
        >
          +{overflow}
        </div>
      )}

      {showAddButton && (
        <button
          type="button"
          onClick={onAddClick}
          aria-label="Add user"
          style={{
            marginLeft: (visible.length > 0 || overflow > 0) ? -cfg.overlap : 0,
            width: cfg.diameter,
            height: cfg.diameter,
            borderRadius: addButtonShape === 'circle' ? '50%' : 8,
            border: '1.5px dashed var(--color-stroke-neutral, #D7D7D7)',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-text-tertiary, #828282)',
            position: 'relative',
            zIndex: 0,
            flexShrink: 0,
          }}
        >
          <Plus size={Math.round(cfg.diameter * 0.4)} />
        </button>
      )}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
