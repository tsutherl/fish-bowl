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
	registerGame: (game, code) => {
		// Initializing team information
		const Team1 = {name: 'Team 1', numPlayers: 0, captain: '', game: code}
		const Team2 = {name: 'Team 2', numPlayers: 0, captain: '', game: code}

		// Add teams to Firebase and grab their keys
		// const team1_id = database.ref('teams/').push(Team1).key
		// const team2_id = database.ref('teams/').push(Team2).key

		const team1_id = database.ref('gameTeams/' + code).push(Team1).key
		const team2_id = database.ref('gameTeams/' + code).push(Team2).key

		Promise.all([team1_id, team2_id])
		.then((teamIds) => {

			// Add game status and team ids to the game information
			let gameObj = Object.assign({}, game, {team1: teamIds[0], team2: teamIds[1], status: 
				'SETUP'})
			database.ref(`games/${code}`).set(gameObj)
		
		})

		
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
			store.dispatch(setGame(val));
    	});


		// gamePlayers listener
    	database.ref(`gamePlayers/${gameCode}`).orderByChild('timestamp').on('value', gamePlayers => {

			const orderedPlayers = {};
			gamePlayers.forEach((player) => {
				orderedPlayers[player.key] = player.val()
			});
			store.dispatch(setPlayers(orderedPlayers))
    	});

    	// gameTeams listener
    	database.ref(`gameTeams/${gameCode}`).on('value', gameTeams => {
    		store.dispatch(setTeams(gameTeams.val()))
    	})

    	utilFunctions.createGameStatusListener(gameCode)
	},

	createGameStatusListener: (gameCode) => {
		database.ref(`games/${gameCode}/status`).on('value', snapshot => {
			let status = snapshot.val()
			switch(status){
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
		database.ref('games/' + gameCode).once('value')
		.then(snapshot => store.dispatch(setGame(snapshot.val())))

		database.ref('gamePlayers/' + gameCode).orderByChild('timestamp').once('value')
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
		    database.ref('players/' + user.uid).once('value')
		    .then(snapshot => {
		    	let userInfo = snapshot.val()
		    	if (!userInfo) {
		    		database.ref('players/' + user.uid).set({id: user.uid})
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
		// database.ref('gamePlayers/' + gameCode).child(userId).set(username)
		// I think this is creating an error
		database.ref('gamePlayers/' + gameCode).child(userId).set({
			timestamp: firebase.database.ServerValue.TIMESTAMP,
			name: username
		})
					
	},


	//here we are using Object.assign so we can add whatever keys we want

	updatePlayer: (userId, keyValObj) => {
		database.ref('players/' + userId).once('value')
		.then(snapshot => {
			let updatedPlayer = Object.assign({}, snapshot.val(), keyValObj) //snapshot.val() equivalent to res.data
			database.ref('players/' + userId).set(updatedPlayer)
			.then(() => store.dispatch(authenticated(updatedPlayer)))
		})
	},

	makeAdmin: (userId) => {database.ref('players/' + userId).child('isAdmin').set(true)},
	findGame: (gameCode) => {return database.ref('games/' + gameCode).once('value')},
	submitWord: (user, word) => {
		database.ref('players/' + user.id).once('value') //get wordsSubmitted key
		.then(snapshot => {
			if (!snapshot.val().wordsSubmitted) { //if wordsSubmitted is still zero then let them submit a word - increment counter and add word to gamePhrases
				let incrementedWordCount = Object.assign({}, snapshot.val(), {wordsSubmitted: snapshot.val().wordsSubmitted + 1}) 
				database.ref('players/' + user.id).set(incrementedWordCount)
				.then(() => {
					let gameNoun = {value: word, isGuessed: false}
					database.ref('gameNouns/' + user.game).push(gameNoun)
				})
			//TODO: this is probably not then best error handling and should be updated  
			} else return false //else return null so we can let the user know that they've already submitted a word
		})
	},
	//TODO: is it ok to use browserHistory.push in this file?
	leaveGame: (userId) => {
		database.ref('gamePlayers/' + userId).remove()
		browserHistory.push('/')
	},
	deleteGame: (gameId, userId) => {
		database.ref('games/' + gameId).remove()
		.then(() => database.ref('players/' + userId).remove())
		.then(() => browserHistory.push('/'))
	}
}

export default utilFunctions


