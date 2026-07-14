import { Search, Sun, Moon, Monitor } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Command } from '../../components/Command';
import { Input } from '../../components/Input';
import { foundationItems, componentItems } from '../data/navigation';

interface HeaderProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onSectionChange: (section: string) => void;
}

const searchItems = [
  ...foundationItems.map(item => ({ ...item, group: 'Foundations' })),
  ...componentItems.map(item => ({ ...item, group: 'Components' })),
];

export function Header({ isCollapsed, onToggleCollapse, onSectionChange }: HeaderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  const currentTheme = themes.find(t => t.value === theme)!;
  const CurrentIcon = currentTheme.icon;

  useEffect(() => {
    if (!isSearchOpen) return;
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isSearchOpen]);

  return (
    <header
      className="fixed top-0 right-0 bg-white flex items-center z-10"
      style={{
        left: isCollapsed ? '64px' : '240px',
        height: '64px',
        borderBottom: '1px solid var(--color-stroke-subtle)',
        padding: '0 var(--spacing-32)',
        gap: 'var(--spacing-16)',
        transition: 'left 0.3s ease'
      }}
    >
      <button
        onClick={onToggleCollapse}
        className="flex items-center justify-center transition-colors"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'transparent',
          border: '1px solid var(--color-stroke-subtle)',
          cursor: 'pointer',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
          e.currentTarget.style.color = 'var(--color-text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--color-text-secondary)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3.5" y="3.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12.5 3.5V16.5" stroke="currentColor" strokeWidth="1.5"/>
          {isCollapsed ? (
            <path d="M7 7.5L9.5 10L7 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M9.5 7.5L7 10L9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          )}
        </svg>
      </button>

      {/* Search with Command dropdown */}
      <div className="flex-1" style={{ maxWidth: '448px', position: 'relative' }} ref={searchContainerRef}>
        <Input
          size="md"
          placeholder="Search documentation..."
          leadingContent={<Search size={16} />}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchOpen(true)}
        />

        {isSearchOpen && (
          <div style={{ position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 50 }}>
            <Command
              items={searchItems}
              value={searchQuery}
              onQueryChange={setSearchQuery}
              hideSearch
              width="100%"
              style={{ maxHeight: '360px', overflowY: 'auto' }}
              onSelect={(item) => {
                onSectionChange(item.id);
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
            />
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center transition-colors"
          style={{
            gap: 'var(--spacing-8)',
            padding: 'var(--spacing-8) var(--spacing-12)',
            border: '1px solid var(--color-stroke-subtle)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-body-default)',
            fontFamily: 'var(--font-family-body)',
            color: 'var(--color-text-primary)',
            backgroundColor: 'transparent',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <CurrentIcon className="w-4 h-4" />
          <span>{currentTheme.label}</span>
        </button>

        {isDropdownOpen && (
          <div
            className="absolute right-0 bg-white overflow-hidden"
            style={{
              marginTop: 'var(--spacing-8)',
              width: '160px',
              border: '1px solid var(--color-stroke-subtle)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    setTheme(t.value);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center transition-colors"
                  style={{
                    gap: 'var(--spacing-8)',
                    padding: 'var(--spacing-8) var(--spacing-16)',
                    fontSize: 'var(--text-body-default)',
                    fontFamily: 'var(--font-family-body)',
                    backgroundColor: isActive ? 'rgba(245, 126, 32, 0.1)' : 'transparent',
                    color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
