import { Card } from '../../components/common/Card';

export function AdvisorCalendarConnectionsPage() {
  return (
    <div className="stack-lg">
      <h1>Calendar Connections</h1>
      <Card>
        <h3>Google Calendar</h3>
        <p className="muted">Busy-time sync only for MVP wireframe.</p>
        <button className="btn">Connect Google</button>
      </Card>
      <Card>
        <h3>Microsoft Calendar</h3>
        <p className="muted">Read-only event conflict blocks.</p>
        <button className="btn ghost">Connect Microsoft</button>
      </Card>
    </div>
  );
}
