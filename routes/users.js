const router = require('./index')
const Users = require('../model/user.js')
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config/config')
const { encryptPassword, verifyPassword } = require('../util/user')

router.get('/users', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
//注册接口
router.post('/users/register', async(ctx, next) => {
  const { username, password } = ctx.request.body
  if(!username || !password){
    ctx.body = {
      code: 400,
      msg: '缺少请求参数！',
    }
    return;
  }
  const userInfo = await Users.findAll({
    attributes: ['username']
  });
  console.log(userInfo,'==userInfo==')
  if (userInfo.length) {
    ctx.body = {
      code: 201,
      msg: '用户名已存在'
    }
    return
  }
  
  const pwdEncrypt = encryptPassword(password)
  await Users.create({ username,password:pwdEncrypt});
  ctx.body = {
    code: 200,
    msg: '注册成功',
  }
})
//登录接口
router.post('/users/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  if(!username || !password){
    ctx.body = {
      code: 400,
      msg: '缺少请求参数！',
    }
    return;
  }
  const userInfo =  await Users.findOne({ where: { username:username } });
  console.log(userInfo,'==userInfo==')
  if (!userInfo) {
    ctx.body = {
      code: 401,
      msg: '用户名不存在',
    }
    return
  }
  const verifyPwd = verifyPassword(password, userInfo.password)
  if (verifyPwd) {
    const token = jsonwebtoken.sign({ name: username }, config.jwt.SECRET, { expiresIn: '3h' }) // token 有效期为3小时
    ctx.cookies.set(
        'token',
        token,
        {
            domain: 'localhost', // 设置 cookie 的域
            path: '/', // 设置 cookie 的路径
            maxAge: 3 * 60 * 60 * 1000, // cookie 的有效时间 ms
            expires: new Date('2022-12-30'), // cookie 的失效日期，如果设置了 maxAge，expires 将没有作用
            httpOnly: true, // 是否要设置 httpOnly
            overwrite: true // 是否要覆盖已有的 cookie 设置
        }
    )
    const{id,userid,favoriteColor,age,cash,avatar} = userInfo._previousDataValues
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        token:token,
        id,userid,username,favoriteColor,age,cash,avatar
      }
    }
  } else {
    ctx.body = {
      code: 401,
      msg: '用户名密码不匹配'
    }
  }
})
module.exports = router
