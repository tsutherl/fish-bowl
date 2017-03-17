import React from 'react';

export const SubmitWord = ({user, submitWord}) => {
    return (
      <form onSubmit={evt => {
        evt.preventDefault()
        submitWord(evt.target.word.value)
      } }>
        <input name="word" placeholder="Word"/>
        <input type="submit" value="Submit"/>
      </form>
    )
}