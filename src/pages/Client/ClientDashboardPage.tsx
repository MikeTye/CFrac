import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { bookings } from '../../mocks/bookings';
import { intakes, sessionArtifacts } from '../../mocks/client';

export function ClientDashboardPage() {
  return <div className="stack-lg"><Card className="premium"><p className="hero-eyebrow">Client workspace</p><h1>Client Dashboard</h1><p>Manage intakes, bookings, payments, and post-session artifacts.</p></Card><div className="grid cols-4"><Card><h3>{intakes.length}</h3><p className="muted">Total intakes</p></Card><Card><h3>{bookings.length}</h3><p className="muted">Bookings</p></Card><Card><h3>{bookings.filter((b)=>b.status==='pending_payment').length}</h3><p className="muted">Pending payment</p></Card><Card><h3>{sessionArtifacts.filter((a)=>a.transcriptStatus==='ready').length}</h3><p className="muted">Artifacts ready</p></Card></div><div className="stack-row"><Link to="/client/intake/new" className="btn">Start Intake</Link><Link to="/client/intake/int-1002/status" className="btn ghost">View Intake Status</Link><Link to="/client/checkout/bk-1002" className="btn ghost">Go to Checkout</Link></div></div>;
}
