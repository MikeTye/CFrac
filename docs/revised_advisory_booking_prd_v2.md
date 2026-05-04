# C-Suite Advisory Marketplace MVP — Revised PRD

## 1. Executive Summary

### What the product is
A focused advisory booking platform where clients discover, evaluate, book, pay for, and attend advisory sessions with experienced C-suite professionals and senior operators.

### Core product stance
The platform must own the booking record, session room creation, consent capture, recording/transcription workflow, and post-session audit trail. It should **not** depend on the advisor or client bringing their own meeting link for standard sessions.

### Key differentiators
Beyond booking infrastructure, the platform differentiates through:
- a tier-based advisor ranking system (Diamond → Platinum → Gold → Silver) grounded in verified credentials and outcomes, not algorithmic scoring
- a structured pre-session intake and escrow flow that protects both parties before a session is accepted
- context-aware matching using embeddings over advisor war stories and case records, not just keyword search
- a durable session history and post-session artifact layer that turns each session into a persistent, actionable record

### Why the trust infrastructure matters
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
- advisors can upload supporting documents (CV, board credentials, press, case studies)
- advisors can author structured case records: problem context, approach, measurable outcome, timeframe
- case records can optionally be corroborated by a named counterparty (former CEO, board member, co-founder)
- profile content — including case records and war stories — is embedded for semantic matching at ingestion

## 7.2a Advisor tier system
Advisors are assigned a tier based on verified credentials reviewed during onboarding and updated as session history accrues.

### Tier definitions
- **Diamond** — multiple successful exits or IPO experience; active board seats; minimum VP-level verified track record across two or more institutions
- **Platinum** — full P&L ownership; Series C or later operator; significant institutional role with documented outcomes
- **Gold** — C-suite or equivalent at Series B or later; at least one verifiable outcome in their domain
- **Silver** — VP-level or equivalent; minimum one institutional role; strong domain specialisation

### Tier rules
- tier is assigned by the platform moderation team at onboarding, not self-reported
- tier can be upgraded as verified session history, review scores, and case record corroboration accumulate
- tier is visible on the advisor card and filters in search
- Diamond and Platinum advisors have access to higher escrow deposit requirements, giving them stronger intake filtering
- tier does not affect session pricing — advisors set their own rates

## 7.3 Search and discovery
- clients can search by keyword and structured filters
- results show tier, experience depth, advisory topics, pricing, rating, and near-term availability
- profile content supports semantic search via embeddings over case records, war stories, and uploaded documents
- clients can describe their problem in plain language; the platform surfaces advisors whose documented experience most closely matches the situation — not just title or topic keywords
- search results can be filtered by tier, function, industry, price range, and availability window
- before submitting a case, clients see a preview of likely-matching advisors to set expectations and reduce low-quality submissions

## 7.4 Booking and pre-session intake
- client selects session type and target advisor
- before slot selection, client submits a structured case intake:
  - problem statement (guided, short-form)
  - company stage and context
  - what a good outcome looks like
  - up to one supporting document upload
- on submission, a platform-level mutual NDA auto-executes covering both parties for the pre-session disclosure period — not negotiable, not custom, standard platform confidentiality
- a deposit is collected at intake submission and held in escrow (amount scales by advisor tier)
- the advisor receives the case intake and has a defined acceptance window (default: 48 hours) to accept or decline
- if the advisor does not respond within the window, the case is auto-declined and the full deposit is returned to the client
- if the advisor declines, the client receives a full deposit refund plus a brief written reason from the advisor; the platform auto-suggests alternative advisors and the deposit can roll over to a new submission rather than reverting
- if the advisor accepts, the client is prompted to select a slot and complete payment; the deposit applies toward the session fee
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

## 7.6a Post-session artifacts and session history
- after each session, the platform generates a structured post-session artifact attached to the booking record:
  - AI-assisted summary of the session
  - named decisions or conclusions reached
  - action items with owners and suggested timeframes
  - named risks or open questions flagged during the session
- the artifact is reviewed and optionally annotated by the client before being finalised
- the artifact — not just the transcript — forms part of the advisor's verifiable track record over time
- advisors with consistently high-quality session artifacts (as reflected in reviews) receive a signal distinct from star ratings, visible on their profile
- clients accumulate a running session history: past advisors, topics covered, decisions made, follow-up actions — accessible from the client dashboard
- if a client books a repeat session with the same advisor, the platform surfaces a brief from prior sessions so the advisor can prepare with context

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
- intake_submitted
- intake_pending_advisor_review
- intake_declined
- intake_accepted
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
- `intake_submitted` means the case brief and deposit have been received; NDA has auto-executed
- `intake_pending_advisor_review` is active during the 48-hour acceptance window
- `intake_declined` triggers full deposit refund and written reason from advisor
- `intake_accepted` means advisor has accepted; client proceeds to slot selection and payment
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
- escrow-held deposit with clear refund policy on advisor decline
- platform-level mutual NDA covering pre-session disclosure

## 9.1a Escrow policy
- deposit amount is set per advisor tier (Diamond highest, Silver lowest)
- deposit is held by the platform from intake submission until session completion or decline
- on advisor decline: full deposit refunded, written reason required from advisor, alternative advisors suggested
- on advisor acceptance followed by client cancellation: deposit handling follows the standard cancellation policy
- on session completion: deposit is applied toward the session fee
- advisors who decline an excessive proportion of intakes without written reason may be reviewed by admin

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
- rich advisor profiles with document upload and case records
- advisor tier assignment and moderation
- search and filters including tier filter
- semantic search over case records and war stories
- session offerings and pricing
- native availability management
- optional external calendar busy-sync
- structured client case intake form
- platform-level auto-executing mutual NDA on intake submission
- escrow deposit collection and management
- 48-hour advisor acceptance window with auto-decline
- written decline reason requirement
- alternative advisor suggestion on decline
- booking and slot locking
- Stripe payment with deposit offset
- platform-created meeting room
- pre-join consent capture
- recording/transcript workflow
- structured post-session artifact (summary, decisions, actions, risks)
- client session history dashboard
- review flow
- admin dispute and moderation tools
- advisor tier moderation queue

