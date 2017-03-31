'use strict'

const db = require('APP/db')
const router = require('express').Router()

const { findUniqueCode } = require('../utils/theRealUtils')

module.exports = router

router

// need to get a code to start any gamespace
.get('/code', (req, res, next) => {
  findUniqueCode()
  .then(code => {
    res.send(code)
  })
})

