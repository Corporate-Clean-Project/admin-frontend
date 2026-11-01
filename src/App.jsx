import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuthStore from './stores/authStore';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AcceptInvite from './pages/AcceptInvite';
import Dashboard from './pages/Dashboard';
import Inquiries from './pages/Inquiries';
import AboutUsCms from './pages/AboutUsCms';
import Team from './pages/Team';
import Reviews from './pages/Reviews';

export default function App() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/accept-invite" element={<AcceptInvite />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/content/about-us" element={<AboutUsCms />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/team" element={<Team />} />
        </Route>
      </Route>
    </Routes>
  );
}
