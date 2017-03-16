import React, { Component } from 'react';
import {connect} from 'react-router';
import {browserHistory} from 'react-router'

export class TeamDisplay extends Component{
	constructor(props){
		super(props)
	}

    render(){
    	return (
      		<div className="teamDisplay"> THIS IS THE DASHBOARD </div>
    	)
    }
}

export default connect(
	({game, user}) => ({game, user}),
	(dispatch) => ({})
)(TeamDisplay)





