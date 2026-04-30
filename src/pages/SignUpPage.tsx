import { useState } from 'react';
import { Link } from 'react-router-dom';

const ACCOUNT_TYPES = [
    {
        id: 'client',
        label: `I'm a client`,
        desc: 'Seeking advisory sessions with senior operators',
        icon: '→',
    },
    {
        id: 'advisor',
        label: `I'm an advisor`,
        desc: 'Offering my expertise to founders and operators',
        icon: '↑',
    },
] as const;

type AccountType = 'client' | 'advisor' | null;

export function SignupPage() {
    const [accountType, setAccountType] = useState<AccountType>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="auth-shell auth-shell--signup">
            {/* ── Left: narrower editorial sidebar ── */}
            <aside className="auth-sidebar auth-sidebar--signup">
                <div className="auth-sidebar-inner">
                    <div className="auth-brand">
                        <span className="logo">Operator</span>
                        <span className="auth-brand-tagline">C-suite advisory, on demand</span>
                    </div>

                    <div className="signup-sidebar-copy">
                        <h2 className="signup-sidebar-title">
                            Join the platform where senior operators share what they actually learned.
                        </h2>
                        <ul className="trust-list signup-trust-list">
                            {[
                                'Access 340+ verified C-suite operators',
                                'Book 30, 60 or 90-minute sessions',
                                'AI-assisted session summaries',
                                'Consent-based session recording',
                                'Secure payment & dispute resolution',
                            ].map((item) => (
                                <li key={item} className="trust-item">
                                    <span className="trust-tick" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
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
                        <span className="rail-label">Create account</span>
                    </div>

                    <div className="auth-form-body">
                        <header className="auth-form-header">
                            <p className="hero-eyebrow">Get started</p>
                            <h1 className="auth-form-title">
                                Create your<br />
                                <em>free account.</em>
                            </h1>
                            <p className="auth-form-sub muted">
                                Already have an account?{' '}
                                <Link to="/login" className="auth-link">Sign in →</Link>
                            </p>
                        </header>

                        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                            {/* Account type toggle */}
                            <fieldset className="auth-type-fieldset">
                                <legend className="auth-label">I am joining as…</legend>
                                <div className="auth-type-row">
                                    {ACCOUNT_TYPES.map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            className={`auth-type-tile ${accountType === type.id ? 'auth-type-tile--active' : ''}`}
                                            onClick={() => setAccountType(type.id)}
                                            aria-pressed={accountType === type.id}
                                        >
                                            <span className="auth-type-icon">{type.icon}</span>
                                            <span className="auth-type-label">{type.label}</span>
                                            <span className="auth-type-desc">{type.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            {/* Name row */}
                            <div className="auth-field-row">
                                <div className="auth-field">
                                    <label className="auth-label" htmlFor="signup-first">First name</label>
                                    <input
                                        id="signup-first"
                                        type="text"
                                        className="auth-input"
                                        placeholder="Ada"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        autoComplete="given-name"
                                    />
                                </div>
                                <div className="auth-field">
                                    <label className="auth-label" htmlFor="signup-last">Last name</label>
                                    <input
                                        id="signup-last"
                                        type="text"
                                        className="auth-input"
                                        placeholder="Lovelace"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        autoComplete="family-name"
                                    />
                                </div>
                            </div>

                            <div className="auth-field">
                                <label className="auth-label" htmlFor="signup-email">Work email</label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    className="auth-input"
                                    placeholder="ada@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </div>

                            <div className="auth-field">
                                <label className="auth-label" htmlFor="signup-password">
                                    Password
                                    <span className="auth-label-hint">min. 8 characters</span>
                                </label>
                                <input
                                    id="signup-password"
                                    type="password"
                                    className="auth-input"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="new-password"
                                />
                                {/* Password strength bar */}
                                <div className="auth-strength-bar" aria-hidden="true">
                                    <div
                                        className="auth-strength-fill"
                                        style={{ width: password.length >= 12 ? '100%' : password.length >= 8 ? '60%' : password.length >= 4 ? '30%' : '0%' }}
                                    />
                                </div>
                            </div>

                            <div className="auth-agree-row">
                                <label className="auth-checkbox-label">
                                    <input
                                        type="checkbox"
                                        className="auth-checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <span className="auth-agree-text muted">
                                        I agree to the{' '}
                                        <Link to="/terms" className="auth-link">Terms of Service</Link>{' '}
                                        and{' '}
                                        <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                                    </span>
                                </label>
                            </div>

                            <button type="submit" className="btn auth-submit-btn" disabled={!agreed}>
                                Create account
                            </button>

                            <div className="auth-divider">
                                <span className="auth-divider-line" />
                                <span className="auth-divider-text">or sign up with</span>
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