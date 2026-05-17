import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';
import { Badge } from '../common/Badge';
import '../../styles/components/advisor-search-result-card.css';

function getStartingPrice(advisor: Advisor) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

export function AdvisorSearchResultCard({ advisor }: { advisor: Advisor }) {
    const startingPrice = getStartingPrice(advisor);
    const topAchievement = advisor.achievements?.[0];

    return (
        <article className="advisor-result-card">
            <div className="advisor-result-photo">
                {advisor.profilePhotoUrl ? (
                    <img src={advisor.profilePhotoUrl} alt={advisor.fullName} />
                ) : (
                    <span>
                        {advisor.fullName
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                    </span>
                )}

                {advisor.introVideoUrl && (
                    <span className="advisor-result-video">Intro</span>
                )}
            </div>

            <div className="advisor-result-main">
                <div className="advisor-result-top">
                    <div>
                        <div className="advisor-result-name-row">
                            <h3>{advisor.fullName}</h3>
                            {advisor.verified && <Badge tone="success">Verified</Badge>}
                        </div>

                        <p className="advisor-result-headline">{advisor.headline}</p>
                        <p className="advisor-result-location">
                            {advisor.location} · {advisor.timezone}
                        </p>
                    </div>

                    <div className="advisor-result-price">
                        <strong>From ${startingPrice}</strong>
                        <span>{advisor.rating.toFixed(1)} rating</span>
                    </div>
                </div>

                {topAchievement && (
                    <div className="advisor-result-proof">
                        <span>Track record</span>
                        <div>
                            <strong>
                                {topAchievement.metric ? `${topAchievement.metric} ` : ''}
                                {topAchievement.title}
                            </strong>
                            <p>{topAchievement.description}</p>
                        </div>
                    </div>
                )}

                <div className="advisor-result-bottom">
                    <div className="advisor-result-tags">
                        {advisor.executiveTags.slice(0, 4).map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>

                    <Link className="btn advisor-result-cta" to={`/advisors/${advisor.id}`}>
                        View Profile
                    </Link>
                </div>
            </div>
        </article>
    );
}