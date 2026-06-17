import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../../components/common/SectionHeader';
import '../../styles/pages/advisorBookings.css';

type AdvisorBookingStatus =
    | 'client_scheduling'
    | 'payment_pending'
    | 'confirmed'
    | 'awaiting_consent'
    | 'ready_to_join'
    | 'in_session'
    | 'completed'
    | 'disputed';

type AdvisorBooking = {
    id: string;
    requestId: string;
    client: {
        name: string;
        company: string;
        initials: string;
    };
    topic: string;
    scheduledFor: string;
    duration: string;
    sessionType: string;
    status: AdvisorBookingStatus;
    roomStatus: string;
    consentStatus: string;
    paymentStatus: string;
    payoutStatus: string;
    nextAction: string;
    prepBrief: string;
    documents: { name: string; type: string }[];
    artifactStatus?: 'not_ready' | 'generating' | 'ready';
    artifactSummary?: string;
    decisions?: number;
    actionItems?: number;
};

const BOOKINGS: AdvisorBooking[] = [
    {
        id: 'bk_001',
        requestId: 'req_002',
        client: {
            name: 'Yusuf Bello',
            company: 'Treyd Capital',
            initials: 'YB',
        },
        topic: 'Fundraising strategy for pre-Series A round',
        scheduledFor: 'Waiting for client to select a slot',
        duration: '60 mins',
        sessionType: 'Advisory session',
        status: 'client_scheduling',
        roomStatus: 'Not created',
        consentStatus: 'Not started',
        paymentStatus: 'Deposit held',
        payoutStatus: 'Not eligible yet',
        nextAction: 'Waiting on client',
        prepBrief:
            'Client has accepted your intake response and needs to choose a slot before final checkout can begin.',
        documents: [{ name: 'Seed round narrative.pdf', type: 'PDF' }],
    },
    {
        id: 'bk_002',
        requestId: 'req_003',
        client: {
            name: 'Sonia Herrera',
            company: 'Paloma Commerce',
            initials: 'SH',
        },
        topic: 'Sales org design and hiring plan for 2026',
        scheduledFor: 'Thu, 18 Sep · 2:00 PM GMT+8',
        duration: '45 mins',
        sessionType: 'Working session',
        status: 'payment_pending',
        roomStatus: 'Pending payment',
        consentStatus: 'Not started',
        paymentStatus: 'Final payment pending',
        payoutStatus: 'Pending confirmation',
        nextAction: 'Monitor payment',
        prepBrief:
            'Client selected the slot. Booking becomes confirmed after payment succeeds and the platform room is created.',
        documents: [],
    },
    {
        id: 'bk_003',
        requestId: 'req_004',
        client: {
            name: 'Arjun Mehta',
            company: 'Kargo Labs',
            initials: 'AM',
        },
        topic: 'Investor narrative workshop',
        scheduledFor: 'Tomorrow · 10:00 AM GMT+8',
        duration: '60 mins',
        sessionType: 'Advisory session',
        status: 'ready_to_join',
        roomStatus: 'Room ready',
        consentStatus: 'Completed',
        paymentStatus: 'Paid',
        payoutStatus: 'Scheduled after completion',
        nextAction: 'Join session',
        prepBrief:
            'Focus the session on tightening the fundraising narrative, objection handling, and sequencing investor outreach.',
        documents: [
            { name: 'Current pitch deck.pdf', type: 'PDF' },
            { name: 'Investor target list.xlsx', type: 'Spreadsheet' },
        ],
    },
    {
        id: 'bk_004',
        requestId: 'req_005',
        client: {
            name: 'Fatima Al-Rashid',
            company: 'Rho Payments',
            initials: 'FA',
        },
        topic: 'Operating model review before regional expansion',
        scheduledFor: 'Completed last week',
        duration: '90 mins',
        sessionType: 'Deep-dive session',
        status: 'completed',
        roomStatus: 'Closed',
        consentStatus: 'Completed',
        paymentStatus: 'Paid',
        payoutStatus: 'Payout pending',
        nextAction: 'Review artifact',
        prepBrief:
            'Session completed. Review the artifact and add advisor notes before the client finalises their action plan.',
        documents: [{ name: 'Expansion model notes.docx', type: 'Document' }],
        artifactStatus: 'ready',
        artifactSummary:
            'Captured operating risks, regional hiring sequence, and decisions around support coverage for the next two quarters.',
        decisions: 4,
        actionItems: 6,
    },
];

