import { AdminStatGrid } from '../components/admin/AdminStatGrid';
import { ModerationTable } from '../components/admin/ModerationTable';

export function AdminDashboardPage() {
  return (
    <div className="stack-lg">
      <h1>Admin Dashboard</h1>
      <AdminStatGrid />
    </div>
  );
}

export function AdminAdvisorsPage() {
  return (
    <ModerationTable
      title="Advisor Moderation"
      columns={['Advisor', 'Headline', 'Status', 'Verification', 'Profile %', 'Submitted', 'Actions']}
      rows={[
        ['Nina Patel', 'Former CFO', 'pending', 'verified', '92%', '2026-04-20', 'Approve / Reject / Request Changes / Suspend'],
        ['Rachel Kim', 'CMO Advisor', 'review', 'unverified', '83%', '2026-04-22', 'Approve / Reject / Request Changes / Suspend'],
      ]}
    />
  );
}

export function AdminBookingsPage() {
  return (
    <ModerationTable
      title="Booking Operations"
      columns={['Booking ID', 'Client', 'Advisor', 'Status', 'Payment', 'Consent', 'Refund', 'Actions']}
      rows={[
        ['bk-1001', 'Jordan Lee', 'Nina Patel', 'confirmed', 'paid', 'both consented', 'n/a', 'View / Intervene'],
        ['bk-1004', 'Jordan Lee', 'Alex Johnson', 'disputed', 'paid', 'advisor missing', 'pending', 'Resolve / Refund'],
      ]}
    />
  );
}

export function AdminReviewsPage() {
  return (
    <ModerationTable
      title="Review Moderation"
      columns={['Advisor', 'Client', 'Rating', 'Snippet', 'Status', 'Actions']}
      rows={[
        ['Omar Liu', 'Jordan Lee', '2', 'Late to call...', 'flagged', 'Approve / Hide / Flag'],
        ['Laura Mendes', 'Kim Tran', '5', 'Fantastic tactical guidance...', 'live', 'Approve / Hide / Flag'],
      ]}
    />
  );
}
