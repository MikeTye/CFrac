import type { Booking } from '../../mocks/bookings';
import { Badge } from '../common/Badge';

export function BookingStatusBadge({ status }: { status: Booking['status'] }) {
  const tone = status.includes('cancelled') || status === 'disputed' ? 'warning' : status === 'completed' ? 'success' : 'default';
  return <Badge tone={tone}>{status.replaceAll('_', ' ')}</Badge>;
}
