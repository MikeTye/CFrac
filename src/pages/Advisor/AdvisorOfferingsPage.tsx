import { Card } from '../../components/common/Card';
import { advisorOfferings } from '../../mocks/advisors';

export function AdvisorOfferingsPage() {
  return (
    <div className="stack-lg">
      <h1>Session Offerings & Pricing</h1>
      <div className="grid cols-2">
        {advisorOfferings.map((offering) => (
          <Card key={offering.id}>
            <h3>{offering.name}</h3>
            <p className="muted">{offering.description}</p>
            <p>
              <strong>{offering.durationMinutes} min</strong> · ${offering.price} {offering.currency}
            </p>
            <label>
              Pricing
              <input defaultValue={offering.price} />
            </label>
            <button className="btn">Save</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
