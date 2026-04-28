# C-Suite Advisory Marketplace MVP — Revised PRD

## 1. Executive Summary

### What the product is
A focused advisory booking platform where clients discover, evaluate, book, pay for, and attend advisory sessions with experienced C-suite professionals and senior operators.

### Core product stance
The platform must own the booking record, session room creation, consent capture, recording/transcription workflow, and post-session audit trail. It should **not** depend on the advisor or client bringing their own meeting link for standard sessions.

### Why this matters
If the session happens outside the platform, the platform loses control over:
- whether the correct participants joined
- whether consent was shown and captured before recording
- whether recording/transcript artifacts are retained consistently
- whether disputes can be reviewed using reliable evidence
- whether no-shows, shortened sessions, and abuse can be verified

### MVP recommendation
For MVP, build:
- platform-managed scheduling and bookings
- platform-managed meeting creation
- explicit consent capture before join
- platform-controlled recording/transcript pipeline
- post-session summary and dispute audit trail

Do **not** make external advisor-provided meeting links the default path.

---

## 2. Product Decision Summary

## 2.1 Meeting platform decision
**Recommended default:** platform-owned meeting rooms created per booking.

This can be implemented in one of two ways:

### Option A — Embedded video API / SDK (recommended)
Use a programmable video provider so the platform creates a unique room for each confirmed booking, controls join access, and manages recording/transcription through API.

**Why this is best**
- strongest control over trust and auditability
- consistent join experience
- easier to enforce participant identity and booking-to-room linkage
- easier to store recordings/transcripts against the booking
- better basis for disputes, refunds, moderation, and support

### Option B — Platform-created hosted meeting links from your own business account (acceptable fallback)
The platform creates the meeting on behalf of the booking using a provider account you control, then distributes the join details from inside the product.

**Important limitation**
This is better than letting advisors use their own Zoom/Meet links, but it is still weaker than a programmable video layer because storage, permissions, recording ownership, and product customization remain partly dependent on the third-party meeting product.

### Explicit non-recommendation
Do **not** allow “advisor enters their own meeting URL” as the normal flow in MVP.
At most, keep it as an admin-only exception path or future fallback.

---

## 3. Scheduling Strategy

## 3.1 Build your own scheduling domain
The platform should own:
- advisor availability rules
- generated bookable slots
- booking state machine
- conflict checks
- buffers
- timezone handling
- cancellation policy
- reschedule rules
- reminders and notifications

This is core marketplace logic and should live in your own system.

## 3.2 Calendar integration stance
**Recommended MVP:** one-way calendar integration for conflict prevention, not full external-calendar dependence.

Advisors should:
- set native availability in the platform
- optionally connect Google or Microsoft calendar
- have external events imported as busy blocks
- not require the external calendar to define all primary availability

### Why this is the right split
- advisors still need a simple marketplace-native availability setup
- you reduce overbooking by checking external busy times
- you avoid the complexity of deep bidirectional sync in MVP
- you keep scheduling understandable and supportable

## 3.3 Do you need an additional scheduling tool?
**Not necessarily.**

### Recommended
Build the scheduling engine in-house for MVP because it is central to:
- the advisor marketplace workflow
- slot locking during checkout
- consent and meeting creation triggers
- payout/refund logic
- dispute evidence

### When to use a scheduling tool
Use a scheduling product only if you want to accelerate UI or calendar integration, but keep your own booking records and lifecycle as the source of truth.

### Product stance
If a third-party scheduler is used, it must be a supporting component, not the core source of booking truth.

---

## 4. Recommended MVP Architecture

## 4.1 Core flow
1. Advisor creates profile
2. Advisor sets session offerings and availability rules
3. Advisor optionally connects calendar to import busy times
4. Client searches and selects advisor
5. Client selects a slot
6. Platform temporarily locks the slot
7. Client pays
8. On payment success, platform:
   - confirms booking
   - creates platform-owned meeting room
   - stores meeting metadata
   - sends notifications
9. Before join, both sides see consent language and booking terms
10. If required consent is provided, recording/transcription can proceed
11. After session, recording/transcript artifacts are attached to booking
12. Client and advisor receive summary/follow-up flow
13. Admin can review artifacts and logs if dispute occurs

## 4.2 Core systems
- auth and role management
- advisor profile system
- search and ranking
- availability + slot generation service
- booking service
- payment service
- meeting orchestration service
- consent service
- recording/transcript service
- notifications
- admin operations and dispute tools

