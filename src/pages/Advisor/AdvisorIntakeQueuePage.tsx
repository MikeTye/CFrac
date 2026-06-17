import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../../components/common/SectionHeader';
import '../../styles/pages/advisorIntakeQueue.css';

type IntakeStatus = 'pending' | 'expiring' | 'accepted' | 'declined';

type IntakeAttachment = {
    id: string;
    name: string;
    type: string;
    size: string;
};

type AdvisorIntake = {
    id: string;
    clientName: string;
    company: string;
    initials: string;
    title: string;
    companyContext: string;
    problemStatement: string;
    desiredOutcome: string;
    function: string;
    sessionFormat: string;
    submittedAt: string;
    deadline: string;
    status: IntakeStatus;
    deposit: number;
    estimatedSessionFee: number;
    hasNda: boolean;
    attachments: IntakeAttachment[];
};

const MOCK_INTAKES: AdvisorIntake[] = [
    {
        id: 'i1',
        clientName: 'Yusuf Bello',
        company: 'Treyd Capital',
        initials: 'YB',
        title: 'Fundraising strategy for pre-Series A round',
        companyContext: 'Fintech infrastructure · Seed stage · raising in 90 days',
        problemStatement:
            'We need help sharpening our investor narrative, pressure-testing our target investor list, and preparing responses to likely objections before partner meetings.',
        desiredOutcome:
            'A sharper fundraising story, recommended investor sequence, and a list of risks to address before outreach.',
        function: 'Finance & Capital',
        sessionFormat: '60 min advisory session',
        submittedAt: '2 hours ago',
        deadline: '46h remaining',
        status: 'expiring',
        deposit: 450,
        estimatedSessionFee: 900,
        hasNda: true,
        attachments: [
            { id: 'a1', name: 'Investor narrative draft.pdf', type: 'PDF', size: '1.4 MB' },
            { id: 'a2', name: 'Target investor list.xlsx', type: 'Spreadsheet', size: '620 KB' },
        ],
    },
    {
        id: 'i2',
        clientName: 'Sonia Herrera',
        company: 'Paloma Commerce',
        initials: 'SH',
        title: 'Sales org design and hiring plan for 2026',
        companyContext: 'B2B commerce SaaS · Series A · expanding GTM team',
        problemStatement:
            'We are moving from founder-led sales to a repeatable sales motion and need help designing the first sales leadership layer.',
        desiredOutcome:
            'Recommended sales org structure, hiring sequence, and operating rhythm for the next two quarters.',
        function: 'Revenue & GTM',
        sessionFormat: '45 min advisory session',
        submittedAt: 'Yesterday',
        deadline: '23h remaining',
        status: 'pending',
        deposit: 300,
        estimatedSessionFee: 650,
        hasNda: true,
        attachments: [],
    },
    {
        id: 'i3',
        clientName: 'Amelia Chen',
        company: 'Northstar Robotics',
        initials: 'AC',
        title: 'Board readiness before strategic partnership',
        companyContext: 'Robotics · Series B · enterprise partnership discussion',
        problemStatement:
            'We need a board-level review of a strategic partnership proposal before moving into commercial negotiation.',
        desiredOutcome:
            'A decision framework, negotiation risks, and board-facing recommendation structure.',
        function: 'Strategy & Board',
        sessionFormat: '90 min working session',
        submittedAt: '3 days ago',
        deadline: 'Accepted',
        status: 'accepted',
        deposit: 700,
        estimatedSessionFee: 1400,
        hasNda: true,
        attachments: [
            { id: 'a3', name: 'Partnership proposal summary.pdf', type: 'PDF', size: '2.1 MB' },
        ],
    },
];

