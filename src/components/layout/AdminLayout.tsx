import { Link, NavLink, Outlet } from 'react-router-dom';

const adminItems = [
  ['Dashboard', '/admin'],
  ['Advisor Moderation', '/admin/moderation/advisors'],
  ['Bookings', '/admin/bookings'],
  ['Dispute Review', '/admin/disputes/dsp-1001'],
  ['Recording Audit', '/admin/audit/recordings/bk-1004'],
  ['Decline Monitoring', '/admin/monitoring/declines'],
];

export function AdminLayout() {
  return (
    <div className="dash-layout">
      <aside className="dash-sidebar">
        <Link to="/" className="dash-brand">
          <span className="dash-brand-title">Operator</span>
          <span className="dash-brand-subtitle">admin console</span>
        </Link>

        <nav className="dash-nav" aria-label="Admin navigation">
          {adminItems.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/admin'}
              className={({ isActive }) =>
                isActive ? 'dash-nav-link dash-nav-link--active' : 'dash-nav-link'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <section className="dash-content">
        <div className="dash-content-inner">
          <Outlet />
        </div>
      </section>
    </div>
  );
}