---

## 5. Meeting Architecture Requirements

## 5.1 Booking-linked room creation
Each confirmed booking should generate exactly one canonical session room:
- unique room ID
- linked booking ID
- advisor ID
- client ID
- scheduled start/end time
- join token / access rules
- recording policy
- transcript policy
- consent requirements
- room status

## 5.2 Access control
The platform should control:
- who can join
- when they can join
- whether late join is allowed
- whether observers/admins can be added in exception cases
- whether re-entry is allowed

## 5.3 Consent enforcement
Consent should be captured per booking, with:
- advisor consent status
- client consent status
- consent timestamp
- consent policy version
- region/jurisdiction note if needed

### Recording rule
If policy is dual consent, recording/transcription must remain disabled unless both parties consent.

## 5.4 Session evidence and audit trail
Store:
- meeting created at
- participant join/leave timestamps
- consent events
- recording started/stopped events
- transcript status
- summary generated at
- admin review notes
- dispute status

## 5.5 External-link exception path
If you later support external links:
- mark booking as externally hosted
- require explicit acknowledgment that transcript/reviewability may be limited
- disable certain trust guarantees
- exclude such sessions from some dispute protections if needed by policy

---

## 6. Scheduling & Calendar Requirements

## 6.1 Advisor availability model
Advisors define:
- weekly recurring windows
- slot interval
- session durations supported
- minimum notice
- pre/post buffers
- maximum daily bookings
- blackout dates
- vacation periods

## 6.2 External calendar sync
Optional for advisors.

### MVP behavior
- connect Google/Microsoft calendar
- read busy events only
- do not expose event details publicly
- merge busy blocks with native platform availability
- re-check availability at checkout and again before confirmation

## 6.3 Slot generation rules
Generate slots from:
- advisor weekly windows
- supported session durations
- blocked times
- external busy periods
- existing bookings
- timezone-aware calculations

## 6.4 Source of truth
The platform database remains the source of truth for:
- whether the slot was offered
- whether it was locked
- whether it was paid
- whether it was confirmed
- which meeting room belongs to it

---

## 7. Functional Requirements (Revised)

## 7.1 Authentication and roles
- users can register and log in
- roles: advisor, client, admin
- advisors and clients have separate dashboards
- admins can review trust and dispute operations

## 7.2 Advisor profile system
- advisors can create rich profiles
- profiles can be draft/published
- advisors can define session offerings and pricing
- advisors can define availability
- advisors can optionally connect external calendar for conflict blocking

## 7.3 Search and discovery
- clients can search by keyword and structured filters
- results show experience depth, advisory topics, pricing, rating, and near-term availability
- profile content supports later semantic search

## 7.4 Booking
- client selects session type and slot
- slot is temporarily locked during checkout
- booking is confirmed only after successful payment
- booking owns the session room and trust workflow
- cancellation/refund rules are enforced against booking status

## 7.5 Meeting execution
- platform creates the room after payment confirmation
- both participants join through the platform booking page
- join access is tied to the booking and authenticated user
- recording/transcription is governed by consent policy
- session completion is tracked via meeting events plus booking schedule

## 7.6 Recording and transcription
- consent is explicit and stored
- recording cannot start when consent policy is unmet
- recording and transcript artifacts are linked to booking
- transcript access is restricted to participants and admins
- admin tools allow audit/review for disputes

## 7.7 Notifications
- booking confirmation
- reminders before session
- cancellation/refund notices
- transcript/summary ready notice
- review request

## 7.8 Admin
- review advisor profiles
- manage disputes
- view booking timeline and meeting audit events
- review refunds
- suspend users or advisors
- handle recording/transcript access exceptions

---

## 8. Booking State Machine (Revised)

### Booking states
- draft
- slot_held
- payment_pending
- confirmed
- awaiting_consent
- ready_to_join
- in_session
- completed
- cancelled_by_client
- cancelled_by_advisor
- no_show
- refund_pending
- refunded
- disputed
- dispute_resolved

### Important notes
- `confirmed` means payment succeeded and meeting room exists
- `awaiting_consent` applies when pre-join consent is still outstanding
- `ready_to_join` means the session is joinable under policy
- `in_session` is driven by actual meeting presence/events
- `completed` should consider both scheduled end and meeting events

---

## 9. Trust, Compliance, and Dispute Policy

## 9.1 Platform promise
For standard platform-hosted sessions, the platform can provide:
- auditable booking record
- auditable participant access
- auditable consent record
- auditable recording/transcript status
- evidence for refund/dispute review

