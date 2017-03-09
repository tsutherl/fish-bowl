import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./auth').default,  
})

export default rootReducer
