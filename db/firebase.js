import keys from 'APP/keys.js'
import firebase from 'firebase'

const config = keys.config

export default firebase.initializeApp(config)

export const database = firebase.database();
export const auth = firebase.auth();