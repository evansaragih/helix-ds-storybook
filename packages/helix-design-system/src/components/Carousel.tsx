import { forwardRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from './IconButton';

/** Figma Layout */
export type CarouselLayout = 'single' | 'center-peek' | 'row-cards' | 'stack-peek' | 'split-feature';
/** Figma _page-indicator Appearance */
export type CarouselIndicator = 'dots' | 'dots-inverse' | 'progress' | 'bar' | 'track';

export interface CarouselSlide {
  id: string;
  /** Background image URL */
  image: string;
  alt?: string;
  /** Card title (Figma Carousel Card title) / Split Feature heading */
  title?: string;
  /** Card description / Split Feature body */
  description?: string;
  /** Split Feature — small label above the body and a bullet list under it */
  label?: string;
  bullets?: string[];
}

export interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  slides: CarouselSlide[];
  layout?: CarouselLayout;
  /** Page indicator style, or false to hide it (Figma Show Indicator). Defaults to 'dots'. */
  indicator?: CarouselIndicator | false;
  /** Show prev / next buttons (Figma Show Navigation) */
  showNavigation?: boolean;
  /** Controlled active slide (0-based) */
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}

const BRAND = 'var(--color-brand-primary, #F57E20)';

/** The Figma _page-indicator: Dots, Dots Inverse (dark surfaces), Progress, Bar and Track. */
function PageIndicator({ count, index, appearance }: { count: number; index: number; appearance: CarouselIndicator }) {
  const on = BRAND;
  const off = appearance === 'dots-inverse' ? 'rgba(255,255,255,0.8)' : 'var(--color-container-primary, #FFFFFF)';
  if (appearance === 'track') {
    return (
      <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13 }}>
        <span style={{ color: on }}>{index + 1}</span>
        <span style={{ width: 64, height: 1, backgroundColor: 'var(--color-stroke-subtle, #EEEEEE)' }} />
        <span style={{ color: 'var(--color-text-tertiary, #828282)' }}>{count}</span>
      </div>
    );
  }
  if (appearance === 'bar') {
    return <div aria-hidden="true" style={{ width: 120, height: 8, borderRadius: 9999, backgroundColor: off, overflow: 'hidden' }}><div style={{ width: `${((index + 1) / count) * 100}%`, height: '100%', backgroundColor: on, borderRadius: 9999, transition: 'width 0.2s' }} /></div>;
  }
  if (appearance === 'progress') {
    return <div aria-hidden="true" style={{ display: 'flex', gap: 0, width: 72 }}>{Array.from({ length: count }, (_, i) => <span key={i} style={{ flex: 1, height: 4, borderRadius: 9999, backgroundColor: i === index ? on : off }} />)}</div>;
  }
  const inverse = appearance === 'dots-inverse';
  return (
    <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', gap: inverse ? 6 : 4 }}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={{
          height: inverse ? (i === index ? 12 : 8) : 12, width: inverse ? (i === index ? 12 : 8) : i === index ? 40 : 12,
          borderRadius: 24, backgroundColor: i === index ? on : off, transition: 'width 0.2s',
        }} />
      ))}
    </div>
  );
}

const nav = (dir: -1 | 1, onClick: () => void, bordered: boolean) => (
  <IconButton
    key={dir}
    aria-label={dir === -1 ? 'Previous slide' : 'Next slide'}
    hierarchy="secondary"
    appearance={bordered ? 'solid' : 'subtle'}
    shape="pill"
    size="sm"
    icon={dir === -1 ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
    onClick={onClick}
  />
);

function Card({ slide, width, height, active = true, onClick }: { slide: CarouselSlide; width: number | string; height: number | string; active?: boolean; onClick?: () => void }) {
  const clickable = Boolean(onClick);
  return (
    <div
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick!(); } : undefined}
      style={{
        position: 'relative', flexShrink: 0, width, height, borderRadius: 12, overflow: 'hidden', boxSizing: 'border-box',
        backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'var(--color-container-tertiary, #EEEEEE)',
        cursor: clickable ? 'pointer' : 'default', opacity: active ? 1 : 0.9,
      }}
      aria-label={slide.alt ?? slide.title}
    >
      {(slide.title || slide.description) && (
        <>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '50%', background: 'linear-gradient(to top, rgba(20,20,30,0.7), rgba(20,20,30,0))' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 16, display: 'flex', flexDirection: 'column', gap: 4, color: '#FFFFFF' }}>
            {slide.title && <span style={{ fontFamily: 'var(--font-family-heading, Rubik, sans-serif)', fontWeight: 700, fontSize: 31, lineHeight: '38px' }}>{slide.title}</span>}
            {slide.description && <span style={{ fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px' }}>{slide.description}</span>}
          </div>
        </>
      )}
    </div>
  );
}

