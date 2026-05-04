import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { advisorIntakes } from '../../mocks/advisors';

export function AdvisorIntakeQueuePage() {
  return (
    <div className="stack-lg">
      <h1>Intake Review Queue</h1>
      <div className="grid cols-2">
        {advisorIntakes.map((intake) => (
          <Card key={intake.id}>
            <h4>{intake.company} · {intake.topic}</h4>
            <p className="muted">{intake.problemStatement}</p>
            <p><strong>Status:</strong> {intake.status}</p>
            <label>
              Decline reason (required in flow)
              <textarea placeholder="Any value accepted for POC" />
            </label>
            <div className="stack-row">
              <button className="btn">Accept</button>
              <button className="btn ghost">Decline</button>
              <Link className="btn ghost" to={`/advisor/intakes/${intake.id}`}>Open</Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
