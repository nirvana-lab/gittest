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
  }), {
    headers: { authorization: `Bearer ${token}` },
  }).then((res) => ({ data: { total: NaN, data: res.data.map((i) => ({ ...i, id: encodeURIComponent(i.full_name), _id: i.id })) } }));
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

const gitlabProject = (token, id, host) => axios.get(url.format({
  host,
  pathname: `/api/v4/projects/${id}`,
}), {
  headers: { authorization: `Bearer ${token}` },
});

const githubProject = (token, id, gitHost) => {
  const { protocol, host } = url.parse(gitHost);
  return axios.get(url.format({
    protocol,
    host: `api.${host}`,
    pathname: `/repos/${decodeURIComponent(id)}`,
  }), {
    headers: { authorization: `Bearer ${token}` },
  }).then(({ data: repo }) => ({ ...repo, id: encodeURIComponent(repo.full_name), _id: repo.id }));
};

const getProject = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { id } = ctx.params;
  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  if (data.type === 'gitlab') {
    return gitlabProject(token, id, data.host);
  } if (data.type === 'github') {
    return githubProject(token, id, data.host);
  }
  return '';
};

const gitlabProjectTree = (token, id, host, path) => axios.get(url.format({
  host,
  pathname: `/api/v4/projects/${id}/repository/tree`,
}), { params: { path }, headers: { authorization: `Bearer ${token}` } });

const githubProjectTree = (token, id, gitHost, path) => {
  const { protocol, host } = url.parse(gitHost);
  return axios.get(url.format({
    protocol,
    host: `api.${host}`,
    pathname: path ? `/repos/${decodeURIComponent(id)}/contents/${path}` : `/repos/${decodeURIComponent(id)}/contents`,
  }), { headers: { authorization: `Bearer ${token}` } });
};

const getProjectTree = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { id } = ctx.params;
  const { path } = ctx.query;
  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  if (data.type === 'gitlab') {
    return gitlabProjectTree(token, id, data.host, path);
  } if (data.type === 'github') {
    return githubProjectTree(token, id, data.host, path);
  }
  return '';
};
const gitlabProjectFile = (token, id, path, host, ref) => axios.get(url.format({
  host,
  pathname: `/api/v4/projects/${id}/repository/files/${encodeURIComponent(path)}/raw`,
}), { params: { ref }, headers: { authorization: `Bearer ${token}` } });

const githubProjectFile = (token, id, path, gitHost, ref) => {
  const { protocol, host } = url.parse(gitHost);
  return axios.get(url.format({
    protocol,
    host: `api.${host}`,
    pathname: `/repos/${decodeURIComponent(id)}/contents/${encodeURIComponent(path)}`,
  }), { params: { ref }, headers: { authorization: `Bearer ${token}` } })
    .then(({ data }) => axios.get(data.download_url, { headers: { authorization: `Bearer ${token}`, Accept: 'application/vnd.github.inertia-preview+json' } }));
};

const getProjectFile = async (ctx) => {
  const token = ctx.cookies.get('token');
  const { id, path } = ctx.params;
  const { ref } = ctx.query;
  const data = await Git.findOne({
    attributes: ['type', 'host'],
  });
  if (data.type === 'gitlab') {
    return gitlabProjectFile(token, id, path, data.host, ref);
  } if (data.type === 'github') {
    return githubProjectFile(token, id, path, data.host, ref);
  }
  return '';
};

module.exports = {
  getProjects,
  getProject,
  getProjectTree,
  getProjectFile,
};
