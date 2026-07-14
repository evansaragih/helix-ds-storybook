import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section, SwatchGrid, TokenSwatch, StaticSwatch } from './helpers';
import { FoundationDocsPage } from './FoundationDocsPage';

const meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: FoundationDocsPage,
      description: {
        component:
          'Color tokens, three layers deep: raw **Primitives** (never used directly in components), purpose-named **Semantics** (what every component consumes), and **Brand** tokens that repaint per brand. Use the Brand toolbar above to see brand-aware sections update live.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandColors: Story = {
  name: 'Brand (reacts to Brand toolbar)',
  render: () => (
    <Section
      title="Brand"
      description="The only tokens that differ across Nusantics / CeKolam / Causa. Every other color below is shared across all three brands."
    >
      <SwatchGrid>
        <TokenSwatch label="Primary" varName="--color-brand-primary" />
        <TokenSwatch label="Primary hover" varName="--color-brand-primary-hover" />
        <TokenSwatch label="Primary pressed" varName="--color-brand-primary-pressed" />
        <TokenSwatch label="Secondary" varName="--color-brand-secondary" />
        <TokenSwatch label="Secondary hover" varName="--color-brand-secondary-hover" />
        <TokenSwatch label="Secondary pressed" varName="--color-brand-secondary-pressed" />
        <TokenSwatch label="Tertiary" varName="--color-brand-tertiary" />
        <TokenSwatch label="Tertiary hover" varName="--color-brand-tertiary-hover" />
        <TokenSwatch label="Tertiary pressed" varName="--color-brand-tertiary-pressed" />
      </SwatchGrid>
    </Section>
  ),
};

export const TextColors: Story = {
  name: 'Text',
  render: () => (
    <Section title="Text">
      <SwatchGrid>
        <TokenSwatch label="Primary" varName="--color-text-primary" />
        <TokenSwatch label="Secondary" varName="--color-text-secondary" />
        <TokenSwatch label="Tertiary" varName="--color-text-tertiary" />
        <TokenSwatch label="Muted" varName="--color-text-muted" />
        <TokenSwatch label="On-primary" varName="--color-text-on-primary" />
        <TokenSwatch label="Error" varName="--color-text-error" />
        <TokenSwatch label="Success" varName="--color-text-success" />
        <TokenSwatch label="Warning" varName="--color-text-warning" />
        <TokenSwatch label="Info" varName="--color-text-info" />
        <TokenSwatch label="Brand primary" varName="--color-text-brand-primary" />
        <TokenSwatch label="Brand secondary" varName="--color-text-brand-secondary" />
        <TokenSwatch label="Brand tertiary" varName="--color-text-brand-tertiary" />
      </SwatchGrid>
    </Section>
  ),
};

export const Backgrounds: Story = {
  name: 'Backgrounds & Containers',
  render: () => (
    <>
      <Section title="Backgrounds">
        <SwatchGrid>
          <TokenSwatch label="Page" varName="--color-bg-page" />
          <TokenSwatch label="Secondary" varName="--color-bg-secondary" />
          <TokenSwatch label="Subtle" varName="--color-bg-subtle" />
          <TokenSwatch label="Hover" varName="--color-bg-hover" />
          <TokenSwatch label="Inverse" varName="--color-bg-inverse" />
        </SwatchGrid>
      </Section>
      <Section title="Containers">
        <SwatchGrid>
          <TokenSwatch label="Primary" varName="--color-container-primary" />
          <TokenSwatch label="Secondary" varName="--color-container-secondary" />
          <TokenSwatch label="Tertiary" varName="--color-container-tertiary" />
          <TokenSwatch label="Disabled" varName="--color-container-disabled" />
        </SwatchGrid>
      </Section>
    </>
  ),
};

export const StrokeBorder: Story = {
  name: 'Stroke / Border',
  render: () => (
    <Section title="Stroke / Border">
      <SwatchGrid>
        <TokenSwatch label="Default" varName="--color-stroke-default" />
        <TokenSwatch label="Subtle" varName="--color-stroke-subtle" />
        <TokenSwatch label="Hover" varName="--color-stroke-hover" />
        <TokenSwatch label="Strong" varName="--color-stroke-strong" />
        <TokenSwatch label="Error" varName="--color-stroke-error" />
        <TokenSwatch label="Success" varName="--color-stroke-success" />
        <TokenSwatch label="Info" varName="--color-stroke-info" />
      </SwatchGrid>
    </Section>
  ),
};

