import { Link, Outlet } from 'react-router-dom';
import { DemoNav } from './DemoNav';

export function PublicLayout() {
  return (
    <div>
      <nav className="top-nav">
        <Link to="/" className="logo">CFrac</Link>
        <div>
          <Link to="/advisors">Browse Advisors</Link>
          <Link to="/register">Join as Advisor</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <DemoNav />
      <main className="page-wrap"><Outlet /></main>
    </div>
  );
}
