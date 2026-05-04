import { Link } from 'react-router-dom';
import { Card } from '../components/common/Card';

export function DemoStartPage() {
  return (
    <div className="stack-lg">
      <h1>POC Demo Start</h1>
      <p className="muted">Mock data only. No real transactions, payments, or integrations.</p>
      <div className="grid cols-3">
        <Card><h3>Public</h3><p>Discovery and advisor browsing.</p><Link to="/">Open Public Flow</Link></Card>
        <Card><h3>Client</h3><p>Intake → checkout → booking → join → artifacts.</p><Link to="/client/dashboard">Open Client Flow</Link></Card>
        <Card><h3>Advisor</h3><p>Onboarding and intake operations.</p><Link to="/advisor">Open Advisor Flow</Link></Card>
        <Card><h3>Admin</h3><p>Moderation, disputes, and audit monitoring.</p><Link to="/admin">Open Admin Flow</Link></Card>
      </div>
    </div>
  );
}
