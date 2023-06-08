import axios from 'axios';

const API_BASE_URL = 'https://taskplannerapi.azurewebsites.net/api'; // The base URL of the Azure API endpoint

export const getTasks = () => {
  return axios.get(`${API_BASE_URL}/TaskItems`);
};

export const createTask = (taskItem) => {
  return axios.post(`${API_BASE_URL}/TaskItems`, taskItem);
};

export const updateTask = (taskItem) => {
  return axios.put(`${API_BASE_URL}/TaskItems/${taskItem.id}`, taskItem);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${API_BASE_URL}/TaskItems/${taskId}`);
};
