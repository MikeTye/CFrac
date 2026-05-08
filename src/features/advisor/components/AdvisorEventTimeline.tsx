import { AdvisorEmptyState, AdvisorErrorState, AdvisorLoadingState, type AdvisorDataState } from './AdvisorPageStates';

export type AdvisorTimelineEvent = {
  id: string;
  timeLabel: string;
  title: string;
  detail?: string;
};

export function AdvisorEventTimeline({
  title = 'Event timeline',
  events,
  state = 'ready',
  onRetry,
  onEscalate,
}: {
  title?: string;
  events: AdvisorTimelineEvent[];
  state?: AdvisorDataState;
  onRetry?: () => void;
  onEscalate?: () => void;
}) {
  return (
    <section className="advisor-timeline">
      <h2 className="advisor-timeline__title">{title}</h2>
      {state === 'loading' ? <AdvisorLoadingState sections={2} /> : null}
      {state === 'error' ? <AdvisorErrorState onRetry={onRetry} onEscalate={onEscalate} /> : null}
      {state === 'empty' || (state === 'ready' && events.length === 0) ? <AdvisorEmptyState /> : null}
      {state === 'ready' && events.length > 0 ? (
        <ol className="advisor-timeline__list">
          {events.map((event) => (
            <li key={event.id} className="advisor-timeline__item">
              <span className="advisor-timeline__time">{event.timeLabel}</span>
              <div>
                <p className="advisor-state__title">{event.title}</p>
                {event.detail ? <p className="advisor-state__message">{event.detail}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