## 9.2 Recording policy
- default policy should be explicit and visible before checkout
- policy should state whether sessions may be recorded
- policy should state who can access the transcript and summary
- policy should state retention period and dispute usage

## 9.3 Privacy and retention
Store recordings/transcripts privately with:
- booking-scoped access
- retention rules
- deletion policy
- admin exception path for trust/safety/legal review

## 9.4 Disclaimers
- advisory guidance is informational
- platform does not guarantee business outcomes
- regulated advice categories may require additional policy restrictions
- participants are informed about recording/transcript behavior before session

---

## 10. Recommended Build vs Buy Decisions

## 10.1 Build in-house
Build these in your own product:
- advisor availability model
- booking lifecycle
- payment linkage
- meeting orchestration rules
- consent model
- admin dispute tooling
- search and advisor profiles

## 10.2 Buy / use external service
Use managed providers for:
- video infrastructure
- recording/transcription infrastructure
- email delivery
- payment processing
- optional calendar integrations

## 10.3 Optional accelerator
A scheduler product can accelerate UI or calendar sync, but should not replace your own booking model.

---

## 11. Updated MVP Scope

## Must-have
- advisor/client auth
- rich advisor profiles
- search and filters
- session offerings and pricing
- native availability management
- optional external calendar busy-sync
- booking and slot locking
- Stripe payment
- platform-created meeting room
- pre-join consent capture
- recording/transcript workflow
- post-session summary record
- review flow
- admin dispute and moderation tools

## Nice-to-have
- Google OAuth
- advisor verification badge
- semantic search
- rescheduling flow
- saved advisors
- AI-generated summaries
- calendar write-back
- multi-currency

## Out of scope
- letting advisors fully control meeting hosting as the primary flow
- deep bidirectional sync across many calendar providers
- native mobile apps
- long-term consulting project workspace
- enterprise procurement workflows

---

## 12. UX Pages (Revised)

## Public
1. Landing page
2. Advisor search page
3. Advisor profile page
4. Sign in / sign up

## Advisor authenticated
5. Advisor onboarding
6. Advisor profile editor
7. Session offerings and pricing
8. Availability manager
9. Calendar connections
10. Advisor bookings dashboard
11. Booking detail with join flow, consent state, transcript state

## Client authenticated
12. Client dashboard
13. Checkout page
14. Booking detail page
15. Join session page
16. Past session details, summary, review

## Admin
17. Admin dashboard
18. Advisor moderation queue
19. Booking operations
20. Dispute review console
21. Recording/transcript audit view

---

## 13. Risks & Assumptions (Revised)

## Assumptions
- advisors will accept platform-hosted sessions if the UX is simple
- native availability plus optional busy-sync is sufficient for MVP
- manual moderation is acceptable in early stage
- summaries and transcript generation can be asynchronous

## Risks
- meeting infrastructure adds cost and engineering complexity
- consent and recording rules vary by region and must be handled carefully
- calendar edge cases can still cause support tickets
- advisors may resist a fully platform-controlled experience if onboarding is too rigid

## Risk mitigation
- make external meeting links unavailable by default
- keep calendar sync optional
- start with one supported meeting provider
- start with one supported calendar provider set
- define a clear dispute policy for hosted vs non-hosted sessions

---

## 14. Delivery Plan (Revised)

## Phase 1 — foundation
- auth
- roles
- advisor profile CRUD
- public profiles
- session offerings
- pricing

## Phase 2 — discovery
- search
- filters
- ranking
- seed data

## Phase 3 — scheduling
- native availability
- slot generation
- timezone support
- blackout dates
- optional calendar busy-sync

## Phase 4 — transaction + meeting orchestration
- slot hold
- Stripe checkout
- booking confirmation
- platform-created room
- join tokens/access rules

## Phase 5 — trust workflow
- consent capture
- recording/transcript pipeline
- summary records
- review flow

## Phase 6 — operations
- admin moderation
- disputes
- refund handling
- analytics

---

## 15. Final Product Recommendation

For this marketplace, the product should be designed around this principle:

**If the platform takes payment and promises trust, it should also control the session environment for standard bookings.**

That means:
- build your own booking/scheduling domain
- support advisor availability inside the platform
- optionally sync busy times from external calendars
- create and own the meeting room per booking
- capture consent in-product
- store the session audit trail against the booking
- use external meeting links only as an exception, not the default
