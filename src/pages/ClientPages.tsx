import { useParams } from 'react-router-dom';
import { BookingCard } from '../components/bookings/BookingCard';
import { ConsentPanel } from '../components/bookings/ConsentPanel';
import { TranscriptStatusPanel } from '../components/bookings/TranscriptStatusPanel';
import { Card } from '../components/common/Card';
import { advisors } from '../mocks/advisors';
import { bookings } from '../mocks/bookings';

export function ClientDashboardPage() { const upcoming = bookings.filter((b) => ['confirmed', 'pending_payment'].includes(b.status)); const past = bookings.filter((b) => b.status === 'completed');
return <div className="stack-lg"><Card className="premium"><h1>Client Dashboard</h1><p>Manage sessions, transcripts, and follow-up decisions in one secure workflow.</p></Card><Card><h3>Upcoming Session</h3><p>{upcoming[0]?.sessionName} with {upcoming[0]?.advisorName}</p><p className="muted">Join status: room opens 10 minutes before start.</p></Card><section><h3>Recommended Advisors</h3><div className="grid cols-3">{advisors.slice(0,3).map((a)=><Card key={a.id}><strong>{a.fullName}</strong><p className="muted">{a.headline}</p></Card>)}</div></section><section><h3>Past Sessions</h3><div className="grid cols-2">{past.map((b)=><BookingCard key={b.id} booking={b}/>)}</div></section><Card><h3>Pending Reviews</h3><p>1 review due for completed sessions.</p></Card><Card><h3>Saved Advisors</h3><p className="muted">Keep a shortlist for recurring advisory needs.</p></Card></div>; }

export function ClientBookingsPage() { return <div className="stack-lg"><h1>My Bookings</h1><div className="grid cols-2">{bookings.map((b)=><BookingCard key={b.id} booking={b}/>)}</div></div>; }

export function BookingDetailPage() { const { bookingId } = useParams(); const booking = bookings.find((b)=>b.id===bookingId) ?? bookings[0];
return <div className="stack-lg"><Card className="premium"><h1>Booking Detail: {booking.id}</h1><p>{booking.sessionName} with {booking.advisorName}</p><p>Meeting room status: Provisioned on platform</p></Card><ConsentPanel consentClient={booking.consentClient} consentAdvisor={booking.consentAdvisor} /><TranscriptStatusPanel status={booking.transcriptStatus} /><Card><h3>Payment Summary</h3><p>${booking.price} {booking.currency}</p></Card><Card><h3>Timeline / Audit Trail</h3><ul><li>Booking confirmed</li><li>Meeting room created</li><li>Consent {booking.consentAdvisor && booking.consentClient ? 'complete' : 'pending'}</li><li>Session completed</li><li>Transcript {booking.transcriptStatus === 'ready' ? 'ready' : 'pending'}</li></ul></Card><Card><h3>Review</h3><textarea placeholder="Share outcomes and advisor feedback" /></Card><Card><h3>Dispute / Refund</h3><p className="muted">If attendance, consent, or quality concerns arise, support can review booking records and transcript status.</p></Card></div>; }
