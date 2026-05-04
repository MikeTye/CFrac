import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { bookings } from '../../mocks/bookings';

export function AdvisorBookingDetailPage() {
  const { bookingId } = useParams();
  const booking = useMemo(() => bookings.find((item) => item.id === bookingId) ?? bookings[0], [bookingId]);

  return (
    <div className="stack-lg">
      <h1>Booking Detail · {booking.id}</h1>
      <Card>
        <h3>{booking.sessionName}</h3>
        <p>{booking.clientName} with {booking.advisorName}</p>
        <p><strong>Status:</strong> {booking.status}</p>
      </Card>
      <Card>
        <h3>Consent + Join State</h3>
        <p>Client consent: {String(booking.consentClient)}</p>
        <p>Advisor consent: {String(booking.consentAdvisor)}</p>
        <button className="btn">Proceed to Join</button>
      </Card>
      <Card>
        <h3>Transcript State</h3>
        <p>{booking.transcriptStatus ?? 'not_started'}</p>
      </Card>
    </div>
  );
}
