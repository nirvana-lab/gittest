const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const OauthService = require('../services/OauthService');

const GitController = new Router();
GitController.get('/sso', async (ctx) => {
  try {
    const data = await OauthService.authorize();
    ctx.body = data;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});
GitController.put('/sso', async (ctx) => {
  try {
    await OauthService.registGit(ctx.request.body);
    ctx.body = { message: '更新成功' };
  } catch (err) {
    logger.error(err);
    ctx.throw(500);
    ctx.body = { message: '更新失败' };
  }
});

module.exports = GitController;
