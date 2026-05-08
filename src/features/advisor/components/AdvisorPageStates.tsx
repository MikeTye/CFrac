import type { ReactNode } from 'react';

export type AdvisorDataState = 'ready' | 'loading' | 'empty' | 'error';

export function AdvisorLoadingState({ sections = 3 }: { sections?: number }) {
  return (
    <div className="advisor-state" aria-live="polite" aria-busy="true">
      {Array.from({ length: sections }).map((_, index) => (
        <div key={index} className="advisor-skeleton" style={{ height: index === 0 ? '56px' : '120px' }} />
      ))}
    </div>
  );
}

export function AdvisorEmptyState({ cta }: { cta?: ReactNode }) {
  return (
    <div className="advisor-state">
      <p className="advisor-state__title">No records</p>
      <p className="advisor-state__message">No records are available yet. Try refreshing or adjust filters.</p>
      {cta}
    </div>
  );
}

export function AdvisorErrorState({ onRetry, onEscalate }: { onRetry?: () => void; onEscalate?: () => void }) {
  return (
    <div className="advisor-state" role="alert">
      <p className="advisor-state__title">Something went wrong</p>
      <p className="advisor-state__message">Please retry. If this continues, contact support for escalation.</p>
      <div className="stack-row">
        <button type="button" className="btn" onClick={onRetry}>Retry</button>
        <button type="button" className="btn ghost" onClick={onEscalate}>Contact support</button>
      </div>
    </div>
  );
}
