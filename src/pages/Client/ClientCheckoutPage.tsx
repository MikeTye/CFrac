import { Link, useSearchParams } from 'react-router-dom';
import '../../styles/pages/clientCheckout.css';

export function ClientCheckoutPage() {
    const [params] = useSearchParams();
    const requestId = params.get('requestId');
    const slotId = params.get('slotId');

    return (
        <>
            <div className="dash-page-head">
                <div>
                    <p className="hero-eyebrow">Demo checkout</p>
                    <h1 className="dash-page-title">Confirm advisory booking</h1>
                    <p className="muted">
                        Request: {requestId ?? 'req-003'} {slotId ? `· Slot: ${slotId}` : ''}
                    </p>
                </div>

                <Link to="/client/requests" className="btn ghost">
                    Back to requests
                </Link>
            </div>

            <div className="client-checkout-card">
                <section>
                    <span>Payment summary</span>
                    <h2>Priya Nair · 60-minute advisory session</h2>

                    <div className="client-checkout-row">
                        <p>Session fee</p>
                        <strong>$650</strong>
                    </div>
                    <div className="client-checkout-row">
                        <p>Escrow deposit applied</p>
                        <strong>-$300</strong>
                    </div>
                    <div className="client-checkout-total">
                        <p>Amount due</p>
                        <strong>$350</strong>
                    </div>
                </section>

                <section className="client-checkout-demo-box">
                    <span>Stripe placeholder</span>
                    <p>
                        This is a wireframe-only checkout state. Replace this panel with Stripe Checkout or Payment Element during integration.
                    </p>
                    <Link to="/client/bookings/booking-001" className="btn">
                        Demo confirm booking
                    </Link>
                </section>
            </div>
        </>
    );
}