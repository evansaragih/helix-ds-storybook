import { forwardRef } from 'react';
import { Button } from './Button';
import { Illustration } from './Illustration';
import type { IllustrationName } from './illustrations';

/** Figma Type — picks the scenario, its default illustration and default text */
export type EmptyStateType = 'search' | 'users' | 'files' | 'integrations' | 'no-data' | 'no-lab-results' | 'error' | 'no-permission';
/** Figma Size — default is full-page / section scale; compact is a horizontal layout for tight spaces */
export type EmptyStateSize = 'default' | 'compact';

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: EmptyStateType;
  size?: EmptyStateSize;
  /** Overrides the type's default title (Figma Title) */
  title?: React.ReactNode;
  /** Overrides the type's default description (Figma Description) */
  description?: React.ReactNode;
  /** Show the illustration (Figma Illustration, default true), or pick another from the Figma Illustration set */
  illustration?: boolean | IllustrationName;
  /** Idle animation on the illustration. Default true; always still under prefers-reduced-motion. */
  animated?: boolean;
  /** Show a 48px Icon Tile above the illustration (Figma Icon Tile) — pass the icon node */
  icon?: React.ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}

const COPY: Record<EmptyStateType, { title: string; description: string; illustration: IllustrationName }> = {
  search:           { title: 'No results found', description: 'Your search did not match any results. Please try again.', illustration: 'search' },
  users:            { title: 'No users found', description: 'Your search did not match any users.', illustration: 'users' },
  files:            { title: 'No files found', description: 'This folder is empty. Upload a file to get started.', illustration: 'files' },
  integrations:     { title: 'No integrations found', description: "We couldn't find any apps or integrations.", illustration: 'integrations' },
  'no-data':        { title: 'No data yet', description: "There's nothing here yet. Start by adding your first item.", illustration: 'no-data' },
  'no-lab-results': { title: 'No lab results found', description: "We couldn't find any lab results matching your criteria.", illustration: 'microscope' },
  error:            { title: 'Something went wrong', description: 'We ran into an issue loading this page. Please try again.', illustration: 'error' },
  'no-permission':  { title: "You don't have access", description: 'Contact your admin to request access to this page.', illustration: 'no-permission' },
};

/** A placeholder for lists, tables and search results with no content — no data, no results, an error, or no permission. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(({
  type = 'no-data',
  size = 'default',
  title,
  description,
  illustration = true,
  animated = true,
  icon,
  primaryAction,
  secondaryAction,
  style,
  ...props
}, ref) => {
  const copy = COPY[type];
  const compact = size === 'compact';
  const artName = illustration === false ? null : illustration === true ? copy.illustration : illustration;
  const artSize = compact ? 64 : 160;

  const text = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, textAlign: compact ? 'left' : 'center' }}>
      <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontWeight: 500, fontSize: 16, lineHeight: '24px', color: 'var(--color-text-primary, #14141E)' }}>{title ?? copy.title}</p>
      <p style={{ margin: 0, fontFamily: 'var(--font-family-body)', fontSize: 13, lineHeight: '19.2px', color: 'var(--color-text-secondary, #49494A)' }}>{description ?? copy.description}</p>
    </div>
  );
  const actions = (primaryAction || secondaryAction) && (
    <div style={{ display: 'flex', gap: 8, justifyContent: compact ? 'flex-start' : 'center' }}>
      {secondaryAction && <Button size={compact ? 'xs' : 'sm'} hierarchy="secondary" appearance="solid" onClick={secondaryAction.onClick}>{secondaryAction.label}</Button>}
      {primaryAction && <Button size={compact ? 'xs' : 'sm'} onClick={primaryAction.onClick}>{primaryAction.label}</Button>}
    </div>
  );
  const artEl = artName && <Illustration name={artName} size={artSize} animated={animated} />;
  const tile = icon && <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 48, height: 48, borderRadius: 8, backgroundColor: 'var(--color-status-brand-bg, #FEF2E9)', color: 'var(--color-brand-primary, #F57E20)' }}>{icon}</span>;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex', boxSizing: 'border-box', width: '100%',
        flexDirection: compact ? 'row' : 'column', alignItems: compact ? 'center' : 'center', justifyContent: 'center',
        gap: 16, padding: compact ? 16 : 24, ...style,
      }}
      {...props}
    >
      {tile}
      {artEl}
      {compact ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>{text}{actions}</div>
      ) : (<>{text}{actions}</>)}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
