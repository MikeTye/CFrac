import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    const [accountType, setAccountType] = useState<AccountType>('client');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
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
                        <p className="auth-kicker">Join the network</p>

                        <h1 className="auth-hero-title">
                            Build meaningful
                            <em> operator connections.</em>
                        </h1>

                        <p className="auth-hero-sub">
                            Join a curated advisory platform where founders and senior operators connect through real experience and proven execution.
                        </p>
                    </div>

                    <div className="auth-preview-card">
                        <div className="auth-preview-label">
                            What you get
                        </div>

                        <div className="auth-preview-item">
                            Verified C-suite operators and founders
                        </div>

                        <div className="auth-preview-item">
                            Structured advisory sessions and recordings
                        </div>

                        <div className="auth-preview-item">
                            AI-assisted summaries and session outcomes
                        </div>
                    </div>

                </section>

                {/* RIGHT */}
                <main className="auth-panel">
                    <div className="auth-form-card">
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

                            <form
                                className="auth-form"
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const selectedType = accountType || 'client';

                                    navigate('/verify-code', {
                                        state: {
                                            intent: 'signup',
                                            accountType: selectedType,
                                            firstName,
                                            lastName,
                                            email,
                                        },
                                    });
                                }}
                            >
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

                                <button type="submit" className="btn auth-submit-btn">
                                    Create account
                                </button>

                                <div className="auth-divider">
                                    <span className="auth-divider-line" />
                                    <span className="auth-divider-text">or sign up with</span>
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