import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./auth').default, 
  game: require('./game').default,
  players: require('./players').default,
  teams: require('./teams').default 
})

export default rootReducer
