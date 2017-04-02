import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import manager from 'APP/utils/manager'
import EndButton from './EndButton'
import axios from 'axios'

const {leaveGame, deleteGame} = manager

//TODO: why does it take so long for it to check that I'm an admin
//TODO: bug - shows old nickname entered!!! => seems not to be updating the state after updating the nickname
export class Dashboard extends Component{
	constructor(props){
		super(props)
    this.state = {
      edit: false,
      teamName: ''
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveName = this.saveName.bind(this)
	}

  toggleEdit(){
    this.setState({edit: !this.state.edit})
  }

  handleChange(evt){
    this.setState({teamName: evt.target.value})
  }

  saveName(evt){
    evt.preventDefault()
    console.log("NEW NAME: ", this.state.teamName)
    axios.put(`/api/games/${this.props.user.game}/teams/${this.props.user.team}/name`, {teamName: this.state.teamName})
    .then(() => {
      this.toggleEdit()
    })
  }

  render(){
    let teams = this.props.teams
    let team = this.props.user && this.props.game && teams[this.props.user.team]
    let players = this.props.players
    let user = this.props.user
    console.log("USER IS CAPTAIN: ", user)
    if(user && Object.keys(teams).length && Object.keys(players).length) {
      return (
        <div>
        DASHBOARD
        {this.state.edit ? <EditTeamName saveName={this.saveName} handleChange={this.handleChange} teamName={team.name}></EditTeamName> : <div> MY TEAM: {team.name}</div>}
        {user.isCaptain ? <div> TEAM CAPTAIN </div> : <div> YOUR CAPTAIN IS: {players[team.captain].name} </div>}
        {user.isCaptain ? <button onClick={this.toggleEdit}> UPDATE TEAM NAME </button> : null}
        {team.players ? team.players.map(player => {
          return (<div key={player}> {this.props.players[player].name} </div>)
        }) : null}
        <EndButton />
        </div>
      )
    }
    return null
  }
}

export const EditTeamName = props => (
  <form onSubmit={props.saveName}>
    <input placeholder={props.teamName} onChange={props.handleChange}></input>
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


