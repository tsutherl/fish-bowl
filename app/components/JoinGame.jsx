import React, { Component } from 'react';
import {browserHistory} from 'react-router'

export const JoinGame = props => {
    return (
      <form onSubmit={props.join}>
        <input name="username" placeholder="Username" onChange={props.handleChange}/>
        <input name="gameCode" placeholder="Game Code" onChange={props.handleChange}/>
        <input type="submit" value="Join" />
      </form>
    )
}



