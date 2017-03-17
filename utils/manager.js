import store from 'APP/app/store'
import {authenticated} from 'APP/app/reducers/auth'
import {setGame} from 'APP/app/reducers/game'

const myFirebase = require('./database')
const firebase = myFirebase.firebase
const database = myFirebase.database
const auth = myFirebase.auth

const utilFunctions = {
	registerGame: (game, code) => {
		(database.ref('games/' + code).set(game))
	},

	getPlayerGame: (userId) => {
		return database.ref('players/' + userId).child('game').once('value')
	},

	createPlayerListener: (userId) => {
		database.ref('players/' + userId).on('value', snapshot => {
			// console.log("USER CHANGED!")
			store.dispatch(authenticated(snapshot.val()));
    	});
	},

	getUserAndGameInfo: () => {
	  auth.onAuthStateChanged(function(user) {
		  if (user) {
		    // console.log("USER: ", user)
		    // User is signed in.
		    //store.dispatch(authenticated({id: user.uid, name: ''}))
		    // console.log("THIS: ", this)
		    utilFunctions.createPlayerListener(user.uid)
		    database.ref('players/' + user.uid).once('value', snapshot => {
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
		    			database.ref('games/' + userInfo.game).once('value')
		    			.then(snapshot => store.dispatch(setGame(snapshot.val())))
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
	updatePlayer: (userId, keyValObj) => {
		database.ref('players/' + userId).once('value')
		.then(snapshot => {
			let updatedPlayer = Object.assign({}, snapshot.val(), keyValObj)
			database.ref('players/' + userId).set(updatedPlayer)
		})
	},
	makeAdmin: (userId) => {database.ref('players/' + userId).child('isAdmin').set(true)},
	findGame: (gameCode) => {return database.ref('games/' + gameCode).once('value')},
	submitWord: (word) => {
		database.ref('users/' + userId).child('wordsSubmitted').set('TODO: some kind of increment function') //if this doesn't send back an error then we can add the word otherwise we need to send an error message back to the user
		.then(() => database.ref('gameNouns/' + gameId).child('nounId').set('dog2'))
	},

}

export default utilFunctions

//ref takes object name + key
//set takes the value you'd like to set to that key

