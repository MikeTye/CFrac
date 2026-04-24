import { Link, Outlet } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="dash-layout">
      <aside>
        <h3>ADMIN NAV</h3>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/advisors">Advisor Moderation</Link>
        <Link to="/admin/bookings">Bookings</Link>
        <Link to="/admin/reviews">Reviews</Link>
      </aside>
      <section><Outlet /></section>
    </div>
  );
}
