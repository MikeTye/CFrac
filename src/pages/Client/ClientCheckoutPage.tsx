import { Link, useParams } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { bookings } from '../../mocks/bookings';

export function ClientCheckoutPage() {
  const { bookingId } = useParams();
  const booking = bookings.find((b) => b.id === bookingId) ?? bookings[0];
  const deposit = 100;
  const remaining = Math.max(booking.price - deposit, 0);
  return <div className="stack-lg"><h1>Checkout & Payment</h1><Card><h3>Booking summary</h3><p>{booking.sessionName} with {booking.advisorName}</p><p>Total: ${booking.price} {booking.currency}</p><p>Deposit applied: ${deposit}</p><p>Remaining due: ${remaining}</p></Card><Card><h3>Payment details (demo)</h3><label>Name on card<input placeholder="Any value accepted" /></label><label>Card number<input placeholder="4242 4242 4242 4242" /></label><label>Expiry<input placeholder="MM/YY" /></label><label>CVC<input placeholder="123" /></label><div className="stack-row"><Link to={`/client/booking/${booking.id}`} className="btn">Pay & Confirm</Link><Link to="/client/checkout/pending" className="btn ghost">Mock Pending</Link><Link to="/client/checkout/failed" className="btn ghost">Mock Failed</Link></div></Card></div>;
}
