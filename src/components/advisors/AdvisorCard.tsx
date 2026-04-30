import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';
import { Badge } from '../common/Badge';

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
    const startingPrice = Math.min(...advisor.sessionOfferings.map((s) => s.price));

    return (
        <article className="advisor-card-v2">
            {/* Header row */}
            <div className="ac-header">
                <div className="ac-avatar" aria-hidden="true">
                    {advisor.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="ac-meta">
                    <h3 className="ac-name">{advisor.fullName}</h3>
                    <p className="ac-headline muted">{advisor.headline}</p>
                </div>
                {advisor.verified && (
                    <Badge tone="success" className="ac-verified">Verified</Badge>
                )}
            </div>

            {/* Location */}
            <p className="ac-location muted">{advisor.location} · {advisor.timezone}</p>

            {/* Tags */}
            <div className="stack-row ac-tags">
                {advisor.executiveTags.slice(0, 3).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                ))}
            </div>

            {/* Specialties + Industries */}
            <div className="ac-details">
                <p><span className="ac-detail-label">Specialties </span>{advisor.advisoryTopics.slice(0, 3).join(' · ')}</p>
                <p><span className="ac-detail-label">Industries </span>{advisor.industries.join(' · ')}</p>
            </div>

            {/* Footer row */}
            <div className="ac-footer stack-row row-between">
                <div className="ac-price-row">
                    <strong className="ac-price">From ${startingPrice}</strong>
                    <span className="muted ac-rating">⭐ {advisor.rating} ({advisor.reviewCount})</span>
                </div>
                <p className="muted ac-avail">Next: {advisor.availabilityPreview[0]}</p>
            </div>

            {/* Actions */}
            <div className="stack-row ac-actions">
                <Link className="btn" to={`/advisors/${advisor.id}`}>View Profile</Link>
                <Link className="btn ghost" to={`/advisors/${advisor.id}`}>Book Intro</Link>
            </div>
        </article>
    );
}