import axios from 'axios'

const initialState = []

const reducer = (state=initialState, action) => {
  switch(action.type) {
  case SET_PLAYERS:
    return action.players
  }
  return state
}

const SET_PLAYERS = 'SET_PLAYERS'
export const setPlayers = players => ({
  type: SET_PLAYERS, players
})



export default reducer
