# Advisor Workflow Stages, State Transitions, and Constraints

Source PRD: `docs/revised_advisory_booking_prd_v2.md`.

## 1) Explicit workflow stages parsed from PRD

## Stage 0 — Advisor Invite & Account Access
- Platform invites advisor (or advisor self-registers).
- Advisor creates credentials and verifies email.
- Role is `advisor`.

## Stage 1 — Onboarding & Trust Setup
- Advisor identity/KYC evidence (if enabled by compliance policy).
- Advisor profile drafting: bio, expertise, case records, documents, tier evidence.
- Offerings + pricing defined.
- Availability configured (recurring windows, durations, buffers, notice, blackout, max/day).
- Optional calendar busy-sync connection.
- Moderation assigns initial tier (Diamond/Platinum/Gold/Silver).
- Profile transitions from draft to published/available.

## Stage 2 — Intake Review
- Client submits intake + escrow deposit + platform NDA auto-executes.
- Advisor receives intake queue item with 48-hour response SLA.
- Advisor accepts or declines with required written reason when declining.
- Auto-decline if SLA expires.

## Stage 3 — Booking Confirmation
- After intake accepted, client selects slot.
- Slot held during checkout.
- Payment attempted with deposit offset.
- On payment success: booking confirmed and canonical meeting room created.

## Stage 4 — Pre-Join Trust Gate
- Consent collected from both parties per booking.
- If dual-consent policy unmet, recording/transcript remain disabled.
- Booking transitions to ready-to-join only when trust prerequisites are met.

## Stage 5 — Session Execution
- Advisor and client join platform-owned room.
- Booking presence and timeline events captured.
- Session moves to in-progress and later completed.

## Stage 6 — Post-Session Artifacts
- Transcript generated asynchronously.
- Session summary generated (decisions, actions, risks).
- Advisor reviews notes/transcript and finalizes advisor-side notes.

## Stage 7 — Payment Closure
- Payment settles/confirmed for advisor payout lifecycle.
- If pending/delayed, closure blocked until confirmed.

## Stage 8 — Closure & Archive
- Appointment closed after completion + payment confirmed + artifact finalization gates.
- Record becomes historical and searchable.

## Stage 9 — Exceptions & Support
- Reschedule/cancel flow.
- No-show resolution.
- Dispute/escalation with audit trail.

---

## 2) Canonical advisor journey map (status model)

Primary advisor lifecycle:

`invited` → `registered` → `profile_pending` → `available` → `booked` → `in_session` → `session_completed` → `payment_pending` → `payment_confirmed` → `closed`

### Entry/exit rules per status

1. **invited**
   - Enter: advisor invitation created.
   - Exit to `registered`: account creation + email verification completed.

2. **registered**
   - Enter: auth account active.
   - Exit to `profile_pending`: onboarding started but profile not publish-ready.

3. **profile_pending**
   - Required: identity step (if policy on), profile core fields, pricing, availability.
   - Exit to `available`: moderation/onboarding checklist marked complete; profile publishable.

4. **available**
   - Advisor appears bookable with valid slots.
   - Exit to `booked`: at least one booking reaches confirmed/ready state.

5. **booked**
   - Booking exists and session scheduled.
   - Exit to `in_session`: join presence indicates active session.

6. **in_session**
   - Active room attendance window.
   - Exit to `session_completed`: scheduled end + meeting events satisfy completion logic.

7. **session_completed**
   - Session done; artifacts may still be in progress.
   - Exit to `payment_pending`: payout/settlement pipeline initiated but not confirmed.

8. **payment_pending**
   - Funds not yet confirmed for closure gate.
   - Exit to `payment_confirmed`: settlement confirmed.

9. **payment_confirmed**
   - Financial closure condition satisfied.
   - Exit to `closed`: appointment closure action executed.

10. **closed**
   - Terminal advisor lifecycle state for that appointment; archived/searchable.

---

## 3) Mapping from PRD booking state machine to canonical advisor statuses

| PRD booking states | Canonical advisor status |
|---|---|
| `draft`, `intake_submitted`, `intake_pending_advisor_review`, `intake_accepted` | `available` (advisor active, handling pipeline) |
| `slot_held`, `payment_pending`, `confirmed`, `awaiting_consent`, `ready_to_join` | `booked` |
| `in_session` | `in_session` |
| `completed` | `session_completed` |
| payout/settlement not final (derived) | `payment_pending` |
| settlement final (derived) | `payment_confirmed` |
| closure recorded (derived) | `closed` |
| `cancelled_by_client`, `cancelled_by_advisor`, `no_show`, `disputed` | exception overlays (keep advisor profile `available`, appointment leaves happy path) |

---

## 4) Strict state machine constraints

1. **Transcript finalization gate**
   - Transcript cannot be finalized unless appointment state is `session_completed` (or PRD `completed`).

2. **Closure payment gate**
   - Appointment cannot transition to `closed` unless payment status is `confirmed`.

3. **Pending payment block**
   - If payment is `pending`, closure action is disabled and UI must surface explicit next action (e.g., “wait for settlement” or “resolve payout issue”).

4. **Consent recording gate**
   - Recording/transcription remains disabled until consent policy is met.

5. **Exception precedence**
   - `cancelled`, `no_show`, `disputed` states supersede normal progress and must route to support flows.
