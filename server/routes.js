const Router = require('koa-router');
const gitController = require('./controllers/gitController');

const forums = new Router();


forums.use('/api', gitController.routes(), gitController.allowedMethods());
exports.routes = () => forums.routes();
exports.allowedMethods = () => forums.allowedMethods();
