import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {CreateGame} from '../components/CreateGame'

export default class CreateGameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rounds: '',
      duration: ''
    };
    this.createGame = this.createGame.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  createGame(evt) {
    evt.preventDefault()

  }

  handleChange(evt) {
    if(evt.target.name === 'name'){
      this.setState({name: evt.target.value})
    }

    if(evt.target.name === 'duration'){
      this.setState({duration: evt.target.value})
    }

    if(evt.target.name === 'additionalRounds'){
      this.setState({additionalRounds: evt.target.value})
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