export const InputColors: Story = {
  name: 'Input',
  render: () => (
    <>
      <Section title="Input backgrounds">
        <SwatchGrid>
          <TokenSwatch label="Default" varName="--color-input-bg-default" />
          <TokenSwatch label="Hover" varName="--color-input-bg-hover" />
          <TokenSwatch label="Focus" varName="--color-input-bg-focus" />
          <TokenSwatch label="Disabled" varName="--color-input-bg-disabled" />
          <TokenSwatch label="Error" varName="--color-input-bg-error" />
          <TokenSwatch label="Success" varName="--color-input-bg-success" />
        </SwatchGrid>
      </Section>
      <Section title="Input borders" description="Focus is brand-aware — try the Brand toolbar.">
        <SwatchGrid>
          <TokenSwatch label="Default" varName="--color-input-border-default" />
          <TokenSwatch label="Hover" varName="--color-input-border-hover" />
          <TokenSwatch label="Focus" varName="--color-input-border-focus" />
          <TokenSwatch label="Error" varName="--color-input-border-error" />
          <TokenSwatch label="Success" varName="--color-input-border-success" />
          <TokenSwatch label="Disabled" varName="--color-input-border-disabled" />
        </SwatchGrid>
      </Section>
    </>
  ),
};

export const StatusSurfaces: Story = {
  name: 'Status Surfaces',
  render: () => (
    <Section title="Status Surfaces" description="Brand surface is brand-aware — try the Brand toolbar.">
      <SwatchGrid>
        <TokenSwatch label="Brand" varName="--color-status-brand-bg" />
        <TokenSwatch label="Error" varName="--color-status-error-bg" />
        <TokenSwatch label="Success" varName="--color-status-success-bg" />
        <TokenSwatch label="Warning" varName="--color-status-warning-bg" />
        <TokenSwatch label="Info" varName="--color-status-info-bg" />
      </SwatchGrid>
    </Section>
  ),
};

export const ButtonColors: Story = {
  name: 'Button (non-brand)',
  render: () => (
    <Section title="Destructive & Neutral Buttons" description="These button colors are the same across all three brands.">
      <SwatchGrid>
        <TokenSwatch label="Destructive" varName="--color-destructive" />
        <TokenSwatch label="Destructive hover" varName="--color-destructive-hover" />
        <TokenSwatch label="Destructive pressed" varName="--color-destructive-pressed" />
        <TokenSwatch label="Neutral" varName="--color-btn-neutral" />
        <TokenSwatch label="Neutral hover" varName="--color-btn-neutral-hover" />
        <TokenSwatch label="Neutral pressed" varName="--color-btn-neutral-pressed" />
        <TokenSwatch label="Invert" varName="--color-btn-invert" />
        <TokenSwatch label="Invert hover" varName="--color-btn-invert-hover" />
        <TokenSwatch label="Invert pressed" varName="--color-btn-invert-pressed" />
        <TokenSwatch label="Disabled bg" varName="--color-btn-disabled-bg" />
      </SwatchGrid>
    </Section>
  ),
};

