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
    uploadsUrl:'./public/uploads/'
  }
  
  module.exports = config