import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── Sub-components ── */

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
    return (
        <nav className="onboard-step-indicator" aria-label="Onboarding progress">
            {steps.map((label, i) => {
                const state = i < current ? 'done' : i === current ? 'active' : 'pending';
                return (
                    <div key={label} className={`onboard-step onboard-step--${state}`}>
                        <div className="onboard-step-dot" aria-hidden="true">
                            {state === 'done' ? '✓' : i + 1}
                        </div>
                        <span className="onboard-step-label">{label}</span>
                        {i < steps.length - 1 && (
                            <div className="onboard-step-line" aria-hidden="true" />
                        )}
                    </div>
                );
            })}
        </nav>
    );
}

/* ── Step data types ── */

interface OnboardingData {
    role: string;
    company: string;
    companySize: string;
    goals: string[];
    budget: string;
    cadence: string;
    functions: string[];
    seniority: string;
    sessionFormat: string;
    timezone: string;
}

const GOALS = [
    'Fundraising & investor relations',
    'Go-to-market strategy',
    'Leadership & executive hiring',
    'Operations & scaling',
    'Board preparation',
    'Climate & ESG strategy',
    'M&A and exit planning',
    'Product-market fit',
];

const FUNCTIONS = [
    'CEO / Founder', 'CFO / Finance', 'CRO / Revenue', 'CPO / Product',
    'COO / Operations', 'CTO / Engineering', 'CMO / Marketing', 'CHRO / People',
    'General Counsel', 'Board Director', 'Climate / ESG', 'Strategy & Corp Dev',
];

const STEPS = ['Your role', 'Advisory goals', 'Preferences', 'Profile depth'];

/* ── Step screens ── */

