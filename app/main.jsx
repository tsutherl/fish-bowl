'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, IndexRoute} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from 'APP/app/store'
import HomeScreen from './components/HomeScreen'
import CreateGameContainer from './containers/CreateGameContainer'
import RegisterPlayerContainer from './containers/RegisterPlayerContainer'
import Dashboard from './components/Dashboard'
import PreStart from './components/PreStart'
import CodeView from './components/CodeView'
import TeamAlert from './components/TeamAlert'
import JoinGameContainer from './containers/JoinGameContainer'
import keys from 'APP/keys.js'
import manager from 'APP/utils/manager'

const {getUserAndGameInfo} = manager

// function authUser(){
//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log("USER: ", user)
//     // User is signed in.
//   } else {
//     console.log("NO USER")
//     firebase.auth().signInAnonymously().catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     })
//   }
// });
//   // firebase.auth().signInAnonymously().catch(function(error) {
//   //   // Handle Errors here.
//   //   var errorCode = error.code;
//   //   var errorMessage = error.message;
//   // });
// }




render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" onEnter={getUserAndGameInfo}>
        <IndexRoute component={HomeScreen}/>
        <Route path="join" component={JoinGameContainer}></Route>
        <Route path="createGame" component={CreateGameContainer}></Route>
        <Route path="code" component={CodeView}></Route>
        <Route path="registerPlayer" component={RegisterPlayerContainer}></Route>
        <Route path="prestart" component={PreStart}></Route>
        <Route path="teamalert" component={TeamAlert}></Route>
        <Route path="dashboard" component={Dashboard}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)

