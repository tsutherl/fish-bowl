import React, { Component } from 'react';
import {browserHistory} from 'react-router'

export default class Dashboard extends Component {
  componentDidMount() {
  

  }

  render() { 
    return (
      <form onSubmit={(evt)=>{evt.preventDefault()}}>
        <input name="username" placeholder="Username"/>
        <input name="gameCode" placeholder="Game Code"/>
        <input type="submit" value="Join" />
      </form>
    )
  }
}


