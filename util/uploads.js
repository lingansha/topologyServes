
const multer = require('koa-multer');
const config = require('../config/config')
//配置
var storage = multer.diskStorage({
  //配置图片上传的目录
  destination: function (req, file, cb) {
    cb(null, config.uploadsUrl); //注意路径必须存在
  },
  //图片上传完成重命名
  filename: function (req, file, cb) {
    // 获取后缀名
    var fileFormat = file.originalname.split('.');
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
  },
});
//加载配置
var upload = multer({ storage: storage });
module.exports ={
    upload
}