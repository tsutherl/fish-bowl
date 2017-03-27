import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'


export class Dashboard extends Component{
	constructor(props){
		super(props)
	}

    render(){
      let team = this.props.user && this.props.teams[this.props.user.team]
    	return (
    		<div>
        YOU ARE IN THE DASHBOARD
        {team ? <div> MY TEAM: {this.props.user.team}</div> : null}
        {console.log("TEAM: ", team)}
        {console.log("PLAYERS ON MY TEAM: ", team && team['players'])}
        {console.log("PLAYERS IN GAME: ", this.props.players)}
        {team && team.players ? team.players.map(player => {
          console.log("PLAYER: ", player)
          console.log("TEAMMATE NAME: ", this.props.players[player])
          return (<div key={player}> {this.props.players[player]} </div>)
        }) : null}
         
       
        
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
	(dispatch) => ({})
)(Dashboard)


