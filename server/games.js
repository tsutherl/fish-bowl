'use strict'

const db = require('APP/db')
const myFirebase = require('APP/utils/database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const auth = myFirebase.auth
const router = require('express').Router()
const crypto = require('crypto')
const serverManager = require('../utils/server_manager')
const {checkCode, splitPlayersIntoTeams, setTeamsAndCaptains} = serverManager



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

	let gameInfo = database.ref('games/' + code).once('value')
	let gamePlayers = database.ref('gamePlayers/' + code).once('value')

	Promise.all([gameInfo, gamePlayers])
	.then(resp => {
		let game = resp[0]
		let players = resp[1]
		const {team1, team2} = game.val()
		console.log("TEAM 1: ", team1)
		console.log("TEAM 2: ", team2)
		const {team1Players, team2Players} = splitPlayersIntoTeams(players.val())
		console.log("team1Players: ", team1Players)
		console.log("team2Players: ", team2Players)
	
		for(let i = 0; i < team1Players.length; i++){
			setTeamsAndCaptains(team1Players[i], i, code, team1, "team1")
		}

		for(let i = 0; i < team2Players.length; i++){
			setTeamsAndCaptains(team2Players[i], i, code, team2, "team2")
		}
		res.send('done')
	})
	// database.ref('games/' + code).once('value')
	// .then(snapshot => {
	// 	const game = snapshot.val()
	// 	const {team1, team2} = game

	// 	database.ref('gamePlayers/' + code).once('value')
	// 	.then(snapshot => {
	// 		const players = snapshot.val()
	// 		const {team1Players, team2Players} = splitPlayersIntoTeams(players)
			
	// 		for(let i = 0; i < team1Players.length; i++){
	// 			setTeamsAndCaptains(team1Players[i], code)
	// 		}
	// 		team1Players.forEach((player) => {
	// 			database.ref('/players' + player).once('value')
	// 			.then(playerInfo => {
	// 				// if admin make 
	// 				if(playerInfo.val().isAdmin){

	// 				}
	// 			})
	// 			})

	// 	})
	// })
})


module.exports = router 