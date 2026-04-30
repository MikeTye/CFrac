import { AdminStatGrid } from '../components/admin/AdminStatGrid';
import { ModerationTable } from '../components/admin/ModerationTable';

export const AdminDashboardPage = () => <div className="stack-lg"><h1>Admin Operations</h1><AdminStatGrid /></div>;
export const AdminAdvisorsPage = () => <ModerationTable title="Advisor Moderation" columns={['Advisor','Status','Verification','Profile %','Actions']} rows={[['Nina Patel','Pending','Verified','92%','Approve / Request Changes'],['Rachel Kim','Under Review','Unverified','83%','Approve / Reject']]}/>;
export const AdminBookingsPage = () => <ModerationTable title="Booking Operations" columns={['Booking','Status','Consent','Refund','Actions']} rows={[['bk-1001','Confirmed','Complete','n/a','View'],['bk-1004','Disputed','Advisor missing','Pending','Investigate / Refund']]}/>;
export const AdminReviewsPage = () => <ModerationTable title="Quality Queue" columns={['Item','Issue Type','Status','Actions']} rows={[['Review #441','Flagged review','Open','Moderate'],['Transcript #884','Recording issue','Open','Escalate']]}/>;
