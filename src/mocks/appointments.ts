import type { Appointment } from '../components/appointments/AppointmentCard';

/* ─────────────────────────────────────────────
   ADVISOR PERSPECTIVE
   `client` field is populated; `advisor` omitted.
───────────────────────────────────────────── */

export const MOCK_UPCOMING_APPOINTMENTS: Appointment[] = [
    {
        id: 'b1',
        client: {
            name: 'Arjun Mehta',
            company: 'Kargo Labs',
            initials: 'AM',
        },
        date: '2025-09-18',
        timeStart: '14:00',
        timeEnd: '15:00',
        duration: 60,
        status: 'upcoming',
        topic: 'Series A fundraising narrative & investor targeting',
    },
    {
        id: 'b2',
        client: {
            name: 'Fatima Al-Rashid',
            company: 'Rho Payments',
            initials: 'FR',
        },
        date: '2025-09-24',
        timeStart: '10:00',
        timeEnd: '10:30',
        duration: 30,
        status: 'pending-confirmation',
        topic: 'GTM motion review for enterprise SaaS',
    },
];

export const MOCK_PAST_APPOINTMENTS: Appointment[] = [
    {
        id: 'b3',
        client: {
            name: 'Daniel Okonkwo',
            company: 'Safi Finance',
            initials: 'DO',
        },
        date: '2025-09-04',
        timeStart: '11:00',
        timeEnd: '12:30',
        duration: 90,
        status: 'completed',
        topic: 'Scaling ops infrastructure ahead of Series B',
        summaryReady: true,
        recordingReady: true,
    },
    {
        id: 'b4',
        client: {
            name: 'Mei-Ling Toh',
            company: 'Canopy Health',
            initials: 'MT',
        },
        date: '2025-08-19',
        timeStart: '15:00',
        timeEnd: '16:00',
        duration: 60,
        status: 'completed',
        topic: 'Regional expansion strategy for Southeast Asia',
        summaryReady: true,
        recordingReady: false,
    },
];

/* ─────────────────────────────────────────────
   CLIENT PERSPECTIVE
   `advisor` field is populated; `client` omitted.
───────────────────────────────────────────── */

export const MOCK_CLIENT_UPCOMING_APPOINTMENTS: Appointment[] = [
    {
        id: 'a1',
        advisor: {
            name: 'Marcus Holloway',
            title: 'Former CRO, Stripe EMEA',
            initials: 'MH',
            function: 'Revenue & GTM',
        },
        date: '2025-09-18',
        timeStart: '14:00',
        timeEnd: '15:00',
        duration: 60,
        status: 'upcoming',
        topic: 'Series A fundraising narrative & investor targeting',
    },
    {
        id: 'a2',
        advisor: {
            name: 'Priya Nair',
            title: 'Ex-CPO, Deliveroo',
            initials: 'PN',
            function: 'Product Strategy',
        },
        date: '2025-09-24',
        timeStart: '10:00',
        timeEnd: '10:30',
        duration: 30,
        status: 'pending-confirmation',
        topic: 'Product-market fit diagnostics for B2B SaaS',
    },
];

export const MOCK_CLIENT_PAST_APPOINTMENTS: Appointment[] = [
    {
        id: 'a3',
        advisor: {
            name: 'David Osei',
            title: 'Former COO, Flutterwave',
            initials: 'DO',
            function: 'Operations',
        },
        date: '2025-09-04',
        timeStart: '11:00',
        timeEnd: '12:30',
        duration: 90,
        status: 'completed',
        topic: 'Scaling ops infrastructure ahead of Series B',
        summaryReady: true,
        recordingReady: true,
    },
    {
        id: 'a4',
        advisor: {
            name: 'Sophie Marchand',
            title: 'Founding Partner, Climate Capital',
            initials: 'SM',
            function: 'Climate & ESG',
        },
        date: '2025-08-19',
        timeStart: '15:00',
        timeEnd: '16:00',
        duration: 60,
        status: 'completed',
        topic: 'Carbon credit strategy for early-stage climate startups',
        summaryReady: true,
        recordingReady: false,
    },
];