import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./auth').default, 
  game: require('./game').default 
})

export default rootReducer
