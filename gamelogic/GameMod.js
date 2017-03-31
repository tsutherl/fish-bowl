/* TEMP NOTES

table of contents
  GameMod
    - startGame
    - handling sprints
    - handling rounds
    - endGame

game mod makes sure the game is going alllll according to plan
initialize 1 GameMod instance for every game that starts.

QUESTIONS:
- where should each gamemod object exist???
- which info should come from firebase changes vs api server hits

*/

const { shuffle } = require('./utils')
const Timer = require('./Timer')

module.exports = class GameMod {

  constructor(gameid) {
    this.id = gameid // id, as in firebase database id
    this.timer = new Timer(gameid) //give the mod a stopwatch that broadcasts ticks thru fb

    // this.words = []
    // this.gameOver = false
    // this.gameRunning = false

    // this.teamA = []
    // this.teamB = []
    // this.round = 0
    // this.sprintDuration = 120 // hardcoded for now

    // database.ref
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
    this.timer.start(this.sprintDuration)
  }

  endSprint() {
    // stop the ticking of the clock
    this.timer.stop()
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
