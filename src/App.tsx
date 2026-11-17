import React, { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { I18nProvider, useT } from './context/I18nContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { EBooksPage } from './pages/EBooksPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PracticalPage } from './pages/PracticalPage';
import { PresentationsPage } from './pages/PresentationsPage';
import { StudentCabinetPage } from './pages/StudentCabinetPage';
import { TeacherCabinetPage } from './pages/TeacherCabinetPage';
import { CertificateVerifyPage, TestsPage } from './pages/TestsPage';
import { VideoLessonsPage } from './pages/VideoLessonsPage';
import { ensureSeeded } from './services/storageService';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const RequireAuth: React.FC<{
  allowedRoles: ('student' | 'teacher')[];
  children: React.ReactElement;
}> = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const { t } = useT();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: t.auth.authRequired, from: location.pathname }}
      />
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ message: t.auth.wrongRole, from: location.pathname }}
      />
    );
  }

  return children;
};

const AppRoutes: React.FC = () => {
  useEffect(() => {
    ensureSeeded();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/videos" element={<VideoLessonsPage />} />
          <Route path="/ebooks" element={<EBooksPage />} />
          <Route path="/presentations" element={<PresentationsPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/verify-certificate" element={<CertificateVerifyPage />} />
          <Route path="/practical" element={<PracticalPage />} />
          <Route
            path="/student"
            element={
              <RequireAuth allowedRoles={['student']}>
                <StudentCabinetPage />
              </RequireAuth>
            }
          />
          <Route
            path="/teacher"
            element={
              <RequireAuth allowedRoles={['teacher']}>
                <TeacherCabinetPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <I18nProvider>
          <ToastProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </ToastProvider>
        </I18nProvider>
      </ThemeProvider>
    </HashRouter>
  );
}
