import type { ReactNode } from 'react';
import { AdvisorEmptyState, AdvisorErrorState, AdvisorLoadingState, type AdvisorDataState } from './AdvisorPageStates';

export function AdvisorPrimaryPanel({
  title,
  children,
  state = 'ready',
  emptyCta,
  onRetry,
  onEscalate,
}: {
  title: string;
  children?: ReactNode;
  state?: AdvisorDataState;
  emptyCta?: ReactNode;
  onRetry?: () => void;
  onEscalate?: () => void;
}) {
  return (
    <section className="advisor-primary-panel">
      <h2 className="advisor-primary-panel__title">{title}</h2>
      {state === 'loading' ? <AdvisorLoadingState sections={2} /> : null}
      {state === 'empty' ? <AdvisorEmptyState cta={emptyCta} /> : null}
      {state === 'error' ? <AdvisorErrorState onRetry={onRetry} onEscalate={onEscalate} /> : null}
      {state === 'ready' ? children : null}
    </section>
  );
}
