const router = require('koa-router')()
const jwt = require('koa-jwt');
const config = require('../config/config')
// 这里调用引入的jwt方法，最终会得到一个中间件
router.prefix('/api')
router.use( require('./getuserinfo'), // 以 public 开头的请求地址不使用 jwt 中间件
);
router.use( jwt({
  secret: config.jwt.SECRET,
  cookie: 'token', // 从 cookie 中获取token
  debug: true // 开启debug可以看到准确的错误信息
})
  .unless({ path: [/^\/public/,/^\/api\/users/,/^\/api\/drawingsee/,/^\/api\/proxy/] }))
module.exports = router
