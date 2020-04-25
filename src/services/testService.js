import axios from 'axios';

export const getTests = ({ params }) => axios.get('/api/nv/testcases', { params });

export const createTest = ({ params, data }) => axios.post('/api/nv/testcases', data, { params });
