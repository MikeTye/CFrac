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
    impact: {
        headlineOutcome: string;
        metrics: {
            label: string;
            value: string;
        }[];
        highlights: string[];
        bestFor: string[];
    };
};

type AdvisorImpact = {
    headlineOutcome: string; // 1-liner (very important)
    metrics: {
        label: string;
        value: string;
    }[];
    highlights: string[]; // short bullets
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
        id: 'nina-cfo',
        fullName: 'Nina Patel',
        tier: 'Platinum',
        headline: 'Former CFO at Series D fintech',
        location: 'New York, USA',
        timezone: 'America/New_York',
        shortBio: 'Helps founders tighten unit economics and prepare board-ready forecasts.',
        longBio: 'Nina scaled finance orgs from 4 to 70 people and led three debt raises totaling $220M.',
        executiveTags: ['Former CFO', 'Board Reporting', 'Fundraising'],
        industries: ['Fintech', 'SaaS'],
        functions: ['Finance', 'Strategy'],
        advisoryTopics: ['Forecasting', 'Burn Reduction', 'Board Narratives'],

        impact: {
            headlineOutcome: 'Scaled finance from 4 → 70 people and led $220M in debt financing.',
            metrics: [
                { label: 'Debt raised', value: '$220M' },
                { label: 'Finance org scale', value: '4 → 70' },
                { label: 'Burn reduced', value: '28%' },
            ],
            highlights: [
                'Built board-ready reporting cadence for Series D fintech.',
                'Redesigned GTM spend governance across two quarters.',
                'Led lender diligence and covenant package for $120M facility.',
            ],
            bestFor: [
                'Founders preparing for debt or equity financing',
                'Scaleups needing tighter FP&A discipline',
                'Teams with burn, runway, or board narrative pressure',
            ],
        },

        achievements: [
            {
                title: 'Reduced burn',
                description: 'Redesigned GTM spend governance.',
                metric: '28% in 2 quarters',
            },
            {
                title: 'Debt financing',
                description: 'Led lender diligence and covenant package.',
                metric: '$120M facility',
            },
        ],

        caseStudies: [
            {
                title: 'Marketplace Margin Reset',
                challenge: 'Gross margin volatility due to promos.',
                outcome: 'New pricing model lifted margin by 9 pts.',
            },
        ],

        sessionOfferings: [
            {
                id: 'cfo-1',
                name: 'Finance Systems Audit',
                durationMinutes: 60,
                price: 400,
                currency: 'USD',
                description: 'Rapid assessment of finance stack and close process.',
            },
        ],

        availabilityPreview: ['Tue 10:00 AM', 'Wed 2:30 PM', 'Fri 11:00 AM'],
        rating: 4.9,
        reviewCount: 88,
        verified: true,
    },
    {
        id: 'Example',
        fullName: 'Example Patel',
        tier: 'Platinum',
        headline: 'Former CFO at Series D fintech',
        location: 'New York, USA',
        timezone: 'America/New_York',
        shortBio: 'Helps founders tighten unit economics and prepare board-ready forecasts.',
        longBio: 'Nina scaled finance orgs from 4 to 70 people and led three debt raises totaling $220M.',
        executiveTags: ['Former CFO', 'Board Reporting', 'Fundraising'],
        industries: ['Fintech', 'SaaS'],
        functions: ['Finance', 'Strategy'],
        advisoryTopics: ['Forecasting', 'Burn Reduction', 'Board Narratives'],

        impact: {
            headlineOutcome: 'Scaled finance from 4 → 70 people and led $220M in debt financing.',
            metrics: [
                { label: 'Debt raised', value: '$220M' },
                { label: 'Finance org scale', value: '4 → 70' },
                { label: 'Burn reduced', value: '28%' },
            ],
            highlights: [
                'Built board-ready reporting cadence for Series D fintech.',
                'Redesigned GTM spend governance across two quarters.',
                'Led lender diligence and covenant package for $120M facility.',
            ],
            bestFor: [
                'Founders preparing for debt or equity financing',
                'Scaleups needing tighter FP&A discipline',
                'Teams with burn, runway, or board narrative pressure',
            ],
        },

        achievements: [
            {
                title: 'Reduced burn',
                description: 'Redesigned GTM spend governance.',
                metric: '28% in 2 quarters',
            },
            {
                title: 'Debt financing',
                description: 'Led lender diligence and covenant package.',
                metric: '$120M facility',
            },
        ],

        caseStudies: [
            {
                title: 'Marketplace Margin Reset',
                challenge: 'Gross margin volatility due to promos.',
                outcome: 'New pricing model lifted margin by 9 pts.',
            },
        ],

        sessionOfferings: [
            {
                id: 'cfo-1',
                name: 'Finance Systems Audit',
                durationMinutes: 60,
                price: 400,
                currency: 'USD',
                description: 'Rapid assessment of finance stack and close process.',
            },
        ],

        availabilityPreview: ['Tue 10:00 AM', 'Wed 2:30 PM', 'Fri 11:00 AM'],
        rating: 4.9,
        reviewCount: 88,
        verified: true,
    }
];

export const advisorOfferings = advisors.flatMap((advisor) => advisor.sessionOfferings);

export const advisorIntakes: AdvisorIntake[] = [
    { id: 'int-1001', company: 'Northstar Bio', topic: 'Board narrative', problemStatement: 'Need help framing milestones ahead of Series B.', status: 'intake_pending_advisor_review' },
    { id: 'int-1002', company: 'Orbit Freight', topic: 'Ops scale', problemStatement: 'Delivery SLA slippage across two warehouses.', status: 'intake_accepted' },
    { id: 'int-1003', company: 'Ariya Labs', topic: 'Pricing', problemStatement: 'Unclear packaging for enterprise expansion.', status: 'intake_declined' },
];
