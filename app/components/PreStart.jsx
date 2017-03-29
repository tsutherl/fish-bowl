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
    // .then(() => database.ref(`games/${game.code}/status`).set('DASHBOARD'))
  }

    render(){
      let players = this.props.players
      let playerKeys = Object.keys(players)
      let user = this.props.user

      if(user && players){
      	return (
    
      		<div>
        		<div className="teamDisplay"> Game: {this.props.game.name} </div>
        		<div> CODE: {this.props.game.code}</div>
            <div> PLAYERS ({playerKeys.length}) </div>
        		{playerKeys.map((player, i) => {
                return <div key={i}>{players[player].name}</div>
              })
            }
        		<button disabled={playerKeys.length < 4} onClick={this.makeTeams}> MAKE TEAMS </button>
        	</div>
      	)
      }
      return null
    }
}

export default connect(
	({game, user, players}) => ({game, user, players}),
	(dispatch) => ({})
)(PreStart)


