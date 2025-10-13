import React from 'react';
import { UserRole } from '../types';
import AcademicCapIcon from './icons/AcademicCapIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
}

const Feature: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center space-x-3">
    <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
    <span className="text-slate-600">{text}</span>
  </li>
);

const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="w-full text-center">
      <div className="py-12 md:py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          Unlock Your Potential with <span className="text-blue-600">Stagewise</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
          The ultimate platform for personalized quizzes, progress tracking, and seamless classroom management, aligned with the UK curriculum.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            onClick={() => onSelectRole(UserRole.STUDENT)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 text-lg shadow-lg"
          >
            <AcademicCapIcon className="h-6 w-6" />
            I'm a Student
          </button>
          <button
            onClick={() => onSelectRole(UserRole.TEACHER)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-800 text-white font-semibold px-8 py-4 rounded-xl hover:bg-slate-900 transition-all duration-300 text-lg shadow-lg"
          >
            <BriefcaseIcon className="h-6 w-6" />
            I'm a Teacher
          </button>
        </div>
      </div>

      <div className="mt-10 pb-12 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-left">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">For Students</h3>
            <ul className="space-y-3">
              <Feature text="Engage with interactive quizzes" />
              <Feature text="Track your progress and scores" />
              <Feature text="Review assigned homework" />
              <Feature text="Prepare for exams effectively" />
            </ul>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl text-left">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">For Teachers</h3>
            <ul className="space-y-3">
              <Feature text="Create custom quizzes in minutes" />
              <Feature text="Analyze class and student performance" />
              <Feature text="Assign and manage homework" />
              <Feature text="Access a rich question bank" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;