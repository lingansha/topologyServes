const crypto = require('crypto') // node 自带
const bcrypt = require('bcryptjs') // 需安装依赖 npm i bcryptjs
const { bcrypt: bcryptConfig, crypto: cryptoConfig } = require('../config/config')

// md5加密
function md5(v) {
  const { JOINSTR } = cryptoConfig
  return crypto.createHash('md5').update(v + JOINSTR).digest('hex')
}

// 密码加密
function encryptPassword(password) {
  const { saltRounds } = bcryptConfig
  const pwdEnCode = md5(password)
  const salt = bcrypt.genSaltSync(saltRounds)
  return bcrypt.hashSync(pwdEnCode, salt)
}

// 密码验证
function verifyPassword(inputPwd, userPwd) {
  const pwdEnCode = md5(inputPwd)
  return bcrypt.compareSync(pwdEnCode, userPwd)
}

module.exports = {
  encryptPassword,
  verifyPassword
}