import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/clientRequests.css';

type RequestStatus =
    | 'pending_review'
    | 'accepted'
    | 'declined'
    | 'refunded'
    | 'expired';

type AdvisoryRequest = {
    id: string;
    advisor: {
        id: string;
        name: string;
        title: string;
        initials: string;
        tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
    };
    topic: string;
    companyContext: string;
    submittedAt: string;
    responseDueAt?: string;
    status: RequestStatus;
    escrowAmount: string;
    sessionFee: string;
    advisorResponse?: string;
    declineReason?: string;
    nextAction: 'wait' | 'create_booking' | 'view_decline' | 'reuse_brief' | 'view_request';
    alternatives?: Array<{
        id: string;
        name: string;
        initials: string;
        title: string;
        rate: string;
        reason: string;
    }>;
};

const MOCK_REQUESTS: AdvisoryRequest[] = [
    {
        id: 'req-001',
        advisor: {
            id: 'adv-001',
            name: 'Marcus Holloway',
            title: 'Former CRO, Stripe EMEA',
            initials: 'MH',
            tier: 'Platinum',
        },
        topic: 'Series A fundraising narrative and investor targeting',
        companyContext: 'B2B SaaS · Seed stage · Preparing fundraise in 90 days',
        submittedAt: '2026-05-25T09:30:00+08:00',
        responseDueAt: '2026-05-27T09:30:00+08:00',
        status: 'pending_review',
        escrowAmount: '$450',
        sessionFee: '$900',
        advisorResponse: 'Advisor is reviewing your case brief and supporting context.',
        nextAction: 'wait',
    },
    {
        id: 'req-002',
        advisor: {
            id: 'adv-002',
            name: 'Priya Nair',
            title: 'Ex-CPO, Deliveroo',
            initials: 'PN',
            tier: 'Gold',
        },
        topic: 'Product-market fit diagnostics for B2B SaaS',
        companyContext: 'Usage plateau · Enterprise expansion · Product strategy',
        submittedAt: '2026-05-24T14:10:00+08:00',
        status: 'accepted',
        escrowAmount: '$300',
        sessionFee: '$650',
        advisorResponse: 'Accepted. Create a booking by selecting a slot and completing the remaining payment.',
        nextAction: 'create_booking',
    },
    {
        id: 'req-003',
        advisor: {
            id: 'adv-003',
            name: 'David Osei',
            title: 'Former COO, Flutterwave',
            initials: 'DO',
            tier: 'Diamond',
        },
        topic: 'Scaling operations infrastructure before Series B',
        companyContext: 'Fintech · Regional expansion · Ops design',
        submittedAt: '2026-05-23T11:45:00+08:00',
        status: 'accepted',
        escrowAmount: '$600',
        sessionFee: '$1,200',
        advisorResponse: 'Accepted. A booking can now be created from this request.',
        nextAction: 'create_booking',
    },
    {
        id: 'req-004',
        advisor: {
            id: 'adv-004',
            name: 'Sophie Marchand',
            title: 'Founding Partner, Climate Capital',
            initials: 'SM',
            tier: 'Platinum',
        },
        topic: 'Carbon credit strategy for early-stage climate startups',
        companyContext: 'Climate · GTM strategy · Investor positioning',
        submittedAt: '2026-05-21T16:20:00+08:00',
        status: 'declined',
        escrowAmount: '$450',
        sessionFee: '$850',
        declineReason:
            'The advisor felt the request requires deeper regulatory review than a single session can cover.',
        advisorResponse: 'Declined with full escrow refund initiated.',
        nextAction: 'view_decline',
        alternatives: [
            {
                id: 'adv-005',
                name: 'Tomoko Adachi',
                initials: 'TA',
                title: 'Former CFO, Mercari',
                rate: '$280 / hr',
                reason: 'Strong fit for pricing and investor positioning.',
            },
            {
                id: 'adv-006',
                name: 'Kwame Asante',
                initials: 'KA',
                title: 'Ex-VP Sales, HubSpot',
                rate: '$220 / hr',
                reason: 'Relevant GTM experience for early-stage expansion.',
            },
        ],
    },
];

