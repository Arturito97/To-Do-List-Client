import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_TASKS_API}/api`

export const getAllTasks = () => {
    return axios.get(`${baseUrl}/tasks/`);
};

export const getTask = (id) => {
    return axios.get(`${baseUrl}/tasks/${id}`)
}

export const deleteTask = (id) => {
    return axios.delete(`${baseUrl}/tasks/${id}`);
};

export const addTask = (task) => {
    return axios.post(`${baseUrl}/tasks`, task);
};

export const updateTask = (updatedTask) => {
    return axios.put(`${baseUrl}/tasks/${updatedTask._id}`, updatedTask);
};

export const uploadFile = (uploadData) => {
    return axios.post(`${baseUrl}/upload`, uploadData);
};


/* Authentication Routes */

export const signup = (username, email, password) => {
    return axios.post(`${baseUrl}/signup`, {username, email, password})
}

export const login = (username, password) => {
    return axios.post(`${baseUrl}/login`, {username, password}, {withCredentials: true})
}

export const logout = () => {
  return axios.post(`${baseUrl}/logout`, null, {withCredentials: true});
}

export const loggedin = () => {
  return axios.get(`${baseUrl}/loggedin`, {withCredentials: true});
}