const config = {
    jwt: {
      SECRET: 'custom' // jwt密钥
    },
    bcrypt: {
      saltRounds: 12 // 生成salt迭代次数
    },
    crypto: {
      JOINSTR: 'custom' // md5拼接字符串
    },
    uploadsUrl:'./public/uploads/',//自定义组件图片目录
    drawingUrl:'./public/thumbnail/'//画布缩略图路径
  }
  
  module.exports = config