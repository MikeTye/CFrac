export type AdvisorFiltersState = { keyword: string; verifiedOnly: boolean; industry: string; function: string; topic: string; };

export function AdvisorFilters({ filters, onChange }: { filters: AdvisorFiltersState; onChange: (next: AdvisorFiltersState) => void }) {
  return (
    <div className="card filter-sidebar">
      <h3>Refine Results</h3>
      <p className="muted">Find the right operator for the decision in front of you.</p>
      <input placeholder="Search by name, topic, or experience" value={filters.keyword} onChange={(e) => onChange({ ...filters, keyword: e.target.value })} />
      <input placeholder="Industry" value={filters.industry} onChange={(e) => onChange({ ...filters, industry: e.target.value })} />
      <input placeholder="Function" value={filters.function} onChange={(e) => onChange({ ...filters, function: e.target.value })} />
      <input placeholder="Advisory topic" value={filters.topic} onChange={(e) => onChange({ ...filters, topic: e.target.value })} />
      <label><input type="checkbox" checked={filters.verifiedOnly} onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })} /> Verified advisors only</label>
    </div>
  );
}
