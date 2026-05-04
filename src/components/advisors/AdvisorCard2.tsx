import { Link } from 'react-router-dom';
import type { Advisor } from '../../mocks/advisors';

/* ─────────────────────────────────────────
   PI DOSSIER CARD  — used in the file-folder
   stack on the landing page
───────────────────────────────────────── */
export function AdvisorDossierCard({ advisor }: { advisor: Advisor }) {
    const startingPrice = Math.min(...advisor.sessionOfferings.map((s) => s.price));
    const initials = advisor.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('');

    return (
        <article className="dossier-card">
            {/* red corner stamp */}
            <span className="dossier-stamp">VERIFIED</span>

            <div className="dossier-inner">
                {/* left: mugshot + price */}
                <div className="dossier-left">
                    <div className="dossier-mugshot">{initials}</div>
                    <div className="dossier-price">From ${startingPrice}</div>
                    <div className="dossier-rating">★ {advisor.rating} ({advisor.reviewCount})</div>
                </div>

                {/* right: file lines */}
                <div className="dossier-right">
                    <div className="dossier-field">
                        <span className="dossier-label">NAME</span>
                        <span className="dossier-value name">{advisor.fullName}</span>
                    </div>
                    <div className="dossier-field">
                        <span className="dossier-label">ROLE</span>
                        <span className="dossier-value">{advisor.headline}</span>
                    </div>
                    <div className="dossier-field">
                        <span className="dossier-label">LOCATION</span>
                        <span className="dossier-value">{advisor.location} · {advisor.timezone}</span>
                    </div>
                    <div className="dossier-field">
                        <span className="dossier-label">SPECIALTIES</span>
                        <span className="dossier-value">{advisor.advisoryTopics.slice(0, 3).join(', ')}</span>
                    </div>
                    <div className="dossier-field">
                        <span className="dossier-label">INDUSTRIES</span>
                        <span className="dossier-value">{advisor.industries.join(', ')}</span>
                    </div>
                    <div className="dossier-field">
                        <span className="dossier-label">NEXT AVAIL.</span>
                        <span className="dossier-value">{advisor.availabilityPreview[0]}</span>
                    </div>

                    <div className="dossier-tags">
                        {advisor.executiveTags.slice(0, 3).map((tag) => (
                            <span key={tag} className="dossier-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="dossier-actions">
                        <Link className="dossier-btn primary" to={`/advisors/${advisor.id}`}>Open File</Link>
                        <Link className="dossier-btn ghost" to={`/advisors/${advisor.id}`}>Book Intro</Link>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* ─────────────────────────────────────────
   HERO DOSSIER — full-detail featured advisor
───────────────────────────────────────── */
export function AdvisorHeroDossier({ advisor }: { advisor: Advisor }) {
    const startingPrice = Math.min(...advisor.sessionOfferings.map((s) => s.price));
    const initials = advisor.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('');

    return (
        <article className="hero-dossier">
            {/* top bar */}
            <div className="hd-topbar">
                <span className="hd-case-label">CASE FILE — FEATURED ADVISOR</span>
                <span className="hd-classified">CONFIDENTIAL</span>
            </div>

            <div className="hd-body">
                {/* left column */}
                <div className="hd-left">
                    <div className="hd-mugshot-wrap">
                        <div className="hd-mugshot">{initials}</div>
                        <div className="hd-mugshot-caption">Subject Photo</div>
                    </div>

                    <div className="hd-stat-block">
                        <div className="hd-stat">
                            <span className="hd-stat-label">RATING</span>
                            <span className="hd-stat-value">★ {advisor.rating}</span>
                        </div>
                        <div className="hd-stat">
                            <span className="hd-stat-label">REVIEWS</span>
                            <span className="hd-stat-value">{advisor.reviewCount}</span>
                        </div>
                        <div className="hd-stat">
                            <span className="hd-stat-label">FROM</span>
                            <span className="hd-stat-value">${startingPrice}</span>
                        </div>
                    </div>

                    {advisor.verified && (
                        <div className="hd-verified-seal">
                            <span className="hd-seal-ring">✓ VERIFIED</span>
                        </div>
                    )}
                </div>

                {/* centre: main fields */}
                <div className="hd-centre">
                    <div className="hd-field-group">
                        <div className="hd-field wide">
                            <span className="hd-fl">FULL NAME</span>
                            <span className="hd-fv name">{advisor.fullName}</span>
                        </div>
                        <div className="hd-field wide">
                            <span className="hd-fl">CURRENT ROLE</span>
                            <span className="hd-fv">{advisor.headline}</span>
                        </div>
                    </div>

                    <div className="hd-field-group two-col">
                        <div className="hd-field">
                            <span className="hd-fl">LOCATION</span>
                            <span className="hd-fv">{advisor.location}</span>
                        </div>
                        <div className="hd-field">
                            <span className="hd-fl">TIMEZONE</span>
                            <span className="hd-fv">{advisor.timezone}</span>
                        </div>
                        <div className="hd-field">
                            <span className="hd-fl">NEXT AVAILABLE</span>
                            <span className="hd-fv">{advisor.availabilityPreview[0]}</span>
                        </div>
                        <div className="hd-field">
                            <span className="hd-fl">STATUS</span>
                            <span className="hd-fv accent">ACTIVE</span>
                        </div>
                    </div>

                    <div className="hd-field wide">
                        <span className="hd-fl">SPECIALTIES</span>
                        <span className="hd-fv">{advisor.advisoryTopics.join(' · ')}</span>
                    </div>

                    <div className="hd-field wide">
                        <span className="hd-fl">INDUSTRIES</span>
                        <span className="hd-fv">{advisor.industries.join(' · ')}</span>
                    </div>

                    <div className="hd-tags-row">
                        {advisor.executiveTags.map((tag) => (
                            <span key={tag} className="hd-tag">{tag}</span>
                        ))}
                    </div>

                    <div className="hd-actions">
                        <Link className="hd-btn primary" to={`/advisors/${advisor.id}`}>Open Full File</Link>
                        <Link className="hd-btn ghost" to={`/advisors/${advisor.id}`}>Book Intro Session</Link>
                    </div>
                </div>
            </div>

            {/* bottom redaction bar */}
            <div className="hd-footer">
                <span className="hd-footer-text">Advisory Platform · Operator Network · Strictly Confidential</span>
                <span className="hd-footer-id">REF: {advisor.id.toUpperCase().slice(0, 8)}</span>
            </div>
        </article>
    );
}