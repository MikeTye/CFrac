import { Link, Outlet } from 'react-router-dom';

const items = {
  client: [
    ['Dashboard', '/client'],
    ['My Bookings', '/client/bookings'],
    ['Saved Advisors', '/advisors'],
    ['Account', '/register'],
  ],
  advisor: [
    ['Dashboard', '/advisor'],
    ['Profile Editor', '/advisor/profile'],
    ['Availability', '/advisor/availability'],
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
