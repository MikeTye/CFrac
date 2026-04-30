import { Link } from 'react-router-dom';
import { AdvisorCard } from '../components/advisors/AdvisorCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { advisors } from '../mocks/advisors';

const TRUST_ITEMS = [
    'Verified executive advisors',
    'Secure payment records',
    'Platform-hosted sessions',
    'Consent-based recording',
];

const HOW_STEPS = [
    {
        num: '01',
        title: 'Discover trusted operators',
        desc: 'Search by function, industry, or specific challenge. Filter by availability, price, or credential tier.',
    },
    {
        num: '02',
        title: 'Book on-platform sessions',
        desc: 'Reserve 30, 60, or 90-minute slots. Pay securely. Get a calendar invite with prep materials.',
    },
    {
        num: '03',
        title: 'Act on executive guidance',
        desc: 'Attend, get an AI-assisted summary, and leave a review. Transcripts available with consent.',
    },
];

const USE_CASES = [
    { title: 'Fundraising preparation', desc: 'Pitch decks, term sheets, investor narratives' },
    { title: 'GTM strategy', desc: 'ICP definition, channel mix, sales motion design' },
    { title: 'Leadership hiring', desc: 'Executive search, comp benchmarks, offer strategy' },
    { title: 'Operations scaling', desc: 'Process design, tooling selection, org structure' },
    { title: 'Climate & carbon markets', desc: 'Credits, policy navigation, ESG reporting' },
];

export function LandingPage() {
    const featured = advisors.slice(0, 3);

    return (
        <div className="landing">

            {/* ── HERO ── asymmetric two-column */}
            <section className="hero-split">
                <div className="hero-rail">
                    <span className="rail-label">Advisory platform</span>
                </div>
                <div className="hero-body">
                    <p className="hero-eyebrow">C-suite operators, on demand</p>
                    <h1 className="hero-headline">
                        Find the right operator for the
                        <em> decision in front of you.</em>
                    </h1>
                    <p className="hero-sub">
                        Book vetted C-suite advisors for fundraising, GTM, hiring,
                        operational scale, and climate-market strategy.
                    </p>
                    <div className="stack-row hero-actions">
                        <Link className="btn" to="/advisors">Browse Advisors</Link>
                        <Link className="btn ghost" to="/register">Join as Advisor</Link>
                    </div>
                </div>
                <div className="hero-aside">
                    <div className="hero-stat-block">
                        <span className="stat-giant">340<sup>+</sup></span>
                        <span className="stat-caption">vetted advisors across 18 functions</span>
                    </div>
                    <ul className="trust-list">
                        {TRUST_ITEMS.map((t) => (
                            <li key={t} className="trust-item">
                                <span className="trust-tick" aria-hidden="true" />
                                {t}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ── FEATURED ADVISORS ── staggered feature + compact grid */}
            <section className="section-gap page-wrap">
                <SectionHeader
                    title="Featured Advisors"
                    subtitle="Every advisor is manually verified — minimum VP-level with at least one successful exit or institutional role."
                />
                <div className="advisor-mosaic">
                    {/* feature card — wider */}
                    <div className="advisor-feature">
                        <AdvisorCard advisor={featured[0]} />
                    </div>
                    {/* compact pair */}
                    <div className="advisor-compact-col">
                        <AdvisorCard advisor={featured[1]} />
                        <AdvisorCard advisor={featured[2]} />
                    </div>
                </div>
                <div className="browse-link-row">
                    <Link className="btn ghost" to="/advisors">View all advisors →</Link>
                </div>
            </section>

            {/* ── HOW IT WORKS ── horizontal timeline */}
            <section className="section-gap how-section">
                <div className="page-wrap">
                    <SectionHeader title="How it works" />
                </div>
                <div className="timeline-track page-wrap">
                    {HOW_STEPS.map((step, i) => (
                        <div key={step.num} className="timeline-step">
                            <div className="timeline-num">{step.num}</div>
                            {i < HOW_STEPS.length - 1 && (
                                <div className="timeline-connector" aria-hidden="true" />
                            )}
                            <h3 className="timeline-title">{step.title}</h3>
                            <p className="timeline-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── USE CASES ── asymmetric masonry-style */}
            <section className="section-gap page-wrap">
                <SectionHeader
                    title="Common advisory use cases"
                    subtitle="Built for the moments that compound — board prep, hiring pivots, market entry, capital decisions."
                />
                <div className="use-case-mosaic">
                    {USE_CASES.map((uc, i) => (
                        <div key={uc.title} className={`use-case-tile ${i === 0 ? 'tile-wide' : ''}`}>
                            <span className="tile-index">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="tile-title">{uc.title}</h3>
                            <p className="tile-desc">{uc.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── full-bleed with offset decorative bar */}
            <section className="cta-fullbleed">
                <div className="cta-deco" aria-hidden="true" />
                <div className="cta-inner page-wrap">
                    <div className="cta-text">
                        <h2>Ready to move faster with senior guidance?</h2>
                        <p>The right 60 minutes with the right person changes your trajectory. Don't wait for a warm intro.</p>
                    </div>
                    <div className="stack-row">
                        <Link className="btn" to="/advisors">Browse Advisors</Link>
                        <Link className="btn ghost" to="/register">Join as Advisor</Link>
                    </div>
                </div>
            </section>

        </div>
    );
}