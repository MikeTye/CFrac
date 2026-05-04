import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { ClientDashboardPage } from './pages/Client/ClientDashboardPage';
import { ClientIntakeNewPage } from './pages/Client/ClientIntakeNewPage';
import { ClientIntakeStatusPage } from './pages/Client/ClientIntakeStatusPage';
import { ClientCheckoutPage } from './pages/Client/ClientCheckoutPage';
import { ClientBookingDetailPage } from './pages/Client/ClientBookingDetailPage';
import { ClientJoinSessionPage } from './pages/Client/ClientJoinSessionPage';
import { ClientSessionDetailsPage } from './pages/Client/ClientSessionDetailsPage';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { AdvisorDashboardPage } from './pages/Advisor/AdvisorDashboardPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { VerifyCodePage } from './pages/VerifyCodePage';
import { AdvisorsPage } from './pages/Advisor/AdvisorsPage';
import { AdvisorProfilePage } from './pages/Advisor/AdvisorProfilePage';
import { LandingPage2 } from './pages/LandingPage2';
import { LandingPage3 } from './pages/LandingPage3';
import { AdvisorProfileEditorPage } from './pages/Advisor/AdvisorProfileEditorPage';
import { AdvisorAvailabilityPage } from './pages/Advisor/AdvisorAvailabilityPage';
import { AdvisorOfferingsPage } from './pages/Advisor/AdvisorOfferingsPage';
import { AdvisorCalendarConnectionsPage } from './pages/Advisor/AdvisorCalendarConnectionsPage';
import { AdvisorIntakeQueuePage } from './pages/Advisor/AdvisorIntakeQueuePage';
import { AdvisorBookingsPage } from './pages/Advisor/AdvisorBookingsPage';
import { AdvisorBookingDetailPage } from './pages/Advisor/AdvisorBookingDetailPage';
import { AdminDashboardPage } from './pages/Admin/AdminDashboardPage';
import { AdminModerationAdvisorsPage } from './pages/Admin/AdminModerationAdvisorsPage';
import { AdminBookingsPage } from './pages/Admin/AdminBookingsPage';
import { AdminDisputeReviewPage } from './pages/Admin/AdminDisputeReviewPage';
import { AdminRecordingAuditPage } from './pages/Admin/AdminRecordingAuditPage';
import { AdminDeclineMonitoringPage } from './pages/Admin/AdminDeclineMonitoringPage';
import { DemoStartPage } from './pages/DemoStartPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing2" element={<LandingPage2 />} />
        <Route path="/landing3" element={<LandingPage3 />} />
        <Route path="/advisors" element={<AdvisorsPage />} />
        <Route path="/advisors/:advisorId" element={<AdvisorProfilePage />} />
        <Route path="/demo-start" element={<DemoStartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>

      <Route path="/client" element={<DashboardLayout role="client" />}>
        <Route path="dashboard" element={<ClientDashboardPage />} />
        <Route path="intake/new" element={<ClientIntakeNewPage />} />
        <Route path="intake/:intakeId/status" element={<ClientIntakeStatusPage />} />
        <Route path="checkout/:bookingId" element={<ClientCheckoutPage />} />
        <Route path="booking/:bookingId" element={<ClientBookingDetailPage />} />
        <Route path="join/:bookingId" element={<ClientJoinSessionPage />} />
        <Route path="sessions/:bookingId" element={<ClientSessionDetailsPage />} />
        <Route index element={<Navigate to="/client/dashboard" replace />} />
      </Route>

      <Route path="/advisor" element={<DashboardLayout role="advisor" />}>
        <Route index element={<AdvisorDashboardPage />} />
        <Route path="profile" element={<AdvisorProfileEditorPage />} />
        <Route path="availability" element={<AdvisorAvailabilityPage />} />
        <Route path="offerings" element={<AdvisorOfferingsPage />} />
        <Route path="calendar" element={<AdvisorCalendarConnectionsPage />} />
        <Route path="intakes" element={<AdvisorIntakeQueuePage />} />
        <Route path="intakes/:intakeId" element={<AdvisorIntakeQueuePage />} />
        <Route path="bookings" element={<AdvisorBookingsPage />} />
        <Route path="bookings/:bookingId" element={<AdvisorBookingDetailPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="moderation/advisors" element={<AdminModerationAdvisorsPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="disputes/:disputeId" element={<AdminDisputeReviewPage />} />
        <Route path="audit/recordings/:bookingId" element={<AdminRecordingAuditPage />} />
        <Route path="monitoring/declines" element={<AdminDeclineMonitoringPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
