
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
