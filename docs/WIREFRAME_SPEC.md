# React Wireframe Spec — C-Suite Advisory Marketplace MVP

## Objective

Create a React wireframe prototype for a C-Suite advisory marketplace MVP.

The goal is design guidance only. Build a clickable front-end prototype using stubbed/mock data. Do not implement backend APIs, authentication, payments, database logic, or real integrations.

This prototype should help evaluate:
- page layout
- navigation flow
- advisor discovery UX
- advisor profile structure
- booking journey
- advisor dashboard
- client dashboard
- admin moderation screens

Source PRD: C-Suite Advisory Marketplace MVP PRD.

## Tech Requirements

Use:
- React
- React Router
- TypeScript preferred if the project already uses it
- Existing project styling system if available

If no UI framework exists, use simple CSS modules or plain CSS.

Do not add heavy dependencies unless necessary.

## Hard Boundaries

Do not build:
- backend API calls
- real auth
- Stripe integration
- real calendar sync
- real video/meeting integration
- recording/transcription processing
- database layer
- server-side code

Use stub data only.

## Suggested Routes

```txt
/
/advisors
/advisors/:advisorId
/login
/register
/client
/client/bookings
/client/bookings/:bookingId
/advisor
/advisor/profile
/advisor/availability
/advisor/bookings
/admin
/admin/advisors
/admin/bookings
/admin/reviews
```

## Main Navigation

Public nav:
- Logo
- Browse Advisors
- Join as Advisor
- Login
- Register

Authenticated client nav:
- Dashboard
- My Bookings
- Saved Advisors
- Account

Authenticated advisor nav:
- Dashboard
- Profile Editor
- Availability
- Bookings
- Earnings

Admin nav:
- Dashboard
- Advisor Moderation
- Bookings
- Reviews

Use visual mock role switching if useful. No real auth required.

## Stub Data

Create `/src/mocks/advisors.ts`.

Example advisor shape:

```ts
export type Advisor = {
  id: string;
  fullName: string;
  headline: string;
  location: string;
  timezone: string;
  profilePhotoUrl?: string;
  shortBio: string;
  longBio: string;
  executiveTags: string[];
  industries: string[];
  functions: string[];
  advisoryTopics: string[];
  achievements: {
    title: string;
    description: string;
    metric?: string;
  }[];
  caseStudies: {
    title: string;
    challenge: string;
    outcome: string;
  }[];
  sessionOfferings: {
    id: string;
    name: string;
    durationMinutes: number;
    price: number;
    currency: string;
    description: string;
  }[];
  availabilityPreview: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
};
```

Create 6-10 realistic advisors:
- former CFO
- CTO / engineering leader
- COO / operations expert
- CMO / GTM advisor
- HR / people leader
- climate / carbon market advisor

Create `/src/mocks/bookings.ts`.

```ts
export type Booking = {
  id: string;
  advisorName: string;
  clientName: string;
  sessionName: string;
  status:
    | "pending_payment"
    | "confirmed"
    | "completed"
    | "cancelled_by_client"
    | "cancelled_by_advisor"
    | "disputed"
    | "refunded";
  startTime: string;
  durationMinutes: number;
  price: number;
  currency: string;
  consentClient: boolean;
  consentAdvisor: boolean;
  transcriptStatus?: "not_started" | "processing" | "ready";
};
```

## Pages

### 1. Landing Page `/`

Purpose:
Explain the marketplace and drive users to browse advisors or join as advisor.

Sections:
- Hero
  - headline
  - short description
  - primary CTA: Browse Advisors
  - secondary CTA: Join as Advisor
- How it works
  - Discover
  - Book
  - Get actionable guidance
- Featured advisors
- Trust section
  - verified profiles
  - secure payment
  - consent-based recording
- CTA footer

## 2. Advisor Search Page `/advisors`

Purpose:
Help clients find suitable advisors.

Layout:
- Search bar at top
- Filter sidebar or filter drawer
- Advisor card grid/list

Filters:
- keyword
- industry
- function
- advisory topic
- price range
- language
- verified only
- availability soon

Advisor card should show:
- photo/avatar
- full name
- headline
- executive tags
- industries
- advisory topics
- price starting from
- rating/review count
- verified badge
- View Profile button

No real filtering required, but simple client-side filtering is acceptable.

## 3. Advisor Profile Page `/advisors/:advisorId`

Purpose:
Show rich advisor profile and booking CTA.

Sections:
- Profile hero
  - photo
  - name
  - headline
  - location/timezone
  - verified badge
  - rating
  - Book Session button
- Advisory topics
- Session offerings
- Experience summary
- Achievements
- Case studies
- Ideal clients
- Availability preview
- Reviews
- Disclaimer box

Booking CTA:
Clicking “Book Session” may open a modal or navigate to a booking section on the same page.

Booking modal should show:
- session type selection
- available slot selection
- booking summary
- consent notice
- Continue to Checkout button

No real payment required.

## 4. Login Page `/login`

Purpose:
Static wireframe only.

Fields:
- email
- password
- login button
- Google login placeholder
- forgot password placeholder
- link to register

## 5. Register Page `/register`

Purpose:
Allow user to choose client or advisor role.

Fields:
- full name
- email
- password
- role selector: Client / Advisor
- create account button

Advisor registration should visually suggest continuing to onboarding/profile setup.

## 6. Client Dashboard `/client`

Purpose:
Client home after login.

Sections:
- Welcome summary
- Upcoming bookings
- Past sessions
- Pending reviews
- Recommended advisors
- Saved advisors placeholder

