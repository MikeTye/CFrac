import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdvisorCard } from '../../components/advisors/AdvisorCard';
import { AdvisorFilters, type AdvisorFiltersState } from '../../components/advisors/AdvisorFilters';
import { advisors } from '../../mocks/advisors';

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
                const searchable = `${a.fullName} ${a.headline} ${a.advisoryTopics.join(' ')} ${a.functions.join(' ')}`.toLowerCase();

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
        <div className="advisor-directory-page">
            <section className="advisor-directory-hero">
                <div className="hero-rail">
                    <span className="rail-label">Advisor directory</span>
                </div>

                <div>
                    <p className="hero-eyebrow">Verified operators</p>
                    <h1 className="hero-headline">
                        Find the right advisor for the
                        <em> decision in front of you.</em>
                    </h1>
                    <p className="hero-sub">
                        Search by function, industry, challenge, availability, and price.
                        Every booking stays platform-managed for payment, consent, and session records.
                    </p>
                </div>

                <div className="directory-hero-panel card">
                    <span className="stat-giant">{advisors.length}<sup>+</sup></span>
                    <span className="stat-caption">seed advisors available in this wireframe</span>
                    <div className="directory-hero-list">
                        <span>Platform-hosted sessions</span>
                        <span>Consent-based recording</span>
                        <span>Transcript-ready bookings</span>
                    </div>
                </div>
            </section>

            <section className="page-wrap advisor-directory-body">
                <AdvisorFilters filters={filters} onChange={setFilters} />

                <div className="stack-lg">
                    {featured ? (
                        <section className="directory-feature-row">
                            <div>
                                <p className="hero-eyebrow">Best match</p>
                                <h2>Start with a senior operator who matches your current problem.</h2>
                                <p className="muted">
                                    The directory should feel curated first, searchable second — less like a database,
                                    more like a decision-support surface.
                                </p>
                            </div>
                            <AdvisorCard advisor={featured} />
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
                            <AdvisorCard key={advisor.id} advisor={advisor} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}