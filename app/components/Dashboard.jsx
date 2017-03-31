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
    this.state = {
      edit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.saveName = this.saveName.bind(this)
	}

  toggleEdit(){
    this.setState({edit: !this.state.edit})
  }

  saveName(e){
    e.preventDefault()
    // should I just do database.ref.set() or should I hit a backend route that will set the data?
    this.toggleEdit()
  }

  handleChange(e){

  }

  render(){
    let team = this.props.user && this.props.teams[this.props.user.team]
  	let players = this.props.players
    let user = this.props.user
    // console.log("USER IS CAPTAIN: ", user)
    return (
    	<div>
      YOU ARE IN THE DASHBOARD
      {this.state.edit ? <EditTeamName saveName={this.saveName} teamName={team && team.name}></EditTeamName> : <div> MY TEAM: {team && team.name}</div>}
      {user && user.isCaptain ? <div> TEAM CAPTAIN </div> : <div> YOUR CAPTAIN IS: {team && players[team.captain].name} </div>}
      {user && user.isCaptain ? <button onClick={this.toggleEdit}> UPDATE TEAM NAME </button> : null}
      {team && team.players ? team.players.map(player => {
        return (<div key={player}> {this.props.players[player].name} </div>)
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

export const EditTeamName = props => (
  <form onSubmit={props.saveName}>
    <input placeholder={props.teamName}></input>
    <input type="submit"></input>
  </form>
)

export default connect(
	({game, user, players, teams}) => ({game, user, players, teams}),
	(dispatch) => ({
		endGame: (gameId, userId) => {
			deleteGame(gameId, userId)
		}
	})
)(Dashboard)


