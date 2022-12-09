const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
//const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const index = require('./routes/index')
const users = require('./routes/users')
const drawing = require('./routes/drawing')
const drawingsee = require('./routes/drawingsee')
const component = require('./routes/component')
const upload = require('./routes/upload')
const proxy = require('./routes/proxy')
const cors = require('koa2-cors')
// error handler
//onerror(app)
app.use(
  cors({
      origin: function(ctx) { //设置允许来自指定域名请求
          // if (ctx.url.indexOf('/uploads')!=-1) {
          //     return '*'; // 允许来自所有域名请求
          // }
          // return 'http://192.168.1.74:8080'; //只允许http://localhost:8080这个域名的请求
          return '*'; // 允许来自所有域名请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// 错误处理
const error = require("koa-json-error")
app.use(error({
  format: err => {
    return { code: err.status, message: err.message, result: err.stack }
  },
  postFormat: (err, obj) => {
    const { result, ...rest } = obj
    return obj //rest。可以判断一下，如果是开发环境，就返回obj;生产环境返回rest
  }
}))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.throw(error) //此方式可输出状态码。传入error可使错误信息更详细
  }
})
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(drawing.routes(), drawing.allowedMethods())
app.use(drawingsee.routes(), drawingsee.allowedMethods())
app.use(component.routes(), component.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(proxy.routes(), proxy.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
