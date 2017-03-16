class PublicTimer {

  constructor(){
    this.game = game

    this.timerId = 0
    this.timeLeft = 0
  }

  startTimer(duration) {
    this.timeLeft = duration
    this.timer = setInterval(this.tick, 1000)
  }

  stopTimer() {
    clearInterval(this.timer)
    // todo: update firebase's 'isPaused' key

  }

  tick() { //a public tick that's broadcasted to everyone
    // as long as there's more than 0 seconds left, tick away
    if (!this.timeLeft) this.endSprint()
    else this.timeLeft = this.timeLeft--
    // assuming that database = firebase.database()
    // this is going to run down the timer every second. all players in this game should be subscribed to changes on this key!
    database.ref(`sprints/${this.game}/timeRemaining`).set(this.timeLeft)
  }

}

module.exports = PublicTimer
