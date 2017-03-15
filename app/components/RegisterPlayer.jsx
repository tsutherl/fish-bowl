import React, { Component } from 'react';
import {browserHistory} from 'react-router'

export const RegisterPlayer = props => {
  const {saveUser, handleChange} = props
    return (
       <form onSubmit={saveUser}>
        <input name="name" id="name" placeholder="Player Nickname" onChange={handleChange}/>
        <input type="submit" value="CONTINUE" />
      </form>
    )
}



