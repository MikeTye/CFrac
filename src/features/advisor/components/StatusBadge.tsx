import { Badge } from '../../../components/common/Badge';

export type AdvisorStatusVariant =
  | 'upcoming'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'pending-confirmation'
  | 'at-risk'
  | 'blocked'
  | 'active'
  | 'idle'
  | 'default';

const STATUS_VARIANT_MAP: Record<AdvisorStatusVariant, { label: string; className?: string; tone?: 'success' | 'default' | 'warning' | 'danger' }> = {
  upcoming: { label: 'Upcoming', className: 'appt-status--upcoming' },
  'in-progress': { label: 'In progress', className: 'appt-status--live' },
  completed: { label: 'Completed', className: 'appt-status--done' },
  cancelled: { label: 'Cancelled', className: 'appt-status--cancelled' },
  'pending-confirmation': { label: 'Awaiting confirmation', className: 'appt-status--pending' },
  'at-risk': { label: 'At risk', tone: 'warning' },
  blocked: { label: 'Blocked', tone: 'danger' },
  active: { label: 'Active', tone: 'success' },
  idle: { label: 'Idle', tone: 'default' },
  default: { label: 'Unknown', tone: 'default' },
};

export function StatusBadge({ status, label }: { status: AdvisorStatusVariant; label?: string }) {
  const variant = STATUS_VARIANT_MAP[status] ?? STATUS_VARIANT_MAP.default;

  if (variant.className) {
    return <span className={`appt-status ${variant.className}`}>{label ?? variant.label}</span>;
  }

  return <Badge tone={variant.tone ?? 'default'}>{label ?? variant.label}</Badge>;
}
