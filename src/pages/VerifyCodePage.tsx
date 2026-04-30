import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type AuthIntent = 'login' | 'signup';

export function VerifyCodePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const intent = (location.state as { intent?: AuthIntent } | null)?.intent ?? 'login';
  const [code, setCode] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (intent === 'signup') {
      navigate('/onboarding');
      return;
    }
    navigate('/advisor');
  };

  return (
    <div className="auth-shell auth-shell--verify">
      <aside className="auth-sidebar auth-sidebar--signup">
        <div className="auth-sidebar-inner">
          <div className="auth-brand">
            <span className="logo">Operator</span>
            <span className="auth-brand-tagline">C-suite advisory, on demand</span>
          </div>
          <div className="signup-sidebar-copy">
            <h2 className="signup-sidebar-title">Verify your secure sign-in code.</h2>
            <p className="muted">For demo, any 6-digit value will continue the flow.</p>
          </div>
        </div>
      </aside>

      <main className="auth-main">
        <div className="auth-form-wrap">
          <div className="auth-rail" aria-hidden="true">
            <span className="rail-label">Verify code</span>
          </div>

          <div className="auth-form-body">
            <header className="auth-form-header">
              <p className="hero-eyebrow">One-time verification</p>
              <h1 className="auth-form-title">Enter your <em>6-digit code.</em></h1>
              <p className="auth-form-sub muted">Code sent to your email. Didn&apos;t receive it? <Link className="auth-link" to={intent === 'signup' ? '/register' : '/login'}>Go back</Link></p>
            </header>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="verify-code">Verification code</label>
                <input
                  id="verify-code"
                  type="text"
                  className="auth-input"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  inputMode="numeric"
                />
              </div>
              <button type="submit" className="btn auth-submit-btn">Verify and continue</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
