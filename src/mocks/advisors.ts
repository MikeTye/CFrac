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

export const advisors: Advisor[] = [
  {
    id: 'nina-cfo',
    fullName: 'Nina Patel',
    headline: 'Former CFO at Series D fintech; capital strategy expert',
    location: 'New York, USA',
    timezone: 'America/New_York',
    shortBio: 'Helps founders tighten unit economics and prepare board-ready forecasts.',
    longBio: 'Nina scaled finance orgs from 4 to 70 people and led three debt raises totaling $220M. She advises on cash discipline, investor updates, and FP&A operating cadence.',
    executiveTags: ['Former CFO', 'Board Reporting', 'Fundraising'],
    industries: ['Fintech', 'SaaS'],
    functions: ['Finance', 'Strategy'],
    advisoryTopics: ['Forecasting', 'Burn Reduction', 'Board Narratives'],
    achievements: [
      { title: 'Cut Burn', description: 'Reduced monthly burn by redesigning GTM spend governance.', metric: '28% in 2 quarters' },
      { title: 'Debt Raise', description: 'Led lender diligence and covenant package.', metric: '$120M facility' },
    ],
    caseStudies: [
      { title: 'Marketplace Margin Reset', challenge: 'Gross margin volatility due to promos.', outcome: 'New pricing model lifted margin by 9 pts.' },
    ],
    sessionOfferings: [
      { id: 'cfo-1', name: 'Finance Systems Audit', durationMinutes: 60, price: 400, currency: 'USD', description: 'Rapid assessment of finance stack and close process.' },
      { id: 'cfo-2', name: 'Board Deck Review', durationMinutes: 45, price: 320, currency: 'USD', description: 'Tighten metrics and story for investor confidence.' },
    ],
    availabilityPreview: ['Tue 10:00 AM', 'Wed 2:30 PM', 'Fri 11:00 AM'],
    rating: 4.9,
    reviewCount: 88,
    verified: true,
  },
  {
    id: 'omar-cto',
    fullName: 'Omar Liu',
    headline: 'Ex-CTO, cloud reliability and platform scaling',
    location: 'Seattle, USA',
    timezone: 'America/Los_Angeles',
    shortBio: 'Coaches engineering leaders through org design and incident maturity.',
    longBio: 'Omar led platform modernization serving 40M MAU and built SRE practices that reduced Sev-1 incidents by 60%.',
    executiveTags: ['Former CTO', 'Platform', 'SRE'],
    industries: ['B2B SaaS', 'Consumer Apps'],
    functions: ['Engineering', 'Infrastructure'],
    advisoryTopics: ['Architecture', 'Eng Org Design', 'Reliability'],
    achievements: [{ title: 'Uptime', description: 'Improved API availability.', metric: '99.98%' }],
    caseStudies: [{ title: 'Monolith to Services', challenge: 'Slow release cycle.', outcome: 'Deployment frequency improved 5x.' }],
    sessionOfferings: [{ id: 'cto-1', name: 'Architecture Review', durationMinutes: 60, price: 450, currency: 'USD', description: 'Map bottlenecks and define migration path.' }],
    availabilityPreview: ['Mon 9:00 AM', 'Thu 1:00 PM'],
    rating: 4.8,
    reviewCount: 64,
    verified: true,
  },
  {
    id: 'laura-coo',
    fullName: 'Laura Mendes',
    headline: 'Former COO focused on scaling operations and CX',
    location: 'Austin, USA',
    timezone: 'America/Chicago',
    shortBio: 'Operational playbooks for hypergrowth teams.',
    longBio: 'Laura built global support and fulfillment operations across three continents and mentored VP-level operators.',
    executiveTags: ['Former COO', 'Ops Playbooks'],
    industries: ['Ecommerce', 'Logistics'],
    functions: ['Operations', 'Customer Success'],
    advisoryTopics: ['SOPs', 'Service Design'],
    achievements: [{ title: 'NPS Gain', description: 'Redesigned escalation model.', metric: '+21 NPS' }],
    caseStudies: [{ title: 'Fulfillment Recovery', challenge: 'Peak season delays.', outcome: 'On-time delivery restored to 96%.' }],
    sessionOfferings: [{ id: 'coo-1', name: 'Ops Diagnostic', durationMinutes: 50, price: 300, currency: 'USD', description: 'Pinpoint friction across workflow handoffs.' }],
    availabilityPreview: ['Tue 3:00 PM', 'Thu 10:00 AM'],
    rating: 4.7,
    reviewCount: 52,
    verified: true,
  },
  {
    id: 'rachel-cmo',
    fullName: 'Rachel Kim',
    headline: 'CMO advisor for GTM and product-led growth',
    location: 'Chicago, USA',
    timezone: 'America/Chicago',
    shortBio: 'Supports GTM teams through segmentation and messaging.',
    longBio: 'Rachel led demand gen, lifecycle, and pricing experiments for B2B companies from seed to public.',
    executiveTags: ['CMO', 'GTM', 'PLG'],
    industries: ['SaaS', 'AI Tools'],
    functions: ['Marketing', 'Growth'],
    advisoryTopics: ['Positioning', 'Pipeline', 'Pricing'],
    achievements: [{ title: 'Pipeline', description: 'Built integrated campaign engine.', metric: '2.1x qualified pipeline' }],
    caseStudies: [{ title: 'Repositioning', challenge: 'Confused ICP narrative.', outcome: 'Win rate improved by 14 pts.' }],
    sessionOfferings: [{ id: 'cmo-1', name: 'GTM Sprint', durationMinutes: 60, price: 350, currency: 'USD', description: 'Define strategy for the next 90 days.' }],
    availabilityPreview: ['Wed 12:00 PM', 'Fri 9:30 AM'],
    rating: 4.8,
    reviewCount: 71,
    verified: false,
  },
  {
    id: 'alex-hr',
    fullName: 'Alex Johnson',
    headline: 'People leader specializing in org health and leadership coaching',
    location: 'Denver, USA',
    timezone: 'America/Denver',
    shortBio: 'Aligns talent strategy with growth stages.',
    longBio: 'Alex has designed leveling frameworks, compensation bands, and manager enablement programs for distributed teams.',
    executiveTags: ['CHRO Advisor', 'Leadership'],
    industries: ['Healthtech', 'SaaS'],
    functions: ['People', 'Talent'],
    advisoryTopics: ['Org Design', 'Performance Systems'],
    achievements: [{ title: 'Retention', description: 'Introduced manager coaching program.', metric: '+18% retention' }],
    caseStudies: [{ title: 'Hybrid Reset', challenge: 'Attrition among senior ICs.', outcome: 'Structured progression framework reduced churn.' }],
    sessionOfferings: [{ id: 'hr-1', name: 'Leadership Coaching', durationMinutes: 45, price: 280, currency: 'USD', description: 'Support managers during scale transitions.' }],
    availabilityPreview: ['Mon 2:00 PM', 'Thu 4:00 PM'],
    rating: 4.9,
    reviewCount: 48,
    verified: true,
  },
  {
    id: 'sofia-climate',
    fullName: 'Sofia Alvarez',
    headline: 'Climate markets advisor, carbon strategy and MRV',
    location: 'San Francisco, USA',
    timezone: 'America/Los_Angeles',
    shortBio: 'Guides teams launching climate and carbon initiatives.',
    longBio: 'Sofia has built carbon project portfolios and advised on procurement strategy, risk controls, and audit readiness.',
    executiveTags: ['Climate', 'Carbon Markets', 'ESG'],
    industries: ['Climate Tech', 'Energy'],
    functions: ['Sustainability', 'Strategy'],
    advisoryTopics: ['Carbon Credit Strategy', 'MRV', 'Regulatory Readiness'],
    achievements: [{ title: 'Portfolio Build', description: 'Structured diversified removal portfolio.', metric: '400k tCO2e' }],
    caseStudies: [{ title: 'Procurement Framework', challenge: 'Volatile offsets market.', outcome: 'Risk-adjusted buying framework adopted by procurement committee.' }],
    sessionOfferings: [{ id: 'climate-1', name: 'Carbon Strategy Review', durationMinutes: 60, price: 500, currency: 'USD', description: 'Assess pathways and portfolio quality signals.' }],
    availabilityPreview: ['Tue 11:30 AM', 'Fri 1:00 PM'],
    rating: 4.7,
    reviewCount: 39,
    verified: true,
  },
];
