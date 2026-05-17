import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppointmentCard, type Appointment } from '../../components/appointments/AppointmentCard';
import { SectionHeader } from '../../components/common/SectionHeader';

import {
    MOCK_PAST_APPOINTMENTS,
    MOCK_UPCOMING_APPOINTMENTS,
} from '../../mocks/appointments';

/** Intake requests awaiting advisor response */
const MOCK_INTAKES = [
    {
        id: 'i1',
        clientName: 'Yusuf Bello',
        company: 'Treyd Capital',
        initials: 'YB',
        topic: 'Fundraising strategy for pre-Series A round',
        function: 'Finance & Capital',
        submitted: '2 hours ago',
        urgency: 'high' as const,
    },
    {
        id: 'i2',
        clientName: 'Sonia Herrera',
        company: 'Paloma Commerce',
        initials: 'SH',
        topic: 'Sales org design and hiring plan for 2026',
        function: 'Revenue & GTM',
        submitted: 'Yesterday',
        urgency: 'normal' as const,
    },
];

const STATS = [
    { value: '2', label: 'upcoming sessions', sub: 'next in 4 days' },
    { value: '$1,840', label: 'earned this month', sub: '+$420 pending payout' },
    { value: '4.96', label: 'average rating', sub: 'across 18 reviews' },
    { value: '2', label: 'intakes to review', sub: 'action required' },
];

