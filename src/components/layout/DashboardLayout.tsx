import { useState, useCallback } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

/* ─────────────────────────────────────────────
   NAV STRUCTURE
   Each item has a label, path, and Tabler icon
   name (outline, no -filled suffix).
   Groups keep sections visually separated.
───────────────────────────────────────────── */
type NavItem = {
    label: string;
    path: string;
    icon: string;
    badge?: number;
    end?: boolean;
};

type NavGroup = {
    label: string;
    items: NavItem[];
};

const NAV: Record<'client' | 'advisor', NavGroup[]> = {
    client: [
        {
            label: 'Overview',
            items: [
                {
                    label: 'Dashboard',
                    path: '/client/dashboard',
                    icon: 'layout-dashboard',
                    end: true,
                },
                {
                    label: 'Advisory requests',
                    path: '/client/requests',
                    icon: 'briefcase',
                    badge: 2,
                },
                {
                    label: 'Bookings',
                    path: '/client/bookings',
                    icon: 'calendar-check',
                    badge: 2,
                },
            ],
        },

        {
            label: 'Advisory',
            items: [
                {
                    label: 'Saved advisors',
                    path: '/client/saved-advisors',
                    icon: 'bookmark',
                },
            ],
        },

        {
            label: 'Discover',
            items: [
                {
                    label: 'Search advisors',
                    path: '/client/advisors',
                    icon: 'search',
                },
                {
                    label: 'Recommended',
                    path: '/client/recommended',
                    icon: 'sparkles',
                },
            ],
        },

        {
            label: 'Account',
            items: [
                {
                    label: 'Profile',
                    path: '/client/profile',
                    icon: 'user',
                },
                {
                    label: 'Settings',
                    path: '/client/settings',
                    icon: 'settings',
                },
            ],
        },
    ],
    advisor: [
        {
            label: 'Overview',
            items: [
                { label: 'Dashboard', path: '/advisor', icon: 'layout-dashboard', end: true },
                { label: 'Intake queue', path: '/advisor/intakes', icon: 'inbox', badge: 2 },
            ],
        },
        {
            label: 'Sessions',
            items: [
                // { label: 'Calendar', path: '/advisor/calendar', icon: 'calendar-event' },
                { label: 'Bookings', path: '/advisor/bookings', icon: 'calendar-check' },
            ],
        },
        {
            label: 'Manage',
            items: [
                { label: 'Profile editor', path: '/advisor/profile', icon: 'id-badge' },
                // { label: 'Availability', path: '/advisor/availability', icon: 'clock' },
                // { label: 'Offerings', path: '/advisor/offerings', icon: 'list-check' },
                { label: 'Performance', path: '/advisor/performance', icon: 'chart-bar' },
            ],
        },
    ],
};

/* ─────────────────────────────────────────────
   TOPBAR ACTIONS  per role + route
   Derive from current path so each page can
   surface its own relevant primary action
   without each page owning its own header.
───────────────────────────────────────────── */
function useTopbarMeta(role: 'client' | 'advisor', pathname: string) {
    const titles: Record<string, string> = {
        '/client/dashboard': 'Dashboard',

        '/client/requests': 'Advisory requests',
        '/client/requests/new': 'Start advisory request',

        '/client/bookings': 'Bookings',

        '/client/saved-advisors': 'Saved advisors',

        '/client/advisors': 'Search advisors',

        '/client/recommended': 'Recommended advisors',

        '/client/profile': 'Profile',

        '/client/settings': 'Settings',

        '/advisor': 'Dashboard',
        '/advisor/intakes': 'Intake queue',
        // '/advisor/calendar': 'Calendar',
        '/advisor/bookings': 'Bookings',
        '/advisor/profile': 'Profile editor',
        // '/advisor/availability': 'Availability',
        // '/advisor/offerings': 'Offerings',
        '/advisor/performance': 'Performance',
    };

    const title = titles[pathname] ?? (role === 'advisor' ? 'Advisor workspace' : 'Client workspace');

    const ghost = role === 'advisor'
        ? { label: 'Edit profile', to: '/advisor/profile' }
        : { label: 'Saved advisors', to: '/client/saved-advisors' };

    const primary = role === 'advisor'
        ? { label: 'Set availability', to: '/advisor/availability' }
        : { label: 'Browse advisors', to: '/client/advisors' };

    return { title, ghost, primary };
}

