import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookingModal } from '../../components/advisors/BookingModal';
import { Card } from '../../components/common/Card';
import { SectionHeader } from '../../components/common/SectionHeader';
import { advisors } from '../../mocks/advisors';

type ProfileTab = 'proof' | 'case-studies' | 'media' | 'booking';

function getStartingPrice(advisor: (typeof advisors)[number]) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

function getAdvisorProof(advisor: (typeof advisors)[number]) {
    const proofMetrics = advisor.achievements
        .filter((item) => item.metric)
        .slice(0, 3)
        .map((item) => ({
            label: item.title,
            value: item.metric!,
            description: item.description,
        }));

    return {
        headline: advisor.achievements[0]
            ? `${advisor.achievements[0].title}: ${advisor.achievements[0].metric ?? advisor.achievements[0].description}`
            : advisor.headline,
        proofMetrics,
        bestFor: [
            ...advisor.advisoryTopics.slice(0, 3),
            ...advisor.functions.slice(0, 2),
        ],
    };
}

function getAdvisorImpact(advisor: (typeof advisors)[number]) {
    return advisor.impact ?? {
        headlineOutcome: advisor.headline,
        metrics: [
            { label: 'Functions covered', value: String(advisor.functions.length) },
            { label: 'Industries served', value: String(advisor.industries.length) },
            { label: 'Client reviews', value: String(advisor.reviewCount) },
        ],
        proofPoints: advisor.achievements?.slice(0, 3).map((a) => a.metric || a.title) ?? [],
        bestFor: [
            `Teams needing support in ${advisor.functions.slice(0, 2).join(' / ')}`,
            `Operators working across ${advisor.industries.slice(0, 2).join(' / ')}`,
            'Founders seeking senior operating guidance',
        ],
    };
}

export function AdvisorProfilePage() {
    const { advisorId } = useParams();
    const advisor = advisors.find((a) => a.id === advisorId) ?? advisors[0];
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState<ProfileTab>('proof');

    const startingPrice = getStartingPrice(advisor);
    const proof = getAdvisorProof(advisor);
    const impact = getAdvisorImpact(advisor);

    return (
        <div className="advisor-profile-page">
            <section className="advisor-profile-hero premium">
                <div className="advisor-profile-copy">
                    <Link to="/advisors" className="profile-back-link">← Back to advisors</Link>

                    <p className="hero-eyebrow">{advisor.tier} verified advisor</p>
                    <h1>{advisor.fullName}</h1>

                    <p className="advisor-profile-impact-headline">
                        {proof.headline}
                    </p>

                    <p className="advisor-profile-meta">
                        {advisor.location} · {advisor.timezone} · ★ {advisor.rating} ({advisor.reviewCount} reviews)
                    </p>

                    <p className="advisor-profile-bio">{advisor.shortBio}</p>

                    <div className="profile-proof-grid">
                        {proof.proofMetrics.map((metric) => (
                            <div className="profile-proof-metric" key={metric.label}>
                                <strong>{metric.value}</strong>
                                <span>{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    <p className="advisor-profile-impact-headline">
                        {advisor.impact.headlineOutcome}
                    </p>

                    <div className="profile-proof-grid">
                        {advisor.impact.metrics.map((metric) => (
                            <div className="profile-proof-metric" key={metric.label}>
                                <strong>{metric.value}</strong>
                                <span>{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="stack-row">
                        {advisor.executiveTags.slice(0, 2).map((tag) => (
                            <span className="badge" key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="advisor-video-card">
                    <div className="advisor-video-frame">
                        <div className="advisor-video-play">▶</div>
                        <p>Advisor introduction</p>
                        <span>How I help founders and operators</span>
                    </div>
                </div>
            </section>

            <div className="page-wrap advisor-profile-shell">
                <main className="advisor-profile-main">
                    <nav className="profile-tabs" aria-label="Advisor profile sections">
                        {[
                            ['proof', 'Proof'],
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

                    {tab === 'proof' ? (
                        <div className="profile-tab-panel">
                            <Card>
                                <SectionHeader
                                    title="Concrete operating proof"
                                    subtitle="Selected outcomes and measurable advisory experience."
                                />

                                <div className="profile-story-list">
                                    {advisor.achievements.map((item) => (
                                        <article key={item.title} className="profile-story">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            {item.metric ? <strong>{item.metric}</strong> : null}
                                        </article>
                                    ))}
                                </div>
                            </Card>

                            <Card>
                                <SectionHeader title="Advisor positioning" />
                                <p>{advisor.longBio}</p>
                            </Card>

                            <Card>
                                <SectionHeader title="Best-fit advisory needs" />
                                <div className="profile-chip-grid">
                                    {proof.bestFor.map((item) => (
                                        <span className="profile-chip" key={item}>{item}</span>
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
                                    subtitle="Founder interviews, keynote clips, podcast appearances, decks, or client-safe thought leadership."
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
                        <strong>Why book this advisor?</strong>
                        <p className="muted">{impact.headlineOutcome}</p>
                    </div>

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