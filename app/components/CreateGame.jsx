import React, { Component } from 'react';
import {browserHistory} from 'react-router'

export const CreateGame = props => {
  const {createGame, handleChange} = props
    return (
       <form onSubmit={createGame}>
        <input name="name" id="name" placeholder="Game Name" onChange={handleChange}/>
        <input name="rounds" placeholder="Additional Rounds" onChange={handleChange}/>
        <input name="duration" placeholder="Round Duration" onChange={handleChange}/>
        <input type="submit" value="CREATE GAME" />
      </form>
    )
}



