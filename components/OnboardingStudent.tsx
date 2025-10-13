
import React, { useState } from 'react';
import type { User } from '../types';

interface OnboardingStudentProps {
  user: User;
  onComplete: (user: User) => void;
}

const keyStages = ["KS1", "KS2", "KS3", "KS4"];
const subjects = ["Mathematics", "English", "Science", "History", "Geography", "Art"];

const OnboardingStudent: React.FC<OnboardingStudentProps> = ({ user, onComplete }) => {
  const [keyStage, setKeyStage] = useState('');
  const [yearGroup, setYearGroup] = useState<number | ''>('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      keyStage,
      yearGroup: Number(yearGroup),
      subjects: selectedSubjects,
    };
    onComplete(updatedUser);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome, {user.name}!</h2>
      <p className="text-slate-500 mb-8">Let's set up your student profile to personalize your learning journey.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="keyStage" className="block text-sm font-medium text-slate-700">Key Stage</label>
            <select
              id="keyStage"
              value={keyStage}
              onChange={(e) => setKeyStage(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select your Key Stage</option>
              {keyStages.map(ks => <option key={ks} value={ks}>{ks}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="yearGroup" className="block text-sm font-medium text-slate-700">Year Group</label>
            <input
              type="number"
              id="yearGroup"
              value={yearGroup}
              onChange={(e) => setYearGroup(parseInt(e.target.value))}
              min="1"
              max="11"
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 7"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Subjects of Interest</label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map(subject => (
              <button
                key={subject}
                type="button"
                onClick={() => handleSubjectToggle(subject)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  selectedSubjects.includes(subject)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Complete Setup
        </button>
      </form>
    </div>
  );
};

export default OnboardingStudent;
