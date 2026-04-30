import type { ReactNode } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

/* ─────────────────────────────────────────────
   NAV STRUCTURE
───────────────────────────────────────────── */
const PRIMARY_NAV = [
    { to: '/dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    { to: '/advisors', label: 'Browse Advisors', icon: <IconAdvisors /> },
    { to: '/appointments', label: 'My Sessions', icon: <IconSessions /> },
    { to: '/messages', label: 'Messages', icon: <IconMessages />, badge: 2 },
];

const SECONDARY_NAV = [
    { to: '/profile', label: 'Profile', icon: <IconProfile /> },
    { to: '/billing', label: 'Billing', icon: <IconBilling /> },
    { to: '/settings', label: 'Settings', icon: <IconSettings /> },
];

/* ─────────────────────────────────────────────
   INLINE ICONS  (no external dependency)
───────────────────────────────────────────── */
function IconDashboard() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9" />
            <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4" />
            <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".4" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".9" />
        </svg>
    );
}
function IconAdvisors() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="6" cy="5" r="3" fill="currentColor" opacity=".9" />
            <circle cx="11.5" cy="5.5" r="2" fill="currentColor" opacity=".4" />
            <path d="M1 13c0-2.21 2.239-4 5-4s5 1.79 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".9" />
            <path d="M11.5 10c1.657 0 3 1.12 3 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".4" />
        </svg>
    );
}
function IconSessions() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="2.5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" opacity=".9" />
            <path d="M5 1v3M11 1v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".6" />
            <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.2" opacity=".35" />
            <circle cx="5.5" cy="10" r="1" fill="currentColor" opacity=".7" />
            <circle cx="8" cy="10" r="1" fill="currentColor" opacity=".7" />
            <circle cx="10.5" cy="10" r="1" fill="currentColor" opacity=".35" />
        </svg>
    );
}
function IconMessages() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5v6A1.5 1.5 0 0 1 12.5 11H9l-3 3v-3H3.5A1.5 1.5 0 0 1 2 9.5v-6Z" stroke="currentColor" strokeWidth="1.4" opacity=".9" />
        </svg>
    );
}
function IconProfile() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4" opacity=".9" />
            <path d="M2 14c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".9" />
        </svg>
    );
}
function IconBilling() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" opacity=".9" />
            <path d="M1 7h14" stroke="currentColor" strokeWidth="1.4" opacity=".45" />
            <rect x="3" y="9.5" width="4" height="1.5" rx=".75" fill="currentColor" opacity=".6" />
        </svg>
    );
}
function IconSettings() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.4" opacity=".9" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41"
                stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".5" />
        </svg>
    );
}

/* ─────────────────────────────────────────────
   NAV ITEM
───────────────────────────────────────────── */
function NavItem({
    to,
    label,
    icon,
    badge,
}: {
    to: string;
    label: string;
    icon: ReactNode;
    badge?: number;
}) {
    return (
        <NavLink
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
                `app-nav-item ${isActive ? 'app-nav-item--active' : ''}`
            }
        >
            <span className="app-nav-icon">{icon}</span>
            <span className="app-nav-label">{label}</span>
            {badge ? (
                <span className="app-nav-badge" aria-label={`${badge} unread`}>
                    {badge}
                </span>
            ) : null}
        </NavLink>
    );
}

/* ─────────────────────────────────────────────
   TOPBAR
───────────────────────────────────────────── */
function AppTopbar({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) {
    const navigate = useNavigate();
    return (
        <header className="app-topbar">
            <div className="app-topbar-left">
                {/* The vertical rail motif, carried into the authenticated shell */}
                <div className="app-topbar-rail" aria-hidden="true" />
                <div className="app-topbar-heading">
                    {subtitle && (
                        <span className="app-topbar-eyebrow">{subtitle}</span>
                    )}
                    <h1 className="app-topbar-title">{title}</h1>
                </div>
            </div>
            <div className="app-topbar-right">
                <button
                    type="button"
                    className="btn app-topbar-cta"
                    onClick={() => navigate('/advisors')}
                >
                    + Book a session
                </button>
                <button
                    type="button"
                    className="app-topbar-icon-btn"
                    aria-label="Notifications"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 2a5 5 0 0 1 5 5v3l1.5 2H2.5L4 10V7a5 5 0 0 1 5-5Z"
                            stroke="currentColor" strokeWidth="1.4" />
                        <path d="M7.5 14.5a1.5 1.5 0 0 0 3 0"
                            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span className="app-topbar-notif-dot" aria-hidden="true" />
                </button>
            </div>
        </header>
    );
}

/* ─────────────────────────────────────────────
   SIDEBAR USER PANEL
───────────────────────────────────────────── */
function SidebarUser({ name, role }: { name: string; role: string }) {
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <div className="app-sidebar-user">
            <div className="app-sidebar-avatar">{initials}</div>
            <div className="app-sidebar-user-meta">
                <span className="app-sidebar-user-name">{name}</span>
                <span className="app-sidebar-user-role">{role}</span>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   LAYOUT ROOT
───────────────────────────────────────────── */
export interface AppLayoutProps {
    children: ReactNode;
    pageTitle: string;
    pageSubtitle?: string;
    /** Replace with auth context / useUser hook */
    user?: { name: string; role: string };
}

export function AppLayout({
    children,
    pageTitle,
    pageSubtitle,
    user = { name: 'Ada Lovelace', role: 'Founder & CEO' },
}: AppLayoutProps) {
    return (
        <div className="app-shell">
            {/* ── Sidebar ── */}
            <aside className="app-sidebar">
                {/* Brand */}
                <Link to="/dashboard" className="app-sidebar-brand">
                    <span className="logo">Operator</span>
                    <span className="app-sidebar-brand-sub">Advisory Platform</span>
                </Link>

                {/* Navigation */}
                <nav className="app-sidebar-nav" aria-label="Main navigation">
                    <span className="app-nav-section-label">Platform</span>
                    {PRIMARY_NAV.map((item) => (
                        <NavItem key={item.to} {...item} />
                    ))}
                    <span className="app-nav-section-label app-nav-section-label--spaced">
                        Account
                    </span>
                    {SECONDARY_NAV.map((item) => (
                        <NavItem key={item.to} {...item} />
                    ))}
                </nav>

                {/* Footer: user + signout */}
                <div className="app-sidebar-footer">
                    <SidebarUser name={user.name} role={user.role} />
                    <button type="button" className="app-sidebar-signout">
                        Sign out
                    </button>
                </div>
            </aside>

            {/* ── Main column ── */}
            <div className="app-main-col">
                <AppTopbar title={pageTitle} subtitle={pageSubtitle} />
                <main className="app-content">{children}</main>
            </div>
        </div>
    );
}