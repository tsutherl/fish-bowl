import axios from 'axios'
const initialState = {}
const reducer = (state=initialState, action) => {
  switch(action.type) {
  case SET_TEAMS:
    return action.teams
  }
  return state
}

const SET_TEAMS = 'SET_TEAMS'
export const setTeams = teams => ({
  type: SET_TEAMS, teams
})


export default reducer
