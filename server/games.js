'use strict'

const db = require('APP/db')
const router = require('express').Router()
const crypto = require('crypto')
const checkCode = require('../utils/server_manager').checkCode


function findUniqueCode(){
	let gameCode = crypto.randomBytes(2).toString('hex')
	const checkCodeRes = checkCode(gameCode, findUniqueCode)
	return checkCodeRes
}

// for the "continue" button after "create game"
router.get('/code', (req, res, next) => {
	findUniqueCode()
	.then(code => {
		// console.log("CODE BEFORE RES.SEND: ", code)
		res.send(code)
	})
})


// for the "start" button after all players join
router.get('/start/:code', (req, res, next) => {
  const code = req.params.code

})




module.exports = router
