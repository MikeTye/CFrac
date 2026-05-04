import { Card } from '../../components/common/Card';

export function AdvisorAvailabilityPage() {
  return (
    <div className="stack-lg">
      <h1>Availability Manager</h1>
      <Card>
        <label>
          Timezone
          <select>
            <option>America/New_York</option>
            <option>America/Los_Angeles</option>
          </select>
        </label>
      </Card>
      <Card>
        <h3>Weekly Availability Grid</h3>
        <p>Mon-Fri blocks with editable morning/afternoon/evening slots.</p>
      </Card>
      <div className="grid cols-3">
        <Card><label>Slot duration<select><option>30 min</option><option>45 min</option><option>60 min</option></select></label></Card>
        <Card><label>Buffer settings<select><option>15 min</option><option>30 min</option></select></label></Card>
        <Card><label>Minimum notice<input defaultValue="24 hours" /></label></Card>
      </div>
      <Card>
        <h3>Blackout dates & generated preview</h3>
        <p>No-sync placeholder with preview of bookable times.</p>
      </Card>
    </div>
  );
}
