const Router = require('koa-router');
const OauthController = require('./controllers/OauthController');
const RepoController = require('./controllers/RepoController');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');

const forums = new Router();

forums.use('/api', OauthController.routes(), OauthController.allowedMethods());
forums.use('/api', RepoController.routes(), RepoController.allowedMethods());
forums.use('/api', UserController.routes(), UserController.allowedMethods());
forums.use('/api', ProjectController.routes(), ProjectController.allowedMethods());

exports.routes = () => forums.routes();
exports.allowedMethods = () => forums.allowedMethods();
