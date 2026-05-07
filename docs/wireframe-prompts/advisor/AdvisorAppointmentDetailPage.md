# AdvisorAppointmentDetailPage — Implementation Prompt

## Objective
Build `AdvisorAppointmentDetailPage` as an advisor-facing wireframe aligned to PRD booking and trust workflow.

## Inputs
- `/mocks/advisor/appointments.json`
- `/mocks/advisor/session-notes.json`
- `/mocks/advisor/transcripts.json`
- `/mocks/advisor/payments.json`
- `/mocks/advisor/notifications.json`

## UI sections/components
- Page header + status badge.
- Primary workflow panel.
- Right rail: alerts/next actions.
- Event timeline/audit snippets where relevant.

## Actions/events
- Load payloads.
- Trigger page-specific primary CTA and secondary CTA.
- Emit analytics event: `advisor_ui_action` with `page`, `cta`, `appointment_id?`.

## Validation rules
- Required fields block submit with inline errors.
- Enum values must map to known status badges.
- Timestamp rendering must be timezone-aware.

## State transitions
- Respect canonical lifecycle: `invited → registered → profile_pending → available → booked → in_session → session_completed → payment_pending → payment_confirmed → closed`.
- Exception overlays: `cancelled`, `no_show`, `disputed` route to support flow.
- If transcript action exists: block finalize before `session_completed`.
- If closure action exists: block close until payment is `confirmed`.

## Empty/loading/error states
- Loading skeleton for all data panels.
- Empty state with "No records" messaging and recovery CTA.
- Error state with retry and support escalation link.
