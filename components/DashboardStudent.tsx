import React from 'react';
import type { User } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import PencilIcon from './icons/PencilIcon';

interface DashboardStudentProps {
  user: User;
}

// Mock data for charts
const subjectPerformance = [
  { subject: 'Maths', score: 85 },
  { subject: 'Science', score: 92 },
  { subject: 'English', score: 78 },
  { subject: 'History', score: 88 },
];

const progressOverTime = [
  { quiz: '1', score: 65 },
  { quiz: '2', score: 72 },
  { quiz: '3', score: 70 },
  { quiz: '4', score: 81 },
  { quiz: '5', score: 85 },
  { quiz: '6', score: 92 },
];


const DashboardCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4">
    <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
        {icon}
    </div>
    <div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-slate-500 mt-1">{description}</p>
    </div>
  </div>
);

const DashboardStudent: React.FC<DashboardStudentProps> = ({ user }) => {

  const generateLineChartPoints = (data: typeof progressOverTime) => {
    const width = 500;
    const height = 100;
    if (data.length < 2) return "";
    return data.map((point, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - (point.score / 100) * height;
      return `${x},${y}`;
    }).join(' ');
  };
  const lineChartPoints = generateLineChartPoints(progressOverTime);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900">Student Dashboard</h2>
        <p className="text-xl text-slate-600 mt-2">Ready to learn, {user.name}?</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Enhanced Progress Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start space-x-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <ChartBarIcon className="w-6 h-6"/>
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800">My Progress</h3>
                <p className="text-slate-500 mt-1">An overview of your recent performance.</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-slate-700 mb-4">Scores by Subject</h4>
              <div className="space-y-3">
                {subjectPerformance.map(({ subject, score }) => (
                  <div key={subject} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium text-slate-600 text-right">{subject}</span>
                    <div className="flex-1 bg-slate-200 rounded-full h-6 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-6 rounded-full flex items-center justify-end px-2 text-white text-xs font-bold transition-all duration-500" 
                        style={{ width: `${score}%` }}
                      >
                       {score}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-700 mb-2">Progress Over Time</h4>
               <div className="w-full bg-slate-50 p-4 rounded-lg">
                <svg viewBox="0 0 500 100" className="w-full h-auto" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="0" y2="100" stroke="#e2e8f0" strokeWidth="2" />
                  <line x1="0" y1="50" x2="500" y2="50" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4" />
                  <line x1="0" y1="100" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="2" />
                  
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2.5"
                    points={lineChartPoints}
                  />

                  {progressOverTime.map((point, i) => {
                    const width = 500;
                    const height = 100;
                    const x = (i / (progressOverTime.length - 1)) * width;
                    const y = height - (point.score / 100) * height;
                    return <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#2563eb" strokeWidth="2" />;
                  })}
                </svg>
                 <div className="flex justify-between text-xs text-slate-500 mt-1 px-1">
                  {progressOverTime.map((p) => <span key={p.quiz}>Quiz {p.quiz}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Cards */}
        <div className="space-y-8">
            <DashboardCard 
                title="My Quizzes"
                description="View and take quizzes aligned with your subjects and key stage."
                icon={<PencilIcon className="w-6 h-6"/>}
            />
            <DashboardCard 
                title="Ask 'Ustaz'"
                description="Get help from your AI teaching assistant whenever you're stuck."
                icon={<BookOpenIcon className="w-6 h-6"/>}
            />
        </div>

        {/* Homework Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-3">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Homework</h3>
             <div className="divide-y divide-slate-200">
                <div className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-slate-700">KS3 Science - Cell Biology</p>
                        <p className="text-sm text-slate-500">Due: 25th October 2024</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition-colors">Start Quiz</button>
                </div>
                 <div className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-slate-700">KS3 English - Shakespeare's Sonnets</p>
                        <p className="text-sm text-slate-500">Due: 28th October 2024</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition-colors">Start Quiz</button>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStudent;
