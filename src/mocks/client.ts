export type IntakeStatus =
  | 'intake_draft'
  | 'intake_pending_advisor_review'
  | 'intake_accepted'
  | 'intake_declined'
  | 'slot_held'
  | 'ready_for_checkout';

export type Intake = {
  id: string;
  advisorId: string;
  advisorName: string;
  companyName: string;
  topic: string;
  objective: string;
  status: IntakeStatus;
  ndaRequired: boolean;
  escrowStatus: 'not_started' | 'captured' | 'released' | 'refunded';
};

export type SessionArtifact = {
  id: string;
  bookingId: string;
  summary: string;
  actionItems: string[];
  risks: string[];
  transcriptStatus: 'processing' | 'ready' | 'not_started';
  recordingStatus: 'processing' | 'ready' | 'not_started';
};

export type ClientProfile = {
  id: string;
  fullName: string;
  company: string;
  role: string;
};

export const clientProfile: ClientProfile = {
  id: 'cl-100',
  fullName: 'Maya Chen',
  company: 'Northstar Bio',
  role: 'Founder & CEO',
};

export const intakes: Intake[] = [
  { id: 'int-1001', advisorId: 'nina-cfo', advisorName: 'Nina Patel', companyName: 'Northstar Bio', topic: 'Board narrative', objective: 'Prepare a board-ready cash runway update for Series B.', status: 'intake_pending_advisor_review', ndaRequired: true, escrowStatus: 'captured' },
  { id: 'int-1002', advisorId: 'omar-cto', advisorName: 'Omar Liu', companyName: 'Northstar Bio', topic: 'Platform stability', objective: 'Reduce sev-1 incidents and improve incident playbook.', status: 'intake_accepted', ndaRequired: true, escrowStatus: 'captured' },
  { id: 'int-1003', advisorId: 'nina-cfo', advisorName: 'Nina Patel', companyName: 'Northstar Bio', topic: 'Pricing', objective: 'Pressure-test enterprise pricing tiers.', status: 'slot_held', ndaRequired: true, escrowStatus: 'captured' },
  { id: 'int-1004', advisorId: 'omar-cto', advisorName: 'Omar Liu', companyName: 'Northstar Bio', topic: 'Team structure', objective: 'Design EM staffing model for next 2 quarters.', status: 'intake_declined', ndaRequired: false, escrowStatus: 'refunded' },
  { id: 'int-1005', advisorId: 'nina-cfo', advisorName: 'Nina Patel', companyName: 'Northstar Bio', topic: 'Fundraising timeline', objective: 'Map raise milestones against burn and product roadmap.', status: 'ready_for_checkout', ndaRequired: true, escrowStatus: 'captured' },
];

export const sessionArtifacts: SessionArtifact[] = [
  { id: 'art-1', bookingId: 'bk-1001', summary: 'Aligned on investor update structure and KPI narrative.', actionItems: ['Finalize 13-week cash forecast', 'Rework board deck slide 6'], risks: ['Gross margin volatility remains high'], transcriptStatus: 'ready', recordingStatus: 'ready' },
  { id: 'art-2', bookingId: 'bk-1002', summary: 'Reviewed reliability roadmap and ownership model.', actionItems: ['Define on-call rotations', 'Set SLO targets by service'], risks: ['Observability gaps in payment service'], transcriptStatus: 'processing', recordingStatus: 'processing' },
  { id: 'art-3', bookingId: 'bk-1003', summary: 'Planned GTM sprint priorities for enterprise segment.', actionItems: ['Narrow ICP criteria', 'Draft enablement one-pager'], risks: ['Sales cycle assumptions unverified'], transcriptStatus: 'ready', recordingStatus: 'ready' },
  { id: 'art-4', bookingId: 'bk-1004', summary: 'Session under dispute; artifact access restricted pending review.', actionItems: ['Await trust-team decision'], risks: ['Consent mismatch flagged'], transcriptStatus: 'not_started', recordingStatus: 'not_started' },
];
