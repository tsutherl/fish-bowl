import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

export class CodeView extends Component {
  componentDidMount() {
  

  }

  createGame(){

  }


  render() { 
    return (
      <div>
        <div> Share this code with friends </div>
        <h1> {this.props.game.code} </h1>
        <button onClick={()=>{browserHistory.push('/gameDashboard')}}> GO TO DASHBOARD </button>
      </div>
    )
  }
}

export default connect(
  ({game}) => ({game}),
  () => ({})
)(CodeView)







