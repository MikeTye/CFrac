import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AdvisorCard } from '../components/advisors/AdvisorCard';
import { AdvisorFilters, type AdvisorFiltersState } from '../components/advisors/AdvisorFilters';
import { BookingModal } from '../components/advisors/BookingModal';
import { Card } from '../components/common/Card';
import { SectionHeader } from '../components/common/SectionHeader';
import { advisors } from '../mocks/advisors';

export function LandingPage() {
  return (
    <div className="stack-lg">
      <section className="hero card"><h1>C-Suite advisory, on-demand</h1><p>Book proven executives for high-impact decisions.</p><div className="stack-row"><Link className="btn" to="/advisors">Browse Advisors</Link><Link className="btn ghost" to="/register">Join as Advisor</Link></div></section>
      <section><SectionHeader title="How it works" /><div className="grid cols-3">{['Discover', 'Book', 'Get actionable guidance'].map((x) => <Card key={x}><h3>{x}</h3></Card>)}</div></section>
      <section><SectionHeader title="Featured Advisors" /><div className="grid cols-3">{advisors.slice(0, 3).map((a) => <AdvisorCard key={a.id} advisor={a} />)}</div></section>
      <section className="card"><h3>Trust Signals</h3><p>Verified profiles • secure payment placeholder • consent-based recording flow</p></section>
    </div>
  );
}

export function AdvisorsPage() {
  const [filters, setFilters] = useState<AdvisorFiltersState>({ keyword: '', verifiedOnly: false, industry: '' });
  const filtered = useMemo(() => advisors.filter((a) => {
    const q = filters.keyword.toLowerCase();
    const keywordMatch = !q || `${a.fullName} ${a.headline} ${a.advisoryTopics.join(' ')}`.toLowerCase().includes(q);
    const industryMatch = !filters.industry || a.industries.join(' ').toLowerCase().includes(filters.industry.toLowerCase());
    const verifiedMatch = !filters.verifiedOnly || a.verified;
    return keywordMatch && industryMatch && verifiedMatch;
  }), [filters]);

  return <div className="grid sidebar-layout"><AdvisorFilters filters={filters} onChange={setFilters} /><div className="grid cols-2">{filtered.map((a) => <AdvisorCard key={a.id} advisor={a} />)}</div></div>;
}

export function AdvisorProfilePage() {
  const { advisorId } = useParams();
  const advisor = advisors.find((a) => a.id === advisorId) ?? advisors[0];
  const [open, setOpen] = useState(false);
  return (
    <div className="stack-lg">
      <section className="card"><h1>{advisor.fullName}</h1><p>{advisor.headline}</p><p>{advisor.location} • {advisor.timezone}</p><button className="btn" onClick={() => setOpen(true)}>Book Session</button></section>
      <section className="grid cols-2"><Card><h3>Advisory Topics</h3><ul>{advisor.advisoryTopics.map((x) => <li key={x}>{x}</li>)}</ul></Card><Card><h3>Session Offerings</h3><ul>{advisor.sessionOfferings.map((s) => <li key={s.id}>{s.name} ({s.durationMinutes}m) - ${s.price}</li>)}</ul></Card></section>
      <section className="card"><h3>Experience Summary</h3><p>{advisor.longBio}</p></section>
      <section className="grid cols-2"><Card><h3>Achievements</h3><ul>{advisor.achievements.map((a) => <li key={a.title}>{a.title}: {a.description} {a.metric ?? ''}</li>)}</ul></Card><Card><h3>Case Studies</h3><ul>{advisor.caseStudies.map((c) => <li key={c.title}>{c.title}: {c.outcome}</li>)}</ul></Card></section>
      <section className="card"><h3>Availability Preview</h3><p>{advisor.availabilityPreview.join(' • ')}</p><p className="muted">Disclaimer: This wireframe does not guarantee final availability, pricing, or advice outcomes.</p></section>
      {open ? <BookingModal advisor={advisor} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}

export function LoginPage() {
  return <Card><h1>Login</h1><input placeholder="Email" /><input placeholder="Password" type="password" /><button className="btn">Login</button><button>Continue with Google (placeholder)</button><p><a href="#">Forgot password</a></p><Link to="/register">Register</Link></Card>;
}

export function RegisterPage() {
  return <Card><h1>Create account</h1><input placeholder="Full name" /><input placeholder="Email" /><input placeholder="Password" type="password" /><select><option>Client</option><option>Advisor</option></select><button className="btn">Create account</button><p className="muted">Advisor flow continues to onboarding/profile setup (wireframe only).</p></Card>;
}
