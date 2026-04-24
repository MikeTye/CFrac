import type { Advisor } from '../../mocks/advisors';
import { Card } from '../common/Card';

export function BookingModal({ advisor, onClose }: { advisor: Advisor; onClose: () => void }) {
  return (
    <div className="modal-backdrop">
      <Card className="modal">
        <h3>Book Session with {advisor.fullName}</h3>
        <label>Session Type<select>{advisor.sessionOfferings.map((s) => <option key={s.id}>{s.name}</option>)}</select></label>
        <label>Available Slot<select>{advisor.availabilityPreview.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
        <p className="muted">Consent notice: recording/transcript requires both parties to opt in.</p>
        <div className="stack-row">
          <button className="btn">Continue to Checkout</button>
          <button onClick={onClose}>Close</button>
        </div>
      </Card>
    </div>
  );
}
