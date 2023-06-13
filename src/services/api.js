import axios from 'axios';
// The base URL of the Azure API endpoint
const API_BASE_URL = 'https://taskplannerapi.azurewebsites.net/api'; 

/*All methods are defined here for interacting with the Azure API endpoint.
The URL endpoint defines where the call will be made.*/

// Methods for CRUD operations on Categories
export const getAllCategories = () => {
  return axios.get(`${API_BASE_URL}/Categories`);
};

export const createCategory = (category) => {
  return axios.post(`${API_BASE_URL}/Categories`, category);
};

export const updateCategory = (category) => {
  return axios.put(`${API_BASE_URL}/Categories/${category.id}`, category);
};

export const deleteCategory = (id) => {
  return axios.get(`${API_BASE_URL}/Categories/${id}`);
};

// Methods for CRUD operations on TaskItems
export const getAllTasks = () => {
  return axios.get(`${API_BASE_URL}/TaskItems`);
};

export const getTaskById = (taskId) => {
  return axios.get(`${API_BASE_URL}/TaskItems/${taskId}`);
};

export const getAllTasksByCategoryId = (id) => {
  return axios.get(`${API_BASE_URL}/TaskItems/${id}`);
};

export const createTask = (taskItem) => {
  return axios.post(`${API_BASE_URL}/TaskItems`, taskItem);
};

export const updateTask = (taskItem) => {
  return axios.put(`${API_BASE_URL}/TaskItems/${taskItem.id}`, taskItem);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_BASE_URL}/TaskItems/${id}`);
};