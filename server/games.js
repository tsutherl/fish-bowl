'use strict'

const express = require('express')
const router = require('express').Router()
const Promise = require('bluebird')

const findUniqueCode = require('../utils/theRealUtils')
const GameMod = require('../gamelogic/GameMod')

// just a table to hold all the current mods.
const allGameMods = {}
// {
//  '7129': [Object],
//  '987d': [Object],
//   ...
// }

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

.param('code', (req, res, next, code) => {
  if (allGameMods.code) {
    req.moderator = allGameMods.code
    next()
  }
  else {
    res.status(404)
    // send an express custom error here that says that the code is invalid
  }
})

.get('/make_teams/:code', (req, res, next) => {
  req.moderator.makeTeams
})

// const db = require('APP/db')
// const myFirebase = require('APP/utils/database')
// const firebase = myFirebase.firebase
// const database = myFirebase.database
// const auth = myFirebase.auth

// const serverManager = require('../utils/server_manager')
// const {checkCode, splitPlayersIntoTeams, setTeamsAndCaptains} = serverManager

/*.get('/make_teams/:code', (req, res, next) => {
	const {code} = req.params

	let gameInfo = database.ref('games/' + code).once('value')
	let gamePlayers = database.ref('gamePlayers/' + code).once('value')

	return Promise.all([gameInfo, gamePlayers])
	.then(resp => {
		let game = resp[0]
		let players = resp[1]
		const {team1, team2} = game.val()
		const {team1Players, team2Players} = splitPlayersIntoTeams(players.val())

		let Team1Promise = Promise.map(team1Players, (player, i) => {
			setTeamsAndCaptains(player, i, code, team1)
		})

		let Team2Promise = Promise.map(team2Players, (player, i) => {
			setTeamsAndCaptains(player, i, code, team2)
		})

		return Promise.all([Team1Promise, Team2Promise])
		// .then(() => {
		// 	console.log("about to push to dashboard")
		// 	return database.ref(`games/${code}/status`).set('DASHBOARD')
		// })
		.then(() => {
			// console.log("about to push to team assigned")
			return database.ref(`games/${code}/status`).set('TEAM_ASSIGNED')
		})
		.then(() => {
			// console.log("about to set dashboard")
			setTimeout(() => database.ref(`games/${code}/status`).set('DASHBOARD'), 7000)
		})
		.then(() => res.send('done'))

		// for(let i = 0; i < team1Players.length; i++){
		// 	setTeamsAndCaptains(team1Players[i], i, code, team1)
		// }

		// for(let i = 0; i < team2Players.length; i++){
		// 	setTeamsAndCaptains(team2Players[i], i, code, team2)
		// }

	})*/
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
// })


