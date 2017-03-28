import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import manager from 'APP/utils/manager'

const {leaveGame, deleteGame} = manager

//TODO: why does it take so long for it to check that I'm an admin
//TODO: bug - shows old nickname entered!!! => seems not to be updating the state after updating the nickname
export class Dashboard extends Component{
	constructor(props){
		super(props)
	}

    render(){
      let team = this.props.user && this.props.teams[this.props.user.team]
    	return (
    		<div>
        YOU ARE IN THE DASHBOARD
        {team ? <div> MY TEAM: {team.name}</div> : null}
        {team && team.players ? team.players.map(player => {
          return (<div key={player}> {this.props.players[player].name} </div>)
        }) : null}
        {this.props.user && this.props.user.isAdmin? <button onClick={() => this.props.endGame(this.props.game.code, this.props.user.id)}> END GAME </button> : <button onClick={this.props.leaveGame}> LEAVE GAME </button>}
        
      		{/*<div className="teamDisplay"> Game: {this.props.game.name} </div>
      		<div> CODE: {this.props.game.code}</div>
          <div> PLAYERS ({this.props.players.length}) </div>
      		{this.props.players.map(player => (<div>{player.name}</div>))}
      		{this.props.user && this.props.user.isAdmin ? <button onClick={makeTeams}> MAKE TEAMS </button> : null}*/}
      	</div>
    	)
    }
}

export default connect(
	({game, user, players, teams}) => ({game, user, players, teams}),
	(dispatch) => ({
		endGame: (gameId, userId) => {
			deleteGame(gameId, userId)
		}
	})
)(Dashboard)


