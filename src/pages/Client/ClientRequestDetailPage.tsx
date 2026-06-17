import { Link, useParams } from 'react-router-dom';
import '../../styles/pages/clientRequestDetail.css';

type RequestStatus =
    | 'pending_review'
    | 'accepted'
    | 'payment_pending'
    | 'confirmed'
    | 'declined'
    | 'refunded';

type TimelineStep = {
    label: string;
    description: string;
    state: 'done' | 'active' | 'pending' | 'blocked';
};

type AdvisoryRequestDetail = {
    id: string;
    status: RequestStatus;
    advisor: {
        id: string;
        name: string;
        title: string;
        initials: string;
        tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
        rate: string;
    };
    topic: string;
    companyContext: string;
    problemStatement: string;
    desiredOutcome: string;
    submittedAt: string;
    responseDueAt?: string;
    escrowAmount: string;
    sessionFee: string;
    advisorResponse?: string;
    declineReason?: string;
    refundStatus?: string;
    ndaStatus: 'Executed';
    attachment?: {
        name: string;
        size: string;
    };
    alternatives?: Array<{
        id: string;
        name: string;
        initials: string;
        title: string;
        rate: string;
        reason: string;
    }>;
};

const MOCK_REQUESTS: AdvisoryRequestDetail[] = [
    {
        id: 'req-001',
        status: 'pending_review',
        advisor: {
            id: 'adv-001',
            name: 'Marcus Holloway',
            title: 'Former CRO, Stripe EMEA',
            initials: 'MH',
            tier: 'Platinum',
            rate: '$450 / hr',
        },
        topic: 'Series A fundraising narrative and investor targeting',
        companyContext: 'B2B SaaS · Seed stage · Preparing fundraise in 90 days',
        problemStatement:
            'We are preparing for a Series A raise and need help refining our investor story, pipeline, and objection handling.',
        desiredOutcome:
            'A clearer fundraising narrative, sharper investor targeting list, and a recommended meeting sequence.',
        submittedAt: '2026-05-25T09:30:00+08:00',
        responseDueAt: '2026-05-27T09:30:00+08:00',
        escrowAmount: '$450',
        sessionFee: '$900',
        advisorResponse: 'Advisor is reviewing your case brief and supporting context.',
        ndaStatus: 'Executed',
        attachment: {
            name: 'fundraising-context.pdf',
            size: '820 KB',
        },
    },
    {
        id: 'req-002',
        status: 'accepted',
        advisor: {
            id: 'adv-002',
            name: 'Priya Nair',
            title: 'Ex-CPO, Deliveroo',
            initials: 'PN',
            tier: 'Gold',
            rate: '$325 / hr',
        },
        topic: 'Product-market fit diagnostics for B2B SaaS',
        companyContext: 'Usage plateau · Enterprise expansion · Product strategy',
        problemStatement:
            'Our product usage has plateaued across enterprise customers and we need help identifying whether the issue is packaging, onboarding, or product scope.',
        desiredOutcome:
            'A diagnostic framework and recommended next experiments for enterprise expansion.',
        submittedAt: '2026-05-24T14:10:00+08:00',
        escrowAmount: '$300',
        sessionFee: '$650',
        advisorResponse: 'Accepted. Priya recommends a 60-minute working session.',
        ndaStatus: 'Executed',
    },
    {
        id: 'req-004',
        status: 'declined',
        advisor: {
            id: 'adv-004',
            name: 'Sophie Marchand',
            title: 'Founding Partner, Climate Capital',
            initials: 'SM',
            tier: 'Platinum',
            rate: '$425 / hr',
        },
        topic: 'Carbon credit strategy for early-stage climate startups',
        companyContext: 'Climate · GTM strategy · Investor positioning',
        problemStatement:
            'We need guidance on positioning a carbon credit product for investors and early enterprise buyers.',
        desiredOutcome:
            'A stronger GTM angle and investor-facing explanation of our carbon credit strategy.',
        submittedAt: '2026-05-21T16:20:00+08:00',
        escrowAmount: '$450',
        sessionFee: '$850',
        advisorResponse: 'Declined with full escrow refund initiated.',
        declineReason:
            'The advisor felt the request requires deeper regulatory review than a single session can cover.',
        refundStatus: 'Full refund initiated. Expected settlement: 3–5 business days.',
        ndaStatus: 'Executed',
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
    accepted: { label: 'Accepted', tone: 'success' },
    payment_pending: { label: 'Payment pending', tone: 'warning' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    declined: { label: 'Declined', tone: 'danger' },
    refunded: { label: 'Refunded', tone: 'neutral' },
};

function formatDateTime(value: string) {
    return new Intl.DateTimeFormat('en-MY', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(new Date(value));
}

function getTimeline(status: RequestStatus): TimelineStep[] {
    const base: TimelineStep[] = [
        {
            label: 'Request submitted',
            description: 'Case brief, NDA, and escrow deposit recorded.',
            state: 'done',
        },
        {
            label: 'Advisor review',
            description: 'Advisor reviews the brief within the response window.',
            state: status === 'pending_review' ? 'active' : 'done',
        },
        {
            label: 'Advisor response',
            description: 'Advisor accepts, declines, or the request auto-expires.',
            state:
                status === 'pending_review'
                    ? 'pending'
                    : status === 'declined'
                        ? 'blocked'
                        : 'done',
        },
        {
            label: 'Slot and payment',
            description: 'Client selects a slot and completes checkout.',
            state:
                status === 'accepted'
                    ? 'active'
                    : status === 'payment_pending'
                        ? 'active'
                        : status === 'confirmed'
                            ? 'done'
                            : status === 'declined'
                                ? 'blocked'
                                : 'pending',
        },
        {
            label: 'Booking confirmed',
            description: 'Room, consent workflow, and reminders are created.',
            state: status === 'confirmed' ? 'done' : status === 'declined' ? 'blocked' : 'pending',
        },
    ];

    return base;
}

function DetailActions({ request }: { request: AdvisoryRequestDetail }) {
    if (request.status === 'accepted') {
        return (
            <>
                <Link className="btn" to={`/client/requests/${request.id}/slots`}>
                    Select slot
                </Link>
                <Link className="btn ghost" to="/client/requests">
                    Back to requests
                </Link>
            </>
        );
    }

    if (request.status === 'payment_pending') {
        return (
            <>
                <Link className="btn" to={`/client/checkout?requestId=${request.id}`}>
                    Resume checkout
                </Link>
                <Link className="btn ghost" to="/client/requests">
                    Back to requests
                </Link>
            </>
        );
    }

    if (request.status === 'declined') {
        return (
            <>
                <Link className="btn" to="/client/recommended">
                    View alternatives
                </Link>
                <Link className="btn ghost" to="/client/requests/new">
                    Reuse brief
                </Link>
            </>
        );
    }

    return (
        <>
            <button type="button" className="btn ghost">
                Refresh status
            </button>
            <Link className="btn ghost" to="/client/requests">
                Back to requests
            </Link>
        </>
    );
}

export function ClientRequestDetailPage() {
    const { requestId } = useParams();

    const request =
        MOCK_REQUESTS.find((item) => item.id === requestId) ?? MOCK_REQUESTS[0];

    const status = STATUS_META[request.status];
    const timeline = getTimeline(request.status);

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Request detail</p>
                    <h1 className="dash-page-title">{request.topic}</h1>
                    <p className="muted">{request.companyContext}</p>
                </div>

                <div className="request-detail-actions">
                    <DetailActions request={request} />
                </div>
            </div>

            <div className="request-detail-grid">
                <main className="request-detail-main">
                    <section className={`request-detail-hero request-detail-hero--${status.tone}`}>
                        <div className="request-detail-advisor">
                            <div className="request-detail-avatar">{request.advisor.initials}</div>
                            <div>
                                <div className="request-detail-advisor-line">
                                    <strong>{request.advisor.name}</strong>
                                    <span className="request-tier-badge">{request.advisor.tier}</span>
                                </div>
                                <p className="muted">{request.advisor.title}</p>
                            </div>
                        </div>

                        <div className="request-detail-status-row">
                            <span className={`request-status-badge request-status-badge--${status.tone}`}>
                                {status.label}
                            </span>
                            <span className="muted">
                                Submitted {formatDateTime(request.submittedAt)}
                            </span>
                        </div>

                        {request.advisorResponse ? (
                            <p className="request-advisor-response">{request.advisorResponse}</p>
                        ) : null}
                    </section>

                    {request.status === 'declined' ? (
                        <section className="request-decline-panel">
                            <div>
                                <p className="hero-eyebrow">Advisor response</p>
                                <h2>Request declined</h2>
                            </div>

                            <div className="request-decline-reason">
                                <strong>Reason provided</strong>
                                <p>{request.declineReason}</p>
                            </div>

                            {request.refundStatus ? (
                                <div className="request-refund-box">
                                    <i className="ti ti-receipt-refund" aria-hidden="true" />
                                    <span>{request.refundStatus}</span>
                                </div>
                            ) : null}
                        </section>
                    ) : null}

                    <section className="request-detail-section">
                        <div className="request-section-head">
                            <h2>Case brief</h2>
                            <span className="request-nda-pill">NDA {request.ndaStatus}</span>
                        </div>

                        <div className="request-brief-grid">
                            <div>
                                <span>Problem statement</span>
                                <p>{request.problemStatement}</p>
                            </div>

                            <div>
                                <span>Desired outcome</span>
                                <p>{request.desiredOutcome}</p>
                            </div>
                        </div>

                        {request.attachment ? (
                            <div className="request-attachment">
                                <i className="ti ti-paperclip" aria-hidden="true" />
                                <div>
                                    <strong>{request.attachment.name}</strong>
                                    <span>{request.attachment.size}</span>
                                </div>
                            </div>
                        ) : null}
                    </section>

                    {request.alternatives?.length ? (
                        <section className="request-detail-section">
                            <div className="request-section-head">
                                <h2>Suggested alternatives</h2>
                                <Link to="/client/recommended">View more →</Link>
                            </div>

                            <div className="request-alternative-list">
                                {request.alternatives.map((advisor) => (
                                    <Link
                                        key={advisor.id}
                                        to={`/client/advisors/${advisor.id}`}
                                        className="request-alternative-card"
                                    >
                                        <div className="request-alt-avatar">{advisor.initials}</div>
                                        <div>
                                            <strong>{advisor.name}</strong>
                                            <span>{advisor.title}</span>
                                            <p>{advisor.reason}</p>
                                        </div>
                                        <em>{advisor.rate}</em>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ) : null}
                </main>

                <aside className="request-detail-side">
                    <section className="dash-panel">
                        <div className="dash-panel-section">
                            <div className="dash-panel-label">Financial state</div>

                            <div className="request-money-row">
                                <span>Escrow deposit</span>
                                <strong>{request.escrowAmount}</strong>
                            </div>

                            <div className="request-money-row">
                                <span>Session fee</span>
                                <strong>{request.sessionFee}</strong>
                            </div>

                            <div className="request-money-row">
                                <span>Advisor rate</span>
                                <strong>{request.advisor.rate}</strong>
                            </div>
                        </div>
                    </section>

                    <section className="dash-panel">
                        <div className="dash-panel-section">
                            <div className="dash-panel-label">Request timeline</div>

                            <div className="request-timeline">
                                {timeline.map((step) => (
                                    <div
                                        key={step.label}
                                        className={`request-timeline-step request-timeline-step--${step.state}`}
                                    >
                                        <span />
                                        <div>
                                            <strong>{step.label}</strong>
                                            <p>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </>
    );
}