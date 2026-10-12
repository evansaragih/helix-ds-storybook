import { Search, PanelLeft } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Input } from '../../components/Input';
import { IconButton } from '../../components/IconButton';
import { foundationItems, componentItems } from '../data/navigation';

interface HeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSectionChange: (section: string) => void;
}

const searchItems = [
  ...foundationItems.map((item) => ({ ...item, group: 'Foundations' })),
  ...componentItems.map((item) => ({ ...item, group: 'Components' })),
];

export function Header({ isCollapsed, onToggleCollapse, onSectionChange }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return searchItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [searchQuery]);

  const close = () => { setIsSearchOpen(false); setSearchQuery(''); setHighlight(0); };
  const choose = (id: string) => { onSectionChange(id); close(); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        containerRef.current?.querySelector('input')?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isSearchOpen]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight((h) => Math.min(h + 1, results.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && results[highlight]) choose(results[highlight].id);
    else if (e.key === 'Escape') { close(); (e.target as HTMLElement).blur(); }
  };

  return (
    <header className="dx-header" style={{ left: isCollapsed ? 64 : 248 }}>
      <IconButton
        hierarchy="secondary"
        appearance="ghost"
        size="sm"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        icon={<PanelLeft size={18} />}
        onClick={onToggleCollapse}
      />

      <div ref={containerRef} style={{ flex: 1, maxWidth: 480, position: 'relative' }}>
        <Input
          placeholder="Search documentation…"
          aria-label="Search documentation"
          leading={<Search size={16} />}
          trailing={<span className="dx-kbd">{isMac ? '⌘' : 'Ctrl'} K</span>}
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setHighlight(0); }}
          onFocus={() => setIsSearchOpen(true)}
          onKeyDown={onInputKey}
        />
        {isSearchOpen && (
          <div className="dx-results" role="listbox">
            {results.length === 0 && <div className="dx-result-group">No results</div>}
            {results.map((item, i) => (
              <div key={item.id}>
                {(i === 0 || results[i - 1].group !== item.group) && <div className="dx-result-group">{item.group}</div>}
                <button
                  className="dx-result"
                  role="option"
                  aria-selected={i === highlight}
                  data-active={i === highlight}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => choose(item.id)}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
