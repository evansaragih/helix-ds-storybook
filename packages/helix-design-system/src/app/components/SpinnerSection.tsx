import { ComponentDocPage } from './ComponentDocPage';
import { Spinner, PageLoader } from '../../components';

export function SpinnerSection() {
  return (
    <ComponentDocPage
      slug="spinner"
      title="Loading indicator"
      description="Indeterminate and branded loading: a Spinner for a wait of unknown length, and a Page Loader — the logo over a progress bar — for a full-page initial load."
      usage={[
        { heading: 'Spinner when unknown', body: 'Use the Spinner when you can’t say how long it will take. Use Progress Bar when you can.' },
        { heading: 'Page Loader for the first load', body: 'Show the Page Loader while a page or view fetches its first data, and update the value as it loads.' },
        { heading: 'Neutral on dark', body: 'The neutral (white) spinner is for dark or colored surfaces.' },
      ]}
      demos={[
        { id: 'spinner', title: 'Spinner brands', node: <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>{(['nusantics', 'cekolam', 'causa'] as const).map((b) => <Spinner key={b} brand={b} />)}<div style={{ background: '#14141E', padding: 12, borderRadius: 8 }}><Spinner brand="neutral" /></div></div> },
        { id: 'sizes', title: 'Spinner sizes', node: <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>{[16, 24, 32, 48, 64].map((s) => <Spinner key={s} size={s} />)}</div> },
        { id: 'loader', title: 'Page Loader', node: <div style={{ display: 'flex', gap: 16 }}>{(['nusantics', 'cekolam', 'causa'] as const).map((b) => <PageLoader key={b} brand={b} value={50} />)}</div> },
      ]}
    />
  );
}
