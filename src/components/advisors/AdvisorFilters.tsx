export type AdvisorFiltersState = {
    keyword: string;
    verifiedOnly: boolean;
    industry: string;
    function: string;
    topic: string;
};

export function AdvisorFilters({
    filters,
    onChange,
}: {
    filters: AdvisorFiltersState;
    onChange: (next: AdvisorFiltersState) => void;
}) {
    return (
        <div className="advisor-filter-form">
            <label className="advisor-filter-field">
                <span>Keyword</span>
                <input
                    placeholder="Name, topic, or experience"
                    value={filters.keyword}
                    onChange={(e) => onChange({ ...filters, keyword: e.target.value })}
                />
            </label>

            <label className="advisor-filter-field">
                <span>Industry</span>
                <input
                    placeholder="Fintech, SaaS, climate..."
                    value={filters.industry}
                    onChange={(e) => onChange({ ...filters, industry: e.target.value })}
                />
            </label>

            <label className="advisor-filter-field">
                <span>Function</span>
                <input
                    placeholder="Finance, GTM, operations..."
                    value={filters.function}
                    onChange={(e) => onChange({ ...filters, function: e.target.value })}
                />
            </label>

            <label className="advisor-filter-field">
                <span>Advisory topic</span>
                <input
                    placeholder="Fundraising, IPO, expansion..."
                    value={filters.topic}
                    onChange={(e) => onChange({ ...filters, topic: e.target.value })}
                />
            </label>

            <label className="advisor-filter-check">
                <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
                />
                <span>Verified advisors only</span>
            </label>
        </div>
    );
}