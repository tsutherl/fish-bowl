import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./auth').default, 
  game: require('./game').default,
  players: require('./players').default 
})

export default rootReducer
