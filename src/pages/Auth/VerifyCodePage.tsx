import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type AuthIntent = 'login' | 'signup';

export function VerifyCodePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [code, setCode] = useState('');
    const state = location.state as {
        intent?: AuthIntent;
        accountType?: 'client' | 'advisor';
    } | null;

    const intent = state?.intent ?? 'login';
    const accountType = state?.accountType ?? 'client';

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (intent === 'signup') {
            navigate(`/onboarding?type=${accountType}`, {
                state: {
                    accountType,
                },
            });
            return;
        }

        navigate('/advisor');
    };

    return (
        <div className="auth-shell auth-shell--centered">
            <main className="auth-panel auth-panel--centered">
                <div className="auth-form-card auth-form-card--compact">
                    <div className="auth-form-body">
                        <div className="auth-brand auth-brand--centered">
                            <span className="logo">Operator</span>
                            <span className="auth-brand-tagline">
                                C-suite advisory, on demand
                            </span>
                        </div>

                        <header className="auth-form-header auth-form-header--centered">
                            <p className="auth-kicker">Verification required</p>

                            <h1 className="auth-form-title">
                                Enter your
                                <br />
                                <em>6-digit code.</em>
                            </h1>

                            <p className="auth-form-sub muted">
                                We sent a secure login code to your email address.
                            </p>
                        </header>

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="auth-field">
                                <label className="auth-label" htmlFor="verify-code">
                                    Verification code
                                </label>

                                <input
                                    id="verify-code"
                                    type="text"
                                    className="auth-input auth-input--code"
                                    placeholder="123456"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                    maxLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn auth-submit-btn"
                            >
                                Verify and continue
                            </button>

                            <p className="auth-form-footer">
                                Didn&apos;t receive the code?{' '}
                                <Link
                                    className="auth-link"
                                    to={intent === 'signup' ? '/register' : '/login'}
                                >
                                    Go back
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}