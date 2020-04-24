import axios from 'axios';

export const getTests = ({ params }) => axios.get('/api/nv/testcases', { params });

export const getUser = () => axios.get('/api/git/v4/user');
