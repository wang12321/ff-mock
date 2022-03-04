const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()
const cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const staticKoa = require('koa-static') // 处理静态资源
// 静态文件处理
function staticPath(path){
  app.use(staticKoa(path))
}

app.use(bodyparser())
// 跨域
app.use(cors({
  origin: function(ctx) {
    // 这里用 headers 和 header 属性皆可
    return ctx.header.origin
  }
}))

app.use(router.routes()) // 启动路由
app.use(router.allowedMethods())
app.listen(9000, console.log('application is start at port 9000'))

module.exports = {
  router,
  app,
  staticPath
}
