import axios from 'axios';

export const getTasks = (params) => axios.get('/api/nv/testsuits', { params });

export const createTask = (data, params) => axios.post('/api/nv/testsuits', data, { params });

export const updateTask = (data, id) => axios.put(`/api/nv/testsuits/${id}`, data);

export const deleteTask = (id) => axios.delete(`/api/nv/testsuits/${id}`);

export const getTask = (id) => axios.get(`/api/nv/testsuits/${id}`);

export const runTask = (id) => axios.get(`/api/nv/testsuits/${id}`);

export const getAllTestCases = (params) => axios.get('/api/nv/testcases/all', { params });
