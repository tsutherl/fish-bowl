import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import {database} from 'APP/utils/database'
import axios from 'axios'


export class PreStart extends Component{
	constructor(props){
		super(props)
    this.makeTeams = this.makeTeams.bind(this)
	}

  makeTeams(){
    const {game} = this.props
    axios.get(`/api/games/make_teams/${game.code}`)
    .then(() => database.ref(`games/${game.code}/status`).set('DASHBOARD'))
  }

    render(){
    	return (
    		<div>
          {console.log("TYPEOF this.props.players: ", typeof this.props.players )}
          {console.log("TYPEOF Object.keys(this.props.players) ", typeof Object.keys(this.props.players))}
      		<div className="teamDisplay"> Game: {this.props.game.name} </div>
      		<div> CODE: {this.props.game.code}</div>
          <div> PLAYERS ({Object.keys(this.props.players).length}) </div>
      		{this.props.players ? Object.keys(this.props.players).map(player => {
              return <div>{this.props.players[player]}</div>
            }) : null
          }
      		{this.props.user && this.props.user.isAdmin ? <button onClick={this.makeTeams}> MAKE TEAMS </button> : null}
      	</div>
    	)
    }
}

export default connect(
	({game, user, players}) => ({game, user, players}),
	(dispatch) => ({})
)(PreStart)


