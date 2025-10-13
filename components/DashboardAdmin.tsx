import React from 'react';
import type { User } from '../types';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import ChartBarIcon from './icons/ChartBarIcon';
// FIX: Import icon components from their files to allow passing props like className.
import BookOpenIcon from './icons/BookOpenIcon';
import PencilIcon from './icons/PencilIcon';

interface DashboardAdminProps {
  user: User;
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-slate-50 rounded-lg p-4 flex items-center space-x-4">
        <div className="text-blue-600">{icon}</div>
        <div>
            <p className="text-sm text-slate-500">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const DashboardAdmin: React.FC<DashboardAdminProps> = ({ user }) => {
  return (
    <div className="w-full">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900">Admin Dashboard</h2>
        <p className="text-xl text-slate-600 mt-2">Platform Overview & Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Students" value="1,245" icon={<BriefcaseIcon className="w-8 h-8"/>} />
        <StatCard title="Total Teachers" value="88" icon={<BriefcaseIcon className="w-8 h-8"/>} />
        <StatCard title="Total Quizzes" value="452" icon={<PencilIcon className="w-8 h-8"/>} />
        <StatCard title="Questions in Bank" value="5,678" icon={<BookOpenIcon className="w-8 h-8"/>} />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-slate-700">Manage Users</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <BookOpenIcon className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-slate-700">Question Bank</span>
            </button>
            <button className="flex items-center space-x-3 p-4 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-slate-700">View Reports</span>
            </button>
        </div>
      </div>
    </div>
  );
};

// FIX: Removed local dummy icon definitions that did not accept props.
// The imported versions from './icons/*' are used instead.

export default DashboardAdmin;
