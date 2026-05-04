import { Link, useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { ConsentPanel } from '../../components/bookings/ConsentPanel';
import { TranscriptStatusPanel } from '../../components/bookings/TranscriptStatusPanel';
import { bookings } from '../../mocks/bookings';

export function ClientBookingDetailPage() {
  const { bookingId } = useParams();
  const booking = bookings.find((b) => b.id === bookingId) ?? bookings[0];
  return <div className="stack-lg"><Card className="premium"><h1>Booking Confirmed</h1><p>Booking ID: {booking.id}</p><p>Room created indicator: <span className="badge success">Provisioned</span></p></Card><ConsentPanel consentClient={booking.consentClient} consentAdvisor={booking.consentAdvisor} /><TranscriptStatusPanel status={booking.transcriptStatus} /><Card><div className="stack-row"><Link to={`/client/join/${booking.id}`} className="btn">Join Session</Link><Link to={`/client/sessions/${booking.id}`} className="btn ghost">View Session Artifacts</Link></div></Card></div>;
}
