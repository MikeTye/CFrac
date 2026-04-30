export type Booking = {
  id: string;
  advisorName: string;
  clientName: string;
  sessionName: string;
  status:
    | 'pending_payment'
    | 'confirmed'
    | 'completed'
    | 'cancelled_by_client'
    | 'cancelled_by_advisor'
    | 'disputed'
    | 'refunded';
  startTime: string;
  durationMinutes: number;
  price: number;
  currency: string;
  consentClient: boolean;
  consentAdvisor: boolean;
  transcriptStatus?: 'not_started' | 'processing' | 'ready';
};

export const bookings: Booking[] = [
  {
    id: 'bk-1001', advisorName: 'Nina Patel', clientName: 'Jordan Lee', sessionName: 'Board Deck Review', status: 'confirmed',
    startTime: '2026-04-28T15:00:00Z', durationMinutes: 45, price: 320, currency: 'USD', consentClient: true, consentAdvisor: true, transcriptStatus: 'ready',
  },
  {
    id: 'bk-1002', advisorName: 'Omar Liu', clientName: 'Jordan Lee', sessionName: 'Architecture Review', status: 'pending_payment',
    startTime: '2026-04-30T17:00:00Z', durationMinutes: 60, price: 450, currency: 'USD', consentClient: false, consentAdvisor: true, transcriptStatus: 'not_started',
  },
  {
    id: 'bk-1003', advisorName: 'Rachel Kim', clientName: 'Jordan Lee', sessionName: 'GTM Sprint', status: 'completed',
    startTime: '2026-04-15T16:00:00Z', durationMinutes: 60, price: 350, currency: 'USD', consentClient: true, consentAdvisor: true, transcriptStatus: 'processing',
  },
  {
    id: 'bk-1004', advisorName: 'Alex Johnson', clientName: 'Jordan Lee', sessionName: 'Leadership Coaching', status: 'disputed',
    startTime: '2026-04-10T18:00:00Z', durationMinutes: 45, price: 280, currency: 'USD', consentClient: true, consentAdvisor: false, transcriptStatus: 'not_started',
  },
];
