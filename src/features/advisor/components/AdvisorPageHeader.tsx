import type { ReactNode } from 'react';
import { AdvisorEmptyState, AdvisorErrorState, AdvisorLoadingState, type AdvisorDataState } from './AdvisorPageStates';
import { StatusBadge, type AdvisorStatusVariant } from './StatusBadge';

export function AdvisorPageHeader({
  title,
  subtitle,
  status,
  state = 'ready',
  emptyCta,
  onRetry,
  onEscalate,
}: {
  title: string;
  subtitle?: string;
  status?: { variant: AdvisorStatusVariant; label?: string };
  state?: AdvisorDataState;
  emptyCta?: ReactNode;
  onRetry?: () => void;
  onEscalate?: () => void;
}) {
  if (state === 'loading') return <AdvisorLoadingState sections={1} />;
  if (state === 'empty') return <AdvisorEmptyState cta={emptyCta} />;
  if (state === 'error') return <AdvisorErrorState onRetry={onRetry} onEscalate={onEscalate} />;

  return (
    <header className="advisor-page-header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p className="muted">{subtitle}</p> : null}
      </div>
      {status ? <StatusBadge status={status.variant} label={status.label} /> : null}
    </header>
  );
}
