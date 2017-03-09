import React, { Component } from 'react';
import {browserHistory} from 'react-router'

export default class HomeScreen extends Component {
  componentDidMount() {
  

  }

  createGame(){

  }


  render() { 
    return (
      <div>
        <button onClick={()=>{browserHistory.push('/createGame')}}> CREATE NEW GAME </button>
        <button onClick={()=>{browserHistory.push('/join')}}> JOIN GAME </button>
      </div>
    )
  }
}



