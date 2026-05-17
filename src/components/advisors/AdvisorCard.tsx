import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';
import { Badge } from '../common/Badge';

const fallbackAchievements = [
    'Raised institutional capital',
    'Led regional expansion',
    'Scaled executive teams',
];

export function AdvisorCard({ advisor }: { advisor: Advisor }) {
    const startingPrice = Math.min(...advisor.sessionOfferings.map((s) => s.price));

    const fallbackAchievements: Advisor['achievements'] = [
        {
            title: 'Raised institutional capital',
            description: 'Supported fundraising preparation and investor materials.',
        },
        {
            title: 'Led regional expansion',
            description: 'Helped companies enter new markets and build operating teams.',
        },
        {
            title: 'Scaled executive teams',
            description: 'Designed leadership structure for growth-stage companies.',
        },
    ];

    const achievements =
        advisor.achievements?.length
            ? advisor.achievements.slice(0, 3)
            : fallbackAchievements;

    return (
        <article className="advisor-card-v2">
            <div className="ac-media">
                {advisor.profilePhotoUrl ? (
                    <img src={advisor.profilePhotoUrl} alt={advisor.fullName} />
                ) : (
                    <div className="ac-media-placeholder">
                        {advisor.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                )}

                {advisor.introVideoUrl && (
                    <span className="ac-video-pill">15s intro</span>
                )}
            </div>

            <div className="ac-body">
                <div className="ac-header">
                    <div className="ac-meta">
                        <h3 className="ac-name">{advisor.fullName}</h3>
                        <p className="ac-headline muted">{advisor.headline}</p>
                    </div>

                    {advisor.verified && (
                        <span className="ac-verified">
                            <Badge tone="success">Verified</Badge>
                        </span>
                    )}
                </div>

                <p className="ac-location muted">{advisor.location} · {advisor.timezone}</p>

                <div className="ac-achievements">
                    {achievements.map((item) => (
                        <div key={item.title} className="ac-achievement">
                            <strong>{item.metric ? `${item.metric} ` : ''}{item.title}</strong>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>

                <div className="stack-row ac-tags">
                    {advisor.executiveTags.slice(0, 3).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                </div>

                <div className="ac-footer">
                    <div>
                        <strong className="ac-price">From ${startingPrice}</strong>
                        <p className="muted ac-footnote">Book a focused operator session</p>
                    </div>

                    <Link className="btn" to={`/advisors/${advisor.id}`}>View Profile</Link>
                </div>
            </div>
        </article>
    );
}