import { useState, useEffect, useRef } from 'react';
import colorHeroBg from '../../assets/hero/color-hero-bg.png';
import colorHeroIllustration from '../../assets/hero/color-hero-illustration.png';

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

const ColorCard = ({ shade, hex }: { shade: string; hex: string }) => (
  <div style={{
    borderRadius: '8px',
    border: '1px solid #eee',
    overflow: 'hidden',
    backgroundColor: 'white'
  }}>
    <div style={{ width: '100%', height: '80px', backgroundColor: hex }} />
    <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <p style={{
        margin: 0,
        fontFamily: 'Rubik, sans-serif',
        fontWeight: 600,
        fontSize: '13px',
        color: '#14141e',
        lineHeight: '1.4'
      }}>
        {shade}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282', fontWeight: 400 }}>HEX</span>
        <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#14141e', fontWeight: 400 }}>{hex}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#828282', fontWeight: 400 }}>RGB</span>
        <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '11px', color: '#14141e', fontWeight: 400 }}>{hexToRgb(hex)}</span>
      </div>
    </div>
  </div>
);

const PaletteSection = ({ id, name, colors }: { id: string; name: string; colors: Array<{ shade: string; hex: string }> }) => (
  <div id={id} style={{ marginBottom: '40px', scrollMarginTop: '160px' }}>
    <h3 style={{
      fontFamily: 'Rubik, sans-serif',
      fontWeight: 600,
      fontSize: '18px',
      color: '#14141e',
      marginBottom: '16px',
      marginTop: 0
    }}>
      {name}
    </h3>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px'
    }}>
      {colors.map((color) => (
        <ColorCard key={color.shade} shade={color.shade} hex={color.hex} />
      ))}
    </div>
  </div>
);

