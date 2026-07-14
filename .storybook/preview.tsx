import React from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import 'helix-design-system/styles/fonts.css';
import 'helix-design-system/styles/theme.css';
import { ComponentDocsPage } from '../src/stories/blocks/ComponentDocsPage';

const BRANDS = {
  nusantics: 'Nusantics',
  cekolam: 'CeKolam',
  causa: 'Causa',
} as const;

const withBrand: Decorator = (Story, context) => {
  const brand = context.globals.brand ?? 'nusantics';
  return (
    <div data-brand={brand} style={{ background: 'var(--color-bg-page)', minHeight: '100%', padding: '24px' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Changelog',
          'Foundations',
          ['Colors', 'Typography', 'Spacing & Radius', 'Shadow & Effects', 'Grid & Layout', 'Brand Identity'],
          'Components',
          ['Inputs & Forms', 'Data Display', 'Navigation', 'Feedback & Status', 'Overlays', 'Layout'],
        ],
      },
    },
    a11y: {
      test: 'todo',
    },
    docs: {
      page: ComponentDocsPage,
    },
  },
  globalTypes: {
    brand: {
      name: 'Brand',
      description: 'Helix brand mode (data-brand)',
      defaultValue: 'nusantics',
      toolbar: {
        icon: 'paintbrush',
        items: Object.entries(BRANDS).map(([value, title]) => ({ value, title })),
        title: 'Brand',
        dynamicTitle: true,
      },
    },
  },
  decorators: [withBrand],
};

export default preview;
