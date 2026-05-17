export type AdvisorTier = 'Diamond' | 'Platinum' | 'Gold' | 'Silver';

export type Advisor = {
    id: string;
    fullName: string;
    headline: string;
    location: string;
    timezone: string;
    tier: AdvisorTier;
    profilePhotoUrl?: string;
    introVideoUrl?: string;
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
        tier: 'Platinum',
        headline: 'Former CFO who led fintech fundraising and board readiness',
        location: 'New York, USA',
        timezone: 'America/New_York',
        profilePhotoUrl: `${import.meta.env.BASE_URL}advisors/advisor1.jpg`,
        introVideoUrl: '',
        shortBio: 'Helps founders prepare for institutional fundraising, board reporting, and finance discipline.',
        longBio:
            'Nina scaled finance teams from startup stage to late-stage growth, led major lender diligence, and helped founders build investor-grade forecasts, board narratives, and operating cadences.',
        executiveTags: ['Former CFO', 'Fundraising', 'Board Reporting'],
        industries: ['Fintech', 'SaaS', 'Marketplaces'],
        functions: ['Finance', 'Strategy', 'Operations'],
        advisoryTopics: ['Series A/B prep', 'Investor narrative', 'FP&A', 'Burn control'],
        achievements: [
            {
                title: 'Raised institutional debt',
                description: 'Led lender diligence, covenant design, and financial model preparation.',
                metric: '$120M facility',
            },
            {
                title: 'Reduced burn',
                description: 'Redesigned GTM spend governance and operating budget cadence.',
                metric: '28% reduction in 2 quarters',
            },
            {
                title: 'Built finance org',
                description: 'Scaled finance, FP&A, and accounting teams for late-stage operations.',
                metric: '4 → 70 people',
            },
        ],
        caseStudies: [
            {
                title: 'Marketplace margin reset',
                challenge: 'Gross margin volatility due to promo-heavy growth.',
                outcome: 'New pricing and budget governance lifted gross margin by 9 points.',
            },
        ],
        sessionOfferings: [
            {
                id: 'nina-1',
                name: 'Fundraising Readiness Review',
                durationMinutes: 60,
                price: 400,
                currency: 'USD',
                description: 'Review metrics, forecast, and investor narrative before a raise.',
            },
            {
                id: 'nina-2',
                name: 'Board Deck Review',
                durationMinutes: 45,
                price: 320,
                currency: 'USD',
                description: 'Tighten board materials, KPIs, and financial story.',
            },
        ],
        availabilityPreview: ['Tue 10:00 AM', 'Wed 2:30 PM', 'Fri 11:00 AM'],
        rating: 4.9,
        reviewCount: 88,
        verified: true,
    },
    {
        id: 'omar-cto',
        fullName: 'Omar Liu',
        tier: 'Gold',
        headline: 'Ex-CTO who scaled platforms, SRE teams, and engineering orgs',
        location: 'Seattle, USA',
        timezone: 'America/Los_Angeles',
        profilePhotoUrl: `${import.meta.env.BASE_URL}advisors/advisor2.png`,
        introVideoUrl: '',
        shortBio: 'Helps engineering leaders scale architecture, reliability, and team structure.',
        longBio:
            'Omar led cloud modernization, platform reliability, and engineering org redesign for high-scale products. He advises CTOs and founders on technical debt, SRE maturity, architecture decisions, and hiring structure.',
        executiveTags: ['Former CTO', 'Platform Scaling', 'SRE'],
        industries: ['B2B SaaS', 'Consumer Apps', 'Cloud Infrastructure'],
        functions: ['Engineering', 'Infrastructure', 'Product'],
        advisoryTopics: ['Architecture review', 'Reliability', 'Engineering org design', 'Cloud cost'],
        achievements: [
            {
                title: 'Scaled consumer platform',
                description: 'Led platform modernization for high-traffic product infrastructure.',
                metric: '40M MAU',
            },
            {
                title: 'Reduced severe incidents',
                description: 'Built SRE practices, incident review cadence, and reliability ownership model.',
                metric: '60% fewer Sev-1s',
            },
            {
                title: 'Improved release velocity',
                description: 'Guided monolith-to-services migration and deployment process redesign.',
                metric: '5x deployment frequency',
            },
        ],
        caseStudies: [
            {
                title: 'Monolith to services',
                challenge: 'Slow release cycle and frequent production incidents.',
                outcome: 'Deployment frequency improved 5x while Sev-1 incidents dropped materially.',
            },
        ],
        sessionOfferings: [
            {
                id: 'omar-1',
                name: 'Architecture Review',
                durationMinutes: 60,
                price: 450,
                currency: 'USD',
                description: 'Map bottlenecks, reliability risks, and migration path.',
            },
        ],
        availabilityPreview: ['Mon 9:00 AM', 'Thu 1:00 PM'],
        rating: 4.8,
        reviewCount: 64,
        verified: true,
    },
    {
        id: 'mei-ling-coo',
        fullName: 'Mei Ling Tan',
        tier: 'Diamond',
        headline: 'Regional COO who opened Southeast Asia markets for growth companies',
        location: 'Singapore',
        timezone: 'Asia/Singapore',
        profilePhotoUrl: `${import.meta.env.BASE_URL}advisors/advisor3.jpg`,
        introVideoUrl: '',
        shortBio: 'Helps founders expand into Southeast Asia with operating plans, hiring models, and local execution.',
        longBio:
            'Mei Ling has led regional expansion across Southeast Asia, including country launch planning, local leadership hiring, partner development, and operating cadence design for venture-backed companies.',
        executiveTags: ['Regional COO', 'Market Expansion', 'Operations'],
        industries: ['Logistics', 'Fintech', 'B2B SaaS'],
        functions: ['Operations', 'Expansion', 'People'],
        advisoryTopics: ['Indonesia expansion', 'Country launch', 'Ops hiring', 'Regional operating model'],
        achievements: [
            {
                title: 'Opened ASEAN markets',
                description: 'Built launch playbooks, local teams, and operating cadence across multiple countries.',
                metric: '6 markets',
            },
            {
                title: 'Scaled regional team',
                description: 'Hired country leads, operations managers, and support teams.',
                metric: '30 → 420 employees',
            },
            {
                title: 'Built expansion office',
                description: 'Set up regional hub structure, reporting lines, and local partner workflows.',
                metric: 'Singapore + Indonesia hub',
            },
        ],
        caseStudies: [
            {
                title: 'Indonesia market entry',
                challenge: 'Founder team lacked local operating knowledge and hiring structure.',
                outcome: 'Launched first local office, hired country lead, and reached operational break-even in 11 months.',
            },
        ],
        sessionOfferings: [
            {
                id: 'mei-1',
                name: 'Regional Expansion Strategy',
                durationMinutes: 60,
                price: 500,
                currency: 'USD',
                description: 'Clarify market entry sequence, team structure, and operating risks.',
            },
        ],
        availabilityPreview: ['Tue 3:00 PM', 'Fri 10:30 AM'],
        rating: 4.9,
        reviewCount: 51,
        verified: true,
    },
    {
        id: 'david-ipo',
        fullName: 'David Rosen',
        tier: 'Diamond',
        headline: 'Ex-public company CFO who led IPO readiness and public-market reporting',
        location: 'London, UK',
        timezone: 'Europe/London',
        profilePhotoUrl: `${import.meta.env.BASE_URL}advisors/advisor4.jpg`,
        introVideoUrl: '',
        shortBio: 'Advises founders and CFOs on IPO readiness, governance, reporting, and investor communication.',
        longBio:
            'David has operated across late-stage finance, IPO preparation, and public-company reporting. He helps companies understand governance gaps, finance maturity, and the operating changes required before entering public markets.',
        executiveTags: ['IPO Readiness', 'Former CFO', 'Public Markets'],
        industries: ['SaaS', 'Fintech', 'Enterprise Software'],
        functions: ['Finance', 'Governance', 'Strategy'],
        advisoryTopics: ['IPO readiness', 'Audit preparation', 'Governance', 'Investor relations'],
        achievements: [
            {
                title: 'Led IPO preparation',
                description: 'Managed reporting readiness, governance workstreams, and investor materials.',
                metric: 'Listed on LSE AIM',
            },
            {
                title: 'Built public reporting cadence',
                description: 'Established board, audit, and investor reporting processes.',
                metric: '$180M revenue company',
            },
            {
                title: 'Scaled finance controls',
                description: 'Prepared finance operations for audit, controls, and public-company scrutiny.',
                metric: '3-region finance team',
            },
        ],
        caseStudies: [
            {
                title: 'IPO readiness sprint',
                challenge: 'Late-stage company had weak reporting discipline and unclear governance gaps.',
                outcome: 'Created IPO readiness roadmap, audit prep plan, and public-market operating cadence.',
            },
        ],
        sessionOfferings: [
            {
                id: 'david-1',
                name: 'IPO Readiness Diagnostic',
                durationMinutes: 75,
                price: 650,
                currency: 'USD',
                description: 'Assess finance, governance, reporting, and investor-readiness gaps.',
            },
        ],
        availabilityPreview: ['Mon 4:00 PM', 'Thu 11:00 AM'],
        rating: 5.0,
        reviewCount: 37,
        verified: true,
    },
];

export const advisorOfferings = advisors.flatMap((advisor) => advisor.sessionOfferings);

export type AdvisorIntake = {
  id: string;
  company: string;
  topic: string;
  problemStatement: string;
  status: 'intake_pending_advisor_review' | 'intake_accepted' | 'intake_declined';
};


export const advisorIntakes: AdvisorIntake[] = [
  { id: 'int-1001', company: 'Northstar Bio', topic: 'Board narrative', problemStatement: 'Need help framing milestones ahead of Series B.', status: 'intake_pending_advisor_review' },
  { id: 'int-1002', company: 'Orbit Freight', topic: 'Ops scale', problemStatement: 'Delivery SLA slippage across two warehouses.', status: 'intake_accepted' },
  { id: 'int-1003', company: 'Ariya Labs', topic: 'Pricing', problemStatement: 'Unclear packaging for enterprise expansion.', status: 'intake_declined' },
];