import firebase from 'firebase'
import keys from 'APP/keys.js'

const config = keys.config

firebase.initializeApp(config)

const database = firebase.database();
const auth = firebase.auth();

export default {
	createGame: (game, code) => (firebase.database().ref('games/' + code).set(game)),
	authUser: () => {
	  firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    console.log("USER: ", user)
	    // User is signed in.
	  } else {
	    firebase.auth().signInAnonymously().catch(function(error) {
	      // Handle Errors here.
	      var errorCode = error.code;
	      var errorMessage = error.message;
	    })
	  }
	});}

}