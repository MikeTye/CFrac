import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BookingCard } from '../components/bookings/BookingCard';
import { ConsentPanel } from '../components/bookings/ConsentPanel';
import { TranscriptStatusPanel } from '../components/bookings/TranscriptStatusPanel';
import { Card } from '../components/common/Card';
import { Tabs } from '../components/common/Tabs';
import { advisors } from '../mocks/advisors';
import { bookings } from '../mocks/bookings';

export function ClientDashboardPage() {
  const upcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending_payment');
  const past = bookings.filter((b) => b.status === 'completed');
  return (
    <div className="stack-lg">
      <Card><h1>Welcome back, Jordan</h1><p>Track upcoming advisory sessions and post-session follow-ups.</p></Card>
      <section><h2>Upcoming bookings</h2><div className="grid cols-2">{upcoming.map((b) => <BookingCard key={b.id} booking={b} />)}</div></section>
      <section><h2>Past sessions</h2><div className="grid cols-2">{past.map((b) => <BookingCard key={b.id} booking={b} />)}</div></section>
      <Card><h2>Pending Reviews</h2><p>1 session awaiting review submission.</p></Card>
      <section><h2>Recommended advisors</h2><div className="grid cols-3">{advisors.slice(0, 3).map((a) => <Card key={a.id}><h4>{a.fullName}</h4><p>{a.headline}</p></Card>)}</div></section>
      <Card><h2>Saved advisors</h2><p>Placeholder list (no persistence).</p></Card>
    </div>
  );
}

const tabs = ['upcoming', 'past', 'cancelled', 'disputed'] as const;
export function ClientBookingsPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>('upcoming');
  const filtered = useMemo(() => bookings.filter((b) => {
    if (active === 'upcoming') return ['confirmed', 'pending_payment'].includes(b.status);
    if (active === 'past') return b.status === 'completed';
    if (active === 'cancelled') return b.status.includes('cancelled');
    return b.status === 'disputed';
  }), [active]);
  return <div className="stack-lg"><h1>My Bookings</h1><Tabs values={[...tabs]} active={active} onChange={setActive} /><div className="grid cols-2">{filtered.map((b) => <BookingCard key={b.id} booking={b} />)}</div></div>;
}

export function BookingDetailPage() {
  const { bookingId } = useParams();
  const booking = bookings.find((b) => b.id === bookingId) ?? bookings[0];
  return (
    <div className="stack-lg">
      <Card><h1>Booking {booking.id}</h1><p>{booking.sessionName} with {booking.advisorName}</p><p>Status: {booking.status}</p><p>Meeting link placeholder</p></Card>
      <ConsentPanel consentClient={booking.consentClient} consentAdvisor={booking.consentAdvisor} />
      <TranscriptStatusPanel status={booking.transcriptStatus} />
      <Card><h3>Payment summary</h3><p>${booking.price} {booking.currency}</p></Card>
      <Card><h3>Review form placeholder</h3><textarea placeholder="Share feedback" /></Card>
      <Card><h3>Dispute / refund info</h3><p>Open a support case if session quality or attendance issues occur.</p></Card>
    </div>
  );
}
