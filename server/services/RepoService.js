const axios = require('axios');
const url = require('url');
const Repo = require('../models/Repo');
const Git = require('../models/Git');

const { getUser } = require('./UserService');

const getGitlabRepo = (token, id, host) => axios.get(url.format({
  host,
  pathname: `/api/v4/projects/${id}`,
}), {
  headers: { authorization: `Bearer ${token}` },
});

const getGithubRepo = (token, id, host) => axios.get(url.format({
  host,
  pathname: `/api/v4/projects/${id}`,
}), {
  headers: { authorization: `Bearer ${token}` },
});

const getRepos = async (ctx) => {
  const token = ctx.cookies.get('token');
  const user = await getUser(token);
  const repoMap = await Repo.findAll({
    attributes: ['repo'],
    where: { user: user.id, host: user.host },
  });
  const git = await Git.findOne({
    attributes: ['type', 'host'],
  });
  const data = await Promise.all(
    repoMap.map((repo) => {
      let temp = '';
      if (git.type === 'gitlab') {
        temp = getGitlabRepo;
      } else if (git.type === 'github') {
        temp = getGithubRepo;
      }
      return temp(token, repo.repo, git.host)
        .then((res) => res.data)
        .catch(() => ({
          id: repo.repo, name: 'Deprecated', visibility: 'deleted', namespace: { full_path: '-' },
        }));
    }),
  );
  return data;
};

const postRepo = async (ctx) => {
  const { body } = ctx.request;
  const token = ctx.cookies.get('token');
  const user = await getUser(token);
  const repos = await Repo.findAll({
    raw: true,
    where: { user: user.id, repo: body.id, host: user.host },
  });
  if (!repos.length) {
    await Repo.create({ user: user.id, repo: body.id, host: user.host });
  }
};

const deleteRepo = async (ctx) => {
  const token = ctx.cookies.get('token');
  const user = await getUser(token);
  await Repo.destroy({ where: { user: user.id, repo: ctx.params.id, host: user.host } });
};

module.exports = {
  getRepos,
  postRepo,
  deleteRepo,
};
