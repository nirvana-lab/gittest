const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const RepoService = require('../services/RepoService');
const TestService = require('../services/TestService');

const RepoController = new Router();
RepoController.get('/repos', async (ctx) => {
  try {
    const data = await RepoService.getRepos(ctx);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});

RepoController.post('/repos', async (ctx) => {
  try {
    await RepoService.postRepo(ctx);
    ctx.body = { message: '创建成功' };
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});

RepoController.delete('/repos/:id', async (ctx) => {
  try {
    await RepoService.deleteRepo(ctx);
    ctx.body = { message: '删除成功' };
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});

RepoController.get('/task/:id', async (ctx) => {
  try {
    const data = await TestService.getTaskRun(ctx);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});
module.exports = RepoController;
