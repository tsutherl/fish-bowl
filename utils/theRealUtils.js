const crypto = require('crypto')
const checkCode = require('./utils/server_manager').checkCode

module.exports = {
  findUniqueCode: function(){
    let gameCode = crypto.randomBytes(2).toString('hex')
    const checkCodeRes = checkCode(gameCode, findUniqueCode)
    return checkCodeRes
  }
}