/* ─────────────────────────────────────────────
   USER STUB  — replace with auth context
───────────────────────────────────────────── */
const USER_STUB = {
    client: { name: 'Ada Mensah', initials: 'AM' },
    advisor: { name: 'Marcus Holloway', initials: 'MH' },
};

/* ─────────────────────────────────────────────
   DASHBOARD LAYOUT
───────────────────────────────────────────── */
export function DashboardLayout({ role }: { role: 'client' | 'advisor' }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const { title, ghost, primary } = useTopbarMeta(role, pathname);
    const user = USER_STUB[role];
    const groups = NAV[role];

    const closeMobile = useCallback(() => setMobileOpen(false), []);

    return (
        <div className="dash-layout" data-role={role}>

            {/* ── Mobile overlay ── */}
            {mobileOpen && (
                <div
                    className="dash-mobile-overlay"
                    aria-hidden="true"
                    onClick={closeMobile}
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className={[
                    'dash-sidebar',
                    collapsed ? 'dash-sidebar--collapsed' : '',
                    mobileOpen ? 'dash-sidebar--mobile-open' : '',
                ].join(' ')}
                aria-label={`${role} navigation`}
            >
                {/* Brand */}
                <div className="dash-brand">
                    <Link to="/" className="dash-brand-mark" aria-label="Go to home">
                        Op
                    </Link>
                    <div className="dash-brand-text">
                        <span className="dash-brand-name">Operator</span>
                        <span className="dash-brand-role">{role} workspace</span>
                    </div>
                </div>

                {/* Nav groups */}
                <nav className="dash-nav" aria-label={`${role} navigation`}>
                    {groups.map((group) => (
                        <div key={group.label} className="dash-nav-group">
                            <span className="dash-nav-group-label" aria-hidden="true">
                                {group.label}
                            </span>
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.end}
                                    onClick={closeMobile}
                                    className={({ isActive }) =>
                                        ['dash-nav-link', isActive ? 'dash-nav-link--active' : ''].join(' ')
                                    }
                                    aria-label={item.label}
                                >
                                    <i
                                        className={`ti ti-${item.icon} dash-nav-icon`}
                                        aria-hidden="true"
                                    />
                                    <span className="dash-nav-label">{item.label}</span>
                                    {item.badge ? (
                                        <span className="dash-nav-badge" aria-label={`${item.badge} items`}>
                                            {item.badge}
                                        </span>
                                    ) : null}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* User row */}
                <div className="dash-sidebar-footer">
                    <div className="dash-user-row">
                        <div className="dash-user-avatar" aria-hidden="true">
                            {user.initials}
                        </div>
                        <div className="dash-user-info">
                            <span className="dash-user-name">{user.name}</span>
                            <span className="dash-user-role">{role}</span>
                        </div>
                    </div>
                </div>

                {/* Collapse toggle — desktop only */}
                <button
                    type="button"
                    className="dash-collapse-btn"
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <i
                        className={`ti ${collapsed ? 'ti-chevron-right' : 'ti-chevron-left'}`}
                        aria-hidden="true"
                    />
                </button>
            </aside>

            {/* ── Main content area ── */}
            <div className="dash-main">

                {/* Topbar */}
                <header className="dash-topbar">
                    {/* Hamburger — mobile only */}
                    <button
                        type="button"
                        className="dash-hamburger"
                        onClick={() => setMobileOpen((o) => !o)}
                        aria-label="Open navigation menu"
                        aria-expanded={mobileOpen}
                    >
                        <i className="ti ti-menu-2" aria-hidden="true" />
                    </button>

                    <span className="dash-topbar-title">{title}</span>

                    <div className="dash-topbar-actions">
                        <Link
                            to={ghost.to}
                            className="dash-topbar-btn"
                        >
                            {ghost.label}
                        </Link>
                        <Link
                            to={primary.to}
                            className="dash-topbar-btn dash-topbar-btn--primary"
                        >
                            {primary.label}
                        </Link>
                        <button
                            type="button"
                            className="dash-topbar-icon-btn dash-topbar-icon-btn--notif"
                            aria-label="Notifications"
                        >
                            <i className="ti ti-bell" aria-hidden="true" />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <div className="dash-content">
                    <div className="dash-content-inner">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}