const STATUS_META: Record<RequestStatus, { label: string; tone: string }> = {
    pending_review: { label: 'Pending advisor review', tone: 'warning' },
    accepted: { label: 'Accepted — booking ready', tone: 'success' },
    declined: { label: 'Declined', tone: 'danger' },
    refunded: { label: 'Refunded', tone: 'neutral' },
    expired: { label: 'Expired', tone: 'neutral' },
};

function getCountdownLabel(dueAt?: string) {
    if (!dueAt) return null;

    const diffMs = new Date(dueAt).getTime() - Date.now();
    if (diffMs <= 0) return 'Response window expired';

    const totalHours = Math.ceil(diffMs / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
}

function RequestAction({ request }: { request: AdvisoryRequest }) {
    if (request.nextAction === 'create_booking') {
        return (
            <Link className="btn" to={`/client/bookings/new?requestId=${request.id}`}>
                Create booking
            </Link>
        );
    }

    if (request.nextAction === 'view_decline') {
        return (
            <Link className="btn ghost" to={`/client/requests/${request.id}`}>
                View decline reason
            </Link>
        );
    }

    if (request.nextAction === 'reuse_brief') {
        return (
            <Link className="btn" to={`/client/requests/new?reuse=${request.id}`}>
                Reuse brief
            </Link>
        );
    }

    return (
        <Link className="btn ghost" to={`/client/requests/${request.id}`}>
            View request
        </Link>
    );
}

function RequestCard({ request }: { request: AdvisoryRequest }) {
    const status = STATUS_META[request.status];
    const countdown = getCountdownLabel(request.responseDueAt);

    return (
        <article className={`client-request-card client-request-card--${status.tone}`}>
            <div className="client-request-main">
                <div className="client-request-advisor">
                    <div className="client-request-avatar">{request.advisor.initials}</div>
                    <div>
                        <div className="client-request-advisor-line">
                            <strong>{request.advisor.name}</strong>
                            <span className="client-tier-badge">{request.advisor.tier}</span>
                        </div>
                        <p className="muted">{request.advisor.title}</p>
                    </div>
                </div>

                <div className="client-request-copy">
                    <h3>{request.topic}</h3>
                    <p className="muted">{request.companyContext}</p>
                </div>

                <div className="client-request-response">
                    <span className={`client-status-badge client-status-badge--${status.tone}`}>
                        {status.label}
                    </span>
                    <p>{request.advisorResponse}</p>

                    {request.declineReason ? (
                        <div className="client-decline-box">
                            <strong>Decline reason</strong>
                            <span>{request.declineReason}</span>
                        </div>
                    ) : null}
                </div>

                {request.alternatives?.length ? (
                    <div className="client-alt-list">
                        <div className="client-alt-label">Suggested alternatives</div>
                        {request.alternatives.map((advisor) => (
                            <Link
                                key={advisor.id}
                                to={`/client/advisors/${advisor.id}`}
                                className="client-alt-card"
                            >
                                <div className="client-alt-avatar">{advisor.initials}</div>
                                <div>
                                    <strong>{advisor.name}</strong>
                                    <span>{advisor.title}</span>
                                    <small>{advisor.reason}</small>
                                </div>
                                <em>{advisor.rate}</em>
                            </Link>
                        ))}
                    </div>
                ) : null}
            </div>

            <aside className="client-request-side">
                <div>
                    <span className="client-side-label">Escrow deposit</span>
                    <strong>{request.escrowAmount}</strong>
                    <small className="muted">
                        {request.status === 'accepted' ? 'Applies to booking payment' : 'Held during review'}
                    </small>
                </div>

                <div>
                    <span className="client-side-label">Quoted session</span>
                    <strong>{request.sessionFee}</strong>
                    <small className="muted">Finalized during booking</small>
                </div>

                {countdown ? (
                    <div className="client-countdown">
                        <i className="ti ti-clock" aria-hidden="true" />
                        <span>{countdown}</span>
                    </div>
                ) : null}

                <RequestAction request={request} />
            </aside>
        </article>
    );
}

export function ClientRequestsPage() {
    const [filter, setFilter] = useState<'all' | RequestStatus>('all');

    const filteredRequests = useMemo(() => {
        if (filter === 'all') return MOCK_REQUESTS;
        return MOCK_REQUESTS.filter((request) => request.status === filter);
    }, [filter]);

    const stats = useMemo(() => {
        return {
            pending: MOCK_REQUESTS.filter((r) => r.status === 'pending_review').length,
            accepted: MOCK_REQUESTS.filter((r) => r.status === 'accepted').length,
            declined: MOCK_REQUESTS.filter((r) => r.status === 'declined').length,
            escrow: MOCK_REQUESTS.filter((r) => ['pending_review', 'accepted'].includes(r.status)).length,
        };
    }, []);

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Advisory requests</p>
                    <h1 className="dash-page-title">Request workspace</h1>
                    <p className="muted">
                        Track submitted case briefs, advisor acceptance decisions, escrow deposits, and decline outcomes.
                    </p>
                </div>

                <div className="adv-head-actions stack-row">
                    <Link to="/client/advisors" className="btn ghost">
                        Browse advisors
                    </Link>
                    <Link to="/client/requests/new" className="btn">
                        Start request
                    </Link>
                </div>
            </div>

            <div className="client-requests-grid">
                <section className="client-requests-primary">
                    <div className="client-request-stats">
                        <div className="client-request-stat">
                            <strong>{stats.pending}</strong>
                            <span>Awaiting advisor</span>
                        </div>
                        <div className="client-request-stat">
                            <strong>{stats.accepted}</strong>
                            <span>Ready to book</span>
                        </div>
                        <div className="client-request-stat">
                            <strong>{stats.declined}</strong>
                            <span>Declined</span>
                        </div>
                        <div className="client-request-stat">
                            <strong>{stats.escrow}</strong>
                            <span>Escrow active</span>
                        </div>
                    </div>

                    <div className="client-request-tabs" aria-label="Request filters">
                        {[
                            { key: 'all', label: 'All' },
                            { key: 'pending_review', label: 'Pending' },
                            { key: 'accepted', label: 'Accepted' },
                            { key: 'declined', label: 'Declined' },
                            { key: 'refunded', label: 'Refunded' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                className={filter === tab.key ? 'active' : ''}
                                onClick={() => setFilter(tab.key as 'all' | RequestStatus)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="client-request-list">
                        {filteredRequests.map((request) => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                </section>

                <aside className="dash-panel client-requests-panel sticky-panel">
                    <div className="dash-panel-section">
                        <div className="dash-panel-label">Request lifecycle</div>
                        <div className="client-flow-list">
                            <div className="client-flow-step active">
                                <span>1</span>
                                <p>Submit case brief and deposit</p>
                            </div>
                            <div className="client-flow-step active">
                                <span>2</span>
                                <p>Advisor reviews within acceptance window</p>
                            </div>
                            <div className="client-flow-step">
                                <span>3</span>
                                <p>Advisor accepts or declines</p>
                            </div>
                            <div className="client-flow-step">
                                <span>4</span>
                                <p>Accepted request moves to booking setup</p>
                            </div>
                        </div>
                    </div>

                    <div className="dash-panel-divider" />

                    <div className="dash-panel-section">
                        <div className="dash-panel-label">Boundary</div>
                        <p className="client-panel-copy muted">
                            Keep slot selection, checkout, consent, join state, and post-session artifacts inside Bookings.
                        </p>
                    </div>

                    <div className="dash-panel-divider" />

                    <div className="dash-panel-section dash-panel-cta">
                        <p className="dash-panel-cta-text">
                            Declined request? Reuse the case brief and submit it to a better-fit advisor.
                        </p>
                        <Link
                            to="/client/recommended"
                            className="btn client-panel-light-btn"
                        >
                            View alternatives →
                        </Link>
                    </div>
                </aside>
            </div>
        </>
    );
}