const FILTERS: { label: string; value: 'all' | IntakeStatus }[] = [
    { label: 'All', value: 'all' },
    { label: 'Needs review', value: 'pending' },
    { label: 'Expiring soon', value: 'expiring' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Declined', value: 'declined' },
];

function statusLabel(status: IntakeStatus) {
    if (status === 'expiring') return 'Action needed';
    if (status === 'pending') return 'Pending review';
    if (status === 'accepted') return 'Accepted';
    return 'Declined';
}

export function AdvisorIntakeQueuePage() {
    const [filter, setFilter] = useState<'all' | IntakeStatus>('all');
    const [activeIntake, setActiveIntake] = useState<AdvisorIntake | null>(null);
    const [declineReason, setDeclineReason] = useState('');

    const filtered = useMemo(() => {
        if (filter === 'all') return MOCK_INTAKES;
        return MOCK_INTAKES.filter((item) => item.status === filter);
    }, [filter]);

    function closeModal() {
        setActiveIntake(null);
        setDeclineReason('');
    }

    return (
        <>
            <div className="dash-page-head adv-page-head">
                <div>
                    <p className="hero-eyebrow">Advisor workspace</p>
                    <h1 className="dash-page-title">Intake review queue</h1>
                    <p className="muted">
                        Review client case briefs, accept suitable requests, or decline with a short reason.
                    </p>
                </div>

                <div className="adv-head-actions stack-row">
                    <Link className="btn ghost" to="/advisor">Back to dashboard</Link>
                    <Link className="btn" to="/advisor/availability">Manage availability</Link>
                </div>
            </div>

            <main className="advisor-intake-page">
                <section className="dash-section">
                    <div className="dash-section-head">
                        <SectionHeader
                            title="Incoming case briefs"
                            subtitle="48-hour review window starts after client deposit and NDA confirmation."
                        />
                    </div>

                    <div className="advisor-intake-tabs">
                        {FILTERS.map((tab) => (
                            <button
                                key={tab.value}
                                type="button"
                                className={`advisor-intake-tab ${filter === tab.value ? 'advisor-intake-tab--active' : ''}`}
                                onClick={() => setFilter(tab.value)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="advisor-intake-list">
                        {filtered.map((intake) => (
                            <article
                                key={intake.id}
                                className={`advisor-intake-row advisor-intake-row--${intake.status}`}
                            >
                                <div className="advisor-intake-avatar">{intake.initials}</div>

                                <div className="advisor-intake-row-body">
                                    <div className="advisor-intake-row-top">
                                        <strong>{intake.title}</strong>
                                        <span className={`advisor-intake-status advisor-intake-status--${intake.status}`}>
                                            {statusLabel(intake.status)}
                                        </span>
                                    </div>

                                    <p>{intake.clientName} · {intake.company}</p>

                                    <div className="advisor-intake-meta">
                                        <span>{intake.function}</span>
                                        <span>{intake.submittedAt}</span>
                                        <span>{intake.deadline}</span>
                                        <span>{intake.attachments.length ? `${intake.attachments.length} attachment(s)` : 'No attachment'}</span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="btn advisor-intake-review-btn"
                                    onClick={() => setActiveIntake(intake)}
                                >
                                    Review brief
                                </button>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {activeIntake && (
                <div className="advisor-intake-modal-backdrop" role="presentation" onMouseDown={closeModal}>
                    <section
                        className="advisor-intake-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="advisor-intake-modal-title"
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <div className="advisor-intake-modal-head">
                            <div>
                                <p className="hero-eyebrow">Selected brief</p>
                                <h2 id="advisor-intake-modal-title">{activeIntake.title}</h2>
                                <p className="muted">{activeIntake.clientName} · {activeIntake.company}</p>
                            </div>

                            <button type="button" className="advisor-intake-close" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <div className="advisor-intake-modal-body">
                            <div className="advisor-intake-facts">
                                <div>
                                    <span>Review window</span>
                                    <strong>{activeIntake.deadline}</strong>
                                </div>
                                <div>
                                    <span>Escrow deposit</span>
                                    <strong>${activeIntake.deposit}</strong>
                                </div>
                                <div>
                                    <span>Session fee</span>
                                    <strong>${activeIntake.estimatedSessionFee}</strong>
                                </div>
                            </div>

                            <div className="advisor-intake-badges">
                                <span>{activeIntake.hasNda ? 'NDA applied' : 'NDA missing'}</span>
                                <span>{activeIntake.sessionFormat}</span>
                                <span>{activeIntake.function}</span>
                            </div>

                            <div className="advisor-intake-brief-grid">
                                <div>
                                    <span className="dash-panel-label">Company context</span>
                                    <p>{activeIntake.companyContext}</p>
                                </div>

                                <div>
                                    <span className="dash-panel-label">Problem statement</span>
                                    <p>{activeIntake.problemStatement}</p>
                                </div>

                                <div>
                                    <span className="dash-panel-label">Desired outcome</span>
                                    <p>{activeIntake.desiredOutcome}</p>
                                </div>
                            </div>

                            <div>
                                <span className="dash-panel-label">Attachments</span>

                                {activeIntake.attachments.length ? (
                                    <div className="advisor-intake-attachments">
                                        {activeIntake.attachments.map((file) => (
                                            <div key={file.id} className="advisor-intake-attachment">
                                                <div>
                                                    <strong>{file.name}</strong>
                                                    <span>{file.type} · {file.size}</span>
                                                </div>
                                                <button type="button" className="btn ghost">
                                                    View
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="advisor-intake-empty-copy">No supporting document was attached.</p>
                                )}
                            </div>

                            {activeIntake.status !== 'accepted' && (
                                <label className="advisor-intake-decline-box">
                                    Decline reason
                                    <textarea
                                        rows={3}
                                        value={declineReason}
                                        onChange={(event) => setDeclineReason(event.target.value)}
                                        placeholder="Example: Outside my domain, timing does not work, or another advisor would be a better fit."
                                    />
                                </label>
                            )}
                        </div>

                        <div className="advisor-intake-modal-actions">
                            <p className="advisor-intake-note">
                                Mock only: actions are placeholders until backend state updates are added.
                            </p>

                            <div className="stack-row">
                                <button type="button" className="btn ghost" onClick={closeModal}>
                                    Close
                                </button>

                                {activeIntake.status === 'accepted' ? (
                                    <Link className="btn" to={`/advisor/bookings/${activeIntake.id}`}>
                                        View booking setup
                                    </Link>
                                ) : (
                                    <>
                                        <button type="button" className="btn ghost">
                                            Decline with reason
                                        </button>
                                        <Link className="btn" to={`/advisor/intakes/${activeIntake.id}/accept`}>
                                            Accept request
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}