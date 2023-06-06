import axios from 'axios';

const API_BASE_URL = 'https://taskplannerapi.azurewebsites.net/api'; // Update with your API base URL

export const getTaskItems = () => {
  return axios.get(`${API_BASE_URL}/TaskItems`);
};

export const createTaskItem = (taskItem) => {
  return axios.post(`${API_BASE_URL}/TaskItems`, taskItem);
};

// Define other API functions for update, delete, etc. as needed