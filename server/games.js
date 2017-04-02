'use strict'

const db = require('APP/db')
const myFirebase = require('APP/utils/database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const auth = myFirebase.auth
const browserHistory = require('react-router').browserHistory
const router = require('express').Router()
const crypto = require('crypto')
const serverManager = require('../utils/server_manager')
const Promise = require('bluebird')
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

	let teamInfo = database.ref(`games/${code}/teams`).once('value')
	let gamePlayers = database.ref(`games/${code}/players`).once('value')

	return Promise.all([teamInfo, gamePlayers])
	.then(resp => {
		let teams = resp[0]
		let players = resp[1]
		const {team1Players, team2Players} = splitPlayersIntoTeams(players.val())
		console.log("team1Players: ", team1Players)
		console.log("team2Players: ", team2Players)

		let Team1Promise = Promise.map(team1Players, (player, i) => {
			setTeamsAndCaptains(player, i, code, 'team1')
		})

		let Team2Promise = Promise.map(team2Players, (player, i) => {
			setTeamsAndCaptains(player, i, code, 'team2')
		})

		return Promise.all([Team1Promise, Team2Promise])
		// .then(() => {
		// 	console.log("about to push to dashboard")
		// 	return database.ref(`games/${code}/status`).set('DASHBOARD')
		// })
		.then(() => {
			console.log("about to push to team assigned")
			return database.ref(`games/${code}/status`).set('TEAM_ASSIGNED')
		})
		.then(() => {
			console.log("about to set dashboard")
			setTimeout(() => database.ref(`games/${code}/status`).set('DASHBOARD'), 5000)
		})
		.then(() => res.send('done'))

		// for(let i = 0; i < team1Players.length; i++){
		// 	setTeamsAndCaptains(team1Players[i], i, code, team1)
		// }

		// for(let i = 0; i < team2Players.length; i++){
		// 	setTeamsAndCaptains(team2Players[i], i, code, team2)
		// }
		
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

router.put('/:gameId/teams/:team/name', (req, res, next) => {
	database.ref(`games/${req.params.gameId}/teams/${req.params.team}`).update({name: req.body.teamName})
	.then(() => res.send('done'))
})


module.exports = router 