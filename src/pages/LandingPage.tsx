import { Link } from 'react-router-dom';
import { AdvisorCard } from '../components/advisors/AdvisorCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { advisors } from '../mocks/advisors';

const HOW_STEPS = [
    {
        num: '01',
        title: 'Describe the challenge',
        desc: 'Ask naturally — fundraising, expansion, hiring, IPO readiness, GTM, or operational scale.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
    },
    {
        num: '02',
        title: 'Match by real outcomes',
        desc: 'We search advisor experience, resumes, achievements, industries, and operating history.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
    },
    {
        num: '03',
        title: 'Book the right operator',
        desc: 'Review proof points, watch the intro, and book a focused session on-platform.',
        icon: (
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <polyline points="9 16 11 18 15 14" />
            </svg>
        ),
    },
];

const USE_CASES = [
    {
        title: '"We are preparing for Series A."',
        desc: 'Matched with advisors who have raised institutional rounds and shaped investor narratives.',
        tag: 'Fundraising',
    },
    {
        title: '"We want to expand into Indonesia."',
        desc: 'Matched with operators who have opened regional offices and built local teams.',
        tag: 'Expansion',
    },
    {
        title: '"We need IPO readiness advice."',
        desc: 'Matched with CFOs, legal operators, and founders with public-market experience.',
        tag: 'Public markets',
    },
    {
        title: '"Our sales motion is not scaling."',
        desc: 'Matched with GTM leaders who have built repeatable enterprise or channel sales engines.',
        tag: 'GTM',
    },
    {
        title: '"We need to hire senior leadership."',
        desc: 'Matched with operators who have designed executive org structures and hiring plans.',
        tag: 'Hiring',
    },
];

export function LandingPage() {
    const featured = advisors.slice(0, 4);

    return (
        <div className="landing">

            {/* ── HERO ── asymmetric two-column */}
            <section className="hero-split">
                <div className="hero-rail">
                    <span className="rail-label">Advisory platform</span>
                </div>
                <div className="hero-body">
                    <p className="hero-eyebrow">Outcome-driven advisory search</p>
                    <h1 className="hero-headline">
                        Describe the challenge.
                        <em> Find the operator who has done it before.</em>
                    </h1>
                    <p className="hero-sub">
                        Ask naturally and match with vetted C-suite operators by real achievements —
                        fundraising, IPOs, market expansion, GTM, hiring, and operational scale.
                    </p>
                    <div className="stack-row hero-actions">
                        <Link className="btn" to="/advisors">Search Advisors</Link>
                        <Link className="btn ghost" to="/register">Join as Advisor</Link>
                    </div>
                </div>
                <div className="hero-aside">
                    <div className="hero-ask-card">
                        <span className="hero-ask-label">Try asking</span>

                        <div className="hero-query-list">
                            <p>"Who has raised Series A for B2B SaaS?"</p>
                            <p>"Help me expand from Malaysia into Indonesia."</p>
                            <p>"Find someone who has taken a company public."</p>
                        </div>

                        <div className="hero-match-preview">
                            <span className="match-kicker">Example match</span>
                            <strong>Former CFO · Led IPO on SGX</strong>
                            <p>Raised $42M, built finance teams across APAC, supported public-market readiness.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURED ADVISORS ── */}
            <section className="section-gap page-wrap">
                <SectionHeader
                    title="Featured Advisors"
                    subtitle="Every advisor is manually verified — minimum VP-level with at least one successful exit or institutional role."
                    data-label="Advisors"
                />
                <div className="advisor-grid-balanced">
                    {featured.map((advisor) => (
                        <AdvisorCard key={advisor.id} advisor={advisor} />
                    ))}
                </div>
                <div className="browse-link-row">
                    <Link className="btn ghost" to="/advisors">View all advisors →</Link>
                </div>
            </section>

            {/* ── HOW IT WORKS ── unified panel */}
            <section className="how-section">
                <div className="page-wrap">
                    <SectionHeader
                        title="How it works"
                        subtitle="A focused workflow designed to connect founders with operators who have already solved similar challenges."
                        data-label="Process"
                    />
                    <div className="timeline-track">
                        {HOW_STEPS.map((step) => (
                            <div key={step.num} className="timeline-step">
                                <div className="timeline-num">{step.num}</div>
                                <div className="timeline-icon">{step.icon}</div>
                                <h3 className="timeline-title">{step.title}</h3>
                                <p className="timeline-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── USE CASES ── tiles with category tags */}
            <section className="section-gap page-wrap">
                <SectionHeader
                    title="What founders are asking"
                    subtitle="Search by business challenge, not just job title or category."
                    data-label="Use cases"
                />
                <div className="use-case-mosaic">
                    {USE_CASES.map((uc, i) => (
                        <div key={uc.title} className="use-case-tile">
                            <span className="tile-index">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="tile-title">{uc.title}</h3>
                            <p className="tile-desc">{uc.desc}</p>
                            <span className="tile-tag">{uc.tag}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── full-bleed with grid texture + blob ring */}
            <section className="cta-fullbleed">
                <div className="cta-deco" aria-hidden="true" />
                <div className="cta-inner page-wrap">
                    <div className="cta-text">
                        <h2>Ready to move faster with senior guidance?</h2>
                        <p>The right 60 minutes with the right person changes your trajectory. Don't wait for a warm intro.</p>
                    </div>
                    <div className="stack-row">
                        <Link className="btn" to="/advisors">Search Advisors</Link>
                        <Link className="btn ghost" to="/register">Join as Advisor</Link>
                    </div>
                </div>
            </section>

        </div>
    );
}