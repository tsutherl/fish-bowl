const myFirebase = require('./database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const gameUtils = require('../gamelogic/utils')
const shuffle = gameUtils.shuffle

module.exports = {
	checkCode: (code, func) => {
		return firebase.database().ref('games/' + code).once('value')
		.then(snapshot => {
			if(snapshot.val() === null) return code
			else return func()
		})
	},

	setTeamsAndCaptains: (playerId, playerNum, code, teamId) => {
		let gameTeams = database.ref(`gameTeams/${code}/${teamId}/players/${playerNum}`).set(playerId)
		let player = database.ref(`players/${playerId}/team`).set(teamId)
		let promiseArr = [gameTeams, player]
		// console.log("PLAYER NUM: ", playerNum)
		if(!playerNum){
			// console.log("INSIDE CONDITIONAL")
			promiseArr.push(
			  database
			  .ref(`gameTeams/${code}/${teamId}/captain`)
			  .set(playerId))
			promiseArr.push(
			  database
			  .ref(`players/${playerId}/isCaptain`)
			  .set(true))
		}
		return Promise.all(promiseArr)

	}
}