Booking cards should show:
- advisor name
- session type
- time
- status
- View Details button

## 7. Client Bookings `/client/bookings`

Purpose:
List client’s bookings.

Tabs:
- Upcoming
- Past
- Cancelled
- Disputed

Each row/card:
- advisor
- session
- date/time
- status
- price
- action

## 8. Booking Detail `/client/bookings/:bookingId`

Purpose:
Show session state, consent, transcript, review flow.

Sections:
- Booking summary
- Advisor/client info
- Meeting link placeholder
- Consent status
- Recording/transcript status
- Payment summary
- Review form placeholder
- Dispute/refund info box

Consent UI:
- client consent checkbox
- advisor consent status indicator
- warning that recording/transcript requires consent

## 9. Advisor Dashboard `/advisor`

Purpose:
Advisor’s operational overview.

Sections:
- Profile completion card
- Upcoming bookings
- Pending profile tasks
- Revenue placeholder
- Reviews summary
- CTA to edit profile
- CTA to manage availability

## 10. Advisor Profile Editor `/advisor/profile`

Purpose:
Wireframe structured profile creation.

Use sectioned editor layout.

Sections:
- Identity
- Positioning
- Professional identity
- Experience history
- Industries/functions
- Achievements
- Case studies
- Advisory topics
- Session offerings
- Media/proof
- Trust indicators

Each section should have:
- section title
- brief helper copy
- stubbed fields
- Save Section button

No real saving required.

## 11. Availability Manager `/advisor/availability`

Purpose:
Advisor manages bookable slots.

Sections:
- timezone selector
- weekly availability grid
- slot duration
- buffer before/after
- minimum notice
- max bookings per day
- blackout dates
- preview of generated slots

Use static UI only.

## 12. Advisor Bookings `/advisor/bookings`

Purpose:
Advisor sees bookings.

Tabs:
- Upcoming
- Completed
- Cancelled
- Disputed

Actions:
- View booking
- Add session link
- Mark completed
- Upload recording placeholder

## 13. Admin Dashboard `/admin`

Purpose:
Admin operational overview.

Cards:
- pending advisor approvals
- upcoming bookings
- disputed bookings
- flagged reviews
- refund requests
- transcript processing issues

## 14. Advisor Moderation `/admin/advisors`

Purpose:
Admin reviews advisor profiles.

Table/list:
- advisor name
- headline
- status
- verification status
- profile completion
- submitted date
- actions: approve, reject, request changes, suspend

Use static buttons.

## 15. Booking Operations `/admin/bookings`

Purpose:
Admin monitors bookings, payments, disputes.

Table:
- booking ID
- client
- advisor
- status
- payment status
- consent status
- refund status
- actions

## 16. Review Moderation `/admin/reviews`

Purpose:
Admin reviews flagged reviews.

Table/cards:
- advisor
- client
- rating
- review snippet
- status
- actions: approve, hide, flag

## Components to Create

Recommended structure:

```txt
src/
  components/
    layout/
      PublicLayout.tsx
      DashboardLayout.tsx
      AdminLayout.tsx
    common/
      Badge.tsx
      Card.tsx
      EmptyState.tsx
      SectionHeader.tsx
      StatCard.tsx
      Tabs.tsx
    advisors/
      AdvisorCard.tsx
      AdvisorFilters.tsx
      AdvisorProfileHero.tsx
      SessionOfferingCard.tsx
      AchievementList.tsx
      CaseStudyList.tsx
      BookingModal.tsx
    bookings/
      BookingCard.tsx
      BookingStatusBadge.tsx
      ConsentPanel.tsx
      TranscriptStatusPanel.tsx
    advisorDashboard/
      ProfileCompletionCard.tsx
      AvailabilityPreview.tsx
      ProfileEditorSection.tsx
    admin/
      AdminStatGrid.tsx
      ModerationTable.tsx
```

## Visual Direction

Tone:
- premium
- professional
- trustworthy
- clean marketplace UX

Prefer:
- white/light background
- card-based layouts
- strong spacing
- subtle borders
- clear CTAs
- badges for verification, expertise, status
- dashboard sidebar for authenticated pages

Avoid:
- playful visuals
- overly dense admin tables
- too many colors
- building final production styling

## Interaction Notes

Basic interactions are enough:
- filter inputs can update local mock state
- booking modal can open/close
- tabs can switch local views
- profile editor sections can expand/collapse
- admin buttons can show disabled/static states

No persistence required.

## Booking Status Display

Use clear status badges:

```txt
pending_payment
confirmed
completed
cancelled_by_client
cancelled_by_advisor
disputed
refunded
```

## Consent Display

Consent should be visually important.

Show:
- client consent
- advisor consent
- recording allowed or blocked
- transcript status

Example states:
- Recording disabled: missing consent
- Recording allowed: both consented
- Transcript processing
- Transcript ready

## Deliverable

Codex should create a working React wireframe prototype with:
- all routes above
- stub data
- reusable components
- simple responsive layout
- no backend assumptions
- no real API calls

## Acceptance Criteria

The implementation is acceptable if:

- User can navigate between public, client, advisor, and admin pages
- Advisor search page displays realistic advisor cards
- Advisor profile page displays rich profile sections
- Booking modal or booking flow is visible
- Client dashboard shows bookings and post-session states
- Advisor dashboard shows profile and availability management
- Admin dashboard shows moderation and operations screens
- All data is stubbed locally
- No backend integration is attempted
- Code is organized so real APIs can replace mock data later
