import '../../styles/components/bookingTimeline.css';

export type BookingTimelineState =
    | 'submitted'
    | 'advisor_reviewing'
    | 'accepted'
    | 'slot_selection'
    | 'payment_pending'
    | 'confirmed'
    | 'awaiting_consent'
    | 'ready_to_join'
    | 'completed';

type TimelineStep = {
    key: BookingTimelineState;
    label: string;
    description: string;
};

const STEPS: TimelineStep[] = [
    { key: 'submitted', label: 'Submitted', description: 'Case brief and deposit received.' },
    { key: 'advisor_reviewing', label: 'Advisor reviewing', description: 'Advisor is reviewing the request.' },
    { key: 'accepted', label: 'Accepted', description: 'Advisor accepted the request.' },
    { key: 'slot_selection', label: 'Slot selection', description: 'Client selects a session slot.' },
    { key: 'payment_pending', label: 'Payment pending', description: 'Checkout must be completed.' },
    { key: 'confirmed', label: 'Confirmed', description: 'Booking and room are created.' },
    { key: 'awaiting_consent', label: 'Awaiting consent', description: 'Recording consent is pending.' },
    { key: 'ready_to_join', label: 'Ready to join', description: 'Session room is available.' },
    { key: 'completed', label: 'Completed', description: 'Session and artifacts are complete.' },
];

type BookingTimelineProps = {
    currentState: BookingTimelineState;
    compact?: boolean;
};

export function BookingTimeline({ currentState, compact = false }: BookingTimelineProps) {
    const currentIndex = STEPS.findIndex((step) => step.key === currentState);

    return (
        <div className={compact ? 'booking-timeline booking-timeline--compact' : 'booking-timeline'}>
            {STEPS.map((step, index) => {
                const isDone = index < currentIndex;
                const isCurrent = index === currentIndex;

                return (
                    <div
                        key={step.key}
                        className={[
                            'booking-timeline-step',
                            isDone ? 'booking-timeline-step--done' : '',
                            isCurrent ? 'booking-timeline-step--current' : '',
                        ].join(' ')}
                    >
                        <div className="booking-timeline-marker">
                            {isDone ? <i className="ti ti-check" aria-hidden="true" /> : index + 1}
                        </div>

                        <div className="booking-timeline-copy">
                            <span className="booking-timeline-label">{step.label}</span>
                            {!compact && (
                                <span className="booking-timeline-description">
                                    {step.description}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}