const PRIMITIVE_RAMPS: { name: string; steps: [string, string][] }[] = [
  {
    name: 'Orange (Nusantics / Causa primary)',
    steps: [
      ['0', '#FEF2E9'], ['5', '#FDE6D3'], ['10', '#FCC9A3'], ['20', '#F9AD72'], ['30', '#F79449'],
      ['40', '#F68A31'], ['50', '#F57E20'], ['60', '#DF6505'], ['70', '#B35001'], ['80', '#8A3D00'],
      ['90', '#5C2800'], ['100', '#2E1400'],
    ],
  },
  {
    name: 'CeKolam Primary (Tangerine)',
    steps: [
      ['0', '#FEF3EC'], ['10', '#FDD5B8'], ['30', '#F39B5F'], ['50', '#EB7323'],
      ['60', '#D4611A'], ['70', '#A84E14'], ['80', '#7C3A0E'], ['90', '#502608'],
    ],
  },
  {
    name: 'Teal (CeKolam secondary)',
    steps: [
      ['0', '#E6F7F9'], ['10', '#B3E6EB'], ['30', '#3EC4D1'], ['50', '#089AAA'],
      ['60', '#077E8C'], ['70', '#056570'], ['80', '#034B54'], ['90', '#023238'],
    ],
  },
  {
    name: 'Denim (CeKolam tertiary, historical)',
    steps: [
      ['0', '#E8EEF2'], ['10', '#C0CED8'], ['30', '#5B7D96'], ['50', '#2B485E'],
      ['60', '#243E50'], ['70', '#1A2E3C'], ['80', '#112028'], ['90', '#081014'],
    ],
  },
  {
    name: 'Slate (Causa secondary)',
    steps: [
      ['0', '#ECEEF3'], ['10', '#CBD1DE'], ['30', '#6B7BA0'], ['50', '#434F6A'],
      ['60', '#38435A'], ['70', '#2C3649'], ['80', '#202738'], ['90', '#141827'],
    ],
  },
  {
    name: 'Steel Blue (Causa tertiary)',
    steps: [
      ['0', '#F1F5F8'], ['10', '#DCE5EC'], ['30', '#BACBD5'], ['50', '#A4B8C4'],
      ['60', '#8C9EAC'], ['70', '#6E8290'], ['80', '#526270'], ['90', '#374350'],
    ],
  },
  {
    name: 'Olive Green (Nusantics tertiary)',
    steps: [
      ['0', '#EBF0EA'], ['10', '#C8D5C6'], ['30', '#6D8E68'], ['50', '#476142'],
      ['60', '#3E5639'], ['70', '#2E402A'], ['80', '#1E2B1B'], ['90', '#10160F'],
    ],
  },
  {
    name: 'Charcoal (Nusantics secondary)',
    steps: [
      ['0', '#EBEBEB'], ['10', '#D0D0D1'], ['30', '#848485'], ['50', '#58595B'],
      ['60', '#48494B'], ['70', '#393A3B'], ['80', '#2A2B2C'], ['90', '#1A1B1C'],
    ],
  },
  {
    name: 'Neutral (Grayscale)',
    steps: [
      ['0', '#FFFFFF'], ['5', '#F7F7F7'], ['10', '#EEEEEE'], ['20', '#D7D7D7'], ['30', '#C2C2C2'],
      ['40', '#9F9F9F'], ['50', '#828282'], ['60', '#656565'], ['70', '#49494A'], ['80', '#2F2F2F'],
      ['90', '#14141E'], ['100', '#000000'],
    ],
  },
  {
    name: 'Green (Success)',
    steps: [
      ['0', '#E9F9EF'], ['5', '#D3F3DF'], ['10', '#AAEBBF'], ['20', '#7FDE9E'], ['30', '#54D17E'],
      ['40', '#34C468'], ['50', '#22C55E'], ['60', '#19A54C'], ['70', '#12843C'], ['80', '#0C632C'],
      ['90', '#07421D'], ['100', '#03210E'],
    ],
  },
  {
    name: 'Red (Error)',
    steps: [
      ['0', '#FEE2E2'], ['5', '#FECACA'], ['10', '#FCA5A5'], ['20', '#F87171'], ['30', '#F35353'],
      ['40', '#EF4444'], ['50', '#DC2626'], ['60', '#B91C1C'], ['70', '#991B1B'], ['80', '#7F1D1D'],
      ['90', '#5C1414'], ['100', '#3B0000'],
    ],
  },
  {
    name: 'Blue (Info)',
    steps: [
      ['0', '#EBF2FE'], ['5', '#DBEAFE'], ['10', '#BFDBFE'], ['20', '#93C5FD'], ['30', '#60A5FA'],
      ['40', '#3B82F6'], ['50', '#2563EB'], ['60', '#0560F5'], ['70', '#014CC5'], ['80', '#013899'],
      ['90', '#012570'], ['100', '#001247'],
    ],
  },
  {
    name: 'Yellow (Warning)',
    steps: [
      ['0', '#FEF5E7'], ['5', '#FEF0D9'], ['10', '#FDE8BC'], ['20', '#FBDA8E'], ['30', '#FACB60'],
      ['40', '#F8BC32'], ['50', '#F59E0B'], ['60', '#CE8303'], ['70', '#A66800'], ['80', '#7F4E00'],
      ['90', '#593600'], ['100', '#331F00'],
    ],
  },
];

export const Primitives: Story = {
  name: 'Primitives',
  render: () => (
    <>
      {PRIMITIVE_RAMPS.map((ramp) => (
        <Section key={ramp.name} title={ramp.name}>
          <SwatchGrid>
            {ramp.steps.map(([step, hex]) => (
              <StaticSwatch key={step} label={step} hex={hex} />
            ))}
          </SwatchGrid>
        </Section>
      ))}
    </>
  ),
};
