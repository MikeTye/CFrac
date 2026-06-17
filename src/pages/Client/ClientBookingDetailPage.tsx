import { Link, useParams } from 'react-router-dom';
import {
    BookingTimeline,
    type BookingTimelineState,
} from '../../components/bookings/BookingTimeline';
import '../../styles/components/bookingTimeline.css';
import '../../styles/pages/clientBookingDetail.css';

type BookingStatus = BookingTimelineState | 'in_session' | 'cancelled';

const MOCK_BOOKING = {
    id: 'bk_1001',
    status: 'ready_to_join' as BookingStatus,
    advisor: {
        name: 'Marcus Holloway',
        title: 'Former CRO, Stripe EMEA',
        initials: 'MH',
        tier: 'Platinum',
    },
    topic: 'Series A fundraising narrative & investor targeting',
    date: 'Thu, 18 Sep 2025',
    time: '14:00–15:00',
    timezone: 'GMT+8',
    duration: '60 minutes',
    sessionType: 'Strategic advisory session',
    room: {
        state: 'Open 10 minutes before start',
        joinReady: true,
        provider: 'Platform room',
    },
    consent: {
        client: true,
        advisor: false,
        policy: 'Dual consent required for recording and transcription',
    },
    recording: {
        state: 'Waiting for advisor consent',
        transcript: 'Not started',
        summary: 'Generated after session',
    },
    reminders: [
        '24 hours before session',
        '1 hour before session',
        '10 minutes before room opens',
    ],
    audit: [
        { label: 'Request submitted', value: '16 Sep · 09:14' },
        { label: 'Advisor accepted', value: '16 Sep · 14:32' },
        { label: 'Payment confirmed', value: '16 Sep · 14:41' },
        { label: 'Room created', value: '16 Sep · 14:42' },
    ],
    artifact: {
        status: 'ready',
        summary:
            'The session focused on tightening the Series A narrative around repeatable revenue, founder-market fit, and investor segmentation.',
        decisions: [
            'Lead with expansion revenue instead of raw logo count.',
            'Position the next raise around category ownership, not only growth.',
            'Prioritise climate-focused growth funds before generalist funds.',
        ],
        actionItems: [
            {
                owner: 'Client',
                task: 'Rewrite the opening 3 slides with the revised investor narrative.',
                due: 'Before next advisor review',
            },
            {
                owner: 'Client',
                task: 'Prepare a segmented investor target list by fund thesis.',
                due: 'This week',
            },
            {
                owner: 'Advisor',
                task: 'Review revised deck narrative asynchronously.',
                due: 'After upload',
            },
        ],
        risks: [
            'Current proof points may not yet support premium valuation expectations.',
            'Regulatory claims need clearer evidence before investor circulation.',
        ],
        transcriptStatus: 'Transcript processed',
        recordingStatus: 'Recording retained privately',
    },
};

function StatusBadge({ status }: { status: BookingStatus }) {
    const label = status.replace('_', ' ');

    return (
        <span className={`booking-status booking-status--${status}`}>
            {label}
        </span>
    );
}

function ReadinessCard() {
    const canJoin = MOCK_BOOKING.room.joinReady && MOCK_BOOKING.consent.client;

    return (
        <section className="booking-readiness-card">
            <div>
                <p className="hero-eyebrow">Join readiness</p>
                <h2>{canJoin ? 'Room is ready for you' : 'Action required before joining'}</h2>
                <p className="muted">
                    {MOCK_BOOKING.room.state}. Recording and transcription depend on both parties
                    completing consent.
                </p>
            </div>

            <div className="booking-readiness-actions">
                <Link
                    to={`/client/bookings/${MOCK_BOOKING.id}/join`}
                    className={canJoin ? 'btn' : 'btn disabled'}
                    aria-disabled={!canJoin}
                >
                    Join session
                </Link>
                <button type="button" className="btn ghost">
                    Test audio/video
                </button>
            </div>
        </section>
    );
}