/** A set of slides shown one at a time or as a row of cards, with page indicator and prev / next navigation. Layouts: Single, Center Peek, Row Cards, Stack Peek and Split Feature. */
export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({
  slides,
  layout = 'single',
  indicator = 'dots',
  showNavigation = true,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  style,
  ...props
}, ref) => {
  const [internal, setInternal] = useState(defaultIndex);
  const count = slides.length;
  const index = Math.min(Math.max(controlled ?? internal, 0), Math.max(count - 1, 0));
  const go = (i: number) => {
    const next = (i + count) % count;
    if (controlled === undefined) setInternal(next);
    onIndexChange?.(next);
  };
  if (count === 0) return null;

  const dots = indicator !== false && <div style={{ display: 'flex', justifyContent: 'center' }}><PageIndicator count={count} index={index} appearance={indicator} /></div>;
  const at = (offset: number) => slides[(index + offset + count) % count];
  const root: React.CSSProperties = { position: 'relative', ...style };
  const side = (dir: -1 | 1, bordered: boolean): React.CSSProperties => ({ position: 'absolute', top: '50%', transform: 'translateY(-50%)', [dir === -1 ? 'left' : 'right']: 16, zIndex: 1, display: bordered ? 'flex' : 'flex' });

  if (layout === 'single') {
    return (
      <div ref={ref} style={{ ...root, display: 'flex', flexDirection: 'column', gap: 16, width: 592 }} {...props}>
        <div style={{ position: 'relative' }}>
          <Card slide={slides[index]} width="100%" height={348} />
          {showNavigation && <><span style={side(-1, false)}>{nav(-1, () => go(index - 1), false)}</span><span style={side(1, false)}>{nav(1, () => go(index + 1), false)}</span></>}
        </div>
        {dots}
      </div>
    );
  }

  if (layout === 'center-peek') {
    return (
      <div ref={ref} style={{ ...root, display: 'flex', flexDirection: 'column', gap: 16, width: 720 }} {...props}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, height: 348 }}>
          <Card slide={at(-1)} width={260} height={300} active={false} onClick={() => go(index - 1)} />
          <Card slide={at(0)} width={400} height={348} />
          <Card slide={at(1)} width={260} height={300} active={false} onClick={() => go(index + 1)} />
          {showNavigation && <><span style={side(-1, true)}>{nav(-1, () => go(index - 1), true)}</span><span style={side(1, true)}>{nav(1, () => go(index + 1), true)}</span></>}
        </div>
        {dots}
      </div>
    );
  }

  if (layout === 'row-cards') {
    return (
      <div ref={ref} style={{ ...root, display: 'flex', flexDirection: 'column', gap: 16, width: 720 }} {...props}>
        {showNavigation && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{nav(-1, () => go(index - 1), true)}{nav(1, () => go(index + 1), true)}</div>}
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 16, transform: `translateX(-${index * 240}px)`, transition: 'transform 0.3s ease' }}>
            {slides.map((s) => <Card key={s.id} slide={s} width={224} height={280} />)}
          </div>
        </div>
        {dots && <div style={{ display: 'flex' }}><PageIndicator count={count} index={index} appearance={indicator as CarouselIndicator} /></div>}
      </div>
    );
  }

  if (layout === 'stack-peek') {
    return (
      <div ref={ref} style={{ ...root, display: 'flex', flexDirection: 'column', gap: 16, width: 592 }} {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center' }}>
          {showNavigation && nav(-1, () => go(index - 1), true)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <Card slide={slides[index]} width={480} height={320} />
            {dots}
          </div>
          {showNavigation && nav(1, () => go(index + 1), true)}
        </div>
        {count > 1 && (
          <div style={{ position: 'relative', height: 150, width: 300, margin: '0 auto' }}>
            {[1, 2, 3].filter((o) => o < count).map((o, k) => (
              <div key={o} style={{ position: 'absolute', left: 10 + k * 75, top: 20 - k * 10 }}>
                <Card slide={at(o)} width={130} height={120} active={false} onClick={() => go(index + o)} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // split-feature
  const current = slides[index];
  return (
    <div ref={ref} style={{ ...root, display: 'flex', gap: 40, padding: 64, borderRadius: 12, boxSizing: 'border-box', backgroundColor: '#3A3A3B', color: '#FFFFFF', width: '100%', maxWidth: 1200 }} {...props}>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {current.title && <h3 style={{ margin: 0, fontFamily: 'var(--font-family-heading, Rubik, sans-serif)', fontWeight: 700, fontSize: 39, lineHeight: '47px' }}>{current.title}</h3>}
          {current.label && <span style={{ fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 13, color: BRAND }}>{current.label}</span>}
          {current.description && <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 16, lineHeight: '24px' }}>{current.description}</p>}
          {current.bullets && <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--font-family-body)', fontSize: 16, lineHeight: '24px' }}>{current.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
        </div>
        {showNavigation && <div style={{ display: 'flex', gap: 8 }}>{nav(-1, () => go(index - 1), true)}{nav(1, () => go(index + 1), true)}</div>}
      </div>
      <div style={{ position: 'relative', width: 480, height: 480, flexShrink: 0 }}>
        {[2, 1, 0].filter((o) => o < count).map((o) => (
          <div key={o} style={{ position: 'absolute', left: o * 20, top: 30 + o * 30 - 30, zIndex: 3 - o }}>
            <Card slide={at(o)} width={400} height={420} />
          </div>
        ))}
      </div>
    </div>
  );
});

Carousel.displayName = 'Carousel';
