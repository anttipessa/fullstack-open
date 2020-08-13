import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, content, votes) => {
    dispatch(addVote(id, {votes:votes+1}))
    dispatch(setNotification(`you voted '${content}'`, 3))
  }

  return (
    <div>
      {anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default AnecdoteList