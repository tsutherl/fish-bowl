import axios from 'axios'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {RegisterPlayer} from '../components/RegisterPlayer'
import {authenticated} from '../reducers/auth'
import manager from 'APP/utils/manager'

const makeGame = manager.registerGame


export class RegisterPlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.user
    this.saveUser = this.saveUser.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  saveUser(evt) {
    evt.preventDefault()
    this.props.setUser(this.state)
    browserHistory.push('/code')


  }

  handleChange(evt) {
    this.setState({name: evt.target.value})
    console.log("NEW STATE: ", this.state)
  }


  render() {

    return (
      <RegisterPlayer
        saveUser={this.saveUser}
        handleChange={this.handleChange}
      />
    );
  }
}

export default connect(
  ({user}) => ({user}),
  (dispatch) => ({
    setUser: (user) => {
      dispatch(authenticated(user))
    }
  })
)(RegisterPlayerContainer)

