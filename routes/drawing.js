const router = require('./index')
const Drawing = require('../model/drawing.js')
router.get('/drawing', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
//保存画布信息接口
router.post('/drawing/save', async(ctx, next) => {
  const { userId, drawingId,data } = ctx.request.body
  if(!userId || !data){
    ctx.body = {
      code: 400,
      msg: '缺少请求参数！',
    }
    return;
  }
  await Drawing.create({ userId, drawingId,data });
  ctx.body = {
    code: 200,
    msg: '保存成功',
  }
})
//保存画布信息接口
router.post('/drawing/update', async(ctx, next) => {
  const { userId, drawingId,data } = ctx.request.body
  if(!userId || !data){
    ctx.body = {
      code: 400,
      msg: '缺少请求参数！',
    }
    return;
  }
  const drawingResult =  await Drawing.findOne({ where: { drawingId } });
  if(drawingResult){
    const res = Drawing.build({ userId, drawingId,data });
    await res.save();
  }else{
    await Drawing.create({ userId, drawingId,data });
  }
  ctx.body = {
    code: 200,
    msg: '保存成功',
  }
})
//保存画布信息接口
router.get('/drawing/detail', async(ctx, next) => {
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
})
module.exports = router
