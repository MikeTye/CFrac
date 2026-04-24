export type AdvisorFiltersState = {
  keyword: string;
  verifiedOnly: boolean;
  industry: string;
};

export function AdvisorFilters({ filters, onChange }: { filters: AdvisorFiltersState; onChange: (next: AdvisorFiltersState) => void }) {
  return (
    <div className="card">
      <h3>Filters</h3>
      <input placeholder="keyword" value={filters.keyword} onChange={(e) => onChange({ ...filters, keyword: e.target.value })} />
      <input placeholder="industry" value={filters.industry} onChange={(e) => onChange({ ...filters, industry: e.target.value })} />
      <label><input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })} /> Verified only</label>
      <p className="muted">Price, language, function, and availability filters shown as design placeholders.</p>
    </div>
  );
}
