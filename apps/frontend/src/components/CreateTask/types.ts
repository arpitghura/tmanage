export type TaskStatus = 'pending' | 'completed' | 'progress';

export interface User {
  id: string;
  name: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo: string;
  dueDate: Date | null;
}