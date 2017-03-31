module.exports = class Timer {

  constructor(gameid){
    this.game = gameid
    this.timerId = 0
    this.timeLeft = 0
  }

  start(duration) {
    this.timeLeft = duration
    this.timerId = setInterval(this.tick, 1000)
    // todo: update firebase's 'isPaused' key

  }

  stop() {
    clearInterval(this.timerId)
    // todo: update firebase's 'isPaused' key for this specific game

  }

  tick() { // a public tick that's broadcasted to everyone
    // as long as there's more than 0 seconds left, tick away 1 sec at a time.
    if this.timeLeft = this.timeLeft--
    // assuming that database = firebase.database()
    // everyone should be subscribed to changes on this key! so they can hear the almighty timer
    database.ref(`sprints/${this.game}/timeRemaining`).set(this.timeLeft)
  }
}
