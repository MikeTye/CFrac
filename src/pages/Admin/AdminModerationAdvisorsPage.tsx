import { ModerationTable } from '../../components/admin/ModerationTable';
import { advisorModerationCases } from '../../mocks/admin';

export function AdminModerationAdvisorsPage() {
  return <ModerationTable title="Advisor Moderation Queue" columns={['Case ID', 'Advisor', 'Tier', 'Verification', 'Profile %', 'Status']} rows={advisorModerationCases.map((item) => [item.id, item.advisorName, item.tier, item.verificationStatus, `${item.profileCompletion}%`, item.status])} />;
}
