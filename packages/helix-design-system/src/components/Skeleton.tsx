import { forwardRef } from 'react';

export type SkeletonShape = 'text' | 'title' | 'circle' | 'rectangle';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape;
  /** Override the shape's default width */
  width?: number | string;
  /** Override the shape's default height */
  height?: number | string;
}

const SHAPES: Record<SkeletonShape, { width: number; height: number; radius: number | string }> = {
  text:      { width: 200, height: 12,  radius: 4 },
  title:     { width: 160, height: 20,  radius: 4 },
  circle:    { width: 40,  height: 40,  radius: 9999 },
  rectangle: { width: 200, height: 120, radius: 8 },
};

/** A neutral placeholder block standing in for content while it loads. Compose several to mirror the final layout; use Spinner when the layout is unknown. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({
  shape = 'text',
  width,
  height,
  style,
  ...props
}, ref) => {
  const s = SHAPES[shape];
  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        width: width ?? s.width,
        height: height ?? s.height,
        borderRadius: s.radius,
        backgroundColor: 'var(--color-container-tertiary, #EEEEEE)',
        flexShrink: 0,
        ...style,
      }}
      {...props}
    />
  );
});

Skeleton.displayName = 'Skeleton';
