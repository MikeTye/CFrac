import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdvisorHeroDossier, AdvisorDossierCard } from '../components/advisors/AdvisorCard2';
import { advisors } from '../mocks/advisors';

/* ─────────────────────────────────────────
   STATIC CONTENT
───────────────────────────────────────── */
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

/* ─────────────────────────────────────────
   FILE FOLDER STACK — advisors[1..3]
───────────────────────────────────────── */
function FileFolderStack() {
    const stackAdvisors = advisors.slice(1, 4);
    const [activeIndex, setActiveIndex] = useState(0);

    const prev = () => setActiveIndex((i) => (i - 1 + stackAdvisors.length) % stackAdvisors.length);
    const next = () => setActiveIndex((i) => (i + 1) % stackAdvisors.length);

    return (
        <div className="file-stack-wrap">
            {/* Section header */}
            <div className="file-stack-header">
                <div className="file-stack-title-row">
                    <span className="file-divider-line" />
                    <h2 className="file-stack-heading">MORE ACTIVE CASES</h2>
                    <span className="file-divider-line" />
                </div>
                <p className="file-stack-sub">
                    Each advisor is manually vetted — minimum VP-level with at least one successful exit or institutional role.
                </p>
            </div>

            {/* Folder tabs */}
            <div className="folder-tabs-row">
                {stackAdvisors.map((a, i) => (
                    <button
                        key={a.id}
                        className={`folder-tab ${i === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(i)}
                        aria-label={`View dossier for ${a.fullName}`}
                    >
                        <span className="folder-tab-initials">
                            {a.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </span>
                        <span className="folder-tab-name">{a.fullName.split(' ')[0]}</span>
                    </button>
                ))}
            </div>

            {/* Folder body */}
            <div className="folder-body">
                {/* Paperclip decoration */}
                <div className="folder-paperclip" aria-hidden="true">
                    <div className="paperclip-outer" />
                    <div className="paperclip-inner" />
                </div>

                <AdvisorDossierCard advisor={stackAdvisors[activeIndex]} />

                {/* Arrow navigation */}
                <div className="folder-nav-row">
                    <button className="folder-nav-btn" onClick={prev} aria-label="Previous advisor">
                        ← PREV FILE
                    </button>
                    <span className="folder-nav-count">
                        {activeIndex + 1} / {stackAdvisors.length}
                    </span>
                    <button className="folder-nav-btn" onClick={next} aria-label="Next advisor">
                        NEXT FILE →
                    </button>
                </div>
            </div>

            <div className="browse-link-row">
                <Link className="btn ghost pi-browse-btn" to="/advisors">
                    Access Full Case Archive →
                </Link>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────
   MAIN LANDING PAGE
───────────────────────────────────────── */
export function LandingPage2() {
    const heroAdvisor = advisors[0];

    return (
        <div className="landing-v2">

            {/* ══ HERO ══════════════════════════════════ */}
            <section className="pi-hero">
                {/* background noise texture via CSS */}
                <div className="pi-hero-noise" aria-hidden="true" />

                <div className="pi-hero-inner page-wrap">
                    {/* left: copy */}
                    <div className="pi-hero-copy">
                        <div className="pi-hero-eyebrow">
                            <span className="pi-eyebrow-line" />
                            <span className="pi-eyebrow-text">Advisory Platform · Operator Network</span>
                        </div>
                        <h1 className="pi-hero-headline">
                            Find the right
                            <br />
                            <em className="pi-headline-em">operator</em>
                            <br />
                            for the decision
                            <br />
                            in front of you.
                        </h1>
                        <p className="pi-hero-sub">
                            Book vetted C-suite advisors for fundraising, GTM, hiring,
                            operational scale, and climate-market strategy.
                        </p>
                        <div className="pi-hero-actions">
                            <Link className="pi-btn primary" to="/advisors">Browse Advisors</Link>
                            <Link className="pi-btn ghost" to="/register">Join as Advisor</Link>
                        </div>

                        {/* trust list */}
                        <ul className="pi-trust-list">
                            {TRUST_ITEMS.map((t) => (
                                <li key={t} className="pi-trust-item">
                                    <span className="pi-trust-check">✓</span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* right: stat block */}
                    <div className="pi-hero-aside">
                        <div className="pi-stat-card">
                            <div className="pi-stat-tape" aria-hidden="true" />
                            <span className="pi-stat-number">340<sup>+</sup></span>
                            <span className="pi-stat-caption">vetted advisors across 18 functions</span>
                        </div>

                        <div className="pi-case-status">
                            <div className="pi-case-status-row">
                                <span className="pi-pulse" aria-hidden="true" />
                                <span className="pi-status-text">Network active · New cases accepted</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ FEATURED CASE FILE ════════════════════ */}
            <section className="section-gap page-wrap pi-featured-section">
                <div className="pi-section-label-row">
                    <span className="pi-section-stamp">PRIORITY CASE</span>
                    <span className="pi-section-line" />
                </div>
                <AdvisorHeroDossier advisor={heroAdvisor} />
            </section>

            {/* ══ FILE STACK ════════════════════════════ */}
            <section className="section-gap page-wrap">
                <FileFolderStack />
            </section>

            {/* ══ HOW IT WORKS ══════════════════════════ */}
            <section className="section-gap pi-how-section">
                <div className="page-wrap">
                    <div className="pi-section-label-row">
                        <span className="pi-section-stamp">PROCEDURE</span>
                        <span className="pi-section-line" />
                    </div>
                    <h2 className="pi-section-heading">How it works</h2>
                </div>
                <div className="pi-timeline page-wrap">
                    {HOW_STEPS.map((step, i) => (
                        <div key={step.num} className="pi-step">
                            <div className="pi-step-num">{step.num}</div>
                            {i < HOW_STEPS.length - 1 && (
                                <div className="pi-step-connector" aria-hidden="true" />
                            )}
                            <h3 className="pi-step-title">{step.title}</h3>
                            <p className="pi-step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ USE CASES ═════════════════════════════ */}
            <section className="section-gap page-wrap">
                <div className="pi-section-label-row">
                    <span className="pi-section-stamp">CASE TYPES</span>
                    <span className="pi-section-line" />
                </div>
                <h2 className="pi-section-heading">Common advisory engagements</h2>
                <p className="pi-section-sub">
                    Built for the moments that compound — board prep, hiring pivots, market entry, capital decisions.
                </p>
                <div className="pi-use-mosaic">
                    {USE_CASES.map((uc, i) => (
                        <div key={uc.title} className="pi-use-tile">
                            <span className="pi-tile-index">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="pi-tile-title">{uc.title}</h3>
                            <p className="pi-tile-desc">{uc.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══ CTA ═══════════════════════════════════ */}
            <section className="pi-cta-section">
                <div className="pi-cta-deco" aria-hidden="true">
                    <div className="pi-cta-deco-line" />
                    <div className="pi-cta-deco-line" />
                    <div className="pi-cta-deco-line" />
                </div>
                <div className="pi-cta-inner page-wrap">
                    <div className="pi-cta-stamp-wrap">
                        <div className="pi-cta-stamp">OPEN FOR<br />ASSIGNMENT</div>
                    </div>
                    <div className="pi-cta-text">
                        <h2>Ready to move faster with senior guidance?</h2>
                        <p>
                            The right 60 minutes with the right person changes your trajectory.
                            Don't wait for a warm intro.
                        </p>
                    </div>
                    <div className="pi-cta-actions">
                        <Link className="pi-btn primary" to="/advisors">Browse Advisors</Link>
                        <Link className="pi-btn ghost" to="/register">Join as Advisor</Link>
                    </div>
                </div>
            </section>

        </div>
    );
}