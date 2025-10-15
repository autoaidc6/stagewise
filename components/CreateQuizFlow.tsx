import React, { useState, useEffect } from 'react';
import type { Quiz, Question } from '../types';
import XMarkIcon from './icons/XMarkIcon';
import PlusCircleIcon from './icons/PlusCircleIcon';
import ConfirmationDialog from './ConfirmationDialog';

interface CreateQuizFlowProps {
  userSubjects: string[];
  onClose: () => void;
  onSave: (quiz: Quiz) => void;
  initialData?: Quiz | null;
}

const keyStages = ["KS1", "KS2", "KS3", "KS4"];
const difficulties = ["Easy", "Medium", "Hard"];

const defaultQuizDetails = (firstSubject: string) => ({
  title: '',
  subject: firstSubject || '',
  keyStage: 'KS3',
  difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
});

const defaultQuestion = {
  text: '',
  options: ['', '', '', ''],
  correctAnswerIndex: 0,
};

const CreateQuizFlow: React.FC<CreateQuizFlowProps> = ({ userSubjects, onClose, onSave, initialData }) => {
  const [step, setStep] = useState(1);
  const [quizDetails, setQuizDetails] = useState(defaultQuizDetails(userSubjects[0]));
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(defaultQuestion);
  const [isDirty, setIsDirty] = useState(false);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setQuizDetails({
        title: initialData.title,
        subject: initialData.subject,
        keyStage: initialData.keyStage,
        difficulty: initialData.difficulty,
      });
      setQuestions(initialData.questions);
      setStep(initialData.questions.length > 0 ? 2 : 1);
    } else {
      // Reset to default state if initialData is null/undefined (e.g., creating a new manual quiz)
      setQuizDetails(defaultQuizDetails(userSubjects[0]));
      setQuestions([]);
      setCurrentQuestion(defaultQuestion);
      setStep(1);
    }
    setIsDirty(false);
  }, [initialData, userSubjects]);


  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIsDirty(true);
    const { name, value } = e.target;
    setQuizDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsDirty(true);
    setCurrentQuestion(prev => ({ ...prev, text: e.target.value }));
  }

  const handleOptionChange = (index: number, value: string) => {
    setIsDirty(true);
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };
  
  const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsDirty(true);
    setCurrentQuestion(prev => ({...prev, correctAnswerIndex: parseInt(e.target.value, 10) }));
  }

  const handleAddQuestion = () => {
    if (currentQuestion.text.trim() && currentQuestion.options.every(o => o.trim())) {
      setIsDirty(true);
      const newQuestion: Question = {
        id: Date.now(),
        ...currentQuestion
      };
      setQuestions(prev => [...prev, newQuestion]);
      // Reset for next question
      setCurrentQuestion(defaultQuestion);
    } else {
        alert("Please fill in the question and all four options.");
    }
  };

  const handleSubmit = () => {
    if (questions.length === 0) {
        alert("Please add at least one question to the quiz.");
        return;
    }
    onSave({ ...quizDetails, id: initialData?.id, questions });
  };
  
  const handleSaveDraft = () => {
    if (!quizDetails.title) {
        alert("Please enter a title before saving a draft.");
        return;
    }
    const draftId = initialData?.id && String(initialData.id).startsWith('draft-') ? initialData.id : `draft-${Date.now()}`;
    const draftQuiz: Quiz = {
        id: draftId,
        ...quizDetails,
        questions,
    };
    localStorage.setItem(`quiz-draft-${draftId}`, JSON.stringify(draftQuiz));
    alert('Draft saved successfully!');
    onClose();
  };

  const handleAttemptClose = () => {
    if (isDirty) {
        setIsCloseConfirmOpen(true);
    } else {
        onClose();
    }
  };

  const Step1 = () => (
    <>
      <h3 className="text-2xl font-bold text-slate-800">Quiz Details</h3>
      <p className="text-slate-500 mb-6">Define the basic information for your new quiz.</p>
      <div className="space-y-4">
        <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Quiz Title</label>
            <input type="text" name="title" id="title" value={quizDetails.title} onChange={handleDetailChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Algebra Basics" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
              <select name="subject" id="subject" value={quizDetails.subject} onChange={handleDetailChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {userSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
          </div>
          <div>
              <label htmlFor="keyStage" className="block text-sm font-medium text-slate-700">Key Stage</label>
              <select name="keyStage" id="keyStage" value={quizDetails.keyStage} onChange={handleDetailChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {keyStages.map(ks => <option key={ks} value={ks}>{ks}</option>)}
              </select>
          </div>
          <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700">Difficulty</label>
              <select name="difficulty" id="difficulty" value={quizDetails.difficulty} onChange={handleDetailChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
          </div>
        </div>
      </div>
    </>
  );

  const Step2 = () => (
    <>
      <h3 className="text-2xl font-bold text-slate-800">Add Questions</h3>
      <p className="text-slate-500 mb-6">Create or edit the questions for your quiz.</p>
      <div className="bg-slate-50 p-4 rounded-lg space-y-4 mb-6">
        <div>
            <label htmlFor="questionText" className="block text-sm font-medium text-slate-700">Question</label>
            <textarea id="questionText" value={currentQuestion.text} onChange={handleQuestionTextChange} rows={2} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="What is 2 + 2?"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
                 <div key={index}>
                    <label htmlFor={`option-${index}`} className="block text-xs font-medium text-slate-600">Option {index + 1}</label>
                    <input type="text" id={`option-${index}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder={`Answer ${index + 1}`} />
                 </div>
            ))}
        </div>
         <div>
            <label htmlFor="correctAnswer" className="block text-sm font-medium text-slate-700">Correct Answer</label>
            <select id="correctAnswer" value={currentQuestion.correctAnswerIndex} onChange={handleCorrectAnswerChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                {currentQuestion.options.map((_, index) => (
                    <option key={index} value={index}>Option {index + 1}</option>
                ))}
            </select>
        </div>
        <button onClick={handleAddQuestion} className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <PlusCircleIcon className="w-5 h-5" />
            Add Question to Quiz
        </button>
      </div>

       <div className="space-y-2">
            <h4 className="text-md font-semibold text-slate-700">Quiz Questions ({questions.length})</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
            {questions.length > 0 ? questions.map((q, index) => (
                <div key={q.id} className="bg-white p-2 border border-slate-200 rounded-md text-sm">
                    <p className="font-semibold text-slate-800">{index + 1}. {q.text}</p>
                    <p className="text-green-600 text-xs">Correct: {q.options[q.correctAnswerIndex]}</p>
                </div>
            )) : <p className="text-slate-500 text-sm text-center py-4">No questions added yet.</p>}
            </div>
       </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <ConfirmationDialog
        isOpen={isCloseConfirmOpen}
        title="Discard Changes?"
        message="You have unsaved changes. Are you sure you want to discard them and close the editor?"
        confirmText="Discard"
        onConfirm={() => {
            setIsCloseConfirmOpen(false);
            onClose();
        }}
        onCancel={() => setIsCloseConfirmOpen(false)}
      />
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-600">{initialData ? 'Edit Quiz' : 'Create New Quiz'} - Step {step} of 2</h2>
            <button onClick={handleAttemptClose} className="text-slate-400 hover:text-slate-600">
                <XMarkIcon className="w-6 h-6" />
            </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
            {step === 1 ? <Step1 /> : <Step2 />}
        </div>
        
        <div className="p-6 border-t mt-auto bg-slate-50 rounded-b-xl flex justify-between items-center">
            <div className="flex gap-2">
                {step === 2 && (
                    <button onClick={() => setStep(1)} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50">
                        Back
                    </button>
                )}
                 <button 
                    onClick={handleSaveDraft} 
                    className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 border border-transparent rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!quizDetails.title}
                >
                    Save Draft
                </button>
            </div>
            <div>
                 {step === 1 ? (
                    <button onClick={() => setStep(2)} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700" disabled={!quizDetails.title}>
                        Next: Add Questions
                    </button>
                ) : (
                    <button onClick={handleSubmit} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700" disabled={questions.length === 0}>
                        Save & Publish Quiz
                    </button>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizFlow;