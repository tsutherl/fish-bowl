import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

export const CodeView = props => {
    return (
      <div>
        <div> Share this code with friends </div>
        <h1> {props.game.code} </h1>
        <button onClick={()=>{browserHistory.push('/dashboard')}}> GO TO DASHBOARD </button>
      </div>
    )
}

export default connect(
  ({game}) => ({game}),
  () => ({})
)(CodeView)







