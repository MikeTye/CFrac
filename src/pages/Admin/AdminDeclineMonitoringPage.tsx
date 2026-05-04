import { ModerationTable } from '../../components/admin/ModerationTable';
import { advisorDeclineMonitoring } from '../../mocks/admin';

export function AdminDeclineMonitoringPage() {
  return <ModerationTable title="Advisor Decline-Rate Monitoring" columns={['Advisor', 'Decline Rate', 'Trend', 'Alert']} rows={advisorDeclineMonitoring.map((row) => [row.advisorName, row.declineRate, row.trend, row.alert])} />;
}
