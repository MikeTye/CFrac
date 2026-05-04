import { Link, Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="dash-layout">
      <aside>
        <h3>ADMIN NAV</h3>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/moderation/advisors">Advisor Moderation Queue</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/disputes/dsp-1001">Dispute Review</Link>
        <Link to="/admin/audit/recordings/bk-1004">Recording Audit</Link>
        <Link to="/admin/monitoring/declines">Decline Monitoring</Link>
      </aside>
      <section><Outlet /></section>
    </div>
  );
}
