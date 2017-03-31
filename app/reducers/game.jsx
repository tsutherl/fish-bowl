import axios from 'axios'
const initialState = {}
const reducer = (state=initialState, action) => {
  switch(action.type) {
  case SET_GAME:
  console.log('are we tryingg to set game wrong:::::???????', action.game)
    return action.game
  }
  return state
}

const SET_GAME = 'SET_GAME'
export const setGame = game => ({
  type: SET_GAME, game
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))


export default reducer
