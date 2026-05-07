export const ADVISOR_STATUS = {
  invited: 'invited',
  registered: 'registered',
  profile_pending: 'profile_pending',
  available: 'available',
  booked: 'booked',
  in_session: 'in_session',
  session_completed: 'session_completed',
  payment_pending: 'payment_pending',
  payment_confirmed: 'payment_confirmed',
  closed: 'closed',
} as const;

export const BOOKING_STATE = {
  scheduled: 'scheduled',
  in_progress: 'in_progress',
  completed: 'completed',
  cancelled: 'cancelled',
  no_show: 'no_show',
  disputed: 'disputed',
} as const;

export const PAYMENT_STATUS = {
  pending: 'pending',
  confirmed: 'confirmed',
  failed: 'failed',
} as const;

export const TRANSCRIPT_STATUS = {
  processing: 'processing',
  ready_for_review: 'ready_for_review',
  finalized: 'finalized',
} as const;

export const DISPUTE_STATUS = {
  open: 'open',
  under_review: 'under_review',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;

export type AdvisorStatus = (typeof ADVISOR_STATUS)[keyof typeof ADVISOR_STATUS];
export type BookingState = (typeof BOOKING_STATE)[keyof typeof BOOKING_STATE];
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export type TranscriptStatus = (typeof TRANSCRIPT_STATUS)[keyof typeof TRANSCRIPT_STATUS];
export type DisputeStatus = (typeof DISPUTE_STATUS)[keyof typeof DISPUTE_STATUS];

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger';

export interface NormalizedAppointment {
  appointment_id: string;
  advisor_status: AdvisorStatus;
  booking_state: BookingState;
  payment_status: PaymentStatus;
  session: { starts_at: string; ends_at: string; provider_room_id?: string };
}

export interface NormalizedPayment {
  appointment_id: string;
  status: PaymentStatus;
  invoice_id?: string;
  amount_cents?: number;
  currency?: string;
}

export interface NormalizedTranscript {
  status: TranscriptStatus;
  session_state_required_for_finalize: AdvisorStatus;
  language?: string;
  segments?: Array<{ speaker: string; start_ms: number; end_ms: number; text: string }>;
  edits_required?: boolean;
}

export interface NormalizedDispute {
  dispute_id: string;
  appointment_id: string;
  status: DisputeStatus;
  reason_code?: string;
  opened_at?: string;
  last_updated_at?: string;
}
