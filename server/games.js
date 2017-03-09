'use strict'

const db = require('APP/db')
const router = require('express').Router()
const crypto = require('crypto')

console.log("THIS IS CRYPTO: ", crypto)

router.get('/code', (req, res, next) => {
	crypto.randomBytes(2, (err, buf) => {
	  if (err) throw err;
	  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);
	  const gameCode = buf.toString('hex')
	  res.send(buf.toString('hex'))
	});
})

module.exports = router 