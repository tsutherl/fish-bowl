import React from 'react';

export const SubmitWord = ({user, submitWord}) => {
    return (
      <form onSubmit={evt => {
        console.log('we are submitting in submitword component')
        evt.preventDefault()
        const submitted = submitWord(user, evt.target.word.value)
        evt.target.word.value = ''
        if (!submitted) alert('You have already submitted your one word')
      } }>
        <input name="word" placeholder="Word"/>
        <input type="submit" value="Submit"/>
      </form>
    )
}