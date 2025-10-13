import React from 'react';
import XMarkIcon from './icons/XMarkIcon';
import PencilIcon from './icons/PencilIcon';
import SparklesIcon from './icons/SparklesIcon';
import ArrowUpTrayIcon from './icons/ArrowUpTrayIcon';

interface CreateQuizOptionsProps {
  onClose: () => void;
  onSelectOption: (option: 'manual' | 'ai' | 'upload') => void;
}

const OptionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ title, description, icon, onClick }) => (
  <button
    onClick={onClick}
    className="bg-slate-50 rounded-xl p-6 text-left flex items-start space-x-4 hover:bg-slate-100 hover:shadow-lg transition-all duration-200 w-full border border-slate-200"
  >
    <div className="bg-blue-100 p-3 rounded-lg text-blue-600 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <p className="text-slate-500 mt-1">{description}</p>
    </div>
  </button>
);

const CreateQuizOptions: React.FC<CreateQuizOptionsProps> = ({ onClose, onSelectOption }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Create a New Quiz</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
            <p className="text-slate-600 text-center mb-4">How would you like to create your quiz?</p>
            <OptionCard 
                title="Create Manually"
                description="Build your quiz question by question for full control."
                icon={<PencilIcon className="w-6 h-6" />}
                onClick={() => onSelectOption('manual')}
            />
            <OptionCard 
                title="Generate with AI"
                description="Save time by letting our AI generate questions based on your topic."
                icon={<SparklesIcon className="w-6 h-6" />}
                onClick={() => onSelectOption('ai')}
            />
            <OptionCard 
                title="Upload File"
                description="Import questions from a pre-formatted CSV or TXT file."
                icon={<ArrowUpTrayIcon className="w-6 h-6" />}
                onClick={() => onSelectOption('upload')}
            />
        </div>
      </div>
    </div>
  );
};

export default CreateQuizOptions;
