import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/pages/clientSelectSlot.css';

const slots = [
    {
        id: 'slot-1',
        date: 'Thu, 28 May',
        time: '10:00 AM',
        duration: '60 min',
        timezone: 'MYT',
    },
    {
        id: 'slot-2',
        date: 'Fri, 29 May',
        time: '2:30 PM',
        duration: '60 min',
        timezone: 'MYT',
    },
    {
        id: 'slot-3',
        date: 'Mon, 1 Jun',
        time: '9:00 AM',
        duration: '60 min',
        timezone: 'MYT',
    },
];

export function ClientSelectSlotPage() {
    const { requestId } = useParams();
    const [selectedSlotId, setSelectedSlotId] = useState(slots[0].id);

    const selectedSlot = useMemo(
        () => slots.find((slot) => slot.id === selectedSlotId),
        [selectedSlotId],
    );

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Slot selection</p>
                    <h1 className="dash-page-title">Select your advisory session</h1>
                    <p className="muted">Request: {requestId}</p>
                </div>

                <Link to="/client/requests" className="btn ghost">
                    Back to requests
                </Link>
            </div>

            <div className="client-slot-grid">
                <section className="client-slot-main">
                    <div className="client-slot-card">
                        <div>
                            <span className="client-slot-label">Advisor accepted</span>
                            <h2>Priya Nair recommends a 60-minute working session.</h2>
                            <p>
                                Choose one of the available slots below. In production, this should come from the advisor availability calendar.
                            </p>
                        </div>

                        <div className="client-slot-list">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    type="button"
                                    className={`client-slot-option ${selectedSlotId === slot.id ? 'active' : ''
                                        }`}
                                    onClick={() => setSelectedSlotId(slot.id)}
                                >
                                    <span>{slot.date}</span>
                                    <strong>{slot.time}</strong>
                                    <small>
                                        {slot.duration} · {slot.timezone}
                                    </small>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="client-slot-card">
                        <span className="client-slot-label">Preparation notes</span>
                        <textarea
                            className="client-slot-textarea"
                            placeholder="Optional: Add anything you want the advisor to prepare before the session."
                            rows={5}
                        />
                    </div>
                </section>

                <aside className="client-slot-summary">
                    <div className="client-slot-summary-card">
                        <span className="client-slot-label">Selected slot</span>
                        <strong>
                            {selectedSlot?.date}, {selectedSlot?.time}
                        </strong>
                        <p>{selectedSlot?.duration} advisory session</p>

                        <div className="client-slot-fee-row">
                            <span>Session fee</span>
                            <strong>$650</strong>
                        </div>
                        <div className="client-slot-fee-row">
                            <span>Escrow deposit</span>
                            <strong>-$300</strong>
                        </div>
                        <div className="client-slot-total">
                            <span>Due at checkout</span>
                            <strong>$350</strong>
                        </div>

                        <Link
                            to={`/client/checkout?requestId=${requestId}&slotId=${selectedSlotId}`}
                            className="btn client-slot-confirm-btn"
                        >
                            Continue to checkout
                        </Link>
                    </div>
                </aside>
            </div>
        </>
    );
}