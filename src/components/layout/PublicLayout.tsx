import { Link, NavLink, Outlet } from 'react-router-dom';
import { DemoNav } from './DemoNav';

export function PublicLayout() {
    return (
        <div className="public-shell">
            <nav className="top-nav public-top-nav">
                <Link to="/" className="logo">Operator</Link>

                <div className="public-nav-links">
                    <NavLink to="/advisors" className={({ isActive }) => isActive ? 'public-nav-link public-nav-link--active' : 'public-nav-link'}>
                        Search Advisors
                    </NavLink>
                    <NavLink to="/register" className={({ isActive }) => isActive ? 'public-nav-link public-nav-link--active' : 'public-nav-link'}>
                        Join as Advisor
                    </NavLink>
                    <NavLink to="/login" className={({ isActive }) => isActive ? 'public-nav-link public-nav-link--active' : 'public-nav-link'}>
                        Login
                    </NavLink>
                </div>
            </nav>

            <DemoNav />

            <main className="public-main">
                <Outlet />
            </main>
        </div>
    );
}