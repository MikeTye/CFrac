import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminAdvisorsPage, AdminBookingsPage, AdminDashboardPage, AdminReviewsPage } from './pages/AdminPages';
import { AdvisorAvailabilityPage, AdvisorBookingsPage, AdvisorProfileEditorPage } from './pages/AdvisorPages';
import { BookingDetailPage, ClientBookingsPage, ClientDashboardPage } from './pages/ClientPages';
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

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing2" element={<LandingPage2 />} />
        <Route path="/landing3" element={<LandingPage3 />} />
        <Route path="/advisors" element={<AdvisorsPage />} />
        <Route path="/advisors/:advisorId" element={<AdvisorProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/verify-code" element={<VerifyCodePage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>

      <Route path="/client" element={<DashboardLayout role="client" />}>
        <Route index element={<ClientDashboardPage />} />
        <Route path="bookings" element={<ClientBookingsPage />} />
        <Route path="bookings/:bookingId" element={<BookingDetailPage />} />
      </Route>

      <Route path="/advisor" element={<DashboardLayout role="advisor" />}>
        <Route index element={<AdvisorDashboardPage />} />
        <Route path="profile" element={<AdvisorProfileEditorPage />} />
        <Route path="availability" element={<AdvisorAvailabilityPage />} />
        <Route path="bookings" element={<AdvisorBookingsPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="advisors" element={<AdminAdvisorsPage />} />
        <Route path="bookings" element={<AdminBookingsPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
