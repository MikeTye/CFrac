import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppointmentCard, type Appointment } from '../../components/appointments/AppointmentCard';
import { SectionHeader } from '../../components/common/SectionHeader';

/* ─────────────────────────────────────────────
   MOCK DATA  — replace with API calls
───────────────────────────────────────────── */
const MOCK_UPCOMING: Appointment[] = [
    {
        id: 'a1',
        advisor: {
            name: 'Marcus Holloway',
            title: 'Former CRO, Stripe EMEA',
            initials: 'MH',
            function: 'Revenue & GTM',
        },
        date: '2025-09-18',
        timeStart: '14:00',
        timeEnd: '15:00',
        duration: 60,
        status: 'upcoming',
        topic: 'Series A fundraising narrative & investor targeting',
    },
    {
        id: 'a2',
        advisor: {
            name: 'Priya Nair',
            title: 'Ex-CPO, Deliveroo',
            initials: 'PN',
            function: 'Product Strategy',
        },
        date: '2025-09-24',
        timeStart: '10:00',
        timeEnd: '10:30',
        duration: 30,
        status: 'pending-confirmation',
        topic: 'Product-market fit diagnostics for B2B SaaS',
    },
];

const MOCK_PAST: Appointment[] = [
    {
        id: 'a3',
        advisor: {
            name: 'David Osei',
            title: 'Former COO, Flutterwave',
            initials: 'DO',
            function: 'Operations',
        },
        date: '2025-09-04',
        timeStart: '11:00',
        timeEnd: '12:30',
        duration: 90,
        status: 'completed',
        topic: 'Scaling ops infrastructure ahead of Series B',
        summaryReady: true,
        recordingReady: true,
    },
    {
        id: 'a4',
        advisor: {
            name: 'Sophie Marchand',
            title: 'Founding Partner, Climate Capital',
            initials: 'SM',
            function: 'Climate & ESG',
        },
        date: '2025-08-19',
        timeStart: '15:00',
        timeEnd: '16:00',
        duration: 60,
        status: 'completed',
        topic: 'Carbon credit strategy for early-stage climate startups',
        summaryReady: true,
        recordingReady: false,
    },
];

const MOCK_SUGGESTED = [
    {
        id: 's1',
        name: 'Tomoko Adachi',
        title: 'Former CFO, Mercari',
        initials: 'TA',
        function: 'Finance & Capital',
        reason: 'Matches your fundraising goal',
        rate: '$280 / hr',
        rating: '4.97',
        available: 'Available this week',
    },
    {
        id: 's2',
        name: 'Kwame Asante',
        title: 'Ex-VP Sales, HubSpot',
        initials: 'KA',
        function: 'Revenue & GTM',
        reason: 'Highly rated for Series A prep',
        rate: '$220 / hr',
        rating: '4.94',
        available: 'Next slot: Thu 2pm',
    },
    {
        id: 's3',
        name: 'Leila Moussawi',
        title: 'CHRO, Bolt (prev. Spotify)',
        initials: 'LM',
        function: 'People & Talent',
        reason: 'Leadership hiring specialist',
        rate: '$195 / hr',
        rating: '4.91',
        available: 'Available tomorrow',
    },
];

const STATS = [
    { value: '2', label: 'upcoming sessions', sub: 'next in 4 days' },
    { value: '2', label: 'sessions completed', sub: 'since joining' },
    { value: '2.5h', label: 'advisory time', sub: 'total on platform' },
    { value: '1', label: 'summary ready', sub: 'to review' },
];

