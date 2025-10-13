
import React from 'react';
import type { User } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import PencilIcon from './icons/PencilIcon';

interface DashboardTeacherProps {
  user: User;
}

const DashboardCard: React.FC<{ title: string; description: string; icon: React.ReactNode; actionText: string; }> = ({ title, description, icon, actionText }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between">
    <div className="flex items-start space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <p className="text-slate-500 mt-1">{description}</p>
        </div>
    </div>
    <button className="mt-4 bg-blue-100 text-blue-700 font-semibold px-4 py-2 text-sm rounded-lg hover:bg-blue-200 transition-colors self-start">
        {actionText}
    </button>
  </div>
);

const DashboardTeacher: React.FC<DashboardTeacherProps> = ({ user }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900">Teacher Dashboard</h2>
        <p className="text-xl text-slate-600 mt-2">Manage your classes and assessments.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         <DashboardCard 
            title="Create Quiz"
            description="Build quizzes manually or use AI to generate questions for your students."
            icon={<PencilIcon className="w-6 h-6"/>}
            actionText="New Quiz"
        />
        <DashboardCard 
            title="Class Analytics"
            description="View detailed reports on student and class-level performance."
            icon={<ChartBarIcon className="w-6 h-6"/>}
            actionText="View Analytics"
        />
        <DashboardCard 
            title="Manage Homework"
            description="Assign quizzes to your classes and set due dates."
            icon={<BookOpenIcon className="w-6 h-6"/>}
            actionText="Assign Homework"
        />
         <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Active Quizzes</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="text-sm text-slate-500 uppercase bg-slate-50">
                        <tr>
                            <th className="p-3">Quiz Title</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">Submissions</th>
                            <th className="p-3">Avg. Score</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        <tr className="hover:bg-slate-50">
                            <td className="p-3 font-medium text-slate-800">KS3 Science - Cell Biology</td>
                            <td className="p-3 text-slate-600">Year 9 Science</td>
                            <td className="p-3 text-slate-600">22 / 25</td>
                            <td className="p-3 text-slate-600">85%</td>
                        </tr>
                         <tr className="hover:bg-slate-50">
                            <td className="p-3 font-medium text-slate-800">KS4 Maths - Algebra</td>
                            <td className="p-3 text-slate-600">Year 10 Maths</td>
                            <td className="p-3 text-slate-600">15 / 20</td>
                            <td className="p-3 text-slate-600">72%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTeacher;
