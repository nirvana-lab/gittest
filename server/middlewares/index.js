const compose = require('koa-compose');

const { accessLogger } = require('./logger');
const oauth = require('./oauth');

const middleware = () => compose([
  oauth(),
  accessLogger(),
]);
module.exports = middleware;
