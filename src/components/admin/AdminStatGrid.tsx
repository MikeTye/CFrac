import { StatCard } from '../common/StatCard';

export function AdminStatGrid() {
  return (
    <div className="grid cols-3">
      <StatCard label="Pending advisor approvals" value="12" />
      <StatCard label="Upcoming bookings" value="34" />
      <StatCard label="Disputed bookings" value="5" />
      <StatCard label="Flagged reviews" value="8" />
      <StatCard label="Refund requests" value="3" />
      <StatCard label="Transcript issues" value="2" />
    </div>
  );
}
