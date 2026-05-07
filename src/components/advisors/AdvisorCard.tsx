import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';
import { Badge } from '../common/Badge';

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
    const startingPrice = Math.min(...advisor.sessionOfferings.map((s) => s.price));

    return (
        <article className="advisor-card-v2">
            <div className="ac-header">
                <div className="ac-avatar" aria-hidden="true">
                    {advisor.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>

                <div className="ac-meta">
                    <h3 className="ac-name">{advisor.fullName}</h3>
                    <p className="ac-headline muted">{advisor.headline}</p>
                </div>

                {advisor.verified ? (
                    <Badge tone="success" className="ac-verified">Verified</Badge>
                ) : null}
            </div>

            <p className="ac-impact-headline">{advisor.impact.headlineOutcome}</p>

            <div className="ac-impact-metrics">
                {advisor.impact.metrics.slice(0, 3).map((metric) => (
                    <div className="ac-metric" key={metric.label}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                    </div>
                ))}
            </div>

            <ul className="ac-impact-highlights">
                {advisor.impact.highlights.slice(0, 2).map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            <div className="ac-footer stack-row row-between">
                <div className="ac-price-row">
                    <strong className="ac-price">From ${startingPrice}</strong>
                    <span className="muted ac-rating">★ {advisor.rating} ({advisor.reviewCount})</span>
                </div>
                <p className="muted ac-avail">Next: {advisor.availabilityPreview[0]}</p>
            </div>

            <div className="stack-row ac-actions">
                <Link className="btn" to={`/advisors/${advisor.id}`}>View Proof</Link>
                <Link className="btn ghost" to={`/advisors/${advisor.id}`}>Book Intro</Link>
            </div>
        </article>
    );
}