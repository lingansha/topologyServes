
const router = require('./index')
var {upload} = require('../util/uploads')
const Uploads = require('../model/uploads.js')
router.get('/upload', function (ctx, next) {
  ctx.body = 'this is a upload response!'
})
//上传接口
router.post('/upload/putfile', upload.single('file'), async (ctx) => { 
  const {userId} = ctx.req.userInfo
  await Uploads.create({ userId, filename:'/uploads/'+ctx.req.file.filename,pathname: process.env.domainName+ '/uploads/'+ctx.req.file.filename });
	ctx.body = { 
    code:200,
		data:{
      filename: '/uploads/'+ctx.req.file.filename,//返回文件名 
      pathname: process.env.domainName+ '/uploads/'+ctx.req.file.filename
    }
	} 
})
//获取图片列表分页
router.get('/uploads/images_list_page', async (ctx) => {
  try {
    let currentPage = parseInt(ctx.query.currentPage) || 1 //默认为1
    let pageSize = parseInt(ctx.query.pageSize) || 10
    let list = await Uploads.findAll({
      where: {userId:ctx.req.userInfo.userId},
      offset: (currentPage-1)*pageSize, 
      limit: pageSize
    });
    let count = await Uploads.count({userId:ctx.req.userInfo.userId});
    ctx.body = {
      code: 200,
      data:{
        list,
        total:count
      }
    }
  } catch (e) {
    ctx.throw(e)
  }
})
module.exports = router
