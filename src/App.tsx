import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminAdvisorsPage, AdminBookingsPage, AdminDashboardPage, AdminReviewsPage } from './pages/AdminPages';
import { AdvisorAvailabilityPage, AdvisorBookingsPage, AdvisorDashboardPage, AdvisorProfileEditorPage } from './pages/AdvisorPages';
import { BookingDetailPage, ClientBookingsPage, ClientDashboardPage } from './pages/ClientPages';
import { AdvisorProfilePage, AdvisorsPage, LandingPage, LoginPage, RegisterPage } from './pages/PublicPages';

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/advisors" element={<AdvisorsPage />} />
        <Route path="/advisors/:advisorId" element={<AdvisorProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
