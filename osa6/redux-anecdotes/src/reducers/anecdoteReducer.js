const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const doteToChange = state.find(n => n.id === id)
      const changedDote = {
        ...doteToChange,
        votes: doteToChange.votes + 1
      }
      return state.map(note =>
        note.id !== id ? note : changedDote
      ).sort(((a, b) =>  b.votes - a.votes))
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data  
    default:
      return state
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}


export default anecdoteReducer