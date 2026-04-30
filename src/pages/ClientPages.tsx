import { Link, useParams } from 'react-router-dom';
import { BookingCard } from '../components/bookings/BookingCard';
import { ConsentPanel } from '../components/bookings/ConsentPanel';
import { TranscriptStatusPanel } from '../components/bookings/TranscriptStatusPanel';
import { Card } from '../components/common/Card';
import { advisors } from '../mocks/advisors';
import { bookings } from '../mocks/bookings';

export function ClientDashboardPage() {
  const upcoming = bookings.filter((b) => ['confirmed', 'pending_payment'].includes(b.status));
  const completed = bookings.filter((b) => b.status === 'completed');

  return (
    <div className="stack-lg">
      <Card className="premium">
        <p className="hero-eyebrow">Client workspace</p>
        <h1>Welcome back, Maya.</h1>
        <p>Discover advisors, manage active sessions, and keep follow-ups in one place.</p>
      </Card>

      <div className="grid cols-4">
        <Card>
          <h3>{upcoming.length}</h3>
          <p className="muted">Upcoming sessions</p>
        </Card>
        <Card>
          <h3>{completed.length}</h3>
          <p className="muted">Completed sessions</p>
        </Card>
        <Card>
          <h3>{completed.filter((b) => b.transcriptStatus === 'ready').length}</h3>
          <p className="muted">Summaries ready</p>
        </Card>
        <Card>
          <h3>98%</h3>
          <p className="muted">Advisor match confidence</p>
        </Card>
      </div>

      <div className="grid cols-2">
        <Card>
          <h3>Next advisory session</h3>
          <p><strong>{upcoming[0]?.sessionName}</strong></p>
          <p className="muted">with {upcoming[0]?.advisorName}</p>
          <p className="muted">Room opens 10 minutes before start.</p>
          <div className="stack-row" style={{ marginTop: '0.8rem' }}>
            <Link to="/client/bookings" className="btn">View bookings</Link>
            <Link to="/advisors" className="btn ghost">Book another advisor</Link>
          </div>
        </Card>

        <Card>
          <h3>Client checklist</h3>
          <ul>
            <li>Share your brief for upcoming session</li>
            <li>Invite your co-founder as attendee</li>
            <li>Review latest session summary</li>
            <li>Save 3 advisors for recurring counsel</li>
          </ul>
        </Card>
      </div>

      <section>
        <h3>Recommended advisors</h3>
        <div className="grid cols-3">
          {advisors.slice(0, 3).map((a) => (
            <Card key={a.id}>
              <strong>{a.fullName}</strong>
              <p className="muted">{a.headline}</p>
              <p className="muted">★ {a.rating} · Senior operator</p>
              <Link to={`/advisors/${a.id}`} className="auth-link">View profile →</Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ClientBookingsPage() {
  return <div className="stack-lg"><h1>My Bookings</h1><div className="grid cols-2">{bookings.map((b) => <BookingCard key={b.id} booking={b} />)}</div></div>;
}

export function BookingDetailPage() {
  const { bookingId } = useParams(); const booking = bookings.find((b) => b.id === bookingId) ?? bookings[0];
  return <div className="stack-lg"><Card className="premium"><h1>Booking Detail: {booking.id}</h1><p>{booking.sessionName} with {booking.advisorName}</p><p>Meeting room status: Provisioned on platform</p></Card><ConsentPanel consentClient={booking.consentClient} consentAdvisor={booking.consentAdvisor} /><TranscriptStatusPanel status={booking.transcriptStatus} /><Card><h3>Payment Summary</h3><p>${booking.price} {booking.currency}</p></Card><Card><h3>Timeline / Audit Trail</h3><ul><li>Booking confirmed</li><li>Meeting room created</li><li>Consent {booking.consentAdvisor && booking.consentClient ? 'complete' : 'pending'}</li><li>Session completed</li><li>Transcript {booking.transcriptStatus === 'ready' ? 'ready' : 'pending'}</li></ul></Card><Card><h3>Review</h3><textarea placeholder="Share outcomes and advisor feedback" /></Card><Card><h3>Dispute / Refund</h3><p className="muted">If attendance, consent, or quality concerns arise, support can review booking records and transcript status.</p></Card></div>;
}
