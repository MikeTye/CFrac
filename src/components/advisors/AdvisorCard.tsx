import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  const startingPrice = Math.min(...advisor.sessionOfferings.map((s) => s.price));
  return (
    <Card className="advisor-card">
      <div className="stack-row row-between">
        <div>
          <h3>{advisor.fullName}</h3>
          <p className="muted">{advisor.headline}</p>
        </div>
        {advisor.verified && <Badge tone="success">Verified</Badge>}
      </div>
      <p className="muted">{advisor.location} • {advisor.timezone}</p>
      <div className="stack-row">{advisor.executiveTags.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)}</div>
      <p><strong>Specialties:</strong> {advisor.advisoryTopics.slice(0, 3).join(' • ')}</p>
      <p><strong>Industries:</strong> {advisor.industries.join(' • ')}</p>
      <div className="stack-row row-between">
        <p><strong>From ${startingPrice}</strong></p>
        <p>⭐ {advisor.rating} ({advisor.reviewCount})</p>
      </div>
      <p className="muted">Next available: {advisor.availabilityPreview[0]}</p>
      <div className="stack-row">
        <Link className="btn" to={`/advisors/${advisor.id}`}>View Profile</Link>
        <Link className="btn ghost" to={`/advisors/${advisor.id}`}>Book Intro</Link>
      </div>
    </Card>
  );
}
