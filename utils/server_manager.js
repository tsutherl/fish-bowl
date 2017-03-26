// import firebase from 'firebase'
// import keys from 'APP/keys.js'

// const config = keys.config

// firebase.initializeApp(config)

const myFirebase = require('./database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const gameUtils = require('../gamelogic/utils')
const shuffle = gameUtils.shuffle

// const database = firebase.database();
// const auth = firebase.auth();

module.exports = {
	checkCode: (code, func) => {
		// console.log("CODE in checkCode: ", code)
		// firebase.database().ref('/games/' + code).once('value', function(snapshot){
		// 	console.log("value: ", snapshot.val())
		// 	if(snapshot.val() === null) return code
		// 	else return func()
		// })

		return firebase.database().ref('games/' + code).once('value')
		.then(snapshot => {
			if(snapshot.val() === null) return code
			else return func()
		})
	},

	splitPlayersIntoTeams: (players) => {
		const playersArr = Object.keys(players)
		// for(key in players){
			
		// 	let player = {}
		// 	player[key] = players[key]
		// 	console.log("********** THIS IS A PLAYER *********** ", player)
		// 	playersArr.push(player)
		// }
		console.log("PLAYERS ARRAY: ", playersArr)
		const shuffledPlayers = shuffle(playersArr)
		const mid = Math.floor((playersArr.length + 1)/2)
		const team1Players = shuffledPlayers.slice(0, mid)
		const team2Players = shuffledPlayers.slice(mid)
		return {team1Players, team2Players}
	},

	setTeamsAndCaptains: (playerId, playerNum, code, teamId) => {
		// console.log("PLAYER BEFORE SETTING: ", playerId)
		// console.log("PLAYER NUM: ", playerNum)
		let gameTeams = database.ref(`gameTeams/${code}/${teamId}/players/${playerNum}`).set(playerId)
		let player = database.ref(`players/${playerId}/team`).set(teamId)
		database.ref(`players/${playerId}`).once('value')
		.then(playerInfo => {
			// if admin make 
			if(playerInfo.val().isAdmin){

			}
		})
	}
}



