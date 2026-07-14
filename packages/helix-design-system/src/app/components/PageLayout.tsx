import { useState, useEffect, useRef, ReactNode } from 'react';
import colorHeroBg from '../../assets/hero/color-hero-bg.png';
import colorHeroIllustration from '../../assets/hero/color-hero-illustration.png';

export interface TocItem {
  id: string;
  label: string;
}

interface PageLayoutProps {
  category: string;
  title: string;
  description: string;
  tocItems: TocItem[];
  children: ReactNode;
}

export function PageLayout({ category, title, description, tocItems, children }: PageLayoutProps) {
  const [activeAnchor, setActiveAnchor] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [tocItems]);

  return (
    <div>
      {/* Hero */}
      <div style={{
        margin: '-32px -32px 32px',
        height: '280px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px 16px 0 0',
        backgroundColor: '#F57E20'
      }}>
        <img
          src={colorHeroBg}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '339.23%',
            top: '-119.62%',
            objectFit: 'cover',
            mixBlendMode: 'lighten',
            pointerEvents: 'none'
          }}
        />
        <img
          src={colorHeroIllustration}
          alt=""
          style={{
            position: 'absolute',
            right: '-46px',
            top: '-6px',
            height: '509px',
            width: '749px',
            objectFit: 'cover',
            mixBlendMode: 'soft-light',
            pointerEvents: 'none'
          }}
        />
        <div style={{
          position: 'relative',
          zIndex: 1,
          padding: '48px 80px',
          maxWidth: '50%'
        }}>
          <p style={{
            margin: '0 0 8px',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '19.2px'
          }}>
            {category}
          </p>
          <h1 style={{
            margin: '0 0 16px',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            color: 'white',
            lineHeight: '1.2'
          }}>
            {title}
          </h1>
          <p style={{
            margin: 0,
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: '1.6',
            maxWidth: '360px'
          }}>
            {description}
          </p>
        </div>
      </div>

      {/* Body: content + On This Page */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', padding: '40px 48px' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {children}
        </div>

        <div style={{ width: '160px', flexShrink: 0, position: 'sticky', top: '120px' }}>
          <p style={{
            margin: '0 0 12px',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            color: '#14141e'
          }}>
            On This Page
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {tocItems.map(({ id, label }) => {
              const isActive = activeAnchor === id;
              return (
                <button
                  key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '4px 0',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: isActive ? '#F57E20' : '#828282',
                    transition: 'color 0.15s'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: '48px', scrollMarginTop: '160px' }}>
      <h2 style={{
        margin: '0 0 24px',
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 600,
        fontSize: '22px',
        color: '#14141e'
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
