# Advisor QA Acceptance Matrix (Page × State)

States:
`invited`, `registered`, `profile_pending`, `available`, `booked`, `in_session`, `session_completed`, `payment_pending`, `payment_confirmed`, `closed`, plus `cancelled/no_show/disputed` overlays.

| Page | Core states covered | Acceptance checks |
|---|---|---|
| AdvisorSignupPage | invited→registered | create account, validation, duplicate email handling |
| AdvisorEmailVerificationPage | registered | token verification, resend email flow |
| AdvisorKYCOrIdentityPage | profile_pending | required docs gate onboarding completion |
| AdvisorProfileSetupPage | profile_pending | required profile fields, pricing, tier evidence |
| AdvisorAvailabilitySetupPage | profile_pending/available | weekly windows, buffers, blackout validation |
| AdvisorOnboardingChecklistPage | profile_pending→available | all checklist items complete before publish |
| AdvisorHomeDashboardPage | available/booked/payment_pending | upcoming sessions, pending actions, payment alerts |
| AdvisorCalendarPage | available/booked | slot rendering + conflict blocks |
| AdvisorAppointmentsListPage | booked/in_session/session_completed | status filters and pagination |
| AdvisorAppointmentDetailPage | booked/in_session/session_completed | context, agenda, consent/transcript status |
| AdvisorPreSessionChecklistPage | booked | tech check + readiness attestations |
| AdvisorSessionRoomPage | in_session | join controls + state transitions |
| AdvisorSessionNotesEditorPage | session_completed | save drafts/final notes |
| AdvisorTranscriptReviewPage | session_completed | **cannot finalize before completion** |
| AdvisorSessionSummaryPage | session_completed | action items and follow-up integrity |
| AdvisorInvoiceOrPaymentStatusPage | payment_pending/payment_confirmed | settlement states and retries |
| AdvisorAppointmentClosurePage | payment_confirmed→closed | **closure blocked while payment pending** |
| AdvisorHistoricalRecordsPage | closed | archive search and retrieval |
| RescheduleOrCancellationPage | booked/cancelled | policy-aware reschedule/cancel outcomes |
| NoShowResolutionPage | no_show | evidence capture and resolution path |
| DisputeOrEscalationPage | disputed | dispute submission, timeline, admin handoff |

## End-to-end hard gates
1. Transcript finalize blocked unless `session_completed`.
2. Appointment closure blocked unless payment `confirmed`.
3. Payment `pending` surfaces explicit next-action banner.
