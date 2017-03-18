import React from 'react';

export const SubmitWord = ({user, submitWord}) => {
    return (
      <form onSubmit={evt => {
        console.log('we are submitting in submitword component')
        evt.preventDefault()
        submitWord(user.id, evt.target.word.value)
      } }>
        <input name="word" placeholder="Word"/>
        <input type="submit" value="Submit"/>
      </form>
    )
}