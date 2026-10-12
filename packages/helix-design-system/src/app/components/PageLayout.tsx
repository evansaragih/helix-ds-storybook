import { useState, useEffect, useRef, ReactNode } from 'react';
import helixMark from '../../assets/logo/helix-mark.svg';
import { Badge } from '../../components/Badge';

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
      <header className="dx-hero">
        <img className="dx-hero-mark" src={helixMark} alt="" />
        <nav className="dx-crumbs" aria-label="Breadcrumb">
          <Badge label={category} color="brand" appearance="subtle" size="sm" />
          <span aria-hidden>/</span>
          <span>{title}</span>
        </nav>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <div className="dx-body">
        <div className="dx-content">{children}</div>

        {tocItems.length > 0 && (
          <aside className="dx-toc" aria-label="On this page">
            <p className="dx-toc-title">On this page</p>
            {tocItems.map(({ id, label }) => (
              <button
                key={id}
                aria-current={activeAnchor === id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              >
                {label}
              </button>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="dx-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
