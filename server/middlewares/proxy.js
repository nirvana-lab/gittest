const proxy = require('koa-proxies');
const cookie = require('cookie');

const config = {
  target: process.env.GIT,
  changeOrigin: true,
  logs: true,
  rewrite: (path) => path.replace('/api/git', '/api'),
  events: {
    proxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        const { token } = cookie.parse(req.headers.cookie);
        proxyReq.setHeader('authorization', `Bearer ${token}`);
      }
    },
  },
};
const configNv = {
  target: process.env.TEST,
  changeOrigin: true,
  logs: true,
  rewrite: (path) => path.replace('/api/nv', '/api'),
  events: {
    proxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        const { token } = cookie.parse(req.headers.cookie);
        proxyReq.setHeader('authorization', `Bearer ${token}`);
      }
    },
  },
};
module.exports = [
  proxy('/api/git', config),
  proxy('/api/nv', configNv),
];
