import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/clientBookings.css';

type BookingStatus =
    | 'slot_selection'
    | 'payment_pending'
    | 'confirmed'
    | 'awaiting_consent'
    | 'ready_to_join'
    | 'completed';

type Booking = {
    id: string;
    advisor: {
        name: string;
        initials: string;
        title: string;
        tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
    };
    requestId: string;
    topic: string;
    scheduledFor: string;
    duration: string;
    roomStatus: string;
    consentStatus: string;
    paymentStatus: string;
    status: BookingStatus;
    nextAction: string;
    artifactStatus?: 'not_ready' | 'generating' | 'ready';
    artifactSummary?: string;
    decisions?: number;
    actionItems?: number;
};

const BOOKINGS: Booking[] = [
    {
        id: 'bk_001',
        requestId: 'req_002',
        advisor: {
            name: 'Priya Nair',
            initials: 'PN',
            title: 'Ex-CPO, Deliveroo',
            tier: 'Gold',
        },
        topic: 'Product-market fit diagnostics',
        scheduledFor: 'Select a session slot',
        duration: '60 mins',
        roomStatus: 'Not created',
        consentStatus: 'Not started',
        paymentStatus: 'Pending final payment',
        status: 'slot_selection',
        nextAction: 'Select slot',
    },

    {
        id: 'bk_002',
        requestId: 'req_003',
        advisor: {
            name: 'David Osei',
            initials: 'DO',
            title: 'Former COO, Flutterwave',
            tier: 'Diamond',
        },
        topic: 'Operations scaling before Series B',
        scheduledFor: 'Thu, 18 Sep · 2:00 PM GMT+8',
        duration: '90 mins',
        roomStatus: 'Provisioning room',
        consentStatus: 'Pending',
        paymentStatus: 'Deposit applied',
        status: 'payment_pending',
        nextAction: 'Complete payment',
    },

    {
        id: 'bk_003',
        requestId: 'req_004',
        advisor: {
            name: 'Marcus Holloway',
            initials: 'MH',
            title: 'Former CRO, Stripe EMEA',
            tier: 'Platinum',
        },
        topic: 'Investor narrative workshop',
        scheduledFor: 'Tomorrow · 10:00 AM GMT+8',
        duration: '60 mins',
        roomStatus: 'Room ready',
        consentStatus: 'Completed',
        paymentStatus: 'Paid',
        status: 'ready_to_join',
        nextAction: 'Join session',
    },

    {
        id: 'bk_004',
        requestId: 'req_005',
        advisor: {
            name: 'Sophie Marchand',
            initials: 'SM',
            title: 'Founding Partner, Climate Capital',
            tier: 'Platinum',
        },
        topic: 'Climate fundraising positioning',
        scheduledFor: 'Completed last week',
        duration: '60 mins',
        roomStatus: 'Closed',
        consentStatus: 'Completed',
        paymentStatus: 'Paid',
        status: 'completed',
        nextAction: 'View session record',
        artifactStatus: 'ready',
        artifactSummary:
            'Refined investor positioning around regulatory readiness, buyer segmentation, and credible climate impact proof.',
        decisions: 3,
        actionItems: 5,
    },
];

const STATUS_META: Record<
    BookingStatus,
    {
        label: string;
        tone: string;
    }
> = {
    slot_selection: {
        label: 'Slot selection',
        tone: 'neutral',
    },

    payment_pending: {
        label: 'Payment pending',
        tone: 'warning',
    },

    confirmed: {
        label: 'Confirmed',
        tone: 'success',
    },

    awaiting_consent: {
        label: 'Awaiting consent',
        tone: 'warning',
    },

    ready_to_join: {
        label: 'Ready to join',
        tone: 'success',
    },

    completed: {
        label: 'Completed',
        tone: 'neutral',
    },
};

function BookingAction({ booking }: { booking: Booking }) {
    if (booking.status === 'slot_selection') {
        return (
            <Link
                to={`/client/bookings/${booking.id}/slots`}
                className="btn"
            >
                Select slot
            </Link>
        );
    }

    if (booking.status === 'payment_pending') {
        return (
            <Link
                to={`/client/checkout?bookingId=${booking.id}`}
                className="btn"
            >
                Complete payment
            </Link>
        );
    }

    if (booking.status === 'ready_to_join') {
        return (
            <Link
                to={`/client/bookings/${booking.id}`}
                className="btn"
            >
                Join session
            </Link>
        );
    }

    return (
        <Link
            to={`/client/bookings/${booking.id}`}
            className="btn ghost"
        >
            {booking.nextAction}
        </Link>
    );
}

