import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { bookings } from '../../mocks/bookings';

export function AdvisorBookingsPage() {
  return (
    <div className="stack-lg">
      <h1>Advisor Bookings</h1>
      <div className="grid cols-2">
        {bookings.map((booking) => (
          <Card key={booking.id}>
            <h4>{booking.sessionName}</h4>
            <p>{booking.clientName}</p>
            <p className="muted">Track prep notes, attendance, and post-session artifacts.</p>
            <Link to={`/advisor/bookings/${booking.id}`}>Open booking detail</Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
