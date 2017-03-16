// import firebase from 'firebase'
// import keys from 'APP/keys.js'

// const config = keys.config

// firebase.initializeApp(config)

const firebase = require('./database').firebase

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
	}

}