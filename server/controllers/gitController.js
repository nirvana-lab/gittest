const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const gitService = require('../services/gitService');

const gitController = new Router();
gitController.get('/sso', async (ctx) => {
  try {
    const data = await gitService.getGit();
    ctx.body = data;
  } catch (err) {
    logger.error(err);
  }
});
gitController.put('/sso', async (ctx) => {
  try {
    await gitService.initGit(ctx.request.body);
    ctx.body = { message: '更新成功' };
  } catch (err) {
    logger.error(err);
    ctx.throw(500);
    ctx.body = { message: '更新失败' };
  }
});

module.exports = gitController;