/* ─────────────────────────────────────────────
   EMPTY STATE  (new user, no bookings)
───────────────────────────────────────────── */
function EmptyState() {
    return (
        <div className="dash-empty">
            <div className="dash-empty-inner">
                {/* Large typographic "zero state" */}
                <div className="dash-empty-numeral" aria-hidden="true">0</div>
                <div className="dash-empty-copy">
                    <h2 className="dash-empty-title">
                        No sessions<br />
                        <em>booked yet.</em>
                    </h2>
                    <p className="dash-empty-sub muted">
                        Browse 340+ vetted advisors and book your first session.
                        Most clients get matched and booked in under 10 minutes.
                    </p>
                    <div className="stack-row" style={{ marginTop: '1.5rem', gap: '0.65rem' }}>
                        <Link className="btn" to="/advisors">Browse advisors</Link>
                        <Link className="btn ghost" to="/profile">Complete profile</Link>
                    </div>
                </div>

                {/* Quick-start checklist */}
                <div className="dash-empty-checklist card">
                    <div className="dash-empty-checklist-label">Getting started</div>
                    {[
                        { done: true, step: 'Account created' },
                        { done: true, step: 'Onboarding complete' },
                        { done: false, step: 'Profile bio added' },
                        { done: false, step: 'First session booked' },
                        { done: false, step: 'Review an advisor' },
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
   SUGGESTED ADVISOR STRIP
───────────────────────────────────────────── */
function SuggestedAdvisors() {
    return (
        <section className="dash-section">
            <SectionHeader
                title="Suggested for you"
                subtitle="Based on your goals and recent activity."
            />
            <div className="dash-suggested-row">
                {MOCK_SUGGESTED.map((a) => (
                    <Link
                        key={a.id}
                        to={`/advisors/${a.id}`}
                        className="dash-suggested-card"
                        aria-label={`View ${a.name}'s profile`}
                    >
                        <div className="dash-suggested-top">
                            <div className="dash-suggested-avatar">{a.initials}</div>
                            <div className="dash-suggested-meta">
                                <span className="dash-suggested-name">{a.name}</span>
                                <span className="dash-suggested-title muted">{a.title}</span>
                            </div>
                        </div>
                        <div className="badge" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                            {a.function}
                        </div>
                        <p className="dash-suggested-reason">{a.reason}</p>
                        <div className="dash-suggested-footer">
                            <span className="dash-suggested-rate">{a.rate}</span>
                            <span className="dash-suggested-rating">★ {a.rating}</span>
                        </div>
                        <div className="dash-suggested-avail muted">{a.available}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   QUICK-ACTIONS PANEL  (sidebar right)
───────────────────────────────────────────── */
function QuickActionsPanel() {
    return (
        <aside className="dash-panel card">
            <div className="dash-panel-section">
                <div className="dash-panel-label">Upcoming</div>
                <div className="dash-panel-appt-mini">
                    <div className={`appt-accent--upcoming dash-panel-appt-dot`} />
                    <div>
                        <div className="dash-panel-appt-who">Marcus Holloway</div>
                        <div className="dash-panel-appt-when muted">Thu 18 Sep · 14:00–15:00</div>
                    </div>
                </div>
                <div className="dash-panel-appt-mini">
                    <div className="appt-accent--pending dash-panel-appt-dot" />
                    <div>
                        <div className="dash-panel-appt-who">Priya Nair</div>
                        <div className="dash-panel-appt-when muted">Wed 24 Sep · 10:00–10:30</div>
                    </div>
                </div>
                <Link to="/appointments" className="dash-panel-link">
                    View all sessions →
                </Link>
            </div>

            <div className="dash-panel-divider" />

            <div className="dash-panel-section">
                <div className="dash-panel-label">Ready to review</div>
                <div className="dash-panel-review-item">
                    <span className="dash-panel-review-name">David Osei</span>
                    <Link
                        to="/appointments/a3/review"
                        className="btn ghost"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                    >
                        Review
                    </Link>
                </div>
            </div>

            <div className="dash-panel-divider" />

            <div className="dash-panel-section">
                <div className="dash-panel-label">Profile completion</div>
                <div className="dash-panel-progress-bar">
                    <div className="dash-panel-progress-fill" style={{ width: '65%' }} />
                </div>
                <div className="dash-panel-progress-label muted">65% — add a bio to unlock better matches</div>
                <Link to="/profile" className="dash-panel-link" style={{ marginTop: '0.5rem' }}>
                    Complete profile →
                </Link>
            </div>

            <div className="dash-panel-divider" />

            <div className="dash-panel-section dash-panel-cta premium">
                <p className="dash-panel-cta-text">
                    Need a session sooner? Browse advisors with slots today.
                </p>
                <Link
                    to="/advisors?availability=today"
                    className="btn"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.85rem', background: '#fff', color: '#102032' }}
                >
                    Available today →
                </Link>
            </div>
        </aside>
    );
}

/* ─────────────────────────────────────────────
   DASHBOARD PAGE
───────────────────────────────────────────── */

/**
 * Swap `isNewUser` for your actual "no appointments" check.
 * The toggle below is for demo purposes.
 */
export function AdvisorDashboardPage() {
    const [isNewUser, setIsNewUser] = useState(false);

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Dashboard</p>
                    <h1 className="dash-page-title">Good morning, Ada</h1>
                    <p className="muted">Manage bookings, summaries, and advisor recommendations.</p>
                </div>
            </div>

            <div className="dash-demo-toggle">
                <button
                    type="button"
                    className={`btn ${isNewUser ? '' : 'ghost'}`}
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
                    onClick={() => setIsNewUser(true)}
                >
                    New user
                </button>
                <button
                    type="button"
                    className={`btn ${!isNewUser ? '' : 'ghost'}`}
                    style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}
                    onClick={() => setIsNewUser(false)}
                >
                    Returning user
                </button>
            </div>

            {isNewUser ? (
                <EmptyState />
            ) : (
                <div className="dash-layout-main">
                    <div className="dash-primary">
                        <StatStrip />

                        <section className="dash-section">
                            <SectionHeader title="Upcoming sessions" />
                            <div className="dash-appt-list">
                                {MOCK_UPCOMING.map((appt) => (
                                    <AppointmentCard key={appt.id} appt={appt} />
                                ))}
                            </div>
                        </section>

                        <SuggestedAdvisors />

                        <section className="dash-section">
                            <div className="dash-section-head">
                                <SectionHeader title="Past sessions" />
                                <Link to="/appointments?tab=past" className="dash-section-link">
                                    View all →
                                </Link>
                            </div>
                            <div className="dash-past-list">
                                {MOCK_PAST.map((appt) => (
                                    <AppointmentCard
                                        key={appt.id}
                                        appt={appt}
                                        variant="compact"
                                    />
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="dash-secondary sticky-panel">
                        <QuickActionsPanel />
                    </div>
                </div>
            )}
        </>
    );
}