## Nice-to-have
- Google OAuth
- pre-session advisor brief for repeat bookings
- deposit rollover to alternative advisor on decline
- artifact quality signal on advisor profile (distinct from star rating)
- case record corroboration by named counterparty
- semantic matching preview before intake submission
- rescheduling flow
- saved advisors
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
2. Advisor search page (with tier filter and semantic search)
3. Advisor profile page (with tier badge, case records, session artifact quality signal)
4. Sign in / sign up

## Advisor authenticated
5. Advisor onboarding (including tier evidence submission)
6. Advisor profile editor (including case record authoring and document upload)
7. Session offerings and pricing
8. Availability manager
9. Calendar connections
10. Advisor bookings dashboard
11. Intake review queue (incoming case briefs with accept/decline + written reason)
12. Booking detail with join flow, consent state, transcript state

## Client authenticated
13. Client dashboard with session history (past advisors, topics, decisions, actions)
14. Case intake form and intake status tracker
15. Checkout page
16. Booking detail page
17. Join session page
18. Past session details — full artifact (summary, decisions, actions, risks), transcript, review

## Admin
19. Admin dashboard
20. Advisor moderation queue (including tier assignment and upgrade review)
21. Booking operations (including intake and escrow state)
22. Dispute review console
23. Recording/transcript audit view
24. Advisor decline-rate monitoring

---

## 13. Risks & Assumptions (Revised)

## Assumptions
- advisors will accept platform-hosted sessions if the UX is simple
- native availability plus optional busy-sync is sufficient for MVP
- manual moderation is acceptable in early stage for tier assignment
- summaries and transcript generation can be asynchronous
- a platform-level standard mutual NDA is legally sufficient for pre-session disclosure in primary target markets
- advisors will provide a written decline reason if the UX makes it easy and non-punitive
- early advisor cohort sourced from founders' own networks provides sufficient seed quality to establish tier credibility

## Risks
- meeting infrastructure adds cost and engineering complexity
- consent and recording rules vary by region and must be handled carefully
- calendar edge cases can still cause support tickets
- advisors may resist a fully platform-controlled experience if onboarding is too rigid
- escrow deposit may deter early clients if amount is perceived as high relative to session cost
- intake form quality depends on client effort; poorly written briefs reduce advisor willingness to accept
- tier assignment is a manual bottleneck at scale; criteria must be documented clearly to ensure consistency
- advisors who decline frequently may be gaming the intake system; monitoring required
- NDA enforceability varies by jurisdiction; legal review required before launch in markets outside primary geography

## Risk mitigation
- make external meeting links unavailable by default
- keep calendar sync optional
- start with one supported meeting provider
- start with one supported calendar provider set
- define a clear dispute policy for hosted vs non-hosted sessions
- calibrate deposit amounts by tier with early advisors before launch
- design intake form with guided fields and a character limit to keep submissions triage-friendly
- document tier criteria explicitly and publish them to advisors and clients for transparency
- implement advisor decline-rate monitoring and admin review threshold from day one
- seek legal review on platform NDA template before launch; flag jurisdiction-specific risks

---

## 14. Delivery Plan (Revised)

## Phase 1 — foundation
- auth
- roles
- advisor profile CRUD with document upload and case record authoring
- public profiles with tier badge display
- session offerings
- pricing

## Phase 2 — discovery
- search with tier filter
- structured filters
- ranking
- semantic search embeddings over case records and profile content
- seed data from founding network

## Phase 3 — scheduling
- native availability
- slot generation
- timezone support
- blackout dates
- optional calendar busy-sync

## Phase 4 — intake and escrow
- structured client case intake form
- platform-level auto-executing mutual NDA
- escrow deposit collection
- advisor intake review queue with accept/decline and written reason
- 48-hour acceptance window with auto-decline and auto-refund
- alternative advisor suggestion on decline
- matching preview before intake submission

## Phase 5 — transaction and meeting orchestration
- slot hold post-acceptance
- Stripe checkout with deposit offset
- booking confirmation
- platform-created room
- join tokens and access rules

## Phase 6 — trust workflow
- consent capture
- recording/transcript pipeline
- structured post-session artifact generation (summary, decisions, actions, risks)
- client session history
- repeat-booking advisor brief
- review flow

## Phase 7 — operations and tier management
- admin moderation
- advisor tier assignment and upgrade queue
- advisor decline-rate monitoring
- disputes
- refund handling
- analytics

---

## 15. Final Product Recommendation

For this marketplace, the product should be designed around two principles:

**If the platform takes payment and promises trust, it should also control the session environment for standard bookings.**

**If the platform promises quality, it should verify credentials, structure the intake, and make outcomes visible — not just surface profiles.**

That means:
- build your own booking/scheduling domain
- support advisor availability inside the platform
- optionally sync busy times from external calendars
- create and own the meeting room per booking
- capture consent in-product
- store the session audit trail against the booking
- use external meeting links only as an exception, not the default
- assign advisor tiers through a human-reviewed moderation process, not self-reporting
- run a structured intake and escrow flow before any slot is confirmed
- auto-execute a platform-level mutual NDA on case submission to protect pre-session disclosure
- enforce an advisor acceptance window to protect clients from limbo
- generate and store structured post-session artifacts so each session compounds into verifiable track record
- use embeddings over war stories and case records to match on situation, not just title
