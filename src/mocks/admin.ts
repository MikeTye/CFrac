export type AdvisorModerationCase = {
  id: string;
  advisorName: string;
  tier: 'Diamond' | 'Platinum' | 'Gold' | 'Silver';
  verificationStatus: 'verified' | 'unverified' | 'pending';
  profileCompletion: number;
  status: 'pending_review' | 'approved' | 'changes_requested';
};

export type AdminBookingOps = {
  bookingId: string;
  intakeId: string;
  advisorName: string;
  clientName: string;
  bookingState: string;
  escrowState: 'captured' | 'released' | 'pending' | 'refunded';
  consentState: 'complete' | 'awaiting_client' | 'awaiting_advisor' | 'mismatch';
};

export type Dispute = {
  id: string;
  bookingId: string;
  reason: string;
  status: 'open' | 'under_review' | 'resolved';
  evidence: string[];
};

export type AuditEvent = {
  id: string;
  bookingId: string;
  event: string;
  actor: 'client' | 'advisor' | 'system' | 'admin';
  timestamp: string;
};

export const advisorModerationCases: AdvisorModerationCase[] = [
  { id: 'mod-1001', advisorName: 'Nina Patel', tier: 'Platinum', verificationStatus: 'verified', profileCompletion: 92, status: 'pending_review' },
  { id: 'mod-1002', advisorName: 'Rachel Kim', tier: 'Gold', verificationStatus: 'pending', profileCompletion: 83, status: 'changes_requested' },
  { id: 'mod-1003', advisorName: 'Omar Liu', tier: 'Diamond', verificationStatus: 'verified', profileCompletion: 97, status: 'approved' },
];

export const adminBookingOps: AdminBookingOps[] = [
  { bookingId: 'bk-1001', intakeId: 'int-1005', advisorName: 'Nina Patel', clientName: 'Maya Chen', bookingState: 'awaiting_consent', escrowState: 'captured', consentState: 'awaiting_client' },
  { bookingId: 'bk-1002', intakeId: 'int-1003', advisorName: 'Omar Liu', clientName: 'Maya Chen', bookingState: 'slot_held', escrowState: 'captured', consentState: 'awaiting_advisor' },
  { bookingId: 'bk-1004', intakeId: 'int-1004', advisorName: 'Alex Johnson', clientName: 'Maya Chen', bookingState: 'disputed', escrowState: 'pending', consentState: 'mismatch' },
];

export const disputes: Dispute[] = [
  { id: 'dsp-1001', bookingId: 'bk-1004', reason: 'Advisor no-show dispute', status: 'under_review', evidence: ['Join/leave logs', 'Client chat export'] },
  { id: 'dsp-1002', bookingId: 'bk-1010', reason: 'Consent mismatch', status: 'open', evidence: ['Consent event timeline'] },
  { id: 'dsp-1003', bookingId: 'bk-1008', reason: 'Recording unavailable', status: 'resolved', evidence: ['Storage incident report'] },
];

export const auditEvents: AuditEvent[] = [
  { id: 'ae-1', bookingId: 'bk-1004', event: 'client_joined_room', actor: 'client', timestamp: '2026-04-10T18:02:00Z' },
  { id: 'ae-2', bookingId: 'bk-1004', event: 'advisor_absent_timeout', actor: 'system', timestamp: '2026-04-10T18:12:00Z' },
  { id: 'ae-3', bookingId: 'bk-1004', event: 'dispute_opened', actor: 'client', timestamp: '2026-04-10T18:40:00Z' },
  { id: 'ae-4', bookingId: 'bk-1004', event: 'recording_pipeline_checked', actor: 'admin', timestamp: '2026-04-10T19:10:00Z' },
];

export const advisorDeclineMonitoring = [
  { advisorName: 'Rachel Kim', declineRate: '22%', trend: '↑ 4% week-over-week', alert: 'Review suggested alternatives flow' },
  { advisorName: 'Alex Johnson', declineRate: '18%', trend: '↑ 2% week-over-week', alert: 'Capacity constraints likely' },
  { advisorName: 'Nina Patel', declineRate: '5%', trend: '↓ 1% week-over-week', alert: 'Healthy baseline' },
];
