import axios from 'axios'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {JoinGame} from '../components/JoinGame'
import {setGame} from '../reducers/game'
import manager from 'APP/utils/manager'

const {findGame, updatePlayer, addPlayerToGame, createGameListener} = manager

export class JoinGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {game: '', name: '', isAdmin: false}
    this.join = this.join.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  join(evt) {
    evt.preventDefault()
    findGame(this.state.game)
    .then(game => {
      // better user alert
      // console.log("GAME WHEN JOINING: ", game.val())
      if(!game.val()){
        alert('No game associated with this code')
      }
      else{
        updatePlayer(this.props.user.id, this.state)
        createGameListener(this.state.game)
        addPlayerToGame(this.props.user.id, this.state.name, this.state.game)
        this.props.setGame(game.val())
        browserHistory.push('/dashboard')
      }
    })
  }

  handleChange(evt) {
    if(evt.target.name === 'username'){
      this.setState({name: evt.target.value})
    }
    if(evt.target.name === 'gameCode'){
      this.setState({game: evt.target.value})
    }
  }

  render() {
    return (
      <JoinGame
        join={this.join}
        handleChange={this.handleChange}
      />
    );
  }
}

export default connect(
  ({user}) => ({user}),
  (dispatch) => ({
    setGame: (game) => {
      dispatch(setGame(game))
    } 
  })
)(JoinGameContainer)

