import axios from 'axios'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {CreateGame} from '../components/CreateGame'
import {setGame} from '../reducers/game'
import {authenticated} from '../reducers/auth'
import manager from 'APP/utils/manager'

const {registerGame, makeAdmin, updatePlayer} = manager


export class CreateGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        code: '',
        name: '',
        rounds: '',
        duration: '',
        status: 'SETUP'
    };
    this.createGame = this.createGame.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  createGame(evt) {
    evt.preventDefault()
    axios.get('/api/games/code')
    .then(res => res.data)
    .then(code => {
      // console.log("THIS IS MY GAME CODE: ", code)
      this.setState({code})
      registerGame(this.state, code)
      // add game listener instead of setting game manually
      this.props.setGame(this.state)
      makeAdmin(this.props.user.id)
      updatePlayer(this.props.user.id, {game: code})
      browserHistory.push('/registerPlayer')
    })

  }

  handleChange(evt) {
    if(evt.target.name === 'name'){
      this.setState({name: evt.target.value})
    }

    if(evt.target.name === 'duration'){
      this.setState({duration: evt.target.value})
    }

    if(evt.target.name === 'rounds'){
      this.setState({rounds: evt.target.value})
    }
  }


  render() {

    return (
      <CreateGame
        handleChange={this.handleChange}
        createGame={this.createGame}
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
)(CreateGameContainer)

