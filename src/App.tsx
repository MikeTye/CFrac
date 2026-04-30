import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminAdvisorsPage, AdminBookingsPage, AdminDashboardPage, AdminReviewsPage } from './pages/AdminPages';
import { AdvisorAvailabilityPage, AdvisorBookingsPage, AdvisorProfileEditorPage } from './pages/AdvisorPages';
import { BookingDetailPage, ClientBookingsPage, ClientDashboardPage } from './pages/ClientPages';
import { AdvisorProfilePage, AdvisorsPage } from './pages/PublicPages';
import { LandingPage } from './pages/LandingPage';
import { SignupPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { AdvisorDashboardPage } from './pages/Advisor/AdvisorDashboardPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/advisors" element={<AdvisorsPage />} />
        <Route path="/advisors/:advisorId" element={<AdvisorProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
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
