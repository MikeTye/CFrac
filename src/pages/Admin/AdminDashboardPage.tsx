import { AdminStatGrid } from '../../components/admin/AdminStatGrid';
import { Card } from '../../components/common/Card';

export function AdminDashboardPage() {
  return (
    <div className="stack-lg">
      <h1>Admin Operations</h1>
      <p className="muted">Trust, dispute, and marketplace quality operations dashboard.</p>
      <AdminStatGrid />
      <Card>
        <h3>Demo Paths</h3>
        <p>Use the left nav or Demo Nav to open moderation, booking ops, dispute, audit, and monitoring routes.</p>
      </Card>
    </div>
  );
}
