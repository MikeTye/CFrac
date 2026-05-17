import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type AccountType = 'advisor' | 'client';

interface OnboardingData {
    referralAdvisor: string;
    fullName: string;
    title: string;
    location: string;
    timezone: string;
    company: string;
    role: string;
    useCase: string;
    positioning: string;
    advisoryAreas: string[];
    sessionOffering: string;
    sessionPrice: string;
}

const ADVISORY_AREAS = [
    'Fundraising',
    'Go-to-market',
    'Finance / CFO',
    'Product strategy',
    'Operations',
    'Leadership hiring',
    'M&A / exits',
    'Board advisory',
    'Climate / ESG',
    'International expansion',
];

const CLIENT_USE_CASES = [
    'Validate a strategy',
    'Fundraising advice',
    'Hiring / org design',
    'Market expansion',
    'Operational problem',
    'M&A / exit planning',
];

const EMPTY_DATA: OnboardingData = {
    referralAdvisor: '',
    fullName: '',
    title: '',
    location: '',
    timezone: '',
    company: '',
    role: '',
    useCase: '',
    positioning: '',
    advisoryAreas: [],
    sessionOffering: '',
    sessionPrice: '',
};

export function OnboardingPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const accountType = useMemo<AccountType>(() => {
        return searchParams.get('type') === 'advisor' ? 'advisor' : 'client';
    }, [searchParams]);

    const referralAdvisor = useMemo(() => {
        return searchParams.get('referredBy') || searchParams.get('advisor') || '';
    }, [searchParams]);

    const getPostOnboardingPath = () => {
        return accountType === 'advisor' ? '/advisor' : '/client/dashboard';
    };

    const finish = () => {
        navigate(getPostOnboardingPath());
    };

    const skipAll = () => {
        navigate(getPostOnboardingPath());
    };

    const [data, setData] = useState<OnboardingData>({
        ...EMPTY_DATA,
        referralAdvisor,
    });

    const update = (partial: Partial<OnboardingData>) => {
        setData((prev) => ({ ...prev, ...partial }));
    };

    const toggleArea = (area: string) => {
        update({
            advisoryAreas: data.advisoryAreas.includes(area)
                ? data.advisoryAreas.filter((item) => item !== area)
                : [...data.advisoryAreas, area],
        });
    };

    const isAdvisor = accountType === 'advisor';

    return (
        <div className="onboard-shell">
            <header className="onboard-topbar">
                <span className="logo">Operator</span>

                <div className="onboard-topbar-right">
                    <span className="muted" style={{ fontSize: '0.82rem' }}>
                        {isAdvisor ? 'Advisor setup' : 'Client setup'}
                    </span>
                    <button
                        type="button"
                        className="btn ghost"
                        style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
                        onClick={skipAll}
                    >
                        Skip all →
                    </button>
                </div>
            </header>

            <main className="onboard-body onboard-body--simple">
                <section className="onboard-main">
                    <div className="onboard-content-wrap">
                        <div className="auth-rail" aria-hidden="true">
                            <span className="rail-label">Onboarding</span>
                        </div>

                        <div className="onboard-content">
                            <header className="onboard-step-header">
                                <p className="hero-eyebrow">
                                    {isAdvisor ? 'Advisor onboarding' : 'Client onboarding'}
                                </p>

                                <h1 className="onboard-step-title">
                                    {isAdvisor ? (
                                        <>
                                            Set up the basics of<br />
                                            <em>your advisor profile.</em>
                                        </>
                                    ) : (
                                        <>
                                            Tell us what kind of<br />
                                            <em>advice you need.</em>
                                        </>
                                    )}
                                </h1>

                                <p className="onboard-step-sub muted">
                                    {isAdvisor
                                        ? 'This is a quick setup only. You can add proof, case studies, media, trust indicators, and richer session details later.'
                                        : 'This lightweight setup helps tailor advisor recommendations. You can still browse and book without completing every field.'}
                                </p>
                            </header>

                            <div className="onboard-fields">
                                {isAdvisor && (
                                    <div className="auth-field">
                                        <label className="auth-label" htmlFor="ob-referral">
                                            Referred by
                                        </label>
                                        <input
                                            id="ob-referral"
                                            type="text"
                                            className="auth-input"
                                            value={data.referralAdvisor || 'Direct signup'}
                                            disabled
                                        />
                                    </div>
                                )}

                                <div className="auth-field">
                                    <label className="auth-label" htmlFor="ob-name">
                                        {isAdvisor ? 'Public name' : 'Name'}
                                    </label>
                                    <input
                                        id="ob-name"
                                        type="text"
                                        className="auth-input"
                                        placeholder={isAdvisor ? 'e.g. Sarah Tan' : 'e.g. Daniel Lee'}
                                        value={data.fullName}
                                        onChange={(e) => update({ fullName: e.target.value })}
                                    />
                                </div>

                                {isAdvisor ? (
                                    <>
                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-title">
                                                Public headline
                                            </label>
                                            <input
                                                id="ob-title"
                                                type="text"
                                                className="auth-input"
                                                placeholder="e.g. Former CFO · IPO readiness and finance transformation"
                                                value={data.title}
                                                onChange={(e) => update({ title: e.target.value })}
                                            />
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-location">
                                                Location
                                            </label>
                                            <input
                                                id="ob-location"
                                                type="text"
                                                className="auth-input"
                                                placeholder="e.g. Singapore"
                                                value={data.location}
                                                onChange={(e) => update({ location: e.target.value })}
                                            />
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-timezone">
                                                Timezone
                                            </label>
                                            <select
                                                id="ob-timezone"
                                                className="auth-input"
                                                value={data.timezone}
                                                onChange={(e) => update({ timezone: e.target.value })}
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

                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-positioning">
                                                What should clients book you for?
                                            </label>
                                            <textarea
                                                id="ob-positioning"
                                                className="auth-input onboard-textarea"
                                                rows={4}
                                                placeholder="Briefly describe your advisory point of view, ideal client context, and where you can help most."
                                                value={data.positioning}
                                                onChange={(e) => update({ positioning: e.target.value })}
                                            />
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label">Advisory areas</label>
                                            <div className="onboard-chip-grid">
                                                {ADVISORY_AREAS.map((area) => {
                                                    const active = data.advisoryAreas.includes(area);

                                                    return (
                                                        <button
                                                            key={area}
                                                            type="button"
                                                            className={`onboard-chip ${active ? 'onboard-chip--active' : ''}`}
                                                            onClick={() => toggleArea(area)}
                                                            aria-pressed={active}
                                                        >
                                                            {area}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-offering">
                                                First session offering
                                            </label>
                                            <input
                                                id="ob-offering"
                                                type="text"
                                                className="auth-input"
                                                placeholder="e.g. Fundraising narrative review · 60 min"
                                                value={data.sessionOffering}
                                                onChange={(e) => update({ sessionOffering: e.target.value })}
                                            />
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-price">
                                                Starting price
                                            </label>
                                            <input
                                                id="ob-price"
                                                type="text"
                                                className="auth-input"
                                                placeholder="e.g. $300"
                                                value={data.sessionPrice}
                                                onChange={(e) => update({ sessionPrice: e.target.value })}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="auth-field-row">
                                            <div className="auth-field">
                                                <label className="auth-label" htmlFor="ob-company">
                                                    Company
                                                </label>
                                                <input
                                                    id="ob-company"
                                                    type="text"
                                                    className="auth-input"
                                                    placeholder="e.g. Acme Labs"
                                                    value={data.company}
                                                    onChange={(e) => update({ company: e.target.value })}
                                                />
                                            </div>

                                            <div className="auth-field">
                                                <label className="auth-label" htmlFor="ob-role">
                                                    Role
                                                </label>
                                                <input
                                                    id="ob-role"
                                                    type="text"
                                                    className="auth-input"
                                                    placeholder="e.g. Founder"
                                                    value={data.role}
                                                    onChange={(e) => update({ role: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label">What are you looking for?</label>
                                            <div className="onboard-chip-grid">
                                                {CLIENT_USE_CASES.map((item) => {
                                                    const active = data.useCase === item;

                                                    return (
                                                        <button
                                                            key={item}
                                                            type="button"
                                                            className={`onboard-chip ${active ? 'onboard-chip--active' : ''}`}
                                                            onClick={() => update({ useCase: item })}
                                                            aria-pressed={active}
                                                        >
                                                            {item}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className="auth-field">
                                            <label className="auth-label" htmlFor="ob-client-context">
                                                Brief context
                                            </label>
                                            <textarea
                                                id="ob-client-context"
                                                className="auth-input onboard-textarea"
                                                rows={4}
                                                placeholder="e.g. We are preparing for Series A and want advice on narrative, investor targeting, and pricing."
                                                value={data.positioning}
                                                onChange={(e) => update({ positioning: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="onboard-rich-notice" style={{ marginTop: '1.5rem' }}>
                                <div className="onboard-rich-notice-inner">
                                    <div className="onboard-rich-label">
                                        {isAdvisor ? 'Profile editor comes next' : 'You can start browsing next'}
                                        <span className="badge">Mockup flow</span>
                                    </div>
                                    <p className="onboard-rich-desc muted">
                                        {isAdvisor
                                            ? 'Advisor profile depth can be completed later through the dashboard.'
                                            : 'Client accounts do not need a full public profile for MVP. The key workflow is search, intake, booking, payment, and session history.'}
                                    </p>
                                </div>
                            </div>

                            <div className="onboard-nav-row">
                                <button
                                    type="button"
                                    className="btn ghost onboard-back-btn"
                                    onClick={skipAll}
                                >
                                    Skip for now
                                </button>

                                <button
                                    type="button"
                                    className="btn onboard-next-btn"
                                    onClick={finish}
                                >
                                    {isAdvisor ? 'Continue to advisor dashboard →' : 'Continue to client dashboard →'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}