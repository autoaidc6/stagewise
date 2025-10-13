export enum UserRole {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
}

export interface User {
  name: string;
  email: string;
  role: UserRole;
  keyStage?: string;
  yearGroup?: number;
  subjects?: string[];
  classGroups?: string[];
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id?: string | number;
  title: string;
  subject: string;
  keyStage: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
}