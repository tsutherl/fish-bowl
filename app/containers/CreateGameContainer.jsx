import axios from 'axios'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {CreateGame} from '../components/CreateGame'
import {setGame} from '../reducers/game'
import {authenticated} from '../reducers/auth'
import manager from 'APP/utils/manager'

const makeGame = manager.registerGame


export class CreateGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        code: '',
        name: '',
        rounds: '',
        duration: ''
    };
    this.createGame = this.createGame.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  createGame(evt) {
    evt.preventDefault()
    axios.get('/api/games/code')
    .then(res => res.data)
    .then(code => {
      console.log("THIS IS MY GAME CODE: ", code)
      this.setState({code})
      makeGame(this.state, this.state.code)
      this.props.setGame(this.state)
      let adminUser = Object.assign({}, this.props.user, {isAdmin: true})
      console.log("ADMIN USER: ", adminUser)
      this.props.makeAdmin(adminUser)
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
    }, 
    makeAdmin: (user) => {
      dispatch(authenticated(user))
    }
  })
)(CreateGameContainer)

