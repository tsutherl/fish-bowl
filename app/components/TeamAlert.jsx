import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

export const TeamAlert = props => {
  const {user, teams} = props
    return (
       <div>
        <div> You're on: </div>
        <div> {teams[user.team].name} </div>
      </div>
    )
}

export default connect(
	({user, teams}) => ({user, teams}),
	(dispatch) => ({})
)(TeamAlert)