/* ─────────────────────────────────────────────
   EMPTY STATE  (new advisor, no sessions yet)
───────────────────────────────────────────── */
function EmptyState() {
    return (
        <div className="dash-empty">
            <div className="dash-empty-inner">
                <div className="dash-empty-numeral" aria-hidden="true">0</div>
                <div className="dash-empty-copy">
                    <h2 className="dash-empty-title">
                        No sessions<br />
                        <em>scheduled yet.</em>
                    </h2>
                    <p className="dash-empty-sub muted">
                        Complete your profile and set your availability to start
                        receiving intake requests from matched founders.
                    </p>
                    <div className="stack-row" style={{ marginTop: '1.5rem', gap: '0.65rem' }}>
                        <Link className="btn" to="/advisor/profile">Complete profile</Link>
                        <Link className="btn ghost" to="/advisor/availability">Set availability</Link>
                    </div>
                </div>

                <div className="dash-empty-checklist card">
                    <div className="dash-empty-checklist-label">Getting started</div>
                    {[
                        { done: true, step: 'Account created' },
                        { done: true, step: 'Onboarding complete' },
                        { done: false, step: 'Profile bio & intro video added' },
                        { done: false, step: 'Availability configured' },
                        { done: false, step: 'First session completed' },
                    ].map((item) => (
                        <div key={item.step} className="dash-empty-check-row">
                            <div
                                className={`dash-empty-check-dot ${item.done ? 'dash-empty-check-dot--done' : ''}`}
                                aria-hidden="true"
                            >
                                {item.done ? '✓' : ''}
                            </div>
                            <span
                                className={item.done ? 'muted' : ''}
                                style={item.done ? { textDecoration: 'line-through', fontSize: '0.83rem' } : { fontSize: '0.83rem' }}
                            >
                                {item.step}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   STAT STRIP
───────────────────────────────────────────── */
function StatStrip() {
    return (
        <div className="dash-stat-strip">
            {STATS.map((s) => (
                <div key={s.label} className="dash-stat-cell">
                    <span className="dash-stat-value">{s.value}</span>
                    <span className="dash-stat-label">{s.label}</span>
                    <span className="dash-stat-sub muted">{s.sub}</span>
                </div>
            ))}
        </div>
    );
}

/* ─────────────────────────────────────────────
   INTAKE QUEUE
   Most time-sensitive section — sits at top.
───────────────────────────────────────────── */
function IntakeQueue() {
    return (
        <section className="dash-section">
            <div className="dash-section-head">
                <SectionHeader
                    title="Intake requests"
                    subtitle="New client requests awaiting your response."
                />
                <Link to="/advisor/intakes" className="dash-section-link">
                    View all →
                </Link>
            </div>

            <div className="adv-intake-list">
                {MOCK_INTAKES.map((intake) => (
                    <article key={intake.id} className={`adv-intake-card adv-intake-card--${intake.urgency}`}>
                        <div className="adv-intake-left">
                            <div className="adv-intake-avatar">{intake.initials}</div>
                            <div className="adv-intake-body">
                                <div className="adv-intake-who">
                                    <strong>{intake.clientName}</strong>
                                    <span className="adv-intake-company">{intake.company}</span>
                                </div>
                                <p className="adv-intake-topic">{intake.topic}</p>
                                <div className="adv-intake-meta">
                                    <span className="adv-intake-function">{intake.function}</span>
                                    <span className="adv-intake-time muted">{intake.submitted}</span>
                                </div>
                            </div>
                        </div>
                        <div className="adv-intake-actions">
                            {intake.urgency === 'high' && (
                                <span className="adv-intake-urgency-badge">Action needed</span>
                            )}
                            <Link to={`/advisor/intakes/${intake.id}`} className="btn">
                                Review brief
                            </Link>
                            <button type="button" className="btn ghost">
                                Decline
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   ADVISOR SIDEBAR PANEL
───────────────────────────────────────────── */
function AdvisorSidePanel() {
    return (
        <aside className="dash-panel adv-side-panel">

            {/* Earnings summary */}
            <div className="dash-panel-section">
                <div className="dash-panel-label">Earnings</div>
                <div className="adv-earnings-summary">
                    <div className="adv-earnings-row">
                        <span className="adv-earnings-figure">$1,840</span>
                        <span className="adv-earnings-period muted">this month</span>
                    </div>
                    <div className="adv-earnings-pending">
                        <span className="adv-earnings-pending-dot" aria-hidden="true" />
                        $420 pending payout
                    </div>
                </div>
                <Link to="/advisor" className="dash-panel-link" style={{ marginTop: '0.65rem' }}>
                    Full earnings report →
                </Link>
            </div>

            <div className="dash-panel-divider" />

            {/* Upcoming mini-list */}
            <div className="dash-panel-section">
                <div className="dash-panel-label">Upcoming</div>
                <div className="dash-panel-appt-mini">
                    <div className="appt-accent--upcoming dash-panel-appt-dot" />
                    <div>
                        <div className="dash-panel-appt-who">Arjun Mehta · Kargo Labs</div>
                        <div className="dash-panel-appt-when muted">Thu 18 Sep · 14:00–15:00</div>
                    </div>
                </div>
                <div className="dash-panel-appt-mini">
                    <div className="appt-accent--pending dash-panel-appt-dot" />
                    <div>
                        <div className="dash-panel-appt-who">Fatima Al-Rashid · Rho Payments</div>
                        <div className="dash-panel-appt-when muted">Wed 24 Sep · 10:00–10:30</div>
                    </div>
                </div>
                <Link to="/advisor/calendar" className="dash-panel-link">
                    View calendar →
                </Link>
            </div>

            <div className="dash-panel-divider" />

            {/* Profile completion */}
            <div className="dash-panel-section">
                <div className="dash-panel-label">Profile completion</div>
                <div className="dash-panel-progress-bar">
                    <div className="dash-panel-progress-fill" style={{ width: '72%' }} />
                </div>
                <div className="dash-panel-progress-label muted">
                    72% — add an intro video to increase intake conversion
                </div>
                <Link to="/advisor/profile" className="dash-panel-link" style={{ marginTop: '0.5rem' }}>
                    Edit profile →
                </Link>
            </div>

            <div className="dash-panel-divider" />

            {/* Availability nudge */}
            <div className="dash-panel-section dash-panel-cta adv-avail-cta">
                <p className="dash-panel-cta-text">
                    You have no slots open next week. Add availability to keep intakes flowing.
                </p>
                <Link
                    to="/advisor/availability"
                    className="btn"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem', background: '#fff', color: '#102032' }}
                >
                    Manage availability →
                </Link>
            </div>
        </aside>
    );
}

/* ─────────────────────────────────────────────
   ADVISOR DASHBOARD PAGE
───────────────────────────────────────────── */

/**
 * Swap `isNewAdvisor` for your actual "no sessions" check.
 * The toggle below is for demo purposes.
 */
export function AdvisorDashboardPage() {
    const [isNewAdvisor, setIsNewAdvisor] = useState(false);

    return (
        <>
            <div className="dash-page-head adv-page-head">
                <div>
                    <p className="hero-eyebrow">Advisor workspace</p>
                    <h1 className="dash-page-title">Good morning, Marcus</h1>
                    <p className="muted">You have 2 intake requests and 2 upcoming sessions.</p>
                </div>
                <div className="adv-head-actions stack-row">
                    <Link className="btn ghost" to="/advisor/profile">Edit profile</Link>
                    <Link className="btn" to="/advisor/availability">Manage availability</Link>
                </div>
            </div>

            <div className="dash-demo-toggle">
                <button
                    type="button"
                    className={`btn ${isNewAdvisor ? '' : 'ghost'}`}
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
                    onClick={() => setIsNewAdvisor(true)}
                >
                    New advisor
                </button>
                <button
                    type="button"
                    className={`btn ${!isNewAdvisor ? '' : 'ghost'}`}
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
                    onClick={() => setIsNewAdvisor(false)}
                >
                    Returning advisor
                </button>
            </div>

            {isNewAdvisor ? (
                <EmptyState />
            ) : (
                <div className="dash-layout-main">
                    <div className="dash-primary">
                        <StatStrip />

                        {/* Intake queue — highest priority */}
                        <IntakeQueue />

                        {/* Upcoming sessions — client-centric cards */}
                        <section className="dash-section">
                            <SectionHeader title="Upcoming sessions" />
                            <div className="dash-appt-list">
                                {MOCK_UPCOMING_APPOINTMENTS.map((appt) => (
                                    <AppointmentCard key={appt.id} appt={appt} perspective="advisor" />
                                ))}
                            </div>
                        </section>

                        {/* Past sessions */}
                        <section className="dash-section">
                            <div className="dash-section-head">
                                <SectionHeader title="Past sessions" />
                                <Link to="/advisor/bookings?tab=past" className="dash-section-link">
                                    View all →
                                </Link>
                            </div>
                            <div className="dash-past-list">
                                {MOCK_PAST_APPOINTMENTS.map((appt) => (
                                    <AppointmentCard
                                        key={appt.id}
                                        appt={appt}
                                        variant="compact"
                                        perspective="advisor"
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="dash-secondary sticky-panel">
                        <AdvisorSidePanel />
                    </div>
                </div>
            )}
        </>
    );
}