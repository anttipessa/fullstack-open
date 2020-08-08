import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedDote = action.data
      return state.map(anec =>
        anec.id !== changedDote.id ? anec : changedDote
      ).sort(((a, b) => b.votes - a.votes))
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const addVote = (id, obj) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, obj)
    dispatch({
      type: 'VOTE',
      data:  updatedAnecdote
    })
  }
}

export const createAnecdote = data => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}


export default anecdoteReducer