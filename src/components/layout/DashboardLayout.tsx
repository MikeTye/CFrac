import { Link, Outlet } from 'react-router-dom';

const items = {
  client: [
    ['Dashboard', '/client/dashboard'],
    ['New Intake', '/client/intake/new'],
    ['Intake Status', '/client/intake/int-1002/status'],
    ['Checkout', '/client/checkout/bk-1002'],
    ['Booking Detail', '/client/booking/bk-1002'],
    ['Join Session', '/client/join/bk-1002'],
    ['Past Session', '/client/sessions/bk-1001'],
  ],
  advisor: [
    ['Dashboard', '/advisor'],
    ['Profile Editor', '/advisor/profile'],
    ['Availability', '/advisor/availability'],
    ['Offerings', '/advisor/offerings'],
    ['Calendar', '/advisor/calendar'],
    ['Intake Queue', '/advisor/intakes'],
    ['Bookings', '/advisor/bookings'],
    ['Earnings', '/advisor'],
  ],
};

export function DashboardLayout({ role }: { role: 'client' | 'advisor' }) {
  return (
    <div className="dash-layout">
      <aside>
        <h3>{role.toUpperCase()} NAV</h3>
        {items[role].map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
      </aside>
      <section><Outlet /></section>
    </div>
  );
}
