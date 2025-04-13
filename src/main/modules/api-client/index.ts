import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
}

export const TaskClient = {
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },

  getTaskById: async (id: number): Promise<Task | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      return null;
    }
  },

  createTask: async (task: Task): Promise<Task | null> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  },

  updateTask: async (id: number, task: Task): Promise<Task | null> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      return null;
    }
  },

  updateTaskStatus: async (id: number, status: string): Promise<Task | null> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id} status:`, error);
      return null;
    }
  },

  deleteTask: async (id: number): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      return false;
    }
  }
};