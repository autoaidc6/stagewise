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
import ConfirmationDialog from './ConfirmationDialog';

interface DashboardTeacherProps {
  user: User;
  quizzes: Quiz[];
  onSaveQuiz: (quiz: Quiz) => void;
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

const DashboardTeacher: React.FC<DashboardTeacherProps> = ({ user, quizzes, onSaveQuiz }) => {
  const [creationStep, setCreationStep] = useState<CreationStep>('closed');
  const [generatedQuizData, setGeneratedQuizData] = useState<Quiz | null>(null);
  const [draftQuizzes, setDraftQuizzes] = useState<Quiz[]>([]);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<Quiz['id'] | null>(null);

  const loadDrafts = () => {
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
  }

  useEffect(() => {
    loadDrafts();
  }, []);

  const handleSaveQuiz = (quizToSave: Quiz) => {
    onSaveQuiz(quizToSave);
    
    // If it was a draft being edited and saved, remove the draft
    if (quizToSave.id && String(quizToSave.id).startsWith('draft-')) {
        localStorage.removeItem(`quiz-draft-${quizToSave.id}`);
    }

    handleCloseQuizFlows();
  };
  
  const handlePublishDraft = (draftId: Quiz['id']) => {
    if (!draftId) return;
    const draftToPublish = draftQuizzes.find(d => d.id === draftId);
    if (draftToPublish) {
        // Create a new ID for the published quiz to avoid conflicts
        const publishedQuiz = { ...draftToPublish, id: `quiz-${Date.now()}`};
        onSaveQuiz(publishedQuiz);
        localStorage.removeItem(`quiz-draft-${draftId}`);
        loadDrafts(); // Refresh drafts list
    }
  }

  const handleOpenEditFlow = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    setGeneratedQuizData(null);
    setCreationStep('manual');
  };
  
  const handleCloseQuizFlows = () => {
    loadDrafts();
    setCreationStep('closed');
    setEditingQuiz(null);
    setGeneratedQuizData(null);
  }

  const handleDeleteDraft = (draftId: string | number) => {
      setDraftToDelete(draftId);
      setIsDeleteConfirmOpen(true);
  }

  const confirmDeleteDraft = () => {
    if (draftToDelete) {
        localStorage.removeItem(`quiz-draft-${draftToDelete}`);
        setDraftQuizzes(prev => prev.filter(d => d.id !== draftToDelete));
    }
    setIsDeleteConfirmOpen(false);
    setDraftToDelete(null);
  };

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
              <h3 className="text-lg font-bold text-slate-800 mb-4">Published Quizzes</h3>
              <div className="overflow-x-auto">
                  <table className="w-full text-left">
                      <thead className="text-sm text-slate-500 uppercase bg-slate-50">
                          <tr>
                              <th className="p-3">Quiz Title</th>
                              <th className="p-3">Subject</th>
                              <th className="p-3">Questions</th>
                              <th className="p-3 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {quizzes.map((quiz) => (
                          <tr key={quiz.id} className="hover:bg-slate-50">
                              <td className="p-3 font-medium text-slate-800">{quiz.title}</td>
                              <td className="p-3 text-slate-600">{quiz.subject}</td>
                              <td className="p-3 text-slate-600">{quiz.questions.length}</td>
                              <td className="p-3 text-right">
                                  <button onClick={() => handleOpenEditFlow(quiz)} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-semibold ml-auto">
                                      <PencilIcon className="w-4 h-4" /> Edit
                                  </button>
                              </td>
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
                                <div className="flex justify-end items-center gap-4">
                                  <button onClick={() => handlePublishDraft(draft.id!)} className="text-sm text-green-600 hover:text-green-800 font-semibold">
                                      Publish
                                  </button>
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
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        title="Delete Draft"
        message="Are you sure you want to permanently delete this quiz draft? This action cannot be undone."
        confirmText="Delete"
        onConfirm={confirmDeleteDraft}
        onCancel={() => {
            setIsDeleteConfirmOpen(false);
            setDraftToDelete(null);
        }}
    />
    </>
  );
};

export default DashboardTeacher;