export function ClientBookingDetailPage() {
    const { bookingId } = useParams();

    const timelineState: BookingTimelineState =
        MOCK_BOOKING.status === 'in_session' || MOCK_BOOKING.status === 'cancelled'
            ? 'ready_to_join'
            : MOCK_BOOKING.status;

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Booking detail</p>
                    <h1 className="dash-page-title">{MOCK_BOOKING.topic}</h1>
                    <p className="muted">
                        Booking {bookingId ?? MOCK_BOOKING.id} · {MOCK_BOOKING.date} ·{' '}
                        {MOCK_BOOKING.time} {MOCK_BOOKING.timezone}
                    </p>
                </div>

                <div className="booking-head-actions">
                    <StatusBadge status={MOCK_BOOKING.status} />
                    <button type="button" className="btn ghost">Reschedule</button>
                    <button type="button" className="btn ghost danger">Cancel</button>
                </div>
            </div>

            <div className="booking-detail-layout">
                <main className="booking-detail-main">
                    <ReadinessCard />

                    <section className="booking-card">
                        <div className="booking-section-head">
                            <div>
                                <p className="hero-eyebrow">Session</p>
                                <h2>Session management</h2>
                            </div>
                        </div>

                        <div className="booking-session-grid">
                            <div>
                                <span className="booking-field-label">Advisor</span>
                                <div className="booking-advisor-row">
                                    <div className="booking-avatar">{MOCK_BOOKING.advisor.initials}</div>
                                    <div>
                                        <strong>{MOCK_BOOKING.advisor.name}</strong>
                                        <span className="muted">{MOCK_BOOKING.advisor.title}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="booking-field-label">Session type</span>
                                <strong>{MOCK_BOOKING.sessionType}</strong>
                                <span className="muted">{MOCK_BOOKING.duration}</span>
                            </div>

                            <div>
                                <span className="booking-field-label">Room state</span>
                                <strong>{MOCK_BOOKING.room.provider}</strong>
                                <span className="muted">{MOCK_BOOKING.room.state}</span>
                            </div>

                            <div>
                                <span className="booking-field-label">Advisor tier</span>
                                <strong>{MOCK_BOOKING.advisor.tier}</strong>
                                <span className="muted">Escrow and intake policy applied</span>
                            </div>
                        </div>
                    </section>

                    <section className="booking-card">
                        <div className="booking-section-head">
                            <div>
                                <p className="hero-eyebrow">Consent and artifacts</p>
                                <h2>Trust workflow</h2>
                            </div>
                        </div>

                        <div className="booking-trust-grid">
                            <div className="booking-trust-item">
                                <span className="booking-trust-icon booking-trust-icon--ok">
                                    <i className="ti ti-check" />
                                </span>
                                <div>
                                    <strong>Client consent</strong>
                                    <span className="muted">Completed</span>
                                </div>
                            </div>

                            <div className="booking-trust-item">
                                <span className="booking-trust-icon booking-trust-icon--wait">
                                    <i className="ti ti-clock" />
                                </span>
                                <div>
                                    <strong>Advisor consent</strong>
                                    <span className="muted">Pending</span>
                                </div>
                            </div>

                            <div className="booking-trust-item">
                                <span className="booking-trust-icon booking-trust-icon--wait">
                                    <i className="ti ti-video" />
                                </span>
                                <div>
                                    <strong>Recording</strong>
                                    <span className="muted">{MOCK_BOOKING.recording.state}</span>
                                </div>
                            </div>

                            <div className="booking-trust-item">
                                <span className="booking-trust-icon booking-trust-icon--neutral">
                                    <i className="ti ti-file-text" />
                                </span>
                                <div>
                                    <strong>Transcript</strong>
                                    <span className="muted">{MOCK_BOOKING.recording.transcript}</span>
                                </div>
                            </div>
                        </div>

                        <div className="booking-policy-note">
                            <i className="ti ti-shield-lock" aria-hidden="true" />
                            <span>{MOCK_BOOKING.consent.policy}</span>
                        </div>
                    </section>

                    <section className="booking-card">
                        <div className="booking-section-head">
                            <div>
                                <p className="hero-eyebrow">Post-session artifact</p>
                                <h2>Session record</h2>
                            </div>

                            <span className="booking-status booking-status--success">
                                Artifact ready
                            </span>
                        </div>

                        <div className="booking-artifact-detail">
                            <div className="booking-artifact-summary">
                                <span className="booking-field-label">AI-assisted summary</span>
                                <p>{MOCK_BOOKING.artifact.summary}</p>
                            </div>

                            <div className="booking-artifact-columns">
                                <div>
                                    <h3>Decisions</h3>
                                    <ul>
                                        {MOCK_BOOKING.artifact.decisions.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3>Risks / open questions</h3>
                                    <ul>
                                        {MOCK_BOOKING.artifact.risks.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3>Action items</h3>
                                <div className="booking-action-list">
                                    {MOCK_BOOKING.artifact.actionItems.map((item) => (
                                        <div key={item.task} className="booking-action-row">
                                            <strong>{item.owner}</strong>
                                            <span>{item.task}</span>
                                            <em>{item.due}</em>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <aside className="booking-detail-side">
                    <section className="booking-card">
                        <p className="hero-eyebrow">Timeline</p>
                        <BookingTimeline currentState={timelineState} />
                    </section>

                    <section className="booking-card">
                        <p className="hero-eyebrow">Reminders</p>
                        <div className="booking-reminder-list">
                            {MOCK_BOOKING.reminders.map((reminder) => (
                                <div key={reminder} className="booking-reminder-row">
                                    <i className="ti ti-bell" aria-hidden="true" />
                                    <span>{reminder}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="booking-card">
                        <p className="hero-eyebrow">Audit trail</p>
                        <div className="booking-audit-list">
                            {MOCK_BOOKING.audit.map((item) => (
                                <div key={item.label} className="booking-audit-row">
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </>
    );
}