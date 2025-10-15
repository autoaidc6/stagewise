import React, { useState, useCallback } from 'react';
import { User, UserRole, Quiz } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import AuthForm from './components/AuthForm';
import OnboardingStudent from './components/OnboardingStudent';
import OnboardingTeacher from './components/OnboardingTeacher';
import OnboardingAdmin from './components/OnboardingAdmin';
import DashboardStudent from './components/DashboardStudent';
import DashboardTeacher from './components/DashboardTeacher';
import DashboardAdmin from './components/DashboardAdmin';

type View = 'LANDING' | 'ROLE_SELECTION' | 'AUTH' | 'ONBOARDING' | 'DASHBOARD';

const initialQuizzes: Quiz[] = [
    { 
        id: "quiz-1",
        title: "KS3 Science - Cell Biology", 
        subject: "Science",
        keyStage: "KS3",
        difficulty: "Medium",
        questions: [
            { id: 1, text: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Membrane"], correctAnswerIndex: 2 },
            { id: 2, text: "Which part of the cell contains the genetic material?", options: ["Cytoplasm", "Nucleus", "Vacuole", "Golgi Apparatus"], correctAnswerIndex: 1 }
        ]
    },
    { 
        id: "quiz-2",
        title: "KS4 Maths - Algebra",
        subject: "Mathematics",
        keyStage: "KS4",
        difficulty: "Hard",
        questions: [
            { id: 1, text: "Solve for x: 2x + 5 = 15", options: ["5", "10", "2.5", "7.5"], correctAnswerIndex: 0 },
        ]
    }
];

export default function App() {
  const [view, setView] = useState<View>('LANDING');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);

  const handleSaveQuiz = useCallback((quizToSave: Quiz) => {
    setQuizzes(prevQuizzes => {
        const existingIndex = prevQuizzes.findIndex(q => q.id === quizToSave.id);
        if (existingIndex > -1) {
            // Update existing quiz
            const newQuizzes = [...prevQuizzes];
            newQuizzes[existingIndex] = quizToSave;
            return newQuizzes;
        } else {
            // Add new quiz with a unique ID if it doesn't have one
            return [...prevQuizzes, { ...quizToSave, id: quizToSave.id || `quiz-${Date.now()}` }];
        }
    });
  }, []);

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
    setView('LANDING');
  }, []);
  
  const handleBackToHome = useCallback(() => {
    setUser(null);
    setUserRole(null);
    setView('LANDING');
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
        return <DashboardStudent user={user} quizzes={quizzes} />;
      case UserRole.TEACHER:
        return <DashboardTeacher user={user} quizzes={quizzes} onSaveQuiz={handleSaveQuiz} />;
      case UserRole.ADMIN:
        return <DashboardAdmin user={user} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (view) {
      case 'LANDING':
        return <LandingPage onSelectRole={handleRoleSelect} />;
      case 'ROLE_SELECTION':
        return <RoleSelection onSelectRole={handleRoleSelect} />;
      case 'AUTH':
        return userRole ? <AuthForm role={userRole} onAuthSuccess={handleAuthSuccess} /> : <RoleSelection onSelectRole={handleRoleSelect} />;
      case 'ONBOARDING':
        return renderOnboarding();
      case 'DASHBOARD':
        return renderDashboard();
      default:
        return <LandingPage onSelectRole={handleRoleSelect} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 font-sans">
      <Header user={user} onLogout={handleLogout} onLogoClick={handleBackToHome} />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}