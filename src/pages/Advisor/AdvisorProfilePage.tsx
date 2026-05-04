import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookingModal } from '../../components/advisors/BookingModal';
import { Card } from '../../components/common/Card';
import { SectionHeader } from '../../components/common/SectionHeader';
import { advisors } from '../../mocks/advisors';

type ProfileTab = 'overview' | 'expertise' | 'case-studies' | 'media' | 'booking';

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
            <section className="advisor-profile-hero premium">
                <div className="advisor-profile-copy">
                    <Link to="/advisors" className="profile-back-link">← Back to advisors</Link>
                    <p className="hero-eyebrow">Verified advisor profile</p>
                    <h1>{advisor.fullName}</h1>
                    <p className="advisor-profile-headline">{advisor.headline}</p>
                    <p className="advisor-profile-meta">
                        {advisor.location} · {advisor.timezone} · ★ {advisor.rating} ({advisor.reviewCount} reviews)
                    </p>
                    <p className="advisor-profile-bio">{advisor.shortBio}</p>

                    <div className="stack-row">
                        {advisor.executiveTags.slice(0, 4).map((tag) => (
                            <span className="badge" key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="advisor-video-card">
                    <div className="advisor-video-frame">
                        <div className="advisor-video-play">▶</div>
                        <p>Video introduction</p>
                        <span>2 min overview · placeholder media</span>
                    </div>
                </div>
            </section>

            <div className="page-wrap advisor-profile-shell">
                <main className="advisor-profile-main">
                    <nav className="profile-tabs" aria-label="Advisor profile sections">
                        {[
                            ['overview', 'Overview'],
                            ['expertise', 'Expertise'],
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
                            <Card>
                                <SectionHeader title="Advisor positioning" />
                                <p>{advisor.longBio}</p>
                            </Card>

                            <div className="profile-metric-grid">
                                <Card>
                                    <span className="profile-metric-value">{advisor.functions.length}</span>
                                    <span className="profile-metric-label">Functions covered</span>
                                </Card>
                                <Card>
                                    <span className="profile-metric-value">{advisor.industries.length}</span>
                                    <span className="profile-metric-label">Industries served</span>
                                </Card>
                                <Card>
                                    <span className="profile-metric-value">{advisor.reviewCount}</span>
                                    <span className="profile-metric-label">Client reviews</span>
                                </Card>
                            </div>

                            <Card>
                                <SectionHeader title="Ideal client fit" />
                                <p>
                                    Best for teams seeking support in {advisor.functions.join(', ')}
                                    {' '}across {advisor.industries.join(', ')} contexts.
                                </p>
                            </Card>
                        </div>
                    ) : null}

                    {tab === 'expertise' ? (
                        <div className="profile-tab-panel">
                            <Card>
                                <SectionHeader title="Advisory topics" />
                                <div className="profile-chip-grid">
                                    {advisor.advisoryTopics.map((topic) => (
                                        <span className="profile-chip" key={topic}>{topic}</span>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <SectionHeader title="Executive experience & achievements" />
                                <div className="profile-story-list">
                                    {advisor.achievements.map((item) => (
                                        <article key={item.title} className="profile-story">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <strong>{item.metric}</strong>
                                        </article>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ) : null}

                    {tab === 'case-studies' ? (
                        <div className="profile-tab-panel">
                            {advisor.caseStudies.map((study, index) => (
                                <Card key={study.title}>
                                    <span className="tile-index">{String(index + 1).padStart(2, '0')}</span>
                                    <h3>{study.title}</h3>
                                    <p><strong>Challenge:</strong> {study.challenge}</p>
                                    <p><strong>Outcome:</strong> {study.outcome}</p>
                                </Card>
                            ))}
                        </div>
                    ) : null}

                    {tab === 'media' ? (
                        <div className="profile-tab-panel">
                            <Card>
                                <SectionHeader
                                    title="Media library"
                                    subtitle="Use this section later for founder interviews, keynote clips, podcast appearances, decks, or client-safe thought leadership."
                                />
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
                            </Card>
                        </div>
                    ) : null}

                    {tab === 'booking' ? (
                        <div className="profile-tab-panel">
                            <Card>
                                <SectionHeader title="Session offerings" />
                                <div className="profile-offering-list">
                                    {advisor.sessionOfferings.map((session) => (
                                        <article key={session.id} className="profile-offering">
                                            <div>
                                                <h3>{session.name}</h3>
                                                <p className="muted">{session.description}</p>
                                            </div>
                                            <strong>{session.durationMinutes} min · ${session.price}</strong>
                                        </article>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <SectionHeader title="Availability preview" />
                                <div className="profile-chip-grid">
                                    {advisor.availabilityPreview.map((slot) => (
                                        <span className="profile-chip" key={slot}>{slot}</span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ) : null}
                </main>

                <aside className="advisor-booking-panel card sticky-panel">
                    <p className="hero-eyebrow">Book this advisor</p>
                    <h3>From ${startingPrice}</h3>
                    <p className="muted">Next available: {advisor.availabilityPreview[0]}</p>

                    <button className="btn advisor-booking-btn" onClick={() => setOpen(true)}>
                        Book intro session
                    </button>

                    <div className="advisor-trust-box">
                        <strong>Session integrity</strong>
                        <p className="muted">
                            Platform-hosted meeting, consent capture, and transcript linkage are part of the standard booking flow.
                        </p>
                    </div>
                </aside>
            </div>

            {open ? <BookingModal advisor={advisor} onClose={() => setOpen(false)} /> : null}
        </div>
    );
}