const axios = require('axios');
const Repo = require('../models/Repo');
const { getUser } = require('./UserService');

const getGitRepos = (headers) => axios.get(`${process.env.GIT}/api/v4/projects?membership=true&simple=true`, { headers });

const getRepos = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const [{ data: user }, { data: repos }] = await Promise.all([
    getUser(headers),
    getGitRepos(headers),
  ]);
  const repoMap = await Repo.findAll(
    {
      attributes: ['repo'],
    },
    {
      where: { user: user.id },
    },
  );
  return repos.filter((repo) => repoMap.some((i) => i.repo === repo.id));
};

const postRepo = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data: user } = await getUser(headers);
  const repos = await Repo.findAll({ user: user.id, repo: ctx.request.body.id });
  if (!repos.length) {
    await Repo.create({ user: user.id, repo: ctx.request.body.id });
  }
};

const deleteRepo = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data: user } = await getUser(headers);
  await Repo.delete({ user: user.id, repo: ctx.request.body.id });
};

module.exports = {
  getGitRepos,
  getRepos,
  postRepo,
  deleteRepo,
};
