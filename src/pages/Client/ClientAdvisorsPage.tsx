/**
 * ClientAdvisorsPage.tsx
 *
 * Design rationale
 * ────────────────
 * The previous version tried to render the advisor search page inside the
 * standard `dash-content-inner` wrapper (max-width: 1180px, padded on all
 * sides). That produced a cramped layout that was unable to breathe.
 *
 * New approach — "dashboard breakout":
 *   1. The page escapes the content-inner padding by using negative margins
 *      (`.dash-breakout`) so it gets the full width of `.dash-content`.
 *   2. It renders its own full-width hero/search header that is visually
 *      distinct from the public version — darker, more compact, context-aware.
 *   3. The filter + results body uses the same two-column pattern as the
 *      public page, but inside the dashboard colour system.
 *   4. A thin "back to dashboard" breadcrumb anchors the user's location.
 *   5. A context banner shows the user's most recent intake topic so the page
 *      feels personalised rather than a generic copy-paste.
 *
 * CSS lives in:  client-advisors-page.css  (new file, also delivered)
 */

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdvisorSearchResultCard } from '../../components/advisors/AdvisorSearchResultCard';
import { AdvisorFilters, type AdvisorFiltersState } from '../../components/advisors/AdvisorFilters';
import { advisors } from '../../mocks/advisors';

// ─── search prompt chips ──────────────────────────────────────────────────────
const SEARCH_PROMPTS = [
    'Preparing for Series A in B2B SaaS',
    'Expanding from Malaysia into Indonesia',
    'Need IPO readiness and finance leadership',
];

// ─── stub: most recent intake — replace with real data from context/API ───────
const RECENT_INTAKE = {
    title: 'Preparing for Series A',
    topics: ['Fundraising', 'Finance strategy'],
};

function getStartingPrice(advisor: (typeof advisors)[number]) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

// ─────────────────────────────────────────────────────────────────────────────

