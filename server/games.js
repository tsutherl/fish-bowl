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

router.get('/code', (req, res, next) => {
	findUniqueCode()
	.then(code => {
		// console.log("CODE BEFORE RES.SEND: ", code)
		res.send(code)
	})
})

module.exports = router 