import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LazyMotion, domAnimation } from './lib/motion';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

function AdminFallback() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin" />
    </div>
  );
}

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/admin/login"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <AdminLogin />
                </Suspense>
              }
            />
            <Route
              path="/admin"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LazyMotion>
  );
}

export default App;
