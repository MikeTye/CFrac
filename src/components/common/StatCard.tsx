import { Card } from './Card';

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <p className="muted">{label}</p>
      <h3>{value}</h3>
    </Card>
  );
}
