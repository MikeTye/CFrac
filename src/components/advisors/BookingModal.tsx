import { useMemo, useState } from 'react';
import type { Advisor } from '../../mocks/advisors';
import { Card } from '../common/Card';

export function BookingModal({ advisor, onClose }: { advisor: Advisor; onClose: () => void }) {
  const [offeringId, setOfferingId] = useState(advisor.sessionOfferings[0]?.id);
  const selected = useMemo(() => advisor.sessionOfferings.find((s) => s.id === offeringId) ?? advisor.sessionOfferings[0], [advisor, offeringId]);

  return (
    <div className="modal-backdrop">
      <Card className="modal">
        <h3>Book with {advisor.fullName}</h3>
        <ol className="muted">
          <li>Select session type</li><li>Select available slot</li><li>Review booking</li><li>Consent notice</li><li>Checkout placeholder</li>
        </ol>
        <label>Session Type<select value={offeringId} onChange={(e) => setOfferingId(e.target.value)}>{advisor.sessionOfferings.map((s) => <option key={s.id} value={s.id}>{s.name} • {s.durationMinutes} min • ${s.price}</option>)}</select></label>
        <label>Available Slot<select>{advisor.availabilityPreview.map((slot) => <option key={slot}>{slot}</option>)}</select></label>
        <Card>
          <p><strong>Advisor timezone:</strong> {advisor.timezone}</p>
          <p><strong>Client timezone:</strong> America/New_York (placeholder)</p>
          <p><strong>Price:</strong> ${selected.price} {selected.currency}</p>
          <p className="muted">Platform-hosted meeting room is created on confirmation. No external links by default.</p>
          <p className="muted">Recording/transcription requires explicit consent from both client and advisor before session starts.</p>
          <p className="muted">Cancellation/refund policy placeholder: review before payment.</p>
        </Card>
        <div className="stack-row">
          <button className="btn">Continue to Checkout</button>
          <button onClick={onClose}>Close</button>
        </div>
      </Card>
    </div>
  );
}
