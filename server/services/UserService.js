const axios = require('axios');
const url = require('url');
const Git = require('../models/Git');

const gitlabUser = (host) => url.format({
  host,
  pathname: '/api/v4/user',
});

const githubUser = (gitHost) => {
  const { protocol, host } = url.parse(gitHost);
  return url.format({
    protocol,
    host: `api.${host}`,
    pathname: '/user',
  });
};

const getUser = async (token) => {
  const git = await Git.findOne({
    attributes: ['type', 'host'],
  });
  let resultUrl = '';
  if (git.type === 'gitlab') {
    resultUrl = gitlabUser(git.host);
  } else if (git.type === 'github') {
    resultUrl = githubUser(git.host);
  }
  return axios.get(resultUrl, {
    headers: { authorization: `Bearer ${token}` },
  }).then(({ data }) => {
    const { hostname } = url.parse(git.host);
    return { ...data, host: hostname };
  });
};

module.exports = {
  getUser,
};
