import { ModerationTable } from '../../components/admin/ModerationTable';
import { adminBookingOps } from '../../mocks/admin';

export function AdminBookingsPage() {
  return <ModerationTable title="Booking Ops" columns={['Booking', 'Intake', 'Advisor', 'Client', 'Booking State', 'Escrow', 'Consent']} rows={adminBookingOps.map((row) => [row.bookingId, row.intakeId, row.advisorName, row.clientName, row.bookingState, row.escrowState, row.consentState])} />;
}