export function PrimitivesSection() {
  const [activeTab, setActiveTab] = useState<'brand' | 'system'>('brand');
  const [brandMode, setBrandMode] = useState<'nusantics' | 'cekolam' | 'causa'>('nusantics');
  const [activeAnchor, setActiveAnchor] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const nusanticsColors = {
    'Lively Orange': [
      { shade: '0', hex: '#FBFBFA' }, { shade: '5', hex: '#FEF2E9' },
      { shade: '10', hex: '#EADFD6' }, { shade: '20', hex: '#E0C3AC' },
      { shade: '30', hex: '#E3AA7D' }, { shade: '40', hex: '#EA9959' },
      { shade: '50', hex: '#F57E20' }, { shade: '60', hex: '#DF6505' },
      { shade: '70', hex: '#B35001' }, { shade: '80', hex: '#743808' },
      { shade: '90', hex: '#43230A' }, { shade: '100', hex: '#1F1208' }
    ],
    'Cool Grey': [
      { shade: '0', hex: '#F7F7F7' }, { shade: '5', hex: '#EEEEEE' },
      { shade: '10', hex: '#D7D7D7' }, { shade: '20', hex: '#BABABA' },
      { shade: '30', hex: '#9F9F9F' }, { shade: '40', hex: '#828282' },
      { shade: '50', hex: '#58595B' }, { shade: '60', hex: '#48494B' },
      { shade: '70', hex: '#393A3B' }, { shade: '80', hex: '#1C2434' },
      { shade: '90', hex: '#14171E' }, { shade: '100', hex: '#0B0C0E' }
    ],
    'Sustainable Green': [
      { shade: '0', hex: '#F6F7F6' }, { shade: '5', hex: '#ECEEEB' },
      { shade: '10', hex: '#D2DBD1' }, { shade: '20', hex: '#AFC4AB' },
      { shade: '30', hex: '#8BB583' }, { shade: '40', hex: '#5BAE4B' },
      { shade: '50', hex: '#476142' }, { shade: '60', hex: '#3E5639' },
      { shade: '70', hex: '#2E402A' }, { shade: '80', hex: '#1D301A' },
      { shade: '90', hex: '#141B12' }, { shade: '100', hex: '#0A0D0A' }
    ],
    'Navy Blue': [
      { shade: '0', hex: '#F5F5F6' }, { shade: '5', hex: '#E9EBED' },
      { shade: '10', hex: '#CED4D9' }, { shade: '20', hex: '#A6B6C2' },
      { shade: '30', hex: '#7C9BB2' }, { shade: '40', hex: '#467AA2' },
      { shade: '50', hex: '#2B485E' }, { shade: '60', hex: '#254054' },
      { shade: '70', hex: '#1D3445' }, { shade: '80', hex: '#14202A' },
      { shade: '90', hex: '#0D1419' }, { shade: '100', hex: '#070A0C' }
    ],
    'Pale Green': [
      { shade: '0', hex: '#FEFEFE' }, { shade: '5', hex: '#FAFAF9' },
      { shade: '10', hex: '#EDEEEA' }, { shade: '20', hex: '#D9DED0' },
      { shade: '30', hex: '#C6D1B2' }, { shade: '40', hex: '#AFC982' },
      { shade: '50', hex: '#D2DBC3' }, { shade: '60', hex: '#AFC093' },
      { shade: '70', hex: '#8FA766' }, { shade: '80', hex: '#647941' },
      { shade: '90', hex: '#3D462E' }, { shade: '100', hex: '#1E2218' }
    ],
    'Dusty Blue': [
      { shade: '0', hex: '#FEFEFE' }, { shade: '5', hex: '#F9FAFA' },
      { shade: '10', hex: '#E4E7EA' }, { shade: '20', hex: '#C8CED9' },
      { shade: '30', hex: '#AEBACF' }, { shade: '40', hex: '#829DC9' },
      { shade: '50', hex: '#A8B1C0' }, { shade: '60', hex: '#828FA6' },
      { shade: '70', hex: '#617089' }, { shade: '80', hex: '#394B69' },
      { shade: '90', hex: '#28303C' }, { shade: '100', hex: '#15181D' }
    ]
  };

  const cekolamColors = {
    'Pumkin Orange': [
      { shade: '0', hex: '#F9F7F5' }, { shade: '5', hex: '#FDF1E9' },
      { shade: '10', hex: '#EEDED3' }, { shade: '20', hex: '#EBC0A2' },
      { shade: '30', hex: '#EE9D68' }, { shade: '40', hex: '#E8803B' },
      { shade: '50', hex: '#EB7323' }, { shade: '60', hex: '#B2571A' },
      { shade: '70', hex: '#7C431D' }, { shade: '80', hex: '#4D2E1A' },
      { shade: '90', hex: '#2A1C13' }, { shade: '100', hex: '#120F0C' }
    ],
    'Blue Green': [
      { shade: '0', hex: '#E0F5F7' }, { shade: '5', hex: '#C8EAEE' },
      { shade: '10', hex: '#99DCE3' }, { shade: '20', hex: '#62C5D1' },
      { shade: '30', hex: '#2BACC0' }, { shade: '40', hex: '#1195B0' },
      { shade: '50', hex: '#089AAA' }, { shade: '60', hex: '#078597' },
      { shade: '70', hex: '#066F84' }, { shade: '80', hex: '#2A4C51' },
      { shade: '90', hex: '#12383E' }, { shade: '100', hex: '#0B2428' }
    ],
    'Rhino': [
      { shade: '0', hex: '#F7F7F8' }, { shade: '5', hex: '#EBEDEF' },
      { shade: '10', hex: '#D8DFE4' }, { shade: '20', hex: '#B6C6D3' },
      { shade: '30', hex: '#8BA9C0' }, { shade: '40', hex: '#6592B4' },
      { shade: '50', hex: '#2B485E' }, { shade: '60', hex: '#446B88' },
      { shade: '70', hex: '#374F62' }, { shade: '80', hex: '#28353E' },
      { shade: '90', hex: '#1A1F23' }, { shade: '100', hex: '#0E0F11' }
    ],
    'Atomic Grey': [
      { shade: '0', hex: '#F7F7F7' }, { shade: '5', hex: '#EDEDED' },
      { shade: '10', hex: '#DEDEDE' }, { shade: '20', hex: '#C5C5C4' },
      { shade: '30', hex: '#A6A6A5' }, { shade: '40', hex: '#8D8D8C' },
      { shade: '50', hex: '#575756' }, { shade: '60', hex: '#676765' },
      { shade: '70', hex: '#4D4D4C' }, { shade: '80', hex: '#333333' },
      { shade: '90', hex: '#1F1F1F' }, { shade: '100', hex: '#0F0F0F' }
    ],
    'Authentic Grey': [
      { shade: '0', hex: '#F7F7F7' }, { shade: '5', hex: '#EDEDED' },
      { shade: '10', hex: '#DEDEDE' }, { shade: '20', hex: '#C5C5C4' },
      { shade: '30', hex: '#A6A6A5' }, { shade: '40', hex: '#8D8D8C' },
      { shade: '50', hex: '#9C9C9B' }, { shade: '60', hex: '#666666' },
      { shade: '70', hex: '#4D4D4C' }, { shade: '80', hex: '#333333' },
      { shade: '90', hex: '#1F1F1F' }, { shade: '100', hex: '#0F0F0F' }
    ]
  };

  const causaColors = {
    'Safety Orange': [
      { shade: '0', hex: '#FBFBFA' }, { shade: '5', hex: '#FEF2E9' },
      { shade: '10', hex: '#EADFD6' }, { shade: '20', hex: '#E0C3AC' },
      { shade: '30', hex: '#E3AA7D' }, { shade: '40', hex: '#EA9959' },
      { shade: '50', hex: '#F57E20' }, { shade: '60', hex: '#DF6505' },
      { shade: '70', hex: '#B35001' }, { shade: '80', hex: '#743808' },
      { shade: '90', hex: '#43230A' }, { shade: '100', hex: '#1F1208' }
    ],
    'YlnMn Blue': [
      { shade: '0', hex: '#F6F7F9' }, { shade: '5', hex: '#ECEDF0' },
      { shade: '10', hex: '#D7DDEA' }, { shade: '20', hex: '#B0BEDD' },
      { shade: '30', hex: '#7E96CE' }, { shade: '40', hex: '#5577C3' },
      { shade: '50', hex: '#434F6A' }, { shade: '60', hex: '#343D50' },
      { shade: '70', hex: '#292F3D' }, { shade: '80', hex: '#1E212A' },
      { shade: '90', hex: '#14161A' }, { shade: '100', hex: '#0C0C0E' }
    ],
    'Powder Blue': [
      { shade: '0', hex: '#F7F7F8' }, { shade: '5', hex: '#ECEDEE' },
      { shade: '10', hex: '#DADFE1' }, { shade: '20', hex: '#BCC6CC' },
      { shade: '30', hex: '#97AAB5' }, { shade: '40', hex: '#7692A3' },
      { shade: '50', hex: '#A4B8C4' }, { shade: '60', hex: '#526B7A' },
      { shade: '70', hex: '#405059' }, { shade: '80', hex: '#2D3539' },
      { shade: '90', hex: '#1C1F21' }, { shade: '100', hex: '#0F0F10' }
    ],
    'Azure': [
      { shade: '0', hex: '#F4FAFC' }, { shade: '5', hex: '#E8F4F8' },
      { shade: '10', hex: '#D5EAEF' }, { shade: '20', hex: '#BFE0EB' },
      { shade: '30', hex: '#A8D6E8' }, { shade: '40', hex: '#91CDE5' },
      { shade: '50', hex: '#E3EEF0' }, { shade: '60', hex: '#63BADF' },
      { shade: '70', hex: '#4CB0DC' }, { shade: '80', hex: '#35A6D9' },
      { shade: '90', hex: '#1E9CD6' }, { shade: '100', hex: '#0793D3' }
    ],
    'Dim Gray': [
      { shade: '0', hex: '#F7F7F7' }, { shade: '5', hex: '#EDEDED' },
      { shade: '10', hex: '#DFDDDD' }, { shade: '20', hex: '#C6C3C3' },
      { shade: '30', hex: '#A9A3A3' }, { shade: '40', hex: '#918888' },
      { shade: '50', hex: '#786E6E' }, { shade: '60', hex: '#6A6262' },
      { shade: '70', hex: '#4F4A4A' }, { shade: '80', hex: '#343232' },
      { shade: '90', hex: '#1F1E1E' }, { shade: '100', hex: '#0F0F0F' }
    ]
  };

  const systemColors = {
    'Red': [
      { shade: '0', hex: '#FEF2F2' }, { shade: '5', hex: '#FEE2E2' },
      { shade: '10', hex: '#FECACA' }, { shade: '20', hex: '#FCA5A5' },
      { shade: '30', hex: '#F87171' }, { shade: '40', hex: '#EF4444' },
      { shade: '50', hex: '#DC2626' }, { shade: '60', hex: '#B91C1C' },
      { shade: '70', hex: '#991B1B' }, { shade: '80', hex: '#7F1D1D' },
      { shade: '90', hex: '#450A0A' }, { shade: '100', hex: '#211010' }
    ],
    'Green': [
      { shade: '0', hex: '#F8F9F9' }, { shade: '5', hex: '#E9F9EF' },
      { shade: '10', hex: '#D3E4D9' }, { shade: '20', hex: '#AAD6BA' },
      { shade: '30', hex: '#7DD39D' }, { shade: '40', hex: '#51D481' },
      { shade: '50', hex: '#22C55E' }, { shade: '60', hex: '#19A54C' },
      { shade: '70', hex: '#12843C' }, { shade: '80', hex: '#11572B' },
      { shade: '90', hex: '#0E331C' }, { shade: '100', hex: '#09180E' }
    ],
    'Blue': [
      { shade: '0', hex: '#FCFCFC' }, { shade: '5', hex: '#EBF2FE' },
      { shade: '10', hex: '#D9E0EB' }, { shade: '20', hex: '#B1C3E2' },
      { shade: '30', hex: '#86A9E4' }, { shade: '40', hex: '#6195EB' },
      { shade: '50', hex: '#3B82F6' }, { shade: '60', hex: '#0560F5' },
      { shade: '70', hex: '#014CC5' }, { shade: '80', hex: '#093680' },
      { shade: '90', hex: '#0C234A' }, { shade: '100', hex: '#091222' }
    ],
    'Yellow': [
      { shade: '0', hex: '#FAFAF9' }, { shade: '5', hex: '#FEF5E7' },
      { shade: '10', hex: '#E9E1D3' }, { shade: '20', hex: '#DFCAA8' },
      { shade: '30', hex: '#E2BA77' }, { shade: '40', hex: '#E9AF4C' },
      { shade: '50', hex: '#F59E0B' }, { shade: '60', hex: '#CE8303' },
      { shade: '70', hex: '#A66800' }, { shade: '80', hex: '#6C4707' },
      { shade: '90', hex: '#3E2B09' }, { shade: '100', hex: '#1D1507' }
    ],
    'Neutral': [
      { shade: '0', hex: '#F7F7F7' }, { shade: '5', hex: '#EEEEEE' },
      { shade: '10', hex: '#D7D7D7' }, { shade: '20', hex: '#BABABA' },
      { shade: '30', hex: '#9F9F9F' }, { shade: '40', hex: '#828282' },
      { shade: '50', hex: '#59595A' }, { shade: '60', hex: '#49494A' },
      { shade: '70', hex: '#3A3A3B' }, { shade: '80', hex: '#1C1C34' },
      { shade: '90', hex: '#14141E' }, { shade: '100', hex: '#0B0B0E' }
    ]
  };

  const brandColors = { nusantics: nusanticsColors, cekolam: cekolamColors, causa: causaColors };
  const brandNames = { nusantics: 'Helix', cekolam: 'CeKolam', causa: 'Causa' };

  const currentPalettes = activeTab === 'brand' ? brandColors[brandMode] : systemColors;
  const paletteKeys = Object.keys(currentPalettes);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveAnchor(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    paletteKeys.forEach((key) => {
      const el = document.getElementById(`palette-${key.replace(/\s+/g, '-').toLowerCase()}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [activeTab, brandMode]);

  return (
    <div ref={contentRef}>
      {/* Hero banner — negative margin to bleed to card edges */}
      <div style={{
        margin: '-32px -32px 32px',
        height: '280px',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px 16px 0 0',
        backgroundColor: '#F57E20'
      }}>
        {/* Background texture */}
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
        {/* Illustration */}
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
        {/* Text content */}
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
            Foundations
          </p>
          <h1 style={{
            margin: '0 0 16px',
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 700,
            fontSize: '40px',
            color: 'white',
            lineHeight: '1.2'
          }}>
            Color
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
            We use colors purposefully to communicate how things function in the interface, how they relate to other elements, and their level of prominence.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '0',
        borderBottom: '1px solid #d7d7d7',
        marginBottom: '24px',
        margin: '0 48px 24px 48px',
      }}>
        {[
          { id: 'brand', label: 'Color Palettes' },
          { id: 'system', label: 'System Colors' }
        ].map((tab) => {
          const isActive = activeTab === tab.id as 'brand' | 'system';
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'brand' | 'system')}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderBottom: isActive ? '2px solid #F57E20' : '2px solid transparent',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontFamily: 'Rubik, sans-serif',
                fontWeight: isActive ? 500 : 400,
                fontSize: '14px',
                color: isActive ? '#F57E20' : '#828282',
                transition: 'all 0.15s',
                marginBottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Brand selector (only for brand tab) */}
      {activeTab === 'brand' && (
        <div style={{
          display: 'flex',
          gap: '6px',
          marginBottom: '32px',
          padding: '4px',
          margin: '0 48px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          width: 'fit-content'
        }}>
          {(['nusantics', 'cekolam', 'causa'] as const).map((brand) => {
            const isActive = brandMode === brand;
            return (
              <button
                key={brand}
                onClick={() => setBrandMode(brand)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '6px',
                  fontFamily: 'Rubik, sans-serif',
                  fontWeight: isActive ? 500 : 400,
                  fontSize: '13px',
                  color: isActive ? 'white' : '#58595b',
                  backgroundColor: isActive ? '#F57E20' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {brandNames[brand]}
              </button>
            );
          })}
        </div>
      )}

      {/* Content + On This Page */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', padding: '40px 48px' }}>
        {/* Main palette content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {paletteKeys.map((name) => {
            const id = `palette-${name.replace(/\s+/g, '-').toLowerCase()}`;
            return (
              <PaletteSection
                key={name}
                id={id}
                name={name}
                colors={(currentPalettes as Record<string, Array<{ shade: string; hex: string }>>)[name]}
              />
            );
          })}
        </div>

        {/* On This Page */}
        <div style={{
          width: '160px',
          flexShrink: 0,
          position: 'sticky',
          top: '120px'
        }}>
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
            {paletteKeys.map((name) => {
              const id = `palette-${name.replace(/\s+/g, '-').toLowerCase()}`;
              const isActive = activeAnchor === id;
              return (
                <button
                  key={name}
                  onClick={() => {
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
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
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
