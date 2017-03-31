const crypto = require('crypto')
const checkCode = require('./server_manager').checkCode

const findUniqueCode = function(){
  let gameCode = crypto.randomBytes(2).toString('hex')
  const checkCodeRes = checkCode(gameCode, findUniqueCode)
  return checkCodeRes
}

module.exports = findUniqueCode
