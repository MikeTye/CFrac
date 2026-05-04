import { useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { auditEvents } from '../../mocks/admin';

export function AdminRecordingAuditPage() {
  const { bookingId } = useParams();
  const events = auditEvents.filter((event) => event.bookingId === bookingId);

  return (
    <Card>
      <h3>Recording & Transcript Audit · {bookingId}</h3>
      <table>
        <thead><tr><th>Time</th><th>Actor</th><th>Event</th></tr></thead>
        <tbody>{events.map((event) => <tr key={event.id}><td>{event.timestamp}</td><td>{event.actor}</td><td>{event.event}</td></tr>)}</tbody>
      </table>
    </Card>
  );
}
