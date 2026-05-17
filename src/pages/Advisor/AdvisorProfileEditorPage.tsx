import '../../styles/pages/advisor-profile-edit.css';

const sections = [
    {
        label: 'Identity',
        title: 'Public identity',
        desc: 'Name, title, location, timezone, and the first impression clients see.',
        placeholder: 'Example: Former CFO · Led IPO readiness and Series C finance transformation',
    },
    {
        label: 'Positioning',
        title: 'Advisor positioning',
        desc: 'Explain how you think, where you help, and what kind of founder should book you.',
        placeholder: 'Describe your advisory point of view, ideal client context, and operating style.',
        large: true,
    },
    {
        label: 'Proof',
        title: 'Executive achievements',
        desc: 'Capture measurable outcomes instead of generic responsibilities.',
        placeholder: 'Example: Built regional finance function across 6 markets before acquisition.',
        large: true,
    },
    {
        label: 'Case records',
        title: 'Case studies / war stories',
        desc: 'Structured problem, approach, outcome, timeframe, and supporting evidence.',
        placeholder: 'Challenge, approach, measurable outcome, timeframe.',
        large: true,
    },
    {
        label: 'Media',
        title: 'Video and thought leadership',
        desc: 'Add intro videos, frameworks, talks, interviews, or client-safe material.',
        placeholder: 'Paste media URL, upload reference, or describe the asset.',
    },
    {
        label: 'Commercials',
        title: 'Session offerings',
        desc: 'Define session type, price, duration, and what clients should prepare.',
        placeholder: 'Example: Fundraising narrative review · 60 min · $300',
    },
    {
        label: 'Trust',
        title: 'Verification and trust indicators',
        desc: 'Documents, references, board credentials, exits, or institutional roles.',
        placeholder: 'Add credential, reference, document, or verification note.',
        large: true,
    },
];

export function AdvisorProfileEditorPage() {
    return (
        <div className="advisor-editor-page">
            <section className="advisor-editor-hero">
                <div>
                    <span className="advisor-editor-eyebrow">Advisor profile studio</span>
                    <h1>Build a profile that feels like your operating portfolio.</h1>
                    <p>
                        This is not a resume editor. Shape the proof, judgment, media, and client-fit signals
                        that help founders understand when you are the right advisor.
                    </p>
                </div>

                <aside className="advisor-editor-status-card">
                    <span>Profile strength</span>
                    <strong>Draft</strong>
                    <p>Focus next on measurable outcomes, case records, and intro media.</p>
                </aside>
            </section>

            <div className="advisor-editor-shell">
                <aside className="advisor-editor-sidebar">
                    <span className="advisor-editor-sidebar-title">Sections</span>
                    {sections.map((section) => (
                        <a href={`#${section.label.toLowerCase().replace(' ', '-')}`} key={section.label}>
                            {section.label}
                        </a>
                    ))}
                </aside>

                <main className="advisor-editor-main">
                    {sections.map((section) => (
                        <section
                            className="advisor-editor-card"
                            id={section.label.toLowerCase().replace(' ', '-')}
                            key={section.label}
                        >
                            <div className="advisor-editor-card-header">
                                <span>{section.label}</span>
                                <div>
                                    <h2>{section.title}</h2>
                                    <p>{section.desc}</p>
                                </div>
                            </div>

                            {section.large ? (
                                <textarea placeholder={section.placeholder} rows={5} />
                            ) : (
                                <input placeholder={section.placeholder} />
                            )}
                        </section>
                    ))}
                </main>

                <aside className="advisor-editor-preview">
                    <span>Live preview cues</span>
                    <strong>What buyers should understand quickly</strong>

                    <ul>
                        <li>What problem you are best at solving</li>
                        <li>What you have already done before</li>
                        <li>How a session with you will feel</li>
                        <li>Why your record is credible</li>
                    </ul>
                </aside>
            </div>
        </div>
    );
}