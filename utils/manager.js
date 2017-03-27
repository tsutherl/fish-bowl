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
			console.log("GAME OBJ: ", gameObj)
			database.ref(`games/${code}`).set(gameObj)
		
		})

		
	},

	getPlayerGame: (userId) => {
		return database.ref('players/' + userId).child('game').once('value')
	},

	createPlayerListener: (userId) => {
		database.ref(`players/${userId}`).on('value', snapshot => {
			// console.log("USER CHANGED!")
			store.dispatch(authenticated(snapshot.val()));
    	});

		// have a change in team push you to the dashboard
    	// database.ref(`players/${userId}/team`)
	},

	// When game, gamePlayers, or gameTeams changes, updates will be dispatched to store
	createGameListener: (gameCode) => {

		// game listener
		database.ref(`games/${gameCode}`).on('value', snapshot => {
			store.dispatch(setGame(snapshot.val()));
    	});


		// gamePlayers listener
    	database.ref(`gamePlayers/${gameCode}`).orderByChild('timestamp').on('value', gamePlayers => {
			// DONE: sorting players by timed joined 
			//gamePlayers = gamePlayers.val()
			//let players = utilFunctions.makePlayersArray(gamePlayers)
			// const orderedPlayers = [];
			// gamePlayers.forEach((playerInfo) => orderedPlayers.push(playerInfo.val()));
			// store.dispatch(setPlayers(orderedPlayers));

			const orderedPlayers = {};
			gamePlayers.forEach((player) => {
				orderedPlayers[player.key] = player.val()
			});
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
			console.log("BROWSER HISTORY: ", browserHistory)
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
			console.log("player: ", player)
			players.push({id: player, name: playersObj[player]})
		}
		return players
	},

	getGameInfo: (gameCode) => {
		console.log("GET GAME INFO!")
		database.ref('games/' + gameCode).once('value')
		.then(snapshot => store.dispatch(setGame(snapshot.val())))

		database.ref('gamePlayers/' + gameCode).orderByChild('timestamp').once('value')
		.then(gamePlayers => {
			// console.log("GAME PLAYERS: ", gamePlayers.val())
			// const orderedPlayers = [];
			const orderedPlayers = {};
			gamePlayers.forEach((player) => {
				// console.log("TYPE OF PLAYERINFO: ", typeof player.val())
				// console.log("PLAYER INFO: ", player.val())
				// orderedPlayers.push(player.val())
				orderedPlayers[player.key] = player.val()
			});
			store.dispatch(setPlayers(orderedPlayers))
			// console.log("ORDERED PLAYERS: ", orderedPlayers)
			// Promise.all(orderedPlayers)
			// .then(() => store.dispatch(setPlayers(orderedPlayers)))
		})
	},

	getUserAndGameInfo: () => {
	  auth.onAuthStateChanged(function(user) {
		  if (user) {
		    // console.log("USER: ", user)
		    // User is signed in.
		    //store.dispatch(authenticated({id: user.uid, name: ''}))
		    // console.log("THIS: ", this)
		    utilFunctions.createPlayerListener(user.uid)
		    database.ref('players/' + user.uid).once('value')
		    .then(snapshot => {
		    	let userInfo = snapshot.val()
		    	// console.log("NEW USER SNAPSHOT", snapshot.val())
		    	if (!userInfo) {
		    		// console.log("USER NOT IN DATABASE")
		    		database.ref('players/' + user.uid).set({id: user.uid})
		    	}
		    	else {
		    		// console.log("USER IN DB")
		    		store.dispatch(authenticated(userInfo))
		    		if(userInfo.game) {
		    			// console.log("GAME CODE ON USER: ", userInfo.game)
		    			utilFunctions.createGameListener(userInfo.game)
		    			utilFunctions.getGameInfo(userInfo.game)
		    		}
		    	}
		    })
		  }
		  else {
		  	// console.log("NO USER YET")
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
			console.log('key value object', keyValObj)
			database.ref('players/' + userId).set(updatedPlayer)
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

}

export default utilFunctions


