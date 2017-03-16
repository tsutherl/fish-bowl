const firebase = require('firebase')
const keys = require('APP/keys.js')


const config = keys.config

firebase.initializeApp(config)
// console.log("FIREBASE: ", firebase)
const database = firebase.database()
const auth = firebase.auth()


module.exports = {
	firebase,
	database, 
	auth
}