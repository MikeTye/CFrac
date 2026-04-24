import { ProfileEditorSection } from '../components/advisorDashboard/ProfileEditorSection';
import { BookingCard } from '../components/bookings/BookingCard';
import { Card } from '../components/common/Card';
import { Tabs } from '../components/common/Tabs';
import { StatCard } from '../components/common/StatCard';
import { bookings } from '../mocks/bookings';
import { useState } from 'react';

export function AdvisorDashboardPage() {
  return (
    <div className="stack-lg">
      <h1>Advisor Dashboard</h1>
      <div className="grid cols-3">
        <StatCard label="Profile completion" value="78%" />
        <StatCard label="Revenue (placeholder)" value="$8,450" />
        <StatCard label="Average rating" value="4.8" />
      </div>
      <Card><h3>Pending profile tasks</h3><ul><li>Add two more case studies</li><li>Upload credential proof</li></ul></Card>
      <section><h3>Upcoming bookings</h3><div className="grid cols-2">{bookings.filter((b) => b.status === 'confirmed').map((b) => <BookingCard key={b.id} booking={b} />)}</div></section>
    </div>
  );
}

const sections = [
  ['Identity', 'Basic public profile identity fields.'],
  ['Positioning', 'Clarify who you help and outcomes.'],
  ['Professional identity', 'Role history and leadership scope.'],
  ['Experience history', 'Timeline and depth highlights.'],
  ['Industries/functions', 'Select target segments and capabilities.'],
  ['Achievements', 'Quantified impact statements.'],
  ['Case studies', 'Problem to outcome narratives.'],
  ['Advisory topics', 'Topics and formats clients can book.'],
  ['Session offerings', 'Package, duration, and price placeholders.'],
  ['Media/proof', 'Upload placeholder only.'],
  ['Trust indicators', 'Verification and compliance placeholders.'],
] as const;

export function AdvisorProfileEditorPage() {
  return (
    <div className="stack-lg">
      <h1>Profile Editor</h1>
      {sections.map(([title, helper]) => (
        <ProfileEditorSection key={title} title={title} helper={helper}>
          <input placeholder={`${title} field`} />
        </ProfileEditorSection>
      ))}
    </div>
  );
}

export function AdvisorAvailabilityPage() {
  return (
    <div className="stack-lg">
      <h1>Availability Manager</h1>
      <Card><label>Timezone <select><option>America/New_York</option><option>America/Los_Angeles</option></select></label></Card>
      <Card><h3>Weekly availability grid</h3><p>Static grid placeholder (Mon-Sun, morning/afternoon/evening blocks).</p></Card>
      <div className="grid cols-2"><Card><label>Slot duration <select><option>30 min</option><option>45 min</option><option>60 min</option></select></label></Card><Card><label>Buffer before/after <select><option>15 min</option><option>30 min</option></select></label></Card></div>
      <Card><label>Minimum notice <input defaultValue="24 hours" /></label><label>Max bookings/day <input defaultValue="4" /></label></Card>
      <Card><h3>Blackout dates + generated slot preview</h3><p>Placeholder only; no real calendar integration.</p></Card>
    </div>
  );
}

const tabs = ['upcoming', 'completed', 'cancelled', 'disputed'] as const;
export function AdvisorBookingsPage() {
  const [active, setActive] = useState<(typeof tabs)[number]>('upcoming');
  return (
    <div className="stack-lg">
      <h1>Advisor Bookings</h1>
      <Tabs values={[...tabs]} active={active} onChange={setActive} />
      <div className="grid cols-2">{bookings.map((b) => <Card key={b.id}><h4>{b.sessionName}</h4><p>{b.clientName}</p><p>Actions: View booking • Add session link • Mark completed • Upload recording placeholder</p></Card>)}</div>
    </div>
  );
}
