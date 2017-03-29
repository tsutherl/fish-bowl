import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import manager from 'APP/utils/manager'

const {leaveGame, deleteGame} = manager

//TODO: why does it take so long for it to check that I'm an admin
//TODO: bug - shows old nickname entered!!! => seems not to be updating the state after updating the nickname
export class EndButton extends Component{
	constructor(props){
		super(props)
	}

  render(){
    let user = this.props.user
    if(user && user.isAdmin){
      return <button onClick={deleteGame(user.game, user.id)}> END GAME </button>
    }
    else if(user){
      return <button onClick={leaveGame(user.game, user.id)}> LEAVE GAME </button>
    }
    else return null
    
  }
}

export default connect(
	({user}) => ({user}),
	(dispatch) => ({})
)(EndButton)


