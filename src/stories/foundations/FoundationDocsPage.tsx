import React from 'react';
import { Title, Description, Stories } from '@storybook/addon-docs/blocks';

/** Docs page for Foundations pages — no bound component, so skip Subtitle/Primary/Controls/Changelog. */
export function FoundationDocsPage() {
  return (
    <>
      <Title />
      <Description />
      <Stories />
    </>
  );
}