function StepRole({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
    return (
        <div className="onboard-step-body">
            <header className="onboard-step-header">
                <p className="hero-eyebrow">Step 1 of 4</p>
                <h2 className="onboard-step-title">
                    Tell us about<br /><em>your context.</em>
                </h2>
                <p className="onboard-step-sub muted">
                    This helps us surface advisors who've faced the same situations you're navigating now.
                </p>
            </header>

            <div className="onboard-fields">
                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-role">Your current role</label>
                    <input
                        id="ob-role"
                        type="text"
                        className="auth-input"
                        placeholder="e.g. Founder & CEO"
                        value={data.role}
                        onChange={(e) => onChange({ role: e.target.value })}
                    />
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-company">Company name</label>
                    <input
                        id="ob-company"
                        type="text"
                        className="auth-input"
                        placeholder="Acme Corp"
                        value={data.company}
                        onChange={(e) => onChange({ company: e.target.value })}
                    />
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-size">Company stage / size</label>
                    <select
                        id="ob-size"
                        className="auth-input"
                        value={data.companySize}
                        onChange={(e) => onChange({ companySize: e.target.value })}
                    >
                        <option value="">Select stage…</option>
                        <option>Pre-seed / Idea stage</option>
                        <option>Seed (1–10 employees)</option>
                        <option>Series A (11–50)</option>
                        <option>Series B–C (51–200)</option>
                        <option>Growth / Pre-IPO (200+)</option>
                        <option>Public company</option>
                        <option>Independent / Consultant</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function StepGoals({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
    const toggle = (goal: string) => {
        const next = data.goals.includes(goal)
            ? data.goals.filter((g) => g !== goal)
            : [...data.goals, goal];
        onChange({ goals: next });
    };

    return (
        <div className="onboard-step-body">
            <header className="onboard-step-header">
                <p className="hero-eyebrow">Step 2 of 4</p>
                <h2 className="onboard-step-title">
                    What are you<br /><em>trying to solve?</em>
                </h2>
                <p className="onboard-step-sub muted">
                    Select all that apply — you can update these later as your needs evolve.
                </p>
            </header>

            <div className="onboard-goal-grid">
                {GOALS.map((goal) => {
                    const active = data.goals.includes(goal);
                    return (
                        <button
                            key={goal}
                            type="button"
                            className={`onboard-goal-tile ${active ? 'onboard-goal-tile--active' : ''}`}
                            onClick={() => toggle(goal)}
                            aria-pressed={active}
                        >
                            <span className="onboard-goal-check" aria-hidden="true">{active ? '✓' : ''}</span>
                            {goal}
                        </button>
                    );
                })}
            </div>

            <div className="onboard-fields" style={{ marginTop: '1.5rem' }}>
                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-budget">Monthly advisory budget</label>
                    <select
                        id="ob-budget"
                        className="auth-input"
                        value={data.budget}
                        onChange={(e) => onChange({ budget: e.target.value })}
                    >
                        <option value="">Select budget…</option>
                        <option>Under $500 / month</option>
                        <option>$500 – $1,500 / month</option>
                        <option>$1,500 – $5,000 / month</option>
                        <option>$5,000 – $15,000 / month</option>
                        <option>$15,000+ / month</option>
                    </select>
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-cadence">Preferred session cadence</label>
                    <select
                        id="ob-cadence"
                        className="auth-input"
                        value={data.cadence}
                        onChange={(e) => onChange({ cadence: e.target.value })}
                    >
                        <option value="">Select cadence…</option>
                        <option>Ad hoc (as needed)</option>
                        <option>Once a month</option>
                        <option>Bi-weekly</option>
                        <option>Weekly</option>
                        <option>Intensive (multiple per week)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function StepPreferences({ data, onChange }: { data: OnboardingData; onChange: (d: Partial<OnboardingData>) => void }) {
    const toggle = (fn: string) => {
        const next = data.functions.includes(fn)
            ? data.functions.filter((f) => f !== fn)
            : [...data.functions, fn];
        onChange({ functions: next });
    };

    return (
        <div className="onboard-step-body">
            <header className="onboard-step-header">
                <p className="hero-eyebrow">Step 3 of 4</p>
                <h2 className="onboard-step-title">
                    Advisor<br /><em>preferences.</em>
                </h2>
                <p className="onboard-step-sub muted">
                    We'll use these to rank and surface the best-fit advisors for you.
                </p>
            </header>

            <div className="onboard-fields">
                <div className="auth-field">
                    <label className="auth-label">Advisor functions (select all relevant)</label>
                    <div className="onboard-chip-grid">
                        {FUNCTIONS.map((fn) => {
                            const active = data.functions.includes(fn);
                            return (
                                <button
                                    key={fn}
                                    type="button"
                                    className={`onboard-chip ${active ? 'onboard-chip--active' : ''}`}
                                    onClick={() => toggle(fn)}
                                    aria-pressed={active}
                                >
                                    {fn}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-seniority">Minimum advisor seniority</label>
                    <select
                        id="ob-seniority"
                        className="auth-input"
                        value={data.seniority}
                        onChange={(e) => onChange({ seniority: e.target.value })}
                    >
                        <option value="">Select level…</option>
                        <option>VP / Director level</option>
                        <option>C-suite (first-time)</option>
                        <option>C-suite with exit experience</option>
                        <option>Board director / Chairman</option>
                        <option>Multi-exit / Serial operator</option>
                    </select>
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-format">Preferred session format</label>
                    <select
                        id="ob-format"
                        className="auth-input"
                        value={data.sessionFormat}
                        onChange={(e) => onChange({ sessionFormat: e.target.value })}
                    >
                        <option value="">Select format…</option>
                        <option>30-minute focused Q&A</option>
                        <option>60-minute strategy session</option>
                        <option>90-minute deep-dive</option>
                        <option>Async written feedback</option>
                        <option>No preference</option>
                    </select>
                </div>

                <div className="auth-field">
                    <label className="auth-label" htmlFor="ob-tz">Your timezone</label>
                    <select
                        id="ob-tz"
                        className="auth-input"
                        value={data.timezone}
                        onChange={(e) => onChange({ timezone: e.target.value })}
                    >
                        <option value="">Select timezone…</option>
                        <option>UTC−08:00 Pacific Time</option>
                        <option>UTC−05:00 Eastern Time</option>
                        <option>UTC+00:00 London</option>
                        <option>UTC+01:00 Central Europe</option>
                        <option>UTC+05:30 India</option>
                        <option>UTC+08:00 Singapore / KL</option>
                        <option>UTC+09:00 Tokyo</option>
                        <option>UTC+10:00 Sydney</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

function StepProfileDepth({ data: _data }: { data: OnboardingData }) {
    // Profile depth is optional — clearly signalled as optional and skippable
    const [deepChoice, setDeepChoice] = useState<'now' | 'later' | null>(null);

    return (
        <div className="onboard-step-body">
            <header className="onboard-step-header">
                <p className="hero-eyebrow">Step 4 of 4</p>
                <h2 className="onboard-step-title">
                    Build a richer<br /><em>profile.</em>
                </h2>
                <p className="onboard-step-sub muted">
                    Advisors can prepare better sessions when they understand your situation deeply.
                    This step is entirely optional — you can complete or update it anytime.
                </p>
            </header>

            <div className="onboard-depth-tiles">
                <button
                    type="button"
                    className={`onboard-depth-tile ${deepChoice === 'now' ? 'onboard-depth-tile--active' : ''}`}
                    onClick={() => setDeepChoice('now')}
                    aria-pressed={deepChoice === 'now'}
                >
                    <div className="onboard-depth-tile-header">
                        <span className="onboard-depth-badge">Recommended</span>
                    </div>
                    <h3 className="onboard-depth-title">Complete my profile now</h3>
                    <p className="onboard-depth-desc muted">
                        Add a short bio, key challenges, and any relevant context. Takes about 5 minutes.
                        Unlocks higher-quality advisor matches.
                    </p>
                    <ul className="onboard-depth-items">
                        <li>Professional bio (2–4 sentences)</li>
                        <li>Top 3 current challenges</li>
                        <li>Relevant company context</li>
                    </ul>
                </button>

                <button
                    type="button"
                    className={`onboard-depth-tile ${deepChoice === 'later' ? 'onboard-depth-tile--active' : ''}`}
                    onClick={() => setDeepChoice('later')}
                    aria-pressed={deepChoice === 'later'}
                >
                    <h3 className="onboard-depth-title">Skip for now</h3>
                    <p className="onboard-depth-desc muted">
                        Jump straight to browsing advisors. You can add profile depth from your dashboard
                        at any time.
                    </p>
                    <ul className="onboard-depth-items">
                        <li>Start browsing immediately</li>
                        <li>Complete profile before first booking</li>
                    </ul>
                </button>
            </div>

            {deepChoice === 'now' && (
                <div className="onboard-depth-form">
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="ob-bio">Professional bio</label>
                        <textarea
                            id="ob-bio"
                            className="auth-input onboard-textarea"
                            placeholder="I'm the co-founder of Acme, a B2B SaaS company helping mid-market logistics operators…"
                            rows={3}
                        />
                    </div>
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="ob-challenges">Top challenges right now</label>
                        <textarea
                            id="ob-challenges"
                            className="auth-input onboard-textarea"
                            placeholder="1. Closing our Series A by Q3&#10;2. Hiring a VP of Sales&#10;3. Expanding into the US market"
                            rows={4}
                        />
                    </div>

                    {/* ── Rich content notice ── */}
                    <div className="onboard-rich-notice">
                        <div className="onboard-rich-notice-inner">
                            <div className="onboard-rich-label">
                                <span className="onboard-rich-icon" aria-hidden="true">◈</span>
                                Rich profile content
                                <span className="badge">Optional</span>
                            </div>
                            <p className="onboard-rich-desc muted">
                                After you've made a booking, you can add deeper context to your profile from your dashboard:
                                long-form testimonials, corporate success stories, and short video introductions.
                                These help advisors prepare and build trust before your first session.
                            </p>
                            <div className="onboard-rich-types">
                                {[
                                    { icon: '❝', label: 'Testimonials', hint: 'Long-form recommendations from collaborators' },
                                    { icon: '▶', label: 'Video intro', hint: 'Up to 90 seconds, no production required' },
                                    { icon: '★', label: 'Case studies', hint: 'Wins, pivots, and lessons from your journey' },
                                ].map((t) => (
                                    <div key={t.label} className="onboard-rich-type">
                                        <span className="onboard-rich-type-icon" aria-hidden="true">{t.icon}</span>
                                        <div>
                                            <div className="onboard-rich-type-label">{t.label}</div>
                                            <div className="onboard-rich-type-hint muted">{t.hint}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ── Main onboarding page ── */

const EMPTY_DATA: OnboardingData = {
    role: '', company: '', companySize: '',
    goals: [], budget: '', cadence: '',
    functions: [], seniority: '', sessionFormat: '', timezone: '',
};

export function OnboardingPage() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<OnboardingData>(EMPTY_DATA);
    const navigate = useNavigate();

    const update = (partial: Partial<OnboardingData>) =>
        setData((prev) => ({ ...prev, ...partial }));

    const next = () => {
        if (step < STEPS.length - 1) setStep((s) => s + 1);
        else navigate('/advisors');
    };
    const back = () => setStep((s) => Math.max(0, s - 1));

    const STEP_COMPONENTS = [
        <StepRole key="role" data={data} onChange={update} />,
        <StepGoals key="goals" data={data} onChange={update} />,
        <StepPreferences key="prefs" data={data} onChange={update} />,
        <StepProfileDepth key="depth" data={data} />,
    ];

    return (
        <div className="onboard-shell">
            {/* ── Top nav ── */}
            <header className="onboard-topbar">
                <span className="logo">Operator</span>
                <div className="onboard-topbar-right">
                    <span className="muted" style={{ fontSize: '0.82rem' }}>
                        Setting up your account
                    </span>
                    <button
                        type="button"
                        className="btn ghost"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
                        onClick={() => navigate('/advisors')}
                    >
                        Skip all →
                    </button>
                </div>
            </header>

            <div className="onboard-body">
                {/* ── Left: step indicator column ── */}
                <aside className="onboard-sidebar">
                    <StepIndicator steps={STEPS} current={step} />

                    <div className="onboard-sidebar-footer">
                        <div className="hero-stat-block" style={{ borderLeftColor: '#dee5f2' }}>
                            <span className="stat-giant" style={{ fontSize: '2rem' }}>
                                {step + 1}<sup>/{STEPS.length}</sup>
                            </span>
                            <span className="stat-caption">steps completed</span>
                        </div>
                    </div>
                </aside>

                {/* ── Right: step content ── */}
                <main className="onboard-main">
                    <div className="onboard-content-wrap">
                        {/* Vertical rail — same motif as landing hero */}
                        <div className="auth-rail" aria-hidden="true">
                            <span className="rail-label">Onboarding</span>
                        </div>

                        <div className="onboard-content">
                            {STEP_COMPONENTS[step]}

                            <div className="onboard-nav-row">
                                {step > 0 && (
                                    <button type="button" className="btn ghost onboard-back-btn" onClick={back}>
                                        ← Back
                                    </button>
                                )}
                                <button type="button" className="btn onboard-next-btn" onClick={next}>
                                    {step < STEPS.length - 1 ? 'Continue →' : 'Go to dashboard →'}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}