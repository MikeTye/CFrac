import {
  ADVISOR_STATUS,
  BOOKING_STATE,
  DISPUTE_STATUS,
  PAYMENT_STATUS,
  TRANSCRIPT_STATUS,
  type AdvisorStatus,
  type BadgeVariant,
  type NormalizedAppointment,
  type NormalizedDispute,
  type NormalizedPayment,
  type NormalizedTranscript,
} from './types';

const OVERLAY_STATES = new Set<keyof typeof OVERLAY_ROUTE_HINTS>([
  BOOKING_STATE.cancelled,
  BOOKING_STATE.no_show,
  BOOKING_STATE.disputed,
]);

function asEnumValue<T extends Record<string, string>>(value: unknown, enumMap: T, fieldName: string): T[keyof T] {
  if (typeof value !== 'string' || !Object.values(enumMap).includes(value)) {
    throw new Error(`Invalid ${fieldName}: ${String(value)}`);
  }
  return value as T[keyof T];
}

function requireString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Missing required field: ${fieldName}`);
  }
  return value;
}

export function normalizeAppointment(raw: unknown): NormalizedAppointment {
  const source = raw as Record<string, unknown>;
  const session = (source.session ?? {}) as Record<string, unknown>;

  return {
    appointment_id: requireString(source.appointment_id, 'appointment_id'),
    advisor_status: asEnumValue(source.advisor_status, ADVISOR_STATUS, 'advisor_status'),
    booking_state: asEnumValue(source.booking_state, BOOKING_STATE, 'booking_state'),
    payment_status: asEnumValue(source.payment_status, PAYMENT_STATUS, 'payment_status'),
    session: {
      starts_at: requireString(session.starts_at, 'session.starts_at'),
      ends_at: requireString(session.ends_at, 'session.ends_at'),
      provider_room_id: typeof session.provider_room_id === 'string' ? session.provider_room_id : undefined,
    },
  };
}

export function normalizePayment(raw: unknown): NormalizedPayment {
  const source = raw as Record<string, unknown>;
  return {
    appointment_id: requireString(source.appointment_id, 'appointment_id'),
    status: asEnumValue(source.status, PAYMENT_STATUS, 'payment.status'),
    invoice_id: typeof source.invoice_id === 'string' ? source.invoice_id : undefined,
    amount_cents: typeof source.amount_cents === 'number' ? source.amount_cents : undefined,
    currency: typeof source.currency === 'string' ? source.currency : undefined,
  };
}

export function normalizeTranscript(raw: unknown): NormalizedTranscript {
  const source = raw as Record<string, unknown>;
  return {
    status: asEnumValue(source.status, TRANSCRIPT_STATUS, 'transcript.status'),
    session_state_required_for_finalize: asEnumValue(
      source.session_state_required_for_finalize,
      ADVISOR_STATUS,
      'transcript.session_state_required_for_finalize',
    ),
    language: typeof source.language === 'string' ? source.language : 'en',
    segments: Array.isArray(source.segments) ? (source.segments as NormalizedTranscript['segments']) : [],
    edits_required: typeof source.edits_required === 'boolean' ? source.edits_required : false,
  };
}

export function normalizeDispute(raw: unknown): NormalizedDispute {
  const source = raw as Record<string, unknown>;
  return {
    dispute_id: requireString(source.dispute_id, 'dispute_id'),
    appointment_id: requireString(source.appointment_id, 'appointment_id'),
    status: asEnumValue(source.status, DISPUTE_STATUS, 'dispute.status'),
    reason_code: typeof source.reason_code === 'string' ? source.reason_code : undefined,
    opened_at: typeof source.opened_at === 'string' ? source.opened_at : undefined,
    last_updated_at: typeof source.last_updated_at === 'string' ? source.last_updated_at : undefined,
  };
}

const ADVISOR_STATUS_ORDER: AdvisorStatus[] = Object.values(ADVISOR_STATUS);

export function canFinalizeTranscript(appointment: NormalizedAppointment, transcript: NormalizedTranscript): boolean {
  const appointmentIndex = ADVISOR_STATUS_ORDER.indexOf(appointment.advisor_status);
  const requiredIndex = ADVISOR_STATUS_ORDER.indexOf(transcript.session_state_required_for_finalize);
  const sessionCompletedIndex = ADVISOR_STATUS_ORDER.indexOf(ADVISOR_STATUS.session_completed);
  return appointmentIndex >= sessionCompletedIndex && appointmentIndex >= requiredIndex;
}

export function canCloseAppointment(appointment: NormalizedAppointment, payment: NormalizedPayment): boolean {
  return appointment.appointment_id === payment.appointment_id && payment.status === PAYMENT_STATUS.confirmed;
}

export function getOverlayState(appointment: NormalizedAppointment): (typeof BOOKING_STATE)[keyof typeof BOOKING_STATE] | null {
  return OVERLAY_STATES.has(appointment.booking_state) ? appointment.booking_state : null;
}

export function getOverlayRoute(appointment: NormalizedAppointment): string | null {
  const overlayState = getOverlayState(appointment);
  if (!overlayState) {
    return null;
  }
  return OVERLAY_ROUTE_HINTS[overlayState] ?? null;
}

export function getTranscriptFinalizeGate(appointment: NormalizedAppointment, transcript: NormalizedTranscript): { enabled: boolean; reason: string; helperText: string } {
  const enabled = canFinalizeTranscript(appointment, transcript);
  if (enabled) {
    return {
      enabled,
      reason: 'Transcript can be finalized.',
      helperText: `Required state: ${transcript.session_state_required_for_finalize}. Current state: ${appointment.advisor_status}.`,
    };
  }

  return {
    enabled,
    reason: 'Finalize disabled until session is completed.',
    helperText: `Required state: ${transcript.session_state_required_for_finalize}. Current state: ${appointment.advisor_status}.`,
  };
}

export function getClosureGate(appointment: NormalizedAppointment, payment: NormalizedPayment): { enabled: boolean; reason: string; nextAction: string } {
  const enabled = canCloseAppointment(appointment, payment);
  if (enabled) {
    return { enabled, reason: 'Appointment can be closed.', nextAction: 'Close appointment now.' };
  }

  if (payment.status === PAYMENT_STATUS.pending) {
    return { enabled, reason: 'Closure disabled while payment is pending.', nextAction: 'Wait for settlement.' };
  }

  return { enabled, reason: 'Closure disabled because payout failed.', nextAction: 'Resolve payout issue.' };
}

export const STATUS_BADGE_VARIANTS: Record<string, BadgeVariant> = {
  [BOOKING_STATE.scheduled]: 'default',
  [BOOKING_STATE.in_progress]: 'default',
  [BOOKING_STATE.completed]: 'success',
  [BOOKING_STATE.cancelled]: 'warning',
  [BOOKING_STATE.no_show]: 'warning',
  [BOOKING_STATE.disputed]: 'danger',
  [PAYMENT_STATUS.pending]: 'warning',
  [PAYMENT_STATUS.confirmed]: 'success',
  [PAYMENT_STATUS.failed]: 'danger',
  [TRANSCRIPT_STATUS.processing]: 'default',
  [TRANSCRIPT_STATUS.ready_for_review]: 'warning',
  [TRANSCRIPT_STATUS.finalized]: 'success',
  [DISPUTE_STATUS.open]: 'warning',
  [DISPUTE_STATUS.under_review]: 'warning',
  [DISPUTE_STATUS.resolved]: 'success',
  [DISPUTE_STATUS.rejected]: 'default',
};

export const OVERLAY_ROUTE_HINTS: Partial<Record<(typeof BOOKING_STATE)[keyof typeof BOOKING_STATE], string>> = {
  [BOOKING_STATE.cancelled]: '/advisor/overlay/cancellation-resolution',
  [BOOKING_STATE.no_show]: '/advisor/overlay/no-show-resolution',
  [BOOKING_STATE.disputed]: '/advisor/overlay/dispute-escalation',
};
