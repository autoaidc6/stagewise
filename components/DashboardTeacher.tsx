import React, { useState, useEffect } from 'react';
import type { User, Quiz } from '../types';
import BookOpenIcon from './icons/BookOpenIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import PencilIcon from './icons/PencilIcon';
import CreateQuizFlow from './CreateQuizFlow';
import XMarkIcon from './icons/XMarkIcon';
import CreateQuizOptions from './CreateQuizOptions';
import AIQuizGenerator from './AIQuizGenerator';
import UploadQuiz from './UploadQuiz';

interface DashboardTeacherProps {
  user: User;
}

const DashboardCard: React.FC<{ title: string; description: string; icon: React.ReactNode; actionText: string; onClick?: () => void; }> = ({ title, description, icon, actionText, onClick }) => (
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
    <button onClick={onClick} className="mt-4 bg-blue-100 text-blue-700 font-semibold px-4 py-2 text-sm rounded-lg hover:bg-blue-200 transition-colors self-start">
        {actionText}
    </button>
  </div>
);

type CreationStep = 'options' | 'manual' | 'ai' | 'upload' | 'closed';

const DashboardTeacher: React.FC<DashboardTeacherProps> = ({ user }) => {
  const [creationStep, setCreationStep] = useState<CreationStep>('closed');
  const [generatedQuizData, setGeneratedQuizData] = useState<Quiz | null>(null);
  const [quizzes, setQuizzes] = useState([
    { title: "KS3 Science - Cell Biology", class: "Year 9 Science", submissions: "22 / 25", avgScore: "85%" },
    { title: "KS4 Maths - Algebra", class: "Year 10 Maths", submissions: "15 / 20", avgScore: "72%" }
  ]);
  const [draftQuizzes, setDraftQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    const loadedDrafts: Quiz[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quiz-draft-')) {
            try {
                const draft = JSON.parse(localStorage.getItem(key)!);
                loadedDrafts.push(draft);
            } catch (e) {
                console.error("Failed to parse draft from localStorage", e);
            }
        }
    }
    setDraftQuizzes(loadedDrafts);
  }, []);

  const handleSaveQuiz = (newQuiz: Quiz, draftIdToRemove?: string | number) => {
    console.log("Quiz saved:", newQuiz);
    setQuizzes(prev => [...prev, {
        title: newQuiz.title,
        class: newQuiz.keyStage,
        submissions: "0 / 20",
        avgScore: "N/A"
    }]);
    setCreationStep('closed');
    setEditingQuiz(null);
    setGeneratedQuizData(null);

    if (draftIdToRemove) {
        localStorage.removeItem(`quiz-draft-${draftIdToRemove}`);
        setDraftQuizzes(prev => prev.filter(d => d.id !== draftIdToRemove));
    }
  };

  const handleOpenEditFlow = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setGeneratedQuizData(null);
    setCreationStep('manual');
  };
  
  const handleCloseQuizFlows = () => {
    // When a draft is saved, we need to reload the drafts list
    const loadedDrafts: Quiz[] = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('quiz-draft-')) {
            try {
                const draft = JSON.parse(localStorage.getItem(key)!);
                loadedDrafts.push(draft);
            } catch (e) {
                console.error("Failed to parse draft from localStorage", e);
            }
        }
    }
    setDraftQuizzes(loadedDrafts);
    setCreationStep('closed');
    setEditingQuiz(null);
    setGeneratedQuizData(null);
  }

  const handleDeleteDraft = (draftId: string | number) => {
      if (window.confirm("Are you sure you want to delete this draft?")) {
          localStorage.removeItem(`quiz-draft-${draftId}`);
          setDraftQuizzes(prev => prev.filter(d => d.id !== draftId));
      }
  }

  const handleQuizGenerated = (quizData: Quiz) => {
    setGeneratedQuizData(quizData);
    setEditingQuiz(null);
    setCreationStep('manual');
  };

  const renderCreationModals = () => {
    switch (creationStep) {
      case 'options':
        return <CreateQuizOptions onClose={handleCloseQuizFlows} onSelectOption={(option) => setCreationStep(option)} />;
      case 'ai':
        return <AIQuizGenerator onClose={handleCloseQuizFlows} onQuizGenerated={handleQuizGenerated} userSubjects={user.subjects || []} />;
      case 'upload':
        return <UploadQuiz onClose={handleCloseQuizFlows} onQuizParsed={handleQuizGenerated} />;
      case 'manual':
        return (
          <CreateQuizFlow 
            initialData={editingQuiz || generatedQuizData}
            userSubjects={user.subjects || []}
            onClose={handleCloseQuizFlows}
            onSave={handleSaveQuiz}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
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
              onClick={() => setCreationStep('options')}
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
                        {quizzes.map((quiz, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                              <td className="p-3 font-medium text-slate-800">{quiz.title}</td>
                              <td className="p-3 text-slate-600">{quiz.class}</td>
                              <td className="p-3 text-slate-600">{quiz.submissions}</td>
                              <td className="p-3 text-slate-600">{quiz.avgScore}</td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
          </div>
          {draftQuizzes.length > 0 && (
             <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quiz Drafts</h3>
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="text-sm text-slate-500 uppercase bg-slate-50">
                          <tr>
                              <th className="p-3">Draft Title</th>
                              <th className="p-3">Subject</th>
                              <th className="p-3">Questions</th>
                              <th className="p-3 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {draftQuizzes.map((draft) => (
                          <tr key={draft.id} className="hover:bg-slate-50">
                              <td className="p-3 font-medium text-slate-800">{draft.title || 'Untitled Draft'}</td>
                              <td className="p-3 text-slate-600">{draft.subject}</td>
                              <td className="p-3 text-slate-600">{draft.questions.length}</td>
                              <td className="p-3 text-right">
                                <div className="flex justify-end items-center gap-2">
                                  <button onClick={() => handleOpenEditFlow(draft)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                      <PencilIcon className="w-4 h-4" /> Edit
                                  </button>
                                  <button onClick={() => handleDeleteDraft(draft.id!)} className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-semibold">
                                      <XMarkIcon className="w-4 h-4" /> Delete
                                  </button>
                                </div>
                              </td>
                          </tr>
                        ))}
                      </tbody>
                  </table>
              </div>
          </div>
          )}
        </div>
      </div>
      {renderCreationModals()}
    </>
  );
};

export default DashboardTeacher;