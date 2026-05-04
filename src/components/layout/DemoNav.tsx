import { Link, useLocation } from 'react-router-dom';

const links = [
  { label: 'Demo Start', to: '/demo-start' },
  { label: 'Public Home', to: '/' },
  { label: 'Search', to: '/advisors' },
  { label: 'Client Demo', to: '/client/dashboard' },
  { label: 'Advisor Demo', to: '/advisor' },
  { label: 'Admin Demo', to: '/admin' },
];

export function DemoNav() {
  const location = useLocation();

  return (
    <div className="demo-nav" role="navigation" aria-label="Demo navigation">
      <span className="demo-nav-label">POC Demo Nav</span>
      <div className="demo-nav-links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? 'demo-nav-link demo-nav-link--active' : 'demo-nav-link'}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
