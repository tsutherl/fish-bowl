'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, IndexRoute} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import HomeScreen from './components/HomeScreen'
import CreateGame from './components/CreateGame'
import JoinGame from './components/JoinGame'
import WhoAmI from './components/WhoAmI'
import keys from 'APP/keys.js'
import firebase from 'firebase'

const config = keys.config

firebase.initializeApp(config)

const database = firebase.database();
const auth = firebase.auth();


// const ExampleApp = connect(
//   ({ auth }) => ({ user: auth })
// ) (
//   ({ user, children }) =>
//     <div>
//       <nav>
//         {user ? <WhoAmI/> : <Login/>}
//       </nav> 
//       {children}
//     </div>
// )

function authUser(){
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
});
  // firebase.auth().signInAnonymously().catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });
}


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={authUser}>
        <IndexRoute component={HomeScreen}/>
        <Route path="/join" component={JoinGame}></Route>
        <Route path="/createGame" component={CreateGame}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)