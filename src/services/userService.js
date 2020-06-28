import axios from 'axios';

export const getUser = () => axios.get('/api/user');

export const getProjects = () => axios.get('/api/repos');

export const postProject = (id) => axios.post('/api/repos', { id });

export const deleteProject = (id) => axios.delete(`/api/repos/${id}`);

export const getAllProjects = (page) => axios.get(`/api/projects?page=${page}`);

export const getProject = (id) => axios.get(`/api/projects/${id}`);

export const getRepoTree = (id) => axios.get(`/api/projects/${id}/tree`);

export const getRepoTreePath = (id, path) => axios.get(`/api/projects/${id}/tree?path=${path}`);

export const getRepoTreeFile = (id, path, ref) => axios.get(`/api/projects/${id}/files/${path}?ref=${ref}`);
