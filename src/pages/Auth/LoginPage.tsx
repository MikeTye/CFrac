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
            <div className="auth-layout">

                {/* LEFT */}
                <section className="auth-showcase">
                    <div className="auth-brand">
                        <span className="logo">Operator</span>
                        <span className="auth-brand-tagline">
                            C-suite advisory, on demand
                        </span>
                    </div>

                    <div>
                        <p className="auth-kicker">Welcome back</p>

                        <h1 className="auth-hero-title">
                            Serious operators.
                            <em> Real experience.</em>
                        </h1>

                        <p className="auth-hero-sub">
                            Connect with founders, executives, and operators
                            who have already solved the challenges you're facing.
                        </p>
                    </div>

                    <div className="auth-preview-card">
                        <div className="auth-preview-label">
                            Example advisory searches
                        </div>

                        <div className="auth-preview-item">
                            “Who has scaled enterprise SaaS across APAC?”
                        </div>

                        <div className="auth-preview-item">
                            “Find CFOs with IPO experience.”
                        </div>

                        <div className="auth-preview-item">
                            “Help us expand into Indonesia.”
                        </div>
                    </div>

                    <div className="auth-stat-row">
                        {SOCIAL_PROOF.map((s) => (
                            <div key={s.stat} className="auth-stat">
                                <strong>{s.stat}</strong>
                                <span>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RIGHT */}
                <main className="auth-panel">
                    <div className="auth-form-card">
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

                                <button type="submit" className="btn auth-submit-btn">Continue</button>

                                <div className="auth-divider">
                                    <span className="auth-divider-line" />
                                    <span className="auth-divider-text">or continue with</span>
                                    <span className="auth-divider-line" />
                                </div>

                                <div className="auth-social-row">
                                    <button type="button" className="auth-social-btn">
                                        Google
                                    </button>
                                    <button type="button" className="auth-social-btn">
                                        LinkedIn
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}