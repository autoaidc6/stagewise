
import React from 'react';
import type { User } from '../types';

interface OnboardingAdminProps {
  user: User;
  onComplete: (user: User) => void;
}

const OnboardingAdmin: React.FC<OnboardingAdminProps> = ({ user, onComplete }) => {
  const handleProceed = () => {
    onComplete(user);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome, Administrator!</h2>
      <p className="text-slate-500 mb-8">
        You have full access to the Stagewise platform. You can now manage users, oversee content, and view system-wide analytics.
      </p>
      <button
        onClick={handleProceed}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Proceed to Admin Dashboard
      </button>
    </div>
  );
};

export default OnboardingAdmin;
