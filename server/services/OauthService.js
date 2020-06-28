const url = require('url');
const axios = require('axios');
const stringRandom = require('string-random');
const Git = require('../models/Git');

const registGit = async ({
  type, clientId, clientSecret, callback, host,
}) => {
  const result = await Git.findOne({
    attributes: ['client_id', 'client_secret', 'callback', 'host'],
  });
  if (!result) {
    return Git.create({
      type,
      host,
      client_id: clientId,
      client_secret: clientSecret,
      callback,
      state: stringRandom(16),
    });
  }
  return Git.update(
    {
      type,
      host,
      client_id: clientId,
      client_secret: clientSecret,
      callback,
      state: stringRandom(16),
    },
    { where: { client_id: result.client_id } },
  );
};

const gitlabAuthorize = (host, clientId, redirectUri, state) => url.format({
  host,
  query: {
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    state,
  },
  pathname: '/oauth/authorize',
});

const githubAuthorize = (host, clientId, redirectUri, state) => url.format({
  host,
  query: {
    scope: 'user,repo',
    state,
    client_id: clientId,
    redirect_uri: redirectUri,
  },
  pathname: '/login/oauth/authorize',
});

const authorize = async () => {
  const data = await Git.findOne({
    attributes: ['type', 'client_id', 'callback', 'state', 'host'],
  });
  if (!data) return '';
  const {
    type, client_id: clientId, callback, state, host,
  } = data;
  if (type === 'gitlab') {
    return gitlabAuthorize(host, clientId, callback, state);
  }
  return githubAuthorize(host, clientId, callback, state);
};
const parsePar = (string) => {
  const obj = {};
  const pairs = string.indexOf('&') !== -1 ? string.split('&') : string;
  pairs.forEach((pair) => {
    let name = '';
    let value = '';
    let temp = [];
    if (pair.indexOf('=') !== -1) {
      temp = pair.split('=');
      name = decodeURIComponent(temp[0]);
      value = decodeURIComponent(temp[1]);
    } else {
      name = decodeURIComponent(temp);
      value = '';
    }
    obj[name] = !obj[name] ? value : [].concat(obj[name]).concat(value);
  });
  return obj;
};
const gitlabAccessToken = (host, code, clientId, clientSecret, redirectUri, state) => {
  const path = url.format({ host, pathname: '/oauth/token' });
  return axios.post(path, {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    state,
  });
};

const githubAccessToken = (host, code, clientId, clientSecret, redirectUri, state) => {
  const path = url.format({ host, pathname: '/login/oauth/access_token' });
  return axios.get(path, {
    params: {
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
      state,
    },
  }).then(({ data }) => {
    const params = parsePar(data);
    return { data: { access_token: params.access_token } };
  });
};

const accessToken = async (code) => {
  const data = await Git.findOne({
    attributes: ['type', 'client_id', 'client_secret', 'callback', 'state', 'host'],
  });
  const {
    type, client_id: clientId, client_secret: clientSecret, callback, state, host,
  } = data;
  if (type === 'gitlab') {
    return gitlabAccessToken(host, code, clientId, clientSecret, callback, state);
  }
  return githubAccessToken(host, code, clientId, clientSecret, callback, state);
};

module.exports = {
  registGit,
  authorize,
  accessToken,
};
