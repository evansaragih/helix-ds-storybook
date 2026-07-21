import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import helixMarkSvg from '../../assets/logo/helix-mark.svg';
import { foundationItems, componentItems } from '../data/navigation';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
}

export function Sidebar({ activeSection, onSectionChange, isCollapsed }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['foundations']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const quickAccessItems: { label: string; id: string }[] = [];

  const isFoundationsExpanded = expandedSections.has('foundations');
  const isComponentsExpanded = expandedSections.has('components');

  return (
    <aside
      className="fixed left-0 top-0 h-screen overflow-hidden"
      style={{
        width: isCollapsed ? '64px' : '240px',
        borderRight: '1px solid #d7d7d7',
        backgroundColor: 'white',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Logo */}
      <div 
        onClick={() => onSectionChange('overview')}
        style={{
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexShrink: 0,
        cursor: 'pointer'
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          flexShrink: 0
        }}>
          <img src={helixMarkSvg} alt="Helix" style={{ width: '100%', height: '100%' }} />
        </div>
        {!isCollapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{
              fontFamily: 'var(--font-family-heading)',
              fontWeight: 700,
              fontSize: '20px',
              color: '#14141E',
              letterSpacing: '-0.3px',
              display: 'block',
            }}>
              helix
            </span>
          </div>
        )}
      </div>

      <nav style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flex: 1,
        padding: '0 16px 16px',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}>
        {/* Quick Access */}
        {!isCollapsed && quickAccessItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{
              margin: '0 0 4px 8px',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500, fontSize: '10px',
              color: '#9CA3AF', letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              Quick Access
            </p>
            {quickAccessItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '7px 10px',
                    borderRadius: '6px', border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: '13px',
                    color: isActive ? 'white' : '#F57E20',
                    backgroundColor: isActive ? '#F57E20' : 'rgba(245,126,32,0.08)',
                    width: '100%', textAlign: 'left',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(245,126,32,0.14)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(245,126,32,0.08)'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
                  </svg>
                  {item.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Foundations Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={() => toggleSection('foundations')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 8px',
              borderRadius: '6px',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500,
              fontSize: '13px',
              color: '#14141e',
              backgroundColor: 'white',
              letterSpacing: '-0.13px',
              lineHeight: '19.2px',
              gap: '8px',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M12.6667 2H3.33333C2.97971 2 2.64057 2.14048 2.39052 2.39052C2.14048 2.64057 2 2.97971 2 3.33333V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2ZM11.3333 8.66667H8.66667V11.3333H7.33333V8.66667H4.66667V7.33333H7.33333V4.66667H8.66667V7.33333H11.3333V8.66667Z" fill="#3A3A3B"/>
            </svg>
            {!isCollapsed && (
              <>
                <span style={{ flex: 1, textAlign: 'left' }}>Foundations</span>
                {isFoundationsExpanded
                  ? <ChevronDown size={16} color="#14141e" />
                  : <ChevronRight size={16} color="#14141e" />
                }
              </>
            )}
          </button>
          {(isFoundationsExpanded && !isCollapsed) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {foundationItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      height: '36px',
                      alignItems: 'center',
                      paddingLeft: isCollapsed ? '0' : '24px',
                      paddingRight: '0',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      position: 'relative'
                    }}
                  >
                    {!isCollapsed && (
                      <div style={{
                        position: 'absolute',
                        left: '16px',
                        top: 0,
                        width: '1px',
                        height: '36px',
                        backgroundColor: '#d7d7d7',
                        borderRadius: '16px'
                      }} />
                    )}
                    <button
                      onClick={() => onSectionChange(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '36px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        width: isCollapsed ? '100%' : '202px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-family-body)',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '19.2px',
                        letterSpacing: '-0.01px',
                        color: isActive ? 'white' : '#14141e',
                        backgroundColor: isActive ? '#58595b' : 'white',
                        transition: 'background-color 0.15s ease, color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      {!isCollapsed && item.label}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Components Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={() => toggleSection('components')}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 8px',
              borderRadius: '6px',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500,
              fontSize: '13px',
              color: '#14141e',
              backgroundColor: 'white',
              letterSpacing: '-0.13px',
              lineHeight: '19.2px',
              gap: '8px',
              justifyContent: isCollapsed ? 'center' : 'flex-start'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M6.38399 0.157345C3.27774 0.763595 0.774619 3.26047 0.162119 6.35734C-0.994131 12.2011 4.27774 16.5573 8.24962 15.9417C9.53712 15.7417 10.1684 14.2355 9.57774 13.0761C8.85587 11.6573 9.88712 10.0011 11.4809 10.0011H13.9715C15.0902 10.0011 15.9965 9.07609 15.9996 7.96047C15.984 3.03547 11.5027 -0.83953 6.38399 0.157345ZM2.99962 10.0011C2.44649 10.0011 1.99962 9.55422 1.99962 9.00109C1.99962 8.44797 2.44649 8.00109 2.99962 8.00109C3.55274 8.00109 3.99962 8.44797 3.99962 9.00109C3.99962 9.55422 3.55274 10.0011 2.99962 10.0011ZM3.99962 6.00109C3.44649 6.00109 2.99962 5.55422 2.99962 5.00109C2.99962 4.44797 3.44649 4.0011 3.99962 4.0011C4.55274 4.0011 4.99962 4.44797 4.99962 5.00109C4.99962 5.55422 4.55274 6.00109 3.99962 6.00109ZM7.99962 4.0011C7.44649 4.0011 6.99962 3.55422 6.99962 3.0011C6.99962 2.44797 7.44649 2.0011 7.99962 2.0011C8.55274 2.0011 8.99962 2.44797 8.99962 3.0011C8.99962 3.55422 8.55274 4.0011 7.99962 4.0011ZM11.9996 6.00109C11.4465 6.00109 10.9996 5.55422 10.9996 5.00109C10.9996 4.44797 11.4465 4.0011 11.9996 4.0011C12.5527 4.0011 12.9996 4.44797 12.9996 5.00109C12.9996 5.55422 12.5527 6.00109 11.9996 6.00109Z" fill="#3A3A3B"/>
            </svg>
            {!isCollapsed && (
              <>
                <span style={{ flex: 1, textAlign: 'left' }}>Components</span>
                {isComponentsExpanded
                  ? <ChevronDown size={16} color="#14141e" />
                  : <ChevronRight size={16} color="#14141e" />
                }
              </>
            )}
          </button>
          {(isComponentsExpanded && !isCollapsed) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
              {componentItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      height: '36px',
                      alignItems: 'center',
                      paddingLeft: isCollapsed ? '0' : '24px',
                      paddingRight: '0',
                      paddingTop: '6px',
                      paddingBottom: '6px',
                      position: 'relative'
                    }}
                  >
                    {!isCollapsed && (
                      <div style={{
                        position: 'absolute',
                        left: '16px',
                        top: 0,
                        width: '1px',
                        height: '36px',
                        backgroundColor: '#d7d7d7',
                        borderRadius: '16px'
                      }} />
                    )}
                    <button
                      onClick={() => onSectionChange(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '36px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        border: 'none',
                        width: isCollapsed ? '100%' : '202px',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-family-body)',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '19.2px',
                        letterSpacing: '-0.01px',
                        color: isActive ? 'white' : '#14141e',
                        backgroundColor: isActive ? '#58595b' : 'white',
                        transition: 'background-color 0.15s ease, color 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = '#f5f5f5';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      {!isCollapsed && item.label}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* User card at bottom */}
      <div style={{ padding: '12px', flexShrink: 0 }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #eee',
          borderRadius: '8px',
          padding: '12px 12px 8px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingBottom: '4px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: '#f57e20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: 'white',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 500,
              fontSize: '16px'
            }}>
              E
            </div>
            {!isCollapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 400,
                  fontSize: '13px',
                  lineHeight: '19.2px',
                  color: '#14141e',
                  letterSpacing: '-0.01px'
                }}>
                  Evan Himawan
                </p>
                <p style={{
                  margin: 0,
                  fontFamily: 'var(--font-family-body)',
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '15.6px',
                  color: '#828282',
                  letterSpacing: '-0.01px'
                }}>
                  evan@helix.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
