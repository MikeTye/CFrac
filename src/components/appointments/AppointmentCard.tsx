import { Link } from 'react-router-dom';

export type AppointmentStatus =
    | 'upcoming'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'pending-confirmation';

export interface Appointment {
    id: string;
    advisor: {
        name: string;
        title: string;
        initials: string;
        /** e.g. "GTM Strategy" */
        function: string;
    };
    date: string;          // ISO date string
    timeStart: string;     // "14:00"
    timeEnd: string;       // "15:00"
    duration: 30 | 60 | 90;
    status: AppointmentStatus;
    topic: string;
    /** Whether AI session summary is ready */
    summaryReady?: boolean;
    /** Whether recording is available */
    recordingReady?: boolean;
}

/* ─────────────────────────────────────────────
   STATUS CONFIG
───────────────────────────────────────────── */
const STATUS_CONFIG: Record<
    AppointmentStatus,
    { label: string; className: string }
> = {
    upcoming: { label: 'Upcoming', className: 'appt-status--upcoming' },
    'in-progress': { label: 'In progress', className: 'appt-status--live' },
    completed: { label: 'Completed', className: 'appt-status--done' },
    cancelled: { label: 'Cancelled', className: 'appt-status--cancelled' },
    'pending-confirmation': {
        label: 'Awaiting confirmation',
        className: 'appt-status--pending',
    },
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export function AppointmentCard({
    appt,
    variant = 'default',
}: {
    appt: Appointment;
    /** "default" = full card; "compact" = condensed row for list views */
    variant?: 'default' | 'compact';
}) {
    const status = STATUS_CONFIG[appt.status];

    if (variant === 'compact') {
        return (
            <Link
                to={`/appointments/${appt.id}`}
                className="appt-card-compact"
                aria-label={`Session with ${appt.advisor.name} on ${formatDate(appt.date)}`}
            >
                {/* Left accent bar driven by status */}
                <div className={`appt-compact-accent appt-accent--${appt.status}`} />
                <div className="appt-compact-avatar">
                    {appt.advisor.initials}
                </div>
                <div className="appt-compact-body">
                    <div className="appt-compact-top">
                        <span className="appt-compact-name">{appt.advisor.name}</span>
                        <span className={`appt-status ${status.className}`}>
                            {status.label}
                        </span>
                    </div>
                    <div className="appt-compact-meta">
                        <span>{appt.topic}</span>
                        <span className="appt-compact-sep">·</span>
                        <span>{formatDate(appt.date)}, {appt.timeStart}–{appt.timeEnd}</span>
                        <span className="appt-compact-sep">·</span>
                        <span>{appt.duration} min</span>
                    </div>
                </div>
                <div className="appt-compact-arrow" aria-hidden="true">→</div>
            </Link>
        );
    }

    /* ── Default (full) card ── */
    return (
        <article className="appt-card">
            {/* Left border accent — status-coloured */}
            <div className={`appt-card-accent appt-accent--${appt.status}`} />

            <div className="appt-card-inner">
                {/* Header row */}
                <div className="appt-card-header">
                    <div className="appt-card-advisor">
                        <div className="appt-card-avatar">{appt.advisor.initials}</div>
                        <div>
                            <div className="appt-card-advisor-name">
                                {appt.advisor.name}
                            </div>
                            <div className="appt-card-advisor-title muted">
                                {appt.advisor.title}
                            </div>
                        </div>
                    </div>
                    <span className={`appt-status ${status.className}`}>
                        {status.label}
                    </span>
                </div>

                {/* Topic */}
                <div className="appt-card-topic">{appt.topic}</div>

                {/* Meta row */}
                <div className="appt-card-meta stack-row">
                    <span className="badge">{appt.advisor.function}</span>
                    <span className="appt-meta-sep" aria-hidden="true">·</span>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>
                        {formatDate(appt.date)}
                    </span>
                    <span className="appt-meta-sep" aria-hidden="true">·</span>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>
                        {appt.timeStart}–{appt.timeEnd}
                    </span>
                    <span className="appt-meta-sep" aria-hidden="true">·</span>
                    <span className="muted" style={{ fontSize: '0.8rem' }}>
                        {appt.duration} min
                    </span>
                </div>

                {/* Footer actions */}
                <div className="appt-card-footer">
                    {appt.status === 'upcoming' || appt.status === 'in-progress' ? (
                        <>
                            <Link
                                to={`/appointments/${appt.id}/join`}
                                className={`btn ${appt.status === 'in-progress' ? '' : 'ghost'}`}
                                style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                            >
                                {appt.status === 'in-progress' ? '● Join now' : 'Join session'}
                            </Link>
                            <Link
                                to={`/appointments/${appt.id}`}
                                className="btn ghost"
                                style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                            >
                                Details
                            </Link>
                        </>
                    ) : appt.status === 'completed' ? (
                        <>
                            {appt.summaryReady && (
                                <Link
                                    to={`/appointments/${appt.id}/summary`}
                                    className="btn ghost"
                                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                                >
                                    AI summary
                                </Link>
                            )}
                            {appt.recordingReady && (
                                <Link
                                    to={`/appointments/${appt.id}/recording`}
                                    className="btn ghost"
                                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                                >
                                    Recording
                                </Link>
                            )}
                            <Link
                                to={`/appointments/${appt.id}/review`}
                                className="btn ghost"
                                style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                            >
                                Leave review
                            </Link>
                        </>
                    ) : appt.status === 'pending-confirmation' ? (
                        <span
                            className="muted"
                            style={{ fontSize: '0.8rem', fontStyle: 'italic' }}
                        >
                            Waiting for advisor to confirm
                        </span>
                    ) : null}
                </div>
            </div>
        </article>
    );
}