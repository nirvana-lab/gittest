const axios = require('axios');
const Repo = require('../models/Repo');
const { getUser } = require('./UserService');

const getGitRepo = (headers, id) => axios.get(`${process.env.GIT}/api/v4/projects/${id}`, { headers });

const getRepos = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const user = await getUser(headers);
  const repoMap = await Repo.findAll({
    attributes: ['repo'],
    where: { user: user.data.id },
  });
  const data = await Promise.all(
    repoMap.map((repo) => getGitRepo(headers, repo.repo)
      .then((res) => res.data)
      .catch(() => ({
        id: repo.repo, name: 'Deprecated', visibility: 'deleted', namespace: { full_path: '-' },
      }))),
  );
  return data;
};

const postRepo = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data: user } = await getUser(headers);
  const repos = await Repo.findAll({
    raw: true,
    where: { user: user.id, repo: ctx.request.body.id },
  });
  if (!repos.length) {
    await Repo.create({ user: user.id, repo: ctx.request.body.id });
  }
};

const deleteRepo = async (ctx) => {
  const headers = { authorization: `Bearer ${ctx.cookies.get('token')}` };
  const { data: user } = await getUser(headers);
  await Repo.destroy({ where: { user: user.id, repo: ctx.params.id } });
};

module.exports = {
  getRepos,
  postRepo,
  deleteRepo,
};
