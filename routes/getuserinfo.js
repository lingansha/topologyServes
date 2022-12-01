const jwt = require('jsonwebtoken')
const config = require('../config/config')
const Users = require('../model/user.js')
//获取每次请求用户信息中间件
module.exports = async (ctx, next) => {
    let token = ctx.request.header.authorization
    if (token) {
      const secret = config.jwt.SECRET
      let payload = null
      try {
        payload = await jwt.verify(token.split(' ')[1], secret, {expiresIn: '24h'})
      } catch (e) {
        payload = null
      }
      if(payload){
        const userInfo = await Users.findOne({ where: { username: payload.name } });
        const {id,userId,username,avatar} = userInfo._previousDataValues
        ctx.req.userInfo ={id,userId,username,avatar} 
      }
      await next()
    }else{
      await next()
    }
}
