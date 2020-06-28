const axios = require('axios');
const url = require('url');
const Git = require('../models/Git');

const gitlabProjects = (page, host, token) => axios.get(url.format({
  host,
  pathname: '/api/v4/projects',
  query: {
    membership: true,
    simple: true,
    per_page: 20,
    page,
  },
}), {
  headers: { authorization: `Bearer ${token}` },
}).then((res) => ({ data: { total: res.headers['x-total'], data: res.data } }));

const githubProjects = (page, gitHost, token) => {
  const { protocol, host } = url.parse(gitHost);
  return axios.get(url.format({
    protocol,
    host: `api.${host}`,
    pathname: '/user/repos',
    query: {
      per_page: 20,
      page,
    },
  }), {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => ({ data: { total: NaN, data: res.data } }));
};

const getProjects = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { page } = ctx.query;

  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  if (data.type === 'gitlab') {
    return gitlabProjects(page, data.host, token);
  } if (data.type === 'github') {
    return githubProjects(page, data.host, token);
  }
  return '';
};

const gitlabProject = (id, host) => url.format({
  host,
  pathname: `/api/v4/projects/${id}`,
});

const githubProject = (id, host) => url.format({
  host,
  pathname: `/api/v4/projects?membership=true&simple=true&per_page=20&page=${id}`,
});

const getProject = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { id } = ctx.params;
  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  let projectUrl = '';
  if (data.type === 'gitlab') {
    projectUrl = gitlabProject(id, data.host);
  } else if (data.type === 'github') {
    projectUrl = githubProject(id, data.host);
  }
  return axios.get(projectUrl, {
    headers: { authorization: `Bearer ${token}` },
  });
};

const gitlabProjectTree = (id, host) => url.format({
  host,
  pathname: `/api/v4/projects/${id}/repository/tree`,
});

const githubProjectTree = (id, host) => url.format({
  host,
  pathname: `/api/v4/projects?membership=true&simple=true&per_page=20&page=${id}`,
});

const getProjectTree = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { id } = ctx.params;
  const { path } = ctx.query;
  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  let projectUrl = '';
  if (data.type === 'gitlab') {
    projectUrl = gitlabProjectTree(id, data.host);
  } else if (data.type === 'github') {
    projectUrl = githubProjectTree(id, data.host);
  }
  return axios.get(projectUrl, {
    headers: { authorization: `Bearer ${token}` },
    params: { path },
  });
};
const gitlabProjectFile = (id, path, host) => url.format({
  host,
  pathname: `/api/v4/projects/${id}/repository/files/${encodeURIComponent(path)}/raw`,
});

const githubProjectFile = (id, path, host) => url.format({
  host,
  pathname: `/api/v4/projects/${id}/repository/files/${path}/raw`,
});

const getProjectFile = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { id, path } = ctx.params;
  const { ref } = ctx.query;
  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  let projectUrl = '';
  if (data.type === 'gitlab') {
    projectUrl = gitlabProjectFile(id, path, data.host);
  } else if (data.type === 'github') {
    projectUrl = githubProjectFile(id, path, data.host);
  }
  return axios.get(projectUrl, {
    headers: { authorization: `Bearer ${token}` },
    params: { ref },
  });
};

module.exports = {
  getProjects,
  getProject,
  getProjectTree,
  getProjectFile,
};
