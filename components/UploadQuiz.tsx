import React, { useState, useCallback } from 'react';
import type { Quiz, Question } from '../types';
import XMarkIcon from './icons/XMarkIcon';
import ArrowUpTrayIcon from './icons/ArrowUpTrayIcon';

interface UploadQuizProps {
  onClose: () => void;
  onQuizParsed: (quiz: Quiz) => void;
}

const UploadQuiz: React.FC<UploadQuizProps> = ({ onClose, onQuizParsed }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [isParsing, setIsParsing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError('');
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const parseFile = () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setIsParsing(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
            throw new Error("The file is empty or contains no valid lines.");
        }

        const questions: Question[] = lines.map((line, index) => {
          const parts = line.split(',');
          if (parts.length !== 6) {
            throw new Error(`Line ${index + 1} is malformed. Each line must have 6 comma-separated parts.`);
          }
          
          const [text, ...options] = parts.slice(0, 5);
          const correctAnswerIndex = parseInt(parts[5], 10);

          if (isNaN(correctAnswerIndex) || correctAnswerIndex < 0 || correctAnswerIndex > 3) {
            throw new Error(`Line ${index + 1}: The correct answer index must be a number between 0 and 3.`);
          }
          if (options.some(o => o.trim() === '')) {
            throw new Error(`Line ${index + 1}: All four options must contain text.`);
          }

          return {
            id: Date.now() + index,
            text: text.trim(),
            options: options.map(o => o.trim()),
            correctAnswerIndex,
          };
        });

        const quiz: Quiz = {
          id: `uploaded-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, "") || 'Uploaded Quiz',
          subject: 'Imported',
          keyStage: 'KS3',
          difficulty: 'Medium',
          questions,
        };
        onQuizParsed(quiz);

      } catch (err: any) {
        setError(err.message || 'An unknown error occurred during parsing.');
      } finally {
        setIsParsing(false);
      }
    };
    reader.onerror = () => {
        setError('Failed to read the file.');
        setIsParsing(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Upload Quiz from File</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 text-sm text-blue-800 rounded-r-lg">
            <p className="font-semibold mb-1">File Format Instructions</p>
            <p>Upload a <strong>.csv</strong> or <strong>.txt</strong> file where each line represents one question in the following format:</p>
            <code className="block bg-slate-200 p-2 rounded text-xs mt-2 text-slate-700">question text,option 1,option 2,option 3,option 4,correct_answer_index</code>
            <p className="mt-2">The index for the correct answer should be a number from 0 to 3.</p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700">Upload File</label>
            <label 
                htmlFor="file-upload"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
            >
              <div className="space-y-1 text-center">
                <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex text-sm text-slate-600">
                  <span className="relative rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>{file ? 'Replace file' : 'Upload a file'}</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".csv,.txt" />
                  </span>
                  <p className="pl-1">or drag and drop</p>
                </div>
                {file ? (
                    <p className="text-sm text-slate-500">{file.name}</p>
                ) : (
                    <p className="text-xs text-slate-500">CSV or TXT up to 1MB</p>
                )}
              </div>
            </label>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
        </div>

        <div className="p-6 border-t mt-auto bg-slate-50 rounded-b-xl flex justify-end">
          <button
            onClick={parseFile}
            disabled={!file || isParsing}
            className="w-full sm:w-auto flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isParsing ? 'Parsing...' : 'Parse & Review Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadQuiz;
