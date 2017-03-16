/*\

EXAMPLE FILE OF HOW WE COULD USE REDUX HERE

idea to implement redux:
axios reqs from clientside react to api/game/:gameid/:action
put the req.body through a reducer with the function used as = req.params.action

*/

const initialState = {
//... the props currently on gamemod should be stored on the redux state instead
}

/* ------------       REDUCER     ------------------ */

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case START_GAME:
      return {...state, gameRunning: true}

    case PAUSE_GAME:
      return {...state, gameRunning: false}

    case NEXT_ROUND:
      return {...state, round: action.round}

    case QUIT_GAME:
      return {...state,
        gameRunning: false,
        gameOver: true
      }

    default:
      return state
  }
}

/* -----------------    ACTIONS     ------------------ */

const START_GAME = 'START_GAME'
const PAUSE_GAME = 'PAUSE_GAME'
const NEXT_ROUND = 'NEXT_ROUND'
const QUIT_GAME = 'QUIT_GAME'

/* ------------     ACTION CREATORS     ------------------ */

export const start = gameId => ({
  type: START_GAME, gameId
})

export const pause = () => ({
  type: PAUSE_GAME
})

export const nextRound = round => ({
  type: NEXT_ROUND, round
})

export const quit = gameId => ({
  type: QUIT_GAME, gameId
})

/* ------------       DISPATCHERS     ------------------ */



/* ------------------  default export     ------------------ */

export default reducer;

