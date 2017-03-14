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
	// crypto.randomBytes(2, (err, buf) => {
	//   if (err) throw err;
	//   console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
	//   const gameCode = buf.toString('hex')
	//   res.send(buf.toString('hex'))
	// });

	findUniqueCode()
	.then(code => {
		res.send(code)
	})
})

module.exports = router 