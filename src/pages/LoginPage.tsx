import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SOCIAL_PROOF = [
    { stat: '340+', label: 'vetted advisors' },
    { stat: '92%', label: 'session satisfaction' },
    { stat: '18', label: 'focus functions' },
];

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [magicLink, setMagicLink] = useState('');
    const navigate = useNavigate();

    return (
        <div className="auth-shell">
            {/* ── Left: editorial sidebar ── */}
            <aside className="auth-sidebar">
                <div className="auth-sidebar-inner">
                    <div className="auth-brand">
                        <span className="logo">Operator</span>
                        <span className="auth-brand-tagline">C-suite advisory, on demand</span>
                    </div>

                    <blockquote className="auth-sidebar-quote">
                        <p className="auth-quote-text">
                            "The right 60 minutes with the right operator saved us six months of expensive mistakes."
                        </p>
                        <footer className="auth-quote-attr">
                            <div className="ac-avatar auth-quote-avatar">SR</div>
                            <div>
                                <div className="auth-quote-name">Sofía Reyes</div>
                                <div className="auth-quote-role">Founder, Series A SaaS</div>
                            </div>
                        </footer>
                    </blockquote>

                    <div className="auth-sidebar-stats">
                        {SOCIAL_PROOF.map((s) => (
                            <div key={s.stat} className="auth-stat">
                                <span className="auth-stat-num">{s.stat}</span>
                                <span className="auth-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="auth-deco-rings" aria-hidden="true">
                        <div className="auth-deco-circle auth-deco-circle--lg" />
                        <div className="auth-deco-circle auth-deco-circle--sm" />
                    </div>
                </div>
            </aside>

            {/* ── Right: form ── */}
            <main className="auth-main">
                <div className="auth-form-wrap">
                    <div className="auth-rail" aria-hidden="true">
                        <span className="rail-label">Sign in</span>
                    </div>

                    <div className="auth-form-body">
                        <header className="auth-form-header">
                            <p className="hero-eyebrow">Welcome back</p>
                            <h1 className="auth-form-title">
                                Sign in to your<br />
                                <em>account.</em>
                            </h1>
                            <p className="auth-form-sub muted">
                                Don't have an account?{' '}
                                <Link to="/register" className="auth-link">Create one →</Link>
                            </p>
                        </header>

                        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); navigate('/verify-code', { state: { intent: 'login' } }); }}>
                            <div className="auth-field">
                                <label className="auth-label" htmlFor="login-email">
                                    Email address
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="you@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="auth-field">
                                <label className="auth-label" htmlFor="login-magic">One-time access code</label>
                                <input id="login-magic" type="text" className="auth-input" placeholder="Sent instantly after continue" value={magicLink} onChange={(e) => setMagicLink(e.target.value)} />
                            </div>

                            <button type="submit" className="btn auth-submit-btn">Continue</button>

                            <div className="auth-divider">
                                <span className="auth-divider-line" />
                                <span className="auth-divider-text">or continue with</span>
                                <span className="auth-divider-line" />
                            </div>

                            <div className="auth-social-row">
                                <button type="button" className="auth-social-btn">
                                    <span className="auth-social-icon">G</span>
                                    Google
                                </button>
                                <button type="button" className="auth-social-btn">
                                    <span className="auth-social-icon">in</span>
                                    LinkedIn
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}