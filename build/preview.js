const { run } = require('runjs')
const chalk = require('chalk')
const Koa = require('koa')
const static = require('koa-static')

run(`vue-cli-service build`)

const server = new Koa();
const port = 3030
server.listen(port, () => {
  console.log(chalk.green(`> Preview at  http://localhost:${port}`))
});

server.use(static('./my-element-vue/', {
  maxage: 86400 * 1000, // 缓存有效期
}));
