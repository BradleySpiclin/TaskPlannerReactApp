import axios from 'axios';

const API_BASE_URL = 'https://taskplannerapi.azurewebsites.net/api'; // The base URL of the Azure API endpoint

// Make an API request to retrieve all tasks
export const getTasks = () => {
  return axios.get(`${API_BASE_URL}/TaskItems`);
};

// Make an API request to POST a task
export const createTask = (taskItem) => {
  return axios.post(`${API_BASE_URL}/TaskItems`, taskItem);
};

// Make an API request to PUT a task by ID
export const updateTask = (taskItem) => {
  return axios.put(`${API_BASE_URL}/TaskItems/${taskItem.id}`, taskItem);
};

// Make an API request to DELETE a task by ID
export const deleteTask = (taskId) => {
  return axios.delete(`${API_BASE_URL}/TaskItems/${taskId}`);
};

// Make an API request to retrieve the task item by ID
export const fetchTaskById = (taskId) => {
  return axios.get(`${API_BASE_URL}/TaskItems/${taskId}`);
};
