import { Link, useSearchParams } from 'react-router-dom';
import { advisors } from '../../mocks/advisors';
import '../../styles/pages/clientRequestNew.css';

function getStartingPrice(advisor: (typeof advisors)[number]) {
    return Math.min(...advisor.sessionOfferings.map((s) => s.price));
}

export function ClientRequestNewPage() {
    const [searchParams] = useSearchParams();
    const advisorId = searchParams.get('advisorId');
    const advisor = advisors.find((a) => a.id === advisorId) ?? advisors[0];
    const startingPrice = getStartingPrice(advisor);

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">New advisory request</p>
                    <h1 className="dash-page-title">Submit case brief to {advisor.fullName}</h1>
                    <p className="muted">
                        This creates a new intake request. Slot selection and final payment only happen after advisor acceptance.
                    </p>
                </div>

                <Link to={`/client/advisors/${advisor.id}`} className="btn ghost">
                    Back to advisor
                </Link>
            </div>

            <div className="client-request-new-grid">
                <main className="client-request-new-main">
                    <section className="crn-card">
                        <span className="crn-section-label">Advisor</span>

                        <div className="crn-advisor-card">
                            <div className="crn-avatar">
                                {advisor.fullName
                                    .split(' ')
                                    .map((part) => part[0])
                                    .join('')
                                    .slice(0, 2)}
                            </div>

                            <div>
                                <h2>{advisor.fullName}</h2>
                                <p>{advisor.headline}</p>
                                <span>{advisor.location} · ★ {advisor.rating} ({advisor.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </section>

                    <section className="crn-card">
                        <span className="crn-section-label">Case brief</span>
                        <h2>What do you need help with?</h2>

                        <div className="crn-form-grid">
                            <label>
                                Topic
                                <input
                                    defaultValue="Series A fundraising narrative and investor targeting"
                                    placeholder="Example: Fundraising narrative, pricing, GTM, hiring plan"
                                />
                            </label>

                            <label>
                                Company context
                                <input
                                    defaultValue="B2B SaaS · Seed stage · Preparing fundraise in 90 days"
                                    placeholder="Company stage, industry, market, urgency"
                                />
                            </label>

                            <label>
                                Decision urgency
                                <select defaultValue="this-month">
                                    <option value="this-week">Need guidance this week</option>
                                    <option value="this-month">Decision happening this month</option>
                                    <option value="this-quarter">Planning this quarter</option>
                                    <option value="exploratory">Exploratory discussion</option>
                                </select>
                            </label>

                            <label>
                                Advisor should focus on
                                <select defaultValue="strategy">
                                    <option value="strategy">Strategy and decision framing</option>
                                    <option value="execution">Execution planning</option>
                                    <option value="risk">Risk review and blind spots</option>
                                    <option value="network">Investor / network guidance</option>
                                    <option value="hiring">Hiring and org structure</option>
                                </select>
                            </label>

                            <label className="crn-full">
                                Problem statement
                                <textarea
                                    rows={5}
                                    defaultValue="We are preparing for a Series A raise and need help refining our investor story, target investor list, and objection handling before partner meetings."
                                />
                            </label>

                            <label className="crn-full">
                                Desired outcome
                                <textarea
                                    rows={4}
                                    defaultValue="A sharper fundraising narrative, recommended investor targeting sequence, and the top risks we should address before starting outreach."
                                />
                            </label>

                            <label>
                                Preferred session format
                                <select defaultValue={advisor.sessionOfferings[0]?.id}>
                                    {advisor.sessionOfferings.map((session) => (
                                        <option key={session.id} value={session.id}>
                                            {session.name} — {session.durationMinutes} min · ${session.price}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Supporting document
                                <input type="file" />
                            </label>
                        </div>
                    </section>

                    <section className="crn-card">
                        <span className="crn-section-label">Protection</span>
                        <h2>Platform NDA and escrow</h2>

                        <div className="crn-check-list">
                            <label>
                                <input type="checkbox" defaultChecked />
                                I understand a platform-level mutual NDA is applied when this request is submitted.
                            </label>

                            <label>
                                <input type="checkbox" defaultChecked />
                                I understand the advisor may accept or decline within the review window.
                            </label>

                            <label>
                                <input type="checkbox" defaultChecked />
                                I understand the deposit is refunded if the advisor declines.
                            </label>
                        </div>
                    </section>
                </main>

                <aside className="client-request-new-side">
                    <section className="crn-card crn-sticky">
                        <span className="crn-section-label">Request summary</span>
                        <h2>Review before submit</h2>

                        <div className="crn-money-row">
                            <span>Advisor starting price</span>
                            <strong>${startingPrice}</strong>
                        </div>

                        <div className="crn-money-row">
                            <span>Mock escrow deposit</span>
                            <strong>${Math.round(startingPrice * 0.5)}</strong>
                        </div>

                        <div className="crn-money-row">
                            <span>Advisor review window</span>
                            <strong>48 hours</strong>
                        </div>

                        <div className="crn-flow-box">
                            <strong>After submission</strong>
                            <p>
                                The request appears in Requests as pending review. If accepted, the client can create a booking and select a slot.
                            </p>
                        </div>

                        <Link to="/client/requests/req-001" className="btn crn-submit-btn">
                            Submit mock request
                        </Link>

                        <p className="crn-note">
                            Mock action only: route points to an existing pending request example.
                        </p>
                    </section>
                </aside>
            </div>
        </>
    );
}