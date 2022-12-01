const router = require('./index')
const Drawing = require('../model/drawing.js')
router.get('/drawingsee', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
//获取画布信息接口
router.get('/drawingsee/detail', async(ctx, next) => {
  try {
    const {drawingId} = ctx.query
    if(!drawingId){
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    const drawingResult =  await Drawing.findOne({
      where: {
        drawingId
      }
    });
    ctx.body = {
      code: 200,
      data:JSON.parse(drawingResult.data)
    }
  } catch (e) {
    ctx.throw(e)
  }
})
module.exports = router
