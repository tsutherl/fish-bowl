'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, IndexRoute} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import HomeScreen from './components/HomeScreen'
import CreateGameContainer from './containers/CreateGameContainer'
import RegisterPlayerContainer from './containers/RegisterPlayerContainer'
import {Dashboard} from './components/Dashboard'
import CodeView from './components/CodeView'
import JoinGameContainer from './containers/JoinGameContainer'
import keys from 'APP/keys.js'
import manager from 'APP/utils/manager'
//import firebase from 'APP/db/firebase'
//import firebase from 'firebase'

const {getUserAndGameInfo} = manager
// const config = keys.config

// firebase.initializeApp(config)

// const database = firebase.database();
// const auth = firebase.auth();


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
        <Route path="dashboard" component={Dashboard}></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)