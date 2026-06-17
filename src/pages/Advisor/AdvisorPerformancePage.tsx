import '../../styles/pages/advisorPerformance.css';

const KPI = [
    { label: 'Earned this month', value: '$1,840', sub: '+18% vs last month' },
    { label: 'Pending payout', value: '$420', sub: 'Next payout: 30 Sep' },
    { label: 'Intake conversion', value: '62%', sub: '8 accepted / 13 received' },
    { label: 'Avg. rating', value: '4.96', sub: '18 client reviews' },
];

const FUNNEL = [
    { label: 'Received', value: 13, width: '100%' },
    { label: 'Accepted', value: 8, width: '62%' },
    { label: 'Booked', value: 6, width: '46%' },
    { label: 'Completed', value: 5, width: '38%' },
];

const PAYOUTS = [
    { date: '30 Sep 2026', amount: '$420', status: 'Scheduled', sessions: '2 sessions' },
    { date: '15 Sep 2026', amount: '$1,120', status: 'Paid', sessions: '4 sessions' },
    { date: '31 Aug 2026', amount: '$860', status: 'Paid', sessions: '3 sessions' },
];

const INSIGHTS = [
    'Fundraising and GTM requests are your strongest converting topics.',
    'Tuesday afternoon slots have the highest booking completion rate.',
    'Adding 2 more slots next week may recover 3 missed booking opportunities.',
];

const TOPICS = [
    { label: 'Fundraising strategy', value: 38 },
    { label: 'Revenue & GTM', value: 27 },
    { label: 'Board readiness', value: 18 },
    { label: 'Org design', value: 17 },
];

export function AdvisorPerformancePage() {
    return (
        <div className="adv-perf-page">
            <div className="dash-page-head adv-perf-head">
                <div>
                    <p className="hero-eyebrow">Advisor performance</p>
                    <h1 className="dash-page-title">Practice intelligence</h1>
                    <p className="muted">
                        Track earnings, intake quality, booking conversion, and advisory demand.
                    </p>
                </div>

                <div className="adv-perf-period">
                    <button className="adv-perf-period-btn adv-perf-period-btn--active">30D</button>
                    <button className="adv-perf-period-btn">90D</button>
                    <button className="adv-perf-period-btn">YTD</button>
                </div>
            </div>

            <section className="adv-perf-kpis">
                {KPI.map((item) => (
                    <article key={item.label} className="adv-perf-kpi-card">
                        <span className="adv-perf-kpi-label">{item.label}</span>
                        <strong className="adv-perf-kpi-value">{item.value}</strong>
                        <span className="adv-perf-kpi-sub muted">{item.sub}</span>
                    </article>
                ))}
            </section>

            <div className="adv-perf-grid">
                <section className="adv-perf-card adv-perf-card--wide">
                    <div className="adv-perf-section-head">
                        <div>
                            <h2>Revenue trend</h2>
                            <p className="muted">Mocked monthly view for wireframe validation.</p>
                        </div>
                        <span className="adv-perf-chip">+18%</span>
                    </div>

                    <div className="adv-perf-chart" aria-label="Revenue trend mock chart">
                        {[42, 58, 46, 70, 64, 82, 76, 90].map((height, index) => (
                            <div key={index} className="adv-perf-chart-bar-wrap">
                                <div className="adv-perf-chart-bar" style={{ height: `${height}%` }} />
                            </div>
                        ))}
                    </div>

                    <div className="adv-perf-chart-labels">
                        <span>Week 1</span>
                        <span>Week 2</span>
                        <span>Week 3</span>
                        <span>Week 4</span>
                    </div>
                </section>

                <section className="adv-perf-card">
                    <div className="adv-perf-section-head">
                        <div>
                            <h2>Intake funnel</h2>
                            <p className="muted">From request received to completed session.</p>
                        </div>
                    </div>

                    <div className="adv-perf-funnel">
                        {FUNNEL.map((item) => (
                            <div key={item.label} className="adv-perf-funnel-row">
                                <div className="adv-perf-funnel-meta">
                                    <span>{item.label}</span>
                                    <strong>{item.value}</strong>
                                </div>
                                <div className="adv-perf-funnel-track">
                                    <div className="adv-perf-funnel-fill" style={{ width: item.width }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="adv-perf-card">
                    <div className="adv-perf-section-head">
                        <div>
                            <h2>Demand mix</h2>
                            <p className="muted">Most requested advisory themes.</p>
                        </div>
                    </div>

                    <div className="adv-perf-topic-list">
                        {TOPICS.map((topic) => (
                            <div key={topic.label} className="adv-perf-topic-row">
                                <div className="adv-perf-topic-meta">
                                    <span>{topic.label}</span>
                                    <strong>{topic.value}%</strong>
                                </div>
                                <div className="adv-perf-topic-track">
                                    <div className="adv-perf-topic-fill" style={{ width: `${topic.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="adv-perf-card">
                    <div className="adv-perf-section-head">
                        <div>
                            <h2>Recommendations</h2>
                            <p className="muted">Productized coaching for better conversion.</p>
                        </div>
                    </div>

                    <div className="adv-perf-insights">
                        {INSIGHTS.map((insight) => (
                            <div key={insight} className="adv-perf-insight">
                                <i className="ti ti-sparkles" aria-hidden="true" />
                                <span>{insight}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="adv-perf-card">
                    <div className="adv-perf-section-head">
                        <div>
                            <h2>Payout history</h2>
                            <p className="muted">Keep this here for MVP.</p>
                        </div>
                        <button className="btn ghost" type="button">Export</button>
                    </div>

                    <div className="adv-perf-payout-list">
                        {PAYOUTS.map((payout) => (
                            <div key={`${payout.date}-${payout.amount}`} className="adv-perf-payout-row">
                                <div>
                                    <strong>{payout.amount}</strong>
                                    <span className="muted">{payout.sessions}</span>
                                </div>
                                <div>
                                    <span>{payout.date}</span>
                                    <span className={`adv-perf-status adv-perf-status--${payout.status.toLowerCase()}`}>
                                        {payout.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}