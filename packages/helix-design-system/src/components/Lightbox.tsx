import { forwardRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export type LightboxLayout = 'image' | 'image-caption' | 'gallery-strip';

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface LightboxProps {
  open: boolean;
  onClose: () => void;
  images: LightboxImage[];
  /** Index of the image to show first (default 0) */
  initialIndex?: number;
  /** image = photo only; image-caption = title + description under the photo; gallery-strip = photo + thumbnail row */
  layout?: LightboxLayout;
  /** Show previous / next buttons (hidden automatically for a single image) */
  showNavigation?: boolean;
}

const circleButton: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 36, height: 36, padding: 0, borderRadius: 9999, cursor: 'pointer',
};

/** A full-size photo preview on a dark scrim, with a close button and optional previous / next navigation. */
export const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(({
  open,
  onClose,
  images,
  initialIndex = 0,
  layout = 'image',
  showNavigation = true,
}, ref) => {
  const [index, setIndex] = useState(initialIndex);
  const count = images.length;

  useEffect(() => { if (open) setIndex(initialIndex); }, [open, initialIndex]);

  const step = (d: number) => setIndex((i) => (i + d + count) % count);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && count > 1) step(-1);
      if (e.key === 'ArrowRight' && count > 1) step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, count]);

  if (!open || count === 0) return null;
  const current = images[index];
  const nav = showNavigation && count > 1;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={current.title ?? current.alt ?? 'Image preview'}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'rgba(20,20,30,0.7)',
      }}
    >
      <button
        aria-label="Close preview"
        onClick={onClose}
        style={{ ...circleButton, position: 'absolute', top: 24, right: 24, border: 'none', backgroundColor: 'rgba(255,255,255,0.5)', color: '#14141E' }}
      >
        <X size={16} />
      </button>

      {nav && (
        <button aria-label="Previous image" onClick={() => step(-1)}
          style={{ ...circleButton, position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', border: '1px solid var(--color-stroke-subtle, #EEEEEE)', backgroundColor: '#FFFFFF', color: '#14141E' }}>
          <ChevronLeft size={16} />
        </button>
      )}
      {nav && (
        <button aria-label="Next image" onClick={() => step(1)}
          style={{ ...circleButton, position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', border: '1px solid var(--color-stroke-subtle, #EEEEEE)', backgroundColor: '#FFFFFF', color: '#14141E' }}>
          <ChevronRight size={16} />
        </button>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 'min(960px, 80vw)' }}>
        <img
          src={current.src}
          alt={current.alt ?? ''}
          style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 12, display: 'block' }}
        />

        {layout === 'image-caption' && (current.title || current.description) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: '#FFFFFF' }}>
            {current.title && (
              <p style={{ margin: 0, fontFamily: 'var(--font-family-heading, Rubik, sans-serif)', fontWeight: 700, fontSize: 31, lineHeight: '38px' }}>{current.title}</p>
            )}
            {current.description && (
              <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px' }}>{current.description}</p>
            )}
          </div>
        )}

        {layout === 'gallery-strip' && count > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {images.map((img, i) => (
              <button
                key={i}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                style={{
                  width: 64, height: 48, padding: 0, borderRadius: 6, overflow: 'hidden', cursor: 'pointer',
                  border: i === index ? '2px solid var(--color-brand-primary, #F57E20)' : '2px solid transparent',
                  opacity: i === index ? 1 : 0.6, background: 'none',
                }}
              >
                <img src={img.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

Lightbox.displayName = 'Lightbox';
