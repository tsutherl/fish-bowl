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

splitPlayersIntoTeams = (players) => {
  const playersArr = Object.keys(players)
  const shuffledPlayers = shuffle(playersArr)
  const mid = Math.floor((playersArr.length + 1)/2)
  const team1Players = shuffledPlayers.slice(0, mid)
  const team2Players = shuffledPlayers.slice(mid)
  return {team1Players, team2Players}
}

module.exports = {
  shuffle,
  splitPlayersIntoTeams,
  // setTeamsAndCaptains
}
