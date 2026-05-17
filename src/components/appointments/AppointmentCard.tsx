import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */

export type AppointmentStatus =
    | 'upcoming'
    | 'in-progress'
    | 'completed'
    | 'cancelled'
    | 'pending-confirmation';

/**
 * The Appointment type is perspective-agnostic.
 * Both `advisor` and `client` fields are optional
 * so a single type works for both dashboards.
 *
 * Advisor perspective  → populate `client` field.
 * Client perspective   → populate `advisor` field.
 */
export interface Appointment {
    id: string;

    /** Present when rendered from the advisor's perspective */
    client?: {
        name: string;
        company: string;
        initials: string;
    };

    /** Present when rendered from the client's perspective */
    advisor?: {
        name: string;
        title: string;
        initials: string;
        function: string;
    };

    date: string;
    timeStart: string;
    timeEnd: string;
    duration: 30 | 60 | 90;
    status: AppointmentStatus;
    topic: string;
    summaryReady?: boolean;
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
    return new Date(iso).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Derives the display person from the appointment
 * based on whose workspace is rendering the card.
 */
function getParty(appt: Appointment, perspective: 'advisor' | 'client') {
    if (perspective === 'advisor' && appt.client) {
        return {
            initials: appt.client.initials,
            primaryLine: appt.client.name,
            secondaryLine: appt.client.company,
        };
    }
    if (perspective === 'client' && appt.advisor) {
        return {
            initials: appt.advisor.initials,
            primaryLine: appt.advisor.name,
            secondaryLine: appt.advisor.title,
        };
    }
    // Fallback: should not happen with correct data
    return { initials: '?', primaryLine: 'Unknown', secondaryLine: '' };
}

/* ─────────────────────────────────────────────
   PROPS
───────────────────────────────────────────── */

type AppointmentCardProps = {
    appt: Appointment;
    variant?: 'default' | 'compact';
    perspective?: 'advisor' | 'client';
};

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */

export function AppointmentCard({
    appt,
    variant = 'default',
    perspective = 'advisor',
}: AppointmentCardProps) {
    const status = STATUS_CONFIG[appt.status];
    const party = getParty(appt, perspective);

    /* ── Compact variant ── */
    if (variant === 'compact') {
        return (
            <Link
                to={`/appointments/${appt.id}`}
                className="appt-card-compact"
                aria-label={`Session with ${party.primaryLine} on ${formatDate(appt.date)}`}
            >
                <div className={`appt-compact-accent appt-accent--${appt.status}`} />

                <div className="appt-compact-avatar">
                    {party.initials}
                </div>

                <div className="appt-compact-body">
                    <div className="appt-compact-top">
                        <span className="appt-compact-name">{party.primaryLine}</span>
                        <span className={`appt-status ${status.className}`}>
                            {status.label}
                        </span>
                    </div>
                    <div className="appt-compact-meta">
                        <span>{appt.topic}</span>
                        <span className="appt-compact-sep" aria-hidden="true">·</span>
                        <span>{formatDate(appt.date)}, {appt.timeStart}–{appt.timeEnd}</span>
                        <span className="appt-compact-sep" aria-hidden="true">·</span>
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
            {/* Left accent bar — status-coloured */}
            <div className={`appt-card-accent appt-accent--${appt.status}`} />

            <div className="appt-card-inner">

                {/* Header row */}
                <div className="appt-card-header">
                    <div className="appt-card-party">
                        <div className="appt-card-avatar">{party.initials}</div>
                        <div>
                            <div className="appt-card-party-name">{party.primaryLine}</div>
                            <div className="appt-card-party-sub muted">{party.secondaryLine}</div>
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
                    {/* Badge differs by perspective */}
                    {perspective === 'advisor' && appt.client?.company && (
                        <span className="badge">{appt.client.company}</span>
                    )}
                    {perspective === 'client' && appt.advisor?.function && (
                        <span className="badge">{appt.advisor.function}</span>
                    )}
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

                {/* Footer actions — differ slightly by perspective */}
                <div className="appt-card-footer">
                    {(appt.status === 'upcoming' || appt.status === 'in-progress') && (
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
                    )}

                    {appt.status === 'completed' && (
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
                            {/* Only clients leave reviews; advisors view session notes */}
                            {perspective === 'client' && (
                                <Link
                                    to={`/appointments/${appt.id}/review`}
                                    className="btn ghost"
                                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                                >
                                    Leave review
                                </Link>
                            )}
                            {perspective === 'advisor' && (
                                <Link
                                    to={`/appointments/${appt.id}`}
                                    className="btn ghost"
                                    style={{ fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
                                >
                                    Session notes
                                </Link>
                            )}
                        </>
                    )}

                    {appt.status === 'pending-confirmation' && (
                        <span
                            className="muted"
                            style={{ fontSize: '0.8rem', fontStyle: 'italic' }}
                        >
                            {perspective === 'advisor'
                                ? 'Waiting for you to confirm'
                                : 'Waiting for advisor to confirm'}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}