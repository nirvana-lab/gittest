const Router = require('koa-router');

const { logger } = require('../middlewares/logger');
const ProjectService = require('../services/ProjectService');

const ProjectController = new Router();
ProjectController.get('/projects', async (ctx) => {
  try {
    const { data } = await ProjectService.getProjects(ctx);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});

ProjectController.get('/projects/:id', async (ctx) => {
  await ProjectService.getProject(ctx).then((res) => {
    ctx.body = res;
  }).catch((err) => {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  });
});
ProjectController.get('/projects/:id/tree', async (ctx) => {
  try {
    const { data } = await ProjectService.getProjectTree(ctx);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});
ProjectController.get('/projects/:id/files/:path', async (ctx) => {
  try {
    const { data } = await ProjectService.getProjectFile(ctx);
    ctx.body = data;
  } catch (err) {
    logger.error(err);
    ctx.response.status = 500;
    ctx.response.body = err;
  }
});
module.exports = ProjectController;
