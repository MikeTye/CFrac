import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdvisorCard } from '../components/advisors/AdvisorCard';
import { AdvisorFilters, type AdvisorFiltersState } from '../components/advisors/AdvisorFilters';
import { BookingModal } from '../components/advisors/BookingModal';
import { Card } from '../components/common/Card';
import { SectionHeader } from '../components/common/SectionHeader';
import { advisors } from '../mocks/advisors';

export function LandingPage() {
  return <div className="stack-lg">
    <section className="hero card premium"><h1>Find the right operator for the decision in front of you.</h1><p>Book vetted C-suite advisors for fundraising, GTM, hiring, operational scale, and climate-market strategy.</p><div className="stack-row"><Link className="btn" to="/advisors">Browse Advisors</Link><Link className="btn ghost" to="/register">Join as Advisor</Link></div></section>
    <section className="grid cols-4 trust-strip">{['Verified executive advisors', 'Secure payment records', 'Platform-hosted sessions', 'Consent-based recording'].map((x) => <Card key={x}><strong>{x}</strong></Card>)}</section>
    <section><SectionHeader title="Featured Advisors" /><div className="grid cols-3">{advisors.slice(0, 3).map((a) => <AdvisorCard key={a.id} advisor={a} />)}</div></section>
    <section><SectionHeader title="How it works" /><div className="grid cols-3">{['Discover trusted operators', 'Book on-platform sessions', 'Act on executive guidance'].map((x) => <Card key={x}><h3>{x}</h3></Card>)}</div></section>
    <section><SectionHeader title="Common advisory use cases" /><div className="grid cols-3">{['Fundraising preparation', 'GTM strategy', 'Hiring leadership', 'Operations scaling', 'Climate/carbon market guidance'].map((x) => <Card key={x}>{x}</Card>)}</div></section>
    <section className="card"><h2>Ready to move faster with senior guidance?</h2><Link className="btn" to="/advisors">Browse Advisors</Link></section>
  </div>;
}

export function AdvisorsPage() {
  const [filters, setFilters] = useState<AdvisorFiltersState>({ keyword: '', verifiedOnly: false, industry: '', function: '', topic: '' });
  const [sort, setSort] = useState('rating');
  const filtered = useMemo(() => advisors.filter((a) => {
    const q = filters.keyword.toLowerCase();
    const searchable = `${a.fullName} ${a.headline} ${a.advisoryTopics.join(' ')} ${a.functions.join(' ')}`.toLowerCase();
    return (!q || searchable.includes(q))
      && (!filters.industry || a.industries.join(' ').toLowerCase().includes(filters.industry.toLowerCase()))
      && (!filters.function || a.functions.join(' ').toLowerCase().includes(filters.function.toLowerCase()))
      && (!filters.topic || a.advisoryTopics.join(' ').toLowerCase().includes(filters.topic.toLowerCase()))
      && (!filters.verifiedOnly || a.verified);
  }).sort((a, b) => sort === 'price' ? Math.min(...a.sessionOfferings.map((s) => s.price)) - Math.min(...b.sessionOfferings.map((s) => s.price)) : b.rating - a.rating), [filters, sort]);

  return <div className="stack-lg"><section><h1>Advisors Marketplace</h1><p className="muted">Discover experienced operators across finance, GTM, talent, operations, and climate strategy.</p></section><div className="grid sidebar-layout"><AdvisorFilters filters={filters} onChange={setFilters} /><div className="stack-lg"><div className="stack-row row-between"><p><strong>{filtered.length}</strong> advisors</p><label>Sort by<select value={sort} onChange={(e) => setSort(e.target.value)}><option value="rating">Highest Rated</option><option value="price">Lowest Starting Price</option></select></label></div><div className="grid cols-2">{filtered.map((a) => <AdvisorCard key={a.id} advisor={a} />)}</div></div></div></div>;
}

export function AdvisorProfilePage() {
  const { advisorId } = useParams();
  const advisor = advisors.find((a) => a.id === advisorId) ?? advisors[0];
  const [open, setOpen] = useState(false);
  return <div className="grid profile-layout">
    <div className="stack-lg">
      <section className="card premium"><h1>{advisor.fullName}</h1><p>{advisor.headline}</p><p className="muted">{advisor.location} • {advisor.timezone} • ⭐ {advisor.rating} ({advisor.reviewCount} reviews)</p><p>{advisor.shortBio}</p></section>
      <Card><h3>Advisor Positioning</h3><p>{advisor.longBio}</p></Card>
      <Card><h3>Advisory Topics</h3><div className="stack-row">{advisor.advisoryTopics.map((x) => <span className="badge" key={x}>{x}</span>)}</div></Card>
      <Card><h3>Session Offerings</h3><ul>{advisor.sessionOfferings.map((s) => <li key={s.id}><strong>{s.name}</strong> • {s.durationMinutes} min • ${s.price} — {s.description}</li>)}</ul></Card>
      <Card><h3>Executive Experience & Achievements</h3><ul>{advisor.achievements.map((a) => <li key={a.title}>{a.title}: {a.description} <strong>{a.metric}</strong></li>)}</ul></Card>
      <Card><h3>Case Studies</h3><ul>{advisor.caseStudies.map((c) => <li key={c.title}><strong>{c.title}:</strong> {c.challenge} → {c.outcome}</li>)}</ul></Card>
      <Card><h3>Ideal Client Fit</h3><p>Best for teams seeking support in {advisor.functions.join(', ')} across {advisor.industries.join(', ')} contexts.</p></Card>
      <Card><h3>Availability Preview</h3><p>{advisor.availabilityPreview.join(' • ')}</p></Card>
      <Card><h3>Consent & Session Integrity</h3><p className="muted">All sessions are platform-hosted with booking records, consent capture, and transcript linkage for review and dispute support.</p></Card>
    </div>
    <aside className="card sticky-panel"><h3>Book a Session</h3><p>Starting at ${Math.min(...advisor.sessionOfferings.map((s) => s.price))}</p><p className="muted">Next available: {advisor.availabilityPreview[0]}</p><button className="btn" onClick={() => setOpen(true)}>Book Intro Session</button></aside>
    {open ? <BookingModal advisor={advisor} onClose={() => setOpen(false)} /> : null}
  </div>;
}

export const LoginPage = () => <Card><h1>Login</h1><input placeholder="Email" /><input placeholder="Password" type="password" /><button className="btn">Login</button></Card>;
export const RegisterPage = () => <Card><h1>Create account</h1><input placeholder="Full name" /><input placeholder="Email" /><input placeholder="Password" type="password" /><button className="btn">Create account</button></Card>;
