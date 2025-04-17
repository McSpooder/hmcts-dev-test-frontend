export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export const TaskClient: {
  getAllTasks(): Promise<Task[]>;
  getTaskById(id: number): Promise<Task | null>;
  createTask(task: Task): Promise<void>;
  updateTask(id: number, task: Task): Promise<void>;
  updateTaskStatus(id: number, status: string): Promise<void>;
  deleteTask(id: number): Promise<void>;
};
