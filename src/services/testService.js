import axios from 'axios';

export const getTests = ({ params }) => axios.get('/api/nv/testcases', { params });

export const getTest = (id) => axios.get(`/api/nv/testcases/${id}`);

export const createTest = ({ params, data }) => axios.post('/api/nv/testcases', data, { params });

export const updateTest = ({ id, data }) => axios.put(`/api/nv/testcases/${id}`, data);

export const runTest = (id) => axios.get(`/api/nv/testcases/${id}/run`);


export const getEnvs = ({ params }) => axios.get('/api/nv/envs', { params });

export const createEnvs = ({ params, data }) => axios.post('/api/nv/envs', data, { params });
