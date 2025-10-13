
import React from 'react';
import { UserRole } from '../types';
import AcademicCapIcon from './icons/AcademicCapIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

const RoleCard: React.FC<{
  role: UserRole;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ role, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 transform w-full md:w-80"
  >
    <div className="bg-blue-100 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-2">{role}</h3>
    <p className="text-slate-500">{description}</p>
  </button>
);

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Welcome to Stagewise</h2>
      <p className="text-xl text-slate-600 mb-12">Please select your role to get started.</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <RoleCard
          role={UserRole.STUDENT}
          description="Practice quizzes, track your progress, and get help from our AI tutor."
          icon={<AcademicCapIcon className="h-10 w-10 text-blue-600" />}
          onClick={() => onSelectRole(UserRole.STUDENT)}
        />
        <RoleCard
          role={UserRole.TEACHER}
          description="Create quizzes, assign homework, and monitor your class's performance."
          icon={<BriefcaseIcon className="h-10 w-10 text-blue-600" />}
          onClick={() => onSelectRole(UserRole.TEACHER)}
        />
        <RoleCard
          role={UserRole.ADMIN}
          description="Manage users, oversee platform content, and view system-wide analytics."
          icon={<ShieldCheckIcon className="h-10 w-10 text-blue-600" />}
          onClick={() => onSelectRole(UserRole.ADMIN)}
        />
      </div>
    </div>
  );
};

export default RoleSelection;
