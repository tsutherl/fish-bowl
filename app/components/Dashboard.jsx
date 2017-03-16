import React, { Component } from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

export class Dashboard extends Component{
	constructor(props){
		super(props)
	}

    render(){
    	return (
      		<div className="teamDisplay"> Game: {this.props.game.name} </div>
    	)
    }
}

export default connect(
	({game, user}) => ({game, user}),
	(dispatch) => ({})
)(Dashboard)





