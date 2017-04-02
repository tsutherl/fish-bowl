import store from 'APP/app/store'
import {browserHistory} from 'react-router';
import {authenticated} from 'APP/app/reducers/auth'
import {setGame} from 'APP/app/reducers/game'
import {setPlayers} from 'APP/app/reducers/players'
import {setTeams} from 'APP/app/reducers/teams'

const myFirebase = require('./database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const auth = myFirebase.auth

//TODO: i think it would be really helpful to have our fb names line up with our store state name ex. store state has user but fb has players - just a thought - or maybe we should just add comments for stuff like that

const utilFunctions = {
	registerGame: (game, code, admin) => {


		// Initializing team information
		const Team1 = {name: 'Team 1', numPlayers: 0, captain: '', game: code}
		const Team2 = {name: 'Team 2', numPlayers: 0, captain: '', game: code}

		let gameObj = Object.assign({}, game, {admin, status: 'SETUP'})
		return database.ref(`games/${code}`).set(gameObj)
		.then(() => {
			// database.ref(`games/${code}/teams`).push(Team1).key
			// database.ref(`games/${code}/teams`).push(Team2).key
			database.ref(`games/${code}/teams/team1`).set(Team1)
			database.ref(`games/${code}/teams/team2`).set(Team2)
		})

		// Add teams to Firebase and grab their keys
		// const team1_id = database.ref(`games/${code}/teams`).push(Team1).key
		// const team2_id = database.ref(`games/${code}/teams`).push(Team2).key

		// const team1_id = database.ref('gameTeams/' + code).push(Team1).key
		// const team2_id = database.ref('gameTeams/' + code).push(Team2).key

		// return Promise.all([team1_id, team2_id])
		// .then((teamIds) => {

		// 	// Add game status and team ids to the game information
		// 	let gameObj = Object.assign({}, game, {status: 
		// 		'SETUP'})
		// 	return database.ref(`games/${code}`).set(gameObj)
		
		// })

		
	},

	iterateThroughPlayers: () => {

	},

	getPlayerGame: (userId) => {
		return database.ref('players/' + userId).child('game').once('value')
	},

	createPlayerListener: (userId) => {

		database.ref(`players/${userId}`).on('value', snapshot => {
			store.dispatch(authenticated(snapshot.val()));
    	});

	},

	// When game, gamePlayers, or gameTeams changes, updates will be dispatched to store
	createGameListener: (gameCode) => {
		// game listener
		database.ref(`games/${gameCode}`).on('value', snapshot => {
			const val = snapshot.val()|| {}
			console.log("SNAPSHOT OF DELETED GAME: ", snapshot.val())
			if(!snapshot.val()){
				browserHistory.push('/')
			} 
			store.dispatch(setGame(val));
    	});


		// gamePlayers listener
    	database.ref(`games/${gameCode}/players`).orderByChild('timestamp').on('value', gamePlayers => {
			console.log("***** game players changed ******")
			const orderedPlayers = {};
			gamePlayers.forEach((player) => {
				console.log("PLAYER KEY: ", player.key)
				console.log("PLAYER VAL: ", player.val())
				orderedPlayers[player.key] = player.val()
			});
			console.log("ORDERED PLAYERS: ", orderedPlayers)
			store.dispatch(setPlayers(orderedPlayers))
    	});

    	// gameTeams listener
    	database.ref(`games/${gameCode}/teams`).on('value', gameTeams => {
    		const val = gameTeams.val() || {}
    		store.dispatch(setTeams(val))
    	})

    	utilFunctions.createGameStatusListener(gameCode)
	},

	createGameStatusListener: (gameCode) => {
		database.ref(`games/${gameCode}/status`).on('value', snapshot => {
			let status = snapshot.val()
			switch(status){
				case "PLAYERS_JOINING":
					browserHistory.push('/joined')
					break;
				case "TEAM_ASSIGNED":
					browserHistory.push('/teamalert')
					break;
				case "DASHBOARD":
					browserHistory.push('/dashboard')
					break;

			}
    	});
	},

	makePlayersArray: (playersObj) => {
		let players = [];

		for(var player in playersObj){
			players.push({id: player, name: playersObj[player]})
		}
		return players
	},

	getGameInfo: (gameCode) => {
		database.ref(`games/${gameCode}`).once('value')
		.then(snapshot => {
			store.dispatch(setGame(snapshot.val()))
		})

		database.ref(`games/${gameCode}/players`).orderByChild('timestamp').once('value')
		.then(gamePlayers => {
			const orderedPlayers = {};
			gamePlayers.forEach((player) => {
				orderedPlayers[player.key] = player.val()
			});
			store.dispatch(setPlayers(orderedPlayers))
		})
	},
	//TODO: since we really don't want any of the userInfo on fb to persist if a game is ended im gonna just delete the player for now when they end a game
	//TODO: would like to talk about why we wouldn't want to delete the player?
	getUserAndGameInfo: () => {
	  auth.onAuthStateChanged(function(user) {
		  if (user) {
		    utilFunctions.createPlayerListener(user.uid)
		    database.ref(`players/${user.uid}`).once('value')
		    .then(snapshot => {
		    	let userInfo = snapshot.val()
		    	if (!userInfo) {
		    		database.ref(`players/${user.uid}`).set({id: user.uid})
		    	}
		    	else {
		    		store.dispatch(authenticated(userInfo))
		    		if(userInfo.game) {
		    			utilFunctions.createGameListener(userInfo.game)
		    			utilFunctions.getGameInfo(userInfo.game)
		    		}
		    	}
		    })
		  }
		  else {
		    auth.signInAnonymously().catch(function(error) {
		      // Handle Errors here.
		      var errorCode = error.code;
		      var errorMessage = error.message;
		    })
		  }
		})
	},

	addPlayerToGame: (userId, username, gameCode) => {

		database.ref(`games/${gameCode}/players`).child(userId).set({
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			name: username,
			isAdmin: false,
			wordsSubmitted: 0
		})

		database.ref(`players/${userId}`).update({game: gameCode, isAdmin: false, name: username})
					
	},

	addAdminToGame: (userId, gameCode) => {

		database.ref(`games/${gameCode}/players`).child(userId).set({
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			name: null,
			isAdmin: true,
			wordsSubmitted: 0
		})

		database.ref(`players/${userId}`).update({game: gameCode, isAdmin: true})
	},

	updatePlayer: (user, updateObj, updatePlayerInGameObj) => {
		database.ref(`players/${user.id}`).update(updateObj)
		if(updatePlayerInGameObj){
			database.ref(`games/${user.game}/players/${user.id}`).update(updateObj)
		}
	},
	//here we are using Object.assign so we can add whatever keys we want

	// updatePlayer: (userId, keyValObj) => {
	// 	database.ref(`players/${userId}`).once('value')
	// 	.then(snapshot => {
	// 		let updatedPlayer = Object.assign({}, snapshot.val(), keyValObj) //snapshot.val() equivalent to res.data
	// 		database.ref(`players/${userId}`).set(updatedPlayer)
	// 		// .then(() => store.dispatch(authenticated(updatedPlayer)))
	// 	})
	// },

	// makeAdmin: (userId) => {database.ref(`players/${userId}`).child('isAdmin').set(true)},
	findGame: (gameCode) => {return database.ref(`games/${gameCode}`).once('value')},
	submitWord: (user, word) => {
		database.ref(`players/${user.id}`).once('value') //get wordsSubmitted key
		.then(snapshot => {
			if (!snapshot.val().wordsSubmitted) { //if wordsSubmitted is still zero then let them submit a word - increment counter and add word to gamePhrases
				let incrementedWordCount = Object.assign({}, snapshot.val(), {wordsSubmitted: snapshot.val().wordsSubmitted + 1}) 
				database.ref(`players/${user.id}`).set(incrementedWordCount)
				.then(() => {
					let gameNoun = {value: word, isGuessed: false}
					database.ref(`games/${user.game}/phrases`).push(gameNoun)
				})
			//TODO: this is probably not then best error handling and should be updated  
			} else return false //else return null so we can let the user know that they've already submitted a word
		})
	},
	//TODO: is it ok to use browserHistory.push in this file?
	leaveGame: (gameCode, userId) => {
		database.ref(`games/${gameCode}/players/${userId}`).remove()
		database.ref(`players/${userId}/game`).remove()
		browserHistory.push('/')
	},
	deleteGame: (gameId, userId) => {
		console.log('DELETING GAME')
		database.ref(`games/${gameId}`).remove()
		.then(() => {
			database.ref(`players/${userId}`).set({id: userId})})
		// .then(() => browserHistory.push('/'))
	}
}

export default utilFunctions


//TODO: numPlayers needs to increment when player is added or is it not counting the admin or is it not needed at all?