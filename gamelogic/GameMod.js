/* TEMP NOTES

table of contents
  GameMod
    startGame
    timer functions
    handling sprints
    handling rounds
    endGame

game moderator makes sure the game is going alllll according to plan :)
responsible for things like finalizing roster, shuffling, and telling everyone next stage of game
initialize 1 GameMod instance for every game that starts.

we can set up some backend server routes, which when hit, will invoke the appropriate methods
so something that works like....
i.e.
  a post request to api/game/:gameid/start with req.body = {players = ['tati', 'ally', 'dillon']}
  -->
  const game001 = new GameMod(req.params.gameid)
  game001.players = req.body.players


QUESTIONS:
 - should probably use redux on the backend to handle collisions rathe than just use oop?
 - what info should the players write directly to firebase vs be sent directly to server instead?
 - should the firebase updating happen in some different module (a database manager like firechief??)
*/

const { shuffle } = require('./utils')
const PublicTimer = require('./PublicTimer')

class GameMod {

  constructor(gameid) {
    this.id = gameid // id, as in firebase database id
    this.timer = new PublicTimer(gameid) //give the mod a stopwatch that makes public announcments thru fb
    this.players = []
    this.words = []
    this.gameOver = false
    this.gameRunning = false

    this.teamA = []
    this.teamB = []
    this.round = 0
    this.sprintDuration = 120 // hardcoded for now

    // todo: log into the firebase so this new game mod is authorized to alter db. we can do it anonymously, but its probably better to do credentialed login? depends on how much we want to secure editing permissions

    // firebase.auth().signInWithEmailAndPassword(email, password)
    // .then(() => do something or another or nothing )
  }

  startGame() {
    /*
    when players are ready to start:

    1. this game's invitation code stops working(?)
    2. make their teams (assigned randomly for now?)
    3. start the sprints
    */
  }

  startSprint() {
    // todo: next person is up ... update firebase with their name in the right spot

    // todo: set up a listener for their guesses with a function to check if they're right (??)

    // todo: put a new word at firebase's 'currNoun' and if they're right, update list of 'pastGuesses'

    // todo: if ALL the words have been guessed, end the sprint and the round immediately

    // start the timer with the right amount of time
    this.timer.startTimer(this.sprintDuration)
  }

  endSprint() {
    // stop the ticking of the clock
    this.timer.stopTimer()
    // todo: quit listening to this person's guesses (or the frontend react could just not allow form submissions anymore)

    // it's going to be the next team's turn!

  }

  startRound() {
    this.round = this.round++

    // mix the bag o words up and the order of people
    this.words = shuffle(this.words)
    this.teamA = shuffle(this.teamA)
    this.teamB = shuffle(this.teamB)

    // todo: update all of these things on firebase. say the round is started. react components should be listening for this and the frontend can post the right view and instructions....

    // the round is ready to roll. wait for people to respond to start a sprint
  }

  endRound() {
    // todo: update firebase. clientside react should get database info and show the results of the last round / points, etc

    // todo: server should wait for everyone to say 'OK' or time out and move on

  }

  endGame() {
    // todo: game over.

  }

}

module.exports = GameMod

