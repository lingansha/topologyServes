
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
module.exports = router
