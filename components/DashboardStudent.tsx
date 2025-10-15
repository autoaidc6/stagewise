import React from 'react';
import type { User, Quiz } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';

interface DashboardStudentProps {
  user: User;
  quizzes: Quiz[];
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


const DashboardStudent: React.FC<DashboardStudentProps> = ({ user, quizzes }) => {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900">Welcome, {user.name}!</h2>
        <p className="text-xl text-slate-600 mt-2">Ready to start learning?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DashboardCard 
            title="My Progress"
            description="Track your scores and see how you're improving over time."
            icon={<ChartBarIcon className="w-6 h-6"/>}
            actionText="View Progress"
        />
        <DashboardCard 
            title="Assigned Homework"
            description="See quizzes and tasks assigned by your teacher."
            icon={<BookOpenIcon className="w-6 h-6"/>}
            actionText="View Homework"
        />
         <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-1">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Your Subjects</h3>
             <div className="flex flex-wrap gap-3">
                {user.subjects && user.subjects.length > 0 ? (
                    user.subjects.map(subject => (
                        <span key={subject} className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
                            {subject}
                        </span>
                    ))
                ) : (
                    <p className="text-slate-500">You haven't selected any subjects yet.</p>
                )}
             </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Available Quizzes</h3>
             {quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quizzes.map(quiz => (
                        <div key={quiz.id} className="bg-slate-50 rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-slate-800">{quiz.title}</h4>
                                <p className="text-sm text-slate-500">{quiz.subject} &middot; {quiz.questions.length} Questions</p>
                            </div>
                            <button className="bg-blue-600 text-white font-semibold px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition-colors">
                                Start Quiz
                            </button>
                        </div>
                    ))}
                </div>
             ) : (
                <p className="text-slate-500 text-center py-4">No quizzes are available at the moment. Check back soon!</p>
             )}
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;