import React from 'react';

export const SubmitWord = ({userId, submitWord}) => {
    return (
      <form onSubmit={evt => {
        evt.preventDefault()
        submitWord(userId, evt.target.word.value)
      } }>
        <input name="word" placeholder="Word"/>
        <input type="submit" value="Submit"/>
      </form>
    )
}