import { useMemo, useState } from 'react';
import { AdvisorSearchResultCard  } from '../../components/advisors/AdvisorSearchResultCard';
import { AdvisorFilters, type AdvisorFiltersState } from '../../components/advisors/AdvisorFilters';
import { advisors } from '../../mocks/advisors';

const SEARCH_PROMPTS = [
    'Preparing for Series A in B2B SaaS',
    'Expanding from Malaysia into Indonesia',
    'Need IPO readiness and finance leadership',
];

function getStartingPrice(advisor: (typeof advisors)[number]) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

export function AdvisorsPage() {
    const [filters, setFilters] = useState<AdvisorFiltersState>({
        keyword: '',
        verifiedOnly: false,
        industry: '',
        function: '',
        topic: '',
    });
    const [sort, setSort] = useState('rating');

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

                return (!q || searchable.includes(q))
                    && (!filters.industry || a.industries.join(' ').toLowerCase().includes(filters.industry.toLowerCase()))
                    && (!filters.function || a.functions.join(' ').toLowerCase().includes(filters.function.toLowerCase()))
                    && (!filters.topic || a.advisoryTopics.join(' ').toLowerCase().includes(filters.topic.toLowerCase()))
                    && (!filters.verifiedOnly || a.verified);
            })
            .sort((a, b) => {
                if (sort === 'price') return getStartingPrice(a) - getStartingPrice(b);
                if (sort === 'availability') return a.availabilityPreview[0].localeCompare(b.availabilityPreview[0]);
                return b.rating - a.rating;
            });
    }, [filters, sort]);

    const featured = filtered[0];

    return (
        <div className="advisors-page">
            <section className="advisors-hero">
                <div className="hero-rail">
                    <span className="rail-label">Advisor discovery</span>
                </div>

                <div className="advisors-hero-main">
                    <p className="hero-eyebrow">Outcome-driven advisor search</p>
                    <h1 className="hero-headline">
                        Search by challenge.
                        <em> Refine by proof.</em>
                    </h1>
                    <p className="hero-sub">
                        Describe what you are trying to solve, then narrow the results by function,
                        industry, topic, verification, price, and availability.
                    </p>

                    <div className="semantic-search-card">
                        <label htmlFor="advisor-semantic-search">Describe your business challenge</label>
                        <div className="semantic-search-box">
                            <input
                                id="advisor-semantic-search"
                                value={filters.keyword}
                                onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                                placeholder="Example: I need help preparing for Series A fundraising"
                            />
                            <button type="button">Search</button>
                        </div>

                        <div className="search-prompt-row">
                            {SEARCH_PROMPTS.map((prompt) => (
                                <button
                                    key={prompt}
                                    type="button"
                                    onClick={() => setFilters({ ...filters, keyword: prompt })}
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="advisors-hero-panel">
                    <span className="stat-giant">{advisors.length}<sup>+</sup></span>
                    <span className="stat-caption">seed advisors available in this wireframe</span>

                    <div className="hero-match-preview">
                        <span className="match-kicker">Discovery model</span>
                        <strong>Semantic first, filters second</strong>
                        <p>
                            Start with intent, then use structured criteria to validate fit before booking.
                        </p>
                    </div>
                </aside>
            </section>

            <section className="page-wrap advisors-body">
                <aside className="advisors-filter-panel">
                    <div className="filter-panel-header">
                        <span>Refine results</span>
                        <p>Use filters after the problem statement to make the shortlist more precise.</p>
                    </div>
                    <AdvisorFilters filters={filters} onChange={setFilters} />
                </aside>

                <main className="advisors-results">
                    {featured ? (
                        <section className="best-match-section">
                            <div>
                                <p className="hero-eyebrow">Best match</p>
                                <h2>Start with the operator closest to your current decision.</h2>
                                <p className="muted">
                                    This area should eventually show semantic match reasoning, such as matched
                                    outcomes, relevant industries, and similar past challenges.
                                </p>
                            </div>
                            <AdvisorSearchResultCard  advisor={featured} />
                        </section>
                    ) : null}

                    <div className="directory-results-head">
                        <div>
                            <strong>{filtered.length}</strong>
                            <span className="muted"> advisors found</span>
                        </div>

                        <label className="directory-sort">
                            Sort by
                            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="rating">Highest rated</option>
                                <option value="price">Lowest starting price</option>
                                <option value="availability">Soonest availability</option>
                            </select>
                        </label>
                    </div>

                    <div className="directory-grid">
                        {filtered.map((advisor) => (
                            <AdvisorSearchResultCard  key={advisor.id} advisor={advisor} />
                        ))}
                    </div>
                </main>
            </section>
        </div>
    );
}