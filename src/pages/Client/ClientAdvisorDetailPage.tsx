import { Link, useParams } from 'react-router-dom';
import { advisors } from '../../mocks/advisors';
import './../../styles/pages/clientAdvisorProfile.css';

function getStartingPrice(advisor: (typeof advisors)[number]) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

export function ClientAdvisorProfilePage() {
    const { advisorId } = useParams();
    const advisor = advisors.find((a) => a.id === advisorId) ?? advisors[0];
    const startingPrice = getStartingPrice(advisor);

    return (
        <div className="client-advisor-profile dash-breakout">
            <div className="cap-profile-breadcrumb">
                <Link to="/client/advisors">← Back to advisors</Link>
                <span>/</span>
                <span>{advisor.fullName}</span>
            </div>

            <section className="cap-profile-hero cap-profile-hero--media">
                <div className="cap-profile-copy">
                    <div className="cap-profile-kicker-row">
                        <span className="cap-tier-badge">Platinum Advisor</span>
                        <span className="cap-verified-pill">Verified operator</span>
                    </div>

                    <h1>{advisor.fullName}</h1>
                    <p className="cap-profile-headline">{advisor.headline}</p>

                    <p className="cap-profile-meta">
                        {advisor.location} · {advisor.timezone} · ★ {advisor.rating} ({advisor.reviewCount} reviews)
                    </p>

                    <p className="cap-profile-bio">{advisor.shortBio}</p>

                    <div className="cap-profile-tags">
                        {advisor.executiveTags.slice(0, 5).map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>

                <aside className="cap-media-card">
                    <div className="cap-video-frame">
                        <button type="button" className="cap-video-play" aria-label="Play advisor introduction">
                            ▶
                        </button>
                        <p>Advisor introduction</p>
                        <span>How I think, where I help, and what clients should bring.</span>
                    </div>

                    <div className="cap-hero-proof-card">
                        <span>Signature outcome</span>
                        <strong>{advisor.achievements[0]?.metric ?? 'Verified executive track record'}</strong>
                        <p>{advisor.achievements[0]?.description ?? advisor.shortBio}</p>
                    </div>
                </aside>
            </section>

            <div className="cap-profile-shell">
                <main className="cap-profile-main">
                    <nav className="cap-profile-tabs" aria-label="Advisor profile sections">
                        <a href="#overview">Overview</a>
                        <a href="#proof">Proof</a>
                        <a href="#case-studies">Case Studies</a>
                        <a href="#booking">Session Options</a>
                    </nav>

                    <section id="overview" className="cap-section-card">
                        <span className="cap-section-label">Positioning</span>
                        <h2>How this advisor can help</h2>
                        <p>{advisor.longBio}</p>
                    </section>

                    <div className="cap-metric-grid">
                        <article>
                            <strong>{advisor.functions.length}</strong>
                            <span>Functions covered</span>
                        </article>
                        <article>
                            <strong>{advisor.industries.length}</strong>
                            <span>Industries served</span>
                        </article>
                        <article>
                            <strong>{advisor.reviewCount}</strong>
                            <span>Client reviews</span>
                        </article>
                    </div>

                    <section className="cap-section-card">
                        <span className="cap-section-label">Best fit</span>
                        <h2>Ideal client context</h2>
                        <p>
                            Best for teams seeking support in {advisor.functions.join(', ')} across{' '}
                            {advisor.industries.join(', ')} contexts.
                        </p>

                        <div className="cap-chip-grid">
                            {advisor.advisoryTopics.slice(0, 8).map((topic) => (
                                <span key={topic}>{topic}</span>
                            ))}
                        </div>
                    </section>

                    <section id="proof" className="cap-section-card">
                        <span className="cap-section-label">Verified outcomes</span>
                        <h2>Executive experience & achievement record</h2>

                        <div className="cap-story-list">
                            {advisor.achievements.map((item) => (
                                <article key={item.title} className="cap-story">
                                    <span>{item.metric}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="case-studies" className="cap-section-card">
                        <span className="cap-section-label">Case studies</span>
                        <h2>Relevant operating examples</h2>

                        <div className="cap-case-list">
                            {advisor.caseStudies.map((study, index) => (
                                <article key={study.title} className="cap-case-card">
                                    <span>{String(index + 1).padStart(2, '0')}</span>
                                    <h3>{study.title}</h3>

                                    <div>
                                        <strong>Challenge</strong>
                                        <p>{study.challenge}</p>
                                    </div>

                                    <div>
                                        <strong>Outcome</strong>
                                        <p>{study.outcome}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="booking" className="cap-section-card">
                        <span className="cap-section-label">Session options</span>
                        <h2>Available advisory formats</h2>

                        <div className="cap-offering-list">
                            {advisor.sessionOfferings.map((session) => (
                                <article key={session.id} className="cap-offering">
                                    <div>
                                        <h3>{session.name}</h3>
                                        <p>{session.description}</p>
                                    </div>
                                    <strong>{session.durationMinutes} min · ${session.price}</strong>
                                </article>
                            ))}
                        </div>
                    </section>
                </main>

                <aside className="cap-side-rail">
                    <div className="cap-side-card cap-side-card--primary">
                        <span className="cap-panel-label">Next step</span>
                        <h3>Submit request for review</h3>
                        <p>
                            You will provide context, desired outcome, company stage, and deposit before the advisor accepts.
                        </p>

                        <div className="cap-price-row">
                            <span>Starting from</span>
                            <strong>${startingPrice}</strong>
                        </div>

                        <Link
                            to={`/client/requests/new?advisorId=${advisor.id}`}
                            className="btn cap-request-btn"
                        >
                            Start request
                        </Link>
                    </div>

                    <div className="cap-side-card">
                        <span className="cap-panel-label">Availability preview</span>
                        <div className="cap-chip-grid">
                            {advisor.availabilityPreview.map((slot) => (
                                <span key={slot}>{slot}</span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}