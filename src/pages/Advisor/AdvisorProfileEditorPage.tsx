import { Card } from '../../components/common/Card';

export function AdvisorProfileEditorPage() {
  const sections = ['Identity', 'Positioning', 'Executive background', 'Industries/functions', 'Advisory topics', 'Achievements', 'Case studies', 'Session offerings', 'Trust indicators'];

  return (
    <div className="stack-lg">
      <h1>Profile Editor</h1>
      {sections.map((section) => (
        <Card key={section}>
          <h3>{section}</h3>
          <p className="muted">Provide clear, evidence-backed details to build buyer trust.</p>
          <input placeholder={`${section} details`} />
        </Card>
      ))}
    </div>
  );
}