const STATUS_META: Record<AdvisorBookingStatus, { label: string; tone: string }> = {
    client_scheduling: { label: 'Client scheduling', tone: 'neutral' },
    payment_pending: { label: 'Payment pending', tone: 'warning' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    awaiting_consent: { label: 'Awaiting consent', tone: 'warning' },
    ready_to_join: { label: 'Ready to join', tone: 'success' },
    in_session: { label: 'In session', tone: 'live' },
    completed: { label: 'Completed', tone: 'neutral' },
    disputed: { label: 'Disputed', tone: 'danger' },
};

const FILTERS: { label: string; value: 'all' | AdvisorBookingStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Scheduling', value: 'client_scheduling' },
    { label: 'Payment', value: 'payment_pending' },
    { label: 'Ready', value: 'ready_to_join' },
    { label: 'Completed', value: 'completed' },
];

function bookingAction(booking: AdvisorBooking, onOpen: () => void) {
    if (booking.status === 'ready_to_join' || booking.status === 'in_session') {
        return <Link to={`/advisor/bookings/${booking.id}/join`} className="btn">Join session</Link>;
    }

    if (booking.status === 'completed') {
        return <button type="button" className="btn" onClick={onOpen}>Review artifact</button>;
    }

    return <button type="button" className="btn ghost" onClick={onOpen}>View details</button>;
}

function BookingDetailModal({ booking, onClose }: { booking: AdvisorBooking; onClose: () => void }) {
    const status = STATUS_META[booking.status];

    return (
        <div className="advisor-booking-modal-backdrop" role="presentation" onClick={onClose}>
            <section
                className="advisor-booking-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="advisor-booking-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="advisor-booking-modal-head">
                    <div>
                        <p className="hero-eyebrow">Booking detail</p>
                        <h2 id="advisor-booking-modal-title">{booking.topic}</h2>
                        <p className="muted">{booking.client.name} · {booking.client.company}</p>
                    </div>
                    <button type="button" className="advisor-booking-modal-close" onClick={onClose} aria-label="Close booking detail">
                        ×
                    </button>
                </div>

                <div className="advisor-booking-modal-status-row">
                    <span className={`advisor-booking-status advisor-booking-status--${status.tone}`}>{status.label}</span>
                    <span className="advisor-booking-request-id">{booking.requestId}</span>
                </div>

                <div className="advisor-booking-modal-grid">
                    <div>
                        <span>Scheduled for</span>
                        <strong>{booking.scheduledFor}</strong>
                    </div>
                    <div>
                        <span>Duration</span>
                        <strong>{booking.duration}</strong>
                    </div>
                    <div>
                        <span>Room</span>
                        <strong>{booking.roomStatus}</strong>
                    </div>
                    <div>
                        <span>Consent</span>
                        <strong>{booking.consentStatus}</strong>
                    </div>
                    <div>
                        <span>Payment</span>
                        <strong>{booking.paymentStatus}</strong>
                    </div>
                    <div>
                        <span>Payout</span>
                        <strong>{booking.payoutStatus}</strong>
                    </div>
                </div>

                <div className="advisor-booking-modal-section">
                    <span className="dash-panel-label">Advisor prep brief</span>
                    <p>{booking.prepBrief}</p>
                </div>

                <div className="advisor-booking-modal-section">
                    <span className="dash-panel-label">Supporting content</span>
                    {booking.documents.length > 0 ? (
                        <div className="advisor-booking-doc-list">
                            {booking.documents.map((doc) => (
                                <button key={doc.name} type="button" className="advisor-booking-doc-chip">
                                    <span>{doc.name}</span>
                                    <small>{doc.type}</small>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="muted">No supporting documents were attached.</p>
                    )}
                </div>

                {booking.artifactStatus === 'ready' && (
                    <div className="advisor-booking-artifact-block">
                        <div>
                            <span className="booking-artifact-label">Session artifact ready</span>
                            <p>{booking.artifactSummary}</p>
                        </div>
                        <div className="advisor-booking-artifact-metrics">
                            <span>{booking.decisions ?? 0} decisions</span>
                            <span>{booking.actionItems ?? 0} actions</span>
                        </div>
                    </div>
                )}

                <div className="advisor-booking-modal-actions">
                    {(booking.status === 'ready_to_join' || booking.status === 'in_session') && (
                        <Link to={`/advisor/bookings/${booking.id}/join`} className="btn">Join session</Link>
                    )}
                    <Link to={`/advisor/bookings/${booking.id}`} className="btn ghost">Open full record</Link>
                    <button type="button" className="btn ghost" onClick={onClose}>Close</button>
                </div>
            </section>
        </div>
    );
}

function BookingCard({ booking, onOpen }: { booking: AdvisorBooking; onOpen: () => void }) {
    const status = STATUS_META[booking.status];

    return (
        <article className="advisor-booking-card">
            <div className="advisor-booking-card-main">
                <div className="advisor-booking-card-top">
                    <div className="advisor-booking-client">
                        <div className="advisor-booking-avatar">{booking.client.initials}</div>
                        <div>
                            <div className="advisor-booking-client-line">
                                <strong>{booking.client.name}</strong>
                                <span>{booking.client.company}</span>
                            </div>
                            <p className="muted">{booking.sessionType}</p>
                        </div>
                    </div>

                    <span className={`advisor-booking-status advisor-booking-status--${status.tone}`}>{status.label}</span>
                </div>

                <div className="advisor-booking-topic">
                    <h3>{booking.topic}</h3>
                    <p className="muted">Request ID: {booking.requestId}</p>
                </div>

                <div className="advisor-booking-meta-grid">
                    <div>
                        <span>Scheduled for</span>
                        <strong>{booking.scheduledFor}</strong>
                    </div>
                    <div>
                        <span>Duration</span>
                        <strong>{booking.duration}</strong>
                    </div>
                    <div>
                        <span>Room</span>
                        <strong>{booking.roomStatus}</strong>
                    </div>
                    <div>
                        <span>Consent</span>
                        <strong>{booking.consentStatus}</strong>
                    </div>
                    <div>
                        <span>Payment</span>
                        <strong>{booking.paymentStatus}</strong>
                    </div>
                    <div>
                        <span>Payout</span>
                        <strong>{booking.payoutStatus}</strong>
                    </div>
                </div>

                {booking.documents.length > 0 && (
                    <div className="advisor-booking-doc-preview">
                        <span>{booking.documents.length} supporting item{booking.documents.length > 1 ? 's' : ''}</span>
                        <button type="button" onClick={onOpen}>View attachments</button>
                    </div>
                )}
            </div>

            <aside className="advisor-booking-card-side">
                {bookingAction(booking, onOpen)}
                <button type="button" className="btn ghost" onClick={onOpen}>Details</button>
            </aside>
        </article>
    );
}

export function AdvisorBookingsPage() {
    const [filter, setFilter] = useState<'all' | AdvisorBookingStatus>('all');
    const [search, setSearch] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<AdvisorBooking | null>(null);
    const [view, setView] = useState<'list' | 'calendar'>('list');

    const filteredBookings = useMemo(() => {
        const query = search.trim().toLowerCase();

        return BOOKINGS.filter((booking) => {
            const matchesFilter = filter === 'all' || booking.status === filter;
            const matchesSearch =
                query.length === 0 ||
                booking.topic.toLowerCase().includes(query) ||
                booking.client.name.toLowerCase().includes(query) ||
                booking.client.company.toLowerCase().includes(query);

            return matchesFilter && matchesSearch;
        });
    }, [filter, search]);

    return (
        <>
            <div className="dash-page-head adv-page-head">
                <div>
                    <p className="hero-eyebrow">Advisor workspace</p>
                    <h1 className="dash-page-title">Booking management</h1>
                    <p className="muted">
                        Track accepted intakes through scheduling, payment, consent, session room readiness, artifacts, and payout state.
                    </p>
                </div>

                <div className="adv-head-actions stack-row">
                    <Link className="btn ghost" to="/advisor/intakes">Intake queue</Link>
                    <Link className="btn" to="/advisor/availability">Manage availability</Link>
                </div>
            </div>

            <div className="advisor-booking-stats-grid">
                <div className="advisor-booking-stat-card">
                    <strong>1</strong>
                    <span>Client scheduling</span>
                </div>
                <div className="advisor-booking-stat-card">
                    <strong>1</strong>
                    <span>Payment pending</span>
                </div>
                <div className="advisor-booking-stat-card">
                    <strong>1</strong>
                    <span>Ready to join</span>
                </div>
                <div className="advisor-booking-stat-card">
                    <strong>$1,320</strong>
                    <span>Pending payout</span>
                </div>
            </div>

            <section className="dash-section advisor-booking-workspace">
                <div className="dash-section-head">
                    <SectionHeader
                        title="Accepted bookings"
                        subtitle="Bookings begin here after intake acceptance; client scheduling and checkout may still be pending."
                    />
                </div>

                <div className="advisor-booking-toolbar">
                    <input
                        type="text"
                        placeholder="Search client, company, or topic..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="advisor-booking-search"
                    />

                    <div className="advisor-booking-filters">
                        {FILTERS.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                className={filter === tab.value ? 'active' : ''}
                                onClick={() => setFilter(tab.value)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="advisor-booking-view-toggle">
                        <button
                            type="button"
                            className={view === 'list' ? 'active' : ''}
                            onClick={() => setView('list')}
                        >
                            Pipeline view
                        </button>

                        <button
                            type="button"
                            className={view === 'calendar' ? 'active' : ''}
                            onClick={() => setView('calendar')}
                        >
                            Calendar view
                        </button>
                    </div>
                </div>

                {view === 'list' ? (
                    <div className="advisor-booking-list">
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onOpen={() => setSelectedBooking(booking)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="advisor-calendar-view">
                        <div className="advisor-calendar-header">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>

                        <div className="advisor-calendar-grid">
                            {filteredBookings.map((booking) => (
                                <button
                                    key={booking.id}
                                    type="button"
                                    className={`advisor-calendar-event advisor-calendar-event--${booking.status}`}
                                    onClick={() => setSelectedBooking(booking)}
                                >
                                    <strong>{booking.client.name}</strong>
                                    <span>{booking.topic}</span>
                                    <small>{booking.scheduledFor}</small>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {selectedBooking && (
                <BookingDetailModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </>
    );
}
