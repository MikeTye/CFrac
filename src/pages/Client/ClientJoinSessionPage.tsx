import { Link, useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';

export function ClientJoinSessionPage() {
  const { bookingId } = useParams();
  return <div className="stack-lg"><h1>Join Session</h1><Card><p>Booking: {bookingId}</p><p>Consent gate: <span className="badge">awaiting_consent</span> → <span className="badge success">ready_to_join</span></p><div className="stack-row"><Link className="btn" to={`/client/sessions/${bookingId}`}>Mark Complete (Demo)</Link></div></Card></div>;
}
