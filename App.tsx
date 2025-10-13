
import React, { useState, useCallback } from 'react';
import { User, UserRole } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import RoleSelection from './components/RoleSelection';
import AuthForm from './components/AuthForm';
import OnboardingStudent from './components/OnboardingStudent';
import OnboardingTeacher from './components/OnboardingTeacher';
import OnboardingAdmin from './components/OnboardingAdmin';
import DashboardStudent from './components/DashboardStudent';
import DashboardTeacher from './components/DashboardTeacher';
import DashboardAdmin from './components/DashboardAdmin';

type View = 'ROLE_SELECTION' | 'AUTH' | 'ONBOARDING' | 'DASHBOARD';

export default function App() {
  const [view, setView] = useState<View>('ROLE_SELECTION');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleRoleSelect = useCallback((role: UserRole) => {
    setUserRole(role);
    setView('AUTH');
  }, []);

  const handleAuthSuccess = useCallback((loggedInUser: Omit<User, 'role'>) => {
    if (userRole) {
      setUser({ ...loggedInUser, role: userRole });
      setView('ONBOARDING');
    }
  }, [userRole]);

  const handleOnboardingComplete = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    setView('DASHBOARD');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setUserRole(null);
    setView('ROLE_SELECTION');
  }, []);

  const renderOnboarding = () => {
    if (!user) return null;
    switch (user.role) {
      case UserRole.STUDENT:
        return <OnboardingStudent user={user} onComplete={handleOnboardingComplete} />;
      case UserRole.TEACHER:
        return <OnboardingTeacher user={user} onComplete={handleOnboardingComplete} />;
      case UserRole.ADMIN:
        return <OnboardingAdmin user={user} onComplete={handleOnboardingComplete} />;
      default:
        return null;
    }
  };

  const renderDashboard = () => {
    if (!user) return null;
    switch (user.role) {
      case UserRole.STUDENT:
        return <DashboardStudent user={user} />;
      case UserRole.TEACHER:
        return <DashboardTeacher user={user} />;
      case UserRole.ADMIN:
        return <DashboardAdmin user={user} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'ROLE_SELECTION':
        return <RoleSelection onSelectRole={handleRoleSelect} />;
      case 'AUTH':
        return userRole ? <AuthForm role={userRole} onAuthSuccess={handleAuthSuccess} /> : <RoleSelection onSelectRole={handleRoleSelect} />;
      case 'ONBOARDING':
        return renderOnboarding();
      case 'DASHBOARD':
        return renderDashboard();
      default:
        return <RoleSelection onSelectRole={handleRoleSelect} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans">
      <Header user={user} onLogout={handleLogout} />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
