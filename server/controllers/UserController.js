const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const UserService = require('../services/UserService');

const UserController = new Router();
UserController.get('/user', async (ctx) => {
  try {
    const token = ctx.cookies.get('token');
    const data = await UserService.getUser(token);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
  }
});

module.exports = UserController;
