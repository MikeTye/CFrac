import { Link, useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { intakes } from '../../mocks/client';

export function ClientIntakeStatusPage() {
  const { intakeId } = useParams();
  const intake = intakes.find((i) => i.id === intakeId) ?? intakes[0];
  return <div className="stack-lg"><h1>Intake Status</h1><Card><p><strong>{intake.topic}</strong> with {intake.advisorName}</p><p>Status: <span className="badge">{intake.status}</span></p><p>NDA: {intake.ndaRequired ? 'Required' : 'Not required'}</p><p>Escrow: <span className="badge success">{intake.escrowStatus}</span></p><p className="muted">State transitions are mocked for demo storytelling.</p><div className="stack-row"><Link className="btn" to="/client/checkout/bk-1002">Proceed to Checkout</Link><Link className="btn ghost" to="/client">Back to Dashboard</Link></div></Card></div>;
}
