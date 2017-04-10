'use strict'

const express = require('express')
const router = require('express').Router()
const Promise = require('bluebird')
const crypto = require('crypto')

const { checkCode } = require('../utils/server_manager')

const findUniqueCode = () => {
  let gameCode = crypto.randomBytes(2).toString('hex')
  const checkCodeRes = checkCode(gameCode, findUniqueCode)
  return checkCodeRes
}

const GameMod = require('../gamelogic/GameMod')

const allGameMods = {} // just a table to store current mods in

module.exports = router

// need to get a code to start any gamespace and moderator
.get('/code', (req, res, next) => {
  findUniqueCode()
  .then(code => {
    allGameMods.code = new GameMod(code)
    res.send(code)
  })
  .catch(next)
})

// grab the :code off of the route and place the appropriate moderator object on the req
.param('code', (req, res, next, code) => {
  if (allGameMods[code]) {
    req.moderator = allGameMods[code]
    next()
  }
  else {
    res.status(404).send({ error: `That isn't a current game!`})
  }
})

// going to delete this when it's made obsolete by the one below
.get('/make_teams/:code', (req, res, next) => {
  console.log('making teams with', req.moderator)
  req.moderator.makeTeams()
  .then(() => res.send('done'))
})

// parameterized route to use any of the mod methods
// i.e. GET '/games/7129/startSprint' will start the sprint
.get('/:code/:method', (req, res, next) => {
  req.moderator[req.params.method]
})

