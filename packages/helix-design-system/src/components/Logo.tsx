import wordmarkNusanticsDefault from '../assets/logo/nusantics/wordmark-default.svg';
import wordmarkNusanticsWhite from '../assets/logo/nusantics/wordmark-white.svg';
import markNusanticsDefault from '../assets/logo/nusantics/mark-default.svg';
import markNusanticsWhite from '../assets/logo/nusantics/mark-white.svg';

import wordmarkCekolamDefault from '../assets/logo/cekolam/wordmark-default.svg';
import wordmarkCekolamWhite from '../assets/logo/cekolam/wordmark-white.svg';
import markCekolamDefault from '../assets/logo/cekolam/mark-default.svg';
import markCekolamWhite from '../assets/logo/cekolam/mark-white.svg';

import wordmarkCausaDefault from '../assets/logo/causa/wordmark-default.svg';
import wordmarkCausaWhite from '../assets/logo/causa/wordmark-white.svg';
import markCausaDefault from '../assets/logo/causa/mark-default.svg';
import markCausaWhite from '../assets/logo/causa/mark-white.svg';

export type LogoVariant = 'wordmark' | 'mark';
export type LogoTone = 'default' | 'white';
type LogoBrand = 'nusantics' | 'cekolam' | 'causa';

export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 'wordmark' = full lockup, 'mark' = icon only */
  variant?: LogoVariant;
  /** 'white' for dark/colored surfaces (e.g. transparent Navbar) */
  tone?: LogoTone;
  height?: number;
}

const ASSETS: Record<LogoBrand, Record<LogoVariant, Record<LogoTone, string>>> = {
  nusantics: {
    wordmark: { default: wordmarkNusanticsDefault, white: wordmarkNusanticsWhite },
    mark: { default: markNusanticsDefault, white: markNusanticsWhite },
  },
  cekolam: {
    wordmark: { default: wordmarkCekolamDefault, white: wordmarkCekolamWhite },
    mark: { default: markCekolamDefault, white: markCekolamWhite },
  },
  causa: {
    wordmark: { default: wordmarkCausaDefault, white: wordmarkCausaWhite },
    mark: { default: markCausaDefault, white: markCausaWhite },
  },
};

const LABELS: Record<LogoBrand, string> = {
  nusantics: 'Nusantics',
  cekolam: 'CeKolam',
  causa: 'Causa',
};

const BRANDS = Object.keys(ASSETS) as LogoBrand[];

/**
 * Brand-aware logo. Renders one <img> per brand and lets the same
 * [data-brand] cascade used for color tokens (see theme.css) show/hide
 * the right one — no JS brand detection, so it stays in sync with
 * whatever ancestor sets data-brand="nusantics|cekolam|causa".
 */
export function Logo({ variant = 'wordmark', tone = 'default', height = 24, className, style, ...props }: LogoProps) {
  return (
    <span
      className={['helix-logo', className].filter(Boolean).join(' ')}
      style={{ display: 'inline-flex', alignItems: 'center', height, ...style }}
      {...props}
    >
      {BRANDS.map((brand) => (
        <img
          key={brand}
          className={`helix-logo__img helix-logo__img--${brand}`}
          src={ASSETS[brand][variant][tone]}
          alt={LABELS[brand]}
          style={{ height: '100%', width: 'auto' }}
        />
      ))}
    </span>
  );
}