export function ClientAdvisorsPage() {
    const [filters, setFilters] = useState<AdvisorFiltersState>({
        keyword: '',
        verifiedOnly: false,
        industry: '',
        function: '',
        topic: '',
    });
    const [sort, setSort] = useState('rating');
    const [filtersOpen, setFiltersOpen] = useState(false);

    const filtered = useMemo(() => {
        return advisors
            .filter((a) => {
                const q = filters.keyword.toLowerCase();
                const searchable = `
                    ${a.fullName}
                    ${a.headline}
                    ${a.advisoryTopics.join(' ')}
                    ${a.functions.join(' ')}
                    ${a.industries.join(' ')}
                `.toLowerCase();

                return (
                    (!q || searchable.includes(q)) &&
                    (!filters.industry ||
                        a.industries.join(' ').toLowerCase().includes(filters.industry.toLowerCase())) &&
                    (!filters.function ||
                        a.functions.join(' ').toLowerCase().includes(filters.function.toLowerCase())) &&
                    (!filters.topic ||
                        a.advisoryTopics.join(' ').toLowerCase().includes(filters.topic.toLowerCase())) &&
                    (!filters.verifiedOnly || a.verified)
                );
            })
            .sort((a, b) => {
                if (sort === 'price') return getStartingPrice(a) - getStartingPrice(b);
                if (sort === 'availability')
                    return a.availabilityPreview[0].localeCompare(b.availabilityPreview[0]);
                return b.rating - a.rating;
            });
    }, [filters, sort]);

    const featured = filtered[0];

    return (
        /* dash-breakout: escapes the dash-content-inner padding/max-width */
        <div className="cap-advisors-page dash-breakout">

            {/* ── Breadcrumb / location bar ──────────────────────────── */}
            <div className="cap-breadcrumb">
                <Link to="/client/dashboard" className="cap-breadcrumb-back">
                    <i className="ti ti-arrow-left" aria-hidden="true" />
                    Dashboard
                </Link>
                <i className="ti ti-chevron-right cap-breadcrumb-sep" aria-hidden="true" />
                <span className="cap-breadcrumb-current">Find advisors</span>
            </div>

            {/* ── Dashboard-aware hero / search bar ─────────────────── */}
            <section className="cap-hero">
                <div className="cap-hero-inner">

                    {/* Context pill — personalises the page */}
                    <div className="cap-context-pill">
                        <i className="ti ti-file-text" aria-hidden="true" />
                        <span>Based on your latest intake: <strong>{RECENT_INTAKE.title}</strong></span>
                        <div className="cap-context-tags">
                            {RECENT_INTAKE.topics.map((t) => (
                                <span key={t} className="cap-context-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    <h1 className="cap-hero-headline">
                        Find the right advisor
                        <em> for your next decision.</em>
                    </h1>

                    {/* Integrated search box */}
                    <div className="cap-search-bar">
                        <i className="ti ti-search cap-search-icon" aria-hidden="true" />
                        <input
                            id="cap-search"
                            value={filters.keyword}
                            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                            placeholder="Describe your challenge — e.g. preparing for Series A fundraising"
                            autoComplete="off"
                        />
                        <button type="button" className="cap-search-submit">Search</button>
                    </div>

                    {/* Prompt chips */}
                    <div className="cap-prompt-row">
                        <span className="cap-prompt-label">Try:</span>
                        {SEARCH_PROMPTS.map((prompt) => (
                            <button
                                key={prompt}
                                type="button"
                                className={`cap-prompt-chip ${filters.keyword === prompt ? 'cap-prompt-chip--active' : ''}`}
                                onClick={() =>
                                    setFilters({ ...filters, keyword: filters.keyword === prompt ? '' : prompt })
                                }
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stat aside */}
                <aside className="cap-hero-aside">
                    <div className="cap-hero-stat">
                        <span className="cap-hero-stat-number">{advisors.length}<sup>+</sup></span>
                        <span className="cap-hero-stat-label">advisors available</span>
                    </div>
                    <div className="cap-hero-stat-divider" />
                    <div className="cap-hero-model">
                        <span className="cap-hero-model-kicker">Discovery model</span>
                        <strong>Semantic first, filters second</strong>
                        <p>Describe the problem, then use filters to validate fit.</p>
                    </div>
                </aside>
            </section>

            {/* ── Body: filters + results ────────────────────────────── */}
            <div className="cap-body">

                {/* Desktop filter sidebar */}
                <aside className="cap-filter-sidebar">
                    <div className="cap-filter-header">
                        <span>Refine results</span>
                        <p>Narrow down by function, industry, topic, and availability.</p>
                    </div>
                    <AdvisorFilters filters={filters} onChange={setFilters} />
                </aside>

                {/* Results column */}
                <main className="cap-results" aria-label="Advisor search results">

                    {/* Mobile filter toggle */}
                    <div className="cap-mobile-filter-bar">
                        <button
                            type="button"
                            className="cap-mobile-filter-btn"
                            onClick={() => setFiltersOpen((o) => !o)}
                            aria-expanded={filtersOpen}
                        >
                            <i className="ti ti-adjustments-horizontal" aria-hidden="true" />
                            Filters
                            {(filters.industry || filters.function || filters.topic || filters.verifiedOnly) && (
                                <span className="cap-mobile-filter-dot" aria-label="Filters active" />
                            )}
                        </button>

                        <label className="cap-sort-inline">
                            Sort by
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="rating">Highest rated</option>
                                <option value="price">Lowest starting price</option>
                                <option value="availability">Soonest availability</option>
                            </select>
                        </label>
                    </div>

                    {/* Mobile filter drawer */}
                    {filtersOpen && (
                        <div className="cap-mobile-filter-drawer">
                            <AdvisorFilters filters={filters} onChange={setFilters} />
                        </div>
                    )}

                    {/* Best-match spotlight */}
                    {featured ? (
                        <section className="cap-best-match">
                            <div className="cap-best-match-label">
                                <i className="ti ti-sparkles" aria-hidden="true" />
                                Best match
                            </div>
                            <h2 className="cap-best-match-headline">
                                Closest operator to your current decision
                            </h2>
                            <p className="cap-best-match-sub muted">
                                Ranking will eventually reflect semantic match reasoning — matched
                                outcomes, relevant past challenges, and industry overlap.
                            </p>
                            <AdvisorSearchResultCard
                                advisor={featured}
                                profileBasePath="/client/advisors"
                                ctaLabel="View advisor"
                            />
                        </section>
                    ) : null}

                    {/* Results toolbar (desktop) */}
                    <div className="cap-results-toolbar">
                        <div className="cap-results-count">
                            <strong>{filtered.length}</strong>
                            <span className="muted"> advisors found</span>
                        </div>
                        <label className="cap-sort-desktop">
                            Sort by
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="rating">Highest rated</option>
                                <option value="price">Lowest starting price</option>
                                <option value="availability">Soonest availability</option>
                            </select>
                        </label>
                    </div>

                    {/* Grid */}
                    <div className="cap-grid">
                        {filtered.map((advisor) => (
                            <AdvisorSearchResultCard
                                key={advisor.id}
                                advisor={advisor}
                                profileBasePath="/client/advisors"
                                ctaLabel="View advisor"
                            />
                        ))}
                    </div>

                    {/* Empty state */}
                    {filtered.length === 0 && (
                        <div className="cap-empty">
                            <i className="ti ti-search-off cap-empty-icon" aria-hidden="true" />
                            <p className="cap-empty-title">No advisors match your criteria</p>
                            <p className="muted">Try broadening your search or removing a filter.</p>
                            <button
                                type="button"
                                className="cap-empty-reset"
                                onClick={() =>
                                    setFilters({
                                        keyword: '',
                                        verifiedOnly: false,
                                        industry: '',
                                        function: '',
                                        topic: '',
                                    })
                                }
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}