const OauthService = require('../services/OauthService');

const oauth = () => async (ctx, next) => {
  const { code } = ctx.query;
  const token = ctx.cookies.get('token');
  if (token) {
    ctx.request.headers.authorization = `Bearer ${token}`;
  }
  if (code && !token) {
    const res = await OauthService.accessToken(code);
    ctx.cookies.set('token', res.data.access_token, { httpOnly: false });
    ctx.redirect('/');
  }
  await next();
};

module.exports = oauth;
