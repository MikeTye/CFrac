# Advisor Wireframe Build List (Implementation Order + Mock Payloads)

## A. Auth & Onboarding
1. `AdvisorSignupPage` — `profile.json`, `notifications.json`
2. `AdvisorEmailVerificationPage` — `profile.json`
3. `AdvisorKYCOrIdentityPage` — `profile.json`
4. `AdvisorProfileSetupPage` — `profile.json`
5. `AdvisorAvailabilitySetupPage` — `availability.json`
6. `AdvisorOnboardingChecklistPage` — `profile.json`, `availability.json`, `notifications.json`

## B. Operational Dashboard
7. `AdvisorHomeDashboardPage` — `appointments.json`, `payments.json`, `notifications.json`
8. `AdvisorCalendarPage` — `availability.json`, `appointments.json`
9. `AdvisorAppointmentsListPage` — `appointments.json`, `payments.json`

## C. Appointment Lifecycle
10. `AdvisorAppointmentDetailPage` — `appointments.json`, `session-notes.json`, `transcripts.json`
11. `AdvisorPreSessionChecklistPage` — `appointments.json`, `notifications.json`
12. `AdvisorSessionRoomPage` — `appointments.json`, `transcripts.json`
13. `AdvisorSessionNotesEditorPage` — `session-notes.json`, `appointments.json`

## D. Post-Session Closure
14. `AdvisorTranscriptReviewPage` — `transcripts.json`, `appointments.json`
15. `AdvisorSessionSummaryPage` — `session-notes.json`, `appointments.json`
16. `AdvisorInvoiceOrPaymentStatusPage` — `payments.json`, `appointments.json`
17. `AdvisorAppointmentClosurePage` — `appointments.json`, `payments.json`, `transcripts.json`
18. `AdvisorHistoricalRecordsPage` — `appointments.json`, `session-notes.json`, `transcripts.json`, `payments.json`

## E. Edge/Support Flows
19. `RescheduleOrCancellationPage` — `appointments.json`, `advisor-seed-scenarios.json`
20. `NoShowResolutionPage` — `appointments.json`, `advisor-seed-scenarios.json`
21. `DisputeOrEscalationPage` — `disputes.json`, `appointments.json`, `advisor-seed-scenarios.json`
