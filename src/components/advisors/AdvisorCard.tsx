import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <Card>
      <h3>{advisor.fullName}</h3>
      <p>{advisor.headline}</p>
      <div className="stack-row">
        {advisor.verified && <Badge tone="success">Verified</Badge>}
        {advisor.executiveTags.slice(0, 2).map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>
      <p className="muted">{advisor.industries.join(' • ')}</p>
      <p>From ${Math.min(...advisor.sessionOfferings.map((s) => s.price))}</p>
      <p>⭐ {advisor.rating} ({advisor.reviewCount})</p>
      <Link className="btn" to={`/advisors/${advisor.id}`}>View Profile</Link>
    </Card>
  );
}
