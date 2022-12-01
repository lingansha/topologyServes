const router = require('./index')
const Drawing = require('../model/drawing.js')
router.get('/drawing', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
//创建画布接口
router.post('/drawing/add', async (ctx) => {
  try {
    let res = await Drawing.create({ userId:ctx.req.userInfo.userId});
    ctx.body = {
      code: 200,
      drawingId:res.drawingId,
      msg: '保存成功',
    }
  } catch (e) {
    ctx.throw(e)
  }
  
})
//保存画布信息接口
router.post('/drawing/update', async (ctx, next) => {
  try {
    const { drawingId, data } = ctx.request.body
    if (!data) {
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    const drawingResult = await Drawing.findOne({ where: { drawingId } });
    if (drawingResult) {
      await Drawing.update({ userId:ctx.req.userInfo.userId, drawingId, data },{
        where:{
          drawingId
        }
      });
    } else {
      await Drawing.create({ userId:ctx.req.userInfo.userId, data });
    }
  } catch (e) {
    ctx.throw(e)
  }
  ctx.body = {
    code: 200,
    msg: '保存成功',
  }
})
//保存画布信息接口
router.get('/drawing/detail', async (ctx, next) => {
  try {
    const { drawingId } = ctx.query
    if (!drawingId) {
      ctx.body = {
        code: 400,
        msg: '缺少请求参数！',
      }
      return;
    }
    const drawingResult = await Drawing.findOne({
      where: {
        drawingId
      }
    });
    ctx.body = {
      code: 200,
      data: JSON.parse(drawingResult.data)
    }
  } catch (e) {
    ctx.throw(e)
  }
})
module.exports = router
