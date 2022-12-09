const router = require('./index')
var {request} = require('../util/request')
//代理转发接口
router.post('/proxy/request', async(ctx) => {
  try {
    let res =  await request(ctx.request.body)
    console.log(res)
    if(res.status==200){
      ctx.body = {
        code: 200,
        data:res.data
      }
      return
    }
    ctx.body = {
        code: res.response.status || 400,
        data:res
    }
  } catch (e) {
    ctx.throw(e)
  }
})
module.exports = router
