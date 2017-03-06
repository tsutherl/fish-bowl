/* table of contents
  GameMod
    startGame
    timer functions
    handling sprints
    handling rounds
    endGame

  helper functions
    shuffle

game moderator makes sure the game is going alllll according to plan :)
responsible for things like finalizing player roster, random shuffling, and moving everyone on to the next stage of the game

initialize 1 GameMod instance for every game that starts... (is this okay to have all these objects on serverside?? i thought that its the point of having the database to store organized chunks of info... or are these bits small enough)

we can set up some backend server routes, which when hit, will invoke the appropriate methods
so something that works like....
i.e.
  a post request to api/game/:gameid/start with req.body = {players = ['tati', 'ally', 'dillon']}
  -->
  const game001 = new GameMod(req.params.gameid)
  game001.players = req.body.players


idea to implement redux:
use post requests from clientside react to api/game/:gameid/:actiontype
with a req.body that is the rest of the action object payload
put the req.body through a reducer with action.type = actiontype

NOTES:
 - we should probably use redux to handle collisions... is it worth doing that over using just object methods?
 - maybe we should break the timer logic into its own module
 - what info should the players write directly to firebase, and what should be sent directly to server instead?
 - should the firebase updating happen in some different module (a database manager like firechief??)

*/

class GameMod {

  constructor(gameid) {
    this.id = gameid // id, as in firebase database id
    this.players = []
    this.words = []

    this.teamA = []
    this.teamB = []
    this.round = 0
    this.sprint = 0
    this.sprintDuration = 120 // hardcoded for now

    this.timerId = 0
    this.timeLeft = 0
  }

  startGame() {
    /*
    when players are ready to start:

    1. this game's invitation code stops working(?)
    2. make their teams (assigned randomly for now?)
    3. start the sprints
    */
  }

  startTimer() {
    this.timer = setInterval(this.tick, 1000)
  }

  stopTimer() {
    clearInterval(this.timer)
    // todo: update firebase's 'isPaused' key

  }

  tick() {
    // as long as there's more than 0 seconds left, tick away
    if (!this.timeLeft) {
      this.endSprint()
    }
    else {
      this.timeLeft = this.timeLeft--

      // assuming that database = firebase.database()
      // this is going to run down the timer every second. all players in this game should be subscribed to changes on this key!
      database.ref(`sprints/${this.id}/timeRemaining`).set(this.timeLeft)
    }
  }

  startSprint() {
    // the timer is reset with the full length of time
    this.timeLeft = this.sprintDuration
    // todo: next person is up ... update firebase with their name in the right spot

    // todo: set up a listener for their guesses with a function to check if they're right (??)

    // todo: put a new word at firebase's 'currNoun' and if they're right, update list of 'pastGuesses'

    // todo: if ALL the words have been guessed, end the sprint and the round immediately

    // start the timer!
    this.startTimer()
  }

  endSprint() {
    // stop the ticking of the clock
    this.stopTimer()
    // todo: quit listening to this person's guesses (or the frontend react could just not allow form submissions anymore)

    // it's going to be the next team's turn!

  }

  startRound() {
    this.round++
    // todo: update this on firebase. say the round is started. react components should be listening for this and the frontend can post the right view and instructions....
  }

  endRound() {
    // todo: update firebase. clientside react should get database info and show the results of the last round / points, etc
    // todo: server should wait for everyone to say 'OK' or time out and move on
  }

  endGame() {
    // todo: game over.
  }

}

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

module.exports = GameMod

