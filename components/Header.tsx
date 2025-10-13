import React from 'react';
import type { User } from '../types';
import AcademicCapIcon from './icons/AcademicCapIcon';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onLogoClick }) => {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={onLogoClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg">
          <div className="bg-blue-600 p-2 rounded-lg">
            <AcademicCapIcon className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Stagewise</h1>
        </button>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-slate-600 hidden sm:block">Welcome, <span className="font-semibold">{user.name}</span>!</span>
              <button
                onClick={onLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
             <span className="text-slate-500">UK Curriculum Quizzes & Assessments</span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;