import { Link } from 'react-router-dom';
import type { Booking } from '../../mocks/bookings';
import { Card } from '../common/Card';
import { BookingStatusBadge } from './BookingStatusBadge';

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card>
      <h4>{booking.sessionName}</h4>
      <p>{booking.advisorName} • {new Date(booking.startTime).toLocaleString()}</p>
      <p>${booking.price} {booking.currency}</p>
      <BookingStatusBadge status={booking.status} />
      <Link className="btn" to={`/client/bookings/${booking.id}`}>View Details</Link>
    </Card>
  );
}
