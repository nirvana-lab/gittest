import axios from 'axios';

export const getUser = () => axios.get('/api/git/v4/user');

export const getProjects = () => axios.get('/api/git/v4/projects?membership=true');

export const getProject = (id) => axios.get(`/api/git/v4/projects/${id}`);

export const getRepoTree = (id) => axios.get(`/api/git/v4/projects/${id}/repository/tree`);

export const getRepoTreePath = (id, path) => axios.get(`/api/git/v4/projects/${id}/repository/tree?path=${path}`);

export const getRepoTreeFile = (id, path, ref) => axios.get(`/api/git/v4/projects/${id}/repository/files/${path}?ref=${ref}`);
