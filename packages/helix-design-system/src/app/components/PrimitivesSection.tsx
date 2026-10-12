import { useState } from 'react';
import { PageLayout } from './PageLayout';
import { Tabs } from '../../components/Tabs';

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
        fontFamily: 'var(--font-family-body)',
        fontWeight: 600,
        fontSize: '13px',
        color: '#14141e',
        lineHeight: '1.4'
      }}>
        {shade}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282', fontWeight: 400 }}>HEX</span>
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#14141e', fontWeight: 400 }}>{hex}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#828282', fontWeight: 400 }}>RGB</span>
        <span style={{ fontFamily: 'var(--font-family-body)', fontSize: '11px', color: '#14141e', fontWeight: 400 }}>{hexToRgb(hex)}</span>
      </div>
    </div>
  </div>
);

const PaletteSection = ({ id, name, colors }: { id: string; name: string; colors: Array<{ shade: string; hex: string }> }) => (
  <div id={id} style={{ marginBottom: '40px', scrollMarginTop: '88px' }}>
    <h3 style={{
      fontFamily: 'var(--font-family-body)',
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

  const nusanticsColors = {
    'Orange (Primary)': [
      { shade: '0', hex: '#FEF2E9' }, { shade: '5', hex: '#FDE6D3' },
      { shade: '10', hex: '#FCC9A3' }, { shade: '20', hex: '#F9AD72' },
      { shade: '30', hex: '#F79449' }, { shade: '40', hex: '#F68A31' },
      { shade: '50', hex: '#F57E20' }, { shade: '60', hex: '#DF6505' },
      { shade: '70', hex: '#B35001' }, { shade: '80', hex: '#8A3D00' },
      { shade: '90', hex: '#5C2800' }, { shade: '100', hex: '#2E1400' }
    ],
    'Charcoal (Secondary)': [
      { shade: '0', hex: '#EBEBEB' }, { shade: '10', hex: '#D0D0D1' },
      { shade: '30', hex: '#848485' }, { shade: '50', hex: '#58595B' },
      { shade: '60', hex: '#48494B' }, { shade: '70', hex: '#393A3B' },
      { shade: '80', hex: '#2A2B2C' }, { shade: '90', hex: '#1A1B1C' }
    ],
    'Olive Green (Tertiary)': [
      { shade: '0', hex: '#EBF0EA' }, { shade: '10', hex: '#C8D5C6' },
      { shade: '30', hex: '#6D8E68' }, { shade: '50', hex: '#476142' },
      { shade: '60', hex: '#3E5639' }, { shade: '70', hex: '#2E402A' },
      { shade: '80', hex: '#1E2B1B' }, { shade: '90', hex: '#10160F' }
    ]
  };

  const cekolamColors = {
    'Tangerine (Primary)': [
      { shade: '0', hex: '#FEF3EC' }, { shade: '10', hex: '#FDD5B8' },
      { shade: '30', hex: '#F39B5F' }, { shade: '50', hex: '#EB7323' },
      { shade: '60', hex: '#D4611A' }, { shade: '70', hex: '#A84E14' },
      { shade: '80', hex: '#7C3A0E' }, { shade: '90', hex: '#502608' }
    ],
    'Teal (Secondary)': [
      { shade: '0', hex: '#E6F7F9' }, { shade: '10', hex: '#B3E6EB' },
      { shade: '30', hex: '#3EC4D1' }, { shade: '50', hex: '#089AAA' },
      { shade: '60', hex: '#077E8C' }, { shade: '70', hex: '#056570' },
      { shade: '80', hex: '#034B54' }, { shade: '90', hex: '#023238' }
    ],
    'Denim (Tertiary)': [
      { shade: '0', hex: '#E8EEF2' }, { shade: '10', hex: '#C0CED8' },
      { shade: '30', hex: '#5B7D96' }, { shade: '50', hex: '#2B485E' },
      { shade: '60', hex: '#243E50' }, { shade: '70', hex: '#1A2E3C' },
      { shade: '80', hex: '#112028' }, { shade: '90', hex: '#081014' }
    ]
  };

  const causaColors = {
    'Orange (Primary)': [
      { shade: '0', hex: '#FEF2E9' }, { shade: '5', hex: '#FDE6D3' },
      { shade: '10', hex: '#FCC9A3' }, { shade: '20', hex: '#F9AD72' },
      { shade: '30', hex: '#F79449' }, { shade: '40', hex: '#F68A31' },
      { shade: '50', hex: '#F57E20' }, { shade: '60', hex: '#DF6505' },
      { shade: '70', hex: '#B35001' }, { shade: '80', hex: '#8A3D00' },
      { shade: '90', hex: '#5C2800' }, { shade: '100', hex: '#2E1400' }
    ],
    'Slate (Secondary)': [
      { shade: '0', hex: '#ECEEF3' }, { shade: '10', hex: '#CBD1DE' },
      { shade: '30', hex: '#6B7BA0' }, { shade: '50', hex: '#434F6A' },
      { shade: '60', hex: '#38435A' }, { shade: '70', hex: '#2C3649' },
      { shade: '80', hex: '#202738' }, { shade: '90', hex: '#141827' }
    ],
    'Steel Blue (Tertiary)': [
      { shade: '0', hex: '#F1F5F8' }, { shade: '10', hex: '#DCE5EC' },
      { shade: '30', hex: '#BACBD5' }, { shade: '50', hex: '#A4B8C4' },
      { shade: '60', hex: '#8C9EAC' }, { shade: '70', hex: '#6E8290' },
      { shade: '80', hex: '#526270' }, { shade: '90', hex: '#374350' }
    ]
  };

  const systemColors = {
    'Neutral (Grayscale)': [
      { shade: '0', hex: '#FFFFFF' }, { shade: '5', hex: '#F7F7F7' },
      { shade: '10', hex: '#EEEEEE' }, { shade: '20', hex: '#D7D7D7' },
      { shade: '30', hex: '#C2C2C2' }, { shade: '40', hex: '#9F9F9F' },
      { shade: '50', hex: '#828282' }, { shade: '60', hex: '#656565' },
      { shade: '70', hex: '#49494A' }, { shade: '80', hex: '#2F2F2F' },
      { shade: '90', hex: '#14141E' }, { shade: '100', hex: '#000000' }
    ],
    'Green (Success)': [
      { shade: '0', hex: '#E9F9EF' }, { shade: '5', hex: '#D3F3DF' },
      { shade: '10', hex: '#AAEBBF' }, { shade: '20', hex: '#7FDE9E' },
      { shade: '30', hex: '#54D17E' }, { shade: '40', hex: '#34C468' },
      { shade: '50', hex: '#22C55E' }, { shade: '60', hex: '#19A54C' },
      { shade: '70', hex: '#12843C' }, { shade: '80', hex: '#0C632C' },
      { shade: '90', hex: '#07421D' }, { shade: '100', hex: '#03210E' }
    ],
    'Red (Error)': [
      { shade: '0', hex: '#FEE2E2' }, { shade: '5', hex: '#FECACA' },
      { shade: '10', hex: '#FCA5A5' }, { shade: '20', hex: '#F87171' },
      { shade: '30', hex: '#F35353' }, { shade: '40', hex: '#EF4444' },
      { shade: '50', hex: '#DC2626' }, { shade: '60', hex: '#B91C1C' },
      { shade: '70', hex: '#991B1B' }, { shade: '80', hex: '#7F1D1D' },
      { shade: '90', hex: '#5C1414' }, { shade: '100', hex: '#3B0000' }
    ],
    'Blue (Info)': [
      { shade: '0', hex: '#EBF2FE' }, { shade: '5', hex: '#DBEAFE' },
      { shade: '10', hex: '#BFDBFE' }, { shade: '20', hex: '#93C5FD' },
      { shade: '30', hex: '#60A5FA' }, { shade: '40', hex: '#3B82F6' },
      { shade: '50', hex: '#2563EB' }, { shade: '60', hex: '#0560F5' },
      { shade: '70', hex: '#014CC5' }, { shade: '80', hex: '#013899' },
      { shade: '90', hex: '#012570' }, { shade: '100', hex: '#001247' }
    ],
    'Yellow (Warning)': [
      { shade: '0', hex: '#FEF5E7' }, { shade: '5', hex: '#FEF0D9' },
      { shade: '10', hex: '#FDE8BC' }, { shade: '20', hex: '#FBDA8E' },
      { shade: '30', hex: '#FACB60' }, { shade: '40', hex: '#F8BC32' },
      { shade: '50', hex: '#F59E0B' }, { shade: '60', hex: '#CE8303' },
      { shade: '70', hex: '#A66800' }, { shade: '80', hex: '#7F4E00' },
      { shade: '90', hex: '#593600' }, { shade: '100', hex: '#331F00' }
    ]
  };

  const brandColors = { nusantics: nusanticsColors, cekolam: cekolamColors, causa: causaColors };
  const brandNames = { nusantics: 'Helix', cekolam: 'CeKolam', causa: 'Causa' };

  const currentPalettes = activeTab === 'brand' ? brandColors[brandMode] : systemColors;
  const paletteKeys = Object.keys(currentPalettes);

  const paletteId = (name: string) => `palette-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <PageLayout
      category="Foundations"
      title="Color"
      description="We use colors purposefully to communicate how things function in the interface, how they relate to other elements, and their level of prominence."
      tocItems={paletteKeys.map((name) => ({ id: paletteId(name), label: name }))}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-24)', marginBottom: 'var(--spacing-32)' }}>
        <Tabs
          showNavigation={false}
          renderContent={false}
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'brand' | 'system')}
          items={[
            { id: 'brand', label: 'Color Palettes' },
            { id: 'system', label: 'System Colors' },
          ]}
        />
        {activeTab === 'brand' && (
          <div style={{ width: 'fit-content' }}>
            <Tabs
              appearance="contained"
              size="sm"
              showNavigation={false}
              renderContent={false}
              value={brandMode}
              onValueChange={(v) => setBrandMode(v as typeof brandMode)}
              items={(Object.keys(brandNames) as (keyof typeof brandNames)[]).map((id) => ({ id, label: brandNames[id] }))}
            />
          </div>
        )}
      </div>

      {paletteKeys.map((name) => (
        <PaletteSection
          key={name}
          id={paletteId(name)}
          name={name}
          colors={(currentPalettes as Record<string, Array<{ shade: string; hex: string }>>)[name]}
        />
      ))}
    </PageLayout>
  );
}
