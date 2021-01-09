const Koa = require('koa')
const static = require('koa-static')

const server = new Koa();
server.listen(3030);

// http://localhost:3030/skin.min.css
server.use(static('./public/static/', {
  maxage: 86400 * 1000, // 缓存有效期
}));
