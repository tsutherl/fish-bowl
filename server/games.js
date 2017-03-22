'use strict'

const db = require('APP/db')
const myFirebase = require('APP/utils/database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const auth = myFirebase.auth
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

// Randomly assign players to two teams
// Method 1: 
// Convert object of players to an array
// Shuffle array and split it at the middle

// Method 2: 
// Loop through each player
// assign to team 
router.get('/make_teams/:code', (req, res, next) => {
	const {code} = req.params
	database.ref('games/' + code).once('value')
	.then(snapshot => {
		const game = snapshot.val()
		const {team1, team2} = game
	})

	database.ref('gamePlayers/' + code).once('value')
	.then(snapshot => {
		let players = snapshot.val()
		let playersArr = Object.keys(players)
		console.log("PLAYERS ARRAY: ", playersArr)

	})
})


module.exports = router 