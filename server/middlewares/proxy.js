const proxy = require('koa-proxies');
const cookie = require('cookie');
const compose = require('koa-compose');

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

const middleware = () => compose([
  proxy('/api/nv', configNv),
]);
module.exports = middleware;
