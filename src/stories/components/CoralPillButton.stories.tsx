import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * A self-contained coral pill button demo — not wired to the design-system
 * Button component. Coral/salmon-red background, bold white centered label,
 * fully rounded ends, generous horizontal padding, and a subtle bottom shadow
 * for depth.
 */
const CoralPillButton = ({ label = 'Understand' }: { label?: string }) => (
  <button
    type="button"
    style={{
      appearance: 'none',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 48px',
      borderRadius: 9999,
      background: '#E8695C',
      color: '#FFFFFF',
      fontFamily: 'inherit',
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: '0.01em',
      textAlign: 'center',
      boxShadow: '0 8px 16px rgba(232, 105, 92, 0.35), 0 2px 4px rgba(0, 0, 0, 0.12)',
      transition: 'transform 120ms ease, box-shadow 120ms ease, background 120ms ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#E4574A';
      e.currentTarget.style.boxShadow =
        '0 12px 22px rgba(232, 105, 92, 0.42), 0 3px 6px rgba(0, 0, 0, 0.14)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#E8695C';
      e.currentTarget.style.boxShadow =
        '0 8px 16px rgba(232, 105, 92, 0.35), 0 2px 4px rgba(0, 0, 0, 0.12)';
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.transform = 'translateY(1px)';
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    {label}
  </button>
);

const meta = {
  title: 'Components/Inputs & Forms/Coral Pill Button',
  component: CoralPillButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: { label: 'Understand' },
} satisfies Meta<typeof CoralPillButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
