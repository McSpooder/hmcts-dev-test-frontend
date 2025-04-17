const axios = require('axios');

const API_BASE_URL = 'http://localhost:4000/api';

const TaskClient = {
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      console.log('✅ API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
      return [];
    }
  },

  getTaskById: async id => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error);
      return null;
    }
  },

  createTask: async task => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      return null;
    }
  },

  updateTask: async (id, task) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, task);
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id}:`, error);
      return null;
    }
  },

  updateTaskStatus: async (id, status) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating task ${id} status:`, error);
      return null;
    }
  },

  deleteTask: async id => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting task ${id}:`, error);
      return false;
    }
  },
};

module.exports = { TaskClient };