function BookingCard({ booking }: { booking: Booking }) {
    const status = STATUS_META[booking.status];

    return (
        <article className="booking-workspace-card">
            <div className="booking-card-main">

                <div className="booking-card-top">
                    <div className="booking-advisor">
                        <div className="booking-avatar">
                            {booking.advisor.initials}
                        </div>

                        <div>
                            <div className="booking-advisor-line">
                                <strong>{booking.advisor.name}</strong>

                                <span className="booking-tier">
                                    {booking.advisor.tier}
                                </span>
                            </div>

                            <p className="muted">
                                {booking.advisor.title}
                            </p>
                        </div>
                    </div>

                    <span className={`booking-status booking-status--${status.tone}`}>
                        {status.label}
                    </span>
                </div>

                <div className="booking-topic">
                    <h3>{booking.topic}</h3>

                    <p className="muted">
                        Request ID: {booking.requestId}
                    </p>
                </div>

                <div className="booking-meta-grid">

                    <div className="booking-meta-card">
                        <span>Scheduled for</span>
                        <strong>{booking.scheduledFor}</strong>
                    </div>

                    <div className="booking-meta-card">
                        <span>Duration</span>
                        <strong>{booking.duration}</strong>
                    </div>

                    <div className="booking-meta-card">
                        <span>Room state</span>
                        <strong>{booking.roomStatus}</strong>
                    </div>

                    <div className="booking-meta-card">
                        <span>Consent</span>
                        <strong>{booking.consentStatus}</strong>
                    </div>

                    <div className="booking-meta-card">
                        <span>Payment</span>
                        <strong>{booking.paymentStatus}</strong>
                    </div>

                </div>

                {booking.status === 'completed' && (
                    <div className="booking-artifact-preview">
                        <div>
                            <span className="booking-artifact-label">Session artifact ready</span>
                            <p>{booking.artifactSummary}</p>
                        </div>

                        <div className="booking-artifact-metrics">
                            <span>{booking.decisions ?? 0} decisions</span>
                            <span>{booking.actionItems ?? 0} actions</span>
                        </div>
                    </div>
                )}
            </div>

            <aside className="booking-card-side">

                <BookingAction booking={booking} />

                <Link
                    to={`/client/bookings/${booking.id}`}
                    className="btn ghost"
                >
                    View booking
                </Link>

            </aside>
        </article>
    );
}

export function ClientBookingsPage() {
    const [filter, setFilter] = useState<'all' | BookingStatus>('all');
    const [search, setSearch] = useState('');

    const filteredBookings = useMemo(() => {
        return BOOKINGS.filter((booking) => {
            const matchesFilter =
                filter === 'all'
                    ? true
                    : booking.status === filter;

            const query = search.toLowerCase();

            const matchesSearch =
                booking.topic.toLowerCase().includes(query) ||
                booking.advisor.name.toLowerCase().includes(query);

            return matchesFilter && matchesSearch;
        });
    }, [filter, search]);

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Bookings</p>

                    <h1 className="dash-page-title">
                        Session operations
                    </h1>

                    <p className="muted">
                        Manage scheduling, payment completion, consent,
                        join readiness, recordings, and post-session artifacts.
                    </p>
                </div>

                <Link
                    to="/client/requests"
                    className="btn ghost"
                >
                    View requests
                </Link>
            </div>

            <div className="booking-toolbar">

                <input
                    type="text"
                    placeholder="Search advisor or topic..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="booking-search"
                />

                <div className="booking-filters">

                    {[
                        ['all', 'All'],
                        ['slot_selection', 'Slot selection'],
                        ['payment_pending', 'Payment'],
                        ['ready_to_join', 'Ready'],
                        ['completed', 'Completed'],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            type="button"
                            className={filter === key ? 'active' : ''}
                            onClick={() =>
                                setFilter(key as 'all' | BookingStatus)
                            }
                        >
                            {label}
                        </button>
                    ))}

                </div>

            </div>

            <div className="booking-stats-grid">

                <div className="booking-stat-card">
                    <strong>1</strong>
                    <span>Needs scheduling</span>
                </div>

                <div className="booking-stat-card">
                    <strong>1</strong>
                    <span>Awaiting payment</span>
                </div>

                <div className="booking-stat-card">
                    <strong>1</strong>
                    <span>Ready to join</span>
                </div>

                <div className="booking-stat-card">
                    <strong>1</strong>
                    <span>Artifacts available</span>
                </div>

            </div>

            <div className="booking-workspace-list">
                {filteredBookings.map((booking) => (
                    <BookingCard
                        key={booking.id}
                        booking={booking}
                    />
                ))}
            </div>
        </>
    );
}