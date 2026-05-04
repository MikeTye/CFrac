import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdvisorCard } from '../components/advisors/AdvisorCard';
import { Rolodex } from '../components/advisors/Rolodex';
import { advisors } from '../mocks/advisors';

/* ─── Static data ────────────────────────────────────────────────────────── */

const TRUST_ITEMS = [
    ['IDENTITY', 'Verified executive advisors'],
    ['PAYMENT', 'Secure escrow-protected'],
    ['SESSION', 'Platform-hosted & recorded'],
    ['CONSENT', 'Consent-based transcripts'],
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

/* ─── Landing page ───────────────────────────────────────────────────────── */

export function LandingPage3() {
    const pool = advisors.slice(0, 6);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeAdvisor = pool[activeIndex];

    return (
        <div className="landing-dos">

            {/* ── HERO ── */}
            <section className="hero-dos">
                {/* Top classification bar */}
                <div className="hero-dos-topbar">
                    <span>CLASSIFICATION: RESTRICTED</span>
                    <span>PLATFORM: ADVISORY DIVISION</span>
                    <span>ACCESS LEVEL: PUBLIC</span>
                </div>

                <div className="hero-dos-inner">
                    {/* Left column */}
                    <div className="hero-dos-copy">
                        <p className="hero-dos-eyebrow">C-SUITE OPERATOR REGISTRY</p>
                        <h1 className="hero-dos-headline">
                            Find the right operator for the decision<br />
                            <em>in front of you.</em>
                        </h1>
                        <p className="hero-dos-sub">
                            Book vetted C-suite advisors for fundraising, GTM, hiring,
                            operational scale, and climate-market strategy. Every advisor
                            manually verified — minimum VP-level with at least one successful
                            exit or institutional role.
                        </p>

                        {/* Trust manifest */}
                        <div className="hero-trust-grid">
                            {TRUST_ITEMS.map(([key, val]) => (
                                <div key={key} className="hero-trust-item">
                                    <span className="hero-trust-key">{key}</span>
                                    <span className="hero-trust-val">{val}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-dos-actions">
                            <Link className="dos-btn-primary" to="/advisors">BROWSE ADVISORS</Link>
                            <Link className="dos-btn-ghost" to="/register">JOIN AS ADVISOR</Link>
                        </div>

                        {/* Stat cluster */}
                        <div className="hero-stat-row">
                            <div className="hero-stat">
                                <span className="hero-stat-n">340+</span>
                                <span className="hero-stat-l">Vetted advisors</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-n">18</span>
                                <span className="hero-stat-l">Functions covered</span>
                            </div>
                            <div className="hero-stat">
                                <span className="hero-stat-n">4.8</span>
                                <span className="hero-stat-l">Avg trust index</span>
                            </div>
                        </div>
                    </div>

                    {/* Right column — dossier highlight + rolodex */}
                    <div className="hero-dos-right">
                        <div className="hero-dossier-label">ACTIVE FILE</div>
                        <AdvisorCard advisor={activeAdvisor} />
                        <div className="hero-dossier-label" style={{ marginTop: '2rem' }}>
                            MORE SUBJECTS ON FILE
                        </div>
                        <Rolodex
                            advisors={pool}
                            activeIndex={activeIndex}
                            onFlip={setActiveIndex}
                        />
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="section-gap how-dos">
                <div className="page-wrap">
                    <div className="dos-section-header">
                        <span className="dos-section-stamp">PROCEDURE</span>
                        <h2>How it works</h2>
                    </div>
                    <div className="timeline-dos">
                        {HOW_STEPS.map((step, i) => (
                            <div key={step.num} className="timeline-dos-step">
                                <div className="tds-num">{step.num}</div>
                                {i < HOW_STEPS.length - 1 && <div className="tds-connector" />}
                                <h3 className="tds-title">{step.title}</h3>
                                <p className="tds-desc">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── USE CASES ── */}
            <section className="section-gap page-wrap">
                <div className="dos-section-header">
                    <span className="dos-section-stamp">KNOWN OPERATIONS</span>
                    <h2>Common advisory use cases</h2>
                    <p className="dos-section-sub">
                        Built for the moments that compound — board prep, hiring pivots, market entry, capital decisions.
                    </p>
                </div>
                <div className="usecase-dos-grid">
                    {USE_CASES.map((uc, i) => (
                        <div key={uc.title} className="usecase-dos-tile">
                            <span className="usecase-num">{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="usecase-title">{uc.title}</h3>
                            <p className="usecase-desc">{uc.desc}</p>
                            <div className="usecase-redact" aria-hidden="true" />
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-dos">
                <div className="cta-dos-topline">
                    <span>PRIORITY ACCESS</span>
                    <span>SECURE CHANNEL</span>
                    <span>NO WARM INTRO REQUIRED</span>
                </div>
                <div className="cta-dos-inner page-wrap">
                    <div className="cta-dos-text">
                        <h2>Ready to move faster with senior guidance?</h2>
                        <p>
                            The right 60 minutes with the right person changes your trajectory.
                            Don't wait for a warm intro.
                        </p>
                    </div>
                    <div className="cta-dos-actions">
                        <Link className="dos-btn-primary" to="/advisors">BROWSE ADVISORS</Link>
                        <Link className="dos-btn-ghost" to="/register">JOIN AS ADVISOR</Link>
                    </div>
                </div>
            </section>

        </div>
    );
}