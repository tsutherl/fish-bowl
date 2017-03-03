'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
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




render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomeScreen}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)