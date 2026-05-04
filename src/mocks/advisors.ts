export type AdvisorTier = 'Diamond' | 'Platinum' | 'Gold' | 'Silver';

export type Advisor = {
  id: string;
  fullName: string;
  headline: string;
  location: string;
  timezone: string;
  tier: AdvisorTier;
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

export type AdvisorIntake = {
  id: string;
  company: string;
  topic: string;
  problemStatement: string;
  status: 'intake_pending_advisor_review' | 'intake_accepted' | 'intake_declined';
};

export const advisors: Advisor[] = [
  {
    id: 'nina-cfo', fullName: 'Nina Patel', tier: 'Platinum', headline: 'Former CFO at Series D fintech; capital strategy expert', location: 'New York, USA', timezone: 'America/New_York', shortBio: 'Helps founders tighten unit economics and prepare board-ready forecasts.', longBio: 'Nina scaled finance orgs from 4 to 70 people and led three debt raises totaling $220M. She advises on cash discipline, investor updates, and FP&A operating cadence.', executiveTags: ['Former CFO', 'Board Reporting', 'Fundraising'], industries: ['Fintech', 'SaaS'], functions: ['Finance', 'Strategy'], advisoryTopics: ['Forecasting', 'Burn Reduction', 'Board Narratives'], achievements: [{ title: 'Cut Burn', description: 'Reduced monthly burn by redesigning GTM spend governance.', metric: '28% in 2 quarters' }, { title: 'Debt Raise', description: 'Led lender diligence and covenant package.', metric: '$120M facility' }], caseStudies: [{ title: 'Marketplace Margin Reset', challenge: 'Gross margin volatility due to promos.', outcome: 'New pricing model lifted margin by 9 pts.' }], sessionOfferings: [{ id: 'cfo-1', name: 'Finance Systems Audit', durationMinutes: 60, price: 400, currency: 'USD', description: 'Rapid assessment of finance stack and close process.' }, { id: 'cfo-2', name: 'Board Deck Review', durationMinutes: 45, price: 320, currency: 'USD', description: 'Tighten metrics and story for investor confidence.' }], availabilityPreview: ['Tue 10:00 AM', 'Wed 2:30 PM', 'Fri 11:00 AM'], rating: 4.9, reviewCount: 88, verified: true,
  },
  {
    id: 'omar-cto', fullName: 'Omar Liu', tier: 'Gold', headline: 'Ex-CTO, cloud reliability and platform scaling', location: 'Seattle, USA', timezone: 'America/Los_Angeles', shortBio: 'Coaches engineering leaders through org design and incident maturity.', longBio: 'Omar led platform modernization serving 40M MAU and built SRE practices that reduced Sev-1 incidents by 60%.', executiveTags: ['Former CTO', 'Platform', 'SRE'], industries: ['B2B SaaS', 'Consumer Apps'], functions: ['Engineering', 'Infrastructure'], advisoryTopics: ['Architecture', 'Eng Org Design', 'Reliability'], achievements: [{ title: 'Uptime', description: 'Improved API availability.', metric: '99.98%' }], caseStudies: [{ title: 'Monolith to Services', challenge: 'Slow release cycle.', outcome: 'Deployment frequency improved 5x.' }], sessionOfferings: [{ id: 'cto-1', name: 'Architecture Review', durationMinutes: 60, price: 450, currency: 'USD', description: 'Map bottlenecks and define migration path.' }], availabilityPreview: ['Mon 9:00 AM', 'Thu 1:00 PM'], rating: 4.8, reviewCount: 64, verified: true,
  },
];

export const advisorOfferings = advisors.flatMap((advisor) => advisor.sessionOfferings);

export const advisorIntakes: AdvisorIntake[] = [
  { id: 'int-1001', company: 'Northstar Bio', topic: 'Board narrative', problemStatement: 'Need help framing milestones ahead of Series B.', status: 'intake_pending_advisor_review' },
  { id: 'int-1002', company: 'Orbit Freight', topic: 'Ops scale', problemStatement: 'Delivery SLA slippage across two warehouses.', status: 'intake_accepted' },
  { id: 'int-1003', company: 'Ariya Labs', topic: 'Pricing', problemStatement: 'Unclear packaging for enterprise expansion.', status: 'intake_declined' },
];
