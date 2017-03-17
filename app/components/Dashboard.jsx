import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

export class Dashboard extends Component{
	constructor(props){
		super(props)
	}

    render(){
    	return (
    		<div>
      		<div className="teamDisplay"> Game: {this.props.game.name} </div>
      		<div> PLAYERS ({this.props.players.length}) </div>
      		{this.props.players.map(player => (<div>{player.name}</div>))}
      		{this.props.user && this.props.user.isAdmin ? <button> MAKE TEAMS </button> : null}

      		</div>
    	)
    }
}

export default connect(
	({game, user, players}) => ({game, user, players}),
	(dispatch) => ({})
)(Dashboard)





