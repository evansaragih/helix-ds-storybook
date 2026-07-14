import React from 'react';
import demoVideo from '../../imports/Nusantics_Design_System_Document.mp4';

export function OverviewSection() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-48)',
        alignItems: 'center',
        marginBottom: 'var(--spacing-80)',
        minHeight: '500px'
      }}>
        {/* Left Content */}
        <div>
          <h1 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--text-display-large)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-24)',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.2'
          }}>
            Helix Design System
          </h1>

          <p style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--text-body-large)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-32)',
            lineHeight: '1.7',
            maxWidth: '480px'
          }}>
            Accelerate designer's and developer's workflow for a seamless and impactful user experience across all interfaces.
          </p>

          <button
            style={{
              backgroundColor: 'var(--color-brand-primary)',
              color: 'var(--color-text-on-primary)',
              padding: 'var(--spacing-16) var(--spacing-32)',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              fontSize: 'var(--text-body-default)',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 'var(--font-weight-semibold)',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(245, 126, 32, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#DF6505';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 126, 32, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-brand-primary)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 126, 32, 0.3)';
            }}
          >
            Discover more
          </button>
        </div>

        {/* Right Visual Elements */}
        <div style={{
          position: 'relative',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Overview Video */}
          <video
            src={demoVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>
      </div>

      {/* Components Section */}
      <div style={{ marginBottom: 'var(--spacing-64)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--spacing-48)',
          alignItems: 'center'
        }}>
          {/* Visual Preview */}
          <div style={{
            position: 'relative',
            height: '400px',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--spacing-32)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--color-border-default)'
          }}>
            {/* Yellow Badge */}
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              backgroundColor: '#F59E0B',
              color: '#FFFFFF',
              padding: 'var(--spacing-8) var(--spacing-16)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-body-small)',
              fontFamily: 'var(--font-family-body)',
              fontWeight: 'var(--font-weight-semibold)',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}>
              NEW
            </div>

            {/* Component Cards Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)', width: '100%', maxWidth: '300px' }}>
              {/* Card 1 */}
              <div style={{
                backgroundColor: '#3B82F6',
                padding: 'var(--spacing-16)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-12)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-md)'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-4)', width: '80%' }} />
                  <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 'var(--radius-sm)', width: '60%' }} />
                </div>
              </div>

              {/* Card 2 */}
              <div style={{
                backgroundColor: '#22C55E',
                padding: 'var(--spacing-16)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-12)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-md)'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-4)', width: '70%' }} />
                  <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 'var(--radius-sm)', width: '50%' }} />
                </div>
              </div>

              {/* Card 3 */}
              <div style={{
                backgroundColor: '#F57E20',
                padding: 'var(--spacing-16)',
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 8px 24px rgba(245, 126, 32, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-12)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 'var(--radius-md)'
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--spacing-4)', width: '75%' }} />
                  <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 'var(--radius-sm)', width: '55%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-family-heading)',
              fontSize: 'var(--text-heading-page-title)',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-20)',
              fontWeight: 'var(--font-weight-semibold)'
            }}>
              Components
            </h2>

            <p style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 'var(--text-body-large)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--spacing-24)',
              lineHeight: '1.7'
            }}>
              The reusable building blocks of our design framework. Crafted with flexibility, each component fulfills a distinct interaction or UI requirement, seamlessly combining to form cohesive patterns and intuitive user experiences.
            </p>

            <button
              style={{
                backgroundColor: 'var(--color-brand-primary)',
                color: 'var(--color-text-on-primary)',
                padding: 'var(--spacing-12) var(--spacing-24)',
                borderRadius: 'var(--radius-lg)',
                border: 'none',
                fontSize: 'var(--text-body-default)',
                fontFamily: 'var(--font-family-body)',
                fontWeight: 'var(--font-weight-medium)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#DF6505';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-brand-primary)';
              }}
            >
              Explore more
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <h2 style={{
        fontFamily: 'var(--font-family-heading)',
        fontSize: 'var(--text-heading-section-title)',
        color: 'var(--color-text-primary)',
        marginBottom: 'var(--spacing-24)',
        fontWeight: 'var(--font-weight-semibold)',
        textAlign: 'center'
      }}>
        Design System Foundations
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--spacing-24)',
        marginBottom: 'var(--spacing-48)'
      }}>
        <div style={{
          padding: 'var(--spacing-32)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border-default)',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto var(--spacing-16)',
            background: 'linear-gradient(135deg, #F57E20 0%, #DF6505 100%)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            🎨
          </div>
          <h3 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--text-heading-sub-section)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-12)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Color System
          </h3>
          <p style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--text-body-default)',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
            margin: 0
          }}>
            Comprehensive color palettes with semantic tokens and accessibility in mind.
          </p>
        </div>

        <div style={{
          padding: 'var(--spacing-32)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border-default)',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto var(--spacing-16)',
            background: 'linear-gradient(135deg, #58595B 0%, #393A3B 100%)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            ✍️
          </div>
          <h3 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--text-heading-sub-section)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-12)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Typography
          </h3>
          <p style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--text-body-default)',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
            margin: 0
          }}>
            Carefully crafted type scale with Quicksand and Rubik font families.
          </p>
        </div>

        <div style={{
          padding: 'var(--spacing-32)',
          backgroundColor: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--color-border-default)',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            margin: '0 auto var(--spacing-16)',
            background: 'linear-gradient(135deg, #476142 0%, #2E402A 100%)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            📐
          </div>
          <h3 style={{
            fontFamily: 'var(--font-family-heading)',
            fontSize: 'var(--text-heading-sub-section)',
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--spacing-12)',
            fontWeight: 'var(--font-weight-semibold)'
          }}>
            Spacing & Layout
          </h3>
          <p style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--text-body-default)',
            color: 'var(--color-text-secondary)',
            lineHeight: '1.6',
            margin: 0
          }}>
            Consistent spacing scale and layout primitives for harmonious designs.
          </p>
        </div>
      </div>
    </div>
  );
}
