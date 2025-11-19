import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase.ts';
import { AdminProvider } from './components/admin/AdminContext';
import { OnboardingProvider } from './components/onboarding/OnboardingContext';
import { GamificationProvider } from './components/gamification/GamificationContext';
import { SecurityProvider } from './components/security/SecurityContext';
import { EmailProvider } from './components/email/EmailContext';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminLayout from './components/admin/AdminLayout';
import './App.css';
import HomePage from './components/homepage/HomePage.tsx';
import AuditDashboard from './components/admin/AuditDashboard.tsx';
import LoginPage from './components/auth/LoginPage.tsx';
import SignupPage from './components/auth/SignupPage.tsx';
// import { MobileProvider } from './hooks/useMobile.ts';
import { DashboardProvider } from './hooks/useDashboard.ts';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  const isAuthenticated = !!user;
  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <Router>
      {/* <MobileProvider> */}
        <DashboardProvider>
          <AdminProvider>
            <OnboardingProvider>
              <GamificationProvider>
                <SecurityProvider>
                  <EmailProvider>
                    <div className="App">
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/homepage" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/onboarding/*" element={<OnboardingFlow state={0} prevStep={function (): void {
                          throw new Error('Function not implemented.');
                        }} />} />

                        {/* Protected Routes */}
                        <Route
                          path="/dashboard/*"
                          element={
                            isAuthenticated && !isAdmin ?
                              <DashboardLayout /> :
                              <Navigate to="/login" replace />
                          }
                        />

                        <Route
                          path="/admin/*"
                          element={
                            isAuthenticated && isAdmin ?
                              <AdminLayout /> :
                              <Navigate to="/login" replace />
                          }
                        />

                        <Route
                          path="/admin/audit"
                          element={
                            isAuthenticated && isAdmin ?
                              <AuditDashboard /> :
                              <Navigate to="/login" replace />
                          }
                        />

                        {/* Default route */}
                        <Route path="*" element={<HomePage />} />
                      </Routes>
                    </div>
                  </EmailProvider>
                </SecurityProvider>
              </GamificationProvider>
            </OnboardingProvider>
          </AdminProvider>
        </DashboardProvider>
      {/* </MobileProvider> */}
    </Router>
  );
}

export default App;
