import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { Quiz } from '../types';
import XMarkIcon from './icons/XMarkIcon';
import SparklesIcon from './icons/SparklesIcon';

interface AIQuizGeneratorProps {
  userSubjects: string[];
  onClose: () => void;
  onQuizGenerated: (quiz: Quiz) => void;
}

const keyStages = ["KS1", "KS2", "KS3", "KS4"];
const difficulties = ["Easy", "Medium", "Hard"];
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const AIQuizGenerator: React.FC<AIQuizGeneratorProps> = ({ userSubjects, onClose, onQuizGenerated }) => {
  const [params, setParams] = useState({
    topic: '',
    numQuestions: 5,
    subject: userSubjects[0] || '',
    keyStage: 'KS3',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleParamChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: name === 'numQuestions' ? parseInt(value, 10) : value }));
  };

  const generateQuiz = async () => {
    if (!params.topic) {
      setError('Please provide a topic for the quiz.');
      return;
    }
    setError('');
    setIsLoading(true);

    const prompt = `Generate a quiz for a ${params.keyStage} ${params.subject} class at a ${params.difficulty} difficulty level. The quiz should be titled based on the topic. It must contain exactly ${params.numQuestions} multiple-choice questions about: "${params.topic}". Each question must have exactly 4 options. For each question, provide the index of the correct answer (from 0 to 3).`;

    const schema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: 'A creative title for the quiz based on the topic.' },
        subject: { type: Type.STRING },
        keyStage: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        questions: {
          type: Type.ARRAY,
          description: `An array of exactly ${params.numQuestions} questions.`,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: 'The question text.' },
              options: {
                type: Type.ARRAY,
                description: 'An array of exactly 4 string options.',
                items: { type: Type.STRING },
              },
              correctAnswerIndex: { type: Type.INTEGER, description: 'The 0-based index of the correct option.' },
            },
            required: ['text', 'options', 'correctAnswerIndex'],
          },
        },
      },
      required: ['title', 'subject', 'keyStage', 'difficulty', 'questions'],
    };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const quizData = JSON.parse(response.text);
      
      // Add client-side IDs to questions
      const questionsWithIds = quizData.questions.map((q: any, index: number) => ({...q, id: Date.now() + index }));

      const finalQuiz: Quiz = {
          ...quizData,
          id: `ai-generated-${Date.now()}`,
          questions: questionsWithIds
      };

      onQuizGenerated(finalQuiz);
    } catch (e) {
      console.error("AI Generation Error:", e);
      setError("Failed to generate quiz. The model might be unavailable or the request was filtered. Please try again with a different topic.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Generate Quiz with AI</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700">Topic</label>
            <textarea name="topic" id="topic" value={params.topic} onChange={handleParamChange} rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., The Solar System, Shakespeare's Macbeth, The Norman Conquest" required />
            <p className="mt-1 text-xs text-slate-500">Be specific to get the best results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-700">Number of Questions</label>
              <input type="number" name="numQuestions" id="numQuestions" value={params.numQuestions} min="1" max="20" onChange={handleParamChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700">Subject</label>
              <select name="subject" id="subject" value={params.subject} onChange={handleParamChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {userSubjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="keyStage" className="block text-sm font-medium text-slate-700">Key Stage</label>
              <select name="keyStage" id="keyStage" value={params.keyStage} onChange={handleParamChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {keyStages.map(ks => <option key={ks} value={ks}>{ks}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700">Difficulty</label>
              <select name="difficulty" id="difficulty" value={params.difficulty} onChange={handleParamChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" required>
                  {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}
        </div>

        <div className="p-6 border-t mt-auto bg-slate-50 rounded-b-xl flex justify-end">
          <button
            onClick={generateQuiz}
            disabled={isLoading}
            className="w-full sm:w-auto flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                Generate Quiz & Review
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIQuizGenerator;
