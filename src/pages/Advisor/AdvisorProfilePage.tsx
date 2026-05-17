import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookingModal } from '../../components/advisors/BookingModal';
import { advisors } from '../../mocks/advisors';
import './../../styles/pages/advisor-profile.css';

type ProfileTab = 'overview' | 'proof' | 'case-studies' | 'media' | 'booking';

function getStartingPrice(advisor: (typeof advisors)[number]) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

export function AdvisorProfilePage() {
    const { advisorId } = useParams();
    const advisor = advisors.find((a) => a.id === advisorId) ?? advisors[0];
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState<ProfileTab>('overview');

    const startingPrice = getStartingPrice(advisor);

    return (
        <div className="advisor-profile-page">
            <section className="advisor-profile-hero">
                <div className="advisor-profile-hero-inner page-wrap">
                    <div className="advisor-profile-copy">
                        <Link to="/advisors" className="profile-back-link">← Back to advisors</Link>

                        <div className="advisor-profile-kicker-row">
                            <span className="advisor-tier-badge">Platinum Advisor</span>
                            <span className="advisor-verified-pill">Verified operator</span>
                        </div>

                        <h1>{advisor.fullName}</h1>

                        <p className="advisor-profile-headline">{advisor.headline}</p>

                        <p className="advisor-profile-meta">
                            {advisor.location} · {advisor.timezone} · ★ {advisor.rating} ({advisor.reviewCount} reviews)
                        </p>

                        <p className="advisor-profile-bio">{advisor.shortBio}</p>

                        <div className="advisor-profile-tags">
                            {advisor.executiveTags.slice(0, 4).map((tag) => (
                                <span className="advisor-profile-tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="advisor-video-card">
                        <div className="advisor-video-frame">
                            <button className="advisor-video-play" type="button" aria-label="Play advisor introduction">
                                ▶
                            </button>
                            <p>Advisor introduction</p>
                            <span>How I think, where I help, and what clients should bring.</span>
                        </div>

                        <div className="advisor-hero-proof-card">
                            <span>Signature outcome</span>
                            <strong>{advisor.achievements[0]?.metric ?? 'Verified executive track record'}</strong>
                            <p>{advisor.achievements[0]?.description ?? advisor.shortBio}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="page-wrap advisor-profile-shell">
                <main className="advisor-profile-main">
                    <nav className="profile-tabs" aria-label="Advisor profile sections">
                        {[
                            ['overview', 'Overview'],
                            ['proof', 'Proof of Work'],
                            ['case-studies', 'Case Studies'],
                            ['media', 'Media'],
                            ['booking', 'Booking'],
                        ].map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                className={tab === value ? 'profile-tab active' : 'profile-tab'}
                                onClick={() => setTab(value as ProfileTab)}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>

                    {tab === 'overview' ? (
                        <div className="profile-tab-panel">
                            <section className="advisor-section-card advisor-narrative-card">
                                <span className="advisor-section-label">Positioning</span>
                                <h2>How this advisor thinks and where they are most useful</h2>
                                <p>{advisor.longBio}</p>
                            </section>

                            <div className="profile-metric-grid">
                                <article className="profile-metric-card">
                                    <span className="profile-metric-value">{advisor.functions.length}</span>
                                    <span className="profile-metric-label">Functions covered</span>
                                </article>
                                <article className="profile-metric-card">
                                    <span className="profile-metric-value">{advisor.industries.length}</span>
                                    <span className="profile-metric-label">Industries served</span>
                                </article>
                                <article className="profile-metric-card">
                                    <span className="profile-metric-value">{advisor.reviewCount}</span>
                                    <span className="profile-metric-label">Client reviews</span>
                                </article>
                            </div>

                            <section className="advisor-section-card">
                                <span className="advisor-section-label">Best fit</span>
                                <h2>Ideal client context</h2>
                                <p>
                                    Best for teams seeking support in {advisor.functions.join(', ')}
                                    {' '}across {advisor.industries.join(', ')} contexts.
                                </p>

                                <div className="profile-chip-grid">
                                    {advisor.advisoryTopics.slice(0, 8).map((topic) => (
                                        <span className="profile-chip" key={topic}>{topic}</span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : null}

                    {tab === 'proof' ? (
                        <div className="profile-tab-panel">
                            <section className="advisor-section-card">
                                <span className="advisor-section-label">Verified outcomes</span>
                                <h2>Executive experience & achievement record</h2>

                                <div className="profile-story-list">
                                    {advisor.achievements.map((item) => (
                                        <article key={item.title} className="profile-story">
                                            <span className="profile-story-metric">{item.metric}</span>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : null}

                    {tab === 'case-studies' ? (
                        <div className="profile-tab-panel">
                            {advisor.caseStudies.map((study, index) => (
                                <article className="advisor-case-card" key={study.title}>
                                    <span className="advisor-case-index">{String(index + 1).padStart(2, '0')}</span>
                                    <h2>{study.title}</h2>

                                    <div className="advisor-case-grid">
                                        <div>
                                            <span>Challenge</span>
                                            <p>{study.challenge}</p>
                                        </div>
                                        <div>
                                            <span>Outcome</span>
                                            <p>{study.outcome}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}

                    {tab === 'media' ? (
                        <div className="profile-tab-panel">
                            <section className="advisor-section-card">
                                <span className="advisor-section-label">Media library</span>
                                <h2>Beyond the resume</h2>
                                <p className="advisor-section-subcopy">
                                    Founder interviews, keynote clips, frameworks, writing, and client-safe thought leadership.
                                </p>

                                <div className="profile-media-grid">
                                    <div className="profile-media-tile large">
                                        <span>▶</span>
                                        <strong>Advisor introduction</strong>
                                        <p>Short video explaining operating background and best-fit advisory topics.</p>
                                    </div>
                                    <div className="profile-media-tile">
                                        <span>▣</span>
                                        <strong>Board prep framework</strong>
                                        <p>PDF / article placeholder</p>
                                    </div>
                                    <div className="profile-media-tile">
                                        <span>◉</span>
                                        <strong>Podcast appearance</strong>
                                        <p>External media placeholder</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : null}

                    {tab === 'booking' ? (
                        <div className="profile-tab-panel">
                            <section className="advisor-section-card">
                                <span className="advisor-section-label">Session offerings</span>
                                <h2>Choose the right advisory format</h2>

                                <div className="profile-offering-list">
                                    {advisor.sessionOfferings.map((session) => (
                                        <article key={session.id} className="profile-offering">
                                            <div>
                                                <h3>{session.name}</h3>
                                                <p>{session.description}</p>
                                            </div>
                                            <strong>{session.durationMinutes} min · ${session.price}</strong>
                                        </article>
                                    ))}
                                </div>
                            </section>

                            <section className="advisor-section-card">
                                <span className="advisor-section-label">Availability</span>
                                <h2>Near-term availability</h2>

                                <div className="profile-chip-grid">
                                    {advisor.availabilityPreview.map((slot) => (
                                        <span className="profile-chip" key={slot}>{slot}</span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    ) : null}
                </main>

                <aside className="advisor-booking-panel">
                    <span className="advisor-section-label">Book this advisor</span>
                    <h3>From ${startingPrice}</h3>
                    <p>Next available: {advisor.availabilityPreview[0]}</p>

                    <button className="btn advisor-booking-btn" onClick={() => setOpen(true)}>
                        Start intake
                    </button>

                    <div className="advisor-trust-box">
                        <strong>Platform-managed session</strong>
                        <p>
                            Intake, payment, consent, meeting room, transcript, and session record are handled on-platform.
                        </p>
                    </div>
                </aside>
            </div>

            {open ? <BookingModal advisor={advisor} onClose={() => setOpen(false)} /> : null}
        </div>
    );
}