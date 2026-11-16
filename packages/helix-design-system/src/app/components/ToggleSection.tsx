import { ComponentDocPage } from './ComponentDocPage';
import { Toggle } from '../../components';
import type { ToggleProps } from '../../components';

const VIEW: ToggleProps['options'] = [{ value: 'monthly', label: 'Monthly' }, { value: 'weekly', label: 'Weekly' }];
const flag = (src: string) => <img src={src} alt="" width={16} height={16} style={{ display: 'block' }} />;
const LANGUAGE: ToggleProps['options'] = [
  { value: 'en', label: 'EN', icon: flag('/prototypes/nusantics-landing-page/assets/flag-gb.svg') },
  { value: 'id', label: 'ID', icon: flag('/prototypes/nusantics-landing-page/assets/flag-id.svg') },
];

export function ToggleSection() {
  return (
    <ComponentDocPage
      slug="toggle"
      title="Toggle"
      description="A segmented switch between exactly two options, such as a language or a Monthly / Weekly view. For three or more options or page navigation use Tabs; for a single on/off setting use Switch."
      usage={[
        { heading: 'Exactly two options', body: 'The options are fixed at two. If a third choice appears, switch to Tabs.' },
        { heading: 'Pick the size for the row', body: 'md is 46px tall; sm is 36px, the same height as a small button or a navbar item.' },
        { heading: 'Pick the surface for the background', body: 'Use dark when the toggle sits on a photo or dark colour, such as the navbar over a hero.' },
      ]}
      demos={[
        { id: 'sizes', title: 'Sizes', description: 'md is 46px tall with 36px segments. sm is 36px tall with 30px segments.',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
              <Toggle aria-label="View (md)" size="md" defaultValue="monthly" options={VIEW} />
              <Toggle aria-label="View (sm)" size="sm" defaultValue="weekly" options={VIEW} />
            </div>
          ) },
        { id: 'icons', title: 'With flags', description: 'Each option can carry a 16px icon, here the country flag for a language switch.',
          node: <Toggle aria-label="Language" size="sm" defaultValue="en" options={LANGUAGE} /> },
        { id: 'surface', title: 'Surface', description: 'Light for white or grey backgrounds. Dark is a translucent glass container for photos and dark colours.',
          node: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ padding: 16, borderRadius: 12, backgroundColor: 'var(--color-container-primary, #FFFFFF)' }}>
                <Toggle aria-label="Language (light)" size="sm" surface="light" defaultValue="en" options={LANGUAGE} />
              </div>
              <div style={{ padding: 16, borderRadius: 12, backgroundColor: '#14141E' }}>
                <Toggle aria-label="Language (dark)" size="sm" surface="dark" defaultValue="id" options={LANGUAGE} />
              </div>
            </div>
          ) },
        { id: 'states', title: 'States', description: 'Hover and focus appear when you interact. A segment can be disabled.',
          node: <Toggle aria-label="View (disabled)" defaultValue="monthly" options={[{ ...VIEW[0] }, { ...VIEW[1], disabled: true }]} /> },
      ]}
    />
  );
}
