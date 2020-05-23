import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVoted = ({ mostvotes, anecdote, vote }) => {
  if (vote === 0) {
    return (
      <p></p>
    )
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote} </p>
      <p>has {vote} votes</p>
    </div>
  )

}

const DailyAnecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {vote} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))

  const handleVote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }


  const getMostVoted = (votes) => {
    const most = votes.indexOf(Math.max(...votes))
    return most
  }

  const random = (selected) => {
    let ran = Math.floor(Math.random() * (props.anecdotes.length))
    while (ran === selected) {
      ran = Math.floor(Math.random() * (props.anecdotes.length))
    }
    setSelected(ran)
  }

  return (
    <div>
      <DailyAnecdote anecdote={props.anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={() => handleVote(selected)} text="vote" />
      <Button handleClick={() => random(selected)} text="next anecdote" />
      <MostVoted mostvotes={getMostVoted(votes)} anecdote={props.anecdotes[getMostVoted(votes)]} vote={votes[getMostVoted(votes)]} />
    </div >
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)